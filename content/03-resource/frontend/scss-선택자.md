---
title: scss 선택자
date: 2020-08-12 10:08:61
category: frontend
tags: ['css', 'scss', 'not']
draft: true
---

## not 선택자

```css
:not(p) {
	color: red;
}
```

- p가 아닌 곳은 모두 빨간색 글씨로 합니다.

```css
p:not(.choo) {
	color: red;
}
```

- 클래스명 choo가 아닌 p는 모두 빨간색 글씨로 합니다.

```scss
.good {
	&: not(.Frame &) {
		color: red;
	}
}
```

- 클래스명이 good이면서 Frame 클래스명을 가진 클래스 하위에 있지 않은 클래스명이 good인 element

```scss
.good {
	.Frame & {
	}
}
```

- Frame 클래스명을 가진 클래스 하위에 있는 클래스명이 good인 element
