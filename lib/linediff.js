const crypto = require("crypto");
const Line = require("../util/linematch");

class LineDiff {
    constructor(a, b, options) { //a: "source" ReadableStream (file), b: "target" ReadableStream (file), options: {ignoreCase: bool, ignoreWhitespace: bool}
        this.source = a;
        this.target = b;

        const linesA = a.split(/\r?\n/);
        const linesB = b.split(/\r?\n/);
        this.linesA = linesA;
        this.linesB = linesB;


        const astr = [];
        const bstr = [];
        for (const line of linesA) {
            const hash = crypto.createHash("sha1");
            const cleansed = this._cleanse(line, options);
            hash.update(cleansed);
            const hashed = hash.digest("base64");
            if(cleansed.length < hashed.length) {
                astr.push(cleansed);
            } else {
                astr.push(hashed);
            }
        }
        for (const line of linesB) {
            const hash = crypto.createHash("sha1");
            const cleansed = this._cleanse(line, options);
            hash.update(cleansed);
            const hashed = hash.digest("base64");
            if(cleansed.length < hashed.length) {
                bstr.push(cleansed);
            } else {
                bstr.push(hashed);
            }
        }
        this.astr = astr;
        this.bstr = bstr;

        const n = this.astr.length;
        const m = this.bstr.length;
        this.dp = [...Array(n+1)].map(() => Array(m+1).fill(0));
        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= m; j++) {
                if(astr[i - 1] === bstr[j - 1]) {
                    this.dp[i][j] = 1 + this.dp[i - 1][j - 1];
                } else {
                    this.dp[i][j] = Math.max(this.dp[i - 1][j], this.dp[i][j - 1]);
                }
            }
        }
        this.lcslen = this.dp[n][m];
        this.linesDeleted = linesA.length - this.lcslen;
        this.linesAdded = linesB.length - this.lcslen;


        let i = n, j = m;
        const LCS = [];
        const hashedLCS = [];
        while(i > 0 && j > 0) {
            if(astr[i - 1] === bstr[j - 1]) {
                LCS.push(linesA[i - 1]);
                hashedLCS.push(astr[i - 1]);
                i--;
                j--;
            } else if(this.dp[i - 1][j] > this.dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        LCS.reverse();
        hashedLCS.reverse();
        this.lcs = LCS;
        this.hashedlcs = hashedLCS;
    }

    _cleanse(str, options) {
        let res = str;
        if(!options) return res;
        if(options.ignoreWhitespace === true) {
            res = res.replace(/\s/g, "");
        }
        if(options.ignoreCase === true) {
            res = res.toLowerCase();
        }
        return res;
    }

    getDiffSource(keep="1", change="0") {
        let i = 0;
        let j = 0;
        const res = {diff: "", lines: []};
        while(i < this.hashedlcs.length) {
            let status = "";
            if(this.astr[j] === this.hashedlcs[i]) {
                status = keep;
                i++;
            } else {
                status = change;
            }
            res.diff += status;
            const curLine = new Line(this.linesA[j], j + 1, status);
            res.lines.push(curLine);
            j++;
        }
        
        while(j < this.astr.length) {
            res.diff += change;
            const curLine = new Line(this.linesA[j], j + 1, change);
            res.lines.push(curLine);
            j++;
        }
        return res;
    }

    getDiffTarget(keep="1", change="0") {
        let i = 0;
        let j = 0;
        const res = {diff: "", lines: []};
        while(i < this.hashedlcs.length) {
            let status = "";
            if(this.bstr[j] === this.hashedlcs[i]) {
                status = keep;
                i++;
            } else {
                status = change;
            }
            res.diff += status;
            const curLine = new Line(this.linesB[j], j + 1, status);
            res.lines.push(curLine);
            j++;
        }
        
        while(j < this.bstr.length) {
            res.diff += change;
            const curLine = new Line(this.linesB[j], j + 1, change);
            res.lines.push(curLine);
            j++;
        }
        return res;
    }

}

module.exports = LineDiff;
/*
const a = "jack and jill went up the hill";
const b = "jAcK AND JILL                WENT UP THE                             HILL";
const d = new LineDiff(a, b, {ignoreCase:true, ignoreWhitespace:true});
const e = d.getDiffTarget();
const f = d.getDiffSource();
console.log(e);
console.log(f);
*/