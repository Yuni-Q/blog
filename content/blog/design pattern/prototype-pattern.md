---
title: prototype pattern
date: 2021-04-04 16:04:10
category: design pattern
tags: []
draft: true
---

## Prototype는 `원형` 이라는 의미로, 원형이 되는 인스턴스로 새로운 인스턴스를 만드는 방식 입니다.

- 원형이 되는 인스턴스를 사용하여 생성할 객체의 종류를 명시하고, 이렇게 만든 견본을 `복사`해서 새로운 객체를 생성합니다.
- 프로토타입 패턴은 오리지날 객체를 새로운 객체에 복사하여 우리의 필요에 따라 수정하는 메커니즘을 제공합니다.

## 프로토타입 패턴은 생성 패턴(Creational Pattern)입니다.

- 프로토타입 패턴은 객체를 생성하는 데 `비용`(시간과 자원)이 많이 들고, `비슷한 객체가 이미 있는 경우`에 사용되는 생성 패턴입니다.
- `객체에 의해 생성될 객체의 타입이 결정`되는 생성 디자인 패턴입니다.

### 생성패턴이란?

- 생성 패턴은 인스턴스를 만드는 절차를 `추상화`하는 패턴입니다.
- 생성 패턴에 속하는 패턴들은 객체를 `생성, 합성하는 방법이나 객체의 표현 방법`을 `시스템과 분리`해줍니다.
- 생성 패턴은 시스템이 상속(inheritance) 보다 복합(composite) 방법을 사용하는 방향으로 진화되어 가면서 더 중요해지고 있습니다.

### 생성 패턴에서는 중요한 이슈가 두 가지 있습니다.

1. 생성 패턴은 시스템이 어떤 Concrete Class를 사용하는지에 대한 정보를 `캡슐화`합니다.
2. 생성 패턴은 이들 클래스의 인스턴스들이 어떻게 만들고 어떻게 결합하는지에 대한 부분을 완전히 가려줍니다.

> 생성 패턴을 이용하면 무엇이 생성되고, 누가 이것을 생성하며, 이것이 어떻게 생성되는지, 언제 생성할 것인지 결정하는 데 유연성을 확보할 수 있게 됩니다.

## 우선 Prototype 패턴을 사용하는 이유에 대해 알아보겠습니다.

1. 종류가 너무 많아서 클래스로 정리할 수 없는 경우
2. 클래스로부터 인스턴스 생성이 어려운 경우
3. Framework와 생성하는 인스턴스를 분리하고 싶은 경우

## 이제 프로토타입에 대해 상세히 알아보겠습니다.

- 생성할 객체들의 타입이 프로토타입인 인스턴스로부터 결정되도록 하며, 인스턴스는 새 객체를 만들기 위해 자신을 복제(clone)하게 됩니다.
- 일반화 관계로 표현을 할 때 파생클래스의 개수가 과도히 많아지고 각 클래스의 메서드가 수행하는 알고리즘에서 차이가 없고 생성 시에 개체의 속성에 차이만 있다면 원형 패턴을 사용하는 것이 효과적입니다.
- 프로토타입 패턴은 새로운 객체는 일반적인 방법(예를 들어, new를 사용해서라든지)으로 객체를 생성(create)하는 고유의 비용이 주어진 응용 프로그램 상황에 있어서 불가피하게 매우 클 때, 이 비용을 감내하지 않을 수 있게 해줍니다.
- 패턴을 구현하려면, 우선 `clone() 메소드를 선언하는 추상 베이스 클래스`를 하나 만듭니다. 다형적 생성자(polymorphic constructor) 기능이 필요한 클래스가 있다면, 그것을 앞에서 만든 클래스를 상속받게 한 후, clone() 메소드 내의 코드를 구현합니다.
- 프로토타입 패턴은, 추상 팩토리 패턴과는 반대로, 클라이언트 응용 프로그램 코드 내에서 객체 창조자(creator)를 `서브클래스(subclass)하는 것을 피할 수 있게 해줍니다`.
  - 프로토타입은 서브클래싱을 필요로 하지 않습니다. 하지만 `초기화` 동작을 필요로 합니다. 팩토리 메서드 패턴은 서브클래싱을 필요로 하나, 초기화 동작은 필요로 하지 않습니다.
- 팩토리 메서드를 보면 Creator 클래스의 계통이 처리할 제품 관련 클래스의 계통과 병렬로 복합되는 것을 알 수 있습니다. 원형 패턴에서는 팩토리 메서드에 새로원 객체를 만들어 달라고 요청하는 것이 아니라 원형을 복제하는 것으로, Creator 클래스에 따른 새로운 상속 계층이 필요 없습니다.
- 프로토타입 패턴과 추상 팩토리 패턴 중 어느 하나가 적용될 수 있는 경우가 있습니다. 추상 팩토리 패턴이 프로토타입들의 집합을 갖고있다가, 클론(clone)한 뒤 프로덕트(product) 객체를 반환할 수도 있습니다.
- 원칙은 `런타임`에 또 다른 객체를 생성한다는 것이다. 런타임 시점에 가서 클로닝(cloning)을 하는 객체의 `실제 복사본`이 만들어지는 것입니다. 실제 복사본이라는 말은 새로 생성되는 객체가 클로닝(cloning) 당하는 객체의 애트리뷰트와 똑같은 애트리뷰트를 가진다는 것을 의미합니다. 반면에, `new`를 이용해 객체를 생성했다면, 새로이 생성된 객체의 애트리뷰트들은 초기값을 가집니다.
- 고도로 `동적화 된 시스템`에서는 `새로운 클래스를 생성할 필요 없이` `객체 합성`으로 `새로운 행동을 정의`할 수 있습니다. 객체의 변수가 다른 클래스에 대한 참조자를 정의하고 있다면, 이 참조자가 합성한 새로운 클래스를 정의하고, 그 클래스에 인스턴스에 대한 참조자만을 넘겨주면, 새로운 행동이 정의되는 것처럼 보인다는 것입니다.
  - 구조를 다양화 함으로써 새로운 객체를 명세할 수 있습니다.
- 많은 응용프로그램은 구성요소와 부분 구성요소의 복합을 통해 객체를 구축합니다. 예를 들어, 회로설계를 위한 편집기는 세부 회로를 모아서 큰 회로를 만듭니다. 이런 응용프로그램에서는 편의를 위한 복잡한 사용자 정의 구조를 사용자가 인스턴스화 하여 그 상황에 맞는 세부 회로를 계속 이용할 수 있도록 배려해 줄 때가 많습니다. 복합 회로 객체가 Clone() 연산을 구현함으로써 다른 구조를 갖는 회로의 기본 골격을 만듭니다.

## 프로토타입의 장점에 대해 정리해보겠습니다.

- 객체의 생성이 값비싼 경우(DB를 참조하는 등) 객체 생성의 비용을 줄일 수 있습니다.
- 객체를 생성해 주기 위한 별도의 객체 생성 클래스가 불필요하다.
  - 서브클래스의 수를 줄일수 있습니다.
- 객체의 각 부분을 조합해서 생성되는 형태에도 적용 가능합니다.
- 프로토타입 패턴의 좋은 점은 프로토타입의 클래스뿐만 아니라 상태도 같이 복제한다는 점입니다.
- 프로토타입 패턴을 이용하면 사용자에게 원형으로 생성되는 인스턴스를 등록하는 것만으로도 시스템에 새로운 제품 클래스를 추가할 수 있게 됩니다. run-time에 새로운 프로토타입을 넣고 빼기가 쉽다는 점에서 다른 생성 패턴에 비해 `유연성`을 지니고 있습니다.
  - 값을 다양화 함으로써 새로운 객체를 명세할 수 있다.
  - run-time에 새로운 제품을 추가하고 삭제할 수 있습니다.

## 단점

- 생성될 객체들의 자료형인 클래스들이 모두 clone() 메서드를 구현해야 합니다.

## Prototype의 구성요소

### Prototype의 역할

- 인스턴스를 복사하여 새로운 인스턴스를 만들기 위한 인터페이스를 정의합니다.

### ConcretePrototype

- 인스턴스를 복사해서 새로운 인스턴스를 만드는 인터페이스를 실제로 구현합니다.

### Client

- 인스턴스 복사 메소드를 사용해서 새로운 인스턴스를 만듭니다.

### Code

```js
class CustomerPrototype {
  constructor(proto) {
    this.proto = proto;
  }

  clone() {
    const customer = new Customer();

    customer.first = this.proto.first;
    customer.last = this.proto.last;
    customer.status = this.proto.status;

    return customer;
  }
}

class Customer {
  constructor(first, last, status) {
    this.first = first;
    this.last = last;
    this.status = status;
  }

  say() {
    console.log(
      'name: ' + this.first + '-' + this.last + ', status: ' + this.status,
    );
  }
}

const proto = new Customer('yuni', 'q', 'ready');
const prototype = new CustomerPrototype(proto);

const customer = prototype.clone();
customer.say();
```

## 자바스크립트의 프로토타입 패턴

- 프로토타입 패턴으로 객체를 생성하는 방법은, 자바스크립트의 가장 자연스러운 객체 생성 패턴입니다.
- new를 사용하여 객체지향 패턴을 흉내낼 수는 있지만, `실제로 자바스크립트의 상속이나 오브젝트간의 연결은 프로토타입으로 구현됩니다`.
- 자바스크립트 고유의 native한 방법으로 객체를 생성할 수 있다는 점과 이 패턴을 사용한 코드가 많이 있기 때문에 꼭 알고 있어야 합니다.

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

## 관련 패턴

- Flyweight 패턴 : 프로토타입과 다르게 `하나의 인스턴스를 복수의 장소에서 공유`해서 이용합니다.
- Memento 패턴 : 스냅샷과 undo를 실행하기 위해 인스턴스의 상태를 저장합니다.
- Composite 및 Decorator 패턴 : 둘을 사용하면 복잡한 구조의 인스턴스가 동적으로 만들어지는 경우가 있는데, 이와 같은 경우 프로토 타입 패턴을 사용하면 편리합니다.
- Command 패턴 : 해당 패턴의 명령을 복제하고 싶은 경우 프로토타입 패턴을 사용합니다.
- 추상 팩토리 패턴, 빌더 패턴, 프로토타입 패턴은 각 구현에 있어서 싱글턴 패턴을 활용할 수 있습니다.
  - 추상 팩토리 클래스는 종종 팩토리 메소드와 함께 구현하거나, 프로토타입을 이용해서 구현되기도 합니다.
- 보통 설계는 처음에는 팩토리 메소드로 출발합니다. 다음에 설계자의 재량에 따라 추상 팩토리 패턴, 빌더 패턴, 프로토타입 패턴으로 바뀔 수 있습니다.

---

## 참고

- [프로토타입 패턴](https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%ED%8C%A8%ED%84%B4)
- [\[생성 패턴\] 프로토타입 패턴(Prototype Pattern) 이해 및 예제](https://readystory.tistory.com/122)
- [\[디자인패턴/Design Patter\] Prototype 패턴 프로토타입 패턴](https://lee1535.tistory.com/76)
- [소년코딩](https://boycoding.tistory.com/108)
- [메모장](https://leetaehoon.tistory.com/55)
- [오르카의 아틀리에](https://orcacode.tistory.com/entry/프로토타입-패턴-Prototype-Pattern-복사하여-인스턴스-만들기)
- [덕's IT Story](https://itstory.tk/entry/꼭-알아야하는-Javascript-디자인-패턴-4가지)
- [자바스크립트 프로토타입(prototype) 패턴](https://zzossig.io/posts/javascript/what_is_the_prototype_oo_pattern/)
