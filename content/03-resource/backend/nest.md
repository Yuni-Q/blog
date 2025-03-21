---
title: nest
date: 2021-05-28 14:05:16
category: backend
tags: []
draft: true
---

## 네스트 장점

- 스웨거를 만들기 편리합니다.
- 기능이 더 세분화되어서 나눠져 잇다
  - 미들웨어의 역할 구분이 확실합니다.
- di, aop 등에 대해 알 수 있습니다.
- 익스프레스 기반이지만 페스티파이도 사용할수 있습니다. -컨트롤러는 req res를 알고 서비스는 req. res를 모릅니다 또한 서비스는 재사용성이 증가합니다 또한 테스트시 일반 함수가 되서 편합니다.
- req외 res를 직접 사용하지 않아서 익스프레스 다음 세대의 장점을 가질 수 있습니다.

## cli 설치

```zsh
npm i -g @nestjs/cli
```

## 프로젝트 생성

```zsh
nest new [프로젝트명]
```

## 환경변수 적용

- .env를 사용하여 환경변수 적용 뿐만 아니라 환경변수에 따라 .env.development, .env.production으로 나누어 사용할 수 있습니다.

```zsh
npm i @nestjs/config
```

## http logging

```zsh
npm i --save nest-morgan morgan @types/morgan
```

## 의존성 주입

- Injectable을 활용하기 위해서는 providers에 작성해 주어야 합니다.

## 파일 생성

- 모듈을 먼저 생성합니다

```zsh
# 모듈을 먼저 생성합니다
nest g mo [파일이름]
nest g s [파일이름]
nest g co [파일이름]
## 한번에 CRUD까지 생성하기
nest g res
```

## nest의 컨벤션

- 파일 이름을 점(.)으로 구분합니다.
- export default 보단 export를 사용합니다.
- interface 보다 class를 사용합니다.
