import os
from optparse import make_option

from django.core.management.base import BaseCommand, CommandError

from cuesbey_main.cube_viewer.management.commands import bulk_import

__here__ = os.path.abspath(os.path.dirname(__file__))

class Command(BaseCommand):
    args = "[FILENAME]+"

    help = "cube"

    option_list = BaseCommand.option_list + (
        make_option('--outfile',
            dest='outfile',
            default=os.path.abspath(os.path.join(__here__, '..', '..', 'tests', 'js', 'unit', 'test_data.js')),
            help='Delete poll instead of closing it'),
        )

    def handle(self, *args, **options):

        if not args:
            return

        with open(options['outfile'], 'wb') as outfile:

            for fpath in args:
                if not os.path.exists(fpath):
                    raise CommandError('{} does not exist'.format(fpath))

                cube = bulk_import.save_cube_from_file_path(fpath)
                base = os.path.basename(fpath).split('.')[0]
                content = cube.serialize(indent=4)

                outfile.write('{}_data = {};\n'.format(base, content))
