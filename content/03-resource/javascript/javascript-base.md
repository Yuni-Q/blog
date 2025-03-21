---
title: javascript base
date: 2020-07-29 09:07:57
category: javascript
draft: false
---

## 자바스크립트 특징

- 자바스크립트는 인터프리터 언어입니다.
  - 최근 웹 브라우저 대부분에는 싱핼 시간에 자바스크립트를 컴파일하는 JIT 컴파일러(Just In Time Compiler)가 내장되어 있어 실행 속도가 매우 빨라졌습니다.
- 동적 프로토타입 기반 객체 지향 언어입니다.
  - 객체를 생성한 후에도 프로퍼티와 메서드를 동적으로 추가하거나 삭제할 수 있습니다.
- 동적 타입 언어입니다.
  - 변수 타입이 없습니다. 따라서 프로그램을 샐항하는 도중에 변수에 저장되는 데이터 타입이 동적으로 바뀔 수 있습니다.
- 함수가 일급 객체입니다.
  - 함수는 객체이며, 함수에 함수를 인수로 넘길 수 있습니다. 이 특성을 활용하면 고차 함수를 구현할 수 있어 함수형 프로그래밍이 가능해집니다.
- 함수가 클로저를 정의합니다.
  - 클로저로 변수를 은닉하거나 영속성을 보장하는 등 다양한 기능을 구현할 수 있습니다.

## 탄생

- 1995년 넷스케이프 커뮤니케이션스(Netscape Communications)의 브렌던 아이크가 개발했습니다.
  - Netscaoe Navigator 2.0에 구현되었습니다.
  - Internet Explorer 3.0에 탑재되었습니다.
- 1997년 ECMAScript를 따르는 표준화가 진행되었고, 각 브라우저도 ECMAScript 사양을 구현하도록 권고하고 있습니다.

## 발전

- 자바스크립트는 오랫동안 '웹 브라우저용 하급 스크립트 언어이며 본격적인 프로그래밍 언어가 아니다'라는 오해를 받아 왔습니다.
- 구글이 만든 구글 지도 등의 기능이 많은 애플리케이션이 등장하면서 자바스크립트에 대한 오해가 사라지기 시작했습니다.
- Ajax라는 비동기 통신 기술을 사용하여 데스크톱 애플리케이션과 비교해도 손색없는 기능과 조작성을 실현하게 되었습니다.
- 2008년부터는 HTML5 사양ㅇ이 정해지기 시작했고 자바스크립트로 웹 애플리케이션을 만들 수 있는 다양한 API가 등장하였습니다.
- 웹 브라우저 성능이 향상되기 시작하면서 자바스크립트가 대중적인 언어로 자리 잡는 토대가 마련되었습니다.
- 자바스크립트 엔진(구글의 V8 엔진 등) 강력한 성능을 갖추고 있으며 웹 브라우저 자체 기능도 매우 좋아졌습니다.
- 서버 측에도 Node.js가 보급되어 자바스크립트가 더 널리 퍼지고 있습니다.

## ECMAScript

- 자바스크립트의 핵심 기술은 ECMAScript로 규정되어 있습니다.
- ECMAScript는 ECMA(Ecma International)라는 조직의 TC-39위원회가 표준화 작업을 하고 있고, ECMA-262라는 문서로 공개되고 있습니다.
  - 0단계 허수아비(stage 0 strawman) : TC39 프로세스에 프로포절을 내놓기 위해선 기본적으로 별다른 제약이 없습니다. 라이센스 관련 조항에 동의하고 TC39의 컨트리뷰터로 등록한 누구라도 프로포절을 내놓을 수 있습니다. 해당 프로포절 중 어떤 경로로든 TC39의 회의의 안건으로 상정되고 앞서 언급된 0단계 문서에 등재되면 0단계 제안이 됩니다.
  - 1단계 제안 (stage 1 proposal) : 1단계에 들어오기 위해선 가장 먼저 챔피언(champion) 을 구해야 합니다. 챔피언이란 해당 제안을 책임지고 다음 단계로 끌고 나아갈 TC39 구성원을 가리킵니다. 또한, 1단계 프로포절은 풀고자 하는 문제와 하이 레벨 API 및 잠재적 장애물을 제시해야 합니다. 구현상으로는 폴리필, 데모 등을 필요로 합니다.
  - 2단계 초고 (stage 2 draft) : 2단계에 올라오기 위해선 ECMAScript 표준의 형식 언어(formal description)로 작성 된 형식적인 서술(formal description) 초안이 필요합니다. 이 초안은 만약 프로포절이 실제로 표준에 편입 될 경우 사용할 명세의 초기 버전입니다. 2단계까지는 앞으로 해야 할 일 등을 TODO 마크 등으로 표시해 놓는 등의 일부 불완전한 명세가 허용됩니다. 또한 실험적인(플래그에 의해 켜지고 꺼지는) 구현이 요구됩니다.
  - 3단계 후보 (stage 3 candidate) : 3단계 프로포절은 대부분 완성에 가깝고, 구현 주체나 사용자들로부터 피드백을 좀 더 받아보는 일만이 남은 상태입니다. 3단계에 들어오기 위해서는 2단계의 초안과는 다르게 빈칸 없이 문법, 동작, 그리고 API까지 모든 부분이 기술되어 있도록 마무리 된 명세가 필요합니다.
  - 4단계 완료됨 (stage 4 finished) : 마지막 4단계는 모든 단계를 거치고 마침내 제안이 수락되고 다음 표준에 포함되어 발표되기만을 기다리는 단계입니다. 3단계의 프로포절이 ECMA-262의 단위 테스트 슈트인 Test262에 관련 테스트가 작성되고, 최소 2개 이상의 구현이 제공되는 등의 까다로운 추가 조건을 모두 만족하면 마침내 4단계로 올라올 수 있습니다.

## 프로그램 실행법

- 웹 브라우저의 콘솔에서 실행하기
- 자바스크립트 코드를 HTML 문서에 삽입하여 웹 브라우저로 실행하기
- Node.js의 대화형 모드로 실행하기
- Node.js로 파일을 읽어 들여 실행하기

## 프로그램 작성법

- 자바스크립트 프로그램은 유니코드 문자로 작성합니다.
  - 유니코드는 알파벳, 숫자, 기호는 물론 한국어, 이;ㄹ본어 같은 전 세계의 문자를 포함하는 문자 체계입니다.
  - ECMAScript5 사양에는 자바스크립트 엔진이 유니코드 버전 3 이상을 지원해야 한다고 명시되어 있습니다.
  - ECMAScript6 사양에는 유니코드 버전 5.1.0 이상을 지원해야 한다고 명시되어 있습니다.
- 자바스크립트 프로그램은 알파벳 대문자와 소문자를 구별합니다.
- 프로그램을 구성하는 최소 단위를 토큰(어휘)이라고 합니다.
  - 자바스크립트 인터프리터는 프로그램을 실핼하기에 앞서 프로그램을 토큰으로 분해합니다. 이 동작을 `어휘 분석`이라고 합니다. 그 후에 토큰을 한 줄로 나열하고 이것을 자바스크립의 구문 규약에 비추어 보았을 때 올바른 프로그램인지 판정합니다. 이 동작을 `구문 분석(파싱)`이라고 합니다.
- 토큰과 토큰 사이에 공백 문자를 여러 개 입력해도 공백 문자를 하나만 입력한 것으로 간주합니다.
- 공백 문자로 취급하는 유니코드는 많지만 `Space`와 `Tap`만 사용하고 필요할 때만 `줄 바꿈 문자`를 사용할 것을 권장합니다.
  - 일본어 반각 스페이스(\u0020)
  - 탭(\u0009)
  - 수직 탭(\u000B)
  - 폼 피드(\u000C)
  - 줄 바꿈 없는 공백(\u00A0)
  - 바이트 순서 표시 제어 문자(\uFEFF)
  - 기타 유니코드 카테고리 Zs에 포함된 모든 문자
- 산술 연산자, 괄호, 세미콜론(;), 쉼표(,), 콜론(:), 마침표(.) 앞뒤의 공백 문자는 생략할 수 있습니다.
  - 이러한 토큰은 토큰을 분리하기 때문에 분리자 또는 구분자라고 부릅니다.
- 영어 문장이 마침표로 끝나는 반면 자바스크립트 문장은 세미콜론(;)으로 끝납니다.
  - 복합문 끝에는 세미콜론을 붙이지 않습니다.
- 문장을 작성하고 다음 줄에 문장을 작성하면 앞 문장 끝에 세미콜론이 없어도 자바스크립트 엔진이 자동으로 세미콜론을 추가합니다.
  - 단, 자바스크립트 엔진은 세미콜론을 생략한 줄이 다음 줄과 이어지고 있다고 판단하면 세미콜론을 자동으로 추가하지 않습니다.
  - 세미콜론이 자동으로 추가되는 것을 기대하는 행위는 예상하지 못한 오류의 원인이 될 수 있습니다.
  - return, break, continue 등을 사용할 때는 줄 바꿈을 하지 말고 한 줄로 작성해야 합니다.
- `/* 주석문 /*`은 코드의 토큰을 분할하지 않는 임의의 위치에 작성할 수 있습니다. 또한 여러 줄로 나누어 작성해도 문제가 발생하지 않습니다.
- `// 주석문`은 각 줄 끝에 작성할 수 있습니다. 또한 주석문은 토큰 분리자로 동작하기 때문에 다른 토큰 뒤에 연달아 작성해도 문제가 발생하지 않습니다.

## 변수

- 변수는 값을 담기 위해 이름을 붙인 상자입니다.
- 변수는 컴퓨터의 메모리에 일정한 크기의 영역으로 생성됩니다.
- 변수 선언자에는 `var`, `let`, `const`가 있습니다.
- 선언하지 않은 변수 값을 읽으려고 시도하면 참조 오류가 발생합니다.
- 변수를 선언하지 않은 상태에서 값을 대입하면 자바스크립트 엔진이 그 변수를 자동으로 전역 변수로 선언합니다.
  - strict 모드를 활용하면 선언하지 않은 변수에 값을 대입했을 때 오류가 발생합니다.
- 같은 이름으로 선언된 변수는 모두 끌어올린 후에 단 하나의 영역에만 할당됩니다.
  - 변수의 끌어올림([호이스팅](/javascript/hoisting/))은 다른 언어에는 없는 자바스크립트의 고유한 특징입니다.
  - 같은 이름을 가진 변수를 여러 개 선언하더라도 문제가 발생하지 않는 것은 `var` 뿐 입니다.
- 변수의 식별자는 다음과 같은 명명 규칙을 따릅니다.
  - 사용할 수 있는 문자는 유니코드 문자, 숫자(0~9), 밑줄(\_), 달러 기호(\$) 입니다.
  - 첫 글자로는 숫자를 사용할 수 없습니다. 즉, 글자는 유니코드 문자, 밑줄(\_), 달러 기호(\$) 중 하나여야 합니다.
  - 예약어를 식별자로 사용할 수 없습니다.
- 변수는 일반적으로 세 가지 표기법을 많이 사용합니다.
  - 캐멀 표기법(로어 캐멀 표기법) : 두 번째 이후 단어의 첫 글자를 대문자로 표기하고 나머지는 소문자로 표기합니다. 캐멀 표기법은 대문자 부분이 낙타의 혹처럼 보인다고 해서 붙여진 이름입니다.
  - 파스칼 표기법(어퍼 캐멀 표기법) : 각 단어의 첫 글자를 대문자로 표기하고 나머지는 소문자로 표기합니다. 프로그래밍 언어인 파스칼(Pascal)에서 사용된 표기법이라서 파스칼 표기법이라고 부릅니다.
  - 밑줄 표기법(스네이크 표기법) : 모든 단어를 소문자로 표기하고 단어와 단어를 밑줄(\_)로 구분합니다.

## 예약어

- 예약어란 자바스크립트 문법을 규정짓기 위해 자바스크립트 언어 사양에서 사용하는 특수한 키워드를 말합니다.
- await
- break
- case
- catch
- class
- const
- continue
- debugger
- default
- delete
- do
- else
- enum
- export
- extends
- false
- finally
- for
- funtion
- if
- import
- implements
- in
- instanceof
- interface
- new
- null
- return
- package
- protected
- private
- public
- super
- switch
- this
- throw
- true
- try
- typeof
- var
- void
- while
- with
- yield

### 미리 정의된 전역 변수와 전역 함수

- 이 이름을 사용해도 오류가 발생하지는 않지만 자바스크립트가 가진 본래 기능을 사용할 수 없게 됩니다.
- arguments
- Array
- Boolean
- Date
- decodeURI
- decodeURIComponent
- ecodeURI
- encodeURIComponent
- Error
- eval
- EvalError
- Function
- Infinity
- isFinite
- isNaN
- JSON
- Math
- NaN
- Number
- Object
- parseFloat
- parseInt
- RangeErro
- ReffernceError
- RegExp
- String
- SyntaxError
- TypeError
- undefined
- URIError

### Web API

- 클라이언트 측 자바스크립트 코드를 작성할 때는 Window 객체 이름과 DOM에서 사용하고 있는 객체 이름도 식별자 이름으로 사용하지 않는 편이 좋습니다.
- window
- document

## 데이터 타입

- 실행할 때 변수에 저장된 데이터 타입을 동저긍로 바꿀 수 있는 언어를 가리켜 `동적 타입 언어(dynamic typed language)`라고 부릅니다. 자바스크립트는 동적 타입 언어 입니다.
  - 변수에 타입이 있는 언어를 가리켜 `정적 타입 언어(static typed language)`라고 부릅니다.

### 데이터 타입의 분류

- 자바스크립트가 처리할 수 있는 뎅터 타입은 크게 두 가지로 나눌 수 있습니다.
  - 원시 타입(primitive type)
  - 객체 타입

#### Number

- 64비트 부동소수점으로 표현합니다.
- C나 Java의 double 타입에 해당합니다.
- 최대값은 1.7976931348623157 x 10e308 입니다.
- 최소값은 4.940656458412465 x 10e-324 입니다.
- 정수 값은 -2e53 = -9007199254740992 ~ 2e53 = 9007199254740992 범위의 값을 정확하게 처리할 수 있습니다.
- 배열 인덱스와 비트 연산만큼은 32비트 정수로 처리합니다.

##### 숫자 리터럴

| 분류              | 표기법        | 예시          | 설명                                 |
| ----------------- | ------------- | ------------- | ------------------------------------ |
| 정수 리터럴       | 10진수        | 123           | 정수를 그대로 표현                   |
| 정수 리터럴       | 16진수        | 0x2a          | 숫자 앞에 0x를 붙임                  |
| 정수 리터럴       | 8진수         | 0o73          | 슷자 앞에 0o를 붙임                  |
| 정수 리터럴       | 2진수         | 0b101         | 슷자 앞에 0b를 붙임                  |
| 부동소수점 리터럴 | 정수.소수     | 3.14          | 소수를 그대로 표현                   |
| 부동소수점 리터럴 | 소수          | 0.123         | 정수부가 0일 때는 0을 생략할 수 있음 |
| 부동소수점 리터럴 | 가수부e지수부 | 6.02e23       | 6.02 x 10e23                         |
| 부동소수점 리터럴 | 가수부E지수부 | 1.1616199E-23 | 1.1616199 x 10e-35                   |

##### 특수한 값

| 분류              | 표기법                   | 설명                  |
| ----------------- | ------------------------ | --------------------- |
| 전역 변수         | Infinity                 | 플러스 무한대         |
| 전역 변수         | NaN                      | 부정 값(Not a Number) |
| Number의 프로퍼티 | Number.POSITIVE_INFINITY | 플러스 무한대         |
| Number의 프로퍼티 | Number.NEGATIVE_INFINITY | 마이너스 무한대       |
| Number의 프로퍼티 | Number.MAX_VALUE         | 표현할 수 있는 최대값 |
| Number의 프로퍼티 | Number.MIN_VALUE         | 표현할 수 있는 최솟값 |
| Number의 프로퍼티 | Number.NAN               | 부정 값(Not a Number) |
| Number의 프로퍼티 | Number.EPSILON           | 2.22044604925031e-16  |
| Number의 프로퍼티 | Number.MIN_SAFE_INTEGER  | -9007199254740990     |
| Number의 프로퍼티 | Number.MAX_SAFE_INTEGER  | 9007199254740990      |

#### 문자열

##### 이스케이프 시퀀스 목록

| 이스케이프 시퀀스 | 의미                                             |
| ----------------- | ------------------------------------------------ |
| \0                | 널(null) 문자                                    |
| \b                | 백스페이스 문자                                  |
| \t                | 수평 탭 문자                                     |
| \n                | 개행 탭 문자                                     |
| \v                | 수직 탭 문자                                     |
| \f                | 다음 페이지 문자                                 |
| \r                | 캐리지 리턴 문자(CR)                             |
| \\'               | 작은따옴표 문자                                  |
| \\"               | 큰따옴표 문자                                    |
| \\\\              | 역슬래시 문자                                    |
| \xXX              | 두 자릿수 16진수 XX로 지정된 Latin-1 문자        |
| \uXXXX            | 네 자리수 16진수 XXXX로 지정된 유니코드 문자     |
| \u{XXXXXX}        | 16진수 코드 포인트 XXXXXX로 지정된 유니코드 문자 |

#### undefined

- 값을 아직 할당하지 않은 변수의 값
- 없는 객체의 프로퍼티를 읽으려고 시도했을 때의 값
- 없는 배열의 요소를 읽으려고 시도했을 때의 값
- 아무것도 반환하지 않는 함수가 반환하는 값
- 함수를 호출했을 때 전달받지 못한 인수의 값

### 동일연산자

```javascript
null == undefined;
1 == '1';
'0xff' == 255;
true == 1;
new String('a') == 'a';
new Number(2) == 2;
[2] == 2;
```

## 1. typeof

```javascript
typeof 1; // 'number'
typeof 2.5; // 'number'
typeof 'hello world'; // 'string'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof {}; // 'object'
typeof []; // 'object'
typeof null; // 'object'
```

- null의 type은 object 입니다.

## 2. 입출력

```javascript
const answer = prompt('이름이 무엇인가요?');
console.log(answer);
alert(answer);
```

## 3. 객체

```javascript
// 객체의 생성
const obj = {
  x: 0, // 객체의 속성. 속성 이름: x, 속성 값: 0
  y: 1, // 객체의 속성. 속성 이름: y, 속성 값: 1
};

// 객체의 속성에 접근하기
obj.x;
obj['y'];

// 객체의 속성 변경하기
obj.x += 1;
obj['y'] -= 1;

// 객체의 속성 삭제하기
delete obj.x;
```

## 4. 정수인지 실수인지 판별

```javascript
Number.isInteger(1); // true
Number.isInteger(0.1); // false
```

## 5. 특이한 Number 값

- NaN
- -0
- Infinity
- -Infinity

## 6. NaN 비교

- 자신과 비교 할 수 없고 다음의 함수를 이용합니다.

```javascript
const thisIsNan = NaN;

// 주의! 이렇게 하면 안 됩니다.
thisIsNan === NaN; // false

// 이렇게 해야 합니다.
Number.isNaN(thisIsNan); // true
Object.is(thisIsNan, NaN); // true
```

## 7. 0과 -0은 거의 같습니다

- 그러나 몇몇 예외가 존재합니다. Object.is 함수는 0과 -0을 다른 값으로 취급합니다.

```javascript
Object.is(0, -0); // false
```

- 0이 아닌 어떤 수를 0 혹은 -0으로 나눌 때에도 결과값이 다릅니다.

```javascript
1 / 0; // Infinity
1 / -0; // -Infinity
```

## 8. Infinity

- 어떤 값이 Infinity인지 아닌지 판별하려면, Number.isFinite 메소드를 사용합니다. 비슷한 기능의 isFinite라는 전역 함수도 존재하긴 하지만, 동작이 미묘하게 다르므로 ES2015에 추가된 Number.isFinite를 사용하시는 걸 추천합니다.
- isFinite() 전역 함수는 주어진 값이 유한수인지 판별합니다. 필요한 경우 매개변수를 먼저 숫자로 변환합니다.

```javascript
Number.isFinite(1); // true
Number.isFinite(Infinity); // false
Number.isFinite('1'); // false
isFinite('1'); // true - `isFinite`는 문자열을 숫자로 변환합니다.
```

## 9. 문자열을 배열로 바꾸기

```javascript
[...'hello']; // ['h', 'e', 'l', 'l', 'o']
```

## 10 . 유니코드 코드포인트 비교는 사전순 비교가 아니므로 주의해야 합니다. 사전순 비교를 하려면 localeCompare 메소드를 사용합니다.

- The localeCompare() 메서드는 기준 문자열과 비교했을 때 비교 대상 문자열이 정렬상 전에 오는지, 후에 오는지 혹은 같은 순서에 배치되는지를 알려주는 숫자를 리턴합니다.

## 11. truthy & falsy

- truthy이 아닌 값들(즉, falsy인 값들)
  - false
  - null
  - undefined
  - 0
  - NaN
  - ''

## 12. ==와 === 중 ===를 쓰는 것이 좋지만 null check의 경우 ==를 사용합니다

```javascript
null === undefined; // false
null == undefined; // true

null == 1; // false
null == 'hello'; // false
null == false; // false

undefined == 1; // false
undefined == 'hello'; // false
undefined == false; // false
```

## 13. JavaScript에서는 객체 간에 공유되어야 하는 속성과 메소드를, 프로토타입(prototype)이라는 기능을 이용해서 효율적으로 저장할 수 있습니다.

- 어떤 객체에 프로토타입을 지정하면, 프로토타입의 속성을 해당 객체에서 재사용할 수 있습니다. 객체의 프로토타입을 지정하는 방법에는 여러 가지가 있는데, 가장 쉬운 방법은 Object.create 함수를 이용하는 것입니다.

```javascript
const personPrototype = {
  introduce: function () {
    return `안녕하세요, 제 이름은 ${this.name}입니다.`;
  },
};

const person1 = Object.create(personPrototype); // 새 객체를 생성하고 프로토타입을 지정합니다.
person1.name = '이윤희';

const person2 = Object.create(personPrototype);
person2.name = '윤희';

person1.introduce(); // 안녕하세요, 제 이름은 이윤희입니다.
person2.introduce(); // 안녕하세요, 제 이름은 윤희입니다.

person1.introduce === person2.introduce; // true
```

## 14. Array.from

```javascript
// `string` 타입은 래퍼 객체를 통해 iterable로 다루어질 수 있습니다.
Array.from('hello'); // ["h", "e", "l", "l", "o"]
```

## 15. 요소 수정하기

```javascript
const arr = [1, 2, 3, 4, 5];

// 전체를 0으로 채웁니다.
arr.fill(0);
console.log(arr); // [ 0, 0, 0, 0, 0 ];

// 인덱스 2와 4 사이를 1로 채웁니다.
arr.fill(1, 2, 4);
console.log(arr); // [ 0, 0, 1, 1, 0 ];
```

## 16. 배열 요소 추가 삭제

```javascript
const a = [1, 2, 3, 4, 5];
console.log(a); // [1, 2, 3, 4, 5, 6]
a.push(6);
console.log(a); // [1, 2, 3, 4, 6]
a.pop();
console.log(a); // [1, 2, 3, 4, 5]
a.unshift(0);
console.log(a); // [0, 1, 2, 3, 4, 5]
a.shift();
console.log(a); // [1, 2, 3, 4, 5]
```

## 17. 요소를 배열 중간에 삽입하기

```javascript
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 2, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

## 18. 배열로부터 새로운 값 생성

```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

## 19. 배열이 특정 조건을 만족하는지 판별하기

- 배열의 세 메소드 includes, every, some는 모두 배열이 특정 조건을 만족하는지를 나타내는 진리값을 반환합니다.

### includes

```javascript
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false
```

### every

```javascript
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true
```

### some

```javascript
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```

## 20. 객체의 가변성 때문에 어려움을 겪고 있다면, 두 가지 해결책을 시도해볼 수 있습니다.

- 먼저 Object.freeze의 사용을 고려해볼 수 있습니다. Object.freeze는 객체를 얼려서 속성의 추가/변경을 막습니다. 다만 Object.freeze를 호출한다고 해서 객체 안에 있는 객체까지 얼려버리지는 않으므로, 중첩된 객체에는 Object.freeze를 사용하기가 조금 까다롭습니다.
- Immutable.js, immer 같은 라이브러리의 사용합니다. 이런 라이브러리들은 Object.freeze처럼 객체를 정말로 얼려버리지는 않지만, 객체를 마치 불변인 것처럼 다룰 수 있는 방법을 제공합니다. 다시 말하면, 이 객체들은 메소드를 통해 내용이 조금이라도 변경되면 아예 새로운 객체를 반환합니다. 즉, 내용이 달라지면 참조 역시 달라지게 되어 객체의 내용이 변경되었는지를 확인하는 작업이 아주 쉬워집니다.

## 21. 엄격모드

- 엄격 모드를 활성화하려면 .js 파일 또는 함수의 가장 위에 'use strict';와 같이 문자열을 써 주면 됩니다. 파일 위에서 엄격 모드를 선언하면 해당 파일 전체가 엄격 모드로 동작하고, 함수 위에서 선언한다면 해당 함수만 엄격 모드로 동작합니다.

## 22. 객체 자신이 어떤 속성을 가지고 있는지를 확인하기 위해 Object.prototype.hasOwnProperty 메소드를 사용할 수 있습니다.

```javascript
const obj = Object.create({ inheritedProp: 'inheritedProp' });
obj.ownProp = 'ownProp';

console.log(obj.hasOwnProperty('inheritedProp')); // false
console.log(obj.hasOwnProperty('ownProp')); // true
console.log(obj.hasOwnProperty('constructor')); // false
```

- 어떤 객체의 전체 속성에 대한 속성 기술자를 얻어오려면, Object.getOwnPropertyDescriptors 정적 메소드를 사용하면 됩니다.

## 23. get / set

```javascript
const obj = {
  get prop() {
    console.log('getter가 호출되었습니다.');
    return this._hidden;
  },
  set prop(arg) {
    console.log('setter가 호출되었습니다.');
    this._hidden = arg;
  },
};
// `set prop` 메소드가 `1`을 인수로 해서 호출됩니다.
obj.prop = 1;

// `get prop` 메소드가 호출되고 해당 메소드의 반환값을 읽어옵니다.
obj.prop; // 1

Object.getOwnPropertyDescriptors(obj);
// {
//   prop: {
//     get: [Function: get],
//     set: [Function: set],
//     enumerable: true,
//     configurable: true
//   },
//   ...
// }
```

## 24. 객체의 속성 열거하기

- Object.keys : 객체 자신의 속성 중 열거 가능한(enumerable) 속성의 이름을 배열로 반환합니다.
- Object.values : 객체 자신의 속성 중 열거 가능한(enumerable) 속성의 속성 값을 배열로 반환합니다.
- Object.entries : 객체 자신의 속성 중 열거 가능한(enumerable) 속성의 이름과 값을 배열로 반환합니다.
- Object.getOwnPropertyNames - 객체 자신의 모든 속성의 이름을 배열로 반환합니다. 열거 불가능한 속성도 포함합니다.
- for...in 구문 : 객체 자신의 속성 및 상속받은 속성 중 열거 가능한(enumerable) 속성의 이름을 배열로 반환합니다.

## 25. 깊은 복사 & 얕은 복사

```javascript
let a = { a: 2, b: 3, e: { c: 4, d: 5 } };
let b = a;
let c = Object.assign({}, a);

a.a = 4;
a.e.c = 99;
console.log(a); // { a: 4, b: 3, e: { c: 99, d: 5 } }
console.log(b); // { a: 4, b: 3, e: { c: 99, d: 5 } }
console.log(c); // { a: 2, b: 3, e: { c: 99, d: 5 } }
```

- 여기서 주의해야 할 점이 있습니다. 객체가 중첩되어 있다면, 내부에 있는 객체는 복제되지 않습니다. Object.assign을 통해 속성이 값이 복사될 때, 실제로 복사되는 것은 중첩된 객체라 아니라 그에 대한 참조이기 때문입니다.

## 26. 객체에 속성 추가 막기

- JavaScript의 모든 객체에는 [[Extensible]]이라는 숨겨진 속성이 있습니다. 이 속성의 기본값은 true인데, 이 값이 false가 되면 해당 객체에 속성을 추가하는 것이 불가능해집니다. Object.preventExtensions 정적 메소드는 [[Extensible]] 속성을 false로 바꿔주는 역할을 합니다.
- Object.seal : 인수로 들어온 객체의 [[Extensible]] 속성을 false로 바꾸고, 객체 자신의 속성을 모두 configurable: false 상태로 바꿉니다.
- Object.freeze : 인수로 들어온 객체의 [[Extensible]] 속성을 false로 바꾸고, 객체 자신의 속성을 모두 configurable: false, writable: false 상태로 바꿉니다.
  - configurable : 이 속성의 값을 변경할 수 있고, 대상 객체에서 삭제할 수도 있다면 true 입니다. 기본값은 false 입니다.
  - writable : 할당 연산자로 속성의 값을 바꿀 수 있다면 true 입니다.기본값은 false 입니다.

## 27. Short-circuit Evaluation

```javascript
// `func1`과 `func2`는 동일하게 동작합니다.
function func1(cond) {
  if (cond) {
    console.log('조건을 만족합니다.');
  }
}

function func2(cond) {
  cond && console.log('조건을 만족합니다.');
}
```

```javascript
// `func1`과 `func2`는 동일하게 동작합니다.
function func1(arg) {
  if (!arg) {
    arg = 'hello';
  }
  console.log(arg);
}

function func2(arg) {
  arg = arg || 'hello';
  console.log(arg);
}
```

## 28. Spread Syntax

- ...을 이용해서 얕은 복사를 할 수 있습니다.

```javascript
const numbers = [1, 2, 3];

const num = [...numbers];

numbers[1] = 3;

console.log(numbers); // [1, 3, 3]

console.log(num); // [1, 2, 3]
```

## 29. 분해대입 (Destructuring Assignment

```javascript
const [a, b, ...c] = [1, 2, 3, 4, 5];

console.log(c); // [3, 4, 5]
```

```javascript
const {
  a,
  b: { c },
} = { a: 1, b: { c: 2 } };

console.log(a, c); // 1 2
```

```javascript
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };

console.log(rest); // { c: 3, d: 4 }
```

### 좌측 변수에 기본으로 대입될 값을 미리 지정해둘 수 있습니다.

```javascript
// `c` 위치에는 대입될 값이 없으므로, 기본값인 `3`이 대신 사용됩니다.
let [a, b, c = 3] = [1, 2];

console.log(c); // 3
```

## 30. JSON

```javascript
// `JSON.stringify`로 직렬화를 할 수 있습니다.
JSON.stringify({
  key: 'value',
  arr: [1, 2, 3],
  nullProp: null,
  undefinedProp: undefined, // 값이 `undefined`인 속성은 직렬화 과정에서 제외됩니다.
}); // '{"key":"value","arr":[1,2,3],"nullProp":null}'

// `JSON.parse`로 역직렬화를 할 수 있습니다.
JSON.parse('{"key":"value","arr":[1,2,3],"nullProp":null}');
// {key: "value", arr: Array(3), nullProp: null}
```

- 속성 이름은 꼭 쌍따옴표를 둘러주어야 합니다.
- Map, Set, Date, Error, RegExp, Function, Promise와 같이 특별한 동작방식을 가지는 객체들을 제대로 표현할 수 없습니다.
- undefined, NaN, Infinity과 같은 값을 표현할 수 없습니다.
- 주석을 쓸 수 없습니다.

## 31. DATE 문자열로 변환하기

```javascript
const now = new Date();
console.log(now.toString()); // Sun Dec 10 2017 12:49:31 GMT+0900 (KST)
console.log(now.toLocaleString()); // 2017. 12. 10. 오후 12:49:31
console.log(now.toDateString()); // Sun Dec 10 2017
console.log(now.toTimeString()); // 12:49:31 GMT+0900 (KST)
console.log(now.toISOString()); // 2017-12-10T03:49:31.145Z
console.log(now.toUTCString()); // Sun, 10 Dec 2017 03:49:31 GMT
```

## 32. symbol

- 심볼(symbol) 데이터 형은 원시 데이터 형(primitive data type)의 일종입니다.
- Symbol() 함수는 심볼(symbol) 형식의 값을 반환하는데, 이 심볼은 내장 객체(built-in objects)의 여러 멤버를 가리키는 정적 프로퍼티와 전역 심볼 레지스트리(global symbol registry)를 가리키는 정적 메서드를 가지며, "new Symbol()" 문법을 지원하지 않아 생성자 측면에서는 불완전한 내장 객체 클래스(built-in object class)와 유사합니다.
- Symbol()로부터 반환되는 모든 심볼 값은 고유합니다. 심볼 값은 객체 프로퍼티(object properties)에 대한 식별자로 사용될 수 있습니다. 이것이 심볼 데이터 형식의 유일한 목적입니다.

```javascript
// 해당 코드는 매 번 새로운 심볼을 생성합니다:
var sym1 = Symbol();
var sym2 = Symbol('foo');
var sym3 = Symbol('foo');

Symbol('foo') === Symbol('foo'); // false

// 꼭 심볼 래퍼 객체를 생성하고 싶다면, Object() 함수를 이용할 수 있습니다.
var sym = Symbol('foo');
typeof sym; // "symbol"
var symObj = Object(sym);
typeof symObj; // "object"
```

```javascript
var sym = new Symbol(); // TypeError
```

- 이는 작성자가 새로운 심볼 값 대신 명시적으로 심볼 래퍼 객체(Symbol wrapper object)를 생성할 수 없게 합니다. 일반적으로 원시 데이터 형에 대한 명시적인 래퍼 객체 생성(예를 들어, new Boolean, new String 또는 new Number와 같은)이 가능하다는 점에 비춰보면 의외일 수 있습니다.

## 33. Map

- Map으로 생성된 객체는, 일반적인 객체와 비교했을 때 아래와 같은 차이점을 갖습니다.
  - 객체는 속성 접근자(property accessor) 문법을 통해서, Map은 메소드를 통해서 내부의 데이터를 조작합니다.
  - 문자열과 심볼만이 객체의 속성 키가 될 수 있는 반면, 어떤 값이라도 Map 객체의 키로 사용될 수 있습니다.
  - 객체의 속성을 확인할 때는 프로토타입 체인을 확인하는 과정에 필요하지만, Map 객체 안에 들어있는 데이터는 프로토타입의 영향을 받지 않습니다.
  - Map 객체의 size 속성을 통해 내부에 들어있는 데이터의 개수를 쉽게 알 수 있습니다.
- Map 객체는 데이터의 추가/삭제가 빈번하게 일어나는 경우 일반적인 객체보다 훨씬 빠르게 동작한다는 장점이 있는 반면, JSON 등으로 직렬화 하기 어렵다는 특징이 있습니다. 키-값 쌍 형태의 데이터를 다루면서 속도가 중요한 경우에는 Map의 사용을 고려해보세요.

## 34. Set

- 배열과 유사한 형태의 자료구조가 필요하지만 순서가 중요하지 않은 경우, 그리고 중복된 데이터의 저장을 허용하지 않아야 할 경우, Set의 사용을 고려해보세요.

## 35. Generator 함수

```javascript
// generator 함수 선언하기
function* gen1() {
  // ...
}

// 표현식으로 사용하기
const gen2 = function* () {
  // ...
};

// 메소드 문법으로 사용하기
const obj = {
  *gen3() {
    // ...
  },
};
```

- Generator 함수 안에서는 yield라는 특별한 키워드를 사용할 수 있습니다. Generator 함수 안에서 yield 키워드는 return과 유사한 역할을 하며, iterable의 기능을 사용할 때 yield 키워드 뒤에 있는 값들을 순서대로 넘겨줍니다.
- yield\* 표현식을 사용하면, 다른 generator 함수에서 넘겨준 값을 대신 넘겨줄 수도 있습니다.

```javascript
function* numberGen() {
  yield 1;
  yield 2;
  yield 3;
}

function* numberGen2() {
  yield* numberGen();
  yield* numberGen();
}

// 1, 2, 3, 1, 2, 3이 순서대로 출력됩니다.
for (let n of numberGen2()) {
  console.log(n);
}
```

- Generator 함수를 사용할 때 주의할 점이 있습니다.
  - Generator 함수로부터 생성된 iterable은 한 번만 사용될 수 있습니다.
  - Generator 함수 내부에서 정의된 일반 함수에서는 yield 키워드를 사용할 수 없습니다.

## 36. Iterator Protocol

- iterable 객체는 iterable protocol을 만족합니다. 즉, Symbol.iterator 속성에 특별한 형태의 함수가 저장되어 있습니다.
- Iterable protocol을 만족하려면, Symbol.iterator 속성에 저장되어 있는 함수는 iterator 객체를 반환해야 합니다.
- Iterator 객체는 아래의 특별한 조건을 만족하는 객체입니다.
  - Iterator는 next라는 메소드를 갖습니다.
  - next 메소드는 다음 두 속성을 갖는 객체를 반환해야 합니다. done : 반복이 모두 끝났는지를 나타냅니다. value : 현재 순서의 값을 나타냅니다.

```javascript
// 문자열은 iterable이므로 이로부터 iterator를 생성할 수 있습니다.
const strIterator = 'go'[Symbol.iterator]();
strIterator.next(); // { value: 'g', done: false }
strIterator.next(); // { value: 'o', done: false }
strIterator.next(); // { value: undefined, done: true }
strIterator.next(); // { value: undefined, done: true }
```

## 37. Generator와 Iterator

- generator 함수로부터 만들어진 객체는 iterable protocol과 iterator protocol을 동시에 만족합니다.
- generator 함수 안에서 return 키워드를 사용하면 반복이 바로 끝나면서 next 메소드에서 반환되는 객체의 속성에 앞의 반환값이 저장됩니다. 다만, return을 통해 반환된 값이 반복 절차에 포함되지는 않습니다.
- generator 함수로부터 생성된 객체의 next 메소드에 인수를 주어서 호출하면, generator 함수가 멈췄던 부분의 yield 표현식의 결과값은 앞에서 받은 인수가 됩니다.

## 38. class

```javascript
class Person {
  // 이전에서 사용하던 생성자 함수는 클래스 안에 `constructor`라는 이름으로 정의합니다.
  constructor({ name, age }) {
    this.name = name;
    this.age = age;
  }

  // 객체에서 메소드를 정의할 때 사용하던 문법을 그대로 사용하면, 메소드가 자동으로 `Person.prototype`에 저장됩니다.
  introduce() {
    return `안녕하세요, 제 이름은 ${this.name}입니다.`;
  }
}

const person = new Person({ name: '이윤희', age: 19 });
console.log(person.introduce()); // 안녕하세요, 제 이름은 이윤희입니다.
console.log(typeof Person); // function
console.log(typeof Person.prototype.constructor); // function
console.log(typeof Person.prototype.introduce); // function
console.log(person instanceof Person); // true
```

- 클래스는 함수로 호출될 수 없습니다.
- 클래스 선언은 let과 const처럼 블록 스코프에 선언되며, 호이스팅(hoisting)이 일어나지 않습니다.
- 클래스의 메소드 안에서 super 키워드를 사용할 수 있습니다.
- 객체 리터럴의 문법과 마찬가지로, 임의의 표현식을 대괄호로 둘러싸서 메소드의 이름으로 사용할 수도 있습니다.
- getter 혹은 setter를 정의하고 싶을 때는 메소드 이름 앞에 get 또는 set을 붙여주면 됩니다.
- Symbol.iterator 메소드를 generator로 정의해주면, 클래스의 인스턴스를 쉽게 iterable로 만들 수 있습니다.

```javascript
class Gen {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}

// 1, 2, 3이 차례대로 출력됩니다.
for (let n of new Gen()) {
  console.log(n);
}
```

- 일반적인 메소드는 클래스의 prototype 속성에 저장되는 반면, 클래스 필드는 인스턴스 객체에 저장됩니다.
- 화살표 함수의 this는 호출 형태에 관계없이 항상 인스턴스 객체를 가리키게 됩니다.
- 메소드를 값으로 다루어야 할 경우에는 일반적인 메소드 대신 화살표 함수가 사용되는 경우가 종종 있습니다. 다만, 일반적인 메소드와 달리, 클래스 필드를 통해 정의한 메소드는 인스턴스를 생성할 때마다 새로 생성되기 때문에 메모리를 더 차지하게 되므로 주의해서 사용해야 합니다.

## 38. Node

## 39. Time

```javascript
const timeoutId = setTimeout(() => {
  console.log('setTimeout이 실행된 지 2초가 지났습니다.');
}, 2000);

const intervalId = setInterval(() => {
  console.log('3초마다 출력됩니다.');
}, 3000);

clearTimeout(timeoutId);
clearInterval(intervalId);

// 실제 지연시간과 약간의 차이가 존재합니다.
// 또한 지연시간을 0으로 주었을 때는 코드가 기대한대로 동작하지 않습니다.
```

## 40. 비동기 프로그래밍

- Promise를 활용한 then
- aysc와 await
- Generater
  - generator는 함수의 재개를 프로그래머가 직접 제어할 수 있다는 장점을 갖고 있기 때문에, 일부러 비동기 함수 대신 generator를 사용하는 경우도 있습니다. React에서 비동기 프로그래밍을 하기 위해 널리 사용되는 라이브러리인 redux-saga 역시 generator를 활용하고 있습니다.

## 41. 동기식 코드에서의 예외 처리

- try...catch...finally 구문

```javascript
try {
  // code
} catch (error) {
  // try 안에서 에러 발생 시 동작
  // code
} finally {
  // catch 여부와 관계 없이 무조건 실행해야 하는 부분
}
```

## 42. 직접 에러 발행

```javascript
throw new Error('짝수가 아닙니다.');
```

### 에러 객체에 기능 추가

```javascript
class MyError extends Error {
  constructor(value, ...params) {
    super(...params);
    this.value = value;
    this.name = 'MyError';
  }
}

try {
  const even = parseInt(prompt('짝수를 입력하세요'));
  if (even % 2 !== 0) {
    throw new MyError(even, '짝수가 아닙니다.');
  }
} catch (e) {
  if (e instanceof MyError) {
    console.log(e.value);
  }
}
```

## 42. 비동기식 코드에서의 예외 처리

- 비동기식으로 작동하는 콜백의 내부에서 발생한 에러는, 콜백 바깥에 있는 try 블록으로는 잡아낼 수 없습니다. 따라서, try 블록을 비동기 콜백 내부에 작성해주어야 합니다.
- Promise 객체는 세 가지 상태를 가질 수 있습니다.
  - pending : Promise 객체에 결과값이 채워지지 않은 상태
  - fulfilled : Promise 객체에 결과값이 채워진 상태
  - rejected : Promise 객체에 결과값을 채우려고 시도하다가 에러가 난 상태

### 방법 1

```javascript
const p = new Promise((resolve) => {
  const even = parseInt(prompt('짝수를 입력하세요'));
  if (even % 2 !== 0) {
    throw new Error('짝수가 아닙니다.');
  } else {
    resolve(even);
  }
});

p.then(
  (even) => {
    return '짝수입니다.';
  },
  (e) => {
    return e.message;
  },
).then(alert);
```

### 방법 2

```javascript
p.then((even) => {
  return '짝수입니다.';
})
  .catch((e) => {
    return e.message;
  })
  .then(alert);
```

## 43. 모듈

```javascript
<script type="module" src="index.mjs"></script>
```

- import 구문에서 이름을 적어주는 부분에 중괄호를 생략하면, 모듈의 default export를 가져옵니다.
- export 혹은 import 하는 이름의 뒤에 as를 붙여서, 다른 이름이 대신 사용되게 할 수 있습니다.

## 44. 삼항조건 연산자 (The Ternary Operator)

- if..else 문항을 사용할때 한줄로 줄여주는 아주 좋은 방법입니다.

```javascript
// 기존
const x = 20;
let answer1;
if (x > 10) {
  answer1 = 'greater than 10';
} else {
  answer1 = 'less than 10';
}

// 축약기법
const answer2 = x > 10 ? 'greater than 10' : 'less than 10';
const answer3 = x > 10 ? ' greater than 10' : x;
```

## 45. 간략계산법 (Short-circuit Evaluation)

- 기존의 변수를 다른 변수에 할당하고 싶은 경우, 기존 변수가 null, undefined 또는 empty 값이 아닌것을 확인해야합니다. (위 세가지일 경우 에러가 뜹니다) 이를 해결하기 위해서 긴 if문을 작성하거나 축약코딩으로 한줄에 끝낼 수 있습니다.

```javascript
// 기존
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
  let variable2 = variable1;
}

// 축약기법
const variable3 = null;
const variable4 = variable3 || 'new';

let variable5;
let variable6 = variable5 || '';
console.log(variable6 === ''); // true

variable5 = 'foo';
variable6 = variable5 || '';
console.log(variable6); // foo
```

## 46. 변수 선언

- 축약기법을 사용하면 여러개의 변수를 선언할 수 있습니다.

```javascript
// 기존
let x;
let y;
let z = 3;

// 축약기법
let x,
  y,
  z = 3;
```

## 47. If Presence

- if문을 확인하기 위해서는, 대입 연산자를 제외하고 작성 할 수 있습니다.

```javascript
// 기존
if (likeJavaScript === true) {
}

// 축약기법
if (likeJavaScript) {
}
```

- 위 두개의 예제는 정확히 일치하지는 않습니다. 축약기법의 if 문은 likeJavaScript 값이 truthy일 경우 통과하도록 되어있지만, 기존 방법은 무조건 TRUE 일경우에만 통과할 수 있기 때문입니다.

```javascript
// 기존
let a;
if (a !== true) {
  // 코드 실행...
}

// 축약기법
let a;
if (!a) {
  // 코드실행...
}
```

## 48. For 루프

```javascript
// 기존
for (let i = 0; i < allImgs.length; i++) {}

// 축약기법
for (let index of allImgs) {
}

// Array.forEach 축약기법
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}
[2, 5, 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[2] = 9
```

## 49. 간략 계산법(Short-circuit Evaluation)

- 기본 값을 부여하기 위해 파라미터의 null 또는 undefined 여부를 파악하느라 6줄 이상의 코드를 작성하는것보다 short-circuit evaluation 방법을 이용해서 한줄로 작성하는 방법이 유용합니다.

```javascript
// 기존
let dbHost;
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} else {
  dbHost = 'localhost';
}

// 축약기법
const dbHost = process.env.DB_HOST || 'localhost';
```

- Short-circuit evaluation 이란 두가지의 변수를 비교할때, 앞에 있는 변수가 false 일경우 결과는 무조건 false 이기때문에 뒤의 변수는 확인하지 않고 return 시키는 방법입니다.

## 50. 십진수 지수(Decimal base exponents)

- 0이 많은 숫자를 적을때, 수 많은 0들을 제외하고 코딩을 할 수 있습니다. 예를 들어 1e7은 1 뒤에 0이 7개 붙는다는 뜻입니다. 이는 10,000,000를 줄여쓴 것이고 자바스크립트에서는 float 타입값으로 받아드립니다.

```javascript
// 기존
for (let i = 0; i < 10000; i++) {}

// 축약기법
for (let i = 0; i < 1e7; i++) {}

// All the below will evaluate to true
console.log(1 === 1);
console.log(1e1 === 10);
console.log(1e2 === 100);
console.log(1e3 === 1000);
console.log(1e4 === 10000);
console.log(1e5 === 100000);
```

## 51. 객체 프로퍼티

- 객체 리터럴 표기법은 자바스크립트 코딩을 훨씬 쉽게 만들어줍니다. 만일 프로퍼티 이름이 key 이름과 같을경우, 축약기법을 활용할 수 있습니다.

```javascript
// 기존
const obj = { x: x, y: y };

// 축약기법
const obj = { x, y };
```

## 52. 애로우(화살표) 함수

- 기존 함수 선언문은 읽고, 쓰기 쉽게 되어있습니다. 하지만 함수 네스팅이 시작되면 선언문 자체가 불필요하게 느껴지고, 헷갈리게 됩니다.

```javascript
// 기존
function sayHello(name) {
  console.log('Hello', name);
}
setTimeout(function () {
  console.log('Loaded');
}, 2000);
list.forEach(function (item) {
  console.log(item);
});

// 축약기법
sayHello = (name) => console.log('Hello', name);
setTimeout(() => console.log('Loaded'), 2000);
list.forEach((item) => console.log(item));
```

- 애로우 함수 표기법에서는 this가 기존의 함수 선언문과 다르게 받아들여집니다. 따라서 위의 두 예제는 완벽하게 동일하다고 볼 수는 없습니다.

## 53. 묵시적 반환(Implicit Return)

- return 은 함수 결과를 반환하는데 사용되는 명령어입니다. 한 줄로만 작성된 애로우 함수는 별도의 return 명령어가 없어도 자동으로 반환하도록 되어있습니다. 다만, 중괄호({})를 생략한 함수여야 return 명령어도 생략 할 수 있습니다.
- 한 줄 이상의 문장(객체 리터럴)을 반환하려면 중괄호({})대신 괄호(())를 사용해서 함수를 묶어야합니다. 이렇게 하면 함수가 한 문장으로 작성되었음을 나타낼 수 있습니다.

```javascript
// 기존
function calcCircumference(diameter) {
	return Math.PI * diameter;
}

// 축약기법
calcCircumference = diameter => (
  Math.PI * diameter;
)
```

## 54. 파라미터 기본 값 지정하기(Default Parameter Values)

- 기존에는 if 문을 통해서 함수의 파라미터 값에 기본 값을 지정해줘야했습니다. ES6에서는 함수 선언문 자체에서 기본값을 지정해 줄 수 있습니다.

```javascript
// 기존
function volume(l, w, h) {
  if (w === undefined) w = 3;
  if (h === undefined) h = 4;
  return l * w * h;
}

// 축약기법
volume = (l, w = 3, h = 4) => l * w * h;
volume(2); //output: 24
```

## 55. 템플릿 리터럴(Template Literals)

- 문자열로 ' + ' 를 입력하며 자바스크립트 값을 추가하는 방법보다 백틱(backtick)을 사용해서 스트링을 감싸고, \${}를 사용해서 변수를 담아주면 됩니다.

```javascript
// 기존
const welcome = 'You have logged in as ' + first + ' ' + last + '.';
const db = 'http://' + host + ':' + port + '/' + database;

// 축약기법
const welcome = `You have logged in as ${first} ${last}`;
const db = `http://${host}:${port}/${database}`;
```

## 56. 비구조화 할당(Destructuring Assignment)

- 유명한 프레임워크로 개발을 하고 있다면 컴포넌트와 API간 정보를 전송하기 위해서 객체 리터럴이나 배열로 이뤄진 데이터를 사용하게 될 가능성이 큽니다. 데이터 객체가 컴포넌트에 들어가게 되면, unpack이 필요합니다.

```javascript
// 기존
const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');

const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;

// 축약기법
import { observable, action, runInAction } from 'mobx';

const { store, form, loading, errors, entity } = this.props;

// 축약기법으로 커스텀 변수명을 지정할 수 있습니다
const { store, form, loading, errors, entity: contact } = this.props;
```

## 57. 여러줄로 문자열 쓰기(Multi-line String)

```javascript
// 기존
const lorem =
  'Lorem ipsum dolor sit amet, consectetur\n\t' +
  'adipisicing elit, sed do eiusmod tempor incididunt\n\t' +
  'ut labore et dolore magna aliqua. Ut enim ad minim\n\t' +
  'veniam, quis nostrud exercitation ullamco laboris\n\t' +
  'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t' +
  'irure dolor in reprehenderit in voluptate velit esse.\n\t';

// 축약기법
const lorem = `Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse.`;
```

## 58. 전개 연산자(Spread Operator)

- ES6에서 소개된 전개 연산자는 자바스크립트 코드를 더 효율적이고 재미있게 사용 할 수 있는 방법을 제시합니다. 간단히는 배열의 값을 변환하는데 사용할 수 있습니다. 전개 연산자를 사용하는 방법은 점 세개(...)를 붙이면 됩니다.

```javascript
// 기존
// joining arrays
const odd = [1, 3, 5];
const nums = [2, 4, 6].concat(odd);

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice();

// 축약기법
// joining arrays
const odd = [1, 3, 5];
const nums = [2, 4, 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];

// concat()함수와는 다르게 전개 연산자를 이용하면 하나의 배열을 다른 배열의 아무 곳에나 추가할 수 있습니다.
const odd = [1, 3, 5];
const nums = [2, ...odd, 4, 6];

// 전개 연산자는 ES6의 구조화 대입법(destructuring notation)와 함께 사용할 수도 있습니다.
const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a); // 1
console.log(b); // 2
console.log(z); // { c: 3, d: 4 }
```

## 59. 필수(기본) 파라미터(Mandatory Parameter)

- 기본적으로 자바스크립트는 함수의 파라미터값을 받지 않았을경우, undefined로 지정합니다. 다른 언어들은 경고나 에러 메시지를 나타내기도 하죠. 이런 기본 파라미터 값을 강제로 지정하는 방법은 if 문을 사용해서 undefined일 경우 에러가 나도록 하거나, ‘Mandatory parameter shorthand’을 사용하는 방법이 있습니다.

```javascript
// 기존
function foo(bar) {
  if (bar === undefined) {
    throw new Error('Missing parameter!');
  }
  return bar;
}

// 축약기법
mandatory = () => {
  throw new Error('Missing parameter!');
};

foo = (bar = mandatory()) => {
  return bar;
};
```

## 60. Array.find

- 자바스크립트로 특정 값을 찾기 위한 함수를 작성하다보면 보통 for 루프를 이용해서 작성을 하게 됩니다. ES6에서는 find()라는 새로운 함수가 생겼습니다.

```javascript
const pets = [
  { type: 'Dog', name: 'Max' },
  { type: 'Cat', name: 'Karl' },
  { type: 'Dog', name: 'Tommy' },
];

// 기존
function findDog(name) {
  for (let i = 0; i < pets.length; ++i) {
    if (pets[i].type === 'Dog' && pets[i].name === name) {
      return pets[i];
    }
  }
}
findDog('Tommy');

// 축약기법
pet = pets.find((pet) => pet.type === 'Dog' && pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }
```

## 61. Object [key]

- Foo.bar를 Foo[‘bar’]와 같습니다. 왜 후자와 같이 코딩을 해야하는지 의문이 들 수도 있겠지만, 재사용이 용이한 코드 블락을 작성하기 위해서는 매우 효율적인 방법입니다.

```javascript
// 기존
function validate(values) {
  if (!values.first) return false;
  if (!values.last) return false;
  return true;
}

console.log(validate({ first: 'Bruce', last: 'Wayne' })); // true

// 축약기법
// object validation rules (객체로 만든 validation 규칙)
const schema = {
  first: {
    required: true,
  },
  last: {
    required: true,
  },
};

// universal validation function (공통적으로 사용할 수 있는 validation 함수)
const validate = (schema, values) => {
  for (field in schema) {
    if (schema[field].required) {
      if (!values[field]) {
        return false;
      }
    }
  }
  return true;
};

console.log(validate(schema, { first: 'Bruce' })); // false
console.log(validate(schema, { first: 'Bruce', last: 'Wayne' })); // true
```

## 62. 단항 비트 논리부정 연산자(Double Bitwise NOT)

- Math.floor() 함수의 대체용으로 사용할 수 있습니다. 또 Math.floor() 함수보다 훨씬 빠르게 작동한다는 장점도 있습니다.

```javascript
// 기존
Math.floor(4.9) === 4; //true

// 축약기법
~~4.9 === 4; //true
```

## 알아야 할 25 가지 JavaScript 트릭

### 1. 유형 검사 유틸리티

```javascript
const isOfType = (() => {
  // 프로토 타입 없는 일반 객체 생성
  const type = Object.create(null);

  type.null = (x) => x === null;
  type.undefined = (x) => x === undefined;
  // null or undefined
  type.nil = (x) => type.null(x) || type.undefined(x);
  type.string = (x) =>
    !type.nil(x) && (typeof x === 'string' || x instanceof String);
  type.number = (x) =>
    !type.nil(x) &&
    ((!isNaN(x) && isFinite(x) && typeof x === 'number') ||
      x instanceof Number);
  type.boolean = (x) =>
    !type.nil(x) && (typeof x === 'boolean' || x instanceof Boolean);
  type.array = (x) => !type.nil(x) && Array.isArray(x);
  type.object = (x) => ({}.toString.call(x) === '[object Object]');
  type.type = (x, X) => !type.nil(x) && x instanceof X;
  type.set = (x) => type.type(x, Set);
  type.map = (x) => type.type(x, Map);
  type.date = (x) => type.type(x, Date);

  return type;
})();
```

### 2. 비어 있는지 확인

```javascript
function isEmpty(x) {
  if (Array.isArray(x) || typeof x === 'string' || x instanceof String) {
    return x.length === 0;
  }

  if (x instanceof Map || x instanceof Set) {
    return x.size === 0;
  }

  if ({}.toString.call(x) === '[object Object]') {
    return Object.keys(x).length === 0;
  }

  return false;
}
```

### 3. 마지막 항목 목록 가져 오기

```javascript
const { lstat } = require('fs-extra');

function lastItem(list) {
  if (Array.isArray(list)) {
    return list.slice(-1)[0];
  }

  if (list instanceof Set) {
    return Array.from(list).slice(-1)[0];
  }

  if (list instanceof Map) {
    return Array.from(list.values()).slice(-1)[0];
  }
}
```

### 4. 범위가 있는 난수 생성

```javascript
function randomNumber(max = 1, min = 0) {
  if (min >= max) {
    return max;
  }

  return Math.floor(Math.random() * (max - min) + min);
}
```

### 5. 랜덤 id 생성

```javascript
// 현재 시간(밀리 초)부터 고유 ID 생성
// 요청할 때마다 1씩 증가합니다.
const uniqueId = () => {
  const id = (function* () {
    let mil = new Date().getTime();

    while (true) yield (mil += 1);
  })();

  return () => id.next().value;
};

// 제공된 값 또는 0에서 고유 ID 생성
const uniqueIncrementingId = ((lastId = 0) => {
  const id = (function* () {
    let numb = lastId;

    while (true) yield (numb += 1);
  })();

  return (length = 12) => `${id.next().value}`.padStart(length, '0');
})();

// 문자와 숫자로 고유 ID 생성
const uniqueAlphaNumericId = (() => {
  const heyStack = '0123456789abcdefghijklmnopqrstuvwxyz';
  const randomInt = () =>
    Math.floor(Math.random() * Math.floor(heyStack.length));

  return (length = 24) =>
    Array.from({ length }, () => heyStack[randomInt()]).join('');
})();
```

### 6. 숫자 범위 만들기

```javascript
function range(maxOrStart, end = null, step = null) {
  if (!end) {
    return Array.from({ length: maxOrStart }, (_, i) => i);
  }

  if (end <= maxOrStart) {
    return [];
  }

  if (step !== null) {
    return Array.from(
      { length: Math.ceil((end - maxOrStart) / step) },
      (_, i) => i * step + maxOrStart,
    );
  }

  return Array.from(
    { length: Math.ceil(end - maxOrStart) },
    (_, i) => i + maxOrStart,
  );
}
```

### 7. JSON 문자열 형식화 및 문자열화

```javascript
const obj = {
  name: 'Yuni-Q',
  family: [{ name: 'Yuni-Q' }],
  something: [12, 3, 45],
  mothod() {
    return 'i am ignored';
  },
  set: new Set([1, 4, 5]),
  map: new Map([
    [1, 4],
    [5, 10],
  ]),
  symb: Symbol('test'),
};

const replacer = (key, val) => {
  if (typeof val === 'symbol') {
    return val.toString();
  }

  if (val instanceof Set) {
    return Array.from(val);
  }

  if (val instanceof Map) {
    return Array.from(val.entries());
  }

  if (typeof val === 'function') {
    return val.toString();
  }

  return val;
};

console.log(JSON.stringify(obj));
// {"name":"Yuni-Q","family":[{"name":"Yuni-Q"}],"something":[12,3,45],"set":{},"map":{}}
console.log(JSON.stringify(obj, null, 4));
// {
//   "name": "Yuni-Q",
//   "family": [
//       {
//           "name": "Yuni-Q"
//       }
//   ],
//   "something": [
//       12,
//       3,
//       45
//   ],
//   "set": {},
//   "map": {}
// }
console.log(JSON.stringify(obj, replacer));
// {"name":"Yuni-Q","family":[{"name":"Yuni-Q"}],"something":[12,3,45],"mothod":"mothod() {\n\t\treturn 'i am ignored';\n\t}","set":[1,4,5],"map":[[1,4],[5,10]],"symb":"Symbol(test)"}
```

### 8. Promise를 순차적으로 실행

```javascript
const asyncSequentializer = (() => {
  const toPromise = (x) => {
    if (x instanceof Promise) return x;

    if (typeof x === 'function') {
      return (async () => await x())();
    }

    return Promise.resolve(x);
  };

  return (list) => {
    const results = [];

    return list
      .reduce((lastPromise, currentPromise) => {
        return lastPromise.then((res) => {
          results.push(res);
          return toPromise(currentPromise);
        });
      }, toPromise(list.shift()))
      .then((res) => Promise.resolve([...results, res]));
  };
})();
```

### 9. 데이터 폴링

```javascript
const { await } = require('signale');

async function poll(fn, validate, interval = 2500) {
	const resolver = async (resolve, reject) => {
		try {
			const result = await fn();
			const valid = validate(result);

			if (valid === true) {
				resolver(result);
			} else if (valid === false) {
				setTimeout(resolver, interval, resolve, reject);
			}
		} catch (e) {
			reject(e);
		}
	};

	return new Promise(resolver);
}
```

## 10. Promise 함수들

```javascript
const prom1 = Promise.reject(12);
const prom2 = Promise.resolve(28);
const prom3 = Promise.resolve(48);
const prom4 = Promise.reject('error');

Promise.all([prom1, prom2, prom3, prom4])
  .then((res) => console.log('all', res))
  .catch((err) => console.log('all failed', err));
// all failed 12

Promise.allSettled([prom1, prom2, prom3, prom4])
  .then((res) => console.log('allSettled', res))
  .catch((err) => console.log('allSettled failed', JSON.stringify(err)));
// allSettled, [{status: "rejected", reason: 12}, {status: "fulfilled", value: 28}, {status: "fulfilled", value: 48}, {reason: 'error', status: 'rejected'}
Promise.any([prom1, prom2, prom3, prom4])
  .then((res) => console.log('any', res))
  .catch((err) => console.log('any failed', err));
// any 28
Promise.race([prom1, prom2, prom3, prom4])
  .then((res) => console.log('race', res))
  .catch((err) => console.log('race failed', err));
// race failed 12
```

### 10-1. Promise all과 await

```js
const d = async () => {
  try {
    const a = await Promise.all([b(), await c()]);
    // argument가 먼저 판별되어야 함수(Promise.all)가 실행됩니다.
    // b는 실행이 되었고 argument await c가 판별 중 에러가 발생하여 Promise.all 실행되지 못해서 b의 Rejection을 Promise.all이 해결해주지 못함.
    // 14까지는 Warning(UnhandledPromiseRejectionWarning) 15부터는 Error로 처리되어 UnhandledPromiseRejection가 발생한다.
    // ++a, a++과 같은 연산의 우선순위, 비동기문맥 동기문맥이 어떻게 흘러가는지를 알 수 있는 좋은 예제이다.

    // 위 코드는 사실 아래의 코드와 같은게 된다(Promise.all은 실행되지 못했으니...)
    // b();
    // await c();

    console.trace(a, 5);
  } catch (e) {
    console.error({ e });
    console.error(6);
  }
};

const b = () =>
  new Promise((resolve, reject) => {
    console.trace(1);
    setTimeout(() => {
      console.trace(2);
      reject('b');
    }, 2000);
  });
const c = () =>
  new Promise((resolve, reject) => {
    console.trace(3);
    setTimeout(() => {
      console.trace(4);
      reject('c');
    }, 1000);
  });

d();
```

### 11. 배열값 위치 바꾸기

```javascript
const array = [12, 24, 48];

const swapOldWay = (arr, i, j) => {
  const arrayCopy = [...arr];

  let temp = arrayCopy[i];
  arrayCopy[i] = arrayCopy[j];
  arrayCopy[j] = temp;

  return arrayCopy;
};

const swapNewWay = (arr, i, j) => {
  const arrayCopy = [...arr];

  [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];

  return arrayCopy;
};
```

### 12. 조건부 객체 키 생성

```javascript
const condition = true;

const sample = {
  someProperty: 'some value',
  ...(!!condition ? { newProperty: 'value' } : {}),
};
```

### 13. 변수를 객체 키로 사용

```javascript
const property = 'newValidProp';

const sample = {
  someProperty: 'some value',
  [`${property}`]: 'value',
};
```

### 14. 객체 키 확인

```javascript
const sample = {
	prop: 'value',
};

console.log('prop' in sample); // true
console.log('toString' in sample); // true

console.log(sample.hasOwnProperty('prop')); // true
console.log(sample.hasOwnProperty('toString'); // false
```

### 15. 중복키 제거

```javascript
const numberArrays = [
  undefined,
  Infinity,
  12,
  NaN,
  false,
  5,
  7,
  null,
  12,
  false,
  5,
  undefined,
  89,
  9,
  null,
  Infinity,
  5,
  NaN,
];
const objArrays = [{ id: 1 }, { id: 4 }, { id: 1 }, { id: 5 }, { id: 4 }];
console.log(Array.from(new Set(numberArrays))); // 중복 제거
console.log(Array.from(new Set(objArrays))); // 중복 제거 되지 않음

const idSet = new Set();
console.log(
  objArrays.filter((obj) => {
    const existingId = idSet.has(obj.id);
    idSet.add(obj.id);

    return !existingId;
  }),
);
```

### 16. Array forEach에서 "중단"및 "계속"수행

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const number of numbers) {
  if (number % 2 === 0) {
    continue;
  }

  if (number > 5) {
    break;
  }

  console.log(number);
}

numbers.some((number) => {
  if (number % 2 === 0) {
    return false;
  }

  if (number > 5) {
    return true;
  }

  console.log(number);
});
```

### 17. 별칭과 기본값

```javascript
const obj = {
  dt: { name: 'sample' },
};

function destructuring({ dt: data }) {
  console.log(data);
}

function defaultValues({ dt: { name, id = 10 } }) {
  console.log(name, id);
}

destructuring(obj); // { name: 'sample' }
defaultValues(obj); // sample, 10
```

### 18. 선택적 체이닝 및 널 병합

```javascript
const obj = {
  data: {
    container: {
      name: {
        value: 'sample',
      },
      int: {
        value: 0,
      },
    },
  },
};

console.log(obj.data.container.int.value || 'no int value'); // 'no int value'
console.log(obj.data.container.int.value ?? 'no int value'); // 0

console.log(obj.data.wrapper.name || 'no name'); // Uncaught TypeError: Cannot read property 'name' of undefined
console.log(
  (obj && obj.data && obj.data.wrapper && obj.data.wrapper.name) || 'no name',
); // no name
console.log(obj?.data?.wrapper?.name || 'no name'); // no name
```

### 19. 함수로 클래스 확장

```javascript
function Parent() {
  const privateProps = 12;
  const privateMethod = () => privateProps + 10;

  this.publicMethod = (x = 0) => privateMethod() + x;
  this.publicProp = 10;
}

class Child extends Parent {
  myProp = 20;
}

const child = new Child();

console.log(child.myProp); // 20
console.log(child.publicProp); // 10
console.log(child.publicMethod(10)); // 32
console.log(child.privateProps); // undefined0
console.log(child.privateMethod()); // Uncaught TypeError: child.privateMethod is not a function
```

### 20. 확장 생성자 함수

```javascript
function Employee() {
  this.profession = 'Software Engineer';
  this.salary = '$150000';
}

function DeveloperFreelancer() {
  this.programmingLaguages = ['Javasciprt', 'Python', 'Swift'];
  this.avgPerHour = '$100';
}

function Engineer(name) {
  this.name = name;
  this.freelancer = {};

  Employee.apply(this);
  DeveloperFreelancer.apply(this.freelancer);
}

const yuni = new Engineer('yuni');

console.log(yuni.name); // yuni
console.log(yuni.profession); // Software Engineer
console.log(yuni.salary); // $150000
console.log(yuni.freelancer); // {programmingLaguages: ['Javasciprt', 'Python', 'Swift'], avgPerHour: "$100"}
```

### 21. 무엇이든 반복

```javascript
function forEath(list, callback) {
  let entries;
  if (list instanceof Map || list instanceof Set) {
    list = Array.from(list);
  }
  entries = Object.entries(list);
  const len = entries.length;

  for (i = 0; i < len; i++) {
    const res = callback(entries[i][1], entries[i][0], list);

    if (res === true) break;
  }
}

forEath([1, 2, 3], console.log);
// 1 "0" [1,2,3]
// 2 "1" [1,2,3]
// 3 "2" [1,2,3]

forEath(new Set([1, 2, 3]), console.log);
// 1 "0" [1, 2, 3]
// 1 "1" [1, 2, 3]
// 1 "2" [1, 2, 3]
forEath(
  new Map([
    [1, 1],
    [2, 2],
    [3, 3],
  ]),
  console.log,
);
// [1,2], "0", [[1,1],[2,2],[3,3]]
forEath('123', console.log);
// 1 0 123
// 2 1 123
// 3 2 123
forEath({ a: 1, b: 2, c: 3 }, console.log);
// 1 "a" {a:1,b:2,c:3}
// 2 "b" {a:1,b:2,c:3}
// 3 "c" {a:1,b:2,c:3}
```

### 22. 함수 필수 인수 만들기

```javascript
function required(argName = 'param') {
  throw new Error(`"${argName}" is required`);
}

function iHaveRequiredOptions(arg1 = required('arg1'), arg2 = 10) {
  console.log(arg1, arg2);
}

iHaveRequiredOptions(); // Uncaught Error: "arg1" is required
iHaveRequiredOptions(12); // 12, 10
iHaveRequiredOptions(12, 24); // 12, 24
iHaveRequiredOptions(undefined, 24); // Uncaught Error: "arg1" is required
```

### 23. 모듈 or 싱글톤 만들기

```javascript
class Service {
  name = 'service';
}

const service = (function () {
  const service = new Service();

  return () => service;
})();

const element = (function () {
  const element = document.createElement('DIV');

  return () => element;
})();
```

### 24.deep clone object

```javascript
const deepClone = (obj) => {
  let clone = obj;
  if (obj && typeof obj === 'object') {
    clone = new obj.constructor();

    Object.getOwnPropertyNames(obj).forEach(
      (prop) => (clone[prop] = deepClone(obj[prop])),
    );
  }

  return clone;
};
```

### 25. Deep freeze object

```javascript
const deepFreeze = (obj) => {
  if (obj && typeof obj === 'object') {
    if (!Object.isFrozen(obj))
      Object.getOwnPropertyNames(obj).forEach((prop) => deepFreeze(obj[prop]));
  }

  return obj;
};
```

## 참고

- [JavaScript로 만나는 세상](https://helloworldjavascript.net)
- [[번역]ES6 축약코딩 기법 19가지](https://chanspark.github.io/2017/11/28/ES6-%EA%BF%80%ED%8C%81.html)
- [25 JavaScript Tricks You Need To Know About](https://medium.com/before-semicolon/25-javascript-code-solutions-utility-tricks-you-need-to-know-about-3023f7ed993e)
