---
title: method binding
date: 2020-11-17 17:11:91
category: frontend
tags: []
draft: true
---

## Method binding 방법

### 0

```jsx
import react from 'React';

class Component extends React.Component {
	method1() {
		console.log('method1');
	}

	render() {
		return <button onClick={this.method1}>button</button>;
	}
}
```

- this가 제대로 bind 되지 않아서 method1 안에서 this를 사용할 수 없다.

### 1

```jsx
import react from 'React';

class Component extends React.Component {
	method1() {
		console.log('method1');
	}

	render() {
		return <button onClick={() => this.method1()}>button</button>;
	}
}
```

- constructor에서 bind 해주지 않아도 된다.
- 함수 추가 시 호출`()`을 누락하여서 실수할 여지가 적다.

### 2-1

```jsx
import react from 'React';

class Component extends React.Component {
	method2() {
		console.log('method2');
	}

	render() {
		return <button onClick={this.method2.bind(this)}>button</button>;
	}
}
```

- bind를 빼먹을 수 있다.
- 함수 추가 시 호출`()`을 누락하여서 실수할 여지가 있다.
- constructor에서 호출하면 관심사가 멀어진다.
- 또한 map 같은 함수를 써서 parmameter를 넘길 경우 사용하기에 모호해진다.

### 2-2

```jsx
import react from 'React';

class Component extends React.Component {
	method2() {
		console.log('method2');
	}

	render() {
		const users = [
			{ name: 'L', age: 11 },
			{ name: 'Y', age: 21 },
			{ name: 'H', age: 31 },
		];
		return users.map(user => {
			return (
				<button onClick={() => this.method2(user.name)}>{user.name}</button>
			);
		});
	}
}
```

- 2번의 방법을 쓰기 힘들다.

### 2-3

```jsx
import react from 'React';

class Component extends React.Component {
	constuctor() {
		this.method2 = this.method2.bind(this);
	}
	method2() {
		console.log('method2');
	}

	render() {
		return <button onClick={this.method2}>method2</button>;
	}
}
```

- 사용과 정의가 멀어서 놓치기 쉽다.

### 3

```jsx
import react from 'React';

class Component extends React.Component {
	method3 = () => {
		console.log('method3');
	};

	render() {
		return <button onClick={this.method3}>button</button>;
	}
}
```

- method3는 typescript 컨벤션에서 값이지 메소드가 아니다.
- readonly를 붙여서 오염을 방지할 수 있지만, protected와 같은 접근제어자를 통해 상속하여 사용하기 힘들다.

### 4

- https://github.com/andreypopp/autobind-decorator

```jsx
import react from 'React';

class Component extends React.Component {
	@decorater
	method4() {
		console.log('method4');
	}

	render() {
		return <button onClick={this.method4}>button</button>;
	}
}
```

- https://github.com/andreypopp/autobind-decorator
  - @boundMethod
- @decorater를 빼먹을 염려가 있다.

### 5

```jsx
import react from 'React';

@decorater
class Component extends React.Component {
	method4() {
		console.log('method4');
	}

	render() {
		return <button onClick={this.method4}>button</button>;
	}
}
```

- https://github.com/andreypopp/autobind-decorator
  - @autobind
- class에 decorater를 붙여 모든 메소드에 decorater를 붙이게 한다.
- @decorater를 빼먹을 염려가 있다.
- 성능이 염려스럽다.

### 6

- React.Component를 wrapping해서 모든 ClassComponent가 상속 받게 한 후 wrapping한 클래스에 decorater를 붙여 모든 메소드에 decorater를 붙이게 한다.
- 성능이 염려스럽다.

## 번외

```javascript
class A {
	val = 1;
	method1() {
		console.log(this.val, '사용가능');
	}
}

A.prototype.method2 = function() {
	console.log(this.val, '사용불가능');
};

A.method1(); // Uncaught TypeError: a.method1 is not a function
const B = new A();
B.method1();
A.prototype.method2();
```

## 나만의 결론

- case3. arrow function을 선호합니다.

1. this의 binding 해야 하는 수고로움을 덜 수 있습니다.
2. 상속을 해야하거나 접근 제어자(protected, private)가 필요할 때 method를 사용하여 역할을 좀 더 명확히 구분 하는 용도로 사용할 수 있을 것 같습니다.
   2-1, readonly를 쓰면 좋겠지만, 덮어쓰는게 실수일거 같아서 굳이 필요할지는 잘 모르겠습니다...
3. 다른 코드에 영향이 적었으면 좋겠습니다(빠드릴수 있는 사항은 최대한 없애는 것). method에 데코레이터를 쓴다면 basecomponent에서 하고 싶지만(새로운 컴포넌트 생성 시에는 고려하지 않아도 되게끔) 성능저하가 우려됩니다
   3-1. constructor에서 bind한다거나
   3-2. 다른 함수를 통해 변화가 일어난다는 등의 일
   3-3. 하나의 디자인 패턴을 억지로 고수하는 일
4. arrow function을 통해 this의 bind 문제를 피하는 것이 새롭지 않다고 생각됩니다(class component에서 흔히 사용되는 패턴이라 학습 곡선이 낮을 것으로 추정됩니다. 또한 리액트 뿐만 JS 자체의 문법이라고 생각하기 때문에 받아 들이는데에 있어 거부감이 적을거 같습니다)
5. 함수를 return 안에서 분리하기를 희망합니다(약간 논지에서 벗어난 부분입니다)
   5-1. return 문 안에서 함수를 생성하지 않았으면 합니다.
   5-2. 관심사(?)를 분리하자(요것과 관련해서는 분리할수 잇는것은 모두 분리했으면 좋겟지만... 불가능할거 같긴 합니다...)

- 데코레이터를 선호하지 않는 이유는 proposal2에 머물러 있으며 mobx에서 사용하기에 학습곡선이 낮다는건 타당하지 못하다.
  - mobx6에서는 데코레이터를 지원하는 않는다.
- 모든 함수를 arrow function으로 할 것인가?
  - this의 유무가 아닌 상속에 유무에 따라서 하고 싶다. -> arrow로 했다가 상속이 필요해서 method로 바꾸는 방식은 하위를 위해 상위를 고치는 행위로 위험할 수 있다.

```jsx
import React from 'react';

export class App extends React.Component {
	state = {
		a: {
			b: 1,
		},
	};
	render() {
		return (
			<div>
				<Base />
				<A />
				<B />
				<C />
				<D />
			</div>
		);
	}
}

export default App;
class Base extends React.Component {
	state = {
		a: 1,
		b: 2,
		c: 3,
	};

	method1 = () => {
		console.log('Base.metho1', this.state.a);
		this.method2();
	};

	method2() {
		console.log('Base.metho2', this.state.b);
	}

	render() {
		return <div onClick={this.method1}>Base</div>;
	}
}

class A extends Base {
	state = {
		d: 4,
		e: 5,
	};
	method2() {
		super.method2();
		console.log('A.metho2', this.state.d);
	}

	render() {
		return <div onClick={this.method1}>A</div>;
	}
}

class B extends Base {
	state = {
		f: 6,
		g: 7,
	};

	method2() {
		console.log('B.metho2', this.state.f);
	}

	render() {
		return <div onClick={this.method1}>B</div>;
	}
}

class C extends Base {
	state = {
		h: 8,
		i: 9,
	};

	method1 = () => {
		console.log('C.method1', this.state.h);
	};

	render() {
		return <div onClick={this.method1}>C</div>;
	}
}

class D extends Base {
	state = {
		j: 10,
		k: 11,
	};

	method2 = () => {
		console.log('D.method1', this.state.j);
	};

	render() {
		return <div onClick={this.method1}>D</div>;
	}
}
```

- 위의 방식으로 해결해 보려고 했으나 상속 받은 method1의 this.state는 undefined를 리턴할 뿐이였다.

```jsx
class A extends Base {
	state = {
		a: 98,
		b: 99,
		d: 4,
		e: 5,
	};
	method2() {
		super.method2();
		console.log('A.metho2', this.state.d);
	}

	render() {
		return <div onClick={this.method1}>A</div>;
	}
}
```

- 위와 같이 A에 state 값을 넣어주면 정상 동작합니다...
- arrow function으로 선언한 문제인거 같았으나 method로 선언해도 같습니다...
- this.state가 있기 때문에 더 이상 위로 갈 필요가 없기 때문에 발생하는 문제인거 같습니다...
