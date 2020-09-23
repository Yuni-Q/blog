---
title: regular expression
date: 2020-07-23 09:07:56
category: develop
tags: ['regular expression']
draft: true
---

## 정규표현식이란

- 정규표현식(Regular Expression, 이하 정규식)의 정의를 간단하게 설명하자면, 주어진 문자열에서 발견할 수 있는 글자 패턴을 표현한 식입니다.

## 생성하기

```javascript
// 정규식 리터럴 방식은 문자열 양쪽을 슬래시(/)로 감싸는 방식입니다. 스크립트가 로드될 때 컴파일되므로, 정규식 문자열이 변하지 않는다면 리터럴 방식으로 선언하는 것이 성능 상 조금 더 이점이 있습니다.
const regex = /abc/;

// 정규식 생성자를 이용하는 방법은 RegExp 생성자에 매개변수로 패턴을 선언하는 방식입니다. 정규식이 실행 시점에 컴파일되므로, 정규식을 동적으로 변화시켜야 할 때 유용합니다.
const regex = new RegExp('abc');
```

## 특수문자 이스케이프(Escape)

- 정규식 문자열은 특수문자를 포함할 수 있습니다. 이 때 몇몇 특수문자들은 아래에서 알아볼 바와 같이 특수한 용도로 사용되는 예약어이기 때문에, 백슬래시(\)를 문자 앞에 붙여줌으로써 이용해 문자 그대로 해석되어야 함을 알려주어야 합니다.

```javascript
// 특수문자를 문자 그대로 검색하고 싶을 때에는 백슬래시로 이스케이프 시켜줍니다
const regex1 = /\*/;
const regex2 = /\?/;
const regex3 = /\./;
const regex3 = /\\/;
```

## 플래그(Flags)

- JavaScript에서는 정규식을 생성할 때 고급 검색을 위한 옵션을 설정할 수 있도록 플래그를 지원합니다. 플래그는 리터럴 방식인지 생성자 방식인지에 따라 설정하는 방식이 조금 다릅니다.

```javascript
// flags 에 플래그 문자열이 들어갑니다
// const regex1 = /abc/flags; // 에디터가 자꾸 순서를 바꿔서 주석으로 처리했습니다.
const regex2 = new Regex(/abc/, flags);
```

### g: 전역 검색(Global)

- 전역 검색 플래그가 없는 경우에는 최초 검색 결과만 반환하는 반면, 전역 검색 플래그가 있는 경우에는 모든 검색 결과를 배열로 반환합니다.

```javascript
// `a`가 두 개 포함된 문자열을 만들었습니다
const str = 'abcabc';

// `g` 플래그 없이는 최초에 발견된 문자만 반환됩니다
str.match(/a/);
// ["a", index: 0, input: "abcabc", groups: undefined]

// `g` 플래그와 함께라면 모든 결과가 배열로 반환됩니다
str.match(/a/g);
// (2) ["a", "a"]
```

### m: 줄바꿈 검색(Multiline)

- 여러 줄의 정규식 문자열이 실제 여러 줄로써 다루어져야 할 때 사용되며, 각 줄 별로 대응됩니다.

```javascript
// 줄바꿈이 포함된 문자열을 만들었습니다
const str = `abc
abc`;

// 줄바꿈을 별도로 확인할 수 없습니다
str.match(/$/g);
// [""]

// 각 줄 별로 시작과 끝을 확인할 수 있습니다
str.match(/$/gm);
// (2) ["", ""]
```

### i: 대소문자 구분 없음(Case Insensitive)

- 정규식은 기본적으로 대소문자를 구분합니다(Case sensitive). i 플래그를 통해 대소문자 구분을 사용하지 않을 수 있습니다.

```javascript
const str = 'abcABC';

str.match(/a/gi);
// (2) ["a", "A"]
```

### 이 외에도 y, u, s 등의 옵션이 있습니다.

## 메타 문자(Meta Character)

### 문자 그룹(Character Set, [], [^])

- 중괄호([])로 묶인 긍정 문자 그룹은 중괄호 내부의 문자열 중 하나라도 일치하는 경우를 의미합니다.

```javascript
// gray와 grey를 모두 검색할 수 있는 문자열을 만들어봅니다
const str = 'gray and grey';

str.match(/gr[ae]y/g);
// (2) ["gray", "grey"]
```

- 이 때 중괄호 내부에 들어가는 특수문자는 메타 문자로 취급되지 않기 때문에, 별도로 이스케이프 하지 않아도 된다는 특징이 있습니다.

```javascript
// 특수문자 문자열을 만들어봅니다
const str = '!?@#$%^&';

// [] 안에 있는 특수문자는 리터럴 특수문자로 취급됩니다
str.match(/[?!.]/g);
// (2) ["!", "?"]
```

- 문자 그룹에서 연속된 문자열을 나타내고자 하는 경우, 범위 지정 구문(dash, -) 를 이용해 보다 간략하게 표기를 할 수 있습니다.

```javascript
// 아래의 두 정규식은 같습니다
const regex1 = /[A-Z]/;
const regex2 = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;

// 아래의 두 정규식도 같습니다
const regex3 = /[0-9]/;
const regex4 = /[0123456789]/;

// 이를 이용해 한글도 나타낼 수 있습니다
const regex5 = /[가-힣]/;
```

- 문자 그룹이 중괄호 안에 있는 문자들 중에서 일치하는 경우를 나타냈다면, 이의 역집합에 해당하는 문법도 있습니다. 부정 문자 그룹(Negative Character Set, [^]) 입니다.

```javascript
// 숫자와 문자가 섞인 문자열을 만들었습니다
const str = '2020 07 18 Saturday';

// 숫자만 찾아보았습니다
str.match(/[0-9]/g);
// (8) ["2", "0", "2", "0", "0", "7", "1", "8"]

// 숫자가 아닌 것만 찾아보았습니다
str.match(/[^0-9]/g);
// (11) [" ", " ", " ", "S", "a", "t", "u", "r", "d", "a", "y"]
```

### 10진수 문자(Digit Character, \d, \D)

- 10진수 문자 \d는 0에서의 9까지의 문자 그룹([0-9])와 동일한 역할을 하는 단축어입니다. 대문자 \D를 사용하면 그 역집합을 나타낼 수 있습니다.

```javascript
// 위의 예시를 가져와봤습니다
const str = '2020 07 18 Saturday';

// 숫자만 찾아보았습니다
str.match(/\d/g);
// (8) ["2", "0", "2", "0", "0", "7", "1", "8"]

// 숫자가 아닌 것만 찾아보았습니다
str.match(/\D/g);
// (11) [" ", " ", " ", "S", "a", "t", "u", "r", "d", "a", "y"]
```

### 단어 문자(Word Character, \w, \W)

- 단어 문자 \w는 영어 대소문자와 숫자, 그리고 언더스코어(_)를 포함하는 그룹([0-9a-zA-Z_])과 동일한 역할을 하는 단축어입니다. 대문자 \W를 사용하면 그 역집합을 나타낼 수 있습니다.

```javascript
// 위의 예시를 또 가져와봤습니다
const str = '2020 07 18 Saturday';

// 단어만 찾아보았습니다
str.match(/\w/g);
// (16) ["2", "0", "2", "0", "0", "7", "1", "8", "S", "a", "t", "u", "r", "d", "a", "y"]

// 단어가 아닌 것만 찾아보았습니다
str.match(/\W/g);
// (3) [" ", " ", " "]
```

### 공백 문자(Whitespace Character, \s, \S)

- 공백 문자 \s는 스페이스, 탭, 폼피드, 줄 바꿈 문자 등을 포함한 하나의 공백 문자에 해당합니다. 마찬가지로 대문자 \S 를 사용해 역집합을 나타냅니다.

```javascript
// 공백만 찾아보았습니다
str.match(/\s/g);
// (3) [" ", " ", " "]

// 공백이 아닌 것만 찾아보았습니다
str.match(/\S/g);
// (16) ["2", "0", "2", "0", "0", "7", "1", "8", "S", "a", "t", "u", "r", "d", "a", "y"]
```

### 임의의 문자(Any Character, .)

- 임의의 문자를 나타내는 .은 개행 문자를 제외한 모든 단일 문자에 해당합니다.

```javascript
// 임의의 단일 문자를 모두 가져옵니다
str.match(/./g);
// (19) ["2", "0", "2", "0", " ", "0", "7", " ", "1", "8", " ", "S", "a", "t", "u", "r", "d", "a", "y"]
```

### 앵커(Anchor, ^, \$)

- 메타 문자들이 어떤 문자열을 일치시킬 것인지에 관한 것이었다면, 앵커는 입력된 정규식이 어떤 특정 위치에서 동작할지를 제한하는 역할의 문자입니다. 즉, 위치만 제한할 뿐 검색 결과에는 포함되지 않습니다.
  - 패턴 시작 앵커(^)는 해당 정규식이 줄의 시작 부분인지를 확인하는 역할을 합니다. 보통 정규식의 가장 앞에 붙여서 사용합니다.
  - 패턴 종료 앵커(\$)는 해당 정규식이 줄의 마지막 부분인지를 확인하는 역할을 합니다. 보통 정규식의 가장 마지막에 붙여서 사용합니다.

```javascript
// 여러 `w` 중에서 문자열의 시작 부분과 일치하는지를 확인합니다
const str = 'www';

// 가장 첫 번째 `w` 만 반환됩니다
str.match(/^w/);
// ["w", index: 0, input: "www", groups: undefined]

// 가장 마지막 `w` 만 반환됩니다
str.match(/w$/);
// ["w", index: 2, input: "www", groups: undefined]
```

### 단어 경계(Word Boundaries, \b, \B)

- 단어 경계는 다른 단어 문자(\w)가 앞이나 뒤에 등장하지 않는 위치임을 나타내는 문자입니다.

```javascript
const str = 'create or ate';

// `ate`의 좌우로 단어 문자가 없는 것만 찾아봅니다
str.match(/\bate\b/g);
// ["ate", index: 10, input: "create or ate", groups: undefined]

// `ate` 좌측에만 단어가 포함되어 있는 것만 찾아봅니다
str.match(/\Bate\b/);
// ["ate", index: 3, input: "create or ate", groups: undefined]
```

### 교체 구문(Alternation, |)

- 교체 구문은 OR 연산자와 동일한 역할을 하며, 연산자 우선 순위가 가장 낮습니다. 따라서 여러 정규식을 붙여 사용할 수 있습니다. 기호로는 파이프(|)를 사용합니다.

```javascript
const str = 'red or green or blue';

str.match(/red|blue/g);
// (2) ["red", "blue"]
```

### 수량자(Quantifier)

- 수량자는 메타 문자들이 N회 반복됨을 나타내기 위한 문자입니다. 적용하고자 하는 문자의 오른쪽에 수량자를 붙입니다.
- 기본적으로 정규식은 탐욕적이기 때문에, 수량자에 다양한 경우의 패턴이 매칭될 때에는 가능한 긴 패턴을 반환합니다.

#### 게으른 수량자(Lazy Quantifier)

```javascript
const str = 'abc';

// 아래 예시는 `ab` 또는 `abc` 가 있는지 검색하는 정규식입니다
str.match(/abc?/);
// ["abc", index: 0, input: "abc", groups: undefined]
```

- 위 정규식은 c라는 단어 문자에 옵셔널(?)한 플래그를 줆으로써 ab, abc 라는 두 가지 경우에 일치하는지를 확인하는 정규식입니다. 그 결과는 ab도 일치함과 동시에 abc도 일치하지만, 정규식은 탐욕적(Greedy)이기 때문에 기본적으로 더 길고 많은 값을 반환합니다.
- 그렇다면 탐욕적이지 않게 만드는 방법은 없을까요? 바로 수량자 뒤에 ?를 다시 붙이는 방법입니다.

```javascript
str.match(/abc??/);
// ["ab", index: 0, input: "abc", groups: undefined]
```

- 위의 경우 역시 ab와 abc 두 경우를 모두 검색하는 것이지만, 게으르게 만듦(Lazy)으로써 가능한 한 더 적고 짧은 값을 반환받게 되었습니다.
- 위에서 메타 문자 \w, \d의 역집합이 \W, \D 이었던 것이 기억 나시나요? 마찬가지로 수량자에서는 ? 플래그를 마지막에 붙여줆으로써 반환값을 다르게 받을 수 있습니다.

#### 정확히 n번 일치({n})

- {n}에 들어간 숫자만큼 반복된 경우 일치한다고 판단하는 수량자입니다.

```javascript
const str = 'abcaabc';

str.match(/a{1}b/);
// ["ab", index: 0, input: "abcaabc", groups: undefined]

str.match(/a{2}b/);
// ["aab", index: 3, input: "abcaabc", groups: undefined]
```

#### n번 이상 m번 이하 일치({n, m}, {n, m}?)

- {n, m}에 들어간 숫자 중 n번 이상이면서 m번 이하일 때 일치한다고 판단하는 수량자입니다.

```javascript
const str = 'aaaaa';

str.match(/a{1,3}/);
// ["aaa", index: 0, input: "aaaaa", groups: undefined]

str.match(/a{1,3}?/);
// ["a", index: 0, input: "aaaaa", groups: undefined]
```

#### 적어도 n번 일치({n,}, {n,}?)

- {n}에 들어간 숫자 중 적어도 n번 이상인 경우를 일치한다고 판단하는 수량자입니다.

```javascript
const str = 'aaaaa';

str.match(/a{1,}/);
// ["aaaaa", index: 0, input: "aaaaa", groups: undefined]

str.match(/a{1,}?/);
// ["a", index: 0, input: "aaaaa", groups: undefined]
```

#### 0번 또는 1번 일치(?, ??)

- 물음표, 흔히 옵셔널(Optional, ?)이라고도 불리는 문자로, 0번 또는 1번 반복되는 경우 일치한다고 판단하는 수량자입니다.

```javascript
const str = 'aaaaa';

str.match(/aa?/);
// ["aa", index: 0, input: "aaaaa", groups: undefined]

str.match(/aa??/);
// ["a", index: 0, input: "aaaaa", groups: undefined]
```

#### 1번 이상 일치(+)

- 더하기 기호(Plus, +)는 1번 이상 반복되는 경우 일치한다고 판단하는 수량자입니다.

```javascript
const str = 'aaaaa';

str.match(/a+/);
// ["aaaaa", index: 0, input: "aaaaa", groups: undefined]

str.match(/a+?/);
// ["a", index: 0, input: "aaaaa", groups: undefined]
```

#### 0번 이상 일치(\*)

- 별표, 아스테리스크 또는 와일드카드(Asterisk, Wildcard \*)라고 불리며 0번 이상 반복되는 경우 일치한다고 판단하는 수량자입니다.

```javascript
const str = 'aaaaa';

str.match(/a*/);
// ["aaaaa", index: 0, input: "aaaaa", groups: undefined]

// 아스테리스크는 0번 반복도 포함하기 때문에 0번 반복,
// 즉 `str`의 시작 문자열에서도 일치한다고 판단되었기 때문에
// 빈 문자열이 옵니다
str.match(/a*?/);
// ["", index: 0, input: "aaaaa", groups: undefined]
```

### 그룹화(Grouping)와 캡처화(Capturing)

- 그룹화는 정규표현식 내의 특정 부분을 단일 표현식(single entitiy)로 구분짓기 위해 사용됩니다. 그룹화에는 기본적으로 캡처화가 동반되기 때문에 조금 헷갈릴 수 있는 개념입니다.
- 우선 그룹화는 말 그대로 표현식의 일부를 그룹화 할 수 있습니다.

```javascript
const str = 'aaabbbabab';

// 이 표현식은 [ab, abb, abbb, ...] 를 검색합니다.
str.match(/ab+/g);
// (3) ["abbb", "ab", "ab"]

// 이 표현식은 [ab, abab, abab, ...] 를 검색합니다.
str.match(/(ab)+/g);
// (2) ["ab", "abab"]
```

- 괄호로 묶여진 그룹을 하나의 단일 표현식으로 정의하고, 이를 수량자를 이용해 다시 반복하고 있는 모습입니다.
- 캡처화는 괄호로 묶인 단일 표현식이 정규식 내부에서 \1, \2, \3 과 같은 이름의 임시 변수에 저장되게 되어 참조할 수 있게 됨을 말하고, 이를 정규식 내에서 다시 호출하는 것을 역참조(Back References) 라고 부릅니다. 이 때 저장되는 순서는 정규식이 실행되는 순서에 기반하며, 밖에서부터 안으로, 왼쪽에서 오른쪽 순으로 저장되게 됩니다.

```javascript
const str = 'aaabbbabab';

// 아래 표현식은 순서대로 `(a)`, `(b)`가 캡처되어
// `\1`, `\2`로 대치되었기 때문에 `abab`와 동일합니다
str.match(/(a)(b)\1\2/);
// (3) ["abab", "a", "b", index: 6, input: "aaabbbabab", groups: undefined]

// `str.match`에 캡쳐 그룹이 포함된 경우, 각 캡쳐 그룹을 실행한 결과를 배열에 포함해서 반환합니다.
// 즉 3개의 배열이 오는 이유는
// - 1. `str.match`의 기본 결과값,
// - 2. `str.match`의 1번 캡쳐 그룹의 결과값,
// - 3. `str.match`의 2번 캡쳐 그룹의 결과값
// 을 모두 포함하고 있기 때문입니다
```

#### 캡처링 그룹화((x), \n)

- 일반 괄호를 사용해서 정규식을 묶을 경우, 그룹화가 되며 캡쳐화가 됩니다. 즉 \n을 이용해 그룹의 역참조가 가능합니다.

```javascript
const str = 'aaabbbabab';

str.match(/(ab)\1/);
// (2) ["abab", "ab", index: 6, input: "aaabbbabab", groups: undefined]
```

#### 비 캡처링 그룹화((?:x))

- 그룹화가 필요하지만 캡처화는 필요하지는 않은 경우에는 ?:로 괄호를 시작함으로써 불필요한 캡쳐화를 막을 수 있습니다.

```javascript
const str = 'aaabbbabab';

str.match(/(?:ab)+/g);
// (2) ["ab", "abab"]
```

#### 명명된 캡처링 그룹화(?<name>x), \k<name>)

- ES2018에서 캡처링 그룹에 명시적으로 이름을 명명할 수 있는 기능이 추가되었습니다. 아래와 같은 문법으로 사용합니다.

```javascript
const str = 'aaabbbabab';

// 아래 문법은 `ab`를 `foo`라는 이름으로 캡처하고,
// `\k<foo>`라는 곳에서 해당 이름을 호출하여 전체 정규식이 `abab`가 된 모습입니다
str.match(/(?<foo>ab)\k<foo>/);
// (2) ["abab", "ab", index: 6, input: "aaabbbabab", groups: {…}]
```

### 전후방탐색(Lookaround)

- 전후방탐색은 주어진 패턴보다 좌측 혹은 우측에 있는 문자열이 일치하는지를 판별하는 패턴입니다. 여기에서 괄호에 포획된 식은 결과값에 포함되지 않는다는 것에 주의해주세요.

#### 전방 탐색(x(?=y))

- y를 만족하면서 왼쪽(전방)에 x가 있는 경우를 나타냅니다.

```javascript
const str = 'abc';

str.match(/b(?=c)/);
// ["b", index: 1, input: "abc", groups: undefined]

str.match(/a(?=c)/);
// null
```

#### 부정 전방 탐색(x(?!y))

- y를 만족하면서 왼쪽(전방)에 x가 없는 경우를 나타냅니다.

```javascript
const str = 'abc';

str.match(/b(?!c)/);
// null

str.match(/a(?!c)/);
// ["a", index: 0, input: "abc", groups: undefined]
```

#### 후방 탐색((?<=y)x)

- ES2018에 도입된 문법으로, y를 만족하면서 오른쪽(후방)에 x가 있는 경우를 나타냅니다.

```javascript
const str = 'abc';

str.match(/(?<=a)b/);
// ["b", index: 1, input: "abc", groups: undefined]

str.match(/(?<=a)c/);
// null
```

#### 부정 후방 탐색((?<!y)x)

- ES2018에 도입된 문법으로, y를 만족하면서 오른쪽(후방)에 x가 없는 경우를 나타냅니다.

```javascript
const str = 'abc';

str.match(/(?<!a)b/);
// null

str.match(/(?<!a)c/);
// ["c", index: 2, input: "abc", groups: undefined]
```

## 유저의 입력 검증하기

### 이메일 주소 검증하기

```javascript
const regex = /^[\w!#$%&'*+/=?^_{|}~-]+(?:\.[\w!#$%&'*+/=?^_{|}~-]+)*$/g;

// 영어 + 숫자
regex.test('bboydart91'); // true
// 계정 중간이 .으로 나누어짐
regex.test('bboydart91.test'); // true

// .으로 끝나거나 시작함
regex.test('.bboydart91'); // false
regex.test('bboydart91.'); // false
```

### 도메인

```javascript
const regex = /^(?:\w+\.)+\w+$/g;

// 호스트와 도메인 식별자가 모두 존재
regex.test('google.com'); // true
regex.test('google.co.kr'); //true

// 도메인 식별자가 없음
regex.test('google.'); // false
regex.test('google'); // false

// 호스트가 없음
regex.test('.com'); // false
regex.test('.co.kr'); // false
```

### 계정 패턴 표현식과 도메인 패턴 표현식을 합치자

```javascript
// 계정 패턴: ^[\w!#$%&'*+/=?^_{|}~-]+(?:\.[\w!#$%&'*+/=?^_{|}~-]+)*
// 도메인 패턴 (?:\w+\.)+\w+$
const regex = /^[\w!#$%&'*+/=?^_{|}~-]+(?:\.[\w!#$%&'*+/=?^_{|}~-]+)*@(?:\w+\.)+\w+$/g;

regex.test('bboydart91@gmail.com'); // true
regex.test('bboydart.evan@gmail.com'); // true
regex.test('bboydart@naver.co.kr'); // true

regex.test('.bboydart91@gmail.com'); // false
regex.test('bboydart91@gmail'); // false
regex.test('bboydart91.@gmail.com'); // false
```

### 전화번호

```javascript
// 휴대폰 번호를 잡아내는 패턴
// /010-\d{3,4}-\d{4}/;
// 01[0|1|6|7|8|9]
const regex = /^\d{2,3}-?\d{3,4}-?\d{4}$/g;

regex.test('01012341234'); // true
regex.test('010-1234-1234'); // true
regex.test('0212341234'); // true
regex.test('02-1234-1234'); // true
regex.test('031-123-1234'); // true
```

### 비밀번호

- 반드시 소문자, 대문자, 숫자, 특수 문자가 하나씩 포함되어야한다.
- 같은 문자가 3번 이상 반복되면 안된다.
- 8글자 이상이어야 한다.

```javascript
const password = 'test1234!';

// 따로 검사
const hasNumberPattern = /\d/g;
const hasLowerCasePattern = /[a-z]/g;
const hasUpperCasePattern = /[A-Z]/g;
const hasSpecialCharPattern = /\W/g;

if (!hasNumberPattern.test(password)) {
  console.error('비밀번호에는 숫자가 하나 이상 어쩌고...');
} else if (!hasLowerCasePattern.test(password)) {
  console.error('비밀번호에는 영어 소문자가 하나 이상 어쩌고...');
} else if (...) {}
```

### Lookaround를 사용하여 유효성 검사하기

```javascript
// ://이라는 문자 앞에 등장하는 https를 잡아줘!
const regex = /https(?=:\/\/)/g;

regex.exec('https'); // null
regex.exec('https://'); // ['https']
```

| 이름                | 패턴        | 의미                            |
| ------------------- | ----------- | ------------------------------- |
| Positive Lookahead  | abc(?=123)  | 123 앞에 오는 abc를 잡아라      |
| Negative Lookahead  | abc(?!123)  | 123 앞에 오지 않는 abc를 잡아라 |
| Positive Lookbehind | (?<=123)abc | 123 뒤에 오는 abc를 잡아라      |
| Negative Lookbehind | (?<!123)abc | 123 뒤에 오지 않는 abc를 잡아라 |

```javascript
/q(?=u)i/g.exec('quit'); // null
/q(?=u)u/g.exec('quit'); // ["qu"]
/(?=\d)./.exec('abc123'); // ["1"]
```

```javascript
/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*(.)\1{2}).{8,}/;
```

| 표현            | 의미                                    |
| --------------- | --------------------------------------- |
| (?=.\*\d)       | 연속 또는 하나만 나타날 수 있는 \d      |
| (?=.\*[a-z])    | 연속 또는 하나만 나타날 수 있는 [a-z]   |
| (?=.\*[A-Z])    | 연속 또는 하나만 나타날 수 있는 [A-Z]   |
| (?=.\*[\W])     | 연속 또는 하나만 나타날 수 있는 [\W]    |
| (?!.\*(.)\1{2}) | 연속적으로 3번 나타나지 않는 모든 문자  |
| .{8,}           | 위 조건을 모두 통과한 8자리 문자열 패턴 |

## 불규칙한 문자열에서 원하는 정보만 골라내기

### 주어진 문자열 내에서 숫자만 골라내기

```javascript
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const amount = '1,000원'
	.split('')
	.filter(v => NUMBERS.includes(v))
	.join('');

// 또는

const amount = '1,000원'.replace(',', '').replace('원', '');

console.log(Number(amount)); // 1000

const amount = '1,000원'.replace(/[^0-9]/g, '');
// 또는
const amount = '1,000원'.replace(/[^\d]/g, '');
// or
const amount = '1,000원'.replace(/\D/g, '');

console.log(Number(amount)); // 1000
```

### 문장 속에서 금액만 추출하기

```javascript
const string =
	'현재까지 로또 복권의 총 판매금액은 38조40230억2565만7000원. 2014년 기준 회당 평균 580억원 가량의 로또가 팔린다. 조사에 따르면 1인당 평균 구매액은 9400원으로 19세 이상 성인 인구 기준 매주 약 512만 명이 로또를 구입한다.';

string.match(/(?<=\s)\S*?\d+(?=원)/g); // ["38조40230억2565만7000", "9400"]

// (?<=\s): 공백(\s) 뒤에 있고(?<=)
// \S*?: 공백이 아닌 문자(\S)가 있을 수도 있고 없을 수도 있으며(*?)
// \d+: 숫자(\d)가 한 개 이상(+) 조합되어있고
// (?=원): “원”이라는 글자 앞에 있는(?=원) 녀석들
```

## 문자열을 내가 원하는 포맷으로 변환하기

### 사용자의 정보 마스킹하기

```javascript
function mask(str, headCount = 1) {
	// 문자열 맨 앞의 n 글자를 가져온다
	const head = new RegExp(`^.{${headCount}}`, 'g').exec(str);

	// head를 제외한 나머지를 마스킹한다
	const tails = str.replace(head, '').replace(/./g, '*');

	// head와 tails를 합친다
	return head + tails;
}

mask('문동욱', 2); // '문동*'
mask('01047556185', 5); // '01047******'
```

```javascript
function enhancedMask(str, headCount = 1) {
	// \S[\s-]* 패턴이 n번 나오는 경우를 모두 묶어서 head로 할당한다
	const head = new RegExp(`^(?:\\S[\\s-]*){${headCount}}`, 'g').exec(str);

	// head를 제외한 나머지 부분 중 공백과 -를 제외한 부분을 마스킹한다
	const tails = str.replace(head, '').replace(/[^\s-]/g, '*');

	// head와 tails를 합친다
	return head + tails;
}

mask('E Van Moon', 2); // 'E V** ****'
mask('010-4755-6185', 5); // '010-47**-****'
```

## IDE 내에서 원하는 부분만 Replace하기

## 참고

- [정규표현식 완전정복](https://wormwlrm.github.io/2020/07/19/Regular-Expressions-Tutorial.html?fbclid=IwAR16MbpS_qbBA9NdTBwOPczu3_5Ji7S6TJ1wPHUNjzUNLevLjqS7GZ-Cucs)
- [정규식은 어떻게 사용되는 것일까?](https://evan-moon.github.io/2020/08/15/regex-example/?fbclid=IwAR2R-kUMPEHOICafsBCB-kN8_byH5T5Gb-AmJkEsCGtOGIBmPUpf8V-L68Q)

## 나중에 볼 링크

- [불규칙 속에서 규칙을 찾아내는 정규표현식](https://evan-moon.github.io/2020/07/24/about-regular-expression/?utm_source=gaerae.com&utm_campaign=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%8A%A4%EB%9F%BD%EB%8B%A4&utm_medium=social&fbclid=IwAR0vBjhK6sU0T-oNVzmTiMyjd7Xxnyuf4i223sKI6S_7S3D5yi9OPGIM1og)
