---
title: lh and rlh
date: 2020-05-08 09:05:87
category: frontend
draft: true
---

- CSS 값에 대한 레벨 4 사양에서 완전히 인식하지 못한 몇 가지 새로운 단위가 있습니다.
- lh은 계산 된 값과 동일한 line-height, rlh는 루트 요소 (아마도의 동일 html요소)가 아닌 현재의 구성 요소의 line-height 입니다.

```css
.inline-icon {
	display: inline-block;
	width: 1lh;
	height: 1lh;
}
```
