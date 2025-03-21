// https://www.acmicpc.net/problem/1330
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input2.txt').toString().split(' ');
const [a, b] = input.map((n) => Number(n));

if (a > b) {
  console.log('>');
} else if (a < b) {
  console.log('<');
} else {
  console.log('==');
}
// <
// >
