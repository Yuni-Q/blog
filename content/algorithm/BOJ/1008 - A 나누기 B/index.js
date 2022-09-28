// https://www.acmicpc.net/problem/1008
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const [a, b] = input[0].split(' ');
console.log(Number(a) / Number(b));

// 0.33333333333333333333333333333333
// 0.8
