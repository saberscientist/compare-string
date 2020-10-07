function splitter(str) {
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


const unions = (_arr) => {
    const array = _arr.slice()
    const unique = [];
    const iterations = array.slice().length;
    for (let i = 0; i < iterations; i++) {
        const x = array.shift()
        if (!array.includes(x)) { unique.push(x) }
    }
    return unique.length;
}

const intersections = (_arr) => {
    const array = _arr.slice()
    const intersection = [];
    const iterations = array.slice().length;
    for (let i = 0; i < iterations; i++) {
        const x = array.shift();
        if (array.includes(x) && !intersection.includes(x)) { intersection.push(x) }
    }
    return intersection.length;
}

const arrayCheck = (_arr) => {
    for (x of _arr) {
        if (!x || typeof x === "object" && this.strict) throw new Error("Could not parse an object."); else if (!x || typeof x === "object" && this.strict) return null;
    }
}


module.exports = class {

    constructor({ strict }) {
        if (typeof strict !== "boolean") this.strict = true; else this.strict = strict;
    }

    compareString([str1, str2]) {
        if ((typeof str1 === "string" || typeof str2 === "string") && this.strict) throw new Error("Cannot compare non-strings."); else if (typeof str1 === "string" || typeof str2 === "string" && !this.strict) return null;
        

        return (firstEval + secondEval) / 2;
    }
};