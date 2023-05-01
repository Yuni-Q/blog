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
```

### 코드 사이즈 증가

- union type < const enum < const object < enum 순으로 코드 사이즈가 증가합니다.

## 모던 타입스크립트에서는 enum 대신 객체를 활용하는 방법을 권장하고 있습니다.

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

// Using the enum as a parameter
function walk(dir: EDirection) {}

// It requires an extra line to pull out the values
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
const aa: Enum = '1313'; // FAILS

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
- enum은 본질적으로 Thread safe인 싱글톤 객체 이므로 싱글톤 클래스를 생성하는데에도 사용된다
