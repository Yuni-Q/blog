// https://programmers.co.kr/learn/courses/30/lessons/77485

function solution(rows, columns, queries) {
 const arr = Array(rows * columns)
  .fill(0)
  .map((_, index) => index + 1);
 let an = Infinity;
 const answer = [];
 for (let i = 0; i < queries.length; i++) {
  an = Infinity;
  let y1 = queries[i][0] - 1;
  let x1 = queries[i][1] - 1;
  let y2 = queries[i][2] - 1;
  let x2 = queries[i][3] - 1;
  let a = arr[y1 * columns + x1];
  let b = 0;
  if (an > a) {
   an = a;
  }
  for (let j = x1 + 1; j <= x2; j++) {
   b = arr[y1 * columns + j];
   if (an > a) {
    an = a;
   }
   arr[y1 * columns + j] = a;
   a = b;
  }
  for (let j = y1 + 1; j <= y2; j++) {
   b = arr[j * columns + x2];
   if (an > a) {
    an = a;
   }
   arr[j * columns + x2] = a;
   a = b;
  }
  for (let j = x2 - 1; j >= x1; j--) {
   b = arr[y2 * columns + j];
   if (an > a) {
    an = a;
   }
   arr[y2 * columns + j] = a;
   a = b;
  }
  for (let j = y2 - 1; j > y1; j--) {
   b = arr[j * columns + x1];
   if (an > a) {
    an = a;
   }
   arr[j * columns + x1] = a;
   a = b;
  }
  arr[y1 * columns + x1] = a;
  if (an > a) {
   an = a;
  }
  answer.push(an);
 }
 return answer;
}

console.log(
 solution(3, 3, [
  [1, 1, 2, 2],
  [1, 2, 2, 3],
  [2, 1, 3, 2],
  [2, 2, 3, 3],
 ]),
);
