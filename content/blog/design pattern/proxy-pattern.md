---
title: proxy pattern
date: 2021-04-19 22:04:99
category: design pattern
tags: ['design pattern']
draft: true
---

## 프록시 패턴은 구조 패턴 입니다.

- 구조 패턴이란 작은 클래스들을 `상속과 합성을 이용하여 더 큰 클래스를 생성하는 방법을 제공`하는 패턴입니다.
- 구조 패턴을 사용하면 서로 독립적으로 개발한 클래스 라이브러리를 마치 `하나인 양 사용`할 수 있습니다. 또, 여러 인터페이스를 합성(Composite)하여 서로 다른 인터페이스들의 `통일된 추상을 제공`합니다.
- 구조 패턴의 중요한 포인트는 인터페이스나 구현을 복합하는 것이 아니라 `객체를 합성하는 방법을 제공`한다는 것입니다. 이는 컴파일 단계에서가 아닌 `런타임 단계에서 복합 방법이나 대상을 변경`할 수 있다는 점에서 `유연성`을 가집니다.

## 실제 기능을 수행하는 객체(Real Object) 대신 가상의 객체(Proxy Object)를 사용해 로직의 흐름을 제어하는 디자인 패턴입니다.

- Proxy는 대리자, 대변인 이라는 뜻입니다. 대리자, 대변인은 다른 누군가를 대신해서 그 역할을 수행하는 존재입니다.
- 프록시 패턴도 `어떤 일을 대신 시키는 것`입니다.
- 클라이언트 입장에선 실제 실행시킬 클래스 객체의 메서드를 호출하고 반환값을 받는지, 대리자 객체의 메서드를 호출하고 반환값을 받는지 전혀 모르게 처리하는 것입니다.
- 일반적으로 프록시는 `다른 무언가와 이어지는 인터페이스의 역할`을 하는 클래스입니다.
  - 프록시는 어떠한 것(이를테면 네트워크 연결, 메모리 안의 커다란 객체, 파일, 또 복제할 수 없거나 수요가 많은 리소스)과도 인터페이스의 역할을 수행할 수 있습니다.
- 중요한 것은 흐름제어만 할 뿐 `결과값을 조작하거나 변경시키면 안된다는 점입니다.`.
  - 프록시는 자신의 의견을 반영하는 것을 목적으로 하지 않고, 그저 제어의 흐름을 변경하거나 다른 로직을 수행하기 위해 사용하는 것입니다.
- 프록시 클래스는 주체 클래스 경량화된 버전으로 사용되기 때문에 항상 모든 요청을 위임하는 것은 아니고, 보다 실질적인(or독립적인) 요청들을 주체 클래스에 위임하는 것입니다.
- 주체 클래스에게 요청을 위임하기 위해서 프록시는 주체 클래스와 같은 인터페이스를 구현하게 되는데 이는 `Polymorphism(다형성)`을 가지게 됩니다.
  - 이로 인해 OCP, DIP 설계 원칙이 녹아져 있습니다.
- 복합적인 오브젝트들의 다수의 복사본이 존재해야만 하는 상황에서 프록시 패턴은 애플리케이션의 메모리 사용량을 줄이기 위해서 `플라이웨이트 패턴과 결합된 형태`로 나올 수도 있습니다.

## Proxy 패턴에 특징

- 대리자는 `실제 서비스와 같은 이름의 메서드`를 구현합니다. 이때 인터페이스를 사용합니다.
- 대리자는 `실제 서비스에 대한 참조 변수`를 가집니다(합성)
- 대리자는 실제 서비스의 같은 이름을 가진 메서드를 호출하고 그 값을 클라이언트에게 돌려줍니다.
  - 사용자 입장에서는 프록시 객체나 실제 객체나 사용법은 유사하므로 사용성이 좋습니다.
- 대리자는 `실제 서비스의 메서드 호출 전후에도 별도의 로직을 수행`할 수도 있습니다.
  - 원래 하려던 기능을 수행하며 그외의 부가적인 작업(로깅, 인증, 네트워크 통신 등)을 수행하기에 좋습니다.
- 비용이 많이 드는 연산(DB 쿼리, 대용량 텍스트 파일 등)을 실제로 필요한 시점에 수행할 수 있습니다.

## 단점

- 프록시 객체가 중간에 껴있기 때문에, 간혹 응답이 느려질 수 있습니다.(캐싱이 안되어있는 초기 사용의 경우)

## 활용 상황

- 실제 작업을 행하는 오브젝트를 감싸서, 실제 오브젝트를 요청하기 전이나 후에 인가 처리(보호)나, 생성 자원이 많이 드는 작업에 대해 백그라운드 처리(가상), 원격 메소드를 호출하기 위한 작업(원격 프록시) 등을 하는데 사용합니다.
- 기본 객체가 리소스 집약적인 경우. 자잘한 작업들은 프록시 객체가 처리하게 합니다.

## 프록시 패턴의 구성

- Real Object, Proxy Object는 동일한 인터페이스를 구현합니다.
- Proxy Object는 메서드 수행시 실제 객체(Real Object)의 메서드에 위임합니다.

## 프록시의 종류

### 원격 프록시(Remote Proxy)

- 원격 객체에 대한 접근 제어가 가능합니다.
- 프록시 클래스는 로컬에 두고, 주체 클래스는 Remote로 존재하는 경우입니다.
- Google Docs 같은 것이 대표적인 예시입니다. 브라우저는 브라우저대로 필요한 자원을 로컬에 가지고 있고, 또다른 일부 자원은 Google 서버에 있는 형태입니다.

### 가상 프록시(Virtual Proxy)

- 객체의 생성비용이 많이 들어 미리 생성하기 힘든 객체에 대한 접근 및 생성시점 등을 제어합니다.
- 프록시 클래스에서 자잘한 작업들을 처리하고 리소스가 많이 요구되는 작업들이 필요할 때에만 주체 클래스를 사용하도록 구현할 수 있습니다.

### 보호 프록시(Protection Proxy)

- 객체에 따른 접근 권한을 제어해야하는 객체에 대한 접근을 제어할 수 있습니다.

```ts
// 직책 등급(차례대로 조직원, 조직장, 부사장)
enum GRADE {
  Staff,
  Manager,
  VicePresident,
}

// 구성원
interface Employee {
  getName(): string; // 구성원의 이름
  getGrade(): GRADE; // 구성원의 직책
  getInformation(viewer: Employee): string; // 구성원의 인사정보(매개변수는 조회자)
}

// 일반 구성원
class NormalEmployee implements Employee {
  private name: string;
  private grade: GRADE;

  constructor(name: string, grade: GRADE) {
    this.name = name;
    this.grade = grade;
  }

  public getName(): string {
    return this.name;
  }

  public getGrade(): GRADE {
    return this.grade;
  }

  // 기본적으로 자신의 인사정보는 누구나 열람할 수 있도록 되어있습니다.
  public getInformation(viewer: Employee): string {
    return (
      'Display ' +
      this.getGrade() +
      " '" +
      this.getName() +
      "' personnel information."
    );
  }
}

// 인사정보가 보호된 구성원(인사 정보 열람 권한 없으면 예외 발생)
class ProtectedEmployee implements Employee {
  private employee: Employee;

  public ProtectedEmployee(employee: Employee) {
    this.employee = employee;
  }

  public getInformation(viewer: Employee): string {
    // 본인 인사정보 조회
    if (
      this.employee.getGrade() == viewer.getGrade() &&
      this.employee.getName() === viewer.getName()
    ) {
      return this.employee.getInformation(viewer);
    }

    switch (viewer.getGrade()) {
      case GRADE.VicePresident:
        // 부사장은 조직장, 조직원들을 볼 수 있다.
        if (
          this.employee.getGrade() === GRADE.Manager ||
          this.employee.getGrade() === GRADE.Staff
        ) {
          return this.employee.getInformation(viewer);
        }
        break;
      case GRADE.Manager:
        if (this.employee.getGrade() === GRADE.Staff) {
          // 조직장은 조직원들을 볼 수 있다.
          return this.employee.getInformation(viewer);
        }
        break;
      case GRADE.Staff:
      default:
        throw new Error('error'); // 조직원들은 다른 사람의 인사정보를 볼 수 없다.
    }
  }

  public getName(): string {
    return employee.getName();
  }

  public getGrade(): GRADE {
    return employee.getGrade();
  }
}
```

### 방화벽 프록시

- 일련의 네트워크 자원에 대한 접근을 제어함으로써 주 객체를 나쁜 클라이언트들로부터 보호하는 역할을 합니다.
- 프록시는 기본 객체와 요청 사이에 있기 때문에, 일종의 방패(보안)의 역할도 합니다.

### 스마트 레퍼런스 프록시 (Smart Reference Proxy)

- 주 객체가 참조될 때마다 추가 행동을 제공합니다.
  - ex) 객체 참조에 대한 선 작업, 후 작업 등
- 기본 객체에 대한 수정 없이, 클라이언트에서의 사용과 기본 객체 사이에 일련의 로직을 프록시 객체를 통해 넣을 수 있습니다.

```ts
interface IService {
  runSomething(): string;
}

class Service implements IService {
  runSomething(): string {
    return 'Service';
  }
}

class Proxy implements IService {
  service: IService;
  runSomething(): string {
    console.log('호출에 대한 흐름 제어가 주목적, 반환 결과를 그대로 전달');
    this.service = new Service();
    return this.service.runSomething();
  }
}

const proxy = new Proxy();
console.log(proxy.runSomething());
```

### 캐싱 프록시 (Caching Proxy)

- 비용이 많이 드는 작업의 결과를 임시로 저장 하고, 추후 여러 클라이언트에 저장된 결과를 실제 작업처리 대신 보여주고 자원을 절약하는 역할을 합니다.

### 동기화 프록시 (Synchronization Proxy)

- 여러 스레드에서 주 객체에 접근하는 경우에 안전하게 작업을 처리할 수 있게 해줍니다. 주로 분산 환경에서 일련의 객체에 대한 동기화 된 접근을 제어해주는 자바 스페이스에서 쓰입니다.

### 복잡도 숨김 프록시 (Complexity Hiding Proxy)

- 복잡한 클래스들의 집합에 대한 접근을 제어하고, 복잡도를 숨깁니다.

### 지연 복사 프록시 (Copy-On-Write Proxy)

- 클라이언트에서 필요로 할 때까지 객체가 복사되는 것을 지연시킴으로써 객체의 복사를 제어합니다. `변형된 가상 프록시`라고 할 수 있으며, Java5의 CopyOnWriteArrayList에서 쓰입니다.

## 데코레이터 패턴 VS 프록시 패턴

- 데코레이터(Decorator) 패턴에서는 객체에 행동을 추가하지만, 프록시(Proxy)패턴에서는 접근을 제어합니다.

---

## 참고

- [\[Design_Pattern\] 프록시 패턴(Proxy Pattern)](https://limkydev.tistory.com/79)
- [프록시 패턴(Proxy Pattern)](https://jdm.kr/blog/235)
- [프록시 패턴(proxy pattern) 이란?](https://developside.tistory.com/80)
- [\[구조 패턴\] 프록시 패턴(Proxy Pattern) 이해 및 예제](https://readystory.tistory.com/132)
