const splitter = (str) => {
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
   while(_first.length) {
     const x = _first.shift();
     if(!_second.includes(x) && !_first.includes(x)) val.push(x);
   }
    while(_second.length) {
     const y = _second.shift();
      if(!_second.includes(y) && !_first.includes(y)) val.push(y)
    }
    return val.length;
  }

const intersections = (first, second) => {
    const val = [];
    const _first = first.slice()
    const _second = second.slice()
    
    while(_first.length) {
     const x = _first.shift()
     if(_second.includes(x)) val.push(x)
    }
     return val.length;
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
        if ((typeof str1 !== "string" || typeof str2 !== "string") && this.strict) throw new Error("Cannot compare non-strings."); else if (typeof str1 !== "string" || typeof str2 !== "string" && !this.strict) return null;
        return intersections(str1, str2) / unions(str1, str2)
    }
};