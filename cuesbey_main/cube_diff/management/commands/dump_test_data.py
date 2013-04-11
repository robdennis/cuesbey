import json
import os
from optparse import make_option

from django.core import serializers
from django.core.management.base import BaseCommand, CommandError

from cuesbey_main.cube_diff.management.commands import bulk_import
from cuesbey_main.cube_diff.models import Card, CubeEncoder

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
        make_option(
            '--fixture_directory',
            dest='fixture_dir',
            default=os.path.abspath(os.path.join(__here__, '..', '..', 'fixtures')),
            help='place to dump the resulting fixtures'),
        )

    def handle(self, *args, **options):

        if not args:
            return

        if not os.path.exists(options['fixture_dir']):
            os.makedirs(options['fixture_dir'])

        def _fix_pg_array_fields_in_serialized(serialized_card):
            card = None
            for field in ('_color_indicator', 'types', 'subtypes'):
                if isinstance(field, basestring):
                    if card is None:
                        card = Card.get(serialized_card['pk'])
                    serialized_card['fields'][field] = getattr(card, field)
            return serialized_card

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

                with open(os.path.join(
                        options['fixture_dir'], '{}.json'.format(base)
                ), 'wb') as fixture_file:
                    # hack, this can be done a lot better
                    unfixed = json.loads(serializers.serialize(
                        "json", cube.cards.all())
                    )
                    fixed = [_fix_pg_array_fields_in_serialized(card)
                             for card in unfixed]
                    json.dump(fixed, fixture_file)


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
