---
title: css base
date: 2020-08-06 08:08:60
category: frontend
tags: ['css']
draft: true
---

## 1. reset CSS or nomalize CSS

- button 부분이 빠져 있기 때문에 초기화 코드를 추가합니다.

```css
button {
	border: none;
	background-color: transparent;
	cursor: pointer;
	color: inherit;
}
```

## 2. h1 margin 초기화

```css
h1 {
	margin: 0;
}
```

## 3. box-sizing을 context-box에서 border-box로 변경

```css
* {
	box-sizing: border-box;
}
```

## 4. body에 폰트 적용

## 5. a 태그 초기화

```css
a {
	color: inherit;
	text-decoration: none;
}

a:hover,
a:focus {
	color: inherit;
}
```

## 6. a11y-hidden 적용(화면에 보이지 말아야 할 text 숨기기)

```css
.a11y-hidden {
	overflow: hidden;
	width: 1px;
	height: 1px;
	background-color: red;
	position: absolute;
	clip: rect(0, 0, 0, 0);
	margin: -1px;
}
```

## 7. clearfix 추가

```css
.clearfix::after {
	content: '';
	display: block;
	clear: both;
}
```

## 8. 그리드 만들기

```css
body.show-grid::before {
	content: '';
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width: 940px;
	height: 400vh;
	background: repeating-linear-gradient(
		90deg,
		rgba(0, 200, 150, 0.2),
		rgba(0, 200, 150, 0.2) 60px,
		rgba(255, 255, 255, 0) 60px,
		rgba(255, 255, 255, 0) 80px
	);
}
```
