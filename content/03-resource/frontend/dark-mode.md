---
title: dark mode
date: 2020-08-06 12:08:05
category: frontend
tags: ['dark mode', 'css', 'media', 'javascript']
draft: true
---

- 웹페이지 다크 모드 지원은 prefers-color-scheme 미디어 쿼리를 사용해서 적용할 수 있습니다. 각 해상도에 따라 미디어 쿼리를 적용하는 방식과 크게 다르지 않습니다.

```css
.title {
	color: #101010;
}

.desc {
	background-color: darkorange;
}

@media (prefers-color-scheme: dark) {
	.title {
		color: #efefef;
	}
	.desc {
		background-color: peachpuff;
	}
}
```

- CSS 프로퍼티로 정의하면 자료와 구조를 분리할 수 있어 좀 더 깔끔해집니다.

```css
:root {
	--title-color: #101010;
	--desc-color: darkorange;
}

@media (prefers-color-scheme: dark) {
	:root {
		--title-color: #efefef;
		--desc-color: peachpuff;
	}
}

.title {
	color: var(--title-color);
}

.desc {
	background-color: var(--desc-color);
}
```

- 시스템 설정을 확인하기 위해서 window.matchMedia() 함수를 사용할 수 있습니다. CSS의 미디어 쿼리가 현재 페이지에 해당하는지 확인하는 기능을 제공합니다.

```javascript
function toggleTheme() {
	// 저장된 값이 없다면 시스템 설정을 기준으로 함
	const currentTheme =
		localStorage.getItem('theme') ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light');
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

	// 최상위 엘리먼트에 설정, 로컬 스토리지에 설정을 저장
	document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
}
```

- 만약 미디어 쿼리의 결과를 동적으로 반영해야 하는 경우에는 window.matchMedia()의 반환값인 MediaQueryList에 이벤트 리스너를 추가할 수 있습니다.

```javascript
const mql = window.matchMedia('(prefers-color-scheme: dark)');

mql.addListener(e => {
	if (e.matches) {
		// 해당 미디어 쿼리가 참인 경우
	} else {
		// 해당 미디어 쿼리가 거짓인 경우
	}
});
```

## 참고

- [웹페이지 다크 모드 지원하기](https://edykim.com/ko/post/dark-mode/)
