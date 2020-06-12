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

## flex를 이용한 ellipsis

```css
.text-ellipsis {
	flex: 1;
	min-width: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
```

## 버그

- 숫자만 있는 경우 ellipsis가 제대로 작동하지 않았습니다.

### 해결 방안 1

- element에 overflow: hidden을 적용하면 해결할 수 있습니다.

### 해결 방안 2

- word-break: break-all을 넣어 줍니다.
- word-break 는 말 그대로 단어를 자르는 겁니다. 기복적으로 줄이 넘어갈 때는 단어단위로 잘려서 넘어가게 되어 있습니다. 그래서 띄어 쓰기를 하지 않고 글을 쓴다면 한 단어로 인식하여서 width 를 넘어가도 줄바꿈이 되지 않습니다. 그럴 때 word-break 를 사용해주면 줄바꿈이 가능하게 됩니다.
  - normal : 평소 규칙대로 단어를 분리합니다.
  - break-all : 단어가 문자별로 분리되어 단어의 중간에도 줄 바꿈이 됩니다.
  - keep-all : 문자별로 분리되는 것을 금지합니다.

#### word-break 속성과 word-wrap 속성

- word-break : 단어의 분리를 어떻게 할 것인지 결정합니다.
- word-wrap : 박스의 가로 영역을 넘친 단어 내에서 임의의 분리 여부를 결정합니다.
