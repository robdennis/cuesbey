from __future__ import absolute_import
import json
import re
import subprocess

from copy import deepcopy
from itertools import chain

from cuesbey_main.cube_diff.autolog import log
from cuesbey_main.cuesbey.settings import TUTOR_PATH


class CardFetchingError(Exception):
    """
    Unknown error fetching a particular card
    """
color_mappings = dict((
    ('W', 'White'),
    ('U', 'Blue'),
    ('B', 'Black'),
    ('R', 'Red'),
    ('G', 'Green')
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
    # log.debug('pre-merged: %r', costs)
    for cost in costs:
        if isinstance(cost, basestring):
            _cost = parse_mana_cost(cost)
        else:
            _cost = deepcopy(cost)
        # log.debug('merging cost: %r', _cost)
        if _cost is None:
            continue
        for sym in _cost:
            if sym.isdigit():
                digit += int(sym)
            else:
                merged_cost.append(sym)

    if digit:
        merged_cost.append(str(digit))
    # log.debug('merged: %r', merged_cost)

    def mana_cost_key(symbol):
        # X < colorless < W < U < B < R < G
        # log.debug('sorting %r', symbol)
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
    # log.debug('parsed_mana_cost {!r} to {!r}', mana_cost, parsed_mc)
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

    colors_found = [color_name
                    for abbrev, color_name in color_mappings.iteritems()
                    if abbrev in (mana_cost_text or '')]
    # log.debug('using: %s, found colors: %s', mana_cost_text, colors_found)

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


def _merge_split_cards(*split_names):
    """
    Merge togther multiple split cards

    :param split_names: an iterable of card names, e.g. ('Fire', 'Ice')
    :return: a dict representation of the merged card
    """

    cards = [_query_tutor_for_card_by_name(name)
                   for name in split_names]

    def _join_on_key(k, delimiter=' // '):
        return delimiter.join(unicode(card[k]) for card in cards)

    special_cases = dict(
        name=_join_on_key('name'),
        mana_cost=_join_on_key('mana_cost'),
        converted_mana_cost=-1,
        text=_join_on_key('text', '\n\n-----\n\n'),
    )

    # just use the foundation of the first card unless you are explicitly
    # merging
    return {k: special_cases.get(k, v) for k, v in cards[0].iteritems()}


def get_json_card_content(name):
    """
    Get the card's json content
    """

    if '/' in name:
        return _merge_split_cards(*re.split(r'\s*/+\s*', name))
    else:
        return _query_tutor_for_card_by_name(name)


def _query_tutor_for_card_by_name(name):
    """
    Depends on: installation of the tutor CLI, that path in settings,
    the path to node in your $PATH environment variable

    :param name: the card's name, which will be passed to tutor's command line
    :return: dict representation of the card from tutor
    """

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
        ])

    log.debug('searching for cardname: %r', name)

    try:
        actual = json.loads(subprocess.check_output([TUTOR_PATH,
                                                     'card',
                                                     '--format',
                                                     'json',
                                                     name]).strip())
    except subprocess.CalledProcessError:
        log.exception('problem with cardname: %r', name)
        raise CardFetchingError(u'unable to fetch a card '
                                u'with name: {!r}'.format(name))

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
                      comprehensive['_color_indicator'])
    except:
        log.exception('what happened?')
        raise

    return comprehensive