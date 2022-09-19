// const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// const n = input[0];
// const map = [];
// const p = [
//  [-1, 0],
//  [0, -1],
//  [1, 0],
//  [0, 1],
// ];

// for (let i = 1; i < input.length - 1; i++) {
//  map[i] = [];
//  for (let j = 0; j < input[1].length; j++) {
//   map[i][j] = Number(input[i][j]);
//  }
// }

// const result = [];

// for (let i = 1; i < input.length - 1; i++) {
//  for (let j = 0; j < input[1].length; j++) {
//   result[j] = 0;
//   if (map[i][j] === 1) {
//    result[j] += 1;
//    map[i][j] === 0;

//   }
//  }
// }

// const loop = (i, j) => {
//   for(let i = 0; i < p.length; p++) {
//     if(map[i][j] === 1)
//   }
// }

// 사실 이건 dfs가 아니긴 하군요
const func = (matrix) => {
 let height = matrix.length,
  width = matrix[0].length;
 let visited = [];
 let danji = [];
 let tempCount = 0;
 const dfs = (i, j) => {
  if (visited[i][j] || !matrix[i][j]) return;
  visited[i][j] = 1;
  tempCount++;
  if (i < height - 1) dfs(i + 1, j);
  if (i > 0) dfs(i - 1, j);
  if (j < width - 1) dfs(i, j + 1);
  if (j > 0) dfs(i, j - 1);
 };
 for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
   dfs(i, j);
   danji.push(tempCount);
   tempCount = 0;
  }
 }
 return [danji.length, ...danji.sort((a, b) => Number(a) - Number(b))];
};
