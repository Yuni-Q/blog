---
title: Promise
date: 2020-04-12 01:04:34
category: javascript
tags: ['javascript', 'promise', 'promise.all', 'map']
draft: true
---

## Promise 이해하기

- 프로미스는 말 그대로 약속 입니다. Promise는 3가지 상태를 가집니다.
  - Pending(미결)
  - Fulfilled(이행)
  - Rejected(거절)

## Promise는 비동기(Asynchronous)다.

## ES5, ES6/2015, ES7에서의 Promise

### ES5 - 주류 브라우저들

- Bluebird Promise 라이브러리만 설치했다면, ES5 환경(모든 주류 브라우저 + 노드JS 환경을 말합니다.)에서 돌아갑니다. ES5는 자체적으로는 Promise를 지원하지 않습니다. Bluebird외에도 다른 유명한 Promise 라이브러리인 Q가 있습니다.

### ES6 / ES2015 - 현대 브라우저들과 NodeJs v6

- 라이브러리 없이도 작동합니다. 왜냐하면 ES6는 Promise를 네이티브하게 지원하기 때문입니다. 추가로 ES6 함수들과 함께라면, 화살표 함수를 이용하여 코드를 훨씬 더 간단히 만들 수 있습니다. 그리고 const나 let과 같은 선언문으로 변수 선언도 가능합니다.

### ES7 - Async Await이 문법을 더 예쁘게 만들어줍니다.

- ES7은 async와 await 문법을 도입했습니다. 두가지 문법은 비동기 문법을 더 예쁘고 이해하기 쉽게 만들어줍니다. 심지어 .then과 .catch도 필요 없습니다.

## 왜 Promise이고 언제 써야 할까요?

### 일반 함수 vs 비동기 함수

- 여러분이 만일 일반 함수로 두 숫자를 더한다면, 결과를 즉시 볼 수 있을 것입니다. 하지만, 여러분이 원격 서버를 이용하여 두 숫자 더하기에 대한 결과 값을 구한다면, 여러분은 기다려야 합니다. 즉시 값을 얻진 못합니다.
- 여러분은 서버가 다운되거나 응답 지연 때문에 값을 얻을 수 있을지 없을지도 모릅니다. 여러분은 서버가 값을 반환할 때까지 모든 프로세스를 잠시 멈춰두길 원하진 않을 것입니다. 그래서 비동기가 필요합니다.
- API를 호추하는 일, 파일을 다운로드하는 일, 파일을 읽는 일 등은 주로 비동기 함수를 사용하여 코딩합니다.

### Promise가 있기 전에 코딩하던 방법 : Callback

- Promise 전에 우리는 callback을 사용했습니다. Callback은 여러분이 결과 값을 받으면 수행할 함수입니다.
- 문법은 그럭저럭 괜찮아보입니다. 하지만 만일 여러분이 연속되는 비동기 액션을 수행하려면 문제가 발생 합니다. 문법이 사용자에게 친화적이지 못합니다. 좋은 말로는, 피라미드처럼 보인다고 합니다. 하지만 사람들은 주로 이렇게 된 코드를 "콜백 지옥"이라고 합니다. 왜냐하면 콜백이 다른 콜백 안에 계속 중첩되어 있기 때문입니다. 여러분이 10개의 콜백을 가지고 있다고 가정하면, 10번 중첩을 시켜야 합니다.
- Promise와 .then을 사용하여, 우리는 피라미드 모양의 콜백을 빳빳히 펴낼(Flatten) 수 있습니다. 중첩된 부분이 없어서 훨씬 보기 좋습니다. 물론, ES7의 async 문법을 사용하면, 우리는 예제를 더 더 깔끔히 작성할 수 있습니다.

## 새로운 친구 : Observable

- Observable은 0개 혹은 그 이상의 이벤트를 내보내는 lazy event stream입니다. 그리고 Observable을 끝낼 수도 있고 안 끝낼 수도 있습니다.

## Promise.all

- Promise.all 예제에서 map을 사용해 async function을 호출 할 때 map 함수를 async function으로 부르는 경우가 많았습니다. 하지만 이미 async 함수를 부르는데 map 함수도 async 일까에 대한 의문에 대해서 조사해 보았습니다.

```javascript
const a = async t => {
	await new Promise(resolve => setTimeout(resolve, t));
	return t;
};

const b = async () => {
	const c = [1000, 2000, 3000, 4000, 5000];
	const d = await Promise.all(c.map(f => a(f))); // 5초 소요
	console.log(11, d);
};

const e = () => {
	const c = [1000, 2000, 3000, 4000, 5000];
	const d = Promise.all(c.map(f => a(f))); // 5초 소요
	console.log(11, d);
};

b();
```

- async를 붙이는 것과 그렇지 않은 것에 차이가 없습니다. 다만 타입 추론을 위해 typescript에서 넣어주는 것이 좋을 것이라는 의견도 있었습니다.

## 참조

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #25 자바스크립트 : 바보를 위한 Promise](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-25-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%94%EB%B3%B4%EB%A5%BC-%EC%9C%84%ED%95%9C-Promise)

```

```
