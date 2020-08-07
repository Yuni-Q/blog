---
title: TypeScript 버전에 따른 변경점
date: 2020-02-01 13:02:90
category: typescript
tags: ['typesciprt', 'version']
draft: false
---

## 3.0

- 새로운 개념의 프로젝트 참조가 도입되었습니다. 프로젝트 참조를 통해 TypeScript 프로젝트는 다른 TypeScript 프로젝트에 의존 할 수 tsconfig.json있습니다. 특히 파일이 다른 tsconfig.json파일 을 참조 할 수 있습니다. 이러한 종속성을 지정하면 TypeScript가 빌드 순서 및 출력 구조를 이해할 수 있는 방법을 제공하므로 코드를 더 작은 프로젝트로 쉽게 분할 할 수 있습니다.
- — build 프로젝트 참조와 함께 작동하여 더 빠른 TypeScript 빌드를 가능하게 하는 플래그인 tsc에 대한 새로운 모드가 도입되었습니다.
- 여러 새로운 기능에 대한 지원을 추가하여 튜플 유형으로 함수 매개 변수 목록과 상호 작용합니다.
- 튜플 유형의 나머지 매개 변수를 이산 매개 변수로 확장합니다.
- 튜플 형식의 스프레드 식을 이산 형 인수로 확장
- 일반 휴식 매개 변수 및 해당 튜플 유형의 추론.
- 튜플 유형의 선택적 요소
- 튜플 유형의 나머지 요소.
- unknown이라는 새로운 최상위 유형이 도입되었습니다. unknown의 형식 안전 대응입니다(any). 뭐든에 할당 할 것입니다. 하지만 unknown 그 자체 입니다. 아무것도에 할당 할 수 없는 any 종류의 주장 또는 제어 흐름을 기반으로 축소하지 않습니다. 마찬가지로, unknown은 더 구체적인 유형을 주장하거나 좁히지 않고서는 어떠한 작업도 허용되지 않습니다.
- JSX 네임스페이스에 새로운 유형 별칭을 지원합니다. LibraryManagedAttributes. 이 헬퍼 유형은 컴포넌트를 Props 대상으로하는 JSX 표현식을 확인하기 위해 사용하기 전에 컴포넌트 유형의 변환을 정의 합니다. 따라서 제공된 소품과 유추 된 소품 사이의 충돌을 처리하는 방법, 추론을 매핑하는 방법, 선택성을 처리하는 방법 및 다른 장소의 추론을 결합하는 방법과 같은 사용자 정의가 가능합니다.
- TypeScript는 새로운 삼중 슬래시 참조 지시문 ( /// \<reference lib=”name” />)을 추가하여 파일에 기존의 내장 lib 파일을 명시 적으로 포함 할 수 있습니다.

## 3.1

- 매핑 개체 유형 튜플과 배열. 이제 특정 형상 부재 신형 만드는 대신, 새로운 튜플, 어레이를 제조 동안 push(), pop() 그리고 length 변환 되어 있습니다.
- const에 동일한 범위에서 이러한 함수의 속성에 간단히 할당하여 함수 선언 및 선언 된 기능에 대한 속성을 정의하는 기능을 제공합니다. 이를 통해 namespace해킹에 의존하지 않고 표준 JavaScript 코드를 작성할 수 있습니다.
- 노드 모듈 확인을 사용할 때 TypeScript가 package.json파일을 열어서 읽어야하는 파일을 알아낼 때 먼저라는 새 필드를 확인합니다.

## 3.2

- — strictBindCallApply를 새로 선 보였습니다. bind, call 및 apply 함수 객체의 메소드가 강력하게 형식화하고 엄격하게 확인됩니다.
- 객체 리터럴은 이제 Object.assign 함수 및 JSX 리터럴과 유사한 교차 유형을 생성하는 일반 스프레드 표현식을 허용 합니다.
- 일반 변수에서 나머지 바인딩을 제거 할 수도 있습니다. 이것은 미리 정의 된 사용하여 달성 Pick과 Exclude에서 도우미 유형 lib.d.ts, 문제의 일반적인 유형뿐만 아니라 destructuring 패턴의 다른 바인딩의 이름을 사용합니다.
- BigInts에 대한 유형 검사를 제공 할뿐만 아니라 타겟팅 할 때 BigInt 리터럴을 방출 할 수 있도록 지원합니다. BigInt 지원은 bigint(모두 소문자) 라는 새로운 기본 유형을 도입합니다 . 함수 bigint를 호출 BigInt()하거나 n정수 숫자 리터럴의 끝에를 추가하여 BigInt 리터럴을 작성 하여를 얻을 수 있습니다.
- 판별 속성으로 간주되는 규칙을 완화하여 좁히기가 더 쉬워집니다. 노동 조합의 일반적인 특성은 이제 그들이 포함으로 판별 식으로 간주됩니다 일부 (예를 들어, 문자열 리터럴, 싱글 타입 null, 또는 undefined), 그들은 어떤 제네릭을 포함하지 않습니다.
- unwrap함수 본문에서 축소가 올바르게 작동합니다 .
- tsconfig.json에서들 node_modules. 에서 “extends”필드 의 기본 경로를 사용하는 tsconfig.json경우 TypeScript는 node_modules패키지를 제공합니다.
- tscTypeScript 컴파일러 인이라고하는 새로운 플래그를 지원합니다 — showConfig. 를 실행 tsc — showConfig하면 TypeScript는 필드 tsconfig.json에서 상속 된 옵션을 계산 한 후 유효를 계산하여 extends 인쇄합니다. 일반적으로 구성 문제를 진단하는 데 유용 할 수 있습니다.
- JavaScript 파일을 쓸 때 allowJs 사용할 수 있습니다. Object.defineProperty. 즉, JavaScript 파일에서 유형 검사를 활성화 할 때 ( checkJs옵션을 설정하거나 // @ts-check파일 맨 위에 주석을 추가하여) 더 나은 완성도를 달성하고 유형 검사를 강화할 수 있습니다 .

## 3.3

- 이전 버전의 TypeScript에서는 호출 가능한 형식의 공용체 가 동일한 매개 변수 목록이있는 경우 에만 호출 할 수 있었습니다. TypeScript 3.3에서는 더 이상 오류가 아닙니다.
- — build모드의 — watch플래그 는 증분 파일 감시도 활용합니다. 이는 빠른 빌드를 의미 할 수 있습니다 — build — watch. 테스트에서이 기능은 원래 시간 의 빌드 시간 을 50 %에서 75 %까지 줄였습니다. 특정 풀을 보기 위해 변경에 대한 원래 풀 요청에 대한 자세한 내용을 읽을 수 있지만 대부분의 복합 프로젝트 사용자는 여기에서 상당한 승리를 볼 수 있습니다.

## 3.4

- — incrementalTypeScript가 마지막 컴파일에서 프로젝트 그래프에 대한 정보를 저장하도록 하는 새로운 플래그가 도입되었습니다 . 다음에 TypeScript를 사용하여 호출 — incremental하면 해당 정보를 사용하여 가장 비용이 많이 드는 유형 검사 및 프로젝트 변경 방법을 감지합니다.
- 이제 다른 일반 함수에서 유추하여 자유 형식 변수를 유추 할 때 일반 함수 유형을 생성 할 수 있습니다. 이는 많은 기능 구성 패턴이 3.4에서 더 잘 작동 함을 의미합니다.
- 읽기 전용 배열과 비슷한 유형을 조금 더 쉽게 사용할 수 있습니다. ReadonlyArray 유형은 설명 Array만 읽을 수 있습니다.참조가 있는 변수 ReadonlyArray는 배열의 요소를 추가, 제거 또는 교체 할 수 없습니다.
- 배열 유형에 ReadonlyArray 새로운 readonly 수정자를 사용 하는 새로운 구문이 도입되었습니다 .
- readonly 튜플에 대한 새로운 지원도 도입되었습니다 . 우리는 지금 배열 속기 구문으로 할 수 있듯이 튜플 유형 앞에 readonly키워드를 readonly붙여 튜플 로 만들 수 있습니다. 예상대로 슬롯을 쓸 수 있는 일반 튜플과 달리 튜플 readonly은 해당 위치에서 읽기만 허용합니다.
- readonly에서 매핑 된 형식 의 수정자는 배열과 같은 형식을 해당하는 형식으로 자동 변환 readonly 합니다.
- const 어설션 이라는 리터럴 값에 대한 새로운 구성이 도입되었습니다 . 구문은 const 형식 이름 대신 형식 어설션입니다 ( ex) 123 as const. const 어설션으로 새로운 리터럴 표현을 만들 때 언어에 신호를 보낼 수 있습니다.
- ECMAScript의 새로운 유형 확인 기능인 globalThis전역 변수를 참조하는 전역 변수를 지원합니다. 위의 솔루션과 달리 globalThis 다양한 환경에서 사용할 수 있는 글로벌 범위에 액세스하기위한 표준 방법을 제공합니다.

## 3.5

- 유형 검사 및 증분 빌드에 대한 여러 최적화를 소개합니다.
- 형식 검사를보다 효율적으로 수행하기 위해 TypeScript 3.4에 대한 특정 최적화가 포함되어 있습니다. 이러한 개선 사항은 형식 확인이 코드 완성 목록과 같은 작업을 수행하는 편집기 시나리오에서 훨씬 더 두드러집니다.
- — incremental 컴파일러 상태, 파일을 찾은 이유, 파일이있는 위치 등 세계 상태 계산 방법에 대한 정보를 저장 하여 3.4의 빌드 모드를 개선합니다 . — build모드에서 우리는 TypeScript 3.4에 비해 재 구축 시간을 68 % 나 줄일 수 있음을 발견했습니다.
- 새로운 Omit도우미 유형이 도입 되어 일부 속성이 원본에서 삭제 된 새로운 유형을 만듭니다.
- 형식 검사기는 제공된 모든 속성이 일부 공용체 멤버에 속 하고 적절한 형식인지 확인합니다. 즉, 위의 샘플에서 오류가 올바르게 발생합니다.
- 판별 속성 유형에 할당 할 때 typesceipt 3.5에서 T언어는 실제로 것이다 더 나아가 같은 유형을 분해 S가능한 모든 주민 유형의 조합으로. 이 경우, 사람 boolean의 합집합 true과 false,이 S(A)의 조합으로 간주된다 { done: false, value: number }하고 { done: true, value: number }.
- 생성자 함수에서도 작동하도록이 동작을 일반화합니다.

## 3.6

- 익숙하지 않은 사람들을 위해 TypeScript는 선택적 정적 유형을 추가하여 JavaScript를 기반으로하는 언어입니다. 이러한 유형은 TypeScript 컴파일러에서 검사하여 맞춤법 오류 및 함수 호출과 같은 프로그램의 일반적인 오류를 포착 할 수 있습니다. 그런 다음 TypeScript 컴파일러 및 Babel과 같은 도구를 사용하여 모든 최신 표준 기능을 사용하는 TypeScript 코드를 모든 브라우저 또는 런타임 (ES3 또는 ES5를 지원하는 훨씬 오래된 버전)에서 작동하는 표준 호환 ECMAScript 코드로 변환 할 수 있습니다.
- TypeScript는 유형 검사 및 새로운 ECMAScript 기능을 뛰어 넘습니다. 편집기 툴링은 일류 시민으로 간주되며 TypeScript 프로젝트의 핵심 부분으로, 코드 완성, 리팩토링 및 일련의 다른 편집기에서 빠른 수정과 같은 기능을 제공합니다 . 실제로 Visual Studio 또는 Visual Studio Code에서 JavaScript 파일을 이미 편집 한 경우 실제로 해당 경험은 TypeScript에서 제공되므로 모르는 사이에 이미 TypeScript를 사용했을 수 있습니다!
- 더 엄격한 발전기
- 보다 정확한 어레이 확산
- 약속 된 UX 개선
- 식별자에 대한 더 나은 유니 코드 지원
- import.meta SystemJS 지원
- get접근 set자는 주변 상황에서 허용됩니다
- 주변 클래스 및 함수가 병합 될 수 있음
- API를 지원하는 방법 — build및 — incremental
- 새로운 TypeScript 놀이터
- 세미콜론 인식 코드 편집
- 똑똑한 자동 가져 오기
- 클래스 멤버 “constructor”는 이제 생성자입니다
- DOM 업데이트
- 더 이상 병합되지 않는 JSDoc 설명
- 키워드가 이스케이프 시퀀스를 포함 할 수 없음

## [3.8](https://github.com/yeonjuan/Typescript-Handbook-ko/blob/master/release-notes/typescript-3.8.md)

- 타입-전용 Imports 와 Exports (Type-Only Imports and Exports)
  - 타입 전용 import가 생긴다면 type과 함수를 구분할 수 있을 것 같아 매우 좋아 보입니다.
  - 이 기능은 대부분의 사용자에겐 생각할 필요가 없을 수도 있지만 --isolatedModules, TypeScript의 transpileModule API, 또는 Babel에서 문제가 발생하면 이 기능과 관련이 있을 수 있습니다.
    - 하지만 두 기능에 모두 사용하고 있지 않아서 크게 와 닫지는 않습니다.
  - import type은 타입 표기와 선언에 사용될 선언만 import 합니다. 이는 항상 완전히 제거되므로, 런타임에 남아있는 것은 없습니다. 마찬가지로, export type은 타입 문맥에 사용할 export만 제공하며, 이 또한 TypeScript의 출력물에서 제거됩니다.
  - import type과 함께, TypeScript 3.8은 런타임 시 사용되지 않는 import에서 발생하는 작업을 제어하기 위해 새로운 컴파일러 플래그를 추가합니다: importsNotUsedAsValues. 이 플래그는 3 가지 다른 값을 가집니다:
    - remove: 이는 imports를 제거하는 현재 동작이며, 계속 기본값으로 작동할 것이며, 기존 동작을 바꾸는 변화가 아닙니다.
    - preserve: 이는 사용되지 않는 값들을 모두 보존합니다. 이로 인해 imports/side-effects가 보존될 수 있습니다.
    - error: 이는 모든 (preserve option 처럼) 모든 imports를 보존하지만, import 값이 타입으로만 사용될 경우 오류를 발생시킵니다. 이는 실수로 값을 import하지 않지만 사이드 이팩트 import를 명시적으로 만들고 싶을 때 유용합니다.
- ECMAScript 비공개 필드 (ECMAScript Private Fields)
  - TypeScript 3.8 은 ECMAScript의 stage-3 클래스 필드 제안의 비공개 필드를 지원합니다.
    - 비공개 필드는 # 문자로 시작합니다. 때때로 이를 비공개 이름(private names) 이라고 부릅니다.
    - 모든 비공개 필드 이름은 이를 포함한 클래스 범위에서 유일합니다.
    - public 또는 private 같은 TypeScript 접근 지정자는 비공개 필드로 사용될 수 없습니다.
    - JS 사용자로부터도 비공개 필드는 이를 포함한 클래스 밖에서 접근하거나 탐지할 수 없습니다! 때때로 이를 강한 비공개(hard privacy) 라고 부릅니다.
    - "강한" 비공개와 별도로, 비공개 필드의 또 다른 장점은 유일하다는 것입니다. 예를 들어, 일반적인 프로퍼티 선언은 하위클래스에서 덮어쓰기 쉽습니다. 비공개 필드에서는, 포함하고 있는 클래스에서 각각의 필드 이름이 유일하기 때문에 이에 대해 걱정하지 않아도 됩니다. 알아 두면 좋은 또 다른 점은 다른 타입으로 비공개 필드에 접근하면 TypeError 를 발생한다는 것입니다. 마자막으로, 모든 일반 .js 파일 사용자들의 경우, 비공개 필드는 항상 할당되기 전에 선언되어야 합니다. JavaScript는 항상 사용자들에게 선언되지 않은 프로퍼티에 접근을 허용했지만, TypeScript는 항상 클래스 프로퍼티 선언을 요구했습니다. 비공개 필드는, .js 또는 .ts 파일에서 동작하는지 상관없이 항상 선언이 필요합니다.
    - 프로퍼티에서, TypeScript의 private 지정자는 완전히 지워집니다 - 이는 런타임에서는 완전히 일반 프로퍼티처럼 동작하며 이것이 private 지정자로 선언되었다고 알릴 방법이 없습니다. private 키워드를 사용할 때, 비공개는 오직 컴파일-타임/디자인-타임에만 시행되며, JavaScript 사용자에게는 전적으로 의도-기반입니다. 이 같은 종류의 "약한 비공개(soft privacy)"는 사용자가 API에 접근할 수 없는 상태에서 일시적으로 작업을 하는 데 도움이 되며, 어떤 런타임에서도 동작합니다. 반면에, ECMAScript의 # 비공개는 완벽하게 클래스 밖에서 접근 불가능합니다. 이런 강한 비공개(hard privacy)는 아무도 내부를 사용할 수 없도록 엄격하게 보장하는데 유용합니다. 만약 라이브러리 작성자일 경우, 비공개 필드를 제거하거나 이름을 바꾸는 것이 급격한 변화를 초래서는 안됩니다. 언급했듯이, 다른 장점은 ECMAScript의 # 비공개가 진짜 비공개이기 때문에 서브클래싱을 쉽게 할 수 있다는 것입니다. ECMAScript # 비공개 필드를 사용하면, 어떤 서브 클래스도 필드 네이밍 충돌에 대해 걱정할 필요가 없습니다. TypeScript의 private프로퍼티 선언에서는, 사용자는 여전히 상위 클래스에 선언된 프로퍼티를 짓밟지 않도록 주의해야 합니다. 한 가지 더 생각해봐야 할 것은 코드가 실행되기를 의도하는 곳입니다. 현재 TypeScript는 이 기능을 ECMAScript 2015 (ES6) 이상 버전을 대상으로 하지 않으면 지원할 수 없습니다. 이는 하위 레벨 구현이 비공개를 강제하기 위해 WeakMap을 사용하는데, WeakMap은 메모리 누수를 잃으키지 않도록 폴리필될 수 없기 때문입니다. 반면, TypeScript의 private-선언 프로퍼티는 모든 대상에서 동작합니다- ECMAScript3에서도! 마지막 고려 사항은 속도 일수 있습니다: private 프로퍼티는 다른 어떤 프로퍼티와 다르지 않기 때문에, 어떤 런타임을 대상으로 하단 다른 프로퍼티와 마찬가지로 접근 속도가 빠를 수 있습니다. 반면에, # 비공개 필드는 WeakMap을 이용해 다운 레벨 되기 때문에 사용 속도가 느려질 수 있습니다. 어떤 런타임은 # 비공개 필드 구현을 최적화 하고, 더 빠른 WeakMap을 구현하고 싶을 수 있지만, 모든 런타임에서 그렇지 않을 수 있습니다.
- export \* as ns 구문 (export \* as ns Syntax)
- 최상위-레벨 await (Top-Level await)
  - 유의할 점이 있습니다: 최상위-레벨 await은 module의 최상위 레벨에서만 동작하며, 파일은 TypeScript가 import나 export를 찾을 때에만 모듈로 간주됩니다. 일부 기본적인 경우에 export {}와 같은 보일러 플레이트를 작성하여 이를 확인할 필요가 있습니다.이러한 경우가 예상되는 모든 환경에서 최상위 레벨 await은 동작하지 않을 수 있습니다. 현재, target 컴파일러 옵션이 es2017 이상이고, module이 esnext 또는 system인 경우에만 최상위 레벨 await을 사용할 수 있습니다. 몇몇 환경과 번들러내에서의 지원은 제한적으로 작동하거나 실험적 지원을 활성화해야 할 수도 있습니다.
- es2020용 target과 module (es2020 for target and module)
- JSDoc 프로퍼티 지정자 (JSDoc Property Modifiers)
- 리눅스에서 더 나은 디렉터리 감시와 watchOptions
- "빠르고 느슨한" 증분 검사

## [4.0](https://meetup.toast.com/posts/247?fbclid=IwAR1ueG9ChNGpaR7yl4w0nGnpttTA4SUQAGaEqcLYtn2vEA1HmmU_znNbJTA)

### 가변 인자(variadic) 튜플 타입

- variadic : 프로그래밍 언어에서 함수가 고정되지 않은 개수의 인자(argument)를 받을 때 붙이는 이름입니다.

#### 1. 제네릭 타입을 확장(spread) 연산자와 사용할 수 있다.

```typescript
function tail<T extends any[]>(arr: readonly [any, ...T]) {
	const [_ignored, ...rest] = arr;
	return rest;
}

const myTuple = [1, 2, 3, 4] as const;
const myArray = ['hello', 'world'];

// r1: [2, 3, 4]
const r1 = tail(myTuple);

// r2: [2, 3, ...string[]]
const r2 = tail([...myTuple, ...myArray] as const);
```

#### 2. 튜플 타입을 확장 연산자를 사용하여 타입 정의 할 수 있다.

- 4.0 이전에는 튜플 타입으로 정의된 타입을 확장 연산자를 사용하여 새로운 타입을 지정하려고 시도하면 오류였습니다. 배열 타입만 확장 연산자를 사용하여 새로운 타입을 만들수 있었는데, 4.0에서는 이미 선언된 튜플 타입으로 확장 연산자를 사용하여 새로운 타입을 만들 수 있습니다.

```typescript
/* 4.0 이전 */
type Strings = [string, string];
type Numbers = [number, number];

type NumNum = [...Numbers];
//             ~~~~~~~~~~
// 오류! A rest element type must be an array type.

type StrStrNumNum = [...Strings, ...Numbers];
//                   ~~~~~~~~~~
// 오류! A rest element must be last in a tuple type.

type NumArr = number[];
type Nums = [...NumArr]; // OK
```

```typescript
/* 4.0 */
type Strings = [string, string];
type Numbers = [number, number];

// [string, string, number, number]
type StrStrNumNum = [...Strings, ...Numbers];
```

- 배열의 어느 위치에서든지 스프레드 연산자를 사용하여 확장 가능한데, 길이가 정해지지 않는 배열 타입이 확장되면 나머지 요소 타입을 포함하여 연속적인 배열 타입을 가지게 됩니다.

```typescript
type Strings = [string, string];
type Numbers = number[];

// [string, string, ...(number | boolean)[]]
type Unbounded = [...Strings, ...Numbers, boolean];
```

- concat 함수의 시그니쳐 타입을 정의할 수 있습니다.

```typescript
type Arr = readonly any[];

function concat<T extends Arr, U extends Arr>(arr1: T, arr2: U): [...T, ...U] {
	return [...arr1, ...arr2];
}

type NumNumNum = [number, number, number];
type StrStrStr = [string, string, string];

const numArr: NumNumNum = [1, 2, 3];
const strArr: StrStrStr = ['NHN', 'FE', 'TOAST UI'];

// [number, number, number, string, string, string]
const test = concat(numArr, strArr);

test[0] = "I'm string";
// 4.0에서는 튜플 타입 정의로 0인덱스가 string 타입이 아니라 number 타입이어야 하므로 오류!
```

- 함수의 매개변수를 부분적으로 적용하여 새로운 함수를 반환하는 partialCall함수가 있을 경우

```typescript
function partialCall(f, ...headArgs) {
	return (...tailArgs) => f(...headArgs, ...tailArgs);
}

// 4.0에서 튜플 타입과 확장 연산자를 사용하여 타입 정의
type Arr = readonly unknown[];

function partialCall<T extends Arr, U extends Arr, R>(
	f: (...args: [...T, ...U]) => R,
	...headArgs: T
) {
	return (...b: U) => f(...headArgs, ...b);
}
```

- 4.0에서 튜플 타입의 확장 연산자를 활용하면, partialCall과 같은 복잡한 함수의 매개변수의 타입 추론이 좀 더 정확해 졌습니다.

```typescript
const foo = (x: string, y: number, z: boolean) => {};

// x의 타입의 number가 아니라 string이므로 오류!
const f1 = partialCall(foo, 100);
//                          ~~~

// 함수 foo가 받을 수 있는 매개변수의 갯수가 다르므로 오류!
const f2 = partialCall(foo, 'hello', 100, true, 'oops');
//                                              ~~~~~~

const f3 = partialCall(foo, 'hello'); // 정상 동작 'f3: (y: number, z: boolean) => void'

f3(123, true); // 정상 동작!

f3(); // 전달받아야 하는 매개변수가 2개이므로 오류 발생!

// 두번째 매개변수 타입은 boolean인데 string 타입을 넘겨주므로 오류!
f3(123, 'hello');
//      ~~~~~~~
```

- concat, tail, partialCall 과 같이 가변 인자를 받는 함수에서 튜플 타입을 사용하여 많은 패턴에서 활용될 수 있습니다.
- 자바스크립트에 내장된(built-in) bind메소드와 사용할 때 타입 검사를 더 잘할 수 있을 것입니다.

### 이름을 붙일 수 있는 튜플 요소

- 함수의 매개변수를 튜플타입으로 선언해서 사용하면, 타입 검사에 영향을 미치지 않지만 가독성 측면에서 매개변수의 의도를 파악하기 어렵습니다.

```typescript
function foo1(...args: [string, number]): void {
	// ...
}

function foo2(arg0: string, arg1: number): void {
	// ...
}
```

- 튜플에 이름을 붙여줄 수 있습니다.

```typescript
type Range = [start: number, end: number];
type Foo = [first: number, second?: string, ...rest: any[]];

type Bar = [first: string, number];
//                         ~~~~~~
// 오류! Tuple members must all have names or all not have names.
// (튜플 타입 지정 시 모두 라벨로 이름을 지정하든지, 모두 라벨 이름을 사용하지 안하든지 해야함)
```

```typescript
// 사용 예시
function foo3(x: [first: string, second: number]) {
  // ...
  let [a, b] = x;
}
```

- 튜플과 매개변수 목록을 사용하는 패턴에서 type-safe하는 방법으로 사용할 수 있습니다.
  - type-safe : 데이터 타입의 다른 타입으로 잘못 취급될 수 있는 언어에서 나타날 수 있는 오류의 영향을 받지 않습니다.

### 클래스 생성자로부터 속성 타입 추론

- 4.0에서는 noImplicitAny옵션을 활성화시켰을 때, 클래스의 속성 타입을 결정하기 위해 제어 흐름 분석(CFA: control flow analysis)를 사용할 수 있습니다.
  - CFA는 프로그램의 제어 흐름을 결정하기 위한 정적 프로그램 분석 기법입니다.
- strictPropertyInitialization: true옵션을 활성화하면, undefined 타입이 될 수 있을 때 오류를 표시합니다.

```typescript
class Square {
	sideLength;

	constructor(sideLength: number) {
		if (Math.random()) {
			this.sideLength = sideLength;
		}
	}

	get area() {
		return this.sideLength ** 2;
		//     ~~~~~~~~~~~~~~~
		// 오류! Object is possibly 'undefined'.
	}
}
```

- 생성자에서 다른 메소드를 호출하여 값을 할당해 준다면 속성의 타입은 any가 됩니다.

```typescript
// AS-IS
class Square {
	sideLength; // any타입으로 오류 발생

	constructor(sideLength: number) {
		this.initialize(sideLength);
		// initialize 메소드를 가지고 해당 메소드에서 할당해주고 있다면 sideLength는 any타입으로 오류 발생!
	}

	initialize(sideLength: number) {
		this.sideLength = sideLength;
	}

	get area() {
		return this.sideLength ** 2;
	}
}
```

- 이런 상황에서는 확정적 할당 단언 !(Definite Assignment Assertions)을 사용하는 기존에 방식대로 처리합니다.

```typescript
// TO-BE
class Square {
	/*
  인스턴스 속성 변수 선언 시 변수명 뒤에 !(느낌표)를 붙여
  타입스크립트 컴파일러에게 해당 변수가 실제로는 사실상 할당되었다고 간주하도록 하여 오류를 표시하지 않도록 한다.
  */
	sideLength!: number; // 명시적 타입 선언

	constructor(sideLength: number) {
		this.initialize(sideLength);
	}

	initialize(sideLength: number) {
		this.sideLength = sideLength;
	}

	get area() {
		return this.sideLength ** 2;
	}
}
```

### 단락(Short-Circuiting) 할당 연산자

- 복합(compound) 할당 연산자는 연산자를 두 개의 인수에 적용한 다음, 결과를 왼쪽에 할당합니다.

```typescript
// 흔히 볼 수 있는 복합 할당 연산자
a += b;
a -= b;
a *= b;
a /= b;
a **= b;
a <<= b;
```

- 타입스크립트 4.0은 세 가지 새로운 복합 할당 연산자 &&=, ||=, ??=을 추가로 지원한다.
  - and 논리 연산자 : &&
  - or 논리 연산자 : ||
  - null 병합 연산자(nullish coalescing operator) : ??

```typescript
a &&= b;        // a = a && b;
a ||= b;        // a = a || b;
a ??= b;        // a = a ?? b;

// a ||= b; 실제로 평가되는 것은...
a || (a = b);

// < 4.0
(values ?? (values = [])).push("hello");

// 4.0
(values ??= []).push("hello");
```

### catch절의 매개변수 타입 지정

```typescript
try {
	// ...
} catch (x) {
	// 4.0 이전에는 x의 타입을 지정 불가
	// x의 타입은 'any'
	console.log(x.message);
	console.log(x.toUpperCase());
	x++;
	x.yadda.yadda.yadda();
}
```

- 4.0에서는 catch절의 매개변수 타입을 unknown 또는 any 타입으로 지정 가능합니다.
- ErrorException 처럼 예외 처리 클래스를 직접 정의해서 타입으로 지정하기는 불가능합니다.
- typeof 또는 instanceof를 활용하여 타입을 좁혀서 사용할 수 있습니다.

```typescript
try {
	// ...
} catch (e) {
	console.log(e.toUpperCase());
	//          ~
	// 오류 발생! Object is of type 'unknown'.

	if (typeof e === 'string') {
		console.log(e.toUpperCase());
	}

	if (e instanceof ErrorExcetion) {
		console.log(e.errorMessage);
	}
}
```

### JSX 팩토리 사용자 정의

- JSX 사용 시, Fragment는 여러개의 자식 엘리먼트를 반환할 수 있도록 해줍니다.
- 4.0에서 새로운 jsxFragemntFactory옵션을 사용하여, 프래그먼트 팩토리를 사용자 정의해서 사용할 수 있습니다.
- tsconfig.json 파일의 설정에서 타입스크립트가 JSX를 변환하는데 React와 호환하는 방법을 설정해줄 수 있습니다.

```json
// tsconfig.json 예시
{
	"compilerOptions": {
		"target": "esnext",
		"module": "commonjs",
		"jsx": "react",
		"jsxFactory": "h", // React.createElement 대신에 h를 사용
		"jsxFragmentFactory": "Fragment" //  React.Fragment 대신에 Fragment를 사용
	}
}
```

- 파일 별로 다른 JSX 팩토리를 사용해야 하는 경우 새로운 프라그마 주석(/\*_ @jsxFrag _/)을 사용할 수 있습니다.

```typescript
// JSDoc 스타일의 여러 줄 구문을 사용하여 적용

/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';

let stuff = (
	<>
		<div>Hello</div>
		<div>Jodeng</div>
	</>
);
```

- 자바스크립트로 변환 결과

```javascript
import { h, Fragment } from 'preact';
let stuff = h(Fragment, null, h('div', null, 'Hello'));
```

### --noEmitOnError옵션을 사용하는 빌드 모드에서 속도 개선

- 4.0 이전에는 증분 빌드할 때 --noEmitOnError 옵션을 켜두면 빌드 속도가 매우 느렸습니다.
  - --noEmitOnError 옵션을 기준으로 .tsbuildinfo 파일에서 마지막 컴파일된 결과가 캐시되지 않았기 때문입니다.
- 4.0에서는 --build 모드 시나리오(--incremental와 --noEmitOnError)를 향상시켜 속도를 크게 개선하였습니다.

### --incremental과 --noEmit 옵션 함께 사용 가능

- --incremental 옵션을 사용하면서 --noEmit 플래그도 함께 사용할 수 있게되었습니다.
  - 4.0 이전에는 --incremetal은 .tsbuildinfo 파일을 생성해야 하므로, 허용하지 않았습니다.

### 에디터 개선 (Visual Studio Code)

- /\*_ @deprecated _/ JSDoc 주석 지원
  - 선언 시 /\*_ @deprecated _/ 같이 JSDoc 주석으로 작성하면 취소선 스타일로 표시된다.

#### 시작 시 부분 편집 모드 지원

- 대규모 프로젝트에서 시작 시간이 느립니다.
  - 원인은 프로젝트 로딩이라는 프로세스 인데, 컴파일러의 프로그램 구성 단계와 거의 동일합니다.
  - 파일들의 초기 설정부터 시작하여 파일 구문 분석, 종속성 해결, 종속성 구문 분석, 종속성의 또 종속성 해결 등의 작업으로 시간이 오래 걸립니다.
  - 프로젝트가 클수록 코드 자동 완성 기능, [go-to-definition]과 같은 편집기 기본 동작을 수행하기 위해 시작 시간 지연이 더 심해집니다.
- 전체 언어 서비스에 대한 제공할 수 있는 환경이 로드될 때까지 편집기가 부분적인 경험을 제공할 수 있는 새로운 모드를 개발 중입니다.
  - 핵심 아이디어는 단일 파일 보기만 있는 경우 편집기가 가볍게 부분적으로 서버를 실행할 수 있도록 하는 것입니다.
- 타입스크립트가 Visual Studio Code의 코드 베이스의 파일에서 응답 할 때까지 20초에서 1분 정도의 시간이 걸리는 것을 보았는데, 새로 지원될 모드는 코드 베이스에서 타입스크립트가 대화형 모드가 될 때까지 시간을 2-5초 사이로 줄일 수 있을 것입니다.

#### 더 똑똑해진 자동 가져오기 기능

- Q. @types 패키지에서는 잘 동작하고, 자체적으로 types를 가지고있는 프로젝트 패키지는 왜 자동 가져오기가 잘 안되는 것인가???
- A. 타입스크립트에서는 node_modules/@types에 있는 모든 패키지는 자동으로 포함하지만 다른 패키지는 포함하지 않습니다. 모든 node_modules에 있는 패키지를 크롤링하는 것은 비용이 비쌀 수 있기 때문입니다.
- 패키지를 방금 설치하고 아직 사용하지 않는 것을 자동으로 가져오려고 할 때 시작 경험이 별로일 수 있습니다.
- 타입스크립트 4.0은 편집기에서 자동 가져오기 기능을 사용하기 위해 package.json의 dependencies 필드에 나열된 패키기 목록들을 포함하기 위해 약간의 추가 작업을 수행합니다. 이 패키지 정보를 가져오는 것은 오로지 자동 가져오기 기능을 개선하기 위해서만 사용하며, node_modules 디렉토리를 다 도는데 드는 비용을 줄일 수 있습니다.

### Breaking Changes

- lib.d.ts 파일 변경 사항
  - DOM 관련 타입이 변경되었습니다. IE와 사파리에서만 동작하던 document.origin제거되었습니다.(MDN에서는 self.origin을 사용하도록 권고합니다.)
- 부모 클래스의 속성을 재정의(override)하면 무조건 오류를 표시합니다.
  - 4.0 이전 버전에는 useDefineForClassField 옵션이 켜져있을 때, 자식 클래스에서 부모 클래스의 프로퍼티를 재정의하면 타입스크립트 컴파일러가 오류를 표시했습니다.
  - 4.0에서는 옵션에 사용 유무에 상관없이, 부모 클래스의 getter 또는 setter를 파생된 자식 클래스에서 재정의하면 항상 오류를 표시합니다.

```typescript
class Base {
	name = 'FE Dev Lab';

	get foo() {
		return 100;
	}
	set foo(value: number) {
		// ...
	}
}

class Derived extends Base {
	foo = 10;
	//~~~
	// 오류!
	// 'foo' is defined as an accessor in class 'Base',
	// but is overridden here in 'Derived' as an instance property.

	get name() {
		//~~~~
		// 오류!
		// 'name' is defined as an accessor in class 'Base',
		// but is overridden here in 'Derived' as an accessor.
		return 'TOAST UI Team';
	}
}
```

- delete연산자의 피연산자 타입은 옵셔널 속성이어야 한다.
  - strictNullChecks: true 옵션이 켜져있을 때, delete 사용시 피연산자 타입은 any, unknown, never와 옵셔널 속성으로 지정했을 때 가능합니다.
  - 필수 속성을 delete 하려고 하면 컴파일러는 오류를 표시합니다.

```typescript
interface Thing {
	prop: string;
	optionalProp?: number;
	anyProp: any;
	unknownProp: unknown;
	neverProp: never;
}

function f(x: Thing) {
	delete x.prop;
	//     ~~~~~~
	// 오류! The operand of a 'delete' operator must be optional.

	delete x.optionalProp;
	delete x.anyProp;
	delete x.unknownProp;
	delete x.neverProp;
}
```

### 타입스크립트의 Node Factory는 더 이상 사용되지 않는다

- 타입스크립트는 노드 생성용 추상 구문 트리(AST-Abstract Syntax Tree) "팩토리" 함수 집합을 제공하는데, 4.0에서는 새로운 팩토리 API를 제공합니다.
- 타입스크립트 4.0에서는 새로운 API를 사용하도록 하고, 기존에 만들어졌던 함수들은 더이상 사용하지 않도록(deprecated) 결정했습니다.
  - 추상 구문 트리(Abstract Syntax Tree) : 프로그래밍 언어의 문법에 따라 소스 코드 구조를 표시하는 계층적 프로그램 표현(respresentation)합니다.
