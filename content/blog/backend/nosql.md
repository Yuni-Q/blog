---
title: NoSQL
date: 2020-05-13 09:05:41
category: backend
tag: ['NoSQL']
draft: false
---

- MySQL 같은 SQL 데이터베이스와는 다른 유형의 데이터
  - NoSQL의 대표주자인 mongoDB(몽고디비) 사용

## SQL

- 규칙에 맞는 데이터 입력합니다.
- 테이브 간 JOIN 지원합니다.
- 트랜잭션 지원합니다.
- 안정성, 일관성을 가집니다.
- 용어(테이블, 로우, 칼럼)

## NoSQL

- 자유로운 데이터 입력합니다.
- 컬랙션 간 JOIN 지원하지 않습니다.
  - JOIN : 관계가 있는 테이블끼리 데이터를 합치는 기능(몽고디비 aggregate)로 흉내 가능
- 트랜잭션 지원하지 않습니다.
- 확장성, 가용성을 가집니다.
- 용어 (컬렉션, 다큐먼트, 필드)
- 빅데이터, 메시징, 세션 관리 등(비정형 데이터)에는 몽고디비 사용하면 좋습니다.

## 설치

```bash
brew tap mongodb/brew
brew install mongodb-community
```

## 실행

```bash
brew services start mongodb-community
```

## 접속

```bash
mongo
```

## 관리자 비밀번호 설정 후 몽고 디비 재시작, 설정 파일 수정

```mongo
use admin
db.createUser({ user: '이름', pwd: '비밀번호', roles: ['root']})
brew services stop mongodb-community
```

```conf
; /usr/local/erc/mongod.conf
security:
  authorization: enabled
```

```bash
brew services start mongodb-community
mongo admin -u [이름] -p [비밀번호]
```

## 컴퍼스 설치하기

```bash
brew cask install mongodb-compass-community
```

## 데이터베이스 생성

```bash
# 생성
use nodejs

# db 목록 확인
show dbs;

# 현재 사용중인 데이터베이스
db
```

## 컬렉션 생성하기

```bash
db.createColletion('users')
db.createColletion('comments')

# 컬렉션 보기
show collections
```

## Create

- 몽고디비는 컬럼을 정의하지 않아도 됩니다.
  - 자유로움이 장점, 무엇이 들어올지 모른다는 것이 단점입니다.
  - 자바스크립트의 잘형을 따릅니다(차이점도 존재합니다)
  - ObjectId : 몽고디비의 자료형으로 고유 아이디 역할을 합니다.
  - save method로 저장합니다.

```bash
db.users.save({name: 'yuni', age: 27, createdAt: new Date()})
```

### Create(관계 설정)

- 컬렉션 간 관계를 강요하는 제한이 없으므로 직접 ObjectId를 넣어 연결

```bash
# _id만 보여줍니다.
db.users.find({name: 'yuni', {_id: 1}})
db.comments.save({commenter: 위의결과값, comment: '댓글입니다'})
```

## Read

- find로 모두 조회, findOne으로 하나만 조회

```bash
db.users.find({})
db.users.find
```

### Read(조건)

- 두 번째 인수로 조회할 필드를 선택할 수 있습니다(1은 추가, 0은 제외)

```bash
db.users.find({}, {_id: 0, name: 1, warried: 1});
```

- 첫 번째 인수로 조회 조건 입력 간으
  - $gt나 $or 같은 조건 연산자 사용가능

```bash
db.users.find({age: { $gt: 30}, married: true}, {_id: 0, name: 1, warried: 1});
db.users.find({ $or: [{age: { $gt: 30}, {married: false }}]}, {_id: 0, name: 1, warried: 1});
```

- 정렬은 sort 메서드로 합니다.

```bash
db.users.find({}, {_id: 0, name: 1, warried: 1, age: 1}).sort({age: -1});
```

- limit 메서드로 조회할 다큐먼트 개수를 제한합니다.

```bash
db.users.find({}, {_id: 0, name: 1, warried: 1, age: 1}).sort({age: 1}).limit(1);
```

- skip 메서드로 건너뛸 다큐먼트의 개수를 제공합니다.

```bash
db.users.find({}, {_id: 0, name: 1, warried: 1, age: 1}).sort({age: 1}).limit(1).skip(1);
```

## update

- 첫 번째 인수로 수정 대상을, 두 번째 인수로 수정 내용을 제공합니다.
- \$set을 붙이지 않으면 다큐먼트 전체가 대체되므로 주의해야 합니다.
- 결과로 수정된 개수가 나옵니다.

```bash
db.users.update({name: 'Yuni-Q'}, { $set: { comment: '안녕하세요'}});
```

## Delete

- remove 메서드로 쿼리합니다.
  - 첫 번째 인수로 삭제할 대상 조건을 제공합니다.
  - 성공 시 삭제된 개수가 반환됩니다.

```bash
db.users.remove({name: 'Yuni-Q'});
```

## 몽구스 ODM

- 몽고디비 작업을 쉽게 할 수 있도록 도와주는 라이브라리입니다.
- ODM : Object Document Mapping : 객체가 다큐먼트를 매핑합니다(1대1 짝지음)
- 몽고디비에 없어 불편한 기능들을 몽구스가 보완해 줍니다.
- 테이블과 유사한 기능, JOIN 기능을 추가해줍니다.

## 참고

- [노드교과서 개정판 8장])(https://www.youtube.com/watch?v=FMgSWHYpFIA&t=2104s)
