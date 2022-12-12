const input = ['10', '1', '3', '5', '4', '0', '0', '7', '0', '0', '6'];
// const input = ['4', '3', '0', '4', '0'];

const result = [];
for (let i = 1; i < input.length; i++) {
  const num = Number(input[i]);
  if (num) {
    result.push(num);
  } else {
    result.pop();
  }
}

console.log(result.reduce((prev, curr) => prev + curr, 0));
