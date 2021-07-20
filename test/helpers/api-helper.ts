/**
 * Helper data for storage.service.test.ts to keep the actual test files more clean
 * Using *some* data from LA by Night for fun, not meant to be accurate stats, concepts, etc.
 */

import { factions } from '../../src/services/commonData';
import { Character, Chronicle, User, VampSkills } from '../../src/project.interface';

/**
 * Generate Random Number
 * Generates a random number 1-5 because most stats are max 5
 * @returns number
 */
const grn = (): number => Math.floor(Math.random() * 5 + 1)

export const chronicles: Chronicle[] = [
    { id: 0, name: 'LA by Night', players: [1, 2, 3, 4], storyteller: 0 }
];

const genSkills = (): VampSkills => ({
    athletics: grn(), animalKen: grn(), academics: grn(),
    brawl: grn(), etiquette: grn(), awareness: grn(),
    craft: grn(), insight: grn(), finance: grn(),
    drive: grn(), intimidation: grn(), investigation: grn(),
    firearms: grn(), leadership: grn(), medicine: grn(),
    larceny: grn(), performance: grn(), occult: grn(),
    melee: grn(), persuasion: grn(), politics: grn(),
    stealth: grn(), streetwise: grn(), science: grn(),
    survival: grn(), subterfuge: grn(), technology: grn()
});

const users: User[] = [
    { id: 0, name: 'Jason Carl', characters: [], chronicles: [0] },
    { id: 1, name: 'Erika Ishii', characters: [1], chronicles: [0] },
    { id: 2, name: 'Cynthia Marie', characters: [2], chronicles: [0] },
    { id: 3, name: 'Alexander Ward', characters: [3], chronicles: [0] },
    { id: 4, name: 'B. Dave Walters', characters: [4], chronicles: [0] }
];

const genCharacter = (
    id: number, name: string, sire: string, clanId: number, generation: number, sectId: number,
    trueAge: number | string, apparentAge: number | string, dob: string, dod: string): Character => ({
        id: 1, name: 'Annabelle', chronicle: 0, image: '', sire: 'Carver', concept: '', ambition: '',
        desire: '', predator: 3, clan: clanId, generation: '10th', sect: factions[0],
        user: 1,
        attributes: {
            physical: { strength: grn(), dexterity: grn(), stamina: grn() },
            social: { charisma: grn(), manipulation: grn(), composure: grn() },
            mental: { intelligence: grn(), wits: grn(), resolve: grn() }
        },
        health: grn(), willpower: grn(),
        skills: genSkills(),
        disciplines: [{ id: grn(), value: grn(), powers: [] }],
        resonance: 1, hunger: grn(), humanity: grn(),
        chronicleTenents: [''], touchStonesConvictions: [''], clanBane: '', compulsion: '',
        advantages: [{ id: grn(), name: '', state: grn() }],
        flaws: [{ id: grn(), name: '', state: grn() }],
        bloodPotency: grn(), bloodSurge: grn(), mendAmount: grn(), powerBonus: grn(),
        rouseReroll: grn(), feedingPenalty: grn(), baneSeverity: grn(),
        totalXp: grn(), spentXp: grn(), trueAge: '19', apparentAge: '19',
        dob, dod, appearance: '', distinguishingFeatures: '',
        history: 'foo', notes: 'bar'
    }
);

export const testCharacter1: Character = genCharacter(1, 'Annabelle', 'Carver', 1, 12, 0,
    24, 'Early 20s', 'March 19, 1997', 'November 18, 2018');

export const testCharacter2: Character = genCharacter(2, 'Nelli G', 'ChazPrice', 12, 10, 0,
    68, 30, 'August 26, 1954', 'October 31, 1984');

export const testCharacter3: Character = genCharacter(3, 'Jasper', 'Unknown', 8, 11, 0,
    48, 38, 'December 27, 1972', 'April 2, 1991');

export const testCharacter4: Character = genCharacter(4, 'Victor', '', 15, 10, 0,
    43, 35, 'May 20, 1978', 'March 14, 2015');

export const testUser0: User = users[0];
export const testUser1: User = users[1];
