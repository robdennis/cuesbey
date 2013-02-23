import collections
import json
import os

from django.http import HttpResponse, Http404

from cuesbey_main.cube_diff import CardFetchingError
from cuesbey_main.cube_diff.models import Cube, make_and_insert_card

__here__ = os.path.abspath(os.path.dirname(__file__))


def card_contents(request):
    if not request.is_ajax():
        return Http404

    try:
        all_card_names = json.loads(request.body)['card_names']
    except ValueError:
        return HttpResponse(
            {},
            mimetype="application/json"
        )

    def append_cards(card_names):
        cards = []
        invalid_names = []
        for card_name in card_names:
            try:
                cards.append(make_and_insert_card(card_name).as_dict())
            except CardFetchingError:
                invalid_names.append(card_name)
        return dict(cards=cards, invalid_names=invalid_names)

    if isinstance(all_card_names, collections.Mapping):
        response = Cube.serialize({
            category: append_cards(names)
            for category, names in all_card_names.iteritems()
        })
    else:
        response = Cube.serialize(append_cards(all_card_names))

    return HttpResponse(
        response,
        mimetype="application/json"
    )
