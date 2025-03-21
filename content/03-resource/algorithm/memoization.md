---
title: memoization
date: 2021-04-05 09:04:07
category: algorithm
tags: []
draft: true
---

## 메모이제이션이란 무엇일까요?

- 계산된 값을 테이블(캐시)에 저장해 두었다가 필요하면 꺼내 쓰는 기법입니다.
  - 주로 최적화 문제를 풀 때 캐싱을 이용해서 중복 계산을 방지하는 기법입니다.
  - 이미 계산된 값은 테이블에 저장해 둔다는 의미로 메이모이제이션을 tabling이라고도 합니다.
  - 해시테이블 또는 딕셔너리와 함께 쓸 때 가장 강력한 위력을 발휘합니다.
- 동적 계획법에서 중복되는 부분 문제가 있을 때 재귀 관계를를 상향식으로 해결하는 효율적인 방법입니다.
  - 메모이제이션은 재귀의 아름다움을 그대로 유지하면서 중복 연산을 제거하는 유용한 테크닉입니다.
  - 동적계획법을 제대로 적용하는 것보다 훨씬 직괁거으로 풀 수 있습니다.

## 피보나치 수열 예제를 통해 자세히 알아보겠습니다.

```js
const fib1 = (n) => {
  if (n <= 1) {
    return n;
  }
  return fib1(n - 1) + fib1(n - 2);
};

for (let i = 1; i < 7; i++) {
  console.log(i, fib1(i));
}
```

- 중복 부분 문제로 인해 숫자가 커질수록 힘들어 합니다.

## 동적계획법을 적용한 상향식 계산법을 적용해 보겠습니다.

```js
const F = [0, 1];
const fib2 = (n) => {
  for (let i = 2; i < n + 1; i++) {
    F[i] = F[i - 1] + F[i - 2];
  }
  return F[n];
};

for (let i = 1; i < 7; i++) {
  console.log(i, fib2(i));
}
```

## 재귀 함수에서 메모이제이션을 적용해 보겠습니다.

```js
const F = [0, 1];
const fib3 = (n) => {
  if (n <= 1) {
    return n;
  }
  if (!F[n]) {
    F[n] = fib3(n - 1) + fib3(n - 2);
  }
  return F[n];
};

for (let i = 1; i < 7; i++) {
  console.log(i, fib3(i));
}
```

---

## 참고

- [아무거나 물어보살: 자연수 거듭제곱의 합 구하기](https://www.youtube.com/watch?v=YNIasN6kT2M)
