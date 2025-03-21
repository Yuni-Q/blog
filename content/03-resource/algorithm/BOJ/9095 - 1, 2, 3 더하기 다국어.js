const input = ['3', '4', '7', '10'];

const arr = [1, 2, 4];

for (let i = 1; i < input.length; i++) {
  const n = Number(input[i]);
  if (arr[n - 1]) {
    console.log(arr[n - 1]);
    continue;
  } else {
    for (let j = arr.length; j < n; j++) {
      arr[j] = arr[j - 1] + arr[j - 2] + arr[j - 3];
    }
  }

  console.log(arr[n - 1]);
}
