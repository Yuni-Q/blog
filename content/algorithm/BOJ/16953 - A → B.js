const input = [
  '2 162',
  // '4 42',
];

function solution(input) {
  const [a, b] = input[0].split(' ').map((n) => Number(n));
  let temp = b;
  let count = 0;
  while (temp > a) {
    console.log(temp);
    if (temp % 2 === 0) {
      temp /= 2;
    } else if (temp % 10 === 1) {
      temp = Math.floor(temp / 10);
    } else {
      break;
    }
    count++;
  }
  if (temp === a) {
    console.log(count + 1);
  } else {
    console.log('-1');
  }
}

solution(input);
