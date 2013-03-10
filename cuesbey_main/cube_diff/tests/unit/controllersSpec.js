'use strict';

/* jasmine specs for controllers go here */

describe('service', function() {
    beforeEach(module('cube_diff.controllers', 'cube_diff.services'));

    describe("CubeContentsCtrl", function() {

        var ctrl, $httpBackend, scope, diffService;

        beforeEach(inject(function($injector, $rootScope, $controller, CubeDiffService) {
            scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            diffService = CubeDiffService;

            ctrl = $controller("CubeContentsCtrl", {$scope: scope});
        }));

        var cube_content = modo_cube_og_data;

        var setupExpectGivenNames = function(before, after, spec, expectedBefore, expectedAfter) {
            var actualBefore = [];
            var actualAfter = [];

            angular.forEach(before, function(name) {
                actualBefore.push(cube_content[name]);
            });

            angular.forEach(after, function(name) {
                actualAfter.push(cube_content[name]);
            });

            $httpBackend.expectPOST('/card_contents/',
                {card_names: {
                    'before': before,
                    'after': after
                }}, {
                    "Accept": "application/json, text/plain, */*",
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json;charset=utf-8"
                }).respond(200, {
                    'before': {
                        cards: actualBefore
                    },
                    'after': {
                        cards: actualAfter
                    }
                });
            scope.beforeCardNames = before.join('\n');
            scope.afterCardNames = after.join('\n');
            var wasCalled = false;

            if (spec) {
                scope.spec = spec;
            }
            scope.diff();

            $httpBackend.flush();

            expect(scope.diffedCube).toEqual(
                diffService.getDiff(expectedBefore, expectedAfter, scope.spec,
                    diffService.alternateSorter, false)
            );

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        };


        it("should work for the default spec and no diff", function() {

            setupExpectGivenNames(['Terror'], ['Terror'], undefined, [
                cube_content['Terror']
            ], [
                cube_content['Terror']
            ]);
        });

        it("should work for the default spec and a diff", function() {

            setupExpectGivenNames([
                'Terror',
                'Doom Blade',
                'Vampiric Tutor'
            ], [
                'Demonic Tutor',
                'Doom Blade',
                'Vampiric Tutor'
            ], undefined, [
                cube_content['Doom Blade'],
                cube_content['Terror'],
                cube_content['Vampiric Tutor']
            ], [
                cube_content['Doom Blade'],
                cube_content['Vampiric Tutor'],
                cube_content['Demonic Tutor']
            ]);
        });


        it("should work for the overridden spec and a diff", function() {

            setupExpectGivenNames([
                'Terror',
                'Doom Blade',
                'Vampiric Tutor'
            ], [
                'Demonic Tutor',
                'Doom Blade',
                'Vampiric Tutor'
            ], {"Black": {}}, [
                cube_content['Doom Blade'],
                cube_content['Terror'],
                cube_content['Vampiric Tutor']
            ], [
                cube_content['Doom Blade'],
                cube_content['Vampiric Tutor'],
                cube_content['Demonic Tutor']
            ]);
        });


        it("should work for the overridden spec and no diff", function() {

            setupExpectGivenNames(
                ['Terror'],
                ['Terror'],
                {"Black": {}},
                [cube_content['Terror']],
                [cube_content['Terror']]
            );
        });


    });
});