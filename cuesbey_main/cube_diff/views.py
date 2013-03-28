import collections
import json
import os

from time import sleep

from django.http import HttpResponse, Http404

from celery import task, current_task
from celery.result import AsyncResult

from cuesbey_main.cube_diff.models import Cube, Card, get_cards_from_names

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

    job = async_get_cards.delay(all_card_names)

    return HttpResponse(
        response,
        mimetype="application/json"
    )

# noinspection PyCallingNonCallable
@task()
def async_get_cards(all_card_names):
    """
    perform the asynchronous task of getting cards given names
    """
    for i in range(100):
        sleep(0.1)
        current_task.update_state(state='PROGRESS',
                                  meta={'current': i, 'total': 100})


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
    return HttpResponse(json.dumps(data), mimetype='application/json')

def available_heuristics(request):

    return HttpResponse(
        #TODO: consider how ths actually should be
        json.dumps([dict(key=k) for k, v in Card.get_all_heuristics().iteritems()]),
        mimetype="application/json"
    )
