---
title: text
date: 2020-11-23 10:11:87
category: frontend
tags: []
draft: true
---

## 텍스트 안으로 이미지 보이기

```css
.box {
	mix-blend-mode: multiply;
}
```

## 텍스트에 그라디언트 넣기

```css
div {
	display: inline;
	background: linear-gradient(to right red, blue);
	font-size: 100px;
	font-family: alrial;
	font-weight: bold;
	-webkit-background-clip: text;
	/* 텍스트에 컬러를 사라지게 해줍니다. */
	-webkit-text-fill-color: transparent;
}
```

## text stroke

```css
div {
	font-size: 100px;
	font-family: alrial;
	font-weight: bold;
	text-shadow: 1px 0 0 red, 0 1px 0 red, -1px 0 red, 0 -1px 0 red,
		-1px -1px 0 red, 1px 1px 0 red 1px -1px 0 red -1px 1px 0 red;
}
```

## SVG text stroke

```html
<html>
	<body>
		<div>
			<svg>
				<text y="90px">text</text>
			</svg>
		</div>
	</body>
</html>
```

```css
div {
	background: gray;
}
svg {
	display: block;
	width: 400px;
	height: 100px;
	border: 1px solid red;
	font-size: 100px;
	font-family: alrial;
	font-weight: bold;
}
svg text {
	fill: none;
	stroke: red;
	stroke-width: 3px;
}
```

## 3D 텍스트

```css
div {
	font-size: 100px;
	font-family: alrial;
	font-weight: bold;
	color: rgba(255, 255, 255, 0.5);
	text-shadow: 2px 2px 0 red, 3px 3px 0 blue, 4px 4px 0 green, 5px 5px 0 pink,
		6px 6px 0 gray;
}
```
