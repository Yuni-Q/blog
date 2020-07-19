---
title: this, call(), apply(), bind()
date: 2020-04-10 18:04:24
category: javascript
draft: true
---

## this

- 함수가 만들어졌을 때, 뒤에서는 this라 불리는 키워드가 만들어집니다. this는 함수가 동작하는 곳에 있는 오브젝트와 연결해줍니다.
- this 키워드의 값은 그 함수 자체와는 상관이 없습니다. 함수가 어떻게 불려지는지가 this의 값을 결정합니다.
- 기본 값으로, this는 언제나 전역 스코프의 root을 참조하는 window Object가 됩니다. 만일, 스크립트가 strict mode("use strict") 내에서 작동하고 있다면, this는 undefined일 것입니다.

```javascript
var myMethod = function() {
	console.log(this);
};

var myObject = {
	myMethod: myMethod,
};

myObject.myMethod(); // this === myObject
myMethod(); // this === window
```

- 코드 안의 myObject는 myMethod라 불리는 프로퍼티를 갖습니다. 이 프로퍼티는 myMethod 함수를 가리킵니다. myMethod 함수가 글로벌 스코프로부터 호출됐을 때, this는 window object를 참조합니다. myObject의 메소드로서 호출됐을 때는, this가 myObject를 참조합니다. 이러한 형식은 `묵시적 바인딩(implicit binding)`이라 불립니다.

## 명시적 바인딩(Explicit binding)

- 함수에 명시적으로 컨텍스트를 바인딩할 때, 그것을 명시적 바인딩이라 합니다. 이러한 동작은 주로 call 메소드와 apply 메소드에 의해 이뤄집니다.
- 명시적인 바인딩은 묵시적 바인딩보다 우위를 갖게 됩니다.

```javascript
var myMethod = function () {
  console.log(this);
};

var myObject = {
  myMethod: myMethod
};

myMethod() // this === window
myMethod.call(myObject, args1, args2, ...) // this === myObject
myMethod.apply(myObject, [array of args]) // this === myObject
```

## 하드 바인딩(Hard binding)

- 하드 바인딩은 bind(ES5)으로 가능합니다. bind 메소드는 우리가 지정한 this 컨텍스트를 가진 기존 함수를 불러오기 위해 하드코딩된 새로운 함수를 반환합니다.
- 하드바인딩은 명시적 바인딩보다 우위를 갖게 됩니다.

## 'New' 바인딩(New binding)

- 새로운 new 인스턴스를 참조하는 함수가 호출되었을 때, this가 만들어집니다.
- 함수가 new와 함께 호출되었을 때는 묵시적, 명시적 또는 하드 바인딩을 신경쓰지 않습니다. 이 때는 그냥 새로운 인스턴스인 새로운 컨텍스트를 만들어냅니다.

## API 호출

- 때때로, 우리는 라이브러리나 헬퍼오브젝트를 사용합니다. (Ajax, event handling, etc.) 그리고 전달된 콜백을 호출합니다. 이러한 경우에는, this의 동작을 주의해야 합니다.
- 주로 라이브러리들은 우리를 위해 또 다른 파라미터를 제공합니다. 우리는 그곳에 우리가 다시 가져오길 원하는 스코프를 전달할 수 있습니다.

```javascript
myObject = {
	myMethod: function() {
		helperObject.doSomethingCool('superCool', this.onSomethingCoolDone, this);
	},

	onSomethingCoolDone: function() {
		/// Now everybody know that "this" === myObject
	},
};
```

- 원하는 스코프를 하드 바인드 할 수도 있습니다.

```javascript
myObject = {
	myMethod: function() {
		helperObject.doSomethingCool(
			'superCool',
			this.onSomethingCoolDone.bind(this)
		);
	},

	onSomethingCoolDone: function() {
		/// Now everybody know that "this" === myObject
	},
};
```

- 클로져를 만들고 this를 me에 캐시할 수도 있습니다.

```javascript
myObject = {
	myMethod: function() {
		var me = this;

		helperObject.doSomethingCool('superCool', function() {
			/// Only god knows what is "this" here, but we have access to "me"
		});
	},
};
```

- 이 방법은 추천드리지 않습니다. 왜냐하면 메모리 누수를 초래할 수 있고, 진짜 스코프를 잊게 만들고 변수에 의존하게 만들기 때문입니다. 스코프가 정말 엉망이 되는 지경에 다다를 수도 있습니다. This 문제는 이벤트 리스너, 타임아웃, forEach와 같은 것들에도 적용됩니다.

## call

- call 메소드의 첫번째 파라미터는 함수가 호출되는 순간 "this" 오브젝트 값을 세팅합니다. 이 경우에는 "obj" 가 this 오브젝트였습니다.
- 나머지 파라미터들은 실제 함수의 인자들이었습니다.

## apply

- call 메소드와 비슷하게 동작합니다.
- 첫번째 파라미터는 함수가 호출되는 순간 "this" 의 값을 세팅합니다.
- apply 메소드가 call 메소드와 유일하게 다른 점은 두번째 파라미터에서 실제 함수의 인자 값을 `배열`로 받는다는 것입니다.

## bind

- bind 메소드에 대한 첫번째 파라미터는 역시 bound 함수가 호출될 때, 타겟 함수에서 "this" 의 값을 세팅하는 부분입니다.
- bound 함수가 "new" 연산자를 이용하여 생성됐을때는, 바인드 시킨 this 값(첫번째 파라미터의 값)이 무시된다는 것을 알아두셔야 합니다.
- 나머지 파라미터들은 인자로 잘 넘겨집니다.

## 참조

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #15 자바스크립트 : this, call(), apply(), bind()](https://velog.io/@jakeseo_me/2019-05-07-1605-%EC%9E%91%EC%84%B1%EB%90%A8-qpjvdgllm8)
