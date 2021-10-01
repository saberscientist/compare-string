const reverse = require("esrever").reverse;
const fs = require("fs");
const readline = require("readline");
const crypto = require("crypto");

class LineDiff {
    constructor(a, b) { //a: "source" ReadableStream (file), b: "target" ReadableStream (file) 
        this.a = a;
        this.b = b;
    }

    _cleanse(str, options) {
        const res = str;
        if(options.ignoreWhitespace) {
            res.replace(/\s/, "");
        }
        if(options.ignoreCase) {
            res.toLowerCase();
        }
        return res;
    }

    load(options) { // {ignoreCase: bool, ignoreWhitespace: bool}
        const linesA = this.a.split(/\r?\n/);
        const linesB = this.b.split(/\r?\n/);

        const astr = [];
        const bstr = [];
        const hashA = {};
        const hashB = {};

        for (const line of linesA) {
            const hash = crypto.createHash("sha256");
            const cleansed = this._cleanse(line, options);
            if(cleansed.length < 1) continue;


            hash.update(cleansed);

            const hashed = hash.digest("base64");
            astr.push(hashed);
            hashA[hashed] = line;
        }
        
        for (const line of linesB) {
            const hash = crypto.createHash("sha256");
            const cleansed = this._cleanse(line, options);
            hash.update(cleansed);
            if(cleansed.length < 1) continue;

            const hashed = hash.digest("base64");
            bstr.push(hashed);
            hashB[hashed] = line;
        }

        this.astr = astr;
        this.bstr = bstr;
        this.hashA = hashA;
        this.hashB = hashB;

        return this;
    }

    calculate() {
        const n = this.astr.length;
        const m = this.bstr.length;
        const a = this.astr;
        const b = this.bstr;

        this.dp = [...Array(n+1)].map(() => Array(m+1).fill(0));
        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= m; j++) {
                if(a[i - 1] === b[j - 1]) {
                    this.dp[i][j] = 1 + this.dp[i - 1][j - 1];
                } else {
                    this.dp[i][j] = Math.max(this.dp[i - 1][j], this.dp[i][j - 1]);
                }
            }
        }

        this.linelcs = this.dp[n][m];
        this.linesDeleted = a.length - this.linelcs;
        this.linesAdded = b.length - this.linelcs;
    }
}
