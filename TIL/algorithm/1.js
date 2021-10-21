function solution(A, S) {
 let answer = 0;
 const len = A.length;
 for (let i = 0; i < len; i++) {
  let sum = A[i];
  if (sum === S) {
   answer += 1;
   continue;
  }
  for (let j = i + 1; j < len; j++) {
   sum += A[j];
   if (sum === S) {
    answer += 1;
    break;
   }
   if (sum > S) {
    break;
   }
  }
 }

 return answer;
}

console.log(solution([1, 1, 1, 1], 3));
