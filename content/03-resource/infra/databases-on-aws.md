---
title: Databases on AWS
date: 2022-12-19 07:12:07
category: infra
tags: []
draft: true
---

## 애플이케이션 아키텍처 변화

- MainFrame
- Client Server
- Three tier
- Microservices

## 목적에 맞는 데이터베이스

- 관계형 데이터베이스: 트랜잭션 중심의 처리, 데이터 사이의 관계를 중요시 여기는 시스템
  - 오로라, RDS
- key-value: 높은 처리량, 낮은 지연시간
  - 다이나모 디비
- Document: 대표적인 서비스에는 몽고디비가 있다.
  - DocumentDB
- In-memory: 디스크 I/O를 메모리 상에서 지원하겠다.
  - ElasticCache
- Graph: 소셜 네트워크 관계
- Time-series: 시간
- Ledger/Wide Column: 블록체인, 불변 데이터

## Amazon RDS

- 운영 편의성
- 뛰어난 확장성
  - Graviton(ARM의 네오버스)
- 가용성 및 내구성
  - 읽기전용 복제본(가용성)
  - 자동 백업
  - Multi-AZ(내구성)

## 오로라 데이터 복제 방식

- 오로라와 RDS는 스토리지 방식이 다르다.
  - RDS는 전통방식을 사용한다.
  - 오로라는 데이터를 쉐어한다. 전용 스토리지를 가진다. 쓰기 작업을 여러번 할 필요 없다.

## 높은 내구성 스토리지 시스템, AZ+1 장애 허용

- 6갸중 4개 쓰기
- 읽기(복구)의 경우 6개중 3개
