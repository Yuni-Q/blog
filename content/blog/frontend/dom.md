---
title: DOM
date: 2020-04-10 18:04:08
category: frontend
draft: true
---

## DOM

- DOM(Document Object Model)은 웹사이트를 유저와 상호작용할 수 있도록 만들기 위해 필수적인 부분입니다. DOM은 프로그래밍 언어가 웹사이트의 내용(content), 구조(structure) 그리고 스타일을 조작할 수 있게 만들어주는 인터페이스입니다. 자바스크립트는 인터넷 브라우저 상의 DOM과 연결해주는 클라이언트 사이드 스크립팅 언어입니다.
- 가장 기초적인 수준에서 보자면, 웹사이트는 HTML Document라는 것을 포함합니다. 웹사이트를 보기 위해 사용하는 브라우저는 HTML과 CSS를 해석하는 프로그램입니다. 그리고 style, content, structure 등을 우리가 보는 페이지에 렌더링합니다.
- HTML과 CSS의 structure와 style을 파싱하기 위해서, 브라우저는 Document Object Model이라 불리는 document의 겉모양(representation)을 만듭니다. 이 `모델(model)`은 자바스크립트가 오브젝트로서의 웹사이트 document의 컨텐트와 엘리먼트에 접근할 수 있도록 해줍니다.

## Document 객체(Document Object)

- document 객체는 우리가 웹사이트에 접근하고 수정할 수 있는 많은 프로퍼티(properties)와 메소드(methods)를 가진 빌트인 오브젝트입니다. DOM을 어떻게 작업해야 하는지 이해하기 위해, 자바스크립트에서 오브젝트가 어떻게 동작하는지 이해하는 것이 필수적입니다.

## DOM과 HTML 소스 코드의 차이점은 무엇일까?

- DOM은 자바스크립트 클라이언트 사이드에 의해 수정됩니다.
- 브라우저는 소스코드에 존재하는 에러를 자동으로 고칩니다.
  - DOM이 HTML 소스코드와 다른 출력결과를 갖는 또 하나의 사례는 소스코드에 에러가 있을 때입니다. 하나의 공통적인 예시를 들자면 table 태그에는 안에 tbody 태그가 요구됩니다. 하지만 개발자들은 HTML 소스 내부에 좀처럼 잘 추가하지 않습니다. 브라우저는 자동적으로 에러를 찾아주고 DOM을 수정하여 tbody 코드를 추가해줍니다. DOM은 제대로 닫히지 않은 태그에 대해서도 수정해줍니다.

## 참조

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #13 자바스크립트에서, DOM 이해하기](https://velog.io/@jakeseo_me/2019-05-02-1105-%EC%9E%91%EC%84%B1%EB%90%A8-z4jv623o55#%EA%B2%B0%EB%A1%A0)
