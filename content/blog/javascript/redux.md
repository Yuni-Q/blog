---
title: redux
date: 2021-06-17 21:06:41
category: javascript
tags: []
draft: true
---

- Flux 패턴을 좀 더 쉽고 정돈된 형태로 쓸 수 있게 도와주는 라이브러리라고 볼 수 있습니다.

## Actions(액션)

- 어플리케이션의 store(스토어), 즉 저장소로 data를 보내는 방법입니다.
- view에서 정의되어있는 액션을 호출하면 action creators(액션 생성자)는 어플리케이션의 state(상태)를 변경하여 줍니다.

## Reducers(리듀서)

- action을 통해 어떠한 행동을 정의했다면, 그 결과 어플리케이션의 상태가 어떻게 바뀌는지는 특정하게 되는 함수입니다.

## Store(스토어)

- “무엇이 일어날지”를 나타내는 action, 그리고 action에 따라 상태를 수정하는 reducer를 저장하는 어플리케이션에 있는 단 하나의 객체입니다.

## 민태님의 테크러닝 4기 중 리덕스 만들어 보기

```js
function createStore(reducer, middleware = []) {
  let state;

  const dispatch = (action) => {
    state = reducer(state, action);
  };

  let backupDispatch = dispatch;

  reducer(state, { type: '@@__init__@@' });

  const store = {
    dispatch: backupDispatch,

    subscribe: (listener) => {
      middleware.push(listener);
    },

    getState: () => state,
  };

  middleware.reverse().forEach((m) => {
    backupDispatch = m(store)(backupDispatch);
  });

  store.dispatch = backupDispatch;

  return store;
}

const InitState = {
  type: '',
  counter: 0,
  profile: {
    id: '',
    imageUrl: '',
  },
};

function reducer(state = InitState, action) {
  console.log('reducer', action.type);
  switch (action.type) {
    case 'counter':
      return {
        ...state,
        counter: action.counter,
      };
    case 'action':
      return {
        ...state,
        type: action.action,
      };
    default:
      return { ...state };
  }
}

const loggerA = (store) => (next) => (action) => {
  console.log('logger A =>  ', action.type);
  next(action);
};

const loggerB = (store) => (next) => (action) => {
  console.log('logger B =>  ', action.type);
  if (action.type === 'action') {
    setTimeout(() => {
      next({ type: 'response' });
    }, 3000);
  } else {
    next(action);
  }
  next(action);
};

const store = createStore(reducer, [loggerA, loggerB]);

store.subscribe(() => {
  console.log('바꼈나????', store.getState());
});

function actionCreator(type, data) {
  return {
    type: type,
    ...data,
  };
}

const counter = (counter) => {
  store.dispatch(actionCreator('counter', { counter }));
};

function foo() {
  counter(1);
}

function bar() {
  store.dispatch(actionCreator('action', { action: 'fetch' }));
}

foo();
bar();
```

---

## 궁금한 점

- 리덕스는 불변상태 관리를 직접 해주지 않고 유저가 만드는 reducer에게 넘긴 이유가 무엇일까? 그러면서도 rtk을 제공하는 이유는 무엇일까?
  - 리덕스는 실제로 불변상태를 관리할 필요가 없는데 리액트에서 값을 비교하는 것이 불변객체를 기반으로 하기 때문에 리덕스를 리액트에서 사용하려면 리듀서가 불변객체로 관리해야 합니다. 이는 리덕스의 근본적인 관심이 아니기 때문에 리덕스는 상태를 불변객체로 관리할 책임이 없습니다.
- 하지만 리듀서는 사이드이펙트 방지를 위해 순수함수여야 한다고 합니다. 꼭 그래야 할까요?
  - 리액트 밖에서 리덕스를 사용할 때는 딱히 순수하지 않아도 되는 것처럼 보입니다.

## redux에서 Three Principles 이라고 해서 Changes are made with pure functions 라고 명시하고 있긴 하네요

- react와 무관하게 reducer는 순수함수로 만들기를 권장하고 있는거 같습니다.
- [리덕스 문서](https://redux.js.org/understanding/thinking-in-redux/three-principles)
- 값을 connect 할 때도 react의 props 비교와 같은 형식으로 하니까 이 부분에서는 여전히 필요하지만 redux의 필요보단 react의 필요에 의한 걸로 보여서 논지에서 벗어나지만 빼먹고 가긴 좀 그런거 같기도하고…

## 리액트 없이 리듀서 사용하기

```html
<!-- [리덕스(Redux)를 왜 쓸까? 그리고 리덕스를 편하게 사용하기 위한 발악 (i)](https://velopert.com/3528) -->
<!-- 리덕스에서는 컴포넌트에서 글로벌 상태의 특정 값을 의존하게 될 때 해당 값이 바뀔 때에만 리렌더링이 되도록 최적화가 되어있습니다.  -->
<!-- 
  #Redux의 3원칙
애플리케이션 상태는 모두 한 곳에서 집중 관리됩니다. (동기화 필요 ✘)
상태는 불변(읽기 전용) 데이터 이며, 오직 액션 만이 상태 교체를 요청 할 수 있습니다. (예측 가능)
리듀서(함수)를 통해 상태의 최종 값만 설정합니다. (단순화)
 -->
<!-- 
  리듀서는 순수 함수
리듀서(함수)는 순수해야 합니다. 순수함을 잃어버리게 되면 사이드 이펙트(부작용)를 발생시킬 수 있습니다.

전달 받은 매개변수 state, action에 변형을 가하면 안됩니다.
네트워킹(API 호출 ← 비동기 통신) 또는 라우팅을 변경하면 안됩니다.
반드시 반환 값은 새로운 상태(state) 입니다.
 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>그냥 평범한 리덕스</title>
  </head>
  <body>
    <h1 id="number">0</h1>
    <button id="increment">+</button>
    <button id="decrement">-</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.js"></script>
    <script>
      // 편의를 위하여 각 DOM 엘리먼트에 대한 레퍼런스를 만들어줍니다.
      const elNumber = document.getElementById('number');
      const btnIncrement = document.getElementById('increment');
      const btnDecrement = document.getElementById('decrement');

      // 액션 타입을 정의해줍니다.
      const INCREMENT = 'INCREMENT';
      const DECREMENT = 'DECREMENT';

      // 액션 객체를 만들어주는 액션 생성 함수
      const increment = (diff) => ({ type: INCREMENT, diff: diff });
      const decrement = () => ({ type: DECREMENT });

      // 초기값을 설정합니다. 상태의 형태는 개발자 마음대로 입니다.
      const initialState = {
        number: 0,
        obj: {
          obj2: {
            number: 0,
          },
        },
      };

      /* 
         이것은 리듀서 함수입니다.
         state 와 action 을 파라미터로 받아옵니다.
         그리고 그에 따라 다음 상태를 정의 한 다음에 반환해줍니다.
      */

      // 여기에 state = initialState 는, 파라미터의 기본값을 지정해줍니다.
      const counter = (state = initialState, action) => {
        console.log(action);
        switch (action.type) {
          case INCREMENT:
            state.number = state.number + action.diff;
            return state;
          // return {
          //   number: state.number + action.diff,
          // };
          case DECREMENT:
            state.obj.obj2.number = 9999;
            // state.number = state.number - 1;
            return state;
          // return {
          //   number: state.number - 1,
          // };
          default:
            return state;
        }
      };

      // 스토어를 만들 땐 createStore 에 리듀서 함수를 넣어서 호출합니다.
      const { createStore } = Redux;
      const store = createStore(counter);

      // 상태가 변경 될 때 마다 호출시킬 listener 함수입니다
      const render = () => {
        // elNumber.innerText = store.getState().number;
        elNumber.innerText = store.getState().obj.obj2.number;
        console.log('내가 실행됨');
      };

      // 스토어에 구독을하고, 뭔가 변화가 있다면, render 함수를 실행합니다.
      store.subscribe(render);

      // 초기렌더링을 위하여 직접 실행시켜줍니다.
      render();

      // 버튼에 이벤트를 달아줍니다.
      // 스토어에 변화를 일으키라고 할 때에는 dispatch 함수에 액션 객체를 넣어서 호출합니다.

      btnIncrement.addEventListener('click', () => {
        store.dispatch(increment(25));
      });

      btnDecrement.addEventListener('click', () => {
        store.dispatch(decrement());
      });
    </script>
  </body>
</html>
```

## 변경이 적용되기 위해선 객체를 새로 만들어야 하는 이유라고 언급된 곳

```js
function combination() {
  let hasChanged = false;
  const nextState = {};
  for (let i = 0; i < finalReducerKeys.length; i++) {
    // 1
    const key = finalReducerKeys[i];
    const reducer = finalReducers[key];
    const previousStateForKey = state[key];
    const nextStateForKey = reducer(previousStateForKey, action); // 2
    nextState[key] = nextStateForKey;
    hasChanged = hasChanged || nextStaeteForKey !== previousStateForKey; // 3
  }
  hasChanged =
    hasChanged || finalReducerKeys.length !== Object.keys(state).length;
  return hasChanged ? nextState : state;
}
```

## 중간 생각 정리

- 리덕스의 불편상태 관리가 react(react는 상태를 불변상태로 관리해야한다고 하니까 리액트에서 리덕스를 쓰려면 상태를 불변으로 관리해야지라는 생각) 때문이지 않을까 하면서 html에서 redux를 사용 시에 불변상태를 유지하지 않아도 되어서 괜찮구나 라고 생각을 했는데 실제 불변상태를 가져야 하는 이유는 하나의 리듀서만 사용할때가 아닌 combineReducers를 사용할때 이고 그 이유는 combineReducers 중 아래와 같이 리듀서들을 합쳐서 관리할때 레퍼런스로 비교해서 해당 리듀서를 업데이트 할지 고려해서 인거 같네요 !
- 리덕스 문서에 [combineReducers와 관련된 답변](https://redux.js.org/faq/reducers#reducers)도 있네요
- 이렇게 되면 리덕스 자체에서 state를 딥카피해서 보내주면 항상 업데이트 되기 때문에 redux에서 직접 해주지 않는 이유가 있는거처럼 보입니다.

## [Why does Redux’s use of shallow equality checking require immutability?](https://redux.js.org/faq/immutable-data#why-does-reduxs-use-of-shallow-equality-checking-require-immutability)

- Redux와 React-Redux는 모두 얕은 동등성 검사를 사용합니다. 특히 Redux의 combineReducers 유틸리티는 호출하는 리듀서로 인한 참조 변경을 얕게 확인합니다. React-Redux의 connect 메소드는 루트 상태에 대한 참조 변경 사항을 얕게 확인하는 구성 요소를 생성하고, 래핑 된 구성 요소가 실제로 다시 렌더링해야하는지 확인하기 위해 mapStateToProps 함수의 반환 값을 생성합니다. 이러한 얕은 검사는 올바르게 작동하려면 불변성이 필요합니다. 불변 데이터 관리는 궁극적으로 데이터 처리를 더 안전하게 만듭니다. 시간 여행 디버깅은 리듀서가 부작용이없는 순수 함수 여야하므로 서로 다른 상태간에 올바르게 이동할 수 있습니다.

## 하지만 React-Redux 없이 subscribe 한다면 문제는 없습니다.

- 코드는 추후 수정이 필요해 보이지만 확인을 위한 코드

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>그냥 평범한 리덕스</title>
  </head>
  <body>
    <h1 id="number">0</h1>
    <button id="increment">+</button>
    <button id="decrement">-</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.js"></script>
    <script>
      // 편의를 위하여 각 DOM 엘리먼트에 대한 레퍼런스를 만들어줍니다.
      const elNumber = document.getElementById('number');
      const btnIncrement = document.getElementById('increment');
      const btnDecrement = document.getElementById('decrement');

      // 액션 타입을 정의해줍니다.
      const INCREMENT = 'INCREMENT';
      const DECREMENT = 'DECREMENT';

      const INCREMENT2 = 'INCREMENT2';
      const DECREMENT2 = 'DECREMENT2';

      // 액션 객체를 만들어주는 액션 생성 함수
      const increment = (diff) => ({ type: INCREMENT, diff: diff });
      const decrement = () => ({ type: DECREMENT });

      const increment2 = (diff) => ({ type: INCREMENT2, diff: diff });
      const decrement2 = () => ({ type: DECREMENT2 });

      // 초기값을 설정합니다. 상태의 형태는 개발자 마음대로 입니다.
      const initialState = {
        number: 0,
        obj: {
          obj2: {
            number: 0,
          },
        },
      };
      const initialState2 = {
        number2: 0,
        obj2: {
          obj22: {
            number2: 0,
          },
        },
      };

      /*
         이것은 리듀서 함수입니다.
         state 와 action 을 파라미터로 받아옵니다.
         그리고 그에 따라 다음 상태를 정의 한 다음에 반환해줍니다.
      */

      // 여기에 state = initialState 는, 파라미터의 기본값을 지정해줍니다.
      const counter = (state = initialState, action) => {
        console.log(action);
        switch (action.type) {
          case INCREMENT:
            state.obj.obj2.number = state.obj.obj2.number + action.diff;
            return state;
          // return {
          //   ...state,
          //   number: state.number + action.diff,
          // };
          case DECREMENT:
            console.log(44, state);
            // state.obj.obj2.number = 9999;
            state.obj.obj2.number = state.obj.obj2.number - 10;
            // state.number = state.number - 1;
            return state;
          // return {
          //   number: state.number - 1,
          // };
          default:
            return state;
        }
      };
      const counter2 = (state = initialState2, action) => {
        console.log(action);
        switch (action.type) {
          case INCREMENT2:
            state.number2 = state.number2 - action.diff;
            return state;
          // return {
          //   number: state.number + action.diff,
          // };
          case DECREMENT2:
            state.obj2.obj22.number2 = 8888;
            // state.number = state.number - 1;
            return state;
          // return {
          //   number: state.number - 1,
          // };
          default:
            return state;
        }
      };

      // 스토어를 만들 땐 createStore 에 리듀서 함수를 넣어서 호출합니다.
      const { combineReducers, createStore } = Redux;
      const app = combineReducers({ counter, counter2 });
      const store = createStore(app);

      // 상태가 변경 될 때 마다 호출시킬 listener 함수입니다
      let state;
      let state2;
      const render = () => {
        console.log(11, state === store.getState().counter);
        console.log(22, state2 === store.getState().counter2);
        state = store.getState().counter;
        state2 = store.getState().counter2;
        elNumber.innerText = store.getState().counter.obj.obj2.number;
        console.log('0', store.getState());
        console.log('1', store.getState().counter.obj.obj2.number);
        console.log('2', store.getState().counter2.obj2.obj22.number2);
        console.log('내가 실행됨');
      };

      // 스토어에 구독을하고, 뭔가 변화가 있다면, render 함수를 실행합니다.
      store.subscribe(render);

      // 초기렌더링을 위하여 직접 실행시켜줍니다.
      render();

      // 버튼에 이벤트를 달아줍니다.
      // 스토어에 변화를 일으키라고 할 때에는 dispatch 함수에 액션 객체를 넣어서 호출합니다.

      btnIncrement.addEventListener('click', () => {
        store.dispatch(increment(25));
      });

      btnDecrement.addEventListener('click', () => {
        store.dispatch(decrement());
      });
    </script>
  </body>
</html>
```

## [Does shallow equality checking with a mutable object cause problems with Redux?](https://redux.js.org/faq/immutable-data#why-does-reduxs-use-of-shallow-equality-checking-require-immutability)

- 가변 객체를 사용한 얕은 동등성 검사는 Redux에 문제를 일으키지 않지만 React-Redux와 같이 저장소에 의존하는 라이브러리에 문제를 일으킬 것입니다.

## 그래서 결론이 뭐야

- Redux에서 상태관리를 할 때 (subscribe와 getState로만 값을 관리한다면) 불변상태를 꼭 유지할 필요는 없습니다. 하지만 React-Redux에서 사용할 것을 고려하였기 때문에 불변상태를 유지할 필요가 있고 이를 지원하기 위해 combineReducers combination를 사용합니다.
- 추가로 reducer에서 default에서 state를 return 할 때는 객체를 새로 만들지 않아야 할거 같습니다.
- redux 자체에서 state를 새로운 객체로 만들어서 준다면 combineReducers combination에서 늘 새로운 객체만 주기 때문에 오히려 성능에 악영향을 줄거 같습니다.
- combineReducers combination에서 새 객체를 만들지 여부를 reducer의 return 시에 새 객체를 줄지 기존 객체(default에서)를 줄지에 따라 결정되기 때문에 redux 자체에서 state를 새로운 객체로 만들어 주면 안 됩니다.
- React-Redux의 성능을 위해서 redux는 state를 새로 만들어서 넘기지 않고 reducer에서 결정하게 끔 유도하는 것 같습니다.

## 참고

- [React에 Redux 적용하기(1)](https://medium.com/@jsh901220/react%EC%97%90-redux-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-a8e6efd745c9)
