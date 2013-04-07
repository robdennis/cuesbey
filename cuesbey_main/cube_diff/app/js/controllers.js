'use strict';

/* Controllers */

angular.module('cube_diff.controllers', []);

function CubeContentsCtrl($scope, CardContentService, CubeDiffService,
                          CardHeuristicService, DefaultsService, $cacheFactory) {

    $scope.spec = JSON.stringify(DefaultsService.spec(), null, 2);

    CardHeuristicService.getHeuristics(function(data) {
        $scope.heuristics = data
    });

    var diffCache = $cacheFactory('diffCache', {});

    var hasChangedSinceDiff = function(toCheck) {
        var wasChanged = false;
        jQuery.each(toCheck, function(name, value) {
            var cachedValue = diffCache.get(name);
            if (!cachedValue || cachedValue!==value) {
                diffCache.put(name, value);
                wasChanged = true;
            }
        });
        return wasChanged;
    };

    $scope.beforeCardNames = DefaultsService.beforeNames();
    $scope.afterCardNames = DefaultsService.afterNames();

    var getCheckedHeuristics = function() {
        var checkedHeuristics = [];
        jQuery.each($scope.heuristics, function(idx, heuristic) {
            if (heuristic['checked']) {
                checkedHeuristics.push(heuristic['key']);
            }
        });
        return checkedHeuristics;
    };

    $scope.setDataAndPerform = function (insertJob) {
        $scope.before = CardContentService.getCachedCards($scope.beforeCardNames.split('\n'));
        $scope.after = CardContentService.getCachedCards($scope.afterCardNames.split('\n'));
        if (insertJob) {
            CardContentService.consumeInserts(
                insertJob,
                $scope.setDataAndPerform
            );
        }
        $scope.performDiff();
    };

    $scope.performDiff = function() {
        $scope.diffedCube = CubeDiffService.getDiff(
            $scope.before,
            $scope.after,
            JSON.parse($scope.spec),
            undefined,
            false,
            getCheckedHeuristics()
        );
        if (hasChangedSinceDiff({spec: $scope.spec})) {
            $scope.diffedCube[0].active = true;
        } else {
            $scope.diffedCube[diffCache.get('pane')].active = true;
        }
    };

    $scope.diff = function() {
        var names = {
            before: $scope.beforeCardNames,
            after: $scope.afterCardNames
        };
        diffCache.put('pane', 0);
        jQuery.each($scope.diffedCube || {}, function(index, pane) {
            if (pane.active) {
                diffCache.put('pane', index);
            }
        });

        if (hasChangedSinceDiff(names)) {
            CardContentService.cacheAllCards(
                $scope.beforeCardNames.split('\n').concat(
                    $scope.afterCardNames.split('\n')
                ),
            $scope.setDataAndPerform);
        } else {
            $scope.performDiff()
        }
    };
}
