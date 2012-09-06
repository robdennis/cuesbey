# encoding: utf-8
from __future__ import absolute_import
from collections import namedtuple

from django.db import models
from jsonfield import JSONField
from unidecode import unidecode

from cuesbey_main.cube_viewer import get_json_card_content
from cuesbey_main.cube_viewer.autolog import log


class CardFetchingError(Exception):
    """
    Unknown error fetching a particular card
    """

def make_and_insert_card(name):
    cleaned_name = _clean_cardname(name)

    try:
        fetched_card = Card.objects.get(pk=cleaned_name)
        log.debug('successfully fetched %s', fetched_card)
        return fetched_card
    except Card.DoesNotExist:
        try:
            card_content = get_json_card_content(cleaned_name)
        except:
            card_content = None

        log.info('got card content: %s', card_content)
        # this may need to be bubbling an exception instead
        if card_content is None:
            raise CardFetchingError(u'unable to fetch a card with name: {!r}{}'.format(
                name,
                u'' if name == cleaned_name else u', cleaned as: {!r}'.format(cleaned_name))
            )

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

class Card(models.Model):
    """
    A single card, cubes can (should) have many cards
    """
    name = models.CharField(primary_key=True, max_length=200)
    mana_cost = models.CharField(max_length=200, null=True)
    converted_mana_cost = models.CharField(max_length=200)
    types = models.CharField(max_length=200)
    subtypes = models.CharField(max_length=200, null=True)
    text = models.CharField(max_length=1024*8, null=True)
    color_indicator = models.CharField(max_length=200, null=True)
    watermark = models.CharField(max_length=200, null=True)
    power = models.CharField(max_length=200, null=True)
    toughness = models.CharField(max_length=200, null=True)
    loyalty = models.CharField(max_length=200, null=True)
    gatherer_url = models.CharField(max_length=200)
    versions = JSONField()

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




class Cube(models.Model):
    """
    A collection of cards, owned by a user
    """
    cards = models.ManyToManyField("Card")
    owners = models.ManyToManyField("User")
    name = models.CharField(max_length=200, unique=True)

    def sort_by(self, sort_spec):
        """
        :var sort_spec: the sort specification to use in yielding this cube's
            cards
        :return: list of query sets that support displaying a sorted cube
        """

        return self.cards

    def add_card_by_name(self, card_name):
        """

        """

        self.cards.add(make_and_insert_card(card_name))


    def add_cards_by_name(self, card_names):
        """

        """
        for card_name in card_names:
            self.add_card_by_name(card_name)


class User(models.Model):
    """
    Someone who's using the site, and has cubes
    """
    name = models.CharField(max_length=200)

