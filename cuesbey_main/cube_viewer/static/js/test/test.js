

function get_cube_from_server(id) {

    var test_cube = {};

    $.ajax({
        type: 'GET',
        url: '/cube_content/',
        dataType: 'json',
        success: function(data) {
            test_cube = data;
        },
        data: {
            cube_id: id
        },
        async: false
    });

    return test_cube;
}

function get_cube_from_jstest_runner(id) {

    var cube_map = {
        1: '/test/cuesbey_main/cube_viewer/tests/files/modo_cube_v1.json'
    };

    var test_cube = null;

    $.ajax({
        type: 'GET',
        url: cube_map[id],
        dataType: 'json',
        success: function(data) {
            test_cube = data;
        },
        error: function() {
            test_cube = null;
        },
        async: false
    });

    return test_cube;
}

function get_cube(id) {
    // the jstest runner can't hit the cuesbey server, so try to get the cube from the js test runner server first
    var test_cube = get_cube_from_jstest_runner(id);
    if (!test_cube) {
        test_cube = get_cube_from_server(id);
    }

    return test_cube;
}

test( "sorting a cube test", function() {
    var total_cards = 0;

    // TODO: ensure this is always the modo cube?
    var test_cube = get_cube(1);

    for (i in test_cube) {
        if (test_cube.hasOwnProperty(i)) {
            total_cards++;
        }
    }

    // Fire/Ice isn't currently handled, and there's 1 other card missing?
    equal(total_cards, 718, "checked for expected number of incoming cards");
    // Sanity Check
    deepEqual(test_cube['Elite Vanguard']['colors'], ['White'], "sanity checking");
    // currently just done to trip side effects
    sorter(test_cube);
    // do we see the expected number/types of heuristics
    deepEqual(heuristic_names, [
        "activated_ability_costs_affect_color",
        "activated_ability_costs_affect_color_do_not_pay_phyrexian",
        "always_kick",
        "always_kick_creatures",
        "assume_on_color_cmc_for_mono_color_hybrids",
        "caring_about_controlling_land_types_affect_color",
        "living_weapon_means_creature",
        "off_color_flashback_is_gold",
        "off_color_kicker_is_gold",
        "phyrexian_always_pays_life",
        "phyrexian_always_pays_life_except_for_abilities",
        "suspend_as_cmc",
        "token_spells_are_creatures",
        "use_cycling_cost_as_mana_cost_for_triggered_abilities"
    ], 'expected heuristics results');

});