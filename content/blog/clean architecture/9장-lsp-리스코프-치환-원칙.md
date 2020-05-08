---
title: 9장 LSP 리스코프 치환 원칙
date: 2020-05-04 12:05:10
category: clean architecture
draft: false
---

## LSP: 리스코프 치환 원칙 (Liskov Substitution Principle)

- S타입의 객체 o1 각각에 대응하는 T타입 객체 o2가 있고, T타입을 이용해서 정의한 모든 프로그램 P에 o2의 자리에 o1을 치환하더라도 P의 행위가 변하지 않는다면, S는 T의 하위타입 입니다.
- LSP는 아키텍처 수준까지 확장할 수 있고, 반드시 확장 해야만 합니다. 치환 가능성을 조금이라도 위배하면 시스템 아키텍처가 오염되어 상당량의 별도 메커니즘을 추가해야 할 수 있기 때문입니다.

## 참고

- [9장 LSP 리스코프 치환 원칙](https://peter-cho.gitbook.io/book/11/clean-architecture/9-lsp)
