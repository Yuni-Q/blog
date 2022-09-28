// https://www.acmicpc.net/problem/9498
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = Number(fs.readFileSync('./input.txt').toString());
if (input >= 90) {
  console.log('A');
} else if (input >= 80) {
  console.log('B');
} else if (input >= 70) {
  console.log('C');
} else if (input >= 60) {
  console.log('D');
} else {
  console.log('F');
}
// A
