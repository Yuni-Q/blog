---
title: enum과 union
date: 2023-05-02 00:05:93
category: typescript
tags: []
draft: true
---

## enum의 문제점

### enum은 기본적으로 확장이 불가능합니다.

- enum과 다른 enum을 합쳐 다른 enum을 만들기 위해서는 union type을 이용해야 합니다.

```ts
enum Fruit {
  APPLE,
  BANANA,
}

enum ANotherFruit {
  PINEAPPLE,
  GRAPE,
}

type Fruits = Fruit | AnotherFruit;

const fruit: Fruit = Fruit.APPLE;
```

### enum을 사용하면 사용하는 쪽에서 불러와 할당해야 합니다.

- 반드시 import를 써야 한다는 것이지요

```ts
import { Fruit } from './enum';

getSomeFruits(Fruit.APPLE);
```

### enum의 불완전한 타입 안정성

```ts
enum Status {
  pending = 0,
  success = 1,
  fail = 2,
}

const newStatus: Status = 100; // 에러가 발생하지 않습니다.

const a = (s: Status) => {
  return s;
};

a(1); // 에러가 발생하지 않습니다.
a(Status.pending);
```

### 코드 사이즈 증가

- union type < const enum < const object < enum 순으로 코드 사이즈가 증가합니다.
  - [make generated codes from enum could be minified when not used](https://github.com/microsoft/TypeScript/issues/27604)
  - enum 이 수천 수만개쯤 있는 프로젝트면 모르겠는데, 보통 그렇진 않을테니 의미 없습니다.
  - enum을 작성한 다음, 그걸 어딘가에서 사용한다면, 그 enum은 내가 어떤 식으로 구현했는지 상관없이 애초에 트리쉐이킹 대상이 아니다.

## 중립?

### 모던 타입스크립트에서는 enum 대신 객체를 활용하는 방법을 권장하고 있다?

- [objects-vs-enums](https://www.typescriptlang.org/ko/docs/handbook/enums.html#objects-vs-enums)
  - In modern TypeScript, you may not need an enum when an object with as const could suffice
  - The biggest argument in favour of this format over is that it keeps your codebase aligned with the state of JavaScript, and when/if enums are added to JavaScript then you can move to the additional syntax.
  - 자바스크립트에 이넘이 없으니 쓰지 않는게 좋을거 같다인거 같다.
- enum 키워드 없이 enum 처럼 작동하는 변수를 만드는 방법은 사람이 수작업으로 작업해야 하는 코드의 양을 늘린다. 그렇지만 그에 비해 얻는 효과는 미미하거나 없을 수도 있다.

```ts
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

EDirection.Up;

(enum member) EDirection.Up = 0

ODirection.Up;

(property) Up: 0

// 열거형을 매개변수로 사용
function walk(dir: EDirection) {}

// 값을 꺼내려면 추가 줄이 필요합니다.
// 길고 복잡한 "union string type" 방법으로 enum 을 대체하는게 내 프로덕트에 유의미한 차이를 줄까?
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);
```

## 그렇지만 enum을 사용해야 하는 경우는?

### 리버스 매핑(reverse mapping)

```ts
enum Animal {
  DOG,
  CAT,
}

// 아래와 같이 컴파일됩니다.
var Animal;
(function (Animal) {
  Animal[(Animal['DOG'] = 0)] = 'DOG';
  Animal[(Animal['CAT'] = 0)] = 'CAT';
})(Animal || (Animal = {}));
```

## enum vs. plaint object vs. const enum vs. string union 중 어떤 것을 써야하는가!?

- 이넘을 쓰면 플레인한 값을 넣지 못합니다.

```ts
enum Enum {
  'Bar' = '1313',
  'Moz' = '0101',
}

type EnumjectKeys = 'Box' | 'Xob';
type EnumjectValues = '0808' | '1111';
const Enumject: Record<EnumjectKeys, EnumjectValues> = Object.freeze({
  Box: '0808',
  Xob: '1111',
});

const a: Enum = Enum.Bar;
const aa: Enum = '1313'; // FAIL

const b: EnumjectValues = Enumject.Box;
const bb: EnumjectValues = '1111'; // OK
```

- 열거형 정의가 필요한 곳에는 enum을 써야 합니다. 언어의 키워드들이 생겨난 이유에 맞게 사용하고 나서 최적화가 필요한 부분만 옵티마이즈 해야 합니다
- 언어, 컴파일러, 런타임의 역할이 있는데 언어가 제공하는 기능을 맞게 쓰고 있으면 컴파일러, 런타임도 발전하면서 자연스레 많은 것들이 해결됩니다. 어떤 것들이 변화가 느리다고 생각되어 일부분을 옵티마이즈 할 수 있지만 특정 기능을 모두 다르게 사용해 버리면 언젠가 컴파일러, 런타임에서 이슈들이 해결될 때 코드의 많은 부분을 바꿔야 합니다.

## Enum의 장점

- 코드가 단순해지며 가독성이 좋아진다
- 허용 가능한 값들을 제한하여 유형 안전(type safe)을 제공한다.
- 키워드 enum을 사용하기 때문에 구현의 의도가 열거임을 분명하게 나타낼 수 있다.
- 자체 클래스 상수와 달리 switch문에서도 사용할 수 있다
- 단순 상수와 비교해 IDE의 적극적인 지원을 받을 수 있다 (자동완성, 오타검증, 텍스트 리팩토링 등등)
- 리팩토링시 변경 범위가 최소화 된다 (enum에서 한번에 관리하기 때문에 내용의 추가가 필요하더라도, Enum 코드외에 수정할 필요가 없다)
- enum은 본질적으로 Thread safe인 싱글톤 객체 이므로 싱글톤 클래스를 생성하는데에도 사용된다.

## 추가

- enum 은 2가지 이상의 경우의 수를 가지는 상황을 정의하기 위한 타입이다. 시스템 내에서 분기 또는 스위치 등에 사용하는 값으로만 사용할때만 enum을 정의해 사용하는게 바람직하다.
  - 만약 enum과 1:1 대응이 필요한 사용자 문구가 필요하다면, enum에 대한 mapped-type 으로 정의된 일반 객체를 만들어 저장하는게 맞다고 생각한다.
- enum의 순회의 enum element reverse mapping 때문에 어려울 수 있기 때문에 이를 원한다면 enum 을 문자열로만 사용한다면 문제가 없다.
  - enum의 문자열 요소는 reverse mapping 을 하지 않는다.
- enum은 런타임에서 키-값 쌍의 객체이긴 하지만, 멘탈모델은 변하지 않는 문자열 들의 집합 이다. 객체형태를 띄는건 어디까지나 사용하기 쉽고 익숙한 방법을 제공하기 위함일 뿐이다. 타입스크립트의 enum 타입에서 에서 의미를 가지는 데이터는 enum 객체의 값에 해당한다. enum에서 키는 enum의 알짜 데이터인 값 에 접근하기 위한 핸들일 뿐이다.
  - enum 객체의 요소의 값을 순회하기 위해 Object.values() 로 접근하면, 이렇게 제대로 타입이 추론되는 모습을 확인할 수 있다.
- 객체와 union string type 이 같은 이름일 필요는 없지만, 그렇게 되면 enum 타입의 완벽한 대체제로써 기능하지는 않게 된다. 둘을 한 공간에서 각각 서로 같은 이름으로 선언함으로써, 값을 참조할땐 객체의 타입이 사용되고, 타입을 참조할땐 union string 타입이 사용되도록 하는 일종의 꼼수다.
