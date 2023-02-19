// const input = ['4 5 1', '1 2', '1 3', '1 4', '2 4', '3 4'];
const input = ['7 6 3', '3 4', '3 1', '4 5', '4 7', '1 2', '1 6'];

const [N, M, V] = input[0].split(' ').map((n) => Number(n));
const visit = Array(N + 1);

const map = Array.from(Array(N + 1), () => Array(N + 1).fill(0));

for (let i = 1; i < M + 1; i++) {
  const [x, y] = input[i].split(' ').map((n) => Number(n));
  map[x][y] = 1;
  map[y][x] = 1;
}

let result = '';
const dfs = (v) => {
  result += ` ${v}`;
  visit[v] = 1;
  for (let i = 1; i <= N; i++) {
    if (visit[i] == 1 || map[v][i] == 0) continue;
    dfs(i);
  }
};
dfs(V);

console.log(result.trim());

result = '';
const bfs = (v) => {
  const queue = [];
  queue.push(v);
  visit[v] = 0;
  while (queue.length) {
    v = queue.shift();
    result += ` ${v}`;
    for (let i = 1; i <= N; i++) {
      if (visit[i] == 0 || map[v][i] == 0) continue;
      queue.push(i);
      visit[i] = 0;
    }
  }
};
bfs(V);

console.log(result.trim());
