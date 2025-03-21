---
title: CHAPTER16. 타임라인 사이에 자원 공유하기
date: 2023-04-21 10:04:16
category: 쏙쏙 들어오는 함수형 코딩
tags: ['PART II 일급 추상']
draft: true
---

## 이번 장에서 살펴볼 내용

- 자원을 공유해서 생기는버그를 찾는 방법을 배웁니다.
- 안전하게 자원을 공유할 수 있는 자우너 공유 기본형을 만드는 방법을 이해합니다.

## 좋은 타임라인 원칙

1. 타임라인은 적을수록 이해하기 쉽습니다.
2. 타임라인은 짧을수록 이햐하기 쉽습니다.
3. 공유하는 자원이 적을수록 이해하기 쉽습니다.
4. 자원을 공유한다면 서로 조율해야 합니다.
5. 시간을 일급으로 다룹니다.

## Queue는 액션에 새로운 능력을 줄 수 있는 고차 함수입니다.

- Queue는 어떤 함수를 새로운 타임라인에서 실행하고 한 번에 한 타임라인만 실행할 수 있도록 만들어주는 고차 함수입니다.
  - 순서 보장(guaranteeing order)
  - 동시성 기본형(concurrency primitive)

```js
function Queue(worker) {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;
    if (queue_items.length === 0) return;

    working = true;
    const item = queue_items.shift();

    worker(item.data, function (val) {
      working = false;
      setTimeout(item.callback, 0, val);
      runNext();
    });
  }

  return function ({ data, callback }) {
    queue_items.push({ data, callback: callback || function () {} });
    setTimeout(runNext, 0);
  };
}

function calc_cart_worker(cart, done) {
  calc_cart_total(cart, function (total) {
    update_total_dom(total);
    done(total);
  });
}

const update_total_queue = Queue(calc_cart_worker);
```

## 원칙: 공유하는 방법을 현실에서 착안하기

- 사람들이 지원을 공유하기 위해 줄을 서는 것을 보고 큐를 만들었습니다.

## 원칙: 문제가 있을 것 같으면 타임라인 다이어그램을 살펴보세요.

- 타임라인 다이어그램의 가장 큰 장점은 타이밍 문제를 명확히 보여준다는 것입니다.

## 마지막 결과만 필요해

```js
function DroppingQueue(max, worker) {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;
    if (queue_items.length === 0) return;

    working = true;
    const item = queue_items.shift();

    worker(item.data, function (val) {
      working = false;
      setTimeout(item.callback, 0, val);
      runNext();
    });
  }

  return function ({ data, callback }) {
    queue_items.push({ data, callback: callback || function () {} });

    while (queue_items.length > max) queue_items.shift();

    setTimeout(runNext, 0);
  };
}

function calc_cart_worker(cart, done) {
  calc_cart_total(cart, function (total) {
    update_total_dom(total);
    done(total);
  });
}

const update_total_queue = DroppingQueue(1, calc_cart_worker);
```

## 요점 정리

- 타이밍 문제는 재현이 어렵고, 테스트로 확인하지 못할 수 있습니다. 타임라인 다이어그램을 그려 분석하고 타이밍 문제를 확인해 보세요.
- 자원 공유 문제가 있을 때 현실에서 해결 방법을 찾아보세요. 사람들은 항상 무엇인가를 문제없이 공유합니다. 사람을 통해 배우세요.
- 재사용 가능한 도구를 만들면 자원 공유에 도움이 됩니다. 자원 공유를 위한 도구를 동시성 기본형이라고 부릅니다. 동시성 기본형을 사용하면 코드가 더 깨끗하고 단순해집니다.
- 동시성 기본형은 액션을 고차 함수로 받습니다. 이 고차 함수는 액션에 슈퍼 파워를 줍니다.
- 동시성 기본형은 스스로 만들이 어렵지 않습니다. 작은 단계부터 시작해 리팩터링 하면서 스스로 만들 수 있습니다.

---

## 참고

- [쏙쏙 들어오는 함수형 코딩](https://product.kyobobook.co.kr/detail/S000001952246)
