---
title: CHAPTER 08 - 기능 이동
date: 2021-09-13 02:09:56
category: 리팩토링 2판
tags: []
draft: true
---

## 8.1 함수 옮기기(Move Function)

- 1판에서의 이름 : 메서드 이동

```js
// as-is
class Account {
  get overdraftChange() {
    // ...
  }
}

// to-be
class AccountType {
  get overdraftChange() {
    // ...
  }
}
```

- 좋은 소프트웨어 설계의 핵심은 모듈화가 얼마나 잘 되어 있느냐를 뜻하는 모듈성입니다. 모듈성이란 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력입니다. 모듈성을 높이려면 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야 합니다.
- 모든 함수는 어던 컨텍스트 안에 존재합니다.

### 절차

1. 선택한 함수가 현재 컨텍스트에서 사용 중인 모든 프로그램 요소를 살펴봅니다. 이 요소들 중에도 함께 옮겨야 할 게 있는지 고민해봅니다.

- 호출되는 함수 중 함께 옮길 게 있다면 대체로 그 함수를 먼저 옮기는 게 낫습니다. 얽혀 있는 함수가 여러 개라면 다른 곳에 미치는 영향이 적은 ㅎ람수부터 옮기도록 합니다.
- 하위 함수들의 호출자가 고수준 함수 하나뿐이면 먼저 하위 함수들을 고수준 함수에 인라인한 다음, 고수준 함수를 옮기고, 옮긴 위치에서 개별 함수들로 다시 추출합니다.

2. 선택한 함수가 다형 메서드인지 확인합니다.

- 객체 지향 언어에서는 같은메서드가 슈퍼클래스나 서브클래스에도 선언되어 있는지까지 고려해야 합니다.

3. 선택한 함수를 타깃 컨텍스트로 복사합니다(이 때 원래의 함수를 소스 함수라 하고 복사해서 만든 새로운 함수를 탁딧 함수라 합니다). 타깃 함수가 새로운 터전에 잘 자리 잡도록 다듬습니다.

- 함수 본문에서 소스 컨텍스트의 요소를 사용한다면 해당 요소들을 매개변수로 넘기거나 소스 컨텍스트 자체를 참조로 넘겨줍니다.
- 함수를 옮기게 되면 새로운 컨텍스트에 어울리는 새로운 이름으로 바꿔줘야 할 경우가 많습니다. 핋요하면 바꿔줍니다.

4. 정적 분석을 수행합니다.
5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반녕합니다.
6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정합니다.
7. 테스트합니다.
8. 소스 함수를 인라인할지 고민해봅니다.

- 소스 함수는 언제까지라도 위임 함수로 남겨둘 수 있습니다. 하지만 소스 함수를 호출하는 곳에서 타깃 함수를 직접 호출하는 데 무리가 없다면 중단 단계(소스 함수)는 제거하는 편이 낫습니다.

## 8.2 필드 옮기기(Move Field)

```js
// as-is
class Customer {
  get plan() {
    return this._plan;
  }
  get discountRate() {
    return this._discountRate;
  }
}

// to-be
class Customer {
  get plan() {
    return this._plan;
  }
  get discountRate() {
    return this.plan.discountRate;
  }
}
```

- 프로그램의 상당 부분이 동작을 구현하는 코드로 이뤄지지만 프로그램의 진짜 힘은 데이터 구조에서 나옵니다.
- 현재 구조가 적절치 않음을 깨닫게 되면 곧바로 수정해야 합니다.

### 절차

1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화합니다.
2. 테스트합니다.
3. 타깃 객체에 필드(와 접근자 메서드들)를 생성합니다.
4. 정적 검사를 수행합니다.
5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인합니다.

- 기존 필드나 메서드 중 타깃 객체를 넘겨주는 게 있을지 모릅니다. 없다면 이런 기능의 메서드를 쉽게 만들 수 있는지 살펴봅니다. 간단치 않다면 타깃 객체를 저장할 새 필드를 소스 객체에 생성합니다. 이는 영구적인 변경이 되겠지만, 더 넓은 맥락에서 리팩터링을 충분히 하고 나면 다시 앲앨 수 있을 때도 있습니다.

6. 접근자들이 타깃 필드를 사용하도록 수정합니다.

- 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두를 갱신하고, 이어서 일관성을 개드리는 갱신을 검출할 수 있도록 어서션을 추가합니다. 모든 게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정합니다.

7. 테스트합니다.
8. 소스 필드를 제거합니다.
9. 테스트합니다.

## 8.3 문장을 함수로 옮기기(Move Statements into Function)

- 반대 리팩터링 : 문장을 호출한 곳으로 옮기기

```js
// as-is
result.push(`<p>제목 : ${person.photo.title}</p>`);
result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>위치 : ${aPhone.location}</p>`,
    `<p>날짜 : ${aPhone.date.toDateString()}</p>`,
  ];
}

// to-be
result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>제목 : ${person.photo.title}</p>`,
    `<p>위치 : ${aPhone.location}</p>`,
    `<p>날짜 : ${aPhone.date.toDateString()}</p>`,
  ];
}
```

- 중복 제거는 코드를 건강하게 관리하는 가장 효과적인 방법 중 하나입니다.
- 문장들을 함수로 옮기려면 그 문장들이 피호출 함수의 일부라는 확신이 있어야 합니다. 피호출 함수와 한 몸은 아니지만 여전히 함께 호출돼야 하는 경우라면 단순히 해당 문장들과 피호출 함수를 통째로 또 하나의 함수로 추출합니다.

### 절차

1. 반복 코드가 함수 호출 부분과 멀리 떨어져 있다면 문장 슬라이드하기를 적용해 근처로 옮깁니다.
2. 타깃 함수를 호출하는 곳이 한 곳뿐이면, 단순히 소스 위치에서 해당 코드를 잘라내어 피호출 함수로 복사하고 테스트합니다. 이 경우라면 나머지 단계는 무시합니다.
3. 호출자가 둘 이상이면 호출자 중 하나에서 '타깃 함수 호출 부분과 그 함수로 옮기려는 문장들을 함께' 다른 함수로 추출합니다. 추출한 함수에 기억하기 쉬운 임시 이름을 지어줍니다.
4. 다른 호출자 모두가 방금 추출한 함수를 사용하도록 수정합니다. 하니씩 수정할 때마다 테스트합니다.
5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인한 후 원래 함수를 제거합니다.
6. 새로운 함수의 이름을 원래 함수의 이름으로 바꿔줍니다.

- 더 나은 이름이 있다면 그 이름을 씁니다.

## 8.4 문장을 호출한 곳으로 옮기기(Move Statements to Callers)

- 반대 리팩터링 : 문장을 함수로 옮기기

```js
// as-is
emitPhotoData(outSteam, person.photo);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목 : ${photo.title}</p>\n`);
  outStream.write(`<p>위치 : ${photo.location}</p>\n`);
}

// to-be
emitPhotoData(outSteam, person.photo);
outStream.write(`<p>제목 : ${photo.title}</p>\n`);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>위치 : ${photo.location}</p>\n`);
}
```

### 절차

1. 호출자가 한두 개뿐이고 피호출 함수도 간단한 단순한 상황이면, 피호출 함수의 처음(혹은 마지막) 줄(들)을 잘라내어 호출자(들)로 복사해 넣습니다(필요하면 적당히 수정합니다). 테스트만 통과하면 이번 리팩터링은 여기서 끝입니다.
2. 더 복잡한 상황에서는, 이동하지 '않길' 원하는 모든 문장을 함수로 추출한 다음 검색하기 쉬운 이름을 지어줍니다.

- 대상 함수가 서브클래스에서 오버라이드됐다면 오버라이드한 서브클래스들의 메서드 모두에서 동일하게, 남길 부분을 메서드로 추출합니다. 이 때 남겨질 메서드의 본문은 모든 클래스에서 똑같아야 합니다. 그런 다음 (슈퍼클래스의 메서드만 남기고) 서브클래스들의 메서드를 제거합니다.

3. 원래 함수를 인라인 합니다.
4. 추출된 함수의 이름을 원래 함수의 이름으로 변경합니다(함수 이름 바꾸기).

- 더 나은 이름이 떠오르면 그 이름을 사용합니다.

## 8.5 인라인 코드를 함수 호출로 바꾸기(Replace Inline Code with Function Call)

```js
// as-is
let appliesToMass = false;
for (const s of states) {
  if (s === 'MA') appliesToMass = true;
}

// to-be
appliesToMass = states.includes('MA');
```

- 함수는 여러 동작을 하나로 묶어줍니다. 그리고 함수의 이름이 코드의 동작 방식보다는 `목적`을 말해주기 때문에 함수를 활용하면 코드를 이해하기가 쉬워집니다.
- 함수는 중복을 없애는 데도 효과적입니다. 비슷해 보이는 코드들을 일일이 찾아 수정하는 대신 함수 하나만 수정하면 됩니다.

### 절차

1. 인라인 코드를 함수 호출로 대체합니다.
2. 테스트합니다.

## 8.6 문장 슬라이드하기(Slide Statements)

```js
// as-si
const pricingPlan = retrievePricingPlan();
const order = retrieveOrder();
let change;
const chargePerUnit = pricingPlan.unit;

// to-be
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retrieveOrder();
let change;
```

- 관련된 코드들이 가까이 모여 있다면 이홰하기가 더 쉽습니다.

### 절차

1. 코드 조각(문장들)을 이동할 목표 위치를 찾습니다. 코드 조각의 원래 위치와 목표 위치 사이의 코드들을 훑어보면서, 조각을 모으고 나면 동작이 달라지는 코드가 있는지 살핍니다. 다음과 같은 간섭이 있다면 이 리팩터링을 포기합니다.

- 코드 조각에서 참조하는 요소를 선언하는 문장 앞으로는 이동할 수 없습니다.
- 코드 조각을 참조하는 요소의 뒤로는 이동할 수 없습니다.
- 코드 조각이 수정하는 요소를 참조하는 요소를 건너뛰어 이동할 수 없습니다.

2. 코드 조각을 원래 위치에서 잘라내어 목표 위치에 붙여 넣습니다.
3. 테스트합니다.

## 8.7 반복문 쪼개기(Split Loop)

```js
// as-is
let averageAge = 0;
let totalSalary = 0;
for (const p of people) {
  averageAge += p.age;
  totalSalary += p.salary;
}
averageAge = averageAge / people.length;

// to-be
let totalSalary = 0;
for (const p of people) {
  totalSalary += p.salary;
}

let totalSalary = 0;
for (const p of people) {
  averageAge += p.age;
}
averageAge = averageAge / people.length;
```

- 각각의 반복문으로 분리해두면 수정할 동작 하나만 이해하면 됩니다.
- 리팩터링과 최적화를 구분해야 합니다.

### 절차

1. 반복문을 복제해 두 개로 만듭니다.
2. 반복문이 중복되어 생긴느 부수효과를 파악해서 제거합니다.
3. 테스트합니다.
4. 완료됐으면, 각 반복문을 함수로 추출할지 고민해봅니다.

## 8.8 반복문을 파이프라인으로 바꾸기(Replace Loop with Pipeline)

```js
// as-is
const names = [];
for (const i of input) {
  if (i.job === 'programmer') names.push(i.name);
}

// to-be
const names = input.filter((i) => i.job === 'programmer').map((i) => i.name);
```

- 컬렉션 파이프라인을 이용하면 처리 과정을 일련의 연산으로 표현할 수 있습니다.
- 논리를 파이프라인으로 표현하면 이해하기 훨씬 쉬워집니다. 객체가 파이프라인을 따라 흐르며 어떻게 처리되는지 읽을 수 있기 때문입니다.

### 절차

1. 반복문에서 사용하는 컬렉션을 가리키는 변수를 하나 만듭니다.

- 기존 변수를 단순히 복사한 것일 수도 있습니다.

2. 반복문의 첫 줄부터 시작해서, 각각의 단위 행위를 저절한 컬렉션 파이프라인 연산으로 대체합니다. 이 때 컬렉션 파이프라인 연산은 1에서 만든 반복문 컬렉션 변수에서 시작하여, 이전 연산의 결과를 기초로 연쇄적으로 수행됩니다. 하나를 대체할 때마다 테스트합니다.
3. 반복문의 모든 동작을 대체했다면 반복문 자체를 지웁니다.

- 반복문이 결과를 누적 변수에 대입했다면 파이프라인의 결과를 그 누적 변수에 대입합니다.

## 8.9 죽은 코드 제거하기(Remove Dead Code)

```js
// as-is
if (false) {
  doSomethingThatUsedToMatter();
}

// to-be
```

- 코드가 더 이상 사용되지 않게 됐다면 지워야 합니다.
- 버전 관리 시스템이 있다면 다시 필요해진다고 해도 문제가 없습니다.

### 절차

1. 죽은 코드를 외부에서 참조할 수 있는 경우라면 (예컨대 함수 하나가 통째로 죽었을 때) 혹시라도 호출하는 곳이 있는지 확인합니다.
2. 업삳면 죽은 코드를 제거합니다.
3. 테스트합니다.
