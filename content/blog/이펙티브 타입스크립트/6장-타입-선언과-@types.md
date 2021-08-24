---
title: 6장 타입 선언과 @types
date: 2021-08-24 13:08:19
category: 이펙티브 타입스크립트
tags: []
draft: true
---

## 아이템 45 : devDependencies에 typescript와 @types 추가하기

- 타입스크립트를 시스템 레벨로 설치하면 안 됩니다. 타입스크립트를 프로젝트의 devDependencies에 포함시키고 팀원 모두가 동일한 버전을 사용하도록 해야 합니다.
- @types 의존성은 dependencies가 아니라 devDependencies에 포함시켜야 합니다. 런타임에 @types가 필요한 경우라면 별도의 작업이 필요할 수 있습니다.

### npm의 의존성 구분

- dependencies : 현재 프로젝트를 실행하는 데 필수적인 라이브러리들이 포함됩니다. 프로젝트를 npm에 공개하여 다른 사용자가 해당 프로젝트를 설치한다면, dependencies에 들어 있는 라이브러리도 함께 설치될 것입니다. 이러한 현상이 전이(transitive) 의존성이라고 합니다.
- devDependencies : 현재 프로젝트를 개발하고 테스트하는 데 사용되지만, 런타임에는 필요 없는 라이브러리들이 포함됩니다. 프로젝트를 npm에 공개하여 다른 사용자가 해당 프로젝트를 설치한다면, devDependencies에 포함된 라이브러리들은 제외된다는 것이 dependencies와 다른 점입니다.
- peerDependencies : 런타임에 필요하긴 하지만, 의존성을 직접 관리하지 않는 라이브러리들이 포함됩니다. 단적인 예로 플러그인을 들 수 있습니다.

## 아이템 46 : 타입 선언과 관련된 세 가지 버전 이해하기

- @types 의존성과 관련된 세 가지 버전이 있습니다. 라이브러리 버전, @types 버전, 타입스크립트 버전입니다.
- 라이브러리를 업데이트하는 경우, 해당 @types 역시 업데이트해야 합니다.
- 타입 선언을 라이브러리에 포함하는 것과 DefinitelyTyped에 공개하는 것 사이의 장단점을 이해해야 합니다. 타입스크립트로 작성된 라이브러리라면 타입 선언을 자체저긍로 포함하고, 자바스크립트로 작성된 라이브러리라면 타입 선언을 DefinitelyTyped에 공개하는 것이 좋습니다.

## 아이템 47 : 공개 API에 등장하는 모든 타입을 익스포트하기

- 공개 메서드에 등장한 어떤 형태의 타입이든 익스포트합시다. 어차피 라이브러리 사용자가 추출할 수 있으므로, 익스포트하기 쉽게 만드는 것이 좋습니다.

### 서드파이의 모듈에서 익스포트 되지 않은 타입 찾기

```ts
type MySanta = ReturnType<typeof getGift>;
type MyName = Parameters<typeof getGift>[0];
```

## 아이템 48 : API 주석에 TSDoc 사용하기

- 익스포트된 함수, 클래스, 타입에 주석을 달 때는 JSDoc/TSDoc 형태를 사용합시다. JSDoc/TSDoc 형태의 주석을 달면 편집기가 주석 정보를 표시해 줍니다.
- @param, @@returns 구문과 문서 서식을 위해 마크다운을 사용할 수 있습니다.
- 주석에 타입 정보를 포함하면 안 됩니다.

## 아이템 49 : 콜백에서 this에 대한 타입 제공하기

- this 바인딩이 동작하는 원리를 이해해야 합니다.
  - let이나 const로 선언된 변수가 렉시컬 스코프(lexical scope)인 반면, this는 다이나ㄴ믹 스코프(dynamic scope)입니다. 다이나믹 스코프의 값은 `정의된` 방식이 아니라 `호출된` 방식에 따라 달라집니다.
  - this는 전형적으로 객체의 현재 인스턴스를 참조하는 클래스에서 가장 많이 쓰입니다.
  - 자바스크립트에서 call을 사용하면 명시적으로 this 바인딩할 수 있습니다.
- 콜백 함수에서 this를 사용해야 한다면, this는 API의 일부가 되는 것이기 때문에 반드시 타입 선언에 포함해야 합니다.

### 클래스의 this

```ts
class ResetButton {
  /*
   * 생성자에서 바인딩하면, onClick 속성에 this가 바인딩되어 해당 인스턴스에 생성됩니다.
   * 속성 탐색 순서(lookup sequence)에서 onClick 인스턴스 속성은 onClick 프로토타입 속성보다 앞에 놓이므로 바인딩된 함수를 참조하게 됩니다.
   */
  constructor() {
    this.onClick = this.onClick.bind(this);
  }
  render() {
    return makeButton({ text: 'Reset', onClick: this.onClick });
  }
  onClick() {
    alert(`Reset ${this}`);
  }
}
```

```ts
// before
class ResetButton {
  render() {
    return makeButton({ text: 'Reset', onClick: this.onClick });
  }
  /** 화살표 함수를 사용하면 인스턴스가 생성될 때마다 제대로 바인딩된 this를 가지는 새 함수를 생성하게 됩니다. */
  onClick = () => {
    alert(`Reset ${this}`);
  };
}

// after
class ResetButton {
  constructor() {
    var _this = this;
    this.onClick = function () {
      alert('Reset ' + _this);
    };
  }
  render() {
    return makeButton({ text: 'Reset', onClick: this.onClick });
  }
}
```

## 아이템 50 : 오버로딩 타입보다는 조건부 타입을 사용하기

- 오버로딩 타입보다 조건부 타입을 사용하는 것이 좋습니다. 조건부 타입은 추가적인 오버로딩 없이 유니온 타입을 지원할 수 있습니다.
  - 오버로딩 타입이 작성하기는 쉽지만, 조건부 타입은 개별 타입의 유니온으로 일반화하기 때문에 타입이 더 정확해집니다. 타입 오버로딩이 필요한 경우에 가끔 조건부 타입이 필요한 상황이 발생합니다. 각각의 오버로딩 타입이 독립적으로 처리되는 반면, 조건부 타입은 타입 체커가 단일 표현식으로 받아들이기 때문에 유니온 문제를 해결할 수 있습니다. 오버로딩 타입을 작성 중이라면 조건부 타입을 사용해서 개선할 수 있을지 검토해 보는 것이 좋습니다.

### CASE 1 : 모호한 타입 처리

```ts
function double(x: number | string): number | string;
function double(x: any) {
  return x + x;
}
const num = double(12); // string | number
const str = double('x'); // string | number
```

### CASE 2 : 과한 처리

```ts
function double<T extends number | string>(x: T): T;
function double(x: string): string;
function double(x: any) {
  return x + x;
}
const num = double(12); // 12
const str = double('x'); // 'x'
```

### CASE 3 : 미숙한 처리

```ts
function double(x: number): number;
function double(x: string): string;
function double(x: string): string;
function double(x: any) {
  return x + x;
}
const num = double(12); // number
const str = double('x'); // string
function f(x: number | string) {
  return double(x);
  // 'string | number' 형식의 인수는 'string' 형식의 매개변수에 할당될 수 없습니다.
}
```

### CASE 4 : 조건부 타입

```ts
//
function double<T extends number | string>(
  x: T,
): T extends string ? string : number;
const num = double(12); // number
const str = double('x'); // string
function double(x: any) {
  return x + x;
}
function f(x: number | string) {
  return double(x);
}
```

## 아이템 51 : 의존성 분리를 위해 미러 타입 사용하기

- 필수가 아닌 의존성을 분리할 때는 구조적 타이핑을 사용하면 됩니다.
- 작성 중인 라이브러리가 의존하는 라이브러리의 구현과 무관하게 타입에만 의존한다면, 필요한 선언부만 추출하여 작성 중인 라이브러리에 넣는 것(미러링, mirroring)을 고려해 보는 것도 좋습니다.
- 다른 라이브러리의 타입이 아닌 구현에 의존하는 경우에도 동일한 기법을 적용할 수 있고 타입 의존성을 피할 수 있습니다. 그러나 프로젝트의 의존성이 다양해지고 필수 의존성이 추가됨에 따라 미러링 기법을 적용하기가 더 어려워집니다. 다른 라이브러리의 타입 선언의 대부분을 추출해야 한다면, 차라리 명시적으로 @types 의존성을 추가하는 게 낫습니다.
- 미러링 기법은 유닛 테스트와 상용 시스템 간의 의존성을 분리하는 데도 유용합니다.
- 공개한 라이브러리를 사용하는 자바스크립트 사용자가 @types 의존성을 가지지 않게 해야 합니다. 그리고 웹 개발자가 NodeJS 관련된 의존성을 가지지 않게 해야 합니다.

## 아이템 52 테스팅 타입의 함정에 주의하기

- 타입을 테스트 할 때는 특히 함수 타입의 동일성(equality)과 할당 가능성(assignability)의 차이점을 알고 있어야 합니다.
- 콜백이 있는 함수를 테스트할 때, 콜백 매개변수의 추론된 타입을 체크해야 합니다. 또한 this가 API의 일부분이라면 역시 테스트해야 합니다.
- 타입 관련된 테스트에서 any를 주의해야 합니다. 더 엄격한 테스트를 위해 dtslint 같은 도구를 사용하는 것이 좋습니다.

### dtslint

```ts
const beatles = ['john', 'paul', 'george', 'ringo'];
map(beatles, function(
  name, // $ExpectType string
  i, // $ExpectType number
  array, // $ExpectType string[]
) {
  this, // $ExpectType string[]
  return name.length, // $ExpectType number[]
})
```

- DefinitelyTyped의 타입 선언을 위한 도구는 dtslint 입니다. dtslint는 특별한 주석을 통해 작동합니다.
- dtslint는 할당 가능성을 체크하는 대신 각 심벌의 타입을 추출하여 글자 자체가 같은지 비교합니다. 이 비교 과정은 편집기에서 타입 선언을 눈으로 보고 확인하는 것과 같은데, dtslint는 이러한 과정을 자동화합니다. 그러나 글자 자체가 같은지 비교하는 방식에는 단점이 있습니다. number|string과 string|number는 같은 타입이지만 글자 자체로 보면 다르기 때문에 다른 타입으로 인식 됩니다. string과 any를 비교할 때도 마찬가지인데, 두 탑입은 서로 간에 할당이 가능하지만 글자 자체는 다르기 때문에 다른 타입으로 인식 됩니다.
