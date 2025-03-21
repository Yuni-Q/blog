---
title: Promise
date: 2020-04-12 01:04:34
category: javascript
tags: ['javascript', 'promise', 'promise.all', 'map']
draft: true
---

## Promise 이해하기

- 자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용합니다. 하지만 전통적인 콜백 패턴은 가독성이 나쁘고 비동기 처리 중 발생한 에러의 예외 처리가 곤란하며 여러 개의 비동기 처리 로직을 한꺼번에 처리하는 것도 한계가 있습니다. ES6(ES2017)에서 비동기 처리를 위한 또 다른 패턴으로 프로미스(Promise)를 도입했습니다. Promise는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현합니다.
- 프로미스는 말 그대로 약속 입니다. Promise는 3가지 상태를 가집니다.
  - Pending(미결)
  - Fulfilled(이행)
  - Rejected(거부)
- 상태는 대기에서 이행/거부로만 변경이 가능합니다.
  - 대기 : 초기상태
  - 이행 : 성공 상태, resolve(), Promise.resolve()
  - 거부 : 실패 상태, reject(), Promise.reject()
- 이행상태는 then으로 처리할 수 있습니다. resolve를 통해 전달한 값이 then에 인자로 전달됩니다.
- 거부상태는 catch으로 처리할 수 있습니다. reject를 통해 전달한 값이 catch에 인자로 전달됩니다.

| 상태      | 의미                                  | 구현                                                    |
| --------- | ------------------------------------- | ------------------------------------------------------- |
| pending   | 비동기 처리가 아직 수행되지 않은 상태 | resolve 또는 reject 함수가 아직 호출되지 않은 상태      |
| fulfilled | 비동기 처리가 수행된 상태             | (성공) resolve 함수가 호출된 상태                       |
| rejected  | 비동기 처리가 수행된 상태             | (실패) reject 함수가 호출된 상태                        |
| settled   | 비동기 처리가 수행된 상태             | (성공 또는 실패) resolve 또는 reject 함수가 호출된 상태 |


## 프로미스의 사용

- Promise로 구현된 비동기 함수는 Promise 객체를 반환하여야 합니다.
- Promise로 구현된 비동기 함수를 호출하는 측(promise consumer)에서는 Promise 객체의 후속 처리 메소드(then, catch)를 통해 비동기 처리 결과 또는 에러 메시지를 전달받아 처리합니다.  
- Promise 객체는 상태를 갖는다고 합니다. 이 상태에 따라 후속 처리 메소드를 체이닝 방식으로 호출합니다.
- Promise의 후속 처리 메소드는 then과 catch가 있습니다.

### then

- then 메소드는 두 개의 콜백 함수를 인자로 전달 받습니다.
- 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출되고 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출됩니다.

### catch

- 예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출됩니다.

## 프로미스의 에러 처리

- Promise 객체의 후속 처리 메소드를 사용하여 비동기 처리 결과에 대한 후속 처리를 수행합니다.
- 비동기 처리 시 발생한 에러 메시지는 then 메소드의 두 번째 콜백 함수로 전달됩니다. 
- Promise 객체의 후속 처리 메소드 catch을 사용하여도 에러를 처리할 수 있습니다.
- catch 메소드는 에러를 처리한다는 점에서 then 메소드의 두 번째 콜백 함수와 유사하지만 미묘한 차이가 있습니다.
- then 메소드의 두 번째 콜백 함수는 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)만을 캐치합니다. 하지만 catch 메소드는 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)뿐만 아니라 then 메소드 내부에서 발생한 에러도 캐치합니다. 따라서 에러 처리는 catch 메소드를 사용하는 편이 보다 효율적이다.

## 프로미스 체이닝

- 비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 함수의 호출이 중첩(nesting)이 되어 복잡도가 높아지는 콜백 헬이 발생합니다.
- 프로미스는 후속 처리 메소드를 체이닝(chaining)하여 여러 개의 프로미스를 연결하여 사용할 수 있습니다. 이로써 콜백 헬을 해결합니다.
- Promise 객체를 반환한 비동기 함수는 프로미스 후속 처리 메소드인 then이나 catch 메소드를 사용할 수 있습니다. 따라서 then 메소드가 Promise 객체를 반환하도록 하면 여러 개의 프로미스를 연결하여 사용할 수 있습니다.

## 비동기 콜백을 절대 동기적으로 호출하지마라

- 데이터를 즉시 사용할 수 있더라도, 절대로 비동기 콜백을 동기적으로 호출하지 않아야 합니다.
- 비동기 콜백을 동기적으로 호출하면 기대한 연산의 순서를 방해하고, 예상치 않은 코드의 간섭을 초래할 수 있습니다.
- 비동기 콜백을 동기적으로 호출하면 스택 오버플로우나 처리되지 않은 예외를 초래할 수 있습니다.
- 비동기 콜백을 다른 턴에 실행되도록 스케쥴링하기 위해 setTimeout같은 비동기 API를 사용합니다.
> 이처럼 동기와 비동기를 혼재했을 때 발생하는 문제를 예방하기 위해 항상 비동기로 처리하도록 ES6 Promises 사양이 정해진 것입니다.  
> 항상 비동기로 처리되기 때문에 명시적으로 비동기 처리를 위한 코드를 추가로 작성할 필요가 없습니다.

## 콜백-헬과 무관한 Promise

- Promise는 미래 어느 시점이 되면 값을 채워주기로 약속한 빈 그릇이며 비동기 처리를 추상화한 추상 컨테이너입니다. 즉, 통일된 인터페이스로 데이터를 전달할 수 있는 컨테이너로써 장점을 발휘하는 것입니다.
- 중첩을 해결하고자 promise 체인을 길게 연결하는 것은 외형의 느낌만 다를 뿐 콜백-헬과 큰 차이가 없습니다.
- 이벤트 리스너나 Stream처럼 정지적, 지속적으로 비동기 처리가 필요한 경우 Promise를 사용하면 오히려 이상적인 결과를 얻을 수 없습니다. 또한, 강력한 에러 처리 메커니즘이 오히려 독이 되는 경우도 더러 있습니다.
- Promise의 진정한 장점을 느끼기 위해서는 분석 및 설계를 통한 모듈화가 선행돼야 합니다.
- 깊은 콜백 중첩으로 구조가 이미 망가져 있는 곳에 Promise로 해결하려고 노력하지 않아야 합니다. 해결할 수도 없을 뿐더러 문제를 더 복잡하게 만들 수 있습니다.

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
- 문법은 그럭저럭 괜찮아보입니다. 하지만 만일 여러분이 연속되는 비동기 액션을 수행하려면 문제가 발생 합니다. 문법이 사용자에게 친화적이지 못합니다. 좋은 말로는, 피라미드처럼 보인다고 합니다. 하지만 사람들은 주로 이렇게 된 코드를 `콜백 지옥`이라고 합니다. 왜냐하면 콜백이 다른 콜백 안에 계속 중첩되어 있기 때문입니다. 여러분이 10개의 콜백을 가지고 있다고 가정하면, 10번 중첩을 시켜야 합니다.
- Promise와 .then을 사용하여, 우리는 피라미드 모양의 콜백을 빳빳히 펴낼(Flatten) 수 있습니다. 중첩된 부분이 없어서 훨씬 보기 좋습니다. 물론, ES7의 async 문법을 사용하면, 우리는 예제를 더 더 깔끔히 작성할 수 있습니다.

#### [Promise] Active Async Control

- 프로미스는 then을 호출해야 결과를 얻습니다. 필요할 때 then을 호출해서 데이터를 받는 것입니다.
- 장점은 다음과 같습니다.
	- 이해하기 어려운 콜백 지옥을 피할 수 있습니다.
	- 읽기 쉬운 .then()을 이용하여 연속적인 비동기 코드를 쉽게 작성할 수 있습니다.
	- Promise.all()을 사용하여 병렬 비동기 코드를 쉽게 작성할 수 있습니다.
- 단점은 다음과 같습니다.
	- 약간 더 복잡한 소스코드(논쟁의 여지가 있음)
	- ES2015를 지원하지 않는 이전 브라우저에서 이를 사용하기 위해서는 polyfill을 로드해야 합니다.

#### [Callback] Passive Async Control

- 콜백을 보낼 수는 있지만 언제 올지는 모릅니다.
- 현실적으로 다수의 API 요청을 통해 결과를 만들기 때문에 언제 응답이 오는 지 중요합니다.
- 콜백 패턴의 단점은 콜백 헬과 에러 처리의 한계입니다.
	- 비동기로 테스크큐에서 가져오는 작업은 실행 컨텍스트가 끝나고 나서 가져오는 것이라서 try/catch에 영향을 받지 않습니다.

#### 연속적인 동작

- Promise는 비동기를 값으로 다룰 수 있습니다.
- Promise로 처리하는 함수는 리턴된 Promise를 통해서 연속적인 동작을 할 수 있습니다. 반면에 콜백으로 처리하는 함수는 리턴되는 값이 없어 내부에서 처리해야 합니다.

## 마이크로테스크

- 비동기로 등록되는 테스크 중 가장 먼저 실행되는 마이크로테스크가 있습니다. 마이크로테스크는 Promise를 통해 등록 가능합니다.

### 자바스크립트 엔진

- 자바스크립트 엔진은 기본적으로 하나의 스레드에서 동작합니다. 하나의 스레드는 하나의 스택을 가지고 있다는 의미하고, 동시에 단 하나의 작업만을 할 수 있다는 의미입니다. 그 비밀은 이벤트 루프와 큐에 있습니다.

### 이벤트 루프와 큐

- 자바스크립트는 이벤트 루프와 큐를 통해 비동기 작업을 수행합니다. 직접적인 작업은 Web API에서 처리되고, 작업이 완료되면 요청 시 등록했던 콜백이 큐에 등록됩니다.
- 이벤트 루프는 계속 반복해서 콜 스택과 큐 사이의 작업을 확인합니다. 콜 스택이 비워 있는 경우 큐에서 작업을 꺼내어 콜 스택에 넣습니다.
- 콜 스택에 작업이 없을 경우 우선적으로 마이크로테스크 큐를 확인합니다. 마이크로테스크에 작업이 있다면 작업을 꺼내서 콜 스택에 넣습니다. 만약 마이크로테스크 큐가 비어서 더 이상 처리할 작업이 없으면 테스크 큐를 확인합니다. 테스크 큐에 작업이 있다면 작업을 꺼내서 콜 스택에 넣습니다.

### 자바스크립트 처리 과정

1. 비동기 작업으로 등록되는 작업은 Task와 microTask 그리고 AnimationFrame 작업으로 구분됩니다.
2. microTask는 Task보다 먼저 작업이 처리됩니다.
3. microTask가 처리된 이후 requestAnimationFrame이 호출되고 이후 브라우저 렌더링이 발생합니다.

## 적용 사례

### 프로미스의 비동기적 실행

```javascript
var promise = new Promise(function (resolve) {
  console.log("inner promise");
  resolve(42);
});

promise.then(function (value) {
  console.log(value);
});

console.log("outer promise");

// inner promise
// outer promise
// 42
```

### 최소 요청 시간이 있는 비동기 처리

- 5초전에 응답이 오면 경우 5초뒤에 재요청할 것이고 5초뒤에 응답이 오면 응답이 온뒤 재요청한다.

```javascript
const recur = () =>
	Promise.all([
		new Promise(resolve => setTimeout(resolve, 5000)),
		getData,
	]).then(recur);
```

### async, await + Promise.all

- async, await를 사용하여 동기코드와 유사하게 코드 작성이 가능합니다. 여기에 Promise.all를 사용하면 병렬처리를 구현할 수 있습니다. 아래와 같이 일정시간이 지나면 resolve를 실행해는 delay함수가 있다.

```javascript
const delay = ms =>
	new Promise(resolve => {
		setTimeout(() => resolve(ms), ms);
	});
```

- Promise를 리턴하는 함수를 사용할 때 await를 통해 resolve값을 받을 수 있습니다. main 함수의 결과는 6000ms 뒤에 반환 됩니다.

```javascript
const main = async () => {
	console.time('main');
	const delay1s = await delay(1000);
	const delay2s = await delay(2000);
	const delay3s = await delay(3000);
	console.timeEnd('main');
	return delay1s + delay2s + delay3s;
};
main().then(console.log);
// main: 6005.81787109375ms
// 6000
```

- 각각의 Promise들이 서로 영향이 없다면 병렬로 처리할 필요가 있습니다. 모든 Promise가 끝날 때 Promise.all를 통해 확인합니다. 함수의 결과는 3000ms 뒤에 반환됩니다. 병렬 처리를 하게 되면 빠른 응답을 받을 수 있습니다.

```javascript
const main = async () => {
	console.time('main');
	const [delay1s, delay2s, delay3s] = await Promise.all([
		delay(1000),
		delay(2000),
		delay(3000),
	]);
	console.timeEnd('main');
	return delay1s + delay2s + delay3s;
};
main().then(console.log);
// main: 3001.468017578125ms
// 6000
```

## Promise.all()

- 배열로 인수를 전달합니다.
- 포함되어 있는 모든 promise들이 모두 resolve 되어야 성공합니다. 하나가 실패해도 모두 실패한다고 하기 때문에 선택적으로 사용해야 합니다.
- Promise.race : 하나가 resolve 되면 나머지를 reject 시키고 진행합니다.
- Promise.resolve(1).then()으로 사용할 수 있습니다.

## Promise.allSettled

- Promise.allSettled() 메소드는 배열이나 별도의 나열 가능한 객체를 통해 나열된 Promise모음이 모두 이행하거나 거부했을 때에 대한 대응을 할 수 있는 Promise 객체를 반환합니다.


## 새로운 친구 : Observable

- Observable은 0개 혹은 그 이상의 이벤트를 내보내는 lazy event stream입니다. 그리고 Observable을 끝낼 수도 있고 안 끝낼 수도 있습니다.

---

## 참조

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #25 자바스크립트 : 바보를 위한 Promise](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-25-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%94%EB%B3%B4%EB%A5%BC-%EC%9C%84%ED%95%9C-Promise)
- [Promise 정리](https://peter-cho.gitbook.io/book/10/promise)
- [JS 질문](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Korean/questions/javascript-questions.md)
