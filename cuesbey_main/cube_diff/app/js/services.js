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
                        return 'na';
                    }
                };

                var _checkForType = function(category, card) {
                    if (inArray(category, typeList) !== -1) {
                        return inArray(category, card['types'])!==-1;
                    } else {
                        return 'na';
                    }
                };

                var _checkForCMC = function(category, card) {
                    var cmcRegex = /converted_mana_cost\s*([=><!]{1,2})\s*(\d+)/;
                    var match = cmcRegex.exec(category);
                    if (match) {
                        if (match[1] == '==') {
                            return card['converted_mana_cost'] == match[2];
                        } else if (match[1] == '<') {
                            return card['converted_mana_cost'] < match[2];
                        } else if (match[1] == '>') {
                            return card['converted_mana_cost'] > match[2];
                        } else if (match[1] == '<=') {
                            return card['converted_mana_cost'] <= match[2];
                        } else if (match[1] == '>=') {
                            return card['converted_mana_cost'] >= match[2];
                        } else if (match[1] == '!=') {
                            return card['converted_mana_cost'] != match[2];
                        } else {
                            // this should probably throw something?
                            return 'na';
                        }
                    } else {
                        return 'na';
                    }
                };

                var _checkForDiff = function(category, card) {
                    if (inArray(category, ['both', 'added', 'removed']) !== -1) {
                        return card['_diffResult'] === category;
                    } else {
                        return 'na'
                    }
                };

                var matchesCategory = true;
                var matchesSubgroup = false;
                // "/" is the boolean AND operator for this category stuff
                jQuery.each(category.split('/'), function(and_index, subgroup) {
                    matchesSubgroup = false;

                    jQuery.each(subgroup.split('|'), function(or_index, inner_cat) {
                        // "|" is the boolean OR operator for this category stuff and binds
                        // more tightly than and
                        var negateCategory = inner_cat.indexOf('!') === 0;
                        if (negateCategory) {
                            // split off the exclamation mark
                            inner_cat = inner_cat.substring(1);
                        }

                        jQuery.each([
                            _checkForExactColor,
                            _checkForType,
                            _checkForCMC,
                            _checkForDiff
                            // these either return a known string if the checker isn't applicable
                            // or True/False if it is applicable and based on the results of
                            // the check
                        ], function(checked_index, checker) {
                            var result = checker(inner_cat, card);
                            if (result === 'na') {
                                return result;
                            } else {
                                matchesSubgroup = matchesSubgroup || (negateCategory ? !result : result);
                                // short-circuit here since 1 checker weighed-in
                                return false;
                            }
                        });
                    });
                    // category fails to match if
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

                var resultingSpec = [];

                var _handleEmptySpec = function(catName, recurseSpec, extraItems) {
                    extraItems = extraItems || {};
                    var specToPush = {};
                    if (!handleDiffs) {
                        // relying on the falsiness of undefined
                        specToPush = {category: catName, cards: []};
                    } else {
                        specToPush = {category: catName, subcategories: [
                            {category: 'both', cards: []},
                            {category: 'removed', cards: []},
                            {category: 'added', cards: []}
                        ]};
                    }

                    recurseSpec.push(jQuery.extend({}, specToPush, extraItems))
                };

                var _recurseSpec = function (subInputSpec, recurseSpec) {
                    jQuery.each(subInputSpec, function(_subName, _subSpec) {
                        if (jQuery.isEmptyObject(_subSpec)) {
                            // check that we don't have an information key like a "_sort"
                            _handleEmptySpec(_subName, recurseSpec);
                        } else if (Object.prototype.toString.call(_subSpec) == "[object Object]") {
                            var _specToDescendWith = {};
                            var isLeaf = false;
                            if (_subSpec['appearance']) {
                                _specToDescendWith['appearance'] = _subSpec['appearance'];
                                delete _subSpec['appearance'];
                            }

                            if (jQuery.isEmptyObject(_subSpec)) {
                                isLeaf = true;
                            }
                            // need to undo the deletion in the event
                            // there was copying of a reference somewhere in the spec
                            // HACK
                            jQuery.extend(_subSpec, _specToDescendWith);

                            if (isLeaf) {
                                _handleEmptySpec(_subName, recurseSpec, _specToDescendWith);
                                return;
                            }

                            var _subCategories = [];
                            _specToDescendWith = jQuery.extend(
                                _specToDescendWith, {
                                    "category":_subName,
                                    "subcategories": _subCategories
                            });

                            recurseSpec.push(_specToDescendWith);
                            _recurseSpec(_subSpec, _subCategories);
                        } else {
                            // don't decide, it's some unknown key we don't care about
                        }
                    });
                };

                _recurseSpec(sortSpec, resultingSpec);

                if (jQuery.isEmptyObject(resultingSpec)) {
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

                return resultingSpec;
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
            alternateSorter: function(card_a, card_b) {
                var sortOrderDiff = {
                    both: 0,
                    removed: 1,
                    added: 2
                };

                if (card_a['_diffResult'] !== undefined &&
                    card_b['_diffResult'] !== undefined) {
                    return (
                        [sortOrderDiff[card_a['_diffResult']], card_a['name']].join('_') >
                            [sortOrderDiff[card_b['_diffResult']], card_b['name']].join('_')) ? 1:-1;
                } else {
                    return card_a['name'] > card_b['name'] ? 1:-1;
                }
            },
            getDiff : function(_old, _new, sortSpec, sorter, diffSubCategories) {
                if (diffSubCategories === undefined) {
                    diffSubCategories = true;
                }

                if (!diffSubCategories) {
                    // we need some way to show the diff results, so if we aren't
                    // putting them in categories, at least order by them

                    sorter = sorter || this.alternateSorter;
                }

                var currentCube = SortSpecService.getSkeleton(sortSpec, diffSubCategories);
                jQuery.each(CubeSplitService.splitCards(_old, _new), function(type, splitSubCube) {
                    currentCube = CubeSortService.sortCube(splitSubCube, sortSpec, sorter, currentCube, {_diffResult:type});
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

