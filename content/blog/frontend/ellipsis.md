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
	display: -webkit-box;
	-webkit-line-clamp: 3; /* 원하는 라인 수 */
	width: 100px; /* width 값 반드시 필요 */
	height: 66px; /* 높이는 원하는 줄 수와 width에 따라서 맞게 조정해야 합니다. */
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
}
```

- line-clamp : 몇줄뒤에 콘텐츠를 자를지를 설정 합니다.
- box-orient : 박스의 흐름 방향을 지정합니다.

## 한줄에 여러 요소가 있는 경우 나머지 영역을 모두 채우고 ellipsis

```css
div {
	white-space: normal;
	line-height: 1.5;
	height: 1.5em;
	text-align: left;
	word-wrap: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
```

- 부모에게 `display: flex`, 형제에겐 `flex-shrink: 0`을 주면 남은 영역을 모두 차지하고 첫번째 줄에서 ellipsis 됩니다.
