---
title: CHAPTER 10 - 조건부 로직 간소화
date: 2021-09-18 23:09:97
category: 리팩토링 2판
tags: []
draft: true
---

- 조건부 로직은 프로그램의 힘을 강화하는 데 크게 기여하지만, 안타깝게도 프로그램을 복잡하게 만드는 주요 원흉이기도 합니다.

## 10.1 조건문 분해하기(Decompose Conditional)

```js
// as-is
if (!aData.isBefore(plan.summerStart) && !aData.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}

// to-be
if (summer()) {
  charge = summerCharge();
} else {
  charge = regularChange();
}
```

- 복잡한 조건부 로직은 프로그램을 복잡하게 만드는 가장 흔한 원흉에 속합니다.
- 다양한 조건, 그에 따라 동작도 다양한 코드를 작성하면 순식간에 꽤 긴 함수가 탄생합니다. 긴 함수는 그 자체로 읽기가 어렵지만, 조건문은 그 어려움을 한층 가중시킵니다.
- 거대한 코드 블록이 주어지면 코드를 부위별로 분해한 다음 해체된 코드 덩러리들을 각 덩어리의 의도를 살린 이름의 함수 호출로 바꿔줍니다.

### 절차

1. 조건식과 그 조건식에 딸린 조건절 각각을 함수로 추출합니다.

## 10.2 조건식 통합하기(Consolidate Conditional Expression)

```js
// as-is
if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;

// to-be
if (isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  );
}
```

- 어차피 같은 일을 할 거라면 조건 검사도 하나로 통합하는 게 낫습니다.
- 여러 조각으로 나뉜 조건들을 하나로 통합함으로써 내가 하려는 일이 더 명확해집니다. 나눠서 순서대로 비교해도 결과는 같지만, 읽는 사람은 독립된 검사들이 우연히 함께 나열된 것으로 오해할 수 있습니다.
- 작업이 함수 추출까지 이어질 가능성이 높습니다. 복잡한 조건식을 함수로 추출하면 코드의 의도가 훨씬 분명하게 드러나는 경우가 많습니다. 함수 추출하기는 '무엇'을 하는지를 기술하던 코드를 '왜'하는지를 말해주는 코드로 바꿔주는 효과적인 도구입니다.
- 조건식을 통합해야 하는 이유는 이 리팩터링을 하지 말아야 하는 이유도 설명해줍니다. 하나의 검사라고 생각할 수 없는, 다시 말해 진짜로 독립된 검사들이라고 판단되면 이 리팩터링을 해서는 안 됩니다.

### 절차

1. 해당 조건식들 모두에 부수효과가 없는지 확인합니다.

- 부수효과가 있는 조건식드렝는 질의 함수와 변경 함수 분리하기를 먼저 적용합니다.

2. 조건문 두 개를 선태갛여 두 조건문의 조건식들을 논리 연산자로 결합합니다.

- 순차적으로 이뤄지는(레벨이 같은) 조건문은 or로 결합하고, 중첩된 조건문은 and로 결합합니다.

3. 테스트합니다.
4. 조건이 하나만 남을 때까지 2~3 과정을 반복합니다.
5. 하나로 합쳐진 조건식을 함수로 추출할지 고려해봅니다.

## 10.3 중첩 조건문을 보호 구문으로 바꾸기(Replace Nested Conditional with Guard Clauses)

```js
// as-is
function getPayAmount() {
  let result;
  if (isDead) {
    result = deadAmount();
  } else {
    if (isSeparated) {
      result = separatedAmount();
    } else {
      if (isRetired) {
        result = retiredAmount();
      } else {
        result = normalPayAmount();
      }
    }
  }
}

// to-be
function getPayAmount() {
  if (isDead) {
    return deadAmount();
  }
  if (isSeparated) {
    return separatedAmount();
  }
  if (isRetired) {
    return retiredAmount();
  }
  return normalPayAmount();
}
```

- 조건문은 참인 경로와 거짓인 경로 모두 정상 동작으로 이어지는 형태와 한쪽만 정상인 형태로 쓰입니다. 두 형태는 의도하는 바가 서로 다르므로 그 의도가 코드에 드러나야 합니다.
- 한쪽만 정상인 형태를 보호구문이라고 합니다.

### 절차

1. 교체해야 할 조건 중 가장 바깥 것을 선택하여 보호 구문으로 바꿉니다.
2. 테스트합니다.
3. 1~2 과정을 필요한 만큼 반복합니다.
4. 모든 보호 구문이 같은 결과를 반환한다면 보호 구문들의 조건식을 통합합니다.

## 10.4 조건부 로직을 다형성으로 바꾸기(Replace Conditional with Polymorphism)

```js
// as-is
switch (bird.type) {
  case '유럽 제비':
    return '보통이다';
  case '아프리카 제비':
    return bird.numberOfCoconuts > 2 ? '지쳤다' : '보통이다';
  case '노르웨이 파랑 앵무':
    return bird.voltage > 100 ? '그을렸다' : '예쁘다';
  default:
    return '알 수 없다';
}

// to-be
class EuropeanSwallow {
  get plumage() {
    return '보통이다';
  }
}
// ...
class AfricanSwallow {
  get plumage() {
    return this.numberOfCoconuts > 2 ? '지쳤다' : '보통이다';
  }
}
// ...
class NorwegianBlueSwallow {
  get plumage() {
    return this.voltage > 100 ? '그을렸다' : '예쁘다';
  }
}
```

- 종종 더 높은 수준의 개념을 도입해 이 조건들을 분리해낼 수 있습니다. 조건문 구조를 그대로 둔 채 해결될 때도 있자만, 클래스와 다형성을 이용하면 더 확실하게 분리할 수 있습니다.

### 절차

1. 다형적 동작을 표현하는 클래스들이 아직 없다면 만들어줍니다. 이왕이면 적합한 인스턴스를 알아서 만들어 변환하는 팩터리 함수도 함께 만듭니다.
2. 호출하는 코드에서 팩터리 함수를 사용하게 합니다.
3. 조건부 로직 함수를 슈퍼클래스로 옮깁니다.

- 조건부 로직이 온전한 함수로 분리되어 있지 않다면 먼저 함수로 추출합니다.

4. 서브클래스 중 하나를 선택합니다. 서브클래스에 해당하는 조건절을 서브클래스 메서드로 복사한 당므 적절히 수정합니다.
5. 같은 방식으로 각 조건절을 해당 서브클래스에서 메서드로 구현합니다.
6. 슈퍼클래스 메서드에는 기본 동작 부분만 남깁니다. 혹은 슈퍼클래스가 추상 클래스여야 한다면, 이 메서드를 추사응로 선언하거나 서브클래스에서 처리해야 함을 알리는 에러를 던집니다.

## 10.4 특이 케이스 추가하기

- 1판에서의 이름 : Null 검사를 널 객체에 위임

```js
// as-is
if (aCustomer === '미확인 고객') {
  customerName = '거주자';
}

// to-be
class UnknownCustomer {
  get name() {
    return '거주자';
  }
}
```

- 코드베이스에서 특정 값에 대해 똑같이 반응하는 코드가 여러 곳이라면 그 반응들을 한 데로 모으는 게 효율적입니다.
- 특수한 경우의 공통 동작을 요소 하나에 모아서 사용하는 특이 케이스 패턴이라는 것이 있는데, 바로 이럴 때 적용하면 좋은 메커니즘입니다. 이 패턴을 활용하면 특이 케이스를 확인하는 코드 대부분을 단순한 함수 호출로 바꿀 수 있습니다.
- 특이 케이스는 여러 형태로 표현할 수 있습니다. 특이 케이스 객체에서 단순히 데이터를 읽기만 한다면 반환할 값들을 담은 리터럴 객체 형태로 준비하면 됩니다. 그 이상의 어떤 동작을 수행해야 한다면 필요한 메서드를 담은 객체를 생성하면 됩니다. 특이 케이스 객체는 이를 캡슐화한 클래스가 반환하도록 만들 수도 있고, 변환을 거쳐 데이터 구조에 추가시키는 형태도 될 수 있습니다.

### 절차

1. 컨테이너에 특이 케이스인지를 검사하는 속성을 추가하고, false를 반환하게 합니다.
2. 특이 케이스 객체를 만듭니다. 이 객체는 특이 케이스인지를 검사하는 속성만 포함하며, 이 속성은 true를 반환하게 합니다.
3. 클라이언트에서 특이 케이스인지를 검사하는 코드를 함수로 추출합니다. 모든 클라이언트가 값을 직접 비교하는 대신 방금 추출한 함수를 사용하도록 고칩니다.
4. 코드에 새로운 특이 케이스 대상을 추가합니다. 함수의 반환 값으로 받거나 변환 함수를 적용하면 됩니다.
5. 특이 케이스를 검사하는 함수 본문을 수정하여 특이 케이스 객체의 속성을 사용하도록 합니다.
6. 테스트합니다.
7. 여러 함수를 클래스로 묶기나 여러 함수를 변환 함수로 묶기를 적용하여 특이 케이스를 처리하는 공통 도앚ㄱ을 새로운 요소로 옮깁니다.

- 툭이 케이스 클래스는 간단한 요청에는 항상 같은 값을 반환하는 게 보통이므로, 해당 특이 케이스의 리터럴 레코드를 만들어 홯용할 수 있을 것입니다.

8. 아직도 특이 케이스 검사 함수를 이용하는 곳이 남아 있다면 검사 함수를 인라인합니다.

## 10.6 어서션 추가히기(Introduce Assertion)

```js
// as-is
if (this.discountRate) {
  base = base - this.discountRate * base;
}

// to-be
assert(this.discountRate >= 0);
if (this.discountRate) {
  base = base - this.discountRate * base;
}
```

- 특정 조건이 참일 때만 제대로 동작하는 코드 영역이 있을 수 있습니다.
- 어서션은 항상 참이라고 가정하는 조건부 문장으로, 어서션이 실패했다는 건 프로그래머가 잘못했다는 뜻입니다. 어서션 실패는 시스템의 다른 부분에서는 절대 검사하지 ㅇ낳아야 하며, 어서션이 있고 없고가 프로그램 기능의 정상 동작에 아무런 영향을 주지 않도록 작성돼야 합니다. 그래서 어서션을 컴ㅂ파일 타임에 켜고 끌 수 있는 스위치를 제공하는 프로그래밍 언어도 있습니다.
- 어서션은 오류 찾기에 활용하는 것을 넘어 프로그램이 어떤 상태임을 가정한 채 실행되는지를 다른 개발자에게 알려주는 훌륭한 소통 도구입니다.

### 절차

1. 참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가합니다.

## 10.7 제어 플래그를 탈출문으로 바꾸기(Replace Control Flag with Break)

- 1판에서의 이름 : 제어 플래그 제거

```js
// as-is
for (const p of people) {
  if (!found) P;
  if (p === '조커') {
    sendAlert();
    found = true;
  }
}

// to-be
for (const p of people) {
  if (p === '조커') {
    sendAlert();
    break;
  }
}
```

- 함수에서 할 일을 다 마쳤다면 그 사실을 return문으로 명확히 알리는 편이 낫습니다.

### 절차

1. 제어 플래그를 사용하는 코드를 함수로 추출하지 고려합니다.
2. 제어 플래그를 갱신하는 코드 각각을 제어문으로 바꿉니다. 하나 바꿀때마다 테스트합니다.

- 제어문으로는 주로 return, break, continue가 쓰입니다.

3. 모두 수정했다면 제어 플래그를 제거합니다.
