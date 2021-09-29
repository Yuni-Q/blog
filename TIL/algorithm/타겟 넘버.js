// https://programmers.co.kr/learn/courses/30/lessons/43165

function solution(numbers, target) {
 let arr = [0];
 let result = 0;
 for (let i = 0; i < numbers.length; i++) {
  let newArr = [];
  for (let j = 0; j < arr.length; j++) {
   newArr.push(arr[j] + numbers[i], arr[j] - numbers[i]);
  }
  arr = newArr;
 }

 for (let j = 0; j < arr.length; j++) {
  if (arr[j] === target) {
   result += 1;
  }
 }
 return result;
}

console.log(solution([1, 1, 1, 1, 1], 3));
