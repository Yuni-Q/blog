---
title: 영속 자료 구조(Persistent Data Structures)
date: 2020-05-03 17:05:54
category: 실용주의 프론트 엔드 개발
draft: true
---

## 불변 자료 구조 - Immutable Data Structures

- 불변 자료 구조는 영원히 변하지 않는 상태를 말합니다.
- 변화가 필요할 때 새로운 상태를 만들어 내고 값을 변경합니다.
- 이전 상태는 사용하지 않으면 메모리 상에서 제거됩니다.

### clone을 사용한 예시

- 모두 새롭게 만들기 때문에 inner도 다른 객체가 됩니다.

```javascript
const clone = obj => JSON.parse(JSON.stringify(obj));

const obj = {
	message: 'Hello World',
	inner: { count: 1 },
};
const clonedObj = Object.assign(clone(obj), {
	message: 'Hello',
});

console.log(obj === clonedObj); // false
console.log(obj.inner === clonedObj.inner); // false
```

## 영속 자료 구조 - Pesistent Data Structures

- 영속성(지속성)은 상태를 제거하지 않고 보존하는 것을 의미합니다.
- 영속 자료 구조는 상태에 변화가 필요할 때 새로운 상태를 반환하지만 이전 상태를 계속 유지하고 있는 자료구조입니다. 다시 상태 변화가 필요한 시점에 이전에 만들었던 상태와 동일하면 이전 상태를 사용합니다.
- 상태를 제거하지 않고 재사용하며 변화가 필요할 때는 새로 만들기 때문에 메모리 효율성과 불변성을 가질 수 있습니다.
- 영속 자료 구조를 사용하면 메모리 효율성이 비교적 떨어지는 불변 자료 구조의 단점을 해결할 수 있습니다.

## 참고

- [영속 자료 구조(Persistent Data Structures)](https://peter-cho.gitbook.io/book/10/persistent-data-structures)
