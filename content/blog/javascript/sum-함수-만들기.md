---
title: sum 함수 만들기
date: 2021-03-27 22:03:77
category: javascript
tags: []
draft: true
---

## 55까지 더하기

```js
let accumulator = 0;
for (let i = 1; i < 10; i++) accumulator += 1;
console.log(accumulator);
```

### 위와 같은 방식으로는 JSON Parser를 구혀하기 힘듭니다.

- for를 통해 반복 상황이 학정적입니다.
- 바깥에서 코드를 컨트롤 하고 있습니다.

## 재귀를 사용해 봅니다.

```js
const sum = (v) => (v > 1 ? v + sum(v - 1) : 1);
sum(10);
```

### 위의 경우 숫자가 커지 경우 스택오버플로우가 발생할 수 있습니다.

## 꼬리물기 최적화(TRO)를 적용해 봅니다.

- 돌아와서 해야할 일을 인자로 바꿉니다.

```js
const _sum = (v, acc = 0) => (v > 1 ? _sum(v - 1, acc + v) : acc + 1);
const sum = (v) => _sum(v, 0);
sum(10);
```

- 하지만 크롬의 v8의 자바스크립트 엔진은 꼬리물기 최적화를 지원하지 않습니다.
  - 사파리는 지원합니다.
  - ECMA16에서는 지원해야 한다고 하지만 구현한 브라우저는 사파리 뿐입니다.

## 이를 다시 for로 구현합니다.

```js
const v = 10; // 상수 - 특정 컨텍스트(해결하려는 문제) 하에서 미리 주어진 값
let acc = 0; // 저장소 - 스토리지
for (let i = v; i > 1; i--) acc += i; // i :  제어변수 / 카운터
acc += 1;
console.log(acc);
```

- 꼬리물기 최적화 된 로직은 기계적으로 for문으로 만들 수 있습니다.

### 저장소의 역할이 변경되면 결과가 달라집니다.

```js
const reverseRangeTo = (v) => {
  let acc = [];
  for (let i = 1; i > 1; i--) acc.push(i);
  acc.push(1);
  return acc;
};
```

## 숟가락얹기 재귀 -> 꼬리물기 재귀 -> for문으로 기계적 변역

```js
const sum = (v) => {
  let acc = 0;
  for (let i = v; i > 1; i--) acc += i;
  acc += 1;
  return acc;
};
```

### 변수에는 용도가 있습니다. 변수는 라이프사이클과 스코프를 가집니다.

- 라이프사이클 : 되도록이면 짧게 유지합니다. 기억하지 못할 수 있습니다.
- 스코프 : 되도록이면 좁게합니다. 기억하지 못할 수 있을 뿐만 아니라 다른 사람(나중에 자신)이 잘못 건드릴 수 있습니다.
  - 어휘공간 : 일반적인 권한
  - 권한 : 예외적인 스코프
- 플로우 컨트롤은 메모리에 값을 갱신하기 위함입니다.
- 프로그램은 명령에서 메모리를 로드하고 결과를 메모리에 돌리는 것만 합니다.

## 1차원 배열의 합 재귀, 꼬리 재귀 -> 번역한 for

### 재귀

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sumArray = (v) => (v.length > 1 ? v[0] + sumArray(v.slice(1)) : v[0]);
sumArray(arr);
```

### 꼬리 재귀

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sumArray = (v, acc = 0) =>
  v.length > 1 ? sumArray(v.slice(1), acc + v[0]) : acc + v[0];
sumArray(arr);
```

### 번역한 for문

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 상수
let acc = 0; // 저장소
for (let i = arr; i.length > 1; i = i.slice(1)) acc += i[0];
acc += arr[arr.length - 1];
console.log(acc);
```

```js
const sumArray = (v) => {
  let acc = 0; // 저장소
  for (let i = v; i.length > 1; i = i.slice(1)) acc += i[0];
  acc += v[v.length - 1];
  return acc;
};
```

---

## 참고

- [코드스피츠89 - Programming 101](https://www.youtube.com/watch?v=0lAsf19iE2g)
