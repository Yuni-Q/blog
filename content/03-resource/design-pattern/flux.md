---
title: Flux
date: 2020-07-23 09:07:53
category: design pattern
draft: true
---

## 제작목적

- 대형 MVC 어플리케이션에서 나타나는 데이터 간의 의존성과 연쇄적인 갱신에서 발생되는 예측하기 힘든 데이터 흐름을 올바르게 다루기 위해 탄생했습니다.

## 특징

- Actions, Dispatcher, Stores, Views로 구성되며 각 부분들은 단방향으로만 데이터가 흐릅니다.
- Action은 사용자의 상호작용와 서버 상호작용 등이 될 수 있으며 type 프로퍼티에 역할을 지정합니다.
- Dispatcher는 모든 Action을 받으며, Stores가 콜백들 등록할 수 있습니다.
- Stores는 데이터와 비즈니스 로직을 담당하고 Views가 변경감시를 할 수 있도록 제공합니다.
- Controller-Views-Views 형태를 이루고, Store에게 데이터를 가져와 View를 갱신합니다.

## 참조

- [MVC? 싱글톤? 여러가지 디자인 패턴들](https://blog.metafor.kr/146)
- [MV\*/Flux 정리](https://chodragon9.github.io/blog/mv_flux/#mvc)
