from django.db import models

class Card(models.Model):
    """
    A single card, cubes can (should) have many cards
    """
    name = models.CharField(max_length=200)


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

