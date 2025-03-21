// https://www.acmicpc.net/problem/2753
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = Number(fs.readFileSync('./input2.txt').toString());

if ((input % 4 === 0 && input % 100 !== 0) || input % 400 === 0) {
  console.log('1');
} else {
  console.log('0');
}

// 1
// 0
