from __future__ import absolute_import
import re

from copy import deepcopy

import slumber
from slumber.exceptions import HttpClientError

from cuesbey_main.cube_viewer.autolog import log

class CardFetchingError(Exception):
    """
    Unknown error fetching a particular card
    """

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

def merge_mana_costs(*costs):

    merged_cost = []
    digit = 0
    log.debug('pre-merged: %r', costs)
    for cost in costs:
        if isinstance(cost, basestring):
            _cost = parse_mana_cost(cost)
        else:
            _cost = deepcopy(cost)
        log.debug('merging cost: %r', _cost)
        if _cost is None:
            continue
        for sym in _cost:
            if sym.isdigit():
                digit += int(sym)
            else:
                merged_cost.append(sym)

    if digit:
        merged_cost.append(str(digit))
    log.debug('merged: %r', merged_cost)

    def mana_cost_key(symbol):
        # X < colorless < W < U < B < R < G
        log.debug('sorting %r', symbol)
        for idx, res in enumerate([symbol == 'X',
                                   symbol.isdigit(),
                                   'W' in symbol,
                                   'U' in symbol,
                                   'B' in symbol,
                                   'R' in symbol,
                                   'G' in symbol]):
            if res:
                return idx

    return sorted(merged_cost, key=mana_cost_key)


def parse_mana_cost(mana_cost):
    parsed_mc = re.findall(r'\{(.+?)\}', mana_cost)
    log.debug('parsed_mana_cost {!r} to {!r}', mana_cost, parsed_mc)
    return parsed_mc

def stitch_mana_cost(parsed_mana_cost):
    if not parsed_mana_cost:
        return None
    return ''.join('{%s}' % sym for sym in parsed_mana_cost)


def estimate_colors(mana_cost):
    if not isinstance(mana_cost, basestring):
        mana_cost_text = stitch_mana_cost(mana_cost)
    else:
        mana_cost_text = mana_cost

    colors_found = [color_name for abbrev, color_name in color_mappings.iteritems()
                    if abbrev in (mana_cost_text or '')]
    log.debug('using: %s, found colors: %s', mana_cost_text, colors_found)

    return set(colors_found)

def estimate_colors_from_lands(lands):
    _land_colors = set()
    if isinstance(lands, basestring):
        lands = [lands]

    for land in lands:
        if land not in basic_land_mappings:
            continue
        _land_colors.add(color_mappings[basic_land_mappings[land]])

    return _land_colors

def estimate_cmc(mana_cost):
    """
    this is not going to handle non-standard mana symbols that are not
    1 CMC per symbol. Deal with it.
    :param mana_cost:
    :return: estimated converted mana cost as an integer (None if an X-spell)
    :rtype: int or None
    """

    if isinstance(mana_cost, basestring):
        parsed_mana_cost = parse_mana_cost(mana_cost)
    else:
        parsed_mana_cost = mana_cost

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
        raise CardFetchingError(u'unable to fetch a card with name: {!r}'.format(name))


    for act_key, act_val in actual.iteritems():
        # limit what's returned to a whitelist of the above
        if act_key in comprehensive:
            comprehensive[act_key] = act_val

    # we're renaming this to _color_indicator and have a property for the set
    # equivalent
    color_indicator = comprehensive.pop('color_indicator', None)
    try:
        if color_indicator and isinstance(color_indicator, basestring):
            if ',' in color_indicator:
                comprehensive['_color_indicator'] = color_indicator.split(', ')
            else:
                comprehensive['_color_indicator'] = [color_indicator]

            log.debug('found a color indicator: %s -> %r',
                color_indicator,
                comprehensive['_color_indicator']
            )
    except:
        log.exception('what happened?')
        raise



    return comprehensive