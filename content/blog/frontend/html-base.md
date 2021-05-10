---
title: html base
date: 2020-08-03 17:08:31
category: frontend
tags: ['html']
draft: false
---

## HTML Living Standard

- HTML, HyperText Markup Language로 대변되는 이 언어는 단순히 Markup Language라는 이유로 많은 개발자들에게 'HTML은 프로그래밍 언어가 아니다'라는 식으로 조롱받고는 합니다.
- HTML 4.01이 1999년 12월 표준이 되었고, HTML 5가 2008년 1월 22일 처음 시작되어 2014년 10월 W3C 권고안이 되었습니다.
- 2020년 기준, 최신 HTML 표준안은 WHATWG(Web Hypertext Application Technology Working Group)에서 [HTML Living Standard](https://html.spec.whatwg.org/) 라는 이름으로 관리하고 있으며, WHATWG에 참여 중인 기업체는 Apple, Google, Mozilla, Microsoft 등입니다.

## 태그란?

- HTML문서를 구성하고 있는 요소 입니다.
- 태그는 이름과 속성이 있습니다.

### html을 검사

- [http://validator.w3.org/](http://validator.w3.org/)

### <a href='https://developer.mozilla.org/ko/docs/Glossary/Doctype' target="_blank">!doctype html</a>

- 이 문서가 html(=html5) 문법이 적용된 문서임을 알려줍니다.
- HTML 태그에 포함되지는 않습니다.
- 문서의 최상위에 위치해야합니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/html' target="_blank">html</a>

- 이하의 모든 태그는 \<html> 태그의 자손이어여야 합니다. 즉 모든 HTML 태그의 최상위 부모 요소입니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/lang' target="_blank">lang="ko-KR"</a>

- 태그 내부의 내용이 어떤 나라의 어떤 언어로 작성되었는지를 나타내는 속성입니다.
- "언어코드-나라코드"의 값을 가집니다.
- 대부분 html 태그에 사용하지만 전역 속성이므로 다른 태그에도 사용할 수 있습니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/head' target="_blank">head</a>

- 웹 브라우저가 알아야 할 문서의 일반적인 정보들이 입력되는 부분입니다.
- \<html> 태그의 첫번째 자식으로 배치해야합니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/meta' target="_blank">meta</a>

- 다른 meta 요소로 표현할 수 없는 문서레벨 메타데이터를 나타내는데 사용하는 태그입니다.
- 주로 문자 인코딩을 선언하는데 사용됩니다.
- 닫는 태그는 없습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/meta#attr-charset' target="_blank">charset="utf-8"</a>

- meta 태그에 사용하는 속성입니다. HTML 문서의 문자 인코딩 방식을 나타냅니다.
- HTML5에서 유효한 문자 인코딩 방식은 utf-8 뿐이므로 값은 항상 utf-8이어야 합니다.
  - 한국어, 영어, 일본어만 사용할 경우 euc-kr을 선언하기도 하지만 국제화 시대에 다국어로 인코딩이 되게 하기 위해서는 utf-8로 지정하실 것을 권장합니다.
- 일부 브라우저에서 문자 인코딩 방식은 문서의 첫 1024byte만 보고 결정하므로 그 안에 있어야 합니다. 그러므로 \<head> 태그의 앞부분에 위치시키는 것이 좋습니다.
  - 512byte 이내에 위치할 것을 권장합니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/title' target="_blank">title</a>

- 브라우저 탭에 표시될 제목을 나타내는 태그입니다.
- 내용에는 텍스트만 쓸 수 있으며, 안에 다른 태그가 있어도 무시됩니다.
- \<head> 태그의 자식으로 하나만 존재할 수 있습니다.
- 사용하지 않을 시 페이지 주소가 문서의 제목으로 사용됩니다.

### 그 외

- link 링크 요소 : 외부 리소스와의 관계를 표시합니다.
- style 스타일 요소 : 스타일 정보를 작성합니다.
- base 베이스 요소 : 기준 URL 설정합니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/body' target="_blank">body</a>

- 실제 브라우저에 표시되는 내용입니다.
- \<html> 태그의 두번째 자식으로 배치해야합니다.
- \<body> 태그의 자손으로 배치되어 브라우저 내에 표시되는 태그들은 두가지 display 속성 중 하나를 가집니다.
  - 블록(block) 속성을 갖는 태그들은 내용 표시 후 줄바꿈이 됩니다.
  - 인라인(inline) 속성을 갖는 태그들은 내용 표시 후 줄바꿈이 되지 않습니다.
- 태그의 디자인은 CSS로 바꿀 수 있으므로 태그의 '의미론적' 역할에 더 주목해야합니다.

### 블록(block) 속성

- 블록(block) 속성을 갖는 태그들은 내용 표시 후 줄바꿈이 됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/Heading_Elements' target="_blank">h1 ~ h6 태그 : HTML 구획 제목 요소</a>

- 제목을 나타낼 때 사용하는 태그입니다.
- 숫자가 작을수록 글씨 크기가 커집니다.
- 크기와 상관없이 level로 사용할 것을 권장합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/p' target="_blank">p</a>

- 문단을 나타낼 때 사용하는 태그입니다.
- p태그 내부 텍스트에 줄바꿈이 사용될 경우 띄어쓰기 하나로 표현됩니다ㅣ
- 텍스트의 길이가 텍스트가 담긴 박스 너비보다 길면 그 때 자동으로 줄바꿈이 됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/blockquote' target="_blank">blockquote</a>

- 주로 긴 인용문을 나타낼 때 사용하는 태그입ㄴ디ㅏ.
- 사용시 내부 내용에 들여쓰기가 적용됩니다.
- cite 태그를 이용해 인용문의 출처를 표시할 수 있습니다.
- 들여쓰기를 사용하고 싶지 않은 짧은 인용문은 \<q>태그를 이용하면 됩니다.
  - q 태그와 다르게 블록으로 할당합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/pre' target="_blank">pre</a>

- 미리 서식을 지정한 텍스트를 나타내는 태그입니다.
- 텍스트를 있는 그대로 표시하고 싶을 때 사용합니다. 탭이나 뛰어쓰기가 모두 그래로 보존됩니다.
- \<p> 태그 등에서는 스페이스바를 여러개 써도 하나만 나타나지만 \<pre> 태그는 그대로 표현됩니다.
- \<pre> 태그를 사용한 부분은 웹 접근성 도구가 건너뛰어버리는 경우가 많습니다.
- 이를 대비해 웹 접근성을 위해 \<pre>태그의 내용에 대한 대체 텍스트를 추가할 필요가 있습니다.
- 프로그래밍 코드를 있는 그대로 보여주기 위해 \<code>, \<samp>, \<kbd> 태그를 사용할 때도 함께 사용됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/hr' target="_blank">hr</a>

- 분위기가 전환되는 단락과 단락을 나누는 수평줄을 그릴 때 사용하는 태그입니다.
- 닫는 태그가 없습니다. \</hr> 형태로는 사용되지 않습니다.
- 주로 단락들을 나열하다가 단락의 주제가 바뀌었을 때 사용됩니다.
- 그냥 줄을 긋고 싶은거라면 이 태그보다는 css를 사용하는 편이 의미론적으로 좋습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/br' target="_blank">br</a>

- 줄바꿈(캐리지 리턴)을 나타내는 태그입니다.
- 닫는 태그가 없습니다. \<br> 혹은 \</br>의 형태로 사용됩니다.
- 여백을 주고 싶다면 css의 마진을 사용하는 것이 박스 모델에 더 좋습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/div' target="_blank">div</a>

- 플로우 콘텐츠를 위한 통용 컨테이너입니다. CSS로 꾸미기 전에는 콘텐츠나 레이아웃에 어떤 영향도 주지 않습니다.

### 인라인(inline) 속성

- 인라인(inline) 속성을 갖는 태그들은 내용 표시 후 줄바꿈이 되지 않습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/strong' target="_blank">strong</a>

- 중대하거나 긴급한 내용임을 나타내는 태그입니다.
- 화면에는 굵은 텍스트(bold체)로 표시됩니다.
- 웹 접근성 도구는 strong 태그를 만나면 그 부분이 강조되었다고 알려준다고 하는데 도구에 따라 다른듯합니다.
- \<strong> 태그를 겹쳐서 사용하는 것으로 더 강조할 수도 있습니다. 그렇다고 더 굵게 표시되지는 않습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/b' target="_blank">b</a>

- 텍스트를 굵게(bold체) 표시하는 태그입니다.
- 중요성, 관련성 없이 다른 글자와 구분을 목적으로 사용 되는 요소입니다.
- 현재는 그저 텍스트를 꾸미기 위해서 \<b> 태그를 사용하는 것은 추천하지 않습니다.
- 텍스트를 꾸미는 것이 목적이라면 css의 font-weight 속성을 쓰는 것이 추천됩니다.
- \<b>태그에 대한 설정이 웹브라우저마다 다를 수 있으므로 \<b>태그로 감싸고 css를 설정해주는 것이 추천됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/em' target="_blank">em</a>

- 텍스트의 강세를 표시하는 태그입니다.
- 화면에는 기울어진 글씨(italic체)로 표시됩니다.
- \<strong> 태그와 마찬가지로 \<em> 태그를 겹쳐서 사용할 수도 있습니다. 그렇다고 더 기울어지게 표시되지는 않습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/i' target="_blank">i</a>

- 관용구나 마음 속 생각, 기술적인 용어 등을 강조하고 싶을 때 사용하는 태그입니다.
- 화면에는 기울어진 글씨(italic체)로 표시됩니다.
- 현재는 텍스트를 꾸미는 것이 목적이라면 css의 font-style 속성을 사용하는 것이 추천됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/s' target="_blank">s</a>

- 이제는 관계없어졌거나 정확하지 않은 텍스트임을 나타낼 때 사용하는 태그입니다.
- 화면에는 텍스트에 취소선을 그은 것으로 표시됩니다.
- 현재는 취소선을 긋는 것만이 목적이라면 css의 text-decoration 속성에 값을 line-through로 사용하는 것이 추천됩니다.
- 문서의 편집 내역을 나타낼 때는 \<s>태그 대신에 \<del>과 \<ins>태그를 사용할 것이 추천됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/del' target="_blank">del</a>

- 문서에서 제거된 텍스트의 범위를 나타내는데 사용되는 태그입니다.
- 화면에는 텍스트에 취소선을 그은 것으로 표시됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/ins' target="_blank">ins</a>

- 문서에서 추가된 텍스의 범위를 나타내는데 사용되는 태그입니다.
- 화면에는 텍스트에 밑줄을 그은 것으로 표시됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/u' target="_blank">u</a>

- 텍스트가 문서로 표시되지 않는 주석을 가졌음을 나타낼 때 사용되는 태그입니다.
- 주로 텍스트의 문법 오류 등을 나타낼 때 사용되어야 합니다.
- 화면에는 밑줄을 그은 것으로 표시된다.
- 현재는 밑줄을 긋는 것만이 목적이라면 css의 text-decoration 속성에 값을 underline으로 사용하는 것이 추천됩니다.
- 텍스트 주석을 나타내고 싶다면 \<ruby> 태그를 사용하는 것이 추천됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/ruby' target="_blank">ruby</a>

- 동아시아 글자에 대한 주석을 표현하기 위해 사용되는 태그입니다.
- 일본어의 후리가나(=요미가나)를 표현할 때 사용할 수 있습니다.
- \<ruby>글자\<rt>주석\</rt>\<ruby> 형태로 사용합니다.

##### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/rt' target="_blank">rt</a>

- \<ruby>태그 내부에 사용하여 주석 부분을 나타내는 태그입니다.

##### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/rp' target="_blank">rp</a>

- 브라우저가 \<ruby>태그 주석을 후리가나 형태로 나타내지 못할 때 대체할 괄호를 나타내는 태그입니다.
- \<ruby>福\<rp>(\</rp>\<rt>복\</rt>\<rp>)\</rp>\<ruby> 의 형태로 사용됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/sup' target="_blank">sup</a>

- 윗첨자를 표현하는데 사용되는 태그입니다.
- 타이포그래피적인 이유로만 사용할 것을 추천합니다. 즉, 주로 수학식의 거듭제곱이나 영어권의 서수 표시 등을 할 때 사용됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/sub' target="_blank">sub</a>

- 아래첨자를 표현하는데 사용되는 태그입니다.
- 타이포그래피적인 이유로만 사용할 것을 추천합니다. 즉, 주로 화학식에서 원소의 수나 텍스트의 각주 번호 등을 표기할 때 사용됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/small' target="\_blank">small</a>

- 덧붙이는 글이나 저작권 표기 등을 위해 작게 써도되는 내용을 나타내는 태그입니다.
- 그저 글자를 작게 쓰고 싶은 거라면 css에서 font-size 속성을 사용하는 것을 추천합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/abbr' target="\_blank">abbr</a>

- 줄임말을 나타낼 때 사용하는 태그입니다.
- title 속성을 사용하여 전체 내용을 표시할 수 있습니다. 마우스를 올리고 있으면 표시됩니다.
- 화면에는 점선으로 밑줄을 그은 것으로 표시됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/q' target="\_blank">q</a>

- 간단한 문장을 인용한 것을 나타낼 때 사용되는 태그입니다.
- \<blockquote>태그와 달리 줄바꿈이 되지 않고, 인용 내용에 큰따옴표를 붙여서 표시됩니다.
- cite 태그를 붙여서 인용문의 출처를 나타낼 수 있습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/cite' target="\_blank">cite</a>

- 인용문의 출처를 나타낼 때 사용되는 태그입니다.
- 화면에는 기울어진 글씨(italic체)로 표시됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/code' target="\_blank">code</a>

- 짧은 코드 조각을 나타낼 때 사용되는 태그입니다.
- 화면에는 고정폭 글꼴로 표시됩니다.
- \<pre>태그화 함께 사용하여 긴 코드를 나타낼 수도 있습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/kbd' target="\_blank">kbd</a>

- 키보드 입력, 음성 입력 등 사용자의 입력을 나타낼 때 사용되는 태그입니다.
- 화면에는 고정폭 글꼴로 표시됩니다.
- \<samp>태그와 함께 사용하는 경우도 많습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/samp' target="\_blank">samp</a>

- 컴퓨터 프로그램 출력의 예시 등을 나타낼 때 사용되는 태그입니다.
- 화면에는 고정폭 글꼴로 표시됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/mark' target="\_blank">mark</a>

- 맥락상 관련성이 있는 곳을 하이라이트 할 때 사용되는 태그입니다.
- 사용시 마치 형광펜을 칠한 것처럼 표시됩니다.
- 디자인적인 의미만 갖는다면 span태그와 css를 통해서 표현하는 것이 추천됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/span' target="\_blank">span</a>

- 줄바꿈 없이 영역을 묶기 위해서 사용되는 태그입니다.
- 의미론적으로는 오히려 아무 의미가 없으므로 CSS를 통해 스타일을 주는데 사용됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/time' target="\_blank">time</a>

- 시간의 특정 지점 또는 구간을 나타냅니다. datetime 특성의 값을 지정해 보다 적절한 검색 결과나, 알림 같은 특정 기능을 구현할 때 사용할 수 있습니다.

### 목록을 만드는 태그

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/ul' target="\_blank">ul</a>

- 순서가 상관없는 목록을 만들때 사용하는 태그입니다.
- 항목 앞에 작은 원이나 사각형 같은 불릿(bullet)이 붙습니다.
- HTML5에서는 이 불릿을 수정할 때 css의 list-style-type 속성을 사용할 것을 추천하고 있습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/ol' target="\_blank">ol</a>

- 순서가 중요한 목록을 만들때 사용하는 태그입니다.
- 항목 앞에 마커로 아라비아 숫자나 로마숫자, 영어가 붙습니다.
- 이 카운터는 css의 list-style-type 속성으로 수정할 수 있습니다.
- 하지만 기술적, 법률적 문서에서는 HTML 태그 속성이 중요하므로 type 속성으로 바꿀 수 있습니다.
- type 속성은 1(숫자, 기본값), i(로마숫자 소문자), I(로마숫자 대문자), a(영문 소문자), A(영문 대문자)의 값을 가집니다.
- start 속성으로 순서 목록의 시작 값을 바꿀 수 있습니다.
- reversed 속성으로 항목을 역순으로 표시할 수 있습니다.

##### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/li' target="\_blank">li</a>

- \<ul> 태그나 \<ol> 태그 내부의 개별 리스트를 표현할 때 사용하는 태그입니다.
- <ol> 태그 안에 사용할 때 value 속성으로 항목의 순서를 설정할 수 있습니다.
- value 값이 사용되면 그 값부터 순서를 셉니다.
- \<li> 태그는 닫는 태그가 필요한 태그지만 \<li> 태그가 연속될 때는 닫는 태그를 생략할 수도 있습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/dl' target="\_blank">dl</a>

- 제목과 설명이 한쌍인 설명 목록을 나타내는 태그입니다.
- 예를 들어 '단어/정의', '질문/답' 목록 등에 사용할 수 있습니다.

##### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/dt' target="\_blank">dt</a>

- \<dl>태그 내부에서 제목을 나타내는 태그입니다.
- dt와 dd는 1:1, 1:n, n:1, n:m 가능합니다. 하지만 1:0은 불가능합니다.
  - dt에 대한 dd는 하나는 무조건 따라 와야 합니다.

##### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/dd' target="\_blank">dd</a>

- \<dl>태그 내부에서 설명을 나타내는 태그입니다.

### 표를 만드는 태그

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/table' target="\_blank">table</a>

- 표의 시작과 끝을 나타내는 태그입니다.
- 기본 스타일에서는 테두리가 표시되지 않습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/caption' target="\_blank">caption</a>

- 표의 제목을 나타냅니다.
- \<table> 태그의 첫번째 자식이어야 합니다.
- 표의 상단에 가운데 정렬로 표시됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/tr' target="\_blank">tr</a>

- 표의 행(row: 가로줄)을 나타내는 태그입니다.
- \<table> 태그 안에 사용합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/th' target="\_blank">th</a>

- 표에서 제목셀의 역할을 하는 셀 한칸을 나타내는 태그입니다.
- 전역 속성인 id 속성을 사용해서 id를 지정해두면 headers 속성으로 관련된 셀임을 나타낼 수 있습니다.
- abbr 속성을 사용하여 화면엔 표시되지 않지만 접근성에 도움을 주는 셀 내용에 대한 간략한 설명을 추가할 수 있습니다.
- scope 속성을 사용하여 화면엔 표시되지 않지만 이 제목셀이 어떤 셀들과 연관되는지 표시할 수 있습니다.
- \<td>태그와 마찬가지로 colspan과 lowspan 속성을 이용해 셀들을 합칠 수 있습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/td' target="\_blank">td</a>

- 표의 셀 한칸을 나타내는 태그입니다.
- colspan과 rowspan 속성을 이용해서 셀을 합칠 수 있습니다.
- headers 속성을 이용하면 화면에 표시되지는 않지만 관련된 th 셀을 표시할 수 있습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/thead' target="\_blank">thead</a>

- 표의 내용을 의미론적으로 구조화할 때 표의 상단 부분을 나타낼 때 사용하는 태그입니다.
- tbody 태그 앞에 위치해야 합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/tbody' target="\_blank">tbody</a>

- 표의 내용을 의미론적으로 구조화할 때 표의 본문 부분을 나타낼 때 사용하는 태그입니다.
- thead 태그 뒤, tfoot태그 앞에 위치해야 합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/tbody' target="\_blank">tbody</a>

- 표의 내용을 의미론적으로 구조화할 때 표의 본문 부분을 나타낼 때 사용하는 태그입니다.
- thead 태그 뒤, tfoot태그 앞에 위치해야 합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/tfoot' target="\_blank">tfoot</a>

- 표의 내용을 의미론적으로 구조화할 때 표의 하단 부분을 나타낼 때 사용하는 태그입니다.
- tbody 태그 뒤에 위치해야 합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/colgroup' target="\_blank">colgroup</a>

- col 태그를 묶기 위해서 사용되는 구획 태그입니다.
- caption태그 뒤, 첫번째 tr태그나 thead태그 앞에 위치해야 합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/col' target="\_blank">col</a>

- 표 내부에서 하나의 열이나 여러개의 열을 묶어서 스타일을 지정할 때 사용하는 태그입니다.
- 닫는 태그는 없습니다.
- 사용된 순서대로 표의 열을 첫번째부터 순서대로 가리키며 span 태그로 묶으면 그 갯수만큼의 열을 가리킵니다다.
- caption태그 뒤, 첫번째 tr태그나 thead태그 앞에 위치해야합니다.
- 사실상 CSS를 위한 태그라서 예제 코드에 CSS가 포함되어 있습니다.
- 행을 묶는 태그는 tr태그로 충분하므로 존재하지 않습니다.

### 이미지를 표시하는 태그

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/img' target="\_blank">img</a>

- HTML 문서에서 이미지를 표시할 때 사용되는 태그입니다.
- 닫는 태그는 사용하지 않습니다.
- 이미지 주소를 나타내는 src 속성은 필수로 있어야 합니다.

##### src 속성

- 표시할 이미지의 주소(URI)를 나타내기 위해서 사용되는 속성입니다.
- 값으로 내 컴퓨터에 있는 파일 경로나 웹 이미지 링크 주소를 사용할 수 있습니다.
- 내 컴퓨터에 있는 파일을 웹에 보여주려면 이미지 파일도 서버에 같은 경로로 올라가 있어야 합니다.
- 웹 상의 이미지를 사용할 경우 경로를 '참조'하는 방식이기 때문에 원본 경로의 이미지 상태에 종속됩니다.

##### alt 속성

- 이미지를 표시할 수 없을 때 이미지를 설명하는 대체 텍스트를 삽입하기 위해 사용되는 속성.
- 대체 텍스트는 웹 접근성을 향상 시키기 위해서도 넣어줄 필요가 있다.

##### width, height 속성

- 화면에 표시할 이미지의 넓이(width)와 높이(height)를 정하는 속성 입니다.
- 값은 양의 정수값을 받습니다. 뒤에 단위를 작성하더라도 px로 적용됩니다.
- 생략할 경우 원본 이미지의 크기로 표시됩니다.
- width나 height 중 하나만 사용할 경우 나머지는 원본 이미지 크기 비율로 자동 설정됩니다.
- 원본 이미지의 크기보다 크게 설정하면 이미지가 확대되고, 작게 설정하면 이미지가 축소됩니다.
- 이때 사용된 이미지가 비트맵 포맷 이라면 확대시 화질이 깨지게 되니 주의해야 합니다.
- 벡터 포맷인 svg 파일을 사용하면 확대해도 화질이 깨지지 않습니다.
- css로도 이미지 크기를 조정할 수 있습니다. css를 사용하면 퍼센트(%)나 vw, vh 단위로도 조정가능 합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/figure' target="\_blank">figure</a>

- 독립적인 콘텐츠를 표현합니다. \<figcaption> 요소를 사용해 설명을 붙일 수 있습니다. 피규어, 설명, 콘텐츠는 하나의 단위로 참조됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/figcaption' target="\_blank">figcaption</a>

- 부모 \<figure> 요소가 포함하는 다른 콘텐츠에 대한 설명 혹은 범례를 나타냅니다.

### HTML 이미지 맵 만들기

- 이미지 맵이란 문서 내 이미지의 일부 범위만 지정해서 링크를 거는 것입니다.
- 하나의 이미지의 서로 다른 범위에 서로 다른 링크를 거는 것도 가능합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/map' target="\_blank">map</a>

- 이미지 맵을 만들때 사용되는 태그입니다.
- map태그의 name 속성과 img 태그의 usemap속성으로 서로 연결합니다.
- id 속성을 사용했다면 name 속성의 값과 id 속성의 값은 서로 같아야 합니다.
  - ex) \<map name="m1"> ... \</map> \<img href="..." usemap="m1">

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/area' target="\_blank">area</a>

- 이미지맵에서 이미지 내의 범위를 지정하고 링크를 걸 때 사용하는 태그입니다.
- a태그에 shape 속성과 coords 속성이 추가된 태그라고 생각하면 됩니다.
- 범위 지정시 웹페이지 내에서의 이미지로 지정해야합니다.
- 이미지를 확대 혹은 축소했을 경우 좌표가 달라짐에 주의해야 합니다.

##### shape속성 과 그에 따른 coords 속성

- 지정할 범위의 모양을 정합니다. 정수로만 적어야하며 단위는 px입니다.
- rect : 사각형 모양. 좌상단의 점과 우하단의 점을 지정합니다.
  - coord 형식 : x1,y1,x2,y2
- circle : 원모양. 원의 중심과 반지름을 지정합니다.
  - coord 형식 : x1,x2,r
- poly : 다각형 모양. 다각형의 꼭지점쌍을 지정합니다. 삼각형이랑 좌표쌍 3개, 5각형이라면 좌표쌍 5개가 필요합니다.
- default : 전체 지정. 이미지 전체를 선택할 때 사용합니다. shape속성이 default일 경우 coords 속성은 사용되지 않습니다.
- default가 없다면 이미지의 다른 부분에는 링크가 생기지 않습니다.

### 링크를 만드는 태그

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/a' target="\_blank">a</a>

- 다른 문서 혹은 문서 내의 다른 부분 혹은 그 외의 주소(URL)로 이동하는 연결점을 만드는 태그 입니다.
- \<a href="주소">텍스트\</a> 혹은 \<a href="주소">\<img src="이미지 경로">\</a> 의 두가지 형태로 사용됩니다.
- 방문 주소를 나타내는 href 속성은 필수로 있어야 합니다.
- 링크가 걸린 텍스트는 밑줄이 쳐진 색 있는 텍스트로 표현됩니다.
- 링크를 방문하기 전에는 파란색, 클릭 중이면 빨간색, 방문 후에는 빨간색으로 표시됩니다.

##### href 속성

- 이동할 주소(URL)를 나타내는 속성 입니다.
- 값으로는 HTTP 기반 URL이 가장 많이 사용되지만, 브라우저가 지원하는 모든 URL 스킴을 사용할 수 있습니다.
  - URL 스킴이란 FTP, mailto, rtsp 등 URL의 맨 앞에서 URL의 종류를 나타내는 단어입니다.

##### hreflang 속성

- 이동할 페이지가 어떤 언어를 사용하는지에 대한 힌트를 제공하는 속성 입니다.
- 전역 속성인 lang에 사용가능한 값들을 사용할 수 있습니다.
- 특별한 내장 기능은 없습니다.

##### target 속성

- 링크한 페이지를 표시할 위치를 나타내는 속성 입니다.

- 특정 키워드 혹은 \<iframe>태그의 name 속성 값을 사용합니다.

- '\_self' : 기본값, 현재 브라우저에 표시합니다.
- '\_blank' : 새로운 브라우저 맥락에 표시합니다. 보통 새 탭이지만 사용자 브라우저 설정에 따라 달라질 수 있습니다.
- '\_parent' : URL을 현재 브라우징 맥락의 부모에 표시한다. 부모 브라우저가 없으면 self와 동일하게 행동합니다.
- '\_top' : URL을 최상단 브라우징 맥락에 표시합니다. 부모 브라우저가 없으면 self와 동일하게 행동합니다.

##### rel

- 현재 문서와 링크될 문서의 관계를 나타내는 속성 입니다.
- 여러개의 값을 가질 수 있으며 띄어쓰기로 구분합니다.
- 'alternate' : 링크된 문서가 해당 문서의 대체 버전임을 나타냅니다.(영문 페이지 등)
- 'author' : 링크된 문서가 해당 문서의 저자에 대한 정보 페이지임을 나타냅니다.
- 'help' : 링크된 문서가 해당 문서에 대한 도움말 페이지임을 나타냅니다.
- 'license' : 링크된 문서가 해당 문서의 저작권 정보 페이지임을 나타냅니다.
- 'bookmark' : 링크된 주소가 해당 문서의 즐겨찾기용 고유 주소임을 나타냅니다.
- 'search' : 링크된 문서가 해당 문서를 위한 검색 도구임을 나타냅니다.
- 'tag' : 링크된 문서가 해당 문서를 위한 키워드임을 나타냅니다.
- 'external' : 링크된 문서가 해당 문서와 같은 사이트 내에 있지 않음을 나타냅니다.
- 'next' : 링크된 문서가 해당 문서와 연관된 문서들의 모음 중 다음 문서임을 나타냅니다.
- 'prev' : 링크된 문서가 해당 문서와 연관된 문서들의 모음 중 이전 문서임을 나타냅니다.
- 'nofollow' : 검색엔진이나 봇등이 추적해서는 안됨을 나타냅니다.
- 'noreferrer' : 사용자가 링크를 클릭할 때 브라우저가 HTTP 리퍼러 헤더를 전송해서는 안됨을 나타냅니다.
- 'noopener' : 링크를 따라 연결되는 어떠한 브라우징 컨텍스트도 오프너여서는 안됨을 나타냅니다.

##### download

- 링크로 이동하는 대신 링크의 리소스를 다운로드할지 물어봅니다.
- 지정한 속성 값은 파일명으로 추천됩니다.
- 값을 지정하지 않으면 브라우저가 자동으로 추천합니다.
- 동일 출처 URL이나 blob:: 혹은 data:: 스킴에서만 작동합니다.

### 폼을 만드는 태그

#### 폼(form)이란?

- HTML에서 폼이란 데이터를 서버에 보내기 위해 사용하는 모든 대화형 컨트롤을 의미합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/form' target="\_blank">form</a>

- 폼의 시작과 끝을 알리는 구획 태그입니다.
- method : 사용자가 입력한 내용들을 서버 쪽 프로그램에 어떻게 넘겨줄지 지정합니다.
  - get : 주소 표시줄에 사용자가 입력한 내용이 그대로 들어납니다. 넘길 수 있는 데이터의 제한이 있습니다.
  - post : 사용자의 입력을 표준 입력으로 넘겨줍니다. 넘길 수 있는 데이터의 제한이 없고 주소 표시줄에 들어나지 않습니다.
- autocomplete : 자동완성을 사용할지 여부를 설정합니다. 기본값은 on으로 설정되어 있습니다. on,off의 값을 가집니다.
- action : form태그 안의 내용들을 처리해 줄 프로그램의 주소(URI)를 지정합니다. 제출시 그 주소로 이동합니다.
- target : action태그에 지정된 주소를 어디에 열지를 지정합니다. a태그의 target 속성과 동일합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/fieldset' target="\_blank">fieldset</a>

- 폼 요소들을 그룹으로 묶을때 사용되는 구획 태그입니다.
- 사용시 태그 내부의 요소들을 검은색 실선으로 묶습니다.
- \<legend>태그로 구획의 이름을 표시할 수 있습니다.
- name : 그룹의 이름을 나타내는 속성입니다.
- disabled : 묶은 태그들을 비활성화한다. 비활성화된 태그는 회색으로 표시되어 작동하지 않습니다.
  - 값을 갖지 않으며, 적어도 무시됩니다.
- form : form 요소의 id를 값으로 갖는 속성으로 \<fieldset>과 \<form>을 연결해줍니다.
- \<fieldset> 내의 \<input>요소를 양식으로 묶으려면 해당 \<form>내에 직접 사용해야합니다.
- \<fieldset>에 대한 설명은 첫번째 자식으로 사용된 \<legend> 태그가 담당합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/legend' target="\_blank">legend</a>

- \<fieldset> 태그의 제목 혹은 콘텐츠 설명을 나타내는 태그입니다.

### 폼에 들어가는 컨트롤 태그들

#### 컨트롤 태그에서 어느정도 공통적으로 사용되는 속성

- form : 컨트롤과 연결된 양식의 id. 지정하지 않아도 조상 중에 form 요소가 있으면 해당 form과 연결됩니다.
  - 조상 중에 form 요소가 있어도 이 속성을 지정함으로 다른 폼 요소와 연결되도록 할 수 있습니다.
- name : 컨트롤의 이름을 지정한다. 서버쪽에서 식별자로 사용됩니다. id속성이 존재한다면 같은 값을 가져야 합니다.
- autocomplete : 자동완성기능 사용 여부를 지정한다. 지정하지 않을 경우 상위 태그의 설정을 상속받습니다.
  - 'on' 'off'값을 가집니다.
- disabled : 컨트롤과 상호작용이 가능한지 여부를 지정합니다. 지정하지 않을 경우 상위 태그의 설정을 상속받습니다.
  - bool값을 가지며 true일 경우 포커스도 잡을 수 없고 내용이 아예 제출되지 않습니다.
- readonly : 사용자가 컨트롤 안의 내용을 수정가능한지 여부를 지정합니다. disabled 속성과는 다르게 값은 제출됩니다.
  - bool값을 가지며 true여도 포커스는 잡을 수 있습니다.
- required : 사용자가 양식을 제출하기 전에 이 컨트롤을 꼭 채워야 함을 나타냅니다. 값을 가지지 않습니다.
- autofocus : 이 속성을 지정하면 페이지를 불러왔을 때 자동으로 포커스를 가집니다.
  - 페이지의 컨트롤 요소 중 단 하나만 이 속성을 가질 수 있습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/label' target="\_blank">label</a>

- 대화형 컨트롤 요소에 설명을 붙일 때 사용하는 태그입니다.
- 레이블 가능한 컨트롤 요소와 연결할 수 있습니다.
- 레이블을 눌러서 컨트롤 요소에 초점을 맞출 수 있으므로 마우스나 터치스크린 사용자에게 도움이 됩니다.
- 또한 컨트롤 요소와 설명이 명시적으로 연결되므로 보조기술 이용자의 웹 접근성이 향상됩니다.
- for : 레이블 가능한 컨트롤 태그의 id를 값으로 가져 레이블과 컨트롤을 연결합니다.
  - 컨트롤과 레이블을 연결하는 방법 1 : 컨트롤의 id속성 값을 label의 for 속성값에 작성합니다.
  - ex) \<label for="name"> 이름\</label> \<input type="text" id="name">
  - 1번 방법을 사용할 경우 \<label>태그와 컨트롤 요소가 떨어져 있어도 된다는 장점이 있습니다.
  - id는 원칙적으로 문서내에 하나만 존재해야 하므로 제대로 작성했다면 문제 될 일이 없습니다. 하지만 같은 id를 가진 컨트롤 요소가 여러개 존재한다면 label은 가장 가까운 컨트롤 요소와 연결됩니다.
  - 컨트롤과 레이블을 연결하는 방법 2 : 컨트롤을 레이블 태그 안에 작성합니다. (for와 id 필요없습니다)
  - ex) \<label> 이름 \<input type="text"> \</label>
  - 2번 방법을 사용할 경우 \<label> 태그 내부에 여러개의 컨트롤 요소가 있다면 제일 첫번째 컨트롤과 연결됩니다.
  - 1번과 2번 방법을 동시에 사용했을 경우 for,id 연결이 우선시 됩니다.
- form : label태그가 form태그 밖에 있더라도 같이 묶여진 요소임을 알려주는 속성입니다. form태그의 id값을 값으로 가집니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/meter' target="\_blank">meter</a>

- 스칼라 값 혹은 백분율을 시각적으로 보여줄 때 사용되는 태그입니다.
- 그냥 어떠한 수치의 결과를 보려면 meter입니다. meter태그는 변함없이 그 수치를 볼 때 사용합니다.
- label 태그처럼 대화형 컨트롤 요소와 연결하여 데이터를 시각화하는데 사용됩니다.
- value : 현재 값. meter태그가 대화형 컨트롤 요소는 아니기 때문에 직접적으로 제출되는 값은 아닙니다.
  - min값과 max값을 지정한 경우 그 사이여야 합니다. 지정하지 않았거나 잘못된 값인 경우 0으로 간주합니다.
  - 지정했지만 min값과 max값 사이가 아닐 경우 값은 그대로지만 넘친 값은 잘려서 표현되지 않습니다.
- min : 표현 가능한 최소값. max 값보다 작아야 합니다. 지정하지 않을 경우 기본값은 0입니다.
- max : 표현 가능한 최대값. min 값보다 커야합니다. 지정하지 않을 경우 기본값은 1입니다.
- low : 값이 작다고 할 수 있는 최대값. 값이 min ~ low 사이에 있을 경우 값이 작다고 표현합니다.
  - low의 값은 min값을 초과해야하며, max, high값 미만이어야 합니다.
  - 지정하지 않거나, min값보다 작을 경우 min값과 같은 값으로 취급됩니다.
  - 기본적으로 현재 값이 low 이하이면 바가 노랗게 표현됩니다.
- high : 값이 크다고 할 수 있는 최소값. 값이 high ~ max 사이에 있을 경우 값이 크다고 표현합니다.
  - high의 값은 max값 미만이어야 하며, min, low값 초과여야 합니다.
  - 지정하지 않거나, max값보다 클 경우 max값과 같은 값으로 취급됩니다.
  - 기본저긍로 현재 값이 high 이상이면 바가 노랗게 표현됩니다.
- optimum : 이상적인 값. low, high 속성과 함께 사용될 때 의미가 있습니다.
  - optimum 값이 min과 low 사이라면 값이 작은게 이상적이고, high와 max사이라면 값이 큰게 이상적입니다.
  - 설정하지 않았거나, optimum값이 low와 high 사이라면 중간값일 때 이상적입니다.
  - 기본적으로 값이 이상적인 범위에 있다면 바가 초록색으로 표시됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/progress' target="\_blank">progress</a>

- 작업의 진행률을 시각적으로 보여줄 때 주로 사용하는 태그입니다.
- 파일 업로드를 할 때 지금 당장의 진행도를 알고 싶으면 progress를 사용합니다.
- meter 태그와 다르게 progress 태그의 값 범위는 항상 0 ~ max까지로 min값을 따로 설정할 수 없습니다.
- label 태그처럼 대화형 컨트롤 요소와 연결하여 데이터를 시각화하는데 사용됩니다.
- max : 작업이 완료되기 위해서 수행되어야 하는 총 작업량. 0을 초과하는 유효한 부동소수점 값을 가져야합니다.
  - 설정하지 않을 경우 기본값은 1입니다.
- value : 현재까지 완료된 작업량. max값을 지정했을 경우 max 값 이하의 유효한 부동소수점 값이어야 합니다.
  - 값이 지정되지 않았을 경우 미결정 상태로 작업이 언제 완료 될지 알 수 없음을 나타냅니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/textarea' target="\_blank">textarea</a>

- 여러줄의 텍스트를 나타내거나 입력할 수 있는 공간을 나타내는 태그입니다.
- cols : textarea의 넓이를 지정합니다. 값은 단위를 적지 않은 양의 정수여야 합니다. em단위로 지정됩니다.
- rows : textarea의 높이를 지정합니다. 값은 단위를 적지 않은 양의 정수여야 합니다. em단위로 지정됩니다.
- maxlength : 입력가능한 최대 문자 크기를 지정합니다. 지정할 경우 그 이상은 입력되지 않습니다.
- minlength : 사용자가 입력해야하는 문자의 최소 개수를 지정합니다. 부족하면 제출되지 않습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/select' target="\_blank">select</a>

- 드롭다운 목록을 만들때 사용하는 태그입니다.
- 내부에 \<option> 태그를 사용해서 선택지를 만듭니다.
- multiple : 지정한 경우, 메뉴에서 다수의 옵션을 선택할 수 있습니다.
  - 이 속성이 있고 size 속성이 없을 경우 대부분의 브라우저가 드랍다운 목록이 아닌 선택 가능한 모든 옵션을 보여줍니다.
  - 컨트롤을 누르고 누르거나 드래그를 해야 여러 개가 선택됩니다.
- size : multiple 속성등의 이유로 스크롤 가능한 목록 상자로 표현할 경우에 한번에 보여줄 옵션의 수를 나타냅니다.
- em 단위로 목록 상자의 크기가 커지는 식으로 표현됩니다.
- 스크롤 가능한 목록 상자로 바꾸지 않았어도 size값이 2 이상이면 스크롤 가능한 목록 상자가 됩니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/datalist' target="\_blank">datalist</a>

- input태그와 함께 사용되며 드랍다운 메뉴로 추천 입력값을 보여주는 태그입니다.
- \<input> 요소에 데이터를 입력할 때 미리 정의된 옵션을 드롭다운 리스트로 보여줌으로써 자동완성 기능을 제공합니다. \<input> 요소의 list 속성값으로 \<datalist> 요소의 id 속성값을 명시하면, 해당 \<datalist> 요소에서 미리 정의한 옵션들을 \<input> 요소에서 사용할 수 있습니다.
- 그외는 select 태그와 거의 비슷합니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/optgroup' target="\_blank">optgroup</a>

- \<select>태그와 \<datalist>태그의 선택지로 사용되는 \<option>태그를 묶을 때 사용되는 구획 태그입니다.
- 그룹의 이름을 나타내는 label 속성을 필수로 가져야합니다.
- disabled 속성을 사용하면 하위 옵션을 선택 불가하게 만듭니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/option' target="\_blank">option</a>

- \<select>태그와 \<datalist>태그의 선택지로 사용되는 태그입니다.
- label : 옵션의 텍스트를 나타내는 속성.
  - 지정하지 않을 경우 요소의 텍스트 콘텐츠로 지정됩니다. 지정했을 경우 요소의 텍스트 콘텐츠는 무시됩니다.
- value : 서버에 보낼 실제 값을 나타내는 속성.
  - 지정하지 않을 경우 요소의 텍스트 콘텐츠로 지정됩니다. 텍스트 콘텐츠도 비어있을 경우 null값이 지정됩니다.
- selected : 초기 값으로 이 옵션이 선택되어 있게 합니다. multiple 속성이 없을 경우 하나의 옵션값만 지정할 수 있습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/output' target="\_blank">output</a>

- 웹 사이트나 앱에서 계산이나 사용자 행동의 결과를 삽입할 수 있는 컨테이너 요소입니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input' target="\_blank">input</a>

- HTML의 대표적인 입력 컨트롤 태그입니다. 대화형 컨트롤을 만들 때 사용되는 태그입니다.
- type값에 따라 매우 다양한 작동방식을 갖는다.
  - text, password, submit 등
- type값을 지정하지 않을 경우의 기본값은 'text'입니다.
- 같은 속성값도 타입에 따른 다른 작동 방식을 갖을 수 있으니 사용에 주의해야합니다.
- input에 대한 내용은 너무 많기 때문에 <a href='/frontend/input/' target="\_blank">별도의 글</a>로 정리되어 있습니다.

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/button' target="\_blank">button</a>

- 표준 버튼 컨트롤을 만드는 태그입니다.
- type를 넣지 않거나 submit으로 하면 form이 동작합니다.

### 문서의 섹션 및 메인 요소 구조화

- section 일반 섹션 요소
- article 독립 섹션 요소
- aside 보조 섹션 요소
- nav 내비게이션 섹션 요소
- main 메인 요소

### 그룹핑 요소

- address : 사람(들), 기업의 정보 제공 요소입니다.

### 임베디드 요소

picture HiDPI 반응형 이미지 대응 요소 ( 사이즈 별로 이미지 설정 -

ex) <source media="(min-width: 650px)" srcset="images/kitten-stretching.png">)

- source : 다중 미디어 리소스 지정 요소입니다.
- video : 동영상 콘텐츠 요소입니다.
- audio : 오디오 콘텐츠 요소입니다.
- track : 트랙 요소입니다.(자막 요소)
  - WebVTT 자막 파일
  - Track 엘리먼트 기초
- iframe : 인라인 프레임 요소입니다.
- SVG: Scalable Vector Graphic
- MathML: Mathematical Markup Language

### 인터렉티브 요소

- details : 보다 자세한 추가 정보를 제공하는 위젯 요소입니다
- summary : details 요소 내부에 추가되는 레이블(제목) 요소입니다.
- dialog : 다이얼로그(대화상자) 요소입니다.

### 스크립팅 요소

- script: 자바스크립트를 작성할 영역입니다.
- noscript : 자바스크립트 지원 하지 않을 때 표현 할 요소입니다.
- canvas : 캔버스 요소입니다.

### 사용자와 상호 작용 하는 속성

- \<input type=“hidden”>은 사용자에게는 보이지 않는 숨겨진 입력 필드를 정의합니다.
- tabindex 전역 특성은 요소가 포커스 가능함을 나타내며, 이름에서도 알 수 있듯, 주로 Tab 키를 사용하는 연속적인 키보드 탐색에서 어느 순서에 위치할지 지정합니다.
  - 음의 정숫값(보통 tabindex="-1")은 연속 키보드 탐색으로 접근할 수는 없으나 JavaScript나 시각적으로는 포커스 가능함을 뜻합니다. 많은 경우, JavaScript를 사용한 위젯의 접근성 확보를 위해 사용합니다.
  - tabindex="0"은 기본값으로, 요소에 연속 키보드 탐색으로 접근할 수 있으며 그 순서는 문서 소스 코드의 순서에 따른다는 것을 나타냅니다.
  - 양의 정숫값은 요소를 연속 키보드 탐색으로 접근할 수 있으며, 그 순서는 해당 값으로 지정하겠다는 것을 뜻합니다. 즉, tabindex="4"인 요소는 tabindex="5"인 요소 이전에, 그러나 tabindex="3"인 요소 이후에 접근할 수 있습니다. 다수의 요소가 하나의 값을 공유할 경우 그 안에서 문서 소스 코드의 순서를 따릅니다. 최댓값은 32767입니다.
  - 0보다 큰 tabindex 값을 피하세요. 접근성 보조기술 사용자의 페이지 탐색과 조작에 방해될 수 있습니다. 대신, 문서의 요소 순서를 논리적인 순서대로 배치하세요.
  - <div>에 tabindex를 설정할 경우, 콘텐츠에도 tabindex를 지정하지 않는 한 화살표 키로 스크롤 할 수 없습니다. fiddle을 방문해 tabindex가 스크롤에 주는 영향을 확인하세요. 단축키를 활성화하는 방법은 브라우저와 플랫폼에 따라 다를 수 있습니다. mac chrom은 control + option + 단축키 입니다.
- accesskey 전역 특성은 현재 요소에 대한 키보드 단축키를 생성할 때 사용할 힌트를 제공합니다. accesskey 속성의 값은 반드시 출력 가능한 단일 문자(키보드로 입력할 수 있는 글자)여야 합니다.
- contenteditable 전역 특성은 사용자가 요소를 편집할 수 있는지 나타내는 열거형 특성입니다.
- draggable 전역 특성은 요소의 드래그 가능 여부를 나타내는 열거형 특성으로, 네이티브 브라우저 동작 방식과 HTML Drag and Drop API 모두 통제합니다.
  - draggable 특성은 불리언이 아니고 열거형 특성이므로, true 또는 false의 지정 또한 필수입니다. 그러므로 \<img draggable>처럼 사용할 수 없고, 올바른 사용법은 \<img draggable="false">입니다.

### marquee

- marquee element는 스크롤 되는 영역을 지정합니다.
- duplicate 된 것으로 보입니다.

## a 태그 안에서는 a 태그를 사용할 수 없습니다.

## HTML5 API

| API              | 설명                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| Drag and Drop    | HTML 요소 혹은 파일을 끌어서(드래그해서) 다른 HTML 요소에 놓을 때(드롭할 때) 데이터를 전달하는 기능을 제공합니다. |
| Blob             | 이진 데이터를 다루는 기능을 제공합니다.                                                                           |
| File             | 로컬 파일 시스템을 읽고 쓸 수 있는 기능을 제공합니다.                                                             |
| Web Workers      | 프로그램 여러 개를 멀티스레드로 병렬 처리하는 기능을 제공합니다.                                                  |
| Web Stroage      | 대용량이며 저장 기간에 제한이 없는 데이터를 로컬에 저장하는 기능을 제공합니다.                                    |
| Indexed Database | 로컬에 키-값(key-value) 타입의 관계형 데이터베이스 기능을 제공합니다.                                             |
| WebSockets       | 서버와의 양방향 통신 기능을 제공합니다.                                                                           |
| Geolocation      | GPS 등의 위치 정보를 다루는 기능을 제공합니다.                                                                    |
| Canvas           | 2차원, 3차원 그래픽스 기능을 제공합니다.                                                                          |

---

## 참고

- ['HTML 기본' 카테고리 목록](https://lypicfa.tistory.com/611)
