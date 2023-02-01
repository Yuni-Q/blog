---
title: 03장 Underscore.js를 직접 만들며 함수형 자바스크립트의 뼈대 익히기
date: 2023-01-26 22:01:93
category: 함수형 자바스크립트 프로그래밍
tags: []
draft: true
---

## 3.1 Underscore.js 소개

### 3.1.1 Underscore.js 간단히 써보기

- Underscore.js는 새로운 값을 리턴한다.
- Underscore.js의 함수들은 메서드가 아닌 `함수`다. 함수는 이미 모두 선언되어 있고 실행하고 싶을 때 실행하면 된다.
- 주로 첫 번째 인자가 주요 재료가 되며 두 번째 인자나 세번 째 인갖와 함께 사용하여 결과를 만든다.
- 객체의 메서드가 아니므로 하나의 함수가 여러 개의 type을 지원할 수 있다. 이로인해 다형성이 매우 높다.
  - 바깥의 다형성은 고차 함수가 지원하고, 안쪽 값의 다형성은 predicate와 같은 보조 함수를 통해 지원한다.
  - 메서드가 아닌 함수이기에 아무 값이나 받을 수 있으며, 함수를 통해 추상화했기에 아무 값이나 들어 있어도 된다.

#### 함수들

- `_.each`는 자신이 받았던 첫 번째 인자를 그대로 리턴한다.
  - Array.prototype.forEach는 undefined를 리턴한다.
- `_.each`는 ArrayLike 객체도 사용 가능하다.
- `_.reject`는 filter와 비슷하다.
- `_.contains`는 includes와 비슷하다.
- `_.isArray`는 Array.isArray와 같다.
- `_.pluck`는 key/value 쌍의 객체일 때 두 번째 인자로 넘긴 key 값에 해당하는 value를 리턴한다.
- `_.first`와 `_.last`는 함수로 만들어 두면 조합성이 생겨 실행 시점에 다룰 수 있는 이점을 가지기 위해 존재한다. 두 번째 인자로 몇 개를 남길 것인지 정할 수 있다.
- `_.rest`는 앞쪽의 갚을 제외한 새로운 리스트를 리턴한다. 두 번째 인자는 몇 개를 제외할지에 대한 옵션이다.
- `_.lastIndexOf`는 뒤에서부터 동일한 값을 찾아 index를 리턴한다. 뒤에서부터 센다.
- `_.flatten`은 깊이를 가진 배열을 펴 주는 함수다.
- `_.value`는 객체의 값을 `\_.keys`는 객체의 키를 리턴한다.
  - prototype에 붙은 key와 value는 제외한다.
- `_.extend`는 왼쪽 객체에 오른쪽 객체를 덮어 씌운다.
- `_.pick`는 두 번째부터의 인자의 key만 남기고 `_.omit`은 반대로 제거한다.
- `_.negate`는 원래 함수의 결과를 반대로 바꾸는 함수를 리턴한다.
  - `받아 둔 함수를 실행하여 나온 결과를 반대로 바꾸는 함수`를 리턴한다.
- `_.noop`은 인자를 무엇으로 받든 항상 undefined만 리턴하는 함수다.
- `_.chain`을 사용하면 값을 바꿔 나갈 객체가 생성되고 함수들을 체인 방식으로 계속 실행할 수 있다.
  - `.value()`를 통해 최종 값을 얻어낸다.

### 3.1.2 Underscore.js vs Lodash

- Lodash의 성능 개선 상황
- Lodash는 `지연 평가`라는 함수형 용어를 사용하지만 사실 체인 방식을 옹한 Lodash의 지연 평가는 그다지 `함수형 프로그래밍`적이지 않고 성능면에서 이득을 얻기도 힘들다.

### 3.1.3. 지연 평가 1 (take)

#### take를 통한 지연 평가

- 200개이상일때만 동작한다. 200개 이하일 경우 오히려 불리하다.
- 체인 방식에서만 가능하다.
- 두 가지 함수가 해야 할 일을 하나의 함수에 합성해 두어서 최적화 평가를 해도 된다.
- if로 분기하는 것보다 밖에서 함수로 고르는 것을 선호한다.

### 3.1.4 지연 평가 2(map->map->map)

#### map->map->map과 같은 상황에서의 지연 평가(laze evaluation)

- map을 3번 쓰면 3배이상의 성능차이가 나지만 3개의 함수를 연속적으로 실행해주면 된다. 굳이 map을 쓸 필요가 없다.

### 3.1.5 지연 실행(deferred execution)

- Underscore의 체인 객체는 메서드를 실행하는 즉시 내부의 값을 변경한다.
  - 미리 일정 부분까지 최대한 실행을 해서 나중에 싱행 될 때 빠르게 실행되게 함.
- Lodash의 체인 객체는 최종적으로 .value() 등을 실행할 때까지느 체인에 쌓인 함수를 실행하지 않는다.
  - 최대한 실행을 미뤄 초기 로딩속도를 개선
- `동작 방식의 차이`가 두 라이브러리 중에 무엇이 더 나은지에 대한 판단 근거가 될 수는 없다.

### 3.1.6 함수형 프로그래밍 관점에서의 each

- Underscore.js의 each는 중간에 루프를 멈출 수 없고, Lodash의 each는 중간에 루프를 멈출 수 있다.
  - Lodash의 each는 의도치 않게 멈출 수 있다.
  - Underscore.js는 중간에 break가 필요하다면 \_.every를 쓰면 된다. 외에도 some, find를 상황에 맞게 써도 된다.

#### 함수형 프로그래밍 관점

- 함수형 프로그래밍에서는 함수를, 값을 리턴 받기 위한 유틸로만 보거나 중복을 제거하기 위한 방법만으로 보지 않는다. for나 if 등의 로직을 대신하는 고차 함수를 만들고 특정 부분을 iteratee나 predicate으로 로직을 완성하는 식으로 코딩을 해 나간다.
- 함수형 프로그래밍에서 함수를 선택한다는 것은 로직을 선택한다는 의미도 포함한다.

##### 결과에만 집중한 해석

- each: for를 대체
- map: iteratee가 리턴한 값들의 배열 리턴
- find: 값 찾기
- findIndex: index 찾기
- some: || 대체
- every: && 대체

##### 함수형 프로그래밍적 해석

- each: 무조건 끝까지 돌면서 내부를 들여다 보기만 하는 함수
- map: 무조건 끝까지 돌면서 내부를 들여다 본 후 새로운 배열을 만드는 함수
- find: 돌다가 특정 조건으로 찾은 값을 리턴하면서 루프를 나가는 함수
- findIndex: 돌다가 특정 조건을 만족하는 순서의 index를 리턴하면서 루프를 나가는 함수
- some: 돌다가 긍정적인 값을 만나면 true를 리턴하면서 루프를 나가는 함수
- every: 돌다가 부정적인 값을 만나면 false를 리턴하고, 모두 trueㅇㄹ 경우는 루프를 모두 채운 후 true를 리턴하는 함수
- 함수형 프로그래밍에서는 조사 방법, 리턴값, 루프를 나갈 수 있는지 없는지 작은 차이도 매우 중요하다. 함수들의 조합으로 로직을 만들기 때문이다.

### 3.1.7 지원 환경, 용량 추가 기능 비교

### 3.1.8 Underscore.js와 Lodash 비교 정리

1. 지연 평가, 지연 실행, 성능이 Underscore.js 대신 Lodash를 써야 하는 특별한 이유는 아디ㅏ.
2. 'Lodash가 훨씬 빠르고 강력하다'라고 단정지어 말할 수는 없다.
3. Underscore.js만이 가진 특별한 기능은 없지만 대부분의 콘센트는 Underscore.js가 제시했거나 자바스크립트에서 가져왔다.
4. Lodash는 for 대신 while(i--)을 사용한 최적화와 적절한 기능 축소, 함수별로 반복문을 직접 사용하는 것 등으로부터 얻은 성능적 이점이 있다.
5. Lodash를 사용하면서 지연 평가의 이득을 보려면 반드시 _.chain을 사용해야 한다. 만일 체인 방식을 사용하지 않거나 200개 이상의 배열을 사용하지 않거나 take를 사용하지 않는다면 지연 평가를 통한 성능적 이점은 없다. Lodash에서는 _.chain == \_다.
6. 최신 환경에 대한 지원과 지속적인 업데이트면에서는 Lodash가 낫다.

### 3.1.9 Underscore.js를 만드는 이유

- 함수형 자바스크립트에 대한 많은 아이디어들을 확인할 수 있다.

## 3.2 _.map과 _.each 구혀하기

### 3.2.1 ArrayLike와 Underscore.js의 콘셉트

- _.map과 _.each 등에서 사용하는 객체는 {}, [], arguments, ArrayLike다.
- Underscore.js를 보면, 그동안 얼마나 지레 겁먹고 에러 처리를 했었는지 혹은 필요 없느 if문을 추가했었는지 생각하게 되었다. Underscore.js처럼 데이터가 흘러갈 때의 상황까지 보지는 못했기에 type을 체크하는 것에 급급했던 것이다.

### 3.2.2 \_.map 만들기

```js
var _ = {};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
function getLength(list) {
  return list == null ? void 0 : list.length; // void 0의 결과는 undefined
}
var isArrayLike = function (list) {
  var length = getLength(list);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

_.map = function (data, iteratee) {
  var new_list = [];
  if (isArrayLike(data)) {
    for (var i = 0, len = data.length; i < len; i++) {
      new_list.push(iteratee(data[i], i, data));
    }
  } else {
    for (var key in data) {
      if (data.hasOwnProperty(key))
        new_list.push(iteratee(data[key], key, data));
    }
  }
  return new_list;
};
```

### 3.2.3 쓸모 없어 보이는 함수 사용하기

```js
_.identity = function (v) {
  return v;
};
_.idtt = _.identity;
_.values = function (list) {
  return _.map(list, _.identity);
};
```

```js
_.args0 = _.identity;
_.args1 = function (a, b) {
  return b;
};
_.keys = function (list) {
  return _map(list, _.args1);
};
```

### 3.2.4 \_.each 만들기

```js
_.each = function (data, iteratee) {
  if (isArrayLike(data)) {
    for (var i = 0, len = data.length; i < len; i++) {
      iteratee(data[i], i, data);
    }
  } else {
    for (var key in data) {
      if (data.hasOwnProperty(key)) iteratee(data[key], key, data);
    }
  }
  return data;
};
```

### 3.2.5 함수로 함수 만들기, bloop

```js
function bloop(new_data, body) {
  return function (data, iteratee) {
    var result = new_data(data);
    if (isArrayLike(data)) {
      for (var i = 0, len = data.length; i < len; i++) {
        body(iteratee(data[i], i, data), result);
      }
    } else {
      for (var key in data) {
        if (data.hasOwnProperty(key))
          body(iteratee(data[key], key, data), result);
      }
    }
    return result;
  };
}

_.map = bloop(
  function () {
    return [];
  },
  function (val, obj) {
    return obj.push(val);
  },
);
_.each = bloop(
  function (v) {
    return v;
  },
  function (val, obj) {},
);
```

- bloop와 같이 함수를 추상 클래스처럼 만들 수도 있다. 객체지향의 상속과 비슷하게 추상 클래스를 만든 다음, 상속을 통해 클래스 두 개를 만든 것과 같다.
- bloop은 함수이고 bloop의 결과도 함수이므로 바로 실행하여 함수를 만들면서, 만들어진 함수를 즉시 실행할 수 있다.
- 함수형 프로그래밍은 함수의 응용을 중시한다. 일급 객체인 함수를 바로 정의하기도 하고 즉시 실행하기도 하며, 인자로 사용하기도 하고 남이 대신 실행해 주기도 하면서 로직을 만들어 가는 것이 함수형 프로그래밍이다. 함수형 프로그래밍에서는 아주 작은 함수들도 많이 사용한다.

```js
_.array = function () {
  return [];
};
_.push_to = function (val, obj) {
  obj.push(val);
  return val;
};
_.noop = function () {};

_.map = bloop(_.array, _.push_to);
_.each = bloop(_.identity, _.noop);
```

### 3.2.6 Object.keys

```js
_.isObject = function (obj) {
  var type = typeof obj;
  return (type === 'function' || type === 'object') && !!obj;
};
_.keys = function (data) {
  return _.isObject(data) ? Object.keys(data) : [];
};
```

### 3.2.7 bloop 개선하기

```js
function bloop(new_data, body) {
  return function (data, iteratee) {
    var result = new_data(data);
    if (isArrayLike(data)) {
      for (var i = 0, len = data.length; i < len; i++) {
        body(iteratee(data[i], i, data), result);
      }
    } else {
      for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
        if (data.hasOwnProperty(key))
          body(iteratee(data[keys[i]], keys[i], data), result);
      }
    }
    return result;
  };
}
```

### 3.2.8 중간 정리

- ArrayLike
  - 메서드 each보다 함수 each가 조합성과 다형성이 높아 훨씬 사용하기 편하다.
- 다형성
  - 다형성을 지원해야 자바스크립트에서 사용하는 주요 데이터들을 효과적으로 잘 다룰 수 있다.
- 함수의 조합을 통한 함수 구현
  - 고차 함수와 보조 함수를 조합하면서 함수들을 만들 수 있다. 작은 일을 하는 함수는 실용성이 꽤 높다.
- 함수만을 인자로 받는 함수
  - 객체지향의 상속과 같은 비슷한 함수적 아이디어도 있다.
- 리팩터링
  - 상태를 공유하지 않고 서로의 로직에도 관심을 갖지 않는다. 데이터가 어떻게 생겼는지도 관심을 갖지 않고 당므 핧 일을 함수에게 념겨주면서 앞으로만 간다.
- 객체지향 프로그래밍과 함수형 프로그래밍
  - 함수형 프로그래밍에서의 추상화 단위는 함수다. 함수형 프로그맹이에서의 협업 방법은 함수의 인자와 결과값이다.
  - 객체지향의 추상화의 단위는 클래스. 협업 방법은 참조나 이벤트 등을 통한 연결

## 3.3 _.filter, _.reject, _.find, _.some, \_.every 만들기

### 3.3.1 \_.filter 만들기

```js
_.filter = function (data, predicate) {
  var result = [];
  _.each(data, function (val, idx, data) {
    if (predicate(val, idx, data)) result.push(val);
  });
  return result;
};
```

### 3.3.2 bloop로 \_.filter 만들기

```js
function bloop(new_data, body) {
  // 보조 함수를 itr_predi로 변경
  return function (data, itr_predi) {
    var result = new_data(data);
    if (isArrayLike(data)) {
      for (var i = 0, len = data.length; i < len; i++) {
        // 인자에 원본 추가 data[i]
        body(itr_predi(data[i], i, data), result, data[i]);
      }
    } else {
      for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
        if (data.hasOwnProperty(key))
          // 인자에 원본 추가 data[keys[i]]
          body(itr_predi(data[keys[i]], keys[i], data), result, data[keys[i]]);
      }
    }
    return result;
  };
}

_.filter = bloop(_.array, function (bool, result, val) {
  if (bool) result.push(val);
});
```

### 3.3.3 _.rest, _.toArray, _.reverse, _.if

```js
_.toArray = function (list) {
  return Array, isArray(list) ? list : _values(list);
};

_.rest = function (list, num) {
  return _.toArray(list).slice(num || 1);
};

_.reverse = function (list) {
  return _.toArray(list).reverse();
};
```

#### \_.rester

```js
_.rester = function (func, num) {
  return function () {
    return func.apply(null, _.rest(arguments, num));
  };
};

function sum(a, b, c, d) {
  return (a || 0) + (b || 0) + (c || 0) + (d || 0);
}

_.rester(sum, 3)(1, 2, 3, 4); // 4
```

#### \_.if

```js
_.if = function (validator, func, alter) {
  return validator.apply(null, arguments)
    ? func.apply(null, arguments)
    : alter && alter.apply(null, arguments);
};

function sub(a, b) {
  return a - b;
}

var diff = _.if(
  function (a, b) {
    return a >= b;
  },
  sub,
  function (a, b) {
    return sub(b, a);
  },
);

_.safety = _.with_validator = _.if;
```
