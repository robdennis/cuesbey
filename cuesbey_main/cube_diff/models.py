# encoding: utf-8
import json
import re
from collections import namedtuple, Counter
from itertools import chain
from unittest.util import sorted_list_difference, safe_repr

import redis
from django.db import models, IntegrityError
from django_orm.postgresql.fields.arrays import ArrayField
from django_orm.postgresql.manager import Manager
from unidecode import unidecode

from django.conf import settings

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


def assertExpectatations(actual, expected):

    def handle_card_card_or_name(seq):
        return [
            c.name if isinstance(c, Card) else c for c in seq
        ]

    missing, unexpected = sorted_list_difference(
        handle_card_card_or_name(expected),
        handle_card_card_or_name(actual)
    )
    errors = []
    if missing:
        errors.append('Expected, but missing:\n    %s' %
                       safe_repr(missing))
    if unexpected:
        errors.append('Unexpected, but present:\n    %s' %
                       safe_repr(unexpected))
    if errors:
        message = '\n'.join(errors)
        raise AssertionError(message)

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

    if not isinstance(names[0], basestring):
        # someone probably passed a list instead of unrolling args of strings
        names = names[0]

    redis_conn = redis.StrictRedis(**settings.REDIS_INFORMATION)
    fetched, names_to_insert = retrieve_cards_from_names(names)
    results_of_insertion = insert_cards(names_to_insert, redis_conn)

    return (
        fetched +
        results_of_insertion.get('inserted', []) +
        results_of_insertion.get('refetched', [])
    )


def retrieve_cards_from_names(names):
    """
    :param names: the names of the card objects you want to retrieve

    :return: [Card cards], [str names] (a 2-tuple of the Cards retrieve and
        the names of cards that need to be inserted
    """

    to_fetch = []
    names_to_insert = []

    # names are cleaned of things like unicode smart quotes, and if it's a
    # misspelling we've seen before and handled, use that
    cleaned_names = []

    mismatched_name_map = Card.get_mismatched_names_map()
    all_inserted_names = Card.get_all_inserted_names()
    for name in (_clean_cardname(name) for name in set(names)):
        if name not in mismatched_name_map:
            cleaned_name = name
        else:
            # we actually do want to utf8-decoded representation of this name
            cleaned_name = mismatched_name_map[name]

        # if _inserted could be guaranteed to be a set, use sismember
        # and if it was a string we could use get
        if cleaned_name in all_inserted_names:
            to_fetch.append(cleaned_name)
        else:
            names_to_insert.append(cleaned_name)

    fetched_cards = list(Card.objects.filter(name__in=to_fetch).all())

    if settings.DEBUG:
        if len(fetched_cards) + len(names_to_insert) != len(set(names)):
            assertExpectatations(fetched_cards+names_to_insert,
                                 list(set(names)))


    return fetched_cards, names_to_insert


def insert_cards(names, redis_conn, post_insert_hook=None):
    """
    Search gather for cards with the given name, insert that information into
    the database. This doesn't check for existing cards that have that name,
    and the act of inserting them
    :param names: the names of the cards to insert
    :param redis_conn: used to cache information about the cards
    :param post_insert_hook: this callable will be invoked with the card that
        was just inserted
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

    invalid_names = []
    refetched_names = []
    inserted_cards = []
    relevant_mismatches = {}
    content_map = {}
    unique_names = Counter(names)
    duplicate_inserts = []
    inserted_names = Card.get_all_inserted_names()

    if post_insert_hook is None:
        post_insert_hook = lambda c: log.debug('inserted: {.name}', c)

    for name in unique_names:
        try:
            card_content = get_json_card_content(name)
        except CardFetchingError:
            invalid_names.append(name)
            log.debug('problem fetching card with name: %r', name)
            continue

        fetched_name = card_content['name']
        if name != fetched_name:
            Card.add_new_mismatch_mapping(name, fetched_name, redis_conn)
            relevant_mismatches[name] = fetched_name
            if fetched_name in inserted_names:
                refetched_names.append(fetched_name)
                continue

        if fetched_name not in content_map:
            content_map[fetched_name] = card_content
            card = Card(**card_content)
            try:
                card.save()
            except IntegrityError:
                # assume a different thread inserted it
                duplicate_inserts.append(card.name)
                card = None
            except:
                log.exception('unknown error inserting %r', card)
                card = None
            else:
                Card.mark_card_as_inserted(card, redis_conn)
                inserted_cards.append(card)
            finally:
                post_insert_hook(card)
        else:
            duplicate_inserts.append(fetched_name)

    refetched_cards = list(Card.objects.filter(name__in=refetched_names))

    disposition = {
        'inserted': inserted_cards,
        'refetched': refetched_cards,
        'mismatches': relevant_mismatches,
        'invalid': invalid_names,
    }

    if settings.DEBUG:
        assertExpectatations(inserted_cards + refetched_cards +
                             invalid_names + duplicate_inserts,
                             unique_names)

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
    def _get_redis(cls):
        """
        :return: an initialized connection to the normal redis db
        """
        #TODO: figure out if this needs to be more efficiently closed.
        #(.e.g context manager)
        return redis.StrictRedis(**settings.REDIS_INFORMATION)

    @classmethod
    def get_all_inserted_names(cls, redis_conn=None):
        """
        Used to test what names are associated with cards in the database.

        :return: a set of all cards in database, this needs to be added
            to after server startup to stay current
        """

        if redis_conn is None:
            redis_conn = cls._get_redis()

        if not redis_conn.llen('_inserted'):
            log.debug('reupdating the list of inserted names')
            cls.update_all_inserted_names(redis_conn)

        return [name.decode('utf8')
                for name in (redis_conn.lrange('_inserted', 0, -1) or [])]

    @classmethod
    def update_all_inserted_names(cls, redis_conn=None):
        if redis_conn is None:
            redis_conn = cls._get_redis()
        all_inserted_names = [c.name for c in cls.objects.all()]
        if all_inserted_names:
            redis_conn.lpush('_inserted', *all_inserted_names)

    @classmethod
    def mark_card_as_inserted(cls, card, redis_conn=None):
        if redis_conn is None:
            redis_conn = cls._get_redis()

        redis_conn.lpush('_inserted', card.name.encode('utf8'))

    @classmethod
    def get_mismatched_names_map(cls, redis_conn=None):
        """
        Used to correctly fetch cards given a mismatched name that we know
        maps. This is usually for non-ascii card names that can be searched
        with ascii strings

        :return: a dict mapping strings to the resulting card name, this needs
            to be updated
        """
        if redis_conn is None:
            redis_conn = cls._get_redis()
        mapping = {
            k.decode('utf8'): v.decode('utf8')
            for k, v in redis_conn.hgetall('_mismatched').iteritems()
        }
        print('mapping: {!r}'.format(mapping))
        return mapping

    @classmethod
    def add_new_mismatch_mapping(cls, bad_name, correct_name, redis_conn=None):
        if redis_conn is None:
            redis_conn = cls._get_redis()
        redis_conn.hset('_mismatched', bad_name.encode('utf-8'),
                        correct_name.encode('utf-8'))
        cls.get_mismatched_names_map(redis_conn)

    @classmethod
    def reset_names_inserted(cls):
        cls._get_redis().flushdb()

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

        return heuristics.get_available_heuristics()


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
