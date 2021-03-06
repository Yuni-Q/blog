---
title: dependency injection pattern
date: 2021-04-15 10:04:93
category: design pattern
tags: [design pattern]
draft: false
---

## Object Dependencies(객체 의존성)

- 현재 객체가 다른 객체와 상호작용(참조)하고 있다면 현재 객체는 다른 객체에 의존성을 가집니다.
- 하나의 모듈이 바뀌면 의존한 다른 모듈까지 변경 되어야 합니다. 또한 두 객체 사이의 의존성이 존재하면 Unit Test 작성이 어려워집니다.
- `의존성`은 서비스로 사용할 수 있는 객체입니다.

## Dependency Injection(의존성 주입)

- 의존성 주입은 `역 제어(Inversion of Control, IOC) 테크닉의 한 형태`로 어떤 서비스를 호출하려는 컴포넌트는 그 서비스가 어떻게 구성되었는지 알지 못해야 합니다.
- 클라이언트가 어떤 서비스를 사용할 것인지 지정하는 대신, 클라이언트에게 무슨 서비스를 사용할 것인지를 말(주입)해주는 것이다.
  - `주입`은 의존성(서비스)을 사용하려는 객체(클라이언트)로 전달하는 것을 의미합니다. 서비스는 클라이언트 상태의 일부입니다. 클라이언트가 서비스를 구축하거나 찾는 것을 허용하는 대신 클라이언트에게 서비스를 전달하는 것이 패턴의 기본 요건입니다.
- 클래스 간의 의존관계가 있을 때 `컴파일 타임의 의존관계를 제거`하고 `런타임 의존관계`로 만들어 주고 `결합도(coupling)을 낮춰주는 것`이 Dependency Injection입니다.
- 컴포넌트는 서비스 제공에 대한 책임을 `외부 코드(Injector)에게 위임`하고 Injector는 이미 존재하거나 Injector에 의해 생성된 서비스를 컴포넌트에게 주입하고 컴포넌트는 서비스를 사용합니다. 이는 `컴포넌트가 Injector와 서비스에 대해 알 필요가 없음`을 의미합니다. 컴포넌트는 서비스의 인터페이스에 대해서만 알면 되고 이는 `구성의 책임으로부터 사용의 책임을 구분`합니다.
- Dependency Injection은 프로그램의 디자인이 `느슨하게 커플링`되도록 하고, `의존관계 역전 원칙(Dependency Inversion Principle)`과 `단일 책임 원칙(single responsibility principles)`을 따르도록 클라이언트의 생성에 대한 의존성을 클라이언트의 행위로부터 분리하는 것입니다. 이는 클라이언트가 의존성을 찾기 위해 그들이 사용하는 시스템에 대해 알도록 하는 서비스 로케이터 패턴(service locator pattern)과 정반대되는 것입니다.
- 의존성 주입은 컴포지션을 통해 IoC를 구현하므로 종종 전략 패턴과 동일하지만, 전략 패턴의 의도는 객체의 수명동안 의존성을 교환할 수 있도록 하는 것이고, 의존성 주입에서는 단일 의존성 인스턴스만 사용할 수 있도록 하는 것입니다.
  - 싱글턴과 전략패턴과 연관이 있어 보입니다.

### 숨겨진 의존성은 나쁘다

- 의존성 주입 외에도 의존성을 해결할 수 있는 다양한 방법이 존재합니다. 가장 널리 사용되는 대표적인 방법은 `SERVICE LOCATOR` 패턴입니다.
  - 서비스 로케이터의 기본 아이디어는 각각 서비스별(ServiceClass) 서로 결합도를 낮추고, 어플리케이션이 필요로 하는 모든 서비스들을 포함하고 있는 객체를 갖는 것이니다. 즉, 서비스(의존성)를 찾아주는(=locate) 녀석을 전역에 만들어놓고 사용하여, 의존성을 관리합니다. DI 와 다르게, 의존성을 찾아 씁니다.
- `SERVICE LOCATOR`는 의존성을 해결할 객체들을 보관하는 일종의 저장소입니다. 외부에서 객체에게 의존성을 전달하는 의존성 주입과 달리 `SERVICE LOCATOR`의 경우 객체가 직접 `SERVICE LOCATOR`에게 의존성을 해결해줄 것을 요청합니다. SERVICE LOCATOR 패턴은 서비스를 사용하는 코드로부터 서비스가 누구인지(서비스를 구현한 구체 클래스의 타입이 무엇인지), 어디에 있는지(클래스 인스턴스를 어떻게 얻을지)를 몰라도 되게 해줍니다. `SERVICE LOCATOR` 패턴의 가장 큰 단점은 의존성을 감춥니다.
- 의존성을 구현 내부로 감출 경우 의존성과 관련된 문제가 `컴파일타임이 아닌 런타임에 가서야 발견된다는 사실을 알 수 있습니다`.
- 숨겨진 의존성은 의존성의 대상을 설정하는 시점과 의존성이 해결되는 시점을 멀리 떨어뜨려 놓습니다. 이것은 코드를 이해하고 디버깅 하기 어렵게 만듭니다.
- 핵심은 `명시적인 의존성이 숨겨진 의존성보다 좋다`는 것입니다. 가급적 `의존성을 객체의 퍼블릭 인터페이스에 노출`합니다. 의존성을 구현 내부에 숨기면 숨길수록 코드를 이해하기도, 수정하기도 어려워집니다.
- 어쩔수 없이 SERVICE LOCATOR 패턴을 사용해야 하는 경우도 있습니다. 의존성 주입을 지원하는 프레임워크를 사용하지 못하는 경우나 깊은 호출 계층에 걸쳐 동일한 객체를 계속해서 전달해야 하는 고통을 견디기 어려운 경우에는 어쩔수 없이 SERVICE LOCATOR 패턴을 사용하는 것을 고려합니다.
- 가능하다면 의존성을 명시적으로 표현할 수 있는 기법을 사용합니다.
  - `의존성 주입은 의존성을 명시적으로 명시할 수 있는 방법 중 하나`일 뿐입니다.
  - 요점은 `명시적인 의존성`에 초점을 맞추는 것입니다.
  - 이 방법이 유연성을 향상시키는 가장 효과적인 방법입니다.

### SRP(Single Responsibility Principle, 단일 책임 원칙)

- 소프트웨어의 설계 부품은 단 하나의 책임만을 가져야 합니다.
- 즉 소프트웨어를 수정할 이유가 오직 하나여야 합니다.

### DIP(Dependency Inversion Principle, 의존관계 역전 원칙)

- 첫 번째, 상위 모듈은 하위 모듈에 의존해서는 안 됩니다. 둘 다 `추상화`에 의존해야 합니다.
- 두 번째, 추상화는 `세부사항에 의존하지 않습니다`. 세부사항이 추상화에 의존하여 달라져야 합니다.
- 의존 관계를 맺을 때, 변화하기 쉬운 것보단 변화하기 어려운 것에 의존해야 합니다.
  - 이때 변화하기 쉬운 것이란 구체적인 것을 말하고, 변화하기 어려운 것이란 추상적인 것을 말합니다.
  - 객체지향 관점에서 변화하기 쉬운 것이란 구체화된 클래스를 말하고, 변화하기 어려운 것이란 인터페이스를 의미합니다.
- DIP를 만족한다는 것은 의존관계를 맺을 때, 상위 모듈(클라이언트 클래스)는 하위 모듈(서비스 클래스)이 되는 구체적인 클래스보다 인터페이스나 추상 클래스와 관계를 맺는다는 것을 의미합니다.
- DIP를 만족하면 Dependency Injection 패턴을 적용해서 변화에 유연한 설계를 할 수 있습니다.
- 이 원칙은 `상위와 하위 객체 모두가 동일한 추상화에 의존해야 한다`는 객체 지향적 설계의 대원칙을 제공합니다.
- DI는 `DIP를 구현하는 기법중 하나라`고 생각 할 수 있습니다.
  - DI는 의존성을 어떻게 가질 것인가? DIP는 실체에 의존할 것인가, 추상화에 의존할 것인가의 문제라고 생각됩니다.

#### 의존성 역전 원칙과 패키지

- 역전은 의존성의 방향뿐만 아니라 인터페이스의 소유권에도 적용됩니다. 객체지향 프로그래밍 언어에서 어떤 구성 요소의 소유권을 결정하는 것은 모듈입니다.
- `SEPARATED INTERFACE 패턴`
  - 추상화를 별도의 독립적인 패키지가 아니라 클라이언트가 속한 패키지에 포함시켜야 합니다.
  - 함께 재사용될 필요가 없는 클래스들은 별도의 독립적인 패키지에 모아야 합니다.
- 의존성 역전 원칙에 따라 상위 수준의 협력 흐름을 재사용하기 위해서는 추상화가 제공하는 인터페이스의 소유권 역시 역전시켜야 합니다.
- 훌륭한 객체지향 설계를 위해서는 의존성을 역전시켜야 합니다. 그리고 의존성을 역전시켜야만 유연하고 재사용 가능한 설계를 얻을 수 있습니다.

### IoC(제어의 역전)

- 역제어(IoC)는 DI보다 더 일반적입니다.
- 객체 자체가 아니라 `Framework에 의해 객체의 의존성이 주입되는 설계 패턴`입니다. Framework에 의해 동적으로 주입되므로 여러 객체 간의 결합이 줄어듭니다.
- IoC는 호출을 요구하는 대신 다른 코드가 호출할 수 있게 함을 의미합니다.
- 제어 반전, 제어의 반전, 역제어는 프로그래머가 작성한 프로그램이 재사용 라이브러리의 흐름 제어를 받게 되는 소프트웨어 디자인 패턴을 말합니다. 줄여서 IoC(Inversion of Control)이라고 부릅니다. 전통적인 프로그래밍에서 흐름은 프로그래머가 작성한 프로그램이 외부 라이브러리의 코드를 호출해 이용합니다. 하지만 제어 반전이 적용된 구조에서는 외부 라이브러리의 코드가 프로그래머가 작성한 코드를 호출합니다. 설계 목적상 제어 반전의 목적은 다음과 같습니다.
  - 작업을 구현하는 방식과 작업 수행 자체를 분리합니다.
  - 모듈을 제작할 때, 모듈과 외부 프로그램의 결합에 대해 고민할 필요 없이 모듈의 목적에 집중할 수 있습니다.
  - 다른 시스템이 어떻게 동작할지에 대해 고민할 필요 없이, 미리 정해진 협약대로만 동작하게 하면 됩니다.
  - 모듈을 바꾸어도 다른 시스템에 부작용을 일으키지 않습니다.
- 이 관계에서 제어가 역전되었다고 표현하는데 같은 맥락에서 `팩토리 메소드`와 `템플리 메소드 패턴` 역시 IoC를 설명하는 예 중 하나입니다.
- IoC는 제어의 역전에 관한 소프트웨어 용어로 `누가 작업을 수행하느냐`가 포인트입니다.

## 의존성 주입은 다음과 같은 문제를 해결합니다.

- 어떻게 애플리케이션이나 클래스가 객체의 생성 방식과 독립적일 수 있는가?
- 어떻게 객체의 생성 방식을 분리된 구성 파일에서 지정할 수 있는가?
- 어떻게 애플리케이션이 다른 구성을 지원할 수 있는가?

## 의존성 주입은 네 가지 역할을 포함한다.

- 사용될 서비스 객체
- 사용하는 서비스에 의존하는 클라이언트 객체
- 클라이언트의 서비스 사용 방법을 정의하는 인터페이스
- 서비스를 생성하고 클라이언트로 주입하는 책임을 갖는 주입자

## 의존성 주입 방법

- 생성자 주입 : 필요한 의존성을 모두 포함하는 클래스의 생성자를 만들고 그 생성자를 통해 의존성을 주입합니다.
- 세터(Setter)를 통한 주입 : 의존성을 입력받는 세터(Setter) 메소드를 만들고 이를 통해 의존성을 주입합니다.
- 인터페이스(Interface)를 통한 주입 : 의존성을 주입하는 함수를 포함한 인터페이스를 작성하고 이 인터페이스를 구현하도록 함으로써 실행시에 이를 통하여 의존성을 주입합니다.

### 생성자 주입(constructor injection)

- 객체를 생성하는 시점에 생성자를 통한 의존성을 해결하는 방법입니다.

### setter 주입(setter injection)

- 객체 생성 후 setter 메서드를 통한 의존성을 해결하는 방법입니다.
- setter 주입의 장점은 의존성의 대상을 `런타임에 변경`할 수 있다는 것입니다.
  - 생성자 주입을 통해 설정된 인스턴스는 객체의 생명주기 전체에 걸쳐 관계를 유지하는 반면, setter 주입은 언제라도 의존 대상을 교체할 수 있습니다.
- setter 주입의 단점은 객체가 올바로 생성되기 위해 어떤 의존성이 `필수적인지를 명시적으로 표현할 수 없다`는 것입니다.
  - setter 메서드는 객체가 생성된 후에 호출돼야 하기 때문에 setter 메서드 호출을 누락한다면 객체는 비정상적인 상태로 생성될 것입니다.

### 인터페이스 주입(interface injection)

- 인터페이스 주입의 기본 개념은 주입할 의존성을 명시하기 위해 인터페이스를 사용하는 것입니다.
  - 인터페이스 주입은 근본적으로 setter 주입이나 프로퍼티 주입과 동일합니다. 단지 `어떤 대상을 어떻게 주입할 것인지를 인터페이스를 통해 명시적으로 선언`한다는 차이만 있을 뿐입니다. 인터페이스 주입은 의존성 주입이 도입되던 초창기에 자바 진영에서 만들어진 몇몇 프레임워크에서 의존성 대상을 좀 더 명시적으로 정의하고 편하게 관리하기 위해 도입한 방법입니다. 따라서 약간의 구현적인 관점을 덜어내고 의존성 주입이 가지는 목적과 용도라는 본질적인 측면에서 바라보면 인퍼테이스 `주입은 setter 주입과 프로퍼티 주입의 변형`으로 볼 수 있습니다.

### 메서드 주입(method injection)

- 메서드 실행 시 인자를 이용한 의존성을 해결하는 방법입니다.
- 메서드 주입은 `메서드 호출 주입(method call injection)`이라고도 부르며 메서드가 의존성을 필요로 하는 유일한 경우일 때 사용할 수 있습니다.
- 생성자 주입을 통해 의존성을 전달받으면 객체가 올바른 상태로 생성되는 데 필요한 의존성을 명확하게 표현할 수 있다는 장점이 있지만 주입된 의존성이 한 두개의 메서드에서만 사용된다면 각 메서드의 인자로 전달하는 것이 더 나은 방법일 수 있습니다.
- 메서드 주입을 의존성 주입의 한 종류로 볼 것인가에 대해서는 논란의 여지가 있습니다.

## 장점

- 의존성 주입의 의도는 객체의 `생성과 사용의 관심을 분리`하는 것이다.
- 코드의 재사용성 증가 및 코드 단순화
  - 만약 특정 객체를 여러 클라이언트에서 의존한다면 각 클라이언트가 특정 객체를 모두 구현할 필요없이 서비스가 이를 한 번만 구현하여 여러 클라이언트에게 의존성을 주입해주어 효율적입니다.
- 리펙토링의 과정 수월
  - 특정 객체에 의존성이 존재하는 클라이언트와 특정 객체를 필요로하는 클라이언트에게 간접적으로 의존성을 주입하는 서비스의 모듈이 체계적으로 분리되어 리펙토링 과정에서 조금 더 수월합니다.
- 보일러 코드 감소
  - 특정 객체를 필요로하는 클라이언트가 직접적으로 그 객체를 구현하지 않고 주입 받는 형식으로 이루어지기 때문에 필요할 때만 데이터를 전달받아 보일러 코드와 같이 메모리 누수 현상을 막을 수 있습니다.
- 프로그램 테스트 용이
  - 프로그램 내의 각 모듈들이 체계적으로 분리되어 Unit Test를 보다 더 쉽게 진행할 수 있습니다.

## 비지터 패턴과는 조금의 차이가 있다고 합니다.

## 참고

- [\[Design Pattern\] DI란 (Dependency Injection)](https://gmlwjd9405.github.io/2018/11/09/dependency-injection.html)
- [\[Design Pattern\] Dependency Injection](https://iamsjy17.github.io/design%20pattern/2020/05/30/designpattern_dependency_injection.html)
- [의존성 주입](https://ko.wikipedia.org/wiki/%EC%9D%98%EC%A1%B4%EC%84%B1_%EC%A3%BC%EC%9E%85)
- [Dependency Injection 디자인 패턴](https://juyeop.tistory.com/26)
- [\[디자인패턴\] IoC, DI, DIP 용어 정리](https://black-jin0427.tistory.com/194)
