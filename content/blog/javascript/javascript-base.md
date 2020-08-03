---
title: JavaScript base
date: 2020-07-29 09:07:57
category: javascript
draft: true
---

## 1. type

```javascript
typeof 1; // 'number'
typeof 2.5; // 'number'
typeof 'hello world'; // 'string'
typeof true; // 'boolean'
typeof null; // 'object'
typeof {}; // 'object'
typeof undefined; // 'undefined'
```

## 2. 입출력

```javascript
const answer = prompt('이름이 무엇인가요?');
console.log(answer);
alert(answer);
```

## 3. 객체

```javascript
// 객체의 생성
const obj = {
	x: 0, // 객체의 속성. 속성 이름: x, 속성 값: 0
	y: 1, // 객체의 속성. 속성 이름: y, 속성 값: 1
};

// 객체의 속성에 접근하기
obj.x;
obj['y'];

// 객체의 속성 변경하기
obj.x += 1;
obj['y'] -= 1;

// 객체의 속성 삭제하기
delete obj.x;
```

## 4. 정수인지 실수인지 판별

```javascript
Number.isInteger(1); // true
Number.isInteger(0.1); // false
```

## 5. 특이한 Number 값

- NaN
- -0
- Infinity
- -Infinity

## 6. NaN 비교

- 자신과 비교 할 수 없고 다음의 함수를 이용합니다.

```javascript
const thisIsNan = NaN;

// 주의! 이렇게 하면 안 됩니다.
thisIsNan === NaN; // false

// 이렇게 해야 합니다.
Number.isNaN(thisIsNan); // true
Object.is(thisIsNan, NaN); // true
```

## 7. 0과 -0은 거의 같습니다

- 그러나 몇몇 예외가 존재합니다. Object.is 함수는 0과 -0을 다른 값으로 취급합니다.

```javascript
Object.is(0, -0); // false
```

- 0이 아닌 어떤 수를 0 혹은 -0으로 나눌 때에도 결과값이 다릅니다.

```javascript
1 / 0; // Infinity
1 / -0; // -Infinity
```

## 8. Infinity

- 어떤 값이 Infinity인지 아닌지 판별하려면, Number.isFinite 메소드를 사용합니다. 비슷한 기능의 isFinite라는 전역 함수도 존재하긴 하지만, 동작이 미묘하게 다르므로 ES2015에 추가된 Number.isFinite를 사용하시는 걸 추천합니다.
- isFinite() 전역 함수는 주어진 값이 유한수인지 판별합니다. 필요한 경우 매개변수를 먼저 숫자로 변환합니다.

```javascript
Number.isFinite(1); // true
Number.isFinite(Infinity); // false
Number.isFinite('1'); // false
isFinite('1'); // true - `isFinite`는 문자열을 숫자로 변환합니다.
```

## 9. 문자열을 배열로 바꾸기

```javascript
[...'hello']; // ['h', 'e', 'l', 'l', 'o']
```

## 10 . 유니코드 코드포인트 비교는 사전순 비교가 아니므로 주의해야 합니다. 사전순 비교를 하려면 localeCompare 메소드를 사용합니다.

- The localeCompare() 메서드는 기준 문자열과 비교했을 때 비교 대상 문자열이 정렬상 전에 오는지, 후에 오는지 혹은 같은 순서에 배치되는지를 알려주는 숫자를 리턴합니다.

## 11. truthy & falsy

- truthy이 아닌 값들(즉, falsy인 값들)
  - false
  - null
  - undefined
  - 0
  - NaN
  - ''

## 12. ==와 === 중 ===를 쓰는 것이 좋지만 null check의 경우 ==를 사용합니다

```javascript
null === undefined; // false
null == undefined; // true

null == 1; // false
null == 'hello'; // false
null == false; // false

undefined == 1; // false
undefined == 'hello'; // false
undefined == false; // false
```

## 13. JavaScript에서는 객체 간에 공유되어야 하는 속성과 메소드를, 프로토타입(prototype)이라는 기능을 이용해서 효율적으로 저장할 수 있습니다.

- 어떤 객체에 프로토타입을 지정하면, 프로토타입의 속성을 해당 객체에서 재사용할 수 있습니다. 객체의 프로토타입을 지정하는 방법에는 여러 가지가 있는데, 가장 쉬운 방법은 Object.create 함수를 이용하는 것입니다.

```javascript
const personPrototype = {
	introduce: function() {
		return `안녕하세요, 제 이름은 ${this.name}입니다.`;
	},
};

const person1 = Object.create(personPrototype); // 새 객체를 생성하고 프로토타입을 지정합니다.
person1.name = '이윤희';

const person2 = Object.create(personPrototype);
person2.name = '윤희';

person1.introduce(); // 안녕하세요, 제 이름은 이윤희입니다.
person2.introduce(); // 안녕하세요, 제 이름은 윤희입니다.

person1.introduce === person2.introduce; // true
```

## 14. Array.from

```javascript
// `string` 타입은 래퍼 객체를 통해 iterable로 다루어질 수 있습니다.
Array.from('hello'); // ["h", "e", "l", "l", "o"]
```

## 15. 요소 수정하기

```javascript
const arr = [1, 2, 3, 4, 5];

// 전체를 0으로 채웁니다.
arr.fill(0);
console.log(arr); // [ 0, 0, 0, 0, 0 ];

// 인덱스 2와 4 사이를 1로 채웁니다.
arr.fill(1, 2, 4);
console.log(arr); // [ 0, 0, 1, 1, 0 ];
```

## 16. 배열 요소 추가 삭제

```javascript
const a = [1, 2, 3, 4, 5];
console.log(a); // [1, 2, 3, 4, 5, 6]
a.push(6);
console.log(a); // [1, 2, 3, 4, 6]
a.pop();
console.log(a); // [1, 2, 3, 4, 5]
a.unshift(0);
console.log(a); // [0, 1, 2, 3, 4, 5]
a.shift();
console.log(a); // [1, 2, 3, 4, 5]
```

## 17. 요소를 배열 중간에 삽입하기

```javascript
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 2, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

## 18. 배열로부터 새로운 값 생성

```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

## 19. 배열이 특정 조건을 만족하는지 판별하기

- 배열의 세 메소드 includes, every, some는 모두 배열이 특정 조건을 만족하는지를 나타내는 진리값을 반환합니다.

### includes

```javascript
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false
```

### every

```javascript
const isBelowThreshold = currentValue => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true
```

### some

```javascript
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = element => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```

## 20. 객체의 가변성 때문에 어려움을 겪고 있다면, 두 가지 해결책을 시도해볼 수 있습니다.

- 먼저 Object.freeze의 사용을 고려해볼 수 있습니다. Object.freeze는 객체를 얼려서 속성의 추가/변경을 막습니다. 다만 Object.freeze를 호출한다고 해서 객체 안에 있는 객체까지 얼려버리지는 않으므로, 중첩된 객체에는 Object.freeze를 사용하기가 조금 까다롭습니다.
- Immutable.js, immer 같은 라이브러리의 사용합니다. 이런 라이브러리들은 Object.freeze처럼 객체를 정말로 얼려버리지는 않지만, 객체를 마치 불변인 것처럼 다룰 수 있는 방법을 제공합니다. 다시 말하면, 이 객체들은 메소드를 통해 내용이 조금이라도 변경되면 아예 새로운 객체를 반환합니다. 즉, 내용이 달라지면 참조 역시 달라지게 되어 객체의 내용이 변경되었는지를 확인하는 작업이 아주 쉬워집니다.

## 21. 엄격모드

- 엄격 모드를 활성화하려면 .js 파일 또는 함수의 가장 위에 'use strict';와 같이 문자열을 써 주면 됩니다. 파일 위에서 엄격 모드를 선언하면 해당 파일 전체가 엄격 모드로 동작하고, 함수 위에서 선언한다면 해당 함수만 엄격 모드로 동작합니다.

## 22. 객체 자신이 어떤 속성을 가지고 있는지를 확인하기 위해 Object.prototype.hasOwnProperty 메소드를 사용할 수 있습니다.

```javascript
const obj = Object.create({ inheritedProp: 'inheritedProp' });
obj.ownProp = 'ownProp';

console.log(obj.hasOwnProperty('inheritedProp')); // false
console.log(obj.hasOwnProperty('ownProp')); // true
console.log(obj.hasOwnProperty('constructor')); // false
```

- 어떤 객체의 전체 속성에 대한 속성 기술자를 얻어오려면, Object.getOwnPropertyDescriptors 정적 메소드를 사용하면 됩니다.

## 23. get / set

```javascript
const obj = {
	get prop() {
		console.log('getter가 호출되었습니다.');
		return this._hidden;
	},
	set prop(arg) {
		console.log('setter가 호출되었습니다.');
		this._hidden = arg;
	},
};
// `set prop` 메소드가 `1`을 인수로 해서 호출됩니다.
obj.prop = 1;

// `get prop` 메소드가 호출되고 해당 메소드의 반환값을 읽어옵니다.
obj.prop; // 1

Object.getOwnPropertyDescriptors(obj);
// {
//   prop: {
//     get: [Function: get],
//     set: [Function: set],
//     enumerable: true,
//     configurable: true
//   },
//   ...
// }
```

## 24. 객체의 속성 열거하기

- Object.keys : 객체 자신의 속성 중 열거 가능한(enumerable) 속성의 이름을 배열로 반환합니다.
- Object.values : 객체 자신의 속성 중 열거 가능한(enumerable) 속성의 속성 값을 배열로 반환합니다.
- Object.entries : 객체 자신의 속성 중 열거 가능한(enumerable) 속성의 이름과 값을 배열로 반환합니다.
- Object.getOwnPropertyNames - 객체 자신의 모든 속성의 이름을 배열로 반환합니다. 열거 불가능한 속성도 포함합니다.
- for...in 구문 : 객체 자신의 속성 및 상속받은 속성 중 열거 가능한(enumerable) 속성의 이름을 배열로 반환합니다.

## 25. 깊은 복사 & 얕은 복사

```javascript
let a = { a: 2, b: 3, e: { c: 4, d: 5 } };
let b = a;
let c = Object.assign({}, a);

a.a = 4;
a.e.c = 99;
console.log(a); // { a: 4, b: 3, e: { c: 99, d: 5 } }
console.log(b); // { a: 4, b: 3, e: { c: 99, d: 5 } }
console.log(c); // { a: 2, b: 3, e: { c: 99, d: 5 } }
```

- 여기서 주의해야 할 점이 있습니다. 객체가 중첩되어 있다면, 내부에 있는 객체는 복제되지 않습니다. Object.assign을 통해 속성이 값이 복사될 때, 실제로 복사되는 것은 중첩된 객체라 아니라 그에 대한 참조이기 때문입니다.

## 26. 객체에 속성 추가 막기

- JavaScript의 모든 객체에는 [[Extensible]]이라는 숨겨진 속성이 있습니다. 이 속성의 기본값은 true인데, 이 값이 false가 되면 해당 객체에 속성을 추가하는 것이 불가능해집니다. Object.preventExtensions 정적 메소드는 [[Extensible]] 속성을 false로 바꿔주는 역할을 합니다.
- Object.seal : 인수로 들어온 객체의 [[Extensible]] 속성을 false로 바꾸고, 객체 자신의 속성을 모두 configurable: false 상태로 바꿉니다.
- Object.freeze : 인수로 들어온 객체의 [[Extensible]] 속성을 false로 바꾸고, 객체 자신의 속성을 모두 configurable: false, writable: false 상태로 바꿉니다.
  - configurable : 이 속성의 값을 변경할 수 있고, 대상 객체에서 삭제할 수도 있다면 true 입니다. 기본값은 false 입니다.
  - writable : 할당 연산자로 속성의 값을 바꿀 수 있다면 true 입니다.기본값은 false 입니다.

## 27. Short-circuit Evaluation

```javascript
// `func1`과 `func2`는 동일하게 동작합니다.
function func1(cond) {
	if (cond) {
		console.log('조건을 만족합니다.');
	}
}

function func2(cond) {
	cond && console.log('조건을 만족합니다.');
}
```

```javascript
// `func1`과 `func2`는 동일하게 동작합니다.
function func1(arg) {
	if (!arg) {
		arg = 'hello';
	}
	console.log(arg);
}

function func2(arg) {
	arg = arg || 'hello';
	console.log(arg);
}
```

## 28. Spread Syntax

- ...을 이용해서 얕은 복사를 할 수 있습니다.

```javascript
const numbers = [1, 2, 3];

const num = [...numbers];

numbers[1] = 3;

console.log(numbers); // [1, 3, 3]

console.log(num); // [1, 2, 3]
```

## 29. 분해대입 (Destructuring Assignment

```javascript
const [a, b, ...c] = [1, 2, 3, 4, 5];

console.log(c); // [3, 4, 5]
```

```javascript
const {
	a,
	b: { c },
} = { a: 1, b: { c: 2 } };

console.log(a, c); // 1 2
```

```javascript
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };

console.log(rest); // { c: 3, d: 4 }
```

### 좌측 변수에 기본으로 대입될 값을 미리 지정해둘 수 있습니다.

```javascript
// `c` 위치에는 대입될 값이 없으므로, 기본값인 `3`이 대신 사용됩니다.
let [a, b, c = 3] = [1, 2];

console.log(c); // 3
```

## 30. JSON

```javascript
// `JSON.stringify`로 직렬화를 할 수 있습니다.
JSON.stringify({
	key: 'value',
	arr: [1, 2, 3],
	nullProp: null,
	undefinedProp: undefined, // 값이 `undefined`인 속성은 직렬화 과정에서 제외됩니다.
}); // '{"key":"value","arr":[1,2,3],"nullProp":null}'

// `JSON.parse`로 역직렬화를 할 수 있습니다.
JSON.parse('{"key":"value","arr":[1,2,3],"nullProp":null}');
// {key: "value", arr: Array(3), nullProp: null}
```

- 속성 이름은 꼭 쌍따옴표를 둘러주어야 합니다.
- Map, Set, Date, Error, RegExp, Function, Promise와 같이 특별한 동작방식을 가지는 객체들을 제대로 표현할 수 없습니다.
- undefined, NaN, Infinity과 같은 값을 표현할 수 없습니다.
- 주석을 쓸 수 없습니다.

## 31. DATE 문자열로 변환하기

```javascript
const now = new Date();
console.log(now.toString()); // Sun Dec 10 2017 12:49:31 GMT+0900 (KST)
console.log(now.toLocaleString()); // 2017. 12. 10. 오후 12:49:31
console.log(now.toDateString()); // Sun Dec 10 2017
console.log(now.toTimeString()); // 12:49:31 GMT+0900 (KST)
console.log(now.toISOString()); // 2017-12-10T03:49:31.145Z
console.log(now.toUTCString()); // Sun, 10 Dec 2017 03:49:31 GMT
```

## 32. symbol

- 심볼(symbol) 데이터 형은 원시 데이터 형(primitive data type)의 일종입니다.
- Symbol() 함수는 심볼(symbol) 형식의 값을 반환하는데, 이 심볼은 내장 객체(built-in objects)의 여러 멤버를 가리키는 정적 프로퍼티와 전역 심볼 레지스트리(global symbol registry)를 가리키는 정적 메서드를 가지며, "new Symbol()" 문법을 지원하지 않아 생성자 측면에서는 불완전한 내장 객체 클래스(built-in object class)와 유사합니다.
- Symbol()로부터 반환되는 모든 심볼 값은 고유합니다. 심볼 값은 객체 프로퍼티(object properties)에 대한 식별자로 사용될 수 있습니다. 이것이 심볼 데이터 형식의 유일한 목적입니다.

```javascript
// 해당 코드는 매 번 새로운 심볼을 생성합니다:
var sym1 = Symbol();
var sym2 = Symbol('foo');
var sym3 = Symbol('foo');

Symbol('foo') === Symbol('foo'); // false

// 꼭 심볼 래퍼 객체를 생성하고 싶다면, Object() 함수를 이용할 수 있습니다.
var sym = Symbol('foo');
typeof sym; // "symbol"
var symObj = Object(sym);
typeof symObj; // "object"
```

```javascript
var sym = new Symbol(); // TypeError
```

- 이는 작성자가 새로운 심볼 값 대신 명시적으로 심볼 래퍼 객체(Symbol wrapper object)를 생성할 수 없게 합니다. 일반적으로 원시 데이터 형에 대한 명시적인 래퍼 객체 생성(예를 들어, new Boolean, new String 또는 new Number와 같은)이 가능하다는 점에 비춰보면 의외일 수 있습니다.

## 33. Map

- Map으로 생성된 객체는, 일반적인 객체와 비교했을 때 아래와 같은 차이점을 갖습니다.
  - 객체는 속성 접근자(property accessor) 문법을 통해서, Map은 메소드를 통해서 내부의 데이터를 조작합니다.
  - 문자열과 심볼만이 객체의 속성 키가 될 수 있는 반면, 어떤 값이라도 Map 객체의 키로 사용될 수 있습니다.
  - 객체의 속성을 확인할 때는 프로토타입 체인을 확인하는 과정에 필요하지만, Map 객체 안에 들어있는 데이터는 프로토타입의 영향을 받지 않습니다.
  - Map 객체의 size 속성을 통해 내부에 들어있는 데이터의 개수를 쉽게 알 수 있습니다.
- Map 객체는 데이터의 추가/삭제가 빈번하게 일어나는 경우 일반적인 객체보다 훨씬 빠르게 동작한다는 장점이 있는 반면, JSON 등으로 직렬화 하기 어렵다는 특징이 있습니다. 키-값 쌍 형태의 데이터를 다루면서 속도가 중요한 경우에는 Map의 사용을 고려해보세요.

## 34. Set

- 배열과 유사한 형태의 자료구조가 필요하지만 순서가 중요하지 않은 경우, 그리고 중복된 데이터의 저장을 허용하지 않아야 할 경우, Set의 사용을 고려해보세요.

## 35. Generator 함수

```javascript
// generator 함수 선언하기
function* gen1() {
	// ...
}

// 표현식으로 사용하기
const gen2 = function*() {
	// ...
};

// 메소드 문법으로 사용하기
const obj = {
	*gen3() {
		// ...
	},
};
```

- Generator 함수 안에서는 yield라는 특별한 키워드를 사용할 수 있습니다. Generator 함수 안에서 yield 키워드는 return과 유사한 역할을 하며, iterable의 기능을 사용할 때 yield 키워드 뒤에 있는 값들을 순서대로 넘겨줍니다.
- yield\* 표현식을 사용하면, 다른 generator 함수에서 넘겨준 값을 대신 넘겨줄 수도 있습니다.

```javascript
function* numberGen() {
	yield 1;
	yield 2;
	yield 3;
}

function* numberGen2() {
	yield* numberGen();
	yield* numberGen();
}

// 1, 2, 3, 1, 2, 3이 순서대로 출력됩니다.
for (let n of numberGen2()) {
	console.log(n);
}
```

- Generator 함수를 사용할 때 주의할 점이 있습니다.
  - Generator 함수로부터 생성된 iterable은 한 번만 사용될 수 있습니다.
  - Generator 함수 내부에서 정의된 일반 함수에서는 yield 키워드를 사용할 수 없습니다.

## 36. Iterator Protocol

- iterable 객체는 iterable protocol을 만족합니다. 즉, Symbol.iterator 속성에 특별한 형태의 함수가 저장되어 있습니다.
- Iterable protocol을 만족하려면, Symbol.iterator 속성에 저장되어 있는 함수는 iterator 객체를 반환해야 합니다.
- Iterator 객체는 아래의 특별한 조건을 만족하는 객체입니다.
  - Iterator는 next라는 메소드를 갖습니다.
  - next 메소드는 다음 두 속성을 갖는 객체를 반환해야 합니다. done : 반복이 모두 끝났는지를 나타냅니다. value : 현재 순서의 값을 나타냅니다.

```javascript
// 문자열은 iterable이므로 이로부터 iterator를 생성할 수 있습니다.
const strIterator = 'go'[Symbol.iterator]();
strIterator.next(); // { value: 'g', done: false }
strIterator.next(); // { value: 'o', done: false }
strIterator.next(); // { value: undefined, done: true }
strIterator.next(); // { value: undefined, done: true }
```

## 37. Generator와 Iterator

- generator 함수로부터 만들어진 객체는 iterable protocol과 iterator protocol을 동시에 만족합니다.
- generator 함수 안에서 return 키워드를 사용하면 반복이 바로 끝나면서 next 메소드에서 반환되는 객체의 속성에 앞의 반환값이 저장됩니다. 다만, return을 통해 반환된 값이 반복 절차에 포함되지는 않습니다.
- generator 함수로부터 생성된 객체의 next 메소드에 인수를 주어서 호출하면, generator 함수가 멈췄던 부분의 yield 표현식의 결과값은 앞에서 받은 인수가 됩니다.

## 38. class

```javascript
class Person {
	// 이전에서 사용하던 생성자 함수는 클래스 안에 `constructor`라는 이름으로 정의합니다.
	constructor({ name, age }) {
		this.name = name;
		this.age = age;
	}

	// 객체에서 메소드를 정의할 때 사용하던 문법을 그대로 사용하면, 메소드가 자동으로 `Person.prototype`에 저장됩니다.
	introduce() {
		return `안녕하세요, 제 이름은 ${this.name}입니다.`;
	}
}

const person = new Person({ name: '이윤희', age: 19 });
console.log(person.introduce()); // 안녕하세요, 제 이름은 이윤희입니다.
console.log(typeof Person); // function
console.log(typeof Person.prototype.constructor); // function
console.log(typeof Person.prototype.introduce); // function
console.log(person instanceof Person); // true
```

- 클래스는 함수로 호출될 수 없습니다.
- 클래스 선언은 let과 const처럼 블록 스코프에 선언되며, 호이스팅(hoisting)이 일어나지 않습니다.
- 클래스의 메소드 안에서 super 키워드를 사용할 수 있습니다.
- 객체 리터럴의 문법과 마찬가지로, 임의의 표현식을 대괄호로 둘러싸서 메소드의 이름으로 사용할 수도 있습니다.
- getter 혹은 setter를 정의하고 싶을 때는 메소드 이름 앞에 get 또는 set을 붙여주면 됩니다.
- Symbol.iterator 메소드를 generator로 정의해주면, 클래스의 인스턴스를 쉽게 iterable로 만들 수 있습니다.

```javascript
class Gen {
	*[Symbol.iterator]() {
		yield 1;
		yield 2;
		yield 3;
	}
}

// 1, 2, 3이 차례대로 출력됩니다.
for (let n of new Gen()) {
	console.log(n);
}
```

- 일반적인 메소드는 클래스의 prototype 속성에 저장되는 반면, 클래스 필드는 인스턴스 객체에 저장됩니다.
- 화살표 함수의 this는 호출 형태에 관계없이 항상 인스턴스 객체를 가리키게 됩니다.
- 메소드를 값으로 다루어야 할 경우에는 일반적인 메소드 대신 화살표 함수가 사용되는 경우가 종종 있습니다. 다만, 일반적인 메소드와 달리, 클래스 필드를 통해 정의한 메소드는 인스턴스를 생성할 때마다 새로 생성되기 때문에 메모리를 더 차지하게 되므로 주의해서 사용해야 합니다.

## 38. Node

## 39. Time

```javascript
const timeoutId = setTimeout(() => {
	console.log('setTimeout이 실행된 지 2초가 지났습니다.');
}, 2000);

const intervalId = setInterval(() => {
	console.log('3초마다 출력됩니다.');
}, 3000);

clearTimeout(timeoutId);
clearInterval(intervalId);

// 실제 지연시간과 약간의 차이가 존재합니다.
// 또한 지연시간을 0으로 주었을 때는 코드가 기대한대로 동작하지 않습니다.
```

## 40. 비동기 프로그래밍

- Promise를 활용한 then
- aysc와 await
- Generater
  - generator는 함수의 재개를 프로그래머가 직접 제어할 수 있다는 장점을 갖고 있기 때문에, 일부러 비동기 함수 대신 generator를 사용하는 경우도 있습니다. React에서 비동기 프로그래밍을 하기 위해 널리 사용되는 라이브러리인 redux-saga 역시 generator를 활용하고 있습니다.

## 41. 동기식 코드에서의 예외 처리

- try...catch...finally 구문

```javascript
try {
	// code
} catch (error) {
	// try 안에서 에러 발생 시 동작
	// code
} finally {
	// catch 여부와 관계 없이 무조건 실행해야 하는 부분
}
```

## 42. 직접 에러 발행

```javascript
throw new Error('짝수가 아닙니다.');
```

### 에러 객체에 기능 추가

```javascript
class MyError extends Error {
	constructor(value, ...params) {
		super(...params);
		this.value = value;
		this.name = 'MyError';
	}
}

try {
	const even = parseInt(prompt('짝수를 입력하세요'));
	if (even % 2 !== 0) {
		throw new MyError(even, '짝수가 아닙니다.');
	}
} catch (e) {
	if (e instanceof MyError) {
		console.log(e.value);
	}
}
```

## 42. 비동기식 코드에서의 예외 처리

- 비동기식으로 작동하는 콜백의 내부에서 발생한 에러는, 콜백 바깥에 있는 try 블록으로는 잡아낼 수 없습니다. 따라서, try 블록을 비동기 콜백 내부에 작성해주어야 합니다.
- Promise 객체는 세 가지 상태를 가질 수 있습니다.
  - pending : Promise 객체에 결과값이 채워지지 않은 상태
  - fulfilled : Promise 객체에 결과값이 채워진 상태
  - rejected : Promise 객체에 결과값을 채우려고 시도하다가 에러가 난 상태

### 방법 1

```javascript
const p = new Promise(resolve => {
	const even = parseInt(prompt('짝수를 입력하세요'));
	if (even % 2 !== 0) {
		throw new Error('짝수가 아닙니다.');
	} else {
		resolve(even);
	}
});

p.then(
	even => {
		return '짝수입니다.';
	},
	e => {
		return e.message;
	}
).then(alert);
```

## 방법 2

```javascript
p.then(even => {
	return '짝수입니다.';
})
	.catch(e => {
		return e.message;
	})
	.then(alert);
```

## 43. 모듈

```javascript
<script type="module" src="index.mjs"></script>
```

- import 구문에서 이름을 적어주는 부분에 중괄호를 생략하면, 모듈의 default export를 가져옵니다.
- export 혹은 import 하는 이름의 뒤에 as를 붙여서, 다른 이름이 대신 사용되게 할 수 있습니다.

## 참고

- [JavaScript로 만나는 세상](https://helloworldjavascript.net)
