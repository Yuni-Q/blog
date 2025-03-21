---
title: React와 함께 진화하는 GraphQL 클라이언트 Relay
date: 2023-04-16 16:04:53
category: develop
tags: []
draft: true
---

## 릴레이가 무엇인가

- 릴레이란 리액트와 조합하여 그래프큐엘 서버와 통신하기 위한 클라이언트 라이브러리입니다.
- 리액트와 같은 메타에서 개발하고 있다는 것이 특징입니다.

## 왜 릴레이를 채택 했는가

- 기존 그래프큐엘 경험이 좋았습니다.
- ecosystem이 잘 되어 있습니다. 앞으로도 이점이 많을 것 같습니다.
- 리액트를 선택한 것은 기술적인 트렌드를 파악하기 위해서입니다.
- 리액트와 마찬가지로 메타에서 만들었고 베스트 프렉티스를 따라가고자 했습니다.

## 릴레이를 도입해서 얻은 이익 그리고 과제

### 전제 조건

- 릴레이는 GraphQL Server Specification을 줍니다.
  - 모든 오브젝트에 id가 있어야 합니다.

### 업적

- Fragment Colocation
  - Fragment: 쿼리를 일부를 선언하는 구조입니다.
  - Fragment Colocation: 데이터 취득 선언과 데이터를 사용하는 컴포넌트를 함께 배치하는 것입니다.
  - Fragment Colocation 못하는 경우 over / under fetch가 발생할 수 있습니다. 선언이 분리되어 부분적인 렌더링이 부족해 집니다.
- Render-as-You-Fetch
  - 렌더링이 시작하기 전에(혹은 병행해서) 데이터를 fetching 할 수 있습니다.
  - Suspense를 사용하여 구현합니다.
- Type Safety
  - 그라프큐엘 스키마와 선언된 쿼리로 사전에 컴파일하여 아티펙트 파일을 만듭니다. 자동생성된 파일에는 타입스크립트의 서포트를 받을 수 있습니다.
- Reduce Requests by Cache
- Data & View Consistency
  - 변경된 부분만 재 렌더링 됩니다.

### 문제

- 문서에 쓰이지 않은 것이 있습니다.
- 단계적인 렌더링을 조합시키지 못했다.
  - relay는 defer나 stream을 지원하지만 서버 등 회사 상황에 따라 지원하지 못하고 있습니다.
- SSR with Nest.js
  - getServerSideProps에서 await를 쓰는 경우 병목이 오래 걸린다.
  - ssr 데이터를 클라이언트로 전달할대 릴레이를 고려해야해서 리스크하다.

## 향후 전망

- 릴레이는 소개하지 못한 기술이 많습니다.
- 리액트와 에코시스템의 진화를 예의주시하고 실현하여 유저 경험을 제공하고 싶습니다.

## QnA

- 릴레이가 리액트와 조합하여 좋은 체험을 할 수 있고, Fragment colocation이 익숙하여 데이터 사용을 어떻게 하는지 잘 보입니다.
- 릴레이의 document가 읽기 힘듭니다. 점점 정리되어 발전하지 않을까 기대됩니다.
- 대규모가 될 수록 도움이 될 수 있을 것입니다. 하지만 캐시에 문제가 있을 수 있습니다.

---

## 참고

- [https://www.youtube.com/watch?v=D9Y1jkdnD98](https://www.youtube.com/watch?v=D9Y1jkdnD98)
