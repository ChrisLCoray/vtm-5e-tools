import { expect } from '@open-wc/testing';
import { isNullOrUndefined } from '../src/services/commonTools';

describe('Common tools', async () => {
    describe('can detect if a value is null or undefined', () => {
        it('returns true if a value is null', async () => {
            const myValue = null;
            expect(isNullOrUndefined(myValue)).to.be.true;
        });
        it('returns true if a value is undefined', async () => {
            const myValue = undefined;
            expect(isNullOrUndefined(myValue)).to.be.true;
        });
        it('returns false if the the value is neither null nor undefined', async () => {
            const myValue = 1;
            expect(isNullOrUndefined(myValue)).to.be.false;
        });
    });

    // Quick copy + paste template
    // it('', async () => {});
});