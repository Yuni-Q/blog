---
title: ES6 Overview
date: 2020-05-02 12:05:73
category: 실용주의 프론트 엔드 개발
draft: false
---

## var vs let

### var

- var is Function Scope
- ES5 변수에서는 var 키워드로 변수 선언을 했습니다. var 키워드는 Function Scope로 블럭에 정의를 해도 블럭 밖에서 사용이 가능합니다.

### let

- let is Block Scope
- ES6에서는 let 키워드가 추가 되었고, 블럭 단위로 변수를 선언할 수 있습니다. let 키워드는 Block Scope로 블럭에 정의 후 블럭 밖에서 참조시 ReferenceError가 발생하게 됩니다.

## var vs let - loop scoping

- for 루프를 통해 Function Scope와 Block Scope의 차이를 알수 있습니다. var 키워드의 경우 for 의 선언문에 정의된 변수는 블럭 밖에서 사용할 수 있습니다. 그렇기 때문에 for 밖에서 선언을 하기도 했습니다. let 키워드를 사용할 경우 for 선언문에 정의를 해도 블럭 밖에서 사용을 할 수 없기 때문에 더이상 for loop를 사용하기 전에 같은 변수를 정의할 필요 없어 졌습니다.

## let vs const

- Block Scope 선언 키워드에서 let 이외에도 const 라는 키워드가 있습니다. 다른 점은 const는 불변이고 let은 변경이 가능합니다. 여기서 볼 수 있듯이 const로 정의할 경우 값을 변경하려고 했을 때 TypeError가 발생합니다.
  - let is not immutable
  - const is immutable

## const

- const 키워드는 해당 값을 불변으로 만들기 때문에 오브젝트를 할당했을 때는 오브젝트에 프로퍼티는 변경이 가능합니다. 그 이유는 오브젝트는 Heap Memory에 할당이 되고 할당된 주소값만 상수에 할당되기 때문입니다. 그래서 프로퍼티를 변경/수정/삭제를 할 수 있습니다.
  - content can be changed
  - freeze : 프로퍼티 변경을 막을려면 freeze라는 함수를 사용됩니다. 하지만 프로퍼티의 값이 오브젝트일경우는 변경이 가능합니다.

## Arrow function

- 기존의 함수는 메소드가 아닌 함수, 메소드, 생성자 이 세가지의 기능을 했습니다. 이 기능을 위해 bind(this), self = this와 같은 코드를 선언해야 했습니다. 하지만 화살표함수는 이 문제를 해결책으로 함수의 기능만 담았습니다.

### function declaration

- ES5의 함수는 function 키워드를 통해 정의 되었습니다.

### Arrow function

- ES6함수인 화살표함수는 아래와 같이 간결하게 정의됩니다.

```javascript
const sum = (a, b) => a + b;
const getBMI = (weight, height) => {
	height /= 100;
	return weight / Math.pow(height, 2);
};
```

### Always anonymous

- 화살표함수는 항상 익명함수로 정의됩니다.

### Lexical this

- 화살표함수에서는 this를 주변(lexical)에서 가져옵니다. 즉, 더이상 bind(this), self = this 코드를 선언할 필요가 없습니다.

### It can’t be used constructor

- 화살표함수는 프로토타입 생성하지 않기 때문에 함수의 기능만 할수 있습니다. 즉, 생성자의 기능을 할 수 없습니다.

## Class

- 기존의 OOP 구현방식은 프로토타입 기반으로 이뤄졌습니다. ES5 함수처럼 몇몇의 문제점 때문에 불필요한 코드를 선언해야 했습니다. 하지만 ES6에서는 class 키워드를 통해 클래스를 선언합니다.
- ES5에서 함수를 생성자로 사용했던 방식은 class에서는 적용되지 않습니다. 생성자 없이 초기화할 수 없고, 호이스팅이 되지 않습니다.

### Class declaration

```javascript
class MyClass {}
const instance = new MyClass();
```

### Class expression

```javascript
const MyClass = class {};
const instance = new MyClass();
```

### Sub classing

```javascript
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	toString() {
		return `${this.x} ${this.y}`;
	}
}
class ColorPoint extends Point {
	constructor(x, y, color) {
		super(x, y); //Must call super
		this.color = color;
	}
	toString() {
		return `${super.toString()} in ${this.color}`;
	}
}
```

### Getter & Setter

```javascript
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	get axis() {
		return [this.x, this.y];
	}

	set axis([x, y]) {
		this.x = x;
		this.y = y;
	}
}

const point = new Point(0, 0);
console.log(point.axis); //[0, 0]
point.axis = [10, 10];
console.log(point.x, point.y); //10, 10
```

### Static

```javascript
class Point {
	static pointMethod() {}
}

class ColorPoint extends Point {
	static pointmethod() {
		super.pointMethod();
	}
}

Point.pointmethod();
ColorPoint.pointmethod();
```

## Assignment

### Object property

- ES5 객체 프로퍼티 할당시 key value 형태로 할당을 했었습니다. ES6에서는 변수를 그대로 할당하면 변수명은 property명으로 들어가고 변수의 값이 property 값으로 들어가게 됩니다.

```javascript
const ip = '127.0.0.1';
const port = 1234;
const serverInfo = { ip, port };
// { ip: '127.0.0.1', port: 1234 }
```

### Method Definition

- ES5에서 메소드를 정의할 때는 기존에 프로퍼티에 익명 함수를 사용했지만 ES6에서는 프로퍼티와 익명함수를 사용하지 많고 직관적으로 사용할 수 있습니다.

```javascript
const person = {
	name: '',
	getName() {
		return this.name;
	},
	setName(name) {
		this.name = name;
	},
};
person.setName('Peter');
console.log(person.getName()); //Peter
```

## Destructuring

- object나 Array의 구조를 알고 있으면 새로운 변수를 정의할 때 필요한 부분만 해체해서 사용할 수 있습니다.

### Object

- 객체에 정의된 프로퍼티를 가져와 변수명과 같을 정의할 수 있습니다.

```javascript
const { weight, height } = { weight: 72, height: 173 };
console.log(weight, height); // 72 173
```

### Array

- Array는 대괄호를 사용해서 인덱스에 변수를 정의하면 해당 변수에 해당 인덱스 값이 정의됩니다.

```javascript
const [a, , b] = [0, 1, 2];
console.log(a, b); //0 2
```

## Default value

- Parameter와 Destructuring 부분에 기본값을 정의할 수 있습니다. 변수명 이퀄을 사용해서 기본값을 정의할 수 있습니다.

### Parameter

```javascript
const serverInfo = {
	ip: null,
	port: null,
	setDevInfo(ip = '127.0.0.1', port = 1234) {
		this.ip = ip;
		this.port = port;
	},
};
serverInfo.setDevInfo(); //ip: 127.0.0.1, port: 1234
```

### Destructuring

```javascript
const peter = { weight: 72, height: 173 };
const { weight, height, age = 25 } = peter;
console.log(weight, height, age); //72, 173, 25
```

### 해체할당

- 나머지 연산자를 통해 객체 프로퍼티와 배열 요소에 할당할 수도 있습니다.

```javascript
const obj = {};
[, ...obj.prop] = ['a', 'b', 'c'];

// 해체를 통해 할당하는 경우 할당 대상은 좌변에 올수 있는 모든 것이 될 수 있습니다.
const obj = {};
const arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

console.log(obj); //{prop: 123}
console.log(arr); // [true]

// 기존에 정의된 변수를 할당대상으로 지정할 경우 괄호를 묶어야 합니다.
let a, b

{a, b} = someObject; //SyntaxError
({a, b} = someObject) //Ok
```

## ...

- 점점점이라는 문법이 추가 됐는데, 이 문법은 두가지 기능이 있습니다.

### Rest Parameter

- Rest Operator 기능은 함수로 전달되는 argument들 중 변수로 정의되지 않는 것들을 모두 가져옵니다. 가장 중요한 것은 Rest Operator는 항상 마지막에 사용해야 합니다.

```javascript
function foo(...args) {} //args : [1,2,3]
foo(1, 2, 3);
function bar(first, ...args) {} //args : [2,3]
bar(1, 2, 3);
```

### Destructuring assignment

- Spread 기능은 반복가능한 데이터 앞에 ...을 사용하면 아이템들을 순서대로 꺼내줍니다.

```javascript
const odd = [1, 3, 5];
const even = [2, 4, 6];
const num = [...odd, ...even];
// [1, 3, 5, 2, 4, 6]
sum(...odd); //9

const obj1 = { a: 'a' };
const obj2 = { b: 'b' };
const mergedObj = { ...obj1, ...obj2 };
// {a: 'a', b: 'b'}
```

## String Template

- 이 기능은 View 레이어에서 탬플릿 엔진을 사용하는 것 처럼 변수와 연산 기능을 수행할 수 있는 탬플릿 기능입니다. 백틱이라는 것으로 감싸주고 \${}를 사용하면 문자열속에 변수를 사용할 수 있습니다.

### String concatenation

```javascript
const name = 'Peter';
const txt = `Hello WorldI'm ${name}`;
console.log(txt); // Hello WorldI'm Peter
```

### Expression

```javascript
const math = 90;
const science = 100;
console.log(`Math: ${math}
  Sciene: ${science}
  Total: ${math + science}
  Average: ${(math + science) / 2}`);
/*
Math: 90
  Sciene: 100
  Total: 190
  Average: 95
/*
```

### Undefined variable

```javascript
const txt = `Hello ${name}`;
console.log(txt); // Hello
```

### Special Character

- 특수문자를 사용할 때는 SyntaxError가 발생함으로 이스케이프 문자를 사용해야 합니다.

```javascript
const txt = `Hello \$\{\}`;
console.log(txt); //Hello ${}
```

## Export & Import

- ES5 이전 모듈은 라이브러리를 통해서만 구현이 되었고 내장되있지 않았습니다. ES6에서는 내장된 모듈을 가지고 각 파일에 하나의 모듈을 사용하고 있습니다.

### export

- 무언가를 내보낼 때는 export 키워드를 사용합니다. 변수, 함수, 클래스를 모두 내보낼 수 있습니다.

```javascript
export const sqrt = Math.sqrt;
export function sum(...numbers) {
	return numbers.reduce((prev, cur) => {
		return prev + cur;
	});
}

export function avg(...numbers) {
	const sumResult = sum(...numbers);
	return sumResult / numbers.length;
}
```

### import

```javascript
import { sum, avg } from './lib';

sum(1, 2, 3, 4); //10
avg(1, 2, 3, 4); //2.5
```

### default

- default export는 하나만 선언할 수 있습니다.

```javascript
//myFunc.js
export default function() {}
//main.js
import myFunc from './myFunc';
myFunc();
```

### alias

- 이름이 중복되는 것을 방지하기 위해 Alias를 선언할 수 있습니다.

```javascript
import { getTime } from './bar';
import { getTime } from './foo';
//Duplicate declaration

import * as bar from './bar';
import * as foo from './foo';

import { getTime as getTimeOfBar } from './bar';
import { getTime as getTimeOfFoo } from './foo';
```

## Import is read-only

- 모듈에 선언된 값은 읽기전용으로 변경할 수 없습니다. let 키워드로 정의해도 다른 모듈에서는 변경이 불가능합니다.

```javascript
//main.js
import { counter, incCounter } from './lib';

console.log(counter);
// 3
incCounter();
console.log(counter);
// 4
counter++;
//SyntaxError 'counter' is read-only

//lib.js
export let counter = 3;

export function incCounter() {
	counter++;
}
```

## Data Structure

- ES6에서는 Map, WeakMap, Set, WeakSet 네가지의 자료구조를 내장으로 제공합니다

### Map

- Map의 키는 어떤 값도 가능합니다. 객체도 키가 될 수 있습니다. 만약에 미정의된 키를 조회할 경우 undefined를 반환합니다.

```javascript
const map = new Map();
map.set('foo', true);
map.set('bar', false);
map.get('foo'); //true
map.has('foo'); //true
map.delete('foo');
map.size; //2
map.clear(); //map.size === 0

const map = new Map([
	['foo', true],
	['bar', false],
]);
```

### Set

- Set의 고유한 데이터를 순서의 상관없이 모아둡니다. 그래서 이미 선언된 데이터도 중복선언이 되지 않습니다.

```javascript
const set = new Set();
set.add('red');
set.has('red'); //true
set.delete('red');
set.has('red'); //false
set.add('red');
set.add('green');
set.size; //2
set.clear(); //set.size === 0
const set = new Set(['red', 'green', 'blue']);

//Chainable
set.add('purple').add('black');
```

### WeakMap

- Map과 WeakMap의 차이는 가비지 컬렉터에 키가 수집이 되는 것에 막지 않습니다.
- WeakMap의 키는 객체만 정의할 수 있고, 해당 객체가 삭제되면 WeakMap에서도 삭제됩니다.
- WeakMap을 조회하는 것은 키로만 할 수 있습니다. 그래서 get, set, has, delete 메소드만 제공합니다.

```javascript
const weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, false);
console.log(weakMap.get(obj)); //false
obj = null; // obj in weakMap is garbage-collected
```

### WeakSet

- WeakSet도 WeakMap과 유사하게 동작합니다. 값은 객체만 될 수 있고, add, has, delete 메소드만 제공합니다.

```javascript
const weakSet = new WeakSet();
let obj = {};
weakSet.add(obj);
weakSet.has(obj); //true
obj = null; // obj in weakSet is garbage-collected
```

## Promise

- Promise는 비동기처리에 대한 콜백의 대안입니다. 콜백보다 구현자의 노력이 필요하지만 몇 가지 이점을 제공합니다.

### resolve/reject

```javascript
const promise = new Promise((resolve, reject) => {
	getData(
		response => resolve(response.data),
		error => reject(error.message)
	);
});
```

### then / catch

```javascript
promise.then(data => console.log(data)).catch(err => console.error(err));
```

### all

- Promise의 모든 결과를 받을 때 Promise.all()로 받을 수 있습니다. 그리고 모든 결과를 배열을 통해 받습니다.

```javascript
Promise.all([
  getPromise(),
  getPromise(),
  getPromise()
])  //response all data
  .then([result1, result2, result3] => {})
  .catch(err => console.error(err))
```

### race

- 가장 빠르게 응답되는 Promise를 찾을 때는 Promise.race()를 통해 사용할 수 있습니다. 이 기능을 활용하면 타임아웃기능을 구현할 수 있습니다.

```javascript
Promise.race([
	getPromise(), //1000ms
	getPromise(), //500ms
	getPromise(), //250ms
]) //response of 250ms
	.then(data => console.log(data))
	.catch(err => console.error(err));
```

## Symbol

### Unique

```javascript
const RED1 = Symbol('red');
const RED2 = Symbol('red');
console.log(RED1 === RED2); //false
```

### Property Keys

```javascript
const height = Symbol('height');
const obj = { age: 25 };
obj[height] = 173;

Object.getOwnPropertyNames(obj); //[ 'age’ ]
Object.getOwnPropertySymbols(obj); // [ Symbol(height) ]
```

### Clear intention

#### Bad

```javascript
const SWITCH_OFF = 0;
const EQUAL = 0;

const getBtnStatus = () => SWITCH_OFF;
const compareVersion = () => EQUAL;

const btnStatus = getBtnStatus();
const comparedResult = compareVersion('0.0.1', '0.0.1');

btnStatus === comparedResult; //true
```

#### Good

```javascript
const SWITCH_OFF = Symbol(0);
const EQUAL = Symbol(0);

const getBtnStatus = () => SWITCH_OFF;
const compareVersion = () => EQUAL;

const btnStatus = getBtnStatus();
const comparedResult = compareVersion('0.0.1', '0.0.1');

btnStatus === comparedResult; //false
```

## Proxy

### Intercept and customize operations

```javascript
const target = {};
const proxy = new Proxy(target, {
	get(target, propKey) {
		console.log('GET', propKey);
		return target[propKey];
	},
	set(target, propKey, value) {
		console.log('SET', propKey);
		target[propKey] = value;
	},
});
proxy.foo; //GET foo
proxy.bar = 'abc'; //SET bar

const target = {};
const proxy = new Proxy(target, {
	has(target, propKey) {
		console.log('HAS', propKey);
		return propKey in target;
	},
	deleteProperty(target, propKey) {
		console.log('DELETE', propKey);
		delete target[propKey];
	},
});
'hello' in proxy; //HAS hello
delete proxy.bara; //DELETE bar
```

### Function

```javascript
const sum = (a, b) => a + b;
const handler = {
	apply(target, thisArg, argumentsList) {
		return target(...argumentsList);
	},
};

const proxySum = new Proxy(sum, handler);
proxySum(1, 2); //3
```

### Class

```javascript
class Person {
	constructor(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}
}

const handler = {
	construct(target, args) {
		return new target(...args);
	},
};
const ProxyPerson = new Proxy(Person, handler);
const peter = new ProxyPerson('peter.cho');
peter.getName(); //peter.cho
```

## New built in method

### String

```javascript
'Hello'.startsWith('Hell'); // output: true
'Goodbye'.endsWith('bye'); // output: true
'Jar'.repeat(2); // output: JarJar
'abcedf'.includes('bce'); // output: true
```

### Number

```javascript
Number.EPSILON;
Number.isNaN();
Number.isFinite();
Number.isInteger();
Number.isSafeInteger();
Number.parseFloat();
Number.parseInt();
```

### Array Static Method

```javascript
// Array.from()
// from array-like objects
let arrayLike = {
	0: 'zero',
	1: 'one',
	2: 'two',
	3: 'three',
	length: 4,
};
Array.from(arrayLike); //['zero', 'one', 'two', 'three']
Array.from({ length: 5 }, (v, i) => i); // [0, 1, 2, 3, 4]
Array.from('zero')[('z', 'e', 'r', 'o')];

Array.of();
// A better way to create arrays
Array.of(1, 2, 3, 4, 5); //[1, 2, 3, 4, 5]
```

### Array.prototype.\*

```javascript
// Array.prototype.find()
[4, 100, 7].find(x => x > 5); //100

// Array.prototype.findIndex()
[4, 100, 7].findIndex(x => x > 5); //1

// Array.prototype.fill()
new Array(7).fill(2).fill(3, 2, 5); // [2, 2, 3, 3, 3, 2, 2]
```

### Object Static Method

```javascript
// Object.assign()
let x = { a: 1 };
Object.assign(x, { b: 2 }); // { a: 1, b: 2}

// DOM Style를 할당할 때도 사용할 수 있다.
Object.assign(dom.style, {
	color: '#fff',
	fontSize: '12px',
});

// 두 값이 같은지 확인한다.
Object.is('y', 'y'); //true
Object.is({ x: 1 }, { x: 1 }); // false
Object.is(NaN, NaN); // true
```

## 참고

- [ES6 Overview](https://peter-cho.gitbook.io/book/10/es6-overview#map)
