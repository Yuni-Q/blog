---
title: strategy pattern
date: 2021-03-21 09:03:48
category: design pattern
tags: [design pattern]
tags: []
draft: true
---

## 전략 패턴(strategy pattern) 또는 정책 패턴(policy pattern)에 대해 알아 보겠습니다.

## 행위 소프트웨어 디자인 패턴

- 실행 중에 알고리즘을 선택할 수 있게 하는 `행위` 소프트웨어 디자인 패턴입니다.

## 동일 계열의 알고리즘을 정의하고 상호교환이 가능하게 합니다.

- 객체들이 할 수 있는 행위 각각에 대해 전략 클래스를 생성하고, 유사한 행위들을 `캡슐화` 하는 인터페이스를 정의하여, 객체의 행위를 동적으로 바꾸고 싶은 경우 직접 행위를 수정하지 않고 전략을 바꿔주기만 함으로써 행위를 유연하게 확장하는 방법을 말합니다.
  - 클라이언트는 다향한 전략 중에 현재 상황에 적합한 전략을 생성해 컨텍스트에게 전략 객체를 `주입`합니다.
  - 프로젝트 전체에서 변경이 일어나지 않는 부분에서 변경이 일어나는 부분을 찾아서 따로 `캡슐화` 합니다.
- 간단히 말해서 객체가 할 수 있는 행위들 각각을 전략으로 만들어 놓고, 동적으로 행위의 수정이 필요한 경우 전략을 바꾸는 것만으로 행위의 수정이 가능하도록 만든 패턴입니다.
- 특정한 계열의 알고리즘들을 정의하고 각 알고리즘을 캡슐화하며 이 알고리즘들을 해당 계열 안에서 상호 교체가 가능하게 만듭니다. 전략은 알고리즘을 사용하는 클라이언트와는 독립적으로 다양하게 만듭니다.
  - 특정 컨텍스트에서 알고리즘을 별도로 분리하는 설계 방법을 의미합니다.
  - 위임이라는 느슨한 연결을 사용하고 있으므로 알고리즘을 용이하게 교환할 수 있습니다.

## 장점

- 코드 중복을 방지할 수 있습니다.
- 런타임시에 타겟 메소드 변경이 가능합니다.
- 확장성(신규 클래스) 및 알고리즘 변경 용이합니다.
- 컨텍스트 코드의 변경 없이 새로운 전략을 추가할 수 있습니다.
  - 요구사항이 변경되었을 때 기존의 코드를 변경하지 않아도 됩니다. 새로운 전략에 대해서는 새로운 클래스를 통해 관리하기 때문에 `OCP의 원칙`을 준수할 수 있는 패턴입니다.

## 단점

- 추가 인터페이스로 의존성 분산됩니다.

## 전략 패턴(Strategy Pattern)을 구성하는 3가지 요소

- 전략 패턴을 적용하는 데 가장 중요한 것은 전략과 동작 환경에 대한 인터페이스를 충분히 일반화해야 한다는 것입니다. 이로써 이들 일반화된 인터페이스가 어느 정도 범위의 알고리즘을 지원할 수 있어야 합니다. 새로운 알고리즘을 지원하기 위해서 전략이나 배경 인터페이스를 변경할 필요는 없습니다.

### Strategy(전략)

- 전략을 이용하기 위한 인터페이스(API)를 결정합니다.

```ts
interface FlyStrategy {
  fly: () => void;
}
```

### ConcreteStrategy(구체적인 전략)

- Strategy를 실제로 구현하는 역할

```ts
class FlyWithWingStrategy implements FlyStrategy {
  fly() {
    console.log('오리가 날아가고 있습니다.');
  }
}

class FlyNoWayStrategy implements FlyStrategy {
  fly() {
    console.log('이 오리는 날 수 없습니다.');
  }
}
```

### Context(문맥)

- Strategy의 인터페이스(API)를 호출해서 이용하는 역할

```ts
abstract class Duck {
  flyStrategy: FlyStrategy;
  fly() {
    this.flyStrategy.fly();
  }
  swim() {
    console.log('오리가 수영을 합니다.');
  }
  abstract display();

  setFlyStrategy(flyStrategy: FlyStrategy) {
    this.flyStrategy = flyStrategy;
  }
}

class MalarDuck extends Duck {
  display() {
    console.log('청동오리입니다.');
  }
}

class RedHeadDuck extends Duck {
  display() {
    console.log('붉은 머리 오리입니다.');
  }
}
```

### Client

```ts
const mallarDuck = new MalarDuck();
mallarDuck.setFlyStrategy(new FlyWithWingStrategy());
mallarDuck.fly();

mallarDuck.setFlyStrategy(new FlyNoWayStrategy());
mallarDuck.fly();
```

## 관련 패턴

- Flyweight 패턴 : ConcreteStrategy 역할은 해당 패턴을 사용해서 복수의 장소에서 공유가 가능합니다.
- Abstract Factory 패턴 : 알고리즘뿐만 아니라 공장, 부품, 제품을 모두 교체 가능합니다.
- State 패턴 : 비슷한 방식이지만, 알고리즘이 아닌 `상태` 를 변화하는 방식을 위임합니다.

### 템플릿 메소드 패턴과의 비교

- 같은 문제의 해결책으로 `상속을 이용하는 템플릿 메서드 패턴`과 `객체주입을 통한 전략패턴` 중에서 선택하여 적용하시면 됩니다.
- `단일 상속`만이 가능한 경우 상속이라는 제한이 있는 템플릿 메서드 패턴보다는 다양하게 많은 전략을 implements할 수 있는 전략패턴이 많이 사용됩니다.

#### 템플릿

- Template Method : 알고리즘을 서브클래스에서 일부 지정할 수 있으면서 재사용이 가능합니다. 하지만 의존성이 크다는 문제가 있습니다. `재사용`이 핵심입니다.
- 런타임에 타입선택(세트)
- 추상메소드로 의존성 역전
- `조합 폭발이 일어나서 제어 불가능`

#### 전략

- Strategy : 알고리즘을 구성으로 사용합니다. `유연성`이 핵심입니다.
- 런타임에 합성(조립)
- 추가 인터페이스로 의존성 분산
- `의존성 폭발이 일어나지만 제어 가능`

---

## 참고

- [🙈\[디자인패턴\] 전략 패턴 ( Strategy Pattern )🐵](https://victorydntmd.tistory.com/292)
- [Java 디자인패턴 - 전략(Strategy) 패턴](https://niceman.tistory.com/133)
- [\[디자인패턴/Design Pattern\] Strategy 패턴 / 전략 패턴](https://lee1535.tistory.com/93)
