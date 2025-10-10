import { getClassNames } from './getClassNames';

describe('utility getClassNames()', () => {
    it('should return an empty string when there are no inputs', () => {
        const result = getClassNames();
        const expected = '';

        expect(result).toEqual(expected);
    });

    it('should return an empty string when there is an empty obj', () => {
        const test = {};
        const result = getClassNames(test);
        const expected = '';

        expect(result).toEqual(expected);
    });

    it('should return an empty string when there is an empty array', () => {
        const test: string[] = [];
        const result = getClassNames(test);
        const expected = '';

        expect(result).toEqual(expected);
    });

    it('should return a list of classnames if an arr', () => {
        const test: string[] = ['foo', 'baz'];
        const result = getClassNames(test);
        const expected = 'foo baz';

        expect(result).toEqual(expected);
    });

    it('should return a list of classnames separated by space if an obj', () => {
        const test = {
            foo: true,
            bar: false,
            'baz-button': true,
            yes: !!'yup',
            nope: !!'',
        };
        const result = getClassNames(test);
        const expected = 'foo baz-button yes';

        expect(result).toEqual(expected);
    });

    it('should return a list off classnames if there are multipe inputs', () => {
        const test = {
            foo: true,
            bar: false,
        };
        const result = getClassNames('yes', ['a'], test);
        const expected = 'yes a foo';

        expect(result).toEqual(expected);
    });
});
