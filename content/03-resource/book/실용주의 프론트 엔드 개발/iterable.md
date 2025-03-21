---
title: Iterable
date: 2020-05-03 18:05:64
category: 실용주의 프론트 엔드 개발
draft: true
---

## from

```javascript
const from = iter => Array.from(iter);

const map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

from(map);
// [['a', 1], ['b', 2], ['c', 3]]
```

## join

```javascript
const join = (sep, iter) => Array.from(iter).join(sep);

join('&', ['a=1', 'c=CC', 'd=DD']); // a=1&c=CC&d=DD
join('&', new Set(['a=1', 'c=CC', 'd=DD'])); // a=1&c=CC&d=DD
```

## fromEntries

```javascript
// map + reduce
const fromEntries = iter =>
	Array.from(iter)
		.map(([k, v]) => ({ [k]: v }))
		.reduce((acc, obj) => Object.assign(acc, obj));

// reduce
const fromEntries = iter =>
	Array.from(iter).reduce((obj, [k, v]) => {
		return Object.assign(obj, { [k]: v });
	}, {});

const map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);
fromEntries(map); // {a: 1, b: 2, c: 3}

const arr = [
	['a', 1],
	['b', 2],
	['c', 3],
];
fromEntries(arr); // {a: 1, b: 2, c: 3}
```

## 참고

- [Iterable](https://peter-cho.gitbook.io/book/10/one-piece/iterable)
