---
title: input
date: 2020-02-08 15:02:74
category: frontend
draft: false
---

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

## input number spiner 제거

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
