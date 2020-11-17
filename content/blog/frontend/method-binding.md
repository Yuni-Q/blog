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
- readonly를 붙여서 오염을 방지할 수 있지만, protected와 같은 속성을 통해 상속하여 사용하기 힘들다.

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

@decorater를
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
