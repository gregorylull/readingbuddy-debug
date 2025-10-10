export function toggleArray<T>(arr: T[], target: T) {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if (item === target) {
            arr.splice(i, 1);
            return arr;
        }
    }

    arr.push(target);

    return arr;
}
