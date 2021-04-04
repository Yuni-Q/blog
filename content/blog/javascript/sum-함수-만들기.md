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

#### 배열을 복사하는 것은 너무 많은 비용을 필요로 합니다.

```js
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const _sumArray = (arr, index) => {
  return index >= 0 ? arr[index] + _sumArray(arr, index - 1) : 0;
};
const sumArray = (list) => _sumArray(list, list.length - 1);

sumArray(list);

// 꼬리 재귀
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const _sumArray = (arr, index, acc) => {
  return index >= 0 ? _sumArray(arr, index - 1, acc + arr[index]) : acc;
};
const sumArray = (list) => _sumArray(list, list.length - 1, 0);

sumArray(list);

// 기계적으로 번역한 for문
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 상수
let acc = 0; // 저장소
for (let i = list.length - 1; i >= 0; i = i - 1) acc = acc + list[i];
console.log(acc);

const sumArray = (v) => {
  let acc = 0; // 저장소
  for (let i = v.length - 1; i >= 0; i = i - 1) acc = acc + v[i];
  return acc;
};
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

## 에러 처리

```js
const recursive = (list, index = 0, acc = 0) => {
  if (!Array.isArray(list)) return 0;
  if (!typeof list[index] !== 'number') return acc;
  return recursive(list, index, acc + list[index]);
};
```

- 내결함성으로 인해 동작하게 됩니다. 하지만 컨텍스트 에러(엉뚱한 결과값)이 발생합니다.
- 내결함성은 안 좋기 때문에 도입에 매우 신중해야 합니다.

```js
const recursive = (list, index = 0, acc = 0) => {
  if (!Array.isArray(list)) throw `invalid list ${list}`;
  if (!typeof list[index] !== 'number')
    throw `invalid element ${index}:${list[index]}`;
  return recursive(list, index, acc + list[index]);
};
try {
  recursive(17);
} catch (e) {
  console.log(e);
}
```

- 함수 내부에서 내결함성을 가지면 안됩니다. 더이상 함수가 끝이 없는 경우 즉 메인함수에서만 가능합니다.
- 프로그램은 안정성보다 신뢰성이 중요합니다.

### 관리를 위한 분리

```js
const listValidator = (list) => Array.isArray(list);
const elementValidator = (el) => typeof el == 'number';
const recursive = (list, index = 0, acc = 0) => {
  if (!listValidator(list)) throw `invalid list ${list}`;
  if (!elementValidator(list[index]) !== 'number')
    throw `invalid element ${index}:${list[index]}`;
  return recursive(list, index, acc + list[index]);
};
try {
  recursive(17);
} catch (e) {
  console.log(e);
}
```

- 유지보수를 위한 분리입니다. 수정 이유가 다르기 때문에 분리합니다. (역할모델)

### validator 일반화 하기

```js
const validator = [
  (list, el) => list instanceof Array,
  (list, el) => typeof el == 'number',
];

const recursive = (list, index = 0, acc = 0) => {
  if (!validator.every((vali) => vali(list, list[index])))
    throw `invalid arguments list ${list}, element ${list[index]}`;
  return recursive(list, index, acc + list[index]);
};
try {
  recursive(17);
} catch (e) {
  console.log(e);
}
```

### 데이터와 코드가 분리되어 있어서 좋지 않아 보입니다.

```js
const validator = {
  data: [
    (list, el) => list instanceof Array,
    (list, el) => typeof el == 'number',
  ],
  validate(list, index) {
    return this.data.every((vali) => vali(list, list[index]));
  },
};

const recursive = (list, index = 0, acc = 0) => {
  if (!validator.validate(list, index))
    throw `invalid arguments list ${list}, element ${list[index]}`;
  return recursive(list, index, acc + list[index]);
};
try {
  recursive(17);
} catch (e) {
  console.log(e);
}
```

## 스코프

```js
const arraySum = (() => {
  const elementSum = (arr, i, acc) => {
    if (arr.length === i) return acc;
    return elementSum(arr, acc + arr[i], i + 1);
  };
  const arraySum = (arr) => elementSum(arr, 0, 0);
  return arraySum;
})();
```

- elementSum이 scope : arraySum만 알게, lifecycle: 영구적

```js
const arraySum = (arr) => {
  const elementSum = (arr, i, acc) => {
    if (arr.length === i) return acc;
    return elementSum(arr, acc + arr[i], i + 1);
  };
  return elementSum(arr, 0, 0);
}();
```

- elementSum이 scope : arraySum만 알게, lifecycle: arraySum을 호출할때 생성되어 리턴 시 삭제
- 메모리를 적게 쓰지만 elementSum을 만들어야 하기 때문에 연산이 더 사용됩니다.

## 여기까지 정리

- 변수란 스코프와 라이프사이클을 가집니다. 메모리와 연산은 상호 교환할 수 있으며 특히 라이프사이클이 관여합니다.
- 오류와 실패의 관계 - 오류는 중간요소의 내결합성 때문에 실패로 이어지지 않을 수 있습니다 : 최대한 빨리 실패로 이어지게 짜야합니다. 컨텍스트 에러가 더욱 무섭습니다. 신뢰성보다 안정성이 더 중요합니다.
- 코드의 분리 또는 정리 - 수정되는 원인에 따라 분리합니다. 변화율(변화율이 같은 애들끼리 코드를 모읍니다.). 변화율의 원인은 수정되는 이유입니다.
- 자바스크립트 인터페이스란 함수의 이름 인자 반환값의 형식이 일치하는 경우
- 인터페이스를 일치시키면 컬렉션으로 묵을 수 있습니다. -> 일종의 일반화 -> 서로 다른 형태인 경우 인터페이스를 일치시켜 일반화를 합니다.
- 데이터와 데이터를 이용한 알고르즘이 이원화 되면 관리가 불가능합니다. -> 데이터를 소유한 쪽에서 데이터를 사용하는 알고리즘을 제공합니다.
- 꼬리물기최적화함수를 루프로 고칠때 기계적으로 고쳐야합니다.
- 결국 루프는 클로저에만 의존하는 함수를 반복시키고, 재귀함수는 인자에만 의존하는 함수를 반복시킵니다.
- 반복되는 코드를 제거하기 위해 집착해야 합니다.

## 1차원 배열의 stringify

```js
const a = [1, 'abc', true, undefined, null, (_) => 3, Symbol()];
const arrayStringify = (a) => {};
JSON.stringify(a) === arrayStringify(a);
```

---

## 참고

- [코드스피츠89 - Programming 101](https://www.youtube.com/watch?v=0lAsf19iE2g)
