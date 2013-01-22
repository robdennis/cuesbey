'use strict';

/* Controllers */

angular.module('cubeViewer.controllers', []);

function CubeContentsCtrl($scope, CubeDiffService) {
    var cmcSlots = {
        'converted_mana_cost<=1': {},
        'converted_mana_cost==2': {},
        'converted_mana_cost==3': {},
        'converted_mana_cost==4': {},
        'converted_mana_cost==5': {},
        'converted_mana_cost==6': {},
        'converted_mana_cost>=7': {}
    };
    var spec = {
        'White': {
            'Creature': cmcSlots,
            '!Creature': cmcSlots
        },
        'Blue': {
            'Creature': cmcSlots,
            '!Creature': cmcSlots
        },
        'Black': {
            'Creature': cmcSlots,
            '!Creature': cmcSlots
        },
        'Red': {
            'Creature': cmcSlots,
            '!Creature': cmcSlots
        },
        'Green': {
            'Creature': cmcSlots,
            '!Creature': cmcSlots
        }
    };

    $scope.beforeCardNames = [
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
    $scope.afterCardNames = [
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

    $scope.diff = function() {
        $scope.before = [
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Black"
                        ]
                    }
                },
                "name": "Volrath's Stronghold",
                "colors": [],
                "gatherer_ids": [
                    "5263"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": null,
                "name": "Volcanic Island",
                "colors": [],
                "gatherer_ids": [
                    "1385",
                    "585",
                    "887",
                    "201406",
                    "202442"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Volcanic Hammer",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4366",
                    "20206",
                    "83327",
                    "30171",
                    "6593",
                    "45356"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Volcanic Fallout",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220512",
                    "180274"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Voidslime",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "97096"
                ],
                "mana_cost": "{G}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Voidmage Prodigy",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "40101",
                    "108811"
                ],
                "mana_cost": "{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Void",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "23200",
                    "109677"
                ],
                "mana_cost": "{3}{B}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Visara the Dreadful",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "39863",
                    "244677"
                ],
                "mana_cost": "{3}{B}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{G}{G}",
                        "converted_mana_cost": 2
                    }
                },
                "name": "Vines of Vastwood",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "177571"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Vinelasher Kudzu",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "83559"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Vindicate",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "19135"
                ],
                "mana_cost": "{1}{W}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Vesuvan Shapeshifter",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "109765"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Verdant Catacombs",
                "colors": [],
                "gatherer_ids": [
                    "193400"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Venser, the Sojourner",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "212240",
                    "266078"
                ],
                "mana_cost": "{3}{W}{U}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Venser, Shaper Savant",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "136209"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Vengevine",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "193556"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Vendilion Clique",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "152549"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "caring_about_controlling_land_types_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    }
                },
                "name": "Vedalken Shackles",
                "colors": [],
                "gatherer_ids": [
                    "50120"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "White",
                            "Black"
                        ]
                    }
                },
                "name": "Vault of the Archangel",
                "colors": [],
                "gatherer_ids": [
                    "270938"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Vampiric Tutor",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3629",
                    "15393"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Vampire Nighthawk",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "247552",
                    "185707",
                    "260989"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Vampire Lacerator",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "192225"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Vampire Hexmage",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "192232"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Urabrask the Hidden",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "214378"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Upheaval",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "31852"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Unearth",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "12398"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Undermine",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "23190",
                    "259278"
                ],
                "mana_cost": "{U}{U}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": null,
                "name": "Underground Sea",
                "colors": [],
                "gatherer_ids": [
                    "584",
                    "886",
                    "184752",
                    "202536",
                    "1384",
                    "287"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Umezawa's Jitte",
                "colors": [],
                "gatherer_ids": [
                    "81979"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Legendary",
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Ulamog, the Infinite Gyre",
                "colors": [],
                "gatherer_ids": [
                    "261321",
                    "194911"
                ],
                "mana_cost": "{11}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 11
            },
            {
                "heuristics": {},
                "name": "Turnabout",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5728"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": null,
                "name": "Tundra",
                "colors": [],
                "gatherer_ids": [
                    "583",
                    "885",
                    "184751",
                    "202424",
                    "286",
                    "1383"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Tumble Magnet",
                "colors": [],
                "gatherer_ids": [
                    "210232"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Trygon Predator",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "97112"
                ],
                "mana_cost": "{1}{G}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": null,
                "name": "Tropical Island",
                "colors": [],
                "gatherer_ids": [
                    "582",
                    "201405",
                    "884",
                    "202446",
                    "285",
                    "1382"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Troll Ascetic",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "49828",
                    "130498",
                    "247145"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Trinket Mage",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "50163",
                    "222746",
                    "209040"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Green"
                        ]
                    }
                },
                "name": "Treetop Village",
                "colors": [],
                "gatherer_ids": [
                    "12498",
                    "202279",
                    "106455",
                    "243455"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Treachery",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "12148"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Tradewind Rider",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4738"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Tormod's Crypt",
                "colors": [],
                "gatherer_ids": [
                    "2793",
                    "1724",
                    "279713",
                    "109716"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Torch Fiend",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "279989",
                    "244702"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Tooth and Nail",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "48122"
                ],
                "mana_cost": "{5}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Tombstalker",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "136041"
                ],
                "mana_cost": "{6}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    }
                },
                "name": "Tolaria West",
                "colors": [],
                "gatherer_ids": [
                    "136047"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Tithe",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "3730"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Tinker",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "194980",
                    "12383"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Tin Street Hooligan",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "96960"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Time Warp",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "191379",
                    "21048",
                    "4737"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Time Spiral",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "10423"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Tidings",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "21047",
                    "129770",
                    "83036"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Tidehollow Sculler",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "175054"
                ],
                "mana_cost": "{W}{B}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "always_kick": {
                        "colors": [
                            "Black",
                            "Green",
                            "Red"
                        ],
                        "mana_cost": "{3}{B}{R}{G}",
                        "converted_mana_cost": 6
                    },
                    "off_color_kicker_is_gold": {
                        "colors": [
                            "Black",
                            "Green",
                            "Red"
                        ]
                    },
                    "always_kick_creatures": {
                        "colors": [
                            "Black",
                            "Green",
                            "Red"
                        ],
                        "mana_cost": "{3}{B}{R}{G}",
                        "converted_mana_cost": 6
                    }
                },
                "name": "Thunderscape Battlemage",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "25915",
                    "209155"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Thunderblust",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "157411"
                ],
                "mana_cost": "{2}{R}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Thrun, the Last Troll",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "214050"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Thran Dynamo",
                "colors": [],
                "gatherer_ids": [
                    "15248",
                    "220506"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Thoughtseize",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "145969"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "always_kick": {
                        "colors": [
                            "White",
                            "Green",
                            "Red"
                        ],
                        "mana_cost": "{2}{W}{R}{G}",
                        "converted_mana_cost": 5
                    },
                    "off_color_kicker_is_gold": {
                        "colors": [
                            "White",
                            "Green",
                            "Red"
                        ]
                    },
                    "always_kick_creatures": {
                        "colors": [
                            "White",
                            "Green",
                            "Red"
                        ],
                        "mana_cost": "{2}{W}{R}{G}",
                        "converted_mana_cost": 5
                    }
                },
                "name": "Thornscape Battlemage",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "25916",
                    "109745",
                    "209144"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Thornling",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "180341"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Thirst for Knowledge",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "218580",
                    "45978",
                    "205311"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Thieving Magpie",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "15156",
                    "45252",
                    "83298",
                    "25565",
                    "129764"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Thelonite Hermit",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "126275",
                    "220558"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Thawing Glaciers",
                "colors": [],
                "gatherer_ids": [
                    "159106",
                    "3238"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Thalia, Guardian of Thraben",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "270445"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Terror",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3879",
                    "135199",
                    "45988",
                    "86",
                    "2131",
                    "1182",
                    "381",
                    "26659",
                    "16624",
                    "202486",
                    "25504",
                    "683",
                    "21151"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Terminate",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "25871",
                    "176449",
                    "247166",
                    "220524"
                ],
                "mana_cost": "{B}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Terastodon",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "270451",
                    "197137"
                ],
                "mana_cost": "{6}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Tendrils of Agony",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "45842"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Temple Garden",
                "colors": [],
                "gatherer_ids": [
                    "89093",
                    "253681"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Teetering Peaks",
                "colors": [],
                "gatherer_ids": [
                    "234715",
                    "177549"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Tectonic Edge",
                "colors": [],
                "gatherer_ids": [
                    "197855"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Taurean Mauler",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220453",
                    "205404",
                    "153452"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Tattermunge Maniac",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "142013"
                ],
                "mana_cost": "{R/G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Tarmogoyf",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "136142"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Tangle Wire",
                "colors": [],
                "gatherer_ids": [
                    "21399"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Tainted Pact",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "29953"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": null,
                "name": "Taiga",
                "colors": [],
                "gatherer_ids": [
                    "883",
                    "581",
                    "284",
                    "184750",
                    "1381",
                    "202421"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Sylvan Library",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "1547",
                    "4012",
                    "159317",
                    "338456",
                    "2240"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Swords to Plowshares",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "869",
                    "21172",
                    "2714",
                    "271",
                    "202462",
                    "567",
                    "1367",
                    "184675",
                    "2367",
                    "218581"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Sword of War and Peace",
                "colors": [],
                "gatherer_ids": [
                    "214368"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sword of Light and Shadow",
                "colors": [],
                "gatherer_ids": [
                    "47453"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sword of Fire and Ice",
                "colors": [],
                "gatherer_ids": [
                    "46429"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sword of Feast and Famine",
                "colors": [],
                "gatherer_ids": [
                    "214070"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sword of Body and Mind",
                "colors": [],
                "gatherer_ids": [
                    "212640",
                    "209280"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Survival of the Fittest",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "6150"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sunpetal Grove",
                "colors": [],
                "gatherer_ids": [
                    "205124",
                    "191100",
                    "221923",
                    "249736"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Sundering Titan",
                "colors": [],
                "gatherer_ids": [
                    "212631",
                    "42084",
                    "220533"
                ],
                "mana_cost": "{8}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Sun Titan",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "241833",
                    "205030"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Summoning Trap",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "197527"
                ],
                "mana_cost": "{4}{G}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Sulfuric Vortex",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "47461"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sulfur Falls",
                "colors": [],
                "gatherer_ids": [
                    "241987"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Stupor",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "108923",
                    "16628",
                    "3316"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Stunted Growth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "2590",
                    "184674"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Student of Warfare",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "193598"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Stromkirk Noble",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "230783"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Strip Mine",
                "colors": [],
                "gatherer_ids": [
                    "1078",
                    "1079",
                    "1076",
                    "1077",
                    "2380",
                    "194968",
                    "202433"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Strangleroot Geist",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "262671"
                ],
                "mana_cost": "{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Stormblood Berserker",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220277"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Stonewood Invocation",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "118890"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Stoneforge Mystic",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "198383"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Stonecloaker",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "122469"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Stomping Ground",
                "colors": [],
                "gatherer_ids": [
                    "96896"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "White",
                            "Green"
                        ]
                    }
                },
                "name": "Stirring Wildwood",
                "colors": [],
                "gatherer_ids": [
                    "177560"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Stillmoon Cavalier",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "153037"
                ],
                "mana_cost": "{1}{W/B}{W/B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Stifle",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "46558"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Steppe Lynx",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "171012"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Steam Vents",
                "colors": [],
                "gatherer_ids": [
                    "253682",
                    "96923"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Staggershock",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "193571"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sprouting Thrinax",
                "colors": [
                    "Black",
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "174863"
                ],
                "mana_cost": "{B}{R}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Spiritmonger",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "28009"
                ],
                "mana_cost": "{3}{B}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Spikeshot Elder",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "209404"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Sphinx of the Steel Wind",
                "colors": [
                    "Blue",
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "270446",
                    "189641"
                ],
                "mana_cost": "{5}{W}{U}{B}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Sphinx of Jwar Isle",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "185709"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Sphere of the Suns",
                "colors": [],
                "gatherer_ids": [
                    "213776"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    },
                    "activated_ability_costs_affect_color_do_not_pay_phyrexian": {
                        "colors": []
                    }
                },
                "name": "Spellskite",
                "colors": [],
                "gatherer_ids": [
                    "217992"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Spell Pierce",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "178144"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "assume_on_color_cmc_for_mono_color_hybrids": {
                        "converted_mana_cost": 3
                    },
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Spectral Procession",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "152070"
                ],
                "mana_cost": "{2/W}{2/W}{2/W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Black"
                        ]
                    }
                },
                "name": "Spectral Lynx",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "26663"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sower of Temptation",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "140165"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Sorin, Lord of Innistrad",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "249985"
                ],
                "mana_cost": "{2}{W}{B}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Sorin Markov",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "195403",
                    "238330"
                ],
                "mana_cost": "{3}{B}{B}{B}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Soltari Priest",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "108856",
                    "4904"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Soltari Monk",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "4903"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Soltari Champion",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5235"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Solemn Simulacrum",
                "colors": [],
                "gatherer_ids": [
                    "247340",
                    "236907",
                    "49434"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Snuff Out",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "19595",
                    "201794"
                ],
                "mana_cost": "{3}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Sneak Attack",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "5594"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Snapcaster Mage",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "227676"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Smokestack",
                "colors": [],
                "gatherer_ids": [
                    "5730"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Smash to Smithereens",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "158243"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Slith Firewalker",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "46102",
                    "189222"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Slaughter Pact",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "130704"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Slagstorm",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "214054"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Skullclamp",
                "colors": [],
                "gatherer_ids": [
                    "48197",
                    "194978",
                    "247201"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{3}{R}{R}",
                        "converted_mana_cost": 5
                    },
                    "always_kick_creatures": {
                        "mana_cost": "{3}{R}{R}",
                        "converted_mana_cost": 5
                    }
                },
                "name": "Skizzik",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "23096"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Skithiryx, the Blight Dragon",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "212249"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Skinrender",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "204958"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Skeletal Vampire",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "96899",
                    "201809"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Skeletal Scrying",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "29958"
                ],
                "mana_cost": "{X}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Sinkhole",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "380",
                    "202439",
                    "85",
                    "682"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Simic Sky Swallower",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "111204",
                    "247196"
                ],
                "mana_cost": "{5}{G}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Silver Knight",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "243425",
                    "44313"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Silent Specter",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "41280",
                    "97065"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Sign in Blood",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "247327",
                    "205118",
                    "201801",
                    "190537",
                    "260982",
                    "220480"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Siege-Gang Commander",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "43552",
                    "157926",
                    "130539",
                    "193751"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Shrine of Burning Rage",
                "colors": [],
                "gatherer_ids": [
                    "218018"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Shriekmaw",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "220572",
                    "247305",
                    "146175",
                    "259272"
                ],
                "mana_cost": "{4}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Show and Tell",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5697"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Shining Shoal",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "74519"
                ],
                "mana_cost": "{X}{W}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sheoldred, Whispering One",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "214382"
                ],
                "mana_cost": "{5}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    }
                },
                "name": "Shelldock Isle",
                "colors": [],
                "gatherer_ids": [
                    "146178"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Shadowmage Infiltrator",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "126333",
                    "33604"
                ],
                "mana_cost": "{1}{U}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Serendib Efreet",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "159137",
                    "194970",
                    "939",
                    "1221"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sensei's Divining Top",
                "colors": [],
                "gatherer_ids": [
                    "194972",
                    "50400"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Seething Song",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220561",
                    "83377",
                    "34945",
                    "243487"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Searing Blaze",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "270873",
                    "193982"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{G}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Search for Tomorrow",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "108802",
                    "205408"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Seal of Primordium",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "130816"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sea Gate Oracle",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "194938"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": null,
                "name": "Scrubland",
                "colors": [],
                "gatherer_ids": [
                    "201403",
                    "882",
                    "580",
                    "202515",
                    "283",
                    "1380"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Scroll Rack",
                "colors": [],
                "gatherer_ids": [
                    "4628",
                    "338458"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Scorned Villager",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "262694"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Scalding Tarn",
                "colors": [],
                "gatherer_ids": [
                    "190393"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": null,
                "name": "Savannah Lions",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "221577",
                    "83246",
                    "565",
                    "867",
                    "45207",
                    "269",
                    "2363",
                    "1365"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": null,
                "name": "Savannah",
                "colors": [],
                "gatherer_ids": [
                    "579",
                    "184749",
                    "881",
                    "202571",
                    "1379",
                    "282"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Sarkhan the Mad",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "193659"
                ],
                "mana_cost": "{3}{B}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Sarcomancy",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4683"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Sakura-Tribe Elder",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "247176",
                    "220582",
                    "50510"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sacred Foundry",
                "colors": [],
                "gatherer_ids": [
                    "89066"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Ruhan of the Fomori",
                "colors": [
                    "Blue",
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "236477"
                ],
                "mana_cost": "{1}{R}{W}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Rude Awakening",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "73587",
                    "202281"
                ],
                "mana_cost": "{4}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Rout",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "22971"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Rorix Bladewing",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "205371",
                    "39859"
                ],
                "mana_cost": "{3}{R}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Rootbound Crag",
                "colors": [],
                "gatherer_ids": [
                    "221922",
                    "249735",
                    "205114",
                    "208042",
                    "191057"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Rolling Earthquake",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "10526",
                    "201293"
                ],
                "mana_cost": "{X}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Rofellos, Llanowar Emissary",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "15237"
                ],
                "mana_cost": "{G}{G}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Rishadan Port",
                "colors": [],
                "gatherer_ids": [
                    "19767"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{1}{U}",
                        "converted_mana_cost": 2
                    }
                },
                "name": "Riftwing Cloudskate",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "189249",
                    "109715"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{R}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Rift Bolt",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "108915"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Rhox War Monk",
                "colors": [
                    "Blue",
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "174957"
                ],
                "mana_cost": "{G}{W}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Reveillark",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "152716"
                ],
                "mana_cost": "{4}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Restock",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "23145"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Repeal",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "96827"
                ],
                "mana_cost": "{X}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "use_cycling_cost_as_mana_cost_for_triggered_abilities": {
                        "mana_cost": "{1}{W}",
                        "converted_mana_cost": 2
                    }
                },
                "name": "Renewed Faith",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "41153"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Remand",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "87919"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Relic of Progenitus",
                "colors": [],
                "gatherer_ids": [
                    "205326",
                    "174824"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Regrowth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "465",
                    "1263",
                    "170",
                    "767",
                    "202461"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Red Elemental Blast",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "217",
                    "1312",
                    "2301",
                    "202447",
                    "512",
                    "814"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Recurring Nightmare",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "6103"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Reckless Charge",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "31450",
                    "205365"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Reanimate",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "270452",
                    "21160",
                    "220576",
                    "4680"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Realm Razer",
                "colors": [
                    "White",
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "179422"
                ],
                "mana_cost": "{3}{R}{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Razormane Masticore",
                "colors": [],
                "gatherer_ids": [
                    "106552",
                    "222707",
                    "50155"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "White",
                            "Green"
                        ]
                    }
                },
                "name": "Ray of Revelation",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "34199",
                    "245288"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Ravenous Baboons",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "5207"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ravages of War",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "10500",
                    "184724"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ratchet Bomb",
                "colors": [],
                "gatherer_ids": [
                    "205482"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Ranger of Eos",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "174823"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Rancor",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "253686",
                    "275266",
                    "12433",
                    "220577",
                    "201838"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Rampant Growth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "205350",
                    "83221",
                    "45417",
                    "189887",
                    "27259",
                    "11501",
                    "4779",
                    "233231",
                    "3404",
                    "12966",
                    "129690"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Green",
                            "Red"
                        ]
                    }
                },
                "name": "Raging Ravine",
                "colors": [],
                "gatherer_ids": [
                    "177583"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Quirion Dryad",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "26286",
                    "130489",
                    "288764"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Qasali Pridemage",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "179556",
                    "249405"
                ],
                "mana_cost": "{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Pyrokinesis",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "3180",
                    "184763"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Pyroclasm",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "129801",
                    "2650",
                    "25677",
                    "208009",
                    "194425",
                    "4354",
                    "83216",
                    "45374"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Putrid Leech",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "179612",
                    "338388"
                ],
                "mana_cost": "{B}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Putrefy",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "89063",
                    "292956"
                ],
                "mana_cost": "{1}{B}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Puppeteer Clique",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "146761"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Pulse of the Forge",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "39410"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Pulse of the Fields",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "39697"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Psychatog",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "31825"
                ],
                "mana_cost": "{1}{U}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Prophetic Bolt",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "27187",
                    "338392",
                    "247162"
                ],
                "mana_cost": "{3}{U}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Profane Command",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "205397",
                    "259275",
                    "141814"
                ],
                "mana_cost": "{X}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Pristine Talisman",
                "colors": [],
                "gatherer_ids": [
                    "233074"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Prismatic Lens",
                "colors": [],
                "gatherer_ids": [
                    "118880"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Primordial Hydra",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "253670",
                    "220172"
                ],
                "mana_cost": "{X}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Preordain",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "265979",
                    "205019"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Precursor Golem",
                "colors": [],
                "gatherer_ids": [
                    "206348"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Power Sink",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "2527",
                    "1216",
                    "415",
                    "717",
                    "4716",
                    "3932",
                    "120",
                    "3354",
                    "2176",
                    "16435",
                    "26658",
                    "5757"
                ],
                "mana_cost": "{X}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Powder Keg",
                "colors": [],
                "gatherer_ids": [
                    "15259"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{2}",
                        "converted_mana_cost": 2
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [],
                        "mana_cost": "{2}",
                        "converted_mana_cost": 2
                    }
                },
                "name": "Porcelain Legionnaire",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "218043"
                ],
                "mana_cost": "{2}{W/P}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Ponder",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "190159",
                    "139512",
                    "244313"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Polluted Delta",
                "colors": [],
                "gatherer_ids": [
                    "39504"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Plow Under",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "12628",
                    "45450"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Platinum Angel",
                "colors": [],
                "gatherer_ids": [
                    "106537",
                    "48580",
                    "206329",
                    "191313"
                ],
                "mana_cost": "{7}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": null,
                "name": "Plateau",
                "colors": [],
                "gatherer_ids": [
                    "201402",
                    "578",
                    "202612",
                    "880",
                    "281",
                    "1378"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Plague Sliver",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "116748"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Pithing Needle",
                "colors": [],
                "gatherer_ids": [
                    "129526",
                    "74207",
                    "253581",
                    "191592"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Pillage",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "3178",
                    "14755",
                    "13182",
                    "234720",
                    "184567"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Phyrexian Revoker",
                "colors": [],
                "gatherer_ids": [
                    "220589"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Phyrexian Rager",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "213804",
                    "135189",
                    "27660",
                    "201790"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Phyrexian Processor",
                "colors": [],
                "gatherer_ids": [
                    "207888",
                    "5610"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Phyrexian Obliterator",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "214386"
                ],
                "mana_cost": "{B}{B}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Phyrexian Negator",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "207891",
                    "5559"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    }
                },
                "name": "Phyrexian Metamorph",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "214375"
                ],
                "mana_cost": "{3}{U/P}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Phyrexian Crusader",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "213724"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Phyrexian Arena",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "27663",
                    "83201",
                    "209132",
                    "45339",
                    "205417"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Phantom Centaur",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "35073"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Phantasmal Bear",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "220251"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Pernicious Deed",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "25953"
                ],
                "mana_cost": "{1}{B}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Path to Exile",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "220511",
                    "266017",
                    "247180",
                    "179235"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Parallax Wave",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "22028"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Palladium Myr",
                "colors": [],
                "gatherer_ids": [
                    "212251"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Palinchron",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "12580"
                ],
                "mana_cost": "{5}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Paladin en-Vec",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5199",
                    "82951",
                    "129668"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Pact of Negation",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "130701"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Overgrown Tomb",
                "colors": [],
                "gatherer_ids": [
                    "89072",
                    "253680"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Overgrown Battlement",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "193610"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Oust",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "194923"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Orcish Lumberjack",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "184656",
                    "2646"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Oracle of Mul Daya",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "185737"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Opt",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "22988"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Opposition",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "15796",
                    "15162"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Opportunity",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "21128",
                    "12822",
                    "25564"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Oona's Prowler",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "146582"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Olivia Voldaren",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "247235"
                ],
                "mana_cost": "{2}{B}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Old Man of the Sea",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "937",
                    "201144"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Ohran Viper",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "121266"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Snow",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Obstinate Baloth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "205075"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Oblivion Ring",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "220586",
                    "259711",
                    "174909",
                    "247156",
                    "243451",
                    "205396",
                    "139414",
                    "270848",
                    "234567"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Obliterate",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "45396",
                    "23098"
                ],
                "mana_cost": "{6}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Nucklavee",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "247207",
                    "153058"
                ],
                "mana_cost": "{4}{U/R}{U/R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Nostalgic Dreams",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "32208"
                ],
                "mana_cost": "{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Noble Hierarch",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "179434"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Niv-Mizzet, the Firemind",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "292738",
                    "96952",
                    "178023"
                ],
                "mana_cost": "{2}{U}{U}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Ninja of the Deep Hours",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "74587",
                    "271184"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Nightscape Familiar",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "25693",
                    "259263"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Night's Whisper",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "51178"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Nicol Bolas, Planeswalker",
                "colors": [
                    "Blue",
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "179441",
                    "260991",
                    "266154"
                ],
                "mana_cost": "{4}{U}{B}{B}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Nezumi Shortfang",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "78679"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Nezumi Graverobber",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "247175"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Nevinyrral's Disk",
                "colors": [],
                "gatherer_ids": [
                    "1128",
                    "634",
                    "37",
                    "3803",
                    "332",
                    "2061",
                    "159266",
                    "212637"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Neurok Commando",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "213754"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Nekrataal",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "83185",
                    "129658",
                    "3623",
                    "15391",
                    "45310"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Negate",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "230757",
                    "254114",
                    "152570",
                    "208222",
                    "190164"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Necropotence",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "2478",
                    "184651",
                    "3865",
                    "194977"
                ],
                "mana_cost": "{B}{B}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Necromancy",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3621"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Naturalize",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "193439",
                    "207336",
                    "129656",
                    "45420",
                    "253672",
                    "189896",
                    "174890",
                    "221894",
                    "35414",
                    "237015",
                    "83183"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Natural Order",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "3671",
                    "4307"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Narcolepsy",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "193594"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Nantuko Vigilante",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "44210"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Nantuko Shade",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "205229",
                    "35053"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mystical Tutor",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "3351",
                    "15367",
                    "194976"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Mystic Snake",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "109693",
                    "26421"
                ],
                "mana_cost": "{1}{G}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Myr Battlesphere",
                "colors": [],
                "gatherer_ids": [
                    "209717"
                ],
                "mana_cost": "{7}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Mutavault",
                "colors": [],
                "gatherer_ids": [
                    "152724"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Mulldrifter",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "145811",
                    "189217",
                    "247302"
                ],
                "mana_cost": "{4}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Mox Diamond",
                "colors": [],
                "gatherer_ids": [
                    "212634",
                    "5193"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Mother of Runes",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5704",
                    "247525"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Mortify",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "247282",
                    "96930"
                ],
                "mana_cost": "{1}{W}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "living_weapon_means_creature": {
                        "types": [
                            "Artifact",
                            "Creature"
                        ]
                    }
                },
                "name": "Mortarpod",
                "colors": [],
                "gatherer_ids": [
                    "213725"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "Blue",
                            "White"
                        ]
                    }
                },
                "name": "Momentary Blink",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "109733"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Moment's Peace",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "31811"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Molten-Tail Masticore",
                "colors": [],
                "gatherer_ids": [
                    "215089"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Molten Rain",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "46000"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Moldervine Cloak",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "89009"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{4}{G}{G}",
                        "converted_mana_cost": 6
                    },
                    "always_kick_creatures": {
                        "mana_cost": "{4}{G}{G}",
                        "converted_mana_cost": 6
                    }
                },
                "name": "Mold Shambler",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "183414"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Mogg War Marshal",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "157924",
                    "116739"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Misty Rainforest",
                "colors": [],
                "gatherer_ids": [
                    "190413"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Mishra's Factory",
                "colors": [],
                "gatherer_ids": [
                    "1074",
                    "1072",
                    "1073",
                    "218340",
                    "1071",
                    "159114",
                    "2387"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Miscalculation",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "12376"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mirror Entity",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "141818"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Mirran Crusader",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "213802"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Mirari's Wake",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "35057",
                    "338455"
                ],
                "mana_cost": "{3}{G}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Mindslaver",
                "colors": [],
                "gatherer_ids": [
                    "46724",
                    "209044"
                ],
                "mana_cost": "{6}",
                "types": [
                    "Legendary",
                    "Artifact"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Mind's Desire",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "46424"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Mind Stone",
                "colors": [],
                "gatherer_ids": [
                    "4436",
                    "189228",
                    "135280"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mind Shatter",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "191324",
                    "157422"
                ],
                "mana_cost": "{X}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mimic Vat",
                "colors": [],
                "gatherer_ids": [
                    "207883"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Mikaeus, the Lunarch",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "247234",
                    "259296"
                ],
                "mana_cost": "{X}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Mesmeric Fiend",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "32211"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mentor of the Meek",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "244682"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Memory Lapse",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "2949",
                    "3924",
                    "11399",
                    "3345",
                    "27080",
                    "2950"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Memory Jar",
                "colors": [],
                "gatherer_ids": [
                    "8841",
                    "212633"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Meloku the Clouded Mirror",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "75268"
                ],
                "mana_cost": "{4}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Maze of Ith",
                "colors": [],
                "gatherer_ids": [
                    "201263",
                    "1824",
                    "287329"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Masticore",
                "colors": [],
                "gatherer_ids": [
                    "13087",
                    "212629"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Master of the Wild Hunt",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "191064"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Martial Coup",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "178560"
                ],
                "mana_cost": "{X}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Marsh Flats",
                "colors": [],
                "gatherer_ids": [
                    "191371"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Manriki-Gusari",
                "colors": [],
                "gatherer_ids": [
                    "74158"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mana Tithe",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "122324"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Mana Leak",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5182",
                    "21126",
                    "83160",
                    "45242",
                    "241831",
                    "204981"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Man-o'-War",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "21138",
                    "21038",
                    "3644",
                    "189240",
                    "4266"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Makeshift Mannequin",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "220569",
                    "139670"
                ],
                "mana_cost": "{3}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Magus of the Tabernacle",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "130719"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Magma Jet",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "189238",
                    "51180"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Maelstrom Pulse",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "180613"
                ],
                "mana_cost": "{1}{B}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Luminarch Ascension",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "197889"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Lu Xun, Scholar General",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "201286",
                    "10616"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Loyal Retainers",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "201136",
                    "338450",
                    "10491"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Loyal Cathar",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "244724"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Loxodon Hierarch",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "249414",
                    "83738"
                ],
                "mana_cost": "{2}{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Lotus Petal",
                "colors": [],
                "gatherer_ids": [
                    "4614",
                    "194975"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Lotus Cobra",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "185749"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{0}",
                        "converted_mana_cost": 0
                    }
                },
                "name": "Lotus Bloom",
                "colors": [],
                "gatherer_ids": [
                    "114904"
                ],
                "mana_cost": null,
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Looter il-Kor",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "118918"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Lodestone Golem",
                "colors": [],
                "gatherer_ids": [
                    "220536",
                    "191557"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "caring_about_controlling_land_types_affect_color": {
                        "colors": [
                            "White",
                            "Green"
                        ]
                    }
                },
                "name": "Loam Lion",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "249377",
                    "197873"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Llanowar Elves",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "14668",
                    "27256",
                    "158112",
                    "11386",
                    "2228",
                    "83515",
                    "221892",
                    "763",
                    "1260",
                    "461",
                    "21107",
                    "25508",
                    "189878",
                    "205228",
                    "3996",
                    "166",
                    "129626"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Living Death",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "21155",
                    "247416",
                    "210138",
                    "4671"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Lion's Eye Diamond",
                "colors": [],
                "gatherer_ids": [
                    "3255"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    },
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "White",
                            "Black"
                        ]
                    }
                },
                "name": "Lingering Souls",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "262695"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Liliana Vess",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "201348",
                    "205961",
                    "191241",
                    "140212"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Liliana of the Veil",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "235597"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Lightning Helix",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "87908",
                    "205361",
                    "249386"
                ],
                "mana_cost": "{R}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Lightning Greaves",
                "colors": [],
                "gatherer_ids": [
                    "247337",
                    "209141",
                    "46021",
                    "220528"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Lightning Bolt",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "27255",
                    "205227",
                    "1303",
                    "209",
                    "2291",
                    "191089",
                    "234704",
                    "159263",
                    "504",
                    "806"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Life from the Loam",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "338409",
                    "89001"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Leonin Relic-Warder",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "222860"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Legacy's Allure",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4708"
                ],
                "mana_cost": "{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": null,
                "name": "Leatherback Baloth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "197856"
                ],
                "mana_cost": "{G}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Lead the Stampede",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "213739",
                    "249369"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Black",
                            "Red"
                        ]
                    }
                },
                "name": "Lavaclaw Reaches",
                "colors": [],
                "gatherer_ids": [
                    "171007"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Laquatus's Champion",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "97063",
                    "31869"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Land Tax",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "201153",
                    "2349",
                    "21197",
                    "1624"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Lake of the Dead",
                "colors": [],
                "gatherer_ids": [
                    "159095",
                    "3234"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Krosan Grip",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "126274"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Kozilek, Butcher of Truth",
                "colors": [],
                "gatherer_ids": [
                    "193632"
                ],
                "mana_cost": "{10}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 10
            },
            {
                "heuristics": {},
                "name": "Koth of the Hammer",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "266362",
                    "212238"
                ],
                "mana_cost": "{2}{R}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Korlash, Heir to Blackblade",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "136208"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Kokusho, the Evening Star",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "50445",
                    "178022"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Kodama's Reach",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "50299",
                    "247174"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Knight of the Reliquary",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "243416",
                    "189145"
                ],
                "mana_cost": "{1}{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "White"
                        ]
                    }
                },
                "name": "Kjeldoran Outpost",
                "colors": [],
                "gatherer_ids": [
                    "3233",
                    "184555"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Zombie Cutthroat",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "43515"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Zo-Zu the Punisher",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "80274"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Yosei, the Morning Star",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "78590"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Yawgmoth's Will",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "5629"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Green"
                        ]
                    }
                },
                "name": "Yavimaya Hollow",
                "colors": [],
                "gatherer_ids": [
                    "15772"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Yavimaya Elder",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "247524",
                    "15225",
                    "207887"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Xiahou Dun, the One-Eyed",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "201164",
                    "10590"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Wurmcoil Engine",
                "colors": [],
                "gatherer_ids": [
                    "207875"
                ],
                "mana_cost": "{6}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Wrath of God",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "4166",
                    "83339",
                    "4408",
                    "129808",
                    "572",
                    "874",
                    "11581",
                    "45222",
                    "1372",
                    "14498",
                    "276",
                    "21180",
                    "2373"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Worship",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5576",
                    "83338",
                    "45219",
                    "25553"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Worn Powerstone",
                "colors": [],
                "gatherer_ids": [
                    "210137",
                    "8876"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": null,
                "name": "Woolly Thoctar",
                "colors": [
                    "White",
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "175062",
                    "249368"
                ],
                "mana_cost": "{R}{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Woodland Cemetery",
                "colors": [],
                "gatherer_ids": [
                    "241983"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Woodfall Primus",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "151987"
                ],
                "mana_cost": "{5}{G}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Wooded Foothills",
                "colors": [],
                "gatherer_ids": [
                    "39506"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Wood Elves",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "45400",
                    "13147",
                    "20224",
                    "83336",
                    "4327",
                    "6135",
                    "159038"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Wispmare",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "145974"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Windswept Heath",
                "colors": [],
                "gatherer_ids": [
                    "39507"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "White"
                        ]
                    }
                },
                "name": "Windbrisk Heights",
                "colors": [],
                "gatherer_ids": [
                    "145798",
                    "287338"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Willbender",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "42054",
                    "108861",
                    "189252"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wildfire",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "6610",
                    "5566",
                    "83483",
                    "25685"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {
                    "caring_about_controlling_land_types_affect_color": {
                        "colors": [
                            "White",
                            "Green",
                            "Red"
                        ]
                    }
                },
                "name": "Wild Nacatl",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "174989",
                    "249401"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Wickerbough Elder",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "151097",
                    "220575"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "White Knight",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "4165",
                    "189877",
                    "243426",
                    "570",
                    "872",
                    "205239",
                    "221569",
                    "1370",
                    "274",
                    "44212",
                    "2371"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Whipcorder",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "41024"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wheel of Fortune",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "202558",
                    "526",
                    "1326",
                    "231",
                    "828"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Werebear",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "29785"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Weathered Wayfarer",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "83311",
                    "39515"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Watery Grave",
                "colors": [],
                "gatherer_ids": [
                    "83731"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Waterfront Bouncer",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "19557"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wasteland",
                "colors": [],
                "gatherer_ids": [
                    "4944"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Wall of Roots",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "3422",
                    "106662",
                    "220566"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wall of Reverence",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "189874"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Wall of Omens",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "247400",
                    "193545"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wall of Blossoms",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "5265",
                    "275262"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wake Thrasher",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "157405"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Vulshok Refugee",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "218038"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Vorapede",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "262850"
                ],
                "mana_cost": "{2}{G}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Kitchen Finks",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "141976"
                ],
                "mana_cost": "{1}{G/W}{G/W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "caring_about_controlling_land_types_affect_color": {
                        "colors": [
                            "Green",
                            "Red"
                        ]
                    }
                },
                "name": "Kird Ape",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "249382",
                    "83346",
                    "962",
                    "1302",
                    "26605",
                    "194974"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Kira, Great Glass-Spinner",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "74445"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Keldon Marauders",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "125885",
                    "234709"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Keldon Champion",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "205801",
                    "15206",
                    "234713"
                ],
                "mana_cost": "{2}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Keiga, the Tide Star",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "75286"
                ],
                "mana_cost": "{5}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Karn Liberated",
                "colors": [],
                "gatherer_ids": [
                    "214350"
                ],
                "mana_cost": "{7}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Kargan Dragonlord",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "193482"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Karakas",
                "colors": [],
                "gatherer_ids": [
                    "1701",
                    "201198"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Kami of Ancient Law",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "50349"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Jushi Apprentice",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "78686"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Jungle Lion",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "201241",
                    "4302"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Journey to Nowhere",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "247547",
                    "222761",
                    "177505"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Joraga Treespeaker",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "193462"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Jokulhaups",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "14653",
                    "2631",
                    "4067",
                    "159235"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Jackal Pup",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4825",
                    "217974"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Jace, the Mind Sculptor",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "195297"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Jace Beleren",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "205960",
                    "140222",
                    "191240",
                    "185816"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Isolated Chapel",
                "colors": [],
                "gatherer_ids": [
                    "241979"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Isochron Scepter",
                "colors": [],
                "gatherer_ids": [
                    "46741",
                    "292752",
                    "212626"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": null,
                "name": "Isamaru, Hound of Konda",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "79217"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Iona, Shield of Emeria",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "190407"
                ],
                "mana_cost": "{6}{W}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 9
            },
            {
                "heuristics": {},
                "name": "Intuition",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4707"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{2}{U}{U}",
                        "converted_mana_cost": 4
                    }
                },
                "name": "Into the Roil",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "178151"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Inquisition of Kozilek",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "193428"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Innocent Blood",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "205364",
                    "29818"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Ink-Eyes, Servant of Oni",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "271182",
                    "74626"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Ingot Chewer",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "139686",
                    "189215"
                ],
                "mana_cost": "{4}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Inferno Titan",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "235192",
                    "205042"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Indrik Stomphowler",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "201834",
                    "107377"
                ],
                "mana_cost": "{4}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Increasing Devotion",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "262870"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Incinerate",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4063",
                    "3455",
                    "184636",
                    "185818",
                    "134751",
                    "2630",
                    "234075"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Impulse",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "26616",
                    "3641"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Imperial Seal",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "184717",
                    "10728"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Ideas Unbound",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "88789"
                ],
                "mana_cost": "{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Hystrodon",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "34952"
                ],
                "mana_cost": "{4}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Hypnotic Specter",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "1165",
                    "83354",
                    "665",
                    "190566",
                    "2109",
                    "68",
                    "363",
                    "129600"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Hymn to Tourach",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "1850",
                    "1851",
                    "1849",
                    "1852",
                    "159180"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Huntmaster of the Fells",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "262875"
                ],
                "mana_cost": "{2}{R}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Honor of the Pure",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "191058",
                    "233237",
                    "205099"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Hokori, Dust Drinker",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "74647"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Hinterland Harbor",
                "colors": [],
                "gatherer_ids": [
                    "241988"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Frost Titan",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "235191",
                    "204999"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Frenzied Goblin",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "87947"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Frantic Search",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "12375"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Force Spike",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "11285",
                    "1484",
                    "201160",
                    "3909",
                    "292750"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Force of Will",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "159092",
                    "3107"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "Blue",
                            "Black"
                        ]
                    }
                },
                "name": "Forbidden Alchemy",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "226758"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Forbid",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5157"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Flooded Strand",
                "colors": [],
                "gatherer_ids": [
                    "39503"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Flickerwisp",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "151089"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Flashfreeze",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "208219",
                    "121218",
                    "190168",
                    "220249",
                    "129908"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Flametongue Kavu",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "26262",
                    "247368",
                    "205392",
                    "189234"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Firestorm",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4547"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Firespout",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "153314",
                    "247407"
                ],
                "mana_cost": "{2}{R/G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Firemane Angel",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "89074",
                    "249366"
                ],
                "mana_cost": "{3}{R}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Firebolt",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "30570",
                    "189236"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Fireblast",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "189239",
                    "234736",
                    "3686"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Fire Ambush",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "201277",
                    "10632"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Figure of Destiny",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "236456",
                    "158106"
                ],
                "mana_cost": "{R/W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Fiend Hunter",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "222007"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Fertile Ground",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "21175",
                    "45416",
                    "139502",
                    "23114",
                    "205394",
                    "209113",
                    "5655"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Fellwar Stone",
                "colors": [],
                "gatherer_ids": [
                    "3781",
                    "2042",
                    "1714",
                    "247152",
                    "201228",
                    "83489"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Fauna Shaman",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "205059"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Fathom Seer",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "118912",
                    "189247"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Farseek",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "277824",
                    "87970"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Falkenrath Aristocrat",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "262847"
                ],
                "mana_cost": "{2}{B}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Faith's Fetters",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "83609",
                    "193869"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Fact or Fiction",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "185819",
                    "247186",
                    "22998"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Explore",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "201578"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Exhume",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "5556",
                    "21153",
                    "270462"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Exalted Angel",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "39718"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Everflowing Chalice",
                "colors": [],
                "gatherer_ids": [
                    "222750",
                    "220534",
                    "198374"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Ethersworn Canonist",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "174931"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Eternal Witness",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "247148",
                    "292966",
                    "51628"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Eternal Dragon",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "44398"
                ],
                "mana_cost": "{5}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Etched Oracle",
                "colors": [],
                "gatherer_ids": [
                    "72725",
                    "205330"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Essence Scatter",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "193742",
                    "276209"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Esper Charm",
                "colors": [
                    "Blue",
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "137913"
                ],
                "mana_cost": "{W}{U}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Epochrasite",
                "colors": [],
                "gatherer_ids": [
                    "136143"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Entomb",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "30552",
                    "270456"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Enlightened Tutor",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "3489",
                    "15355"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Engineered Explosives",
                "colors": [],
                "gatherer_ids": [
                    "50139"
                ],
                "mana_cost": "{X}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Enclave Cryptologist",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "194903"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Empty the Warrens",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "109735"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Emeria Angel",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "190399"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ember Hauler",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "208008"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Elves of Deep Shadow",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "1766",
                    "292942",
                    "83833",
                    "201324"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Elspeth, Knight-Errant",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "174859",
                    "217825"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Elspeth Tirel",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "212241"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": null,
                "name": "Elite Vanguard",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "208291",
                    "222710",
                    "189902",
                    "240315"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Elesh Norn, Grand Cenobite",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "214352"
                ],
                "mana_cost": "{5}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Electrolyze",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "96829",
                    "247276"
                ],
                "mana_cost": "{1}{U}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Eldrazi Monument",
                "colors": [],
                "gatherer_ids": [
                    "193398"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Eight-and-a-Half-Tails",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "50296"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Edric, Spymaster of Trest",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "230000",
                    "338443"
                ],
                "mana_cost": "{1}{G}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Earthquake",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4044",
                    "14651",
                    "791",
                    "2272",
                    "194",
                    "11254",
                    "4335",
                    "1289",
                    "190551",
                    "247315",
                    "489",
                    "6609"
                ],
                "mana_cost": "{X}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Duress",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "270465",
                    "197004",
                    "205024",
                    "14557",
                    "5557",
                    "190580",
                    "260979"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Drowned Catacomb",
                "colors": [],
                "gatherer_ids": [
                    "205090",
                    "191067",
                    "249717",
                    "221920"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Drogskol Reaver",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "262860"
                ],
                "mana_cost": "{5}{W}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Dream Halls",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5105"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Dragonskull Summit",
                "colors": [],
                "gatherer_ids": [
                    "205089",
                    "221921",
                    "191091",
                    "249716"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Doran, the Siege Tower",
                "colors": [
                    "Black",
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "140201",
                    "244674"
                ],
                "mana_cost": "{B}{G}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Doom Blade",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "190535",
                    "247322",
                    "205088",
                    "226560"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Dissipate",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "3332",
                    "241985",
                    "292758"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Dismiss",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4695"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{1}",
                        "converted_mana_cost": 1
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [],
                        "mana_cost": "{1}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Dismember",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "230082"
                ],
                "mana_cost": "{1}{B/P}{B/P}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "always_kick": {
                        "colors": [
                            "Blue",
                            "White"
                        ],
                        "mana_cost": "{4}{W}{U}",
                        "converted_mana_cost": 6
                    },
                    "off_color_kicker_is_gold": {
                        "colors": [
                            "Blue",
                            "White"
                        ]
                    }
                },
                "name": "Dismantling Blow",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "22946"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Disfigure",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "180115"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Disenchant",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "847",
                    "19548",
                    "1343",
                    "2337",
                    "4123",
                    "5630",
                    "21133",
                    "3485",
                    "2680",
                    "201162",
                    "11238",
                    "25500",
                    "107302",
                    "184689",
                    "14463",
                    "545",
                    "4872",
                    "249"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Diregraf Ghoul",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "226747"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Diabolic Servitude",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "270461",
                    "10427"
                ],
                "mana_cost": "{3}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Devoted Druid",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "135500"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Devil's Play",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "247419"
                ],
                "mana_cost": "{X}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Devastating Dreams",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "30561"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Destructive Force",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "205046"
                ],
                "mana_cost": "{5}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Despise",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "233043"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Desertion",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "3637",
                    "15370",
                    "338454"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Deranged Hermit",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "12458"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Deprive",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "193519"
                ],
                "mana_cost": "{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Demonic Tutor",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "60",
                    "1155",
                    "202628",
                    "193867",
                    "657",
                    "355"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Deep Analysis",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "32237",
                    "249365"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    },
                    "use_cycling_cost_as_mana_cost_for_triggered_abilities": {
                        "mana_cost": "{X}{2}{W}",
                        "converted_mana_cost": null
                    }
                },
                "name": "Decree of Justice",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "45141"
                ],
                "mana_cost": "{X}{X}{2}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Deathmark",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "190581",
                    "207100",
                    "129910",
                    "121119",
                    "221516"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Death Cloud",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "50647"
                ],
                "mana_cost": "{X}{B}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Daze",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "189255",
                    "21284"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Daybreak Ranger",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "222118"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Day of Judgment",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "186309",
                    "220139",
                    "208297"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Dauthi Slayer",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4654",
                    "107288"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Dauthi Marauder",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4651"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Dauthi Horror",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4650"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Dark Ritual",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3836",
                    "26632",
                    "2444",
                    "205422",
                    "5626",
                    "1149",
                    "4646",
                    "349",
                    "197019",
                    "651",
                    "2096",
                    "54",
                    "209137",
                    "21154",
                    "221510",
                    "3285",
                    "19592"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Dark Confidant",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "83771"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Damnation",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "122423"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Cursed Scroll",
                "colors": [],
                "gatherer_ids": [
                    "4601"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Cursecatcher",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "158763"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Cultivate",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "204996",
                    "247320",
                    "271193"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Cryptic Command",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "141819"
                ],
                "mana_cost": "{1}{U}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Cruel Ultimatum",
                "colors": [
                    "Blue",
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "259262",
                    "175079"
                ],
                "mana_cost": "{U}{U}{B}{B}{B}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Crucible of Worlds",
                "colors": [],
                "gatherer_ids": [
                    "51133",
                    "129480"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue",
                            "Black"
                        ]
                    }
                },
                "name": "Creeping Tar Pit",
                "colors": [],
                "gatherer_ids": [
                    "177520"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Creakwood Liege",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "157406"
                ],
                "mana_cost": "{1}{B/G}{B/G}{B/G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Court Hussar",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "107265",
                    "247191"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Countryside Crusher",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "152980"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Counterspell",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4693",
                    "20382",
                    "14511",
                    "21127",
                    "699",
                    "185820",
                    "1196",
                    "102",
                    "3898",
                    "26644",
                    "397",
                    "11214",
                    "19570",
                    "184687",
                    "25503",
                    "2148",
                    "202437",
                    "2500"
                ],
                "mana_cost": "{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Corpse Dance",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4644"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Control Magic",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "2147",
                    "697",
                    "1194",
                    "202411",
                    "395",
                    "100",
                    "21141"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Consuming Vapors",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "205936"
                ],
                "mana_cost": "{3}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Consecrated Sphinx",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "214063"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Condemn",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "130528",
                    "107494",
                    "205098"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Compulsive Research",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "87991"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Coldsteel Heart",
                "colors": [],
                "gatherer_ids": [
                    "121123"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Snow",
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Cold-Eyed Selkie",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "153471"
                ],
                "mana_cost": "{1}{G/U}{G/U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Coalition Relic",
                "colors": [],
                "gatherer_ids": [
                    "209158",
                    "125878"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Cloudthresher",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "146173"
                ],
                "mana_cost": "{2}{G}{G}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Cloudgoat Ranger",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "139664"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Clifftop Retreat",
                "colors": [],
                "gatherer_ids": [
                    "241980"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "City of Traitors",
                "colors": [],
                "gatherer_ids": [
                    "6168"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Chrome Mox",
                "colors": [],
                "gatherer_ids": [
                    "47446"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Char",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "87942"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Chaos Warp",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "236466",
                    "338441"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Channel",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "741",
                    "144",
                    "1237",
                    "202596",
                    "2203",
                    "439",
                    "194967"
                ],
                "mana_cost": "{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Chandra's Phoenix",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220298"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Chandra, the Firebrand",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220146",
                    "259205"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Chandra Nalaar",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "140176",
                    "185815",
                    "205958",
                    "191242"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Chameleon Colossus",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "220451",
                    "153450"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Chain Lightning",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "1563",
                    "201126",
                    "217977"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Celestial Purge",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "191595",
                    "208290",
                    "183055",
                    "220195"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue",
                            "White"
                        ]
                    }
                },
                "name": "Celestial Colonnade",
                "colors": [],
                "gatherer_ids": [
                    "177545"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Catastrophe",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5637",
                    "21143"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Cataclysm",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "6050"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Carnophage",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "6079"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Careful Consideration",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "109691"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Capsize",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4691"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Call the Skybreaker",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "157400",
                    "247202"
                ],
                "mana_cost": "{5}{U/R}{U/R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Call of the Herd",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "29786",
                    "109672"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Calciderm",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "122360"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Cabal Coffers",
                "colors": [],
                "gatherer_ids": [
                    "29896",
                    "205421"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Burrenton Forge-Tender",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "139395"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Burning of Xinye",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "10637",
                    "201274"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Buried Alive",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "247342",
                    "4451",
                    "29846",
                    "270455"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Broodmate Dragon",
                "colors": [
                    "Black",
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "178101"
                ],
                "mana_cost": "{3}{B}{R}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Brooding Saurian",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "122055"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Brine Elemental",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "189245",
                    "118895"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Brimstone Volley",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "233253"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Breeding Pool",
                "colors": [],
                "gatherer_ids": [
                    "97088"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Brainstorm",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "292751",
                    "27246",
                    "247331",
                    "184606",
                    "2497",
                    "19571",
                    "3897"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Braids, Cabal Minion",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "29947"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Bone Shredder",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "12400",
                    "209123"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Boggart Ram-Gang",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "153970",
                    "234723"
                ],
                "mana_cost": "{R/G}{R/G}{R/G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Bogardan Hellkite",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "191340",
                    "111041",
                    "178017",
                    "243464"
                ],
                "mana_cost": "{6}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Blue Elemental Blast",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "694",
                    "2146",
                    "1191",
                    "202520",
                    "392",
                    "97"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Bloodstained Mire",
                "colors": [],
                "gatherer_ids": [
                    "39505"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Bloodgift Demon",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "226885"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Bloodghast",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "192230"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Bloodbraid Elf",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "271167",
                    "185053"
                ],
                "mana_cost": "{2}{R}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Blood Knight",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "130715"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Blood Crypt",
                "colors": [],
                "gatherer_ids": [
                    "97102",
                    "253683"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Blistering Firecat",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "39737"
                ],
                "mana_cost": "{1}{R}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Blastoderm",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "21363",
                    "201831"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Blade Splicer",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "233068"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Black Vise",
                "colors": [],
                "gatherer_ids": [
                    "1097",
                    "601",
                    "4",
                    "2022",
                    "299",
                    "201239",
                    "212636"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Black Knight",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3826",
                    "2088",
                    "1145",
                    "190540",
                    "221568",
                    "50",
                    "345",
                    "205218",
                    "647",
                    "159817"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Bituminous Blast",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "220518",
                    "271166",
                    "185057"
                ],
                "mana_cost": "{3}{B}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Tribal",
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Bitterblossom",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "152648"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Tribal",
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    },
                    "activated_ability_costs_affect_color_do_not_pay_phyrexian": {
                        "colors": [
                            "Green"
                        ]
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [
                            "Green"
                        ],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    }
                },
                "name": "Birthing Pod",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "218006"
                ],
                "mana_cost": "{3}{G/P}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Birds of Paradise",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "11173",
                    "2201",
                    "1236",
                    "142",
                    "45439",
                    "207334",
                    "221896",
                    "129906",
                    "3963",
                    "437",
                    "739",
                    "14719",
                    "83688",
                    "191080"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Behemoth Sledge",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "249396",
                    "179545"
                ],
                "mana_cost": "{1}{G}{W}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Beast Within",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "221533",
                    "275255"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Beacon of Destruction",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "51612",
                    "135262"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": null,
                "name": "Bayou",
                "colors": [],
                "gatherer_ids": [
                    "201400",
                    "202604",
                    "879",
                    "577",
                    "1377",
                    "280"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "living_weapon_means_creature": {
                        "types": [
                            "Artifact",
                            "Creature"
                        ]
                    }
                },
                "name": "Batterskull",
                "colors": [],
                "gatherer_ids": [
                    "233055"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Basilisk Collar",
                "colors": [],
                "gatherer_ids": [
                    "198356"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Basalt Monolith",
                "colors": [],
                "gatherer_ids": [
                    "599",
                    "297",
                    "1096",
                    "2",
                    "202565"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Red"
                        ]
                    }
                },
                "name": "Barbarian Ring",
                "colors": [],
                "gatherer_ids": [
                    "234737",
                    "29906"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Bant Charm",
                "colors": [
                    "Blue",
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "137931"
                ],
                "mana_cost": "{G}{W}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Primeval Titan",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "241832",
                    "205027"
                ],
                "mana_cost": "{4}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Primal Command",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "141824",
                    "220571"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Priest of Urabrask",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "218037"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Price of Progress",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "234714",
                    "6123"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Black"
                        ]
                    },
                    "activated_ability_costs_affect_color_do_not_pay_phyrexian": {
                        "colors": []
                    }
                },
                "name": "Hex Parasite",
                "colors": [],
                "gatherer_ids": [
                    "218008"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Hero of Oxid Ridge",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "214028"
                ],
                "mana_cost": "{2}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Hero of Bladehold",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "214064"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Hellspark Elemental",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "174799",
                    "234711"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Hell's Thunder",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "176455"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Heartbeat of Spring",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "50461"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Havengul Lich",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "262852"
                ],
                "mana_cost": "{3}{U}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Harmonize",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "220584",
                    "247360",
                    "159033",
                    "122362",
                    "201817"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Hallowed Fountain",
                "colors": [],
                "gatherer_ids": [
                    "253684",
                    "97071"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Hallowed Burial",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "157394"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Grimgrin, Corpse-Born",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "247237"
                ],
                "mana_cost": "{3}{U}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Grim Monolith",
                "colors": [],
                "gatherer_ids": [
                    "12626"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Grim Lavamancer",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "234428",
                    "36111",
                    "234706"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Green",
                            "Black"
                        ]
                    }
                },
                "name": "Grim Backwoods",
                "colors": [],
                "gatherer_ids": [
                    "270939"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Green Sun's Zenith",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "221559"
                ],
                "mana_cost": "{X}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{R}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Greater Gargadon",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "111048"
                ],
                "mana_cost": "{9}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 10
            },
            {
                "heuristics": {},
                "name": "Great Sable Stag",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "193759"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Gravecrawler",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "222902"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Graveborn Muse",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "44841",
                    "135256"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Grave Titan",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "241830",
                    "205012"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Grand Arbiter Augustin IV",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "107329"
                ],
                "mana_cost": "{2}{W}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Grafted Wargear",
                "colors": [],
                "gatherer_ids": [
                    "50927"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Godless Shrine",
                "colors": [],
                "gatherer_ids": [
                    "96935"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Goblin Welder",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "13001"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Goblin Wardriver",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "213782"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Goblin Trenches",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "29417"
                ],
                "mana_cost": "{1}{R}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{2}{R}{R}",
                        "converted_mana_cost": 4
                    },
                    "always_kick_creatures": {
                        "mana_cost": "{2}{R}{R}",
                        "converted_mana_cost": 4
                    }
                },
                "name": "Goblin Ruinblaster",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "180411"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Goblin Legionnaire",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "26760"
                ],
                "mana_cost": "{R}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Goblin Guide",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "170987"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Goblin Goon",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "39888"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Go for the Throat",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "213799"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Glorious Anthem",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "26843",
                    "83106",
                    "45218",
                    "129572",
                    "5835"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Glen Elendra Archmage",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "157977"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Glacial Fortress",
                "colors": [],
                "gatherer_ids": [
                    "205094",
                    "249722",
                    "190562",
                    "221919"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Gilded Lotus",
                "colors": [],
                "gatherer_ids": [
                    "48189",
                    "249742"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Gifts Ungiven",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "194971",
                    "79090"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Gideon's Lawkeeper",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "228122"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Gideon Jura",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "192218",
                    "238329"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Giant Solifuge",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "106576"
                ],
                "mana_cost": "{2}{R/G}{R/G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Red"
                        ]
                    }
                },
                "name": "Ghitu Encampment",
                "colors": [],
                "gatherer_ids": [
                    "106564",
                    "234698",
                    "12497"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Geralf's Messenger",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "243250"
                ],
                "mana_cost": "{B}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Genju of the Spires",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "74666"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Genesis Wave",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "207882"
                ],
                "mana_cost": "{X}{G}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Genesis",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "34833"
                ],
                "mana_cost": "{4}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Geist of Saint Traft",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "247236"
                ],
                "mana_cost": "{1}{W}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Gathan Raiders",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220495",
                    "130707"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{B}{B}{B}",
                        "converted_mana_cost": 3
                    },
                    "always_kick_creatures": {
                        "mana_cost": "{B}{B}{B}",
                        "converted_mana_cost": 3
                    }
                },
                "name": "Gatekeeper of Malakir",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "185698"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Garruk, Primal Hunter",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "220100",
                    "253669"
                ],
                "mana_cost": "{2}{G}{G}{G}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Garruk Wildspeaker",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "247323",
                    "205959",
                    "140205",
                    "191243",
                    "201347"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Garruk Relentless",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "245250"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Gamble",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "10654"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Gaea's Cradle",
                "colors": [],
                "gatherer_ids": [
                    "10422"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Fyndhorn Elves",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "2568",
                    "159228"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Future Sight",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "39628"
                ],
                "mana_cost": "{2}{U}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Baneslayer Angel",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "191065",
                    "205077"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Banefire",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "186613"
                ],
                "mana_cost": "{X}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Bane of the Living",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "44493"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ball Lightning",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "26620",
                    "1783",
                    "4031",
                    "234722",
                    "2259",
                    "159139",
                    "191393"
                ],
                "mana_cost": "{R}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Balance",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "2321",
                    "831",
                    "1329",
                    "234",
                    "194966",
                    "202501",
                    "529"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": null,
                "name": "Badlands",
                "colors": [],
                "gatherer_ids": [
                    "202626",
                    "878",
                    "576",
                    "1376",
                    "279",
                    "184748"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Awakening Zone",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "271156",
                    "193507",
                    "247393"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Avenger of Zendikar",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "201570"
                ],
                "mana_cost": "{5}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Aven Mindcensor",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "136204"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Avalanche Riders",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "12418",
                    "108835"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Avacyn's Pilgrim",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "243212"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Augury Adept",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "147407"
                ],
                "mana_cost": "{1}{W/U}{W/U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Armageddon",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "228262",
                    "830",
                    "2320",
                    "14500",
                    "1328",
                    "159252",
                    "6520",
                    "20387",
                    "4104",
                    "4373",
                    "528",
                    "233"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Arid Mesa",
                "colors": [],
                "gatherer_ids": [
                    "177584"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Arc Trail",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "275254",
                    "206343"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Arc Lightning",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "21102",
                    "5733",
                    "205386"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Arbor Elf",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "197959",
                    "249840"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Ankh of Mishra",
                "colors": [],
                "gatherer_ids": [
                    "3760",
                    "1094",
                    "14771",
                    "598",
                    "1",
                    "159251",
                    "296",
                    "2017"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Animate Dead",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "1143",
                    "3823",
                    "265167",
                    "48",
                    "2085",
                    "645",
                    "343",
                    "159249"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Angelic Destiny",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "220230"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Angel of Despair",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "83869",
                    "247275"
                ],
                "mana_cost": "{3}{W}{W}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Ancient Tomb",
                "colors": [],
                "gatherer_ids": [
                    "4636",
                    "288994"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "Green",
                            "Red"
                        ]
                    }
                },
                "name": "Ancient Grudge",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "235600",
                    "109751"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{U}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Ancestral Vision",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "113505",
                    "189244"
                ],
                "mana_cost": null,
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Ambition's Cost",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "10493",
                    "45313"
                ],
                "mana_cost": "{3}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "All Is Dust",
                "colors": [],
                "gatherer_ids": [
                    "193658"
                ],
                "mana_cost": "{7}",
                "types": [
                    "Tribal",
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Akroma's Vengeance",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "41168",
                    "205366",
                    "247343"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Akroma, Angel of Wrath",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "193871",
                    "42049",
                    "106645"
                ],
                "mana_cost": "{5}{W}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Akroma, Angel of Fury",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "247358",
                    "122432"
                ],
                "mana_cost": "{5}{R}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Ajani Vengeant",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "174852",
                    "266299"
                ],
                "mana_cost": "{2}{R}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ajani Goldmane",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "140233",
                    "205957",
                    "191239"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Agony Warp",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "175052",
                    "220454"
                ],
                "mana_cost": "{U}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Aftershock",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4800"
                ],
                "mana_cost": "{2}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "\u00c6ther Vial",
                "colors": [],
                "gatherer_ids": [
                    "212630",
                    "48146"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "\u00c6ther Adept",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "205020",
                    "227222"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Aeon Chronicler",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "122449"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    }
                },
                "name": "Act of Aggression",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "230076"
                ],
                "mana_cost": "{3}{R/P}{R/P}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Acidic Slime",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "207333",
                    "247317",
                    "265718",
                    "189880",
                    "226906"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    }
                },
                "name": "Academy Ruins",
                "colors": [],
                "gatherer_ids": [
                    "116725"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Academy Rector",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "15138"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Abyssal Persecutor",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "197869"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Absorb",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "23155"
                ],
                "mana_cost": "{W}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            }
        ];
        $scope.after = [
            {
                "heuristics": {},
                "name": "Zombie Cutthroat",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "43515"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Zo-Zu the Punisher",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "80274"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Yosei, the Morning Star",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "78590"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Yawgmoth's Will",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "5629"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Green"
                        ]
                    }
                },
                "name": "Yavimaya Hollow",
                "colors": [],
                "gatherer_ids": [
                    "15772"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Yavimaya Elder",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "247524",
                    "15225",
                    "207887"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Xiahou Dun, the One-Eyed",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "201164",
                    "10590"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Wurmcoil Engine",
                "colors": [],
                "gatherer_ids": [
                    "207875"
                ],
                "mana_cost": "{6}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Wrench Mind",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "45990"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wrath of God",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "4166",
                    "83339",
                    "4408",
                    "129808",
                    "572",
                    "874",
                    "11581",
                    "45222",
                    "1372",
                    "14498",
                    "276",
                    "21180",
                    "2373"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Worship",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5576",
                    "83338",
                    "45219",
                    "25553"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Worn Powerstone",
                "colors": [],
                "gatherer_ids": [
                    "210137",
                    "8876"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": null,
                "name": "Woolly Thoctar",
                "colors": [
                    "White",
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "175062",
                    "249368"
                ],
                "mana_cost": "{R}{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Woodland Cemetery",
                "colors": [],
                "gatherer_ids": [
                    "241983"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Woodfall Primus",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "151987"
                ],
                "mana_cost": "{5}{G}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Wooded Foothills",
                "colors": [],
                "gatherer_ids": [
                    "39506"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Wolfir Silverheart",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "240090"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Wispmare",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "145974"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Windswept Heath",
                "colors": [],
                "gatherer_ids": [
                    "39507"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "White"
                        ]
                    }
                },
                "name": "Windbrisk Heights",
                "colors": [],
                "gatherer_ids": [
                    "145798",
                    "287338"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Willbender",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "42054",
                    "108861",
                    "189252"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wildfire",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "6610",
                    "5566",
                    "83483",
                    "25685"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {
                    "caring_about_controlling_land_types_affect_color": {
                        "colors": [
                            "White",
                            "Green",
                            "Red"
                        ]
                    }
                },
                "name": "Wild Nacatl",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "174989",
                    "249401"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Wickerbough Elder",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "151097",
                    "220575"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "White Knight",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "4165",
                    "189877",
                    "243426",
                    "570",
                    "872",
                    "205239",
                    "221569",
                    "1370",
                    "274",
                    "44212",
                    "2371"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Whipcorder",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "41024"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wheel of Fortune",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "202558",
                    "526",
                    "1326",
                    "231",
                    "828"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Werebear",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "29785"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Weathered Wayfarer",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "83311",
                    "39515"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Watery Grave",
                "colors": [],
                "gatherer_ids": [
                    "83731"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Wasteland",
                "colors": [],
                "gatherer_ids": [
                    "4944"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Wall of Roots",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "3422",
                    "106662",
                    "220566"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wall of Reverence",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "189874"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Wall of Omens",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "247400",
                    "193545"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wall of Blossoms",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "5265",
                    "275262"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Wake Thrasher",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "157405"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Vulshok Refugee",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "218038"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": null,
                "name": "Volcanic Island",
                "colors": [],
                "gatherer_ids": [
                    "1385",
                    "585",
                    "887",
                    "201406",
                    "202442"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Volcanic Hammer",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4366",
                    "20206",
                    "83327",
                    "30171",
                    "6593",
                    "45356"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Volcanic Fallout",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220512",
                    "180274"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Voidslime",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "97096"
                ],
                "mana_cost": "{G}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Voidmage Prodigy",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "40101",
                    "108811"
                ],
                "mana_cost": "{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Void",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "23200",
                    "109677"
                ],
                "mana_cost": "{3}{B}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Visara the Dreadful",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "39863",
                    "244677"
                ],
                "mana_cost": "{3}{B}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{G}{G}",
                        "converted_mana_cost": 2
                    }
                },
                "name": "Vines of Vastwood",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "177571"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Vinelasher Kudzu",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "83559"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Vindicate",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "19135"
                ],
                "mana_cost": "{1}{W}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Vexing Devil",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "278257"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Vesuvan Shapeshifter",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "109765"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Verdant Catacombs",
                "colors": [],
                "gatherer_ids": [
                    "193400"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Venser, the Sojourner",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "212240",
                    "266078"
                ],
                "mana_cost": "{3}{W}{U}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Venser, Shaper Savant",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "136209"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Vengevine",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "193556"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Vendilion Clique",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "152549"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "caring_about_controlling_land_types_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    }
                },
                "name": "Vedalken Shackles",
                "colors": [],
                "gatherer_ids": [
                    "50120"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Vampiric Tutor",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3629",
                    "15393"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Vampire Nighthawk",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "247552",
                    "185707",
                    "260989"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Vampire Hexmage",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "192232"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Urborg, Tomb of Yawgmoth",
                "colors": [],
                "gatherer_ids": [
                    "131005",
                    "287330"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Urabrask the Hidden",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "214378"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Upheaval",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "31852"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Unearth",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "12398"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Undermine",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "23190",
                    "259278"
                ],
                "mana_cost": "{U}{U}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": null,
                "name": "Underground Sea",
                "colors": [],
                "gatherer_ids": [
                    "584",
                    "886",
                    "184752",
                    "202536",
                    "1384",
                    "287"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "White",
                            "Black"
                        ]
                    }
                },
                "name": "Unburial Rites",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "227087"
                ],
                "mana_cost": "{4}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Umezawa's Jitte",
                "colors": [],
                "gatherer_ids": [
                    "81979"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Legendary",
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Ulvenwald Tracker",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "240154"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Ulamog, the Infinite Gyre",
                "colors": [],
                "gatherer_ids": [
                    "261321",
                    "194911"
                ],
                "mana_cost": "{11}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 11
            },
            {
                "heuristics": {},
                "name": "Turnabout",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5728"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": null,
                "name": "Tundra",
                "colors": [],
                "gatherer_ids": [
                    "583",
                    "885",
                    "184751",
                    "202424",
                    "286",
                    "1383"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Tumble Magnet",
                "colors": [],
                "gatherer_ids": [
                    "210232"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Trygon Predator",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "97112"
                ],
                "mana_cost": "{1}{G}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": null,
                "name": "Tropical Island",
                "colors": [],
                "gatherer_ids": [
                    "582",
                    "201405",
                    "884",
                    "202446",
                    "285",
                    "1382"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Troll Ascetic",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "49828",
                    "130498",
                    "247145"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Trinket Mage",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "50163",
                    "222746",
                    "209040"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Green"
                        ]
                    }
                },
                "name": "Treetop Village",
                "colors": [],
                "gatherer_ids": [
                    "12498",
                    "202279",
                    "106455",
                    "243455"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Treachery",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "12148"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Tragic Slip",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "242500"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Tradewind Rider",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4738"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Tormod's Crypt",
                "colors": [],
                "gatherer_ids": [
                    "2793",
                    "1724",
                    "279713",
                    "109716"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Torch Fiend",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "279989",
                    "244702"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Tooth and Nail",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "48122"
                ],
                "mana_cost": "{5}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Tombstalker",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "136041"
                ],
                "mana_cost": "{6}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    }
                },
                "name": "Tolaria West",
                "colors": [],
                "gatherer_ids": [
                    "136047"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Tithe",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "3730"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Tinker",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "194980",
                    "12383"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Tin Street Hooligan",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "96960"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Time Spiral",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "10423"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Tidings",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "21047",
                    "129770",
                    "83036"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Tidehollow Sculler",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "175054"
                ],
                "mana_cost": "{W}{B}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Tibalt, the Fiend-Blooded",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "276497"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "always_kick": {
                        "colors": [
                            "Black",
                            "Green",
                            "Red"
                        ],
                        "mana_cost": "{3}{B}{R}{G}",
                        "converted_mana_cost": 6
                    },
                    "off_color_kicker_is_gold": {
                        "colors": [
                            "Black",
                            "Green",
                            "Red"
                        ]
                    },
                    "always_kick_creatures": {
                        "colors": [
                            "Black",
                            "Green",
                            "Red"
                        ],
                        "mana_cost": "{3}{B}{R}{G}",
                        "converted_mana_cost": 6
                    }
                },
                "name": "Thunderscape Battlemage",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "25915",
                    "209155"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Thunderblust",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "157411"
                ],
                "mana_cost": "{2}{R}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Thrun, the Last Troll",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "214050"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Throat Slitter",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "271187",
                    "74108"
                ],
                "mana_cost": "{4}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Thran Dynamo",
                "colors": [],
                "gatherer_ids": [
                    "15248",
                    "220506"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Thoughtseize",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "145969"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "always_kick": {
                        "colors": [
                            "White",
                            "Green",
                            "Red"
                        ],
                        "mana_cost": "{2}{W}{R}{G}",
                        "converted_mana_cost": 5
                    },
                    "off_color_kicker_is_gold": {
                        "colors": [
                            "White",
                            "Green",
                            "Red"
                        ]
                    },
                    "always_kick_creatures": {
                        "colors": [
                            "White",
                            "Green",
                            "Red"
                        ],
                        "mana_cost": "{2}{W}{R}{G}",
                        "converted_mana_cost": 5
                    }
                },
                "name": "Thornscape Battlemage",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "25916",
                    "109745",
                    "209144"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Thornling",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "180341"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Thirst for Knowledge",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "218580",
                    "45978",
                    "205311"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Thelonite Hermit",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "126275",
                    "220558"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Thawing Glaciers",
                "colors": [],
                "gatherer_ids": [
                    "159106",
                    "3238"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Thalia, Guardian of Thraben",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "270445"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Terror",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3879",
                    "135199",
                    "45988",
                    "86",
                    "2131",
                    "1182",
                    "381",
                    "26659",
                    "16624",
                    "202486",
                    "25504",
                    "683",
                    "21151"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Terminus",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "262703"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Terminate",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "25871",
                    "176449",
                    "247166",
                    "220524"
                ],
                "mana_cost": "{B}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Terastodon",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "270451",
                    "197137"
                ],
                "mana_cost": "{6}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Tendrils of Agony",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "45842"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Temporal Mastery",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "240133"
                ],
                "mana_cost": "{5}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Temple Garden",
                "colors": [],
                "gatherer_ids": [
                    "89093",
                    "253681"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Teetering Peaks",
                "colors": [],
                "gatherer_ids": [
                    "234715",
                    "177549"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Tectonic Edge",
                "colors": [],
                "gatherer_ids": [
                    "197855"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Taurean Mauler",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220453",
                    "205404",
                    "153452"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Tattermunge Maniac",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "142013"
                ],
                "mana_cost": "{R/G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Tarmogoyf",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "136142"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Tangle Wire",
                "colors": [],
                "gatherer_ids": [
                    "21399"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Tandem Lookout",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "240203"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Tamiyo, the Moon Sage",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "240070"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": null,
                "name": "Taiga",
                "colors": [],
                "gatherer_ids": [
                    "883",
                    "581",
                    "284",
                    "184750",
                    "1381",
                    "202421"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Sylvan Library",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "1547",
                    "4012",
                    "159317",
                    "338456",
                    "2240"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Swords to Plowshares",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "869",
                    "21172",
                    "2714",
                    "271",
                    "202462",
                    "567",
                    "1367",
                    "184675",
                    "2367",
                    "218581"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Sword of War and Peace",
                "colors": [],
                "gatherer_ids": [
                    "214368"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sword of Light and Shadow",
                "colors": [],
                "gatherer_ids": [
                    "47453"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sword of Fire and Ice",
                "colors": [],
                "gatherer_ids": [
                    "46429"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sword of Feast and Famine",
                "colors": [],
                "gatherer_ids": [
                    "214070"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sword of Body and Mind",
                "colors": [],
                "gatherer_ids": [
                    "212640",
                    "209280"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Survival of the Fittest",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "6150"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sunpetal Grove",
                "colors": [],
                "gatherer_ids": [
                    "205124",
                    "191100",
                    "221923",
                    "249736"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Sundering Titan",
                "colors": [],
                "gatherer_ids": [
                    "212631",
                    "42084",
                    "220533"
                ],
                "mana_cost": "{8}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Sun Titan",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "241833",
                    "205030"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Sulfuric Vortex",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "47461"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sulfur Falls",
                "colors": [],
                "gatherer_ids": [
                    "241987"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Stupor",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "108923",
                    "16628",
                    "3316"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Stunted Growth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "2590",
                    "184674"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Student of Warfare",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "193598"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Strip Mine",
                "colors": [],
                "gatherer_ids": [
                    "1078",
                    "1079",
                    "1076",
                    "1077",
                    "2380",
                    "194968",
                    "202433"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Strangleroot Geist",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "262671"
                ],
                "mana_cost": "{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Stormblood Berserker",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220277"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Stoneforge Mystic",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "198383"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Stonecloaker",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "122469"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Stomping Ground",
                "colors": [],
                "gatherer_ids": [
                    "96896"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "White",
                            "Green"
                        ]
                    }
                },
                "name": "Stirring Wildwood",
                "colors": [],
                "gatherer_ids": [
                    "177560"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Stillmoon Cavalier",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "153037"
                ],
                "mana_cost": "{1}{W/B}{W/B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Stifle",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "46558"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Steppe Lynx",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "171012"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Steam Vents",
                "colors": [],
                "gatherer_ids": [
                    "253682",
                    "96923"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Staggershock",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "193571"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sprouting Thrinax",
                "colors": [
                    "Black",
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "174863"
                ],
                "mana_cost": "{B}{R}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Spiritmonger",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "28009"
                ],
                "mana_cost": "{3}{B}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Spinning Darkness",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4469"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Spikeshot Elder",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "209404"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Sphinx of the Steel Wind",
                "colors": [
                    "Blue",
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "270446",
                    "189641"
                ],
                "mana_cost": "{5}{W}{U}{B}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Sphinx of Jwar Isle",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "185709"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Sphere of the Suns",
                "colors": [],
                "gatherer_ids": [
                    "213776"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    },
                    "activated_ability_costs_affect_color_do_not_pay_phyrexian": {
                        "colors": []
                    }
                },
                "name": "Spellskite",
                "colors": [],
                "gatherer_ids": [
                    "217992"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Spell Pierce",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "178144"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "assume_on_color_cmc_for_mono_color_hybrids": {
                        "converted_mana_cost": 3
                    },
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Spectral Procession",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "152070"
                ],
                "mana_cost": "{2/W}{2/W}{2/W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Black"
                        ]
                    }
                },
                "name": "Spectral Lynx",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "26663"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sower of Temptation",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "140165"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Sorin, Lord of Innistrad",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "249985"
                ],
                "mana_cost": "{2}{W}{B}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Somberwald Sage",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "275711"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Soltari Priest",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "108856",
                    "4904"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Soltari Monk",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "4903"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Soltari Champion",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5235"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Solemn Simulacrum",
                "colors": [],
                "gatherer_ids": [
                    "247340",
                    "236907",
                    "49434"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Snuff Out",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "19595",
                    "201794"
                ],
                "mana_cost": "{3}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Sneak Attack",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "5594"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Snapcaster Mage",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "227676"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Smokestack",
                "colors": [],
                "gatherer_ids": [
                    "5730"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Smash to Smithereens",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "158243"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Slith Firewalker",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "46102",
                    "189222"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "White",
                            "Red"
                        ]
                    }
                },
                "name": "Slayers' Stronghold",
                "colors": [],
                "gatherer_ids": [
                    "240170"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Slaughter Pact",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "130704"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Slagstorm",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "214054"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Skullclamp",
                "colors": [],
                "gatherer_ids": [
                    "48197",
                    "194978",
                    "247201"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Skittering Skirge",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "27261",
                    "5573"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Skithiryx, the Blight Dragon",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "212249"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Skinrender",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "204958"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Sinkhole",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "380",
                    "202439",
                    "85",
                    "682"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Simic Sky Swallower",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "111204",
                    "247196"
                ],
                "mana_cost": "{5}{G}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Silverblade Paladin",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "240155"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Silver Knight",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "243425",
                    "44313"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Silent Specter",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "41280",
                    "97065"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Sigarda, Host of Herons",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "240033"
                ],
                "mana_cost": "{2}{G}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Siege-Gang Commander",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "43552",
                    "157926",
                    "130539",
                    "193751"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Shrine of Burning Rage",
                "colors": [],
                "gatherer_ids": [
                    "218018"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Shriekmaw",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "220572",
                    "247305",
                    "146175",
                    "259272"
                ],
                "mana_cost": "{4}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Show and Tell",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5697"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Shining Shoal",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "74519"
                ],
                "mana_cost": "{X}{W}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sheoldred, Whispering One",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "214382"
                ],
                "mana_cost": "{5}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    }
                },
                "name": "Shelldock Isle",
                "colors": [],
                "gatherer_ids": [
                    "146178"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Shadowmage Infiltrator",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "126333",
                    "33604"
                ],
                "mana_cost": "{1}{U}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Serendib Efreet",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "159137",
                    "194970",
                    "939",
                    "1221"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Sensei's Divining Top",
                "colors": [],
                "gatherer_ids": [
                    "194972",
                    "50400"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Seething Song",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220561",
                    "83377",
                    "34945",
                    "243487"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Searing Blaze",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "270873",
                    "193982"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{G}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Search for Tomorrow",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "108802",
                    "205408"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Seal of Primordium",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "130816"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sea Gate Oracle",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "194938"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": null,
                "name": "Scrubland",
                "colors": [],
                "gatherer_ids": [
                    "201403",
                    "882",
                    "580",
                    "202515",
                    "283",
                    "1380"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Plow Under",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "12628",
                    "45450"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Platinum Angel",
                "colors": [],
                "gatherer_ids": [
                    "106537",
                    "48580",
                    "206329",
                    "191313"
                ],
                "mana_cost": "{7}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Plated Geopede",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "170977",
                    "266210"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": null,
                "name": "Plateau",
                "colors": [],
                "gatherer_ids": [
                    "201402",
                    "578",
                    "202612",
                    "880",
                    "281",
                    "1378"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Plague Sliver",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "116748"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Pithing Needle",
                "colors": [],
                "gatherer_ids": [
                    "129526",
                    "74207",
                    "253581",
                    "191592"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Pillar of Flame",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "240013"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Pillage",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "3178",
                    "14755",
                    "13182",
                    "234720",
                    "184567"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Phyrexian Revoker",
                "colors": [],
                "gatherer_ids": [
                    "220589"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Phyrexian Rager",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "213804",
                    "135189",
                    "27660",
                    "201790"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Phyrexian Processor",
                "colors": [],
                "gatherer_ids": [
                    "207888",
                    "5610"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Phyrexian Obliterator",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "214386"
                ],
                "mana_cost": "{B}{B}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    }
                },
                "name": "Phyrexian Metamorph",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "214375"
                ],
                "mana_cost": "{3}{U/P}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Phyrexian Crusader",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "213724"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Phyrexian Arena",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "27663",
                    "83201",
                    "209132",
                    "45339",
                    "205417"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Phantom Centaur",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "35073"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Phantasmal Image",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "220099"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Phantasmal Bear",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "220251"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Persecute",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "25644",
                    "8843",
                    "45337",
                    "83199"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Pernicious Deed",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "25953"
                ],
                "mana_cost": "{1}{B}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Path to Exile",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "220511",
                    "266017",
                    "247180",
                    "179235"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Parallax Wave",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "22028"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Palladium Myr",
                "colors": [],
                "gatherer_ids": [
                    "212251"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Palinchron",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "12580"
                ],
                "mana_cost": "{5}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Paladin en-Vec",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5199",
                    "82951",
                    "129668"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Pact of Negation",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "130701"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Overrun",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "271201",
                    "238574",
                    "130506",
                    "4777",
                    "201779",
                    "189906",
                    "29996"
                ],
                "mana_cost": "{2}{G}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Overgrown Tomb",
                "colors": [],
                "gatherer_ids": [
                    "89072",
                    "253680"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Oust",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "194923"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Orcish Lumberjack",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "184656",
                    "2646"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Oracle of Mul Daya",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "185737"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Opt",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "22988"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Opposition",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "15796",
                    "15162"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Oona's Prowler",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "146582"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Olivia Voldaren",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "247235"
                ],
                "mana_cost": "{2}{B}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Old Man of the Sea",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "937",
                    "201144"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Okiba-Gang Shinobi",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "74576",
                    "271185"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Ohran Viper",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "121266"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Snow",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Obstinate Baloth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "205075"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Oblivion Ring",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "220586",
                    "259711",
                    "174909",
                    "247156",
                    "243451",
                    "205396",
                    "139414",
                    "270848",
                    "234567"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Obliterate",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "45396",
                    "23098"
                ],
                "mana_cost": "{6}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Nucklavee",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "247207",
                    "153058"
                ],
                "mana_cost": "{4}{U/R}{U/R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Nostalgic Dreams",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "32208"
                ],
                "mana_cost": "{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Noble Hierarch",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "179434"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Niv-Mizzet, the Firemind",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "292738",
                    "96952",
                    "178023"
                ],
                "mana_cost": "{2}{U}{U}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Ninja of the Deep Hours",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "74587",
                    "271184"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Night's Whisper",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "51178"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Nicol Bolas, Planeswalker",
                "colors": [
                    "Blue",
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "179441",
                    "260991",
                    "266154"
                ],
                "mana_cost": "{4}{U}{B}{B}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Nezumi Shortfang",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "78679"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Nezumi Graverobber",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "247175"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Nevinyrral's Disk",
                "colors": [],
                "gatherer_ids": [
                    "1128",
                    "634",
                    "37",
                    "3803",
                    "332",
                    "2061",
                    "159266",
                    "212637"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Nekrataal",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "83185",
                    "129658",
                    "3623",
                    "15391",
                    "45310"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Negate",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "230757",
                    "254114",
                    "152570",
                    "208222",
                    "190164"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Necropotence",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "2478",
                    "184651",
                    "3865",
                    "194977"
                ],
                "mana_cost": "{B}{B}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Necromancy",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3621"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Naturalize",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "193439",
                    "207336",
                    "129656",
                    "45420",
                    "253672",
                    "189896",
                    "174890",
                    "221894",
                    "35414",
                    "237015",
                    "83183"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Natural Order",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "3671",
                    "4307"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Narcolepsy",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "193594"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Nantuko Vigilante",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "44210"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Mystical Tutor",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "3351",
                    "15367",
                    "194976"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Mystic Snake",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "109693",
                    "26421"
                ],
                "mana_cost": "{1}{G}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Myr Battlesphere",
                "colors": [],
                "gatherer_ids": [
                    "209717"
                ],
                "mana_cost": "{7}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Mutavault",
                "colors": [],
                "gatherer_ids": [
                    "152724"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Mulldrifter",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "145811",
                    "189217",
                    "247302"
                ],
                "mana_cost": "{4}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Mox Diamond",
                "colors": [],
                "gatherer_ids": [
                    "212634",
                    "5193"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Mother of Runes",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5704",
                    "247525"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Mortify",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "247282",
                    "96930"
                ],
                "mana_cost": "{1}{W}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "living_weapon_means_creature": {
                        "types": [
                            "Artifact",
                            "Creature"
                        ]
                    }
                },
                "name": "Mortarpod",
                "colors": [],
                "gatherer_ids": [
                    "213725"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "Blue",
                            "White"
                        ]
                    }
                },
                "name": "Momentary Blink",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "109733"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Moment's Peace",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "31811"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Molten-Tail Masticore",
                "colors": [],
                "gatherer_ids": [
                    "215089"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Molten Rain",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "46000"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Moldervine Cloak",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "89009"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{4}{G}{G}",
                        "converted_mana_cost": 6
                    },
                    "always_kick_creatures": {
                        "mana_cost": "{4}{G}{G}",
                        "converted_mana_cost": 6
                    }
                },
                "name": "Mold Shambler",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "183414"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Mogg War Marshal",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "157924",
                    "116739"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Misty Rainforest",
                "colors": [],
                "gatherer_ids": [
                    "190413"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Mishra's Factory",
                "colors": [],
                "gatherer_ids": [
                    "1074",
                    "1072",
                    "1073",
                    "218340",
                    "1071",
                    "159114",
                    "2387"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Miscalculation",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "12376"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mirror Entity",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "141818"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Mirran Crusader",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "213802"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Mirari's Wake",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "35057",
                    "338455"
                ],
                "mana_cost": "{3}{G}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Mindslaver",
                "colors": [],
                "gatherer_ids": [
                    "46724",
                    "209044"
                ],
                "mana_cost": "{6}",
                "types": [
                    "Legendary",
                    "Artifact"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Mind's Desire",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "46424"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Mind Stone",
                "colors": [],
                "gatherer_ids": [
                    "4436",
                    "189228",
                    "135280"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mimic Vat",
                "colors": [],
                "gatherer_ids": [
                    "207883"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Mikaeus, the Lunarch",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "247234",
                    "259296"
                ],
                "mana_cost": "{X}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Mesmeric Fiend",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "32211"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mentor of the Meek",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "244682"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Memory Lapse",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "2949",
                    "3924",
                    "11399",
                    "3345",
                    "27080",
                    "2950"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Memory Jar",
                "colors": [],
                "gatherer_ids": [
                    "8841",
                    "212633"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Meloku the Clouded Mirror",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "75268"
                ],
                "mana_cost": "{4}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Maze of Ith",
                "colors": [],
                "gatherer_ids": [
                    "201263",
                    "1824",
                    "287329"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Masticore",
                "colors": [],
                "gatherer_ids": [
                    "13087",
                    "212629"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Master of the Wild Hunt",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "191064"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Massacre Wurm",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "214044"
                ],
                "mana_cost": "{3}{B}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Martial Coup",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "178560"
                ],
                "mana_cost": "{X}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Marsh Flats",
                "colors": [],
                "gatherer_ids": [
                    "191371"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Manriki-Gusari",
                "colors": [],
                "gatherer_ids": [
                    "74158"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Mana Tithe",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "122324"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Mana Leak",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5182",
                    "21126",
                    "83160",
                    "45242",
                    "241831",
                    "204981"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Man-o'-War",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "21138",
                    "21038",
                    "3644",
                    "189240",
                    "4266"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Makeshift Mannequin",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "220569",
                    "139670"
                ],
                "mana_cost": "{3}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Magma Jet",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "189238",
                    "51180"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Maelstrom Pulse",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "180613"
                ],
                "mana_cost": "{1}{B}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Luminarch Ascension",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "197889"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Loyal Cathar",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "244724"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Loxodon Hierarch",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "249414",
                    "83738"
                ],
                "mana_cost": "{2}{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Lotus Petal",
                "colors": [],
                "gatherer_ids": [
                    "4614",
                    "194975"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Lotus Cobra",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "185749"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{0}",
                        "converted_mana_cost": 0
                    }
                },
                "name": "Lotus Bloom",
                "colors": [],
                "gatherer_ids": [
                    "114904"
                ],
                "mana_cost": null,
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Looter il-Kor",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "118918"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Lone Revenant",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "275706"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Lodestone Golem",
                "colors": [],
                "gatherer_ids": [
                    "220536",
                    "191557"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "caring_about_controlling_land_types_affect_color": {
                        "colors": [
                            "White",
                            "Green"
                        ]
                    }
                },
                "name": "Loam Lion",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "249377",
                    "197873"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Llanowar Elves",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "14668",
                    "27256",
                    "158112",
                    "11386",
                    "2228",
                    "83515",
                    "221892",
                    "763",
                    "1260",
                    "461",
                    "21107",
                    "25508",
                    "189878",
                    "205228",
                    "3996",
                    "166",
                    "129626"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Living Death",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "21155",
                    "247416",
                    "210138",
                    "4671"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Lion's Eye Diamond",
                "colors": [],
                "gatherer_ids": [
                    "3255"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    },
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "White",
                            "Black"
                        ]
                    }
                },
                "name": "Lingering Souls",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "262695"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Liliana Vess",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "201348",
                    "205961",
                    "191241",
                    "140212"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Liliana of the Veil",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "235597"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Lightning Helix",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "87908",
                    "205361",
                    "249386"
                ],
                "mana_cost": "{R}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Lightning Greaves",
                "colors": [],
                "gatherer_ids": [
                    "247337",
                    "209141",
                    "46021",
                    "220528"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Lightning Bolt",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "27255",
                    "205227",
                    "1303",
                    "209",
                    "2291",
                    "191089",
                    "234704",
                    "159263",
                    "504",
                    "806"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Leonin Relic-Warder",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "222860"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": null,
                "name": "Leatherback Baloth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "197856"
                ],
                "mana_cost": "{G}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Lead the Stampede",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "213739",
                    "249369"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Black",
                            "Red"
                        ]
                    }
                },
                "name": "Lavaclaw Reaches",
                "colors": [],
                "gatherer_ids": [
                    "171007"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Laquatus's Champion",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "97063",
                    "31869"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Land Tax",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "201153",
                    "2349",
                    "21197",
                    "1624"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Lake of the Dead",
                "colors": [],
                "gatherer_ids": [
                    "159095",
                    "3234"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Krosan Grip",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "126274"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Kozilek, Butcher of Truth",
                "colors": [],
                "gatherer_ids": [
                    "193632"
                ],
                "mana_cost": "{10}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 10
            },
            {
                "heuristics": {},
                "name": "Koth of the Hammer",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "266362",
                    "212238"
                ],
                "mana_cost": "{2}{R}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Korlash, Heir to Blackblade",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "136208"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Kodama's Reach",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "50299",
                    "247174"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Knight of the Reliquary",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "243416",
                    "189145"
                ],
                "mana_cost": "{1}{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "White"
                        ]
                    }
                },
                "name": "Kjeldoran Outpost",
                "colors": [],
                "gatherer_ids": [
                    "3233",
                    "184555"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Kitchen Finks",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "141976"
                ],
                "mana_cost": "{1}{G/W}{G/W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "caring_about_controlling_land_types_affect_color": {
                        "colors": [
                            "Green",
                            "Red"
                        ]
                    }
                },
                "name": "Kird Ape",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "249382",
                    "83346",
                    "962",
                    "1302",
                    "26605",
                    "194974"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Kira, Great Glass-Spinner",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "74445"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Keldon Marauders",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "125885",
                    "234709"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Keldon Champion",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "205801",
                    "15206",
                    "234713"
                ],
                "mana_cost": "{2}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Keiga, the Tide Star",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "75286"
                ],
                "mana_cost": "{5}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Karn Liberated",
                "colors": [],
                "gatherer_ids": [
                    "214350"
                ],
                "mana_cost": "{7}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Kargan Dragonlord",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "193482"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Karakas",
                "colors": [],
                "gatherer_ids": [
                    "1701",
                    "201198"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Kami of Ancient Law",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "50349"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Jushi Apprentice",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "78686"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Journey to Nowhere",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "247547",
                    "222761",
                    "177505"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Joraga Treespeaker",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "193462"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Jokulhaups",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "14653",
                    "2631",
                    "4067",
                    "159235"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Jade Mage",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "220279",
                    "249397"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Jackal Pup",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4825",
                    "217974"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Jace, the Mind Sculptor",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "195297"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Jace Beleren",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "205960",
                    "140222",
                    "191240",
                    "185816"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Isolated Chapel",
                "colors": [],
                "gatherer_ids": [
                    "241979"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Isochron Scepter",
                "colors": [],
                "gatherer_ids": [
                    "46741",
                    "292752",
                    "212626"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": null,
                "name": "Isamaru, Hound of Konda",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "79217"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Intuition",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4707"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{2}{U}{U}",
                        "converted_mana_cost": 4
                    }
                },
                "name": "Into the Roil",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "178151"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Inquisition of Kozilek",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "193428"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Innocent Blood",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "205364",
                    "29818"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Ink-Eyes, Servant of Oni",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "271182",
                    "74626"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Ingot Chewer",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "139686",
                    "189215"
                ],
                "mana_cost": "{4}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Inferno Titan",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "235192",
                    "205042"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Indrik Stomphowler",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "201834",
                    "107377"
                ],
                "mana_cost": "{4}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Increasing Devotion",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "262870"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Incinerate",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4063",
                    "3455",
                    "184636",
                    "185818",
                    "134751",
                    "2630",
                    "234075"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Impulse",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "26616",
                    "3641"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Imperial Seal",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "184717",
                    "10728"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Ideas Unbound",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "88789"
                ],
                "mana_cost": "{U}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Hystrodon",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "34952"
                ],
                "mana_cost": "{4}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Hypnotic Specter",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "1165",
                    "83354",
                    "665",
                    "190566",
                    "2109",
                    "68",
                    "363",
                    "129600"
                ],
                "mana_cost": "{1}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Hymn to Tourach",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "1850",
                    "1851",
                    "1849",
                    "1852",
                    "159180"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Huntmaster of the Fells",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "262875"
                ],
                "mana_cost": "{2}{R}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Honor of the Pure",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "191058",
                    "233237",
                    "205099"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Hokori, Dust Drinker",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "74647"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Hinterland Harbor",
                "colors": [],
                "gatherer_ids": [
                    "241988"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Black"
                        ]
                    },
                    "activated_ability_costs_affect_color_do_not_pay_phyrexian": {
                        "colors": []
                    }
                },
                "name": "Hex Parasite",
                "colors": [],
                "gatherer_ids": [
                    "218008"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Hero of Oxid Ridge",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "214028"
                ],
                "mana_cost": "{2}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Hero of Bladehold",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "214064"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Hellspark Elemental",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "174799",
                    "234711"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Hellrider",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "226874"
                ],
                "mana_cost": "{2}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Hell's Thunder",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "176455"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Heartbeat of Spring",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "50461"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Headhunter",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "39726"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Havengul Lich",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "262852"
                ],
                "mana_cost": "{3}{U}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Harmonize",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "220584",
                    "247360",
                    "159033",
                    "122362",
                    "201817"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Hallowed Fountain",
                "colors": [],
                "gatherer_ids": [
                    "253684",
                    "97071"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Guul Draz Assassin",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "193612"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Griselbrand",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "239995"
                ],
                "mana_cost": "{4}{B}{B}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Grimgrin, Corpse-Born",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "247237"
                ],
                "mana_cost": "{3}{U}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Grim Monolith",
                "colors": [],
                "gatherer_ids": [
                    "12626"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Grim Lavamancer",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "234428",
                    "36111",
                    "234706"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Green Sun's Zenith",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "221559"
                ],
                "mana_cost": "{X}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{R}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Greater Gargadon",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "111048"
                ],
                "mana_cost": "{9}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 10
            },
            {
                "heuristics": {},
                "name": "Great Sable Stag",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "193759"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Gravecrawler",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "222902"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Graveborn Muse",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "44841",
                    "135256"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Grave Titan",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "241830",
                    "205012"
                ],
                "mana_cost": "{4}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Grand Arbiter Augustin IV",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "107329"
                ],
                "mana_cost": "{2}{W}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Grafted Wargear",
                "colors": [],
                "gatherer_ids": [
                    "50927"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Godless Shrine",
                "colors": [],
                "gatherer_ids": [
                    "96935"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Goblin Welder",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "13001"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Goblin Trenches",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "29417"
                ],
                "mana_cost": "{1}{R}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{2}{R}{R}",
                        "converted_mana_cost": 4
                    },
                    "always_kick_creatures": {
                        "mana_cost": "{2}{R}{R}",
                        "converted_mana_cost": 4
                    }
                },
                "name": "Goblin Ruinblaster",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "180411"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Goblin Legionnaire",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "26760"
                ],
                "mana_cost": "{R}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Goblin Guide",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "170987"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Goblin Goon",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "39888"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Go for the Throat",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "213799"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Glorious Anthem",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "26843",
                    "83106",
                    "45218",
                    "129572",
                    "5835"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Gloom Surgeon",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "240165"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Glen Elendra Archmage",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "157977"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Glacial Fortress",
                "colors": [],
                "gatherer_ids": [
                    "205094",
                    "249722",
                    "190562",
                    "221919"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Gilded Lotus",
                "colors": [],
                "gatherer_ids": [
                    "48189",
                    "249742"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Gifts Ungiven",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "194971",
                    "79090"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Gideon's Lawkeeper",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "228122"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Gideon Jura",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "192218",
                    "238329"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Giant Solifuge",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "106576"
                ],
                "mana_cost": "{2}{R/G}{R/G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Red"
                        ]
                    }
                },
                "name": "Ghitu Encampment",
                "colors": [],
                "gatherer_ids": [
                    "106564",
                    "234698",
                    "12497"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Geralf's Messenger",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "243250"
                ],
                "mana_cost": "{B}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Genju of the Spires",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "74666"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Genesis Wave",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "207882"
                ],
                "mana_cost": "{X}{G}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Genesis",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "34833"
                ],
                "mana_cost": "{4}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Geist of Saint Traft",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "247236"
                ],
                "mana_cost": "{1}{W}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Gathan Raiders",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220495",
                    "130707"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "always_kick": {
                        "mana_cost": "{B}{B}{B}",
                        "converted_mana_cost": 3
                    },
                    "always_kick_creatures": {
                        "mana_cost": "{B}{B}{B}",
                        "converted_mana_cost": 3
                    }
                },
                "name": "Gatekeeper of Malakir",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "185698"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Garruk, Primal Hunter",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "220100",
                    "253669"
                ],
                "mana_cost": "{2}{G}{G}{G}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Garruk Wildspeaker",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "247323",
                    "205959",
                    "140205",
                    "191243",
                    "201347"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Garruk Relentless",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "245250"
                ],
                "mana_cost": "{3}{G}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Gamble",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "10654"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Gaea's Cradle",
                "colors": [],
                "gatherer_ids": [
                    "10422"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Fyndhorn Elves",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "2568",
                    "159228"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Future Sight",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "39628"
                ],
                "mana_cost": "{2}{U}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Frost Titan",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "235191",
                    "204999"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Frenzied Goblin",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "87947"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Frantic Search",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "12375"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Force Spike",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "11285",
                    "1484",
                    "201160",
                    "3909",
                    "292750"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Force of Will",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "159092",
                    "3107"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "Blue",
                            "Black"
                        ]
                    }
                },
                "name": "Forbidden Alchemy",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "226758"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Forbid",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5157"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Flooded Strand",
                "colors": [],
                "gatherer_ids": [
                    "39503"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Flickerwisp",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "151089"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Flashfreeze",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "208219",
                    "121218",
                    "190168",
                    "220249",
                    "129908"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Flametongue Kavu",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "26262",
                    "247368",
                    "205392",
                    "189234"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Firestorm",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4547"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Firespout",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "153314",
                    "247407"
                ],
                "mana_cost": "{2}{R/G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Firemane Angel",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "89074",
                    "249366"
                ],
                "mana_cost": "{3}{R}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Fireblast",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "189239",
                    "234736",
                    "3686"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Figure of Destiny",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "236456",
                    "158106"
                ],
                "mana_cost": "{R/W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Fiend Hunter",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "222007"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Fettergeist",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "240080"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Fertile Ground",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "21175",
                    "45416",
                    "139502",
                    "23114",
                    "205394",
                    "209113",
                    "5655"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Fellwar Stone",
                "colors": [],
                "gatherer_ids": [
                    "3781",
                    "2042",
                    "1714",
                    "247152",
                    "201228",
                    "83489"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Fauna Shaman",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "205059"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Fathom Seer",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "118912",
                    "189247"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Farseek",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "277824",
                    "87970"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Falkenrath Aristocrat",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "262847"
                ],
                "mana_cost": "{2}{B}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Faith's Fetters",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "83609",
                    "193869"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Fact or Fiction",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "185819",
                    "247186",
                    "22998"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Explore",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "201578"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Exhume",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "5556",
                    "21153",
                    "270462"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Exalted Angel",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "39718"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Everflowing Chalice",
                "colors": [],
                "gatherer_ids": [
                    "222750",
                    "220534",
                    "198374"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Ethersworn Canonist",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "174931"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Eternal Witness",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "247148",
                    "292966",
                    "51628"
                ],
                "mana_cost": "{1}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Eternal Dragon",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "44398"
                ],
                "mana_cost": "{5}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Etched Oracle",
                "colors": [],
                "gatherer_ids": [
                    "72725",
                    "205330"
                ],
                "mana_cost": "{4}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Essence Scatter",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "193742",
                    "276209"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Esper Charm",
                "colors": [
                    "Blue",
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "137913"
                ],
                "mana_cost": "{W}{U}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Epochrasite",
                "colors": [],
                "gatherer_ids": [
                    "136143"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Entomb",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "30552",
                    "270456"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Enlightened Tutor",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "3489",
                    "15355"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Engineered Explosives",
                "colors": [],
                "gatherer_ids": [
                    "50139"
                ],
                "mana_cost": "{X}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Enclave Cryptologist",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "194903"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Empty the Warrens",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "109735"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Emeria Angel",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "190399"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ember Hauler",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "208008"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Elves of Deep Shadow",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "1766",
                    "292942",
                    "83833",
                    "201324"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Elspeth, Knight-Errant",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "174859",
                    "217825"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Elspeth Tirel",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "212241"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": null,
                "name": "Elite Vanguard",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "208291",
                    "222710",
                    "189902",
                    "240315"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Elesh Norn, Grand Cenobite",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "214352"
                ],
                "mana_cost": "{5}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Electrolyze",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "96829",
                    "247276"
                ],
                "mana_cost": "{1}{U}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Eldrazi Monument",
                "colors": [],
                "gatherer_ids": [
                    "193398"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Eight-and-a-Half-Tails",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "50296"
                ],
                "mana_cost": "{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Edric, Spymaster of Trest",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "230000",
                    "338443"
                ],
                "mana_cost": "{1}{G}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Earthquake",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4044",
                    "14651",
                    "791",
                    "2272",
                    "194",
                    "11254",
                    "4335",
                    "1289",
                    "190551",
                    "247315",
                    "489",
                    "6609"
                ],
                "mana_cost": "{X}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Duress",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "270465",
                    "197004",
                    "205024",
                    "14557",
                    "5557",
                    "190580",
                    "260979"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Dungeon Geists",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "249875"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Drowned Catacomb",
                "colors": [],
                "gatherer_ids": [
                    "205090",
                    "191067",
                    "249717",
                    "221920"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Drogskol Reaver",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "262860"
                ],
                "mana_cost": "{5}{W}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Dream Halls",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "5105"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Dragonskull Summit",
                "colors": [],
                "gatherer_ids": [
                    "205089",
                    "221921",
                    "191091",
                    "249716"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Doran, the Siege Tower",
                "colors": [
                    "Black",
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "140201",
                    "244674"
                ],
                "mana_cost": "{B}{G}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Doom Blade",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "190535",
                    "247322",
                    "205088",
                    "226560"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Dissipate",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "3332",
                    "241985",
                    "292758"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Dismiss",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4695"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{1}",
                        "converted_mana_cost": 1
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [],
                        "mana_cost": "{1}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Dismember",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "230082"
                ],
                "mana_cost": "{1}{B/P}{B/P}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "always_kick": {
                        "colors": [
                            "Blue",
                            "White"
                        ],
                        "mana_cost": "{4}{W}{U}",
                        "converted_mana_cost": 6
                    },
                    "off_color_kicker_is_gold": {
                        "colors": [
                            "Blue",
                            "White"
                        ]
                    }
                },
                "name": "Dismantling Blow",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "22946"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Disenchant",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "847",
                    "19548",
                    "1343",
                    "2337",
                    "4123",
                    "5630",
                    "21133",
                    "3485",
                    "2680",
                    "201162",
                    "11238",
                    "25500",
                    "107302",
                    "184689",
                    "14463",
                    "545",
                    "4872",
                    "249"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Diregraf Ghoul",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "226747"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Diabolic Servitude",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "270461",
                    "10427"
                ],
                "mana_cost": "{3}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Diabolic Edict",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4656",
                    "27251"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Devoted Druid",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "135500"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Devil's Play",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "247419"
                ],
                "mana_cost": "{X}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Devastating Dreams",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "30561"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Despise",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "233043"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue",
                            "Red"
                        ]
                    }
                },
                "name": "Desolate Lighthouse",
                "colors": [],
                "gatherer_ids": [
                    "240147"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Desertion",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "3637",
                    "15370",
                    "338454"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Deranged Hermit",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "12458"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Deprive",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "193519"
                ],
                "mana_cost": "{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Demonic Tutor",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "60",
                    "1155",
                    "202628",
                    "193867",
                    "657",
                    "355"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Demonic Taskmaster",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "271092"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Demonic Rising",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "278060"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Delver of Secrets",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "226749"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Deep Analysis",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "32237",
                    "249365"
                ],
                "mana_cost": "{3}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {
                    "use_cycling_cost_as_mana_cost_for_triggered_abilities": {
                        "mana_cost": "{3}{B}{B}",
                        "converted_mana_cost": 5
                    }
                },
                "name": "Decree of Pain",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "338453",
                    "43522"
                ],
                "mana_cost": "{6}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    },
                    "use_cycling_cost_as_mana_cost_for_triggered_abilities": {
                        "mana_cost": "{X}{2}{W}",
                        "converted_mana_cost": null
                    }
                },
                "name": "Decree of Justice",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "45141"
                ],
                "mana_cost": "{X}{X}{2}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Deathmark",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "190581",
                    "207100",
                    "129910",
                    "121119",
                    "221516"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Daze",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "189255",
                    "21284"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Daybreak Ranger",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "222118"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Day of Judgment",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "186309",
                    "220139",
                    "208297"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Dauthi Horror",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4650"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Dark Ritual",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3836",
                    "26632",
                    "2444",
                    "205422",
                    "5626",
                    "1149",
                    "4646",
                    "349",
                    "197019",
                    "651",
                    "2096",
                    "54",
                    "209137",
                    "21154",
                    "221510",
                    "3285",
                    "19592"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Dark Confidant",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "83771"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Damnation",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "122423"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Cursed Scroll",
                "colors": [],
                "gatherer_ids": [
                    "4601"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Cursecatcher",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "158763"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Cultivate",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "204996",
                    "247320",
                    "271193"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Cryptic Command",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "141819"
                ],
                "mana_cost": "{1}{U}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Cruel Ultimatum",
                "colors": [
                    "Blue",
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "259262",
                    "175079"
                ],
                "mana_cost": "{U}{U}{B}{B}{B}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Crucible of Worlds",
                "colors": [],
                "gatherer_ids": [
                    "51133",
                    "129480"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue",
                            "Black"
                        ]
                    }
                },
                "name": "Creeping Tar Pit",
                "colors": [],
                "gatherer_ids": [
                    "177520"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Creakwood Liege",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "157406"
                ],
                "mana_cost": "{1}{B/G}{B/G}{B/G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Countryside Crusher",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "152980"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Counterspell",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4693",
                    "20382",
                    "14511",
                    "21127",
                    "699",
                    "185820",
                    "1196",
                    "102",
                    "3898",
                    "26644",
                    "397",
                    "11214",
                    "19570",
                    "184687",
                    "25503",
                    "2148",
                    "202437",
                    "2500"
                ],
                "mana_cost": "{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Corpse Dance",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4644"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Control Magic",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "2147",
                    "697",
                    "1194",
                    "202411",
                    "395",
                    "100",
                    "21141"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Consuming Vapors",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "205936"
                ],
                "mana_cost": "{3}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Consecrated Sphinx",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "214063"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Condemn",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "130528",
                    "107494",
                    "205098"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Compulsive Research",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "87991"
                ],
                "mana_cost": "{2}{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Coldsteel Heart",
                "colors": [],
                "gatherer_ids": [
                    "121123"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Snow",
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Cold-Eyed Selkie",
                "colors": [
                    "Blue",
                    "Green"
                ],
                "gatherer_ids": [
                    "153471"
                ],
                "mana_cost": "{1}{G/U}{G/U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Coalition Relic",
                "colors": [],
                "gatherer_ids": [
                    "209158",
                    "125878"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Cloudthresher",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "146173"
                ],
                "mana_cost": "{2}{G}{G}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Cloudgoat Ranger",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "139664"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Clifftop Retreat",
                "colors": [],
                "gatherer_ids": [
                    "241980"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "City of Traitors",
                "colors": [],
                "gatherer_ids": [
                    "6168"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Chrome Mox",
                "colors": [],
                "gatherer_ids": [
                    "47446"
                ],
                "mana_cost": "{0}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Char",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "87942"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Chaos Warp",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "236466",
                    "338441"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Channel",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "741",
                    "144",
                    "1237",
                    "202596",
                    "2203",
                    "439",
                    "194967"
                ],
                "mana_cost": "{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Chandra's Phoenix",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220298"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Chandra, the Firebrand",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "220146",
                    "259205"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Chandra Nalaar",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "140176",
                    "185815",
                    "205958",
                    "191242"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Chameleon Colossus",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "220451",
                    "153450"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Chain Lightning",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "1563",
                    "201126",
                    "217977"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Celestial Purge",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "191595",
                    "208290",
                    "183055",
                    "220195"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue",
                            "White"
                        ]
                    }
                },
                "name": "Celestial Colonnade",
                "colors": [],
                "gatherer_ids": [
                    "177545"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Catastrophe",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "5637",
                    "21143"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Cataclysm",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "6050"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Careful Consideration",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "109691"
                ],
                "mana_cost": "{2}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Capsize",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "4691"
                ],
                "mana_cost": "{1}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Call the Skybreaker",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "157400",
                    "247202"
                ],
                "mana_cost": "{5}{U/R}{U/R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Sorcery",
                            "Creature"
                        ]
                    }
                },
                "name": "Call of the Herd",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "29786",
                    "109672"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Calciderm",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "122360"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Cabal Coffers",
                "colors": [],
                "gatherer_ids": [
                    "29896",
                    "205421"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Burrenton Forge-Tender",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "139395"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Burning of Xinye",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "10637",
                    "201274"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Buried Alive",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "247342",
                    "4451",
                    "29846",
                    "270455"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Broodmate Dragon",
                "colors": [
                    "Black",
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "178101"
                ],
                "mana_cost": "{3}{B}{R}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Brooding Saurian",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "122055"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Brine Elemental",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "189245",
                    "118895"
                ],
                "mana_cost": "{4}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Brimstone Volley",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "233253"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Breeding Pool",
                "colors": [],
                "gatherer_ids": [
                    "97088"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Brainstorm",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "292751",
                    "27246",
                    "247331",
                    "184606",
                    "2497",
                    "19571",
                    "3897"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Brain Freeze",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "47599"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Braids, Cabal Minion",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "29947"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Bonfire of the Damned",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "271095"
                ],
                "mana_cost": "{X}{X}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Bone Shredder",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "12400",
                    "209123"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Boggart Ram-Gang",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "153970",
                    "234723"
                ],
                "mana_cost": "{R/G}{R/G}{R/G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Bogardan Hellkite",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "191340",
                    "111041",
                    "178017",
                    "243464"
                ],
                "mana_cost": "{6}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Blue Elemental Blast",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "694",
                    "2146",
                    "1191",
                    "202520",
                    "392",
                    "97"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Bloodstained Mire",
                "colors": [],
                "gatherer_ids": [
                    "39505"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Bloodgift Demon",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "226885"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Bloodghast",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "192230"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Bloodbraid Elf",
                "colors": [
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "271167",
                    "185053"
                ],
                "mana_cost": "{2}{R}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Blood Knight",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "130715"
                ],
                "mana_cost": "{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Blood Crypt",
                "colors": [],
                "gatherer_ids": [
                    "97102",
                    "253683"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Blistering Firecat",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "39737"
                ],
                "mana_cost": "{1}{R}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Blastoderm",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "21363",
                    "201831"
                ],
                "mana_cost": "{2}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Blade Splicer",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "233068"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Black Vise",
                "colors": [],
                "gatherer_ids": [
                    "1097",
                    "601",
                    "4",
                    "2022",
                    "299",
                    "201239",
                    "212636"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Black Knight",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "3826",
                    "2088",
                    "1145",
                    "190540",
                    "221568",
                    "50",
                    "345",
                    "205218",
                    "647",
                    "159817"
                ],
                "mana_cost": "{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Bituminous Blast",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "220518",
                    "271166",
                    "185057"
                ],
                "mana_cost": "{3}{B}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Tribal",
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Bitterblossom",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "152648"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Tribal",
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    },
                    "activated_ability_costs_affect_color_do_not_pay_phyrexian": {
                        "colors": [
                            "Green"
                        ]
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [
                            "Green"
                        ],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    }
                },
                "name": "Birthing Pod",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "218006"
                ],
                "mana_cost": "{3}{G/P}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Birds of Paradise",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "11173",
                    "2201",
                    "1236",
                    "142",
                    "45439",
                    "207334",
                    "221896",
                    "129906",
                    "3963",
                    "437",
                    "739",
                    "14719",
                    "83688",
                    "191080"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Beast Within",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "221533",
                    "275255"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Beacon of Destruction",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "51612",
                    "135262"
                ],
                "mana_cost": "{3}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": null,
                "name": "Bayou",
                "colors": [],
                "gatherer_ids": [
                    "201400",
                    "202604",
                    "879",
                    "577",
                    "1377",
                    "280"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "living_weapon_means_creature": {
                        "types": [
                            "Artifact",
                            "Creature"
                        ]
                    }
                },
                "name": "Batterskull",
                "colors": [],
                "gatherer_ids": [
                    "233055"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Basilisk Collar",
                "colors": [],
                "gatherer_ids": [
                    "198356"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Basalt Monolith",
                "colors": [],
                "gatherer_ids": [
                    "599",
                    "297",
                    "1096",
                    "2",
                    "202565"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Scroll Rack",
                "colors": [],
                "gatherer_ids": [
                    "4628",
                    "338458"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Scorned Villager",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "262694"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Scavenging Ooze",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "233181"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Scalding Tarn",
                "colors": [],
                "gatherer_ids": [
                    "190393"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": null,
                "name": "Savannah Lions",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "221577",
                    "83246",
                    "565",
                    "867",
                    "45207",
                    "269",
                    "2363",
                    "1365"
                ],
                "mana_cost": "{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": null,
                "name": "Savannah",
                "colors": [],
                "gatherer_ids": [
                    "579",
                    "184749",
                    "881",
                    "202571",
                    "1379",
                    "282"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Sarkhan the Mad",
                "colors": [
                    "Black",
                    "Red"
                ],
                "gatherer_ids": [
                    "193659"
                ],
                "mana_cost": "{3}{B}{R}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Sarcomancy",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "4683"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Sakura-Tribe Elder",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "247176",
                    "220582",
                    "50510"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Sacred Foundry",
                "colors": [],
                "gatherer_ids": [
                    "89066"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Ruhan of the Fomori",
                "colors": [
                    "Blue",
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "236477"
                ],
                "mana_cost": "{1}{R}{W}{U}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Rude Awakening",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "73587",
                    "202281"
                ],
                "mana_cost": "{4}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Rout",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "22971"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Rorix Bladewing",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "205371",
                    "39859"
                ],
                "mana_cost": "{3}{R}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Rootbound Crag",
                "colors": [],
                "gatherer_ids": [
                    "221922",
                    "249735",
                    "205114",
                    "208042",
                    "191057"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Rolling Earthquake",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "10526",
                    "201293"
                ],
                "mana_cost": "{X}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Rofellos, Llanowar Emissary",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "15237"
                ],
                "mana_cost": "{G}{G}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Rite of Ruin",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "240126"
                ],
                "mana_cost": "{5}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Rishadan Port",
                "colors": [],
                "gatherer_ids": [
                    "19767"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{1}{U}",
                        "converted_mana_cost": 2
                    }
                },
                "name": "Riftwing Cloudskate",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "189249",
                    "109715"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{R}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Rift Bolt",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "108915"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Rhox War Monk",
                "colors": [
                    "Blue",
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "174957"
                ],
                "mana_cost": "{G}{W}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Reveillark",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "152716"
                ],
                "mana_cost": "{4}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Restoration Angel",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "240096"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Restock",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "23145"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Repeal",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "96827"
                ],
                "mana_cost": "{X}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {
                    "use_cycling_cost_as_mana_cost_for_triggered_abilities": {
                        "mana_cost": "{1}{W}",
                        "converted_mana_cost": 2
                    }
                },
                "name": "Renewed Faith",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "41153"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Remand",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "87919"
                ],
                "mana_cost": "{1}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Relic of Progenitus",
                "colors": [],
                "gatherer_ids": [
                    "205326",
                    "174824"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Regrowth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "465",
                    "1263",
                    "170",
                    "767",
                    "202461"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Red Elemental Blast",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "217",
                    "1312",
                    "2301",
                    "202447",
                    "512",
                    "814"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Recurring Nightmare",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "6103"
                ],
                "mana_cost": "{2}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Reckless Charge",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "31450",
                    "205365"
                ],
                "mana_cost": "{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Reanimate",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "270452",
                    "21160",
                    "220576",
                    "4680"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Realm Razer",
                "colors": [
                    "White",
                    "Green",
                    "Red"
                ],
                "gatherer_ids": [
                    "179422"
                ],
                "mana_cost": "{3}{R}{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Razormane Masticore",
                "colors": [],
                "gatherer_ids": [
                    "106552",
                    "222707",
                    "50155"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "White",
                            "Green"
                        ]
                    }
                },
                "name": "Ray of Revelation",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "34199",
                    "245288"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Ravenous Baboons",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "5207"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ravages of War",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "10500",
                    "184724"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ratchet Bomb",
                "colors": [],
                "gatherer_ids": [
                    "205482"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Ranger of Eos",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "174823"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Rancor",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "253686",
                    "275266",
                    "12433",
                    "220577",
                    "201838"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Rampant Growth",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "205350",
                    "83221",
                    "45417",
                    "189887",
                    "27259",
                    "11501",
                    "4779",
                    "233231",
                    "3404",
                    "12966",
                    "129690"
                ],
                "mana_cost": "{1}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Green",
                            "Red"
                        ]
                    }
                },
                "name": "Raging Ravine",
                "colors": [],
                "gatherer_ids": [
                    "177583"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Qasali Pridemage",
                "colors": [
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "179556",
                    "249405"
                ],
                "mana_cost": "{G}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Pyrokinesis",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "3180",
                    "184763"
                ],
                "mana_cost": "{4}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Pyroclasm",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "129801",
                    "2650",
                    "25677",
                    "208009",
                    "194425",
                    "4354",
                    "83216",
                    "45374"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Putrid Leech",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "179612",
                    "338388"
                ],
                "mana_cost": "{B}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Putrid Imp",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "270459",
                    "34470"
                ],
                "mana_cost": "{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Putrefy",
                "colors": [
                    "Black",
                    "Green"
                ],
                "gatherer_ids": [
                    "89063",
                    "292956"
                ],
                "mana_cost": "{1}{B}{G}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Puppeteer Clique",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "146761"
                ],
                "mana_cost": "{3}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Pulse of the Forge",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "39410"
                ],
                "mana_cost": "{1}{R}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Pulse of the Fields",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "39697"
                ],
                "mana_cost": "{1}{W}{W}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Psychatog",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "31825"
                ],
                "mana_cost": "{1}{U}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Prophetic Bolt",
                "colors": [
                    "Blue",
                    "Red"
                ],
                "gatherer_ids": [
                    "27187",
                    "338392",
                    "247162"
                ],
                "mana_cost": "{3}{U}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Profane Command",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "205397",
                    "259275",
                    "141814"
                ],
                "mana_cost": "{X}{B}{B}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Pristine Talisman",
                "colors": [],
                "gatherer_ids": [
                    "233074"
                ],
                "mana_cost": "{3}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Prismatic Lens",
                "colors": [],
                "gatherer_ids": [
                    "118880"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Primordial Hydra",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "253670",
                    "220172"
                ],
                "mana_cost": "{X}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Primeval Titan",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "241832",
                    "205027"
                ],
                "mana_cost": "{4}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Primal Command",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "141824",
                    "220571"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Priest of Urabrask",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "218037"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Price of Progress",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "234714",
                    "6123"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Prey Upon",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "220383",
                    "271366"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Preordain",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "265979",
                    "205019"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Precursor Golem",
                "colors": [],
                "gatherer_ids": [
                    "206348"
                ],
                "mana_cost": "{5}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Power Sink",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "2527",
                    "1216",
                    "415",
                    "717",
                    "4716",
                    "3932",
                    "120",
                    "3354",
                    "2176",
                    "16435",
                    "26658",
                    "5757"
                ],
                "mana_cost": "{X}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Powder Keg",
                "colors": [],
                "gatherer_ids": [
                    "15259"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{2}",
                        "converted_mana_cost": 2
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [],
                        "mana_cost": "{2}",
                        "converted_mana_cost": 2
                    }
                },
                "name": "Porcelain Legionnaire",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "218043"
                ],
                "mana_cost": "{2}{W/P}",
                "types": [
                    "Artifact",
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Ponder",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "190159",
                    "139512",
                    "244313"
                ],
                "mana_cost": "{U}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Polluted Delta",
                "colors": [],
                "gatherer_ids": [
                    "39504"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Red"
                        ]
                    }
                },
                "name": "Barbarian Ring",
                "colors": [],
                "gatherer_ids": [
                    "234737",
                    "29906"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Bant Charm",
                "colors": [
                    "Blue",
                    "White",
                    "Green"
                ],
                "gatherer_ids": [
                    "137931"
                ],
                "mana_cost": "{G}{W}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Baneslayer Angel",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "191065",
                    "205077"
                ],
                "mana_cost": "{3}{W}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Bane of the Living",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "44493"
                ],
                "mana_cost": "{2}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ball Lightning",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "26620",
                    "1783",
                    "4031",
                    "234722",
                    "2259",
                    "159139",
                    "191393"
                ],
                "mana_cost": "{R}{R}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Balance",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "2321",
                    "831",
                    "1329",
                    "234",
                    "194966",
                    "202501",
                    "529"
                ],
                "mana_cost": "{1}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": null,
                "name": "Badlands",
                "colors": [],
                "gatherer_ids": [
                    "202626",
                    "878",
                    "576",
                    "1376",
                    "279",
                    "184748"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "token_spells_are_creatures": {
                        "types": [
                            "Enchantment",
                            "Creature"
                        ]
                    }
                },
                "name": "Awakening Zone",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "271156",
                    "193507",
                    "247393"
                ],
                "mana_cost": "{2}{G}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Avenger of Zendikar",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "201570"
                ],
                "mana_cost": "{5}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Aven Mindcensor",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "136204"
                ],
                "mana_cost": "{2}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Avalanche Riders",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "12418",
                    "108835"
                ],
                "mana_cost": "{3}{R}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Avacyn's Pilgrim",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "243212"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Avacyn, Angel of Hope",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "239961"
                ],
                "mana_cost": "{5}{W}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Augury Adept",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "147407"
                ],
                "mana_cost": "{1}{W/U}{W/U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Armageddon",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "228262",
                    "830",
                    "2320",
                    "14500",
                    "1328",
                    "159252",
                    "6520",
                    "20387",
                    "4104",
                    "4373",
                    "528",
                    "233"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Arid Mesa",
                "colors": [],
                "gatherer_ids": [
                    "177584"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Arc Trail",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "275254",
                    "206343"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Arc Lightning",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "21102",
                    "5733",
                    "205386"
                ],
                "mana_cost": "{2}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 3
            },
            {
                "heuristics": {},
                "name": "Arbor Elf",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "197959",
                    "249840"
                ],
                "mana_cost": "{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Ankh of Mishra",
                "colors": [],
                "gatherer_ids": [
                    "3760",
                    "1094",
                    "14771",
                    "598",
                    "1",
                    "159251",
                    "296",
                    "2017"
                ],
                "mana_cost": "{2}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Animate Dead",
                "colors": [
                    "Black"
                ],
                "gatherer_ids": [
                    "1143",
                    "3823",
                    "265167",
                    "48",
                    "2085",
                    "645",
                    "343",
                    "159249"
                ],
                "mana_cost": "{1}{B}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Angelic Destiny",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "220230"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Enchantment"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Angel of Despair",
                "colors": [
                    "White",
                    "Black"
                ],
                "gatherer_ids": [
                    "83869",
                    "247275"
                ],
                "mana_cost": "{3}{W}{W}{B}{B}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Ancient Tomb",
                "colors": [],
                "gatherer_ids": [
                    "4636",
                    "288994"
                ],
                "mana_cost": null,
                "types": [
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {
                    "off_color_flashback_is_gold": {
                        "colors": [
                            "Green",
                            "Red"
                        ]
                    }
                },
                "name": "Ancient Grudge",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "235600",
                    "109751"
                ],
                "mana_cost": "{1}{R}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {
                    "suspend_as_cmc": {
                        "mana_cost": "{U}",
                        "converted_mana_cost": 1
                    }
                },
                "name": "Ancestral Vision",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "113505",
                    "189244"
                ],
                "mana_cost": null,
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "All Suns' Dawn",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "51221"
                ],
                "mana_cost": "{4}{G}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "All Is Dust",
                "colors": [],
                "gatherer_ids": [
                    "193658"
                ],
                "mana_cost": "{7}",
                "types": [
                    "Tribal",
                    "Sorcery"
                ],
                "converted_mana_cost": 7
            },
            {
                "heuristics": {},
                "name": "Akroma's Vengeance",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "41168",
                    "205366",
                    "247343"
                ],
                "mana_cost": "{4}{W}{W}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 6
            },
            {
                "heuristics": {},
                "name": "Akroma, Angel of Wrath",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "193871",
                    "42049",
                    "106645"
                ],
                "mana_cost": "{5}{W}{W}{W}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Akroma, Angel of Fury",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "247358",
                    "122432"
                ],
                "mana_cost": "{5}{R}{R}{R}",
                "types": [
                    "Legendary",
                    "Creature"
                ],
                "converted_mana_cost": 8
            },
            {
                "heuristics": {},
                "name": "Ajani Vengeant",
                "colors": [
                    "White",
                    "Red"
                ],
                "gatherer_ids": [
                    "174852",
                    "266299"
                ],
                "mana_cost": "{2}{R}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Ajani Goldmane",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "140233",
                    "205957",
                    "191239"
                ],
                "mana_cost": "{2}{W}{W}",
                "types": [
                    "Planeswalker"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Agony Warp",
                "colors": [
                    "Blue",
                    "Black"
                ],
                "gatherer_ids": [
                    "175052",
                    "220454"
                ],
                "mana_cost": "{U}{B}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 2
            },
            {
                "heuristics": {},
                "name": "Aftershock",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "4800"
                ],
                "mana_cost": "{2}{R}{R}",
                "types": [
                    "Sorcery"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "\u00c6ther Vial",
                "colors": [],
                "gatherer_ids": [
                    "212630",
                    "48146"
                ],
                "mana_cost": "{1}",
                "types": [
                    "Artifact"
                ],
                "converted_mana_cost": 1
            },
            {
                "heuristics": {},
                "name": "Aeon Chronicler",
                "colors": [
                    "Blue"
                ],
                "gatherer_ids": [
                    "122449"
                ],
                "mana_cost": "{3}{U}{U}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "phyrexian_always_pays_life": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    },
                    "phyrexian_always_pays_life_except_for_abilities": {
                        "colors": [],
                        "mana_cost": "{3}",
                        "converted_mana_cost": 3
                    }
                },
                "name": "Act of Aggression",
                "colors": [
                    "Red"
                ],
                "gatherer_ids": [
                    "230076"
                ],
                "mana_cost": "{3}{R/P}{R/P}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {},
                "name": "Acidic Slime",
                "colors": [
                    "Green"
                ],
                "gatherer_ids": [
                    "207333",
                    "247317",
                    "265718",
                    "189880",
                    "226906"
                ],
                "mana_cost": "{3}{G}{G}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 5
            },
            {
                "heuristics": {
                    "activated_ability_costs_affect_color": {
                        "colors": [
                            "Blue"
                        ]
                    }
                },
                "name": "Academy Ruins",
                "colors": [],
                "gatherer_ids": [
                    "116725"
                ],
                "mana_cost": null,
                "types": [
                    "Legendary",
                    "Land"
                ],
                "converted_mana_cost": 0
            },
            {
                "heuristics": {},
                "name": "Academy Rector",
                "colors": [
                    "White"
                ],
                "gatherer_ids": [
                    "15138"
                ],
                "mana_cost": "{3}{W}",
                "types": [
                    "Creature"
                ],
                "converted_mana_cost": 4
            },
            {
                "heuristics": {},
                "name": "Absorb",
                "colors": [
                    "Blue",
                    "White"
                ],
                "gatherer_ids": [
                    "23155"
                ],
                "mana_cost": "{W}{U}{U}",
                "types": [
                    "Instant"
                ],
                "converted_mana_cost": 3
            }
        ];
        var diffedCube = CubeDiffService.getDiff($scope.before, $scope.after, spec);
        var tabs = [];
        angular.forEach(diffedCube, function(category) {
            tabs.push(category.category);
        });

        $scope.diffedCube = diffedCube;
        $scope.tabs = tabs;

    };
}
