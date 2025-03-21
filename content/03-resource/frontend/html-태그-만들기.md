---
title: HTML 태그 만들기
date: 2020-09-17 12:09:55
category: frontend
tags: ['frontend', html']
draft: true
---

```html
<!DOCTYPE html>
<html lang="ko-KO">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>HTML 만들기</title>
	</head>
	<body>
		<button id="test">TEST</button>
		<script src="./index.js"></script>
	</body>
</html>
```

```javascript
class YuniQ extends HTMLElement {
	// createElemente 때 실행
	constructor() {
		super();
		this.state = {};
		console.log('constructor');
		this.addEventListener('click', e => {
			this.parentElement.removeChild(this);
		});
	}

	// appendChild 때 실행
	connectedCallback() {
		console.log('connectedCallback');
		this.innerText = Math.random();
		this.style.color = 'red';

		for (let i = 0; this.attributes.length; i += 1) {
			this.setAttribute(this.setAttribute[i].name, this.setAttribute[0].value);
		}
	}

	static get observedAttributes() {
		return ['id'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(name + '속성변함');
		console.log(oldValue);
		console.log(newValue);
	}

	disconnectedCallback() {
		console.log('제거됨');
		document.body.appendChild(this);
	}

	set label(value) {
		this.state.label = value;
		this.textContent = this.state.label;
	}

	get label() {
		return this.state.label;
	}
}

customElements.define('yuni-q', YuniQ);
document.querySelector('#test').addEventListener('click', e => {
	let yuniQ = document.createElement('yuni-q');
	yuniQ.innerHTML = '처음모습';
	document.body.appendChild(yuniQ);

	yuniQ.setAttribute('id', 'hellowrld');

	yuniQ.label = '새모습';
});
```

## 참고

- [자바스크립트 나만의 HTML 태그 만들기](https://www.youtube.com/watch?v=2DX11isXAD0)
