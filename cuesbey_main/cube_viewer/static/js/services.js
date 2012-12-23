'use strict';

/* Services */

function inArray( elem, array, i ) {
    // cribbed from jquery
    var len;

    if ( array ) {

        len = array.length;
        i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

        for ( ; i < len; i++ ) {
            // Skip accessing in sparse arrays
            if ( i in array && array[ i ] === elem ) {
                return i;
            }
        }
    }

    return -1;
}

angular.module('cubeViewer.services', [])
    .factory('CubeContentsService', function($http) {
        return {getCube : function(request, onSuccess) {
            $http({
                method: 'jsonp',
                url: '/cube_content',
                params: {
                    'cube_id': request.cube_id
                }
            }).success(function (data, status) {
                    onSuccess(data, status);
            });
        }};
    })
    .factory('CardCategoryService', function() {
        return {
            matchesCategory : function(category, card) {
                var _checkForExactColor = function(category, card) {
                    if (category == 'Colorless') {
                        // special case for colorlessness
                        return card['colors'].length == 0;
                    }
                    if (category == 'Multicolor') {
                        // special case for multicolored
                        return card['colors'].length > 1;
                    }
                    if (inArray(category, colorList) !== -1) {
                        return angular.equals([category], card['colors']);
                    } else {
                        return undefined;
                    }
                };

                var _checkForType = function(category, card) {
                    if (inArray(category, typeList) !== -1) {
                        return inArray(category, card['types'])!==-1;
                    } else {
                        return undefined;
                    }
                };

                var matchesCategory = true;
                angular.forEach(category.split('/'), function(cat, idx) {
                    var negateCategory = cat.indexOf('!') === 0;
                    if (negateCategory) {
                        // split off the exclamation mark
                        cat = cat.substring(1);
                    }

                    angular.forEach([
                        _checkForExactColor,
                        _checkForType
                    ], function(checker, _) {
                        var result =  checker(cat, card);
                        if (result === undefined) {
                            return result;
                        } else {
                            // make the "matches category" sentinel value be
                            // something that, once false, can't be turned back
                            // to true. Ideally this would just short circuit
                            // out of the loop when made false the first time
                            matchesCategory = matchesCategory && (negateCategory ? !result : result);
                            return matchesCategory
                        }
                    });

                    return matchesCategory
                });
//                matchesCategory = matchesCategory;
                return matchesCategory;
            }
        }
    });
