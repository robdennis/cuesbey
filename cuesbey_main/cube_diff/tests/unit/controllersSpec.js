'use strict';

/* jasmine specs for controllers go here */

describe('service', function() {
    beforeEach(module('cube_diff.controllers', 'cube_diff.services'));

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