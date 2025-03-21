const input = ['3', '1234 3412', '1000 1', '1 16'];

const D = (n) => (n * 2 > 9999 ? (n * 2) % 10000 : n * 2);
const S = (n) => (n === 0 ? 9999 : n - 1);
const L = (n) => (n % 1000) * 10 + Math.floor(n / 1000);
const R = (n) => (n % 10) * 1000 + Math.floor(n / 10);

const solution = (input) => {
  for (let i = 1; i < input.length; i++) {
    const visited = Array(10000).fill(false);
    const queue = [];

    const [start, end] = input[i].split(' ').map(Number);
    queue.push([start, '']);
    visited[start] = true;

    while (queue.length) {
      const [current, command] = queue.shift();

      if (current === end) {
        console.log(command);
        break;
      }

      const DNum = D(current);
      if (!visited[DNum]) {
        visited[DNum] = true;
        queue.push([DNum, command + 'D']);
      }

      const SNum = S(current);
      if (!visited[SNum]) {
        visited[SNum] = true;
        queue.push([SNum, command + 'S']);
      }

      const LNum = L(current);
      if (!visited[LNum]) {
        visited[LNum] = true;
        queue.push([LNum, command + 'L']);
      }

      const RNum = R(current);
      if (!visited[RNum]) {
        visited[RNum] = true;
        queue.push([RNum, command + 'R']);
      }
    }
  }
};

solution(input);
