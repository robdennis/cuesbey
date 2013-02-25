import json
from django.test import TestCase, Client


class ViewTest(TestCase):

    def test_card_contents(self):

        c = Client()
        data = {"card_names":{"before":["Absorb"], "after":["Absorb"]}}
        response = c.post('/card_contents/', json.dumps(data), "text/json",
                          HTTP_X_REQUESTED_WITH='XMLHttpRequest')

        response = c.post('/card_contents/', json.dumps(data), "text/json",
                          HTTP_X_REQUESTED_WITH='XMLHttpRequest')

