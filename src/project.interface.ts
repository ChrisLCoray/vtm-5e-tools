/**
 * Project Interfaces
 */

export interface ApiResponse {
    data?: object | any,
    error?: any,
    operation: string,
    status: number,
    success: boolean
}

export interface Chronicle { id: number, name: string, players?: number[], storyteller?: number }

export interface Clan {
    id: number,
    archetypes?: { name: string, page: number }[],
    bane?: { name: string, page: number },
    compulsion?: { name: string, page: number },
    disciplines: number[],
    name: string,
    page: number,
    source: number
    [key: number]: number
}

export enum ClanIds {
    BanuHaqim,
    Brujah,
    Caitiff,
    Gangrel,
    Hecata,
    Lasombra,
    Malkavian,
    Ministry,
    Nosferatu,
    Ravnos,
    Salubri,
    ThinBlood,
    Toreador,
    Tremere,
    Tzimisce,
    Ventrue
}

export interface CoterieTypes {
    id: number,
    name: string,
    disciplines: number[],
    page: number
}

export interface Discipline {
    id: number,
    name: string,
    levels: {
        amalgam?: Object,
        cost?: Object,
        description?: string,
        ingredients?: string,
        optionCost?: Object,
        optionPool?: string[] | string[][],
        name: string,
        page?: number,
        pools?: string[] | string[][],
        pre?: number[] | number | string, // need enum for this
        source: number,
        vs?: string[] | string[][]
    }[][],
    source?: number,
    page?: number
    [key: string]: number | string | Object[] | undefined
}

export enum DisciplineIds {
    Animalism,
    Auspex,
    BloodSorcery,
    Celerity,
    Dominate,
    Fortitude,
    Obfuscate,
    Oblivion,
    Potence,
    Presence,
    Protean,
    Rituals,
    TBAlchemy
}

export interface LinkList { href: string, title: string }

export enum PredatorIds {
    Alleycat,
    Bagger,
    BloodLeach,
    Cleaver,
    Consensualist,
    Farmer,
    Osiris,
    Sandman,
    SceneQueen,
    Siren
}

export interface Predator {
    id: number,
    name: string,
    description: string,
    modifiers?: Object,
    page: number,
    source: number
}

export interface RollResult {
    beasts?: number,
    difficulty?: number | undefined,
    cleared?: string,
    criticals?: number,
    hungerDice?: Array<number>,
    margin?: number,
    messies?: number,
    outcome?: string | undefined,
    skillDice?: Array<number>,
    successes?: number,
    timestamp: string,
    type?: string
}

export type LogData = RollResult[]

export interface Resonance {
    id: number, disciplines: number[], name: string, page: number, source: number
    [key: number]: number | number[] | string
}

export enum SourceBookIds {
    Anarch,
    Camarilla,
    CBN,
    Companion,
    Corebook,
    CultBGs,
}

export interface User { id: number, name: string, characters?: number[], chronicles?: number[] }

export interface VampAttributes {
    physical: {
        strength: number, dexterity: number, stamina: number
    },
    social: {
        charisma: number, manipulation: number, composure: number
    },
    mental: {
        intelligence: number, wits: number, resolve: number
    }
}

export interface VampBackground {
    id: number,
    name: string,
    description: string,
    page: number,
    playable: boolean
}

export interface VampSkills {
    athletics: number, animalKen: number, academics: number,
    brawl: number, etiquette: number, awareness: number,
    craft: number, insight: number, finance: number,
    drive: number, intimidation: number, investigation: number,
    firearms: number, leadership: number, medicine: number,
    larceny: number, performance: number, occult: number,
    melee: number, persuasion: number, politics: number,
    stealth: number, streetwise: number, science: number,
    survival: number, subterfuge: number, technology: number
    [key: string]: number
}

export interface Character {
    id: number, user: number, name: string, image: string, chronicle: string | number | any, sire: string, concept: string,
    ambition: string, desire: string, predator: number, clan: number, generation: string, sect: string,
    attributes: VampAttributes,
    health: number, willpower: number,
    skills: VampSkills,
    disciplines: { id: number, value: number, powers: number[] }[],
    resonance: number, hunger: number, humanity: number,
    chronicleTenents: string[], touchStonesConvictions: string[], clanBane: string, compulsion: string,
    advantages: { id: number, name: string, state: number }[],
    flaws: { id: number, name: string, state: number }[],
    bloodPotency: number, bloodSurge: number, mendAmount: number, powerBonus: number,
    rouseReroll: number, feedingPenalty: number, baneSeverity: number,
    totalXp: number, spentXp: number, trueAge: string, apparentAge: string,
    dob: string, dod: string, appearance: string, distinguishingFeatures: string,
    history: string, notes: string
    [key: string]: string | number | any
}
