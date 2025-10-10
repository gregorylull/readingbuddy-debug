import { waitFor } from './waitFor';

describe('utilities waitFor()', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.resetAllMocks();
    });

    it('should wait for a function to return a value', () => {
        const spy = vi.fn();

        function takes1000() {
            const { promise, resolve } = Promise.withResolvers();

            setTimeout(() => {
                resolve(spy());
            }, 1000);

            return promise;
        }

        waitFor(takes1000, 500, 2);

        expect(spy).not.toHaveBeenCalled();

        vi.advanceTimersByTime(500);
        expect(spy).not.toHaveBeenCalled();

        vi.advanceTimersByTime(500);
        expect(spy).toHaveBeenCalled();
    });
});
