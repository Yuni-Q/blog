---
title: passport
date: 2020-08-14 08:08:56
category: javascript
tags: ['passport', 'javascript']
draft: true
---

- serializeUser() : req.session 객체에 어떤 데이터를 저장할 지 선택합니다.
- deserializeUser() : 매 요청 시 실행합니다.
- isAuthenticated() : 로그인 중이면 true 아니면 false를 리턴합니다.
- passport.authenticate('local') : 미들웨어가 로컬 로그인 전략을 수행합니다.
