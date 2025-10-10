import { wait } from './wait';

export async function waitFor(
    fn: () => any,
    ms = 500,
    retries = 10,
    waitMsg = 'Waiting...',
    errorMsg = 'Does not exist yet'
) {
    while (retries--) {
        try {
            const result = fn();

            if (result) {
                return result;
            }
        } catch (e) {
            console.error(`ERR: ${fn.name} - ${errorMsg}`);
        }

        await wait(ms);
        console.log(waitMsg, retries);
    }

    return false;
}
