'use strict';

/* Directives */
angular.module('cube_diff.directives', []).
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
                console.log('element', element);
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
                        scope.headerRow = [];
                        jQuery.each(scope.val['subcategories'], function(colIndex, subCat) {
                            var col_cards = [];
                            col_cards = col_cards.concat(subCat.cards);
                            all_col_cards.push(col_cards);
                            scope.headerRow.push(subCat.category)

                        });

                        scope.table_content = diffCtrl.zip_longest.apply(
                            this,
                            all_col_cards
                        );

                        template = '<div>{{val.category}}:'+
                            '<table class="diff-table">' +
                                // the header row
                                '<tr><th ng-repeat="title in headerRow" class="diff-title">{{title}}</th></tr>'+
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
                        template = '<div class="diff-title">{{val.category}}'+
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
                console.log('got template:', template);
                var newElement = angular.element(template);
                console.log('new element:', newElement);
                $compile(newElement)(scope);
                console.log('new element2:', newElement);
                element.replaceWith(newElement);

                console.log('replaced:', element);

            },

            replace: true
        };
    }
);