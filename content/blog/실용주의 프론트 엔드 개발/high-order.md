---
title: High Order
date: 2020-05-03 18:05:56
category: 실용주의 프론트 엔드 개발
draft: false
---

## curry

```javascript
const curry1 = fn => arg => fn(arg);

parseInt('11'); // => 11
parseInt('11', 2); // => 3

['11', '11', '11'].map(parseInt); // [11, NaN, 3]

['11', '11', '11'].map(curry1(parseInt)); // [11, 11, 11]
```

```javascript
const curry2 = fn => arg1 => arg2 => fn(arg1, arg2);

const map = curry2((fn, arr) => arr.map(fn));
map(v => v * 10)([1, 2, 3]);
// [10, 20, 30]
```

## plucker

```javascript
const plucker = field => obj => obj && obj[field];

const best = { title: '인피니티워', author: 'Peter' };
const books = [
	{ title: '스파이더맨' },
	{ title: '아이언맨' },
	{ title: '토르' },
];

const extractTitle = plucker('title');
const extractThird = plucker(2);

extractTitle(best); // '인피니티워'
extractThird(books); // {title: '토르'}
```

## partial

```javascript
const partial = (fn, ...arg1) => (...arg2) => fn(...arg1, ...arg2);

const add = (a, b) => a + b;
const add10 = partial(add, 10);
add10(5); // 15

const addAll = (a, b, c, d) => a + b + c + d;
const addTwo = partial(addAll, 10, 10);
addTwo(5, 5); // 30
```

## pipe

```javascript
const pipe = (fn, ...fns) => (...arg) => {
	return fns.reduce((acc, fn) => fn(acc), fn(...arg));
};

pipe(
	v => v * 10,
	v => `${v}%`,
	console.log
)(10);
// 100%
```

## always

```javascript
const always = v => _ => v;

const five = always(5);
console.log(five()); // 5
```

## switchCase

- switch...case문을 함수형으로 다루는 방법은 3가지가 있습니다.

### Function

- 함수로 구현하는 방법이 있지만 switchCase, case와 의존이 생기는 방식임으로 권하고 싶은 방식은 아닙니다.

```javascript
switchCase(
  case(10, () => 100)
  case(11, () => 110)
)(10)
```

### Array

- 2차원 배열에서 첫번째 아이템은 case를 두번째 아이템은 case가 일치할 때 평가할 함수를 작성합니다.

```javascript
const switchCase = (...cases) => val => {
	return cases
		.filter(([key]) => key === val)
		.map(([key, fn]) => fn(key))
		.pop();
};

const switchBtn = switchCase(
	['a', v => v.repeat(3)],
	['b', v => v.repeat(4)],
	['c', v => v.repeat(5)]
);

switchBtn('a'); // aaa
switchBtn('b'); // bbbb
switchBtn('c'); // ccccc
```

## Object

- 조건문을 없애는 방법과 유사한 방법입니다. 결국 케이스별로 데이터셋을 만들어두는 것입니다. 케이스별로 데이터셋이 있으면 key를 통해 조회하여 해당 value에 할당된 함수를 평가합니다.

```javascript
const switchCase = caseObj => val => caseObj[val] && caseObj[val](val);

const switchBtn = switchCase({
	a: v => v.repeat(3),
	b: v => v.repeat(4),
	c: v => v.repeat(5),
});

switchBtn('a'); // aaa
switchBtn('b'); // bbbb
switchBtn('c'); // ccccc
switchBtn('d'); // undefined
```

## 참고

- [High Order](https://peter-cho.gitbook.io/book/10/one-piece/high-order)
