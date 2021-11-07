---
title: 5장 any 다루기
date: 2021-08-16 18:08:12
category: 이펙티브 타입스크립트
tags: []
draft: true
---

- 타입스크립트의 타입 시스템은 선택적(optional)이고 점진적(gradual)이기 때문에 정저깅면서도 동적인 특성을 동시에 가집니다. 따라서 타입스크립트는 프로그램의 일부분에서만 타입 시스템을 적용할 수 있습니다.

## 아이템 38 : any 타입은 가능한 한 좁은 범위에서만 사용하기

- 의도치 않은 타입 안전성의 손실을 피하기 위해서 any의 사용 범위를 최소한으로 좁혀야 합니다.
- 함수의 반환 타입이 any인 경우 타입 안정성이 나빠집니다. 따라서 any 타입을 반환하면 절대 안 됩니다.
- 강제로 타입 오류를 제거하려면 any 대신 @ts-ignore 사용하는 것이 좋습니다.

## 아이템 39 : any를 구체적으로 변형해서 사용하기

- any를 사용할 때는 정말로 모든 값이 허용되어야만 하는지 면밀히 검토해야 합니다.
- any보다 더 정확하게 모델링할 수 있도록 `any[]` 또는 `{[key: string]: any}` 또는 `() => any` 처럼 구체적인 형태를 사용해야 합니다.

### 객체 타입

- `{[key: string]: any}` :
- `object` : 모든 비기본형(non-primitive)타입을 포함하는 object 타입. object 타입은 객체의 키를 열거할 수는 있지만 속성에 접근할 수 없다는 점에서 `{[key: string]: any}`와 약간 다릅니다.
- unknown : 객체지만 속성에 접근할 수없어야 한다면 unknown 타입이 필요한 상황일 수 있습니다.

### 함수 타입

```ts
type Fn0 = () => any; // 매개변수 없이 호출 가능한 모든 함수
type Fn1 = (arg: any) => any; // 매개변수 1개
type FnN = (...arg: any[]) => any; // 모든 개수의 매개변수. "Function" 타입과 동일합니다.

const numArgsBad = (...args: any) => args.length; // any를 반환합니다.
const numArgsBad = (...args: any[]) => args.length; // number를 반환합니다.
```

## 아이템 40 : 함수 안으로 타입 단언문 감추기

- 함수 내부에는 타입 단언을 사용하고 함수 외부로 드러나는 타입 정의를 정확히 명시하는 정도록 끝내는 것이 나을 수도 있습니다.
- 타입 선언문은 일반적으로 타입을 위험하게 만들지만 상황에 따라 필요하기도 하고 현실적인 해결책이 되기도 합니다. 불가피하게 사용해야 한다면, 정확한 정의를 가지는 함수 안으로 숨기도록 합니다.

## 아이템 41 : any의 진화 이해하기

- 일반적인 타입들은 정제되기만 하는 반면, 암시적 any와 any[] 타입은 진화할 수 있습니다. 이러한 동작이 발생하는 코드를 인지하고 이해할 수 있어야 합니다.
  - any 타입의 진화는 `noImplicitAny`가 설정된 상태에서 변수의 타입이 암시적 any인 경우에만 일어납니다.
  - 타입 진화는 값을 할당하거나 배열에 요소를 넣은 후에만 일어나기 때문에, 편집기에서는 이상하게 보일 수 있습니다. 할당이 일어난 줄의 타입을 조사해 봐도 여전히 any 또는 any[]로 보입니다.
  - any 타입의 진화는 암시적 any 타입에 어떤 값을 할당할 때만 발생합니다. 그리고 어떤 변수가 암시적 any 상태일 때 값을 익으려고 하면 오류가 발생합니다.
  - 암시적 any 타입은 함수 호출을 거쳐도 진화하지 않습니다.
- any를 진화시키는 방식보다 명시적 타입 구문을 사용하는 것이 안전한 타입을 유지하는 방법입니다.

## 아이템 42 : 모르는 타입의 값에는 any 대신 unknown을 사용하기

- unknown은 any 대신 사용할 수 있는 안전한 타입입니다. 어떠한 값이 있지만 그 타입을 알지 못하는 경우라면 unknown을 사용하면 됩니다.
- 사용자가 타입 단언문이나 타입 체크를 사용하도록 강제항려면 unknown을 사용하면 됩니다.
- {}, object, unknown의 차이점을 이해해야 합니다.

### 함수 반환값과 관련된 unknown

```ts
// YAML 파서인 parserYAML 함수를 작성한다고 가정해 보겠습니다.

// as-is
function parseYAML(yaml: string): any {
  // ...
}

interface Book {
  name: string;
  author: string;
}
const book: Book = parseYAML(`
  name: Jane Eyre
  author: Charlotte Bronte
`);

const book = parseYAML(`
  name: Jane Eyre
  author: Charlotte Bronte
`);
alert(book.title); // 오류 없음, 런타임에 "undefined" 경고
book('read'); // 오류 없음, 런타임에 "TypeError: book은 함수가 아닙니다" 예외 발생

// 함수의 반환 타입으로any를 사용하는 것은 좋지 않은 설계입니다.
// 대신 parseYAML를 호출하는 곳에서 반환값을 원하는 타입으로 할당하는 것이 이상적입니다.
// 그러나 함수의 반환값에 타입 선언을 강제할 수 없기 때문에, 호출한 곳에서 타입 선언을 생략하게 되면 book 변수는 암시적 any 타입이 되고 사용되는 곳마다 타입 오류가 발생하게 됩니다.

// to-be
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}
const book = safeParseYAML(`
  name: Jane Eyre
  author: Charlotte Bronte
`);
alert(book.title); // Object is of type 'unknown'.(2571)
book('read'); // Object is of type 'unknown'.(2571)
```

#### any 타입이 위험한 이유

- 어떠한 타입이든 any 타입에 할당 가능합니다.
- any 타입은 어떠한 타입으로도 할당 가능합니다(never 타입은 예외).
- any는 한 집합의 부분 집합이면서 동시에 상위집합이 될 수 있기 때문에 타입 시스템과 상충되는 면을 가지고 있습니다.
- 타입 체커는 집합 기반이기 때문에 any를 사용하면 타입체커가 무용지물이 됩니다.

#### unknown

- unknown은 any 대신 쓸 수 있는 타입 시스템에 부합하는 타입입니다.
  - unknown 타입은 any와 같이 `어떠한 타입이든 unknown에 할당 가능`합니다.
  - unknown 타입은 any와 달리 `unknown은 오직 unknown과 any에만 할당 가능`합니다.
  - never 타입은 unknown과 정반대입니다.
    - 어떠한 타입도 never에 할당할 수 없습니다.
    - 어떠한 타입으로도 할당 가능합니다.
- unknown 타입인 채로 값을 사용하면 오류가 발생합니다. unknown인 값에 함수 호출을 하거나 연산을 하려고 해도 마찬가지입니다. unknown 상태로 사용하려고 하면 오류가 발생하기 때문에, 적절한 타입으로 변환하도록 강제할 수 있습니다.

```ts
// 책의 예제
interface Book {
  name: string;
  author: string;
}
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}
const book = safeParseYAML(`
  name: Jane Eyre
  author: Charlotte Bronte
`) as Book;
alert(book.title); // Property 'title' does not exist on type 'Book'.(2339)
book('read'); // This expression is not callable. Type 'Book' has no call signatures.(2349)

// unknown 그대로 값을 사용할 수 없기 때문에 Book으로 타입 단언을 해야 합니다. 애초에 반환값이 Book이라고 기대하며 함수를 호출하기 때문에 단언문은 문제가 되지 않습니다.
// 기존보다 오류의 정보가 더 정확합니다.
```

### 변수 선언과 관련된 unknown

```ts
// GeoJSON 사양에서 Feature의 properties 속성은 JSON 직렬화가 가능한 모든 것을 다믄 잡동사니 주머니 같은 존재입니다. 그래서 타입을 예상할 수 없기 떄문에 unknown을 사용합니다.
interface Feature {
  id?: string | number;
  geometry: Geometry;
  properties: unknown;
}

// 타입 단언문이 unknown에서 원하는 타입으로 변환하는 유일한 방법은 아닙니다. instanceof를 체크한 후 원하는 타입으로 변환할 수 있습니다.
function processValue(val: unknown) {
  if (val instanceof Date) {
    val; // 타입이 Date
  }
}

// 사용자 정의 타입 가드도 unknown에서 원하는 타입으로 변환할 수 있습니다.
function isBook(val: unknown): val is Book {
  return (
    typeof val === 'object' && val !== null && 'name' in val && 'author' in val
  );
}
function processValue(val: unknown) {
  if (isBook(val)) {
    val; // 타입이 Book
  }
}

// 제너릭 매개변수가 사용되는 경우도 있습니다. 하지만 제너릭을 사용한 방식은 일반적으로 타입스크립트에서 좋지 않은 스타일입니다. 제너릭을 사용한 스타일은 타입 단언문과 달라 보이지만 기능적으로는 동일합니다. 제너릭보다는 unknown을 반환하고 사용자가 직접 단언문을 사용하거나 원하는 대로 타입을 좁히도록 강제하는 것이 좋습니다.
function safeParseYAML<T>(yaml: string): T {
  return parseYAML(yaml);
}
const book = safeParseYAML<Book>(`
  name: Jane Eyre
  author: Charlotte Bronte
`);

// 이렇게 하면 어떨까...?
function safeParseYAML<T = unknown>(yaml: string): T {
  return parseYAML(yaml);
}
```

### 단언문과 관련된 unknown

```ts
declare const foo: Foo;
let varAny = foo as any as Bar;
let barUnk = foo as unknown as Bar;

// 기능적으로 동일하지만, 나중에 두 개의 단언문을 분리하는 리팩터링을 한다면 unknown 형태가 더 안전합니다.
// any의 경우는 분리되는 순간 그 영향력이 전염병처럼 퍼지게 되지만 unknown의 경우는 분리되는 즉시 오류를 발생하게 되므로 더 안전합니다.
```

### unknown과 유사하지만 조금 다른 타입

- `object` 또는 `{}`를 사용하는 방법 역시 unknown만큼 범위가 넓은 타입이지만, unknown보다는 범위가 약간 좁습니다.
  - `{}` 타입은 null과 undefined를 제외한 모든 값을 포함합니다.
  - `object` 타입은 모든 비기본형(non-primitive) 타입으로 이루어집니다. 여기에는 true 또는 12 또는 "foo"가 포함되지 않지만 `객체와 배열은 포함`됩니다.
  - 정말로 null과 undefined가 불가능하다고 판단되는 경우에만 unknown 대신 `{}`를 사용하면 됩니다.

## 아이템 43 : 몽키 패치보다는 안전한 타입을 사용하기

- 전역 변수나 DOM에 데이터를 저장하지 말고, 데이터를 분리하여 사용해야 합니다.
- 내장 타입에 데이터를 저장해야 하는 경우, 안전한 타입 접근법 중 하나(보강이나 상용자 정의 인터페이스로 단언)를 사용해야 합니다.

### 자바스크립트는 객체와 클래스에 임의의 속성을 추가할 수 있을만큼 유연합니다.

```ts
// window나 document에 값을 할당하여 전역 변수를 만들 수 있습니다.
window.monkey = 'Tamarin';
document.monkey = 'Howler';

// DOM 엘리먼트에 데이터를 추가하기 위해서도 사용합니다.
const el = document.getElementById('colobus');
el.home = 'tree';

// 내장 기능의 프로토타입에도 속성을 추가할 수 있습니다.
RegExp.prototype.money = 'Capuchin';
/123/.monkey; // Capuchin
```

- 임의의 속성을 추가하는 것은 일반적으로 좋은 설계가 아닙니다. window에 데이터를 추가하면 그 데이터는 전역 변수가 되고 서로 멀리 떨어진 부분들 간에 의존성이 생겨 side effect를 고려해야만 합니다.

### 타입스크립트에서의 문제

```ts
// 타입 체커는 Document와 HTMLElement의 내장 속성에 대해서는 알고 있지만, 임의로 추가한 속성에 대해서는 알지 못합니다.
document.monkey = 'Tamarin'; // 'Document' 유형에 'monkey' 속성이 없습니다.

// any 단언문으로 문제 해결하기
(document as any).monkey = 'Tamarin'; // 정상
// any를 사용함으로써 타입 안전성을 상실하고, 언어 서비스를 사용할 수 없게 됩니다.
(document as any).monky = 'Tamarin'; // 정상. 오타
(document as any).monkey = /Tamarin/; // 정상. 잘못된 타입
```

- 최선의 해결책은 데이터를 분리하는 것입니다.

### 문제를 위한 차선책 1. 보강(augmentation)

```ts
// interface의 특수 기능 중 하나인 보강(augmentation)을 사용하는 것입니다.
interface Document {
  /** 몽키 패치의 속(genus) 또는 종(species) */
  monkey: string;
}

document.monkey = 'Tamarin'; // 정상
```

#### 보강을 사용하는 방법이 any보다 나은 점

- 타입이 더 안전합니다. 타입 체커는 오타나 잘못된 타입의 할당을 오류로 표시합니다.
- 속성에 주석을 붙일 수 있습니다.
- 속성에 자동완성을 사용할 수 있습니다.
- 몽키 패치가 어떤 부분에 적용되었는지 정확환 기록이 남습니다.

#### 보강의 모듈 영역 문제를 이해해야 합니다.

```ts
export {};
declare global {
  interface Document {
    /** 몽키 패치의 속(genus) 또는 종(species) */
    monkey: string;
  }
}
document.monkey = 'Tamarin'; // 정상
```

- 모듈의 관점에서(타입스크립트 파일이 import/export를 사용하는 경우), 제대로 동작하게 하려면 global 선언을 추가해야 합니다.
- 보강을 사용할 때 주의할 점은 모듈 영역(scope)과 관련이 있습니다. 보강은 전역적으로 적용되기 때문에, 코드의 다른 부분이나 라이브러리로부터 분리할 수 없습니다. 그리고 애플리케이션이 실행되는 동안 속성을 할당하면 실행 시점에서 보강을 적용할 방법이 없습니다. 특히 웹페이지 내의 HTML 엘리먼트를 조작할 때, 어떤 엘리먼트는 속성이 있고 어떤 엘리먼트는 속성이 없는 경우 문제가 됩니다. 이러한 이유로 속성을 string | undefined로 선언할 수도 있습니다.

### 문제를 위한 차선책 2. 더 구체적인 타입 단언문 사용

```ts
interface MonkeyDocument extends Document {
  /** 몽키 패치의 속(genus) 또는 종(species) */
  monkey: string;
}
(document as MonkeyDocument).monkey = 'Macaque'; // 정상
```

- MonkeyDocument는 Document를 확장하기 때문에 타입 단언문은 정상이며 할당문의 타입은 안전합니다.
- Document 타입을 건드리지 않고 별도로 확장하는 새로운 타입을 도입했기 떄문에 모듈 영역 문제도 해결할 수 있습니다(import하는 곳의 영역에만 해당됨).
- 몽키 패치된 속성을 참조하는 경우에만 단언문을 사용하거나 새로운 변수를 도입하면 됩니다.

## 아이템 44 : 타입 커버리지를 추가하여 타입 안정성 유지하기

- noImplicitAny가 설정되어 있어도, 명시적 any 또는 서드파티 타입 선언(@types)을 통해 any 타입은 코드 내에 여전히 존재할 수 있다는 점을 주의해야 합니다.
- 작성한 프로그램의 타입이 얼마나 잘 선언되었는지 추적해야 합니다. 추적함으로써 any의 사용을 줄여 나갈 수 있고 타입 안전성을 꾸준히 높을 수 있습니다.
- npm의 `type-cover-age` 패키지를 활용하여 any를 추적할 수 있습니다.

### noImplicitAny가 설정되어 있어도 any 타입이 여전히 프로그램 내에 존재하는 경우

- 명시적 any 타입
- 서드파티 타입 선언

### type-cover-age

```zsh
npx type-cover-age
# 9985 / 10117 98.69%
```

- any가 아니거나 any의 별칭이 아닌 타입을 가지고 있음을 알 수 있습니다.
- `--detail` 플래그를 붙이면, any 타입이 있는 곳을 모두 출력해 줍니다.

### any가 등장하는 몇 가지 문제와 그 해결책

#### 래핑 함수

```ts
// 표 형태의 데이터에서 어떤 종류의 열(column) 정보를 만들어 내는 함수를 만든다고 가정해 봅시다.
function getColumnInfo(name: string): any {
  return utils.buildColumnInfo(appState.data.Schema, name); // any를 반환합니다.
}
```

- utils.buildColumnInfo 호출은 any를 반환합니다. 그래서 getColumnInfo 함수의 반환에는 주석과 함께 명시적으로 any 구문을 추가했습니다.
- 이후에 utils.buildColumnInfo의 타입 정보를 추가해도 getColumnInfo 함수의 반환문에 있는 any 타입이 모든 타입 정보를 날려 버리게 됩니다.

#### 전체 모듈에 any 타입을 부여하는 것

```ts
// 어떤 것이든 오류 없이 임포트할 수 있습니다. 임포트한 모든 심벌은 any 타입이고, 임포트한 값이 사용디ㅗ는 곳마다 any 타입을 양산하게 됩니다.
declare module 'my-module';

import { someMethod, someSymbol } from 'my-module';
const pt1 = {
  x: 1,
  y: 2,
}; // 타입이 { x:number; y: number}
const pt2 = someMethod(pt1, someSymbol); // 정상, pt2 타입이 any
```

- 일반적으로 모듈 사용법과 동일하기 때문에 타입 정보가 모두 제거됐다는 것을 간과할 수 있습니다.
- 동료가 모든 타입 정보를 날려 버렸찌만, 알아채지 못하는 경우일 수도 있습니다.
- 가끔 해당 모듈을 점검해야 합니다. 어느 순간 모듈에 대한 공식 타입 선언이 릴리스되었을지도 모릅니다. 또는 모듈을 충분히 이해한 후에 직접 타입 선언을 작성해서 커뮤니티에 공개할 수도 있습니다.

#### 타입에 버그가 있는 경우

- 아이템 29의 조언(값을 생성할 때는 엄격하게 타입을 적용)을 무시한 채로, 함수가 유니온 타입을 반환하도록선언하고 실제로는 유니온 타입보다 훨씬 더 특정된 값을 반환하는 경우입니다. 선언된 타입과 실제 반환된 타입이 맞지 않는다면 어쩔 수 없이 any 단언문을 사용해야 합니다. 그러나 나중에 라이브러리가 업데이트되어 함수의 선언문이 제대로 수정된다면 any를 제거해야합니다. 또는 직접 라이브러리의 선언문을 수정하고 커뮤니티에 공개할 수도 있습니다.
