---
title: mysql
date: 2020-08-28 02:08:76
category: backend
tags: ['mysql']
draft: true
---

## MYSQL 관계형 데이터베이스

- 데이터베이스 : 관련성을 가지며 중복이 없는 데이터들의 집합
- DBMS : 데이터베이스를 관리하는 시스템
- RDBMS : 관계형 데이터베이스를 관리하는 시스템
- 서버의 하드 디스크나 SSD 등의 저장 매체에 데이터를 저장합니다.
- 서버 종료 여부와 상관 없이 데이터를 계속 사용할 수 있습니다.
- 여러 사람이 동시에 접근할 수 있고 권한을 따로 줄 수 있습니다.

## mysql 설치

```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

- root 비밀번호 설정 후, validata_password 플러그인 설치하겠냐고 물으면 n을 입력하고 엔터를 눌러 건너뜁니다.

## 워크밴치 설치

```bash
brew cask install mysqlworkbench
```

## query 문

```sql
-- 데이터베이스의 목록을 보여줍니다.
show databases;

-- 스키마 생성
CREATE SCHEMA `nodejs` DEFAULT CHARACTER SET utf8;

-- 데이터베이스 사용
use nodejs;

-- 테이블 생성
CREATE TABLE nodejs.comments (
  id INT NULL AUTO_INCREMENT,
  commenter INT NOT NULL,
  comment VARCHAR(100) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY(id),
  INDEX commenter_idx (commenter ASC),
  CONSTRAINT commenter
  FOREIGN KEY (commenter)
  REFERENCES nodejs.user (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE)
  COMMENT = '댓글'
  DEFAULT CHARSET=utf8mb4
  ENGINE=InnoDB;

-- 테이블 보기
SHOW TABLES;

-- 추가
INSERT INTO 테이블 (칼럼명들) VALUES (값들);

-- 조회(칼럼에 *를 쓰면 모든 칼럼을 선택한다는 의미입니다.)
--  WHERE로 조건을 주어 선택 가능합니다.
--    AND로 여러가지 조건을 동시에 만족하는 것을 찾을 수 있습니다.
--    OR로 여러가지 조건 중 하나 이상을 만족하는 것을 찾을 수 있습니다.
--  ORDER BY로 특정 컴럼 값 순서대로 정렬 가능
--    DESC는 내림차순, ASC는 오름차순
--  LIMIT으로 조회할 개수 제한
--  OFFSET으로 앞의 로우들 스킵 가능(OFFSET 2면 세 번째 것부터 찾습니다)
SELECT 컬럼 FROM 테이블명;

-- 수정
UPDATE 테이블명 SET 컬럼=새값 WHERE 조건;

-- 삭제
DELETE FROM 테이블명 WHERE 조건;
```

### 컬럼에 대한 옵션들

- INT : 정수 자료형(FLOAT, DOUBLE은 실수)
- VARCHAR : 문자열 자료형, 가변 길이(CHAR은 고정 길이)
- TEXT : 긴 문자열은 TEXT로 별도 저장
- DATETIME : 날짜 자료형 저장
- TINYINT : -128에서 127까지 저장하지만 여기서는 1 또는 0인 저장해 불 값 표현
- NOT NULL : 빈 값은 반지 않는다는 뜻(NULL은 빈 ㄱ밧 허용)
- AUTO_INCREMENT : 숫자 자료형인 경우 다음 로우가 저장될 때 자동으로 1 증가
- UNSIGNED : 0과 양수만 허용
- ZEROFILL : 숫자의 자리 수가 고정된 경우 빈 자리에 0을 넣음
- DEFAULT now() : 날짜 칼럼의 기본값을 현재 시간으로
- PRIMARY KEY : 고유한 값(보통 id를 활용)
- INDEX : 자주 검색할 것을 정해 검색 속도를 높임
- CONSTRAINT commenter FOREIGN KEY (commenter) REFERENCES nodejs.user (id) : 유저가 있는 경우에만 commenter 등록 가능
- ON DELETE CASCADE ON UPDATE CASCADE : 삭제 수정시 같이 동작하게 합니다.
- utf8mb4 : 이모티콘 사용 시 mb4를 붙입니다.

## 시퀄라이즈 ORM

- MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리
  - ORM : Object Relational Mapping : 객체와 데이터를 매핑(1대1 짝지음)
  - MySQL 외에도 다른 RDB(Maria, Postgre, SQLite, MSSQL)와도 호환됩니다.
  - 자바스크립트 문법으로 데이터베이스 조작이 가능합니다.

## 페이징 처리 시

- offset보다 where을 쓰는 것이 좋습니다.
