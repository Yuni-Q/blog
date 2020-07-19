---
title: THREE 코드 재작성하기
date: 2020-07-03 00:07:27
category: 읽기 좋은 코드가 좋은 코드다
draft: true
---

## 10 상관없는 하위문제 추출하기

- 엔지니어링은 커다란 문제를 작은 문제들로 쪼갠 다음, 각각의 문제에 대한 해결책을 구하고, 다시 하나의 해결책으로 맞추는 일련의 작업을 합니다. 이러한 원리를 코드에 적용하면 코드가 더 튼튼해지며 가독성도 좋아집니다.
- 이 장에서 말하는 조언은 큰 흐름과 관계가 적은 하위문제를 적극적으로 발견해서 추출하라는 것입니다. 이 말이 의미하는 바는 다음과 같습니다.
  1. 주어진 함수가 코드 블록을 보고, 스스로에게 질문합니다. 상위수준에서 본 이 코드의 목적은 무엇입니까?
  2. 코드의 모든 줄에 질문을 던집니다. 이 코드는 직접적으로 목적을 위해서 존재합니까? 혹은 목적을 위해서 필요하긴 하지만 목적 자체와 직접적으로 상관없는 하위문제를 해결합니까?
  3. 만약 상당히 원래의 목적과 직접적으로 관련되지 않은 하위문제를 해결하는 코드 분량이 많으면, 이를 추출해서 별도의 함수로 만듭니다.

### 소개를 위한 예: findClosestLocation()

- 다음 자바스크립트 코드의 상위수준 목적은 주어진 점과 가장 가까운 장소를 찾는 것입니다.

```javascript
const findClosestLocation = (lat, lng, array) => {
	let closest;
	let closestDist = Number.MAX_VALUE;

	for (let i = 0, len = array.length; i < len; i++) {
		const latRad = radians(lat);
		const lngRad = radians(lng);
		const lat2Rad = radians(array[i].latitude);
		const lng2Rad = radians(array[i].longitude);

		// 코사인의 특별법칙 공식을 사용한다.
		const dist = Math.acos(
			Math.sin(latRad) * Math.sin(lat2Rad) +
				Math.cos(latRad) * Math.cos(lat2Rad) * Math.cos(lng2Rad - lngRad)
		);

		if (dist < closestDist) {
			closest = array[i];
			closestDist = dist;
		}
	}
	return closest;
};
```

- 루프의 내부에 있는 코드는 대부분 주요 목적과 직접 상관없는 하위문제를 다룹니다.

```javascript
const sphericalDistance = (lat1, lng1, lat2, lng2) => {
	const latRad = radians(lat1);
	const lngRad = radians(lng1);
	const lat2Rad = radians(lat2);
	const lng2Rad = radians(lng2);

	return Math.acos(
		Math.sin(latRad) * Math.sin(lat2Rad) +
			Math.cos(latRad) * Math.cos(lat2Rad) * Math.cos(lng2Rad - lngRad)
	);
};
```

- 이제 원래 코드는 이렇게 변합니다.

```javascript
const findClosestLocation = (lat, lng, array) => {
	let closest;
	let closestDist = Number.MAX_VALUE;

	for (let i = 0, len = array.length; i < len; i++) {
		const latRad = radians(lat);
		const lngRad = radians(lng);
		const lat2Rad = radians(array[i].latitude);
		const lng2Rad = radians(array[i].longitude);

		// 코사인의 특별법칙 공식을 사용한다.
		const dist = sphericalDistance(
			lat,
			lng,
			array[i].latitude,
			array[i].longitude
		);

		if (dist < closestDist) {
			closest = array[i];
			closestDist = dist;
		}
	}
	return closest;
};
```

- 코드를 읽는 사람도 밀도 높은 기하 공식에 방해받지 않고 상위수준의 목적에 집중할 수 있으니 전반적으로 코드의 가독성이 높아집니다.

### 기존의 인터페이스를 단순화하기

- 라이브러리가 깔끔한 인터페이스를 제공하면 누구나 좋아합니다. 하지만 자신이 사용하는 인터페이스가 깔끔하지 않다면, 깔끔한 `덮개(Wrapper)`로 보완할 수 있습니다.
- 예를 들어 자바스크립트가 브라우저 쿠키를 다루는 방식은 전혀 이상적이지 않습니다. 개념적으로 보면 쿠키는 이름/값 짝으로 이루어집니다. 브라우저가 제공하는 인터페이스는 다음과 같은 문법으로 된 하나의 document.cookie를 사용합니다.

```javascript
name1=value1; name2=value2; ...
```

- 필요한 쿠키를 찾으려면 이 거대한 문자열의 구문분석을 직접 수행해야 합니다. 다음은 max_results라는 이름을 가진 쿠키의 값을 읽는 코드입니다.

```javascript
let maxResults;
const cookies = document.cookie.split(';');
for (let i = 0, len = cookies.length; i < len; i++) {
	const cookie = cookies[i].replace(/^[ ]+/, '');
	if (cookie.indexOf('max_results') === 0) {
		maxResults = Number(cookie.substring(12, cookie.length));
	}
}
```

- get_cookie()함수를 만들면 깔끔하게 처리할 수 있습니다.

```javascript
const maxResults = Number(getCookie('max_results'));
```

- 여기서 `이상적이지 않은 인터페이스를 그냥 받아들일 이유가 없습니다`. 이런 인터페이스가 있으면 언제나 이를 둘러싸는 함수를 작성하여 지저분한 내부를 감출 수 있습니다.

## 11 한 번에 하나씩

- 한 번에 여러 가지 일을 수행하는 코드는 이해하기 어렵습니다. 코드 블록 하나에서 새로운 객체를 초기화하고, 데이터를 청소하고, 입력을 분석하고, 비즈니스 논리를 적용하는 일을 한꺼번에 수행하는 경우도 있습니다. 그러한 코드가 모두 한자리에 뒤섞이면 각각의 작업이 별도로 시작되었다가 완료되는 경우보다 이해하기 어렵습니다.
- 다양한 코드 조각이 뒤섞인 채 일을 수행하는 모습을 한 가지 작업만 수행하게 재정비하는 것을 `탈파편화`라고 합니다.
- 코드가 `한번에 한 가지 일만` 수행하게 하는 절차는 다음과 같다.
  1. 코드가 수행하는 모든 작업을 나열합니다.
  2. 이러한 작업을 분리하여 서로 다른 함수로 혹은 적어도 논리적으로 구분되는 영역에 높을 수 있는 코드로 만듭니다.

## 참고

- [읽기 좋은 코드가 좋은 코드다](https://peter-cho.gitbook.io/book/11/undefined-4#one)
