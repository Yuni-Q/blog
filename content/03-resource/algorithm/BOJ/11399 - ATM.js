const input = ['5', '11 103 132 19 102'];

const nums = input[1].split(' ').map((n) => Number(n));

nums.sort((a, b) => a - b);
console.log(nums);
let sum = 0;
let temp = 0;
for (let i = 0; i < nums.length; i++) {
  temp += nums[i];
  sum += temp;
}

console.log(sum);
