---
title: Async Await
date: 2020-04-12 01:04:66
category: javascript
draft: false
---

## Async/await

- 더 편안한 환경에서 Promise를 다루기 위해 태어난 특별한 문법입니다. 비동기 프로그래밍을 동기 방식처럼 직관적으로 표현할 수 있어서, Callback을 많이 사용하는 프론트엔드 개발자들에게 많은 사랑을 받고 있습니다.  
- async-await는 ECMA-262에서 초안으로 처음 등장했으며, ECMAScript 2017에서 표준으로 정의 되었습니다.  


## Async 함수

- 함수 전에 `async`라는 단어가 의미하는 것은 간단합니다. promise를 반환하는 함수라는 뜻입니다. 심지어 만일함수가 실제로 promise가 아닌 값을 반환해도, `async` 키워드로 정의된 함수는 자바스크립트에서 자동으로 그 값을 resolve promise로 감싸라고 지시합니다.
- async는 함수가 promise를 리턴하는 것을 보장해줍니다. 그리고 promise가 아닌 것을 리턴했을 때는 promise로 감싸서 resolve promise를 반환합니다. 또 다른 키워드 await이 있습니다. 이 키워드는 오직 async 키워드가 붙은 함수와 함께 동작합니다.
- async 함수의 반환값으로 Promise를 사용하면 호출자에서는 async 함수 사용과 동일하게 사용됩니다. resolve 상태면 then으로 처리되고, reject 상태면 catch에서 처리됩니다.
	- 정상적인 동작으로 값을 반환하면 then에서 받을 수 있습니다.
	- 비정상적인 동작으로 에러를 발생하면 catch에서 받을 수 있습니다.
	- async 반환되는 Promise의 내부에서 예외 상황이 발생했을 때는 async의 reject 상태가 됩니다.

## Await

- 키워드 await은 자바스크립트가 promise가 작업 이후 결과 값을 리턴할 때까지 잠시 기다리게 만듭니다.
- await은 말 그대로 자바스크립트가 promise가 끝날 때까지 기다리게 만드는 것입니다. 그 후에 promise의 결과 값을 갖고 다음 부분을 진행합니다. 이 과정은 어떠한 CPU 리소스도 소모하지 않습니다. 왜냐하면 엔진이 그 동안 다른 일을 할 수 있기 때문입니다. 다른 스크립트를 실행하고 이벤트를 다루는 등의 일을 합니다.
- 이 문법은 promise의 결과를 받고 promise.then을 사용하는 것보다 더 우아한 문법입니다. 읽기도 더 쉽고 작성하기도 더 쉽습니다.
- `경고!` 일반적인 함수에서는 await을 사용할 수 없습니다!
- 함수 앞에 async라는 키워드를 붙여주지 않는다면, 우리는 이러한 에러를 받게 될 것입니다. 말했던 것처럼 await은 오직 async function 내부에서만 작동합니다.
- await은 최상위 수준(top-level) 코드에서 작동하지 않습니다.
  - top-level await는 모듈에서 await를 최상위 수준으로 사용할 수 있도록 process의 3단계에 도달 한 제안입니다.(Stage 3 Draft / May 28, 2021)
- await은 "thenable"를 받습니다.
- promise.then처럼, await은 thenable 오브젝트('thenable' 오브젝트란 .then 메소드 호출이 가능한 메소드를 말합니다.)를 사용합니다. 제 3 오브젝트는 Promise가 아닐 수도 있다는 겁니다. Promise와 호환 가능하면(만일 .then메소드를 지원만 한다면), await과 함께 사용할 수 있는 겁니다.

## 에러 핸들링

- 만일 promise가 일반적으로 resolve한다면, await promise는 결과를 반환합니다. 하지만 rejection이 된 경우, promise는 에러를 내뱉게 됩니다. 코드 라인에 throw가 있는 것 처럼 말입니다.
- 실제 상황에서, promise는 reject 당하기 전 약간의 시간을 소모할 수도 있습니다. 그래서 await은 대기할 것입니다. 그리고 그 이후 에러를 throw하게 될 것입니다.
- 우리는 그 에러를 try...catch문을 이용하여 잡아낼 수 있습니다. 일반적인 throw와 동일합니다.

```javascript
async function f() {
	try {
		let response = await fetch('http://no-such-url');
	} catch (err) {
		alert(err); // TypeError: failed to fatch
	}
}

f();
```

- 에러의 경우, 제어가 catch 블록으로 넘어갑니다. 우리는 try...catch를 통해 감싸줄 수 있습니다.

```javascript
async function f() {
	try {
		let response = await fetch('/no-user-here');
		let user = await response.json();
	} catch (err) {
		// catches errors both in fetch and response.json
		alert(err);
	}
}
```

- 만일 우리에게 try...catch문이 없었다면, 비동기 함수 f()의 호출에 의해 생성된 promise는 그냥 reject될 것입니다. 우리는 그러한 흐름을 제어하기 위해 .catch를 붙일 수 있습니다.

```javascript
async function f() {
	let response = await fetch('http://no-such-url');
}

// f() becomes a rejected promise
f().catch(alert); // TypeError: failed to fetch // (*)
```

- 만일 우리가 .catch를 거기에 추가하는 것을 잊었다면, 우리는 제대로 제어되지 않는 promise 에러를 갖게 되는 것입니다.(콘솔에서는 볼 수 있습니다.) 전역 이벤트 핸들러를 사용하여 이러한 에러를 잡아낼 수 있습니다.
- 우리가 async/await을 사용할 때, 우리는 간혹 .then이 필요합니다 왜냐하면 await은 우리를 위한 작업 대기를 처리합니다. 그리고 우리는 .catch 대신에 일반적인 try...catch 구문을 사용할 수 있습니다. 항상은 아닐지라도 일반적인 구문을 사용하는 것이 편리한 경우가 더 많습니다.
- async/await은 Promise.all과 잘 작동합니다.
- 다수의 promise를 기다려야 할 필요가 있을 때, 우리는 그것들을 Promise.all로 묶어주고 await을 걸 수 있습니다.
  - 에러가 난 경우에는, 일반적인 케이스와 같이 전파됩니다: 실패한 promise에서 Promise.all로 넘기고, 우리가 try...catch를 이용하여 캐치할 수 있는 예외가 됩니다.

## 요약

- 함수 전의 async 키워드는 2가지 효과를 갖습니다.
  - 언제나 promise를 반환합니다.
  - 함수 내부에서 await을 사용할 수 있게 해줍니다.
- promise 앞의 await 키워드는 자바스크립트가 해당 promise가 끝날 때까지 잠시 기다리게 합니다.
  - 에러가 발생한 경우, 예외가 만들어지고, 그 자리에서 throw error가 호출된 것처럼 동작합니다.
  - 에러가 발생하지 않았다면, 결과를 반환합니다. 그래서 우리가 그 결과 값을 변수에 넣을 수 있습니다.
- async/await은 읽기 쉽고 쓰기 쉬운 비동기 코드를 작성하는데 좋은 프레임워크입니다.
- async/await과 함께, 우리는 가끔 promise.then/catch를 작성할 필요가 있습니다. 하지만 우리는 여전히 그들이 promise 기반이라는 것을 잊어선 안됩니다. 왜냐하면 때때로 (예를 들면, 가장 바깥 스코프에서) 우리는 그 메소드들을 써야 합니다. 또한 Promise.all은 여러 작업들을 일제히 기다리는데 사용하기 매우 좋은 문법입니다.

## 참고

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #26 자바스크립트 : Async / Await](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-26-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Async-Await-2bjygyrlgw)
- [async await 정리](https://peter-cho.gitbook.io/book/10/async-await)
