class LevHelper {
    static levlen(a, b) {
        const m = a.length;
        const n = b.length;
        const dp = [...Array(m+1)].map(()=>Array(n+1).fill(0));
        for(let i = 1; i <= m; i++) {
            dp[i][0] = i;
        }
        for(let j = 1; j<= n; j++) {
            dp[0][j] = j;
        }
        for(let j = 1; j <= n; j++) {
            for(let i = 1; i <= m; i++) {
                let sub = 1;
                if(a[i-1] === b[j-1]) {
                    sub = 0;
                }
                dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1,dp[i-1][j-1]+sub);
            }
        }
        return dp[m][n];
    }
}

module.exports = LevHelper;