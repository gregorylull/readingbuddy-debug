import { toggleArray } from './toggleArray';

describe('utility toggleArray()', () => {
    it('should add an item to the array if it does not exist', () => {
        const test = ['a', 'b', 'c'];
        const result = toggleArray(test, 'd');
        const expected = ['a', 'b', 'c', 'd'];

        expect(result).toEqual(expected);
    });

    it('should remove an item from the array if it exists', () => {
        const test = ['a', 'b', 'c'];
        const result = toggleArray(test, 'c');
        const expected = ['a', 'b'];

        expect(result).toEqual(expected);
    });
});
