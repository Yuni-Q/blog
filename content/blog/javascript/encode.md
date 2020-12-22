---
title: encode
date: 2020-12-22 14:12:68
category: javascript
tags: []
draft: true
---

## 1. escape() : unescape()

- ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 @\*-\_+./
- 위에서 열거된 문자가 아니면 모두 변환을 합니다. 1바이트문자는 %XX 형태로 2바이트 문자는 %uXXXX 식으로 변환합니다.

## 2. encodeURI() : decodeURI()

- escape()와 같이 변환을 하지만, 인터넷 주소에서 쓰는 특수 문자 : ; / = ? & 는 변환을 하지 않습니다.
- URL을 통째로 인코딩할 때는 encodeURI()을 사용합니다.

## 3. encodeURIComponent() : decodeURIComponent()

- 인터넷 주소에서 쓰는 특수 문자 : ; / = ? & 까지 변환을 합니다. 인터넷 주소를 하나의 변수에 넣을때 쓸 수 있습니다.
- encodeURIComponent() 는 UTF-8 로 인코딩 하는 것과 같습니다.
- URL의 파라메터만 인코딩할 때는 encodeURIComponent()를 씁니다.
- `&param=encodeURI(encodeURIComponent("한글"));` 와 같이 한글 파라미터 처리합니다.

## 참고

- [escape(), encodeURI(), encodeURIComponent() 차이](https://m.blog.naver.com/PostView.nhn?blogId=kim87838&logNo=110153927463&proxyReferer=https:%2F%2Fwww.google.com%2F)
