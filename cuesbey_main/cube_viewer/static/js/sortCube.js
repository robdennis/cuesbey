var heuristicNames = [];
var colorList = ['White', 'Blue', 'Black', 'Red', 'Green'];
var typeList = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Land', 'Planeswalker', 'Sorcery', 'Tribal'];

function arrayEquals(arr1, arr2) {
    //http://stackoverflow.com/questions/1773069/using-jquery-to-compare-two-arrays
    return jQuery(arr1).not(arr2).length == 0 && jQuery(arr2).not(arr1).length == 0;
}

function splitCards(_old, _new) {
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

function turnSortSpecIntoSortedCubeSkeleton(sortSpec) {
    sortSpec = sortSpec || {};

    var sortedCube = {};

    var _recurseSpec = function (subSpec, subCube) {
        jQuery.each(subSpec, function(_subName, _subSpec) {
//            console.log('looking at:', _subName, _subSpec);
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

function sorter(serializedCube, sortSpec, defaultSort, existingCube, infoToAdd) {
    var sortedCube;
    if (existingCube) {
        sortedCube = existingCube;
    } else {
        sortedCube = turnSortSpecIntoSortedCubeSkeleton(sortSpec)
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

function _checkForExactColor(category, card) {
    if (category == 'Colorless') {
        // special case for colorlessness
        return card['colors'].length == 0;
    }
    if (category == 'Multicolor') {
        // special case for multicolored
        return card['colors'].length > 1;
    }
    if (jQuery.inArray(category, colorList) !== -1) {
        return arrayEquals([category], card['colors']);
    } else {
        return undefined;
    }
}

function _checkForColorless(category, card) {
    if (jQuery.inArray(category, colorList) !== -1) {
        return arrayEquals([category], card['colors']);
    } else {
        return undefined;
    }
}

function _checkForType(category, card) {
    if (jQuery.inArray(category, typeList) !== -1) {
//        console.log('checking if', category, 'is in', card['types'], "=", jQuery.inArray(category, card['types'])!==-1);
        return jQuery.inArray(category, card['types'])!==-1;
    } else {
        return undefined;
    }
}

function meetsCategory(card, category) {
//    console.log('checking if ', card, 'meets a category', category);

    var matchesCategory = false;
    jQuery.each(category.split('/'), function(idx, cat) {
        var negateCategory = cat.indexOf('!') === 0;
        if (negateCategory) {
            // split off the exclamation mark
            cat = cat.substring(1);
        }

        jQuery.each([
            _checkForExactColor,
            _checkForType
        ], function(_, checker) {
            var result =  checker(cat, card);
            if (result === undefined) {
                return result;
            } else {
                matchesCategory = negateCategory ? !result : result;
                return matchesCategory
            }
        });
        return matchesCategory
    });
    return matchesCategory;
}

function handleCubeCard(card, sortedCube, infoToAdd) {
    infoToAdd = infoToAdd || {};

    // merge on information
    var cardToHandle = jQuery.extend({}, card, infoToAdd);

    // if there are heuristics, note what they are
    jQuery.each(cardToHandle['heuristics'] || {}, function(name, modifications) {
        if (jQuery.inArray(name, heuristicNames)==-1) {
            heuristicNames.push(name);
        }
    });

    var _recurseCube = function (subCube) {
        jQuery.each(subCube, function(_subName, _subCube) {
            if (!meetsCategory(cardToHandle, _subName)) {
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

    _recurseCube(sortedCube);

    return sortedCube;
}

function getDiffedCube(_old, _new, sortSpec) {
    var sort_order_diff = {
        both: 0,
        added: 1,
        removed: 2
    };

    var currentCube = turnSortSpecIntoSortedCubeSkeleton(sortSpec);
    jQuery.each(splitCards(_old, _new), function(type, value) {
        currentCube = sorter(value, undefined, function(card_a, card_b) {
            if (card_a['diff_result'] !== undefined &&
                card_b['diff_result'] !== undefined) {
                return ([sort_order_diff[card_a['diff_result']], card_a['name']].join('_') >
                    [sort_order_diff[card_b['diff_result']], card_b['name']].join('_'));
            } else {
                return card_a['name'] > card_b['name'];
            }
        }, currentCube, {diff_result:type});
    });

    return currentCube;
}