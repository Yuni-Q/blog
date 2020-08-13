---
title: html content 숨기기
date: 2020-08-13 09:08:52
category: frontend
tags: ['display', 'visibility', 'hidden', 'aria-describedby', 'a11y-hidden']
draft: false
---

## 비권장방식

- display: none;
- visibility: hidden;
- width: 0; hight: 0; overflow: hidden;

## 권장방식

- hidden 클래스와 aria-describedby를 활용하여 읽게 할 수 있습니다.
- a11y-hidden

```css{
  .a11y-hidden {
    width: 1px;
    height: 1px;
    overflow : hidden;
    margin: -1px
    clip : rect(0,0,0,0);
    position: absolute;
  }
}
```
