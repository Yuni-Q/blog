const input = '34567';

const solution = (input) => {
  const N = Number(input);
  const dp = Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    // 1을 숫자의 갯수만큼 더해서 초기값을 설정한다.
    dp[i] = i;
    // i - j * j가 음수가 되지 않는 범위까지 반복한다.
    for (let j = 1; j * j <= i; j++) {
      // 경우의 수를 비교해서 최솟값을 저장한다.
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[N];
};

console.log(solution(input));
