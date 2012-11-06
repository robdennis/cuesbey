var heuristicNames = [];
var colorList = ['White', 'Blue', 'Black', 'Red', 'Green'];
var typeList = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Land', 'Planeswalker', 'Sorcery', 'Tribal'];

function arrayEquals(arr1, arr2) {
    //http://stackoverflow.com/questions/1773069/using-jquery-to-compare-two-arrays
    return $(arr1).not(arr2).length == 0 && $(arr2).not(arr1).length == 0;
}

function splitCards(_old, _new) {
    // jsondiff.com

    var both = {};
    var added = {};
    var removed = {};

    $.each($.extend({}, _old, _new), function(name, value) {
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
        $.each(subSpec, function(_subName, _subSpec) {
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

function sorter(serializedCube, sortSpec, defaultSort) {
    var sortedCube = turnSortSpecIntoSortedCubeSkeleton(sortSpec);

    defaultSort = defaultSort || function(card_a, card_b) {
        return card_a['name'] > card_b['name']
    };

    $.each(serializedCube, function(index, value) {
        console.log('sorting card:', index, value);
        handleCubeCard(value, sortedCube);
    });

    heuristicNames.sort();

    var _recurseSort = function (subCube) {
        $.each(subCube, function(_subName, _subCube) {
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
    if ($.inArray(category, colorList) !== -1) {
        return arrayEquals([category], card['colors']);
    } else {
        return undefined;
    }
}

function _checkForColorless(category, card) {
    if ($.inArray(category, colorList) !== -1) {
        return arrayEquals([category], card['colors']);
    } else {
        return undefined;
    }
}

function _checkForType(category, card) {
    if ($.inArray(category, typeList) !== -1) {
//        console.log('checking if', category, 'is in', card['types'], "=", jQuery.inArray(category, card['types'])!==-1);
        return jQuery.inArray(category, card['types'])!==-1;
    } else {
        return undefined;
    }
}

function meetsCategory(card, category) {
//    console.log('checking if ', card, 'meets a category', category);

    var matchesCategory = false;
    $.each(category.split('/'), function(idx, cat) {
        var negateCategory = cat.indexOf('!') === 0;
        if (negateCategory) {
            // split off the exclamation mark
            cat = cat.substring(1);
        }

        $.each([
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

function handleCubeCard(card, sortedCube) {

    // if there are heuristics, note what they are
    $.each(card['heuristics'] || {}, function(name, modifications) {
        if (jQuery.inArray(name, heuristicNames)==-1) {
            heuristicNames.push(name);
        }
    });

    var _recurseCube = function (subCube) {
        $.each(subCube, function(_subName, _subCube) {
            if (!meetsCategory(card, _subName)) {
                return;
            }

            if (jQuery.isArray(_subCube)) {
                // we're done here
                _subCube.push(card);
            } else {
                _recurseCube(_subCube);
            }
        })
    };

    _recurseCube(sortedCube);

    return sortedCube;
}


