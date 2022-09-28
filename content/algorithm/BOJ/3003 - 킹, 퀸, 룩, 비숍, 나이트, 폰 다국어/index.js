// https://www.acmicpc.net/problem/3003
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input2.txt').toString().split('\n');
const yuni = input[0].split(' ');
const arr = [1, 1, 2, 2, 2, 8];
for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i] - Number(yuni[i]);
}
console.log(arr.join(' '));

// 1 0 0 0 0 1
// -1 0 0 1 0 7
