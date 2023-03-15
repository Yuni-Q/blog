---
title: CHAPTER13. 함수형 도구 체이닝
date: 2023-03-14 22:03:53
category: 쏙쏙 들어오는 함수형 코딩
tags: ['PART II 일급 추상']
draft: true
---

## 이번 장에서 살펴볼 내용

- 복합적인 쿼리로 데이터를 조회하기 위해 함수형 도구를 조합하는 방법을 배웁니다.
- 복잡한 반복문을 함수형 도구 체인으로 바꾸는 방법을 이해합니다.
- 데이터 변환 파이프라인을 만들어 작업을 수행하는 작업을 수행하는 방법을 배웁니다.

## 체인을 명확하게 만들기: 두 방법을 비교

```js
// 방법 1: 단계에 이름 붙이기
function biggestPurchasesBestCustomers(costumers) {
  const bestCustomers = selectBestCustomers(costumers);
  const biggestPurchases = getBiggestPurchases(bestCustomers);
  return biggestPurchases;
}

// 방법 2: 콜백에 이름 붙이기
function biggestPurchasesBestCustomers(costumers) {
  const bestCustomers = filter(costumers, isGooCustomer);
  const biggestPurchases = map(bestCustomers, getBiggestPurchases);
  return biggestPurchases;
}
```

- 일반적으로 두 번째 방법이 더 명확합니다. 그리고 고차 함수를 그대로 쓰는 첫 번째 방법보다 이름을 붙인 두 번째 방법이 재사용하기도 더 좋습니다. 인라인 대신 이름을 붙여 콜백을 사용하면 단계가 중첩되는 것도 막을 수 있습니다.
- map, filter, reduce 체인을 최적화하는 것을 `스트림 결합(stream fusion)`이라고 합니다.
  - 최적화는 병목이 생겼을 때만 쓰는 것이 좋고 대부분의 경우에는 여러 단계를 사용하느 것이 더 명확하고 읽기 쉽습니다.

```js
const goodCustomer = filter(customers, isGoodCustomer);
const withAddress = filter(goodCustomer, hasAddress);

// 최적화
const withAddress = filter(customers, function (customer) {
  return isGoodCustomer(customer) && hasAddress(customer);
});
```
