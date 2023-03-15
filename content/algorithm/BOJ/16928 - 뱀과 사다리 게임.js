// const input = [
//   '3 7',
//   '32 62',
//   '42 68',
//   '12 98',
//   '95 13',
//   '97 25',
//   '93 37',
//   '79 27',
//   '75 19',
//   '49 47',
//   '67 17',
// ];

const input = [
  '4 9',
  '8 52',
  '6 80',
  '26 42',
  '2 72',
  '51 19',
  '39 11',
  '37 29',
  '81 3',
  '59 5',
  '79 23',
  '53 7',
  '43 33',
  '77 21',
];

const move = {};
for (let i = 1; i < input.length; i++) {
  const [x, y] = input[i].split(' ').map((n) => Number(n));
  move[x] = y;
}

const q = [1];

const visited = Array(101).fill(-1);
visited[1] = 0;

while (q.length > 0) {
  const num = q.shift();
  for (let i = 1; i < 7; i++) {
    let visit = num + i;
    if (visit > 100) {
      continue;
    }
    if (move[visit]) {
      visit = move[visit];
    }
    if (visited[visit] === -1) {
      visited[visit] = visited[num] + 1;
      q.push(visit);
    }
    if (visit === 100) {
      break;
    }
  }
}

console.log(visited[100]);
