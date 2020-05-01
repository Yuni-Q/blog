---
title: DocType
date: 2020-04-29 09:04:42
category: frontend
draft: false
---

## XHTML이란?

- XHTML과 HTML은 현재 가장 널리 사용되는 웹 문서 규격입니다. 이름에서도 알 수 있듯이 XHTML은 기존에 사용되던 HTML 규격이 가진 문제점을 극복하고, 보다 다양한 분야에 응용될 수 있도록 해주는 여러가지 확장된 기능을 포함하고 있습니다.
- HTML을 XML 바탕으로 새롭게 구성(reformulation)한 XHTML은 CSS와 함께 최근에 많은 관심을 받고 있는 '웹 표준'의 중요한 요소가 되었습니다. 하지만 XHTML이 XML을 기반으로 만들어졌고, 이 XML을 모든 브라우저가 지원하지 않는다는 현실적인 문제 때문에 XHTML과 HTML이 사실상 큰 차이 없이 사용된다고 주장하는 사람들도 많습니다.

## XHTML과 HTML의 차이점

- XHTML이 XML 문법을 따르므로 HTML과 문법 규칙이 약간 다릅니다.
- XHTML을 사용하면 할 수 있으나, HTML로는 불가능한 일이 있습니다.
  - HTML을 사용하면 할 수 있으나, XHTML로는 불가능한 일이 있습니다.
- CSS를 이해하는 방식에 차이가 있습니다.
- 클라이언트 쪽의 스크립트(예: 자바 스크립트)를 다루는 방식에 차이가 있습니다.

## XHTML을 사용하면 할 수 있으나, HTML로는 불가능한 일

- CDATA 섹션(<![CDATA[ … ]]>) 사용이 가능합니다.
  - 이 섹션 안의 문자들은 태그로 처리되지 않기 때문에 따로 이스케이프(escape) 해 줄 필요가 없습니다.
  - processing-instruction 사용합니다. 예를 들어 XML 문서에 스타일시트를 연결시킬 수 있습니다.

```html
<?xml-stylesheet type="text/css" href="style.css" media="screen"?>
```

- 다른 XML 이름 영역(namespace)에 있는 요소(element)들을 포함시킬 수 있습니다.
- \&apos; 캐릭터 엔티티(character entity)를 사용할 수 있습니다.

## HTML을 사용하면 할 수 있으나, XHTML로는 불가능한 일

- 기존 HTML에서 사용하던 <!-- … --> 코멘트로 스타일이나 스크립트의 일부를 주석 처리할 수 없습니다.
- 문서를 읽고 있는 도중에는 페이지의 일부를 동적으로 생성할 수 없습니다(예: document.write() 사용).
- \&nbsp; 같은 named entity를 사용할 수 없다. 미리 정의된 \&lt;, \&gt;, \&amp;, \&quot;는 사용 가능합니다.
- 자바 스크립트에서 .innerHTML 속성을 사용할 수 없습니다.

## CSS를 이해하는 방식의 차이

- CSS의 Element type 선택자가 대문자와 소문자를 구별합니다(case-sensitive).
- HTML에서는 BODY 요소의 background-color, background-image, overflow 속성이 최상위 요소(HTML)에도 적용되지만 XHTML에서는 적용되지 않습니다.
- HTML의 일부 시작 태그는 명시적으로 지정하지 않아도 CSS가 적용 됩니다.

## 클라이언트 쪽의 스크립트(예: 자바 스크립트)를 다루는 방식의 차이

- document.write() 메소드가 적용되지 않습니다.
- createElement() 같은 DOM 메소드는 반드시 이름 영역(namespace)에 대응되는 메소드로 바꿔줘야 합니다(예: createElementNS() 사용).
- 표준이 아닌 .innerHTML 속성을 사용할 수 없습니다.
- CSS에서와 마찬가지로 명시적이지 않은 요소(element)에 관한 문제가 자바 스크립트에도 적용됩니다.

## XHTML이 HTML보다 더 엄격한가(strict)?

- 그렇지 않습니다다.
- XHTML을 포함하는 XML의 문법 규칙이 HTML에 비해 더 단순하고, 일관적이지만 마크업이 유효(valid)하다면 XHTML과 HTML은 동일하게 해석(parsed) 됩니다.
- ‘strict’라는 단어에는 ‘엄밀(정밀)하다’는 뜻도 있습니다. 이런 의미로 해석할 경우에는 HTML이 XHTML보다 정밀하다는 표현이 맞습니다. HTML을 해석하려면 생략된 태그를 판단하는 추가적인 로직이 필요합니다.

## XHTML이 HTML보다 더 의미 있는 마크업인가(semantic)?

- 그렇지 않습니다.
- XHTML 1.0 규격은 HTML 4.01 규격을 새롭게 구성한 것이므로 두 규격은 똑같은 요소(element)와 속성(attribute)을 가지며 세 가지 문서 타입(DTD)도 동일합니다.
- 의미론적으로는 두 규격에 아무 차이도 없습니다.

## DOCTYPE 선언은 어떻게 사용되는가?

- 문서 맨 앞에 선언되는 DOCTYPE이 브라우저 같은 클라이언트 프로그램(user agent)에게 해당 문서가 XHTML이라는 것을 알려주는 역할을 한다고 생각하는 사람들이 있지만 이것 역시 사실이 아닙니다.
- DOCTYPE 선언이 만들어진 원래의 유일한 목적은 마크업을 검증하기 위한 것이며, 브라우저는 마크업을 검증할 필요가 없으므로 이 선언을 무시하고 마크업을 해석한 다음 화면에 출력합니다.
- 현재 DOCTYPE 선언은 두 가지 기능을 합니다.
  - 첫 번째는 검증기(validator)가 어떤 기준으로 마크업의 유효성을 확인해야 하는지에 관한 정보를 제공 합니다.
  - 두 번째는 브라우저에게 어떤 렌더링 모드를 사용할지 알려주는 기능입니다. 이것은 XHTML과 HTML의 차이와는 근본적으로 아무 관련이 없습니다. 하지만 XHTML을 올바르게 지원하는 브라우저는 XHTML을 엄격한 표준(strict standard) 모드로 렌더링하는데 그러기 위해서는 XHTML을 올바르게 브라우저에게 인식시켜야 합니다.

## 참고

- [XHTML과 HTML의 차이](http://blog.wystan.net/2007/05/24/xhtml-vs-html)
