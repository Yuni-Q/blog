// https://www.acmicpc.net/problem/18108
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('/n');
const diff = 2541 - 1998;
console.log(Number(input[0]) - diff);

// 1998
