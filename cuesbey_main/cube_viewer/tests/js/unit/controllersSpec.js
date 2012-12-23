'use strict';

/* jasmine specs for controllers go here */

//describe('CubeCategoryControl Testing', function(){
//
//    var $scope, ctrl;
//    var eliteVanguard = {
//        "heuristics": null,
//        "name": "Elite Vanguard",
//        "colors": [
//            "White"
//        ],
//        "gatherer_ids": [
//            "208291",
//            "222710",
//            "189902",
//            "240315"
//        ],
//        "mana_cost": "{W}",
//        "types": [
//            "Creature"
//        ],
//        "converted_mana_cost": 1
//    };
//
//    beforeEach(inject(function($rootScope) {
//        $scope = $rootScope.$new();
//    }));
//
//    it('should handle monocolor', inject(function($controller) {
//        $scope.category = 'White';
//        $scope.card = eliteVanguard;
//        ctrl = $controller('CubeCategoryController', {
//            $scope: $scope
//        });
//        expect($scope.matchesCategory).toBe(true);
//    }));
//    it('should handle simple type', inject(function($controller) {
//        $scope.category = 'Creature';
//        $scope.card = eliteVanguard;
//        ctrl = $controller('CubeCategoryController', {
//            $scope: $scope
//        });
//        expect($scope.matchesCategory).toBe(true);
//    }));
//    it('should handle negation of simple type', inject(function($controller) {
//        $scope.category = '!Creature';
//        $scope.card = eliteVanguard;
//        ctrl = $controller('CubeCategoryController', {
//            $scope: $scope
//        });
//        expect($scope.matchesCategory).toBe(false);
//    }));
//    it('should handle negation of simple color', inject(function($controller) {
//        $scope.category = '!White';
//        $scope.card = eliteVanguard;
//        ctrl = $controller('CubeCategoryController', {
//            $scope: $scope
//        });
//        expect($scope.matchesCategory).toBe(false);
//    }));
//    it('should handle colorless check', inject(function($controller) {
//        $scope.category = '!White';
//        $scope.card = eliteVanguard;
//        ctrl = $controller('CubeCategoryController', {
//            $scope: $scope
//        });
//        expect($scope.matchesCategory).toBe(false);
//    }));
//
//});
//
