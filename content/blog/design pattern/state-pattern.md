---
title: state pattern
date: 2021-03-21 13:03:24
category: design pattern
tags: [design pattern]
draft: true
---

## 행위 소프트웨어 디자인 패턴

- 상태 패턴(state pattern)은 객체 지향 방식으로 상태 기계를 구현하는 `행위` 소프트웨어 디자인 패턴입니다.

## 변하는 것은 잘 변하지 않는 것과 분리해라. 즉, 변하는 녀석들을 캡슐화해라!

- 스테이트 패턴은 객체가 `특정 상태에 따라 행위를 달리하는 상황`에서 `자신이 직접 상태를 체크하여 상태에 따라 행위를 호출하지 않고` 상태를 `객체화`하여 `상태가 행동을 할 수 있도록 위임하는 패턴`입니다.
- 객체의 내부 상태에 따라 스스로 행동을 변경할 수 있게 허가하는 패턴으로, 이렇게 하면 `객체는 마치 자신의 클래스를 바꾸는 것처럼 보입니다`.
- 상태 패턴을 이용하면 상태 패턴 인터페이스의 파생 클래스로 각각의 상태를 구현함으로써, 또 패턴의 슈퍼클래스에 의해 정의되는 메소드를 호출하여 상태 변화를 구현함으로써 상태 기계를 구현합니다.
- 객체의 특정 `상태를 클래스로 선언`하고, 클래스에서는 `해당 상태에서 할 수 있는 행위들을 메서드로 정의`합니다. 그리고 이러한 `각 상태 클래스들을 인터페이스로 캡슐화` 하여, `클라이언트에서 인터페이스를 호출`하는 방식을 말합니다.
- 구체적인 상태 클래스가 아닌 추상화된 State 인터페이스만 참조하므로 `현재 어떤 상태에 있는지와 무관하게 코드를 작성할 수 있습니다`.
- 상태 전환은 State 클래스에 의해서 제어할 수도 있고, Context 클래스에 의해서 제어할 수도 있습니다.
- State 클래스를 여러 Context 객체의 인스턴스에서 공유하도록 디자인할 수도 있습니다.

## 싱글톤을 이용하는 이유

- 각 상태들의 구현체에서 조금 특이한 것은 각 상태의 구현체들이 `싱글톤`으로 구현되어 있습니다. 이것은 상태들이 행위를 수행하면서 객체의 상태를 `수시로 바꾸어주기 때문`에 싱글톤으로 작성하지 않으면 `매번 새로운 인스턴스가 생겨` 불필요한 메모리를 잡아 먹을 것이고 전체적으로 성능 저하의 원인이 될 것이기 때문에 싱글톤으로 작성합니다.

## 유한 상태 기계(FSM)를 구현할 수 있습니다.

- FSM은 컴퓨터 과학 분야 중의 하나인 오토마타 이론에서 나왔습니다.
- 가질 수 있는 `상태`가 한정됩니다.
- 한 번에 `한 가지` 상태만 될 수 있습니다.
- `입력`이나 `이벤트`가 기계에 전달됩니다.
- 각 상태에는 입력에 따라 다음 상태로 바뀌는 `전이`가 있습니다.

## 장점

- 각 상태를 클래스로 `캡슐화`함으로써 나중에 변경시켜야 하는 내용을 국지화시킬 수 있습니다.
- 하나의 객체에 대한 여러 동작을 구현해야할 때 상태 객체만 수정하므로 동작의 추가, 삭제 및 수정이 간단해집니다.
- State 패턴을 사용하면 객체의 상태에 따른 조건문(if/else, switch)이 줄어들어 코드가 간결해지고 가독성이 올라갑니다.
- 상태 변경에 따른 행위 로직을 직접 구현 하지 않아도 됨으로써 확장에 유리하다.

## 단점

- 상태에 따른 조건문을 대신한 상태 객체가 증가하여 관리해야할 클래스의 수가 증가합니다.

## 스트래지티 패턴과의 비교

- 상태 패턴은 패턴의 인터페이스에 정의된 `메소드들의 호출을 통해 현재의 전략을 전환할 수 있는 전략 패턴`으로 해석할 수 있습니다.
- 스트래티지 패턴에서와 `같은 다이어그램`을 사용한다. 하지만 이 두 패턴은 용도에 있어서 차이가 있습니다.
  - 스테이트 패턴을 사용할 때는 여러 상태 객체 중 `한 객체에서 모든 행동을 맡기게 됩니다`. 그 객체의 내부 상태에 따라 현재 상태를 나타내는 객체가 바뀌게 되고, 그 결과로 컨텍스트 객체의 행동도 자연스럽게 바뀌게 됩니다. `클라이언트는 상태 객체에 대해서 거의 아무것도 몰라도 됩니다`.
  - 스트래티지 패턴을 사용할 때는 일반적으로 클라이언트에서 컨텍스트 객체한테 `어떤 전략 객체를 사용할지를 지정해 줍니다`. 스트래티지 패턴은 주로 실행시에 전략 객체를 변경할 수 있는 `유연성`을 제공하기 위한 용도로 쓰입니다. 보통 가장 적합한 전략 객체를 선택해서 사용하게 됩니다.
  - 일반적으로 스트래티지 패턴은 서브클래스를 만드는 방법을 대신하여 `유연성`을 극대화하기 위한 용도로 쓰입니다. 상속을 이용해서 클래스의 행동을 정의하다 보면 행동을 변경해야 할 때 마음대로 변경하기가 힘듭니다. 하지만 스트래티지 패턴을 사용하면 구성을 통해 행동을 정의하는 객체를 유연하게 바꿀 수 있습니다.
  - 스테이트 패턴은 컨텍스트 객체에 수많은 `조건문`을 집어넣는 대신에 사용할 수 있는 패턴이라고 생각하면 됩니다. 행동을 상태 객체 내의 캡슐화시키면 컨텍스트 내의 상태 객체를 바꾸는 것만으로도 컨텍스트 객체의 행동을 바꿀 수 있으니까요.

## 코드

```ts
// State : 상태에 따른 동작을 정의하는 인터페이스입니다
interface State {
  onButton: (light: Light) => void;
  offButton: (light: Light) => void;
}

// ConcreteState : State에서 정의된 메소드를 구현하는 클래스입니다.
class ON implements State {
  private static on = new ON(); // ON 클래스의 인스턴스로 초기화됨
  private constructor() {}

  public static getInstance() {
    // 초기화된 ON 클래스의 인스턴스를 반환함
    return this.on;
  }

  onButton(light: Light) {
    // ON 상태일 때 On 버튼을 눌러도 변화 없음
    console.log('반응 없음');
  }

  offButton(light: Light) {
    light.setState(OFF.getInstance());
    console.log('Light Off!');
  }
}

class OFF implements State {
  private static off = new OFF(); // OFF 클래스의 인스턴스로 초기화됨
  private constructor() {}

  public static getInstance() {
    // 초기화된 OFF 클래스의 인스턴스를 반환함
    return this.off;
  }

  onButton(light: Light) {
    // Off 상태일 때 On 버튼을 눌러도 On 상태임
    light.setState(ON.getInstance());
    console.log('Light On!');
  }

  offButton(light: Light) {
    // Off 상태일 때 Off 버튼을 눌러도 변화 없음
    console.log('반응 없음');
  }
}

// Context
class Light {
  private state: State;

  constructor() {
    this.state = OFF.getInstance();
  }

  setState(state: State) {
    this.state = state;
  }

  onButton() {
    this.state.onButton(this);
  }

  offButton() {
    this.state.offButton(this);
  }
}

const light = new Light();
light.offButton();
light.onButton();
light.offButton();
```

---

## 참고

- [🙈\[디자인패턴\] 스테이트 패턴 ( State Pattern )🐵](https://victorydntmd.tistory.com/294)
- [코딩스타트](https://coding-start.tistory.com/247)
- [소년코딩](https://boycoding.tistory.com/110)
- [Crocus](https://www.crocus.co.kr/1541)