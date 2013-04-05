# encoding: utf-8
import json
import re
from collections import namedtuple, Counter
from itertools import chain

from django.db import models
from unidecode import unidecode

from django_orm.postgresql.fields.arrays import ArrayField
from django_orm.postgresql.manager import Manager

from cuesbey_main.cube_diff import (get_json_card_content, heuristics,
                                    parse_mana_cost, estimate_colors,
                                    CardFetchingError)
from cuesbey_main.cube_diff.autolog import log


class CubeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        if isinstance(obj, Card):
            return obj.as_dict()
        return json.JSONEncoder.default(self, obj)


def clean_and_rematch_names(*names):
    """
    :param names: the names of the card objects you want to insert

    :return:
    """

    if not isinstance(names[0], basestring):
        # someone probably passed a list instead of unrolling args of strings
        names = names[0]

    mismatched_name_map = Card.get_mismatched_names_map()
    # names are cleaned of things like unicode smart quotes, and if it's a
    # misspelling we've seen before and handled, use that
    return [
        mismatched_name_map.get(name, _clean_cardname(name))
        for name in names
    ]


def multiply_cards_by_count(cards, card_counter, alias_mapping=None):
    """
    It's useful to return the same number of serialized card objects as there
    were card names requested, this method takes in a card, and information
    that helps answer how many instances of the card should be returned

    :param cards: the cards to be multiplied
    :param card_counter: the collections.Counter object mapping str requested
        card name with the count in the original list
    :param alias_mapping: optional dict mapping names from the original list
        to card names that they correspond to (some of which might be the
        provided cards)
    :return: a list containing the appropriate number of card objects repeated
    """
    return list(chain(*[
        multiply_card_by_count(card, card_counter, alias_mapping)
        for card in cards
    ]))


def multiply_card_by_count(card, card_counter, alias_mapping=None):
    """
    It's useful to return the same number of serialized card objects as there
    were card names requested, this method takes in a card, and information
    that helps answer how many instances of the card should be returned

    :param card: the card to be multiplied
    :param card_counter: the collections.Counter object mapping str requested
        card name with the count in the original list
    :param alias_mapping: optional dict mapping names from the original list
        to card names that they correspond to (some of which might be the
        provided card)
    :return: a list containing the appropriate number of card objects repeated
    """

    alias_mapping = alias_mapping or {}
    card_name = card.name
    aliases_to_this_name = [
        k for k, v in alias_mapping.iteritems()
        if v == card_name
    ]

    return [card] * sum(
        # if it's not in the original map we're dealing the actual card
        # name that we're seeing for the very first time
        card_counter.get(name, 0)
        for name in [card_name] + aliases_to_this_name
    )


def get_cards_from_names(*names):
    """
    Returns a list of Card objects

    :param names: the names of card objects you want to retrieve and insert if
        necessary
    :return: [Card objects based on names provided]
    """

    fetched, names_to_insert = retrieve_cards_from_names(*names)
    results_of_insertion = insert_cards(*names_to_insert)

    return (
        fetched +
        results_of_insertion.get('inserted', []) +
        results_of_insertion.get('refetched', [])
    )


def retrieve_cards_from_names(*names):
    """
    :param names: the names of the card objects you want to retrieve

    :return: [Card cards], [str names] (a 2-tuple of the Cards retrieve and
        the names of cards that need to be inserted
    """

    to_fetch = []
    names_to_insert = []

    cleaned_names = clean_and_rematch_names(*names)
    unique_names = Counter(cleaned_names)

    for name in cleaned_names:
        if name in Card.get_all_inserted_names():
            to_fetch.append(name)
        else:
            # it's intentional we're listing duplicate names to to insert
            names_to_insert.append(name)

    fetched_cards = multiply_cards_by_count(
        list(Card.objects.filter(name__in=to_fetch)),
        unique_names
    )

    if len(fetched_cards) + len(names_to_insert) != len(cleaned_names):
        raise AssertionError(
            "something went missing on retrieve! given %d names, but have "
            "only accounted for %d" % (
                len(names),
                len(fetched_cards) + len(names_to_insert)
            )
        )

    log.debug('%r, %r', fetched_cards, names_to_insert)

    return fetched_cards, names_to_insert


def insert_cards(*names):
    """
    Search gather for cards with the given name, insert that information into
    the database. This doesn't check for existing cards that have that name,
    and the act of inserting them
    :param names:
    :return: if names were provided: {
        'inserted': cards_to_insert,
        'refetched': refetched_cards,
        'mismatches': relevant_mismatches,
        'invalid': invalid_names,
    }

    else, empty dict
    """
    if not names:
        return {}

    if not isinstance(names[0], basestring):
        # someone probably passed a list instead of unrolling args of strings
        names = names[0]

    # not sure what to do with this yet
    mismatched_name_map = Card.get_mismatched_names_map()
    invalid_names = []
    refetched_names = []
    relevant_mismatches = {}
    content_map = {}
    unique_names = Counter(names)
    duplicate_insert_count = 0

    for name in unique_names:
        try:
            card_content = get_json_card_content(name)
        except CardFetchingError:
            invalid_names.append(name)
            log.debug('problem fetching card with name: %r', name)
            continue

        fetched_name = card_content['name']
        if name != fetched_name:
            assert (name not in mismatched_name_map or
                    mismatched_name_map[name] == fetched_name)
            mismatched_name_map[name] = fetched_name
            relevant_mismatches[name] = fetched_name
            if fetched_name in Card.get_all_inserted_names():
                refetched_names.append(fetched_name)
                continue

        if fetched_name not in content_map:
            content_map[fetched_name] = card_content
        else:
            duplicate_insert_count += 1

    cards_to_insert = [
        Card(**card_content) for card_content in content_map.values()
    ]

    Card.objects.bulk_create(cards_to_insert)
    Card.mark_names_as_inserted(content_map.keys())

    refetched_cards = list(Card.objects.filter(name__in=refetched_names))

    disposition = {
        'inserted': cards_to_insert,
        'refetched': refetched_cards,
        'mismatches': relevant_mismatches,
        'invalid': invalid_names,
    }
    accounted_for = (len(disposition['inserted']) +
                     len(refetched_names) +
                     # sum(unique_names[name] for name in relevant_mismatches) +
                     len(invalid_names) +
                     duplicate_insert_count
    )

    if accounted_for != len(unique_names):
        raise AssertionError(
            "something went missing! given %d names, but have only "
            "accounted for %d" % (len(names), accounted_for)
        )

    return disposition


def _clean_cardname(name):
    """
    :param name: the card name as unicode
    :return: the ascii representation as a str
    """
    if isinstance(name, str):
        name = name.decode('utf-8')
    cleaned_name = unidecode(name).strip()
    # log.debug(u'%s (%r) cleaned as %r', name.strip(), name, cleaned_name)
    return cleaned_name

ExpansionTuple = namedtuple('ExpansionTuple', ['name', 'rarity'])

color_bitfield_keys = (
    'white', 'blue', 'black', 'red', 'green'
)


class Card(models.Model):
    """
    A single card, cubes can (should) have many cards
    """
    name = models.CharField(primary_key=True, max_length=200)
    mana_cost = models.CharField(max_length=200, null=True)
    converted_mana_cost = models.IntegerField()
    types = ArrayField(dbtype='text')
    subtypes = ArrayField(dbtype='text', null=True)
    text = models.CharField(max_length=1024 * 8, null=True)
    _color_indicator = ArrayField(dbtype='text', null=True)
    watermark = models.CharField(max_length=200, null=True)
    power = models.CharField(max_length=200, null=True)
    toughness = models.CharField(max_length=200, null=True)
    loyalty = models.IntegerField(null=True)
    objects = models.Manager()
    # this is the django-orm-extensions manager for array-specific queries
    manager = Manager()
    # possibly premature optimization
    _heuristics = {}
    _json_keys = (
        'name', 'mana_cost', 'converted_mana_cost', 'types',
        'colors', 'heuristics'
    )

    @classmethod
    def get_all_inserted_names(cls):
        """
        Used to test what names are associated with cards in the database.

        :return: a set of all cards in database, this needs to be added
            to after server startup to stay current
        """

        if not getattr(cls, '_all_names', set()):
            cls.update_all_inserted_names()


        return cls._all_names

    @classmethod
    def update_all_inserted_names(cls):
        #Celery tasks mean this didn't get updated like before
        #need a better way to do this this
        cls._all_names = set([c.name for c in cls.objects.all()])

    # FIXME: these don't work correctly now that celery is being used
    @classmethod
    def get_mismatched_names_map(cls):
        """
        Used to correctly fetch cards given a mismatched name that we know
        maps. This is usually for non-ascii card names that can be searched
        with ascii strings

        :return: a dict mapping strings to the resulting card name, this needs
            to be updated
        """
        if not getattr(cls, '_mismatched_name_map', {}):
            cls._mismatched_name_map = {}

        return cls._mismatched_name_map

    @classmethod
    def mark_names_as_inserted(cls, names):
        """
        to be called following an insertion of one of more new cards, to keep
        the in memory set up-to-date

        :param names: an iterable of names (as string/unicode) to were
            successfully inserted
        """

        currently_inserted_names = getattr(cls, '_all_names', set())
        [currently_inserted_names.add(name) for name in names]
        cls._all_names = currently_inserted_names

    @classmethod
    def reset_names_inserted(cls):

        cls._all_names = set()
        cls._mismatched_name_map = {}

    @property
    def color_indicator(self):
        if not hasattr(self, '_color_indicator_set'):
            self._color_indicator_set = set(self._color_indicator or [])

        return self._color_indicator_set

    @property
    def parsed_mana_cost(self):
        return parse_mana_cost(self.mana_cost)

    @property
    def colors(self):
        return self.estimate_colors(self.mana_cost, self.color_indicator)

    def estimate_colors(self, mana_cost_text, color_indicator=None):
        if color_indicator is None:
            color_indicator = self.color_indicator

        # the argument could be made that this is "wrong" for the case of
        # mismatched mana cost and color indicator. But the only example I can
        # think of "Ghostfire" would probably be Red anyway

        return estimate_colors(mana_cost_text) | set(color_indicator or [])

    @classmethod
    def get_all_heuristics(cls):
        """
        Used to easily see what heuristics are set on cards in the database
        """
        if not getattr(cls, '_all_heuristics', {}):
            cls._all_heuristics = {}
            cls._update_heuristics_available(*cls.get_all_inserted_names())

        return cls._all_heuristics

    @classmethod
    def _update_heuristics_available(cls, *names):
        for card in Card.objects.filter(name__in=names):
            if not card.heuristics:
                continue
            for heuristic_name in card.heuristics:
                # data that could be associated with heuristics in the future
                cls._all_heuristics.setdefault(heuristic_name, {})

    @classmethod
    def reset_heuristics_available(cls):
        if hasattr(cls, '_all_heuristics'):
            del cls._all_heuristics

    @property
    def heuristics(self):

        return Card._heuristics.setdefault(self.name,
                                           heuristics.get_heuristics(self))

    @property
    def activated_ability_mana_costs(self):

        if not hasattr(self, '_ability_mana_costs'):
            mana_grp = '(\{[WUBRGP/\d\{\}]+\})'
            activation_regex = r'%s.*?(?:.*or %s)?.*:' % (mana_grp, mana_grp)
            matches = re.findall(activation_regex, self.text) or []
            self._ability_mana_costs = [
                found_cost
                for found_cost in chain(*matches) if found_cost]

        return self._ability_mana_costs

    @classmethod
    def get_all(cls, *names):
        return get_cards_from_names(*names)

    @classmethod
    def get(cls, name):
        return get_cards_from_names(name)[0]

    def as_dict(self):

        return {k: getattr(self, k) for k in self._json_keys}

    def __repr__(self):
        return '<Card: {!r}>'.format(self.name)

    def __str__(self):
        return self.__repr__()


class Cube(models.Model):
    """
    A collection of cards, owned by a user
    """
    cards = models.ManyToManyField("Card")
    owners = models.ManyToManyField("User")
    name = models.CharField(max_length=200, unique=True)

    def add_card_by_name(self, card_name):
        """
        :param card_name: add a card with this name, to this cube
        """
        self.cards.add(Card.get(card_name))

    def add_cards_by_name(self, card_names):
        """
        :param card_names: add card with these name, to this cube
        """
        for card_name in card_names:
            self.add_card_by_name(card_name)

    def as_dict(self):
        """
        return a dict representation of this cube
        """

        return {
            card.name: card.as_dict() for card in self.cards.all()
        }

    def as_list(self):
        """
        return a list representation of this cube
        """

        return [card.as_dict() for card in self.cards.all()]

    def as_json(self, **kwargs):
        """
        return a serialized-json representation of this cube
        calls serialize

        :param kwargs: additional kwargs to pass to Cube.serialize()
        :return: string json-representation
        """

        return Cube.serialize(self.as_list(), **kwargs)

    @classmethod
    def serialize(cls, cube_cards, fp=None, **kwargs):
        """
        :rtype : str (if no fp specified) else NoneType
        :param cube_cards: the container you wish to serialize
        :param fp: the file-like object you intend to dump to, else dump to
            string
        :param kwargs: kwargs to pass to json
        :return:
        """

        if fp is None:
            return json.dumps(cube_cards, cls=CubeEncoder, **kwargs)
        else:
            return json.dump(cube_cards, fp, cls=CubeEncoder, **kwargs)


class User(models.Model):
    """
    Someone who's using the site, and has cubes
    """
    name = models.CharField(max_length=200)
