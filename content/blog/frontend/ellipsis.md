---
title: ellipsis
date: 2020-04-28 09:04:01
category: frontend
draft: false
---

## 1줄

```css
div {
	overflow: hidden;
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 100px; /* width 값 반드시 필요 */
}
```

## 2줄

```css
div {
	overflow: hidden;
	display: -webkit-b ox;
	-webkit-line-clamp: 3; /* 원하는 라인 수 */
	width: 100px; /* width 값 반드시 필요 */
	height: 66px; /* 높이는 원하는 줄 수와 width에 따라서 맞게 조정해야 합니다. */
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
}
```

- line-clamp : 몇줄뒤에 콘텐츠를 자를지를 설정 합니다.
- box-orient : 박스의 흐름 방향을 지정합니다.
