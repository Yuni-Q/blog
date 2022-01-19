---
title: this
date: 2020-04-10 18:04:24
category: javascript
tags:
  [
    'this',
    'call',
    'apply',
    'bind',
    '함수 호출',
    '메소드 호출',
    '생성자 함수 호출',
    '명시적바인딩',
    '묵시적바인딩',
  ]
draft: false
---

## this

- 자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에, arguments 객체와 this를 암묵적으로 전달 받습니다.
  - 자바스크립트의 this keyword는 Java와 같은 익숙한 언어의 개념과 달라 개발자에게 혼란을 줍니다. - Java에서의 this는 인스턴스 자신(self)을 가리키는 참조변수입니다. this가 객체 자신에 대한 참조 값을 가지고 있다는 뜻입니다. 주로 매개변수와 객체 자신이 가지고 있는 멤버변수명이 같을 경우 이를 구분하기 위해서 사용됩니다.
  - 자바스크립트의 경우 Java와 같이 this에 바인딩되는 객체는 한가지가 아니라 해당 함수 호출 방식에 따라 this에 바인딩되는 객체가 달라집니다.
- this는 함수가 동작하는 곳에 있는 오브젝트와 연결해줍니다.
- 자바스크립트의 경우 함수 호출 방식에 의해 this에 바인딩할 어떤 객체가 동적으로 결정됩니다. 다시 말해, 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정됩니다.
  - 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프(Lexical scope)는 함수를 선언할 때 결정됩니다. this 바인딩과 혼동하지 않도록 주의해야합니다.
- 기본 값으로, this는 언제나 전역 스코프의 root을 참조하는 window Object가 됩니다. 만일, 스크립트가 strict mode("use strict") 내에서 작동하고 있다면, this는 undefined입니다.

## 함수의 호출하는 방식

- 함수 호출
- 메소드 호출
- 생성자 함수 호출
- apply/call/bind 호출

```javascript
var foo = function() {
	console.dir(this);
};

// 1. 함수 호출
foo(); // window
// window.foo();

// 2. 메소드 호출(묵시적 바인딩(implicit binding))
var obj = { foo: foo };
obj.foo(); // obj

// 3. 생성자 함수 호출(묵시적 바인딩(implicit binding))
var instance = new foo(); // instance

// 4. apply/call/bind 호출명시적 바인딩(Explicit binding)
var bar = { name: 'bar' };
foo.call(bar); // bar
foo.apply(bar); // bar
foo.bind(bar)(); // bar
```

### 1. 함수 호출

- 전역객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 `Browser-side에서는 window`, `Server-side(Node.js)에서는 global` 객체를 의미합니다.

```javascript
// in browser console
this === window; // true

// in Terminal
node;
this === global; // true
```

- 전역객체는 전역 스코프(Global Scope)를 갖는 전역변수(Global variable)를 프로퍼티로 소유합니다. 글로벌 영역에 선언한 함수는 전역객체의 프로퍼티로 접근할 수 있는 전역 변수의 메소드입니다.

```javascript
var ga = 'Global variable';

console.log(ga); // Global variable
console.log(window.ga); // Global variable

function foo() {
	console.log('invoked!');
}
window.foo(); // invoked!
```

- 기본적으로 this는 전역객체(Global object)에 바인딩됩니다. 전역함수는 물론이고 심지어 내부함수의 경우도 this는 외부함수가 아닌 전역객체에 바인딩됩니다.

```javascript
function foo() {
	console.log("foo's this: ", this); // foo's this: window
	function bar() {
		console.log("bar's this: ", this); // bar's this: window
	}
	bar();
}
foo();
```

- 메소드의 내부함수일 경우에도 this는 전역객체에 바인딩됩니다.

```javascript
var value = 1;

var obj = {
	value: 100,
	foo: function() {
		console.log("foo's this: ", this); // foo's this: obj
		console.log("foo's this.value: ", this.value); // foo's this.value: 100
		function bar() {
			console.log("bar's this: ", this); // bar's this: window
			console.log("bar's this.value: ", this.value); // bar's this.value: 1
		}
		bar();
	},
};

obj.foo();
```

- 콜백함수의 경우에도 this는 전역객체에 바인딩됩니다.

```javascript
var value = 1;

var obj = {
	value: 100,
	foo: function() {
		setTimeout(function() {
			console.log("callback's this: ", this); // callback's this: window
			console.log("callback's this.value: ", this.value); // callback's this.value: 1
		}, 100);
	},
};

obj.foo();
```

- `내부함수는 일반 함수, 메소드, 콜백함수 어디에서 선언되었든 관게없이 this는 전역객체를 바인딩합니다`.
- 더글라스 크락포드는 '이것은 설계 단계의 결함으로 메소드가 내부함수를 사용하여 자신의 작업을 돕게 할 수 없다는 것을 의미한다'라고 말했습니다.
- 내부함수의 this가 전역객체를 참조하는 것을 회피방법은 아래와 같습니다.

```javascript
var value = 1;

var obj = {
	value: 100,
	foo: function() {
		var that = this; // Workaround : this === obj

		console.log("foo's this: ", this); // foo's this: obj
		console.log("foo's this.value: ", this.value); // foo's this.value: 100
		function bar() {
			console.log("bar's this: ", this); // bar's this: window
			console.log("bar's this.value: ", this.value); // bar's this.value: 1

			console.log("bar's that: ", that); // bar's this: obj
			console.log("bar's that.value: ", that.value); // bar's this.value: 100
		}
		bar();
	},
};

obj.foo();
```

- 위 방법 이외에도 자바스크립트는 this를 명시적으로 바인딩할 수 있는 apply, call, bind 메소드를 제공합니다. 이를 `명시적 바인딩(Explicit binding)`이라고 합니다.

## 2. 메소드 호출

- 함수가 객체의 프로퍼티 값이면 메소드로서 호출됩니다. 이때 메소드 내부의 this는 해당 메소드를 소유한 객체, 즉 해당 메소드를 호출한 객체에 바인딩됩니다.

```javascript
var obj1 = {
	name: 'Lee',
	sayName: function() {
		console.log(this.name);
	},
};

var obj2 = {
	name: 'Kim',
};

obj2.sayName = obj1.sayName;

obj1.sayName(); // Lee
obj2.sayName(); // Kim
```

- 프로토타입 객체도 메소드를 가질 수 있습니다. 프로토타입 객체 메소드 내부에서 사용된 this도 일반 메소드 방식과 마찬가지로 해당 메소드를 호출한 객체에 바인딩됩니다.

```javascript
function Person(name) {
	this.name = name;
}

Person.prototype.getName = function() {
	return this.name;
};

var me = new Person('Lee');
console.log(me.getName()); // Lee

Person.prototype.name = 'Kim';
console.log(Person.prototype.getName()); // Kim
```

## 3. 생성자 함수 호출

- 자바스크립트의 생성자 함수는 말 그대로 객체를 생성하는 역할을 합니다. 하지만 자바와 같은 객체지향 언어의 생성자 함수와는 다르게 그 형식이 정해져 있는 것이 아니라 `기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작합니다`.
- 이는 반대로 생각하면 생성자 함수가 아닌 일반 함수에 new 연산자를 붙여 호출하면 생성자 함수처럼 동작할 수 있습니다. 따라서 일반적으로 생성자 함수명은 첫문자를 대문자로 기술하여 혼란을 방지하려는 노력을 합니다.
- 함수가 new와 함께 호출되었을 때는 묵시적, 명시적 또는 하드 바인딩을 신경쓰지 않습니다. 이 때는 그냥 새로운 인스턴스인 새로운 컨텍스트를 만들어냅니다. 이를 `New 바인딩(New binding)`이라고 부릅니다.

```javascript
// 생성자 함수
function Person(name) {
	this.name = name;
}

var me = new Person('Lee');
console.log(me); // Person {name: "Lee"}

// new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수로 동작하지 않는다.
var you = Person('Kim');
console.log(you); // undefined
```

- new 연산자와 함께 생성자 함수를 호출하면 this 바인딩이 메소드나 함수 호출 때와는 다르게 동작합니다.

### 3.1 생성자 함수 동작 방식

- new 연산자와 함께 생성자 함수를 호출하면 다음과 같은 수순으로 동작한다.

1. 빈 객체 생성 및 this 바인딩

- 생성자 함수의 코드가 실행되기 전 빈 객체가 생성됩니다. 이 빈 객체가 생성자 함수가 새로 생성하는 객체입니다. 이후 생성자 함수 내에서 사용되는 this는 이 빈 객체를 가리킵니다. 그리고 생성된 빈 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정합니다.

2. this를 통한 프로퍼티 생성

- 생성된 빈 객체에 this를 사용하여 동적으로 프로퍼티나 메소드를 생성할 수 있습니다. this는 새로 생성된 객체를 가리키므로 this를 통해 생성한 프로퍼티와 메소드는 새로 생성된 객체에 추가됩니다.

3. 생성된 객체 반환

- 반환문이 없는 경우, this에 바인딩된 새로 생성한 객체가 반환됩니다. 명시적으로 this를 반환하여도 결과는 같습니다.
- 반환문이 this가 아닌 다른 객체를 명시적으로 반환하는 경우, this가 아닌 해당 객체가 반환됩니다. 이때 `this를 반환하지 않은 함수는 생성자 함수로서의 역할을 수행하지 못합니다`. 따라서 생성자 함수는 반환문을 명시적으로 사용하지 않습니다.

```javascript
function Person(name) {
	// 생성자 함수 코드 실행 전 -------- 1
	this.name = name; // --------- 2
	// 생성된 함수 반환 -------------- 3
}

var me = new Person('Lee');
console.log(me.name); // Lee
```

### 3.2 객체 리터럴 방식과 생성자 함수 방식의 차이

```javascript
// 객체 리터럴 방식
var foo = {
	name: 'foo',
	gender: 'male',
};

console.dir(foo);

// 생성자 함수 방식
function Person(name, gender) {
	this.name = name;
	this.gender = gender;
}

var me = new Person('Lee', 'male');
console.dir(me);

var you = new Person('Kim', 'female');
console.dir(you);
```

- 객체 리터럴 방식과 생성자 함수 방식의 차이는 프로토타입 객체(\[[Prototype]])에 있습니다.
- 객체 리터럴 방식의 경우, 생성된 객체의 프로토타입 객체는 Object.prototype입니다.
- 생성자 함수 방식의 경우, 생성된 객체의 프로토타입 객체는 Person.prototype입니다.

### 3.3 생성자 함수에 new 연산자를 붙이지 않고 호출할 경우

- 일반함수와 생성자 함수에 특별한 형식적 차이는 없으며 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작합니다.
- 객체 생성 목적으로 작성한 생성자 함수를 new 없이 호출하거나 일반함수에 new를 붙여 호출하면 오류가 발생할 수 있습니다. 일반함수와 생성자 함수의 호출 시 this 바인딩 방식이 다르기 때문입니다.
- 일반 함수를 호출하면 this는 전역객체에 바인딩되지만 new 연산자와 함께 생성자 함수를 호출하면 this는 생성자 함수가 암묵적으로 생성한 빈 객체에 바인딩됩니다.
- 이러한 위험성을 회피하기 위해 사용되는 패턴(Scope-Safe Constructor)은 다음과 같다. 이 패턴은 대부분의 라이브러리에서 광범위하게 사용된다.

```javascript
// Scope-Safe Constructor Pattern
function A(arg) {
	// 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈객체를 생성하고 this에 바인딩한다.

	/**
	 * this가 호출된 함수(arguments.callee, 본 예제의 경우 A)의 인스턴스가 아니면 new 연산자를 사용하지 않은 것이므로 이 경우 new와 함께 생성자 함수를 호출하여 인스턴스를 반환합니다.
	 * arguments.callee는 호출된 함수의 이름을 나타냅니다. 이 예제의 경우 A로 표기하여도 문제없이 동작하지만 특정함수의 이름과 의존성을 없애기 위해서 arguments.callee를 사용하는 것이 좋습니다.
	 */
	if (!(this instanceof arguments.callee)) {
		return new arguments.callee(arg);
	}

	// 프로퍼티 생성과 값의 할당
	this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value); // 100
console.log(b.value); // 10
```

- callee는 arguments 객체의 프로퍼티로서 함수 바디 내에서 현재 실행 중인 함수를 참조할 때 사용합니다. 다시 말해, 함수 바디 내에서 현재 실행 중인 함수의 이름을 반환합니다.
- 참고로 대부분의 빌트인 생성자(Object, Regex, Array 등)는 new 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환합니다.
- new 연산자와 함께 생성자 함수를 호출하는 경우, 생성자 함수 내부의 this는 생성자 함수에 의해 생성된 인스턴스를 가리킵니다.

```javascript
function Person(name) {
	// new없이 호출하는 경우, 전역객체에 name 프로퍼티를 추가
	this.name = name;
}

// 일반 함수로서 호출되었기 때문에 객체를 암묵적으로 생성하여 반환하지 않습니다.
// 일반 함수의 this는 전역객체를 가리킵니다.
var me = Person('Lee');

console.log(me); // undefined
console.log(window.name); // Lee
```

- 생성자 함수를 new 없이 호출한 경우, 함수 Person 내부의 this는 전역객체를 가리키므로 name은 전역변수(window)에 바인딩됩니다. 또한 new와 함께 생성자 함수를 호출하는 경우에 암묵적으로 반환하던 this도 반환하지 않으며, 반환문이 없으므로 undefined를 반환하게 됩니다.
- 일반함수와 생성자 함수에 특별한 형식적 차이는 없기 때문에 일반적으로 생성자 함수명은 첫문자를 대문자로 기술하여 혼란을 방지하려는 노력을 합니다. 그러나 이러한 규칙을 사용한다 하더라도 실수는 발생할 수 있습니다.

## 4. apply/call/bind 호출

- this에 바인딩될 객체는 함수 호출 패턴에 의해 결정됩니다. 이는 자바스크립트 엔진이 수행하는 것입니다. 이러한 자바스크립트 엔진의 암묵적 this 바인딩 이외에 this를 특정 객체에 `명시적으로 바인딩하는 방법`도 제공됩니다. 이것을 가능하게 하는 것이 `Function.prototype.apply`, `Function.prototype.call` 메소드입니다. 이 메소드들은 모든 함수 객체의 프로토타입 객체인 Function.prototype 객체의 메소드입니다.
- 명시적인 바인딩은 묵시적 바인딩보다 우위를 갖게 됩니다.

```javascript
func.apply(thisArg, [argsArray]);
// thisArg: 함수 내부의 this에 바인딩할 객체
// argsArray: 함수에 전달할 argument의 배열
```

- 기억해야 할 것은 apply() 메소드를 호출하는 주체는 함수이며 apply() 메소드는 this를 특정 객체에 바인딩할 뿐 본질적인 기능은 함수 호출이라는 것입니다.

```javascript
var Person = function(name) {
	this.name = name;
};

var foo = {};

// apply 메소드는 생성자함수 Person을 호출한다. 이때 this에 객체 foo를 바인딩한다.
Person.apply(foo, ['name']);

console.log(foo); // { name: 'name' }
```

- 빈 객체 foo를 apply() 메소드의 첫번째 매개변수에, argument의 배열을 두번째 매개변수에 전달하면서 Person 함수를 호출하였습니다. 이때 Person 함수의 this는 foo 객체가 됩니다. Person 함수는 this의 name 프로퍼티에 매개변수 name에 할당된 인수를 할당하는데 this에 바인딩된 foo 객체에는 name 프로퍼티가 없으므로 name 프로퍼티가 동적 추가되고 값이 할당됩니다.
- apply() 메소드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메소드를 사용하는 경우입니다. arguments 객체는 배열이 아니기 때문에 slice() 같은 배열의 메소드를 사용할 수 없으나 apply() 메소드를 이용하면 가능합니다.

```javascript
function convertArgsToArray() {
	console.log(arguments);

	// arguments 객체를 배열로 변환
	// slice: 배열의 특정 부분에 대한 복사본을 생성한다.
	var arr = Array.prototype.slice.apply(arguments); // arguments.slice
	// var arr = [].slice.apply(arguments);

	console.log(arr);
	return arr;
}

convertArgsToArray(1, 2, 3);
```

- Array.prototype.slice.apply(arguments)는 'Array.prototype.slice() 메소드를 호출합니다. 단 this는 arguments 객체로 바인딩합니다'는 의미가 됩니다. 결국 Array.prototype.slice() 메소드를 arguments 객체 자신의 메소드인 것처럼 arguments.slice()와 같은 형태로 호출합니다.
- call() 메소드의 경우, apply()와 기능은 같지만 apply()의 두번째 인자에서 배열 형태로 넘긴 것을 각각 하나의 인자로 넘깁니다.

```javascript
Person.apply(foo, [1, 2, 3]);
Person.call(foo, 1, 2, 3);
```

- apply()와 call() 메소드는 콜백 함수의 this를 위해서 사용되기도 합니다.

```javascript
function Person(name) {
	this.name = name;
}

Person.prototype.doSomething = function(callback) {
	if (typeof callback == 'function') {
		callback.call(this);
	}
};

function foo() {
	console.log(this.name);
}

var p = new Person('Lee');
p.doSomething(foo); // 'Lee'
```

- ES5에 추가된 Function.prototype.bind를 사용하는 방법도 가능합니다. Function.prototype.bind는 함수에 인자로 전달한 this가 바인딩된 새로운 함수를 리턴합니다. 즉, Function.prototype.bind는 Function.prototype.apply, Function.prototype.call 메소드와 같이 함수를 실행하지 않기 때문에 명시적으로 함수를 호출할 필요가 있습니다.
- Function.prototype.bind를 `하드 바인딩(Hard binding)`이라고 부릅니다.
  - 하드바인딩은 명시적 바인딩보다 우위를 갖게 됩니다.

```javascript
function Person(name) {
	this.name = name;
}

Person.prototype.doSomething = function(callback) {
	if (typeof callback == 'function') {
		// callback.call(this);
		// this가 바인딩된 새로운 함수를 호출
		callback.bind(this)();
	}
};

function foo() {
	console.log('#', this.name);
}

var p = new Person('Lee');
p.doSomething(foo); // 'Lee'
```

### call

- call 메소드의 첫번째 파라미터는 함수가 호출되는 순간 'this' 오브젝트 값을 세팅합니다.
- 나머지 파라미터들은 실제 함수의 인자들을 사용합니다.

### apply

- call 메소드와 비슷하게 동작합니다.
- 첫번째 파라미터는 함수가 호출되는 순간 'this'의 값을 세팅합니다.
- apply 메소드가 call 메소드와 유일하게 다른 점은 두번째 파라미터에서 실제 함수의 인자 값을 `배열`로 받는다는 것입니다.

### bind

- bind 메소드에 대한 첫번째 파라미터는 역시 bound 함수가 호출될 때, 타겟 함수에서 'this' 의 값을 세팅하는 부분입니다.
- bound 함수가 'new' 연산자를 이용하여 생성됐을때는, 바인드 시킨 this 값(첫번째 파라미터의 값)이 무시된다는 것을 알아두셔야 합니다.
- 나머지 파라미터들은 인자로 잘 넘겨집니다.

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

## 참조

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #15 자바스크립트 : this, call(), apply(), bind()](https://velog.io/@jakeseo_me/2019-05-07-1605-%EC%9E%91%EC%84%B1%EB%90%A8-qpjvdgllm8)
- [함수 호출 방식에 의해 결정되는 this](https://poiemaweb.com/js-this)
