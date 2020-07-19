---
title: React Hook
date: 2020-02-02 23:02:54
category: react
draft: true
---

## Hook가 React 버전 16.8에 새로 추가되었습니다.

- Hook를 이용하여 Class를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있습니다.
- 하지만 React에서 Class를 제거할 계획은 없습니다.
- Hook은 알고 있는 React 컨셉을 대체하지 않습니다. 대신에, Hook는 props, state, context, refs, 그리고 lifecycle와 같은 React 개념에 좀 더 직관적인 API를 제공합니다. 또한 Hook는 이 개념들을 엮기 위해 새로운 강력한 방법을 제공합니다.

### [기본 Hook](https://ko.reactjs.org/docs/hooks-reference.html#basic-hooks)

- [useState](https://ko.reactjs.org/docs/hooks-reference.html#usestate)
- [useEffect](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)
- [useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)

### [추가 Hooks](https://ko.reactjs.org/docs/hooks-reference.html#additional-hooks)

- [useReducer](https://ko.reactjs.org/docs/hooks-reference.html#usereducer)
- [useCallback](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)
- [useMemo](https://ko.reactjs.org/docs/hooks-reference.html#usememo)
- [useRef](https://ko.reactjs.org/docs/hooks-reference.html#useref)
- [useImperativeHandle](https://ko.reactjs.org/docs/hooks-reference.html#useimperativehandle)
- [useLayoutEffect](https://ko.reactjs.org/docs/hooks-reference.html#uselayouteffect)
- [useDebugValue](https://ko.reactjs.org/docs/hooks-reference.html#usedebugvalue)

## Hook을 개발하게 된 동기

### 컴포넌트 사이에서 상태와 관련된 로직을 재사용 하기 어렵습니다.

- 이것을 해결하기 위해 render props 그리고 고차 컴포넌트와 같은 패턴을 사용해야 합니다. 그러나 이런 패턴을 사용할 때 컴포넌트를 재구성해야 하며 코드를 추적하기 어렵게 만듭니다. 또한 “래퍼 지옥(wrapper hell)“을 볼 가능성이 높습니다.
  Hook를 사용하면 컴포넌트로부터 상태 관련 로직을 추상화할 수 있습니다. 이것은 독립적인 테스트와 재사용이 가능합니다. Hook는 계층 변화 없이 상태 관련 로직을 재사용할 수 있도록 도와줍니다.

### 복잡한 컴포넌트들은 이해하기 어렵습니다.

- 생명주기 메서드를 기반으로 쪼개는 데 초점을 맞추기 보다는, Hook를 통해 로직에 기반을 둔 작은 함수로 컴포넌트를 나눌 수 있습니다. 조금 더 예측 가능하도록 하기 위해 리듀서를 활용해 컴포넌트의 지역 상태 값을 관리하도록 할 수 있습니다.

### Class은 사람과 기계를 혼동시킵니다.

- Class가 코드의 재사용성과 코드 구성을 좀 더 어렵게 만들 뿐만 아니라, React를 배우는데 큰 진입장벽이 될 수 있습니다.
  Javascript에서 어떻게 this가 작동하는지 알아야만 했고, 대부분의 다른 언어와는 다르게 작동합니다. 이벤트 핸들러가 등록되는 방법을 기억해야만 합니다.
- 리액트측에서 최근 Prepack를 사용한 컴포넌트 folding에 대해서 실험해왔고, 긍정적인 결과를 보았습니다. 그러나, Class 컴포넌트가 이러한 최적화를 더 느린 경로로 되돌리는 의도하지 않은 패턴을 장려할 수 있다는 것을 발견했습니다. Class는 최근 사용되는 도구에도 많은 문제를 일으킵니다. 예를 들어 Class는 잘 축소되지 않고, 핫 리로딩을 깨지기 쉽고 신뢰할 수 없게 만듭니다. React 코드가 최적화 가능한 경로에서 유지될 가능성이 더 높은 API를 제공하고 싶어 합니다.
- 개념적으로 React 컴포넌트는 항상 함수에 더 가깝습니다. Hook는 React의 정신을 희생하지 않고 함수를 받아들입니다. Hook는 명령형 코드로 해결책을 찾을 수 있게 해주며 복잡한 함수형 또는 반응형 프로그래밍 기술을 배우도록 요구하지 않습니다.

## 점진적 적용 전략

- 결정적으로, Hook는 존재하는 코드와 함께 나란히 작동함으로써 점진적으로 적용할 수 있습니다.
- Hook로 이동을 서두를 필요는 없습니다.
- 이미 존재하며 복잡한 Class 컴포넌트들에 대한 “큰 리팩토링”을 피하기를 권장합니다. 우리의 경험을 토대로, 새롭고 중요하지 않은 컴포넌트들 안에서 Hook를 사용하는 것이 최고의 연습입니다. 그리고 모든 팀원이 Hook에 대해 안정감을 느끼는지 확인하는 게 좋습니다.
- 리액트 측은 현재 존재하고 있는 모든 Class 사례을 변경하고 싶지만, 미래에도 계속 Class 컴포넌트들을 지원할 예정입니다. 페이스북에서 수만 개의 Class 컴포넌트들을 작성했으며, 그들을 재작성할 계획이 전혀 없습니다. 대신에, 새로운 코드에서 기존 코드와 나란히 Hook를 사용할 계획입니다.

## Hook 사용 규칙

- 최상위(at the top level)에서만 Hook을 호출해야 합니다. 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행하지 마세요.
- React 함수 컴포넌트 내에서만 Hook을 호출해야 합니다. 일반 JavaScript 함수에서는 Hook을 호출해서는 안 됩니다. (Hook을 호출할 수 있는 곳이 딱 한 군데 더 있습니다. 바로 직접 작성한 custom Hook 내입니다.

## 나만의 Hook 만들기

- 개발을 하다 보면 가끔 상태 관련 로직을 컴포넌트 간에 재사용하고 싶은 경우가 생깁니다. 이 문제를 해결하기 위한 전통적인 방법이 두 가지 있었는데, higher-order components와 render props가 바로 그것입니다. Custom Hook은 이들 둘과는 달리 컴포넌트 트리에 새 컴포넌트를 추가하지 않고도 이것을 가능하게 해줍니다.
- Custom Hook은 기능이라기보다는 컨벤션(convention)에 가깝습니다. 이름이 ”use“로 시작하고, 안에서 다른 Hook을 호출한다면 그 함수를 custom Hook이라고 부를 수 있습니다. useSomething이라는 네이밍 컨벤션은 linter 플러그인이 Hook을 인식하고 버그를 찾을 수 있게 해줍니다.
- Custom Hook의 예제들을 볼 수 있는 GitHub이 있습니다.

## Component의 변화

### 기본

```javascript
import React, { Component } from 'react';

export default class test extends Component {
	constructor(props) {
		super(props);
		state = {
			count: 0,
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		count = this.state.count + 1;
		this.setState({ count });
	}

	render() {
		return (
			<div>
				<button onClick={this.onClick}>UP</button>
			</div>
		);
	}
}
```

### arrow function

```javascript
import React, { Component } from 'react';

export default class test extends Component {
	constructor(props) {
		super(props);
		state = {
			count: 0,
		};
	}

	onClick = () => {
		count = this.state.count + 1;
		this.setState({ count });
	};

	render() {
		return (
			<div>
				<button onClick={this.onClick}>UP</button>
			</div>
		);
	}
}
```

### Class Field

```javascript
import React, { Component } from 'react';

export default class test extends Component {
	state = {
		count: 0,
	};

	onClick = () => {
		count = this.state.count + 1;
		this.setState({ count });
	};

	render() {
		return (
			<div>
				<button onClick={this.onClick}>UP</button>
			</div>
		);
	}
}
```

### hooks

```javascript
import React, { useState } from 'react';

export default function test() {
	const [count, setCount] = useState(0);
	const onClick = () => {
		setCount(count + 1);
	};
	return (
		<div>
			<button onClick={onClick}>UP</button>
		</div>
	);
}
```

## 개인적인 Hook의 장점

- 코드가 간결해집니다.
- state를 사용하는 곳과 가까이 둘 수 있습니다.
- Container와 Presenter를 굳이 나누지 않아도 될 것 같습니다. 하지만 이 부분에 대해서는 아직 확신이 없습니다.
- class를 사용할 경우 class 문법 자체의 어려움이 있습니다. 실제 자바스크립트는 Java의 class와는 다르며 syntax sugar입니다.
- class는 메소드를 어떤식으로 선언 하였는지 클래스필드를 사용하는지에 따라 사용법이 조금씩 다르기 때문에 혼란을 야기할 수 있습니다.
- Class Component와 Function Component를 혼재하지 않고 Function Component만으로 React Application을 만들 수 있습니다.
- state별로 lifecycle을 관리 할 수 있다. 하나의 함수에서 관리하던 것을 목적에 맞게 분리해서 사용할 수 있습니다. 화면 단위가 아닌 데이터 단위로 lifecycle을 관리 할 수 있습니다.
- EventListener나 Interval과 같이 componentDidMount와 componentWillUnmount에서 분리해서 관리 했던 것을 한곳에서 관리 할 수 있습니다.
- componentDidMount와 componentDidUpdate에서 분리해서 관리하던 것을 한곳에서 관리 할 수 있습니다.
- render에 영향을 받지 않는 변수는 useRef를 통해서 만들어 사용 할 수 있습니다.(장점이라기 보단 단점을 보완하는 것 같습니다).
- useCallback과 useMemo를 사용해서 최적화를 할 수 있습니다(장점이라기 보단 단점을 보완하는 것 같습니다).
- TypeScript 사용 시 State Interface를 만들지 않아도 됩니다(단점이 될 수도 있을 것 같습니다).
- Custom Hook을 이용해 HOC 패턴을 피할 수 있습니다.
- ContextAPI와 useReducer를 활용해서 Redux의 역할을 조금은 대신 할 수 있습니다.
- [hook을 활용한 예제](https://github.com/Yuni-Q/hook)

## 참조

- [React 공식문서](https://ko.reactjs.org/docs/hooks-intro.html)
