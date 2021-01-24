---
title: Facade
date: 2021-01-23 21:01:94
category: develop
tags: []
draft: true
marp: true
---

# 복잡한 과장을 간단하게 표현하는 퍼사드 패턴

---

## 디자인 패턴

- `만약 이 클래스가 바뀐다면 얼마나 많은 코드를 고쳐야 하는가?`와 같은 확장성(Extensibility) 문제는 많은 디자인 패턴들이 해결하고자 하는 문제 중 하나입니다.

---

## 구조에 대한 패턴

- 구조 패턴이란 작은 클래스들을 상속과 합성을 이용하여 더 큰 클래스를 생성하는 방법을 제공하는 패턴입니다.
- 서로 독립적으로 개발한 클래스 라이브러리를 마치 하나인 것처럼 사용할 수 있습니다.
- 여러 인터페이스를 합성(Composite)하여 서로 다른 인터페이스들의 통일된 추상을 제공합니다.
- 구조 패턴의 중요한 포인트는 인터페이스나 구현을 복합하는 것이 아니라 객체를 합성하는 방법을 제공한다는 것입니다. 이는 컴파일 단계에서가 아닌 [런타임 단계]()에서 복합 방법이나 대상을 변경할 수 있다는 점에서 유연성을 가집니다.

---

## 퍼사드

- 프랑스어로 외관(건물의 정면)이라는 뜻입니다.
- 건물의 외벽에서 보면 안의 구조는 보이지 않는다는 특징으로 이름 지어진거 같습니다.
- 키워드 : [단순한 접근](), [분리]()

---

## 퍼사드 패턴

- 클라이언트가 필요로 하는 단순화 된 메소드를 제공하고 기존 시스템 클래스 메소드에 대한 호출을 위임하는 단일 클래스입니다.
- 퍼사드는 클래스 라이브러리 같은 어떤 소프트웨어의 다른 커다란 코드 부분에 대한 간략화된 [인터페이스를 제공하는 객체]()입니다.
- 퍼사드는 좋게 작성되지 않은 API의 집합을 [하나]()의 좋게 작성된 API로 감싸줍니다.

---

## 인터페이스를 제공하는 객체

- 한 서브시스템 내의 인터페이스 집합에 대한 획일화된 하나의 인터페이스를 제공하는 패턴으로, 서브시스템을 사용하기 쉽도록 상위 수준의 인터페이스를 정의합니다.
- 개발자들에게 복잡해진 각각의 클래스들을 다 이해하면서 서브시스템을 사용하기란 어려운 일입니다. 이럴 때 퍼사드 패턴은 서브시스템에 대한 단순하면서도 기본적인 인터페이스를 제공함으로써 대부분의 개발자들에게 적합한 클래스 형태를 제공합니다.

---

## 장점

- 퍼사드는 소프트웨어 라이브러리를 쉽게 이해하고 사용 할 수 있게 해줍니다.
- 퍼사드는 라이브러리를 사용하는 코드들을 읽기 쉽게 해줍니다.

---

## 시스템과 시스템 간 의존관계 완화

- 퍼사드는 인터페이스를 단순화 시킬 뿐 아니라 클라이언트와 구성요소들로 이루어진 서브시스템을 분리시키는 역할도 합니다.
- 단순한 형태로 통합하여 제공하고 나머지 부분은 내부적으로 처리함으로써 사용자와 서브시스템 사이의 호출 횟수가 감소하게 되는 효과가 있습니다.
- 퍼사드는 라이브러리 바깥쪽의 코드가 라이브러리의 안쪽 코드에 의존하는 일을 감소 시켜줍니다.
  - 의존성이 낮아지고 유연성이 향상되어 관리가 용이해집니다.
  - 간단한 인터페이스를 제공함으로써 [최소 지식 원칙]()을 준수하는데 도움을 줍니다.

---

## 최소 지식 원칙(Priciple of Least Knowledge)

- 데메테르의 원칙(Law of Demeter)
- 정말 친한 친구하고만 이야기 합니다.
  - 정말 관련있는 객체와만 관계를 맺습니다.
- 이 원칙을 잘 따르면 객체들 사이의 의존성을 줄일 수 있고, 소프트웨어 관리가 더 용이해질 수도 있습니다.
- 하지만 이 원칙을 적용하다 보면 다른 구성요소에 대한 메소드 호출을 처리하기 위해 '래퍼' 클래스를 더 만들어야 할 수도 있습니다. 그러다 보면 시스템이 더 복잡해지고, 개발 시간도 늘어나고, 성능이 떨어질 수도 있습니다.
- 아래의 종류의 메소드만을 호출하면 이 원칙을 지킬 수 있습니다.
  - 객체자체
  - 메소드에 매개변수로 전달된 객체
  - 그 메소드에서 생성하거나 인스턴스를 만든 객체
  - 그 객체에 속하는 구성요소

---

## 퍼사드(facade) 패턴을 통하여 분할 된 소프트웨어의 유지보수 용이성

- 서브시스템 내부 설계의 변경이 다른 서브시스템에 독립적으로 자유롭게 될 수 있습니다.

---

## 사용처와 주의점

- 퍼사드 패턴은 특정 기능에 대해 인터페이스의 수가 확장되고, 시스템이 복잡해질 수 있는 상황에서 사용하기 적합합니다.
- 퍼사드 패턴은 비슷한 작업을 해야하는 다양한 인터페이스들 중 하나의 인터페이스를 클라이언트에 제공해야 할 때 적용하는 것이 좋습니다.
- 퍼사드 패턴은 클라이언트 어플리케이션의 헬퍼 역할을 하는 것이지, 서브시스템 인터페이스를 숨기는 것은 아닙니다.
- 팩토리 패턴과 종종 함께 사용됩니다.
- 다른 메소드를 호출하기 위한 래퍼클래스를 만들어야 하는 등의 단점도 생길 수 있습니다.

---

```javascript
class User {
	constructor(name, age, grade) {
		this.name = name;
		this.age = age;
		this.grade = grade;
	}
	getMoney(amount) {
		let permissionDenied = '권한이 없습니다.';
		if (!new Grade(this.grade).check() || !new Age(this.age).get()) {
			return permissionDenied;
		}
		const money = new Money().get();
		return `${this.name}님은 ${money}원 있습니다.`;
	}
}

class Grade {
	constructor(grade) {
		this.grade = grade;
	}
	check() {
		return this.grade > 1;
	}
}

class Age {
	constructor(age) {
		this.age = age;
	}
	get() {
		return this.age > 14;
	}
}

class Money {
	constructor() {}
	get() {
		return 2021;
	}
}

const user = new User('yuni', 15, 2);
const result = user.getMoney();
console.log(result); // yuni은 2021원 있습니다.
const user2 = new User('yuni', 13, 1);
const result2 = user2.getMoney();
console.log(result2); // '권한이 없습니다'
```

---

```javascript
const module = (function() {
	const _private = {
		i: 5,
		get: function() {
			console.log(`current value ${this.i}`);
		},
		set: function(val) {
			this.i = val;
		},
		run: function() {
			console.log('running');
		},
		jump: function() {
			console.log('jumping');
		},
	};

	return {
		facade: function(args) {
			_private.set(args.val);
			_private.get();
			if (args.run) {
				_private.run();
			}
		},
	};
})();

module.facade({ run: true, val: 10 });
// current value 10
// running
```

---

### 누가 무엇을 할까요?

- 데코레이터 : 한 인터페이스를 다른 인터페이스로 변환
- 어댑터 : 인터페이스는 바꾸지 않고 책임(기능)만 추가
- 퍼사드 : 인터페이스를 간단하게 바꿈

---

## 어댑터와의 차이

- 퍼사드와 어댑터는 모두 여러 개의 클래스를 감쌀 수 있습니다. 하지만 퍼사드는 인터페이스를 단순화시키기 위한 용도로 쓰이는 반면, 어댑터는 인터페이스를 다른 인터페이스로 변환하기 위한 용도로 쓰입니다.

---

## 참고

- [구조패턴](https://peter-cho.gitbook.io/book/12-gof/gof_3)
- [Best Design Patterns for writing JavaScript Web applications](https://morioh.com/p/516b8e896f77?f=5c21fb01c16e2556b555ab32&fbclid=IwAR3T2eqcXReUVjU4vXJ-gJjkNvBCEbOQE970hP2kMuyIauKgAG905J8duQs)
