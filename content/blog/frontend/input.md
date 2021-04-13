---
title: input
date: 2020-02-08 15:02:74
category: frontend
draft: false
---

## \<input type=" "> 속성

- type="submit" : \<input>을 form handler에 데이터를 제출하기 위한 버튼으로 지정합니다. form handler는 보통 데이터를 처리하는 서버단 페이지로 지정됩니다. 버튼에 value 속성을 지정하면 \<input>에 기본값(default value)로 표시됩니다.
- type="reset" : \<input>을 초기화버튼으로 지정합니다. 클릭 시 \<form> 내부의 모든 값(value)을 초기화해줍니다. 기본값(default value)을 지정해놨다면 이 값으로 다시 초기화됩니다.
- type="button" : \<input>을 버튼으로 지정합니다.
- type="img" : \<input>을 이미지버튼으로 지정합니다.
  - \<input type="image" src="img_submit.gif" alt="Submit" width="48" height="48">
- type="text" : \<input>을 한 줄 입력 가능한 텍스트필드로 지정합니다. input의 기본 type입니다 size값을 지정하면 필드 너비가 자동조정됩니다. 기본 size값은 `20`입니다.
- type="search" : \<input>을 검색필드로 지정합니다. 일반적인 텍스트필드처럼 동작합니다.
- type="password" : \<input>을 암호필드로 지정합니다. 입력한 텍스트는 별표나 원으로 마스킹됩니다.
- type="tel" : \<input>을 전화번호 필드로 지정합니다. pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"과 함께 사용해서 형식을 지정할 수 있습니다.
- type="email" : \<input>을 이메일을 포함해야하는 입력필드로 지정합니다. 브라우저에 따라 제출 시 이메일 주소 유효성검사가 자동으로 이루어집니다. 일부 스마트폰에서는 type="email"을 인식하고 키보드에 ".com"를 추가로 띄워줍니다.
- type="url" : \<input>을 URL주소를 포함해야하는 입력필드로 지정합니다.
- type="number" : \<input>을 숫자 입력만 가능한 필드로 지정합니다. min, max값을 지정하면 자릿수에 따라 필드 너비가 자동조정됩니다.
- type="range" : \<input>을 슬라이드 컨트롤과 범위 내 숫자를 선택할 수 있는 컨트롤로 지정합니다. 기본 범위는 0부터 100이고, min, max, step 속성을 추가로 지정할 수 있습니다.
- type="radio" : \<input>을 라디오버튼으로 지정합니다. 선택지 중 단 하나의 항목만 선택할 수 있습니다.
- type="checkbox" : \<input>을 체크박스로 지정합니다. 선택지 중 0개, 1개 또는 여러 개를 선택할 수 있습니다.
- type="color" : \<input>을 색상팔레트로 지정합니다. value="#ff0000"과 같이 헥사코드로 기본값을 지정할 수 있습니다.
- type="time" : \<input>을 Time Picker로 지정합니다.(no time zone)
- type="date" : \<input>을 Date Picker로 지정합니다. min, max속성으로 날짜 범위를 지정하면 Date Picker 캘린더에 지정한 기간만 활성화됩니다.
- type="datetime-local" : \<input>을 Date Picker & 시간입력 필드로 지정합니다.(no time zone)
- type="week" : \<input>을 Week Picker로 지정합니다.
- type="month" : \<input>을 연도와 달을 Picker로 지정합니다.
- type="file" : \<input>을 `파일선택 버튼`과 `선택된 파일 표시`로 지정합니다.
- type="hidden" : \<input>을 숨겨진 입력필드로 지정합니다. 사용자가 보거나 수정할 수 없는 데이터를 포함하는 용도로 사용합니다. 개발자 도구에서보거나 편집할 수 있으므로 보안의 형태로 사용해서는 안 됩니다.

## \<button type="submit">과 <input type="submit">의 차이

- 둘 다 데이터를 서버에 제출하기 위한 버튼입니다. 모양도 똑같이 버튼으로 표현된다는 점도 똑같습니다.
- 둘의 차이점은 <button>은 안에 내용을 표현할 수 있고, <input>은 표현할 수 없다는 점입니다.

## \<input form-\*=" "> 속성

- form : \<input>이 어느 \<form>에 속하는지 지정합니다. \<input>의 form 속성과 \<form>의 id 속성이 같아야 합니다.

```html
<form action="/action_page.php" id="form1">
  <input type="text" id="lname" name="lname" form="form1" />
</form>
```

- formaction : type="submit", type="image"와 함께 쓰이며, 데이터 제출 시 데이터를 어디로 보낼지 적습니다. \<form>에서 지정한 action 속성보다 우선순위가 높습니다.

```html
<input type="submit" formaction="/action_page2.php" value="Submit as Admin" />
```

- formenctype : type="submit", type="image"와 함께 쓰이며, POST 메서드로 데이터를 서버에 제출할 경우 인코딩을 지정합니다. \<form>에서 지정한 enctype 속성보다 우선순위가 높습니다.

```html
<input
  type="submit"
  formenctype="multipart/form-data"
  value="Submit as Multipart/form-data"
/>
```

- formmethod : type="submit", type="image"와 함께 쓰이며, 데이터를 보낼 때 사용할 HTTP 메서드를 지정합니다. \<form>에서 지정한 method 속성보다 우선순위가 높습니다.

```html
<input type="submit" formmethod="post" value="Submit using POST" />
```

- formtarget : type="submit", type="image"와 함께 쓰이며, form 제출 후 받은 응답을 어디에 표시할지 키워드를 적습니다. \<form>에서 지정한 target 속성보다 우선순위가 높습니다.

```html
<input type="submit" formtarget="_blank" value="Submit to a new window/tab" />
```

## <input>이 가질 수 있는 속성

- name : \<input>의 이름을 지정합니다. name 속성은 JavaScript에서 요소나 제출된 데이터를 참조해올 때 사용합니다. `form을 제출할 때, name 속성이 있는 요소만 값이 전달됩니다.`
- value : \<input>의 기본값을 지정합니다.
- placeholder \<input>에 입력해야할 형식 샘플이나 간단한 설명을 힌트로 제공합니다.
- pattern : \<input>의 입력값을 확인할 정규식을 지정합니다. ex) pattern="[A-Za-z]{3}"
- required : \<input>을 필수로 작성해야 한다고 지정합니다.
- max, min, step : \<input>의 최댓값, 최솟값, 숫자간격을 지정합니다.
- maxlength, minlength : \<input>의 최대, 최소 문자 수를 지정합니다.
- size : \<input>의 너비(문자)를 지정합니다.
- readonly : \<input>을 읽기전용으로 지정합니다. `form 제출 시 때 읽기전용 필드의 값도 전송됩니다.` 읽기전용 필드는 수정은 되지 않지만, 그 외 사용자와 상호작용(드래그, 복사 등)은 할 수 있습니다.
- disabled : \<input>을 비활성화되도록 지정합니다.
- accept : \<input type="file">에서 선택할 수 있는 파일확장자를 지정합니다.
- alt : \<input type="img">에서 이미지의 대체 텍스트를 지정합니다.
- src : \<input type="img">에서 사용할 이미지의 URL을 지정합니다.
- checked : type="checkbox", type="radio"과 함께 쓰이며, \<input>의 기본(선택)값을 지정합니다.
- autocomplete : text, search, url, tel, email, password, datepickers, range, and color 타입과 함께 쓰이며, \<input>에 자동완성기능 on/off 여부를 지정합니다. on으로 지정할 경우 이전에 입력했던 값을 드랍다운으로 표시해줍니다.
- autofocus : \<input>이 페이지가 로드될 때 자동으로 포커스를 가지도록 합니다.
- dirname : \<input>의 텍스트방향을 지정할 수 있습니. dirname의 `속성.dir`은 name `속성`과 같아야 합니다.(한글처럼 왼쪽에서 오른쪽으로 읽을지, 아랍어처럼 오른쪽에서 왼쪽으로 읽을지의 방향을 말합니다.)
- list : \<input>에서 \<datalist>에서 정의한 옵션을 사용합니다. \<input>의 list 속성과 \<datalist>의 id 속성이 같아야 합니다.
- height, width : 입력 필드의 높이와 너비를 지정합니다.
- multiple : type="file", type="email"과 함께 쓰이며, 입력필드에 복수의 값을 입력할 수 있도록 지정합니다.

## number

- +, -, ., e은 input type이 number이어도 입력이 가능하기 때문에 onKeyDown에서 keyCode를 확인해서 입력을 막습니다.
- 아이폰에서 숫자키패드 노출을 하고 싶다면 `type=tel` 이나 `pattern="\d*"`로 사용합니다.

```tsx
import * as React from 'react';
class InputComponent extends React.Component {
  render() {
    return (
      <input
        type='number'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {}}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
        // type number 일 때 +-.e 의 입력을 막습니다
        onKeyDown={event => {
          if (
            type === 'number' &&
            (event.keyCode === 69 ||
              event.keyCode === 187 ||
              event.keyCode === 189 ||
              event.keyCode === 107 ||
              event.keyCode === 109 ||
              event.keyCode === 190 ||
              event.keyCode === 110)
          ) {
            event.preventDefault();
          }
        }}
      />;)
  }
}
```

- keyCode가 Deprecated 되었습니다...

## input 파일에서 확장자 제한 하기

```html
<input type="file" format="image/png, image/jpg, image/gif" />
```

## input number spinier 제거

```css
/* 엣지, 크롬, 사파리 */
input[type='number']::webkit-inner-spin-button,
input[type='number']::webkit-outer-spin-button {
  -webkit-appearance: none;
}

/* 파이어폭스 */
input[type='number'] {
  -moz-appearance: textfield;
}
```

## input에 x표시 제거

```css
/* IE */
input::-ms-clear,
input::-ms-reveal {
  display: none;
}

/* 엣지, 크롬, 사파리 */
input::-webkit-search-decoration,
input::-webkit-search-cancel-button,
input::-webkit-search-results-button,
input::-webkit-search-decoration {
  display: none;
}

/* 파이어폭스는 기본적으로 뜨지 않음 */
```

## 플레이스홀더 꾸미기

```css
::webkit-input-placeholder {
  color: red;
}
::-ms-input-placeholder {
  color: blue;
}
::-moz-placeholder {
  color: orange;
}

/* 최신 브라우저 */
::placeholder {
  color: pink;
}
```
