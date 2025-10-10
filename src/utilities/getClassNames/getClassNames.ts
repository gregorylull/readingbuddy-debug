
type classnames = Record<string, boolean> | string | string[];



export function getClassNames (...args: classnames[]) {
    const results = [];

    for (let arg of args) {

        if (!arg) continue;

        if (typeof arg === 'string') {
            results.push(arg);

        } else if (Array.isArray(arg)) {
            arg.forEach(classname => {
                results.push(classname);
            });

        } else if (typeof arg === 'object') {
            for (let [className, isIncluded] of Object.entries(arg)) {
                if (className && !!isIncluded) {
                    results.push(className);
                }
            }
        }
    }


    return results.join(' ');
}




