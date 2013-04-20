import json
import os
import uuid


from django.db import transaction
from django.db.models import F
from django.conf import settings
from django.http import HttpResponse, Http404
from celery.result import AsyncResult

from cuesbey_main.cube_diff.models import (Cube, Card,
                                           retrieve_cards_from_names,
                                           LinkedDiff)
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
        json.dumps([
            dict(key=k, checked=v.checked)
            for k, v in Card.get_all_heuristics().iteritems()
        ]),
        mimetype="application/json"
    )


def blindly_return_cube_diff(request):
    # TODO: this seems like it's unnecessary
    # but need to figure how else to serve a static html file that has
    # things linked right
    return HttpResponse(
        open(os.path.normpath(
            os.path.join(__here__, 'app', 'index.html'))
        ).read(),
        mimetype='text/html'
    )


@transaction.commit_on_success
def get_diff_link_id(request):
    """
    The expect contents of this request is = {
        'before': ['card_name', 'card_name'*], # duplicates allowed
        'after': ['card_name', 'card_name'*], # duplicates allowed
        'spec': "<spec string>",
        'heuristics': ['checked_heuristic_key', 'checked_heuristic_key'*],
    }

    response = {
        'cards': [{serialized card}, {serialized card}*], # duplicates allowed
        'insert_job': 'job_id' # to get the results of async insert
    }
    """

    if not request.is_ajax():
        raise Http404

    try:
        incoming = json.loads(request.body)
    except ValueError:
        raise ValueError("problem with %r" % request.body)

    link = LinkedDiff(
        **{k: v for k, v in incoming.iteritems()
        if k in ('before', 'after', 'spec', 'heuristics')
    })
    external_id = uuid.uuid4()
    # this seems unnecessary, but just passing the attribute meant
    # there were no dashes?
    # TODO: perhaps a different flavor of UUID fields could be better here
    link.external_link = external_id
    link.save()

    return HttpResponse(str(external_id),
                        mimetype='application/json')


def get_diff(request, link_id):

    link = LinkedDiff.objects.get(external_link=link_id)
    link.links = F('links') + 1
    link.save()

    return HttpResponse(json.dumps(link.as_dict()),
                        mimetype='application/json')
