# -*- coding: utf-8 -*-
from __future__ import print_function, unicode_literals

import itertools

def print_accordions(qs1, qs2):
    def print_accordion(title, items):
        print("%s (%d)" % (title, len(items)))
        for item in items:
            print("- %s" % item.name)
            
    print_accordion("Unchanged", get_unchanged(qs1, qs2))
    print_accordion("Added", get_added(qs1, qs2))
    print_accordion("Removed", get_removed(qs1, qs2))
    
def get_unchanged(qs1, qs2):
    return [element for element in qs1 if element in qs2]

def get_added(qs1, qs2):
    return [element for element in qs2 if element not in qs1]

def get_removed(qs1, qs2):
    return [element for element in qs1 if element not in qs2]

def get_at_mana_cost(cube, cols):
    assert len(cols) > 2
    return list(itertools.chain([cube.filter(converted_mana_cost__lte=cols[0])], [
    cube.filter(converted_mana_cost=c) for c in cols[1:-1]
    ], [cube.filter(converted_mana_cost__gte=cols[-1])]))

def _print_mockup(c1, c2, cmcs):

    table = [[str(c)] for c in cmcs]

    for c1_cards_at_cmc, c2_cards_at_cmc, table_col in zip(get_at_mana_cost(c1, cmcs),
        get_at_mana_cost(c2, cmcs),
        table):

        _cards_at_cmc = c1_cards_at_cmc, c2_cards_at_cmc
        table_col.extend(
            ['[%s]' % card.name.replace(',', '\,') for card in get_unchanged(*_cards_at_cmc)]
        )
        table_col.extend(
            ['+ *[%s]*' % card.name.replace(',', '\,') for card in get_added(*_cards_at_cmc)]
        )
        table_col.extend(
            ['- *[%s]*' % card.name.replace(',', '\,') for card in get_removed(*_cards_at_cmc)]
        )

    for row_items in itertools.izip_longest(*table, fillvalue=' '):
        print(','.join(row_items))

def _print_html(c1, c2, cmcs):

    table = [[str(c)] for c in cmcs]

    for c1_cards_at_cmc, c2_cards_at_cmc, table_col in zip(get_at_mana_cost(c1, cmcs),
        get_at_mana_cost(c2, cmcs),
        table):

        _cards_at_cmc = c1_cards_at_cmc, c2_cards_at_cmc
        table_col.extend(
            ['%s' % card.name for card in get_unchanged(*_cards_at_cmc)]
        )
        table_col.extend(
            ['+ %s' % card.name for card in get_added(*_cards_at_cmc)]
        )
        table_col.extend(
            ['- %s' % card.name for card in get_removed(*_cards_at_cmc)]
        )

    print('\t<table border="1">')
    for row_items in itertools.izip_longest(*table, fillvalue=' '):
        print('\t\t<tr>')
        for item in row_items:
            print('\t\t\t<td>%s</td>' % item)
        print('\t\t</tr>')
    print('\t</table>')

def print_table(cube1, cube2, color, print_func):
    colors = {'W', 'U', 'B', 'R', 'G'}
    
    unselected_colors = colors - set(color)
    
    def get_colors(cube):
        
        cube_cards = cube.cards.filter(mana_cost__contains=color)
        for exclude_color in unselected_colors:
            cube_cards = cube_cards.exclude(mana_cost__contains=exclude_color)
            
        return cube_cards
        
    cube1_cards = get_colors(cube1)
    cube2_cards = get_colors(cube2) 
    
#    print("All Added: {!r}".format(get_added(cube1_cards, cube2_cards)))
#    print("All Removed: {!r}".format(get_removed(cube1_cards, cube2_cards)))

    # cube2_cards.filter(types__contains="Creature")

    print("Creature")
    print_func(cube1_cards.filter(types__contains="Creature"), cube2_cards.filter(types__contains="Creature"), cmcs= (1,2,3,4,5,6))
    print("Non-Creature")
    print_func(cube1_cards.exclude(types__contains="Creature"), cube2_cards.exclude(types__contains="Creature"), cmcs= (1,2,3,4,5,6))
        


"""
# avr
mods.Cube.objects.get(pk=1)
# og
mods.Cube.objects.get(pk=3)
"""

if __name__ == '__main__':
    from cuesbey_main.cube_diff.models import Cube

    for idx, init in enumerate(('W', 'U', 'B', 'R', 'G'), start=1):
        print('<div id="tabs-%d">' % idx)
        print_table(Cube.objects.get(pk=3), Cube.objects.get(pk=1), init, _print_html)
        print('</div>')