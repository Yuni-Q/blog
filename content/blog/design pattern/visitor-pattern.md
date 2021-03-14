---
title: visitor pattern
date: 2021-03-13 11:03:33
category: design pattern
tags: []
draft: true
---

## 알고리즘을 객체 구조에서 분리시키는 디자인 패턴

- `기존 클래스 필드 정보를 유지하면서 새로운 연산을 추가하는 방식`입니다.
- 실제 로직을 가지고 있는 객체(Visitor)가 로직을 적용할 객체(Element)를 방문하면서 실행하는 패턴입니다. 즉, `로직과 구조를 분리하는 패턴`이라고 볼 수 있습니다. 로직과 구조가 분리되면 `구조를 수정하지 않고도 새로운 동작을 기존 객체 구조에 추가` 할 수 있습니다.
  - 개방-폐쇄 원칙을 적용하는 방법의 하나입니다.
- 비지터 패턴은 `방문자와 방문 공간을 분리`하여, 방문 공간이 방문자를 맞이할 때, 이후에 대한 `행동을 방문자에게 위임`하는 패턴입니다.
  - 보통 OOP에서, 객체는 그 객체가 하는 행동을 메쏘드로 가지고 있습니다. 그리고 행동의 대상이 되는 객체가 있을 경우, 메쏘드의 파라미터로 입력받습니다. 그런데, 비지터 패턴은 행동의 대상이 되는 객체가 행동을 일으키는 객체를 입력으로 받습니다.
- 런타임 중에 하나 이상의 연산을 객체 집합에 적용되도록 해줍니다.

## 행동 패턴

- 행동 관련 패턴(Behavioral Pattern)은 클래스와 객체들이 상호작용하는 방법 및 역할을 분담하는 방법과 관련된 패턴입니다.
- Visitor 패턴에서는 요소 클래스의 실행 알고리즘을 변경하는 visitor 클래스를 사용합니다. 이러한 방식으로, 요소의 실행 알고리즘은 방문자가 다양 할 때 달라질 수 있습니다. 이 패턴은 `행동 패턴 카테고리`에 포함됩니다. 패턴에 따라 요소 객체는 방문자 객체가 요소 객체에 대한 작업을 처리하도록 `방문자 객체를 받아 들여야합니다`.

## 활용처

- 다양한 객체에 새로운 기능을 추가해야 하는데 `캡슐화가 별로 중요하지 않은 경우` 사용합니다.
- 데이터 구조보다 알고리즘이 더 자주 바뀌는 경우 사용합니다.
  - 적용해야 할 대상 객체가 잘 바뀌지 않고(특히 개수), 적용할 알고리즘이 추가될 가능성이 많은 상황일 때 사용을 고려해봐야 합니다.
- 자료 구조(데이터)와 자료 구조를 처리하는 로직(알고리즘)을 분리해야할 경우 사용합니다.

## 방문자 패턴을 사용하는 이유는?

- 데이터 구조와 연산을 분리 하여 인스턴스 필드를 변경하지 않고 새로운 연산을 추가할 수 있습니다.
- domain에게 View를 위한 책임은 Visitor에게 위임하기 위해서 사용됩니다.
- 새로운 연산을 더 만들고 싶다면, 새로운 방문자를 추가하면 됩니다.

## 장점

- 작업 대상(방문 공간)과 작업 항목(방문 공간을 가지고 하는 일)을 `분리` 시킵니다.
  - 작업 대상(방문 공간)은 단지 데이터를 담고있는 자료구조로 만듭니다.
  - 작업 주체(방문자)는 visit() 안에 이 작업 대상을 입력받아 작업 항목을 처리하면 됩니다.
  - 즉, 데이터와 알고리즘이 분리되어, `데이터의 독립성을 높여줍니다`.
- 작업 대상의 입장에서는 accept()로 인터페이스를 통일시켜, 사용자에게 `동일한 인터페이스를 제공`합니다.
- 객체 집단 혹은 객체 구조에 대한 업무구현을 객체 외부로 위임할수 있습니다. (전략 패턴이나 커맨드 패턴보다 더 윗단계)
- command pattern을 전체 집단에 대한 처리 개념으로 확대함으로서, 사용자 입장에서 `매우 단순하게 전체 객체구조를 다룰수 있게 합니다`.
- 연산에 대한 확장이 쉬워집니다. Visitor interface의 구현 클래스로 하나만 추가하면 전체 데이터 구조에 대한 연산이 추가됩니다.
- 연산은 한 군데로 모으고 관련되지 데이터 구조에서 연산을 때어낼 수 있습니다.
- 계층구조로 방문하게 됩니다.
- 상태를 누적할 수 있습니다. 연산이 분산되어 있지 않아서 하나의 상태를 변경하면서 모든 노드를 방문할 수 있습니다. 보통은 노드를 방문할 때마다 데이터가 누적됩니다. 만약 로직이 분산되어있었다면 전역변수를 이용하던 연산에 의해 전달되던 깔끔하지 못하게 공유될 것입니다.

### 오버로딩이 가능할 시에 장점(자바스크립트는 오버로딩이 되지 않습니다.)

- 업무의 추가나, 업무 대상객체의 추가 시에 instanceOf를 사용하지 않아도 되도록 하기 때문에, 안정적이고 확장에 용이한 구조로 만듭니다.
- visitor의 구별을 위해 instanceOf를 사용하지 않기 때문에, proxy 방식으로 객체의 제어가 가능합니다. (Proxy방식에서는 객체생성 의존관계를 느슨하게 해줄수 있습니다. 그런데 instanceOf 방식으로 객체를 판별해버리면 Proxy는 모두 같은 proxy객체로 판별해 버리기 떄문에 문제가 생깁니다.)

## 단점

- 객체간에 `결합도가 높은 편`이고, 비지터가 객체의 속성값을 직접 제어하므로 `캡슐화가 약해집니다`.(반복자 패턴과는 정반대)
  - `데이터의 은닉을 깰 수 있습니다`. 내부 상태에 접근하는 내용들에 대해서 모두 공개 인터페이스로 만들 수 밖에 없어서 외부에 데이터가 노출하게 됩니다.
  - 서로 visit()와 accept()에 의존합니다.
- 새로운 ConcreteElement 추가는 어렵습니다. 새로운 데이터 노드가 추가될 때마다 모든 방문자에 이에 대응하는 로직을 구현해야합니다.
  - 새로운 작업 대상(방문 공간)이 추가될 때마다 작업 주체(방문자)도 이에 대한 로직을 추가해야 합니다.
- 최초 구조 잡는 것이 쉽지 않습니다.

## reverse visiter 구조

### Client

```ts
const root = new DirectoryEntry('root');
const bin = new DirectoryEntry('bin');
const Lkt = new DirectoryEntry('Lkt');
const file1 = new FileEntry('file1');
const file2 = new FileEntry('file2');
const file3 = new FileEntry('file3');
const file4 = new FileEntry('file4');

root.add(file1);
bin.add(file2);
bin.add(file3);
Lkt.add(file4);
root.add(Lkt);
root.add(bin);
root.accept(new ViewVisitor());
```

### Element

- 구조를 구성하는 인터페이스이자 Visitor가 방문하여 수행해야 할 대상입니다.
- 방문자를 인자로 받아들이는 Accept 연산을 정의합니다.
  - Visitor 를 실행할 수 있는 메소드를 하나 가지고 있으며 보통 accept 라는 이름으로 정의합니다.
  - 내부적으로 `visitor.visit(this)`를 호출합니다.

```ts
interface IElement {
  accept(visitor: Visitor): void;
}

abstract class Entry implements IElement {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  abstract add(entry: Entry): void;

  accept(visitor: Visitor) {
    visitor.visit(this);
  }
}
```

### ConcreteElement

- Element를 구체적으로 구현한 클래스 입니다.
- Accept에 대해 구현하며 객체의 연산 노드를 담당합니다.

```ts
class FileEntry extends Entry {
  constructor(name: string) {
    super(name);
  }
  add(entry: Entry) {
    throw new Error('error');
  }
  accept(v: Visitor) {
    v.visit(this);
  }
}

class DirectoryEntry extends Entry {
  directory: Entry[] = [];

  constructor(name: string) {
    super(name);
  }
  add(entry: Entry) {
    this.directory.push(entry);
  }
  accept(v: Visitor) {
    v.visit(this);
  }
}
```

### Visitor

- Element를 방문하고 동작을 구현하기 위한 인터페이스 입니다.
- `visit(Element)`을 공용 인터페이스로 사용합니다.
  - Element는 방문 공간입니다.

```ts
interface Visitor {
  visit(target: Entry);
}
```

### ConcreteVisitor

- Visitor를 구체적으로 구현한 클래스 입니다.
- Visitor의 구현으로 각 ConcreteElement에 대한 처리 로직을 구현합니다. 알고리즘이 운영될 수 있는 상황정보를 제공하며 자체 상태를 저장합니다. 구조를 순회하며 누적되는 경우가 많습니다.

```ts
class ViewVisitor implements Visitor {
  path = '';

  visit(target: Entry) {
    if (target instanceof FileEntry) {
      console.log(this.path + '/' + target.name + '.file');
    }
    if (target instanceof DirectoryEntry) {
      this.path = this.path + '/' + target.name;
      console.log(this.path);
      for (let i = 0; i < target.directory.length; i++) {
        target.directory[i].accept(this);
      }
    }
  }
}
```

### 일반 visiter

- 객체 구조 내의 원소들을 나열할 수 있습니다. Composite 패턴으로 만든 복찹체일 수도 있고, List나 Set등의 컬렉션일 수 있습니다.

```ts
interface ComputerPart {
  accept: (computerPartVisitor: ComputerPartVisitor) => void;
}

class Keyboard implements ComputerPart {
  accept(computerPartVisitor: ComputerPartVisitor) {
    computerPartVisitor.visit(this);
  }
}

class Keyboard22 implements ComputerPart {
  accept(computerPartVisitor: ComputerPartVisitor) {
    computerPartVisitor.visit(this);
  }
}

class Monitor implements ComputerPart {
  accept(computerPartVisitor: ComputerPartVisitor) {
    computerPartVisitor.visit(this);
  }
}

class Mouse implements ComputerPart {
  accept(computerPartVisitor: ComputerPartVisitor) {
    computerPartVisitor.visit(this);
  }
}

// ObjectStructure
class Computer implements ComputerPart {
  parts: ComputerPart[];

  constructor() {
    this.parts = [new Mouse(), new Keyboard(), new Monitor(), new Keyboard22()];
  }

  accept(computerPartVisitor: ComputerPartVisitor) {
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i].accept(computerPartVisitor);
    }
    computerPartVisitor.visit(this);
  }
}

interface ComputerPartVisitor {
  visit: (target: Computer | Mouse | Keyboard | Monitor) => void;
}

class ComputerPartDisplayVisitor implements ComputerPartVisitor {
  visit(target: Computer | Mouse | Keyboard | Monitor) {
    if (target instanceof Computer) {
      console.log('Displaying Computer.');
    }
    if (target instanceof Mouse) {
      console.log('Displaying Mouse.');
    }
    if (target instanceof Keyboard) {
      console.log('Displaying Keyboard.');
    }
    if (target instanceof Monitor) {
      console.log('Displaying Monitor.');
    }
  }
}

const computer = new Computer();
computer.accept(new ComputerPartDisplayVisitor());
```

## 이중 디스패치(Double Dispatch)

- 결론적으로 Visitor Pattern은 Double Dispatch가 핵심입니다. 이는 클래스를 변경하지 않으면서 해당 클래스에 메서드를 추가하는 패턴입니다. 위 예제에서는 element.Accept(visitor)를 통해 내부에서 visitor.visit(this)를 하게되므로 이를 Double Dispatch라고 부르며 실제로 Accept 메서드는 visitor에게 함수 실행 로직을 위임함으로써 실제로 기존 코드를 변경 없이 Accept에 대한 구현을 동적으로 변화시킬 수 있습니다. 언어적으로 다중 디스패치를 지원한다면 Visitor 패턴은 필요하지 않을 수 있습니다.

## 다른 패턴과 비교

- 객체에 대한 행위의 내용을 외부 클래스로 빼서 객체의 행위를 위임하기도 합니다. 이런 타입의 패턴으로 `전략패턴`, `커맨드 패턴`, `비지터 패턴` 등이 있습니다. 셋 모두 객체의 행위를 바깥으로 위임하는 것이지만, `전략패턴이 하나의 객체에 대해 여러 동작을 하게 하거나(1:N)`, `커맨드 패턴이 하나의 객체에 대하 하나의 동작(+보조동작)에 대한 설계방식(1:1)`인 반면에, `방문자 패턴은 여러 객체들에 대해 객체의 동작들을 지정하는 방식(N:N)` 입니다.

---

## 참고

- [비지터 패턴](https://ko.wikipedia.org/wiki/%EB%B9%84%EC%A7%80%ED%84%B0_%ED%8C%A8%ED%84%B4)
- [\[디자인 패턴 15편\] 행동 패턴, 방문자 (Visitor)](https://dailyheumsi.tistory.com/216)
- [Visitor Pattern - 비지터 패턴, 방문자 패턴](https://huisam.tistory.com/entry/Visitor)
- [Kunoo](https://kunoo.tistory.com/entry/행위-패턴-Visitor-pattern-비지터-패턴)
- [방문자 패턴 - Visitor pattern](https://thecodinglog.github.io/design/2019/10/29/visitor-pattern.html)
- [12 방문자 패턴 (Visitor Pattern)](https://lktprogrammer.tistory.com/58)
- [Sticky](https://sticky32.tistory.com/entry/소프트웨어디자인패턴-방문자-패턴Visitor-Pattern)
