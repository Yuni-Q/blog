---
title: CHAPTER11. 일급함수 2
date: 2023-03-13 10:03:95
category: 쏙쏙 들어오는 함수형 코딩
tags: ['PART II 일급 추상']
draft: true
---

## 이번 장에서 살펴볼 내용

- 함수 본문을 콜배긍로 바구기 리팩터링에 대해 더 알아봅니다.
- 함수를 리턴하는 함수가 가진 강력한 힘을 이해합니다.
- 고차 함수에 익숙해지기 위해 여러 고차 함수를 만들어 봅니다.

## 배열에 대한 카피-온-라이트 리팩터링

```js
// 리팩터링 전
function arraySet(array, idx, value) {
  const copy = array.slice();
  copy[idx] = value;
  return copy;
}

// 리팩터링 후
function arraySet(array, idx, value) {
  return withArrayCopy(array, function (copy) {
    copy[idx] = value;
  });
}

function withArrayCopy(array, modify) {
  const copy = array.slice();
  modify(copy);
  return copy;
}
```

### 리팩터링으로 얻은 것

1. 표준화된 원칙
2. 새로운 동작에 원칙을 적용 할 수 있음.
3. 여러 개를 변경할 때 최적화

## 함수를 리턴하는 함수

- 함수를 리턴하는 함수는 함수 팩토리(factory)와 같습니다.

## 요점 정리

- 고차 함수로 패턴이나 원칙을 코드로 만들 수 있습니다. 고차 함수를 사용하지 않는다면 일일이 수작업을 해야 합니다. 고차 함수는 한번 정의하고 필요한 곳에 여러 번 사용할 수 있습니다.
- 고차 함수로 함수를 리턴하는 함수를 만들 수 있습니다. 리턴 받은 함수는 변수에 할당해서 이름이 있는 일반 함수처럼 쓸 수 있습니다.
- 고차 함수를 사용하면서 잃는 것도 있습니다. 고차 함수는 많은 중복 코드를 없애 주지만 가독성을 해칠 수도 있습니다. 잘 익혀서 적절한 곳에 써야 합니다.

---

## 참고

- [쏙쏙 들어오는 함수형 코딩](https://product.kyobobook.co.kr/detail/S000001952246)
