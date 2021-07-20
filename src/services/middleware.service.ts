/**
 * Middleware Service
 * Functions that handle calls to api and success/failure evaluation
 * 
 */
import * as api from './api.service';
import { Character, Chronicle, Clan, LogData, User } from '../project.interface';
import { blankCharacter, blankChronicle, blankUser, clans } from '../services/commonData';

const _chronicleList = await getAllChronicles();

export function createNewCharacter(characterList: Character[]): Character {
    const newCharacter = blankCharacter;
    newCharacter.id = characterList?.length > 0 ? characterList[characterList.length - 1].id += 1 : 1;
    // @TODO: make function async and uncomment below:
    // characterList.push(newCharacter);
    // await saveAllCharacters(characterList);
    return newCharacter;
}

export async function getAllCharacters(): Promise<Character[] | Array<any>> {
    const resp = await api.getCharacters();
    return resp.success ? resp.data : [blankCharacter];
}

export async function saveAllCharacters(data: Character[]): Promise<boolean> {
    const resp = await api.setCharacters(data);
    return resp.success;
}

export async function getCharacterById(id: number): Promise<Character> {
    const resp = await api.getCharacterById(id);
    return resp.success ? resp.data : blankCharacter;
}

export async function saveCharacterById(data: Character): Promise<boolean> {
    console.log(`saveCharacterById data = `, data);
    const resp = await api.setCharacterById(data);
    return resp.success;
}

export function getCharacterClan(id: number): Clan {
    return id > -1 ? clans[id] : clans.find((clan: Clan) => clan.id === id)!;
}

export async function getAllChronicles(): Promise<Chronicle[] | Array<any>> {
    const resp = await api.getChronicles();
    return resp.success ? resp.data : [blankChronicle];
}

export async function saveAllChronicles(data: Chronicle[]): Promise<boolean> {
    const resp = await api.setChronicles(data);
    return resp.success;
}

export async function getChronicleById(id: number): Promise<Chronicle> {
    const resp = await api.getChronicleById(id);
    return resp.success ? resp.data : blankChronicle;
}

export async function saveChronicleById(data: Chronicle): Promise<boolean> {
    const resp = await api.setChronicleById(data);
    return resp.success;
}

export async function getLogs(userId?: number): Promise<LogData> {
    const resp = await api.getLog(userId);
    return resp.success ? resp.data : [];
}

export async function saveLogs(data: LogData, userId?: number): Promise<boolean> {
    const resp = await api.setLog(data, userId);
    return resp.success;
}

export async function getUserById(id?: number): Promise<User> {
    const resp = await api.getUser(id);
    return resp.success ? resp.data : blankUser;
}

export async function saveUser(data: User): Promise<boolean> {
    const resp = await api.setUser(data);
    return resp.success;
}

export async function populateCharacterData(e: any, character: Character): Promise<Character> {
    if (e.target.name) {
        for (const key in character) {
            if (e.target.name === key) {
                character[key] = e.target.value;
            }
        }
    }

    // chronicle stuff
    const allChronicles = await getAllChronicles();
    const chronicle = allChronicles.filter((c: Chronicle) => {
        if (c) {
            if (!isNaN(character.chronicle)) {
                return (c.id * 1) === (character.chronicle * 1)
            } 
                return c.name === character.chronicle
            
        }
    });
    if (chronicle.length < 1 && isNaN(character.chronicle) && character.chronicle.length > 0) {
        const newChronicle = { id: allChronicles.length += 1, name: character.chronicle };
        const chronicleResp = await saveChronicleById(newChronicle);
        if (chronicleResp) {
            character.chronicle = newChronicle.id;
        }
    }
    const resp = await saveCharacterById(character);
    console.log(`saveCharById resp = `, resp);
    return character;
}

export default {
    getAllCharacters, saveAllCharacters, getCharacterById, saveCharacterById,
    getChronicleById, saveChronicleById, getAllChronicles, saveAllChronicles,
    getUserById, saveUser
}
