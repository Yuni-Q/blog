const input = [
  '8 8',
  'WBWBWBWB',
  'BWBWBWBW',
  'WBWBWBWB',
  'BWBBBWBW',
  'WBWBWBWB',
  'BWBWBWBW',
  'WBWBWBWB',
  'BWBWBWBW',
];
let map = [];
const [N, M] = input[0].split(' ').map((n) => Number(n));
for (let i = 0; i < N; i++) {
  let row = [];
  for (let j = 0; j < M; j++) {
    if (input[i + 1][j] === 'B') {
      row.push(0);
    } else {
      row.push(1);
    }
  }
  map.push(row);
}

let count = Infinity;

for (let a = 0; a < N - 7; a++) {
  for (let b = 0; b < M - 7; b++) {
    let index1 = 0;
    let index2 = 0;
    for (let i = a; i < a + 8; i++) {
      for (let j = b; j < b + 8; j++) {
        if ((i + j) % 2 == 0) {
          if (map[i][j] != 1) index1 += 1;
          if (map[i][j] != 0) index2 += 1;
        } else {
          if (map[i][j] != 0) index1 += 1;
          if (map[i][j] != 1) index2 += 1;
        }
      }
    }
    count = Math.min(count, index1, index2);
  }
}

console.log(count);
