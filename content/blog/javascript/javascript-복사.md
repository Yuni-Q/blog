---
title: javascript 복사
date: 2020-02-15 12:02:35
category: javascript
draft: true
---

- javascript에서 객체의 참조를 끊고 복사하는 방법에 대해 알아보겠습니다.

## assign

```javascript
const o1 = { name: 'kim', age: 28 };
const o2 = Object.assign({}, o1);
console.log(o1, o2, o1 === o2); // {name: "kim", age: 28} {name: "kim", age: 28} false
o2.name = 'lee';
console.log(o1, o2, o1 === o2); // {name: "kim", age: 28} {name: "lee", age: 28} false
```

## 객체 안에 배열

```javascript
const o1 = { name: 'kim', score: [1, 2] };
const o2 = Object.assign({}, o1);
o2.score = o2.score.concat();
console.log(o1, o2, o1.score === o2.score); // {name: "kim", score: Array(2)} {name: "kim", score: Array(2)} false
```

## 함수에서 활용

```javascript
const fn = person => {
	person = Object.assign({}, person);
	person.name = 'lee';
	return person;
};
const o1 = { name: 'kim', age: 28 };
const o2 = fn(o1);
console.log(o1, o2, o1 === o2); // {name: "kim", age: 28} {name: "lee", age: 28} false
```
