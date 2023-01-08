// 제 정의: fibonacci(N)을 호출했을 때, 0과 1이 각각 몇 번 출력되는지 구하는 프로그램
// 입력 제한: N은 40보다 작거나 같은 자연수 또는 0
// 시간: 0.25 초 (추가 시간 없음)
// 메모리 제한: 128 MB

// 0 -> 1 0
// 1 -> 0 1
// 2 -> 1 1
// 3 -> 1 2
// 4 -> 2 3
// 5 -> 3 5
// 6 -> 5 8

const input = ['3', '0', '1', '3'];

const nums = input.map((n) => Number(n)).slice(1);

const map = [
  [1, 0],
  [0, 1],
];

nums.forEach((n) => {
  if (map[n]) {
    console.log(map[n].join(' '));
    return;
  }
  for (let i = map.length; i <= n; i++) {
    map[i] = [map[i - 2][0] + map[i - 1][0], map[i - 2][1] + map[i - 1][1]];
  }

  console.log(map[n].join(' '));
});
