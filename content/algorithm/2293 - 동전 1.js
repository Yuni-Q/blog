const input = ['3 10', '1', '2', '5'];

const [i, k] = input[0].split(' ').map((n) => Number(n));
const arr = [];
const result = [1];
for (let j = 0; j < i; j++) {
  const num = Number(input[1 + j]);
  arr.push(num);
}

for (let a = 0; a < arr.length; a++) {
  let n = arr[a];
  for (let j = n; j <= k; j++) {
    if (!result[j]) {
      result[j] = 0;
    }
    if (result[j - n]) {
      result[j] += result[j - n];
    }
  }
}

console.log(result[k]);
console.log(result);
