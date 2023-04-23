const input = [100, 180, 360, 100, 270];
const input2 = [100, 100, 100, 150, 150, 200, 300];

// 시간 초과
function solution(input) {
  const point = [1, 2 / 3, 3 / 2, 3 / 4, 4 / 3, 2 / 4, 4 / 2];
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const num = input[j];
      point.map((p) => {
        if (num * p === input[i]) {
          result++;
        }
      });
    }
  }

  console.log(result);
}

function solution2(weights) {
  // 경우의 수
  const point = [2 / 3, 3 / 2, 3 / 4, 4 / 3, 2 / 4, 4 / 2];
  // 결과값
  let count = 0;
  // 무게별 친구들의 수
  const map = {};

  // 초기화
  for (let i = 0; i < weights.length; i++) {
    // 같은 무게가 있는 경우 +1을 합니다.
    map[weights[i]] = map[weights[i]] ? map[weights[i]] + 1 : 1;
  }

  // 무게별 친구들의 수를 구한다.
  for (let i = 0; i < weights.length; i++) {
    // 본인이랑 같은 무게의 친구가 있을 경우
    if (map[weights[i]] > 1) {
      count += (map[weights[i]] * (map[weights[i]] - 1)) / 2;
    }

    // 본인의 몸무게로 평형을 맞출 수 있는 경우
    point.map((p) => {
      // 본인의 몸무게 * p = 다른 친구의 몸무게
      if (map[weights[i] * p]) {
        // 본인의 몸무게와 다른 친구의 몸무게가 같은 경우
        count += map[weights[i]] * map[weights[i] * p];
      }
    });
    map[weights[i]] = 0;
  }

  console.log(count);
}

solution2(input2);
