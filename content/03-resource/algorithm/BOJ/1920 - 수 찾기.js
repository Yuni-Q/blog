let input = ['5', '4 1 5 2 3', '5', '1 3 7 9 5'];

const obj = {};
input[1].split(' ').forEach((n) => {
  obj[n] = true;
});
const result = input[3]
  .split(' ')
  .map((n) => {
    if (obj[n]) {
      return 1;
    } else {
      return 0;
    }
  })
  .join('\n');

console.log(result);
