import os

from django.http import HttpResponse, Http404
from django.views.generic import ListView
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext

from cube_viewer.models import Cube

__here__ = os.path.abspath(os.path.dirname(__file__))

class CubeView(ListView):
    template_name = "cube_view.html"

    model = Cube
    context_object_name = 'cubes'

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

    if request.method == 'GET':
        message = "This is an XHR GET request"
    elif request.method == 'POST':
        message = "This is an XHR POST request"
        # Here we can access the POST data
        print request.POST
    else:
        message = 'unknown message type'

    return HttpResponse(message)

#    cube = get_object_or_404(Cube, pk=id)
#
#    return HttpResponse(json.dumps({
#        card.name: card.as_dict() for card in cube.cards
#    }), mimetype="application/json")

def run_test(request, unit_test_name='test'):

    return render_to_response('test.html', dict(
        unit_test_name=unit_test_name
    ), context_instance=RequestContext(request))