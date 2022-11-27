// N개의 랜선을 만들어야 한다.
// K개의 랜선은 길이가 제각각이다.
// N개의 같은 길이의 랜선으로 만들어야 한다.
// 랜선의 개수 K, 그리고 필요한 랜선의 개수 N

// 이분 탐색

// 입력값
// const input = ['4 11', '802', '743', '457', '539'];
// const input = ['2 4', '100', '1'];
// const input = ['4 4', '200', '200', '200', '200'];
// const input = ['4 8', '13', '13', '13', '13'];
// const input = ['4 1', '802', '743', '457', '539'];
const input = ['5 6', '1', '1', '1', '1', '11'];
// 입력값 정제
const [K, N] = input[0].split(' ').map((n) => Number(n));

// 최대값 구하기
let max = 0;
for (let i = 0; i < K; i++) {
  const num = Number(input[i + 1]);
  if (num > max) {
    max = num;
  }
}

// 이분 탐색을 위한 값 정의
let min = 0;
let mid = 0;
max = max + 1;

// 상한값을 구하기 위한 알고리즘
// 가능한 값 중 최대값을 구해야 하기 때문에 구해야 하는 값보다 1 큰 값을 구함
while (max > min) {
  // 범위 내 중간 값
  mid = ~~((max + min) / 2) || 1;

  // K왜 매칭할 갯수
  let count = 0;

  for (let i = 0; i < K; i++) {
    const num = Number(input[i + 1]);
    // 중간 값으로 나눈 몫 구하기
    count += ~~(num / mid);
  }

  /*
   *  [upper bound 형식]
   *
   *  mid길이로 잘랐을 때의 개수가 만들고자 하는 랜선의 개수보다 작다면
   *  자르고자 하는 길이를 줄이기 위해 최대 길이를 줄인다.
   *  그 외에는 자르고자 하는 길이를 늘려야 하므로 최소 길이를 늘린다.
   */
  if (N > count) {
    max = mid;
  } else {
    min = mid + 1;
  }
}

console.log(min - 1);
