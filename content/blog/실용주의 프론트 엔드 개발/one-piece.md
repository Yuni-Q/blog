---
title: One Piece
date: 2020-05-03 18:05:06
category: 실용주의 프론트 엔드 개발
draft: true
---

## URL 유효성

```javascript
const isValidUrl = url => {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
};

console.log(isValidUrl('http://www.naver.com')); // true
console.log(isValidUrl('http:/')); // false
```

## 배열 아이템 삭제

```javascript
const arr = [0, 1, 2];
arr.splice(1, 2);
console.log(arr); // [0]
```

## 천단위 콤마 표시

```javascript
const price = 10000;
price.toLocaleString(); // 10,000
```

## 정렬

```javascript
const arr = [0, 2, 3, 1];
arr.sort((a, b) => a - b);
console.log('오름차순', ...arr);
arr.sort((a, b) => b - a);
console.log('내름차순', ...arr);
```

## Overlap

```javascript
const isOverlap = (base, target) => {
	if (target.end <= base.begin) return false;
	if (target.begin >= base.end) return false;
	return true;
};

const assert = v1 => v2 => console.log(v1 === v2);
const base = { begin: 2, end: 4 };

assert(false)(isOverlap(base, { begin: 0, end: 1 })); // true
assert(false)(isOverlap(base, { begin: 1, end: 2 })); // true
assert(true)(isOverlap(base, { begin: 2, end: 3 })); // true
assert(true)(isOverlap(base, { begin: 3, end: 4 })); // true
assert(false)(isOverlap(base, { begin: 4, end: 5 })); // true
assert(false)(isOverlap(base, { begin: 5, end: 6 })); // true
assert(true)(isOverlap(base, { begin: 2, end: 4 })); // true
assert(true)(isOverlap(base, { begin: 1, end: 5 })); // true
```

## Subset

```javascript
// base: [begin: number, end: number]
// target: [begin: number, end: number]
const isSubset = (base, target) => {
	if (base[0] > target[0]) return false;
	if (base[1] < target[1]) return false;
	if (base[0] >= target[1]) return false;
	if (base[1] <= target[0]) return false;
	return true;
};

const assert = v1 => v2 => console.log(v1 === v2);
const base = [2, 4];

assert(false)(isSubset(base, [0, 1]));
assert(false)(isSubset(base, [1, 2]));
assert(true)(isSubset(base, [2, 3]));
assert(true)(isSubset(base, [3, 4]));
assert(false)(isSubset(base, [4, 5]));
assert(false)(isSubset(base, [5, 6]));

assert(true)(isSubset(base, [2, 4]));
assert(false)(isSubset(base, [1, 5]));
```

## SVG Parser

```javascript
const parseSVG = template => {
	var tmp = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	tmp.innerHTML = template;
	return tmp.children[0];
};
```

## Throttle

- 연속적으로 콜백 실행 요청되어도, 지정된 시간 주기로 콜백이 실행하는 기법 Throttle 기법을 사용하면 일정한 시간을 주기로 콜백을 실행 할 수 있습니다.

```javascript
/**
 * Throttle
 *
 * @param callback {Function} Callback function
 * @param _threshhold {Number} Throttle time
 * @return {Function} Event Listener
 */
const throttle = (callback, ms = 100) => {
	let timer = null;
	let last = 0;

	return function(...args) {
		const self = this;
		const now = +new Date();

		if (last && now < last + ms) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				last = now;
				callback.apply(self, args);
			}, ms);
		} else {
			last = now;
			callback.apply(self, args);
		}
	};
};
```

## Debounce

- 다수의 이벤트 실행을 방지하기 위해 하나로 그룹화하여 특정 시간이 지난 후 실행되는 기법 여러개의 이벤트가 과다하게 사용이 되었을 때 부하를 줄여주는 역할을 합니다.

```javascript
/**
 * Debounce
 *
 * @param callback {Function} Callback function
 * @param _delay {Number} Delay time
 * @return {Function} Event Listener
 */
const debounce = (callback, ms) => {
	let timer = null;

	return function(...args) {
		const self = this;
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(self, args);
		}, ms);
	};
};
```

## Text More

```css
.txt {
	width: 200px;
	max-height: 35px;
	line-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal;
	word-wrap: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.txt.show {
	display: block;
	max-height: none;
}
.txt.show + .more {
	display: none;
}
```

```html
<div class="wrap">
	<div class="txt">
		가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마
		가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마
	</div>
	<a href="#" class="more" onclick="toggle()">More</a>
</div>
```

```javascript
const toggle = () => {
	const txt = document.querySelector('.txt').classList;
	if (txt.contains('show')) {
		txt.remove('show');
	} else {
		txt.add('show');
	}
};
```

## 참고

- [One Piece](https://peter-cho.gitbook.io/book/10/one-piece)
