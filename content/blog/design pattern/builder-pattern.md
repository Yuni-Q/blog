---
title: builder pattern
date: 2021-03-07 12:03:46
category: design pattern
tags: ['design pattern']
draft: true
---

## 빌더 패턴은 생성 패턴(Creational Pattern) 중 하나이다.

- 빌더 패턴은 싱글톤 패턴, 팩토리 패턴, 추상 팩토리 패턴과 마찬가지로 생성 패턴에 속합니다.
- 생성 패턴은 `인스턴스를 만드는 절차를 추상화`하는 패턴입니다.
- 생성 패턴에 속하는 패턴들은 `객체를 생성, 합성하는 방법이나 객체의 표현 방법`을 `시스템과 분리`해줍니다.
- 생성 패턴은 시스템이 상속(inheritance) 보다 `복합(composite)` 방법을 사용하는 방향으로 진화되어 가면서 더 중요해지고 있습니다.

### 생성 패턴에서는 중요한 이슈가 두 가지 있습니다.

1. 생성 패턴은 시스템이 어떤 Concrete Class를 사용하는지에 대한 정보를 캡슐화합니다.
2. 생성 패턴은 이들 클래스의 인스턴스들이 어떻게 만들고 어떻게 결합하는지에 대한 부분을 완전히 가려줍니다.

- 쉬운 말로 정리하자면, 생성 패턴을 이용하면 무엇이 생성되고, 누가 이것을 생성하며, 이것이 어떻게 생성되는지, 언제 생성할 것인지 결정하는 데 유연성을 확보할 수 있게 됩니다.

## 빌더 패턴이 해결해야 할 문제에 대해 알아보겠습니다.

- 불필요한 생성자를 만들지 않고 객체를 만들어야 합니다.
- 데이터의 순서에 상관 없이 객체를 만들어야 합니다.
- 사용자가 봤을때 명시적이고 이해할 수 있어야 합니다.

## 빌더 패턴은 객체의 생성 방법과 표현 방법을 분리합니다.

- 빌더 패턴은 복잡한 객체를 생성하는 방법을 정의하는 클래스와 표현하는 방법을 정의하는 클래스를 별도로 분리하여, 서로 다른 표현이라도 이를 생성할 수 있는 동일한 절차를 제공하는 패턴입니다. 빌더 패턴은 생성해야 되는 객체가 `Optional한 속성을 많이 가질 때` 빛을 발휘합니다.

## 객체 생성을 유연하게 !

- 인자가 설정된 빌더는 훌륭한 추상적 팩토리입니다.
- 인터페이스를 만들고, 빌더 클래스가 implements 하게 하면 됩니다.

## 빌더 패턴의 장점

- 빌터 패턴을 쓰면 코드 읽기/유지보수가 편해집니다.
  - 빌터 패턴을 쓰면 객체 생성이 깔끔하고 유연해집니다.
- 데이터의 순서에 상관없이 객체 생성이 가능합니다. 이로인해 클래스와 사용 대상의 결합도를 낮춰집니다.
- 생성자에 인자 변화에 유연하게 대처할 수 있습니다.
- 생성자에 전달하는 인수에 의미를 부여 할 수 있습니다.
  - 명시적 선언으로 이해하기 쉽습니다.
- setter 메소드가 없으므로 변경 불가능 객체를 만들 수 있다.
- build() 함수가 잘못된 값이 입력되었는지 검증하게 할 수도 있습니다.
- 한 번에 객체를 생성하므로 객체 일관성이 깨지지 않습니다.
- 빌더 패턴을 사용하면 하나의 빌더 객체로 여러 객체를 만드는 것도 가능합니다.
- 불필요한 생성자 제거됩니다.

## 부가적인 정보

- 빌더 클래스를 꼭 객체를 만들어낼 클래스와 분리할 필요는 없습니다. 객체를 만들어낼 클래스 내부에 빌더 클래스를 포함할 수 있습니다. 물론 Builder() 메소드는 static으로 선언하고 빌더 클래스를 반환해주면 됩니다.

## 팩토리 패턴 vs 빌더 패턴

- 빌더 패턴도 새로운 객체를 만들어서 반환하는 패턴이긴 하지만 실제 `동작 방식`은 조금 다릅니다.
- 빌더 패턴은 생성자에 들어갈 매개 변수가 많든 적든 `차례차례 매개 변수를 받아들이고` 모든 매개 변수를 받은 뒤에 이 변수들을 통합해서 한번에 사용을 합니다.
- 팩토리 패턴이나 추상 팩토리 패턴에서는 생성해야하는 클래스에 대한 속성 값이 많을 때 아래와 같은 이슈들이 있습니다.
  - 클라이언트 프로그램으로부터 팩토리 클래스로 많은 파라미터를 넘겨줄 때 타입, 순서 등에 대한 관리가 어려워져 에러가 발생할 확률이 높아집니다.
  - 경우에 따라 필요 없는 파라미터들에 대해서 팩토리 클래스에 일일이 null 값을 넘겨줘야 합니다.
  - 생성해야 하는 sub class가 무거워지고 복잡해짐에 따라 팩토리 클래스 또한 복잡해집니다.
- 빌더 패턴은 이러한 문제들을 해결하기 위해 별도의 빌더 클래스를 만들어 필수 값에 대해서는 생성자를 통해, 선택적인 값들에 대해서는 메소드를 통해 `step-by-step`으로 값을 입력받은 후에 build() 메소드를 통해 최종적으로 하나의 인스턴스를 리턴하는 방식입니다.

## 빌더 패턴을 구현하는 방법은 아래와 같습니다.

- 빌더 클래스를 `Static Nested Class`로 생성합니다. 이때, 관례적으로 생성하고자 하는 클래스 이름 뒤에 Builder를 붙입니다.
- 빌더 클래스의 생성자는 public으로 하며, `필수 값들에 대해 생성자의 파라미터`로 받습니다.
- `옵셔널한 값들에 대해서는 각각의 속성마다 메소드`로 제공하며, 이때 중요한 것은 메소드의 `리턴 값이 빌더 객체 자신`이어야 합니다.
- 마지막 단계로, 빌더 클래스 내에 `build() 메소드를 정의하여 클라이언트 프로그램에게 최종 생성된 결과물을 제공`합니다. 이렇듯 build()를 통해서만 객체 생성을 제공하기 때문에 `생성 대상이 되는 클래스의 생성자는 private으로 정의`해야 합니다.
- 여기서 중요한 점은 생성 대상이 되는 클래스는 setter 메소드 없이 getter 메소드만 가진다는 것과 public 생성자가 없다는 것입니다. 그렇기 때문에 생성 대상이 되는 객체를 얻기 위해서는 오직 Builder 클래스를 통해서만 가능합니다.

## 코드

```ts
interface IUser {
  name: string | null;
  location: string | null;
  age: number | null;
}

class User implements IUser {
  name: string = null;
  location: string = null;
  age: number = null;
  private constructor(build: IUser) {
    this.name = build.name;
    this.location = build.location;
    this.age = build.age;
  }
  static UserBuild = class implements IUser {
    name: string = null;
    location: string = null;
    age: number = null;
    constructor(name: string) {
      this.name = name;
    }
    setLocation(location: string) {
      this.location = location;
      return this;
    }
    setAge(age: number) {
      this.age = age;
      return this;
    }
    build() {
      return new User(this);
    }
  };
}

const user = new User.UserBuild('yuni').setLocation('seoul').setAge(30);
console.log(user); // class_1 { name: 'yuni', location: 'seoul', age: 30 }
```

## 빌더 이전에 고려되었던 패턴들에 대해서도 살펴 보겠습니다.

### 점층적 생성자 패턴

- 여러개의 생성자를 통해 객체를 생성합니다.
  - 단, js에서는 다중 생성자 패턴을 지원하지 않습니다.

1. 필수 인자를 받는 필수 생성자를 하나 만든다.
2. 1 개의 선택적 인자를 받는 생성자를 추가한다.
3. 2 개의 선택적 인자를 받는 생성자를 추가한다.
4. …반복
5. 모든 선택적 인자를 다 받는 생성자를 추가한다.

#### 장점

- new Member("yuni", "seoul", 30) 같은 호출이 빈번하게 일어난다면, new Member("yuni")로 대체할 수 있습니다.

#### 단점

- 다른 생성자를 호출하는 생성자가 많으므로, 인자가 추가되는 일이 발생하면 코드를 수정하기 어렵습니다.
- 코드 가독성이 떨어집니다.
  - 특히 인자 수가 많을 때 호출 코드만 봐서는 의미를 알기 어렵습니다.

### 자바빈 패턴

- 이 패턴은 setter메서드를 이용해 생성 코드를 읽기 좋게 만듭니다.

```ts
class User {
  name: string;
  location: string;
  age: number;
  setName(name: string) {
    this.name = name;
  }
  setLocation(location: string) {
    this.location = location;
  }
  setAge(age: number) {
    this.age = age;
  }
}

const user = new User();
user.setName('yuni');
user.setLocation('seoul');
user.setAge(30);
```

#### 장점

- 이제 각 인자의 의미를 파악하기 쉬워집니다.
- 복잡하게 여러 개의 생성자를 만들지 않아도 됩니다.

#### 단점

- 객체 일관성(consistency)이 깨집니다.
  - 1회의 호출로 객체 생성이 끝나지 않습니다.
  - 즉 한 번에 생성하지 않고 생성한 객체에 값을 계속 수정하고 있습니다.
- setter 메서드가 있으므로 변경 불가능(immutable)클래스를 만들 수가 없습니다.
  - 스레드 안전성을 확보하려면 점층적 생성자 패턴보다 많은 일을 해야 합니다.

## GoF 디자인 패턴의 빌더 패턴

- 복잡한 객체를 생성하는 방법과 표현(조립)하는 방법을 정의하는 클래스를 별도로 분리하여 서로 다른 표현이라도 이를 생성할 수 있는 동일한 구축 공정(절차)을 제공할 수 있도록 합니다.
- 객체를 생성하는 방법, 객체를 표현하는 방법을 분리합니다.

### 참여 객체는 다음과 같다.

- Builder : 빌더 인터페이스입니다.
- ConcreteBuilder : 빌더 인터페이스 구현체입니다. 부품을 합성하는 방식에 따라 여러 구현체를 만듭니다.
- Director : Builder를 사용해 객체를 생성합니다.
- Product : Director가 Builder로 만들어낸 결과물입니다.

## 도식화

- builder 는 부품을 만들고, director 는 builder가 만든 부품을 조합해 제품을 만든다고 할 수 있다.

| -                        | 평범한 방/문을 만드는 Builder | 레고로 방/문을 만드는 Builder |
| ------------------------ | ----------------------------- | ----------------------------- |
| 아파트를 만드는 Director | 평범한 아파트                 | 레고로 만든 아파트            |
| 주택을 만드는 Director   | 평범한 주택                   | 레고로 만든 주택              |
| 학교를 만드는 Director   | 평범한 학교                   | 레고로 만든 학교              |

### Builder 인터페이스

```ts
interface HouseBuilder {
  buildRoom: (roomNumber: number) => void;
  buildDoor: (oneRoomNumber: number, theOtherRoomNumber: number) => void;
  getHouse: () => House;
}
```

### Builder 구현체

- 빌더 구현체는 방과 문, 미로를 만듭니다.
- 방과 문을 몇 개를 만들고 어떤 순서로 조합하는지를 아는 것은 디렉터의 일입니다.
- 다음과 같이 목적에 따라 여러 가지로 만들 수 있습니다.

```ts
class ModernHouseBuilder implements HouseBuilder {
  private house: House = new House();

  public buildRoom(roomNumber: number): void {
    house.addRoom(roomNumber);
  }

  public buildDoor(oneRoomNumber: number, theOtherRoomNumber: number): void {
    if (house.oneRoomNumber && house.theOtherRoomNumber) {
      house.addDoor(oneRoomNumber, theOtherRoomNumber);
    }
  }

  public getHouse(): House {
    return house;
  }
}
```

### Director

- 디렉터는 빌더에게 방을 몇 개 만들고, 문을 몇 개 만들 것을 지시하여 미로를 완성합니다.
- 빌더는 시키는대로 방과 문만 잘 만들면 됩니다.

```ts
class Director {
  private builder: HouseBuilder;

  constructor(builder: HouseBuilder) {
    this.builder = builder;
  }

  construct(): House {
    this.builder.buildRoom(1);
    this.builder.buildRoom(2);
    this.builder.buildDoor(1, 2);
    return this.builder.getHouse();
  }
}
```

### Client

```ts
const director: Director = new Director(new ModernHouseBuilder());
const house: House = director.construct();
```

---

## 참고

- [빌더 패턴(Builder Pattern)](https://johngrib.github.io/wiki/builder-pattern/)
- [빌더 패턴(Builder Pattern)](https://jdm.kr/blog/217)
- [\[생성 패턴\] 빌더 패턴(Builder pattern) 이해 및 예제](https://readystory.tistory.com/121)
- [\[GoF 디자인 패턴\] 2. 빌더 패턴](https://medium.com/@sangw0804/gof-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-2-%EB%B9%8C%EB%8D%94-%ED%8C%A8%ED%84%B4-3c56dc766d3b)
