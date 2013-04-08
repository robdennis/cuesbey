import json
import os

from django.conf import settings
from django.http import HttpResponse, Http404
from celery.result import AsyncResult

from cuesbey_main.cube_diff.models import Cube, Card, retrieve_cards_from_names
from tasks import async_get_cards

__here__ = os.path.abspath(os.path.dirname(__file__))


def card_contents(request):
    """
    The expect contents of this request is = {
        'card_names': ['card_name', 'card_name'*] # duplicates allowed
    }

    response = {
        'cards': [{serialized card}, {serialized card}*], # duplicates allowed
        'insert_job': 'job_id' # to get the results of async insert
    }
    """
    if not request.is_ajax():
        raise Http404

    try:
        all_card_names = json.loads(request.body)['card_names']
    except ValueError:
        raise ValueError("problem with %r" % request.body)

    fetched_cards, names_to_insert = retrieve_cards_from_names(all_card_names)

    response = {
        'cards': {c.name: c.as_dict() for c in fetched_cards},
        'mismatches': Card.get_mismatched_names_map()
    }

    if names_to_insert:
        insert_job = async_get_cards.delay(names_to_insert,
                                           settings.REDIS_INFORMATION)
        response['insert_job'] = insert_job.id


    return HttpResponse(
        Cube.serialize(response),
        mimetype="application/json"
    )


def poll_state(request):
    """
    A view to report the progress to the user
    """

    if 'job' in request.GET:
        job_id = request.GET['job']
    else:
        return HttpResponse('No job id given.')

    job = AsyncResult(job_id)
    data = job.result or job.state
    return HttpResponse(Cube.serialize(data), mimetype='application/json')

def available_heuristics(request):

    return HttpResponse(
        #TODO: consider how ths actually should be
        json.dumps([dict(key=k) for k in Card.get_all_heuristics()]),
        mimetype="application/json"
    )
