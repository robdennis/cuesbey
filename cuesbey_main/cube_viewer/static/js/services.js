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
                var matchesSubgroup = false;
                // "/" is an boolean AND operator for this
                angular.forEach(category.split('/'), function(subgroup) {
                    matchesSubgroup = false;

                    angular.forEach(subgroup.split('|'), function(inner_cat) {
                        var negateCategory = inner_cat.indexOf('!') === 0;
                        if (negateCategory) {
                            // split off the exclamation mark
                            inner_cat = inner_cat.substring(1);
                        }

                        angular.forEach([
                            _checkForExactColor,
                            _checkForType
                        ], function(checker) {
                            var result = checker(inner_cat, card);
                            if (result === undefined) {
                                return result;
                            } else {
                                // make the "matches subgroup" sentinel value be
                                // something that, once true, can't be turned back
                                // to false. Ideally this would just short circuit
                                // out of the loop when made true the first time
                                matchesSubgroup = matchesSubgroup || (negateCategory ? !result : result);
                                return matchesSubgroup;
                            }
                        });
                        return matchesSubgroup
                    });

                    // make the "matches category" sentinel value be
                    // something that, once false, can't be turned back
                    // to true. Ideally this would just short circuit
                    // out of the loop when made false the first time
                    matchesCategory = matchesCategory && matchesSubgroup;
                    return matchesCategory;
                });
                return matchesCategory;
            }
        }
    }).factory('SplitCardsService', function() {
        return {
            split: function(_old, _new) {
                // jsondiff.com

                var both = {};
                var added = {};
                var removed = {};

                jQuery.each(jQuery.extend({}, _old, _new), function(name, value) {
                    if (name in _old && name in _new) {
                        both[name] = value;
                    } else if (name in _new) {
                        added[name] = value;
                    } else {
                        removed[name] = value;
                    }
                });

                return {
                    both: both,
                    added: added,
                    removed: removed
                }
            }
        }
    })
    .factory('SortSpecService', function() {
        return {
            getSkeleton : function(sortSpec) {
                sortSpec = sortSpec || {};

                var sortedCube = {};

                var _recurseSpec = function (subSpec, subCube) {
                    jQuery.each(subSpec, function(_subName, _subSpec) {
                        if (jQuery.isEmptyObject(_subSpec)) {
                            // check that we don't have an information key like a "_sort"
                            subCube[_subName] = [];
                        } else {
                            var _recurseCube = {};
                            subCube[_subName] = _recurseCube;
                            _recurseSpec(_subSpec, _recurseCube);
                        }
                    })
                };

                _recurseSpec(sortSpec, sortedCube);

                return sortedCube;
            }
        }
    })
    .factory('CubeSortService', function(CardCategoryService, SortSpecService) {
        return {
            sortCube: function(serializedCube, sortSpec, defaultSort, existingCube, infoToAdd) {
                var handleCubeCard = function(card, _sortedCube, infoToAdd) {
                    // merge on information
                    var cardToHandle = jQuery.extend({}, card, infoToAdd);

//                    // if there are heuristics, note what they are
//                    jQuery.each(cardToHandle['heuristics'] || {}, function(name, modifications) {
//                        if (jQuery.inArray(name, heuristicNames)==-1) {
//                            heuristicNames.push(name);
//                        }
//                    });

                    var _recurseCube = function (subCube) {
                        jQuery.each(subCube, function(_subName, _subCube) {
                            if (!CardCategoryService.matchesCategory(_subName, cardToHandle)) {
                                return;
                            }

                            if (jQuery.isArray(_subCube)) {
                                // we're done here
                                _subCube.push(cardToHandle);
                            } else {
                                _recurseCube(_subCube);
                            }
                        })
                    };

                    _recurseCube(_sortedCube);
                    return _sortedCube;
                };

                var sortedCube;
                if (existingCube) {
                    sortedCube = existingCube;
                } else {
                    sortedCube = SortSpecService.getSkeleton(sortSpec);
                }


                defaultSort = defaultSort || function(card_a, card_b) {
                    return card_a['name'] > card_b['name']
                };

                jQuery.each(serializedCube, function(index, value) {
                    console.log('sorting card:', index, value);
                    handleCubeCard(value, sortedCube, infoToAdd);
                });

                heuristicNames.sort();

                var _recurseSort = function (subCube) {
                    jQuery.each(subCube, function(_subName, _subCube) {
                        if (jQuery.isArray(_subCube)) {
                            _subCube.sort(defaultSort);
                        } else {
                            _recurseSort(_subCube);
                        }
                    })
                };

                _recurseSort(sortedCube);

                return sortedCube;
            }
        }
    })
    .factory('CubeDiffService', function(SortSpecService, CubeSortService, CubeSplitService) {
        return {
            getDiff : function(_old, _new, sortSpec) {
                var sort_order_diff = {
                    both: 0,
                    added: 1,
                    removed: 2
                };

                var currentCube = SortSpecService.getSkeleton(sortSpec);
                jQuery.each(CubeSplitService.splitCards(_old, _new), function(type, value) {
                    currentCube = CubeSortService.sortCube(value, undefined, function(card_a, card_b) {
                        if (card_a['diff_result'] !== undefined &&
                            card_b['diff_result'] !== undefined) {
                            return ([sort_order_diff[card_a['diff_result']], card_a['name']] >
                                [sort_order_diff[card_b['diff_result']], card_b['name']]) ? 1:-1;
                        } else {
                            return card_a['name'] > card_b['name'] ? 1:-1;
                        }
                    }, currentCube, {diff_result:type});
                });

                return currentCube;

            }

        }
    })
    .factory('CubeSplitService', function() {
        return {
            splitCards : function(_old, _new) {
                // jsondiff.com

                var both = {};
                var added = {};
                var removed = {};

                jQuery.each(jQuery.extend({}, _old, _new), function(name, value) {
                    if (name in _old && name in _new) {
                        both[name] = value;
                    } else if (name in _new) {
                        added[name] = value;
                    } else {
                        removed[name] = value;
                    }
                });

                return {
                    both: both,
                    added: added,
                    removed: removed
                }
            }
        }
    });

