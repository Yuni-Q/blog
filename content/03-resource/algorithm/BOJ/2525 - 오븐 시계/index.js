// https://www.acmicpc.net/problem/2525
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const input = fs.readFileSync('./input3.txt').toString();
solution(input);

function solution(input) {
  const [time, d] = input.split('\n');
  let [h, m] = time.split(' ').map((n) => Number(n));
  const diff = Number(d);

  m += diff;
  const a = ~~(m / 60);
  m = m % 60;
  h += a;
  if (h >= 24) {
    h -= 24;
  }
  console.log(h + ' ' + m);
}

// 14 50
// 19 0
// 0 13
