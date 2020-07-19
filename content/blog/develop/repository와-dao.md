---
title: repository와 DAO
date: 2020-02-24 18:02:29
category: develop
draft: true
---

- Repository는 하나의 도메인에 관련 된 것들을 컨트롤 합니다.
  - 하나의 도메인에는 여러개의 테이블이 존재할 수 있습니다.
  - REPOSITORY는 메모리에 로드된 객체 컬렉션에 대한 집합 처리를 위한 인터페이스를 제공합니다.
- DAO(Data Access Object)는 하나의 테이블에 관련 된 것들을 컨트롤 합니다.
  - Entity Bean을 대체하기 위한 DAO의 인터페이스는 데이터베이스의 CRUD 쿼리와 1:1 매칭되는 세밀한 단위의 오퍼레이션을 제공합니다.
