import logging
import slumber
from slumber.exceptions import HttpClientError

def get_json_card_content(name):
    """
    Get the card's json content, DEPENDS ON AN INSTALLED AND RUNNING TUTOR
    INSTALLATION on localhost:3000
    """
    #Todo: the tutor thread needs to be started alongside cuesby

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

    api = slumber.API('http://localhost:3000')
    name = name.strip()
    try:
        actual = api.card(name).get()
    except HttpClientError as e:
        if e.response.status_code == 404:
            return None
        else:
            logging.exception('problem with cardname: %s', name)
            raise

    for act_key, act_val in actual.iteritems():
        # limit what's returned to a whitelist of the above
        if act_key in comprehensive:
            comprehensive[act_key] = act_val

    return comprehensive