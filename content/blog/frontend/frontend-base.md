---
title: frontend base
date: 2020-08-20 09:08:34
category: frontend
tags: ['frontend']
draft: true
---

## 1. 크롬을 기준으로 브라우저 렌더링 엔진의 렌더링 순서는 다음과 같습니다.

- DOM 트리 구축 위한 HTML 파싱
- 렌더 트리 구축
- 렌더 트리 배치
- 렌더 트리 그리기

## 2. 변수 호이스팅은 변수가 범위에 따라 선언과 할당으로 분리되는 것을 활용합니다.

## 3. 콜백함수를 실행하는 메서드의 경우 this는 전역 객체에 바인딩 됩니다.

```javascript
function square(number) {
	console.log(arguments); // arguments 객체
	console.log(this); // this

	return number * number;
}
```

## 4. 아래 함수의 실행 결과는 4입니다.

```javascript
function counter() {
	let answer = 0;
	let i;
	for (i = 1; i < 5; i += 1) {
		setTimeout(function timer() {
			answer += 1;
		}, 100);
	}
	setTimeout(() => console.log(answer), 200);
}
counter();
```

## 5. JS 클로저에 대한 설명은?

- var키워드로 선언된 변수나, 함수 선언식으로 만들어진 함수는 함수 레벨 스코프를 가집니다.
- Scope Chain을 따라 Outer Lexical Environment에서 값을 찾아갑니다.
- 함수가 수행 된 이후 함수의 내부 함수 메모리는 GC(Garbage Collector)가 회수하지 않습니다.
- 클로저를 통해 특정 스코프를 외부에서 접근하도록 할 수 있습니다.
- 항상 실행 컨택스트 스택의 최상단 컨택스트를 따라갑니다.

## 6. JS Event Loop에 대한 설명은?

- 콜스택이 하나인 이유는 JS는 싱글 스레드 언어이기 때문이다.
- 일단 콜스택에 있는 작업이라면 블로킹을 기본으로 한다.
- 브라우저에서 비동기 콜백을 위해 JS Runtime에서 Web API로 작업을 위임한다.
- 비동기 콜백은 즉시 호출 스택에 쌓이지 않고 Event Queue에서 기다렸다가 호출스택이 비어있는 시점에 실행된다.

## 7. JS Garbage Collector(GC)에 대한 설명은?

- Mark and Sweep 방식은 루트와 직·간접적으로 참조되지 않은 노드의 메모리를 반환한다.

## 8. JS에서는 자식 컴포넌트의 이벤트를 부모 컴포넌트로 전달하는 방식으로 이벤트 버블링 방식을 사용한다. 반대로 부모의 이벤트를 자식으로 전달하는 방법은 이벤트 캡처링이라고 합니다.

## 9. var는 function Level Scope이고 let, const는 block Level Scope입니다.

## 10. ECMA Script에 대한 설명으로 옳은 것은?

- ES6 이후에는 넘버링 대신 버전 출시 년도가 붙는다.
- ES2020에 추가된 Dynamic import는 JS를 동적으로 import 할 수 있게 한다.
- ES2020에 추가된 BigInt는 일반적인 숫자 타입과 연산 할 수 없다.

## 11. JS의 원시 타입이 아닌 것은?

- object
- function

## 12. 브라우저가 웹 서버로 요청을 보내는 과정은?

1. 사용자는 주소창에 www.google.com을 입력합니다.
2. 브라우저는 해당 도메인을 HTTP 규약에 맞춰 데이터 패킷을 준비합니다.
3. 패킷은 랜선 혹은 AP를 통해 해당 지역의 Tier3 ISP까지 전달됩니다.
4. 클라이언트는 Cache Server에 캐싱 해 놓은 결과가 있는지 먼저 확인하고 만약 캐시된 데이터가 있으면 더 진행하지 않고 이를 다시 클라이언트에 되돌려줍니다.
5. ISP는 DNS를 겸하기도 하기 때문에 요청으로 들어온 www.google.com의 IP 주소를 확인합니다.
6. 만약에 해당 DNS에 정보가 없다면 다른 DNS 서버에 해당 도메인이 있는지 확인합니다.
7. 216.58.220.142가 www.google.com의 IP 주소임을 브라우저가 알게 됩니다.
8. Google의 WAS(Web Application Server)는 요청을 받아서 DB작업 핋요하면 이를 처리합니다.
9. 사용자 요청에 맞는 컨텐츠를 Status Code 같은 내용과 함께 HTTP Response로 돌려 보냅니다.
10. 수많은 Router들과 ISP를 거쳐 사용자의 브라우저에 컨텐츠가 도달합니다.

## 13. JS Prototype에 대한 설명으로 옳은 것은?

- JS 객체는 함수로 생성된다.
- 객체가 생성되면 해당 객체의 Prototype Object가 연결된다.
- 함수, 배열 생성은 모두 Object 함수 호출의 결과로 만들어진 것이다.
- 객체의 멤버 변수로 선언하는 것과 prototype에 할당하는 것 중 후자가 더 메모리를 적게 사용한다.

## 14. JIT에 대한 설명으로 옳은 것은?

- 프로그램을 실제 실행하는 시점에 기계어로 컴파일하는 기법이다.

## 15. 호스트 객체는 해당 실행 환경에서 사용 할 수 있고, 네이티브 객체는 언제나 사용 할 수 있습니다.

## 16. this 바인딩 방식에 대해서 옳은 것은?

- Default Binding은 브라우저에서는 window, Node에서는 global이 바인딩된다.
- Implicit Binding은 함수가 선언되는 위치가 아닌 함수가 호출되는 위치에 의해 결정된다.
- Explicit Binding은 call, apply, bind로 할 수 있다.
- new 키워드로 생성된 객체 this는 그 객체의 this를 참조한다.

## 17. 아래 코드의 실행 순서는 1,3,4,2 입니다.

```html
<script>
	document.addEventListener('DOMContentLoaded', () =>
		consolg.log('DOMContentLoaded')
	); // 1

	window.onload() = () => console.log('window.onload'); // 2
</script>

<iframe src="iframe.html" onload="console.log('iframe onload')"></iframe>
<!-- 3 -->

<img src="http://en.js.cx/clipart/train.gif" id="img" />
<script>
	img.onload = () => console.log('img onload'); // 4
</script>
```

## 18. JS Object에 대한 설명으로 옳은 것은?

- Object.assign을 사용하여 기존 객체를 변경하지 않고 객체를 복사하여 사용할 수 있다.

## 19. 전역 스코프를 사용했을 때의 설명으로 옳은 것은?

- 프로그램 실행이 끝날 때까지 메모리를 유지한다.
- 모든 곳에 접근이 가능해 예기치 못한 변경이 문제를 일으킬 수 있다.
- 상수 선언 외에는전역 선언을 지양해야한다.
- 모듈 밖에서 선언한 변수를 모듈에서도 사용 할 수 있다.

## 20. SPA with CSR 에 대한 설명으로 옳은 것은?

- 캐시한 데이터를 활용해 오프라인에서 사용 할 수 있다.

## 21. JS Promise에 대한 설명으로 옳은 것은?

- resolve()와 reject()를 통해 성공, 실패 상황에 따른 분기 처리를 한다.
- Pending, Rejected, Fulfilled의 3가지 상태를 갖는다.
- 인자로 전달된 resolve나 reject가 호출되지않으면 계속 pending 상태로 대기한다.
- race() 메서드는 전달되는 Promise 객체 중 가장 빠르게 반환되는 Promise만을 리턴한다.

## [2020 FeBase Season 1 Exam](https://docs.google.com/forms/d/e/1FAIpQLSer5oRzyfqxpX8gg4_cQuPUpoMIyMJob369WCLYFtgisnh4Gg/viewform?fbzx=-7220820304538152286)
