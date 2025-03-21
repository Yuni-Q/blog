// 0.5 초 (추가 시간 없음)
// 256 MB
// # 접근법
// 단순 접근이 가능한 empty, size, front, back을 처리합니다.
// 나머지 중 push가 있는지 확인하고 그 중 front가 있는지 확인합니다.
// 이제 남은 것은 pop이기 때문에 길이가 없다면 -1을 리턴하게 합니다.
// pop이고 길이가 0 이상이기 때문에 front가 있다면 앞에 shift를 없다면 pop 합니다.

const input = [
  '15',
  'push_back 1',
  'push_front 2',
  'front',
  'back',
  'size',
  'empty',
  'pop_front',
  'pop_back',
  'pop_front',
  'size',
  'empty',
  'pop_back',
  'push_front 3',
  'empty',
  'front',
];

const arr = [];
const result = [];

for (let i = 1; i < input.length; i++) {
  switch (input[i]) {
    case 'empty': {
      if (arr.length > 0) {
        result.push(0);
      } else {
        result.push(1);
      }
      break;
    }
    case 'size': {
      result.push(arr.length);
      break;
    }
    case 'front': {
      if (arr.length) {
        result.push(arr[0]);
      } else {
        result.push(-1);
      }
      break;
    }
    case 'back': {
      if (arr.length) {
        result.push(arr[arr.length - 1]);
      } else {
        result.push(-1);
      }
      break;
    }
    default:
      if (input[i].includes('push')) {
        if (input[i].includes('front')) {
          arr.unshift(input[i].split(' ')[1]);
        } else {
          arr.push(input[i].split(' ')[1]);
        }
      } else {
        if (!arr.length) {
          result.push(-1);
        } else if (input[i].includes('front')) {
          result.push(arr.shift(input[i]));
        } else {
          result.push(arr.pop());
        }
      }
  }
}

console.log(result.join('\n'));
