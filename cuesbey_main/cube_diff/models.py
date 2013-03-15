# encoding: utf-8
import json
import itertools
import re
from collections import namedtuple
from itertools import chain

from django.db import models
from jsonfield import JSONField
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
        return json.JSONEncoder.default(self, obj)


def get_cards_from_names(*names):
    """
    :param names: the names of the card objects you want to insert

    :return: the Card objects corresponding to those names
    """

    if not isinstance(names[0], basestring):
        # someone probably passed a list instead of unrolling args of strings
        names = names[0]

    to_fetch = []
    to_insert = []

    names = map(_clean_cardname, names)

    mismatched_name_map = Card.get_mismatched_names_map()

    for name in names:
        if name in Card.get_all_inserted_names():
            to_fetch.append(name)
        elif name in mismatched_name_map:
            # apparently we've seen this misspelling before
            to_fetch.append(mismatched_name_map[name])
        else:
            log.debug("%r not yet inserted, will insert", name)
            to_insert.append(name)

    results_of_insert = insert_cards(*to_insert)
    all_cards = (list(Card.objects.filter(name__in=to_fetch)) +
                 results_of_insert['inserted'] +
                 results_of_insert['refetched'])

    if len(all_cards) + len(results_of_insert['invalid']) != len(names):
        found_names = [c.name for c in all_cards]
        raise AssertionError(
            "something went missing: %r (%d) != %r (%d)" % (found_names,
                                                            len(found_names),
                                                            names,
                                                            len(names))
        )

    return all_cards

def insert_cards(*names):
    """
    Search gather for cards with the given name, insert that information into
    the database. This doesn't check for existing cards that have that name,
    and the act of inserting them
    :param names:
    :return: {
        'inserted': cards_that_were_inserted,
        'refetched': cards_that_were_refetched,
        'invalid': names_that_were_invalid
    }
    """

    # not sure what to do with this yet
    mismatched_name_map = Card.get_mismatched_names_map()
    all_card_content = []
    names_to_insert = []
    invalid_names = []
    refetched_names = []

    for name in names:
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
            if fetched_name in Card.get_all_inserted_names():
                refetched_names.append(fetched_name)
                log.debug('refetched card with name: %r as card with name: %r',
                          name, fetched_name)
                continue

        log.debug('got card content: %s', card_content)
        all_card_content.append(card_content)
        names_to_insert.append(fetched_name)

    cards_to_be_inserted = [
        Card(**card_content) for card_content in all_card_content
    ]

    Card.objects.bulk_create(cards_to_be_inserted)
    Card.mark_names_as_inserted(names_to_insert)

    refetched_cards = list(Card.objects.filter(name__in=refetched_names))

    assert len(refetched_cards) == len(refetched_names), (
        "didn't refetch the correct number of cards"
    )

    disposition = {
        'inserted': cards_to_be_inserted,
        'refetched': refetched_cards,
        'invalid': invalid_names
    }

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
    # TODO: actually determine what's easiest here: array or string
    mana_cost = models.CharField(max_length=200, null=True)
    converted_mana_cost = models.IntegerField()
    types = ArrayField(dbtype='text')
    subtypes = ArrayField(dbtype='text', null=True)
    text = models.CharField(max_length=1024*8, null=True)
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
            cls._all_names = set([c.name for c in cls.objects.all()])

        return cls._all_names

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

    @property
    def heuristics(self):

        return Card._heuristics.setdefault(self.name,
                                           heuristics.get_heuristics(self))

    @property
    def activated_ability_mana_costs(self):

        if not hasattr(self, '_ability_mana_costs'):
            group = '(\{[WUBRGP/\d\{\}]+\})'

            self._ability_mana_costs = filter(None, chain(
                *re.findall(r'%s.*?(?:.*or %s)?.*:' % (group, group), self.text) or []
            )) or None

        return self._ability_mana_costs

    @classmethod
    def get_all(cls, *names):
        return get_cards_from_names(*names)

    @classmethod
    def get(cls, name):
        return get_cards_from_names(name)[0]

    def as_dict(self):

        return {k:getattr(self, k) for k in self._json_keys}

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

    @classmethod
    def dumps(cls, cube_dict, **kwargs):

        return


class User(models.Model):
    """
    Someone who's using the site, and has cubes
    """
    name = models.CharField(max_length=200)

