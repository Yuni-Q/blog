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

## 반복문을 함수형 도구로 리팩터링 하기

- 전략 1: 이해하고 다시 만들기
- 전략 2: 단서를 찾아 리팩터링
- 팁 1: 데이터 만들기
- 팁 2: 한 번에 전체 배열을 조작하기
- 팁 3: 작은 단계로 나누기

### 절차적 코드와 함수형 코드 비교

```js
// 절차적인 원래 코드
const answer = [];
const window = 5;

for (let i = 0; i < array.length; i++) {
  let sum = 0;
  let count = 0;
  for (let w = 0; w < window; w++) {
    const idx = i + w;
    if (idx < array.length) {
      sum += array[idx];
      count += 1;
    }
  }
  answer.push(sum / count);
}

// 함수형 도구를 사용한 코드
const window = 5;

const indices = range(0, array.length);
const windows = map(indices, function (i) {
  return array.slice(i, i + window);
});
const answer = map(windows, average);
```

## 체이닝 팁 요약

- 데이터 만들기
- 배열 전체를 다루기
- 작은 단계로 나누기
- 보너스
  - 조건을 filter로 바꾸기
  - 유용한 함수로 추출하기
  - 개선을 위해 실험하기

## 채이닝 디버깅을 위한 팁

- 구체적인 것을 유지하기
- 출력해보기
- 타입을 따라가 보기

## 다양한 함수형 도구

- pluck: 특정 필드명을 가져옵니다.
- concat: 배열을 한 단계의 배열로 만듭니다.
- frequenciesBy, groupBy: 개수를 세거나 그룹화 하는 일을 합니다. 객체 또는 맵을 리턴합니다.

## 값을 만들기 위한 reduce

- reduce로 값을 요약하는 방법으로 많이 사용했습니다. 컬렉션 데이터를 받아 모든 항목을 하나의 값으로 만들었습니다.
- reduce는 값을 만들는 용도로도 사용할 수 있습니다.

## 요점 정리

- 함수형 도구는 여러 단계의 체인으로 조합할 수 있습니다. 함수형 도구를 체인으로 조합하면 복잡한 계산을 작고 명확한 단계로 표현할 수 있습니다.
- 함수형 도구를 체인으로 조합하는 것은 SQL 같은 쿼리 언어로 볼 수 있습니다. 함수형 도구 체인으로 배열을 다루는 복잡한 쿼리를 표현할 수 있습니다.
- 종종 체인의 다음 단계를 위해 새로운 데이터를 만들거나 기존 데이터를 인자로 사용해야 하는 일이 있습니다. 최대한 암묵적인 정보를 명시적으로 표현하는 방법을 찾아야 합니다.
- 함수형 도구는 더 많이 있습니다. 여러분의 코드를 리팩터링 하면서 새로운 함수형 도구를 찾거나 다른 언어에서 영감을 받을 수 있습니다.
- 자바처럼 전통적으로 함수형 언어가 아닌 언어들도 나름의 방법으로 함수형 도구를 지원하고 있습니다. 언어에 맞는 방법을 찾아 함수형 도구를 사용하세요.

---

## 참고

- [쏙쏙 들어오는 함수형 코딩](https://product.kyobobook.co.kr/detail/S000001952246)
