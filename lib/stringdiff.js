const reverse = require("esrever").reverse;

class StringDiff {
    constructor(a, b) {
        const n = a.length;
        const m = b.length;
        this.a = a;
        this.b = b;
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

        this.similarNum = this.dp[n][m];
        let LCS = "";

        let i = n, j = m;
        while(i > 0 && j > 0) {
            if(a[i - 1] === b[j - 1]) {
                LCS += a[i - 1];
                i--;
                j--;
            } else if(this.dp[i - 1][j] > this.dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }

        const LCSTrue = reverse(LCS);
        this.lcs = LCSTrue;
    }

    getDiffSource(keep="1", change="0") {
        let i = 0;
        let j = 0;
        const res = {diff: "", str: this.a};
        while(i < this.lcs.length) {
            if(this.a[j] === this.lcs[i]) {
                res.diff += keep;
                i++;
            } else {
                res.diff += change;
            }
            j++;
        }

        while(j < this.a.length) {
            res.diff += change;
            j++;
        }

        return res;
    }

    getDiffTarget(keep="1", change="0") {
        let i = 0;
        let j = 0;
        const res = {diff: "", str: this.b};
        while(i < this.lcs.length) {
            if(this.b[j] === this.lcs[i]) {
                res.diff += keep;
                i++;
            } else {
                res.diff += change;
            }
            j++;
        }

        while(j < this.b.length) {
            res.diff += change;
            j++;
        }

        return res;
    }
}
module.exports = StringDiff;