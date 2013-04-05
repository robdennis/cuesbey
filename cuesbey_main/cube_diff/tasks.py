from cuesbey_main.cube_diff.models import Cube, insert_cards

from celery import task, current_task

# noinspection PyCallingNonCallable
@task(name="tasks.async_get_cards")
def async_get_cards(names_to_insert):
    """
    perform the asynchronous task of getting cards given names
    """

    results = insert_cards(*names_to_insert)
    results['cards'] = results['inserted'] + results['refetched']

    return results

