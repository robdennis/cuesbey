test( "sorting a cube test", function() {

    var total_cards = 0;
    var test_cube = {};

    $.ajax({
        type: 'GET',
        url: '/cube_content/',
        dataType: 'json',
        success: function(data) {
            test_cube = data
        },
        data: {
            // TODO: ensure this is always the modo cube?
            cube_id: 1
        },
        async: false
    });

    for (i in test_cube) {
        if (test_cube.hasOwnProperty(i)) {
            total_cards++;
        }
    }
    // Fire/Ice isn't currently handled, and there's 1 other card missing?
    equal(718, total_cards, "checked for expected number of incoming cards");
    deepEqual(test_cube['Elite Vanguard']['colors'], ['White'])
});