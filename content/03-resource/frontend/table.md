---
title: table
date: 2020-08-13 09:08:76
category: frontend
tags: ['table', 'html', 'css']
draft: true
---

- 접근성을 고려하여 콘텐츠를 화면에 감추려면 CSS를 사용하여 재사용(Reusable) 가능 하도록 클래스로 설계하여 사용합나디.

```css
.a11y-hidden {
	overflow: hidden;
	position: absolute;
	/* 화면에 공간이 그려지지 않는다. */
	clip: rect(0, 0, 0, 0);
	/* width와 height가 0이면 스크린리더가 읽지 못한다. */
	width: 1px;
	height: 1px;
	margin: -1px;
	border: 0;
	padding: 0;
}
```

- caption은 1px가 만들어지기 때문에 속성을 하나 추가해야합니다.

```css
.caption.a11y-hidden {
	position: static;
}
```

```css
/* 테투리 디자인 */
table,
th,
td {
	border: 1px solid #212121;
}

/* 테이블 셀 사이 간격을 접거나(collapse), 나눌(separate) 수 있습니다. */
table {
	border-collapse: collapse;
	/* 테이블 보더 사이 간격 설정 */
	/* border-collapse: separate; */
	border-spacing: 10px;

	/* 캡션(제목) 위치 설정 */
	caption-side: bottom;

	/* 테이블 레이아웃 설정 (auto | fixed) */
	/* auto 설정 시 콘텐츠에 따라 셀이 늘어남. */
	/* fixed 설정은 고정. (width 속성 필요) */
	table-layout: fixed;
}
td,
th {
	/* 마진 설정은 되지 않고 패딩 설정은 가능 */
	padding: 04em, 0.6em;

	/* 빈 셀의 표시 설정 (show | hide) */
	empty-cells: hide;
}
```
