# encoding: utf-8
import unittest

from django.test import TestCase
from cuesbey_main.cube_viewer.models import Card, make_and_insert_card, Cube, CardFetchingError
from cuesbey_main.cube_viewer import parse_mana_cost, get_mana_symbol_bitfields

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


class CardModelTest(TestCase):
    @classmethod
    def setUpClass(cls):

        cls.cards = [make_and_insert_card(name) for name in [
            'Phyrexian Metamorph',
            'Lingering Souls',
            'Kessig Wolf Run',
            'Tattermunge Maniac',
            'Swords to Plowshares',
            'Slave of Bolas',
            'Batterskull',
            'Crystal Shard',
            'Spectral Procession',
            'Abrupt Decay'
        ]]

    def setUp(self):

        self.test_cube = Cube()
        self.test_cube.save()
        self.test_cube.cards = self.cards
        self.test_cube.save()

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
            ['Black'], [], [], ['Blue', 'Red']
        ])

        self.assertBitfieldMatches('Tattermunge Maniac', [
            [], [], [], ['Red', 'Green']
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

    def test_query_by_bitfields(self):

        def _get_names(_query_set):
            return [c.name for c in _query_set]

        hybrid_card_names = _get_names(Card.objects.filter(cube=self.test_cube).exclude(_hybrid_mana_bitfield=0))
        self.assertIn('Slave of Bolas', hybrid_card_names)
        self.assertIn('Tattermunge Maniac', hybrid_card_names)

class CardCategoryTest(TestCase):

    def assertHeuristicsMatch(self, name, expected, *keys_that_are_not_present):
        actual = Card.get(name).heuristics
        for k in keys_that_are_not_present:
            self.assertNotIn(k, actual)
        self.assertEqual(actual, expected)

    @unittest.expectedFailure
    def test_handle_phyrexian(self):

        self.assertHeuristicsMatch('Phyrexian Metamorph', dict(
            phyrexian_always_pays_life=dict(
                mana_cost=['3'],
                converted_mana_cost=3,
                colors={}
            )
        ))

        self.assertHeuristicsMatch('Porcelain Legionnaire', dict(
            phyrexian_always_pays_life=dict(
                mana_cost=['2'],
                converted_mana_cost=2,
                colors={}
            )
        ))

        self.assertHeuristicsMatch('Birthing Pod', dict(
            phyrexian_always_pays_life=dict(
                mana_cost=['3'],
                converted_mana_cost=3,
                colors={}
            ),
            phyrexian_always_pays_life_except_for_abilities=dict(
                mana_cost=['3'],
                converted_mana_cost=3,
                colors={'Green'}
            )
        ))

    @unittest.expectedFailure
    def test_handle_off_color_flashback(self):
        self.assertHeuristicsMatch('Lingering Souls', dict(
            off_color_flashback_is_gold=dict(
                colors={'White', 'Black'}
            )
        ))

    @unittest.expectedFailure
    def test_handle_off_color_kicker(self):
        self.assertHeuristicsMatch('Dismantling Blow', dict(
            off_color_kicker_is_gold=dict(
                colors={'White', 'Blue'}
            )
        ))

        self.assertHeuristicsMatch('Thornscape Battlemage', dict(
            off_color_kicker_is_gold=dict(
                colors={'White', 'Red', 'Green'}
            )
        ))

    @unittest.expectedFailure
    def test_handle_always_paying_kicker(self):
        self.assertHeuristicsMatch('Gatekeeper of Malakir', dict(
            always_kick_creatures=dict(
                mana_cost=['B', 'B', 'B'],
                converted_mana_cost=3
            ),
            always_kick=dict(
                mana_cost=['B', 'B', 'B'],
                converted_mana_cost=3
            ),
        ))

        self.assertHeuristicsMatch('Dismantling Blow', dict(
            always_kick=dict(
                mana_cost=['4', 'W', 'B'],
                converted_mana_cost=3,
                colors={'White', 'Blue'}
            ),
        ))

        self.assertHeuristicsMatch('Thornscape Battlemage', dict(
            always_kick_creatures=dict(
                mana_cost=['B', 'B', 'B'],
                converted_mana_cost=5
            ),
            always_kick=dict(
                mana_cost=['2', 'W', 'R', 'G'],
                converted_mana_cost=5
            ),
        ))

    def test_handle_living_weapon(self):
        self.assertHeuristicsMatch('Batterskull', dict(
            living_weapon_means_creature=dict(
                types=["Artifact", "Creature"]
            ),
        ))


        self.assertHeuristicsMatch('Lashwrithe', dict(
            living_weapon_means_creature=dict(
                types=["Artifact", "Creature"]
            ),
        ))

    @unittest.expectedFailure
    def test_multikicker_means_x_spell(self):
        self.assertHeuristicsMatch('Everflowing Chalice', dict(
            living_weapon_means_creature=dict(
                mana_cost=['X'],
                converted_mana_cost=-1
            ),
        ))

        self.assertHeuristicsMatch('Skitter of Lizards', dict(
            multikicker_means=dict(
                mana_cost=['X', 'R'],
                converted_mana_cost=-1
            ),
        ))

    @unittest.expectedFailure
    def test_morph(self):
        self.assertHeuristicsMatch('Exalted Angel', dict(
            morph_cost_as_cmc=dict(
                converted_mana_cost=3
            ),
        ))

        self.assertHeuristicsMatch('Bane of the Living', dict(
            morph_cost_as_cmc=dict(
                converted_mana_cost=3
            ),
        ))

        # pay 5 life
        self.assertHeuristicsMatch('Zombie Cutthroat', dict(
            morph_cost_as_cmc=dict(
                converted_mana_cost=3
            ),
            unmorph_affects_color=dict(
                colors={}
            ),
        ))

        # discard a card
        self.assertHeuristicsMatch('Gathan Raiders', dict(
            morph_cost_as_cmc=dict(
                converted_mana_cost=3
            ),
            unmorph_affects_color=dict(
                colors={}
            ),
        ))

        # discard a zombie card
        self.assertHeuristicsMatch('Putrid Raptor', dict(
            unmorph_affects_color=dict(
                colors={}
            ),
        ))

    @unittest.expectedFailure
    def test_token_generators_count_as_creatures(self):
        self.assertHeuristicsMatch('Lingering Souls', dict(
            token_spells_are_creatures=dict(
                types=['Sorcery', 'Creature']
            )
        ))

        self.assertHeuristicsMatch('Midnight Haunting', dict(
            token_spells_are_creatures=dict(
                types=['Instant', 'Creature']
            )
        ))

    def test_cycling_as_mana_cost(self):
        self.assertHeuristicsMatch('Decree of Pain', dict(
            use_cycling_cost_as_mana_cost_for_triggered_abilities=dict(
                converted_mana_cost=5,
                mana_cost=['3', 'B', 'B']
            )
        ))

        self.assertHeuristicsMatch('Decree of Justice', dict(
            use_cycling_cost_as_mana_cost_for_triggered_abilities=dict(
                mana_cost=['X', '2', 'W'],
                converted_mana_cost=None
            )
        ))

        # regular cycling cards don't count
        self.assertHeuristicsMatch('Miscalculation', {},
            'use_cycling_as_mana_cost_when_there_are_effects')

    @unittest.expectedFailure
    def test_activated_abilities_affect_color(self):

        self.assertHeuristicsMatch('Kessig Wolf Run', dict(
            activated_ability_costs_affect_color=dict(
                colors={'Red', 'Green'}
            )
        ))

        self.assertHeuristicsMatch('Shelldock Isle', dict(
            activated_ability_costs_affect_color=dict(
                colors={'Blue'}
            )
        ))

        self.assertHeuristicsMatch('Creeping Tar Pit', dict(
            activated_ability_costs_affect_color=dict(
                colors={'Blue', 'Black'}
            )
        ))

        self.assertHeuristicsMatch('Crystal Shard', dict(
            activated_ability_costs_affect_color=dict(
                colors={'Blue'}
            )
        ))

        self.assertHeuristicsMatch('Spellskite', dict(
            activated_ability_costs_affect_color_do_not_pay_phyrexian=dict(
                colors={'Blue'}
            )
        ))

        self.assertHeuristicsMatch('Vedalken Shackles', dict(
            activated_abilites_caring_about_land_types_affect_color=dict(
                colors={'Blue'}
            )
        ))

    def test_mono_color_hybrids_have_modified_cmc(self):
        self.assertHeuristicsMatch('Spectral Procession', dict(
            assume_on_color_cmc_for_mono_color_hybrids=dict(
                converted_mana_cost=3
            )
        ))

        self.assertHeuristicsMatch('Flame Javelin', dict(
            assume_on_color_cmc_for_mono_color_hybrids=dict(
                converted_mana_cost=3
            )
        ))

    def test_caring_about_land_types_affects_color(self):

        self.assertHeuristicsMatch('Wild Nacatl', dict(
            caring_about_controlling_land_types_affect_color=dict(
                colors={'White', 'Red', 'Green'}
            )
        ))

        self.assertHeuristicsMatch('Crimson Muckwader', dict(
            caring_about_controlling_land_types_affect_color=dict(
                colors={'Black', 'Red'}
            )
        ))

        self.assertHeuristicsMatch('Kird Ape', dict(
            caring_about_controlling_land_types_affect_color=dict(
                colors={'Red', 'Green'}
            )
        ))

    def test_affinity_for_basic_land_type(self):

        self.assertHeuristicsMatch('Razor Golem', dict(
            affinity_for_basic_lands_affect_cmc=dict(
                converted_mana_cost = 3
            )
        ))

        self.assertHeuristicsMatch('Dross Golem', dict(
            affinity_for_basic_lands_affect_cmc=dict(
                converted_mana_cost = 3
            )
        ))

    @unittest.expectedFailure
    def test_suspend_as_mana_cost(self):

        self.assertHeuristicsMatch('Greater Gargadon', dict(
            affinity_for_basic_lands_affect_cmc=dict(
                converted_mana_cost = 1,
                mana_cost = ['R']
            )
        ))

        self.assertHeuristicsMatch('Ancestral Vision', dict(
            affinity_for_basic_lands_affect_cmc=dict(
                converted_mana_cost = 1,
                mana_cost = ['U']
            )
        ))


