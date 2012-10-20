import re
from copy import deepcopy
from math import ceil

from cuesbey_main.cube_viewer import (parse_mana_cost, estimate_cmc,
                                      basic_land_mappings, color_mappings,
                                      merge_mana_costs, stitch_mana_cost,
                                      estimate_colors)

def _handle_monocolor_hybrid(card, h):
    if not card.mana_cost:
        return

    monocolor_hybrid_symbols = re.findall(r'\{2/(W|U|B|R|G)\}', card.mana_cost)
    if monocolor_hybrid_symbols:
        # there are some mono hybrid mana symbols (e.g. W/2) in the cost
        # and often, we consider them "on-curve" for their mono-colored
        # cost
        num_symbols = len(monocolor_hybrid_symbols)
        h['assume_on_color_cmc_for_mono_color_hybrids'] = dict(
            converted_mana_cost = card.converted_mana_cost - num_symbols
        )

def _handling_cycling_with_activated_abilities(card, h):

    cycling_match = re.search("\((?P<mana_cost>\{.+\}),\s+Discard this card\: Draw a card\.\)\n\nWhen you cycle %s(?:.+you may pay (?P<extra_cost>\{.+\}))?.+$" % card.name, card.text, re.I)
    if not cycling_match:
        return

    results = cycling_match.groupdict()
    parsed_cost = parse_mana_cost(results['mana_cost'])
    if results.get('extra_cost'):
        parsed_cost = merge_mana_costs(parsed_cost, results['extra_cost'])
    # this card has a triggered ability when cycled that could be considered as the "real" mana cost
    _cyc = dict(
        mana_cost=stitch_mana_cost(parsed_cost),
        converted_mana_cost=estimate_cmc(parsed_cost)
    )

    h['use_cycling_cost_as_mana_cost_for_triggered_abilities'] = _cyc

def _handle_affinity_for_basic_land(card, h):
    affinity_for_basic_land_match = re.search("Affinity for (Island|Plains|Mountains|Forests|Swamps)", card.text)
    if affinity_for_basic_land_match:
        # the idea is that for each land you play of the appropriate type
        # you have a mana, and it got cheaper
        h['affinity_for_basic_lands_affect_cmc'] = dict(
            converted_mana_cost=ceil(float(card.converted_mana_cost)/2)
        )

def _handle_living_weapon(card, h):
    if ('Equipment' in card.subtypes and
        'Living weapon' in card.text and
        'Creature' not in card.types):
        # Living Weapon is a relatively narrow mechanic, but Batterskull
        # is a near 100% play in standard cubes
        h['living_weapon_means_creature'] = dict(
            types=card.types + ['Creature']
        )

def _handle_caring_about_land_types(card, h):
    controlled_land_types_cared_about = re.findall("as long as you control a (Plains|Island|Swamp|Mountain|Forest)", card.text)

    def _get_colors_from_lands(lands):
        _land_colors = set()
        for land in controlled_land_types_cared_about:
            if land not in basic_land_mappings:
                continue
            _land_colors.add(color_mappings[basic_land_mappings[land]])
        return _land_colors

    if controlled_land_types_cared_about:
        controlled_land_types_cared_about = set(controlled_land_types_cared_about)
        modified_colors = card.colors | _get_colors_from_lands(controlled_land_types_cared_about)

        h['caring_about_controlling_land_types_affect_color'] = dict(
            colors=modified_colors
        )

    land_types_cared_about_in_abilities = re.findall(":.+(Plains|Islands|Swamps|Mountains|Forests) you control", card.text)
    if land_types_cared_about_in_abilities:
        controlled_land_types_cared_about = set(land_types_cared_about_in_abilities)
        modified_colors = card.colors | _get_colors_from_lands(land_types_cared_about_in_abilities)

        h['activated_abilites_caring_about_land_types_affect_color'] = dict(
            colors=modified_colors
        )

def _handle_phyrexian(card, h):
    if not card.mana_cost or not '/P' in card.mana_cost:
        return

    # the card has phryxian mana in the cost, which often means designers
    # will put in on curve as if people will always pay life
    heur_str = 'phyrexian_always_pays_life'
    ability_heur_str = heur_str + '_except_for_abilities'
    parsed_cost = parse_mana_cost(card.mana_cost)
    modified_cost = [sym for sym in parsed_cost if '/P' not in sym]

    h[heur_str]=dict(
        mana_cost=stitch_mana_cost(modified_cost),
        colors=card.estimate_colors(modified_cost)
    )
    if card.converted_mana_cost is not None:
        # phyrexian X spell?
        num_phyrexian_symbols = len(parsed_cost) - len(modified_cost)
        h[heur_str]['converted_mana_cost'] = (card.converted_mana_cost -
                                              num_phyrexian_symbols)

    h[ability_heur_str] = deepcopy(h[heur_str])

    all_costs = stitch_mana_cost(merge_mana_costs(card.activated_ability_mana_costs))
    if all_costs and '/P' in all_costs:
        h[ability_heur_str]['colors'] |= estimate_colors(all_costs)

def _handle_off_color_flashback(card, h):
    flashback_cost = re.search(r'Flashback (\{.+\}) \(You', card.text)
    if not flashback_cost:
        return
    flashback_colors = card.estimate_colors(flashback_cost.group(1), [])
    if flashback_cost and flashback_colors and flashback_colors != card.colors:
        h['off_color_flashback_is_gold'] = dict(
            colors=flashback_colors | card.colors
        )

def _handle_kicker(card, h):
    kicker_costs = re.search(r'Kicker (\{.+\})(?:\s+and/or (\{.+\}))* \(You', card.text)

    if not kicker_costs:
        return

    kicker_colors = set()
    kickers = kicker_costs.groups()

    for cost in kickers:
        kicker_colors |= card.estimate_colors(cost, [])

    updated_colors = kicker_colors | card.colors
    updated_cost = merge_mana_costs(card.mana_cost, *kickers)
    updated_cmc = estimate_cmc(updated_cost)

    full_dict = dict(
        mana_cost=stitch_mana_cost(updated_cost),
        converted_mana_cost=updated_cmc
    )

    if updated_colors != card.colors:
        full_dict['colors'] = updated_colors
        h['off_color_kicker_is_gold'] = dict(
            colors=updated_colors
        )

    h['always_kick'] = full_dict
    if 'Creature' in card.types:
        h['always_kick_creatures'] = full_dict

def _handle_token_generators(card, h):

    if (any([_type in card.types for _type in ['Instant', 'Sorcery']]) and
        'target' not in card.text.lower() and
        re.search('put[^\.]+creature tokens?[^\.]+ onto the battlefield\.', card.text, re.I)):

        h['token_spells_are_creatures'] = dict(
            types = card.types + ['Creature']
        )

def _handle_activated_abilities(card, h):

    merged = merge_mana_costs(*(card.activated_ability_mana_costs or []))
    phyrexian_activated = stitch_mana_cost([sym for sym in merged if 'P' in sym])
    non_phyrexian_activated = stitch_mana_cost([sym for sym in merged if 'P' not in sym])
    activated_colors = estimate_colors(merged)

    if phyrexian_activated:
        h['activated_ability_costs_affect_color_do_not_pay_phyrexian'] = dict(
            colors=estimate_colors(non_phyrexian_activated) | card.colors
        )

    if activated_colors and activated_colors != card.colors:
        h['activated_ability_costs_affect_color'] = dict(
            colors=activated_colors
        )


def get_heuristics(card):

    h = {}

    _handle_monocolor_hybrid(card, h)
    _handling_cycling_with_activated_abilities(card, h)
    _handle_affinity_for_basic_land(card, h)
    _handle_living_weapon(card, h)
    _handle_caring_about_land_types(card, h)
    _handle_phyrexian(card, h)
    _handle_off_color_flashback(card, h)
    _handle_kicker(card, h)
    _handle_token_generators(card, h)
    _handle_activated_abilities(card, h)

    return h
