---
title: method binding
date: 2020-11-17 17:11:91
category: frontend
tags: []
draft: false
---

## Method binding 방법

### case 0

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

- this가 제대로 bind 되지 않아서 method1 안에서 this를 사용할 수 없습니다.
- map 같은 함수를 써서 parameter를 넘길 경우 사용하기에 모호해집니다.

### case 1

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

- 화살표 함수는 자신의 this가 없습니다. 대신 화살표 함수를 둘러싸는 렉시컬 범위(lexical scope)의 this가 사용됩니다. 이로 인해 this를 사용할 수 있습니다.
- handler 함수 기능을 추가할 경우 함수호출`()`을 누락할 여지가 적습니다.
- map 같은 함수를 써서 parameter를 넘길 경우 사용하기 쉽습니다.
- render 시 마다 함수를 만들어서 element라면 괜찮지만 Component에게 함수를 넘길 경우 성능 이슈가 발생할 수 있습니다.

### case 2

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

- bind를 빼먹을 수 있습니다.
- handler 함수 기능을 추가할 경우 함수호출`()`을 누락할 여지가 있습니다.
- map 같은 함수를 써서 parameter를 넘길 경우 사용하기에 모호해집니다.

#### map 같은 함수를 써서 parameter를 넘길 경우

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
    return users.map((user) => {
      return (
        <button onClick={() => this.method2(user.name)}>{user.name}</button>
      );
    });
  }
}
```

### case 3

```jsx
import react from 'React';

class Component extends React.Component {
  constructor() {
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

- constructor에서 호출하면 관심사가 멀어져서 관리하기 용이하지 않습니다.
- map 같은 함수를 써서 parameter를 넘길 경우 사용하기에 모호해집니다.

### case 4

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

- method3은 typescript 컨벤션에서 값이지 메소드가 아닙니다.
- readonly를 붙여서 오염을 방지할 수 있지만, protected와 같은 접근제어자를 통해 상속 super 같은 것을 사용할 수 없습니다.
- 상속 개념을 쓰지 않는다면 좋은 방법으로 보입니다.
- map 같은 함수를 써서 parameter를 넘길 경우 사용하기에 모호해집니다.

### case 5

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
- method에 decorater를 붙여 bind(this)를 합니다.
- @decorater를 빼먹을 염려가 있습니다.
- decorator 스펙이 proposal2에 머물러 있습니다.
- mobx v6에서 decorator 스펙을 제외했습니다.

### case 6

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
- class에 decorater를 붙여 모든 메소드에 decorater를 붙입니다.
- @decorater를 빼먹을 염려가 있습니다.
- decorator 스펙이 proposal2에 머물러 있습니다.
- mobx v6에서 decorator 스펙을 제외했습니다.

### case 7

- React.Component를 wrapping해서 모든 ClassComponent가 상속 받게 한 후 wrapping한 클래스에 decorater를 붙여 모든 메소드에 decorater를 붙입니다.
- 성능 이슈가 발생할 수 있습니다.

## 번외

```javascript
class A {
  val = 1;
  method1() {
    console.log(this.val, '사용가능');
  }
}

A.prototype.method2 = function () {
  console.log(this.val, '사용불가능');
};

A.method1(); // Uncaught TypeError: a.method1 is not a function
const B = new A();
B.method1();
A.prototype.method2();
```

## 개인적인 견해

- 선호의 변경 : case4 -> case1 -> case6 -> case4 -> case1
- arrow function을 선호했으나 상속구조를 사용하기 위해서 case1을 선호하게 되었습니다.

### case3

1. this의 binding 해야 하는 수고로움을 덜 수 있습니다.
2. 상속을 해야하거나 접근 제어자(protected, private)가 필요할 때 method를 사용하여 역할을 좀 더 명확히 구분 하는 용도로 사용할 수 있을 것 같습니다.

- readonly를 쓰면 좋겠지만, 덮어쓰는게 실수일거 같아서 굳이 필요할지는 잘 모르겠습니다...

3. 다른 코드에 영향이 적었으면 좋겠습니다(빠드릴수 있는 사항은 최대한 없애는 것). method에 데코레이터를 쓴다면 baseComponent에서 하고 싶지만(새로운 컴포넌트 생성 시에는 고려하지 않아도 되게끔) 성능저하가 우려됩니다

- constructor에서 bind한다거나
- 다른 함수를 통해 변화가 일어난다는 등의 일
- 하나의 디자인 패턴을 억지로 고수하는 일

4. arrow function을 통해 this의 bind 문제를 피하는 것이 새롭지 않다고 생각됩니다(class component에서 흔히 사용되는 패턴이라 학습 곡선이 낮을 것으로 추정됩니다. 또한 리액트 뿐만 JS 자체의 문법이라고 생각하기 때문에 받아 들이는데에 있어 거부감이 적을거 같습니다)
5. 함수의 생성을 return 안에서 분리하기를 희망합니다(약간 논지에서 벗어난 부분입니다)

- return 문 안에서 함수를 생성하지 않았으면 합니다.
- 관심사(?)를 분리하자(이것과 관련해서는 분리할수 잇는것은 모두 분리했으면 좋겟지만... 불가능할거 같긴 합니다...)

6. 스펙적인 부분에서 선호됩니다.

- 데코레이터를 선호하지 않는 이유는 proposal2에 머물러 있습니다.
  - mobx v6에서는 데코레이터를 지원하는 않습니다.

7. 모든 함수를 arrow function으로 할 것인가?

- this의 유무가 아닌 상속에 유무에 따라서 하고 싶습니다. -> arrow로 했다가 상속이 필요해서 method로 바꾸는 방식은 하위를 위해 상위를 고치는 행위로 위험할 수 있습니다.

### case1

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

- 위의 방식으로 해결해 보려고 했으나 상속 받은 method1의 this.state는 undefined를 리턴할 뿐입니다.

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
    a: 1,
    b: 2,
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
    a: 1,
    b: 2,
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
    a: 1,
    b: 2,
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
    a: 1,
    b: 2,
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

- 위와 같이 A에 state 값을 넣어주면 정상 동작합니다...
- arrow function으로 선언한 문제인거 같았으나 method로 선언해도 같습니다...
- this.state가 있기 때문에 더 이상 위로 갈 필요가 없기 때문에 발생하는 문제인거 같습니다... 당연히 a,b가 있는게 맞는거 같습니다... typescript에서는 interface로 필요 state를 정의할 수 있습니다.
- arrow로 쓰나 method로 쓰나 같다고 한다면 method로 통일하는 것이 좋을 거 같습니다.
- element 핸드러에 함수를 축약형 arrow로 지정하고 그 함수를 메소드로 빼 낸다면 문제는 해결 될 거 같습니다.
- method binding도 arrow function도 this의 bind 문제를 해결하기 때문에 이를 해결하기 위해서는 arrow function이 가장 적합해 보입니다.
- 클래스 컴포넌트인만큼 모든 함수를 메소드 형태로 쓰고 return 안의 handler의 경우에만 arrow function을 사용하는 것을 추구하고 있습니다.

### case5

```tsx
class some {
  private proc(value: any, value2: any) {
    // 실제 로직
  }
  // 1
  public open(error?: any, value?: any, value2?: any) {
    // 실제 로직
  }
  // 5
  @decorator
  public decorated(error, value, value2) {
    if (error) return Dialog.alert(error);
    this.open(value, value2);
  }
  // 3
  public handleSomeComplete = (error, value, value2) => {
    if (error) return Dialog.alert(error);
    this.proc(value!, value2!);
  };
  public handleSomeComplete = (value, value2) => this.proc(value!, value2!);
  render() {
    return (
      <SomeOtherComponent
        onComplete={(error, value, value2) => this.open(error, value, value2)}
      />
    );
    return (
      <SomeOtherComponent
        onComplete={(error, value, value2) => {
          if (error) return Dialog.alert(error);
          this.open(value, value2);
        }}
      />
    );
    return <SomeOtherComponent onComplete={this.decorated} />;
    return <SomeOtherComponent onComplete={this.handleSomeComplete} />;
    // 1
    return <button onClick={() => this.open()}></button>;
    // 3 5
    return <button onClick={this.method}></button>;
  }
}
```

- 데코레이터는 this.bind만 해줍니다.
- 아래의 경우를 해결하기 위해서는 decorator가 가장 적합해 보입니다.
  - 함수를 넘겨야하는 경우 어떻게 할 것인가...?
  - 하위의 컴포넌트가 특정 상위의 컴포넌트를 forceUpdate 해야한다면??
  - 컴포넌트에 함수를 arrow로 만들어서 넘길 경우 성능 이슈가 생길 수 있습니다.

### case3

- 데코레이터가 하는 일이 this.bind만 하는 것이라면 arrow function이 하는 일과 일치합니다. 그런데 데코레이터를 써야하는 이유를 모르겠습니다. 데코레이터를 붙여야 하는 함수에 arrow function을 쓴다면 어떠한 차이가 있는지 알 수 없습니다.

### case5

- 상속 받는 곳에서 super를 사용할 수 없습니다...

## [Class에서 arrow function을 사용하지 말아야하는 이유](https://simsimjae.medium.com/class%EC%97%90%EC%84%9C-arrow-function%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80-%EB%A7%90%EC%95%84%EC%95%BC%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-8c6ad4aa4bc4)

- [심재철](https://simsimjae.medium.com/)님 블로그 글을 참조 했습니다.

1. method override 문제
2. Prototype 문제 (Performance 저하)
3. 상속 문제

## Airbnb React/JSX Style Guide

- Airbnb 같은 경우는 Airbnb React/JSX Style Guide에서 method 부분을 보면 알 수 있듯, field function을 very bad라 할 정도로 사용하는 것을 지양하고 있습니다.
- Why? A bind call in the render path creates a brand new function on every single render. Do not use arrow functions in class fields, because it makes them challenging to test and debug, and can negatively impact performance, and because conceptually, class fields are for data, not logic.

```js
// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv.bind(this)} />;
  }
}

// very bad
class extends React.Component {
  onClickDiv = () => {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />
  }
}

// good
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />;
  }
}
```

## [Arrow Functions in Class Properties Might Not Be As Great As We Think](https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1)

## 최종 나만의 규칙

- 메서드를 작성할 때는 arrow function을 사용하지 않습니다.
  - 위 규칙을 따름에 의해 오는 this bind 문제는 render 안에 함수에서 arrow를 사용함으로써 해결합니다.
  - 위와 같은 규칙을 가지는 이유는 상속 구조를 가져가기 위해서 입니다.
- 상속해서 사용하지 못하게 하려는 경우에는 Private class fields(#)를 사용합니다.
  - 리액트 메서드를 하위에서 사용하지 못하게 할 때는 arrow function에 readonly로 사용합니다(메서드를 arrow로 작성하지 않는다는 규칙을 지킬 시 상위 클래스가 인스턴스 멤버 속성 인스턴스 멤버 함수로 정의로 정의한다는 에러가 발생합니다.)
