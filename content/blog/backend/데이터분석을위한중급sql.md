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

## CASE

```sql
SELECT
    CASE id
            WHEN 1 THEN 'ONE'
            WHEN 2 THEN 'TWO'
            ELSE 'N/A'
       END
  FROM employees
```

## JOIN

- INNER JOIN
- LEFT/RIGHT OUTER JOIN
- FULL OUTER JOIN
  - LEFT/RIGHT OUTER JOIN과 UNION으로 구할 수 있다.
- SELF JOIN

## MySQL 시간 더하기, 빼기

- DATE_ADD(기준날짜, INTERVAL)
- DATE_SUB(기준날짜, INTERVAL)
- SECOND, MINUTE, HOUR, DAY, MONTH, YEAR

## UNION

- UNION: 중복값 제거
- UNION ALL: 중복값 포함
- EXCEPT(MINUS): 테이블 빼기
- INTERSECT: 교집합
- 유니온은 마지막 쿼리에만 ORDER BY를 할 수 있다.

---

## 참고

- [[백문이불여일타] 데이터 분석을 위한 중급 SQL](https://www.inflearn.com/course/%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B6%84%EC%84%9D-%EC%A4%91%EA%B8%89-sql)
