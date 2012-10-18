import re
from copy import deepcopy
from math import ceil

from cuesbey_main.cube_viewer import (parse_mana_cost, estimate_cmc,
                                      basic_land_mappings, color_mappings)

def get_heuristics(card):

    h = {}

    if card._mono_hybrid_mana_bitfield:
        # there are some mono hybrid mana symbols (e.g. W/2) in the cost
        # and often, we consider them "on-curve" for their mono-colored
        # cost
        num_symbols = len(re.findall(r'\{2/(W|U|B|R|G)\}', card.mana_cost_text))
        h['assume_on_color_cmc_for_mono_color_hybrids'] = dict(
            converted_mana_cost = card.converted_mana_cost - num_symbols
        )

    cycling_match = re.search("\((?P<mana_cost>(?:{.+})+),\s+Discard this card\: Draw a card\.\)\n\n(?P<cycle_text>When you cycle %s.+$)" % card.name, card.text)
    if cycling_match:
        #TODO: this is a relatively large amount of work unless there was some sort of cost merge
        if card.name == 'Decree of Justice':
            _cyc = dict(
                mana_cost=['X', '2', 'W'],
                converted_mana_cost=None
            )
        else:
            parsed_cost = parse_mana_cost(cycling_match.groupdict()['mana_cost'])
            # this card has a triggered ability when cycled that could be considered as the "real" mana cost
            _cyc = dict(
                mana_cost=parsed_cost,
                converted_mana_cost=estimate_cmc(parsed_cost)
            )

        h['use_cycling_cost_as_mana_cost_for_triggered_abilities'] = _cyc

    affinity_for_basic_land_match = re.search("Affinity for (Island|Plains|Mountains|Forests|Swamps)", card.text)
    if affinity_for_basic_land_match:
        # the idea is that for each land you play of the appropriate type
        # you have a mana, and it got cheaper
        h['affinity_for_basic_lands_affect_cmc'] = dict(
            converted_mana_cost=ceil(float(card.converted_mana_cost)/2)
        )

    if 'Equipment' in card.subtypes and 'Living weapon' in card.text:
        # Living Weapon is a relatively narrow mechanic, but Batterskull
        # is a near 100% play in standard cubes
        if 'Creature' not in card.types:
            h['living_weapon_means_creature'] = dict(
                types=card.types + ['Creature']
            )

    land_types_cared_about = re.findall("as long as you control a (Plains|Island|Swamp|Mountain|Forest)", card.text)
    if land_types_cared_about:
        land_types_cared_about = set(land_types_cared_about)
        modified_colors = deepcopy(card.colors)

        for land in land_types_cared_about:
            if land not in basic_land_mappings:
                continue
            modified_colors.add(color_mappings[basic_land_mappings[land]])

        h['caring_about_controlling_land_types_affect_color'] = dict(
            colors=modified_colors
        )



    return h
