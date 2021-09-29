// https://programmers.co.kr/learn/courses/30/lessons/12899
function solution(n) {
 var answer = '';
 while (n >= 3) {
  answer = (n % 3 === 0 ? 4 : n % 3) + answer;
  n = n % 3 === 0 ? Math.floor(n / 3) - 1 : Math.floor(n / 3);
 }
 answer = (n > 0 ? n : '') + answer;
 return answer;
}

console.log(solution(4));
