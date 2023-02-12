---
title: Edge Computing으로 가져올 웹 개발의 변화
date: 2023-02-12 17:02:60
category: develop
tags: []
draft: true
---

[링크](https://www.youtube.com/watch?v=YImV7OfPqSo)

## 엣지 컴퓨팅

- 엣지 컴퓨팅이란 컴퓨팅 작업을 가능한 엔드유저와 가까운 곳에서 수행하는 것을 말합니다.

### FTSE(Fundamental Theorem of Software Engineering)

- 모든 문제는 추가적인 간접(추상)화 도입으로 해결할 수 있다는 이론입니다.
  - 각 레이어들의 관심사를 격리 할 수 있다.

### 서비스 성장의 문제1. 모든 정보통신의 기술은 빛의 속도를 뛰어넘는 무언가를 할 수 없다.

- 엣지 솔루션(컨텐츠 캐싱)을 통해 해결할 수 있다.
  - 물류 창고(DC)가 너무 멀어서 배송시간(Latency)이 길어진다면 가까운 곳(Edge Location)에 하나 더 짓는다.
  - CDN(Content Delivery Network)

### 서비스 성장의 문제2. 복잡한 네트워킹 자체

- 이제 네트워크는 애플리케이션이다.

#### Road to Edge Computing

- 한계 1. 캐시 효율성
  - 정적 파일만 제공해 왔다.
- 한계 2. 글로벌
- 한계 3. 보안

#### 거인의 어개 위에서(프로그래밍 모델의 진화)

- Structured Concurrency
  - ex. React Suspense
- Containers/Isolation
  - ex. Docker
- Web APIs

### 엣지가 왜이렇게 많은가?

- 엣지는 상대적이다.
  - 적절한 위치에서 적절한 컴퓨팅 플랫폼으로 적절한 동작을 수행하는 것

#### BFF

- REST API가 아닌 그래프큐엘

#### Advanced Cache

- 똑똑한 캐시 관리를 직접 관리

#### Edge Middleware

- Early Hints Worker

#### 기타

- SSR
- OpenGraph API on the Edge
- Image Resizing
- Edge Storages
- AI Models / Hardwares

## WinterCG

- Web-interoperable Runtimes Community Group
  - 인터페이스를 통합
- 위치 투명성(Location transparency)
  - 웹워커 코드를 어디서든 아무변경 없이 라이브러리 없이 사용할 수 있다.

### Open Sources

- Edge Runtime by Vercel
- Roll your own Javascript runtime by Deno

### WebAssembly

- 언어에 제약 없이 사용 가능하고 빠르다.
  - Wasmtime
  - Wasmer
  - Lunatic
  - WasmEdge

## CGI? WASI!

- WASI(WebAssembly System Interface)
  - 과거의 유산들도 사용 가능하다.

## 미래를 대비하는 자세

- Keep eyes on WebAssembly & JavaScript
- Zero-trust security model
- Always bet on Web
