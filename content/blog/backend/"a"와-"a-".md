---
title: "a"와 "a "
date: 2020-05-15 21:05:88
category: backend
draft: false
---

- MySQL, PostgreSQL, SQLite, SQL Server 중 PostgreSQL 과 SQLite 만 'a'와 'a '를 다른 값으로 평가합니다.
- 이유 : 비교하려는 두 문자열의 길이가 다른 경우, 짧은 쪽에 공백을 이어붙여 길이를 똑같이 만든 다음 비교하기 때문에 발생합니다.
- MySQL은 CHAR와 VARCHAR 모두 PAD 방식으로 비교합니다.
- PostgreSQL은 CHAR를 저장할 때, PAD를 추가하는 방식이 아니라 제거하는 방식으로 저장합니다.
- 그 결과, 저장된 CHAR를 기준으로 보면 PADDING을 사용한 방식과 같은 결과를 내놓습니다.
- 타입을 정의하지 않은 CHAR의 비교에 대해서 PAD를 사용할지 말지는 DB마다 다를 수 있습니다.
- PADDING 방식의 원인은 CHAR 타입을 저장하는 방식과 관련이 있는 것으로 추측됩니다.

## 참고

- [MySQL에서 'a' = 'a '가 true로 평가된다?](http://woowabros.github.io/study/2018/02/26/mysql-char-comparison)
