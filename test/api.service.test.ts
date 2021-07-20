import { expect } from '@open-wc/testing';
import * as api from '../src/services/api.service';
import { chronicles, testCharacter1, testCharacter2, testCharacter3, testCharacter4, testUser0, testUser1 } from './helpers/api-helper';
import { ApiResponse, Character, Chronicle } from '../src/project.interface';

describe('StorageService', async () => {
    const charList: Character[] = [testCharacter1, testCharacter2, testCharacter3, testCharacter4];
    const chronicleList: Chronicle[] = chronicles;

    beforeEach(async () => {
        setTimeout(() => {
            api.clearData();
        }, 1);
    });
    
    it('can set and retrive a list of characters from api', async () => {
        const resp: ApiResponse = await api.setCharacters(charList);
        const charResp: ApiResponse = await api.getCharacters();

        expect(resp.success).to.be.true;
        expect(charResp.success).to.be.true;
        // Test a few key=>val pairs because Obj !== Obj
        expect(charResp.data[0].id).to.equal(charList[0].id);
        expect(charResp.data[0].name).to.equal(charList[0].name);
    });

    it('returns an empty array if there are no Characters in api', async () => {
        api.clearData(); // should be redundant with beforeEach, but just to be literal/safe
        const resp: any = await api.getCharacters();
        expect(resp.success).to.be.true;
        expect(resp.data.length).to.equal(0);
    });

    // getChronicles(): Chronicle[]
    // setChronicles(data: object[])
    describe('handles Chronicle api', async () => {
        it('can set and retrive a list of Chronicles from api', async () => {
            const resp: ApiResponse = await api.setChronicles(chronicleList);
            const chronicleResp: ApiResponse = await api.getChronicles();

            expect(resp.success).to.be.true;
            expect(chronicleResp.success).to.be.true;
            // Test a few key=>val pairs because Obj !== Obj
            expect(chronicleResp.data[0].id).to.equal(chronicleList[0].id);
            expect(chronicleResp.data[0].name).to.equal(chronicleList[0].name);
        });
        // getChronicleById(id: number): Promise<ApiResponse>
        // setChronicleById(data: Chronicle): Promise<ApiResponse>
        it('can set and retrive a Chronicle by ID from api', async () => {
            const chronicleId: number = chronicleList[0].id;
            const resp: ApiResponse = await api.setChronicleById(chronicleList[0]);
            const chronicleResp: ApiResponse = await api.getChronicleById(chronicleId);

            expect(resp.success).to.be.true;
            expect(chronicleResp.success).to.be.true;
            // Test a few key=>val pairs because Obj !== Obj
            expect(chronicleResp.data.id).to.equal(chronicleId);
            expect(chronicleResp.data.name).to.equal(chronicleList[0].name);
        });
        it('returns an empty array if there are no Chronicles in api', async () => {
            api.clearData();
            const chronicleResp: any = await api.getChronicles();
            expect(chronicleResp.success).to.be.true;
            expect(chronicleResp.data.length).to.equal(0);
        });
    });

    // setUser(data: object[]): boolean
    // getUser(): WindowLocalStorage | undefined
    it('can set and get the user\'s meta data from api', async () => {
        // testUser1 imported from helpers
        // Data: { id: 1, name: 'Erika Ishii', characters: [1], chronicles: [0] },
        const resp = await api.setUser(testUser1);
        const userResp: any = await api.getUser();

        expect(resp.success).to.be.true;
        expect(userResp.data.id).to.equal(testUser1.id);
        expect(userResp.data.name).to.equal(testUser1.name);
        if (testUser1.characters && testUser1.characters[0]) {
            expect(userResp.data.characters[0]).to.equal(testUser1.characters[0]);
        }
        if (testUser1.chronicles && testUser1.chronicles[0]) {
            expect(userResp.data.chronicles[0]).to.equal(testUser1.chronicles[0]);
        }
        expect(userResp.data.id).to.not.equal(testUser0.id);
    });

    // clearData(): successType | Error | undefined
    it('can clear all data from api', async () => {
        await api.setCharacters(charList);
        await api.setUser(testUser1);
        const clearResponse: ApiResponse = await api.clearData();

        // { data: dData, operation: dType, status: 200, success: true }
        expect(clearResponse.operation).to.equal('clear');
        expect(clearResponse.status).to.equal(200);
        expect(clearResponse.success).to.be.true;

        const charResp: ApiResponse = await api.getCharacters();
        const userResp: ApiResponse = await api.getUser();

        expect(charResp.data.length).to.equal(0);
        expect(userResp.data).to.be.undefined;
    });

    // setData(name: string, data: object[] | object | string): ApiResponse
    // getData(name: string): ApiResponse
    it('can set and get misc data', async () => {
        const storeDataResp: ApiResponse = await api.setData('foo', 'bar');
        const dataResp: ApiResponse = await api.getData('foo');

        expect(storeDataResp.success).to.be.true;
        expect(dataResp.success).to.be.true;
        expect(dataResp.data).to.equal('bar');
    });

    // removeData(name: string): successType | Error | undefine
    it('can remove specific data by name without disrupting other data', async () => {
        await api.setData('foo', 'bar');
        const removeResponse: ApiResponse = await api.removeData('foo');

        // expected: { data: undefined, operation: 'Remove foo', status: 200, success: true }
        expect(removeResponse.success).to.be.true;
        expect(removeResponse.operation).to.equal('Remove foo');
        expect(removeResponse.status).to.equal(200);

        const dataResp = await api.getData('foo');
        // @TODO: Fill out User-based tests and test
        // const userResp = await api.getUser();

        expect(dataResp.data).to.be.null;
    });

    // Quick copy + paste template
    // it('', async () => { expect(1).to.equal(1); });
});