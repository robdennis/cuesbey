# encoding: utf-8
import unittest
import collections

from django.test import TestCase
from cuesbey_main.cube_viewer.models import Card, make_and_insert_card, Cube, CardFetchingError
from cuesbey_main.cube_viewer.sorter import CubeSorter
from cuesbey_main.cube_viewer import parse_mana_cost, get_mana_symbol_bitfields

from cuesbey_main.cube_viewer.autolog import log

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


class BaseCardsTestCase(TestCase):
    @classmethod
    def setUpClass(cls):

        cls.cards = [make_and_insert_card(name) for name in [
            'Phyrexian Metamorph',
            'Jilt',
            'Kessig Wolf Run',
            'Tattermunge Maniac',
            'Swords to Plowshares',
            'Slave of Bolas',
            'Batterskull',
            'Crystal Shard',
            'Spectral Procession'
        ]]


class ImportHelpersTest(BaseCardsTestCase):
    def assertBitfieldMatches(self, name, color_sets):

        bitfield_names=[
            '_standard_mana_bitfield',
            '_mono_hybrid_mana_bitfield',
            '_phyrexian_mana_bitfield',
            '_hybrid_mana_bitfield',
        ]

        mana_cost = make_and_insert_card(name).mana_cost

        expected_bitfield = {}

        for bitfield_name, colors in zip(bitfield_names, color_sets):
            bitfield_type = getattr(Card, bitfield_name)
            bitfield = 0
            for color in colors:
                bitfield |= getattr(bitfield_type, color.lower())
            expected_bitfield[bitfield_name] = bitfield

        actual_bitfield = get_mana_symbol_bitfields(mana_cost)

        for idx, bitfield_name in enumerate(bitfield_names):
            self.assertEqual(actual_bitfield[bitfield_name],
                             expected_bitfield[bitfield_name],
                             "card {} is not exactly the colors: {} for type {} ({})".format(name, color_sets[idx], bitfield_name, actual_bitfield[bitfield_name])
            )



    def test_parse_mana_cost(self):
        self.assertEqual(['5'], parse_mana_cost("{5}"))
        self.assertEqual(['5'], make_and_insert_card('Batterskull').mana_cost)
        self.assertEqual(['3', 'U/R', 'B'], make_and_insert_card('Slave of Bolas').mana_cost)
        self.assertEqual(['3', 'U/P'], make_and_insert_card('Phyrexian Metamorph').mana_cost)

    def test_mana_bitfields(self):
        self.assertBitfieldMatches('Batterskull', [
            [], [], [], []
        ])

        self.assertBitfieldMatches('Slave of Bolas', [
            ['Black'], [], [], ['Izzet']
        ])

        self.assertBitfieldMatches('Tattermunge Maniac', [
            [], [], [], ['Gruul']
        ])

        self.assertBitfieldMatches('Sliver Queen', [
            ['White', 'Blue', 'Black', 'Red', 'Green'], [], [], []
        ])

        self.assertBitfieldMatches('Spectral Procession', [
            [], ['White'], [], []
        ])

        self.assertBitfieldMatches('Phyrexian Metamorph', [
            [], [], ['Blue'], []
        ])

class CubeSortingTest(BaseCardsTestCase):
    maxDiff = None

    def create_expected_dictionary(self, expected, sort_spec):
        def update(d, u):
            for k, v in u.iteritems():
                if isinstance(v, collections.Mapping):
                    r = update(d.get(k, {}), v)
                    d[k] = r
                else:
                    d[k] = u[k]
            return d

        return update(self.sorter._get_empty_sort_dict(sort_spec), expected)

    def setUp(self):

        self.test_cube = Cube()
        self.test_cube.save()
        self.test_cube.cards = self.cards
        self.test_cube.save()

        self.sorter = CubeSorter(self.test_cube)

    def _write_card_objects_into_expected(self, expected):
        """

        :param expected:
        :return:
        """

        def _recurse_subcategories(mapping):
            for k, v in mapping.iteritems():
                if isinstance(v, collections.Mapping):
                    _recurse_subcategories(v)
                elif isinstance(v, basestring):
                    mapping[k] = make_and_insert_card(v)
                elif isinstance(v, collections.Iterable):
                    # once it gets down to a list, it's going to be assumed
                    # it's a list of card names as strings
                    mapping[k] = [make_and_insert_card(card_name)
                                  for card_name in v]

        _recurse_subcategories(expected)

        return expected

    @unittest.expectedFailure
    def test_no_special_sorting(self):

        expected = dict(
            White={
                '<=1': ['Swords to Plowshares']
            },
            Colorless=[
                'Kessig Wolf Run',
                'Batterskull',
                'Crystal Shard',
            ],
            Blue={
                '2': ['Jilt'],
                '4': ['Phyrexian Metamorph']
            },
            Multicolor= [
                'Tattermunge Maniac',
                'Slave of Bolas',
            ],
        )

        self.assert_expected_sort({}, expected)

    def assert_expected_sort(self, sort_spec, expected):
        """
        assert that given a set of things to sort against, that we get the
        expected result

        :param sort_spec:
        :param expected: dictionary of card names as strings
        :return:
        """
        expected_with_cards = self._write_card_objects_into_expected(expected)
        sorted = self.sorter.sort_by(sort_spec)
        log.debug('sorted: {}', sorted)
        self.assertEqual({},
                         self.create_expected_dictionary(expected_with_cards,
                                                         sort_spec))