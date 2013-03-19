#encoding: utf-8
import os
from django.core.management.base import BaseCommand, CommandError
from cuesbey_main.cube_diff.models import Cube, get_cards_from_names

def save_cube_from_file_path(fpath):
    file_name = os.path.basename(fpath)

    try:
        if not os.path.exists(fpath):
            raise CommandError('{} does not exist'.format(fpath))
        cube = Cube.objects.get(name=file_name)
    except Cube.DoesNotExist:
        cube = Cube(name=file_name)
        cube.save()

    with open(fpath, 'r') as cube_file:
        cards = get_cards_from_names(*[
            line for line in cube_file.read().splitlines() if line
        ])

    cube.cards = cards
    cube.save()

    return cube

class Command(BaseCommand):
    args = "[FILENAME]+"
    help = ("import one or more cubes as a brand-new group of the cards "
            "specified in the provided file")

    def handle(self, *args, **options):

        for fpath in args:
            save_cube_from_file_path(fpath)




