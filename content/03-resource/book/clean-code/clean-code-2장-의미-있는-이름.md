---
title: clean code 2장 의미 있는 이름
date: 2020-03-03 13:03:71
category: clean code
draft: true
---

## 의도를 분명히 밝힙니다.

- 변수의 존재 이유, 기능, 사용법 등이 변수/함수/클래스명에 드러나야 합니다.
- 따로 주석이 필요하지 않을 정도로 드러나야 합니다.
- 의미를 함축하거나 독자(코드를 읽는 사람)가 사전 지식을 가지고 있다고 가정하지 않습니다.

## 그릇된 정보를 피합니다.

- 중의적으로 해석될 수 있는 이름 피해야 합니다.
- 개발자에게는 특수한 의미를 가지는 단어(List 등)는 실제 컨테이너가 List가 아닌 이상 accountList와 같이 변수명에 붙이지 않습니다. 차라리 accountGroup, bunchOfAccounts, accounts등으로 명명합니다.

## 의미 있게 구분 합니다.(불용어(noise word)를 쓰지 않습니다.)

- 말이 안되는 단어(한 글자만 바꾼다던지 한 단어), [a1, a2, …]과 같이 숫자로 구분하지 않습니다.
- 클래스 이름에 Info, Data와 같은 불용어를 붙이지 않습니다. 정확한 개념 구분이 되지 않습니다.
  - Name VS NameString
  - getActiveAccount() VS getActiveAccounts() VS getActiveAccountInfo() (이들이 혼재할 경우 서로의 역할을 정확히 구분하기 어렵습니다.)
  - money VS moneyAmount
  - message VS theMessage

## 발음하기 쉬운 이름을 사용합니다.

## 검색하기 쉬운 이름을 사용합니다.

- 상수는 static final과 같이 정의해 사용합니다.
- 변수 이름의 길이는 변수의 범위에 비례해서 길어집니다.

## 인코딩을 피합니다.(변수에 부가 정보를 덧붙여 표기하는 것을 뜻합니다.)

- 헝가리안 표기법
  - 변수명에 해당 변수의 타입(String, Int 등)을 적지 않습니다.
- 맴버 변수 접두어
  - 맴버 변수 접두어를 붙이지 않습니다.
- 인터페이스와 구현
  - 인터페이스 클래스와 구현 클래스를 나눠야 한다면 구현 클래스의 이름에 정보를 인코딩하자.
    |Do / Don't| Interface class| Concrete(Implementation) class|
    |-|-|-|
    |Don't| IShapeFactory| ShapeFactory|
    |Do| ShapeFactory| ShapeFactoryImp|
    |Do |ShapeFactory |CShapeFactory|

## 자신의 기억력을 자랑하지 않습니다.

- 독자가 머리속으로 한번 더 생각해 변환해야 할만한 변수명을 쓰지 않습니다.
  -URL에서 호스트와 프로토콜을 제외한 소문자 주소를 r이라는 변수로 명명하는 일 등
- 똑똑한 프로그래머와 전문가 프로그래머를 나누는 기준 한가지는 "Clarity(명료함)"입니다.

## 클래스 이름

- 클래스 이름과 객체 이름은 명사나 명사구가 적합합니다.
  - Customer, WikiPage, Account, AddressParser 등이 좋은 예다. Manager, Processor, Data, Info 등과 같은 단어는 피하고，동사는 사용하지 않습니다.

## 메서드 이름

- 메서드 이름은 동사나 동사구가 적합하다.
  - postPayment, deletePagc, save 등이 좋은 예입니다.
- 접근자(Accessor), 변경자(Muiator), 조건자(Predicate)는 javabean 표준에 따라 값 앞에 get, set, is를 붙입니다. should, has 등도 가능합니다.
- 생성자(Constructor)를 중복 정의(overload)할 때는 정적 팩토리 메서드를 사용합니다. 메서드는 인수를 설명하는 이름을 사용합니다.

## 기발한 이름은 피합니다.

- 특정 문화에서만 사용되는 재미있는 이름보다 의도를 분명히 표현하는 이름을 사용합니다.

## 한 개념에 한 단어를 사용합니다.

- 추상적인 개념 하나에 단어 하나를 사용합니다.
  - fetch, retrieve, get
  - controller, manager, driver

## 말장난을 하지 않습니다.

- 한 단어를 두 가지 목적으로 사용하지 않습니다.

## 해법 영역(Solution Domain)에서 가져온 이름을 사용합니다.

- 개발자라면 당연히 알고 있을 JobQueue, AccountVisitor(Visitor pattern)등을 사용하지 않을 이유는 없습니다.
- 전산용어, 알고리즘 이름, 패턴 이름, 수학 용어 등은 사용합니다.

## 문제 영역(Problem Domain)에서 가져온 이름을 사용합니다.

- 적절한 프로그래머 용어가 없거나 문제영역과 관련이 깊은 용어의 경우 문제 영역 용어를 사용합니다.

## 의미 있는 맥락을 추가합니다.

- 클래스, 함수, namespace등으로 감싸서 맥락(Context)을 표현합니다.
- 그래도 불분명하다면 접두어를 사용합니다.

## 불필요한 맥락을 없앱니다.

- Gas Station Delux 이라는 어플리케이션을 작성한다고 해서 클래스 이름의 앞에 GSD를 붙이지는 말자. G를 입력하고 자동완성을 누를 경우 모든 클래스가 나타나는 등 효율적이지 못합니다.
- 위 a처럼 접두어를 붙이는 것은 모듈의 재사용 관점에서도 좋지 못하다. 재사용하려면 이름을 바꿔야 합니다.
  - GSDAccountAddress 대신 Address라고만 해도 충분합니다.

## 두려워하지 말고 서로의 명명을 지적하고 고칩니다. 그렇게 하면 이름을 외우는 것에 시간을 빼앗기지 않고 "자연스럽게 읽히는 코드"를 짜는 데에 더 집중할 수 있습니다.
