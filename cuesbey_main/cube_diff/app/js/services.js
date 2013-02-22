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

var colorList = ['White', 'Blue', 'Black', 'Red', 'Green'];
var typeList = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Land', 'Planeswalker', 'Sorcery', 'Tribal'];

angular.module('cube_diff.services', [])
    .factory('CardContentService', function($http) {
        return {getCards : function(cardNames, onSuccess) {
            $http.post('/card_contents/', {
                card_names: cardNames
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

                var _checkForDiff = function(category, card) {
                    if (inArray(category, ['both', 'added', 'removed']) !== -1) {
                        return card['_diffResult'] === category;
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
                            //FIXME: after resolving as True/False for one of these, we should short-circuit our
                            _checkForExactColor,
                            _checkForType,
                            _checkForDiff
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
    })
    .factory('SortSpecService', function() {
        return {
            getSkeleton : function(sortSpec, handleDiffs) {
                sortSpec = sortSpec || {};

                var sortedCube = [];

                var _recurseSpec = function (subSpec, subCube) {
                    jQuery.each(subSpec, function(_subName, _subSpec) {
                        if (jQuery.isEmptyObject(_subSpec)) {
                            // check that we don't have an information key like a "_sort"
                            if (!handleDiffs) {
                                // relying on the falsiness of undefined
                                subCube.push({category:_subName, cards: []});
                            } else {
                                subCube.push({category:_subName, subcategories: [
                                    {category: 'both', cards: []},
                                    {category: 'removed', cards: []},
                                    {category: 'added', cards: []}
                                ]});
                            }

                        } else {
                            var _subCategories = [];
                            var _recurseCube = {category:_subName, subcategories: _subCategories};
                            subCube.push(_recurseCube);
                            _recurseSpec(_subSpec, _subCategories);
                        }
                    })
                };

                _recurseSpec(sortSpec, sortedCube);

                if (jQuery.isEmptyObject(sortedCube)) {
                    if (!handleDiffs) {
                        return {};
                    }
                    else {
                        return [
                            {category: 'both', cards: []},
                            {category: 'removed', cards: []},
                            {category: 'added', cards: []}
                        ];
                    }
                }

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

                    var _recurseCube = function (subCube) {
                        jQuery.each(subCube, function(idx, categoryObject) {
                            if (!CardCategoryService.matchesCategory(categoryObject.category, cardToHandle)) {
                                return;
                            }
                            if (categoryObject.hasOwnProperty('subcategories')) {
                                _recurseCube(categoryObject.subcategories);
                            }
                            // no subcategories, so either push it on the
                            // cards array, or test for diff categories

                            else if (jQuery.isArray(categoryObject.cards)) {
                                // we're done here
                                categoryObject.cards.push(cardToHandle);
                            } else {
                                throw "unexpected cube format in binning"
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
                    return card_a['name'] > card_b['name'] ? 1:-1;
                };

                jQuery.each(serializedCube, function(index, value) {
                    handleCubeCard(value, sortedCube, infoToAdd);
                });

                if (defaultSort) {
                    var _recurseSort = function (subCube) {
                        jQuery.each(subCube, function(idx, categoryObject) {
                            if (categoryObject.hasOwnProperty('subcategories')) {
                                _recurseSort(categoryObject.subcategories);
                            }
                            // no subcategories, so either push it on the
                            // cards array, or test for diff categories

                            else if (jQuery.isArray(categoryObject.cards)) {
                                // we're done here
                                categoryObject.cards.sort(defaultSort);
                            } else {
                                throw "unexpected cube format in sort"
                            }

                        })
                    };

                    _recurseSort(sortedCube);
                }

                return sortedCube;
            }
        }
    })
    .factory('CubeDiffService', function(SortSpecService, CubeSortService, CubeSplitService) {
        return {
            getDiff : function(_old, _new, sortSpec, sorter) {
                var sort_order_diff = {
                    both: 0,
                    added: 1,
                    removed: 2
                };

                // we do want to handle diffs
                var currentCube = SortSpecService.getSkeleton(sortSpec, true);
                jQuery.each(CubeSplitService.splitCards(_old, _new), function(type, splitSubCube) {
                    currentCube = CubeSortService.sortCube(splitSubCube, sortSpec, undefined, currentCube, {_diffResult:type});
                });

                return currentCube;

            }

        }
    })
    .factory('CubeSplitService', function() {
        return {
            splitCards : function(_old, _new) {
                // jsondiff.com

                var both = [];
                var added = [];
                var removed = [];
                var nameIsPresentInCardArray = function(_array, name) {
                    for (var i = 0; i < _array.length; i++ ) {
                        if (_array[i].name === name) {
                            return true;
                        }
                    }
                    return false;
                };

                var namesHandled = [];
                jQuery.each(_old.concat(_new), function(idx, card) {
                    if (namesHandled.indexOf(card.name) !==-1) {
                        // we already handled this name
                        return;
                    } else {
                        namesHandled.push(card.name);
                    }

                    var inOld = nameIsPresentInCardArray(_old, card.name);
                    var inNew = nameIsPresentInCardArray(_new, card.name);
                    if (inOld && inNew) {
                        both.push(card);
                    } else if (inOld) {
                        removed.push(card);
                    } else {
                        added.push(card);
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

