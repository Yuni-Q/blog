// eslint-disable-next-line @typescript-eslint/no-var-requires
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = '';
rl.on('line', function (line) {
  input += line + '\n';
}).on('close', function () {
  solution(input.slice(0).trim().split('\n'));
  process.exit();
});

function solution(input) {
  console.log(input);
}
