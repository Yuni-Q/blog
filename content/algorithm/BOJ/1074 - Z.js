// 0.5 초 (추가 시간 없음)
// 512 MB

// 분할 정복
// 재귀

// 큰 사각형을 크기가 4인 정사각형까지 쪼개서 풉니다.

const input = '2 3 1';
// const input = '3 7 7';
let ans = 0;
let [N, r, c] = input.split(' ').map((n) => Number(n));

while (N != 0) {
  N -= 1;

  // 1사분면
  if (r < 2 ** N && c < 2 ** N) {
    ans += 2 ** N * 2 ** N * 0;
  }
  // 2사분면
  else if (r < 2 ** N && c >= 2 ** N) {
    ans += 2 ** N * 2 ** N * 1;
    c -= 2 ** N;
  }
  // 3사분면
  else if (r >= 2 ** N && c < 2 ** N) {
    ans += 2 ** N * 2 ** N * 2;
    r -= 2 ** N;
  } else {
    // 4사분면
    ans += 2 ** N * 2 ** N * 3;
    r -= 2 ** N;
    c -= 2 ** N;
  }
}
console.log(ans);
