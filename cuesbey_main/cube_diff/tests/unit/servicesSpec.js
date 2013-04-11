'use strict';

var namify = function(cube) {
    // it's simpler to write tests that just expect names of
    // cards instead of listing all the attributes of that card
    // so dump it out to just the names
    var _recurseNamify;

    if (jQuery.isArray(cube)) {
        _recurseNamify = function(subCube) {
            jQuery.each(subCube, function(_subName, categoryObject) {

                if (categoryObject.hasOwnProperty('subcategories')) {
                    _recurseNamify(categoryObject.subcategories);
                }

                else if (jQuery.isArray(categoryObject.cards)) {
                    jQuery.each(categoryObject.cards, function(idx, card) {
                        categoryObject.cards[idx] = card['name'];
                    })
                } else {
                    throw "unexpected cube format in namify"
                }
            })
        };
    } else {

        _recurseNamify = function(subCube) {
            jQuery.each(subCube, function(_subName, _subCube) {
                if (jQuery.isArray(_subCube)) {
                    jQuery.each(_subCube, function(idx, card) {
                        _subCube[idx] = card['name'];
                    })
                } else {
                    _recurseNamify(_subCube);
                }
            })};
    }

    _recurseNamify(cube);
    return cube
};

/* jasmine specs for services go here */

describe('service', function() {

    beforeEach(module('cube_diff.services'));

    describe("cardContentServiceTest", function() {
        var $httpBackend, content_svc;
        beforeEach(inject(function ($injector, CardContentService) {
            $httpBackend = $injector.get('$httpBackend');
            content_svc = CardContentService;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should handle a couple sanity checks", function() {
            var wasCalled = false;
            $httpBackend.expectPOST('/card_contents/',
                {card_names: ["Terror"]}, {
                    "Accept": "application/json, text/plain, */*",
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json;charset=utf-8"
                }).respond(200, '');

            content_svc.cacheAllCards(['Terror'], function() {
                wasCalled = true;
            });

            $httpBackend.flush();
            expect(wasCalled).toBe(true);
        });
    });


    describe("cubeDiffServiceTest", function() {
        var diff_svc, split_svc, cubeContents;
        beforeEach(inject(function ($injector, CubeDiffService, CubeSplitService) {
            diff_svc = CubeDiffService;
            split_svc = CubeSplitService;
        }));

        cubeContents = mtgo_cube_og_data;

        var subCube1 = [
            cubeContents['Go for the Throat'],
            cubeContents['Path to Exile'],
            cubeContents['Swords to Plowshares'],
            cubeContents['Taiga'],
            cubeContents['Tropical Island'],
            cubeContents['Tundra'],
            cubeContents['Vampiric Tutor'],
            cubeContents['Volcanic Island']
        ];

        var subCube2 = [
            cubeContents['Brainstorm'],
            cubeContents['Counterspell'],
            cubeContents['Path to Exile'],
            cubeContents['Plateau'],
            cubeContents['Scrubland'],
            cubeContents['Swords to Plowshares'],
            cubeContents['Tropical Island'],
            cubeContents['Volcanic Island']
        ];

        var subCube1WithDuplicates = [
            cubeContents['Terror'],
            cubeContents['Terror'],
            cubeContents['Path to Exile'],
            cubeContents['Swords to Plowshares'],
            cubeContents['Taiga'],
            cubeContents['Taiga'],
            cubeContents['Tropical Island'],
            cubeContents['Tropical Island'],
            cubeContents['Tundra'],
            cubeContents['Plateau'],
            cubeContents['Vampiric Tutor'],
            cubeContents['Volcanic Island']
        ];

        var subCube2WithDuplicates = [
            cubeContents['Brainstorm'],
            cubeContents['Counterspell'],
            cubeContents['Path to Exile'],
            cubeContents['Plateau'],
            cubeContents['Plateau'],
            cubeContents['Scrubland'],
            cubeContents['Scrubland'],
            cubeContents['Swords to Plowshares'],
            cubeContents['Tropical Island'],
            cubeContents['Volcanic Island']
        ];

        it("should handle a couple sanity checks", function() {
            expect(split_svc.splitCards([], [])).toEqual({
                added: [],
                removed: [],
                both: []
            }); //empty case

            expect(split_svc.splitCards(subCube1, [])).toEqual({
                added: [],
                removed: subCube1,
                both: []
            }); //all removed

            expect(split_svc.splitCards([], subCube1)).toEqual({
                added: subCube1,
                removed: [],
                both: []
            }); //all added
        });
        it("should be able to split cards up logically", function() {
            expect(namify(split_svc.splitCards(subCube1, subCube2))).toEqual({
                added: [
                    'Brainstorm',
                    'Counterspell',
                    'Plateau',
                    'Scrubland'
                ],
                removed: [
                    'Go for the Throat',
                    'Taiga',
                    'Tundra',
                    'Vampiric Tutor'
                ],
                both: [
                    'Path to Exile',
                    'Swords to Plowshares',
                    'Tropical Island',
                    'Volcanic Island'
                ]
            }); //diff
        });
        it("should be able to handle duplicates", function() {
            expect(namify(split_svc.splitCards(subCube1WithDuplicates, subCube2WithDuplicates))).toEqual({
                added: [
                    'Brainstorm',
                    'Counterspell',
                    'Plateau',
                    'Scrubland',
                    'Scrubland'
                ],
                removed: [
                    'Taiga',
                    'Taiga',
                    'Terror',
                    'Terror',
                    'Tropical Island',
                    'Tundra',
                    'Vampiric Tutor'
                ],
                both: [
                    'Path to Exile',
                    'Plateau',
                    'Swords to Plowshares',
                    'Tropical Island',
                    'Volcanic Island'
                ]
            }); //diff
        });


        it("should be able to diff a cube with duplicates", function() {
            expect(namify(diff_svc.getDiff(subCube1WithDuplicates, subCube2WithDuplicates, {
                'Instant': {'appearance': 'table'},
                'Land': {}}))).toEqual([
                    {
                    category: 'Instant',
                    // sorted within a category according to the sort function
                    // default in this case
                    appearance: 'table',
                    subcategories: [
                        {category:'both', cards:['Path to Exile', 'Swords to Plowshares']},
                        {category:'removed' , cards: ['Terror', 'Terror', 'Vampiric Tutor']},
                        {category:'added' , cards: ['Brainstorm', 'Counterspell']}
                    ]
                }, {
                    category: 'Land',
                    // sorted within a category according to the sort function
                    // default in this case
                    subcategories: [
                        {category:'both',  cards: ['Plateau', 'Tropical Island', 'Volcanic Island']},
                        {category:'removed', cards: ['Taiga', 'Taiga', 'Tropical Island', 'Tundra']},
                        {category:'added', cards: ['Plateau', 'Scrubland', 'Scrubland']}
                    ]
                }
            ]);
        });

        it('should not have that weird terror bug', function() {
            var before = [
                cubeContents['Damnation'],
                cubeContents['Imperial Seal'],
                cubeContents['Dark Ritual'],
                cubeContents['Doom Blade'],
                cubeContents['Living Death']
            ];

            var after = [
                cubeContents['Damnation'],
                cubeContents['Duress'],
                cubeContents['Dark Ritual'],
                cubeContents['Terror'],
                cubeContents['Living Death']
            ];

            var spec = {
                'Black': {
                    appearance:'table',
                    'Instant': {},
                    'Sorcery': {}
                }
            };

            expect(namify(split_svc.splitCards(before, after))).toEqual({
                    both: ['Damnation', 'Dark Ritual', 'Living Death'],
                    added: ['Duress', 'Terror'],
                    removed: ['Doom Blade', 'Imperial Seal']
                });

            expect(namify(diff_svc.getDiff(before, after, spec,
                undefined, false))).toEqual([{
                    appearance : 'table',
                    category : 'Black',
                    subcategories : [{
                        category : 'Instant',
                        cards : ['Dark Ritual', 'Doom Blade', 'Terror']
                    }, {
                        category : 'Sorcery',
                        cards : ['Damnation', 'Living Death', 'Imperial Seal', 'Duress']
                    }]
                }]);
        });
    });

    describe("sortSpecServiceTest", function() {
        var svc;
        beforeEach(inject(function ($injector, SortSpecService) {
            svc = SortSpecService;
        }));

        var specExpect = function(spec, expectation, handleDiff) {
            var actual = svc.getSkeleton(spec, handleDiff);
            expect(actual.length).toBe(expectation.length);
            expect(actual).toEqual(expectation)
        };

        var diffSpec = [
            {category: 'both', cards: []},
            {category: 'removed', cards: []},
            {category: 'added', cards: []}
        ];

        it('should handle empty specs', function() {
            specExpect(undefined, {});
            specExpect(null, {});
            specExpect({}, {});
            specExpect(undefined, diffSpec, true);
            specExpect(null, diffSpec, true);
            specExpect({}, diffSpec, true);
        });
        it('should handle a spec without mana costs', function() {
            specExpect({
                'Colorless': {},
                'White': {},
                'Blue': {},
                'Black': {},
                'Red': {},
                'Green': {},
                'Artifact': {},
                'Land': {}
            }, [
                {category: 'Colorless', cards:[]},
                {category: 'White', cards: []},
                {category: 'Blue', cards: []},
                {category: 'Black', cards: []},
                {category: 'Red', cards: []},
                {category: 'Green', cards: []},
                {category: 'Artifact', cards: []},
                {category: 'Land', cards: []}
            ]);
            specExpect({
                'Colorless': {},
                'White': {},
                'Blue': {},
                'Black': {},
                'Red': {},
                'Green': {},
                'Artifact': {},
                'Land': {}
            }, [
                {category: 'Colorless', subcategories: diffSpec},
                {category: 'White', subcategories: diffSpec},
                {category: 'Blue', subcategories: diffSpec},
                {category: 'Black', subcategories: diffSpec},
                {category: 'Red', subcategories: diffSpec},
                {category: 'Green', subcategories: diffSpec},
                {category: 'Artifact', subcategories: diffSpec},
                {category: 'Land', subcategories: diffSpec}
            ], true);
        });
        it('should handle specs with mana costs', function() {
            specExpect({'Colorless': {
                'Creature': {
                    'cmc<=1': {},
                    'cmc==2': {},
                    'cmc==3': {},
                    'cmc==4': {},
                    'cmc==5': {},
                    'cmc==6': {},
                    'cmc>=7': {}

                },
                '!Creature': {
                    'Instant/Sorcery': {},
                    'Planeswalker': {},
                    'Enchantment': {},
                    'Land': {}
                }
            },
                'White': {
                    'cmc<=1': {
                        'Creature': {},
                        '!Creature': {}
                    },
                    'cmc==2': {
                        'Creature': {},
                        '!Creature': {}
                    },
                    'cmc==3': {
                        'Creature': {},
                        '!Creature': {}
                    },
                    'cmc==4': {
                        'Creature': {},
                        '!Creature': {}
                    },
                    'cmc==5': {
                        'Creature': {},
                        '!Creature': {}
                    },
                    'cmc==6': {
                        'Creature': {},
                        '!Creature': {}
                    },
                    'cmc>=7': {
                        'Creature': {},
                        '!Creature': {}
                    }
                }
            }, [{
                category: "Colorless",
                subcategories: [{
                    category: "Creature",
                    subcategories: [
                        {category: "cmc<=1", cards: []},
                        {category: "cmc==2", cards: []},
                        {category: "cmc==3", cards: []},
                        {category: "cmc==4", cards: []},
                        {category: "cmc==5", cards: []},
                        {category: "cmc==6", cards: []},
                        {category: "cmc>=7", cards: []}
                    ]
                }, {
                    category:"!Creature",
                    subcategories: [
                        {category: "Instant/Sorcery", cards: []},
                        {category: "Planeswalker", cards: []},
                        {category: "Enchantment", cards: []},
                        {category: "Land", cards: []}
                    ]
                }]}, {
                category: "White",
                subcategories: [{
                    category: 'cmc<=1',
                    subcategories: [
                        {category: "Creature", cards: []},
                        {category: "!Creature", cards: []}
                    ]
                }, {
                    category: 'cmc==2',
                    subcategories: [
                        {category: "Creature", cards: []},
                        {category: "!Creature", cards: []}
                    ]
                }, {
                    category: 'cmc==3',
                    subcategories: [
                        {category: "Creature", cards: []},
                        {category: "!Creature", cards: []}
                    ]
                }, {
                    category: 'cmc==4',
                    subcategories: [
                        {category: "Creature", cards: []},
                        {category: "!Creature", cards: []}
                    ]
                }, {
                    category: 'cmc==5',
                    subcategories: [
                        {category: "Creature", cards: []},
                        {category: "!Creature", cards: []}
                    ]
                }, {
                    category: 'cmc==6',
                    subcategories: [
                        {category: "Creature", cards: []},
                        {category: "!Creature", cards: []}
                    ]
                }, {
                    category: 'cmc>=7',
                    subcategories: [
                        {category: "Creature", cards: []},
                        {category: "!Creature", cards: []}
                    ]
                }]
            }]);
        });

        it('should handle appearance keys not at the top level', function() {

            specExpect({
                'Creature': {
                    'White': {
                        'appearance': 'div',
                        'converted_mana_cost>=1': {
                            'appearance': 'table'
                        }
                    }
                }
            }, [{
                'category': 'Creature',
                'subcategories': [{
                    'category': 'White',
                    'appearance': 'div',
                    'subcategories': [{
                        category: 'converted_mana_cost>=1',
                        appearance: 'table',
                        subcategories: diffSpec
                    }]
                }]
            }], true);
        });

    });

    describe("cubeSortServiceTest", function() {

        var svc, cubeContents;

        cubeContents = mtgo_cube_og_data_array;

        beforeEach(inject(function ($injector, CubeSortService) {
            svc = CubeSortService;
        }));

        it('should sort with a custom sort function', function() {
            // this tries to sort it like the original MTGO cube announcement
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
                    "Eight-and-a-Half-Tails",
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
                    "Fire // Ice",
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

            var sortedCube = svc.sortCube(cubeContents, {
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
                    jQuery.each(typeArray, function(idx, type) {
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
                    // safari needs it actually return negative
                    return card_a_sort_name > card_b_sort_name ? 1:-1;
                } else {
                    // safari needs it actually return negative
                    return card_a_types > card_b_types ? 1:-1;
                }

            });

            namify(sortedCube);

            var categoryExpect = function(index, category) {
                expect(sortedCube[index].cards).toEqual(mtgoCube[category]);
                // useful for figuring out which thing is the first out of order
                // if needed to debug
//                for (var i=0;i<sortedCube[category].length;i++)
//                {
//                    expect(sortedCube[category][i]).toBe(mtgoCube[category][i])
//                }
            };

            categoryExpect(0, 'Colorless/!Artifact/!Land');
            categoryExpect(1, 'Multicolor');
            categoryExpect(2, 'White');
            categoryExpect(3, 'Blue');
            categoryExpect(4, 'Black');
            categoryExpect(5, 'Red');
            categoryExpect(6, 'Green');
            categoryExpect(7, 'Artifact/Colorless');
            categoryExpect(8, 'Land');
        });

        it('should sort with all the supported categories', function() {
            // this tries to sort it like the original MTGO cube announcement

            var baseCube = [
                mtgo_cube_og_data['Damnation'],
                mtgo_cube_og_data['Vampiric Tutor'],
                mtgo_cube_og_data['Doom Blade'],
                mtgo_cube_og_data['Karn Liberated'],
                mtgo_cube_og_data['Thran Dynamo'],
                mtgo_cube_og_data['Wasteland'],
                mtgo_cube_og_data['Tidehollow Sculler'],
                mtgo_cube_og_data['Liliana of the Veil'],
                mtgo_cube_og_data['Sorin Markov'],
                mtgo_cube_og_data['Sphinx of the Steel Wind']
            ];

            var sortedCube = svc.sortCube(baseCube, {
                'Multicolor': {
                    'converted_mana_cost<4': {},
                    'converted_mana_cost>=4': {}
                },
                'Colorless': {
                    'Artifact': {},
                    '!Artifact': {}
                },
                'Black': {
                    'Instant/converted_mana_cost==1': {},
                    'Instant/converted_mana_cost!=1': {},
                    'Sorcery': {},
                    'Planeswalker': {}
                }
            });

            namify(sortedCube);

            expect(sortedCube).toEqual([{
                category: 'Multicolor',
                subcategories: [{
                    category: 'converted_mana_cost<4',
                    cards: ['Tidehollow Sculler']
                }, {
                    category: 'converted_mana_cost>=4',
                    cards: ['Sphinx of the Steel Wind']
                }]
            }, {
                category: 'Colorless',
                subcategories: [{
                    category: 'Artifact',
                    cards: ['Thran Dynamo']
                }, {
                    category: '!Artifact',
                    cards: [
                        'Karn Liberated',
                        'Wasteland'
                    ]
                }]
            }, {
                category: 'Black',
                subcategories: [{
                    category: 'Instant/converted_mana_cost==1',
                    cards: ['Vampiric Tutor']
                }, {
                    category: 'Instant/converted_mana_cost!=1',
                    cards: ['Doom Blade']
                }, {
                    category: 'Sorcery',
                    cards: ['Damnation']
                }, {
                    category: 'Planeswalker',
                    cards: [
                        'Liliana of the Veil',
                        'Sorin Markov'
                    ]
                }]
            }]);
        });

    });

    describe("namesFromTextTest", function() {
        var svc;
        var expected = [
            'Elite Vanguard',
            'Wrath of God',
            'Wrath of God'
        ];
        beforeEach(inject(function ($injector, NamesFromTextService) {
            svc = NamesFromTextService;
        }));

        it('should handle one valid card per line', function() {
            expect(svc.getNames(
                    'Elite Vanguard\n'+
                    'Wrath of God\n' +
                    'Wrath of God\n'
            )).toEqual(expected);
                expect(svc.getNames(
                    'Elite Vanguard\n'+
                    '\n'+
                    'Wrath of God\n' +
                    'Wrath of God'
            )).toEqual(expected);
        });

        it('should handle one card per line and handle extra space', function() {
            expect(svc.getNames(
                    'Elite Vanguard \n'+
                    'Wrath of God \n' +
                    ' Wrath of God\n'
            )).toEqual(expected);
        });

        it('should handle tapped-out style formatting', function() {
            expect(svc.getNames(
                    '1x Elite Vanguard \n'+
                    '2x Wrath of God\n'
            )).toEqual(expected);
            expect(svc.getNames(
                    '1x Elite Vanguard *F*\n'+
                    'Wrath of God [M10]\n'+
                    '1x Wrath of God [ZEN] *GE*\n'
            )).toEqual(expected);
        });
    });

    describe("cardCategoryServiceTest", function() {
        var svc, cubeContents;
        cubeContents = mtgo_cube_og_data;

        beforeEach(inject(function ($injector, CardCategoryService) {
            svc = CardCategoryService;
        }));

        var eliteVanguard = cubeContents['Elite Vanguard'];
        var karn = cubeContents['Karn Liberated'];
        var dynamo = cubeContents['Thran Dynamo'];
        var sculler = cubeContents['Tidehollow Sculler'];
        var damnation = cubeContents['Damnation'];
        var emrakul = mtgo_cube_rtr_data['Emrakul, the Aeons Torn'];
        var devilsPlay = cubeContents["Devil's Play"];
        var souls = cubeContents["Lingering Souls"];
        var legionnaire = cubeContents["Porcelain Legionnaire"];

        it('should handle diff categories', function() {
            expect(svc.matchesCategory('both', {_diffResult: 'both'})).toBe(true);
            expect(svc.matchesCategory('added', {_diffResult: 'both'})).toBe(false);
            expect(svc.matchesCategory('added', {_diffResult: 'added'})).toBe(true);
            expect(svc.matchesCategory('removed', {_diffResult: 'removed'})).toBe(true);
            expect(svc.matchesCategory('added', eliteVanguard)).toBe(false);
            expect(svc.matchesCategory('added', jQuery.extend({}, eliteVanguard, {_diffResult: 'added'}))).toBe(true);
            expect(svc.matchesCategory('added', jQuery.extend({}, eliteVanguard, {_diffResult: 'both'}))).toBe(false);
        });

        it('should handle monocolor and negation', function() {
            expect(svc.matchesCategory('White', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!Blue/!Black', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!White', eliteVanguard)).toBe(false);
            // a white and black card is white
            expect(svc.matchesCategory('White', sculler)).toBe(false);
        });
        it('should handle simple types and negation', function() {

            expect(svc.matchesCategory('Creature', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!Creature', eliteVanguard)).toBe(false);
        });

        it('should handle either/or categories intelligently', function() {
            expect(svc.matchesCategory('Sorcery|Instant', eliteVanguard)).toBe(false);
            expect(svc.matchesCategory('Artifact|Creature|Planeswalker', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('Colorless/Artifact|Creature|Planeswalker', karn)).toBe(true);
            expect(svc.matchesCategory('Sorcery|Instant', damnation)).toBe(true);
            expect(svc.matchesCategory('!Sorcery|!Black', damnation)).toBe(false);
            // this is an unhelpful category, but a sorcery is not an instant, sooo...
            expect(svc.matchesCategory('!Sorcery|!Instant', damnation)).toBe(true);
            // Black "spells"
            expect(svc.matchesCategory('Black/Sorcery|Instant', damnation)).toBe(true);
            expect(svc.matchesCategory('Sorcery|Instant/Black', damnation)).toBe(true);
            expect(svc.matchesCategory('Blue/Sorcery|Instant', damnation)).toBe(false);
            expect(svc.matchesCategory('Sorcery|Instant/Blue', damnation)).toBe(false);
            expect(svc.matchesCategory('Sorcery|Creature/Black', damnation)).toBe(true);
            expect(svc.matchesCategory('Instant|Creature/Black', damnation)).toBe(false);
            // this isn't that helpful, but there it is
            expect(svc.matchesCategory('converted_mana_cost<3|converted_mana_cost>=0', sculler)).toBe(true);
            // this isn't possible, but again, there it is
            expect(svc.matchesCategory('converted_mana_cost>3/converted_mana_cost<=0', sculler)).toBe(false);
        });

        it('should handle colorless checks', function() {

            expect(svc.matchesCategory('!Colorless', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('Colorless', eliteVanguard)).toBe(false);
            expect(svc.matchesCategory('!Colorless', karn)).toBe(false);
            expect(svc.matchesCategory('Colorless', karn)).toBe(true);
            expect(svc.matchesCategory('!Colorless', dynamo)).toBe(false);
            expect(svc.matchesCategory('Colorless', dynamo)).toBe(true);
        });

        it('should distinguish between colorless and artifacts', function() {
            expect(svc.matchesCategory('Colorless/Artifact', karn)).toBe(false);
            expect(svc.matchesCategory('Colorless/!Artifact', karn)).toBe(true);
            expect(svc.matchesCategory('Colorless/!Artifact/!Land', karn)).toBe(true);
            expect(svc.matchesCategory('Colorless/Artifact', dynamo)).toBe(true);
            expect(svc.matchesCategory('Colorless/!Artifact', dynamo)).toBe(false);
            expect(svc.matchesCategory('Colorless/Artifact/!Land', dynamo)).toBe(true);
            expect(svc.matchesCategory('Colorless/Artifact', dynamo)).toBe(true);
            expect(svc.matchesCategory('Artifact', sculler)).toBe(true);
            expect(svc.matchesCategory('Multicolor/Artifact', sculler)).toBe(true);
            expect(svc.matchesCategory('!Colorless/Artifact', sculler)).toBe(true);
        });

        it('should allow intelligent combinations of categories', function() {
            expect(svc.matchesCategory('Colorless', sculler)).toBe(false);
            expect(svc.matchesCategory('Artifact/Colorless', sculler)).toBe(false);
            expect(svc.matchesCategory('Colorless/Artifact/Land', dynamo)).toBe(false);
            expect(svc.matchesCategory('Colorless/Land/Artifact', dynamo)).toBe(false);
            expect(svc.matchesCategory('Colorless/Artifact', sculler)).toBe(false);
        });

        it('should handle converted mana cost', function() {
            jQuery.each(['cmc', 'converted_mana_cost'], function(idx, cmc) {
                // support a short a long form
                expect(svc.matchesCategory(cmc + '==2', sculler)).toBe(true);
                expect(svc.matchesCategory(cmc + '<=2', sculler)).toBe(true);
                expect(svc.matchesCategory(cmc + '<=3', sculler)).toBe(true);
                expect(svc.matchesCategory(cmc + '<3', sculler)).toBe(true);
                expect(svc.matchesCategory(cmc + '<3/' + cmc + '>=0', sculler)).toBe(true);
                expect(svc.matchesCategory(cmc + '==2', dynamo)).toBe(false);
                expect(svc.matchesCategory(cmc + '<=2', dynamo)).toBe(false);
                expect(svc.matchesCategory(cmc + '<=3', dynamo)).toBe(false);
                expect(svc.matchesCategory(cmc + '<3', dynamo)).toBe(false);
                // in case there was ever a lexicographical vs numerical sort thing
                expect(svc.matchesCategory(cmc + '>3', emrakul)).toBe(true);
                expect(svc.matchesCategory(cmc + '<3', emrakul)).toBe(false);
            })
        });

        it('should handle the "any" case', function() {
            // support a short a long form
            expect(svc.matchesCategory('Any', sculler)).toBe(true);
            expect(svc.matchesCategory('!Any', sculler)).toBe(false);
            expect(svc.matchesCategory('Any|Artifact', sculler)).toBe(true);
            expect(svc.matchesCategory('Any/Artifact', sculler)).toBe(true);
            expect(svc.matchesCategory('Any/!Artifact', sculler)).toBe(false);
            expect(svc.matchesCategory('!Any', sculler)).toBe(false);
            expect(svc.matchesCategory('!Any/Artifact', sculler)).toBe(false);
            expect(svc.matchesCategory('!Any|Artifact', sculler)).toBe(true);
        });

        var assertChanged = function(category, card,
                                     heuristics, preHeuristic) {
            heuristics = heuristics || [];
            expect(svc.matchesCategory(category, card)).toBe(preHeuristic);
            //it's now different after the heuristic is applied
            expect(svc.matchesCategory(
                category, card, heuristics
            )).toBe(!preHeuristic);
        };

        var assertUnchanged = function(category, card,
                                       heuristics, preHeuristic) {
            heuristics = heuristics || [];
            expect(svc.matchesCategory(category, card)).toBe(preHeuristic);
            //it's not different after the heuristic is applied
            expect(svc.matchesCategory(
                category, card, heuristics
            )).toBe(preHeuristic);
        };

        it('should handle heuristics that override categories', function() {

            assertChanged('!Creature', souls, ['token_spells_are_creatures'], true);
            // they don't always overwrite
            assertUnchanged('Sorcery', souls, ['token_spells_are_creatures'], true);
            assertChanged('Multicolor', souls, ['off_color_flashback_is_gold'], false);
            assertChanged('converted_mana_cost==3', legionnaire, ['phyrexian_always_pays_life'], true);
            assertChanged('converted_mana_cost==2', legionnaire, ['phyrexian_always_pays_life'], false);
            assertChanged('White', legionnaire, ['phyrexian_always_pays_life'], true);
            assertChanged('Colorless', legionnaire, ['phyrexian_always_pays_life'], false);
            // they don't always affect things
            assertUnchanged('Artifact', legionnaire, ['phyrexian_always_pays_life'], true);
            assertChanged('converted_mana_cost==X', devilsPlay, ['x_spells_are_infinite'], false);
            assertChanged('converted_mana_cost==1', devilsPlay, ['x_spells_are_infinite'], true);
            assertChanged('converted_mana_cost>=6', devilsPlay, ['x_spells_are_infinite'], false);
        });

        it('shouldn\'t mess up if a card has no heuristics', function() {
            assertUnchanged('White', eliteVanguard, ['token_spells_are_creatures'], true);
        });

        it('should handle converted mana costs with X', function() {
            expect(svc.matchesCategory('converted_mana_cost<X', emrakul)).toBe(true);
            expect(svc.matchesCategory('converted_mana_cost>X', emrakul)).toBe(false);
        });
    });
});
