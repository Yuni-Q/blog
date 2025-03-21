// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here
  let solution = 0;
  const arr = [];
  for (let i = 0; i < A.length; i++) {
    const index = A[i];
    if (!arr[index]) {
      arr[index] = 1;
      solution++;
    }
  }
  return solution;
}
