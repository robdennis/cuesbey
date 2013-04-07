import redis

from cuesbey_main.cube_diff.models import insert_cards, Cube
from celery import task, current_task

# noinspection PyCallingNonCallable
@task(name="tasks.async_get_cards")
def async_get_cards(names_to_insert, redis_settings):
    """
    perform the asynchronous task of getting cards given names
    """
    redis_conn = redis.StrictRedis(**redis_settings)

    inserted_cards = {}
    total_to_insert = len(names_to_insert)

    def push_updates(card):
        if card is not None:
            inserted_cards[card.name] = card

        current_task.update_state(
            state='PROGRESS',
            meta=dict(inserted_cards=inserted_cards)
        )

    results = insert_cards(names_to_insert, redis_conn, push_updates)
    results['cards'] = {
        c.name: c for c in results.get('inserted', []) +
                           results.get('refetched', [])
    }

    return results

