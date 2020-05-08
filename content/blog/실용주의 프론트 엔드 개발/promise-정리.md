---
title: Promise 정리
date: 2020-05-03 17:05:50
category: 실용주의 프론트 엔드 개발
draft: false
---

## Promise 상태

- Promise의 상태는 대기, 이행, 거부 상태가 있습니다.
- 상태는 대기에서 이행/거부로만 변경이 가능합니다.
  - 대기 : 초기상태
  - 이행 : 성공 상태, resolve(), Promise.resolve()
  - 거부 : 실패 상태, reject(), Promise.reject()
- 이행상태는 then으로 처리할 수 있습니다. resolve를 통해 전달한 값이 then에 인자로 전달됩니다.
- 거부상태는 catch으로 처리할 수 있습니다. reject를 통해 전달한 값이 catch에 인자로 전달됩니다.

## 응답 결과 전달 방법

- 응답 결과의 전달에 있어서 Callback과 Promise 차이가 있습니다.

### [Promise] Active Async Control

- 프로미스는 then을 호출해야 결과를 얻습니다. 필요할 때 then을 호출해서 데이터를 받는 것입니다.

### [Callback] Passive Async Control

- 콜백을 보낼 수는 있지만 언제 올지는 모릅니다.
- 현실적으로 다수의 API 요청을 통해 결과를 만들기 때문에 언제 응답이 오는 지 중요합니다.

## 마이크로테스크

- 비동기로 등록되는 테스크 중 가장 먼저 실행되는 마이크로테스크가 있습니다. 마이크로테스크는 Promise를 통해 등록 가능합니다.

### 자바스크립트 엔진

- 자바스크립트 엔진은 기본적으로 하나의 스레드에서 동작합니다. 하나의 스레드는 하나의 스택을 가지고 있다는 의미하고, 동시에 단 하나의 작업만을 할 수 있다는 의미입니다. 그 비밀은 이벤트 루프와 큐에 있습니다.

### 이벤트 루프와 큐

- 자바스크립트는 이벤트 루프와 큐를 통해 비동기 작업을 수행합니다. 직접적인 작업은 Web API에서 처리되고, 작업이 완료되면 요청 시 등록했던 콜백이 큐에 등록됩니다.
- 이벤트 루프는 계속 반복해서 콜 스택과 큐 사이의 작업을 확인합니다. 콜 스택이 비워 있는 경우 큐에서 작업을 꺼내어 콜 스택에 넣습니다.
- 콜 스택에 작업이 없을 경우 우선적으로 마이크로테스크 큐를 확인합니다. 마이크로테스크에 작업이 있다면 작업을 꺼내서 콜 스택에 넣습니다. 만약 마이크로테스크 큐가 비어서 더 이상 처리할 작업이 없으면 테스크 큐를 확인합니다. 테스크 큐에 작업이 있다면 작업을 꺼내서 콜 스택에 넣습니다.

### 자바스크립트 처리 과정

1. 비동기 작업으로 등록되는 작업은 Task와 Microtask 그리고 AnimationFrame 작업으로 구분됩니다.
2. Microtask는 Task보다 먼저 작업이 처리됩니다.
3. Microtask가 처리된 이후 requestAnimationFrame이 호출되고 이후 브라우저 렌더링이 발생합니다.

## 연속적인 동작

- Promise는 비동기를 값으로 다룰 수 있습니다.
- Promise로 처리하는 함수는 리턴된 Promise를 통해서 연속적인 동작을 할 수 있습니다. 반면에 콜백으로 처리하는 함수는 리턴되는 값이 없어 내부에서 처리해야 합니다.

## 적용 사례

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

## 참고

- [Promise 정리](https://peter-cho.gitbook.io/book/10/promise)
