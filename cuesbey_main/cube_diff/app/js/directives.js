'use strict';

/* Directives */


angular.module('cube_diff.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('tabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            controller: function($scope, $element) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };

                this.addPane = function(pane) {
                    if (panes.length == 0) {
                        $scope.select(pane);
                    }
                    panes.push(pane);
                }
            },
            template:
                '<div class="tabbable">' +
                    '<ul class="nav nav-tabs">' +
                    '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
                    '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
                    '</li>' +
                    '</ul>' +
                    '<div class="tab-content" ng-transclude></div>' +
                    '</div>',
            replace: true
        };
    }).
    directive('pane', function() {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: { title: '@' },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            template:
                '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
                    '</div>',
            replace: true
        };
    }).
    directive('diffTable', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                val: '='
            },
            controller: function($scope, $element) {
                this.zip_longest = function() {
                    var args = [].slice.call(arguments);
                    var longest = args.reduce(function(a,b){
                        return a.length>b.length ? a : b
                    }, []);

                    return longest.map(function(_,i){
                        return args.map(function(array){return array[i]})
                    });
                }

            },


            link: function(scope, element, attrs, diffCtrl) {

                var template;
                if (angular.isArray(scope.val['subcategories']))  {
                    console.log('current stuff', scope.val);
                    if (scope.val.appearance != "table") {
                        template = '<div class="diff-container">' +
                            scope.val.category+
                            '<div ng-repeat="sub_val in val.subcategories">' +
                                '<diff-table val="sub_val"></div>' +
                            '</div>'+
                        '</div>';
                    } else {
                        var all_col_cards = [];
                        jQuery.each(scope.val['subcategories'], function(colIndex, subCat) {
                            var col_cards = [];
                            // we're assuming that there's no diff subcategories
                            console.log('working with', subCat);
                            col_cards.push({
                                'name': subCat['category'],
                                // HACK: there's a better way to handle
                                // keeping the title in the same array
                                '_diffResult': 'title'
                            });
                            col_cards = col_cards.concat(subCat.cards);
                            console.log('current column', col_cards);
                            all_col_cards.push(col_cards);
                            console.log('all_colunns', all_col_cards);

                        });

                        scope.table_content = diffCtrl.zip_longest.apply(
                            this,
                            all_col_cards
                        );

                        template = '<div>{{val.category}}:'+
                            '<table class="diff-table">' +
                                '<tr ng-repeat="row in table_content">'+
                                    '<td ng-repeat="card in row" class="diff-name {{card._diffResult}}">'+
                                        '{{card.name}}' +
                                    '</td>'+
                                '</tr>'+
                            '</table>'+
                        '</div>'

                    }
                } else if (angular.isArray(scope.val.cards) && scope.val.cards.length > 0) {
                    console.log('it\'s a top level thing');
                    if (scope.val['appearance'] !== 'table') {
                        template = '<div>{{val.category}}'+
                            '<ul class="diff-list">'+
                                '<li ng-repeat="card in val.cards" class="diff-name {{card.category}}">{{ card.name }}</li>' +
                            '</ul>'+
                        '</div>';
                    } else {
                        console.log("and it's a table", scope.val);
                        template = '<div>'+
                            '<table class="diff-table">'+
                                '<tr><th>{{val.category}}</th></tr>'+
                                '<tr ng-repeat="card in val.cards">'+
                                    '<td class="diff-name {{card._diffResult}}">{{ card.name }}</td>'+
                                '</tr>' +
                            '</table>'+
                        "</div>";
                    }
                }
                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            },

            replace: true
        };
    }
);