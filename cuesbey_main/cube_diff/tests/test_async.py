import redis

import cuesbey_main.cuesbey.settings as settings
from cuesbey_main.cube_diff.tasks import async_get_cards
from django.db import IntegrityError
from django.test.utils import override_settings

from test_cards import BaseCardInserter

@override_settings(CELERY_EAGER_PROPAGATES_EXCEPTIONS=True,
                   CELERY_ALWAYS_EAGER=True,
                   BROKER_BACKEND='memory')
class AsyncTest(BaseCardInserter):
    def assert_expected_get(self, names, expected_insert=(),
                            expected_refetched=(), expected_invalid=(),
                            expected_mismatches=None):
        """
        :param names: the names that we're passing to async_get_cards
        :param expected_insert: str names in a sequence to assert were inserted
        :param expected_refetched: str names in a sequence to assert were
            re-fetched
        :param expected_invalid: str names in a sequence that were invalid
        :param expected_mismatches: dict of requested names keyed to
            corresponding cards
        :raise AssertionError: if actual result doesn't match expectations
        """

        if expected_mismatches is None:
            expected_mismatches = {}
        actual = async_get_cards.delay(names,
                                       settings.REDIS_INFORMATION).result

        self.assertEqual(len(actual), 5, repr(actual.keys()))

        self.assertItemsEqual(actual['invalid'], expected_invalid)
        self.assertItemsEqual([c.name for c in actual['inserted']],
                              expected_insert)
        self.assertItemsEqual([c.name for c in actual['refetched']],
                              expected_refetched)
        self.assertEqual(actual['mismatches'],
                         expected_mismatches)

    def test_handle_reinsert(self):

        self.assert_expected_get(['Gravecrawler'],
                                 expected_insert=['Gravecrawler'])
        # we're just going to insert it despite it being there, and no error
        self.assert_expected_get(['Gravecrawler'],
                                 expected_insert=['Gravecrawler'])

    def test_insert_duplicates(self):
        to_insert = ['Gravecrawler']*3
        # we get 1 card back
        self.assert_expected_get(to_insert, expected_insert=to_insert[:1])

    def test_insert_refetch_duplicates(self):
        to_insert = ['AEther Adept', 'Aether Adept', 'aether adept']
        expected = [
            u'\xc6ther Adept', u'\xc6ther Adept', u'\xc6ther Adept'
        ]
        expected_mismatches = {
            k: v for k, v in zip(to_insert, expected)
        }
        self.assertTrue(expected_mismatches)
        print expected_mismatches
        # we get 1 card back
        self.assert_expected_get(to_insert, expected_insert=expected[:1],
                                 expected_mismatches=expected_mismatches)
        # we're re-fetching, not reinserting
        self.assert_expected_get(to_insert, expected_refetched=expected[:1],
                                 expected_mismatches=expected_mismatches)

    def test_handle_invalid(self):
        to_insert = ['Gravecrawler', 'asdasdasd', '1x Gravecrawler']
        self.assert_expected_get(to_insert, expected_insert=to_insert[:1],
                                 expected_invalid=to_insert[1:])

