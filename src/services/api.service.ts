/**
 * Api Service
 * Currently connects app to localStorage in user's browser
 * 
 * Note: localStorage functions are simplistic enough that this may
 * seem like overkill, but this could be updated to connect
 * to a Mongo or (even) SQL database in the future
 * 
 */
import { isNullOrUndefined } from './commonTools';
import { ApiResponse, Character, Chronicle, LogData, User } from '../project.interface';

const db = window.localStorage;

// All modern supported browsers should handle localStorage and errors shouldn't be possible
// but these are 1) backup, and 2) fillers for actual DB handling
function genDescripx(name: string, qType: string) {
    return `Could not ${qType} ${name}`;
}

function storageError(data: { description: string, error?: any, status: number, qType: string }): ApiResponse {
    let eString = `Attempt to ${data.qType} data failed with error: ${data.status} ${data.description}`;
    if (data.error) { eString += `, ${data.error}`; }
    throw new Error(eString);
    console.error(eString);
    return { error: eString, operation: data.qType, status: data.status, success: false };
}

function storageSuccess(qType: string, dData: object | undefined = undefined): ApiResponse {
    return { data: dData, operation: qType, status: 200, success: true };
}

// Item specific functions
export async function getCharacters(): Promise<ApiResponse> {
    const name = 'characters';
    try {
        const data: string | any = await db.getItem(name);
        console.log(`getCharacters data = `, data)
        const listData = !isNullOrUndefined(data) ? dropNull(JSON.parse(data)) : [];
        console.log(`getCharacters listData = `, listData)
        if (listData.length > 0){
            for (let i = 0; i < listData.length; i += 1) {
                if (listData[i]?.dob) {
                    listData[i].dob = new Date(listData[i].dob);
                }
                if (listData[i]?.dod) {
                    listData[i].dod = new Date(listData[i].dod);
                }                
            }
        }
        console.log(`getCharacters listData 2 = `, listData)
        return storageSuccess(`get ${name}`, listData);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `GET`), error: e, status: 500, qType: `GET` });
    }
}

export async function setCharacters(data: Character[]): Promise<ApiResponse> {
    const name = 'characters';
    try {
        const s: string = JSON.stringify(data);
        await db.setItem(name, s);
        return storageSuccess(`set ${name}`);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `SET`), error: e, status: 500, qType: `SET` });
    }
}

export async function getCharacterById(id: number): Promise<ApiResponse> {
    const name = 'character';
    try {
        const resp = await getCharacters();
        const characters = (resp.success) ? resp.data : [];
        const data = characters[id] ? characters[id] : { id, name: '', players: [], storyteller: 0 };
        return storageSuccess(name, data);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `SET`), error: e, status: 500, qType: `SET` });
    }
}

export async function setCharacterById(data: Character): Promise<ApiResponse> {
    const name = 'character';
    try {
        const resp = await getCharacters();
        const characters = (resp.success) ? resp.data : [];
        console.log(`setCharById characters 1 = `, characters)
        console.log(`setCharacterById data.id = ${data.id}`)
        characters[data.id] = data;
        console.log(`setCharById characters 2 = `, characters)
        return setCharacters(characters);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `SET`), error: e, status: 500, qType: `SET` });
    }
}

export async function getChronicles(): Promise<ApiResponse> {
    const name = 'chronicles';
    try {
        const data: string | any = await db.getItem(name);
        const chronicleListData = !isNullOrUndefined(data) ? dropNull(JSON.parse(data)) : [];
        return storageSuccess(name, chronicleListData);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `GET`), error: e, status: 500, qType: `GET` });
    }
}

export async function setChronicles(data: Chronicle[]): Promise<ApiResponse> {
    const name = 'chronicles';
    try {
        const s: string = JSON.stringify(data);
        await db.setItem(name, s);
        return storageSuccess('save chronicles');
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `SET`), error: e, status: 500, qType: `SET` });
    }
}

export async function getChronicleById(id: number): Promise<ApiResponse> {
    const name = 'chronicle';
    try {
        const resp = await getChronicles();
        const chronicles = (resp.success) ? resp.data : [];
        const data = chronicles[id] ? chronicles[id] : { id, name: '', players: [], storyteller: 0 };
        return storageSuccess(name, data);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `SET`), error: e, status: 500, qType: `SET` });
    }
}

export async function setChronicleById(data: Chronicle): Promise<ApiResponse> {
    const name = 'chronicle';
    try {
        const resp = await getChronicles();
        const chronicles = (resp.success) ? resp.data : [];
        chronicles[data.id] = data;
        return setChronicles(chronicles);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `SET`), error: e, status: 500, qType: `SET` });
    }
}

export async function getUser(id?: number): Promise<ApiResponse> {
    const name = 'user';
    try {
        const resp: string | any = await db.getItem(name);
        const data = !isNullOrUndefined(resp) ? JSON.parse(resp) : undefined;
        return storageSuccess(name, data);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `GET`), error: e, status: 500, qType: `GET` });
    }
}

export async function setUser(data: User): Promise<ApiResponse> {
    const name = 'user';
    try {
        const s: string = JSON.stringify(data);
        await db.setItem(name, s);
        return storageSuccess(name);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `SET`), error: e, status: 500, qType: `SET` });
    }
}

export async function getLog(userId?: number): Promise<ApiResponse> {
    const name = 'log';
    try {
        const resp: string | any = await db.getLog();
        const data = !isNullOrUndefined(resp) ? JSON.parse(resp) : [];
        return storageSuccess(name, data);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `GET`), error: e, status: 500, qType: `GET` });
    }
}

export async function setLog(data: LogData, userId?: number): Promise<ApiResponse> {
    const name = 'log';
    try {
        const s: string = JSON.stringify(data);
        await db.setItem(name, s);
        return storageSuccess(name);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `SET`), error: e, status: 500, qType: `SET` });
    }
}

// Generic functions
export async function clearData(): Promise<ApiResponse> {
    const name = 'clear';
    try {
        await db.clear();
        return isNullOrUndefined(db.key(0)) ? storageSuccess(name) : storageError({ description: genDescripx(`data`, `REMOVE`), status: 500, qType: `REMOVE` });
        
    } catch (e: any) {
        return storageError({ description: genDescripx(`data`, `REMOVE`), error: e, status: 500, qType: `REMOVE` });
    }
}

export async function getData(name: string): Promise<ApiResponse> {
    try {
        let data: string | any = await db.getItem(name);
        if (!isNullOrUndefined(data) && typeof data !== 'string') { data = JSON.parse(data) }
        return storageSuccess(name, data);
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `GET`), error: e, status: 500, qType: `GET` });
    }
}

export async function setData(name: string, data: Array<any> | object | string): Promise<ApiResponse> {
    try {
        if (typeof data !== 'string') { data = JSON.stringify(data) }
        db.setItem(name, data);
        const resp = await getData(name);
        return (resp.success) ? storageSuccess(name) : storageError({ description: genDescripx(name, `SET`), status: 500, qType: `SET` });
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `SET`), error: e, status: 500, qType: `SET` });
    }
}

export async function removeData(name: string): Promise<ApiResponse> {
    try {
        db.removeItem(name);
        const resp = await getData(name);
        return (resp.success) ? storageSuccess(`Remove ${name}`) : storageError({ description: genDescripx(name, `REMOVE`), status: 500, qType: `REMOVE` });
    } catch (e: any) {
        return storageError({ description: genDescripx(name, `REMOVE`), error: e, status: 500, qType: `REMOVE` });
    }
}

export default { clearData, getCharacters, getData, getLog, getUser, removeData, setCharacters, setData, setLog, setUser }

/* Private functions */
function dropNull(data: any) {
    // if saved with null as 0 val, remove
    if (data.length > 1 && isNullOrUndefined(data[0])) {
        data.shift();
    }
    return data;
}
