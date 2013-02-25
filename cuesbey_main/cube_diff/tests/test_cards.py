# encoding: utf-8
import unittest

from django.test import TestCase
from cuesbey_main.cube_diff.models import Card, get_cards_from_names, Cube

from cuesbey_main.cube_diff import (parse_mana_cost, merge_mana_costs,
                                      CardFetchingError)

class BaseCardInserter(TestCase):
    """
    Used to reset the in-memory list of what was inserted
    """

    def tearDown(self):

        Card.reset_names_inserted()


class SimpleTest(BaseCardInserter):
    def test_create_cards_given_names(self):

        for name, expansion in (('Zealous Conscripts', 'Avacyn Restored'),
                                ('Stormbound Geist', 'Dark Ascension'),
                                ('Sylvan Library', 'Masters Edition')):

            # ensure that the card didn't already exist
            self.assertEqual([], list(Card.objects.filter(name=name).all()))
            fetched_card = Card.get(name)
            self.assertIsInstance(fetched_card, Card)
            self.assertIn(expansion,
                          [expansion.name
                           for expansion in fetched_card.expansions]
            )
            self.assertIn(fetched_card, Card.objects.all())

    def test_handle_bad_name(self):

        self.assertEqual([], get_cards_from_names('Lanowar Elf',
                                                  'Llanowar Elfs',
                                                  'Llan O\' War Elves'))

    def test_unicode_in_weird_spots(self):
        # weird unicode apostrophes from copying and pasting a cube list from
        # some random website
        for name, fixed_name in ((u'Moment\u2019s Peace', "Moment's Peace"),
                                 (u'Æther Adept', u'Æther Adept'),
                                 (u"Gideon’s Lawkeeper", "Gideon's Lawkeeper"),
                                 (u"Night’s Whisper", "Night's Whisper")):
            self.assertEqual(Card.get(name).name, fixed_name)

    def test_refetching_unicode_names_searched_with_ascii(self):
        # searches with ascii names sometimes return non-ascii results
        # and we want to make sure that's not a problem
        self.assertEqual(Card.get("AEther Vial").name, u'Æther Vial')
        self.assertEqual(Card.get("AEther Vial").name, u'Æther Vial')


    def test_handle_apostrophe_names(self):

        for name in ("Moment's Peace",
                     "Sensei's Divining Top"):
            self.assertEqual(Card.get(name).name, name)

    @unittest.expectedFailure
    def test_split_cards(self):
        for name, expansion in (('Fire//Ice', 'Apocalypse'),
                                ('Assault//Battery', 'Invasion'),
                                ('Supply//Demand', 'Dissension')):
            self.assertEqual([], list(Card.objects.filter(name=name).all()))
            fetched_card = Card.get(name)
            self.assertIsInstance(fetched_card, Card)
            self.assertIn(expansion, [expansion.name for expansion in fetched_card.expansions])
            self.assertIn(fetched_card, Card.objects.all())


class CardModelTest(BaseCardInserter):
    @classmethod
    def setUpClass(cls):

        cls.cards = get_cards_from_names(
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
        )

    def test_parse_mana_cost(self):
        self.assertEqual(['5'], parse_mana_cost("{5}"))
        self.assertEqual(['5'], Card.get('Batterskull').parsed_mana_cost)
        self.assertEqual(['3', 'U/R', 'B'], Card.get('Slave of Bolas').parsed_mana_cost)
        self.assertEqual(['3', 'U/P'], Card.get('Phyrexian Metamorph').parsed_mana_cost)

    def test_activated_abilities(self):
        self.assertEqual(['{1}{U}{B}'], Card.get('Creeping Tar Pit').activated_ability_mana_costs)
        self.assertEqual(['{W}', '{B}'], Card.get('Stormscape Apprentice').activated_ability_mana_costs)
        self.assertEqual(['{1}{G/P}'], Card.get('Birthing Pod').activated_ability_mana_costs)
        self.assertEqual(['{3}', '{U}'], Card.get('Crystal Shard').activated_ability_mana_costs)

    def test_handle_color_indicator(self):
        self.assertEqual({'Blue'}, Card.get('Ancestral Vision').colors)
        self.assertEqual({'Green'}, Card.get('Dryad Arbor').colors)
        self.assertEqual({'White', 'Blue', 'Black', 'Red', 'Green'},
            Card.get('Transguild Courier').colors)

    @unittest.expectedFailure
    def test_handle_null_color_indicator(self):
        self.assertEqual(set(), Card.get('Ghostfire').colors)


class HelpersTest(TestCase):

    def test_simple_cost_merge(self):

        self.assertEqual(merge_mana_costs(['B'], ['B', 'B']), ['B', 'B', 'B'])
        self.assertEqual(merge_mana_costs(['2', 'W'], ['R'], ['G']),
                                          ['2', 'W', 'R', 'G'])
        self.assertEqual(merge_mana_costs(['X'], ['2', 'W']), ['X', '2', 'W'])
        self.assertEqual(merge_mana_costs('{X}', '{2}{W}'), ['X', '2', 'W'])

class CardCategoryTest(BaseCardInserter):
    maxDiff = None

    def assertHeuristicsArePresent(self, name, expected_subset,
                                   keys_that_are_not_present=()):

        actual = Card.get(name).heuristics
        for k in keys_that_are_not_present:
            self.assertNotIn(k, actual)
        self.assertDictContainsSubset(expected_subset, actual)

    def test_handle_phyrexian(self):

        self.assertHeuristicsArePresent('Phyrexian Metamorph', dict(
            phyrexian_always_pays_life=dict(
                mana_cost='{3}',
                converted_mana_cost=3,
                colors=set()
            ),
            phyrexian_always_pays_life_except_for_abilities=dict(
                mana_cost='{3}',
                converted_mana_cost=3,
                colors=set()
            )
        ))

        self.assertHeuristicsArePresent('Porcelain Legionnaire', dict(
            phyrexian_always_pays_life=dict(
                mana_cost='{2}',
                converted_mana_cost=2,
                colors=set()
            ),
            phyrexian_always_pays_life_except_for_abilities=dict(
                mana_cost='{2}',
                converted_mana_cost=2,
                colors=set()
            )
        ))

        # cards that only have phyrexian mana for activated don't count
        # here
        self.assertHeuristicsArePresent('Spellskite', {},
            keys_that_are_not_present=[
                'phyrexian_always_pays_life',
                'phyrexian_always_pays_life_except_for_abilities',
            ]
        )

        self.assertHeuristicsArePresent('Birthing Pod', dict(
            phyrexian_always_pays_life=dict(
                mana_cost='{3}',
                converted_mana_cost=3,
                colors=set()
            ),
            phyrexian_always_pays_life_except_for_abilities=dict(
                mana_cost='{3}',
                converted_mana_cost=3,
                colors={'Green'}
            )
        ))

    def test_handle_off_color_flashback(self):
        self.assertHeuristicsArePresent('Lingering Souls', dict(
            off_color_flashback_is_gold=dict(
                colors={'White', 'Black'}
            )
        ))

    def test_handle_off_color_kicker(self):
        self.assertHeuristicsArePresent('Dismantling Blow', dict(
            off_color_kicker_is_gold=dict(
                colors={'White', 'Blue'}
            )
        ))

        self.assertHeuristicsArePresent('Thornscape Battlemage', dict(
            off_color_kicker_is_gold=dict(
                colors={'White', 'Red', 'Green'}
            )
        ))

    def test_handle_always_paying_kicker(self):
        self.assertHeuristicsArePresent('Gatekeeper of Malakir', dict(
            always_kick_creatures=dict(
                mana_cost='{B}{B}{B}',
                converted_mana_cost=3
            ),
            always_kick=dict(
                mana_cost='{B}{B}{B}',
                converted_mana_cost=3
            ),
        ))

        self.assertHeuristicsArePresent('Dismantling Blow', dict(
            always_kick=dict(
                mana_cost='{4}{W}{U}',
                converted_mana_cost=6,
                colors={'White', 'Blue'}
            ),
        ))

        self.assertHeuristicsArePresent('Thornscape Battlemage', dict(
            always_kick_creatures=dict(
                mana_cost='{2}{W}{R}{G}',
                colors={'White', 'Red', 'Green'},
                converted_mana_cost=5
            ),
            always_kick=dict(
                mana_cost='{2}{W}{R}{G}',
                colors={'White', 'Red', 'Green'},
                converted_mana_cost=5
            ),
        ))

    def test_handle_living_weapon(self):
        self.assertHeuristicsArePresent('Batterskull', dict(
            living_weapon_means_creature=dict(
                types=["Artifact", "Creature"]
            ),
        ))

        self.assertHeuristicsArePresent('Lashwrithe', dict(
            living_weapon_means_creature=dict(
                types=["Artifact", "Creature"]
            ),
        ))

    @unittest.expectedFailure
    def test_multikicker_means_x_spell(self):
        self.assertHeuristicsArePresent('Everflowing Chalice', dict(
            living_weapon_means_creature=dict(
                mana_cost='{X}',
                converted_mana_cost=-1
            ),
        ))

        self.assertHeuristicsArePresent('Skitter of Lizards', dict(
            multikicker_means=dict(
                mana_cost='{X}{R}',
                converted_mana_cost=-1
            ),
        ))

    @unittest.expectedFailure
    def test_morph(self):
        self.assertHeuristicsArePresent('Exalted Angel', dict(
            morph_cost_as_cmc=dict(
                converted_mana_cost=3
            ),
        ))

        self.assertHeuristicsArePresent('Bane of the Living', dict(
            morph_cost_as_cmc=dict(
                converted_mana_cost=3
            ),
        ))

        # pay 5 life
        self.assertHeuristicsArePresent('Zombie Cutthroat', dict(
            morph_cost_as_cmc=dict(
                converted_mana_cost=3
            ),
            unmorph_affects_color=dict(
                colors=set()
            ),
        ))

        # discard a card
        self.assertHeuristicsArePresent('Gathan Raiders', dict(
            morph_cost_as_cmc=dict(
                converted_mana_cost=3
            ),
            unmorph_affects_color=dict(
                colors=set()
            ),
        ))

        # discard a zombie card
        self.assertHeuristicsArePresent('Putrid Raptor', dict(
            unmorph_affects_color=dict(
                colors=set()
            ),
        ))

    def test_token_generators_count_as_creatures(self):
        self.assertHeuristicsArePresent('Lingering Souls', dict(
            token_spells_are_creatures=dict(
                types=['Sorcery', 'Creature']
            )
        ))

        self.assertHeuristicsArePresent('Midnight Haunting', dict(
            token_spells_are_creatures=dict(
                types=['Instant', 'Creature']
            )
        ))

        self.assertHeuristicsArePresent('Sarcomancy', dict(
            token_spells_are_creatures=dict(
                types=['Enchantment', 'Creature']
            )
        ))

        self.assertHeuristicsArePresent('Eyes in the Skies', dict(
            token_spells_are_creatures=dict(
                types=['Instant', 'Creature']
            )
        ))

        # things that target don't count
        self.assertHeuristicsArePresent('Sundering Growth', {},
            keys_that_are_not_present=['token_spells_are_creatures']
        )
        self.assertHeuristicsArePresent('Fists of Ironwood', {},
            keys_that_are_not_present=['token_spells_are_creatures']
        )

    def test_cycling_as_mana_cost(self):
        self.assertHeuristicsArePresent('Decree of Pain', dict(
            use_cycling_cost_as_mana_cost_for_triggered_abilities=dict(
                converted_mana_cost=5,
                mana_cost='{3}{B}{B}'
            )
        ))

        self.assertHeuristicsArePresent('Decree of Justice', dict(
            use_cycling_cost_as_mana_cost_for_triggered_abilities=dict(
                mana_cost='{X}{2}{W}',
                converted_mana_cost=None
            )
        ))

        # regular cycling cards don't count
        self.assertHeuristicsArePresent('Miscalculation', {},
            'use_cycling_as_mana_cost_when_there_are_effects')

    def test_activated_abilities_affect_color(self):

        self.assertHeuristicsArePresent('Kessig Wolf Run', dict(
            activated_ability_costs_affect_color=dict(
                colors={'Red', 'Green'}
            )
        ))

        self.assertHeuristicsArePresent('Shelldock Isle', dict(
            activated_ability_costs_affect_color=dict(
                colors={'Blue'}
            )
        ))

        self.assertHeuristicsArePresent('Creeping Tar Pit', dict(
            activated_ability_costs_affect_color=dict(
                colors={'Blue', 'Black'}
            )
        ))

        self.assertHeuristicsArePresent('Crystal Shard', dict(
            activated_ability_costs_affect_color=dict(
                colors={'Blue'}
            )
        ))

        self.assertHeuristicsArePresent('Spellskite', dict(
            activated_ability_costs_affect_color_do_not_pay_phyrexian=dict(
                colors=set()
            ),
            activated_ability_costs_affect_color=dict(
                colors={'Blue'}
            )
        ))

    def test_mono_color_hybrids_have_modified_cmc(self):
        self.assertHeuristicsArePresent('Spectral Procession', dict(
            assume_on_color_cmc_for_mono_color_hybrids=dict(
                converted_mana_cost=3
            )
        ))

        self.assertHeuristicsArePresent('Flame Javelin', dict(
            assume_on_color_cmc_for_mono_color_hybrids=dict(
                converted_mana_cost=3
            )
        ))

    def test_caring_about_land_types_affects_color(self):

        self.assertHeuristicsArePresent('Wild Nacatl', dict(
            caring_about_controlling_land_types_affect_color=dict(
                colors={'White', 'Red', 'Green'}
            )
        ))

        self.assertHeuristicsArePresent('Crimson Muckwader', dict(
            caring_about_controlling_land_types_affect_color=dict(
                colors={'Black', 'Red'}
            )
        ))

        self.assertHeuristicsArePresent('Kird Ape', dict(
            caring_about_controlling_land_types_affect_color=dict(
                colors={'Red', 'Green'}
            )
        ))

        self.assertHeuristicsArePresent('Vedalken Shackles', dict(
            caring_about_controlling_land_types_affect_color=dict(
                colors={'Blue'}
            )
        ))

    def test_affinity_for_basic_land_type(self):

            self.assertHeuristicsArePresent('Razor Golem', dict(
                affinity_for_basic_lands_affects_mana_cost=dict(
                    converted_mana_cost = 3,
                    colors = {'White'}
                )
            ))

            self.assertHeuristicsArePresent('Dross Golem', dict(
                affinity_for_basic_lands_affects_mana_cost=dict(
                    converted_mana_cost = 3,
                    colors = {'Black'}
                )
            ))

    def test_suspend_as_mana_cost(self):

        self.assertHeuristicsArePresent('Greater Gargadon', dict(
            suspend_as_cmc=dict(
                converted_mana_cost = 1,
                mana_cost = '{R}'
            )
        ))

        self.assertHeuristicsArePresent('Ancestral Vision', dict(
            suspend_as_cmc=dict(
                converted_mana_cost = 1,
                mana_cost = '{U}')
        ))


