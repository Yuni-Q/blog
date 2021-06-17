---
title: redux
date: 2021-06-17 21:06:41
category: javascript
tags: []
draft: true
---

## 민태님의 테크러닝 4기 중 리덕스 만들어 보기

```js
function createStore(reducer) {
  let state;
  let handler = [];

  reducer(state, { type: '@@__init__@@' });

  return {
    dispatch: (action) => {
      state = reducer(state, action);

      handler.forEach((h) => {
        h();
      });
    },

    subscribe: (listener) => {
      handler.push(listener);
    },

    getState: () => state,
  };
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

const store = createStore(reducer);

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

function zoo() {
  store.dispatch(actionCreator('action', { action: 'fetch' }));
}

foo();
zoo();
```
