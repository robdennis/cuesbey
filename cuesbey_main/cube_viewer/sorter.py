import itertools
from itertools import chain, combinations
from django.db.models import Q
from django.db.models.query import QuerySet

from cuesbey_main.cube_viewer import hybrid_mappings, color_mappings
from cuesbey_main.cube_viewer.models import Card, color_bitfield_keys

from cuesbey_main.cube_viewer.autolog import log

def _get_string_for_cmc_slot(cmc):
    if isinstance(cmc, tuple):
        assert len(cmc) == 2, 'unknown cmc spec'
        if not any(cmc):
            return '*'
        elif cmc[0] is not None:
            return '{}+'.format(cmc[0])
        else:
            return '<={}'.format(cmc[1])
    else:
        return str(cmc)


class CubeSorter(object):
    default_categories = tuple([col[0] for col in color_mappings] + [
        'Multicolor',
        'Land',
        'Colorless'
    ])

    default_cmc_slots = ((None, 1), 2, 3, 4, 5, (6, None))

    def __init__(self, cube):
        self.cube = cube
        self.sort_spec = None

    def _get_empty_sort_dict(self, sort_spec):
        """
        stubbed out to support testing
        :param sort_spec: the sort specification to use in yielding this cube's
            cards.
        :return: dictionary with empty content but the appropriate categories
        """

        return self.sort_by(pretend=True, sort_spec=sort_spec)

    def _get_colorless_sections(self, colorless_cards, pretend=False):

        return {'Colorless': colorless_cards}

    def _get_colorless_cards(self, multicolor_cards, pretend=False):

        if pretend:
            return []
        log.debug("looking for colorless cards")
        cube_cards = Card.objects.filter(cube=self.cube)
        not_mc_cards = cube_cards.exclude(name__in=multicolor_cards.values('name'))
        log.debug("not multicolor: {}", not_mc_cards)
        colorless_cards = not_mc_cards.filter(Q(mana_cost__contains="Land")|
                                              (Q(_standard_mana_bitfield=0)&
                                               Q(_hybrid_mana_bitfield=0)&
                                               Q(_mono_hybrid_mana_bitfield=0)&
                                               Q(_phyrexian_mana_bitfield=0))
        )
        log.debug("colorless: {}", colorless_cards)
        return colorless_cards


    def _get_multicolor_sections(self, multicolor_cards, pretend=False):

        if not self.sort_spec.get('multicolor_subsections', False):
            return {'Multicolor': multicolor_cards}

        def _get_qs_for_colors(abbrevs):
            if pretend:
                return []


            def _get_bf(abs):
                bf = 0
                for abbrev in abs:
                    # FIXME: this is ugly and kind of speaks to the need to more officially tie that together
                    bf |= getattr(Card._standard_mana_bitfield, color_mappings[abbrev.upper()].lower())
                return bf
            # setting the bitfield to int is the analogous to querying for
            # things that are exactly the colors, not just includes those
            # colors

            qs = (Q(_standard_mana_bitfield=int(_get_bf(abbrevs)), _hybrid_mana_bitfield=0)|
                  Q(_hybrid_mana_bitfield=int(_get_bf(abbrevs)), _standard_mana_bitfield=0))

            for sub_abbrevs in chain.from_iterable(combinations(abbrevs, r) for r in range(len(abbrevs)+1)):
                # this is the "Slave of Bolas" case
                if len(sub_abbrevs) == 2:
                    unselected_abbrevs = set(abbrevs) - set(sub_abbrevs)
                    qs |= Q(_standard_mana_bitfield=int(_get_bf(unselected_abbrevs)),
                            _hybrid_mana_bitfield=int(_get_bf(sub_abbrevs)))

            return multicolor_cards.filter(qs)

        sym = 'WUBRG'
        return {
            'Multicolor': {
                '/'.join(abbrevs):_get_qs_for_colors(abbrevs)
                for abbrevs in itertools.chain(
                    itertools.combinations(sym, 5),
                    itertools.combinations(sym, 4),
                    itertools.combinations(sym, 3),
                    itertools.combinations(sym, 2),
                )
            }
        }



    def _get_multicolor_cards(self, pretend=False):

        if pretend:
            if self.sort_spec.get('multicolor_subsections', False):
                return {}
            else:
                return []

        cube_cards = Card.objects.filter(cube=self.cube)
        log.debug('all cube cards: {}', cube_cards)
        # this is going to leverage the assumptions that magic has not
        # yet combined one color of a "special" mana with a different color
        # of mana, except in the case of multicolor hybrid, which is being
        # handled
        qs = cube_cards.filter(_mono_hybrid_mana_bitfield=0,
                               _phyrexian_mana_bitfield=0)

        log.debug('cards that don\'t have special stuff: {}', qs)

        for color_name in color_bitfield_keys:
            color_value = int(getattr(Card._standard_mana_bitfield,
                                      color_name))
            # checking against the int values of these flags checks for EXACTLY
            # those values, e.g. not green AND black
            qs = qs.exclude(_standard_mana_bitfield=color_value)
            log.debug('cards after removing {}: {}', color_name, qs)
        qs = qs.exclude(_standard_mana_bitfield=0)

        hybrid_cards = cube_cards.exclude(_hybrid_mana_bitfield=0)

        log.debug('non-hybrid multicolor cards left: {}', qs)

        return cube_cards.filter(Q(name__in=hybrid_cards.values("name"))|
                                 Q(name__in=qs.values("name"))).distinct()



    def _get_monocolor_cards(self, multicolor_cards, colorless_cards, pretend):
        """
        :param multicolor_cards: what constitutes a mono-colored card is based
            on what is not a multicolor card
        """

        if pretend:
            return []

        cube_cards = Card.objects.filter(cube=self.cube)
        log.debug('all cube cards: {}', cube_cards)
        log.debug('multicolor cards: {}', multicolor_cards)
        not_multicolor_cards = cube_cards.exclude(name__in=multicolor_cards.values('name'))
        log.debug('not multicolor cards: {}', not_multicolor_cards)
        monocolor_cards = not_multicolor_cards.exclude(name__in=colorless_cards.values('name'))
        log.debug('monocolor cards: {}', monocolor_cards)

        return monocolor_cards

    def _get_monocolor_sections(self, monocolor_cards, pretend=False):

        def _get_qs_for_color_and_cmc(color, abbrev, cmc):
            if pretend:
                return []

            # cards of the appropriate color
            qs = monocolor_cards.filter(Q(color_indicator=color) |
                                        Q(mana_cost__contains = abbrev))
            if isinstance(cmc, tuple):
                # will assume CMC is a 2-tuple of start to end, with None
                # as 0 in the first slot, and infinity when in the second
                # all numbers are inclusive
                if cmc[0] is not None:
                    qs = qs.filter(converted_mana_cost__gte = cmc[0])
                if cmc[1] is not None:
                    qs = qs.filter(converted_mana_cost__lte = cmc[1])
            else:
                # will assume CMC is an int
                # this probably needs to change for "in-practice CMC"
                qs = qs.filter(converted_mana_cost=cmc)

            return qs

        return {
            color: {
                _get_string_for_cmc_slot(slot): _get_qs_for_color_and_cmc(color, abbrev, slot)
                for slot in self.default_cmc_slots
            }
            for abbrev, color in color_mappings.iteritems()
        }

    def sort_by(self, sort_spec=None, pretend=False):
        """
        :param sort_spec: the sort specification to use in yielding this cube's
            cards.
        :param pretend: if False (default) actually get the cards, else, no
            fetching will be performed, returning empty values in all
            categories
        :return: dictionary of query sets that support displaying a sorted cube
        """

        categories = {}

        if sort_spec is not None:
            self.sort_spec = sort_spec

        multicolor_cards = self._get_multicolor_cards(pretend)
        colorless_cards = self._get_colorless_cards(multicolor_cards, pretend)
        monocolor_cards = self._get_monocolor_cards(multicolor_cards, colorless_cards, pretend)

        categories.update(self._get_multicolor_sections(multicolor_cards, pretend))
        categories.update(self._get_colorless_sections(colorless_cards, pretend))
        categories.update(self._get_monocolor_sections(monocolor_cards, pretend))

        return categories
