---
title: Array
date: 2020-05-03 19:05:14
category: 실용주의 프론트 엔드 개발
draft: true
---

## Array#reduce

- accumulator, acc reduce는 각 배열 요소를 주어진 함수의 결과와 누산하여 하나의 결과값을 반환합니다.

```javascript
[1, 2, 3].reduce((acc, v) => v + acc); // 6
```

## Array#map

- map은 배열의 모든 요소를 주어진 함수의 결과로 변경한 새로운 배열을 반환합니다.

```javascript
[1, 2, 3].map(v => v * 10); // [10, 20, 30]
```

## Array#forEach

- forEach를 모든 배열을 순회합니다.
- 단순히 배열을 순회하는 for, while를 대체할 수 있습니다.

```javascript
[1, 2, 3].forEach((v, i) => console.log(v, i));
// 1 0
// 2 1
// 3 2
```

## Array#findIndex

- findIndex는 주어진 함수가 Truthy로 평가되는 값을 찾으면 해당 인덱스를 반환합니다.
- 일치하는 게 없을 때는 -1를 반환합니다.

```javascript
[1, 2, 3].findIndex(v => v >= 2); // 1
[1, 2, 3].findIndex(v => v > 3); // -1
```

## Array#find

- find는 주어진 함수가 Truthy로 평가되는 값을 찾으면 해당 값을 반환합니다.
- 일치하는 게 없을 때는 undefined를 반환합니다.

```javascript
[1, 2, 3].find(v => v >= 2); // 2
[1, 2, 3].find(v => v > 3); // undefined
```

## Array#filter

- filter는 주어진 함수가 Truthy로 평가되는 값만 모아 새로운 배열로 반환합니다.

```javascript
[1, 2, 3].filter(v => v >= 2); // [2, 3]
```

## Array#every

- every는 모두 일치할 때 true를 반환하고, 하나라도 불일치 할 때 false를 반환합니다.

```javascript
[1, 2, 3].every(v => v <= 3); // true

[1, 2, 3].every(v => v < 2); // false
```

## Array#some

- some은 하나라도 일치하는 게 있으면 true를 반환하고, 없을 때 false를 반환합니다.

```javascript
[1, 2, 3].some(v => v > 2); // true

[1, 2, 3].some(v => v > 3); // false
```

## takeWhile

- takeWhile은 주어진 함수의 평가가 Falsy일 때 순회를 멈추고 순회했던 요소들을 새로운 배열에 담아 반환합니다.

```javascript
const takeWhile = (f, arr) => {
	const newArr = [];
	arr.some((val, ...args) => {
		const result = !f(val, ...args);
		result || newArr.push(val);
		return result;
	});
	return newArr;
};

takeWhile(a => a, [1, 2, 3, 0, 4, 5]); /// [1, 2, 3]
```

## takeUntil

```javascript
const takeUntil = (f, arr) => {
	const newArr = [];
	arr.some((val, ...args) => {
		newArr.push(val);
		return f(val, ...args);
	});
	return newArr;
};

takeUntil(a => a, [0, false, undefined, null, 1, 2, 3]); // [0, false, undefined, null, 1]
```

## range

- 일반적인 인덱스 루프를 대체할 수 있습니다.

```javascript
const range = length => Array.from({ length }, (_, i) => i);

range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## repeat

- 지정한 숫자만큼 반복하며, 주어진 함수의 값이 각 요소에 할당되어 새로운 배열을 반환합니다.

```javascript
const repeat = (times, fn) => {
	return Array.from({ length: times }, (_, v) => v).map(fn);
};

repeat(3, i => i * 10);
```

## take

```javascript
const take = (n, arr) => arr.slice(0, n);

take(0, [1, 2, 3]); // []
take(2, [1, 2, 3]); // [1, 2]
```

## last

```javascript
const last = arr => {
	const len = arr.length;
	return arr.slice(len - 1, len);
};

last([]); // []
last([1, 2, 3]); // [3]
```

## first

```javascript
const first = arr => arr.slice(0, 1);

first([]); // []
first([1, 2, 3]); // [1]
```

## chunk

```javascript
const chunk = (arr, size) => {
	if (!size) {
		return arr;
	}
	const length = Math.ceil(arr.length / size);
	const newArr = Array.from({ length }, () => []);
	arr.forEach((value, index) => {
		const newArrIndex = Math.floor(index / size);
		newArr[newArrIndex].push(value);
	});
	return newArr;
};

console.log(chunk([0, 1, 2, 3], 0)); // [0, 1, 2, 3]
console.log(chunk([0, 1, 2, 3], 1)); // [[0], [1], [2], [3]]
console.log(chunk([0, 1, 2, 3], 2)); // [[0, 1], [2, 3]]
console.log(chunk([0, 1, 2, 3], 3)); // [[0, 1, 2], [3]]
console.log(chunk([0, 1, 2, 3], 4)); // [[0, 1, 2, 3]]
console.log(chunk([0, 1, 2, 3], 5)); // [[0, 1, 2, 3]]
```

## Array Booster

```javascript
const range = length => Array.from({ length });
const list = range(10000000);

// 1단계
const f = list => {
	return list
		.map(a => a + 1)
		.map(a => a + 1)
		.filter(a => a % 2);
};

console.time('map+filter');
f(list);
console.timeEnd('map+filter');
// map+filter: 5832.8291015625ms

// 2단계
const magic = f => list => list.flatMap(x => f([x]));
const f = list =>
	list
		.map(a => a + 1)
		.map(a => a + 1)
		.filter(a => a % 2);
const f2 = magic(f);

console.time('map+filter+flatMap');
f2(list);
console.timeEnd('map+filter+flatMap');
// map+filter+flatMap: 3426.182861328125ms

// 3단계
const magic = f => list => list.flatMap(x => f([x]));
const f = list =>
	list
		.map(a => a + 1)
		.map(a => a + 1)
		.filter(a => a % 2);
const f2 = magic(f);

Array.prototype.flatMap = function(f) {
	var i = -1,
		tl = this.length,
		res = [],
		b,
		j,
		bl;
	while (++i < tl) {
		if (Array.isArray((b = f(this[i], i, this)))) {
			(j = -1), (bl = b.length);
			while (++j < bl) res.push(b[j]);
		} else res.push(b);
	}
	return res;
};

console.time('map+filter+custom flatMap');
f2(list);
console.timeEnd('map+filter+custom flatMap');
// map+filter+custom flatMap: 2705.951904296875ms
```

## 참고

- [Array](https://peter-cho.gitbook.io/book/10/one-piece/array)
