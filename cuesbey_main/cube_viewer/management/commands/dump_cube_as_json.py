import json
import os

from django.core.management.base import BaseCommand, CommandError

from cuesbey_main.cube_viewer.management.commands import _get_uuid, md5_checksum, bulk_import

class Command(BaseCommand):
    args = "[FILENAME]+"
    help = "dump a cube's contents as a json file to support testing"

    def handle(self, *args, **options):

        for fpath in args:
            if not os.path.exists(fpath):
                raise CommandError('{} does not exist'.format(fpath))

            cube = bulk_import.save_cube_from_file_path(fpath)

            base = os.path.basename(fpath)
            with open('%s_dump.json' % base, 'wb') as out:
                cube.serialize(out, indent=4)
