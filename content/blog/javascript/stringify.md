---
title: 코드 작성시 설계(디자인)의사결정 언어를 의도(유지보수성이 높아지게 디자인하여)에 맞게 사용하기
date: 2021-03-27 22:03:77
category: javascript
tags: []
draft: true
---

## 55까지 더하기

```js
let accumulator = 0;
for (let i = 1; i < 10; i++) accumulator += 1;
console.log(accumulator);
```

### 위와 같은 방식으로는 JSON Parser를 구혀하기 힘듭니다.

- for를 통해 반복 상황이 학정적입니다.
- 바깥에서 코드를 컨트롤 하고 있습니다.

## 재귀를 사용해 봅니다.

```js
const sum = (v) => (v > 1 ? v + sum(v - 1) : 1);
sum(10);
```

### 위의 경우 숫자가 커지 경우 스택오버플로우가 발생할 수 있습니다.

## 꼬리물기 최적화(TRO)를 적용해 봅니다.

- 돌아와서 해야할 일을 인자로 바꿉니다.

```js
const _sum = (v, acc = 0) => (v > 1 ? _sum(v - 1, acc + v) : acc + 1);
const sum = (v) => _sum(v, 0);
sum(10);
```

- 하지만 크롬의 v8의 자바스크립트 엔진은 꼬리물기 최적화를 지원하지 않습니다.
  - 사파리는 지원합니다.
  - ECMA16에서는 지원해야 한다고 하지만 구현한 브라우저는 사파리 뿐입니다.

## 이를 다시 for로 구현합니다.

```js
const v = 10; // 상수 - 특정 컨텍스트(해결하려는 문제) 하에서 미리 주어진 값
let acc = 0; // 저장소 - 스토리지
for (let i = v; i > 1; i--) acc += i; // i :  제어변수 / 카운터
acc += 1;
console.log(acc);
```

- 꼬리물기 최적화 된 로직은 기계적으로 for문으로 만들 수 있습니다.

### 저장소의 역할이 변경되면 결과가 달라집니다.

```js
const reverseRangeTo = (v) => {
  let acc = [];
  for (let i = 1; i > 1; i--) acc.push(i);
  acc.push(1);
  return acc;
};
```

## 숟가락얹기 재귀 -> 꼬리물기 재귀 -> for문으로 기계적 변역

```js
const sum = (v) => {
  let acc = 0;
  for (let i = v; i > 1; i--) acc += i;
  acc += 1;
  return acc;
};
```

### 변수에는 용도가 있습니다. 변수는 라이프사이클과 스코프를 가집니다.

- 라이프사이클 : 되도록이면 짧게 유지합니다. 기억하지 못할 수 있습니다.
- 스코프 : 되도록이면 좁게합니다. 기억하지 못할 수 있을 뿐만 아니라 다른 사람(나중에 자신)이 잘못 건드릴 수 있습니다.
  - 어휘공간 : 일반적인 권한
  - 권한 : 예외적인 스코프
- 플로우 컨트롤은 메모리에 값을 갱신하기 위함입니다.
- 프로그램은 명령에서 메모리를 로드하고 결과를 메모리에 돌리는 것만 합니다.

## 1차원 배열의 합 재귀, 꼬리 재귀 -> 번역한 for

### 재귀

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sumArray = (v) => (v.length > 1 ? v[0] + sumArray(v.slice(1)) : v[0]);
sumArray(arr);
```

#### 배열을 복사하는 것은 너무 많은 비용을 필요로 합니다.

```js
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const _sumArray = (arr, index) => {
  return index >= 0 ? arr[index] + _sumArray(arr, index - 1) : 0;
};
const sumArray = (list) => _sumArray(list, list.length - 1);

sumArray(list);

// 꼬리 재귀
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const _sumArray = (arr, index, acc) => {
  return index >= 0 ? _sumArray(arr, index - 1, acc + arr[index]) : acc;
};
const sumArray = (list) => _sumArray(list, list.length - 1, 0);

sumArray(list);

// 기계적으로 번역한 for문
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 상수
let acc = 0; // 저장소
for (let i = list.length - 1; i >= 0; i = i - 1) acc = acc + list[i];
console.log(acc);

const sumArray = (v) => {
  let acc = 0; // 저장소
  for (let i = v.length - 1; i >= 0; i = i - 1) acc = acc + v[i];
  return acc;
};
```

### 꼬리 재귀

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sumArray = (v, acc = 0) =>
  v.length > 1 ? sumArray(v.slice(1), acc + v[0]) : acc + v[0];
sumArray(arr);
```

### 번역한 for문

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 상수
let acc = 0; // 저장소
for (let i = arr; i.length > 1; i = i.slice(1)) acc += i[0];
acc += arr[arr.length - 1];
console.log(acc);
```

```js
const sumArray = (v) => {
  let acc = 0; // 저장소
  for (let i = v; i.length > 1; i = i.slice(1)) acc += i[0];
  acc += v[v.length - 1];
  return acc;
};
```

## 에러 처리

```js
const recursive = (list, index = 0, acc = 0) => {
  if (!Array.isArray(list)) return 0;
  if (!typeof list[index] !== 'number') return acc;
  return recursive(list, index, acc + list[index]);
};
```

- 내결함성으로 인해 동작하게 됩니다. 하지만 컨텍스트 에러(엉뚱한 결과값)이 발생합니다.
- 내결함성은 안 좋기 때문에 도입에 매우 신중해야 합니다.

```js
const recursive = (list, index = 0, acc = 0) => {
  if (!Array.isArray(list)) throw `invalid list ${list}`;
  if (!typeof list[index] !== 'number')
    throw `invalid element ${index}:${list[index]}`;
  return recursive(list, index, acc + list[index]);
};
try {
  recursive(17);
} catch (e) {
  console.log(e);
}
```

- 함수 내부에서 내결함성을 가지면 안됩니다. 더이상 함수가 끝이 없는 경우 즉 메인함수에서만 가능합니다.
- 프로그램은 안정성보다 신뢰성이 중요합니다.

### 관리를 위한 분리

```js
const listValidator = (list) => Array.isArray(list);
const elementValidator = (el) => typeof el == 'number';
const recursive = (list, index = 0, acc = 0) => {
  if (!listValidator(list)) throw `invalid list ${list}`;
  if (!elementValidator(list[index]) !== 'number')
    throw `invalid element ${index}:${list[index]}`;
  return recursive(list, index, acc + list[index]);
};
try {
  recursive(17);
} catch (e) {
  console.log(e);
}
```

- 유지보수를 위한 분리입니다. 수정 이유가 다르기 때문에 분리합니다. (역할모델)

### validator 일반화 하기

```js
const validator = [
  (list, el) => list instanceof Array,
  (list, el) => typeof el == 'number',
];

const recursive = (list, index = 0, acc = 0) => {
  if (!validator.every((vali) => vali(list, list[index])))
    throw `invalid arguments list ${list}, element ${list[index]}`;
  return recursive(list, index, acc + list[index]);
};
try {
  recursive(17);
} catch (e) {
  console.log(e);
}
```

### 데이터와 코드가 분리되어 있어서 좋지 않아 보입니다.

```js
const validator = {
  data: [
    (list, el) => list instanceof Array,
    (list, el) => typeof el == 'number',
  ],
  validate(list, index) {
    return this.data.every((vali) => vali(list, list[index]));
  },
};

const recursive = (list, index = 0, acc = 0) => {
  if (!validator.validate(list, index))
    throw `invalid arguments list ${list}, element ${list[index]}`;
  return recursive(list, index, acc + list[index]);
};
try {
  recursive(17);
} catch (e) {
  console.log(e);
}
```

## 스코프

```js
const arraySum = (() => {
  const elementSum = (arr, i, acc) => {
    if (arr.length === i) return acc;
    return elementSum(arr, acc + arr[i], i + 1);
  };
  const arraySum = (arr) => elementSum(arr, 0, 0);
  return arraySum;
})();
```

- elementSum이 scope : arraySum만 알게, lifecycle: 영구적

```js
const arraySum = (arr) => {
  const elementSum = (arr, i, acc) => {
    if (arr.length === i) return acc;
    return elementSum(arr, acc + arr[i], i + 1);
  };
  return elementSum(arr, 0, 0);
}();
```

- elementSum이 scope : arraySum만 알게, lifecycle: arraySum을 호출할때 생성되어 리턴 시 삭제
- 메모리를 적게 쓰지만 elementSum을 만들어야 하기 때문에 연산이 더 사용됩니다.

## 여기까지 정리

- 변수란 스코프와 라이프사이클을 가집니다. 메모리와 연산은 상호 교환할 수 있으며 특히 라이프사이클이 관여합니다.
- 오류와 실패의 관계 - 오류는 중간요소의 내결합성 때문에 실패로 이어지지 않을 수 있습니다 : 최대한 빨리 실패로 이어지게 짜야합니다. 컨텍스트 에러가 더욱 무섭습니다. 신뢰성보다 안정성이 더 중요합니다.
- 코드의 분리 또는 정리 - 수정되는 원인에 따라 분리합니다. 변화율(변화율이 같은 애들끼리 코드를 모읍니다.). 변화율의 원인은 수정되는 이유입니다.
- 자바스크립트 인터페이스란 함수의 이름 인자 반환값의 형식이 일치하는 경우
- 인터페이스를 일치시키면 컬렉션으로 묵을 수 있습니다. -> 일종의 일반화 -> 서로 다른 형태인 경우 인터페이스를 일치시켜 일반화를 합니다.
- 데이터와 데이터를 이용한 알고르즘이 이원화 되면 관리가 불가능합니다. -> 데이터를 소유한 쪽에서 데이터를 사용하는 알고리즘을 제공합니다.
- 꼬리물기최적화함수를 루프로 고칠때 기계적으로 고쳐야합니다.
- 결국 루프는 클로저에만 의존하는 함수를 반복시키고, 재귀함수는 인자에만 의존하는 함수를 반복시킵니다.
- 반복되는 코드를 제거하기 위해 집착해야 합니다.

## 1차원 배열의 stringify

```js
const a = [1, 'abc', true, undefined, null, (_) => 3, Symbol()];
const arrayStringify = (a) => {};
JSON.stringify(a) === arrayStringify(a);
```

### 기본 구성

```js
const stringCheck = [
  [/[\r\n\1]/g, '\\n'],
  [/"/g, '\\"'],
  [/\t/g, '\\t'],
];
const el = {
  number: (v) => v.toString(),
  boolean: (v) => v.toString(),
  string: (v) =>
    `"${stringCheck.reduce((acc, curr) => acc.replace(curr[0], curr[1]), v)}"`,
  stringify(v) {
    return this[typeof v]?.(v) ?? 'null';
  },
};
const recursive = (arr, acc, i) =>
  i < arr.length
    ? recursive(arr, acc + `,${el.stringify(arr[i])}`, i + 1)
    : `[${acc.substr(1)}]`;

const stringify = (arr) => {
  if (!Array.isArray(arr)) throw 'invalid arr';
  return arr.length === 0 ? '[]' : recursive(arr, '', 0);
};

stringify([1, 'a', 3]);
```

### 기계적인 번역

```js
const stringCheck = [
  [/[\r\n\1]/g, '\\n'],
  [/"/g, '\\"'],
  [/\t/g, '\\t'],
];
const el = {
  number: (v) => v.toString(),
  boolean: (v) => v.toString(),
  string: (v) =>
    `"${stringCheck.reduce((acc, curr) => acc.replace(curr[0], curr[1]), v)}"`,
  stringify(v) {
    return this[typeof v]?.(v) ?? 'null';
  },
};

const EMPTY = {};

const stringify = (arr) => {
  if (!Array.isArray(arr)) throw 'invalid arr';

  let result = EMPTY;
  if (arr.length === 0) result = '[]';
  else {
    let acc = '';
    let i = 0;
    while (i < arr.length) {
      acc = acc + `,${el.stringify(arr[i])}`;
      i = i + 1;
    }
    result = `[${acc.substr(1)}]`;
  }
  if (result === EMPTY) throw 'no processed';

  return result;
};

stringify([1, 'a', 3]);
```

### 역할 분리

```js
const stringCheck = [
  [/[\r\n\1]/g, '\\n'],
  [/"/g, '\\"'],
  [/\t/g, '\\t'],
];
const el = {
  number: (v) => v.toString(),
  boolean: (v) => v.toString(),
  string: (v) =>
    `"${stringCheck.reduce((acc, curr) => acc.replace(curr[0], curr[1]), v)}"`,
  stringify(v) {
    return this[typeof v]?.(v) ?? 'null';
  },
};

const arrValidate = (arr) => {
  if (!Array.isArray(arr)) throw 'invalid arr';
};
const EMPTY = {};

const stringify = (arr) => {
  arrValidate(arr);
  let result = EMPTY;
  if (arr.length === 0) result = '[]';
  else {
    let acc = '';
    let i = 0;
    while (i < arr.length) {
      acc = acc + `,${el.stringify(arr[i])}`;
      i = i + 1;
    }
    result = `[${acc.substr(1)}]`;
  }
  if (result === EMPTY) throw 'no processed';

  return result;
};

stringify([1, 'a', 3]);
```

#### OCP

- 수정에는 닫혀있고, 확장에는 열려 있습니다.
- OCP의 기준은 모듈, 코드, 패키지 수준에 따라 다릅니다.
- 코드 레벨에서 수정은 코드 수정이고 확장은 케이스(switch의 병렬조건) 확장입니다.
  - switch문을 쓰지 않습니다. 혹은 오늘은 if else일줄 알았는데 내일이 오니 3개의 케이스였습니다.
  - el.stringify를 switch를 사용했다면 코드를 수정해야만 case를 확장 할 수 있지만 `this.[typeof v]?.(v)`를 사용함으로써 대상 코드 수정을 하지 않고 확장 할 수 있습니다.
  - 라우터와 라우팅 테이블을 만들어서 OCP를 지킬 수 있습니다.

```js
// 데이터와 라우터는 같이 있어야 합니다. OCP도 준수하게 됩니다.
const stringCheck = {
  table: [
    [/[\r\n\1]/g, '\\n'],
    [/"/g, '\\"'],
    [/\t/g, '\\t'],
  ],
  convertRouter(v) {
    return this.table.reduce((acc, curr) => acc.replace(curr[0], curr[1]), v);
  },
};

// OCP를 준수하고 있습니다.
const el = {
  // 라우터보다 상대적으로 자주 바뀝니다.
  table: {
    number: (v) => v.toString(),
    boolean: (v) => v.toString(),
    string: (v) => `"${stringCheck.convertRouter(v)}"`,
  },
  // 테이블보다 상대적으로 덜 바뀝니다.
  // 테이블이 확장되는 동안 라우터는 수정하지 않아도 됩니다.
  // 라우터를 수정해야하면, OCP가 깨진다? 테이블까지 전면 검토해야 합니다.
  // 라우터의 로직에 맞춰 라우터 테이블이 존재하므로 라우터를 수정하면 테이블을 반드시 다 검토해야 합니다. === 트랜젝션
  stringifyRouter(v) {
    return this.table[typeof v]?.(v) ?? 'null';
    // switch문으로 작성할 경우 코드를 건드리면 모든 인수 테스트를 진행해야 합니다.
    // switch (typeof v) {
    //   case 'number':
    //     v = v.toString();
    //   case 'boolean':
    //     v = v.toString();
    //   case 'string':
    //     v = `"${stringCheck.convert(v)}"`;
    //   default:
    //     v = 'null';
    // }
    // return v;
  },
};

const arrValidate = (arr) => {
  if (!Array.isArray(arr)) throw 'invalid arr';
};

const err = (v) => {
  throw v;
};

// 라우팅 테이블을 만들어 OCP를 지키게 합니다.
const resultProcess = {
  table: {
    true: (arr) => '[]',
    false: (arr) => {
      let acc = '';
      let i = 0;
      while (i < arr.length) {
        acc = acc + `,${el.stringifyRouter(arr[i])}`;
        i = i + 1;
      }
      return `[${acc.substr(1)}]`;
    },
  },
  processRouter(arr) {
    return this.table[arr.length === 0](arr) ?? err('no case');
  },
};

const stringify = (arr) => {
  arrValidate(arr);
  return resultProcess.processRouter(arr);
};

stringify([1, 'a', 3]);
```

- OCP는 커맨드 패턴으로 작성됩니다. 커맨드 패턴은 제어`문을 커맨드 객체로 식`으로 만듭니다.
- 이론상으로 모든 if는 제거가 가능합니다.
  - 도메인 자체의 if는 제거되지 않습니다. 라우터에 존재합니다. 라우팅테이블은 OCP를 준수할 수 있지만 라우터는 OCP를 준수 할 수 없습니다.
- 모든 케이스는 반드시 라우터와 라우팅 테이블로 대체할 수 있습니다. 라우터는 제어를 가지게 됩니다(invasion of Control, 제어역전). 다만 변화율이 라우팅테이블보다 낮습니다. 역할 모델은 변화율로 구분합니다.
  - 제어센터(control center) = 라우터는 제어센터
  - 제어를 중복해서 사용하지 않기 위해서 함수를 만들어 사용합니다.
- 라우터는 반드시 mandatory여야 합니다.

1. 정당한 if는 절대로 사라지지 않습니다.
2. if의 단계별 구성요소를 분서갷서, 변화율에 따라 OCP를 준수할 수 있는 라우터와 라우팅테이블로 번역합니다. 유지보수가 변화율에 따라 OCP 준수해서 관리성이 좋아집니다.

- 코드를 작성할때 설계 또는 디자인이란 유지보수, 기능 추가 등에 유리하도록(변화율이 동일한 코드끼리 묶어서 ocp를 이루도록) (함수, 클래스, 객체 등의 구조물을 이용해서 )`코드를 재배치` 하는 것입니다.

### 귀납적 사고를 통해 이전 결과를 이용해서 어떻게 현재 값이 나왔는지 파악합니다.

1. `어떤걸 반복`해서 만들어진 것인지 파악합니다.
2. 각 반복은 `이전 결과`에 무엇을 해서 얻어진 것인지 파악합니다.
3. 꼬리재귀를 이용하여 문제를 해결합니다.
4. 기계적으로 루프로 변환합니다.

- 현상을 보고 연역적으로 일반화된 원리를 찾습니다.
- 연역적 사고 === 추론 === 패턴 발견 === 아이큐 === 프로그래밍 가능

## day4

### 1차안

- 일반화는 모든 경우의 수를 처리하는 알고리즘입니다.

```js
const recursive = (arr, acc, i, stack) => {
  if (Array.isArray(arr[i])) {
    stack.push([arr, i]);
    return recursive(arr[i], acc + '[', 0, stack);
  } else {
    if (i < arr.length) {
      return recursive(arr, acc + arr[i] + ',', i + 1, stack);
    } else {
      if (stack.length) {
        const [prevArr, prevIndex] = stack.pop();
        return recursive(prevArr, acc.substr(-1)) + '],', prevIndex + 1, stack;
      } else {
        return acc.substr(-1) + ']';
      }
    }
  }
};
const stringify = (arr) => recursive(arr, '[', 0, []);
```

### 2안

```js
const recursive = (arr, acc, i, stack) => {
  // 원소판정보다 인덱스 판정을 먼저 해야합니다.
  if (i < arr.length) {
    // 원소 처리를 시작합니다.
    const currEl = arr[i];
    if (Array.isArray(currEl)) {
      // 응집력을 높입니다.
      stack.push([arr, i + 1]);
      return recursive(currEl, acc + '[', 0, stack);
    } else {
      return recursive(arr, acc + toString(arr[i]) + ',', i + 1, stack);
    }
  } else {
    // 그만합니다.
    const prev = stack.pop();
    if (prev) {
      const [prevArr, prevIndex] = prev;
      // stack에 push 할때 index를 더해 주었기 때문에 이 부분에서 더할 필요가 없습니다.
      return recursive(prevArr, acc.substr(-1)) + '],', prevIndex, stack;
    } else {
      return acc.substr(-1) + ']';
    }
  }
};
const stringify = (arr) => recursive(arr, '[', 0, []);
```

### 완성된 코드

```js
// 유지 보수를 위한 분리
const arrToString = (acc) => {
  let accStr = '';
  // 원소를 결합하는 로직이 한번만 나옵니다.
  for (const v of acc) accStr += ',' + v;
  // 문자열을 결합하는 로직이 한번만 나옵니다.
  return '[' + accStr.substr(1) + ']';
};
const elementToString = (v) => '' + v;
const recursive = (arr, acc, i, stack) => {
  if (i < arr.length) {
    // 각 원소를 문자열로 환원하여 다른 배열에 담아둡니다.
    const currEl = arr[i];
    // 원소가 배열인 경우는 스택을 이용해서 일반화된 재귀가 모두 해결하게(스택머신을 이용해) 그 경우를 다 끼워넣습니다.
    if (Array.isArray(currEl)) {
      stack.push([arr, acc, i + 1]);
      return recursive(currEl, [], 0, stack);
    } else {
      // 개별 원소를 문자열 처리하는 곳
      acc.push(elementToString(arr[i]));
      return recursive(arr, acc, i + 1, stack);
    }
  } else {
    // 원소별 문자열로 환원된 배열을 이용해서 통합 문자열을 만듭니다.
    let accStr = arrToString(acc);
    const prev = stack.pop();
    if (prev) {
      const [prevArr, prevAcc, prevIndex] = prev;
      prevAcc.push(accStr);
      return recursive(prevArr, prevAcc, prevIndex, stack);
    } else {
      return accStr;
    }
  }
};
const stringify = (arr) => recursive(arr, [], 0, []);
stringify([1, 2, [3, 4], 5, [6, [7, [8]]]]);
```

1. 변수의 라이프사이클은 코드의 형태와 일치하는 것은 아닙니다.
2. 설계에 일치합니다.
3. 원하는 의도에 맞게 변수를 설정합니다.

### 추가적 if 제거

```js
const arrToString = (acc) => {
  let accStr = '';
  for (const v of acc) accStr += ',' + v;
  return '[' + accStr.substr(1) + ']';
};
const table = {
  // 전략패턴
  array: (v, arr, acc, i, stack) => {
    // 전략객체1
    stack.push([arr, acc, i + 1]);
    return [arr[i], [], 0];
  },
  number: (v, arr, acc, i, stack) => {
    // 전략객체2
    acc.push('' + v);
    return [arr, acc, i + 1];
  },
};
const elementToString = (v, arr, acc, i, stack) =>
  table[typeof v](v, arr, acc, i, stack);
const recursive = (arr, acc, i, stack) => {
  if (i < arr.length) {
    const currEl = arr[i];
    const [resultArr, resultAcc, resultIndex] = elementToString(
      currEl,
      arr,
      acc,
      i,
      stack,
    );
    return recursive(resultArr, resultAcc, resultIndex, stack);
  } else {
    let accStr = arrToString(acc);
    const prev = stack.pop();
    if (prev) {
      const [prevArr, prevAcc, prevIndex] = prev;
      prevAcc.push(accStr);
      return recursive(prevArr, prevAcc, prevIndex, stack);
    } else {
      return accStr;
    }
  }
};
const stringify = (arr) => recursive(arr, [], 0, []);
stringify([1, 2, [3, 4], 5, [6, [7, [8]]]]);
```

- if를 제거하는 방법
  - 선행해서 모든 전략객체가 같은 인터페이스(인자의 모양관 반환값의 모양)를 갖도록 조정합니다.
  - 원래 분기해야할 경우의 수만큼 전략 객체를 만들고 기준 상태를 판정하여 적합한 전략객체를 매핑(라우터)합니다.
- if를 제거하는 이유
  - OCP를 준수하기 위해
  - IOC : 제어를 역전하기 위해서
  - 복잡성 정복 : 격리를 통해 한번에 다룰 복잡성을 줄입니다. 결합도가 낮은 독립적인 모듈로 만들어서 정복합니다.
- 문을 식(함수값, 전략객체, 커맨드객체)으로 변경합니다. 원래 제어문이었던 것을 함수라는 그르셍 담아 값으로 변경한 뒤 원하는 함수값을 필요시마다 선택해서 사용합니다. 장점은 문은 코드 작성시 확정되므로 변경하려면 코드를 변경하고 확인해야하나, 함수화된 값은 코드 실행시 원하는 함수를 선택할 수 있으므로 필요한 코드를 대입할때 사용하는 측의 코드는 변경할 필요가 없습니다.(OCP 원리)
- 함수의 본질은 문을 담아 식으로 사용할 수 있는 그릇입니다.
- 문을 식으로 만들면 1. 반복적으로 그 제어문을 사용할 수 있고 2. 일반화만 시키면 인자에 따라 여러 문제를 하나의 로직으로 해결할 수 있고 3. 필요할때까지 실행을 안 시킬 수 있고 4. 여러개를 만들어 필요시마다 다른 제어문을 사용할 수 있습니다.

### stack 제거

```js
const arrToString = (acc) => {
  let accStr = '';
  for (const v of acc) accStr += ',' + v;
  return '[' + accStr.substr(1) + ']';
};

const elementToString = (v) => '' + v;
const recursive = (arr, acc, i, prev) => {
  if (i < arr.length) {
    const currEl = arr[i];
    if (Array.isArray(currEl)) {
      return recursive(currEl, [], 0, [arr, acc, i + 1, prev]);
    } else {
      // 개별 원소를 문자열 처리하는 곳
      acc.push(elementToString(arr[i]));
      return recursive(arr, acc, i + 1, prev);
    }
  } else {
    let accStr = arrToString(acc);
    if (prev) {
      const [prevArr, prevAcc, prevIndex, prevPrev] = prev;
      prevAcc.push(accStr);
      return recursive(prevArr, prevAcc, prevIndex, prevPrev);
    } else {
      return accStr;
    }
  }
};
const stringify = (arr) => recursive(arr, [], 0, null);
stringify([1, 2, [3, 4], 5, [6, [7, [8]]]]);
```

### acc 배열제거

```js
const arrToString = (finalNode) => {
  let accStr = '';
  let curr = finalNode;
  const arr = [];
  do {
    arr.unshift(curr.value);
  } while ((curr = curr.prev));
  for (const v of arr) accStr += ',' + v;
  return '[' + accStr.substr(1) + ']';
};

const elementToString = (v) => '' + v;
const recursive = (arr, acc, i, prev) => {
  if (i < arr.length) {
    const currEl = arr[i];
    if (Array.isArray(currEl)) {
      return recursive(currEl, null, 0, [arr, acc, i + 1, prev]);
    } else {
      // 개별 원소를 문자열 처리하는 곳
      return recursive(
        arr,
        { prev: acc, value: elementToString(arr[i]) },
        i + 1,
        prev,
      );
    }
  } else {
    let accStr = arrToString(acc);
    if (prev) {
      const [prevArr, prevAcc, prevIndex, prevPrev] = prev;
      return recursive(
        prevArr,
        { prev: prevAcc, value: accStr },
        prevIndex,
        prevPrev,
      );
    } else {
      return accStr;
    }
  }
};
const stringify = (arr) => recursive(arr, null, 0, null);
stringify([1, 2, [3, 4], 5, [6, [7, [8]]]]);
```

### while로 바꾸기

```js
const arrToString = (finalNode) => {
  let accStr = '';
  let curr = finalNode;
  const arr = [];
  do {
    arr.unshift(curr.value);
  } while ((curr = curr.prev));
  for (const v of arr) accStr += ',' + v;
  return '[' + accStr.substr(1) + ']';
};

const elementToString = (v) => '' + v;
const whileLoop = (array) => {
  let arr = array;
  let acc = null;
  let i = 0;
  let prev = null;
  while (true) {
    if (i < arr.length) {
      const currEl = arr[i];
      if (Array.isArray(currEl)) {
        prev = [arr, acc, i + 1, prev];
        arr = arr[i];
        acc = null;
        i = 0;
      } else {
        arr = arr;
        prev = prev;
        acc = { prev: acc, value: elementToString(arr[i]) };
        i = i + 1;
      }
    } else {
      let accStr = arrToString(acc);
      if (prev) {
        const [prevArr, prevAcc, prevIndex, prevPrev] = prev;
        arr = prevArr;
        prev = prevPrev;
        acc = { prev: prevAcc, value: accStr };
        i = prevIndex;
      } else {
        return accStr;
      }
    }
  }
};
whileLoop([1, 2, [3, 4], 5, [6, [7, [8]]]]);
```

- 컬렉션의 책임은 단일 값보다 큽니다.
- 반드시 필요한 경우가 아니면 컬렉션을 사용하지 않습니다.

```js
// 1.
parent.children = [child, child];

// 2.
child1.parent = p1;
child2.parent = p1;
```

- 2번이 더 좋은 구조입니다. 1번이 책임이 더 무겁기 때문입니다.

## day5

### 제네레이터에 대해 알아보기

```js
const objectEntries = function* (obj) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      yield [k, obj[k]];
    }
  }
};
const test = objectEntries({ a: 3, b: 5 });
const call0 = test.next();
const call1 = test.next();
const call2 = test.next();
console.log(call0, call1, call2);

const test2 = objectEntries({ a: 3, b: 5 });
const [...a] = test2;
console.log(a);

const test3 = objectEntries({ a: 3, b: 5 });
for (const [k, v] of test3) {
  console.log(k, v);
}

const test4 = objectEntries({ a: 3, b: 5 });
const action = (...a) => console.log(a);
action(...test4);

const [...b] = [1, 2, 3][Symbol.iterator]();
console.log(b);
```

### 반복횟수 줄이기

- 2pass strategy or pipe
- 최초 루프 때 정리만하고 2번째에 한가지 로직으로 일괄처리합니다.

```js
// 아래 함수는 총 11회 수행됩니다. 이를 7회 수행만으로 해결해야합니다.
[1, 2, 3, 4, 5, 6, 7].filter((it) => it % 2).map((it) => it * 2);
```

### day5 진행

```js
// const stringify = (obj) => recursive(Object.entries(obj), '', 0);
const objectEntries = function* (obj) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      yield [k, obj[k]];
    }
  }
};
const toString = (v) => '' + v;
const join = (acc) => {
  if (!acc) {
    return '{}';
  } else {
    let result = '';
    do {
      result = `,"${target.k}":${toString(target.v)}`;
    } while ((target = result.prev));
    return '{' + result.substr(1) + '}';
  }
};
const recursive = (iter, acc) => {
  const { done, value: [k, v] = [] } = [];
  return done ? join(acc) : recursive(iter, { prev: acc, k, v });
};
const stringify = (obj) => recursive(objectEntries(obj), null);
```

### 기계적인 번역

```js
const objectEntries = function* (obj) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      yield [k, obj[k]];
    }
  }
};
const toString = (v) => '' + v;
const join = (acc) => {
  if (!acc) {
    return '{}';
  } else {
    let result = '';
    do {
      result = `,"${target.k}":${toString(target.v)}`;
    } while ((target = result.prev));
    return '{' + result.substr(1) + '}';
  }
};

const stringify = (obj) => {
  let acc = null;
  let iter = objectEntries(obj);
  while (true) {
    const { done, value: [k, v] = [] } = iter.next();
    if (done) return join(acc);
    else acc = { prev: acc, k, v };
  }
};
// 작성하다가 중단
```

### 배열과 객체 모두 있을 경우

```js
// 코루틴 : 값이 오브젝트인 경우 이터레이터로 변환하기
const objectEntries = function* (obj) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      yield [k, obj[k]];
    }
  }
};
// 쌓여있는 링크드리스트를 이용해 문자열로 종합하기
// 각 노드의 모양은
// {
//   prev: 이전 노드 링크,
//   isObject: 오브젝트의 값인지 배열값인지,
//   element: 문자열로 바꿀값(오브젝트인 경우는 [k, v]),
// },
const arrToString = (isObject, acc) => {
  // 여닫는 문자열 확정. 문자열은 우너래 이터레이터라서 분해가 됩니다.
  const [START, END] = isObject ? '{}' : '[]';
  if (acc.prev) {
    let curr = acc;
    let = result = '';
    do {
      result =
        ',' +
        (isObject
          ? `"${curr.value[0]}":${curr.value[1]}`
          : elementToString(curr.value)) +
        result;
      // 최초 시작시에도 acc는 있으므로 그 acc.prev가 없는지로 더 갈지 판단
    } while ((curr = curr.prev));
    result = result.substr(1);
  }
  return START + result + END;
};
// 하나의 값을 문자열로 바꾸기
const elementToString = (v) => '' + v;
const recursive = (iter, isObject, acc, prev) => {
  const { done, value } = iter.next();
  if (!done) {
    const v = isObject ? value[1] : value;
    switch (true) {
      case Array.isArray(v):
        return recursive(v[Symbol.iterator](), false, null, {
          target: iter,
          isObject,
          acc,
          k: isObject ? value[0] : '',
          prev,
        });
      case v && typeof v == 'object':
        return recursive(objectEntries(v), true, null, {
          target: iter,
          isObject,
          acc,
          k: isObject ? value[0] : '',
          prev,
        });
      default:
        return recursive(
          iter,
          isObject,
          {
            prev: acc,
            value,
          },
          prev,
        );
    }
  } else {
    let accStr = arrToString(isObject, acc);
    if (prev) {
      return recursive(
        prev.target,
        prev.isObject,
        { prev: prev.acc, value: prev.isObject ? [prev.k, accStr] : accStr },
        prev.prev,
      );
    } else {
      return accStr;
    }
  }
};
const stringify = (v) =>
  recursive(
    Array.isArray(v) ? v[Symbol.iterator]() : objectEntries(v),
    !Array.isArray(v),
    null,
    null,
  );
// stringify({ a: 3, b: 5, c: [1, 2, [3, 4, { a: 4, b: 5 }, 7], 3], d: 3 });
stringify({ a: [1, 2], b: 3 });
```

## day 6

### iterable

```js
const iterable = {
  [Symbol.iterator]() {
    const arr = [1, 2, 3, 4];
    let cursor = 0;
    return {
      next() {
        return {
          done: cursor >= arr.length,
          value: cursor < arr.length ? arr[cursor++] : undefined,
        };
      },
    };
  },
};

const iter1 = iterable[Symbol.iterator]();
const iter2 = iterable[Symbol.iterator]();

console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());

console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());

const arr = [...iterable];
console.log(arr);
```

### filter

```js
const filter = (iter, block) => ({
  next() {
    let { done, value } = iter.next();
    while (!done) {
      if (block(value)) return { done: false, value };
      ({ done, value } = iter.next());
    }
    return { done };
  },
});
```

### map

```js
const map = (iter, block) => ({
  next() {
    let { done, value } = iter.next();
    if (!done) return { done: false, value: block(value) };
    else return { done };
  },
});
```

### 코드 사용

```js
const filter = (iter, block) => ({
  next() {
    let { done, value } = iter.next();
    while (!done) {
      if (block(value)) return { done: false, value };
      ({ done, value } = iter.next());
    }
    return { done };
  },
});

const map = (iter, block) => ({
  next() {
    let { done, value } = iter.next();
    if (!done) return { done: false, value: block(value) };
    else return { done };
  },
});

const iter = (iter) => ({
  [Symbol.iterator]() {
    return iter;
  },
});
const f = [
  ...iter(
    map(
      filter([1, 2, 3, 4, 5][Symbol.iterator](), (v) => v % 2),
      (v) => v * 2,
    ),
  ),
];
```

### 중첩된 배열 문자열 파싱

- 전제 조건 : 왼쪽에서 오른쪽으로 파싱해야 합니다.

1. 대괄호 열기가 온다 => 새 배열을 만든다. 지금 배열은 스택으로 넣어버린다.
2. 대괄호 닫기가 온다 => 지금 배열을 종료하고, 스택을 이전으로 돌아간다.
3. 적합한 원소가 온다 => 원소는 컴마를 포함하거나 하지 않는다.(마지막 원소인 경우) => 현재 배열에 값을 추가한다.

```js
const rNum = /^\s*([0-9]+)\s*[,]?/;

const parser = (str, acc, stack) => {
  const v = str.trim();
  if (!v) return acc;
  switch (v[0]) {
    case '[':
      stack.push(acc);
      return parser(v.substr(1), [], stack);
    case ']':
      const prev = stack.pop();
      prev.push(acc);
      return parser(v.substr(1), prev, stack);
    default:
      const value = rNum.exec(v);
      if (!value) throw 'invalid value' + v;
      acc.push(parseFloat(value[1]));
      return parser(v.substr(value[0].length), acc, stack);
  }
};
parser('[1,2,3,[1,2,[3,4,]]]', [], []);
```

### 정규식

- 결합, 선택, 그룹으로 구성되어 있습니다.
- 정규식이 바라보는 문자 => 단일문자 1개 그룹진 문자를 하나의 문자로 본다. 문자의 위치도 문자다.
- 그룹은 괄호를 이용한다.
- 결합 연산자는 생략한다. 결합은 연속으로 나와야 한다.
- 선택연산자(|)는 결합 연산자보다 약하다.
- 그룹은 하나의 문자열로 인식 됩니다.
- 선택그룹연산자는 대괄호를 통해 표현한다.
  - (a|b|c|d) === [abcd]
- 정규식은 최대한 많이 일치시키려고 하지만 물음표(?)를 이용하면 최소한의 일치로 변경할 수 있다.

## day 7

```js
const valueTest = Symbol();
const valueConvert = Symbol();

class StringParser {
  #reg = /"([^"]|\\")+"/;
  [valueTest](v) {
    return this.#reg.test(v);
  }
  [valueConvert](v) {
    return this.#reg.exec(v)[1];
  }
}

class NumberParser {
  #reg = /[0-9]+/;
  [valueTest](v) {
    return this.#reg.test(v);
  }
  [valueConvert](v) {
    return this.#reg.exec(v)[1];
  }
}

class DateParser {
  // #reg = //
  [valueTest](v) {
    return this.#reg.test(v);
  }
  [valueConvert](v) {
    return new Date(this.#reg.exec(v)[1]);
  }
}

class Test {
  #a;
  #b;
  #c;

  constructor(a, b, c) {
    this.#a = a;
    this.#b = b;
    this.#c = c;
  }
  toJSON() {
    return new TestParser(this.#a, this.#b, this.#c);
  }
}

class TestParser {
  #reg = /"@Test\{([0-9]+),([0-9]+),([0-9]+)\}/;
  [valueTest](v) {
    return this.#reg.test(v);
  }
  [valueConvert](v) {
    const [, ...arg] = this.#reg.exec(v);
    return new Test(arg.map((it) => parseFloat(it)));
  }
  toJSON(a, b, c) {
    return `"@Test{${a},${b},${c}}"`;
  }
}

const router = {
  type: [
    new StringParser(),
    new NumberParser(),
    new DateParser(),
    new TestParser(1, 2, 3),
  ],
  router(v) {
    let result;
    if (
      this.type.some((converter) => {
        if (converter.test(v)) {
          result = converter.convert(v);
          return true;
        } else {
          return false;
        }
      })
    ) {
      return result;
    } else {
      throw 'invalid ValueType:' + v;
    }
  },
};
```

### -

```js
const rNum = /^\s*([0-9]+)\s*[,]?/;
const rKey = /^\s*"((?:\\"|[^"])*)"\s*:\s*/;

const parse = (str, acc, k, stack) => {
  let v = str.trim();
  if (!v.length) return acc;
  switch (v[0]) {
    case '[':
    case '{':
      stack.push({ acc, k });
      return parse(v.substr(1), v[0] == '[' ? [] : {}, null, stack);
    case ']':
    case '}':
      if (!stack.length) throw 'invalid json' + v;
      const { acc: prev, k: key } = stack.pop();
      if (!prev) return acc;
      else {
        if (prev instanceof Array) prev.push(acc);
        else prev[key] = acc;
        v = v.substr(1).trim();
        if (v[0] == ',') {
          v = v.substr(1).trim();
          if (']}'.indexOf(v[0]) != -1) throw 'invalid json' + v;
        }
        return parse(v[0] == ',' ? v.substr(1) : v, prev, null, stack);
      }
    default:
      if (acc instanceof Array) {
        const value = rNum.exec(v);
        if (!value) throw 'invalid array value:' + v;
        acc.push(parseFloat(value[1]));
        return parse(v.substr(value[0].length), acc, null, stack);
      } else {
        if (k === null) {
          const key = rKey.exec(v);
          if (!key) throw 'invalid key:' + v;
          return parse(v.substr(key[0].length), acc, key[1], stack);
        } else {
          const value = rNum.exec(v);
          if (!value) throw 'invalid object value:' + v;
          acc[k] = parseFloat(value[1]);
          return parse(v.substr(value[0].length), acc, null, stack);
        }
      }
  }
};

parse(`{"a":[1,2,[3,4],5], "b":{"a":123,"b":456}})`, null, null, []);
```

### 정규식에 도메인 넣지 않을 수 있다.

```js
const rNum = /^\s*([0-9]+)\s*?/;
const rBool = /^\s*(true|false)\s*?/;
const strString = `\\s*"((?:\\\\"|[^"])*)"\\s*`;
const rKey = new RegExp(`^${strString}:\\s*`);
const rString = new RegExp(`^${strString}`);

const checkTrailingComma = (v) => {
  if (v[0] == ',') {
    v = v.substr(1).trim();
    if (']}'.indexOf(v[0]) != -1) throw 'invalid json' + v;
  }
  return v;
};
const parse = (str, acc, k, stack) => {
  const v = checkTrailingComma(str.trim());
  if (!v.length) return acc;
  switch (v[0]) {
    case '[':
    case '{':
      stack.push({ acc, k });
      return parse(v.substr(1), v[0] == '[' ? [] : {}, null, stack);
    case ']':
    case '}':
      if (!stack.length) throw 'invalid json' + v;
      if (acc instanceof Array && v[0] == '}') throw 'invalid';
      const { acc: prev, k: key } = stack.pop();
      if (!prev) return acc;
      else {
        if (prev instanceof Array) prev.push(acc);
        else prev[key] = acc;
        return parse(v.substr(1), prev, null, stack);
      }
    default:
      if (acc instanceof Array) {
        const value = rNum.exec(v);
        if (!value) throw 'invalid array value:' + v;
        acc.push(parseFloat(value[1]));
        return parse(v.substr(value[0].length), acc, null, stack);
      } else {
        if (k === null) {
          const key = rKey.exec(v);
          if (!key) throw 'invalid key:' + v;
          return parse(v.substr(key[0].length), acc, key[1], stack);
        } else {
          const value = rNum.exec(v);
          if (!value) throw 'invalid object value:' + v;
          acc[k] = parseFloat(value[1]);
          return parse(v.substr(value[0].length), acc, null, stack);
        }
      }
  }
};

parse(`{"a":[1,2,[3,4],5], "b":{"a":123,"b":456}})`, null, null, []);
```

### 정리

- 귀납적 사고방식에 따르면 현재의 특정 상태는 일반화된(표준화된) 알고리즘을 반복하면 얻을 수 있다라고 본다.
- 반복하는 전체 과정중 한단계만 잘라서 그 구조를 파악한다. 전체 과정을 전지적으로 파악하는 것은 어려움.
- 한단계 내에서 다양한 국면이 있는 것을 전부 찾아내서 mandatory로 로직을 작성한다.
- 일반화란 하나의 유일한 인생의 답을 찾는 것이 아니다.
- 발생 가능한 모든 경우의 수를 빈틈없이 처리한 것이 그 국면에서의 일반화 그 국면에 발생가능한 모든 경우의 수(패턴)을 발견할 머릭다 되나는 훈련을 통해 성장시킨다.
- 각 국면을 나누고 국면의 모든 경우의 수를 커버하는 일반화 알고리즘을 반복시킨다.

#### -

- 1단계 : 제어문, 함수 + 변수의 라이프사이클과 스코프
- 2단계 : 객체지향 구조물 + 함수형 구조물
- 3단계 : 동시성에 대한 이해
- 4단계 : 디자인과 레이어구조의 대한 이해
- 5단계 : 시스템셀계

---

## 참고

- [코드스피츠89 - Programming 101](https://www.youtube.com/watch?v=0lAsf19iE2g)
