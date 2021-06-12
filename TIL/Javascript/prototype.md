# Prototype

## 1. 프로토타입 객체

Java, C++과 같은 클래스 기반 객체지향 프로그래밍 언어와 달리 자바스크립트는 프로토타입 기반 객체지향 프로그래밍 언어입니다.  
프로토타입 기반 객체지향 프로그래밍 언어는 클래스 없이(Class-less)도 객체를 생성할 수 있습니다.(ECMAScript 6에서 클래스가 추가되었습니다.)

Prototype 객체는 생성자 함수에 의해 생성된 각각의 객체에 공유 프로퍼티를 제공하기 위해 사용합니다.  
ECMAScript spec에서는 자바스크립트의 모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]]이라는 숨겨진 프로퍼티를 가진다 라고 되어 있습니다.( **proto**과 [[Prototype]]은 같은 개념입니다.)

객체를 생성할 때 프로토타입은 결정됩니다.  
결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있습니다.  
이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미합니다.  
이러한 특징을 활용하여 객체의 상속을 구현할 수 있습니다.

## 2. [[Prototype]] 프로퍼티 vs prototype 프로퍼티

[[Prototype]] 프로퍼티는 자신의 프로토타입 객체를 가리키는 숨겨진 프로퍼티 입니다.  
[[Prototype]] 프로퍼티는 **proto** 프로퍼티로 구현되어 있어 **proto**과 [[Prototype]]은 같은 개념 입니다.  
함수도 객체이므로 [[Prototype]] 프로퍼티를 갖는다. 그런데 함수 객체는 일반 객체와는 달리 prototype 프로퍼티도 소유하게 됩니다.

> 주의해야 할 것은 prototype 프로퍼티는 프로토타입 객체를 가리키는 [[Prototype]] 프로퍼티(**proto** 프로퍼티)와는 다르다는 것입니다.  
> prototype 프로퍼티와 [[Prototype]] 프로퍼티는 모두 프로토타입 객체를 가리키지만 관점의 차이가 있습니다.

### [[Prototype]] 프로퍼티

함수를 포함한 모든 객체가 가지고 있는 프로퍼티 입니다.  
객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체을 가리키며 함수 객체의 경우 Function.prototype를 가리킵니다.

### prototype 프로퍼티

함수 객체만 가지고 있는 프로퍼티 입니다  
함수 객체가 생성자로 사용될 때 이 함수를 통해 생성될 객체의 부모 역할을 하는 객체(프로토타입 객체)를 가리킵니다.

## 3. constructor 프로퍼티

프로토타입 객체는 constructor 프로퍼티를 가집니다.  
constructor 프로퍼티는 객체의 입장에서 자신을 생성한 객체를 가리킵니다.

```javascript
function Person(name) {
 this.name = name;
}

var foo = new Person('Lee');

// Person() 생성자 함수에 의해 생성된 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log(Person.prototype.constructor === Person);

// foo 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log(foo.constructor === Person);

// Person() 생성자 함수를 생성한 객체는 Function() 생성자 함수이다.
console.log(Person.constructor === Function);
```

## 4. Prototype chain

자바스크립트는 특정 객체의 프로퍼티나 메소드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면 [[Prototype]] 프로퍼티가 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례대로 검색합니다.  
이것을 프로토타입 체인이라고 합니다.

```javascript
var student = {
 name: 'Lee',
 score: 90,
};

// Object.prototype.hasOwnProperty()
console.log(student.hasOwnProperty('name')); // true
```

student 객체는 hasOwnProperty 메소드를 가지고 있지 않으므로 에러가 발생하여야 하나 정상적으로 결과가 출력되었습니다.  
이는 student 객체의 [[Prototype]] 프로퍼티가 가리키는 링크를 따라가서 student 객체의 부모 역할을 하는 프로토타입 객체(Object.prototype)의 메소드 hasOwnProperty를 호출하였기 때문에 가능한 것입니다.

## 4.1 객체 리터럴 방식으로 생성된 객체의 프로토타입 체인

객체 생성 방법은 3가지가 있습니다.

1. 객체 리터럴
1. 생성자 함수
1. Object() 생성자 함수

객체 리터럴 방식으로 생성된 객체는 결국 내장 함수(Built-in)인 Object() 생성자 함수로 객체를 생성하는 것을 단순화시킨 것입니다.  
자바스크립트 엔진은 객체 리터럴로 객체를 생성하는 코드를 만나면 내부적으로 Object() 생성자 함수를 사용하여 객체를 생성합니다.

> 결론적으로 객체 리터럴을 사용하여 객체를 생성한 경우, 그 객체의 프로토타입 객체는 Object.prototype 입니다.

## 4.2 생성자 함수로 생성된 객체의 프로토타입 체인

함수를 정의하는 방식은 3가지가 있습니다.

1. 함수선언식(Function declaration)
1. 함수표현식(Function expression)
1. Function() 생성자 함수
   > 즉, 3가지 함수 정의 방식은 결국 Function() 생성자 함수를 통해 함수 객체를 생성합니다.  
   > 따라서 어떠한 방식으로 함수 객체를 생성하여도 모든 함수 객체의 prototype 객체는 Function.prototype 입니다.  
   > 생성자 함수도 함수 객체이므로 생성자 함수의 prototype 객체는 Function.prototype 입니다.

| 객체 생성 방식      | 엔진의 객체 생성     | 인스턴스의 prototype 객체  |
| ------------------- | -------------------- | -------------------------- |
| 객체 리터럴         | Object() 생성자 함수 | Object.prototype           |
| Object()생성자 함수 | Object() 생성자 함수 | Object.prototype           |
| 생성자 함수         | 생성자 함수          | 생성자 함수 이름.prototype |

## 5. 프로토타입 객체의 확장

프로토타입 객체도 객체이므로 일반 객체와 같이 프로퍼티를 추가/삭제할 수 있습니다.  
그리고 이렇게 추가/삭제된 프로퍼티는 즉시 프로토타입 체인에 반영 됩니다.

## 6. 원시 타입(Primitive data type)의 확장

자바스크립트에서 원시 타입(숫자, 문자열, boolean, null, undefined)을 제외한 모든것은 객체 입니다.  
원시 타입인 문자열이 객체와 유사하게 동작 합니다.

> 원시 타입으로 프로퍼티나 메소드를 호출할 때 원시 타입과 연관된 객체로 일시적으로 변환되어 프로토타입 객체를 공유하게 됩니다.  
> 원시 타입은 객체가 아니므로 프로퍼티나 메소드를 직접 추가할 수 없습니다.  
> 하지만 String 객체의 프로토타입 객체 String.prototype에 메소드를 추가하면 원시 타입, 객체 모두 메소드를 사용할 수 있습니다.

## 7. 프로토타입 객체의 변경

객체를 생성할 때 프로토타입은 결정됩니다.  
결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있습니다.  
이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미 합니다.  
<b>이러한 특징을 활용하여 객체의 상속을 구현할 수 있습니다.</b>

프로토타입 객체 변경 시점 이전에 생성된 객체

> 기존 프로토타입 객체를 [[Prototype]] 프로퍼티에 바인딩 합니다.

프로토타입 객체 변경 시점 이후에 생성된 객체

> 변경된 프로토타입 객체를 [[Prototype]] 프로퍼티에 바인딩 합니다.

## 8. 프로토타입 체인 동작 조건

객체의 프로퍼티를 참조하는 경우, 해당 객체에 프로퍼티가 없는 경우, 프로토타입 체인이 동작 합니다.  
객체의 프로퍼티에 값을 할당하는 경우, 프로토타입 체인이 동작하지 않습니다.  
이는 객체에 해당 프로퍼티가 있는 경우, 값을 재할당하고 해당 프로퍼티가 없는 경우는 해당 객체에 프로퍼티를 동적으로 추가하기 때문 입니다.

---

이것은 매우 일반적인 JavaScript 인터뷰 질문입니다. 모든 JavaScript 객체는 다른 객체에 대한 참조인 prototype 프로퍼티를 가지고 있습니다. 객체의 프로퍼티에 접근할 때 해당 객체에 해당 프로퍼티가 없으면 JavaScript 엔진은 객체의 prototype과 prototype의 prototype등을 보고 프로퍼티가 정의될 때까지 찾고 만약 객체의 프로퍼티에 접근할 때 해당 객체에 해당 프로퍼티가 없으면 프로토타입 체인 중 하나에 있거나 프로토타입 체인의 끝에 도달할 때까지 찾습니다. 이 동작은 고전적인 상속을 흉내 내지만 실제로 상속보다 위임에 더 가깝습니다.

---

## 자바스크립트의 프로토타입 패턴

- 프로토타입 패턴으로 객체를 생성하는 방법은, 자바스크립트의 가장 자연스러운 객체 생성 패턴입니다.
- new를 사용하여 객체지향 패턴을 흉내낼 수는 있지만, `실제로 자바스크립트의 상속이나 오브젝트간의 연결은 프로토타입으로 구현됩니다`.
- 자바스크립트 고유의 native한 방법으로 객체를 생성할 수 있다는 점과 이 패턴을 사용한 코드가 많이 있기 때문에 꼭 알고 있어야 합니다.

### ECMAScript 5 이전으로 프로토타입 구현하기

```js
const vehiclePrototype = {
 init: function (carModel) {
  this.model = carModel;
 },
 getModel: function () {
  console.log(`The model of this vehicle is... ${this.model}`);
 },
};

const vehicle = (function () {
 function F() {}

 return function (proto) {
  F.prototype = proto;
  return new F();
 };
})();

const car = vehicle(vehiclePrototype);
car.init('Ford');
car.getModel();
```

### 프로토타입 패턴으로 객체 생성하기

- init 이용하기
  - init메서드는 객체의 \_\_proto\_\_속성에 있는 속성의 하나입니다. 물론 예약어이고, 이름에서 명시하듯 객체를 초기화(initialization)하는 용도로 쓰면 됩니다.

```js
var Person = {
 init: function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
 },
 fullName: function () {
  return this.firstName + '-' + this.lastName;
 },
};

var yuni = Object.create(Person); // new를 쓰지 않은, native한 방식
yuni.init('yuni', 'q'); // 따로 초기화를 해준다
console.log(yuni.fullName());
```

- 위의 예제는 객체를 생성하고 초기화 하기 위해 두번의 단계를 가집니다. 이를 한단계로 줄이고 싶으면 다음과 같이 객체의 생성과 동시에 초기화 해주어야 합니다.

```js
var Person = {
 init: function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
 },
 fullName: function () {
  return this.firstName + '-' + this.lastName;
 },
};

var yuni = Object.create(Person, {
 // 객체 생성과 동시에 초기화
 firstName: {
  value: 'yuni',
 },
 lastName: {
  value: 'q',
 },
});
console.log(yuni.fullName());
```

### 팩토리 패턴 이용

```js
var Person = {
 fullName: function () {
  return this.firstName + '-' + this.lastName;
 },
};

function PersonFactory(firstName, lastName) {
 var person = Object.create(Person);
 person.firstName = firstName;
 person.lastName = lastName;
 return person;
}

var yuni = PersonFactory('yuni', 'q');
console.log(yuni.fullName());
```

### 상속

```js
var Person = {
 fullName: function () {
  return this.firstName + '-' + this.lastName;
 },
};
var Student = Object.create(Person, {
 // Person프로토타입 상속
 init: {
  value: function (honor, firstName, lastName) {
   this.honor = honor;
   this.firstName = firstName;
   this.lastName = lastName;
  },
 },
 studentName: {
  value: function () {
   return this.honor + ' ' + this.firstName + '-' + this.lastName;
  },
 },
});
var yuni = Object.create(Student); // Student프로토타입 상속
yuni.init('Mr.', 'yuni', 'q'); // 객체 초기화
console.log(yuni.fullName()); // yuni-q
console.log(yuni.studentName()); // Mr. yuni-q
```

- 프로토타입 체인에 따라, 체인의 최하단인 yuni가 체인의 최상단인 Person의 프로토타입을 상속하게 됩니다.

---

참조 : [프로토타입](https://poiemaweb.com/js-prototype)  
참조 : [JS 질문](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Korean/questions/javascript-questions.md)
