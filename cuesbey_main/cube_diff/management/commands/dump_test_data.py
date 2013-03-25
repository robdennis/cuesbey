import os
from optparse import make_option

from django.core.management.base import BaseCommand, CommandError

from cuesbey_main.cube_diff.management.commands import bulk_import
from cuesbey_main.cube_diff.models import Card

__here__ = os.path.abspath(os.path.dirname(__file__))


# noinspection PyShadowingBuiltins
class Command(BaseCommand):
    args = "[FILENAME]+"

    help = "cube"

    option_list = BaseCommand.option_list + (
        make_option(
            '--outfile',
            dest='outfile',
            default=os.path.abspath(os.path.join(__here__, '..', '..', 'tests',
                                                 'unit', 'test_data.js')),
            help='place to dump the resulting file'),
        )

    def handle(self, *args, **options):

        if not args:
            return

        with open(options['outfile'], 'wb') as outfile:
            all_cards = {}
            cube = None
            for fpath in args:
                if not os.path.exists(fpath):
                    raise CommandError('{} does not exist'.format(fpath))

                cube = bulk_import.save_cube_from_file_path(fpath)
                all_cards.update(cube.as_dict())
                base = os.path.basename(fpath).split('.')[0]

                outfile.write('{}_data = {};\n'.format(
                    base, cube.serialize(cube.as_dict(), indent=4))
                )
                outfile.write('{}_data_array = {};\n'.format(
                    base, cube.serialize(cube.as_list(), indent=4))
                )
            outfile.write('cuesbey_all_data = {};\n'.format(
                cube.serialize(all_cards, indent=4))
            )
            all_heuristics = [
                dict(key=k)
                for k, v in Card.get_all_heuristics().iteritems()
            ]
            outfile.write('cuesbey_all_heuristics = {};\n'.format(
                cube.serialize(all_heuristics, indent=4))
            )
