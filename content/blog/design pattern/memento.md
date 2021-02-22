---
title: memento
date: 2021-02-21 21:02:16
category: design pattern
tags: ['design pattern']
draft: true
---

## 캡슐화를 위배하지 않은 채 내부 상태의 스냅샷을 찍는 패턴

- `캡슐화를 위배하지 않는 채` 어떤 객체의 내부 상태를 잡아내고 신체화시켜, 이후에 해당 객체가 그 상태로 다시 되돌아올 수 있도록 하는 패턴입니다.
  - 메멘토 패턴은 객체의 상태 정보를 저장하고 사용자의 필요에 의하여 원하는 시점의 데이터를 복원(Rollback) 할 수 있는 패턴을 의미합니다.
  - 객체를 이전의 상태로 복구시켜야 하는 경우에는 메멘토 패턴을 쓰면 됩니다. 예를 들어 사용자가 '직업 취소'를 요청하는 경우를 생각하면 됩니다.

## 행위 패턴

- 디자인 패턴에는 생성, 구조, 행위, 3가지 분류가 있습니다.
- 메멘토 패턴은 `행위`에 대한 패턴입니다.

## 객체 패턴(Object patterns)

- 객체 패턴(Object patterns)에서는 객체 사이의 관계를 다루며, 객체 상이의 관계는 보통 구성을 통해서 정의 됩니다. 객체 패턴에서는 일반적으로 실행 중에 관계가 생성되기 때문에 더 동적이고 유연 합니다.

## 메맨토 패턴

- 객체 내부 상태를 저장하므로써 객체 상태가 변경되었을 때 이전 상태(원상태)로의 복구가 가능합니다.
- 이 패턴이 주로 사용되는 곳은 에러 콜백, 삭제에 대한 되돌림와 같은 유저 액션입니다.
- 특히나 메멘토 패턴은 캡슐화를 해치지 않는 선에서 내부 상태에 대한 원복을 목표로 하기 때문에, 객체지향 관점에서 효과적이라 볼 수 있습니다. 하지만 캡슐화가 잘 된 객체는 데이터 구조가 잘 숨겨져 있기 때문에 객체의 외부에서 접근이 쉽지 않습니다.

## 객체의 캡슐화가 훼손되지 않아야 합니다.

- 객체의 내부 상태가 외부적으로 저장되어야 이후에 객체가 그 상태를 복구할 수 있습니다.
- 문제는 잘 디자인된 객체는 캡슐화되어 있기 때문에 그 표현(데이터 구조)이 내부에 숨겨져 있어 객체의 외부에서 접근할 수 없다는 것입니다.

## 메멘토 패턴의 장점

- 저장된 상태를 핵심 객체와는 다른 별도의 객체에 보관하기 때문에 안전합니다.
- 핵심 객체의 데이터를 계속해서 캡슐화된 상태로 유지할 수 있습니다.
- 복구 기능을 구현하기가 쉽습니다.

## 메멘토 패턴 활용법 및 단점

- 메멘토 객체를 써서 상태를 저장합니다.
- 상태를 저장하고 복구하는 데 시간이 오래 걸릴 수 있다는 단점이 있습니다.
- 자바 시스템에서는 시스템의 상태를 저장할 때 직렬화를 사용하는 것이 좋습니다.

## 메멘토 패턴은 3개의 객체로 구현됩니다.

- 오리지네이터 (Originator)
- 케어테이커 (Caretaker)
- 메멘토 (Memento)
- 디자인 패턴은 인터페이스에 정의해야 하는 중요 요소가 무엇이고 어떤 종류의 데이터를 주고받아야 하는지 식별하여 인터페이스를 정의하도록 도와줍니다. 가끔 디자인 패턴은 인터페이스에 넣지 말아야 할 것을 알려주기도 합니다. 메멘토 패턴은 객체의 내부 상태를 어떻게 저장하고 캡슐화해야 하는지를 정의함으로써 객체가 나중에 그 상태로 복구할 수 있는 방법을 알려줍니다. 이 패턴에서는 객체에 두 개의 인터페이스를 정의하도록 규정합니다. 이 두 가지는 사용자가 상태를 저장하고 복사할 수 있도록 해 주는 인터페이스와 원본 객체가 그 메멘토에서 상태를 저장하고 검색하기 위해 사용하는 인터페이스입니다.

### 오리지네이터 (Originator) - 작성자

- 오리지네이터는 내부의 상태를 가지고 있는 객체입니다.
- 단독으로 객체에 접근할 수 있습니다.
- 메멘토 객체에 내부 상태를 저장합니다.
- 메멘토 객체로부터 이전 상태를 복구합니다.
- 메멘토를 생성한 오리지네이터만이 접근이 허용된다.

```js
class Originator {
  public state1: string
  public state2: string

  constructor(state1: string, state2: string) {
    this.state1 = state1
    this.state2 = state2
  }

  createMemento(): Memento {
    return new Memento(this.state1, this.state2)
  }

  restoreMemento(memento: Memento): void {
    this.state1 = memento.state1
    this.state2 = memento.state2
  }
}

```

### 케어테이커 (Caretaker) - 관리인

- 케어테이커는 오리지네이터에게 메멘토 객체를 요청합니다. 그 뒤 예정된 일련의 명령을 수행합니다. 명령 이전의 상태로 되돌리기 위해 메멘토 객체를 오리지네이터에 반환합니다.
- 케어테이커는 오리지네이터에 대해서 액션을 제공하지만, 변경에 대한 취소 및 저장에 대해서만 제공합니다. `다른 기능도 제공하게 되면 단일-책임원칙에 위배`되기 때문입니다.

```js
class CareTaker {
  private memento: Memento[] = []

  saving(originator: Originator): void {
    this.memento.push(originator.createMemento())
  }

  restoring(originator: Originator): void {
    if (this.memento.length === 0) return

    originator.restoreMemento(this.memento[this.memento.length - 1])
  }
}

```

### 메멘토 (Memento) - 스냅샷

- 메멘토 객체 자신은 불투명 자료형(케어테이커는 변경할 수 없거나 변경해서는 안 되는)입니다.
- 메멘토 객체는 Originator와 반대로, `변경되기 이 전의 상태`를 갖고있는 객체입니다.

```js

class Memento {
  readonly state1: string
  readonly state2: string

  constructor(state1: string, state2: string) {
    this.state1 = state1
    this.state2 = state2
  }
}

```

## 동작

- 케어테이커는 오리지네이터에 대해서 변경에 대한 실행 취소를 진행합니다.
- 그러기 위해 오리지네이터에게 메멘토 객체를 요청합니다.
- 오리지네이터는 내부 상태를 변경하기위해서 메멘토 객체를 반환하며 케어테이커는 반환된 메멘토 객체를 적용합니다.
- careTaker 객체는 originator 객체를 받아 저장 및 복원을 진행합니다. Originator는 Memento를 만들어낼 뿐이지, 자신의 상태에 대해서만 가지고 있습니다. 실제로 일을 하는 곳은 CareTaker라 보시면되고, 스냅샷을 Memento라고 이해하시면 되겠습니다.

```js
const originator: Originator = new Originator('first', 'one');

const careTaker: CareTaker = new CareTaker();

careTaker.saving(originator);

originator.state1 = 'second';
originator.state2 = 'two';

console.log(originator);
careTaker.restoring(originator);
console.log(originator);
```

## 주의

- 메멘토 패턴을 사용해 현재 상태를 저장하고, 롤백하는 구현을 쉽게 진행하였습니다. 다만 상태가 많아지면 메모리를 많이 먹으므로 최대 배열의 갯수를 잡아 코딩을 진행하는게 좋습니다.
- 메멘토 패턴은 커멘드 패턴을 통해 커맨드에 대한 롤백 및 미래에 대한 커맨드를 기억하고 추가하거나 하여 시뮬레이팅 시스템을 구현할 수도 있습니다.

## 참고

- [TypeScript 디자인 패턴 - 메멘토 패턴](https://vallista.kr/2020/06/07/TypeScript-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EB%A9%94%EB%A9%98%ED%86%A0-%ED%8C%A8%ED%84%B4/)
- [메멘토 패턴](https://ko.wikipedia.org/wiki/%EB%A9%94%EB%A9%98%ED%86%A0_%ED%8C%A8%ED%84%B4)
- [Sticky](https://sticky32.tistory.com/entry/디자인패턴-메멘토-패턴Memento-Pattern)
