// 문제 정의: N+1까지와 N+2부터의 중복 이름 찾기
// 입력 제한: 이름의 길이는 20 이하이다. N, M은 500,000 이하의 자연수
// 시간: 2 초
// 메모리 제한: 256 MB

const input = [
  '3 4',
  'ohhenrie',
  'charlie',
  'baesangwook',
  'obama',
  'baesangwook',
  'ohhenrie',
  'clinton',
];
// const input = ['3 3', 'ad', 'ac', 'ab', 'ad', 'ac', 'ab'];

const [N, M] = input[0].split(' ').map((n) => Number(n));

const arr = {};
const result = [];

for (let i = 1; i < N + 1; i++) {
  arr[input[i]] = true;
}

for (let i = input.length - 1; i >= input.length - M; i--) {
  if (arr[input[i]]) {
    result.push(input[i]);
  }
}

console.log(result.length + '\n' + result.sort().join('\n'));

// 1차 시도 시간 초과
// 배열이 아닌 객채로 하자

// 2차 시도 틀림
// 명단을 사전순으로 출력

// 3차 시도 틀림
// 배열 수도 출력
