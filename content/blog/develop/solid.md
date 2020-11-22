---
title: SOLID
date: 2020-11-22 17:11:90
category: develop
tags: []
draft: true
---

## SRP(Single-Responsibility Principle)

- 소프트웨어 요소(모듈, 클래스, 함수 등)는 응집도 있는 하나의 책임을 가집니다.
- 클래스를 변경해야 하는 이유는 응집도 때문이어야 합니다.

## OCP(Open-Close Principle)

- 소프트웨어 요소는 확장 가능하도록 열려있고, 변경에는 닫혀 있어야 합니다.
- 새 기능을 추가할 때 변경하지 말고 새 클래스나 함수를 만들어서 변경하는 부분을 최소화합니다.

## LSP(Liskov Substitution Principle)

- 서브타입은(상속받은) 기본 타입으로 대체가능해야 합니다.
- 자식 클래스는 부모 클래스 동작(의미)를 바꾸지 않습니다.

## DIP(Dependency-Inversion Principle)

- 상위레벨 모듈은 하위레벨 모듈에 의존하면 안됩니다.(둘 다 추상화 된 인터페이스에 의존해야 합니다)
- 추상화는 구체화에 의존하면 안되고, 구체화는 추상화에 의존해야 합니다.

## ISP(Interface-Segregation Principle)

- 클라이언트 객체는 사용하지 않는 (인터페이스) 메소드에 의존하면 안 됩니다.
