---
title: XSS
date: 2020-02-21 17:02:33
category: frontend
draft: true
---

## XSS 란?

- Cross Site Scripting의 약자로 CSS라고 하는 것이 맞지만 Cascading Style Sheets의 약어로 사용되어 있어 XSS라고 합니다.
- XSS 게시판이나 웹 메일 등에 자바스크립트 같은 스크립트 코드를 삽입 해 개발자가 고려하지 않은 기능이 작동하게 하는 치명적일 수 있는 공격 입니다.
- 대부분의 웹 해킹 공격 기법과는 다르게 클라이언트 즉, 사용자를 대상으로 한 공격입니다.

## 대처방안

- `<`를 `&lt`로 바꿔주는 것으로 막아 줄 수 있습니다.
- 추가적으로 `&`, `"`,`'`, \`, `=`과 같은 문자도 바꿔주는 것이 좋습니다.
- react에서도 hrml을 넣을 때 `<div dangerouslySetInnerHTML={{ __html: data }} />`를 사용하지만 이름을 길고 어렵게 작성하고 객체로 만들어 둔 것이 사용을 권장하지 않기 때문이라고 합니다.
