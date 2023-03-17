---
title: CHAPTER14. 중첩된 데이터에 함수형 도구 사용하기
date: 2023-03-15 15:03:40
category: 쏙쏙 들어오는 함수형 코딩
tags: ['PART II 일급 추상']
draft: true
---

## 이번 장에서 살펴볼 내용

- 해시 맵에 저장된 값을 다루기 위한 고차 함수를 만듭니다.
- 중첩된 데이터를 고차 함수로 수비게 다루는 방법을 배웁니다.
- 재귀를 이해하고 안전하기 재귀를 사용하는 방법을 살펴봅니다.
- 깊이 중첩된 엔티티에 추상화 벽을 적용해서 얻을 수 있는 장점을 이해합니다.

## 필드명을 명시적으로 만들기

- 함수 이름에 있는 암묵적 인자를 암묵적 인자를 드러내기 리팩터링으로 앲앱니다. 리팩터링 후에도 increment, decrement, double, halve처럼 비슷한 동작이 있으 수 있스빈다. 목적은 다르지만 비슷한 동작을 합니다. 여기에도 암묵적 인자를 드러내기 리팩터링을 적용합니다.

## 리팩터링: 조회하고 변경하고 설정하는 것을 update로 교체하기

### nestedUpdate

```js
function nestedUpdate(object, keys, modify) {
  if (keys.length === 0) modify(object);
  const [key1, nestOfKeys] = keys;
  return update(object, key1, function (value1) {
    return nestedUpdate(object, nestOfKeys, modify);
  });
}
```
