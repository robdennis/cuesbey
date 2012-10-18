from __future__ import absolute_import
import re

import slumber
from slumber.exceptions import HttpClientError

from cuesbey_main.cube_viewer.autolog import log

color_mappings = dict((
    ('W', 'White'),
    ('U', 'Blue'),
    ('B', 'Black'),
    ('R', 'Red'),
    ('G', 'Green'),
    ))
basic_land_mappings = dict(
    Plains='W',
    Islands='U',
    Island='U',
    Swamps='B',
    Swamp='B',
    Mountains='R',
    Mountain='R',
    Forests='G',
    Forest='G'
)

hybrid_mappings = {
    'W/U': 'azorious',
    'W/B': 'orzhov',
    'R/W': 'boros',
    'G/W': 'selesnya',
    'U/R': 'izzet',
    'B/R': 'rakdos',
    'B/G': 'golgari',
    'U/B': 'dmir',
    'G/U': 'simic',
    'R/G': 'gruul',
}

def parse_mana_cost(mana_cost):
    parsed_mc = re.findall(r'\{(.+?)\}', mana_cost)
    log.debug('parsed_mana_cost {!r} to {!r}', mana_cost, parsed_mc)
    return parsed_mc

def estimate_cmc(parsed_mana_cost):
    """
    this is not going to handle non-standard mana symbols that are not
    1 CMC per symbol. Deal with it.
    :param parsed_mana_cost:
    :return: estimated converted mana cost as an integer (None if an X-spell)
    :rtype: int or None
    """

    if 'X' in parsed_mana_cost:
        return None

    count = 0
    for sym in parsed_mana_cost:
        if sym.isdigit():
            count += int(sym)
        else:
            count += 1

    return count

def get_mana_symbol_bitfields(parsed_mana_cost):
    from cuesbey_main.cube_viewer.models import Card

    def _get_color_flags(bitfield, template='{}', keys=None, flag_name_map=None):

        if keys is None:
            keys = color_mappings.keys()

        if flag_name_map is None:
            flag_name_map = color_mappings

        starting_flag = 0
        for key in keys:
#            log.debug('checking for {} in {}', template.format(key), parsed_mana_cost)
            if template.format(key) in parsed_mana_cost:
                value = flag_name_map[key].lower()
#                log.debug('found for: {}', value)
                starting_flag |= getattr(bitfield, value)
#                log.debug('flag: {}', starting_flag)

        return starting_flag

    def _get_color_flags_from_hybrids():
        starting_flag = 0
        for key in hybrid_mappings:
            if key in parsed_mana_cost:
                colors = [color_mappings[c].lower() for c in key.split('/')]
                # this isn't really handling the case where there's
                # an azorious AND an rakdos hybrid mana in the same card
                # which does not exist in magic
                for color in colors:
                    starting_flag |= getattr(Card._hybrid_mana_bitfield, color)

        return starting_flag


    return dict(
        _standard_mana_bitfield = _get_color_flags(Card._standard_mana_bitfield),
        _mono_hybrid_mana_bitfield = _get_color_flags(Card._mono_hybrid_mana_bitfield, '2/{}'),
        _phyrexian_mana_bitfield = _get_color_flags(Card._phyrexian_mana_bitfield, '{}/P'),
        _hybrid_mana_bitfield = _get_color_flags_from_hybrids()
    )

def get_json_card_content(name):
    """
    Get the card's json content, DEPENDS ON AN INSTALLED AND RUNNING TUTOR
    INSTALLATION on localhost:3000
    """
    #Todo: the tutor thread needs to be started alongside cuesbey

    # since we are searching by name, we'll get specific formats mapping the
    # gatherer id number with the expansion information associated with that
    # card. As a result, concepts like artist, flavor text, don't have meaning
    # as a result
    comprehensive = dict.fromkeys([
        'name',
        'mana_cost',
        'converted_mana_cost',
        'types',
        'subtypes',
        'text',
        'color_indicator',
        'power',
        'toughness',
        'loyalty',
        'gatherer_url',
        'versions',
    ])

    log.debug('searching for cardname: %s', name)

    api = slumber.API('http://localhost:3000')
    try:
        actual = api.card(name).get()
    except HttpClientError as e:
        log.exception('problem with cardname: %r', name)
        raise

    for act_key, act_val in actual.iteritems():
        # limit what's returned to a whitelist of the above
        if act_key in comprehensive:
            comprehensive[act_key] = act_val

    if comprehensive.get('mana_cost'):
        # a string representing mana cost is converted to an array for the
        # purposes of importing into a postgres text array column
#        comprehensive['mana_cost'] = comprehensive['mana_cost']
        comprehensive['mana_cost'] = parse_mana_cost(comprehensive['mana_cost'])
        # keep multiples
        comprehensive.update(get_mana_symbol_bitfields(comprehensive['mana_cost']))

    color_indicator = comprehensive.get('color_indicator')
    if color_indicator and isinstance(color_indicator, basestring):
        comprehensive['color_indicator'] = comprehensive['color_indicator'].split(', ').sort()



    return comprehensive