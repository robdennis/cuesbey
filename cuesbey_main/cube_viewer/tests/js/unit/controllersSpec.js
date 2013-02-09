'use strict';

/* jasmine specs for controllers go here */

describe('service', function() {
    beforeEach(module('cubeViewer.controllers', 'cubeViewer.services'));

    describe("CubeContentsCtrl", function() {

        var ctrl;

        beforeEach(inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            ctrl = $controller("CubeContentsCtrl", {$scope: scope});
        }));


        it("should work", function() {

        });
    });
});