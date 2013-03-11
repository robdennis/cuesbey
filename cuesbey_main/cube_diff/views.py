import collections
import json
import os

from django.http import HttpResponse, Http404

from cuesbey_main.cube_diff.models import Cube, get_cards_from_names

__here__ = os.path.abspath(os.path.dirname(__file__))


def card_contents(request):
    if not request.is_ajax():
        raise Http404

    try:
        all_card_names = json.loads(request.body)['card_names']
    except ValueError:
        raise ValueError("problem with %r" % request.body)

    def append_cards(card_names):
        invalid_names = []
        cards = [c.as_dict() for c in get_cards_from_names(card_names)]
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
