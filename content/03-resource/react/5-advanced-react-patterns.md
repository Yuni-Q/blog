---
title: 5 Advanced React Patterns
date: 2021-05-26 08:05:10
category: react
tags: []
draft: true
---

## 고민해볼 요소들

- 어떻게 하면 재사용가능한 컴포넌트를 각각 다른 use case들에 맞도록 만들 수 있을까?
- 어떻게 하면 컴포넌트를 간단한 API로 쓰기 쉽게 만들 수 있을까?
- 어떻게 하면 UI와 기능성의 측면에서 확장 가능한 컴포넌트를 만들 수 있을까?

## [1. Compound Components Pattern](https://github.com/alex83130/advanced-react-patterns/tree/main/src/patterns/compound-component)

- Compound Components Pattern 패턴을 사용하면 불필요한 prop 드릴링 없이 표현적이고 선언적인 구성 요소를 만들 수 있습니다.
- 관심사 분리와 이해하기 쉬운 API로 분리 하여 구성 요소를 구성 하려면 Compound Components Pattern 패턴을 사용 하는 것이 좋습니다.

```tsx
import React from 'react';
import { Counter } from './Counter';

function Usage() {
  const handleChangeCounter = (count) => {
    console.log('count', count);
  };

  return (
    <Counter onChange={handleChangeCounter}>
      <Counter.Decrement icon="minus" />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon="plus" />
    </Counter>
  );
}

export { Usage };
```

### 장점

#### API 복잡성 감소이 감소합니다.

- 하나의 거대한 상위 컴포넌트에서 모든 props를 관리하지 않고 하위 UI 구성 요소 중 가장 적합한 컴포넌트에 직접 props를 연결합니다.

```tsx
// 하나의 거대한 상위 컴포넌트에서 모든 props를 관리하는 경우
return <Count label="label" max={10} iconDecrement="minus" iconIncrement="plus" onChange={handleChangeCounter}>
```

- 유연한 마크업 구조 : 구성 요소는 UI 유연성이 뛰어나 단일 구성 요소에서 다양한 케이스를 만들 수 있습니다. 예를 들어, 사용자는 하위 구성 요소의 순서를 변경하거나 표시되어야하는 항목을 정의 할 수 있습니다.
- 우려의 분리 : 대부분의 로직은 Counter component가 가집니다. 그런 다음 React.Context를 사용하여 자식간에 상태 및 핸들러를 공유합니다. 이로 인해 명확하게 책임을 분담할 수 있습니다.

### 단점

- 너무 많은 UI 유연성 : 유연성을 갖는 것은 예기치 않은 동작을 유발할 가능성이 있습니다. 원치 않는 구성 요소의 배치, 구성 요소의 자식 순서를 어긋나게 만들고 필수 자식 포함하지 않을 수 있습니다. 사용자가 구성 요소를 사용하기를 원하는 방식에 따라 유연성을 허용하는 범위가 매우 작을 수 있습니다.
- 무거운 JSX : 이 패턴을 적용하면 JSX 행의 수가 증가 할 수 있습니다.(EsLint 또는 Prettier 같은 포맷터를 쓸 경우는 더욱) 단일 구성 요소 규모에서는 큰 문제가 아니지만 큰 그림을 보면 확실히 큰 차이를 만들 수 있습니다.

### 점수

- Inversion of control: 1/4
- Implementation complexity: 1/4

### Public libraries using this pattern

- React Bootstrap
- Reach UI

## [2. Control Props Pattern](https://github.com/alex83130/advanced-react-patterns/tree/main/src/patterns/control-props)

- 이 패턴은 구성 요소를 제어 구성 요소로 변환합니다. 외부 상태는 사용자가 기본 구성 요소 동작을 수정하는 사용자 지정 논리를 삽입 할 수 있도록 "단일 정보 소스"로 사용됩니다.

```jsx
import React, { useState } from 'react';
import { Counter } from './Counter';

function Usage() {
  const [count, setCount] = useState(0);

  const handleChangeCounter = (newCount) => {
    setCount(newCount);
  };
  return (
    <Counter value={count} onChange={handleChangeCounter}>
      <Counter.Decrement icon={'minus'} />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon={'plus'} />
    </Counter>
  );
}

export { Usage };
```

### 장점

- 더 많은 제어 제공 : 기본 상태가 구성 요소 외부에 노출되므로 사용자가 이를 제어하므로 구성 요소에 직접 영향을 줄 수 있습니다.

### 단점

- 구현 복잡성 : 이전에는 단일 위치 (JSX)에서 한 번의 통합으로 구성 요소가 작동하도록했습니다. 이제 3개의 다른 위치 (JSX / useState / handleChange)에 분산됩니다.

### 점수

- Inversion of control: 2/4
- Implementation complexity: 1/4

### Public libraries using this pattern

- Material UI

## 3. [Custom Hook Pattern](https://github.com/alex83130/advanced-react-patterns/tree/main/src/patterns/custom-hooks)

- "제어 반전"에 대해 자세히 살펴 보겠습니다. 이제 기본 로직이 사용자 지정 후크로 전송됩니다. 이 후크는 사용자가 액세스 할 수 있으며 여러 내부 논리 (상태, 처리기)를 노출하여 구성 요소를 더 잘 제어 할 수 있도록합니다.

```jsx
import React from 'react';
import { Counter } from './Counter';
import { useCounter } from './useCounter';

function Usage() {
  const { count, handleIncrement, handleDecrement } = useCounter(0);
  const MAX_COUNT = 10;

  const handleClickIncrement = () => {
    //Put your custom logic
    if (count < MAX_COUNT) {
      handleIncrement();
    }
  };

  return (
    <>
      <Counter value={count}>
        <Counter.Decrement
          icon={'minus'}
          onClick={handleDecrement}
          disabled={count === 0}
        />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count />
        <Counter.Increment
          icon={'plus'}
          onClick={handleClickIncrement}
          disabled={count === MAX_COUNT}
        />
      </Counter>
      <button onClick={handleClickIncrement} disabled={count === MAX_COUNT}>
        Custom increment btn 1
      </button>
    </>
  );
}

export { Usage };
```

### 장점

- 더 많은 제어권 제공 : 사용자는 후크와 JSX 요소 사이에 자신의 논리를 삽입하여 기본 구성 요소 동작을 수정할 수 있습니다.

### 단점

- 구현 복잡성 : 로직 부분이 렌더링 부분과 분리되어 있기 때문에 둘 다 연결해야하는 사용자입니다. 구성 요소를 올바르게 구현하려면 구성 요소의 작동 방식을 잘 이해해야합니다.

### 점수

- Inversion of control: 2/4
- Implementation complexity: 2/4

### Public libraries using this pattern

- React table
- React hook form

## [4. Props Getters Pattern](https://github.com/alex83130/advanced-react-patterns/tree/main/src/patterns/props-getters)

- 사용자 정의 후크 패턴은 뛰어난 제어 기능을 제공하지만 사용자가 많은 기본 후크의 소품을 처리하고 논리를 다시 만들어야하므로 구성 요소를 통합하기가 더 어려워집니다. Props Getters Pattern 패턴은 이러한 복잡성을 감추려고 시도합니다. 네이티브 소품을 노출하는 대신 소품 게터 목록을 제공합니다. getter는 많은 props를 반환하는 함수로, 사용자가 자연스럽게 올바른 JSX 요소에 연결할 수 있도록 의미있는 이름을 가지고 있습니다.

```jsx
import React from 'react';
import { Counter } from './Counter';
import { useCounter } from './useCounter';

const MAX_COUNT = 10;

function Usage() {
  const { count, getCounterProps, getIncrementProps, getDecrementProps } =
    useCounter({
      initial: 0,
      max: MAX_COUNT,
    });

  const handleBtn1Clicked = () => {
    console.log('btn 1 clicked');
  };

  return (
    <>
      <Counter {...getCounterProps()}>
        <Counter.Decrement icon={'minus'} {...getDecrementProps()} />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count />
        <Counter.Increment icon={'plus'} {...getIncrementProps()} />
      </Counter>
      <button {...getIncrementProps({ onClick: handleBtn1Clicked })}>
        Custom increment btn 1
      </button>
      <button {...getIncrementProps({ disabled: count > MAX_COUNT - 2 })}>
        Custom increment btn 2
      </button>
    </>
  );
}

export { Usage };
```

### 장점

- 사용 용이성 : 구성 요소를 통합하는 쉬운 방법을 제공하고 복잡성은 숨겨져 있으며 사용자는 올바른 getter를 올바른 JSX 요소에 연결하기 만하면됩니다.
- 유연성 : 사용자는 여전히 자신의 특정 사례에 적응하기 위해 게터에 포함 된 소품을 과부하 할 가능성이 있습니다.

### 단점

- 가시성 부족 : 게터가 가져온 추상화로 인해 구성 요소를 더 쉽게 통합 할 수 있을뿐만 아니라 더 불투명하고 "매직" 같이 알 수 없게 합니다. 구성 요소를 올바르게 재정의하려면 사용자는 게터에 의해 노출 된 소품 목록과 그중 하나가 변경 될 경우 내부 논리에 미치는 영향을 알아야합니다.

### 점수

- Inversion of control: 3/4
- Integration complexity: 3/4

### Public libraries using this pattern

- React table
- Downshift

## [5. State reducer pattern](https://github.com/alex83130/advanced-react-patterns/tree/main/src/patterns/state-reducer)

- 제어 반전 측면에서 가장 발전된 패턴입니다. 사용자가 구성 요소가 내부적으로 작동하는 방식을 변경할 수있는 고급 방법을 제공합니다.
- 코드는 Custom Hook Pattern과 유사하지만 사용자가 후크에 전달되는 감속기를 정의합니다. 이 감속기는 구성 요소의 내부 작업에 과부하가 걸립니다.

```jsx
import React from 'react';
import { Counter } from './Counter';
import { useCounter } from './useCounter';

const MAX_COUNT = 10;
function Usage() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'decrement':
        return {
          count: Math.max(0, state.count - 2), //The decrement delta was changed for 2 (Default is 1)
        };
      default:
        return useCounter.reducer(state, action);
    }
  };

  const { count, handleDecrement, handleIncrement } = useCounter(
    { initial: 0, max: 10 },
    reducer,
  );

  return (
    <>
      <Counter value={count}>
        <Counter.Decrement icon={'minus'} onClick={handleDecrement} />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count />
        <Counter.Increment icon={'plus'} onClick={handleIncrement} />
      </Counter>
      <button onClick={handleIncrement} disabled={count === MAX_COUNT}>
        Custom increment btn 1
      </button>
    </>
  );
}

export { Usage };
```

- 이 예제에서 우리는 theState 리듀서 패턴과 커스텀 훅 패턴을 할당했지만, 이것을 Compound components pattern과 함께 사용할 수도 있고 리듀서를 메인 카운터 컴포넌트에 직접 전달할 수도 있습니다.

### 장점

- 더 많은 제어 제공 : 가장 복잡한 경우에는 상태 리듀서를 사용하는 것이 사용자에게 제어권을 맡기는 가장 좋은 방법입니다. 이제 모든 내부 구성 요소의 작업을 외부에서 액세스 할 수 있으며 재정의 할 수 있습니다.

### 단점

- 구현 복잡성 : 이 패턴은 확실히 여러분과 사용자 모두에게 구현하기 가장 복잡합니다.
- 가시성 부족 : 감속기의 동작은 변경 될 수 있으므로 구성 요소의 내부 논리를 잘 이해해야합니다.

### 점수

- Inversion of control: 4/4
- Integration complexity: 4/4

### Public libraries using this pattern

- Downshift

---

## 참고

- [5 Advanced React Patterns](https://javascript.plainenglish.io/5-advanced-react-patterns-a6b7624267a6)
- [유용한 리액트 패턴 5가지](https://velog.io/@dnr6054/%EC%9C%A0%EC%9A%A9%ED%95%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%8C%A8%ED%84%B4-5%EA%B0%80%EC%A7%80)
