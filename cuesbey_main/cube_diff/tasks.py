import redis

from cuesbey_main.cube_diff.models import insert_cards
from celery import task, current_task

# noinspection PyCallingNonCallable
@task(name="tasks.async_get_cards")
def async_get_cards(names_to_insert, redis_settings):
    """
    perform the asynchronous task of getting cards given names
    """
    redis_conn = redis.StrictRedis(**redis_settings)
    results = insert_cards(names_to_insert, redis_conn)
    results['cards'] = {
        c.name: c for c in results.get('inserted', []) +
                           results.get('refetched', [])
    }

    return results

