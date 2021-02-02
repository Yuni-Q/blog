---
title: factory
date: 2021-01-30 23:01:25
category: design pattern
tags: []
draft: true
marp: true
# theme: gaia
---

## 바뀔 수 있는 부분을 찾아내서 바뀌지 않는 부분하고 분리시켜야 한다

---

## 팩토리 패턴은 생성과 관련된 디자인 패턴입니다.

- 생성 패턴을 이용하면 `무엇이 생성`되고, `누가 이것을 생성`하며, 이것이 `어떻게 생성`되는지, `언제 생성`할 것인지 결정하는데 `유연성`을 확보할 수 있게 됩니다.
  - 생성 패턴은 인스턴스를 만드는 절차를 `추상화`하는 패턴입니다.
  - 생성 패턴은 시스템이 어떤 Concrete Class를 사용하는지에 대한 정보를 `캡슐화`합니다.
- 생성 패턴은 시스템이 상속(inheritance) 보다 `복합(composite)` 방법을 사용하는 방향으로 진화되어 가면서 더 중요해지고 있습니다.

---

## 팩토리 패턴이 생성 카테고리의 다른 패턴과 다른 점

- `명시적으로 생성자를 사용할 필요가 없다`는 것입니다. 대신 팩토리는 객체를 생성하기 위한 일반 인터페이스를 제공 할 수 있으며, 여기서 생성하려는 팩토리 객체의 유형을 지정할 수 있습니다.

---

## 팩토리 패턴 기본 정의

- 비슷한 객체를 공장에서 찍어내듯이 반복적으로 생성할 수 있게 하는 패턴입니다.
- `생성과 사용을 분리`하기 위해 `객체 생성에 특화된 객체`를 FACTORY라고 부릅니다.
- Client는 오직 사용과 관련된 책임만 지고 생성과 관련된 어떤 지식도 가지지 않을 수 있습니다.
- 구상클래스의 인스턴스를 만드는 부분을 찾아서 `분리`, `캡슐화` 하기 위해서 팩토리 패턴을 사용합니다.
- 컴파일 시점에 구체적인 타입(클래스)을 몰라도 객체 생성이 가능합니다.
- Factory class를 Singleton으로 구현해도 되고, 서브클래스를 리턴하는 static 메소드로 구현해도 됩니다.
- 객체의 생성 시기를 직접 결정하려면 Client에서 완성된 객체를 던져주기 보다 factory 객체를 만들어서 던져줍니다.

---

## 사례

- 팩토리 패턴의 가장 흔한 사례는 Object() 를 이용한 객체 생성시, 주어지는 값의 타입에 따라 String, Boolean, Number 등으로 객체가 생성되는 것입니다.

---

## 추상화된 것에 의존

- 디자인 원칙 중 `추상화된 것에 의존하도록 만들어라. 구상 클래스에 의존하지 않도록 만든다.`에 기인한 패턴입니다.
- 팩토리는 구상 클래스가 아닌 추상 클래스(인터페이스)에 맞춰서 코딩할 수 있게 해 주는 강력한 기법입니다.
- `new` 라는 것은 구상 객체를 뜻합니다. 구상 객체는 구상 클래스의 인스턴스를 만드는 것이고 공통적인 인터페이스가 아닌 특정 구현을 사용하는 것입니다. 구상 클래스를 통해서 객체를 구현 하게 되면 나중에 수정해야 할 상황이 닥치면 모든 구상 클래스를 확인해서 바꾸어야 하는 불상사가 생길 수 있습니다. 인터페이스에 맞춰서 코딩을 한다면, `다형성` 덕분에 시스템에서 일어날 수 있는 여러 변화에 대처할 수 있게 됩니다.
- `확장에 대해서는 열려 있고 변경에 대해서는 닫혀 있어야 합니다`.
- 여러 개의 서브 클래스를 가진 슈퍼 클래스가 있을 때 인풋에 따라 하나의 자식 클래스의 인스턴스를 리턴해주는 방식입니다.

---

## 기술적인 결정

- 팩토리는 `도메인 모델에 속하지 않습니다`. 팩토리를 추가한 이유는 `순수하게 기술적인 결정`입니다. 전체적인 결합도를 낮추고 재사용성을 높이기 위해 도메인 개념에게 할당돼 있던 객체 생성 책임을 도메인 개념과는 아무런 상관이 없는 가공의 객체로 이동 시킨 것입니다.
- 팩토리는 객체의 생성 책임을 `할당할만한 도메인 객체가 존재하지 않을 때` 선택할 수 있는 `PURE FABRICATION`입니다.

---

## PURE FABRICATION

- 모든 책임을 도메인 객체에게 할당하면 낮은 응집도, 높은 결합도, 재사용성 저하와 같은 심각한 문제점에 봉착하게 될 가능성이 높아집니다. 이 경우 도메인 개념을 표현한 객체가 아닌 설계자가 편의를 위해 임의로 만들어낸 가공의 객체에게 할당해서 문제를 해결해야 합니다. 책임을 할당하기 위해 창조되는 도메인과 무관한 인공적인 객체를 `PURE FABRICATION(순수한 가공물)`이라고 부릅니다.
- PURE FABRICATION은 INFORMATION EXPERT 패턴에 따라 책임을 할당한 결과가 바람직하지 않을 경우 대안으로 사용됩니다. 어떤 객체가 책임을 수행하는 데 필요한 많은 정보를 가졌지만 해당 책임을 할당할 경우 응집도가 낮아지고 결합도가 높아진다면 가공의 객체를 추가해서 책임을 옮기는 것을 고민합니다. 순수한 가공물(PURE FABRICATION)이라는 표현은 적절한 대안이 없을 때 사람들이 창조적인 무언가를 만들어 낸다는 것을 의미하는 관용적인 표현입니다.

---

## 팩토리 패턴의 종류

- 주요로 사용되는 것은 `추상 팩토리`와 `팩토리 매서드 패턴`이 있습니다.
- 그 외에도 `정적 팩토리`, `간단한 팩토리` 등 다양한 종류의 팩토리 패턴이 있습니다.

---

## 일반 팩토리

```ts
class Factory {
	orderPizza(): Pizza {
		const pizza = new Pizza();
		Pizza.prepare();
		Pizza.bake();
		Pizza.cut();
		Pizza.box();
		return pizza;
	}
}

// 여러 종류 피자를 만들기 위한 수정
class Factory {
	orderPizza(type: string): Pizza {
		// 피자 종류가 바뀔 때 마다 코드를 고쳐야합니다.
		let pizza;
		if (type === 'cheese') {
			pizza = new CheesePizza();
		} else if (type === 'pepperoni') {
			pizza = new PepperoniPizza();
		} else if (type === 'clam') {
			pizza = new ClamPizza();
		} else if (type === 'veggie') {
			pizza = new VeggiePizza();
		}

		// 피자 종류에 상관없이 바뀌지 않는 부분.
		Pizza.prepare();
		Pizza.bake();
		Pizza.cut();
		Pizza.box();

		return pizza;
	}
}
```

---

## 정적 팩토리(static factory)

- 객체를 생성하는 메소드를 만들고, static으로 선언하는 기법입니다.
- 자바로 코딩할 때 흔하게 볼 수 있는 `valueOf 메서드`가 정적 팩토리 메서드입니다.
- 생성자(Constructor)를 중복 정의(overload)할 때는 정적 팩토리 메서드를 사용합니다. 메서드는 인수를 설명하는 이름을 사용합니다.
- `간단한 팩토리`를 정적 메소드로 정의하는 기법도 많이 사용 됩니다.
- 정적 메소드를 쓰면 객체를 생성하기 위한 메소드를 실행시키기 위해서 객체의 인스턴스를 만들지 않아도 되기 때문입니다. 하지만 서브클래스를 만들어서 객체 생성 메소드의 행동을 변경시킬 수 없다는 단점이 있습니다.
- 이펙티브 자바 2판은 '규칙 1'에서 생성자 대신 정적 펙터리 메서드를 고려할 것을 권고합니다.

---

### 장점

- 이름이 있으므로 생성자에 비해 가독성이 좋습니다.
- 호출될 때마다 인스턴스를 새로 생성할 필요가 없습니다.
- 반환 타입의 하위 타입 객체를 반환할 수 있습니다.
- 일력 매개 변수에 따라 매번 다른 클래스의 객체를 반환 할 수 있습니다.
- 정적 팩터리 메서드를 작성하는 시점에는 반활할 객체의 클래스가 존재하지 않아도 됩니다.

---

### 단점

- 정적 팩토리 메서드만 제공하면 하위 클래스를 만들 수 없습니다.
  - 이 제약은 상속보다 컴포지션을 사용하도록 유도하고 불변타입으로 만들려면 이 제약을 지켜야 한다는 점에서 오히려 장점으로 받아 들일 수도 있습니다.
- 정적 팩토리 메서드는 다른 정적 메서드와 잘 구분되지 않습니다. 그래서 정적 팩터리 메서드는 개발자가 찾기 어렵습니다.

---

## 정적 팩토리 코드

```ts
class Factory {
	static orderPizza(type: string): Pizza {
		// 피자 종류가 바뀔 때 마다 코드를 고쳐야합니다.
		let pizza;
		if (type === 'cheese') {
			pizza = new CheesePizza();
		} else if (type === 'pepperoni') {
			pizza = new PepperoniPizza();
		} else if (type === 'clam') {
			pizza = new ClamPizza();
		} else if (type === 'veggie') {
			pizza = new VeggiePizza();
		}

		// 피자 종류에 상관없이 바뀌지 않는 부분.
		pizza.prepare();
		pizza.bake();
		pizza.cut();
		pizza.box();

		return pizza;
	}
}
```

---

### 핵심 정리

- 정적 팩터리 메서드와 `public 생성자`는 각자의 쓰임새가 있으니 상대적인 장단점을 이해하고 사용하는 것이 좋습니다. 그렇다고 하더라도 정적 팩터리를 사용하는 게 유리한 경우가 더 많습니다.

---

## 간단한 팩토리(Simple Factory)

- 간단한 팩토리는 엄밀하게 말해서 디자인 패턴은 아니지만, 클라이언트와 구상 클래스를 분리 시키기 위한 간단한 기법으로 활용할 수 있습니다.
- 관용구 같은 것입니다.

---

## 간단한 팩토리 예제

```ts
class PizzaFactory {
	createPizza(type: string) {
		if (type === 'cheese') {
			return new CheesePizza();
		}
		if (type === 'pepper') {
			return new PepperoniPizza();
		}
		if (type === 'clam') {
			return new ClamPizza();
		}
		if (type === 'veggie') {
			return new VeggiePizza();
		}
		throw new Error('올바른 타입이 아닙니다.');
	}
}

class PizzaStore {
	public orderPizza(type: string): Pizza {
		const pizza = new PizzaFactory().createPizz(type);
		pizza.prepare();
		pizza.bake();
		pizza.cut();
		pizza.box();
		return pizza;
	}

	abstract createPizza(type: string): Pizza;
}

abstract class Pizza {
	name: string;
	dough: string;
	sauce: string;
	toppings: string[];

	prepare() {
		console.log('Preparing ' + this.name);
		console.log('Tossing dough... ');
		console.log('Adding sauce... ');
		console.log('Adding toppings: ');
		this.toppings.forEach(topping => {
			console.log(topping);
		});
	}
	bake() {
		console.log('Bake for 25 minutes at 350');
	}
	cut() {
		console.log('Cutting the pizza into diagonal slice');
	}
	box() {
		console.log('Place pizza in official PizzaStore box');
	}
	public getName(): string {
		return this.name;
	}
}

class NYStyleCheesePizza extends Pizza {
	constructor() {
		this.name = 'NY Style Sauce and Cheese Pizza';
		this.dough = 'Thin Crust Dough';
		this.sauce = 'Marinara Sauce';
		this.toppings.push('Grated Regains Cheese');
	}
}
```

---

## 간단한 팩토리와 팩토리 메소드 패턴의 차이점

- 팩토리 메소드 패턴이 간단한 팩토리와 상당히 비슷합니다. 하지만 간단한 팩토리는 일회용 처방에 불과한 반면, 팩토리 메소드 패턴을 이용하면 `어떤 구현을 사용할지를 서브클래스에서 결정`하는 프레임워크를 만들 수 있다는 결정적인 차이점입니다. 간단한 팩토리에서는 객체 생성을 `캡슐화`하는 방법을 사용하긴 하지만 팩토리 메소드 패턴처럼 강력한 `유연성`을 제공하진 못합니다. 생성하는 제품을 마음대로 변경할 수 없기 때문입니다.

---

## 팩토리 메서드 패턴에 대한 오해

- 이름으로 인해 `객체를 생성하는 메소드를 Factory method라 오해`하는 경우가 많습니다.

---

## 팩토리 메서드 패턴이란?

- 팩토리 패턴의 핵심은 클래스의 인스턴스를 만드는 것을 `서브클래스에서 결정`하도록 한다는 것입니다. 즉, new 키워드를 사용하는 부분을 서브클래스에 위임함으로서 `객체 생성을 캡슐화`하고 구상 클래스에 대한 `의존성이 줄어든다는 이점`을 얻을 수 있습니다.
- 자신이 만들고 있는 클래스가 `바뀔 가능성`이 있다면 팩토리 메소드 패턴 같은 기법을 써서 변경될 수 있는 부분을 `캡슐화` 하여야 합니다.
- 부모(상위) 클래스 코드에 `구체 클래스 이름을 감추기 위한 방법`으로도 사용합니다.
- 팩토리 메소드 패턴은 객체를 생성해서 반환하는 것을 말한다. 즉, `결과값이 객체`인 것이다.
- `가상 생성자(Virtual Constructor)`라고도 불립니다.

---

### 결합도를 낮춰야 합니다.

- 클래스의 변경사항이 생겼을 때 얼마나 다른 클래스에게도 영향을 줄 것인가가 `결합도`입니다. 팩토리 메소드 패턴은 직접 사용하는 객체를 생성하지 않고 팩토리 메소드 클래스를 통해 객체를 대신 생성하고 그 객체를 반환 받아 사용하기 때문에 효율적인 코드 제어를 할 수 있을 뿐더러 `결합도를 낮춰 유지보수가 용이`합니다.

---

### 파편화 방지와 변경되는 범위 최소화

- 팩토리 메서드는 `부모 클래스에서 타입에 따라 클래스를 생성`하는 방법입니다. 자식 클래스를 생성하는 상황에서 부모 클래스의 팩토리를 호출하여 생성해주는 방식으로 처리하며, 이러한 방법의 장점은 자식 클래스 생성에 대해 `파편화를 막아주며`, 자식 클래스가 늘어나는 상황에서 `효과적으로 코드 수정`을 할 수 있게 도와줍니다.
- 메인 프로그램에서는 어떤 객체가 생성되었는지 신경 쓸 필요 없이 반환된 객체만 사용하면 되고 클래스에서 변경이 발생해도 `메인 프로그램이 변경되는 것은 최소화`할 수 있습니다.
- 클라이언트 코드와 인스턴스를 만들어야 할 구상 클래스를 `분리`시켜야 할 때 유용하며, 어떤 구상 클래스를 필요로 하게 될지 알 수 없는 경우에도 유용합니다.

---

## 의존성 뒤집기 원칙(Dependency Inversion Principle:DI)

- 구상 클래스에 대한 의존성이 줄어드는 것은 의존성 뒤집기 원칙에 기인합니다.
- `팩토리 메소드 패턴`이 의존성 뒤집기 원칙을 준수하기 위해 쓸 수 있는 유일한 기법은 아니지만 `가장 적합한 벙법 가운데 하나`입니다.
- 고수준 모듈과 저수준 모듈이 둘다 하나의 `추상 클래스에 의존`해야 합니다.
- 인스턴스화에 대한 `책임`을 객체를 사용하는 클라이언트에서 `팩토리 클래스로 가져옵니다`.

---

### 가장 대표적이 DI 프레임워크

- DI는 자바 진영에서 널리 쓰이고 있는 `Spring 프레임워크`의 핵심 개념 중 하나입니다.

---

## 의존성 뒤집기 원칙에 위배되는 객체지향 디자인을 피하는데 도움이 되는 가이드

- 어떤 변수에도 구상 클래스에 대한 레퍼런스를 지정하지 않습니다.
  - new 연산자를 사용하면 레퍼런스를 사용하게 됩니다.
- 구상 클래스에서 유도된 클래스를 만들지 않는습니다.
  - 구상클래스에서 유도된 클래스를 만들면 특정 구상 클래스에 의존하게 됩니다. 추상화 된것을 사용해야 합니다.
- 베이스 클래스에 이미 구현되어 있던 메소드를 오버라이드 하지 않습니다.
  - 이미 구현되어 있는 메소드를 오버라이드 한다는 것은 애초부터 베이스 클래스가 제대로 추상화 된것이 아닙니다. 베이스 클래스에서 메소드를 정의할 때는 모든 서브 클래스에서 공유할 수 있는 것만 정의해야 합니다.

---

### 참여자

- Product : 팩토리 메서드가 생성하는 객체의 인터페이스를 정의합니다.
- ConcreteProduct : Product 클래스에 정의된 인터페이스를 실제로 구현합니다.
- Creator : Product 타입의 객체를 반환하는 팩토리 메서드를 선언 합니다. Creator 클래스는 팩토리 메서드를 기본적으로 구현하는데, 이 구현에서는 ConcreteProduct 객체를 반환합니다. 또한 Product 객체의 생성을 위해 팩토리 메서드를 호출합니다.
- ConcreteCreator : 팩토리 메서드를 재정의하여 ConcreteProduct의 인스턴스를 반환합니다.

---

### 협력 방법

- Creator는 자신의 `서브클래스`를 통해 실제 필요한 팩토리 메서드를 정의하여 적절한 ConcreteProduct의 인스턴스를 반환할 수 있게 합니다.

---

### 팩토리 메서드 패턴을 쓰면서 얻는 이익과 부담

- 팩토리 메서드 패턴은 응용프로그램에 국한된 클래스가 여러분의 코드에 종속되지 않도록 해 줍니다. 응용프로그램은 Product 클래스에 정의된 인터페이스와만 동작하도록 코드가 만들어지기 때문에, 사용자가 정의한 어떤 ConcreteProduct 클래스와도 동작할 수 있게 됩니다.
- 팩토리 메서드의 잠재적인 단점은 사용자가 ConcreteProduct 객체 하나만 만들려 할 때에도 Creator 클래스를 서브클래싱해야 할지 모른다는 점입니다. 서브클래싱 기법은 사용자 Creator 클래스를 상속해서 서브클래스를 만들어야 할 때는 그럭저럭 훌륭한 방법이지만, 그렇지 않은 때라면 다른 방식으로 클래스의 진화 과정을 처리 해야 합니다.

---

## 팩토리 메서드 패턴을 쓰면서 얻는 결과

- `서브클래스에 대한 훅(hook) 메서드를 제공합니다.` 팩토리 메서드로 클래스 내부에서 객체를 생성하는 것이 객체를 직접 생성하는 것보다 훨씬 응용성이 높아 집니다. 팩토리 메서드 패턴에서는 객체별로 서로 다른 버전을 제공하는 흑 기능을 서브클래스에 정의합니다.
- `병렬적인 클래스 계통을 연결하는 역할을 담당합니다.` Creator 클래스만이 팩토리 메서드를 호출하게 되어 있습니다. 하지만 꼭 이때만 그런 것은 아닙니다. 팩토리 메서드는 병렬적인 클래스 계통이 만들어질 때 더욱 쓸모가 있습니다. 병렬적 클래스 계통은 클래스가 자신의 책임을 분리된 다른 클래스에 위임할 때 발생합니다.

---

## 구현 방법이 크게 두가지입니다.

- 첫번째 `Creator 클래스를 추상 클래스로 정의`하고, 정의한 팩토리 메서드에 대한 구현은 제공하지 않는 경우입니다. 기본 구현을 일부 정의한 추상 클래스로 정의할 수도 있지만, 흔한 일은 아닙니다. 추상 클래스로 정의할 때는 구현을 제공한 서브클래스를 반드시 정의해야 합니다. 이때, 아직 예측할 수 없는 클래스들을 생성해야 하는 문제가 생깁니다.
- 두번째 `Creator가 구체 클래스`이고, 팩토리 메서드에 대한 기본 구현을 제공하는 경우입니다. 구체 클래스로 정의할 때는 Creator가 팩토리 메서드를 사용하여 유연성을 보장할 수 있습니다. 이런 규칙이 있습니다. `객체의 생성은 별도의 연산으로 분리하여, 이 연산을 서브클래스에서 재정의하게 합니다.` 이 규칙을 따르면, 서브클래스 설계자는 부모 클래스가 인스턴스를 만드는 객체의 클래스를 변경할 수 있습니다.

---

## 팩토리 메서드를 매개변수화합니다.

- 팩토리 메서드를 이용해서 여러 종류의 제품을 생성하는 방법도 있습니다. 팩토리 메서드가 `매개변수를 받아서 어떤 종류의 제품을 생성할지 식별`하게 만드는 것입니다. 물론, 팩토리 메서드가 생성하는 모든 객체는 `Product라는 인터페이스`를 만족해야 합니다. 매개변수화된 팩토리 메서드를 오버라이드하면, Creator 클래스가 생성하는 제품을 쉽게 확장하거나 변경할 수 있습니다. 새로운 종류의 제품에 대한 식별자를 추가하거나, 기존의 식별자를 다른 제품과 연결할 수 있습니다.

---

## 언어마다 구현 방법이 조금 다를 수 있습니다.

- 스몰토크 프로그램은 종종 인스턴스화할 객체의 클래스를 반환하는 메서드를 사용합니다. Creator 팩토리 메서드는 이 클래스를 이용해서 제품을 생성하고, ConcreteCreator 클래스는 이 값을 저장하거나 연산합니다. 결과적으로，인스턴스화될 ConcreteProduct 타입과의 바인딩(binding)이 늦게 이루어지게 됩니다.

---

## 템플릿을 사용하여 서브클래싱을 피합니다.

- 팩토리 메서드를 쓰면 생길 수 있는 잠재적인 문제점 중 하나는 그냥 Product 클래스 하나를 추가하려 할 때마다 서브클래싱을 해야 한다는 점입니다. 이로써 클래스 계통의 부피가 확장되는 문제가 생길 수 있습니다. C++에서 이런 문제를 해결할 수 있는 방법 중 하나는 Creator 클래스의 서브클래스가 되는 템플릿 클래스를 정의하고 이것이 Product 클래스로 매개변수화되도록 만드는 것입니다. 이 템플릿 클래스를 이용하면, 사용자는 Creator를 상속받는 서브클래스를 정의할 필요 없이, 적절한 Product 클래스만 준비해 놓으면 됩니다.

---

## 명명 규칙을 따르는 것도 매우 중요한 일입니다.

- 팩토리 메서드를 쓴다는 사실을 명확하게 만들어 주는 명명 규칙을 따르는 것이 좋습니다.

---

## 팩토리 메소드 패턴의 활용처

- 어떤 클래스가 자신이 생성해야 하는 객체의 클래스를 예측할 수 없을 때 사용합니다.
- 생성할 객체를 기술하는 책임을 자신의 서브클래스가 지정했으면 할 때 사용합니다.
- 객체 생성의 책임을 몇 개의 보조 서브클래스 가운데 하나에게 위임하고, 어떤 서브클래서가 위임자인지에 대한 정보를 국소화시키고 싶을 때 사용합니다.

---

## 클래스 패턴(Class pattern) vs 객체 패턴(Object patterns)

- 클래스 패턴(Class pattern)입니다.
- 클래스 패턴에서는 클래스 사이의 관계가 상속을 통해서 어떤 식으로 정의되는지를 다룹니다. 클래스 패턴에서는 컴파일시에 관계가 결정됩니다.

---

## 팩토리 메소드 패턴 예제

---

### Creator

```ts
class PizzaStore {
	public orderPizza(type: string): Pizza {
		const pizza = this.createPizz(type);
		pizza.prepare();
		pizza.bake();
		pizza.cut();
		pizza.box();
		return pizza;
	}

	abstract createPizza(type: string): Pizza;
}
```

---

### Concrete Creator

```ts
class NYPizzaStore extends PizzaStore {
	createPizza(type: string) {
		if (type === 'cheese') {
			return new NYStyleCheesePizza();
		}
		if (type === 'pepper') {
			return new NYStylePepperoniPizza();
		}
		if (type === 'clam') {
			return new NYStyleClamPizza();
		}
		if (type === 'veggie') {
			return new NYStyleVeggiePizza();
		}
		throw new Error('올바른 타입이 아닙니다.');
	}
}

class ChicagoPizzaStore extends PizzaStore {
	createPizza(type: string) {
		if (type === 'cheese') {
			return new ChicagoStyleCheesePizza();
		}
		if (type === 'pepper') {
			pizza = new ChicagoStylePepperoniPizza();
		}
		if (type === 'clam') {
			pizza = new ChicagoStyleClamPizza();
		}
		if (type === 'veggie') {
			pizza = new ChicagoStyleVeggiePizza();
		}
		throw new Error('올바른 타입이 아닙니다.');
	}
}
```

---

### Product

```typescript
abstract class Pizza {
	name: string;
	dough: string;
	sauce: string;
	toppings: string[];

	prepare() {
		console.log('Preparing ' + this.name);
		console.log('Tossing dough... ');
		console.log('Adding sauce... ');
		console.log('Adding toppings: ');
		this.toppings.forEach(topping => {
			console.log(topping);
		});
	}
	bake() {
		console.log('Bake for 25 minutes at 350');
	}
	cut() {
		console.log('Cutting the pizza into diagonal slice');
	}
	box() {
		console.log('Place pizza in official PizzaStore box');
	}
	public getName(): string {
		return this.name;
	}
}
```

---

### Concrete Product

```ts
class NYStyleCheesePizza extends Pizza {
	constructor() {
		this.name = 'NY Style Sauce and Cheese Pizza';
		this.dough = 'Thin Crust Dough';
		this.sauce = 'Marinara Sauce';
		this.toppings.push('Grated Regains Cheese');
	}
}

class ChicagoStyleCheesePizza extends Pizza {
	ChicagoStyleCheesePizza() {
		this.name = 'Chicago Style Deep Dish Cheese Pizza';
		this.dough = 'Extra Thick Crust Dough';
		this.sauce = 'Plum Tomato Sauce';
		this.toppings.push('Shredded Mozzarella Cheese');
	}
	cut() {
		console.log('Cutting the pizza into square slices');
	}
}
```

---

### Client

```ts
const nyStore = new NYPizzaStore();
const chicagoStore = new ChicagoPizzaStore();
const nyStylePizza = nyStore.orderPizza('cheese');
console.log(nyStylePizza.getName());
console.log('-------------------------------------------------');
const chicagoStylePizza = chicagoStore.orderPizza('cheese');
console.log(chicagoStylePizza.getName());
```

---

### 팩토리 메소드 패턴의 장점

- 팩토리 패턴은 클라이언트와 구현 객체들 사이에 `추상화`를 제공합니다.
- `생성 할 클래스를 미리 알지 못해도` 팩토리 클래스가 객체 생성 담당할 수 있습니다.
- `객체의 자료형이 하위클래스에 의해서 결정`되어 `확장성`이 좋아집니다.
- `동일한 형태`로 프로그래밍 가능합니다.
- `확장성` 있는 전체 프로젝트 구성이 가능합니다.

---

## 팩토리 메소드 패턴의 주의점

- 객체가 늘어날 때마다 하위클래스 재정의로 인한 `불필요하게 많은 클래스`를 작성 할 수 있습니다.
- Factory Method가 중첩되기 시작하면 굉장히 `복잡`해 질 수 있습니다. 또한 상속을 사용하지만 부모(상위) 클래스를 전혀 `확장하지 않습니다`. 따라서 이 패턴은 extends 관계를 잘못 이용한 것으로 볼 수 있습니다. extends 관계를 남발하게 되면 프로그램의 엔트로피가 높아질 수 있으므로 Factory Method 패턴의 사용을 주의해야 합니다.
- 생성 메소드가 모두 Factory method 패턴을 사용하는 것은 아닙니다. `Template Method의 생성 패턴 버전`으로 볼 수 있는데 Template Method를 알지 못한다면 그 패턴을 먼저 이해하는 것이 Factory Method를 이해하기 수월할 것입니다.

---

## 관련 패턴

- 팩토리 메서드는 `템플릿 메서드 패턴`에서도 사용될 때가 많습니다.
- `원형 패턴`은 Creator 클래스의 상속이 필요하지는 않습니다. 그러나 Product 클래스에 정의된 초기화 연산은 필요합니다. Creator 클래스는 객체의 초기화를 위해 초기화 연산을 사용하지만, 팩토리 메서드는 이런 연산이 필요하지 않습니다.

---

## 팩토리 메소드 패턴 vs 추상 팩토리 패턴

- `추상 팩토리 패턴`은 `팩토리 메서드를 이용해서 구현`할 때가 많습니다.
- 팩토리 메서드 패턴을 이용하여 `객체 생성에 대해 쉽게 관리`를 하고, `관리가 비대해지면` 추상 팩토리 패턴을 이용해 팩토리 메서드로 생성하는 객체를 한 곳에 모아서 객체로 만들어 관리할 수 있습니다.
- 팩토리 메소도 패턴은 `클래스`를 써서 제품을 만들고, 추상 팩토리 패턴에서는 `객체`를 써서 제품을 만듭니다.

---

## 추상 팩토리 패턴 쉬운 설명

- 추상 팩토리 패턴의 참가 객체는 `팩토리`와 `제품`입니다. 이 패턴은 클래스의 인스턴스를 직접 만들지 않고서도 관련된 제품 객체의 군을 생성하는 방법을 정의합니다. 제품 객체의 종류는 일정하고, 각 객체의 특성이 특정 `제품군마다 차이`를 보일 때 매우 좋은 방법입니다.
- `어떤 특정 팩토리를 지정하여 이를 통해서 제품을 생성하게 하는 방법`으로 원하는 제품을 선택합니다. `팩토리의 인스턴스만 바꾸면 전체 제품군을 바꿀 수 있습니다`. 추상 팩토리 패턴은 `동일 계열의 제품군을 다룰 수 있다`는 점에서 다른 생성 패턴과 다릅니다. 다른 생성 패턴은 한 종류의 제품 객체만 상대할 수 있기 때문입니다.

---

## 추상 팩토리 패턴

- 추상 팩토리 패턴은 `객체의 집합`을 만들 때 사용합니다. 관련이 있는 객체를 묶어 하나의 팩토리 클래스로 만든 후, `팩토리를 조건에 따라서 생성하도록 팩토리를 다시 만들어 객체를 생성`합니다.
- 추상 팩토리 클래스는 `팩토리 메서드 패턴을 이용해서 구현`되는데, `원형 패턴`을 이용할 때도 있습니다. 구체 팩토리는 `단일체 패턴`을 이용해 구현하는 경우가 많습니다.
- 추상 팩토리 패턴은 `인터페이스`를 이용하여 서로 연관된, 또는 의존하는 객체를 `구상 클래스를 지정하지 않고`도 생성할 수 있습니다. 즉, `연관된 서브 클래스를 그룹화` 할 수 있고 이것은 이 `그룹을 자유롭게 교체`할 수 있는 패턴입니다.
- `자세한 구현을 숨기고 싶다면` 추상 팩토리 패턴을 사용합니다.
- `키트(Kit)`라고도 합니다.

---

## 추상 팩토리 패턴 사용처

- 클라이언트에서 `서로 연관된 일련의 제품들을 만들어야 할 때 유용`합니다.
- 객체가 생성되거나 구성 또는 표현되는 방식과 무관하게 시스템을 `독립적`으로 만들고자 할 때 사용합니다.
- 여러 제품군 중 하나를 선택해서 시스템을 설정해야 하고 한번 구성한 제품을 `다른 것으로 대체`할 수 있을 때 사용합니다.
- 관련된 제품 객체들이 `함께 사용`되로록 설계되었고, 이 부분에 대한 제약이 `외부에도 지켜지도록 하고 싶을 때` 사용합니다.
- 제품에 대한 클래스 라이브러리를 제공하고, 그들의 `구현이 아닌 인터페이스를 노출`시키고 싶을 때 사용합니다.

---

## 참여자

- AbstractFactory : 개념적 제품에 대한 `객체를 생성하는 연산으로 인터페이스`를 정의합니다.
- ConcreteFactory : 구체적인 제품에 대한 객체를 생성하는 연산을 구현합니다.
- AbstractProduct : `개념적 제품 객체에 대한 인터페이스`를 정의합니다.
- ConcreteProduct : 구체적으로 팩토리가 생성할 객체를 정의하고, AbstractProduct가 정의하는 인터페이스를 구현합니다.
- Client : AbstractFactory와 AbstractProduct 클래스에 선언된 인터페이스를 사용합니다.

---

## 협력 방법

- 일반적으로 ConcreteFactory 클래스의 인스턴스 한 개가 `런타임에 만들어집니다`. 이 구체 팩토리(concrete factory)는 어떤 특정 구현을 갖는 제품 객체를 생성합니다. `서로 다른 제품 객체를 생성하려면 사용자는 서로 다른 구체 팩토리를 사용해야 합니다`.
- AbstractFactory는 필요한 제품 객체를 생성하는 책임을 ConcreteFactory 서브 클래스에 위임합니다.

---

## 추상 팩토리 패턴을 쓰면서 얻는 이익과 부담

1. `구체적인 클래스를 분리합니다.` 추상 팩토리 패턴을 쓰면 응용프로그램이 생성 할 객체의 클래스를 제어할 수 있습니다. 팩토리는 제품 객체를 생성하는 과정과 책임을 캡슐화한 것이기 때문에, 구체적인 구현 클래스가 사용자에게서 분리됩니다. 일반 프로그램은 추상 인터페이스를 통해서만 인스턴스를 조작합니다. 제품 클래스 이름이 구체 팩토리의 구현에서 분리되므로, 사용자 코드에는 나타나지 않는 것입니다.
2. `제품군을 쉽게 대체할 수 있도록 합니다.` 구체 팩토리의 클래스는 응용프로그램에서 한 번만 나타나기 때문에 응용프로그램이 사용할 구체 팩토리를 변경하기는 쉽습니다. 또한, `구체 팩토리를 변경함`으로써 응용프로그램은 서로 `다른 제품을 사용`할 수 있게 변경됩니다. 추상 팩토리는 `필요한 모든 것을 생성하기 때문에 전체 제품군은 한번에 변경이 가능`합니다.

---

## 추상 팩토리 패턴을 쓰면서 얻는 이익과 부담2

3. `제품 사이의 일관성을 증진시킵니다.` 하나의 군 안에 속한 제품 객체들이 함께 동작하도록 설계되어 있을 때, 응용프로그램은 한 번에 오직 한 군에서 만든 객체를 사용하도록 함으로써 프로그램의 `일관성`을 갖도록 해야 합니다. 추상 팩토리를 쓰면 이 점을 아주 쉽게 보장할 수 있습니다.
4. `새로운 종류의 제품을 제공하기 어렵습니다.` 새로운 종류의 제품을 만들기 위해 기존 추상 팩토리를 확장하기가 쉽지 않습니다. 생성되는 제품은 추상 팩토리가 생성할 수 있는 제품 집합에만 고정되어 있기 때문입니다. 만약 새로운 종류의 제품이 등장하면 팩토리의 구현을 변경해야 합니다. 이는 추상 팩토리와 모든 서브클래스의 변경을 가져옵니다. 즉, 인터페이스가 변경되는 새로운 제품을 생성하는 연산이 추가되거나, 기존 연산의 반환 객체 타입이 변경되었으므로, 이를 상속받는 서브클래스 모두 변경되어야 합니다.

---

## 팩토리를 단일체로 정의합니다

- 전형적으로 응용프로그램은 한 제품군에 대해서 하나의 ConcreteFactory 인스턴스만 있으면 됩니다. 즉, 갖가지 제품의 종류를 만들어 내는 팩토리는 제품군에 대해서 하나면 되는 것입니다. 그러므로 `단일체`로 구현하는 것이 바람직합니다. 이 단일체 역시 생성 패턴의 한 종류 입니다.

---

## 제품을 생성합니다

- AbstractFactory는 단지 제품을 생성하기 위한 인터페이스를 선언하는 것이고, 그것을 생성하는 책임은 Product의 서브클래스인 ConcreteProduct에 있습니다. 이를 위한 가장 공통적인 방법은 `각 제품을 위해서 팩토리 메서드를 정의`하는 것입니다. AbstractFactory는 각 제품 생성을 위한 팩토리 메서드를 재정의(overriding)함으로써 각 제품의 인스턴스를 만듭니다. 이 구현은 간단하지만, 제품군이 약간 다르다면 `각 제품군을 위한 새로운 구체 팩토리 서브클래스`가 필요합니다.
- 많은 제품군이 가능하다면 구체 팩토리는 `원형 패턴`을 이용해서 구현할 수 있습니다. 구체 팩토리가 한 군내의 각 제품 원형 인스턴스로 초기화되고 원형의 복사를 통해서 인스턴스를 생성합니다. 원형 기반의 접근법은 새로운 제품군별로 `새로운 구체 팩토리를 생성할 필요를 없애줍니다`.

---

## 확장 가능한 팩토리들을 정의합니다

- AbstractFactory에는 생성할 `각 제품의 종류별로 서로 다른 연산`(CreateProductA(), CreateProductB ())을 정의합니다. 이 `제품들의 종류는 연산의 시그니처`를 보면 알 수 있습니다. CreateProductA를 통해 ProductA를 만듭니다. 새로운 종류의 제품이 추가되면 AbstractFactory의 `인터페이스에도 새로운 연산을 추가`해야 합니다. 좀더 유연하게 하려면 `생성할 객체를 매개변수로 만들어 연산에 넘기면 됩니다`. 그리고 `매개변수에다가 생성할 객체의 종류를 표현`합니다. 이렇게 되면 AbstractFactory에는 Make() 연산만 있으면 되고, Make() 연산의 매개변수로 생성할 제품에 대한 식별자를 넘겨주게 됩니다. 이것은 앞에서 설명한 `원형 및 클래스에 기반을 둔 추상 팩토리에서 쓴 기법`입니다. 하지만 강제 변환이 필요 없어졌다 하더라도 여전히 태생적 문제는 남아있습니다. 모든 제품 객체가 `사용자 쪽에 반환될 때 반환 타입으로 주어진 것과 동일한 추상 인터페이스를 만족해야 한다`는 것입니다. 사용자는 반환 값으로 이들을 서로 구별할 수 없고, 제품의 클래스에 대한 적절한 가정도 할 수 없습니다. 서브클래스에 국한된 연산의 수행이 필요하다면 추상 클래스를 통해서는 접근할 수 없습니다.

---

### 클래스 패턴(Class pattern) vs 객체 패턴(Object patterns)

- 객체 패턴(Object patterns)입니다.
- 객체 패턴(Object patterns)에서는 객체 사이의 관계를 다루며, 객체 상이의 관계는 보통 구성을 통해서 정의 됩니다. 객체 패턴에서는 일반적으로 실행 중에 관계가 생성되기 때문에 더 동적이고 유연 합니다.

---

## 추상화된 재료 Pizza 재료 공장을 만들기

```ts
interface PizzaIngredientFactory {
	createDough(): Dough;
	createCheese(): Cheese;
	createBoolgogi(): Boolgogi;
	createVeggies(): Veggies[];
}
```

---

## 지역별로 공장 만들기

```ts
class IndiaPizzaIngredientFactory implements PizzaIngredientFactory {
	public createDough(): Dough {
		return new VeggieDough();
	}

	public createCheese(): Cheese {
		return new VeggieCheese();
	}

	public createBoolgogi(): Boolgogi {
		return new ChickenBoolgogi();
	}

	public createVeggies(): Veggies[] {
		const veggies = [new Garlic(), new Onion(), new Mushroom()];
		return veggies;
	}
}
```

---

## 피자 클래스

```ts
abstract class Pizza {
	 name: String;
	 dough: Dough;
	 cheese: Cheese;
	 boolgogi: Boolgogi;
	 veggies: Veggies[];

	//원재료 생산공장을 달리하면서 추상화시켯다.
	public abstract void prepare();

	public void bake() {
		console.log("굽는중.....");
	}

	public void cut() {
		console.log("자르는중.....");
	}

	public void box() {
		console.log("박싱중.....");
	}

	public getName(): string {
		return this.name;
	}

	public setName( name: string) {
		this.name = name;
	}
}
```

---

## 팩토리 메소드와 차별점

```ts
class BoolGogiPizza extends Pizza {
	pizzaIngredientFactory: PizzaIngredientFactory;

	constructor(pizzaIngredientFactory: PizzaIngredientFactory) {
		this.setName("Korea Style Cutting Pizza");
		this.pizzaIngredientFactory = pizzaIngredientFactory;
	}

	public void prepare() {
		console.log("재료준비중... " +name);
		const dough = pizzaIngredientFactory.createDough();
		const cheese = pizzaIngredientFactory.createCheese();
		const boolgogi = pizzaIngredientFactory.createBoolgogi();

		console.log(dough);
		console.log(cheese);
		console.log(boolgogi);
	}
}
```

---

## Store

```ts
interface PizzaStore {
	createPizza(type: string): Pizza;
}

class KorPizzaStore extends PizzaStore {
	protected createPizza(type: string): Pizza {
		let pizza;
		const fac = new KorIngredientPizzaFactory();

		if (type === 'boolgogi') {
			// 팩토리 메소드와 다른 점은 피자 자체를 store에서 생성해주었지만, 이제는 원재료를 로컬별 IngredientPizzaFactory에서 받아쓰기때문에, IngredientPizzaFactory 객체를 BoolGogiPizza 생성자에 넘겨주어 피자 재료를 달리생성하게된다.
			pizza = new BoolGogiPizza(fac);
		}

		return pizza;
	}
}
```

---

## 관련 패턴

- 복잡한 객체를 생성해야 할 때 추상 팩토리 패턴은 `빌더 패턴`과 비슷한 모습을 보입니다. 근본적인 차이가 있다면 빌더 패턴은 복잡한 객체의 `단계별 생성`에 중점을 둔 반면, 추상 팩토리 패턴은 제품의 `유사군들이 존재할 때 유연한 설계`에 중점을 둔다는 것입니다.
- 빌더 패턴은 생성의 `마지막 단계`에서 생성한 제품을 반환하는 반면, 추상 팩토리 패턴에서는 `만드는 즉시` 제품을 반환합니다. 추상 팩토리 패턴에서 만드는 제품은 꼭 모여야만 의미 있는 것이 아니라 하나만으로도 의미가 있기 때문입니다.

---

### 대안

- `원형 패턴`은 추상 팩토리 패턴의 대안 패턴입니다.

---

## 잘못 생각하고 있었던 점

### 생성하는 것만 래핑하면 되는 것인가?

- 디자인 패턴을 이해하는데는 `인칭(화자)`를 명확히 하는 것이 중요합니다.
- 팩토리의 경우 input 값을 통해 객체를 `return` 해 주는 것이 핵심입니다. 객체를 생성해서 내부의 배열로서 관리하는 것은 팩토리 패턴이 아닙니다.
  - 게임에서 몬스터를 잡으면 아이템이 나오는데 그 종류는 정해져 있을 것이고 그 확률은 팩토리가 관리할 것입니다. 하지만 팩토리가 만든 아이템은 유저가 가져갈 것입니다. 유저는 어떤 몹을 잡았는지 팩토리에게 알려주고 팩토리가 반환해 주는 아이템을 선택적으로 가져갈 것입니다.

---

## 참고

- [TypeScript 디자인 패턴 - 팩토리 패턴](https://vallista.kr/2020/05/05/TypeScript-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%ED%8C%A9%ED%86%A0%EB%A6%AC-%ED%8C%A8%ED%84%B4/)
- [[Design Pattern] 팩토리 패턴](https://woovictory.github.io/2019/02/07/Design-Pattern-Factory-Pattern/)
- [정리정리정리](https://jusungpark.tistory.com/14)
- [[생성 패턴] 팩토리 패턴(Factory Pattern) 이해 및 예제](https://readystory.tistory.com/117)
- [팩토리 메서드 패턴](https://ko.wikipedia.org/wiki/%ED%8C%A9%ED%86%A0%EB%A6%AC_%EB%A9%94%EC%84%9C%EB%93%9C_%ED%8C%A8%ED%84%B4)
- [정적 팩토리 메서드(static factory method)](https://johngrib.github.io/wiki/static-factory-method-pattern/)
- [흔적s](https://iamreo.tistory.com/entry/abstract-factory-pattern)

---
