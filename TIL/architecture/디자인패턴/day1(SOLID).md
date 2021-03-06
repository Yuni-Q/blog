# day1

## SOLID
- 객체지향 설계를 위한 5가지 원칙  
- 결합도는 낮게 응집도는 높게 !!
- 유지보수 용이성, 재사용성, 생산성
- 객체지향 프로그래밍
- 유지보수가 쉬운
- 읽기 쉬운
- 확장이 쉬운

### SRP(Single responsibility principle)
- 단일 책임 원칙
- 한 클래스(함수)는 하나의 책임만 가져야 한다.
- 클래스 코드를 수정할 이유는 하나여야 한다.

#### check point
- 클래스의 인스턴스 변수가 너무 많다.
- 속성과 상관없는 메서드가 많다.
- 클래스나 메서드를 설명하기 위해서 'and, if, or'를 많이 사용한다.

### OCP(Open-closed-principle)
- 개방 폐괘 원칙
- 확장(extension)에 대해 열려 있다.
- 수정(modification)에 대해 닫혀 있다.
- 기능 및 요구사항이 추가될 때 기존 요소의 변경을 최소화
- 개체 지향 프로그래밍의 가장 큰 유연성, 재사용성, 유지보수성을 얻을 수 있다.
- 다형성(?) / 인터페이스 / 구현체를 바꾸면 상위 코드는 바꿀게 없다 / 하위만 바꾸면 수정에 닫혀 있고 확장에 열려 있다고 볼 수 있다.

#### check point
- 새로운 기능이나 케이스가 추가될 때 마다 기존의 코드를 변경해야 한다.
- 자신의 속성보다는 외부의 속성을 의존하고 있지 않은가?(결합도)
- 인터페이스보다는 구현한 타입에 의존하고 있지는 않은가?

## LSP(Liskov substitution principle)
- 리스코프 치환 원칙
- 하위 타입은 기반 타입을 대체할 수 있어야 한다.
- 상속을 사용했을 때 서브클래스는 자신의 슈퍼클래스 대신 사용되도 같은 동작을 해야한다.
- 서브 타입은 그것의 기반 타입으로 치환 가능해야 한다.
- LSP를 위반하면 잠재적인 OCP 위반이다.

#### check point
- 자식클래스에 너무 많은 override가 구현되어 있다.
- 수직적 확장과 수평적 확장 중 어느것이 필요한 상황인지 생각해본다.
- 상속을 사용하면 강한 결합도가 생기기 때문에 주의 필요

### DIP(Dependency inversion principle)
- 의존 관계 역전 원칙
- 상위레벨 모듈은 하위레벨 모듈에 의존하면 안된다.
- 두 모듈은 추상화된 인터페이스(프로토콜)에 의존해야 한다.
- 추상화 된 것은 구체적인 것에 의존하면 안되고, 구체적인 것이 추상화된 것에 의존해야 한다.
- 상위 모듈은 구현체에 의존하면 안된다(구현체가 상위 모듈에 의존해야 한다)
- 어떤 변수도 구현 클래스에 대한 포인터나 참조값을 가져서는 안된다(강함 결합이 될 수 있다) <- 요즘 트렌드와 맞지 않을 수 있다고 생각한다.

#### check point
- 내부적으로 생성하는 하위 모듈이 존재하는가?(주입 X)
- 상위레벨 모듈이 재사용 가능한가?
- 하위레벨 모듈의 구체적인 타입이 존재하는가?

### ISP(Interface segregation principle)
- 인터페이스 분리 원칙
- 클래스 내에서 사용하지 않는 인터페이스는 구현하지 말아야 한다.
- ISP는 인터페이스에 대한 SRP와도 같다(= 인터페이스도 필요한(관련있는) 기능에 따라 분리하자)
- 필요하지 않는 메소드를 분리햐서 필요한 것만 사용해라.

#### check point
- 프로토콜을 채택하고 어쩔 수 없이 의미없는 구현을 하고 있진 않은가?
- 해당 프로토콜이 하나의 역할을 하는가?
