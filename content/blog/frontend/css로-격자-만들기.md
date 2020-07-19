---
title: CSS로 격자 만들기
date: 2020-03-13 13:03:70
category: frontend
draft: true
---

```css
html {
	height: 100%;
	background-image: linear-gradient(
			135deg,
			#000 25%,
			transparent 25%,
			transparent 75% #000 75%
		), linear-gradient(135deg, #000 25%, transparent 25%, transparent 75%),
		#000 75%;
	background-repeat: repeat;
	background-position: 0 0, 25px, 25px;
	background-size: 50px 50px;
}
```

## 참조

- [[code-lab] CSS Gradient로 투명배경판 만들기](https://www.youtube.com/watch?v=JrAbPcxsNgQ&fbclid=IwAR1c21H5AolhV9SSBnjyylGTUyyIZm-83cAl5oo9czlibqHw5jtF6f_W52w)
- [[CSS] linear-gradient를 활용하여 체스판 배경 만들기](http://ilovemarkup.blogspot.com/2020/03/linear-gradient.html)
