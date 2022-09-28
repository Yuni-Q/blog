// https://www.acmicpc.net/problem/2588
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');
const num = Number(input[0]);
const str = input[1];
let sum = 0;
for (let i = 0; i < str.length; i++) {
  const mul = num * Number(str[str.length - 1 - i]);
  console.log(mul);
  sum += mul * 10 ** i;
}
console.log(sum);

// 2360
// 3776
// 1416
// 181720
