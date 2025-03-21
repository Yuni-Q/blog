const input = ['1', '13', 'OOIOIOIOIIOII'];
const input2 = ['2', '13', 'OOIOIOIOIIOII'];

const IOIOI = (input) => {
  const N = Number(input[0]);
  const S = input[2];
  let result = 0;
  let count = 0;

  for (let i = 0; i < S.length - 2; i++) {
    const target = S[i];
    const str2 = S[i + 1];
    const str3 = S[i + 2];
    if (target === 'I' && target === str3 && target !== str2) {
      count++;
      if (count === N) {
        result++;
        count = 0;
      } else {
        let j = i;
        while (count !== 0) {
          j += 2;
          const target = S[j];
          const str2 = S[j + 1];
          const str3 = S[j + 2];
          if (target === str3 && target !== str2) {
            count++;
          } else {
            count = 0;
          }
          if (count === N) {
            result++;
            count = 0;
          }
        }
      }
    }
  }

  console.log(result);
};

// IOIOI(input2);

const IOIOI2 = (input) => {
  const N = Number(input[0]);
  const S = input[2];
  let result = 0;

  for (let i = 0; i < S.length - 2; i++) {
    let count = 0;
    let target = S.slice(i, i + 3);
    let j = i;
    while (target === 'IOI') {
      count++;
      if (count === N) {
        result++;
        count = 0;
        break;
      }
      j += 2;
      target = S.slice(j, j + 3);
    }
  }

  console.log(result);
};

IOIOI2(input);
