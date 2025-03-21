const consoleResult = (map) => {
  const keys = Object.keys(map);
  if (!keys.length) {
    return console.log(0);
  }
  const result =
    keys.reduce((prev, curr) => {
      return prev * (map[curr].length + 1);
    }, 1) - 1;
  console.log(result);
};

const input = [
  '3',
  '3',
  'hat headgear',
  'sunglasses eyewear',
  'turban headgear',
  '0',
  '3',
  'mask face',
  'sunglasses face',
  'makeup face',
];

let map = {};
for (let i = 2; i < input.length; i++) {
  if (Number(input[i]) || Number(input[i]) === 0) {
    consoleResult(map);
    map = {};
  } else {
    const [name, category] = input[i].split(' ');

    if (!map[category]) map[category] = [];
    map[category].push(name);
  }
}

consoleResult(map);
