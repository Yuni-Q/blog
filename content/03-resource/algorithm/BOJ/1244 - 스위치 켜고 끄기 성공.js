const input = ['8', '0 1 0 1 0 0 0 1', '2', '1 3', '2 3'];
const arr = input[1].split(' ').map((n) => Number(n));
const len = Number(input[2]);

for (let i = 0; i < len; i++) {
  const [g, n] = input[3 + i].split(' ').map((n) => Number(n));
  let k = n - 1;
  if (g === 1) {
    while (k < arr.length) {
      if (arr[k]) {
        arr[k] = 0;
      } else {
        arr[k] = 1;
      }
      k += n;
    }
  } else {
    if (arr[k]) {
      arr[k] = 0;
    } else {
      arr[k] = 1;
    }
    let j = 1;

    while (k - j >= 0 && k + j < arr.length && arr[k - j] === arr[k + j]) {
      if (arr[k - j]) {
        arr[k - j] = 0;
        arr[k + j] = 0;
      } else {
        arr[k - j] = 1;
        arr[k + j] = 1;
      }
      j++;
    }
  }
}

while (arr.length > 0) {
  console.log(arr.splice(0, 20).join(' '));
}
