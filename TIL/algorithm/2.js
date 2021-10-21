function solution(arr, n) {
 const s = { [arr[0]]: true };
 const len = arr.length;
 for (let i = 1; i < len; i++) {
  const b = n - arr[i];
  if (s[b]) {
   return true;
  } else {
   s[arr[i]] = true;
  }
 }

 return false;
}

console.log(solution([5, 3, 9, 13], 8));
