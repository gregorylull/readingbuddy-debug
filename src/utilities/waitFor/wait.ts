export function wait(ms = 0) {
    const { promise, resolve } = Promise.withResolvers();

    setTimeout(resolve, ms);

    return promise;
}
