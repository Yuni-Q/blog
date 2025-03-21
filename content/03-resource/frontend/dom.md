---
title: DOM
date: 2020-04-10 18:04:08
category: frontend
draft: true
---

## Document 객체(Document Object)

- `문서에 대한 모든 내용을 담고 있는 객체입니다.`
- 텍스트 파일로 만들어진 문서를 브라우저 이해할 수 있는 구조로 구성한 것입니다.
- HTML 요소 간의 부자 관계를 반영하여 모든 노드들을 `트리 구조`로 구성한 것입니다.
- DOM은 `문서의 구조화된 표현(structured representation)`을 제공하며 `웹사이트를 유저와 상호작용`할 수 있도록 만들기 위해 필수적인 부분입니다. DOM은 프로그래밍 언어가 웹사이트의 내용(content), 구조(structure) 그리고 스타일을 조작할 수 있게 만들어주는 `인터페이스`입니다.
  - 가장 기초적인 수준에서 보자면, 웹사이트는 HTML Document라는 것을 포함합니다. 웹사이트를 보기 위해 사용하는 브라우저는 HTML과 CSS를 해석하는 프로그램입니다. 그리고 style, content, structure 등을 우리가 보는 페이지에 렌더링합니다.
  - HTML과 CSS의 structure와 style을 파싱하기 위해서, 브라우저는 Document Object Model이라 불리는 document의 겉모양(representation)을 만듭니다. 이 `모델(model)`은 자바스크립트가 오브젝트로서의 웹사이트 document의 컨텐트와 엘리먼트에 접근할 수 있도록 해줍니다.
  - document 객체는 우리가 웹사이트에 접근하고 수정할 수 있는 많은 프로퍼티(properties)와 메소드(methods)를 가진 빌트인 오브젝트입니다. DOM을 어떻게 작업해야 하는지 이해하기 위해, 자바스크립트에서 오브젝트가 어떻게 동작하는지 이해하는 것이 필수적입니다.

## DOM과 Node

- 문자일뿐인 HTML을 `의미있는 객체(Node)` 형태로 바꿔서 Javascript로 추가적인 작업을 할 수 있게 만들어 줍니다.
- 노드 객체도 자바스크립트 객체이므로 프로토 타입에 의한 상속 구조를 가집니다.
  - Object > EventTarget > Node

## Node의 종류

- document node
- element node
- attribute node
- text node
- DOCUMENT_FRAGMENT_NODE
- DOCUMENT_TYPE_NODE

### 문서 노드(document node)

- DOM 트리의 `최상위에 존재하는 루트 노드로서 document 객체`를 가리킵니다.
- `HTML 문서당 document 객체는 유일합니다.`
- DOM 트리의 루트 노드이므로 DOM 트리의 노드들에 접근하기 위한 진입점 역할을 합니다.
  - 요소, 어트리뷰트, 텍스트 노드에 접근하려면 노드를 통해야 합니다.

## 요소 노드(element node)

- `HTML 요서를 가리키는 객체`입니다.
- HTML 요소 간의 중첩에 의해 부자관계를 가지며, 이부자관계를 통해 정보를 구조화합니다.
  - 요소 노드는 문서의 구조를 표현합니다.

### 어트리뷰트 노드(attribute node)

- HTML 요소의 어트리뷰트를 가리키는 객체입니다.
- 어트리뷰트 노드는 지정된 HTML 요소의 요소 노드와 형제 관계를 가집니다. 부모노드와는 연결되지 않습니다.
- 어트리뷰트 노드에 접근하여 `어트리뷰트를 참조하거나 변경하려면 먼저 형제 노드인 요소 노드에 접근해야 합니다.`

### 텍스트 노드(text node)

- HTML 요소의 텍스트를 가리키는 객체입니다.
- 문서의 정보를 표현합니다.
- 텍스트 노드는 요소 노드의 자식 노드이며, 자식 노드를 가질 수 없는 리프 노드입니다.
- `텍스트 노드에 접근하려면 먼저 부모 노드인 요소 노드에 접근해야 합니다.`

## DOM API

### 노드 추가

- innerHTML
- insertAdjacentHTML
- appendChild

## DOM과 HTML 소스 코드의 차이점은 무엇일까?

- 항상 유효한 HTML 형식입니다.
  - DOM은 자바스크립트 클라이언트 사이드에 의해 수정됩니다.
- 브라우저는 소스코드에 존재하는 에러를 자동으로 고칩니다.
  - DOM이 HTML 소스코드와 다른 출력결과를 갖는 또 하나의 사례는 소스코드에 에러가 있을 때입니다. 하나의 공통적인 예시를 들자면 table 태그에는 안에 tbody 태그가 요구됩니다. 하지만 개발자들은 HTML 소스 내부에 좀처럼 잘 추가하지 않습니다. 브라우저는 자동적으로 에러를 찾아주고 DOM을 수정하여 tbody 코드를 추가해줍니다. DOM은 제대로 닫히지 않은 태그에 대해서도 수정해줍니다.
- 자바스크립트에 수정될 수 있는 동적 모델이어야 합니다.
- 가상 요소를 포함하지 않습니다.
  - 예) ::after
- 보이지 않는 요소를 포함합니다.
  - 예) display: none

## event 순서

1. Capture phase
2. Target phase
3. Bubble phase

- event는 기본적으로 Bubble phase에 동작합니다. Capture phase에 동작하려면 addEventListener의 3번째 인자를 true로 설정합니다.
- `e.stopPropagation()`을 통해 전파를 막을 수 있습니다.
  - Bubble phase는 막을 수 있지만 Capture phase를 막을 순 없습니다.
  - Capture phase `e.stopPropagation()`를 사용하면 Target phase에 접근하지 못할 수 있습니다.
- `e.preventDefault()`를 통해 기본 동작을 막을 수 있습니다.

## 렌더링 순서

### CSS 태그를 상단에 위치 시키는 이유

- 사용자가 흰 화면을 응시하는 시간을 줄이기 위해서 입니다.(CSS는 렌더링 차단 리소스로 취급됩니다)
- Link를 이용하여 스타일 시트를 다운 받는 경우 최대한 빠르게 다운 받기 위해서 입니다.
  - 브라우저는 모든 외부 스타일 시트가 다운로드 된 후 CSSOM 트리가 구성될 때까지 웹페이지 렌더링을 차단합니다.

### Script 태그를 하던에 위치 시키는 이유

- HTML 파서는 script 태그를 만나면 파싱을 멈추고 스크립트를 읽기 때문에 웹페이지 로딩이 그만큼 늦춰집니다.
- 생성되지 않은 DOM 노드를 읽어나 조작하는 것이 불가능하기 때문에 예상치 못한 오류가 발생할 수 있습니다.

## BOM(Browser Object Model) 이란?

- 웹 브라우저 환경의 다양한 기능을 객체처럼 다루는 모델입니다.
- 대부분의 브라우저에서 구현도히어 있지만, 정의된 표준이 없어 브라우저 제작사마다 세부사항이 다릅니다.
- Window 객체는 자바스크립트의 최상위 객체이자 전역 객체이면서 모든 객체가 소소된 객체입니다.
  - var 키워드로 선언한 일반 변수도 모두 window 객체의 속성이 됩니다.
  - 최상위 객체이기 때문에 생략 가능합니다.
- window : 현재 브라우저 창 또는 탭
  - document : 현재 로드된 웹페이지
  - history : 브라우저 히스토리에 기록된 웹페이지들
  - location : 현재 페이지 URL
  - navigator : 브라우저 관련 정보
  - screen : 장치의 디스플레이 정보

## 참조

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #13 자바스크립트에서, DOM 이해하기](https://velog.io/@jakeseo_me/2019-05-02-1105-%EC%9E%91%EC%84%B1%EB%90%A8-z4jv623o55#%EA%B2%B0%EB%A1%A0)
- [\[10분 테코톡\] 🕶 곤이의 DOM&BOM](https://www.youtube.com/watch?v=q1fQnGG1bgU)
