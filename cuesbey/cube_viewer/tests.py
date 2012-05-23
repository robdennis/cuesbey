"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from models import Card, make_and_insert_card

class SimpleTest(TestCase):
    def test_create_cards_given_names(self):

        for name, color_identity in (('Zealous Conscripts', 'Red'),
                                     ('Stormbound Geist', 'Blue'),
                                     ('Sylvan Library', 'Green')):
            fetched_card = make_and_insert_card(name)
            self.assertIsInstance(fetched_card, Card)
            self.assertEqual(fetched_card.color_identity, color_identity)
