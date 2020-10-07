function* split2(val) { let _int = 0; while ((_int * 2) < val.length) { yield val.slice(_int * 2, (_int + 1) * 2); _int++; } };

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
    for(x of _arr) {
        if(!x || typeof x === "object") throw new Error("Could not parse an object.")
    }
}


module.exports = class {

    constructor({ strict }) {
        if(typeof strict !== "boolean") this.strict = true; else this.strict = strict;
    }

    compareString([str1, str2]) {      
        if((typeof str1 === "string" || typeof str2 === "string") && this.strict) throw new Error("Cannot compare non-strings.")

        const firstFused = Array.from(split2(str1.replace(/\s+/g, ''))).concat(Array.from(split2(str2.replace(/\s+/g, ''))));
        const firstEval = intersections(firstFused) / unions(firstFused);

        const secondFused = str1.replace(/\s+/g, '').split('').concat(str2.replace(/\s+/g, '').split(''));
        const secondEval = intersections(secondFused) / unions(secondFused);

        return (firstEval + secondEval) / 2;
    
    }
};