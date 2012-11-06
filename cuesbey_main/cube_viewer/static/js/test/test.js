function _recurseNamify(subCube) {
    $.each(subCube, function(_subName, _subCube) {
        if (jQuery.isArray(_subCube)) {
            $.each(_subCube, function(idx, card) {
                _subCube[idx] = card['name'];
            })
        } else {
            _recurseNamify(_subCube);
        }
    })
}

function namifyCube(cube) {
    _recurseNamify(cube);
    return cube
}

function getCubeFromServer(id) {

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

function getCubeFromJsTestRunner(id) {

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

function getCube(id) {
    // the jstest runner can't hit the cuesbey server, so try to get the cube from the js test runner server first
    var test_cube = getCubeFromJsTestRunner(id);
    if (!test_cube) {
        test_cube = getCubeFromServer(id);
    }

    return test_cube;
}

test( "sort spec tests", function() {
    // do we get the expected skeleton given a sort spec?
    deepEqual(turnSortSpecIntoSortedCubeSkeleton(), {}, "empty spec");
    deepEqual(turnSortSpecIntoSortedCubeSkeleton({
        'Colorless': {},
        'White': {},
        'Blue': {},
        'Black': {},
        'Red': {},
        'Green': {},
        'Artifact': {},
        'Land': {}
        }), {
        'Colorless': [],
        'White': [],
        'Blue': [],
        'Black': [],
        'Red': [],
        'Green': [],
        'Artifact': [],
        'Land': []
    }, "modo cube spec");
    deepEqual(turnSortSpecIntoSortedCubeSkeleton({
        'Colorless': {
            'Creature': {
                'converted_mana_cost<=1': {},
                'converted_mana_cost==2': {},
                'converted_mana_cost==3': {},
                'converted_mana_cost==4': {},
                'converted_mana_cost==5': {},
                'converted_mana_cost==6': {},
                'converted_mana_cost>=7': {}

            },
            '!Creature': {
                'Instant/Sorcery': {},
                'Planeswalker': {},
                'Enchantment': {},
                'Land': {}
            }
        },
        'White': {
            'converted_mana_cost<=1': {
                'Creature': {},
                '!Creature': {}
            },
            'converted_mana_cost==2': {
                'Creature': {},
                '!Creature': {}
            },
            'converted_mana_cost==3': {
                'Creature': {},
                '!Creature': {}
            },
            'converted_mana_cost==4': {
                'Creature': {},
                '!Creature': {}
            },
            'converted_mana_cost==5': {
                'Creature': {},
                '!Creature': {}
            },
            'converted_mana_cost==6': {
                'Creature': {},
                '!Creature': {}
            },
            'converted_mana_cost>=7': {
                'Creature': {},
                '!Creature': {}
            }
        }
    }), {
        "Colorless": {
            "!Creature": {
                "Enchantment": [],
                "Instant/Sorcery": [],
                "Land": [],
                "Planeswalker": []
            },
            "Creature": {
                "converted_mana_cost<=1": [],
                "converted_mana_cost==2": [],
                "converted_mana_cost==3": [],
                "converted_mana_cost==4": [],
                "converted_mana_cost==5": [],
                "converted_mana_cost==6": [],
                "converted_mana_cost>=7": []
            }
        },
        "White": {
            "converted_mana_cost<=1": {
                "!Creature": [],
                "Creature": []
            },
            "converted_mana_cost==2": {
                "!Creature": [],
                "Creature": []
            },
            "converted_mana_cost==3": {
                "!Creature": [],
                "Creature": []
            },
            "converted_mana_cost==4": {
                "!Creature": [],
                "Creature": []
            },
            "converted_mana_cost==5": {
                "!Creature": [],
                "Creature": []
            },
            "converted_mana_cost==6": {
                "!Creature": [],
                "Creature": []
            },
            "converted_mana_cost>=7": {
                "!Creature": [],
                "Creature": []
            }
        }

    }, "m-m-m-multiball");

});

test( "category tests", function() {
    // can we determine if a card fits a category?
    // TODO: ensure this is always the modo cube?
    var testCube = getCube(1);
    var simpleCard = testCube['Elite Vanguard'];
    deepEqual(meetsCategory(simpleCard, 'White'), true, "white cards are white");
    deepEqual(meetsCategory(simpleCard, 'Creature'), true, "creatures are creatures");
    deepEqual(meetsCategory(simpleCard, '!Creature'), false, "creatures are not creatures (negation)");
    deepEqual(meetsCategory(simpleCard, 'Colorless'), false, "white cards are not colorless");
    deepEqual(meetsCategory(simpleCard, '!Colorless'), true, "white cards are not colorless (negation)");
    deepEqual(meetsCategory(testCube['Karn Liberated'], 'Colorless'), true, "karn is colorless");
    deepEqual(meetsCategory(testCube['Karn Liberated'], 'Colorless/Artifact'), false, "karn liberated is not an artifact");
    deepEqual(meetsCategory(testCube['Karn Liberated'], 'Colorless/!Artifact/!Land'), true, "karn liberated is a colorless non-land/non-artifact");
    deepEqual(meetsCategory(testCube['Thran Dynamo'], 'Colorless/!Artifact'), false, "colorless");
    deepEqual(meetsCategory(testCube['Thran Dynamo'], 'Colorless/Artifact'), true, "colorless");
    deepEqual(meetsCategory(testCube['Thran Dynamo'], 'Colorless'), true, "colorless");
    deepEqual(meetsCategory(testCube['Tidehollow Sculler'], 'Colorless'), false, "sculler is not colorless");
    deepEqual(meetsCategory(testCube['Tidehollow Sculler'], '!Colorless'), true, "sculler is positively not colorless");
    deepEqual(meetsCategory(testCube['Tidehollow Sculler'], 'Artifact'), true, "sculler is an artifact");
    deepEqual(meetsCategory(testCube['Tidehollow Sculler'], 'Multicolor'), true, "sculler is multicolor");
    deepEqual(meetsCategory(testCube['Tidehollow Sculler'], 'Multicolor/Artifact'), true, "sculler is an artifact and is multicolor");
    deepEqual(meetsCategory(simpleCard, 'Land'), false);

});

test( "cube card handlers test", function() {
    // TODO: ensure this is always the modo cube?
    var testCube = getCube(1);
    var simpleCard = testCube['Elite Vanguard'];

    deepEqual(namifyCube(handleCubeCard(simpleCard, {
        "White": []}
    )), {
        "White": ["Elite Vanguard"]
    }, 'simple placement of a card into a cube');

    var namified_cube = namifyCube(handleCubeCard(simpleCard, {
        "White": [{
            "name":"Savannah Lions"
        }]}
    ));

    // we're not guaranteeing an order, but they should both be there
    ok(namified_cube['White'].length == 2);
    ok(namified_cube['White'].indexOf("Savannah Lions") > -1);
    ok(namified_cube['White'].indexOf("Elite Vanguard") > -1);
});

test( "sorting a cube test", function() {
    var totalCards = 0;

    // TODO: ensure this is always the modo cube?
    var testCube = getCube(1);

    for (i in testCube) {
        if (testCube.hasOwnProperty(i)) {
            totalCards++;
        }
    }

    // Fire/Ice isn't currently handled, and there's 1 other card missing?
    equal(totalCards, 718, "checked for expected number of incoming cards");
    // Sanity Check
    deepEqual(testCube['Elite Vanguard']['colors'], ['White'], "sanity checking");

    var sortedCube = sorter(testCube, {
        'Colorless/!Artifact/!Land': {},
        'Multicolor': {},
        'White': {},
        'Blue': {},
        'Black': {},
        'Red': {},
        'Green': {},
        'Artifact/Colorless': {},
        'Land': {}
    }, function(card_a, card_b) {
        // The Modo Cube on MTG.com sorts by type and then name
        var whitelistTypes = function(typeArray) {
            // get rid of certain types the wizards doesn't count
            var whitelistedTypes = [];
            $.each(typeArray, function(idx, type) {
                if (['Artifact', 'Creature', 'Land',
                    'Sorcery', 'Planeswalker', 'Enchantment',
                    'Instant'].indexOf(type) !== -1) {
                    whitelistedTypes.push(type);
                }
            });
            whitelistedTypes.sort();
            return whitelistedTypes;
        };
        var card_a_types = whitelistTypes(card_a['types']).join(' ');
        var card_b_types = whitelistTypes(card_b['types']).join(' ');

        if (card_a_types == card_b_types) {
            var card_a_sort_name = card_a['name'].replace('Æ', 'Ae').toLowerCase();
            var card_b_sort_name = card_b['name'].replace('Æ', 'Ae').toLowerCase();
            return card_a_sort_name > card_b_sort_name;
        } else {
            return card_a_types > card_b_types;
        }
    });

    // do we see the expected number/types of heuristics?
    deepEqual(heuristicNames, [
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

    var mtgoCube = {
        "Colorless/!Artifact/!Land": [
            "Kozilek, Butcher of Truth",
            "Ulamog, the Infinite Gyre",
            "Karn Liberated",
            "All Is Dust"
        ],
        "White": [
            "Ethersworn Canonist",
            "Porcelain Legionnaire",
            "Academy Rector",
            "Akroma, Angel of Wrath",
            "Aven Mindcensor",
            "Baneslayer Angel",
            "Blade Splicer",
            "Burrenton Forge-Tender",
            "Calciderm",
            "Cloudgoat Ranger",
            // apparently not findable yet
//            "Eight-and-a-Half Tails",
            "Elesh Norn, Grand Cenobite",
            "Elite Vanguard",
            "Emeria Angel",
            "Eternal Dragon",
            "Exalted Angel",
            "Fiend Hunter",
            "Flickerwisp",
            "Gideon's Lawkeeper",
            "Hero of Bladehold",
            "Hokori, Dust Drinker",
            "Iona, Shield of Emeria",
            "Isamaru, Hound of Konda",
            "Kami of Ancient Law",
            "Leonin Relic-Warder",
            "Loam Lion",
            "Loyal Cathar",
            "Loyal Retainers",
            "Magus of the Tabernacle",
            "Mentor of the Meek",
            "Mikaeus, the Lunarch",
            "Mirran Crusader",
            "Mirror Entity",
            "Mother of Runes",
            "Paladin en-Vec",
            "Ranger of Eos",
            "Reveillark",
            "Savannah Lions",
            "Silver Knight",
            "Soltari Champion",
            "Soltari Monk",
            "Soltari Priest",
            "Spectral Lynx",
            "Steppe Lynx",
            "Stonecloaker",
            "Stoneforge Mystic",
            "Student of Warfare",
            "Sun Titan",
            "Thalia, Guardian of Thraben",
            "Wall of Omens",
            "Wall of Reverence",
            "Weathered Wayfarer",
            "Whipcorder",
            "White Knight",
            "Wispmare",
            "Yosei, the Morning Star",
            "Angelic Destiny",
            "Faith's Fetters",
            "Glorious Anthem",
            "Honor of the Pure",
            "Journey to Nowhere",
            "Land Tax",
            "Luminarch Ascension",
            "Oblivion Ring",
            "Parallax Wave",
            "Worship",
            "Celestial Purge",
            "Condemn",
            "Disenchant",
            "Dismantling Blow",
            "Enlightened Tutor",
            "Mana Tithe",
            "Momentary Blink",
            "Path to Exile",
            "Pulse of the Fields",
            "Ray of Revelation",
            "Renewed Faith",
            "Shining Shoal",
            "Swords to Plowshares",
            "Tithe",
            "Ajani Goldmane",
            "Elspeth Tirel",
            "Elspeth, Knight-Errant",
            "Gideon Jura",
            "Akroma's Vengeance",
            "Armageddon",
            "Balance",
            "Cataclysm",
            "Catastrophe",
            "Day of Judgment",
            "Decree of Justice",
            "Hallowed Burial",
            "Increasing Devotion",
            "Lingering Souls",
            "Martial Coup",
            "Oust",
            "Ravages of War",
            "Rout",
            "Spectral Procession",
            "Wrath of God"
        ],
        "Blue": [
            "Phyrexian Metamorph",
            "Aeon Chronicler",
            "Æther Adept",
            "Brine Elemental",
            "Consecrated Sphinx",
            "Court Hussar",
            "Cursecatcher",
            "Enclave Cryptologist",
            "Fathom Seer",
            "Frost Titan",
            "Glen Elendra Archmage",
            "Jushi Apprentice",
            "Keiga, the Tide Star",
            "Kira, Great Glass-Spinner",
            "Looter il-Kor",
            "Lu Xun, Scholar General",
            "Man-o'-War",
            "Meloku the Clouded Mirror",
            "Mulldrifter",
            "Neurok Commando",
            "Ninja of the Deep Hours",
            "Old Man of the Sea",
            "Palinchron",
            "Phantasmal Bear",
            "Riftwing Cloudskate",
            "Sea Gate Oracle",
            "Serendib Efreet",
            "Snapcaster Mage",
            "Sower of Temptation",
            "Sphinx of Jwar Isle",
            "Thieving Magpie",
            "Tradewind Rider",
            "Trinket Mage",
            "Vendilion Clique",
            "Venser, Shaper Savant",
            "Vesuvan Shapeshifter",
            "Voidmage Prodigy",
            "Wake Thrasher",
            "Waterfront Bouncer",
            "Willbender",
            "Control Magic",
            "Dream Halls",
            "Future Sight",
            "Legacy's Allure",
            "Narcolepsy",
            "Opposition",
            "Treachery",
            "Blue Elemental Blast",
            "Brainstorm",
            "Capsize",
            "Careful Consideration",
            "Counterspell",
            "Cryptic Command",
            "Daze",
            "Deprive",
            "Desertion",
            "Dismiss",
            "Dissipate",
            "Essence Scatter",
            "Fact or Fiction",
            "Flashfreeze",
            "Forbid",
            "Forbidden Alchemy",
            "Force of Will",
            "Force Spike",
            "Frantic Search",
            "Gifts Ungiven",
            "Impulse",
            "Into the Roil",
            "Intuition",
            "Mana Leak",
            "Memory Lapse",
            "Miscalculation",
            "Mystical Tutor",
            "Negate",
            "Opportunity",
            "Opt",
            "Pact of Negation",
            "Power Sink",
            "Remand",
            "Repeal",
            "Spell Pierce",
            "Stifle",
            "Thirst for Knowledge",
            "Turnabout",
            "Jace Beleren",
            "Jace, the Mind Sculptor",
            "Ancestral Vision",
            "Compulsive Research",
            "Deep Analysis",
            "Ideas Unbound",
            "Mind's Desire",
            "Ponder",
            "Preordain",
            "Show and Tell",
            "Tidings",
            "Time Spiral",
            "Time Warp",
            "Tinker",
            "Upheaval"
        ],
        "Black": [
            "Abyssal Persecutor",
            "Bane of the Living",
            "Black Knight",
            "Bloodghast",
            "Bloodgift Demon",
            "Bone Shredder",
            "Braids, Cabal Minion",
            "Carnophage",
            "Dark Confidant",
            "Dauthi Horror",
            "Dauthi Marauder",
            "Dauthi Slayer",
            "Diregraf Ghoul",
            "Gatekeeper of Malakir",
            "Geralf's Messenger",
            "Grave Titan",
            "Graveborn Muse",
            "Gravecrawler",
            "Hypnotic Specter",
            "Ink-Eyes, Servant of Oni",
            "Kokusho, the Evening Star",
            "Korlash, Heir to Blackblade",
            "Laquatus's Champion",
            "Mesmeric Fiend",
            "Nantuko Shade",
            "Nekrataal",
            "Nezumi Graverobber",
            "Nezumi Shortfang",
            "Nightscape Familiar",
            "Oona's Prowler",
            "Phyrexian Crusader",
            "Phyrexian Negator",
            "Phyrexian Obliterator",
            "Phyrexian Rager",
            "Plague Sliver",
            "Puppeteer Clique",
            "Sheoldred, Whispering One",
            "Shriekmaw",
            "Silent Specter",
            "Skeletal Vampire",
            "Skinrender",
            "Skithiryx, the Blight Dragon",
            "Tombstalker",
            "Vampire Hexmage",
            "Vampire Lacerator",
            "Vampire Nighthawk",
            "Visara the Dreadful",
            "Xiahou Dun, the One-Eyed",
            "Zombie Cutthroat",
            "Animate Dead",
            "Bitterblossom",
            "Diabolic Servitude",
            "Necromancy",
            "Necropotence",
            "Phyrexian Arena",
            "Recurring Nightmare",
            "Sarcomancy",
            "Corpse Dance",
            "Dark Ritual",
            "Disfigure",
            "Dismember",
            "Doom Blade",
            "Entomb",
            "Go for the Throat",
            "Makeshift Mannequin",
            "Skeletal Scrying",
            "Slaughter Pact",
            "Snuff Out",
            "Tainted Pact",
            "Terror",
            "Vampiric Tutor",
            "Liliana of the Veil",
            "Liliana Vess",
            "Sorin Markov",
            "Ambition's Cost",
            "Buried Alive",
            "Consuming Vapors",
            "Damnation",
            "Death Cloud",
            "Deathmark",
            "Demonic Tutor",
            "Despise",
            "Duress",
            "Exhume",
            "Hymn to Tourach",
            "Imperial Seal",
            "Innocent Blood",
            "Inquisition of Kozilek",
            "Living Death",
            "Mind Shatter",
            "Night's Whisper",
            "Profane Command",
            "Reanimate",
            "Sign in Blood",
            "Sinkhole",
            "Stupor",
            "Tendrils of Agony",
            "Thoughtseize",
            "Unearth",
            "Yawgmoth's Will"
        ],
        "Red": [
            "Akroma, Angel of Fury",
            "Avalanche Riders",
            "Ball Lightning",
            "Blistering Firecat",
            "Blood Knight",
            "Bogardan Hellkite",
            "Chandra's Phoenix",
            "Countryside Crusher",
            "Ember Hauler",
            "Flametongue Kavu",
            "Frenzied Goblin",
            "Gathan Raiders",
            "Goblin Goon",
            "Goblin Guide",
            "Goblin Ruinblaster",
            "Goblin Wardriver",
            "Goblin Welder",
            "Greater Gargadon",
            "Grim Lavamancer",
            "Hell's Thunder",
            "Hellspark Elemental",
            "Hero of Oxid Ridge",
            "Inferno Titan",
            "Ingot Chewer",
            "Jackal Pup",
            "Kargan Dragonlord",
            "Keldon Champion",
            "Keldon Marauders",
            "Kird Ape",
            "Mogg War Marshal",
            "Orcish Lumberjack",
            "Priest of Urabrask",
            "Ravenous Baboons",
            "Rorix Bladewing",
            "Siege-Gang Commander",
            "Skizzik",
            "Slith Firewalker",
            "Spikeshot Elder",
            "Stormblood Berserker",
            "Stromkirk Noble",
            "Taurean Mauler",
            "Thunderblust",
            "Thunderscape Battlemage",
            "Tin Street Hooligan",
            "Torch Fiend",
            "Urabrask the Hidden",
            "Vulshok Refugee",
            "Zo-Zu the Punisher",
            "Genju of the Spires",
            "Sneak Attack",
            "Sulfuric Vortex",
            "Act of Aggression",
            "Ancient Grudge",
            "Beacon of Destruction",
            "Brimstone Volley",
            "Chaos Warp",
            "Char",
            "Fireblast",
            "Firestorm",
            "Incinerate",
            "Lightning Bolt",
            "Magma Jet",
            "Price of Progress",
            "Pulse of the Forge",
            "Pyrokinesis",
            "Red Elemental Blast",
            "Searing Blaze",
            "Seething Song",
            "Smash to Smithereens",
            "Staggershock",
            "Volcanic Fallout",
            "Chandra Nalaar",
            "Chandra, the Firebrand",
            "Koth of the Hammer",
            "Aftershock",
            "Arc Lightning",
            "Arc Trail",
            "Banefire",
            "Burning of Xinye",
            "Chain Lightning",
            "Destructive Force",
            "Devastating Dreams",
            "Devil's Play",
            "Earthquake",
            "Empty the Warrens",
            "Fire Ambush",
            "Firebolt",
            "Gamble",
            "Jokulhaups",
            "Molten Rain",
            "Obliterate",
            "Pillage",
            "Pyroclasm",
            "Reckless Charge",
            "Rift Bolt",
            "Rolling Earthquake",
            "Slagstorm",
            "Volcanic Hammer",
            "Wheel of Fortune",
            "Wildfire"
        ],
        "Green": [
            "Birthing Pod",
            "Acidic Slime",
            "Arbor Elf",
            "Avacyn's Pilgrim",
            "Avenger of Zendikar",
            "Birds of Paradise",
            "Blastoderm",
            "Brooding Saurian",
            "Chameleon Colossus",
            "Cloudthresher",
            "Daybreak Ranger",
            "Deranged Hermit",
            "Devoted Druid",
            "Elves of Deep Shadow",
            "Eternal Witness",
            "Fauna Shaman",
            "Fyndhorn Elves",
            "Genesis",
            "Great Sable Stag",
            "Hystrodon",
            "Indrik Stomphowler",
            "Joraga Treespeaker",
            "Jungle Lion",
            "Leatherback Baloth",
            "Llanowar Elves",
            "Lotus Cobra",
            "Master of the Wild Hunt",
            "Mold Shambler",
            "Nantuko Vigilante",
            "Noble Hierarch",
            "Obstinate Baloth",
            "Ohran Viper",
            "Oracle of Mul Daya",
            "Overgrown Battlement",
            "Phantom Centaur",
            "Primeval Titan",
            "Primordial Hydra",
            "Quirion Dryad",
            "Rofellos, Llanowar Emissary",
            "Sakura-Tribe Elder",
            "Scorned Villager",
            "Strangleroot Geist",
            "Tarmogoyf",
            "Terastodon",
            "Thelonite Hermit",
            "Thornling",
            "Thornscape Battlemage",
            "Thrun, the Last Troll",
            "Troll Ascetic",
            "Vengevine",
            "Vinelasher Kudzu",
            "Vorapede",
            "Wall of Blossoms",
            "Wall of Roots",
            "Werebear",
            "Wickerbough Elder",
            "Wild Nacatl",
            "Wood Elves",
            "Woodfall Primus",
            "Yavimaya Elder",
            "Awakening Zone",
            "Fertile Ground",
            "Heartbeat of Spring",
            "Moldervine Cloak",
            "Rancor",
            "Seal of Primordium",
            "Survival of the Fittest",
            "Sylvan Library",
            "Beast Within",
            "Krosan Grip",
            "Moment's Peace",
            "Naturalize",
            "Stonewood Invocation",
            "Summoning Trap",
            "Vines of Vastwood",
            "Garruk Relentless",
            "Garruk Wildspeaker",
            "Garruk, Primal Hunter",
            "Call of the Herd",
            "Channel",
            "Cultivate",
            "Explore",
            "Farseek",
            "Genesis Wave",
            "Green Sun's Zenith",
            "Harmonize",
            "Kodama's Reach",
            "Lead the Stampede",
            "Life from the Loam",
            "Natural Order",
            "Nostalgic Dreams",
            "Plow Under",
            "Primal Command",
            "Rampant Growth",
            "Regrowth",
            "Restock",
            "Rude Awakening",
            "Search for Tomorrow",
            "Stunted Growth",
            "Tooth and Nail"
        ],
        "Multicolor": [
            "Behemoth Sledge",
            "Sphinx of the Steel Wind",
            "Tidehollow Sculler",
            "Angel of Despair",
            "Augury Adept",
            "Bloodbraid Elf",
            "Boggart Ram-Gang",
            "Broodmate Dragon",
            "Cold-Eyed Selkie",
            "Creakwood Liege",
            "Doran, the Siege Tower",
            "Drogskol Reaver",
            "Edric, Spymaster of Trest",
            "Falkenrath Aristocrat",
            "Figure of Destiny",
            "Firemane Angel",
            "Geist of Saint Traft",
            "Giant Solifuge",
            "Goblin Legionnaire",
            "Grand Arbiter Augustin IV",
            "Grimgrin, Corpse-Born",
            "Havengul Lich",
            "Huntmaster of the Fells",
            "Kitchen Finks",
            "Knight of the Reliquary",
            "Loxodon Hierarch",
            "Mystic Snake",
            "Niv-Mizzet, the Firemind",
            "Nucklavee",
            "Olivia Voldaren",
            "Psychatog",
            "Putrid Leech",
            "Qasali Pridemage",
            "Realm Razer",
            "Rhox War Monk",
            "Ruhan of the Fomori",
            "Shadowmage Infiltrator",
            "Simic Sky Swallower",
            "Spiritmonger",
            "Sprouting Thrinax",
            "Stillmoon Cavalier",
            "Tattermunge Maniac",
            "Trygon Predator",
            "Woolly Thoctar",
            "Goblin Trenches",
            "Mirari's Wake",
            "Pernicious Deed",
            "Absorb",
            "Agony Warp",
            "Bant Charm",
            "Bituminous Blast",
            "Electrolyze",
            "Esper Charm",
            // Fire/Ice not yet supported
//            "Fire/Ice",
            "Lightning Helix",
            "Mortify",
            "Prophetic Bolt",
            "Putrefy",
            "Terminate",
            "Undermine",
            "Voidslime",
            "Ajani Vengeant",
            "Nicol Bolas, Planeswalker",
            "Sarkhan the Mad",
            "Sorin, Lord of Innistrad",
            "Venser, the Sojourner",
            "Call the Skybreaker",
            "Cruel Ultimatum",
            "Firespout",
            "Maelstrom Pulse",
            "Vindicate",
            "Void"
        ],
        "Land": [
            "Academy Ruins",
            "Ancient Tomb",
            "Arid Mesa",
            "Badlands",
            "Barbarian Ring",
            "Bayou",
            "Blood Crypt",
            "Bloodstained Mire",
            "Breeding Pool",
            "Cabal Coffers",
            "Celestial Colonnade",
            "City of Traitors",
            "Clifftop Retreat",
            "Creeping Tar Pit",
            "Dragonskull Summit",
            "Drowned Catacomb",
            "Flooded Strand",
            "Gaea's Cradle",
            "Ghitu Encampment",
            "Glacial Fortress",
            "Godless Shrine",
            "Grim Backwoods",
            "Hallowed Fountain",
            "Hinterland Harbor",
            "Isolated Chapel",
            "Karakas",
            "Kjeldoran Outpost",
            "Lake of the Dead",
            "Lavaclaw Reaches",
            "Marsh Flats",
            "Maze of Ith",
            "Mishra's Factory",
            "Misty Rainforest",
            "Mutavault",
            "Overgrown Tomb",
            "Plateau",
            "Polluted Delta",
            "Raging Ravine",
            "Rishadan Port",
            "Rootbound Crag",
            "Sacred Foundry",
            "Savannah",
            "Scalding Tarn",
            "Scrubland",
            "Shelldock Isle",
            "Steam Vents",
            "Stirring Wildwood",
            "Stomping Ground",
            "Strip Mine",
            "Sulfur Falls",
            "Sunpetal Grove",
            "Taiga",
            "Tectonic Edge",
            "Teetering Peaks",
            "Temple Garden",
            "Thawing Glaciers",
            "Tolaria West",
            "Treetop Village",
            "Tropical Island",
            "Tundra",
            "Underground Sea",
            "Vault of the Archangel",
            "Verdant Catacombs",
            "Volcanic Island",
            "Volrath's Stronghold",
            "Wasteland",
            "Watery Grave",
            "Windbrisk Heights",
            "Windswept Heath",
            "Wooded Foothills",
            "Woodland Cemetery",
            "Yavimaya Hollow"
        ],

        'Artifact/Colorless': [
            "Æther Vial",
            "Ankh of Mishra",
            "Basalt Monolith",
            "Basilisk Collar",
            "Batterskull",
            "Black Vise",
            "Chrome Mox",
            "Coalition Relic",
            "Coldsteel Heart",
            "Crucible of Worlds",
            "Cursed Scroll",
            "Eldrazi Monument",
            "Engineered Explosives",
            "Everflowing Chalice",
            "Fellwar Stone",
            "Gilded Lotus",
            "Grafted Wargear",
            "Grim Monolith",
            "Isochron Scepter",
            "Lightning Greaves",
            "Lion's Eye Diamond",
            "Lotus Bloom",
            "Lotus Petal",
            "Manriki-Gusari",
            "Memory Jar",
            "Mimic Vat",
            "Mind Stone",
            "Mindslaver",
            "Mortarpod",
            "Mox Diamond",
            "Nevinyrral's Disk",
            "Phyrexian Processor",
            "Pithing Needle",
            "Powder Keg",
            "Prismatic Lens",
            "Pristine Talisman",
            "Ratchet Bomb",
            "Relic of Progenitus",
            "Scroll Rack",
            "Sensei's Divining Top",
            "Shrine of Burning Rage",
            "Skullclamp",
            "Smokestack",
            "Sphere of the Suns",
            "Sword of Body and Mind",
            "Sword of Feast and Famine",
            "Sword of Fire and Ice",
            "Sword of Light and Shadow",
            "Sword of War and Peace",
            "Tangle Wire",
            "Thran Dynamo",
            "Tormod's Crypt",
            "Tumble Magnet",
            "Umezawa's Jitte",
            "Vedalken Shackles",
            "Worn Powerstone",
            "Epochrasite",
            "Etched Oracle",
            "Hex Parasite",
            "Lodestone Golem",
            "Masticore",
            "Molten-Tail Masticore",
            "Myr Battlesphere",
            "Palladium Myr",
            "Phyrexian Revoker",
            "Platinum Angel",
            "Precursor Golem",
            "Razormane Masticore",
            "Solemn Simulacrum",
            "Spellskite",
            "Sundering Titan",
            "Wurmcoil Engine"
        ]
    };

    _recurseNamify(sortedCube);
    deepEqual(
        sortedCube['Artifact/Colorless'],
        mtgoCube['Artifact/Colorless'],
        "matching cube artifacts");
    deepEqual(
        sortedCube['White'],
        mtgoCube['White'],
        "matching cube White cards");
    deepEqual(
        sortedCube['Blue'],
        mtgoCube['Blue'],
        "matching cube Blue cards");
    deepEqual(
        sortedCube['Black'],
        mtgoCube['Black'],
        "matching cube Black cards");
    deepEqual(
        sortedCube['Red'],
        mtgoCube['Red'],
        "matching cube Red cards");
    deepEqual(
        sortedCube['Green'],
        mtgoCube['Green'],
        "matching cube Green cards");
    deepEqual(
        sortedCube['Colorless/!Artifact/!Land'],
        mtgoCube['Colorless/!Artifact/!Land'],
        "matching cube Colorless cards");
    deepEqual(
        sortedCube['Multicolor'],
        mtgoCube['Multicolor'],
        "matching cube Multicolor cards");
    deepEqual(
        sortedCube['Multicolor'],
        mtgoCube['Multicolor'],
        "matching cube Multicolor cards");
    deepEqual(
        sortedCube['Land'],
        mtgoCube['Land'],
        "matching cube Land cards");

});

test( "diffing a cube test", function() {
    var testCube = getCube(1);

    var subCube1 = {
        'Tundra': testCube['Tundra'],
        'Taiga': testCube['Taiga'],
        'Volcanic Island': testCube['Volcanic Island'],
        'Tropical Island': testCube['Tropical Island']
    };

    var subCube2 = {
        'Scrubland': testCube['Scrubland'],
        'Plateau': testCube['Plateau'],
        'Volcanic Island': testCube['Volcanic Island'],
        'Tropical Island': testCube['Tropical Island']
    };

    deepEqual(splitCards({}, {}), {
        added: {},
        removed: {},
        both: {}
    }, 'empty case');
    deepEqual(splitCards(subCube1, {}), {
        added: {},
        removed: subCube1,
        both: {}
    }, 'all removed');
    deepEqual(splitCards({}, subCube1), {
        added: subCube1,
        removed: {},
        both: {}
    }, 'all added');
    deepEqual(splitCards(subCube1, subCube2), {
        added: {
            'Scrubland': testCube['Scrubland'],
            'Plateau': testCube['Plateau']
        },
        removed: {
            'Tundra': testCube['Tundra'],
            'Taiga': testCube['Taiga']
        },
        both: {
            'Volcanic Island': testCube['Volcanic Island'],
            'Tropical Island': testCube['Tropical Island']
        }
    }, 'diffed');


});