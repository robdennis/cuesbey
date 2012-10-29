var heuristicNames = [];

function isArray(object) {
    return Object.prototype.toString.call( object ) === '[object Array]';
}

function turnSortSpecIntoSortedCubeSkeleton(sortSpec) {
    sortSpec = sortSpec || {};

    var sortedCube = {};

    _recurseSpec = function (subSpec, subCube) {
        $.each(subSpec, function(_subName, _subSpec) {
            console.log('looking at:', _subName, _subSpec);
            if (jQuery.isEmptyObject(_subSpec)) {
                // check that we don't have an information key like a "_sort"
                console.log('empty subspec, making list');
                subCube[_subName] = [];
            } else {
                console.log('recursing with:', _subName, _subSpec);
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
        handle_cube_card(value, sortedCube, sortSpec);
    });

    heuristicNames.sort();

    return sortedCube;
}

function handle_cube_card(card, sortedCube) {

    // if there are heuristics, note what they are
    $.each(card['heuristics'] || {}, function(name, modifications) {
        if (jQuery.inArray(name, heuristicNames)==-1) {
            heuristicNames.push(name);
        }
    });


}


