

import { getInitials } from "./getInitials";

describe('utilities getInitials()', () => {
    it('should return an empty string if there are no names passed in', () => {
        const test = undefined;
        const result = getInitials(test);
        const expected = '';

        expect(result).toEqual(expected);
    });

    it('should return an empty string if there are no names passed in', () => {
        const test = '';
        const result = getInitials(test);
        const expected = '';

        expect(result).toEqual(expected);
    });

    it('should return 1 letter if there is only one name', () => {
        const test = 'Dan';
        const result = getInitials(test);
        const expected = 'D';

        expect(result).toEqual(expected);
    });

    it('should return 2 letter if there is two names', () => {
        const test = 'Dan Bar';
        const result = getInitials(test);
        const expected = 'DB';

        expect(result).toEqual(expected);
    });

    it('should return 2 letters by default if there is more than two names', () => {
        const test = 'Dan Bar Zoom';
        const result = getInitials(test);
        const expected = 'DB';

        expect(result).toEqual(expected);
    });

});



