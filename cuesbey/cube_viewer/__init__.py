import slumber

def get_json_card_content(name):
    """
    Get the card's json content, DEPENDS ON AN INSTALLED AND RUNNING TUTOR
    INSTALLATION on localhost:3000
    """
    #Todo: the tutor thread needs to be started alongside cuesby
    
    comprehensive = dict.fromkeys([
        'name',
        'mana_cost',
        'converted_mana_cost',
        'types',
        'subtypes',
        'text',
        'flavor_text',
        'flavor_text_attribution',
        'color_indicator',
        'watermark',
        'power',
        'toughness',
        'loyalty',
        'expansion',
        'rarity',
        'number',
        'artist',
        'gatherer_url',
        'versions',
        'rulings',
    ])

    api = slumber.API('http://localhost:3000')
    actual = api.card(name).get()
    comprehensive.update(actual)

    return comprehensive