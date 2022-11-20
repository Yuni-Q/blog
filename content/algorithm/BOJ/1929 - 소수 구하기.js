const input = '3 16';

const [min, max] = input.split(' ').map((n) => Number(n));
// const result = [];

// for (let i = min; i <= max; i++) {
//   if (isPrime(i)) {
//     result.push(i);
//   }
// }
// console.log(result.join('\n'));

// function isPrime(num) {
//   if (num < 2) return false;
//   for (let i = 2; i * i <= num; i++) {
//     if (num % i == 0) return false;
//   }
//   return true;
// }
const isPrime = Array(max + 1).fill(true);

// 소수는 true
// 0, 1은 소수가 아니므로 false
isPrime[0] = isPrime[1] = false;
for (let i = 2; i * i <= max; i++) {
  // 만약 i가 소수 혹은 아직 지워지지 않았다면
  if (isPrime[i]) {
    // i의 배수 j들에 대해 isPrime[j] = false; 로 둔다.
    // i*i미만의 배수는 이미 지워졌으므로 신경쓰지 않는다.
    for (let j = i * i; j <= max; j += i) {
      isPrime[j] = false;
    }
  }
}
// 1 ~ 120 사이의 소수 출력
for (let i = min; i <= max; i++) {
  if (isPrime[i]) console.log(i);
}
