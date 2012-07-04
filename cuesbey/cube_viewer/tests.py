# encoding: utf-8
from django.test import TestCase
from models import Card, make_and_insert_card

class SimpleTest(TestCase):
    def test_create_cards_given_names(self):

        for name, expansion in (('Zealous Conscripts', 'Avacyn Restored'),
                                ('Stormbound Geist', 'Dark Ascension'),
                                ('Sylvan Library', 'Masters Edition')):

            # ensure that the card didn't already exist
            self.assertEqual([], list(Card.objects.filter(name=name).all()))
            fetched_card = make_and_insert_card(name)
            self.assertIsInstance(fetched_card, Card)
            self.assertEqual(fetched_card.expansions[-1].name, expansion)
            self.assertIn(fetched_card, Card.objects.all())

    def test_handle_bad_name(self):

        for name in ('Lanowar Elf',
                     'Llanowar Elfs',
                     'Llan O\' War Elves'):
            self.assertIsNone(make_and_insert_card(name))

    def test_unicode_in_weird_spots(self):
        # weird unicode apostrophes
        for name, fixed_name in ((u'Moment\u2019s Peace', "Moment's Peace"),
                                 (u'Æther Adept', u'Æther Adept'),
                                 (u"Gideon’s Lawkeeper", "Gideon's Lawkeeper"),
                                 (u"Night’s Whisper", "Night's Whisper")):
            self.assertEqual(make_and_insert_card(name).name, fixed_name)

    def test_handle_apostrophe_names(self):

        for name in ("Moment's Peace",
                     "Sensei's Divining Top"):
            self.assertEqual(make_and_insert_card(name).name, name)