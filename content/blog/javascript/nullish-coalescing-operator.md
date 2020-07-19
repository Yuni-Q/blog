---
title: nullish coalescing operator
date: 2020-07-09 09:07:84
category: javascript
draft: true
---

- 자바스크립트에서는 0, '', false, undefined, null을 모두 falsy값으로 처리합니다. if나 삼항 연산자에 falsy값을 넣을 경우 false로 처리합니다.
- 0, '', false와 null, undefined를 구분하고 싶다면 nullish coalescing operator를 사용합니다.

```javascript
let a = 0;
let b = a || 2;
console.log(b); // 2

a = '';
b = a || 2;
console.log(b); // 2

a = false;
b = a || 2;
console.log(b); // 2

a = undefined;
b = a || 2;
console.log(b); // 2

a = null;
b = a || 2;
console.log(b); // 2
```

```javascript
let a = 0;
let b = a ?? 2;
console.log(b); // 0

a = '';
b = a ?? 2;
console.log(b); // ''

a = false;
b = a ?? 2;
console.log(b); // false

a = undefined;
b = a ?? 2;
console.log(b); // 2

a = null;
b = a ?? 2;
console.log(b); // 2
```
