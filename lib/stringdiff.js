const reverse = require("esrever").reverse;

class StringDiff {
    constructor(a, b) {
        const n = a.length;
        const m = b.length;
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
        this.diffNum = Math.abs(a.length - b.length) + (a.length - this.similarNum);
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
}
