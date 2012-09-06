# encoding: utf-8
import unittest
from django.test import TestCase
from models import Card, make_and_insert_card, Cube, CardFetchingError

class SimpleTest(TestCase):
    def test_create_cards_given_names(self):

        for name, expansion in (('Zealous Conscripts', 'Avacyn Restored'),
                                ('Stormbound Geist', 'Dark Ascension'),
                                ('Sylvan Library', 'Masters Edition')):

            # ensure that the card didn't already exist
            self.assertEqual([], list(Card.objects.filter(name=name).all()))
            fetched_card = make_and_insert_card(name)
            self.assertIsInstance(fetched_card, Card)
            self.assertIn(expansion, [expansion.name for expansion in fetched_card.expansions])
            self.assertIn(fetched_card, Card.objects.all())

    def test_handle_bad_name(self):

        for name in ('Lanowar Elf',
                     'Llanowar Elfs',
                     'Llan O\' War Elves'):
            with self.assertRaises(CardFetchingError):
                make_and_insert_card(name)

    def test_unicode_in_weird_spots(self):
        # weird unicode apostrophes from copying and pasting a cube list from some random website
        for name, fixed_name in ((u'Moment\u2019s Peace', "Moment's Peace"),
                                 (u'Æther Adept', u'Æther Adept'),
                                 (u"Gideon’s Lawkeeper", "Gideon's Lawkeeper"),
                                 (u"Night’s Whisper", "Night's Whisper")):
            self.assertEqual(make_and_insert_card(name).name, fixed_name)

    def test_handle_apostrophe_names(self):

        for name in ("Moment's Peace",
                     "Sensei's Divining Top"):
            self.assertEqual(make_and_insert_card(name).name, name)

    @unittest.expectedFailure
    def test_split_cards(self):
        for name, expansion in (('Fire//Ice', 'Apocalypse'),
                                ('Assault//Battery', 'Invasion'),
                                ('Supply//Demand', 'Dissension')):
            self.assertEqual([], list(Card.objects.filter(name=name).all()))
            fetched_card = make_and_insert_card(name)
            self.assertIsInstance(fetched_card, Card)
            self.assertIn(expansion, [expansion.name for expansion in fetched_card.expansions])
            self.assertIn(fetched_card, Card.objects.all())


class CubeSortingTest(TestCase):

    def setUp(self):

        self.test_cube = Cube()
        self.test_cube.save()
        self.test_cube.add_cards_by_name(['Phyrexian Metamorph', 'Jilt', 'Kessig Wolf Run', 'Tattermunge Maniac', 'Swords to Plowshares'])
        self.test_cube.save()

    def test_sanity(self):
        pass