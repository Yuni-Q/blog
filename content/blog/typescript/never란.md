---
title: never란
date: 2022-05-26 11:05:48
category: typescript
tags: ['never', 'void']
draft: true
---

## never 타입은 어떻게 쓸까?

- 허용할 수 없는 함수 매개변수에 제한을 가한다(리턴 타입에 never를 넣는다고 제한을 할 수는 없는거 같다). never 타입을 이용해서 다양한 사용 사례에 놓인 함수에 제안을 걸 수 있다.
- 함수가 단 하나의 never 타입 인수만을 받을 수 있는 경우, (타입스크립트 컴파일러가 오류를 발생하지 않고는) 해당 함수를 never 타입 이외의 값으로 호출할 수 없다.

```ts
function fn(input: never) {}

// 오직 `never` 만 받는다.
declare let myNever: never;
fn(myNever); // ✅

// 아무 값이나 전달하거나 아무 값도 전달하지 않으면 타입 에러 발생
fn(); // ❌ 인자 'input'에 아무 값도 주어지지 않음
fn(1); // ❌ 'number' 타입은 'never' 타입에 할당할 수 없음
fn('foo'); // ❌ 'string' 타입은 'never' 타입에 할당할 수 없음

// `any`도 통과할 수 없다.
declare let myAny: any;
fn(myAny); // ❌ 'any' 타입은 'never' 타입에 할당할 수 없음
```

## void와 never의 차이

- void 타입은 함수가 정상적으로 종료되고, 아무런 값을 반환하지 않음을 의미하지만, never는 함수가 정상적으로 종료되지 않는 경우 사용됩니다.

### void의 명확한 사용처는?

- void가 아무것도 리턴하지 않는다라고 생각했는데 실제 리턴 값은 undefined일 것이다. 그럼에도 우리가 void를 쓰는 이유는 여러가지가 있을 수 있는데 우선 제가 내린 결론은 `리턴 값 타입이 명시적으로 설정되지 않는 함수`라고 정리하려고 합니다. 때문에 void로 선언 후 number, string array를 리턴한다고 해서 에러가 나지 않는거 같슴다.
  - void를 사용하는 이유를 `실제로 return 할 value의 타입을 신경쓰지 않고 싶어`라고 이해하는 것도 좋은 의견 같습니다(feat. 권기석님)
- [예외](https://www.typescriptlang.org/docs/handbook/2/functions.html#return-type-void)도 있다는데 점점 더 어려운거 같습니다... 언젠간 답을 찾을 수 있겠지...
- 함수의 void는 명시적이지만 `매개변수나 메소드에서 void는 리턴 값을 사용하지 않는다`로 생각할 수 있습니다.

```ts
function a(): void {
  return 'dd'; // Error
}

const b: () => void = () => {
  return 'dd'; // not Error
};

const b2: () => number = () => {
  return 'dd'; // Error
};
const c = (): void => {
  return 'dd'; // Error
};
const d = (): void => {
  return undefined; // not Error
};
```

### never 팁

```ts
// type IsNever<T> = T extends never ? true : false
// type A1 = IsNever<never> // never
// type A2 = IsNever<boolean> // false

// 타입 매개변수와 유니온이 만나면 분배 법칙이 실행된다.
// never는 유니온이다(never 공집합이다). 공집합이기 때문에 분배 법칙이 일어나지 않는다. never extends never는 never이다.
// 배열에 넣는 것은 분배 법칙을 막는 한가지 방법이다. 객체를 활용해도 된다. type IsNever<T> = { type: T } extends { type: never } ? true : false
type IsNever<T> = [T] extends [never] ? true : false;
type A1 = IsNever<never>; // true
type A2 = IsNever<boolean>; // false

interface VO {
  value: any;
}

const obj = { value: 'hi', what: 123 };
const a: VO = obj;
// const a: VO = { value: 'hi', what: 123 } // 리터럴을 바로 넣으면 잉여속성 체크를 한다.

const returnVO = <T extends VO>(): T => {
  // '{ value: string; }' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'VO'.
  return { value: 'test' };
};

// 'boolean' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'boolean'.
// boolean의 부분집합에는 never도 있다.
function onlyBoolean<T extends boolean>(arg: T = false): T {
  return arg;
}
```

- [타입스크립트의 Never 타입 완벽 가이드](https://ui.toast.com/weekly-pick/ko_20220323)
