const input = ['1223', '1000', '100', '10', '1', '0'];

for (let i = 0; i < input.length - 1; i++) {
  let isPalindrome = true;
  const num = input[i];
  // 입력의 마지막 줄에는 0이 주어지며, 이 줄은 문제에 포함되지 않는다.
  if (num === '0') {
    break;
  }
  const len = num.length;
  // 한 자리라면 무조건 팰린드롬수
  if (len === 1) {
    console.log('yes');
    continue;
  }
  for (let j = 0; j < len / 2; j++) {
    if (num[j] !== num[len - j - 1]) {
      console.log('no');
      isPalindrome = false;
      break;
    }
  }
  if (isPalindrome) {
    console.log('yes');
  }
}
