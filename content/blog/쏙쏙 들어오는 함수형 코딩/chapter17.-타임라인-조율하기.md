---
title: CHAPTER17. 타임라인 조율하기
date: 2023-04-21 10:04:52
category: 쏙쏙 들어오는 함수형 코딩
tags: ['PART II 일급 추상']
draft: true
---

## 이번 장에서 살펴볼 내용

- 타임라인을 조율하기 위한 동시성 기본형을 만들어 봅니다.
- 시간에 관한 중요한 관점인 순서와 반복을 개발자들이 어떻게 다루는지 배웁니다.

## 코드에 Cut() 적용하기

```js
function calc_cart_total(cart, callback) {
  let total = 0;
  let done = Cut(2, function () {
    callback(total);
  });
  cost_ajax(cart, function (cost) {
    total += cost;
    done();
  });
  shipping_ajax(cart, function (shipping) {
    total += shipping;
    done();
  });
}
```

## 복잡성

- 비동기 웹 요청
- 결과를 합쳐야 하는 두 개의 API 응답
- 예측 불가능한 사용자의 액션

## 한번만 실행

- 최초 한 번만 효과가 발생하는 액션을 `멱등원(idempotent)`이라고 합니다.

```js
function JesuOnce(action) {
  let alreadyCalled = false;
  return function (a, b, c) {
    if (alreadyCalled) return;
    alreadyCalled = true;

    return action(a, b, c);
  };
}
```

## 암묵적 시간 모델 vs 명시적 시간 모델

1. 순차적 구문은 순서대로 실행됩니다.
2. 두 타임라인에 있는 단계는 왼쪽 먼저 실행되거나, 오른쪽 먼저 실행될 수 있습니다.
3. 비동기 이벤트는 새로운 타임라인에서 실행됩니다.
4. 액션은 호출할 때마다 실행됩니다.

## 요약: 타임라인 사용하기

- 타임라은 수를 줄입니다.
- 타임라인 길이를 줄입니다.
- 공유 자원을 없앱니다.
- 동시성 기본형으로 자원을 공유합니다.
- 동시성 기본형으로 조율합니다.

## 요점 정리

- 함수형 개발자는 언어가 제공하는 암묵적 시간 모델 대신 새로운 시간 모델을 만들어 사용합니다. 새로운 모델은 해결하려고 하는 문제를 푸는 데 도움이 됩니다.
- 명시적 시간 모델은 종종 일급 값으로 만듭니다. 일급 값으로 만든 시간 모델은 프로그래밍 언어를 사용해서 시간을 다룰 수 있습니다.
- 타임라인을 조율하기 위해 동시성 기본형을 만들 수 있습니다. 가능한 순서를 제한해 항상 올바른 결과가 나올 수 있도록 보장합니다.
- 타임라인을 나누는 것도 타임라은을 조율한느 방법 중 하나입니다. 컷은 모든 타임라인의 작업이 끝날 때까지 기다렸다가 새로운 타임라인을 시작할 수 있도록 합니다.

---

## 참고

- [쏙쏙 들어오는 함수형 코딩](https://product.kyobobook.co.kr/detail/S000001952246)
