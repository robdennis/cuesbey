import collections
import json
from django.views.decorators.csrf import csrf_protect
import os

from django.http import HttpResponse, Http404
from django.views.generic import ListView
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext

from cuesbey_main.cube_diff import CardFetchingError
from cuesbey_main.cube_diff.models import Cube, make_and_insert_card
from cuesbey_main.cube_diff.autolog import log

__here__ = os.path.abspath(os.path.dirname(__file__))

class CubeView(ListView):
    template_name = "cube_view.html"

    model = Cube
    context_object_name = 'cubes'

def diff(request):

    return render_to_response("diff.html", context_instance=RequestContext(request))

def details(request, id):

    cube = get_object_or_404(Cube, pk=id)

    return render_to_response('cube_detail.html', dict(
        cube=cube
    ), context_instance=RequestContext(request))

def cube_contents(request, file_name=None):

    if file_name:
        with open(os.path.join(__here__, file_name), 'rb') as json:
            return HttpResponse(json.read(), mimetype="application/json")

    if not request.is_ajax():
        raise Http404
    log.debug(request.method)
    if request.method == 'GET':
        id = request.GET['cube_id']
    elif request.method == 'POST':
        id = request.POST['cube_id']
    else:
        raise Http404

    cube = get_object_or_404(Cube, pk=id)

    return HttpResponse(Cube.serialize(cube),
        mimetype="application/json")

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
            category:append_cards(names)
            for category,names in all_card_names.iteritems()
        })
    else:
        response = Cube.serialize(append_cards(all_card_names))

    return HttpResponse(
        response,
        mimetype="application/json"
    )

