const tokenizer = (str) => {
    let _int = 0;
    const split = [];
    for (let i = 0; i < str.length; i++) {
        if (i + 2 <= str.length) {
            const val = str.substring(i, i + 2);
            split.push(val);
        }
    }
    return split;
}


const unions = (first, second) => {
    const val = [];
    const _first = first.slice();
    const _second = second.slice();
    while (_first.length) {
        const x = _first.shift();
        if (!_second.includes(x) && !_first.includes(x)) val.push(x);
    }
    while (_second.length) {
        const y = _second.shift();
        if (!_second.includes(y) && !_first.includes(y)) val.push(y)
    };
    return val.length;
};


const intersections = (first, second) => {
    const value = [];
    const __first = first.slice()
    const __second = second.slice()

    while (__first.length) {
        const x = __first.shift()
        if (__second.includes(x)) value.push(x)
    }
    return value.length;
};

const arrayCheck = (_arr, options) => {
    if ((Array.isArray(!_arr) && options.strict) || !_arr) throw new Error("The parameter you provided must be an array with at least one element."); else if (Array.isArray(_arr) && !options.strict) return null;
    for (const x of _arr) if (!x || typeof x !== "string" && options.strict) throw new Error("Array to find best match of can only contain strings."); else if (!x || typeof x !== "string" && !options.strict) return null;
};


const typeGuard = {
    strict: "boolean",
}
const defaultOptions = {
    strict: true
}

//the actual interface
module.exports = {

    compareString(str1, str2, options) {

        if (!options) options = defaultOptions
        for (const y of Object.keys(typeGuard)) {
            if (typeGuard[y] !== typeof options[y]) options[y] = defaultOptions[y];
        }

        if ((typeof str1 !== "string" || typeof str2 !== "string") && options.strict) throw new Error("Cannot compare non-strings."); else if ((typeof str1 !== "string" || typeof str2 !== "string") && !strict) return null;
        const arr1 = tokenizer(str1.replace(/\s+/g, ""));
        const arr2 = tokenizer(str2.replace(/\s+/g, ""));
        return (2 * intersections(arr1, arr2)) / (arr1.length + arr2.length)
    },
    //@returns String

    matchArray(_str, array, options) {
        if (!options) options = defaultOptions
        for (const y of Object.keys(typeGuard)) {
            if (typeGuard[y] !== typeof options[y]) options[y] = defaultOptions[y];
        }
        arrayCheck(array, options)
        if (typeof _str !== "string" && options.strict) throw new Error("String to find best match of must be a string."); else if (typeof _str !== "string" && !options.strict) return null;

        const ratings = [];
        const str = _str.replace(/\s+/g, "");
        for (let i = 0; i < array.length; i++) array[i] = array[i].replace(/\s+/g, "");

        const arr1 = tokenizer(str)

        for (x of array) {
            const arr2 = tokenizer(x)
            ratings.push([x, ((2 * intersections(arr1, arr2)) / (arr1.length + arr2.length))])
        }
        if (!ratings) return null;
        ratings.sort(([, rating1], [, rating2]) => rating2 - rating1)
        return {
            bestMatch: ratings[0][0],
            bestMatchRating: ratings[0][1],
            sorted: ratings
        }
    }
    //@returns Object{sorted: Array[Array[name, rating]], bestMatch: String, bestMatchRating: Number}
};