---
title: React x 웹 구성 요소 - 현재 상태 및 상태
Could Be
date: 2023-04-02 21:04:36
category: develop
tags: []
draft: true
---

## Web Component

- 비디오, 오디오 태그는 태그와 소스만으로 훌륭하게 동작한다.
- 웹 컴포넌트로 자신만의 요소를 만들어 사용할 수 있다.
- 웹 컴포넌트는 재사용이 가능하다.
- 여러 용도로 사용할 수 있다.
- 대부분의 브라우저가 웹 컴포넌트를 지원합니다.

### 예시

- dawane-timer
  - 날짜 선택기, 타이머
- AR, XR, WEB XR(tia tac toe 게임)
- vc-messages
- vc-keypad
  - openwc 사용
- 유투브 시간 표시
  - time-age

## 리액트가 필요한 이유?

- 속성은 기본적으로 문자열이다.
- ref를 활용하여 문제를 해결한다.

## ::PART

```html
<template id="tabbed-custom-element">
  <style>
    *,
    ::before,
    ::after {
      box-sizing: border-box;
      padding: 1rem;
    }
    :host {
      display: flex;
    }
  </style>
  <div part="tab active">Tab 1</div>
  <div part="tab">Tab 2</div>
  <div part="tab">Tab 3</div>
</template>

<tabbed-custom-element></tabbed-custom-element>
```

```css
tabbed-custom-element::part(tab) {
  color: #0c0dcc;
  border-bottom: transparent solid 2px;
}

tabbed-custom-element::part(tab):hover {
  background-color: #0c0d19;
  color: #ffffff;
  border-color: #0c0d33;
}

tabbed-custom-element::part(tab):hover:active {
  background-color: #0c0d33;
  color: #ffffff;
}

tabbed-custom-element::part(tab):focus {
  box-shadow: 0 0 0 1px #0a84ff inset, 0 0 0 1px #0a84ff,
    0 0 0 4px rgba(10, 132, 255, 0.3);
}

tabbed-custom-element::part(active) {
  color: #0060df;
  border-color: #0a84ff !important;
}
```

```js
let template = document.querySelector('#tabbed-custom-element');
globalThis.customElements.define(
  template.id,
  class extends HTMLElement {
    constructor() {
      super().attachShadow({ mode: 'open' }).append(template.content);
    }
  },
);
```

---

## 참고

- [React x Web Components : How It Is and How It Could Be by Dwane Hemmings | JSConf Korea 2022](https://www.youtube.com/watch?v=JFotV9Fb6cI)
