from django.db import models
from jsonfield import JSONField

def make_and_insert_card(name):
    from cube_viewer import get_json_card_content
    return Card(**get_json_card_content(name))

class Card(models.Model):
    """
    A single card, cubes can (should) have many cards
    """
    name = models.CharField(max_length=200)
    mana_cost = models.CharField(max_length=200)
    converted_mana_cost = models.CharField(max_length=200)
    types = models.CharField(max_length=200)
    subtypes = models.CharField(max_length=200)
    text = models.CharField(max_length=200)
    flavor_text = models.CharField(max_length=200)
    flavor_text_attribution = models.CharField(max_length=200)
    color_indicator = models.CharField(max_length=200)
    watermark = models.CharField(max_length=200)
    power = models.CharField(max_length=200)
    toughness = models.CharField(max_length=200)
    loyalty = models.CharField(max_length=200)
    expansion = models.CharField(max_length=200)
    rarity = models.CharField(max_length=200)
    number = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    gatherer_url = models.CharField(max_length=200)
    versions = JSONField()
    rulings = models.CharField(max_length=200)

    @property
    def color_identity(self):
        # this obviously doesn't work, but the stub is here
        return 'Red'


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

