import json

from django.http import HttpResponse
from django.views.generic import ListView
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext

from cube_viewer.models import Cube

class CubeView(ListView):
    template_name = "cube_view.html"

    model = Cube
    context_object_name = 'cubes'

def details(request, id):

    cube = get_object_or_404(Cube, pk=id)

    return render_to_response('cube_detail.html', dict(
        cube=cube
    ), context_instance=RequestContext(request))

def cube_contents(request, id):

    cube = get_object_or_404(Cube, pk=id)

    return HttpResponse(json.dumps({
        card.name: card.as_dict() for card in cube.cards
    }), mimetype="application/json")

def run_test(request, unit_test_name='test'):

    return render_to_response('test.html', dict(
        unit_test_name=unit_test_name
    ), context_instance=RequestContext(request))