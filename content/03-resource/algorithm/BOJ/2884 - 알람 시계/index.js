// https://www.acmicpc.net/problem/2884
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input4.txt').toString();
solution(input);

function solution(input) {
  let [h, m] = input.split(' ').map((n) => Number(n));
  if (m >= 45) {
    m -= 45;
  } else {
    if (h === 0) {
      h = 23;
    } else {
      h -= 1;
    }
    m += 15;
  }
  console.log(h + ' ' + m);
}

// 9 25
// 23 45
// 22 55
// 0 5
