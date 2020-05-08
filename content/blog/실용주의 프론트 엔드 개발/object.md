---
title: Object
date: 2020-05-03 19:05:35
category: 실용주의 프론트 엔드 개발
draft: false
---

## mapValues

- mapValues는 Object의 요소들을 순회하면서 주어진 함수의 평가결과를 value에 할당합니다.
- for...in를 대체할 수 있습니다.

```javascript
const mapValues = (f, obj) =>
	Object.entries(obj)
		.map(([k, v]) => ({ [k]: f(v) }))
		.reduce((acc, obj) => Object.assign(acc, obj));
```

## mapKeys

- mapKeys는 Object의 요소들을 순회하면서 주어진 함수의 평가결과를 key에 할당합니다.

```javascript
const mapKeys = (f, obj) =>
	Object.entries(obj)
		.map(([k, v]) => ({ [f(k)]: v }))
		.reduce((acc, obj) => Object.assign(acc, obj));

const obj = { a: 1, b: 2, c: 3 };
mapKeys(n => n.repeat(2), obj);
// {aa: 1, bb: 2, cc: 3}
```

## filterObject

- filterObject는 Object의 요소들을 순회하면서 주어진 함수의 평가결과가 Truthy인 것만 새로운 객체로 반환합니다.

```javascript
const filterObject = (f, obj) =>
	Object.entries(obj)
		.filter(([_, v]) => f(v))
		.map(([k, v]) => ({ [k]: v }))
		.reduce((acc, obj) => Object.assign(acc, obj));

const obj = { a: 1, b: 2, c: 3 };
filterObject(n => n == 2, obj);
// { b: 2 }

const obj = { a: { age: 10 }, b: { age: 15 }, c: { age: 20 } };
filterObject(({ age }) => age < 20, obj);
// { a: { age: 10 }, b: { age: 15 } }
```

## Object#entries

- entries는 Object의 key와 value를 2차원 배열로 담아 반환해 줍니다.

```javascript
Object.entries({ a: 1, b: 2, c: 3 });
// [['a', 1], ['b', 2], ['c', 3]]
```

## fromEntries

- fromEntries는 entries의 반대 동작을 합니다.

```javascript
// map + reduce
const fromEntries = arr =>
	arr
		.map(([k, v]) => ({ [k]: v }))
		.reduce((acc, obj) => Object.assign(acc, obj));

// reduce
const fromEntries = arr =>
	arr.reduce((obj, [k, v]) => {
		return Object.assign(obj, { [k]: v });
	}, {});

const arr = [
	['a', 1],
	['b', 2],
	['c', 3],
];
fromEntries(arr); // {a: 1, b: 2, c: 3}
```

## pick

```javascript
const pick = (keys, obj) =>
	keys
		.map(key => ({ [key]: obj[key] }))
		.reduce((acc, obj) => Object.assign(acc, obj));

const obj = { a: 1, b: 2, c: 3 };
pick(['a', 'b'], obj);
// {a: 1, b: 2}
```

## indexBy

```javascript
const indexBy = (f, arr) =>
	arr
		.map(obj => ({ [f(obj)]: obj }))
		.reduce((acc, obj) => Object.assign(acc, obj));

const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
indexBy(v => v.id, data);
// { 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 } }
```

## Object.values

```javascript
const values = Object.values({ name: 'AA', age: 20 });
// ['AA', 20]

const values = [];
for (const val in { name: 'AA', age: 20 }) {
	values.push(val);
}
// ['AA', 20]
```

## clone

```javascript
const clone = obj => JSON.parse(JSON.stringify(obj));

const a = {};
const b = a;
const c = clone(a);
console.log(a === b); // true
console.log(a === c); // false
```

## 참고

- [Object](https://peter-cho.gitbook.io/book/10/one-piece/object)
