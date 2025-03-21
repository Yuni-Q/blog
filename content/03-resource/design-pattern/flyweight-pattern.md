---
title: flyweight pattern
date: 2021-04-12 08:04:41
category: design pattern
tags: []
draft: true
---

## 구조 패턴

- 구조 패턴 중 하나로, 많은 수의 객체를 생성해야 할 때 사용하는 패턴입니다.
- 구조 패턴이란 작은 클래스들을 `상속과 합성`을 이용하여 더 큰 클래스를 생성하는 방법을 제공하는 패턴입니다.
- 구조 패턴을 사용하면 서로 독립적으로 개발한 클래스 라이브러리를 마치 하나인 양 사용할 수 있습니다. 또, 여러 인터페이스를 합성(Composite)하여 서로 다른 인터페이스들의 통일된 추상을 제공합니다.
- 구조 패턴의 중요한 포인트는 인터페이스나 구현을 복합하는 것이 아니라 `객체를 합성하는 방법을 제공`한다는 것입니다. 이는 컴파일 단계에서가 아닌` 런타임 단계에서 복합 방법이나 대상을 변경할 수 있다`는 점에서 `유연성` 을 갖습니다.

## `공유(Sharing)`를 통하여 대량의 객체들을 효과적으로 지원하는 방법

- 동일하거나 유사한 객체들 사이에 가능한 많은 데이터를 서로 `공유`하여 사용하도록 하여 `메모리 사용량을 최소화`하는 소프트웨어 디자인 패턴입니다. 종종 오브젝트의 일부 상태 정보는 공유될 수 있는데, 플라이웨이트 패턴에서는 이와 같은 상태 정보를 외부 자료 구조에 저장하여 플라이웨이트 오브젝트가 잠깐 동안 사용할 수 있도록 전달한다.
- 플라이웨이트 패턴은, 객체의 내부에서 참조하는 객체를 직접 만드는 것이 아니라, 없다면 만들고, 만들어져 있다면 객체를 공유하는 식으로 객체를 구성하는 방법입니다.
  - 어떤 클래스의 인스턴스 한 개만 가지고 여러 개의 `가상 인스턴스`를 제공하고 싶을 때 사용하는 패턴입니다.
  - 즉 인스턴스를 가능한 대로 공유시켜 쓸데없이 new 연산자를 통한 메모리 낭비를 줄이는 방식입니다.
- 대부분 팩토리 메소드 패턴을 사용해 객체를 생성합니다.
  - 팩토리 메소드 안에서는 객체(Flyweight 객체)를 새로 생성합니다. 이때 생성하는 객체가 내부적으로 참조하는 객체에 대해, 기존에 있는 객체를 참조만 하는 식으로 객체를 구성합니다. 이렇게 하면 객체의 할당에 사용되는 메모리를 줄일 수 있을 뿐 아니라, 객체를 생성하는 시간도 들지 않게 됩니다.
- 중복 생성될 가능성이 높다는 의미는 동일한 자원이 자주 사용될 가능성이 높은 것입니다. 이러한 자원은 공통 자원으로 관리하고 있다가 요청이 있을 때 제공해 주는 것이 좋습니다.
- 생성 비용이 크지만 사용 빈도가 낮은 자원을 미리 생성해 두는 것은 좋지 않습니다. 따라서 요청이 있을 때, 생성해서 제공해 주는 편이 좋습니다.
- 한번 생성된 객체는 두번 생성되지 않고, 풀(Pool)에 의해서 관리 및 사용됩니다.

## 장점

- 객체의 수를 줄입니다.
- 객체가 지속되는 경우에 필요한 메모리 및 저장장치의 양을 줄입니다.
- 많은 객체를 만들때 성능을 향상시킬수 있습니다.
- 많은 객체를 만들때 메모리를 줄일수 있습니다.
- state pattern과 쉽게 결합될 수 있습니다.
- 실행시에 객체 인스턴스의 개수를 줄여서 메모리를 절약할 수 있습니다.
- 여러 `가상` 객체의 상태를 한 곳에 집중시켜놓을 수 있습니다.
- 게임이나 지도처럼 동일한 객체를 특정 속성만 바꿔서 재사용이 가능한 경우에 적용하면 큰 효과를 기대할 수 있습니다.

## 단점

- 특정 인스턴스의 공유 컴포넌트를 다르게 행동하게 하는 것이 불가능합니다.
- 객체의 값을 변경하면 공유받은 `가상` 객체를 사용하는 곳에 영향을 줄 수 있습니다.

## 활용 사례 1

- 많은 수의 객체를 효율적으로 제공하기 위해 `공유개념`을 이용합니다.
  - 어플리케이션이 정말 많은 객체를 사용할 때 사용합니다.
  - 객체 개수가 많아서 저장비용이 높을 때 사용합니다.
  - 대부분의 객체의 상태가 부대적인 것일 때 사용합니다.
  - 부대적인 상태가 제거됐을 때에는 적은 수의 공유 객체로 많은 수의 객체를 대체할 수 있을 때 사용합니다.
  - 어플리케이션이 객체의 identity에 의존적이지 않을 때 사용합니다.

## 활용 사례 2

- `게임`에서 많이 활용됩니다. 게임에는 많은 UI Widget 혹은 component들이 존재하는데, 대부분 일정한 패턴의 UI가 연속되는 경우가 많습니다. 이런 경우 플라이웨이트 패턴을 사용해 하나의 리소스를 여러 객체에서 공유해 사용하는 방식으로 프로그래밍이 작성됩니다.
- 자바의 String pool에서 활용됩니다. 컴파일 타이밍에 스트링 객체로 선언되어있는 것들은 jvm heap 메모리의 permermant 영역으로 들어가게 됩니다. 만약 같은 내용의 String 객체가 선언되어있다고 하더라도 새로 permernant 영역에 String 객체에 써지는 것이 아니라 기존의 String객체를 참조하는 식으로 됩니다.
- 자바의 모든 래퍼 클래스의 valueOf() 메소드에 사용됩니다.

## 구성요소

### Flyweight(플라이급)

- 공유에 사용할 클래스들의 인터페이스(API)를 선언합니다.

```ts
interface Shape {
  draw: () => void;
}
```

### ConcreteFlyweight(구체적인 플라이급)의 역할

- Flyweight의 내용을 정의합니다. 실제 공유될 객체입니다.

```ts
class Circle implements Shape {
  color: string;
  x: number;
  y: number;
  radius: number;

  constructor(color: string) {
    this.color = color;
  }

  setColor(color: string) {
    this.color = color;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  draw() {
    console.log(
      `Circle color: ${this.color}, x: ${this.x}, y: ${this.y}, radius: ${this.radius}`,
    );
  }
}
```

### FlyweightFactory(플라이급의 공장)의 역할

- 해당 공장을 사용해서 Flyweight의 인스턴스를 생성 또는 공유해주는 역할을 합니다.

```ts
class ShapeFactory {
  static circleMap = new Map();

  static getCircle(color: string): Circle {
    let circle = this.circleMap.get(color);
    if (circle) {
      return circle;
    }
    circle = new Circle(color);
    this.circleMap.set(color, circle);
    console.log(`새로운 객체 생성: ${color}`);
    return circle;
  }
}
```

### Client(클라이언트)의 역할

- 해당 패턴의 사용자 입니다.

```ts
const colors = ['red', 'green', 'blue', 'yellow'];
for (let i = 0; i < 10; i += 1) {
  const color = colors[Math.floor(Math.random() * 4)];
  const circle = ShapeFactory.getCircle(color);
  circle.setX(Math.floor(Math.random() * 100));
  circle.setY(Math.floor(Math.random() * 4));
  circle.setRadius(Math.floor(Math.random() * 10));
  circle.draw();
}
```

## 관련 패턴

- 팩토리패턴과 비슷하나 생성목록에 없는 새로운 것을 만들경우 이벤트를 추가합니다.
- Proxy 패턴 : Flyweight 패턴에서는 인스턴스의 생성에 시간이 걸리는 경우, 인스턴스의 공유에 따라서 처리 속도가 향상됩니다.
- Composite 패턴 : Flyweight 패턴을 사용해서 Composite 패턴의 Leaf 역할을 공유시킬 수 있는 경우가 있습니다.
- Singleton 패턴 : FlyweightFactory를 Singleton으로 구현하는 경우가 있습니다.

---

## 참고

- [플라이웨이트 패턴(Flyweight Pattern) - 자바 디자인 패턴과 JDK예제](https://m.blog.naver.com/2feelus/220669069127)
- [\[디자인패턴/Design Pattern\] Flyweight Pattern / 플라이웨이트 패턴](https://lee1535.tistory.com/106)
- [\[구조 패턴\] 플라이웨이트 패턴(Flyweight Pattern) 이해 및 예제](https://readystory.tistory.com/137)
- [\[구조 패턴\] Flyweight pattern (플라이웨이트 패턴)](https://kunoo.tistory.com/entry/구조-패턴-Flyweight-pattern-플라이웨이트-패턴)
