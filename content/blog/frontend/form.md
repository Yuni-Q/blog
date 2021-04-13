---
title: form
date: 2020-08-13 09:08:63
category: frontend
tags: ['form', 'html']
draft: true
---

## \<form> 의 자식태그

- \<button> : 클릭 가능한 버튼입니다. 기본 type은 submit입니다.
- \<input> : 22가지 type을 지원합니다. 기본 type은 text입니다. \<form>과 가장 많이 쓰이는 요소 중 하나입니다.
- \<label> : \<form>에 `라벨`을 달아주는 역할입니다. \<label>의 for 속성과 \<input>의 id 속성이 서로 같거나 \<label>의 자식으로 \<input>을 두어야 합니다. \<input>에 focus가 오면 스크린리더가 <label>을 읽기 때문에 접근성 측면에서 중요합니다. 버튼이 너무 작더라도 <label>을 눌러 선택, 토글할 수 있어 유용합니다.
- \<select> : \<option>의 드랍다운을 만들어줍니다. 기본값으로 가장 첫번째 \<option>이 선택되며 직접 입력은 불가능합니다. size 속성으로 드랍다운이 아니라 한 번에 여러 개를 보여주는 스크롤로 만들 수 있습니다.
- \<optgroup> : \<select>를 카테고리별로 묶을 수 있습니다.
- \<datalist> : \<option>의 드랍다운을 만들어줍니다. 검색기록 자동완성과 같이 직접 입력이 가능합니다. \<datalist>의 id 속성과 \<input>의 list 속성이 서로 같아야 합니다.
- \<option> : 드랍다운 리스트에 어떤 옵션을 담을지 정의합니다. value 속성을 가집니다.
- \<fieldset> : \<form>에서 관련 요소를 그룹화할 때 사용합니다. 관련 요소 주위에 상자를 그려줍니다.
- \<legend> : \<fieldset> 요소 첫번째 자식으로 \<fieldset> 그룹을 설명하는 캡션 역할을 합니다.
- \<output> : \<form>의 oninput속성에 있는 계산을 수행하고 결과를 \<output> 요소에 표시합니다.
- \<textarea> : 여러 줄을 입력할 수 있는 텍스트필드입니다. rows 속성은 몇 줄 보일지를, cols 속성은 너비를 지정해줍니다.

### \<form> 자체에 가질 수 있는 속성

- name : \<form> 의 이름을 적습니다.(text)
- autocomplete : 자동완성 기능 사용여부를 지정합니다.(on, off)
- novalidate : 제출 시 입력된 값의 유효성을 검사하지 않도록 지정합니다.(novalidate)
- action : \<form> 제출 시 데이터를 어디로 보낼지 적습니다.(URL)
- method : 데이터를 보낼 때 사용할 HTTP 메서드를 지정합니다.(get, post)
- charset : \<form> 제출 시 사용할 문자 인코딩을 지정합니다.(character_set)
- enctype : POST 메서드로 데이터를 서버에 제출할 경우 인코딩을 지정합니다.(application/x-www-form-urlencoded, multipart/form-data, text/plain)
- target : form 제출 후 받은 응답을 어디에 표시할지 키워드를 적습니다.(\_blank, \_self, \_parent, \_top)
- rel : 현재 문서와 연결된 리소스 간의 관계를 적습니다.(external, help, license, nofollow, noopener, noreferrer, opener, prev, next, search)

### \<form> 의 메서드

- reset() : \<form> 내부의 모든 값(value)을 초기화해줍니다. 초기화 버튼(\<button type="reset">)을 클릭한 것과 같은 효과입니다. 기본값(default value)을 지정해놨다면 이 값으로 다시 초기화됩니다.
- submit() : \<form>을 제출합니다. 제출 버튼(\<button type="submit">)을 클릭한 것과 같은 효과입니다.
