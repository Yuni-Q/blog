---
title: closure
date: 2020-08-21 09:08:94
category: javascript
tags: ['javascript', 'closure']
draft: true
---

## 클로저란?

- 클로저는 독립적인 (자유)변수를 가리키는 함수입니다. 또는, 클로저 안에 정의된 함수는 만들어진 환경을 기억합니다.
- 흔히 함수 내에서 함수를 정의하고 사용하면 클로저라고합니다. 하지만 대개는 정의한 함수를 리턴하고 사용은 바깥에서 하게됩니다.

## 클로저를 통한 은닉화

- 클로저를 사용하여 외부에서 변수에 직접 접근하는 것을 제한할 수 있습니다.

## 반복문 클로저

```javascript
var i;
for (i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}

var i;
for (i = 0; i < 10; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 100);
  })(i);
}
```

- IIFE를 덧붙여 setTimeout()에 걸린 익명함수를 클로저로 만들었습니다. 클로저는 만들어진 환경을 기억합니다. 이 코드에서 i는 IIFE내에 j라는 형태로 주입되고, 클로저에 의해 각기 다른 환경속에 포함됩니다. 반복문은 10회 반복되므로 10개의 환경이 생길 것이고, 10개의 서로 다른 환경에 10개의 서로 다른 j가 생깁니다.

## 클로저의 성능

- 클로저를 통해 내부 변수를 참조하는 동안에는 내부 변수가 차지하는 메모리를 GC가 회수하지 않습니다. 따라서 클로저 사용이 끝나면 참조를 제거하는 것이 좋습니다.

```javascript
function hello(name) {
  var _name = name;
  return function () {
    console.log('Hello, ' + _name);
  };
}

var hello1 = hello('yuni');
var hello2 = hello('윤희');
var hello3 = hello('yuni-q');

hello1(); // 'Hello, yuni'
hello2(); // 'Hello, 윤희'
hello3(); // 'Hello, yuni-q'

// 여기서 메모리를 release 시키기 클로저의 참조를 제거해야 합니다.
hello1 = null;
hello2 = null;
hello3 = null;
```

- 메모리 관리에 있어서 약점이 있지만 추가로 스코프 체인을 검색하는 시간과 새로운 스코프를 생성하는데 드는 비용도 감안하지 않을 수 없습니다.

## 클로저를 사용하는 이유

- 지연처리를 가능하게 함으로써 코드의 가독성을 높일 수도 있고 런타임 시에 함수를 만들어 낼 수 있습니다.

## 참고

- [JavaScript 클로저(Closure)](https://hyunseob.github.io/2016/08/30/javascript-closure/)
