const reverse = require("esrever").reverse;

function lcslen(a, b) { //a: string, b: string
    const n = a.length;
    const m = b.length;
    const dp = [...Array(n+1)].map(() => Array(m+1).fill(0));
    for(i = 1; i <= n; i++) {
        for(j = 1; j <= m; j++) {
            if(a[i - 1] === b[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[n][m];
}

function _dp(a, b) { //Returns LCS Dynamic Programming table
    const n = a.length;
    const m = b.length;
    const dp = [...Array(n+1)].map(() => Array(m+1).fill(0));
    for(i = 1; i <= n; i++) {
        for(j = 1; j <= m; j++) {
            if(a[i - 1] === b[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp;
}


function lcsstr(a, b) {
    const dp = _dp(a, b);
    const n = a.length;
    const m = b.length;
    let LCS = "";

    let i = n, j = m;
    while(i > 0 && j > 0) {
        if(a[i - 1] === b[j - 1]) {
            LCS += a[i - 1];
            i--;
            j--;
        } else if(dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    const LCStrue = reverse(LCS);
    return LCStrue;
}

module.exports = {lcsstr, lcslen};