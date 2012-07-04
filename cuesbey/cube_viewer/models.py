from collections import namedtuple

from django.db import models
from jsonfield import JSONField
from unidecode import unidecode

from cube_viewer import get_json_card_content

def make_and_insert_card(name):
    name = _clean_cardname(name)

    try:
        fetched_card = Card.objects.get(pk=name)
        return fetched_card
    except Card.DoesNotExist:

        card_content = get_json_card_content(name)
        # this may need to be bubbling an exception instead
        if card_content is None:
            return None

        fetched_card = Card(**card_content)
        fetched_card.save()
        return fetched_card

def _clean_cardname(name):
    """
    :param name: the card name as unicode
    :return: the ascii representation as a str
    """
    return unidecode(name).strip()

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
    text = models.CharField(max_length=200, null=True)
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


class User(models.Model):
    """
    Someone who's using the site, and has cubes
    """
    name = models.CharField(max_length=200)

