---
title: generator
date: 2020-04-12 00:04:09
category: javascript
draft: false
---

- ES6는 제너레이터(Generator) 또는 Generator 함수 형태에서 함수와 Iterator를 다루는 방법을 새롭게 소개했습니다. 제너레이터는 함수를 중간에서 멈추고, 다시 멈췄던 부분부터 실행할 수 있게 합니다. 요약하면, Generator는 함수의 형태를 띄지만, Iterator처럼 동작합니다.
- 재미있는 사실은 async/await이 Generator를 기반으로 한 것이라는 겁니다.

## 제너레이터란 무엇인가?

- 제너레이터는 <b>함수</b>이지만 일반 함수와는 다른 독특한 동작을 합니다.
- 일반적인 함수들은 작업이 끝나기 전엔 끝낼 수 없습니다. 이러한 형태의 함수를 run-to-complete 모델이라고 합니다. 반대로, 제너레이터는 `중간에 멈출 수 있는 함수`입니다. 그리고 `멈춘 부분부터 다시 실행`을 시작할 수 있습니다.
- 제너레이터의 일반적인 정의는 다음과 같습니다.
  - 제너레이터는 Iterator 작성 작업을 간단하게 해줄 수 있는 함수들의 특별한 클래스입니다.
  - 제너레이터는 하나의 값 대신에 결과의 순서를 생성하는 함수입니다. 이를테면 제너레이터는 값의 시리즈를 만들어(generate) 냅니다.
- 자바스크립트에서, 제너레이터는 next()를 호출할 수 있는 오브젝트를 반환하는 함수입니다. 여러분이 next() 호출을 할 때마다, 다음과 같은 형태의 오브젝트를 반환합니다. value 프로퍼티는 값을 가집니다. done 프로퍼티는 true 혹은 false를 갖습니다. done이 true가 될 때, 제너레이터는 멈추고 더 이상 값을 만들어내지 않습니다.
  - 제너레이터가 영영 끝나지 않는 경우의 수도 있습니다.

## 제너레이터 만들어보기

- 우리는 function이라는 일반적인 함수 선언 대신에 function* 이라는 문법을 사용해서 함수를 선언했습니다. function 키워드와 \* 그리고 함수 이름 사이에는 얼만큼의 빈공간이든 들어올 수 있습니다. 왜냐하면 이건 그냥 함수이고, 함수가 사용되는 곳이면 어디서든 사용할 수 있습니다. 예를 들면, 오브젝트 내부 그리고 클래스 메소드로도 사용 가능합니다.
- 함수의 바디 부분 내부에서, 우리는 return 키워드를 사용하지 않습니다. 그 대신에, 우리는 `yield`라는 키워드를 대신 사용합니다. yield라는 키워드는 제너레이터가 멈추게 할 수 있는 연산자(operator)입니다. 제너레이터가 yield를 만날 때마다, 제너레이터는 yield 뒤에 기재된 값을 반환합니다.
- 제너레이터에서 물론 값을 그냥 반환(return)하는 것도 가능합니다. 하지만, return은 done 프로퍼티를 true로 설정합니다. 그래서 그 이후로는 제너레이터는 어떠한 값도 generate(생산)해낼 수 없습니다.
- 우리는 제너레이터 오브젝트를 만들 때 함수를 호출하는 것처럼 보입니다. 사실대로 말하자면 우리는 정말 그렇게 했습니다. 단지 차이점은 제너레이터는 값을 반환하는 대신에 항상 제너레이터 오브젝트를 반환한다는 것입니다. 제너레이터 오브젝트는 iterator입니다. 그래서 여러분들은 for-of 루프 내부에서 제너레이터를 사용할 수도 있습니다. 또는 다른 함수에서도 역시 iterator처럼 받아들여집니다.
- 내부에 존재하는 next() 메소드를 호출합니다. 이 호출로 인해, 제너레이터는 실행되기 시작합니다.
- yield를 마주하게 되면 오브젝트 값을 생산하고 잠시 거기서 일시 정지하게 됩니다.
- 더이상 실행할 라인이 없습니다. 여러분이 기억해야 할 것은 모든 함수가 명시된 return값이 없다면 묵시적으로 undefined를 반환한다는 것입니다. 그러므로, 제너레이터는 yield하는 대신에, { value: undefined, done: true } 형태의 오브젝트를 반환하게 됩니다. 이제, 이 제너레이터는 더 이상 값을 반환하거나 재실행 될 수 없습니다. 왜냐하면 더이상 실행할 구문이 남아있지 않기 때문입니다.
- 이제 다시 값을 생성하기 위해서는 새로운 제너레이터를 만들어야 합니다.

## 제너레이터의 쓰임

### Iterable 수행하기

- 여러분이 iterator를 수행할 때, 여러분은 next() 메소드를 가진 iterator 오브젝트를 직접 만들어야 합니다. 또한, 여러분은 상태를 직접 저장해야 합니다. 가끔씩은, 정말 그렇게 하기 귀찮은 상황이 옵니다. 제너레이터는 iterable(반복 가능)하기 때문에, 제너레이터는 귀찮은 추가적인 보일러플레이트 코드 없이 iterable을 수행하는데에 사용될 수 있습니다.
- Symbol.iterator를 생각할 필요가 없습니다.
- next()를 구현할 필요가 없습니다.
- next() 내부에 쓰이는 { value: 'This', done: false }와 같은 반환 오브젝트에 대해 작성할 필요도 없습니다.
- 상태를 저장할 필요도 없습니다. iterator 예제에서는, 상태가 step이라는 변수에 저장되었습니다. step은 iterable로부터 무엇이 결과물로 나왔는지를 정의하는 값이었습니다. 제너레이터에서는 이러한 귀찮은 작업들이 필요 없습니다.

### 더 나은 비동기 함수성

- async/await은 비슷한 전략을 따라갑니다. async/await은 promise가 있고, yield를 await으로 교체합니다. async/await은 generator를 바탕으로 할 수 있습니다.

### 끊이지 않는 데이터 스트림

- 영원히 끝나지 않는 제너레이터를 만드는 것도 가능합니다.

### Observer(관찰자)로서의 Generator

- Generator는 next(val)함수를 사용하여 값을 받을 수 있습니다. generator가 새로운 값을 받을 때, 깨어나기 때문에, generator는 observer로도 불립니다. 이러한 동작은 값을 지켜보다(observing) 가 generator가 값을 가졌을 때, generator가 동작한다고 생각될 수 있습니다.

## Generator의 장점

### Lazy Evaluation (게으른 계산)

- 끊이지 않는 데이터 스트림과 같은 행동은 Lazy Evaluation이라는 특성 때문에 가능합니다. Lazy Evaluation은 값이 필요로 될 때까지, 표현식의 Evaluation을 미루는 Evaluation 모델입니다. 우리가 만일 값이 필요 없다면, Evaluation이 일어나지 않습니다. 우리가 필요한 때에 값은 계산됩니다.

### 메모리 효율

- Lazy Evaluation은 즉각적으로 우리의 generator가 메모리 효율을 고려할 수 있다는 것을 알려줍니다. 우리는 필요로되는 값만 생성합니다. 일반적인 함수로 값을 구한다면, 우리는 모든 값을 미리 계산하여 구해놔야 합니다. 그리고 우리가 나중에 쓸 일을 대비해서 그 값을 가지고 있어야 합니다. 하지만, generator를 사용하여, 우리는 우리가 필요할 때까지 우리는 계산을 미룰 수 있습니다.

### 경고(Caveats)

- `generator 오브젝트는 오직 한 번만 접근 가능`합니다. 여러분이 만일 모든 값을 사용했다면, 소진된 generator는 다시는 반복을 수행할 수 없습니다. 다시 값을 생성해내려면, 다시 generator 오브젝트를 생성해야 합니다.

## 추가적인 사항

- generator 에 대한 많은 것들이 아직 다뤄지지 않았습니다. yield \*라던지, return(), throw()와 같은 것들이 다루어지지 않았습니다. generator는 또한 coroutine도 가능하게 만듭니다.

## 제너레이터 함수의 생성
- 제너레이터 함수는 function* 키워드로 선언합니다.
- 그리고 하나 이상의 yield 구문을 포함합니다.

```javascript
// 제너레이터 함수 선언: 함수 선언식
function* genFunc() {
  var index = 0;
  while (index < 3) {
    yield index++;
  }
}
```

- 제너레이터 함수는 일반함수와 같이 함수 선언식, 함수 표현식, 메소드로 선언할 수 있습니다.

```javascript
// 제너레이터 함수 선언: 함수 표현식
const genFunc = function* () {
 ...
};

// 제너레이터 메소드
const obj = {
  * generatorMethod() {
    ···
  }
};

// 제너레이터 클래스 메소드
class MyClass {
  * generatorMethod() {
    ···
  }
}

```

## 제너레이터 함수의 호출

- 제너레이터 함수를 호출하면 함수 블록이 실행되는 것이 아니라, 제너레이터 객체를 반환

```javascript
// 제너레이터 함수 선언
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수 호출. 제너레이터 객체를 생성하고 반환한다.
const generator = foo();

// 제너레이터 객체는 순회가능한 이터러블이다.
for (const val of generator) {
  console.log(val); // 1 2 3
}
```

```javascript
// 제너레이터 함수 선언
function* genFunc() {
  console.log('제너레이터 함수 시작');
  yield 1;
  console.log('제너레이터 함수 재시작');
  yield 2;
  console.log('제너레이터 함수 종료');
}

// 제너레이터 함수 호출. 제너레이터 객체를 생성하고 반환한다.
const generator = genFunc();

// 제너레이터 객체는 next 메소드를 갖는 이터레이터이다.
// 처음 실행
console.log(generator.next());
// 제너레이터 함수 시작
// { value: 1, done: false }

// 두번째 실행
console.log(generator.next());
// 제너레이터 함수 재시작
// { value: 2, done: false }

// 마지막 실행
console.log(generator.next());
// 제너레이터 함수 종료
// { value: undefined, done: true }
```

## 이터레이션 프로토콜을 사용하여 피보나치 수열

```javascript
const fibonacci = {
  * [Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    const maxStep = 10;

    for (let i = 0; i < maxStep; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
};

for (const num of fibonacci) {
  console.log(num);
}

// 제너레이터 객체는 이터러블이다.
const fibonacci = function* (maxStep) {
  let [prev, curr] = [0, 1];

  for (let i = 0; i < maxStep; i++) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
};

for (const num of fibonacci(10)) {
  console.log(num);
}
```

## 참조

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #24-2 자바스크립트 : 예제와 함께 자바스크립트 ES6 generator](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-24-2-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%98%88%EC%A0%9C%EC%99%80-%ED%95%A8%EA%BB%98-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-ES6-generator)
- [ES6의 제너레이터를 사용한 비동기 프로그래밍](https://meetup.toast.com/posts/73)
- [제너레이터](https://poiemaweb.com/es6-generateor)