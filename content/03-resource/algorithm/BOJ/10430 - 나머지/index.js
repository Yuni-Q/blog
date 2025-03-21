// https://www.acmicpc.net/problem/10430
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const [A, B, C] = input[0].split(' ').map((n) => Number(n));

console.log((A + B) % C);
console.log(((A % C) + (B % C)) % C);
console.log((A * B) % C);
console.log(((A % C) * (B % C)) % C);

// 1
// 1
// 0
// 0
