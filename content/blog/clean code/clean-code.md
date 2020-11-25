---
title: clean code
date: 2020-11-22 17:11:61
category: clean code
tags: []
draft: true
---

## 간단한 설계 규착(우선순위) : 켄트백

1. 테스트를 통과할 것(상)

- 테스트 코드는 자신의 코드가 어떤 동작을 해야 하는지 명확하도록 도와줌
- 테스트 코드를 통과하는 모듈을 작성하는 것은 TDD가 아니더라도 필요
- 테스트가 가능하고 테스트가 쉬운 구조가 (못하는것보다는) 좋은 구조

2. 의도를 드러낼 것(중)

- 변수이름, 함수이름, 크랠스이름에서도 의도를 표현
- private인지 public인지 선언한 속성에 대해서도 명확한 의도가 있어야함

3. 중복을 제거할 것(중)

- 중복된 코드가 보이면 메소드를 분리하거나 타입을 분리하거나 객체를 분리해서 중복을 제거
- 메소드 인터페이스가 동일하면 프로토콜을 활용하고, 구현 내용은 같고 타입만 다르면 제네릭을 활용

4. 구성 요소를 최소화 할 것(하)

- 함수의 매개변수, 객체의 속성이나 메소드도 꼭 필요한 경우에 추가
- 명확한 역할이 없는 요소는 존재 의미도 없는 경우가 많다. 의도를 다시 한 번 고려해보세요

## 1. 의도를 명확하게 표현한다(함수명, 변수명, 공백, 줄간격)

- 잘못된 정보를 피하라
- 의미있게 구분하라
- 찾기 쉬운 단어를 사용하라
- 인코딩을 피하라
- 자신의 기억력을 자랑하지 마라
- 한 개념은 한 단어만 사용하라
- 기발한 이름보다 쉬운 이름을 선택하라

## 2. 하나의 책임을 갖는다(함수, 객체, 모듈)

- 작게 만들어라
- 블록과 들여쓰기를 최소화하라
- 한 가지만 해라
- 함수 내 추상화 수준은 하나로
- 순수 함수로 만들어라
- 명령과 조회를 분리하라
- 오류코드보다 예외를 사용하라
- 반복하지마라

## 3. 주석은 나쁜 코드를 보완하지 못한다

- 코드로 의도를 표현하라
- 좋은 주석은 필요한 내용을 포함한다
  - 법적인 내용, 정보를 제공, 의도를 설명, 결과를 경고, 중요성을 강조
- 나쁜 주석은 없는게 버리자
  - 부정확하거나, 오해할 여지가 있거나, 의무적으로 같은 이야기를 중복하거나
  - 위치를 표시하거나, 닫는 괄호에 표시, 주석으로 처리한 코드
  - 너무 많은 정보, 모호한 관계, 이력을 기록하는 경우

## 4. 객체 속성으로 가져오지 말고 [SOLID]() 객체가 일하도록 시켜라.

## 5. 가변 컴포넌트와 불변 컴포넌트를 분리하자.

- 순수함수와 불변 객체

## 6. [GRASP]() 패턴

- 9가지 규칙