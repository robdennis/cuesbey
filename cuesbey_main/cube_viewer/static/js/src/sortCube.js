var heuristic_names = [];

function sorter(serializedCube) {

    $.each(serializedCube, function(index, value) {
        console.log('sorting card:', index, value);
        handle_cube_card(value);
    });

    heuristic_names.sort()
}

function handle_cube_card(card) {


    $.each(card['heuristics'] || {}, function(name, modifications) {
        console.log('HEURISTICS!!!');
        if (jQuery.inArray(name, heuristic_names)==-1) {
            heuristic_names.push(name);
        }

    })
}


