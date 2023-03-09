// 포켓몬이 N번 주어지는 1번부터 N번까지 순차적으로 번호가 부여된다.
// 이후 M번 동안 문제를 푸는데 이름이면 번호, 번호면 이름을 나타낸다.
const input = [
  '26 5',
  'Bulbasaur',
  'Ivysaur',
  'Venusaur',
  'Charmander',
  'Charmeleon',
  'Charizard',
  'Squirtle',
  'Wartortle',
  'Blastoise',
  'Caterpie',
  'Metapod',
  'Butterfree',
  'Weedle',
  'Kakuna',
  'Beedrill',
  'Pidgey',
  'Pidgeotto',
  'Pidgeot',
  'Rattata',
  'Raticate',
  'Spearow',
  'Fearow',
  'Ekans',
  'Arbok',
  'Pikachu',
  'Raichu',
  '25',
  'Raichu',
  '3',
  'Pidgey',
  'Kakuna',
];

const arr = [''];
const map = {};

const [N, M] = input[0].split(' ').map((n) => Number(n));
for (let i = 1; i < N + 1; i++) {
  arr.push(input[i]);
  map[input[i]] = arr.length - 1;
}

for (let i = N + 1; i < input.length; i++) {
  const val = input[i];
  if (Number.isNaN(parseInt(val, 10))) {
    console.log(map[val]);
  } else {
    console.log(arr[parseInt(val, 10)]);
  }
}
