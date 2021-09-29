// https://programmers.co.kr/learn/courses/30/lessons/60057?language=javascript
function solution(s) {
 let answer = Infinity;
 let min = '';
 let a = '';
 let num = 0;
 const length = s.length;
 for (let k = 1; k < length + 1 / 2; k = k + 1) {
  min = '';
  a = '';
  num = 0;
  for (let i = 0; i < length + k; i = i + k) {
   if (i === 0) {
    a = s.slice(i, i + k);
    num = 1;
   } else if (a === s.slice(i, i + k)) {
    num += 1;
   } else if (length < i + k) {
    min += num > 1 ? `${num}${a}` : a;
    min += s.slice(i);
    break;
   } else {
    min += num > 1 ? `${num}${a}` : a;
    num = 1;
    a = s.slice(i, i + k);
   }
  }

  if (answer > min.length) {
   answer = min.length;
  }
 }

 return answer;
}

console.log(solution('aabbaccc'));
console.log(solution('ababcdcdababcdcd'));
