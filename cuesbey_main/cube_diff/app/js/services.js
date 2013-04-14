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
    .factory('DefaultsService', function() {
        return {
            spec: function() {
                var cmcSlots = {
                    'appearance': 'table',
                    'cmc<=1': {},
                    'cmc==2': {},
                    'cmc==3': {},
                    'cmc==4': {},
                    'cmc==5': {},
                    'cmc==6': {},
                    'cmc>=7': {}
                };
                return {
                    'MonoWhite': {
                        'Creature': cmcSlots,
                        '!Creature': cmcSlots
                    },
                    'MonoBlue': {
                        'Creature': cmcSlots,
                        '!Creature': cmcSlots
                    },
                    'MonoBlack': {
                        'Creature': cmcSlots,
                        '!Creature': cmcSlots
                    },
                    'MonoRed': {
                        'Creature': cmcSlots,
                        '!Creature': cmcSlots
                    },
                    'MonoGreen': {
                        'Creature': cmcSlots,
                        '!Creature': cmcSlots
                    },
                    'Colorless/!Land': {
                        'Creature': cmcSlots,
                        '!Creature': cmcSlots
                    },

                    'Colorless/Land': {
                        appearance:'table'
                    },
                    'Multicolor': {
                        appearance:'table',
                        'White/Blue/2-color': {},
                        'White/Black/2-color': {},
                        'White/Red/2-color': {},
                        'White/Green/2-color': {},
                        'Blue/Black/2-color': {},
                        'Blue/Red/2-color': {},
                        'Blue/Green/2-color': {},
                        'Black/Red/2-color': {},
                        'Black/Green/2-color': {},
                        '3+ Color': {}

                    }
                };
            },
            beforeNames: function() {
                return [
                    "Absorb",
                    "Abyssal Persecutor",
                    "Academy Rector",
                    "Academy Ruins",
                    "Acidic Slime",
                    "Act of Aggression",
                    "Aeon Chronicler",
                    "AEther Adept",
                    "AEther Vial",
                    "Aftershock",
                    "Agony Warp",
                    "Ajani Goldmane",
                    "Ajani Vengeant",
                    "Akroma, Angel of Fury",
                    "Akroma, Angel of Wrath",
                    "Akroma's Vengeance",
                    "All Is Dust",
                    "Ambition's Cost",
                    "Ancestral Vision",
                    "Ancient Grudge",
                    "Ancient Tomb",
                    "Angel of Despair",
                    "Angelic Destiny",
                    "Animate Dead",
                    "Ankh of Mishra",
                    "Arbor Elf",
                    "Arc Lightning",
                    "Arc Trail",
                    "Arid Mesa",
                    "Armageddon",
                    "Augury Adept",
                    "Avacyn's Pilgrim",
                    "Avalanche Riders",
                    "Aven Mindcensor",
                    "Avenger of Zendikar",
                    "Awakening Zone",
                    "Badlands",
                    "Balance",
                    "Ball Lightning",
                    "Bane of the Living",
                    "Banefire",
                    "Baneslayer Angel",
                    "Bant Charm",
                    "Barbarian Ring",
                    "Basalt Monolith",
                    "Basilisk Collar",
                    "Batterskull",
                    "Bayou",
                    "Beacon of Destruction",
                    "Beast Within",
                    "Behemoth Sledge",
                    "Birds of Paradise",
                    "Birthing Pod",
                    "Bitterblossom",
                    "Bituminous Blast",
                    "Black Knight",
                    "Black Vise",
                    "Blade Splicer",
                    "Blastoderm",
                    "Blistering Firecat",
                    "Blood Crypt",
                    "Blood Knight",
                    "Bloodbraid Elf",
                    "Bloodghast",
                    "Bloodgift Demon",
                    "Bloodstained Mire",
                    "Blue Elemental Blast",
                    "Bogardan Hellkite",
                    "Boggart Ram-Gang",
                    "Bone Shredder",
                    "Braids, Cabal Minion",
                    "Brainstorm",
                    "Breeding Pool",
                    "Brimstone Volley",
                    "Brine Elemental",
                    "Brooding Saurian",
                    "Broodmate Dragon",
                    "Buried Alive",
                    "Burning of Xinye",
                    "Burrenton Forge-Tender",
                    "Cabal Coffers",
                    "Calciderm",
                    "Call of the Herd",
                    "Call the Skybreaker",
                    "Capsize",
                    "Careful Consideration",
                    "Carnophage",
                    "Cataclysm",
                    "Catastrophe",
                    "Celestial Colonnade",
                    "Celestial Purge",
                    "Chain Lightning",
                    "Chameleon Colossus",
                    "Chandra Nalaar",
                    "Chandra, the Firebrand",
                    "Chandra's Phoenix",
                    "Channel",
                    "Chaos Warp",
                    "Char",
                    "Chrome Mox",
                    "City of Traitors",
                    "Clifftop Retreat",
                    "Cloudgoat Ranger",
                    "Cloudthresher",
                    "Coalition Relic",
                    "Cold-Eyed Selkie",
                    "Coldsteel Heart",
                    "Compulsive Research",
                    "Condemn",
                    "Consecrated Sphinx",
                    "Consuming Vapors",
                    "Control Magic",
                    "Corpse Dance",
                    "Counterspell",
                    "Countryside Crusher",
                    "Court Hussar",
                    "Creakwood Liege",
                    "Creeping Tar Pit",
                    "Crucible of Worlds",
                    "Cruel Ultimatum",
                    "Cryptic Command",
                    "Cultivate",
                    "Cursecatcher",
                    "Cursed Scroll",
                    "Damnation",
                    "Dark Confidant",
                    "Dark Ritual",
                    "Dauthi Horror",
                    "Dauthi Marauder",
                    "Dauthi Slayer",
                    "Day of Judgment",
                    "Daybreak Ranger",
                    "Daze",
                    "Death Cloud",
                    "Deathmark",
                    "Decree of Justice",
                    "Deep Analysis",
                    "Demonic Tutor",
                    "Deprive",
                    "Deranged Hermit",
                    "Desertion",
                    "Despise",
                    "Destructive Force",
                    "Devastating Dreams",
                    "Devil's Play",
                    "Devoted Druid",
                    "Diabolic Servitude",
                    "Diregraf Ghoul",
                    "Disenchant",
                    "Disfigure",
                    "Dismantling Blow",
                    "Dismember",
                    "Dismiss",
                    "Dissipate",
                    "Doom Blade",
                    "Doran, the Siege Tower",
                    "Dragonskull Summit",
                    "Dream Halls",
                    "Drogskol Reaver",
                    "Drowned Catacomb",
                    "Duress",
                    "Earthquake",
                    "Edric, Spymaster of Trest",
                    "Eight-and-a-Half-Tails",
                    "Eldrazi Monument",
                    "Electrolyze",
                    "Elesh Norn, Grand Cenobite",
                    "Elite Vanguard",
                    "Elspeth Tirel",
                    "Elspeth, Knight-Errant",
                    "Elves of Deep Shadow",
                    "Ember Hauler",
                    "Emeria Angel",
                    "Empty the Warrens",
                    "Enclave Cryptologist",
                    "Engineered Explosives",
                    "Enlightened Tutor",
                    "Entomb",
                    "Epochrasite",
                    "Esper Charm",
                    "Essence Scatter",
                    "Etched Oracle",
                    "Eternal Dragon",
                    "Eternal Witness",
                    "Ethersworn Canonist",
                    "Everflowing Chalice",
                    "Exalted Angel",
                    "Exhume",
                    "Explore",
                    "Fact or Fiction",
                    "Faith's Fetters",
                    "Falkenrath Aristocrat",
                    "Farseek",
                    "Fathom Seer",
                    "Fauna Shaman",
                    "Fellwar Stone",
                    "Fertile Ground",
                    "Fiend Hunter",
                    "Figure of Destiny",
                    "Fire // Ice",
                    "Fire Ambush",
                    "Fireblast",
                    "Firebolt",
                    "Firemane Angel",
                    "Firespout",
                    "Firestorm",
                    "Flametongue Kavu",
                    "Flashfreeze",
                    "Flickerwisp",
                    "Flooded Strand",
                    "Forbid",
                    "Forbidden Alchemy",
                    "Force of Will",
                    "Force Spike",
                    "Frantic Search",
                    "Frenzied Goblin",
                    "Frost Titan",
                    "Future Sight",
                    "Fyndhorn Elves",
                    "Gaea's Cradle",
                    "Gamble",
                    "Garruk Relentless",
                    "Garruk Wildspeaker",
                    "Garruk, Primal Hunter",
                    "Gatekeeper of Malakir",
                    "Gathan Raiders",
                    "Geist of Saint Traft",
                    "Genesis",
                    "Genesis Wave",
                    "Genju of the Spires",
                    "Geralf's Messenger",
                    "Ghitu Encampment",
                    "Giant Solifuge",
                    "Gideon Jura",
                    "Gideon's Lawkeeper",
                    "Gifts Ungiven",
                    "Gilded Lotus",
                    "Glacial Fortress",
                    "Glen Elendra Archmage",
                    "Glorious Anthem",
                    "Go for the Throat",
                    "Goblin Goon",
                    "Goblin Guide",
                    "Goblin Legionnaire",
                    "Goblin Ruinblaster",
                    "Goblin Trenches",
                    "Goblin Wardriver",
                    "Goblin Welder",
                    "Godless Shrine",
                    "Grafted Wargear",
                    "Grand Arbiter Augustin IV",
                    "Grave Titan",
                    "Graveborn Muse",
                    "Gravecrawler",
                    "Great Sable Stag",
                    "Greater Gargadon",
                    "Green Sun's Zenith",
                    "Grim Backwoods",
                    "Grim Lavamancer",
                    "Grim Monolith",
                    "Grimgrin, Corpse-Born",
                    "Hallowed Burial",
                    "Hallowed Fountain",
                    "Harmonize",
                    "Havengul Lich",
                    "Heartbeat of Spring",
                    "Hell's Thunder",
                    "Hellspark Elemental",
                    "Hero of Bladehold",
                    "Hero of Oxid Ridge",
                    "Hex Parasite",
                    "Hinterland Harbor",
                    "Hokori, Dust Drinker",
                    "Honor of the Pure",
                    "Huntmaster of the Fells",
                    "Hymn to Tourach",
                    "Hypnotic Specter",
                    "Hystrodon",
                    "Ideas Unbound",
                    "Imperial Seal",
                    "Impulse",
                    "Incinerate",
                    "Increasing Devotion",
                    "Indrik Stomphowler",
                    "Inferno Titan",
                    "Ingot Chewer",
                    "Ink-Eyes, Servant of Oni",
                    "Innocent Blood",
                    "Inquisition of Kozilek",
                    "Into the Roil",
                    "Intuition",
                    "Iona, Shield of Emeria",
                    "Isamaru, Hound of Konda",
                    "Isochron Scepter",
                    "Isolated Chapel",
                    "Jace Beleren",
                    "Jace, the Mind Sculptor",
                    "Jackal Pup",
                    "Jokulhaups",
                    "Joraga Treespeaker",
                    "Journey to Nowhere",
                    "Jungle Lion",
                    "Jushi Apprentice",
                    "Kami of Ancient Law",
                    "Karakas",
                    "Kargan Dragonlord",
                    "Karn Liberated",
                    "Keiga, the Tide Star",
                    "Keldon Champion",
                    "Keldon Marauders",
                    "Kira, Great Glass-Spinner",
                    "Kird Ape",
                    "Kitchen Finks",
                    "Kjeldoran Outpost",
                    "Knight of the Reliquary",
                    "Kodama's Reach",
                    "Kokusho, the Evening Star",
                    "Korlash, Heir to Blackblade",
                    "Koth of the Hammer",
                    "Kozilek, Butcher of Truth",
                    "Krosan Grip",
                    "Lake of the Dead",
                    "Land Tax",
                    "Laquatus's Champion",
                    "Lavaclaw Reaches",
                    "Lead the Stampede",
                    "Leatherback Baloth",
                    "Legacy's Allure",
                    "Leonin Relic-Warder",
                    "Life from the Loam",
                    "Lightning Bolt",
                    "Lightning Greaves",
                    "Lightning Helix",
                    "Liliana of the Veil",
                    "Liliana Vess",
                    "Lingering Souls",
                    "Lion's Eye Diamond",
                    "Living Death",
                    "Llanowar Elves",
                    "Loam Lion",
                    "Lodestone Golem",
                    "Looter il-Kor",
                    "Lotus Bloom",
                    "Lotus Cobra",
                    "Lotus Petal",
                    "Loxodon Hierarch",
                    "Loyal Cathar",
                    "Loyal Retainers",
                    "Lu Xun, Scholar General",
                    "Luminarch Ascension",
                    "Maelstrom Pulse",
                    "Magma Jet",
                    "Magus of the Tabernacle",
                    "Makeshift Mannequin",
                    "Man-o'-War",
                    "Mana Leak",
                    "Mana Tithe",
                    "Manriki-Gusari",
                    "Marsh Flats",
                    "Martial Coup",
                    "Master of the Wild Hunt",
                    "Masticore",
                    "Maze of Ith",
                    "Meloku the Clouded Mirror",
                    "Memory Jar",
                    "Memory Lapse",
                    "Mentor of the Meek",
                    "Mesmeric Fiend",
                    "Mikaeus, the Lunarch",
                    "Mimic Vat",
                    "Mind Shatter",
                    "Mind Stone",
                    "Mind's Desire",
                    "Mindslaver",
                    "Mirari's Wake",
                    "Mirran Crusader",
                    "Mirror Entity",
                    "Miscalculation",
                    "Mishra's Factory",
                    "Misty Rainforest",
                    "Mogg War Marshal",
                    "Mold Shambler",
                    "Moldervine Cloak",
                    "Molten Rain",
                    "Molten-Tail Masticore",
                    "Moment's Peace",
                    "Momentary Blink",
                    "Mortarpod",
                    "Mortify",
                    "Mother of Runes",
                    "Mox Diamond",
                    "Mulldrifter",
                    "Mutavault",
                    "Myr Battlesphere",
                    "Mystic Snake",
                    "Mystical Tutor",
                    "Nantuko Shade",
                    "Nantuko Vigilante",
                    "Narcolepsy",
                    "Natural Order",
                    "Naturalize",
                    "Necromancy",
                    "Necropotence",
                    "Negate",
                    "Nekrataal",
                    "Neurok Commando",
                    "Nevinyrral's Disk",
                    "Nezumi Graverobber",
                    "Nezumi Shortfang",
                    "Nicol Bolas, Planeswalker",
                    "Night's Whisper",
                    "Nightscape Familiar",
                    "Ninja of the Deep Hours",
                    "Niv-Mizzet, the Firemind",
                    "Noble Hierarch",
                    "Nostalgic Dreams",
                    "Nucklavee",
                    "Obliterate",
                    "Oblivion Ring",
                    "Obstinate Baloth",
                    "Ohran Viper",
                    "Old Man of the Sea",
                    "Olivia Voldaren",
                    "Oona's Prowler",
                    "Opportunity",
                    "Opposition",
                    "Opt",
                    "Oracle of Mul Daya",
                    "Orcish Lumberjack",
                    "Oust",
                    "Overgrown Battlement",
                    "Overgrown Tomb",
                    "Pact of Negation",
                    "Paladin en-Vec",
                    "Palinchron",
                    "Palladium Myr",
                    "Parallax Wave",
                    "Path to Exile",
                    "Pernicious Deed",
                    "Phantasmal Bear",
                    "Phantom Centaur",
                    "Phyrexian Arena",
                    "Phyrexian Crusader",
                    "Phyrexian Metamorph",
                    "Phyrexian Negator",
                    "Phyrexian Obliterator",
                    "Phyrexian Processor",
                    "Phyrexian Rager",
                    "Phyrexian Revoker",
                    "Pillage",
                    "Pithing Needle",
                    "Plague Sliver",
                    "Plateau",
                    "Platinum Angel",
                    "Plow Under",
                    "Polluted Delta",
                    "Ponder",
                    "Porcelain Legionnaire",
                    "Powder Keg",
                    "Power Sink",
                    "Precursor Golem",
                    "Preordain",
                    "Price of Progress",
                    "Priest of Urabrask",
                    "Primal Command",
                    "Primeval Titan",
                    "Primordial Hydra",
                    "Prismatic Lens",
                    "Pristine Talisman",
                    "Profane Command",
                    "Prophetic Bolt",
                    "Psychatog",
                    "Pulse of the Fields",
                    "Pulse of the Forge",
                    "Puppeteer Clique",
                    "Putrefy",
                    "Putrid Leech",
                    "Pyroclasm",
                    "Pyrokinesis",
                    "Qasali Pridemage",
                    "Quirion Dryad",
                    "Raging Ravine",
                    "Rampant Growth",
                    "Rancor",
                    "Ranger of Eos",
                    "Ratchet Bomb",
                    "Ravages of War",
                    "Ravenous Baboons",
                    "Ray of Revelation",
                    "Razormane Masticore",
                    "Realm Razer",
                    "Reanimate",
                    "Reckless Charge",
                    "Recurring Nightmare",
                    "Red Elemental Blast",
                    "Regrowth",
                    "Relic of Progenitus",
                    "Remand",
                    "Renewed Faith",
                    "Repeal",
                    "Restock",
                    "Reveillark",
                    "Rhox War Monk",
                    "Rift Bolt",
                    "Riftwing Cloudskate",
                    "Rishadan Port",
                    "Rofellos, Llanowar Emissary",
                    "Rolling Earthquake",
                    "Rootbound Crag",
                    "Rorix Bladewing",
                    "Rout",
                    "Rude Awakening",
                    "Ruhan of the Fomori",
                    "Sacred Foundry",
                    "Sakura-Tribe Elder",
                    "Sarcomancy",
                    "Sarkhan the Mad",
                    "Savannah",
                    "Savannah Lions",
                    "Scalding Tarn",
                    "Scorned Villager",
                    "Scroll Rack",
                    "Scrubland",
                    "Sea Gate Oracle",
                    "Seal of Primordium",
                    "Search for Tomorrow",
                    "Searing Blaze",
                    "Seething Song",
                    "Sensei's Divining Top",
                    "Serendib Efreet",
                    "Shadowmage Infiltrator",
                    "Shelldock Isle",
                    "Sheoldred, Whispering One",
                    "Shining Shoal",
                    "Show and Tell",
                    "Shriekmaw",
                    "Shrine of Burning Rage",
                    "Siege-Gang Commander",
                    "Sign in Blood",
                    "Silent Specter",
                    "Silver Knight",
                    "Simic Sky Swallower",
                    "Sinkhole",
                    "Skeletal Scrying",
                    "Skeletal Vampire",
                    "Skinrender",
                    "Skithiryx, the Blight Dragon",
                    "Skizzik",
                    "Skullclamp",
                    "Slagstorm",
                    "Slaughter Pact",
                    "Slith Firewalker",
                    "Smash to Smithereens",
                    "Smokestack",
                    "Snapcaster Mage",
                    "Sneak Attack",
                    "Snuff Out",
                    "Solemn Simulacrum",
                    "Soltari Champion",
                    "Soltari Monk",
                    "Soltari Priest",
                    "Sorin Markov",
                    "Sorin, Lord of Innistrad",
                    "Sower of Temptation",
                    "Spectral Lynx",
                    "Spectral Procession",
                    "Spell Pierce",
                    "Spellskite",
                    "Sphere of the Suns",
                    "Sphinx of Jwar Isle",
                    "Sphinx of the Steel Wind",
                    "Spikeshot Elder",
                    "Spiritmonger",
                    "Sprouting Thrinax",
                    "Staggershock",
                    "Steam Vents",
                    "Steppe Lynx",
                    "Stifle",
                    "Stillmoon Cavalier",
                    "Stirring Wildwood",
                    "Stomping Ground",
                    "Stonecloaker",
                    "Stoneforge Mystic",
                    "Stonewood Invocation",
                    "Stormblood Berserker",
                    "Strangleroot Geist",
                    "Strip Mine",
                    "Stromkirk Noble",
                    "Student of Warfare",
                    "Stunted Growth",
                    "Stupor",
                    "Sulfur Falls",
                    "Sulfuric Vortex",
                    "Summoning Trap",
                    "Sun Titan",
                    "Sundering Titan",
                    "Sunpetal Grove",
                    "Survival of the Fittest",
                    "Sword of Body and Mind",
                    "Sword of Feast and Famine",
                    "Sword of Fire and Ice",
                    "Sword of Light and Shadow",
                    "Sword of War and Peace",
                    "Swords to Plowshares",
                    "Sylvan Library",
                    "Taiga",
                    "Tainted Pact",
                    "Tangle Wire",
                    "Tarmogoyf",
                    "Tattermunge Maniac",
                    "Taurean Mauler",
                    "Tectonic Edge",
                    "Teetering Peaks",
                    "Temple Garden",
                    "Tendrils of Agony",
                    "Terastodon",
                    "Terminate",
                    "Terror",
                    "Thalia, Guardian of Thraben",
                    "Thawing Glaciers",
                    "Thelonite Hermit",
                    "Thieving Magpie",
                    "Thirst for Knowledge",
                    "Thornling",
                    "Thornscape Battlemage",
                    "Thoughtseize",
                    "Thran Dynamo",
                    "Thrun, the Last Troll",
                    "Thunderblust",
                    "Thunderscape Battlemage",
                    "Tidehollow Sculler",
                    "Tidings",
                    "Time Spiral",
                    "Time Warp",
                    "Tin Street Hooligan",
                    "Tinker",
                    "Tithe",
                    "Tolaria West",
                    "Tombstalker",
                    "Tooth and Nail",
                    "Torch Fiend",
                    "Tormod's Crypt",
                    "Tradewind Rider",
                    "Treachery",
                    "Treetop Village",
                    "Trinket Mage",
                    "Troll Ascetic",
                    "Tropical Island",
                    "Trygon Predator",
                    "Tumble Magnet",
                    "Tundra",
                    "Turnabout",
                    "Ulamog, the Infinite Gyre",
                    "Umezawa's Jitte",
                    "Underground Sea",
                    "Undermine",
                    "Unearth",
                    "Upheaval",
                    "Urabrask the Hidden",
                    "Vampire Hexmage",
                    "Vampire Lacerator",
                    "Vampire Nighthawk",
                    "Vampiric Tutor",
                    "Vault of the Archangel",
                    "Vedalken Shackles",
                    "Vendilion Clique",
                    "Vengevine",
                    "Venser, Shaper Savant",
                    "Venser, the Sojourner",
                    "Verdant Catacombs",
                    "Vesuvan Shapeshifter",
                    "Vindicate",
                    "Vinelasher Kudzu",
                    "Vines of Vastwood",
                    "Visara the Dreadful",
                    "Void",
                    "Voidmage Prodigy",
                    "Voidslime",
                    "Volcanic Fallout",
                    "Volcanic Hammer",
                    "Volcanic Island",
                    "Volrath's Stronghold",
                    "Vorapede",
                    "Vulshok Refugee",
                    "Wake Thrasher",
                    "Wall of Blossoms",
                    "Wall of Omens",
                    "Wall of Reverence",
                    "Wall of Roots",
                    "Wasteland",
                    "Waterfront Bouncer",
                    "Watery Grave",
                    "Weathered Wayfarer",
                    "Werebear",
                    "Wheel of Fortune",
                    "Whipcorder",
                    "White Knight",
                    "Wickerbough Elder",
                    "Wild Nacatl",
                    "Wildfire",
                    "Willbender",
                    "Windbrisk Heights",
                    "Windswept Heath",
                    "Wispmare",
                    "Wood Elves",
                    "Wooded Foothills",
                    "Woodfall Primus",
                    "Woodland Cemetery",
                    "Woolly Thoctar",
                    "Worn Powerstone",
                    "Worship",
                    "Wrath of God",
                    "Wurmcoil Engine",
                    "Xiahou Dun, the One-Eyed",
                    "Yavimaya Elder",
                    "Yavimaya Hollow",
                    "Yawgmoth's Will",
                    "Yosei, the Morning Star",
                    "Zo-Zu the Punisher",
                    "Zombie Cutthroat"
                ].join('\n');
            },
            afterNames: function() {
                return [
                    "Absorb",
                    "Academy Rector",
                    "Academy Ruins",
                    "Acidic Slime",
                    "Act of Aggression",
                    "Aeon Chronicler",
                    "AEther Vial",
                    "Aftershock",
                    "Agony Warp",
                    "Ajani Goldmane",
                    "Ajani Vengeant",
                    "Akroma, Angel of Fury",
                    "Akroma, Angel of Wrath",
                    "Akroma's Vengeance",
                    "All Is Dust",
                    "All Suns' Dawn",
                    "Ancestral Vision",
                    "Ancient Grudge",
                    "Ancient Tomb",
                    "Angel of Despair",
                    "Angelic Destiny",
                    "Animate Dead",
                    "Ankh of Mishra",
                    "Arbor Elf",
                    "Arc Lightning",
                    "Arc Trail",
                    "Arid Mesa",
                    "Armageddon",
                    "Augury Adept",
                    "Avacyn, Angel of Hope",
                    "Avacyn's Pilgrim",
                    "Avalanche Riders",
                    "Aven Mindcensor",
                    "Avenger of Zendikar",
                    "Awakening Zone",
                    "Badlands",
                    "Balance",
                    "Ball Lightning",
                    "Bane of the Living",
                    "Baneslayer Angel",
                    "Bant Charm",
                    "Barbarian Ring",
                    "Basalt Monolith",
                    "Basilisk Collar",
                    "Batterskull",
                    "Bayou",
                    "Beacon of Destruction",
                    "Beast Within",
                    "Birds of Paradise",
                    "Birthing Pod",
                    "Bitterblossom",
                    "Bituminous Blast",
                    "Black Knight",
                    "Black Vise",
                    "Blade Splicer",
                    "Blastoderm",
                    "Blistering Firecat",
                    "Blood Crypt",
                    "Blood Knight",
                    "Bloodbraid Elf",
                    "Bloodghast",
                    "Bloodgift Demon",
                    "Bloodstained Mire",
                    "Blue Elemental Blast",
                    "Bogardan Hellkite",
                    "Boggart Ram-Gang",
                    "Bone Shredder",
                    "Bonfire of the Damned",
                    "Braids, Cabal Minion",
                    "Brain Freeze",
                    "Brainstorm",
                    "Breeding Pool",
                    "Brimstone Volley",
                    "Brine Elemental",
                    "Brooding Saurian",
                    "Broodmate Dragon",
                    "Buried Alive",
                    "Burning of Xinye",
                    "Burrenton Forge-Tender",
                    "Cabal Coffers",
                    "Calciderm",
                    "Call of the Herd",
                    "Call the Skybreaker",
                    "Capsize",
                    "Careful Consideration",
                    "Cataclysm",
                    "Catastrophe",
                    "Celestial Colonnade",
                    "Celestial Purge",
                    "Chain Lightning",
                    "Chameleon Colossus",
                    "Chandra Nalaar",
                    "Chandra, the Firebrand",
                    "Chandra's Phoenix",
                    "Channel",
                    "Chaos Warp",
                    "Char",
                    "Chrome Mox",
                    "City of Traitors",
                    "Clifftop Retreat",
                    "Cloudgoat Ranger",
                    "Cloudthresher",
                    "Coalition Relic",
                    "Cold-Eyed Selkie",
                    "Coldsteel Heart",
                    "Compulsive Research",
                    "Condemn",
                    "Consecrated Sphinx",
                    "Consuming Vapors",
                    "Control Magic",
                    "Corpse Dance",
                    "Counterspell",
                    "Countryside Crusher",
                    "Creakwood Liege",
                    "Creeping Tar Pit",
                    "Crucible of Worlds",
                    "Cruel Ultimatum",
                    "Cryptic Command",
                    "Cultivate",
                    "Cursecatcher",
                    "Cursed Scroll",
                    "Damnation",
                    "Dark Confidant",
                    "Dark Ritual",
                    "Dauthi Horror",
                    "Day of Judgment",
                    "Daybreak Ranger",
                    "Daze",
                    "Deathmark",
                    "Decree of Justice",
                    "Decree of Pain",
                    "Deep Analysis",
                    "Delver of Secrets",
                    "Demonic Rising",
                    "Demonic Taskmaster",
                    "Demonic Tutor",
                    "Deprive",
                    "Deranged Hermit",
                    "Desertion",
                    "Desolate Lighthouse",
                    "Despise",
                    "Devastating Dreams",
                    "Devil's Play",
                    "Devoted Druid",
                    "Diabolic Edict",
                    "Diabolic Servitude",
                    "Diregraf Ghoul",
                    "Disenchant",
                    "Dismantling Blow",
                    "Dismember",
                    "Dismiss",
                    "Dissipate",
                    "Doom Blade",
                    "Doran, the Siege Tower",
                    "Dragonskull Summit",
                    "Dream Halls",
                    "Drogskol Reaver",
                    "Drowned Catacomb",
                    "Dungeon Geists",
                    "Duress",
                    "Earthquake",
                    "Edric, Spymaster of Trest",
                    "Eight-and-a-Half-Tails",
                    "Eldrazi Monument",
                    "Electrolyze",
                    "Elesh Norn, Grand Cenobite",
                    "Elite Vanguard",
                    "Elspeth Tirel",
                    "Elspeth, Knight-Errant",
                    "Elves of Deep Shadow",
                    "Ember Hauler",
                    "Emeria Angel",
                    "Empty the Warrens",
                    "Enclave Cryptologist",
                    "Engineered Explosives",
                    "Enlightened Tutor",
                    "Entomb",
                    "Epochrasite",
                    "Esper Charm",
                    "Essence Scatter",
                    "Etched Oracle",
                    "Eternal Dragon",
                    "Eternal Witness",
                    "Ethersworn Canonist",
                    "Everflowing Chalice",
                    "Exalted Angel",
                    "Exhume",
                    "Explore",
                    "Fact or Fiction",
                    "Faith's Fetters",
                    "Falkenrath Aristocrat",
                    "Farseek",
                    "Fathom Seer",
                    "Fauna Shaman",
                    "Fellwar Stone",
                    "Fertile Ground",
                    "Fettergeist",
                    "Fiend Hunter",
                    "Figure of Destiny",
                    "Fire // Ice",
                    "Fireblast",
                    "Firemane Angel",
                    "Firespout",
                    "Firestorm",
                    "Flametongue Kavu",
                    "Flashfreeze",
                    "Flickerwisp",
                    "Flooded Strand",
                    "Forbid",
                    "Forbidden Alchemy",
                    "Force of Will",
                    "Force Spike",
                    "Frantic Search",
                    "Frenzied Goblin",
                    "Frost Titan",
                    "Future Sight",
                    "Fyndhorn Elves",
                    "Gaea's Cradle",
                    "Gamble",
                    "Garruk Relentless",
                    "Garruk Wildspeaker",
                    "Garruk, Primal Hunter",
                    "Gatekeeper of Malakir",
                    "Gathan Raiders",
                    "Geist of Saint Traft",
                    "Genesis",
                    "Genesis Wave",
                    "Genju of the Spires",
                    "Geralf's Messenger",
                    "Ghitu Encampment",
                    "Giant Solifuge",
                    "Gideon Jura",
                    "Gideon's Lawkeeper",
                    "Gifts Ungiven",
                    "Gilded Lotus",
                    "Glacial Fortress",
                    "Glen Elendra Archmage",
                    "Gloom Surgeon",
                    "Glorious Anthem",
                    "Go for the Throat",
                    "Goblin Goon",
                    "Goblin Guide",
                    "Goblin Legionnaire",
                    "Goblin Ruinblaster",
                    "Goblin Trenches",
                    "Goblin Welder",
                    "Godless Shrine",
                    "Grafted Wargear",
                    "Grand Arbiter Augustin IV",
                    "Grave Titan",
                    "Graveborn Muse",
                    "Gravecrawler",
                    "Great Sable Stag",
                    "Greater Gargadon",
                    "Green Sun's Zenith",
                    "Grim Lavamancer",
                    "Grim Monolith",
                    "Grimgrin, Corpse-Born",
                    "Griselbrand",
                    "Guul Draz Assassin",
                    "Hallowed Fountain",
                    "Harmonize",
                    "Havengul Lich",
                    "Headhunter",
                    "Heartbeat of Spring",
                    "Hell's Thunder",
                    "Hellrider",
                    "Hellspark Elemental",
                    "Hero of Bladehold",
                    "Hero of Oxid Ridge",
                    "Hex Parasite",
                    "Hinterland Harbor",
                    "Hokori, Dust Drinker",
                    "Honor of the Pure",
                    "Huntmaster of the Fells",
                    "Hymn to Tourach",
                    "Hypnotic Specter",
                    "Hystrodon",
                    "Ideas Unbound",
                    "Imperial Seal",
                    "Impulse",
                    "Incinerate",
                    "Increasing Devotion",
                    "Indrik Stomphowler",
                    "Inferno Titan",
                    "Ingot Chewer",
                    "Ink-Eyes, Servant of Oni",
                    "Innocent Blood",
                    "Inquisition of Kozilek",
                    "Into the Roil",
                    "Intuition",
                    "Isamaru, Hound of Konda",
                    "Isochron Scepter",
                    "Isolated Chapel",
                    "Jace Beleren",
                    "Jace, the Mind Sculptor",
                    "Jackal Pup",
                    "Jade Mage",
                    "Jokulhaups",
                    "Joraga Treespeaker",
                    "Journey to Nowhere",
                    "Jushi Apprentice",
                    "Kami of Ancient Law",
                    "Karakas",
                    "Kargan Dragonlord",
                    "Karn Liberated",
                    "Keiga, the Tide Star",
                    "Keldon Champion",
                    "Keldon Marauders",
                    "Kira, Great Glass-Spinner",
                    "Kird Ape",
                    "Kitchen Finks",
                    "Kjeldoran Outpost",
                    "Knight of the Reliquary",
                    "Kodama's Reach",
                    "Korlash, Heir to Blackblade",
                    "Koth of the Hammer",
                    "Kozilek, Butcher of Truth",
                    "Krosan Grip",
                    "Lake of the Dead",
                    "Land Tax",
                    "Laquatus's Champion",
                    "Lavaclaw Reaches",
                    "Lead the Stampede",
                    "Leatherback Baloth",
                    "Leonin Relic-Warder",
                    "Lightning Bolt",
                    "Lightning Greaves",
                    "Lightning Helix",
                    "Liliana of the Veil",
                    "Liliana Vess",
                    "Lingering Souls",
                    "Lion's Eye Diamond",
                    "Living Death",
                    "Llanowar Elves",
                    "Loam Lion",
                    "Lodestone Golem",
                    "Lone Revenant",
                    "Looter il-Kor",
                    "Lotus Bloom",
                    "Lotus Cobra",
                    "Lotus Petal",
                    "Loxodon Hierarch",
                    "Loyal Cathar",
                    "Luminarch Ascension",
                    "Maelstrom Pulse",
                    "Magma Jet",
                    "Makeshift Mannequin",
                    "Man-o'-War",
                    "Mana Leak",
                    "Mana Tithe",
                    "Manriki-Gusari",
                    "Marsh Flats",
                    "Martial Coup",
                    "Massacre Wurm",
                    "Master of the Wild Hunt",
                    "Masticore",
                    "Maze of Ith",
                    "Meloku the Clouded Mirror",
                    "Memory Jar",
                    "Memory Lapse",
                    "Mentor of the Meek",
                    "Mesmeric Fiend",
                    "Mikaeus, the Lunarch",
                    "Mimic Vat",
                    "Mind Stone",
                    "Mind's Desire",
                    "Mindslaver",
                    "Mirari's Wake",
                    "Mirran Crusader",
                    "Mirror Entity",
                    "Miscalculation",
                    "Mishra's Factory",
                    "Misty Rainforest",
                    "Mogg War Marshal",
                    "Mold Shambler",
                    "Moldervine Cloak",
                    "Molten Rain",
                    "Molten-Tail Masticore",
                    "Moment's Peace",
                    "Momentary Blink",
                    "Mortarpod",
                    "Mortify",
                    "Mother of Runes",
                    "Mox Diamond",
                    "Mulldrifter",
                    "Mutavault",
                    "Myr Battlesphere",
                    "Mystic Snake",
                    "Mystical Tutor",
                    "Nantuko Vigilante",
                    "Narcolepsy",
                    "Natural Order",
                    "Naturalize",
                    "Necromancy",
                    "Necropotence",
                    "Negate",
                    "Nekrataal",
                    "Nevinyrral's Disk",
                    "Nezumi Graverobber",
                    "Nezumi Shortfang",
                    "Nicol Bolas, Planeswalker",
                    "Night's Whisper",
                    "Ninja of the Deep Hours",
                    "Niv-Mizzet, the Firemind",
                    "Noble Hierarch",
                    "Nostalgic Dreams",
                    "Nucklavee",
                    "Obliterate",
                    "Oblivion Ring",
                    "Obstinate Baloth",
                    "Ohran Viper",
                    "Okiba-Gang Shinobi",
                    "Old Man of the Sea",
                    "Olivia Voldaren",
                    "Oona's Prowler",
                    "Opposition",
                    "Opt",
                    "Oracle of Mul Daya",
                    "Orcish Lumberjack",
                    "Oust",
                    "Overgrown Tomb",
                    "Overrun",
                    "Pact of Negation",
                    "Paladin en-Vec",
                    "Palinchron",
                    "Palladium Myr",
                    "Parallax Wave",
                    "Path to Exile",
                    "Pernicious Deed",
                    "Persecute",
                    "Phantasmal Bear",
                    "Phantasmal Image",
                    "Phantom Centaur",
                    "Phyrexian Arena",
                    "Phyrexian Crusader",
                    "Phyrexian Metamorph",
                    "Phyrexian Obliterator",
                    "Phyrexian Processor",
                    "Phyrexian Rager",
                    "Phyrexian Revoker",
                    "Pillage",
                    "Pillar of Flame",
                    "Pithing Needle",
                    "Plague Sliver",
                    "Plateau",
                    "Plated Geopede",
                    "Platinum Angel",
                    "Plow Under",
                    "Polluted Delta",
                    "Ponder",
                    "Porcelain Legionnaire",
                    "Powder Keg",
                    "Power Sink",
                    "Precursor Golem",
                    "Preordain",
                    "Prey Upon",
                    "Price of Progress",
                    "Priest of Urabrask",
                    "Primal Command",
                    "Primeval Titan",
                    "Primordial Hydra",
                    "Prismatic Lens",
                    "Pristine Talisman",
                    "Profane Command",
                    "Prophetic Bolt",
                    "Psychatog",
                    "Pulse of the Fields",
                    "Pulse of the Forge",
                    "Puppeteer Clique",
                    "Putrefy",
                    "Putrid Imp",
                    "Putrid Leech",
                    "Pyroclasm",
                    "Pyrokinesis",
                    "Qasali Pridemage",
                    "Raging Ravine",
                    "Rampant Growth",
                    "Rancor",
                    "Ranger of Eos",
                    "Ratchet Bomb",
                    "Ravages of War",
                    "Ravenous Baboons",
                    "Ray of Revelation",
                    "Razormane Masticore",
                    "Realm Razer",
                    "Reanimate",
                    "Reckless Charge",
                    "Recurring Nightmare",
                    "Red Elemental Blast",
                    "Regrowth",
                    "Relic of Progenitus",
                    "Remand",
                    "Renewed Faith",
                    "Repeal",
                    "Restock",
                    "Restoration Angel",
                    "Reveillark",
                    "Rhox War Monk",
                    "Rift Bolt",
                    "Riftwing Cloudskate",
                    "Rishadan Port",
                    "Rite of Ruin",
                    "Rofellos, Llanowar Emissary",
                    "Rolling Earthquake",
                    "Rootbound Crag",
                    "Rorix Bladewing",
                    "Rout",
                    "Rude Awakening",
                    "Ruhan of the Fomori",
                    "Sacred Foundry",
                    "Sakura-Tribe Elder",
                    "Sarcomancy",
                    "Sarkhan the Mad",
                    "Savannah",
                    "Savannah Lions",
                    "Scalding Tarn",
                    "Scavenging Ooze",
                    "Scorned Villager",
                    "Scroll Rack",
                    "Scrubland",
                    "Sea Gate Oracle",
                    "Seal of Primordium",
                    "Search for Tomorrow",
                    "Searing Blaze",
                    "Seething Song",
                    "Sensei's Divining Top",
                    "Serendib Efreet",
                    "Shadowmage Infiltrator",
                    "Shelldock Isle",
                    "Sheoldred, Whispering One",
                    "Shining Shoal",
                    "Show and Tell",
                    "Shriekmaw",
                    "Shrine of Burning Rage",
                    "Siege-Gang Commander",
                    "Sigarda, Host of Herons",
                    "Silent Specter",
                    "Silver Knight",
                    "Silverblade Paladin",
                    "Simic Sky Swallower",
                    "Sinkhole",
                    "Skinrender",
                    "Skithiryx, the Blight Dragon",
                    "Skittering Skirge",
                    "Skullclamp",
                    "Slagstorm",
                    "Slaughter Pact",
                    "Slayers' Stronghold",
                    "Slith Firewalker",
                    "Smash to Smithereens",
                    "Smokestack",
                    "Snapcaster Mage",
                    "Sneak Attack",
                    "Snuff Out",
                    "Solemn Simulacrum",
                    "Soltari Champion",
                    "Soltari Monk",
                    "Soltari Priest",
                    "Somberwald Sage",
                    "Sorin, Lord of Innistrad",
                    "Sower of Temptation",
                    "Spectral Lynx",
                    "Spectral Procession",
                    "Spell Pierce",
                    "Spellskite",
                    "Sphere of the Suns",
                    "Sphinx of Jwar Isle",
                    "Sphinx of the Steel Wind",
                    "Spikeshot Elder",
                    "Spinning Darkness",
                    "Spiritmonger",
                    "Sprouting Thrinax",
                    "Staggershock",
                    "Steam Vents",
                    "Steppe Lynx",
                    "Stifle",
                    "Stillmoon Cavalier",
                    "Stirring Wildwood",
                    "Stomping Ground",
                    "Stonecloaker",
                    "Stoneforge Mystic",
                    "Stormblood Berserker",
                    "Strangleroot Geist",
                    "Strip Mine",
                    "Student of Warfare",
                    "Stunted Growth",
                    "Stupor",
                    "Sulfur Falls",
                    "Sulfuric Vortex",
                    "Sun Titan",
                    "Sundering Titan",
                    "Sunpetal Grove",
                    "Survival of the Fittest",
                    "Sword of Body and Mind",
                    "Sword of Feast and Famine",
                    "Sword of Fire and Ice",
                    "Sword of Light and Shadow",
                    "Sword of War and Peace",
                    "Swords to Plowshares",
                    "Sylvan Library",
                    "Taiga",
                    "Tamiyo, the Moon Sage",
                    "Tandem Lookout",
                    "Tangle Wire",
                    "Tarmogoyf",
                    "Tattermunge Maniac",
                    "Taurean Mauler",
                    "Tectonic Edge",
                    "Teetering Peaks",
                    "Temple Garden",
                    "Temporal Mastery",
                    "Tendrils of Agony",
                    "Terastodon",
                    "Terminate",
                    "Terminus",
                    "Terror",
                    "Thalia, Guardian of Thraben",
                    "Thawing Glaciers",
                    "Thelonite Hermit",
                    "Thirst for Knowledge",
                    "Thornling",
                    "Thornscape Battlemage",
                    "Thoughtseize",
                    "Thran Dynamo",
                    "Throat Slitter",
                    "Thrun, the Last Troll",
                    "Thunderblust",
                    "Thunderscape Battlemage",
                    "Tibalt, the Fiend-Blooded",
                    "Tidehollow Sculler",
                    "Tidings",
                    "Time Spiral",
                    "Tin Street Hooligan",
                    "Tinker",
                    "Tithe",
                    "Tolaria West",
                    "Tombstalker",
                    "Tooth and Nail",
                    "Torch Fiend",
                    "Tormod's Crypt",
                    "Tradewind Rider",
                    "Tragic Slip",
                    "Treachery",
                    "Treetop Village",
                    "Trinket Mage",
                    "Troll Ascetic",
                    "Tropical Island",
                    "Trygon Predator",
                    "Tumble Magnet",
                    "Tundra",
                    "Turnabout",
                    "Ulamog, the Infinite Gyre",
                    "Ulvenwald Tracker",
                    "Umezawa's Jitte",
                    "Unburial Rites",
                    "Underground Sea",
                    "Undermine",
                    "Unearth",
                    "Upheaval",
                    "Urabrask the Hidden",
                    "Urborg, Tomb of Yawgmoth",
                    "Vampire Hexmage",
                    "Vampire Nighthawk",
                    "Vampiric Tutor",
                    "Vedalken Shackles",
                    "Vendilion Clique",
                    "Vengevine",
                    "Venser, Shaper Savant",
                    "Venser, the Sojourner",
                    "Verdant Catacombs",
                    "Vesuvan Shapeshifter",
                    "Vexing Devil",
                    "Vindicate",
                    "Vinelasher Kudzu",
                    "Vines of Vastwood",
                    "Visara the Dreadful",
                    "Void",
                    "Voidmage Prodigy",
                    "Voidslime",
                    "Volcanic Fallout",
                    "Volcanic Hammer",
                    "Volcanic Island",
                    "Vulshok Refugee",
                    "Wake Thrasher",
                    "Wall of Blossoms",
                    "Wall of Omens",
                    "Wall of Reverence",
                    "Wall of Roots",
                    "Wasteland",
                    "Watery Grave",
                    "Weathered Wayfarer",
                    "Werebear",
                    "Wheel of Fortune",
                    "Whipcorder",
                    "White Knight",
                    "Wickerbough Elder",
                    "Wild Nacatl",
                    "Wildfire",
                    "Willbender",
                    "Windbrisk Heights",
                    "Windswept Heath",
                    "Wispmare",
                    "Wolfir Silverheart",
                    "Wooded Foothills",
                    "Woodfall Primus",
                    "Woodland Cemetery",
                    "Woolly Thoctar",
                    "Worn Powerstone",
                    "Worship",
                    "Wrath of God",
                    "Wrench Mind",
                    "Wurmcoil Engine",
                    "Xiahou Dun, the One-Eyed",
                    "Yavimaya Elder",
                    "Yavimaya Hollow",
                    "Yawgmoth's Will",
                    "Yosei, the Morning Star",
                    "Zo-Zu the Punisher",
                    "Zombie Cutthroat"
                ].join('\n');
            }
        }
    })
    .factory('NamesFromTextService', function() {
        return {
            getNames: function(text) {
                var names = [];
                jQuery.each(text.split('\n'), function(idx, line) {
                    if (line) {
                        var name, match;
                        name = jQuery.trim(line);
                        // this is the tappedout.net formatting string:
                        //3x Llanowar Elves
                        //3x Llanowar Elves [M10] (specific printing)
                        //3x Llanowar Elves *F* (foil)
                        //3x Llanowar Elves *GE* (German language card)
                        //3x Llanowar Elves [M10] *F* (see a pattern?)
                        match = /^(?:(\d+)\s*(?:x|-)\s*)?(.*?)(?:(?:\[|\*).*)?$/.exec(name);
                        if (match) {
                            // there are potentially multiples in match[1]
                            // assume that's the case
                            for (var i=0;i<parseInt(match[1] || "1");i++) {
                                names.push(jQuery.trim(match[2]))
                            }
                        } else {
                            // forget it, no special handling other than the
                            // original trimming
                            names.push(name);
                        }
                    }
                });

                return names;
            }
        }
    })
    .factory('CardContentService', function($http, $cacheFactory, $timeout) {
        var cache = $cacheFactory('cardContents');
        var missingNames = function(cardNames) {
            var missingNames = [];
            jQuery.each(cardNames || [], function(idx, name) {
                if (!cache.get(name)) {
                    missingNames.push(name)
                }
            });
            return missingNames;
        };

        var getCachedCards = function(cardNames) {
            var cachedCards = [];
            var card;
            jQuery.each(cardNames || [], function(idx, name) {
                card = cache.get(name);
                if (card) {
                    cachedCards.push(card);
                    return
                }
                // addresses issue #9
                card = cache.get(name.toLowerCase());
                if (card) {
                    cachedCards.push(card);
                }
            });
            return cachedCards;
        };

        var pollCardProgress = function(id, onSuccess) {
            $http({
                url: '/poll_state/',
                method: 'GET',
                params: {job: id}
            }).success(function (data, status) {
                    onSuccess(data, status);
            });
        };

        var cacheIncomingData = function(data) {
            jQuery.each(data['cards'] || {}, function(name, card) {
                cache.put(name, card)
            });
            jQuery.each(data['mismatches'] || {}, function(name, correctName) {
                if (cache.get(correctName)) {
                    // TODO: future optimization, store other name instead of content?
                    cache.put(name, cache.get(correctName))
                }
            });
        };

        return {
            missingNames: missingNames,
            getCachedCards: getCachedCards,
            cacheAllCards: function(cardNames, onSuccess) {
                var toSearch = missingNames(cardNames);
                if (toSearch.length == 0) {
                    onSuccess(null);
                    return;
                }
                $http.post('/card_contents/', {
                    card_names: toSearch
                }).success(function (data) {
                    cacheIncomingData(data);
                    onSuccess(
                        data,
                        data['insert_job']
                    );
                });
            },
            pollCardProgress : pollCardProgress,
            consumeInserts : function(jobId, onFinish, onHeartbeat) {
                var tick = function() {
                    console.log('about to poll with', jobId);
                    pollCardProgress(jobId, function(data, status) {
                        console.log('got data', data);
                        console.log('got status', status);
                        // TODO: branching via a different isn't great
                        if (data=='"PENDING"') {
                           $timeout(tick, 500);
                        } else if (data['inserted_cards']) {
                            data['cards'] = data['inserted_cards'];
                            cacheIncomingData(data);
                            onHeartbeat(data);

                            $timeout(tick, 3000);
                        } else {
                            cacheIncomingData(data);
                            onFinish(data);
                        }

                    })
                };

                tick();
            }
        };
    })
    .factory('CardHeuristicService', function($http) {
        return {getHeuristics : function(onSuccess) {
            $http.get('/heuristics/').success(function (data, status) {
                    onSuccess(data, status);
                });
        }};
    })
    .factory('CardCategoryService', function() {
        return {
            matchesCategory : function(category, baseCard, checkedHeuristics) {
                checkedHeuristics = checkedHeuristics || [];
                var modifiedCard = jQuery.extend({}, baseCard);

                if (baseCard['heuristics']) {
                    // most cards don't have associated heuristics
                    jQuery.each(checkedHeuristics, function(idx, heuristicName) {
                        jQuery.extend(
                            modifiedCard,
                            baseCard['heuristics'][heuristicName]
                        );
                    });
                }

                var _checkForColor = function(category, card) {

                    if (category == 'Colorless') {
                        // special case for colorlessness
                        return card['colors'].length == 0;
                    }

                    var mcMatch = /(.+?)(?:-|\s)*color/i.exec(category);
                    if (mcMatch) {
                        var colorMap = {
                            '0': 0,
                            'zero': 0,
                            '2': 2,
                            'two': 2,
                            '3': 3,
                            'tri': 3,
                            'three': 3,
                            '4': 4,
                            'quad': 4,
                            'four': 4,
                            '5': 5,
                            'five': 5,
                            'multi': 2
                        };
                        var numCats = mcMatch[1].toLowerCase();
                        var expectGreaterOrEqual = false;
                        if (numCats.indexOf('+', numCats.length - 1) !== -1) {
                            // somone wanted to say 3+-color apparently
                            expectGreaterOrEqual = true;
                            numCats = numCats.substring(0, numCats.length - 1);
                        } else if (numCats == 'multi') {
                            expectGreaterOrEqual = true;
                        }
                        var expectedLength = colorMap[numCats];
                        if (!(expectedLength === undefined)) {
                            if (expectGreaterOrEqual) {
                                return card['colors'].length >= expectedLength;
                            } else {
                                return card['colors'].length == expectedLength;
                            }
                        }
                    }

                    var isMono = false;

                    if (category.indexOf('Mono') === 0) {
                        isMono = true;
                        category = category.substring(4);
                    }

                    if (inArray(category, colorList) !== -1) {
                        if (isMono) {
                            return angular.equals([category], card['colors']);
                        } else {
                            return inArray(category, card['colors']) !== -1;
                        }
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
                    // support a short version as well
                    var cmcRegex = /(?:converted_mana_cost|cmc)\s*([=><!]{1,3})\s*(\d+|X)/;
                    var match = cmcRegex.exec(category);
                    if (match) {
                        var integerCMC;
                        var cardCMC = card['converted_mana_cost'];
                        if (cardCMC==-1) {
                            // -1 is what we're using to represent 'X' spells
                            cardCMC = Number.POSITIVE_INFINITY;
                        }
                        if (match[2]=='X') {
                            integerCMC = Number.POSITIVE_INFINITY;
                        } else {
                            integerCMC = parseInt(match[2]);
                        }
                        if (match[1] == '==') {
                            return cardCMC == integerCMC;
                        } else if (match[1] == '<') {
                            return cardCMC < integerCMC;
                        } else if (match[1] == '>') {
                            return cardCMC > integerCMC;
                        } else if (match[1] == '<=') {
                            return cardCMC <= integerCMC;
                        } else if (match[1] == '>=') {
                            return cardCMC >= integerCMC;
                        } else if (match[1] == '!=') {
                            return cardCMC != integerCMC;
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

                var _checkForAny = function(category, card) {
                    if (category == 'Any') {
                        return true;
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
                            _checkForColor,
                            _checkForType,
                            _checkForCMC,
                            _checkForDiff,
                            _checkForAny
                            // these either return a known string if the checker isn't applicable
                            // or True/False if it is applicable and based on the results of
                            // the check
                        ], function(checked_index, checker) {
                            var result = checker(inner_cat, modifiedCard);
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
            sortCube: function(serializedCube, sortSpec, defaultSort,
                               existingCube, infoToAdd, checkedHeuristics) {
                checkedHeuristics = checkedHeuristics || [];
                var handleCubeCard = function(card, _sortedCube, infoToAdd) {
                    // merge on information
                    var cardToHandle = jQuery.extend({}, card, infoToAdd);

                    var _recurseCube = function (subCube) {
                        jQuery.each(subCube, function(idx, categoryObject) {
                            if (!CardCategoryService.matchesCategory(categoryObject.category, cardToHandle, checkedHeuristics)) {
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
            getDiff : function(_old, _new, sortSpec, sorter, diffSubCategories,
                               checkedHeuristics) {
                if (diffSubCategories === undefined) {
                    diffSubCategories = true;
                }

                checkedHeuristics = checkedHeuristics || [];

                if (!diffSubCategories) {
                    // we need some way to show the diff results, so if we aren't
                    // putting them in categories, at least order by them

                    sorter = sorter || this.alternateSorter;
                }

                var currentCube = SortSpecService.getSkeleton(sortSpec, diffSubCategories);
                jQuery.each(CubeSplitService.splitCards(_old, _new), function(type, splitSubCube) {
                    currentCube = CubeSortService.sortCube(
                        splitSubCube, sortSpec, sorter, currentCube,
                        {_diffResult:type}, checkedHeuristics
                    );
                });

                return currentCube;

            }

        }
    })
    .factory('CubeSplitService', function() {
        return {
            splitCards : function(old, _new) {
                var both = [];
                var added = [];
                var removed = [];

                var sortFunction = function(a, b) {
                    return a['name'] < b['name'] ? -1:1;
                };

                old.sort(sortFunction);
                _new.sort(sortFunction);

                var old_length = old.length;
                var new_length = _new.length;

                if (old_length == 0) {
                    return {
                        both: [],
                        added: _new,
                        removed: []
                    }
                } else if (new_length == 0) {
                    return {
                        both: [],
                        added: [],
                        removed: old
                    }
                }

                var old_idx=0, new_idx=0;

                while((new_idx < new_length) || (old_idx < old_length)) {
                    // if we go past the end either side, we want to avoid
                    // messing with undefined values
                    var old_name = (old[old_idx] || {})['name'];
                    var new_name = (_new[new_idx] || {})['name'];
                    if (new_idx >= new_length || (old_name < new_name)) {
                        removed.push(old[old_idx]);
                        old_idx++;
                    } else if (old_idx >= old_length || (old_name > new_name)) {
                        added.push(_new[new_idx]);
                        new_idx++;
                    } else {
                        both.push(old[old_idx]);
                        old_idx++;
                        new_idx++;
                    }
                }

                if (old_length + new_length !=
                    both.length * 2 + added.length + removed.length) {
                    throw 'mismatch following card splitting'
                }
                return {
                    both: both,
                    added: added,
                    removed: removed
                }
            }
        }
    });

