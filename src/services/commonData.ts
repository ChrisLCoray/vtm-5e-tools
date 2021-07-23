/**
 * Commonly used and default data, e.g. clan names
 */

import { Character, Chronicle, Clan, ClanIds, Discipline, DisciplineIds, Predator, PredatorIds, SourceBookIds, Resonance, User } from '../project.interface';

// Summary Sheet pages 152-153

const sources = {
    amz: "Amazon",
    dtr: "Drive Thru RPG",
    rgs: "Renegade Game Studios",
    wod: "World of Darkness"
};

export const SourceBooks: any = {
    VtM5eAnarch: {
        abbr: "VtM5e Anarch",
        id: SourceBookIds.Anarch,
        name: "Vampire the Masquerade 5e Anarch Sourcebook",
        links: [
            { edition: "New", source: sources.rgs, url: "https://renegadegamestudios.com/vampire-the-masquerade-anarch-sourcebook/" },
            { edition: "Original", source: sources.amz, url: "https://smile.amazon.com/Vampire-Masquerade-Anarch-Modiphius/dp/1912200996/" },
            { edition: "PDF", source: sources.dtr, url: "https://www.drivethrurpg.com/product/256793/Anarch-Vampire-the-Masquerade-5th-Edition" },
        ]
    },
    VtM5eCamarilla: {
        abbr: "VtM5e Camarilla",
        id: SourceBookIds.Camarilla,
        name: "Vampire the Masquerade 5e Camarilla Sourcebook",
        links: [
            { edition: "New", source: sources.rgs, url: "" },
            { edition: "Original", source: sources.amz, url: "https://smile.amazon.com/Vampire-Masquerade-Camarilla-Modiphius/dp/1912200988/" },
            { edition: "PDF", source: sources.dtr, url: "https://www.drivethrurpg.com/product/256792/Camarilla-Vampire-the-Masquerade-5th-Edition" },
        ]
    },
    VtM5eCBN: {
        abbr: "VtM5e Chicago By Night",
        id: SourceBookIds.CBN,
        name: "Vampire the Masquerade 5e Chicago By Night",
        links: [
            { edition: "Original", source: sources.amz, url: "https://smile.amazon.com/Modiphius-Entertainment-Vampire-Masquerade-Chicago/dp/B07ZBV1LB6/" },
            { edition: "PDF", source: sources.dtr, url: "https://www.drivethrurpg.com/product/283858/Chicago-By-Night-Vampire-the-Masquerade-5th-Edition" },
        ]
    },
    VtM5eComp: {
        abbr: "VtM5e Companion",
        id: SourceBookIds.Companion,
        name: "Vampire the Masquerade 5e Companion (Free PDF)",
        links: [
            { edition: "PDF", source: sources.wod, url: "https://www.worldofdarkness.com/news/v5-companion-is-available-to-download-now" },
        ]
    },
    VtM5eCb: {
        abbr: "VtM5e Core",
        id: SourceBookIds.Corebook,
        name: "Vampire the Masquerade 5e Corebook",
        links: [
            { edition: "New", source: sources.rgs, url: "https://renegadegamestudios.com/vampire-the-masquerade-5th-ed-core-rulebook/" },
            { edition: "Original", source: sources.amz, url: "https://smile.amazon.com/gp/product/1912200929/" },
            { edition: "PDF", source: sources.dtr, url: "https://www.drivethrurpg.com/product/256795/Vampire-the-Masquerade-5th-Edition" },
        ]
    },
    VtM5eCBGs: {
        abbr: "VtM5e Cults of the Blood Gods",
        id: SourceBookIds.CultBGs,
        name: "Vampire the Masquerade 5e Cults of the Blood Gods",
        links: [
            { edition: "PDF", source: sources.dtr, url: "https://www.drivethrurpg.com/product/336233/Cults-of-the-Blood-Gods-Vampire-the-Masquerade-5th-Edition" },
        ]
    },
    // Template
    // VtM5e: {
    //     abbr: "VtM5e ",
    //     id: SourceBookIds.,
    //     name: "Vampire the Masquerade 5e ",
    //     links: [
    //         { edition: "", source: sources., url: "" },
    //         { edition: "", source: sources., url: "" },
    //     ]
    // },
};

export const clans: Clan[] = [
    // { id: , name: "", archetypes: [], bane: { name: "", page:  }, disciplines: [], page: -1, source: "" },
    { id: ClanIds.BanuHaqim, name: "Banu Haqim", archetypes: [], disciplines: [], page: -1, source: SourceBookIds.Camarilla },
    {
        id: ClanIds.Brujah, name: "Brujah", archetypes: [
            { name: "Blood Worshipper", page: 67 },
            { name: "Cancer in the System", page: 65 },
            { name: "Trolling Punk", page: 67 },
            { name: "Voice of the People", page: 67 }
        ],
        bane: { name: "Rage", page: 67 }, disciplines: [DisciplineIds.Celerity, DisciplineIds.Potence, DisciplineIds.Presence], page: 65,
        source: SourceBookIds.Corebook
    },
    {
        id: ClanIds.Caitiff, name: "Caitiff", archetypes: [
            { name: "Abuse Survivor", page: 106 },
            { name: "Helplessly Overestimated", page: 107 },
            { name: "Raised on the Street", page: 106 },
            { name: "Secret Caitiff", page: 107 },
            { name: "Unwanted Childe", page: 107 },
        ],
        bane: { name: "Suspect", page: 107 }, disciplines: [], page: 105, source: SourceBookIds.Corebook
    },
    {
        id: ClanIds.Gangrel, name: "Gangrel", archetypes: [
            { name: "Adventurer", page: 70 },
            { name: "Director of the Board", page: 70 },
            { name: "Folk Favorite", page: 70 },
            { name: "Uncaged Jailbird", page: 70 }
        ],
        bane: { name: "Animal Feature", page: 73 }, disciplines: [DisciplineIds.Animalism, DisciplineIds.Fortitude, DisciplineIds.Protean], page: 69,
        source: SourceBookIds.Corebook
    },
    { id: ClanIds.Hecata, name: "Hecata", archetypes: [], disciplines: [], page: -1, source: SourceBookIds.CultBGs },
    { id: ClanIds.Lasombra, name: "Lasombra", archetypes: [], disciplines: [], page: -1, source: SourceBookIds.CBN },
    {
        id: ClanIds.Malkavian, name: "Malkavian", archetypes: [
            { name: "Bad Analyist", page: 78 },
            { name: "Fanatic", page: 79 },
            { name: "Influencing Presence", page: 76 },
            { name: "Medium", page: 76 },
            { name: "Pure Blood Addict", page: 79 },
        ],
        bane: { name: "Mental Derangement", page: 79 }, disciplines: [DisciplineIds.Auspex, DisciplineIds.Dominate, DisciplineIds.Obfuscate], page: 75,
        source: SourceBookIds.Corebook
    },
    { id: ClanIds.Ministry, name: "Ministry", archetypes: [], disciplines: [], page: -1, source: SourceBookIds.Anarch },
    {
        id: ClanIds.Nosferatu, name: "Nosferatu", archetypes: [
            { name: "Domain Gumshoe", page: 84 },
            { name: "Hunter of Monsters", page: 84 },
            { name: "Information Hub", page: 84 },
            { name: "More Animal Than Man", page: 84 },
            { name: "Rat", page: 84 },
        ],
        bane: { name: "Repulsive", page: 85 }, disciplines: [DisciplineIds.Animalism, DisciplineIds.Obfuscate, DisciplineIds.Potence], page: 81,
        source: SourceBookIds.Corebook
    },
    {
        id: ClanIds.Ravnos, name: "Ravnos", archetypes: [
            { name: "Antiquarian", page: 10 },
            { name: "Midnight Motorcycle Courier", page: 9 },
            { name: "Operative for Hire", page: 10 },
            { name: "Travel Agent", page: 10 },
        ],
        bane: { name: "Doomed", page: 9 }, compulsion: { name: "Tempting Fate", page: 9 },
        disciplines: [DisciplineIds.Animalism, DisciplineIds.Obfuscate, DisciplineIds.Presence], page: 6, source: SourceBookIds.Companion
    },
    {
        id: ClanIds.Salubri, name: "Salubri", archetypes: [], bane: { name: "Delicious Vitae", page: 15 },
        compulsion: { name: "Affective Empathy", page: 15 },
        disciplines: [DisciplineIds.Auspex, DisciplineIds.Dominate, DisciplineIds.Fortitude], page: 12, source: SourceBookIds.Companion
    },
    {
        id: ClanIds.ThinBlood, name: "Thin-Blood", archetypes: [
            { name: "Guilty Embrace", page: 111 },
            { name: "Live One", page: 110 },
            { name: "Natural Vampire", page: 111 },
            { name: "Redemption Seeker", page: 111 },
            { name: "Weapon of Convenience", page: 111 },
        ],
        bane: { name: "Thin-Blooded", page: 111 }, disciplines: [DisciplineIds.TBAlchemy], page: 109, source: SourceBookIds.Corebook
    },
    {
        id: ClanIds.Toreador, name: "Toreador", archetypes: [
            { name: "Gadabout", page: 88 },
            { name: "L'Artiste", page: 88 },
            { name: "Patron of the Arts", page: 88 },
            { name: "Stage Manager", page: 88 },
            { name: "Thespian Spy", page: 88 },
        ],
        bane: { name: "Beauty-Obsessed", page: 91 }, disciplines: [DisciplineIds.Auspex, DisciplineIds.Celerity, DisciplineIds.Presence], page: 87,
        source: SourceBookIds.Corebook
    },
    {
        id: ClanIds.Tremere, name: "Tremere", archetypes: [
            { name: "Ambitious Outsider", page: 97 },
            { name: "Eternal Scholar", page: 95 },
            { name: "Chief of Security", page: 97 },
            { name: "Pagan Nonconformist", page: 97 },
            { name: "Pyramid Loyalist", page: 95 },
        ],
        bane: { name: "No Blood Bonds", page: 97 }, disciplines: [DisciplineIds.Auspex, DisciplineIds.BloodSorcery, DisciplineIds.Dominate], page: 93,
        source: SourceBookIds.Corebook
    },
    {
        id: ClanIds.Tzimisce, name: "Tzimisce", archetypes: [
            { name: "Gang Leader", page: 20 },
            { name: "Grudgebearer", page: 20 },
            { name: "Landlord", page: 19 },
            { name: "Special Forces Commander", page: 20 },

        ],
        bane: { name: "Grounded", page: 18 }, compulsion: { name: "Covetousness", page: 19 },
        disciplines: [DisciplineIds.Animalism, DisciplineIds.Dominate, DisciplineIds.Protean], page: 16, source: SourceBookIds.Companion
    },
    {
        id: ClanIds.Ventrue, name: "Ventrue", archetypes: [
            { name: "Cold-Blooded Corporate Director", page: 101 },
            { name: "Conservative Politician", page: 101 },
            { name: "Godfather", page: 102 },
            { name: "High Priest", page: 102 },
            { name: "Member of the Order", page: 101 },
        ],
        bane: { name: "Picky Drinker", page: 102 }, disciplines: [DisciplineIds.Dominate, DisciplineIds.Fortitude, DisciplineIds.Presence], page: 99,
        source: SourceBookIds.Corebook
    },
    { id: -1, name: "Clan", archetypes: [], bane: { name: "", page: -1 }, disciplines: [], page: -1, source: -1 },
];

export const factions: string[] = ["Anarch", "Camarilla", "Sabbat", "Unaffiliated"];

export const predatorTypes: Predator[] = [
    {
        id: PredatorIds.Alleycat, description: "Combative Assault Feeder", modifiers: {
            specialty: ["brawl", "intimidation"],
            discipline: [{ d: "celerity", amount: 1, }, { d: "potence", amount: 1 }],
            humanity: -1,
            other: [{ o: "criminal contacts", amount: 3}]
    }, name: "Alleycat", page: 175, source: SourceBookIds.Corebook },
    { id: PredatorIds.Bagger, description: "Steal, buy, or obtain cold blood", name: "Bagger", page: 176, source: SourceBookIds.Corebook },
    { id: PredatorIds.BloodLeach, description: "You drink from other vampires", name: "Blood Leach", page: 176, source: SourceBookIds.Corebook },
    { id: PredatorIds.Cleaver, description: "You feed from family or other known group of mortals", name: "Cleaver", page: 176, source: SourceBookIds.Corebook },
    { id: PredatorIds.Consensualist, description: "You get permission to feed", name: "Consensualist", page: 177, source: SourceBookIds.Corebook },
    { id: PredatorIds.Farmer, description: "You only feed from animals", name: "Farmer", page: 177, source: SourceBookIds.Corebook },
    { id: PredatorIds.Osiris, description: "You have some fame to mortals and feed from fans", name: "Osiris", page: 177, source: SourceBookIds.Corebook },
    { id: PredatorIds.Sandman, description: "You feed from sleeping victims using stealth", name: "Sandman", page: 177, source: SourceBookIds.Corebook },
    { id: PredatorIds.SceneQueen, description: "You pose as a member of a subculture and feed from other subculture members", name: "Scene Queen", page: 178, source: SourceBookIds.Corebook },
    { id: PredatorIds.Siren, description: "You feed during sex", name: "Siren", page: 178, source: SourceBookIds.Corebook },
];

export const blankPredator: Predator = { id: -1, description: "", modifiers: {}, name: "", page: -1, source: -1 };

export const blankCharacter: Character = {
    id: 0, user: 0, name: "", chronicle: 0, image: "", sire: "", concept: "",
    ambition: "", desire: "", predator: -1, clan: -1, generation: "", sect: "",
    attributes: {
        physical: {
            strength: 0, dexterity: 0, stamina: 0
        },
        social: {
            charisma: 0, manipulation: 0, composure: 0
        },
        mental: {
            intelligence: 0, wits: 0, resolve: 0
        }
    },
    health: 0, willpower: 0,
    skills: {
        athletics: 0, animalKen: 0, academics: 0,
        brawl: 0, etiquette: 0, awareness: 0,
        craft: 0, insight: 0, finance: 0,
        drive: 0, intimidation: 0, investigation: 0,
        firearms: 0, leadership: 0, medicine: 0,
        larceny: 0, performance: 0, occult: 0,
        melee: 0, persuasion: 0, politics: 0,
        stealth: 0, streetwise: 0, science: 0,
        survival: 0, subterfuge: 0, technology: 0
    },
    disciplines: [{ id: -1, value: 0, powers: [] }],
    resonance: 0, hunger: 0, humanity: 0,
    chronicleTenents: [], touchStonesConvictions: [], clanBane: '', compulsion: '',
    advantages: [{ id: 0, name: "", state: 0 }],
    flaws: [{ id: 0, name: "", state: 0 }],
    bloodPotency: 0, bloodSurge: 0, mendAmount: 0, powerBonus: 0,
    rouseReroll: 0, feedingPenalty: 0, baneSeverity: 0,
    totalXp: 0, spentXp: 0, trueAge: "", apparentAge: "",
    dob: "", dod: "", appearance: "", distinguishingFeatures: "",
    history: "", notes: ""
};

export const blankChronicle: Chronicle = { id: -1, name: "" };
export const blankClan: Clan = { id: -1, name: "No Clan Set", archetypes: [], bane: { name: "", page: -1 }, disciplines: [], page: -1, source: -1 };
export const blankUser: User = { id: 0, name: "", characters: [], chronicles: [] };

// { name: "", cost: { rouse: 1 }, optionCost: { willpower: 1 }, page: , pools: ["",""], source: SourceBookIds.Corebook, vs: ["",""] },
export const disciplines: Discipline[] = [
    {
        id: DisciplineIds.Animalism, name: "Animalism",
        levels: [
            [
                { name: "Bond Famulus", page: 245, pools: ["mental-resolve", "discipline-animalism"], source: SourceBookIds.Corebook },
                { name: "Sense the Beast", page: 245, pools: ["mental-resolve", "discipline-animalism"], vs: ["social-composure", "skill-subterfuge"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Feral Whispers", optionCost: { rouse: 1 }, page: 245, pools: [["social-manipulation", "discipline-animalism"], ["social-charisma", "discipline-animalism"]], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Animal Succulence", page: 246, source: SourceBookIds.Corebook },
                { name: "Quell the Beast", cost: { rouse: 1 }, page: 246, pools: ["social-charisma", "discipline-animalism"], vs: ["physical-stamina", "mental-resolve"], source: SourceBookIds.Corebook },
                { name: "Unliving Hive", amalgam: { name: "obfuscate", level: 2 }, page: 246, pools: [], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Subsume the Spirit", optionCost: { rouse: 1 }, page: 247, pools: ["social-manipulation", "discipline-animalism"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Animal Dominion", cost: { rouse: 2 }, page: 247, pools: ["social-charisma", "discipline-animalism"], source: SourceBookIds.Corebook },
                { name: "Drawing Out the Beast", cost: { rouse: 1 }, page: 247, pools: ["mental-wits", "discipline-animalism"], vs: ["social-composure", "mental-resolve"], source: SourceBookIds.Corebook },
            ]
        ],
        value: 0
    },
    {
        id: DisciplineIds.Auspex, name: "Auspex",
        levels: [
            [
                { name: "Heightened Senses", page: 249, pools: ["mental-wits", "mental-resolve"], source: SourceBookIds.Corebook },
                { name: "Sense the Unseen", page: 249, pools: [["mental-wits", "discipline-auspex"], ["mental-resolve", "discipline-auspex"]], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Premonition", optionCost: { rouse: 1 }, page: 249, pools: ["mental-resolve", "discipline-auspex"], source: SourceBookIds.Corebook },
                {
                    name: "Obeah", amalgam: { name: "fortitude", level: 1 }, optionCost: { willpower: -1 }, page: 24, pools: ["social-composure", "discipline-auspex"],
                    source: SourceBookIds.Companion
                },
            ],
            [
                {
                    name: "Scry the Soul", cost: { rouse: 1 }, page: 250, pools: ["mental-intelligence", "discipline-auspex"], vs: ["social-composure", "skill-subterfuge"],
                    source: SourceBookIds.Corebook
                },
                { name: "Share the Senses", cost: { rouse: 1 }, page: 250, pools: ["mental-resolve", "discipline-auspex"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Spirit's Touch", cost: { rouse: 1 }, page: 250, pools: ["mental-intelligence", "discipline-auspex"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Clairvoyance", cost: { rouse: 1 }, page: 251, pools: ["mental-intelligence", "discipline-auspex"], source: SourceBookIds.Corebook },
                {
                    name: "Possession", cost: { rouse: 2 }, amalgam: { name: "dominate", level: 3 }, page: 251, pools: ["mental-resolve", "discipline-auspex"],
                    source: SourceBookIds.Corebook, vs: ["mental-resolve", "mental-intelligence"]
                },
                {
                    name: "Telepathy", cost: { rouse: 1 }, optionCost: { willpower: 1 }, page: 252, pools: ["mental-resolve", "discipline-auspex"],
                    source: SourceBookIds.Corebook, vs: ["mental-wits", "skill-subterfuge"]
                },
                {
                    name: "Unburdening the Bestial Soul", amalgam: { name: "dominate", level: 3 }, cost: { rouse: 2, stain: 1 }, page: 24,
                    pre: "Obeah", pools: ["social-composure", "discipline-auspex"],
                    source: SourceBookIds.Companion, vs: ["humanity"]
                },
            ],
        ],
        value: 0
    },
    {
        id: DisciplineIds.BloodSorcery, name: "Blood Sorcery",
        levels: [
            [
                { name: "Corrosive Vitae", page: 272, cost: { rouse: 1 }, optionCost: { rouse: -1 }, source: SourceBookIds.Corebook },
                { name: "A Taste for Blood", page: 273, pools: ["mental-resolve", "discipline-bloodsorcery"], source: SourceBookIds.Corebook },
            ],
            [
                {
                    name: "Extinguish Vitae", cost: { rouse: 1 }, page: 273,
                    pools: ["mental-intelligence", "discipline-bloodsorcery"], source: SourceBookIds.Corebook, vs: ["physical-stamina", "social-composure"]
                },
            ],
            [
                {
                    name: "Blood of Potency", cost: { rouse: 1 }, page: 273,
                    pools: ["mental-resolve", "discipline-bloodsorcery"], source: SourceBookIds.Corebook
                },
                {
                    name: "Scorpion's Touch", cost: { rouse: 1 }, optionCost: { rouse: -1 }, page: 273,
                    pools: ["physical-strength", "discipline-bloodsorcery"], source: SourceBookIds.Corebook,
                    vs: [["physical-stamina", "skills-occult"], ["physical-stamina", "discipline-fortitude"]]
                },
            ],
            [
                {
                    name: "Theft of Vitae", cost: { rouse: 1 }, page: 274,
                    pools: ["mental-wits", "discipline-bloodsorcery"], source: SourceBookIds.Corebook, vs: ["mental-wits", "skills-occult"]
                },
            ],
            [
                {
                    name: "Baal's Caress", cost: { rouse: 1 }, optionCost: { rouse: -1 }, page: 274,
                    pools: ["physical-strength", "discipline-bloodsorcery"], source: SourceBookIds.Corebook,
                    vs: [["physical-stamina", "skills-occult"], ["physical-stamina", "discipline-fortitude"]]
                },
                {
                    name: "Cauldron of Blood", cost: { rouse: 1, stain: -1 }, page: 274,
                    pools: ["mental-resolve", "discipline-bloodsorcery"], source: SourceBookIds.Corebook, vs: [["social-composure", "skills-occult"], ["social-composure", "discipline-fortitude"]]
                },
            ],
        ],
        value: 0
    },
    {
        id: DisciplineIds.Celerity, name: "Celerity",
        levels: [
            [
                { name: "Cat's Grace", page: 252, source: SourceBookIds.Corebook },
                { name: "Rapid Reflexes", page: 253, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Fleetness", page: 253, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Blink", cost: { rouse: 1 }, page: 253, pools: [["physical-dexterity", "skill-athletics"], []], source: SourceBookIds.Corebook },
                { name: "Traversal", cost: { rouse: 1 }, page: 253, pools: ["physical-dexterity", "skill-athletics"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Draught of Elegance", page: 254, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
                { name: "Unerring Aim", page: 254, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Lightning Strike", page: 254, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
                { name: "Split Second", page: 254, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
        ],
        value: 0
    },
    {
        id: DisciplineIds.Dominate, name: "Dominate",
        levels: [
            [
                { name: "Cloud Memory", page: 256, pools: ["social-charisma", "discipline-dominate"], vs: ["mental-wits", "mental-resolve"], source: SourceBookIds.Corebook },
                { name: "Compel", page: 256, pools: ["social-charisma", "discipline-dominate"], vs: ["mental-intelligence", "mental-resolve"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Mesmerize", cost: { rouse: 1 }, page: 256, pools: ["social-manipulation", "discipline-dominate"], vs: ["mental-intelligence", "mental-resolve"], source: SourceBookIds.Corebook },
                { name: "Dementation", amalgam: { obfuscate: 2 }, cost: { rouse: 1 }, page: 256, pools: ["social-manipulation", "discipline-dominate"], vs: ["social-composure", "mental-intelligence"], source: SourceBookIds.Corebook },
                { name: "Domitor’s Favor", cost: { rouse: 1 }, page: 25, source: SourceBookIds.Companion },
            ],
            [
                { name: "The Forgetful Mind", cost: { rouse: 1 }, page: 257, pools: ["social-manipulation", "discipline-dominate"], vs: ["mental-intelligence", "mental-resolve"], source: SourceBookIds.Corebook },
                { name: "Submerged Directive", page: 257, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Rationalize", page: 257, source: SourceBookIds.Corebook },
            ],
            // Need special handling for Mass Manipulation Cost and Terminal Decree - Humanity is variable cost
            // Basically use a lesser Dominate power on mass and add cost (e.g. rouse 1 on Forgetful Mind)
            [
                { name: "Mass Manipulation", page: 257, cost: { power: "cost", rouse: 1 }, source: SourceBookIds.Corebook },
                { name: "Terminal Decree", page: 257, cost: { humanity: -1 }, source: SourceBookIds.Corebook },
            ],
        ],
        value: 0
    },
    {
        id: DisciplineIds.Fortitude, name: "Fortitude",
        levels: [
            [
                { name: "Reslience", page: 258, source: SourceBookIds.Corebook },
                { name: "Unswayable Mind", page: 258, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Toughness", page: 258, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
                {
                    name: "Enduring Beasts", page: 258, amalgam: { animalism: 1 }, optionCost: { rouse: 1 }, optionPool: ["physical-stamina", "discipline-animalism"],
                    source: SourceBookIds.Corebook
                },
                {
                    name: "Valeren", amalgam: { auspex: 1 }, cost: { rouse: 1 }, optionCost: { health: -1 }, page: 25,
                    pools: ["mental-intelligence", "discipline-fortitude"], source: SourceBookIds.Companion
                },
            ],
            [
                { name: "Defy Bane", cost: { rouse: 1 }, page: 259, pools: ["mental-wits", "skills-survival"], source: SourceBookIds.Corebook },
                { name: "Fortify the Inner Facade", page: 259, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Draught of Endurance", page: 259, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Flesh of Marble", page: 259, cost: { rouse: 2 }, source: SourceBookIds.Corebook },
                { name: "Prowess from Pain", page: 260, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
        ],
        value: 0
    },
    {
        id: DisciplineIds.Obfuscate, name: "Obfuscate",
        levels: [
            [
                { name: "Cloak of Shadows", page: 261, source: SourceBookIds.Corebook },
                { name: "Silence of Death", page: 261, source: SourceBookIds.Corebook },
            ],
            [
                {
                    name: "Chimerstry", amalgam: { presence: 1 }, cost: { rouse: 1 }, page: 25, pools: ["social-manipulation", "discipline-obfuscate"],
                    source: SourceBookIds.Companion, vs: ["social-composure", "mental-wits"]
                },
                { name: "Unseen Passage", page: 261, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
                { name: "Ghost in the Machine", page: 262, source: SourceBookIds.Corebook },
            ],
            [
                {
                    name: "Fata Morgana", amalgam: { presence: 2 }, cost: { rouse: 1 }, optionCost: { willpower: 1 },
                    page: 26, pools: ["social-manipulation", "discipline-obfuscate"], source: SourceBookIds.Companion
                },
                { name: "Mask of a Thousand Faces", page: 262, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Conceal", amalgam: { auspex: 3 }, cost: { rouse: 1 }, page: 262, pools: ["mental-intelligence", "discipline-obfuscate"], source: SourceBookIds.Corebook },
                { name: "Vanish", pre: "Cloak of Shadows", cost: { power: "cost" }, page: 262, pools: ["mental-wits", "discipline-obfuscate"], vs: ["mental-wits", "skills-awareness"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Cloak the Gathering", page: 263, cost: { rouse: 1, power: "cost" }, source: SourceBookIds.Corebook },
                {
                    name: "Imposter's Guise", page: 263, pre: "Mask of a Thousand Faces", cost: { rouse: 1 },
                    description: "Storyteller must make a secret Wits + Obfuscate roll at Difficulty 4.",
                    pools: ["social-manipulation", "skills-performance"], source: SourceBookIds.Corebook
                },
            ],
        ]
    },
    {
        id: DisciplineIds.Oblivion, name: "Oblivion", levels: [], source: SourceBookIds.Camarilla, page: -1
    },
    {
        id: DisciplineIds.Potence, name: "Potence",
        levels: [
            [
                { name: "Lethal Body", page: 264, source: SourceBookIds.Corebook },
                { name: "Soaring Leap", page: 264, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Prowess", page: 264, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Brutal Feed", page: 264, source: SourceBookIds.Corebook },
                { name: "Spark of Rage", amalgam: { presence: 3 }, cost: { rouse: 1 }, page: 265, pools: ["social-manipulation", "discipline-potence"], source: SourceBookIds.Corebook },
                { name: "Uncanny Grip", page: 265, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Draught of Might", page: 265, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Earthshock", page: 265, cost: { rouse: 2 }, source: SourceBookIds.Corebook },
                { name: "Fist of Caine", page: 266, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
        ]
    },
    {
        id: DisciplineIds.Presence, name: "Presence",
        levels: [
            [
                { name: "Awe", page: 267, pools: ["social-manipulation", "discipline-presence"], vs: ["social-composure", "mental-intelligence"], source: SourceBookIds.Corebook },
                { name: "Daunt", page: 267, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Lingering Kiss", page: 267, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Dread Gaze", cost: { rouse: 1 }, page: 267, pools: ["social-charisma", "discipline-presence"], vs: ["social-composure", "mental-resolve"], source: SourceBookIds.Corebook },
                { name: "Entrancement", cost: { rouse: 1 }, page: 268, pools: ["social-charisma", "discipline-presence"], vs: ["social-composure", "mental-wits"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Irresistable Voice", page: 268, amalgam: { dominate: 1 }, source: SourceBookIds.Corebook },
                { name: "Summon", cost: { rouse: 1 }, page: 268, pools: ["social-manipulation", "discipline-presence"], vs: ["social-composure", "mental-intelligence"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Majesty", cost: { rouse: 2 }, page: 268, pools: ["social-charisma", "discipline-presence"], vs: ["social-composure", "mental-resolve"], source: SourceBookIds.Corebook },
                { name: "Star Magnetism", page: 269, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
        ]
    },
    {
        id: DisciplineIds.Protean, name: "Protean",
        levels: [
            [
                { name: "Eyes of the Beast", page: 269, source: SourceBookIds.Corebook },
                { name: "Weight of the Feather", page: 270, pools: ["mental-wits", "skill-survival"], source: SourceBookIds.Corebook },
            ],
            [
                { name: "Feral Weapons", page: 270, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
                {
                    name: "Vicissitude", amalgam: { dominate: 2 }, cost: { rouse: 1 }, optionCost: {}, page: 27,
                    pools: ["mental-resolve", "discipline-protean"], source: SourceBookIds.Companion
                }
            ],
            [
                { name: "Earth Meld", page: 270, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
                {
                    name: "Fleshcrafting", amalgam: { dominate: 2 }, cost: { rouse: 1 }, page: 27, pre: "Viscissitude",
                    pools: ["mental-resolve", "discipline-protean"], source: SourceBookIds.Companion, vs: ["physical-stamina", "mental-resolve"]
                },
                { name: "Shapechange", page: 270, cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Horrid Form", amalgam: { dominate: 2 }, cost: { rouse: 1 }, page: 28, pre: "Vicissitude", source: SourceBookIds.Companion },
                { name: "Metamorphosis", page: 271, pre: "Shapechange", cost: { rouse: 1 }, source: SourceBookIds.Corebook },
            ],
            [
                { name: "Mist Form", page: 271, optionCost: { maxRouse: 3, minRouse: 1 }, source: SourceBookIds.Corebook },
                { name: "One with the Land", amalgam: { animalism: 2 }, cost: { rouse: 2 }, page: 28, source: SourceBookIds.Companion },
                { name: "The Unfettered Heart", page: 271, source: SourceBookIds.Corebook },
            ],
        ]
    },
    {
        // NOTE: Difficulty checks for rituals are Ritual level + 1
        id: DisciplineIds.Rituals, name: "Rituals",
        levels: [
            [
                {
                    name: "Blood Walk", page: 276, cost: { rouse: 1 },
                    ingredients: "Silver cup filled with Blood from the subject (one Rouse Check's worth).",
                    source: SourceBookIds.Corebook
                },
                {
                    name: "Clinging of the Insect", page: 276, cost: { rouse: 1 }, ingredients: "Living spider.",
                    source: SourceBookIds.Corebook
                },
                {
                    name: "Craft Bloodstone", page: 276, cost: { rouse: 1 },
                    ingredients: "Pebble of iron ore or small magnet, and a liter of blood from any source in a silver bowl.",
                    source: SourceBookIds.Corebook
                },
                {
                    name: "Wake with Evening's Freshness", page: 276, cost: { rouse: 1 },
                    ingredients: "The burnt bones and feathers of a rooster.",
                    source: SourceBookIds.Corebook
                },
                {
                    name: "Ward Against Ghouls", page: 277, cost: { rouse: 1 }, ingredients: "Caster's Blood.",
                    source: SourceBookIds.Corebook
                },
            ],
            [
                {
                    name: "Communicate with Kindred Sire", page: 277, cost: { rouse: 1 },
                    ingredients: "Object previously possessed by the sire and a silver bowl filled with clear water.",
                    source: SourceBookIds.Corebook
                },
                { name: "Eyes of Babel", page: 277, cost: { rouse: 1 }, ingredients: "Fresh eye and tongue of a person.", source: SourceBookIds.Corebook },
                { name: "Illuminate the Trail of Prey", page: 277, cost: { rouse: 1 }, ingredients: "White satin ribbon.", source: SourceBookIds.Corebook },
                { name: "Truth of Blood", page: 277, cost: { rouse: 1 }, ingredients: "One pint of blood from the subject.", source: SourceBookIds.Corebook },
                {
                    name: "Ward Against Spirits", page: 278, cost: { rouse: 1 },
                    ingredients: "Handful of salt (in some versions, handful of brick dust) mixed with the Blood.",
                    source: SourceBookIds.Corebook
                },
                {
                    name: "Warding Circle Against Ghouls", page: 278, cost: { rouse: 1 },
                    ingredients: "Caster draws the Warding circle with a human bone dipped in the Blood.",
                    source: SourceBookIds.Corebook
                },
            ],
            [
                {
                    name: "Dagon's Call", cost: { rouse: 1 }, ingredients: "Gold inlaid ceremonial dagger.",
                    page: 278, pools: ["mental-resolve", "discipline-bloodsorcery"], vs: ["physical-stamina", "mental-resolve"], source: SourceBookIds.Corebook
                },
                { name: "Deflection of Wooden Doom", page: 278, cost: { rouse: 1 }, ingredients: "Wood splinters or shavings.", source: SourceBookIds.Corebook },
                { name: "Essence of Air", page: 278, cost: { rouse: 1 }, ingredients: "Leaves and berries of belladonna.", source: SourceBookIds.Corebook },
                { name: "Firewalker", page: 279, cost: { rouse: 1 }, ingredients: "Fingertip of the caster.", source: SourceBookIds.Corebook },
                {
                    name: "Ward Against Lupines", page: 279, cost: { rouse: 1 }, ingredients: "Handful of silver dust.",
                    source: SourceBookIds.Corebook
                },
                {
                    name: "Warding Circle Against Spirits", page: 279, cost: { rouse: 1 },
                    ingredients: "Caster draws Warding circle with an iron knife dipped in salt and Blood.",
                    source: SourceBookIds.Corebook
                },
            ],
            [
                {
                    name: "Defense of the Sacred Haven", page: 279, cost: { rouse: 1 },
                    ingredients: "Blood of the Caster.", source: SourceBookIds.Corebook
                },
                {
                    name: "Eyes of the Nighthawk", page: 279, cost: { rouse: 1 },
                    ingredients: "Bird of prey, such as raven, crow, hawk. Caster takes eyes of bird at conclusion of ritual.",
                    source: SourceBookIds.Corebook
                },
                {
                    name: "Incorporeal Passage", page: 280, cost: { rouse: 1 },
                    ingredients: "Mirror.", source: SourceBookIds.Corebook
                },
                {
                    name: "Ward Against Cainites", page: 280, cost: { rouse: 1 },
                    ingredients: "Ashes warm from a still-burning fire.", source: SourceBookIds.Corebook
                },
                {
                    name: "Warding Circle Against Lupines", page: 280, cost: { rouse: 1 },
                    ingredients: "Caster draws the Warding circle with a silver knife dipped in wolfsbane and Blood.", source: SourceBookIds.Corebook
                },
            ],
            [
                {
                    name: "Escape to the True Sanctuary", page: 280, cost: { rouse: 1 },
                    ingredients: "Two charred circles of approximately one meter in diameter.", source: SourceBookIds.Corebook
                },
                {
                    name: "Heart of Stone", page: 281, cost: { rouse: 1 },
                    ingredients: "Stone slab and a wax candle drenched with caster's Blood.", source: SourceBookIds.Corebook
                },
                {
                    name: "Shaft of Belated Dissolution", page: 281, cost: { rouse: 2 },
                    ingredients: "Stake carved of rowan wood, inscribed with baneful runes.", source: SourceBookIds.Corebook
                },
                {
                    name: "Warding Circle Against Cainites", page: 282, cost: { rouse: 1 },
                    ingredients: "Caster draws the Warding circle with a rowan wand dipped in a mixture of ash from a still-burning fire and Blood.",
                    source: SourceBookIds.Corebook
                },
            ],
        ]
    },
    {
        id: DisciplineIds.TBAlchemy, name: "Thin-Blood Alchemy",
        levels: [
            [
                {
                    name: "Far Reach", cost: { rouse: 1 },
                    ingredients: "Alchemist's Blood, choleric human blood, melted nylon fibers or a grated refrigerator magnet or weird nootropics ordered off the internet.",
                    page: 284, pools: ["mental-resolve", "discipline-alchemy", "alchemy-optional"], source: SourceBookIds.Corebook, vs: ["physical-strength", "skills-athletics"]
                },
                {
                    name: "Haze", cost: { rouse: 1 },
                    ingredients: "Alchemit's Blood, phlegmatic human blood, dry ice or cigar smoke or auto exhaust.",
                    page: 285, pools: ["alchemy-optional"], source: SourceBookIds.Corebook
                },
            ],
            [
                {
                    name: "Envelop", cost: { rouse: 1 },
                    ingredients: "Alchemist's Blood, melancholic and phlegmatic human blood, potassium chlorate, smog or halon gas.",
                    page: 285, pools: ["alchemy-optional"], source: SourceBookIds.Corebook
                },
            ],
            [
                {
                    name: "Defractionate", cost: { rouse: 1 },
                    ingredients: "Alchemist's Blood, sanguine and melancholic human blood, few mL of O- human blood, moldy spinach, hot black coffee, sodium octanoate.",
                    page: 285, pools: ["alchemy-optional"], source: SourceBookIds.Corebook
                },
                {
                    name: "Profane Hieros Gamos", cost: { rouse: 1 }, optionCost: { type: "Aggravated Health Damage", amount: 1 },
                    ingredients: "Alchemist's Blood, melancholic and phlegmatic human blood, entheogenic substances.",
                    page: 286, pools: ["physical-stamina", "mental-resolve", "alchemy-optional"], source: SourceBookIds.Corebook
                },
            ],
            [
                {
                    name: "Airborne Momentum", cost: { rouse: 1 },
                    ingredients: "Alchemist's Blood, choleric and sanguine human blood, champagne, bird blood, helium, scopolamine or belladonna extract.",
                    page: 287, pools: ["physical-strength", "discipline-alchemy", "alchemy-optional"], source: SourceBookIds.Corebook
                },
            ],
            [
                {
                    name: "Awaken the Sleeper", cost: { rouse: 1 },
                    ingredients: "Alchemist's Blood, choleric or sanguine human blood, adrenaline, ammonium carbonate, hartshorn (antler of male red deer), caffeine or benzedrine, melatonin.",
                    page: 287, pools: ["alchemy-optional"], source: SourceBookIds.Corebook
                },
            ],
        ]
    },
];
// { name: "", amalgam: {}, cost: { rouse: 1 }, optionCost: {  }, page: , pools: ["",""], source: SourceBookIds., vs: ["",""] },

export const resonances: Resonance[] = [
    { id: 0, name: "Chloeric", disciplines: [DisciplineIds.Celerity, DisciplineIds.Potence], page: 226, source: SourceBookIds.Corebook },
    { id: 1, name: "Melancholy", disciplines: [DisciplineIds.Fortitude, DisciplineIds.Obfuscate], page: 226, source: SourceBookIds.Corebook },
    { id: 2, name: "Phlegmatic", disciplines: [DisciplineIds.Auspex, DisciplineIds.Dominate], page: 226, source: SourceBookIds.Corebook },
    { id: 3, name: "Sanguine", disciplines: [DisciplineIds.BloodSorcery, DisciplineIds.Presence], page: 226, source: SourceBookIds.Corebook },
    { id: 4, name: "Animal Blood", disciplines: [DisciplineIds.Animalism, DisciplineIds.Protean], page: 227, source: SourceBookIds.Corebook },
];
