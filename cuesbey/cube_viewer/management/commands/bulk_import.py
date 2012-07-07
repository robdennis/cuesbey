#encoding: utf-8
import sys
import os
from django.core.management.base import BaseCommand, CommandError
from cube_viewer.models import Cube, make_and_insert_card

class Command(BaseCommand):
    args = "[FILENAME]+"
    help = ("import one or more cubes as a brand-new group of the cards "
            "specified in the provided file")

    def handle(self, *args, **options):

        for fpath in args:
            cube = Cube()
            cube.save()
            if not os.path.exists(fpath):
                cube.delete()
                raise CommandError('{} does not exist'.format(fpath))


            with open(fpath, 'r') as cube_file:
                cards = []
                for card_name in cube_file:
                    if not card_name:
                        continue
                    card = make_and_insert_card(card_name)
                    if not card:
                        sys.stderr.write('no card found for {}\n'.format(card_name))
                    else:
                        cards.append(card)
                #FIXME: django complains if there are too many cards
                cube.cards = cards

            cube.save()
