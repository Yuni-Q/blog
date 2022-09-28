// https://www.acmicpc.net/problem/1000
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const [a, b] = input[0].split(' ');
console.log(Number(a) + Number(b));

// 3
