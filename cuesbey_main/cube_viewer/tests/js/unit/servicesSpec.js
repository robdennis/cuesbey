'use strict';

/* jasmine specs for services go here */

describe('service', function() {

    beforeEach(module('cubeViewer.services'));

    describe("cubeSortServiceTest", function() {

        var namify = function(cube) {
            var _recurseNamify = function(subCube) {
                jQuery.each(subCube, function(_subName, _subCube) {
                    if (jQuery.isArray(_subCube)) {
                        jQuery.each(_subCube, function(idx, card) {
                            _subCube[idx] = card['name'];
                        })
                    } else {
                        _recurseNamify(_subCube);
                    }
                })
            };

            _recurseNamify(cube);
            return cube
        };
        var svc, cubeContents;

        cubeContents = modo_cube_og_data;

        beforeEach(inject(function ($injector, CubeSortService) {
            svc = CubeSortService;
        }));

        it('should sort with a custom sort function', function() {
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

            var categoryExpect = function(category) {
                expect(sortedCube[category]).toEqual(mtgoCube[category]);
                // useful for figuring out which thing is the first out of order
                // if needed to debug
//                for (var i=0;i<sortedCube[category].length;i++)
//                {
//                    expect(sortedCube[category][i]).toBe(mtgoCube[category][i])
//                }
            };

            categoryExpect('Artifact/Colorless');
            categoryExpect('Colorless/!Artifact/!Land');
            categoryExpect('White');
            categoryExpect('Blue');
            categoryExpect('Black');
            categoryExpect('Red');
            categoryExpect('Green');
            categoryExpect('Multicolor');
            categoryExpect('Land');
        });

    });

    describe("cardCategoryServiceTest", function() {
        var svc, cubeContents;
        cubeContents = modo_cube_og_data;

        beforeEach(inject(function ($injector, CardCategoryService) {
            svc = CardCategoryService;
        }));

        var eliteVanguard = cubeContents['Elite Vanguard'];
        var karn = cubeContents['Karn Liberated'];
        var dynamo = cubeContents['Thran Dynamo'];
        var sculler = cubeContents['Tidehollow Sculler'];
        var damnation = cubeContents['Damnation'];

        it('should handle monocolor and negation', function() {
            expect(svc.matchesCategory('White', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!Blue/!Black', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!White', eliteVanguard)).toBe(false);
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
    });
});
