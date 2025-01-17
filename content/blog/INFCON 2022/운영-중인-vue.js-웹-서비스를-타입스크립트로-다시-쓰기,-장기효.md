---
title: 운영 중인 Vue.js 웹 서비스를 타입스크립트로 다시 쓰기, 장기효
date: 2022-10-03 01:10:20
category: infcon 2022
tags: []
draft: true
---

## 왜 타입스크립트를 도입했나?

- 컴포넌트 설계
- 서비스 특징
- 데이터 흐름
- API 문서
- 개발 환경

## 현실

### 안정성

- 잘 돌아가는 서비스는 건드리지 않는게 좋다
- 오랜 기간을 거쳐 안정성을 확보한 서비스와 기능을 건드리는 건 위험하다

### 학습 비용

- TS를 아는 사람의 수
- 팀 전체의 학습 비용

### 테스팅

- 기능을 보장할 수 있는 테스트 코드의 유무

## 코드 생산 비용

## 지속 가능성

- 서비스의 변경 사항을 안전하게 처리할 수 있다면 그 코드는 지속 가능하다(톰 맨쉬렉)

## 전략

- JSDoc
  - JSDoc이란 일정한 형식ㄷ으로 코드에 설명을 추가하는 주석
  - API 함수와 주요 비즈니스 로직이 담긴 함수에 먼저 적용
- 컴포넌트 부분 부분 갈아끼우기
  - 컴포넌트 간 결합도가 낮은 단위 컴포넌트 위주로 먼저 포팅 작업
- 가성비 안나오면 그냥 allowJS

## 설계 원칙 5가지

- 컴포넌트 <-> API 레이어의 데이터 흐름 단순화
  - 데이터를 받아와 화면에 뿌리기까지의 레이어 단순화
- Reactivity는 필요한 곳에만
- 덩어리가 큰 모듈은 컴포넌트보다 클래스로
  - 화면단 코드와 직접적인 연관이 있는 코드인가?
- 불필요한 전역 상태는 줄이고 state는 화면과 가깝게 배치
  - 스토어에 꼭 들어가야 하는 상태인가?
  - data는 항상 사용하는 곳과 가장 가깝게 배치
- 제약이 없는 믹스인은 죄악이다
  - 제한된 규칙으로 사용해야 효과가 증대되는 믹스인
  - 믹스인 대신 컴포지션 API(리액트 훅)을 사용

## 결과

- 코드 가독성 향상
- 에러의 사전 검출
- 기능 향상
