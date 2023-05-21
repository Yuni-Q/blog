const input = [
  '4',
  'RDD',
  '4',
  '[1,2,3,4]',
  'DD',
  '1',
  '[42]',
  'RRD',
  '6',
  '[1,1,2,3,5,8]',
  'D',
  '0',
  '[]',
];

const solution = (input) => {
  const T = Number(input[0]);
  // 한번에 3개씩 세트로 구성됨
  for (let i = 1; i < T * 3 + 1; i += 3) {
    // 커맨드
    const command = input[i];
    // 두번째 줄은 배열의 길이지만 필요하지 않음
    // 배열
    const arr = JSON.parse(input[i + 2]);

    // 뒤집힘 여부
    let isReverse = false;
    // 에러 여부
    let isError = false;

    // 커맨드 순회
    for (let j = 0; j < command.length; j++) {
      // 뒤집기
      if (command[j] === 'R') {
        isReverse = !isReverse;
        // 빼기
      } else {
        // 에러
        if (arr.length === 0) {
          console.log('error');
          isError = true;
          break;
        }
        // 뒤집기에 따라 앞
        if (isReverse) {
          arr.pop();
        } else {
          arr.shift();
        }
      }
    }

    if (isError) {
      continue;
    }
    if (isReverse) {
      arr.reverse();
    }
    console.log(`[${arr.join(',')}]`);
  }
};

solution(input);
