# encoding: utf-8
import json
import re
from collections import namedtuple
from itertools import chain

from django.db import models
from jsonfield import JSONField
from unidecode import unidecode

from django_orm.postgresql.fields.arrays import ArrayField
from django_orm.postgresql.manager import Manager

from cuesbey_main.cube_viewer import (get_json_card_content, heuristics,
                                      parse_mana_cost, estimate_colors,
                                      CardFetchingError)
from cuesbey_main.cube_viewer.autolog import log


class CubeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


def make_and_insert_card(name):
    cleaned_name = _clean_cardname(name)

    try:
        fetched_card = Card.objects.get(pk=cleaned_name)
        log.debug('successfully fetched %s', fetched_card)
        return fetched_card
    except Card.DoesNotExist:

        card_content = get_json_card_content(cleaned_name)
        log.info('got card content: %s', card_content)

        try:
            # we'll try to refetch in case we were able to clean a good name
            refetched_card = Card.objects.get(pk=card_content['name'])
        except Card.DoesNotExist:
            log.debug("creating a new card")
            created_card= Card(**card_content)
            created_card.save()
            log.debug("saved created")
            return created_card
        else:
            log.debug("successfully refetched: %s", refetched_card)
            return refetched_card

def _clean_cardname(name):
    """
    :param name: the card name as unicode
    :return: the ascii representation as a str
    """
    if isinstance(name, str):
        name = name.decode('utf-8')
    cleaned_name = unidecode(name).strip()
    log.debug(u'%s (%r) cleaned as %r', name.strip(), name, cleaned_name)
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
    gatherer_url = models.CharField(max_length=200)
    versions = JSONField()
    objects = models.Manager()
    # this is the django-orm-extensions manager for array-specific queries
    manager = Manager()
    # possibly premature optimization
    _heuristics = {}
    _json_keys = (
        'name', 'mana_cost', 'converted_mana_cost', 'types',
        'colors', 'gatherer_ids', 'heuristics'
    )

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
    def get(cls, name):
        try:
            return cls.objects.get(name=name)
        except Card.DoesNotExist:
            return make_and_insert_card(name)

    @property
    def gatherer_ids(self):
        return self.versions.keys()

    @property
    def expansions(self):
        """
        :return: expansions by earliest to latest ("latest" as defined by
            highest "id"). provided as ExpansionTuple(name, rarity)
        :rtype: list
        """
        return [
            ExpansionTuple(version_dict['expansion'], version_dict['rarity'])
            for id, version_dict in iter(sorted(self.versions.items(),
                                                # explicit into cast to avoid
                                                # lexical sorting
                                                key=lambda x: int(x[0])))
        ]

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

        """

        self.cards.add(make_and_insert_card(card_name))


    def add_cards_by_name(self, card_names):
        """

        """
        for card_name in card_names:
            self.add_card_by_name(card_name)

    def serialize(self, fp=None, indent=None):
        cards_as_dict = {
            card.name: card.as_dict() for card in self.cards.all()
        }
        if fp is None:
            return json.dumps(cards_as_dict, cls=CubeEncoder, indent=indent)
        else:
            return json.dump(cards_as_dict, fp, cls=CubeEncoder, indent=indent)


class User(models.Model):
    """
    Someone who's using the site, and has cubes
    """
    name = models.CharField(max_length=200)

