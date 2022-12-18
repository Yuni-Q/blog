---
title: 데이터분석을위한중급sql
date: 2022-12-19 00:12:22
category: backend
tags: []
draft: true
---

## COUNT

```sql
-- 모든 값
select COUNT(*) from sample;

-- Null 값 제외
select COUNT(Name) from sample;

-- Null 값과 중복 값 제외
select COUNT(DISTINCT Name) from sample;
```

## AVG

```sql
-- Null 값 무시
select AVG(Visits) from sample;

-- Null 값을 0으로 해석
select SUM(Visits)/COUNT(*) from sample;
```

## HAVING

- where은 group by 전에 실행되므로 HAVING을 써야 합니다.

## MySQL 소수점처리

- CEIL() 올림
- FLOOR() 내림
- ROUND() 반올림
