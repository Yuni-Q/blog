// https://www.acmicpc.net/problem/1000
// eslint-disable-next-line @typescript-eslint/no-var-requires

const input = require('fs')
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n');

const [a, b] = input[0].split(' ');
console.log(Number(a) + Number(b));

// 3
