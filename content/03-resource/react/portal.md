---
title: Portal
date: 2021-09-04 18:09:48
category: react
tags: ['react']
draft: true
---

## Portal 이란?

- ReactDom의 Portal 기능은 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링 하는 기능을 제공합니다. 즉 외부에 존재하는 DOM 노드가 React App DOM 계층 안에 존재하는 것처럼 연결을 해주는 포탈 기능을 제공합니다.

## Portal vs Render

### 공통점

- 특정 dom component를 렌더링

### 차이점

| -        | Portal            | Render                              |
| -------- | ----------------- | ----------------------------------- |
| 호출위치 | React Render 내부 | 어디서든 상관 없이 함수로 호출 가능 |

|
|LifeCycle|호출위치의 하위 컴포넌트로 관리|새로운 최상위 component 으로 생성됨
|
|unMount|LifeCycle에 의해 자동으로 unMount 됨|직접 ReactDom.unmountComponentAtNode() 함수를 사용 하여 관리
|
|event|실제 렌더링 위치는 다르지만 부모 component의 하위 dom처럼 동작함 (버블링, 캡쳐링 발생) |최상위 component 로써 동작
|
|일반적인 활용처|특정 Component를 부모 외부에 Rendering 하려고 할 때 |React App를 새롭게 생성 할 때
|
