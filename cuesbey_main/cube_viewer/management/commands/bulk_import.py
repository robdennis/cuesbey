#encoding: utf-8
import os
from django.core.management.base import BaseCommand, CommandError
from cuesbey_main.cube_viewer.models import Cube, CardFetchingError

def save_cube_from_file_path(fpath):
    file_name = os.path.basename(fpath)

    try:
        if not os.path.exists(fpath):
            raise CommandError('{} does not exist'.format(fpath))
        cube = Cube.objects.get(name=file_name)
    except Cube.DoesNotExist:
        cube = Cube()
        cube.save()
        cube.name = file_name

        with open(fpath, 'r') as cube_file:
            for card_name in cube_file:
                if not card_name:
                    continue
                try:
                    cube.add_card_by_name(card_name)
                except CardFetchingError:
                    continue

        cube.save()

    return cube

class Command(BaseCommand):
    args = "[FILENAME]+"
    help = ("import one or more cubes as a brand-new group of the cards "
            "specified in the provided file")

    def handle(self, *args, **options):

        for fpath in args:
            save_cube_from_file_path(fpath)




