'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    beforeEach(module('cube_diff.directives', 'cube_diff.services'));
    beforeEach(function() {
        this.addMatchers({
            toHaveClass: function(cls) {
                this.message = function() {
                    return "Expected '" + angular.mock.dump(this.actual) + "' to have class '" + cls + "'.";
                };

                return this.actual.hasClass(cls);
            }
        });
    });
    describe('diff-table', function() {
        var elm, scope, diffService, compile, cube;
        var damnation = mtgo_cube_og_data['Damnation'];
        var doomBlade = mtgo_cube_og_data['Doom Blade'];
        var terror = mtgo_cube_og_data['Terror'];
        var seal = mtgo_cube_og_data['Imperial Seal'];
        var ritual = mtgo_cube_og_data['Dark Ritual'];
        var duress = mtgo_cube_og_data['Duress'];
        var livingDeath = mtgo_cube_og_data['Living Death'];

        beforeEach(inject(function($rootScope, $compile, CubeDiffService) {
            diffService = CubeDiffService;
            scope = $rootScope;
            compile = $compile
        }));

        var getCubeRepresentation = function(before, after, spec) {
            cube = diffService.getDiff(before, after, spec, undefined, false);
            scope.cubeSection = cube[0];
            elm = angular.element(
                // it feels like I shouldn't need to wrap this in a div?
                '<div>'+
                    '<diff-table val="cubeSection"></diff-table>' +
                '</div>');
            compile(elm)(scope);
            scope.$digest();
            console.log(elm);
            return elm;
        };

        var assertCellHasCardWithDiffType = function(cell, name, diffType) {
            expect(cell.text()).toBe(name);
            expect(cell).toHaveClass(diffType);
        };

        it('should support a simple table implementation', function() {
            console.log('what');
            var content = getCubeRepresentation(
                [damnation, doomBlade],
                [damnation, terror],
                {'Black': {appearance:'table'}}
            );

            var rows = content.find('tr');
            expect(rows.length).toBe(4);
            expect(content.find('th').eq(0).text()).toBe('Black');
            // Both -> Removed -> Added
            var cells = content.find('td');
            expect(cells.length).toBe(3);
            assertCellHasCardWithDiffType(cells.eq(0), 'Damnation', 'both');
            assertCellHasCardWithDiffType(cells.eq(1), 'Doom Blade', 'removed');
            assertCellHasCardWithDiffType(cells.eq(2), 'Terror', 'added');
        });

        it("shouldn't freak out about table's with >1 column", function() {
            console.log('what');
            var content = getCubeRepresentation(
                [damnation, seal, ritual, doomBlade],
                [damnation, duress, ritual, terror],
                {'Black': {
                    appearance:'table',
                    'Instant': {},
                    'Sorcery': {}
                }}
            );


            var rows = content.find('tr');
            // still four thanks to there being the header row,
            // and a Both -> Removed -> Added in both instant and sorcery
            expect(rows.length).toBe(4);
            var headers = content.find('th');
            // two columns
            expect(headers.length).toBe(2);
            // note the order from the spec object
            expect(headers.eq(0).text()).toBe('Instant');
            expect(headers.eq(1).text()).toBe('Sorcery');

            var cells = content.find('td');
            expect(cells.length).toBe(6);
            // tds are returned by row top to bottom, then column left to right
            // so all the both cards
            assertCellHasCardWithDiffType(cells.eq(0), 'Dark Ritual', 'both');
            assertCellHasCardWithDiffType(cells.eq(1), 'Damnation', 'both');
            // then all the removed cards
            assertCellHasCardWithDiffType(cells.eq(2), 'Doom Blade', 'removed');
            assertCellHasCardWithDiffType(cells.eq(3), 'Imperial Seal', 'removed');
            // then all the added cards
            assertCellHasCardWithDiffType(cells.eq(4), 'Terror', 'added');
            assertCellHasCardWithDiffType(cells.eq(5), 'Duress', 'added');
        });

        it("should grow to the height of the longest column", function() {
            console.log('what');
            var content = getCubeRepresentation(
                [damnation, seal, ritual, doomBlade, livingDeath],
                [damnation, duress, ritual, terror, livingDeath],
                {'Black': {
                    appearance:'table',
                    'Instant': {},
                    'Sorcery': {}
                }}
            );

            var rows = content.find('tr');
            // now 5 thanks to there being the header row,
            // and a Both -> Removed -> Added in instant
            // but 2x Both -> Removed -> Added in instant
            expect(rows.length).toBe(5);

            var cells = content.find('td');
            expect(cells.length).toBe(8);

            // instants
            assertCellHasCardWithDiffType(cells.eq(0), 'Dark Ritual', 'both');
            assertCellHasCardWithDiffType(cells.eq(2), 'Doom Blade', 'removed');
            assertCellHasCardWithDiffType(cells.eq(4), 'Terror', 'added');
            // there's a blank cell now
            assertCellHasCardWithDiffType(cells.eq(6), '', '');

            // sorceries
            assertCellHasCardWithDiffType(cells.eq(1), 'Damnation', 'both');
            assertCellHasCardWithDiffType(cells.eq(3), 'Living Death', 'both');
            assertCellHasCardWithDiffType(cells.eq(5), 'Imperial Seal', 'removed');
            assertCellHasCardWithDiffType(cells.eq(7), 'Duress', 'added');
        });

    });
});
