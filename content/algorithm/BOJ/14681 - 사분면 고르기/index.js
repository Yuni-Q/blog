// https://www.acmicpc.net/problem/14681
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input2.txt').toString();
solution(input);

function solution(input) {
  const [x, y] = input.split('\n').map((n) => Number(n));

  if (x > 0) {
    if (y > 0) {
      console.log(1);
    } else {
      console.log(4);
    }
  } else {
    if (y > 0) {
      console.log(2);
    } else {
      console.log(3);
    }
  }
}

// 1
// 4
