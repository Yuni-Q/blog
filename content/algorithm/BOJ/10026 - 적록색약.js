const input = ['5', 'RRRBB', 'GGBBB', 'BBBRR', 'BBRRR', 'RRRRR'];

function solution(input) {
  // N: 지도의 크기
  const N = parseInt(input[0]);
  // map: 지도
  const map = input.slice(1).map((row) => row.split(''));
  // visited: 방문 여부
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  // visited2: 적록색약인 사람의 방문 여부
  const visited2 = Array.from(Array(N), () => Array(N).fill(false));
  // count: 구역의 수
  let count = 0;
  // count2: 적록색약인 사람의 구역의 수
  let count2 = 0;

  // dx, dy: 상하좌우
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  /**
   * @param {number} x row
   * @param {number} y column
   * @param {string} color 현재색
   * @param {function} predicate 색이 같은지 확인하는 함수
   * @param {Array} visited 방문 여부
   * @returns void
   */
  const dfs = ({ x, y, color, predicate, visited }) => {
    // 방문한 적이 있거나, 색이 다르면 종료
    if (visited[x][y] || predicate(color, x, y)) return;

    // 방문 처리
    visited[x][y] = true;

    // 상하좌우 탐색
    for (let i = 0; i < 4; i++) {
      const nextX = dx[i] + x;
      const nextY = dy[i] + y;
      // 지도를 벗어나면 종료
      if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= N) continue;
      // 방문한 적이 없고, 색이 같으면 탐색
      if (!visited[nextX][nextY])
        dfs({ x: nextX, y: nextY, color, predicate, visited });
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 적록색약이 아닌 사람
      if (!visited[i][j]) {
        dfs({
          x: i,
          y: j,
          color: map[i][j],
          predicate: (color, x, y) => color !== map[x][y],
          visited,
        });
        // 구역의 수 증가
        count++;
      }
      // 적록색약인 사람
      if (!visited2[i][j]) {
        dfs({
          x: i,
          y: j,
          color: map[i][j],
          predicate: (color, x, y) => {
            if (
              (color === 'R' || color === 'G') &&
              (map[x][y] === 'R' || map[x][y] === 'G')
            ) {
              return false;
            }
            return color !== map[x][y];
          },
          visited: visited2,
        });
        // 구역의 수 증가
        count2++;
      }
    }
  }
  // 정답 출력
  console.log(count, count2);
}

solution(input);
