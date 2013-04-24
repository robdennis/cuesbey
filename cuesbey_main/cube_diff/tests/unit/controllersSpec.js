'use strict';

describe('service', function() {
    beforeEach(module('cube_diff.controllers', 'cube_diff.services'));

    describe("CubeContentsCtrl", function() {

        var ctrl, $httpBackend, scope, contentService, diffService;
        var standardBefore = [
                'Doom Blade',
                'Terror',
                'Vampiric Tutor'
            ];

        var standardAfter = [
                'Doom Blade',
                'Demonic Tutor',
                'Vampiric Tutor'
            ];

        var cubeContent = mtgo_cube_og_data;

        beforeEach(inject(function($injector, $rootScope, $controller,
                                   CardContentService, CubeDiffService) {
            scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            contentService = CardContentService;
            diffService = CubeDiffService;
            $httpBackend.expectGET('/heuristics/').respond(
                200,
                cuesbey_all_heuristics
            );
            ctrl = $controller("CubeContentsCtrl", {$scope: scope});
            scope.spec = JSON.stringify({'category': 'Any', 'cards': []});
            scope.beforeTextArea = standardBefore.join('\n');
            scope.afterTextArea = standardAfter.join('\n');
            spyOn(diffService, 'getDiff').andReturn([
                {'category': 'Any', 'cards': []}
            ]);
            spyOn(contentService, 'cacheAllCards').andCallThrough();
            spyOn(scope, 'setDataAndPerform').andCallThrough();
            spyOn(scope, 'performDiff').andCallThrough();
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        var setupExpectedResponse = function(before, after, invalid) {
            var mockedResponse = {cards:{}};
            var allNames = before.concat(after);

            angular.forEach(allNames, function(name) {
                mockedResponse['cards'][name] = cubeContent[name];
            });

            mockedResponse['invalid'] = invalid || [];

            $httpBackend.expectPOST('/card_contents/',
                {"card_names": allNames}, {
                    "Accept": "application/json, text/plain, */*",
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json;charset=utf-8"
                }).respond(200, mockedResponse);
            return mockedResponse;
        };

        it('should call out to the server in case of new text', function() {
            var response = setupExpectedResponse(standardBefore,
                                                 standardAfter);
            scope.diff();
            $httpBackend.flush();
            expect(contentService.cacheAllCards).toHaveBeenCalledWith(
                // the order of this is an implementation detail
                standardBefore.concat(standardAfter),
                // this is what would have been called on success
                // and we'd take on faith for now would actually diff the cube
                scope.setDataAndPerform
            );
            expect(scope.setDataAndPerform).toHaveBeenCalled();
            // this is called by set data and perform
            expect(scope.performDiff).toHaveBeenCalled();
        });

        it('should not call out to the server in case of remaining text', function() {
            scope.diffCache.put('before', scope.beforeTextArea);
            scope.diffCache.put('after', scope.afterTextArea);
            scope.diff();
            $httpBackend.flush(); // the heuristics call is still mocked
            expect(contentService.cacheAllCards).not.toHaveBeenCalled();
            expect(scope.setDataAndPerform).not.toHaveBeenCalled();
            // this is called instead still
            expect(scope.performDiff).toHaveBeenCalled();
        });
    });
});