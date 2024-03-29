---
title: CHAPTER2. 현실에서의 함수형 사고
date: 2023-02-17 00:02:44
category: 쏙쏙 들어오는 함수형 코딩
tags: ['PART I 액션과 계산, 데이터']
draft: true
---

## 이번장에서살펴볼내용

- 현실적인 문제에 함수형 사고를 적용해 봅니다.
- 소프트웨어 구조를 잡는 데 계층헝 설계가 좋은 이유를 설명합니다.
- 액션을 타임라인으로 시각화해 봅니다.
- 타임라인을 사용하면 시간에 관한 문제를 잘 풀 수 있다는 것을 배웁니다.

## 토니 피자에 오신 것을 환영합니다.

- 계층형 설계(stratified design) 원칙이 어떤 것인지 알아봅시다.
- 타임라인 다이어그램에 대해서 살펴보겠습니다.

## 파트 1: 액션과 계산, 데이터

- 파트 1이 끝나면 액션과 계산을 구분하고 액션과 계산을 자유롭게 옮길 수 있을 것입니다.

## 변경 가능성에 따라 코드 나누기

### 계층화 설계 맛보기

- 먼저 변경 가능성에 따라 코드를 나눠 봅시다. 위쪽으로 갈수록 자주 바뀌는 코드가 있고 아래쪽으로 갈수록 자주 바뀌지 않는 코드가 있습니다.
- 계층형 설계는 일반적으로 비즈니스 규칙, 도메인 규칙, 기술 스택 계층으로 나둡니다.
- 계층형 설계로 만든 코드는 태스트, 재사용, 유지보수가 쉽습니다.

## 파트 2: 일급 추상

- 타임라인 다이어그램을 사용하면 액션이 시간 순서에 따라 어떻게 실행되는지 볼 수 있습니다.
  - 액션은 실행시점에 의존하기 때문에 실행순서가 중요하다는 것을 잊지마세요.

## 분산 시스템을 타임라인으로 시각화하기

## 각각의 타임라인은 다른 순서로 실행됩니다

- 타임라인을 서로 맞추지 않은 분산 시스템은 예측 불가능한 순서로 실행됩니다.

## 어려운 경험을 통해 분산 시스템에 대해 배운 것

- 기본적으로 타임라인은 서로 순서를 맞추지 않습니다.
- 액션이 실행되는 시간은 중요하지 않습니다.
- 드물지만 타이밍이 어긋나는 경우는 실제 일어납니다.
- 타임라인 다이어그램으로 시스템의 문제를 알 수 있습니다.

## 타임라인 커팅: 로봇이 서로를 기다릴 수 있게 하기

- 타임라인 커팅은 고차 동작(high-order operation)으로 구현합니다.
  - 각 타임라인은 독립적으로 동작하고 작업이 완료되면 다른 타임라인 끝나기를 기다리기 때문에 어떤 타임라인이 먼저 끝나도 괜찮습니다.
  - Promise.all 같다.

## 좋은 경험을 통해 타임라인에 대해 배운 것

- 타임라인 커팅으로 서로 다른 작업들을 쉽게 이해 할 수 있습니다.
- 타임라인 다이어그램을 사용하면 시간에 따라 진행하는 작업을 쉽게 이해할 수있습니다.
- 타임라인 다이어그램은 유연합니다.

## 결론

- 유지보수 비용을 줄이기 위해 액션과 계산에 계층화 설계를 사용했습니다.

## 요점 정리

- 액션과 계산, 데이터를 구분하는 일은 함수형 프로그래머에게 가장 중요하고 첫 번째로 해야 하는 일입니다. 우리도 코드를 이런 식으로 구분하는 법을 배워야 합니다. 3장에서 액션과 계산, 데이터에 대해 다루면서 구분하는 방법을 배워 봅시다.
- 함수형 프로그래머는 유지보수를 잘 하기 위해 계층형 설계를 사용합니다. 각 계층은 코드의 변경 가능성에 따라 나눔니다. 계층형 설계는 8장과 9장에서 배읍니다.
- 타임라인 다이어그램은 시간에 따라 변하는 액션을 시각화하는 방법입니다. 타임라인 다이어그램으로 액션이 다른 액션과 어떻게 연결되는지 볼 수 있습니다. 타임라인 다이어그램을 그리는 방법은 15장에서 배읍니다.
- 액션 간 협력을 위해 타임라인 커팅이라는 기술을 살펴봤습니다. 타임라인 커팅은 액션이 올바른 순서로 실행할 수 있도록 보장해 줍니다. 17장에서 토니의 피자 주방과 비슷한 이야기를 통해 타임 라인 커팅에 대해 배워 봅시다.

---

## 참고

- [쏙쏙 들어오는 함수형 코딩](https://product.kyobobook.co.kr/detail/S000001952246)
