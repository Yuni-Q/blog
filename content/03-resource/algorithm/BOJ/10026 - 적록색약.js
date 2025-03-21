const input = ['5', 'RRRBB', 'GGBBB', 'BBBRR', 'BBRRR', 'RRRRR'];

function solution(input) {
  // N: 지도의 크기
  const N = parseInt(input[0]);
  // map: 지도
  const map = input.slice(1).map((row) => row.split(''));
  // visited: 방문 여부
  const visitedArray = [
    Array.from(Array(N), () => Array(N).fill(false)),
    Array.from(Array(N), () => Array(N).fill(false)),
  ];
  // predicate: 색이 같은지 확인하는 함수
  const predicateArray = [
    (color, x, y) => color !== map[x][y],
    (color, x, y) => {
      if (
        (color === 'R' || color === 'G') &&
        (map[x][y] === 'R' || map[x][y] === 'G')
      ) {
        return false;
      }
      return color !== map[x][y];
    },
  ];

  // count: 구역의 수
  let countArray = [0, 0];

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

  // 지도를 탐색하면서 구역의 수를 구함
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      visitedArray.forEach((visited, index) => {
        if (!visited[i][j]) {
          dfs({
            x: i,
            y: j,
            color: map[i][j],
            predicate: predicateArray[index],
            visited,
          });
          // 구역의 수 증가
          countArray[index] = countArray[index] + 1;
        }
      });
    }
  }
  // 정답 출력
  console.log(`${countArray[0]} ${countArray[1]}`);
}

solution(input);
