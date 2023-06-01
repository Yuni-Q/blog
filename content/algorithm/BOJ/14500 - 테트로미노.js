const input = [
  '5 5',
  '1 2 3 4 5',
  '5 4 3 2 1',
  '2 3 4 5 6',
  '6 5 4 3 2',
  '1 2 1 2 1',
];

// dx, dy는 인접한 4방향을 나타내는 방향벡터
// 0, 1, 2, 3 순서대로 왼쪽, 오른쪽, 아래쪽, 위쪽
const dx = [0, 0, 1, -1];
const dy = [-1, 1, 0, 0];

// ex, ey는 ㅜ 모양의 4가지 회전 방향일때 정보를 저장합니다. (ㅜ, ㅏ, ㅗ, ㅓ)
const ex = [
  [0, 0, 0, 1],
  [0, 1, 2, 1],
  [0, 0, 0, -1],
  [0, -1, 0, 1],
];
const ey = [
  [0, 1, 2, 1],
  [0, 0, 0, 1],
  [0, 1, 2, 1],
  [0, 1, 1, 1],
];

function solution(input) {
  let result = 0;
  const [n, m] = input[0].split(' ').map(Number);
  // 지도 정보를 저장할 2차원 배열
  const area = Array.from(Array(n + 1), () => Array(m + 1));
  // 방문 여부를 저장할 2차원 배열
  const check = Array.from(Array(n + 1), () => Array(m + 1));

  // DFS로 4가지 모양 검사 (ㅜ 제외)
  function dfs(x, y, sum, length) {
    // 길이가 4 이상이면 종료합니다.
    if (length >= 4) {
      result = Math.max(result, sum);
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 지도 넘어가는 경우 검사
      if (nx < 1 || nx > n || ny < 1 || ny > m) continue;

      // 방문하지 않은 점이면
      if (!check[nx][ny]) {
        // 들어가기전 체크해주고
        check[nx][ny] = true;

        dfs(nx, ny, sum + area[nx][ny], length + 1);

        // 나올때 체크를 해제합니다.
        check[nx][ny] = false;
      }
    }
  }
  // ㅜ 모양 검사
  function check_shape(x, y) {
    for (let i = 0; i < 4; i++) {
      let isOut = false;
      let sum = 0;

      for (let j = 0; j < 4; j++) {
        const nx = x + ex[i][j];
        const ny = y + ey[i][j];

        if (nx < 1 || nx > n || ny < 1 || ny > m) {
          isOut = true;
          break;
        } else {
          sum += area[nx][ny];
        }
      }
      if (!isOut) {
        result = Math.max(result, sum);
      }
    }
  }

  // 1. 지도 정보를 저장합니다.
  for (let i = 1; i <= n; i++) {
    const row = input[i].split(' ').map(Number);
    for (let j = 1; j <= m; j++) {
      area[i][j] = row[j - 1];
    }
  }

  // 2. 2차원 배열 각각의 원소에서 검사를 수행합니다.
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      // 방문했던 점을 또 방문해야하기 때문에 들어가기전 체크를 합니다.
      check[i][j] = true;
      dfs(i, j, area[i][j], 1);

      // 나올때 체크를 제거합니다.
      check[i][j] = false;

      // 2) ㅏ 모양 검사
      check_shape(i, j);
    }
  }
  console.log(result);
}

solution(input);
