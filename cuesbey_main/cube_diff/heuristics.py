import abc
import re
from copy import deepcopy
from itertools import chain
from math import ceil

from cuesbey_main.cube_diff import (parse_mana_cost, estimate_cmc,
                                    merge_mana_costs, stitch_mana_cost,
                                    estimate_colors,
                                    estimate_colors_from_lands)
from cuesbey_main.cube_diff.autolog import log


class HeuristicsHandler(object):
    """
    handler for helping specify what tweaks a designer might use in laying
    out their cube
    """
    __meta__ = abc.ABCMeta

    checked = True

    @abc.abstractproperty
    def key(self):
        """
        the key name of this heuristic as a key
        """
        return 'unset_name'

    @abc.abstractmethod
    def get(self, card):
        """
        :param card: the card we're checking
        :return: the matching heuristics as a dict or None if the
            heuristic does not apply
        """
        return {}

    @classmethod
    def as_dict(cls):
        return dict(key=cls.key, checked=cls.checked)


class _handle_x_spells_are_infinite_mana(HeuristicsHandler):
    key = 'x_spells_are_infinite'

    @classmethod
    def get(cls, card):
        """
        Laying out a cube often has an x-spell count as a an infinitely
        expensive card instead of the 'actual' converted mana cost
        """
        if card.mana_cost and 'X' in card.mana_cost:
            return {
                # -1 let's me keep the CMC column an int and the GUI
                # knows how to handle it
                cls.key: dict(converted_mana_cost=-1)
            }


class _handle_monocolor_hybrid(HeuristicsHandler):
    key = 'assume_on_color_cmc_for_mono_color_hybrids'

    @classmethod
    def get(cls, card):
        """
        there are some mono hybrid mana symbols (e.g. W/2) in the cost
        and often, we consider them "on-curve" for their mono-colored cost
        """
        if not card.mana_cost:
            return

        monocolor_hybrid_symbols = re.findall(r'\{2/(W|U|B|R|G)\}',
                                              card.mana_cost)
        if monocolor_hybrid_symbols:
            num_symbols = len(monocolor_hybrid_symbols)
            return {
                cls.key: dict(
                    converted_mana_cost=card.converted_mana_cost - num_symbols
                )
            }


class _handling_cycling_with_activated_abilities(HeuristicsHandler):
    key = 'use_cycling_cost_as_mana_cost_for_triggered_abilities'

    @classmethod
    def get(cls, card):
        """
        this card has a triggered ability when cycled that could be
        considered as the "real" mana cost
        """
        cycling_text = (r"\((?P<mana_cost>\{.+\}),\s+"
                        r"Discard this card\: Draw a card\.\)\n\n"
                        r"When you cycle %s(?:.+"
                        r"you may pay (?P<extra_cost>\{.+\}))?.+$" % card.name)
        cycling_match = re.search(cycling_text, card.text, re.I)
        if not cycling_match:
            return

        results = cycling_match.groupdict()
        parsed_cost = parse_mana_cost(results['mana_cost'])
        if results.get('extra_cost'):
            parsed_cost = merge_mana_costs(parsed_cost, results['extra_cost'])

        _cyc = dict(
            mana_cost=stitch_mana_cost(parsed_cost),
            converted_mana_cost=estimate_cmc(parsed_cost)
        )

        return {
            cls.key: _cyc
        }


class _handle_affinity_for_basic_land(HeuristicsHandler):
    key = 'affinity_for_basic_lands_affects_mana_cost'

    @classmethod
    def get(cls, card):
        """
        the idea is that for each land you play of the appropriate type
        you have a mana, and it gets cheaper. This is most common in pauper
        cubes and it often gets laid out on curve as the player has all basics
        of the appropriate type.
        """

        affinity_for_basic_land_match = re.search(
            "Affinity for (Island|Plains|Mountains|Forests|Swamps)", card.text
        )
        if affinity_for_basic_land_match:
            land_cared_about = affinity_for_basic_land_match.group(1)
            land_color = estimate_colors_from_lands([land_cared_about])

            heuristic = dict(
                converted_mana_cost=int(
                    ceil(float(card.converted_mana_cost) / 2)
                )
            )

            if land_color != card.colors:
                heuristic['colors'] = land_color | card.colors

            return {
                cls.key: heuristic
            }


class _handle_living_weapon(HeuristicsHandler):
    key = 'living_weapon_means_creature'

    @classmethod
    def get(cls, card):
        """
        Living Weapon is a relatively narrow mechanic, but Batterskull
        is a near 100% play in standard cubes and it plays as a creature
        """
        if ('Equipment' in card.subtypes and
                'Living weapon' in card.text and
                'Creature' not in card.types):

            return {
                cls.key: dict(types=card.types + ['Creature'])
            }


class _handle_caring_about_land_types(HeuristicsHandler):
    key = 'caring_about_controlling_land_types_affect_color'

    @classmethod
    def get(cls, card):
        """
        If a card is one color, but needs a different basic land type to get a
        boost, it's fair to say that only decks in both colors will want this
        card
        """
        land_names = "(Plains|Island|Swamp|Mountain|Forest)"
        plural_land_names = "(Plains|Islands|Swamps|Mountains|Forests)"
        controlled_lands = (
            re.findall("as long as you control a %s" % land_names, card.text) +
            re.findall("%s you control" % plural_land_names, card.text)
        )

        if any(controlled_lands):
            _land_colors = estimate_colors_from_lands(chain(controlled_lands))

            if _land_colors == card.colors:
                return

            modified_colors = card.colors | _land_colors

            return {
                cls.key: dict(colors=modified_colors)
            }


class _handle_phyrexian(HeuristicsHandler):
    key = 'phyrexian_always_pays_life'

    checked = False  # don't default to this being on

    @classmethod
    def get(cls, card):
        """
        if the card has phyrexian mana in the cost, often designers
        will put in on curve as if people will always pay life and put it in
        a colorless section
        """

        if not card.mana_cost or not '/P' in card.mana_cost:
            return

        parsed_cost = parse_mana_cost(card.mana_cost)
        modified_cost = [sym for sym in parsed_cost if '/P' not in sym]

        heuristic = dict(
            mana_cost=stitch_mana_cost(modified_cost),
            colors=card.estimate_colors(modified_cost)
        )

        num_phyrexian_symbols = len(parsed_cost) - len(modified_cost)
        heuristic['converted_mana_cost'] = (card.converted_mana_cost -
                                            num_phyrexian_symbols)

        return {
            cls.key: heuristic
        }


class _handle_phyrexian_abilities(HeuristicsHandler):
    key = _handle_phyrexian.key + '_except_for_abilities'

    @classmethod
    def get(cls, card):
        """
        but for cards that have phyrexian in their activated abilities, the
        re-occurring cost is a bit much to assume that you can avoid the
        color requirement for
        """
        phyrexian_result = _handle_phyrexian.get(card)
        all_costs = merge_mana_costs(card.activated_ability_mana_costs or [])

        phyrexian_symbols = [sym for sym in all_costs if '/P' in sym]
        # if not, there was no phyrexian anywhere
        if phyrexian_result or phyrexian_symbols:
            # copy whatever they had so far
            ability_result = deepcopy(
                (phyrexian_result or {}).get(_handle_phyrexian.key, {})
            )
            if all_costs and phyrexian_symbols:
                ability_result['colors'] = (
                    ability_result.get('colors', set()) |
                    estimate_colors(all_costs)
                )
                return {
                    cls.key: ability_result
                }


class _handle_off_color_flashback(HeuristicsHandler):
    key = 'off_color_flashback_is_gold'

    @classmethod
    def get(cls, card):
        """
        A card that needs two different colors to play, and then later
        flashback means that it's 'gold' for full value
        """
        flashback_cost = re.search(r'Flashback (\{.+\}) \(You', card.text)
        if not flashback_cost:
            return
        flashback_colors = card.estimate_colors(flashback_cost.group(1), [])
        if (flashback_cost and
                flashback_colors and
                flashback_colors != card.colors):
            return {
                cls.key: dict(colors=flashback_colors | card.colors)
            }


class kicker_mixin(object):

    @classmethod
    def _get_kicker_stuff(cls, card):
        kicker_costs = re.search(
            r'Kicker (\{.+\})(?:\s+and/or (\{.+\}))* \(You',
            card.text
        )
        if not kicker_costs:
            return {}

        kicker_colors = set()
        kickers = kicker_costs.groups()

        for cost in kickers:
            kicker_colors |= card.estimate_colors(cost, [])

        updated_cost = merge_mana_costs(card.mana_cost, *kickers)

        return dict(
            updated_colors=kicker_colors | card.colors,
            updated_cost=updated_cost,
            updated_cmc=estimate_cmc(updated_cost)
        )


class _handle_off_color_kicker(HeuristicsHandler, kicker_mixin):
    key = 'off_color_kicker_is_gold'

    @classmethod
    def get(cls, card):
        """
        If you need more than one color to get full value out of a card
        designers often place it in the multicolor section of their cube
        """

        kicker_result = cls._get_kicker_stuff(card)
        if not kicker_result:
            return

        updated_colors = kicker_result['updated_colors']
        if updated_colors != card.colors:
            return {
                cls.key: dict(colors=updated_colors)
            }


class _handle_always_kicking(HeuristicsHandler, kicker_mixin):
    key = 'always_kick'

    @classmethod
    def get(cls, card):
        """
        if designers know that players are going to kick a card all the time,
        then they'll lay it out at a cost and (maybe a color) based on that
        """

        kicker_result = cls._get_kicker_stuff(card)
        if not kicker_result:
            return

        full_dict = dict(
            mana_cost=stitch_mana_cost(kicker_result['updated_cost']),
            converted_mana_cost=kicker_result['updated_cmc']
        )

        # potentially change the colors
        off_color_result = _handle_off_color_kicker.get(card)
        if off_color_result:
            full_dict.update(off_color_result[_handle_off_color_kicker.key])

        return {
            cls.key: full_dict
        }


class _handle_always_kicking_creatures(HeuristicsHandler, kicker_mixin):
    key = 'always_kick_creatures'
    checked = False  # always kick probably takes precedence

    @classmethod
    def get(cls, card):
        """
        Some cube designers don't think of spells as must-kick, but
        they do creatures
        """

        kick_result = _handle_always_kicking.get(card)
        if kick_result:
            # go with whatever the normal kicking handler found
            return {
                cls.key: deepcopy(kick_result[_handle_always_kicking.key])
            }


class _handle_token_generators(HeuristicsHandler):
    key = 'token_spells_are_creatures'

    @classmethod
    def get(cls, card):
        """
        When designers lay out a section, they want a balance of creatures and
        non-creatures. Often, cards that make tokens but aren't creatures are
        treated as if they are
        """

        if not any(
            [_type in card.types
             for _type in ('Instant', 'Sorcery', 'Enchantment')]
        ):
            return

        # if the spell is targeted, it's probably too conditional to consider
        if 'Aura' in card.subtypes or 'target' in card.text.lower():
            return

        if re.search('put[^\.]+creature tokens?[^\.]+onto the battlefield',
                     card.text, re.I):
            return {
                cls.key: dict(types=card.types + ['Creature'])
            }


class _handle_activated_abilities(HeuristicsHandler):
    key = 'activated_ability_costs_affect_color'

    @classmethod
    def get(cls, card):
        """
        Cards that have activated abilities of different colors than their
        normal mana color (if it has a color) often have designers placing them
        in multicolored sections
        """
        merged = merge_mana_costs(*(card.activated_ability_mana_costs or []))
        activated_colors = estimate_colors(merged)

        # don't handle phyrexian, that comes later
        if (not any('/P' in sym for sym in merged) and
                activated_colors and  # there's color reqs in activation costs
                activated_colors != card.colors):  # and they're new
            return {
                cls.key: dict(colors=activated_colors | card.colors)
            }


class _handle_suspend(HeuristicsHandler):
    key = 'suspend_as_cmc'

    @classmethod
    def get(cls, card):
        """
        Some designers, when laying out the curves, place suspends out as if
        their CMC was the suspend cost
        """
        # \u2014 is the specific em-dash returned by tutor
        has_suspend = re.search(u"Suspend \d+\u2014(\{.+\}) \(", card.text)
        if not has_suspend:
            return

        mana_cost = has_suspend.group(1)

        suspend_heuristic  = dict(
            mana_cost=mana_cost,
            converted_mana_cost=estimate_cmc(mana_cost)
        )

        suspend_colors = estimate_colors(mana_cost)
        if suspend_colors != card.colors:
            suspend_heuristic['colors'] = card.colors | suspend_colors

        return {cls.key: suspend_heuristic}


_all_handlers = [
    _handle_x_spells_are_infinite_mana,
    _handle_monocolor_hybrid,
    _handling_cycling_with_activated_abilities,
    _handle_affinity_for_basic_land,
    _handle_living_weapon,
    _handle_caring_about_land_types,
    _handle_phyrexian,
    _handle_off_color_flashback,
    _handle_off_color_kicker,
    _handle_always_kicking,
    _handle_always_kicking_creatures,
    _handle_token_generators,
    _handle_activated_abilities,
    _handle_phyrexian_abilities,
    _handle_suspend,
]


def get_heuristics(card):

    h = {}
    if not card.text:
        # TODO: this may not be true, but it's definitely mostly true
        return
    try:
        for handler in _all_handlers:
            h.update(handler.get(card) or {})
    except:
        log.error('error getting heuristics for card: %r', card)
        raise

    return h


def get_available_heuristics():
    
    return {h.key: h for h in _all_handlers}