---
title: dialog
date: 2022-04-26 23:04:74
category: frontend
tags: []
draft: true
---

## 들어가는 말

- 웹 개발을 하면서 다이얼로그를 사용하지 않는 경우는 거의 없다고 보입니다. 하지만 우린 브라우저에 내장되어 있는 다이얼로그들을 쓰기 보다는 커스텀 된 다이얼로그를 많이 사용합니다. 또한, 이들은 비슷한 틀 안에서 무수한 변화를 가져갑니다. 해당 글에서는 다이얼로그를 좀 더 직관적이고 간단하게(?) 사용하고 싶어서 만들어 본 것들을 공유해 보고자 합니다.

### 기존 다이얼로그 사용법

```tsx
import React, { useState } from 'react';

function App() {
  // 컴포넌트를 나타낼지를 위한 상태 값
  const [show, setShow] = useState(false);
  return (
    <>
      {/* 다이얼로그 나타내기 위한 로직은 따로 분리되어 있음 */}
      <button onClick={() => setShow(true)}>다이얼로그</button>
      {/* 상태가 업데이트 되면 다이얼로그를 노출 */}
      {show && (
        <div>
          <button onClick={() => setShow(false)}>닫기</button>
        </div>
      )}
    </>
  );
}
```

### 문제점

#### 불필요한 코드 및 jsx

- 일반적으로 리액트에서 다이얼로그 사용할 경우 컴포넌트의 return 안에 일반 영역과 섞여 나타나게 됩니다. 뿐만 아니라 다이얼로그를 위한 상태도 필요합니다. 마지막으로 다이얼로그를 위한 상태를 업데이트하는 코드가 최소 2곳 이상 필요합니다. 이런 코드들은 한 곳에 모여 있지 않고 컴포넌트 여기저기에 위치하게 됩니다.

## 생각한 모델

- 클릭 함수 내에서 내가 원하는 컴포넌트를 넘기면 렌더링 해주었으면 좋겠다고 생각했습니다.

```tsx
const dialogStore = observable<{
  dialog: ReactElement | null;
  open: (jsx: ReactElement) => void;
  close: () => void;
}>({
  dialog: null,
  open(jsx: ReactElement) {
    this.dialog = jsx;
  },
  close() {
    this.dialog = null;
  },
});

function App() {
  return (
    <>
      {/* 다이얼로그 업데이트가 앱에 렌더링에 영향이 가지 않게 격리 */}
      <Observer>
        {() => <>{!!dialogStore.dialog && dialogStore.dialog}</>}
      </Observer>
      <Component />
    </>
  );
}

function Component() {
  return (
    <>
      {/* 클릭 함수 내에 다이얼로그 관련 로직을 모을 수 있습니다 */}
      <button
        onClick={() =>
          dialogStore.open(
            <button onClick={() => dialogStore.close()}>닫기</button>,
          )
        }
      >
        다이얼로그
      </button>
    </>
  );
}
```

- 다이얼로그를 선언적으로 사용하기 위해 mobx에서 관리하고 있습니다. 이로 인해 얻어지는 효과는 Dialog를 위해 페이지에서 show라는 state를 만들고 하위에 Dialog와 관련된 로직을 show에 따라 분기하는 로직을 추가하지 않고 필요한 곳에 코드를 뭉쳐서 작성할 수 있다는 장점이 있습니다.
- 단점으로는 역시나 dialog를 store에서 관리하는게 맞을지 그에 따라서 오는 불필요한 코드들이 생산성을 높이는데 정말 도움이 되는지가 있습니다.

### 추가로 고민해야 할 것들

#### 다이얼로그가 하나만 있을까?

- 가장 간단한 해결책으로는 dialog가 아닌 dialogs로 만들어 문제를 해결해 봅니다.

```tsx
const dialogStore = observable<{
  dialogs: ReactElement[];
  open: (jsx: ReactElement) => void;
  close: () => void;
}>({
  dialogs: [] as ReactElement[],
  open(jsx: ReactElement) {
    this.dialogs = [...this.dialogs, jsx];
  },
  close() {
    const dialog = [...this.dialogs];
    dialog.pop();
    this.dialogs = dialog;
  },
});

function App() {
  return (
    <>
      <Observer>
        {() => (
          <>
            {!!dialogStore.dialogs &&
              dialogStore.dialogs.map((dialog) => {
                return dialog;
              })}
          </>
        )}
      </Observer>
      <Component />
    </>
  );
}

function Component() {
  return (
    <>
      <button
        onClick={() =>
          dialogStore.open(
            <button onClick={() => dialogStore.close()}>닫기</button>,
          )
        }
      >
        다이얼로그
      </button>
    </>
  );
}
```

- 다이얼로그 배열에서 마지막 함수를 빼는 것으로 문제는 간단히 해결될 것처럼 보입니다. 하지만 우리는 여기서 애니메이션 효과를 하나 주면서 큰 문제에 직면하게 됩니다.

#### 애니메이션 효과가 필요하다면 ?

- 애니메이션 효과를 주면서 내부 상태가 필요하게 됩니다. 이를 위해 우리는 컴포넌트를 만들어 제공하게 됩니다.

```tsx
function App() {
  return (
    <>
      <Observer>
        {() => (
          <>
            {!!dialogStore.dialogs &&
              dialogStore.dialogs.map((dialog) => {
                return dialog;
              })}
          </>
        )}
      </Observer>
      <Component />
    </>
  );
}

function Component() {
  return (
    <>
      <button onClick={() => dialogStore.open(<Dialog>닫기</Dialog>)}>
        다이얼로그
      </button>
    </>
  );
}

function Dialog({ children }: { children: string }) {
  // 여기선 다이얼로그가 그려지는 순간이기 때문에 true가 기본값 입니다.
  const [show, setShow] = useState(true);
  return (
    <Wrap
      show={show}
      onClick={() => {
        setShow(false);
        dialogStore.close();
      }}
    >
      {children}
    </Wrap>
  );
}

const Wrap = styled.button<{ show: boolean }>`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  animation: 0.3s forwards ${({ show }) => (show ? 'fadeIn' : 'fadeOut')};

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.4);

  opacity: 0;
`;
```

위와 같이 구현 했을 경우 애니메이션이 실행되기 전에 컴포넌트가 unmount 되기 때문에 닫히는 애니메이션 정상 동작하지 않습니다. 이를 해결하기 위해 onAnimationEnd를 사용해 봅니다.

```tsx
function Dialog({ children }: { children: string }) {
  // 여기선 다이얼로그가 그려지는 순간이기 때문에 true가 기본값 입니다.
  const [show, setShow] = useState(true);
  return (
    <Wrap
      show={show}
      onClick={() => {
        setShow(false);
      }}
      onAnimationEnd={() => {
        if (!show) {
          dialogStore.close();
        }
      }}
    >
      {children}
    </Wrap>
  );
}
```

#### 성공 ?

성공적으로 다이얼로그 작업을 마쳤다고 생각할 수 있지만 우리는 한 가지 사실을 놓치고 있습니다. 대화 상자가 닫힘과 동시에 대화 상자가 열린다면 어떻게 동작할까요?

```tsx
function Dialog({ children }: { children: string }) {
  const [show, setShow] = useState(true);
  return (
    <Wrap
      show={show}
      onClick={() => {
        setShow(false);
        dialogStore.open(<div>나를 봐줘</div>);
      }}
      onAnimationEnd={() => {
        if (!show) {
          dialogStore.close();
        }
      }}
    >
      {children}
    </Wrap>
  );
}
```

`나를 봐줘`는 아주 잠시 노출되고 사라지고 맙니다. 그리고 기존의 다이얼로그 또한 사라지지 않고 opacity가 0인 채로 남아 있게 됩니다.
애니메이션 종료되어 기존의 컴포넌트가 빠지기 전에 새로운 컴포넌트가 추가되고 애니메이션이 종료 된 후에 가장 뒤에 있는 대화 상자 제거하려고 하기 때문에 `나를 봐줘`는 사라지고 대화 상자는 보이지 않는 채로 남게 됩니다.

#### 이 계획은 망햇어 ?

id를 넘겨주어 `나를 종료 시켜줘 !`를 구현하면 좋을거 같습니다.
하지만 모든 dialog에 id를 붙이는 것은 너무 어렵고 번거로운 일이니 store에서 알아서 넣어 주었으면 좋겠습니다.

```tsx
const dialogStore = observable<{
  key: number;
  dialogs: { key: number; dialog: ReactElement }[];
  open: (jsx: ReactElement) => void;
  close: (id: number) => void;
}>({
  key: 0,
  dialogs: [] as { key: number; dialog: ReactElement }[],
  open(jsx: ReactElement) {
    const newJsx = cloneElement(jsx, { id: ++this.key });
    this.dialogs = [...this.dialogs, { dialog: newJsx, key: this.key }];
  },
  close(id) {
    if (!id) {
      throw new Error('대화 상자를 닫기 위한 id가 없습니다 !');
    }
    const dialog = [...this.dialogs];
    const newDialogs = dialogs.filter((dialog) => {
      return dialog.key !== id;
    });
    this.dialogs = newDialogs;
  },
});

function App() {
  return (
    <>
      <Observer>
        {() => (
          <>
            {!!dialogStore.dialogs &&
              dialogStore.dialogs.map((dialog) => {
                return <div key={dialog.key}>{dialog.dialog}</div>;
              })}
          </>
        )}
      </Observer>
      <Component />
    </>
  );
}

function Component() {
  return (
    <>
      <button onClick={() => dialogStore.open(<Dialog>닫기</Dialog>)}>
        다이얼로그
      </button>
    </>
  );
}

// id는 store에서 알아서 넣어주기 때문에 옵셔널 값입니다.
function Dialog({ children, id }: { children: string; id?: number }) {
  const [show, setShow] = useState(true);
  return (
    <Wrap
      show={show}
      onClick={() => {
        setShow(false);
        dialogStore.open(<div>나를 봐줘</div>);
      }}
      onAnimationEnd={() => {
        if (!show) {
          dialogStore.close(id || 0);
        }
      }}
    >
      {children}
    </Wrap>
  );
}
```

#### 그럼 이제 문제가 끝난 것일까요?

```tsx
function Dialog({ children, id }: { children: string; id?: number }) {
  const [show, setShow] = useState(true);
  return (
    <Wrap
      show={show}
      onClick={() => {
        setShow(false);
        dialogStore.open(<div>나를 봐줘</div>);
      }}
      onAnimationEnd={() => {
        if (!show) {
          dialogStore.close(id || 0);
        }
      }}
    >
      {children}
    </Wrap>
  );
}

// id를 props으로 받고 Dialog에게 전달해 주어야 합니다.
const HiDialog = () => {
  return <Dialog>hi</Dialog>;
};

const HiComponent = () => {
  return <button onClick={() => dialogStore.open(<HiDialog />)}>Hi</button>;
};
```

대화 상자를 공통 컴포넌트로 제공하고 있지만 재사용 되는 또다른 레이어를 만들어 사용할 경우 id를 받는 props를 열어두지 않는 경우 에러가 발생합니다.
store에서 체크 할 때 에러를 던져 상기 시킬 수 있지만 이는 런타임 에러이기 때문에 좋지 않습니다.

#### 자식은 나의 id를 몰라도 부모는 알 수 있지 않을까 props drilling을 피해보자.

```tsx
function App() {
  return (
    <>
      <Observer>
        {() => (
          <>
            {!!dialogStore.dialogs &&
              dialogStore.dialogs.map((dialog) => {
                return (
                  <div id={dialog.key.toString()} key={dialog.key}>
                    {dialog.dialog}
                  </div>
                );
              })}
          </>
        )}
      </Observer>
      <Component />
    </>
  );
}

function Component() {
  return (
    <>
      <button onClick={() => dialogStore.open(<Dialog>닫기</Dialog>)}>
        다이얼로그
      </button>
    </>
  );
}

function Dialog({ children }: { children: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(true);
  return (
    <Wrap
      ref={ref}
      show={show}
      onClick={() => {
        setShow(false);
        dialogStore.open(<div>나를 봐줘</div>);
      }}
      onAnimationEnd={() => {
        if (!show && ref.current) {
          const key = (ref.current.parentNode as HTMLDivElement).id;
          const id = parseInt(key, 10) || 0;
          dialogStore.close(id);
        }
      }}
    >
      {children}
    </Wrap>
  );
}
```

- dom에 직접 접근하는 것이 좋은지에 대해서는 여전히 의문이 남지만 직접 사용하지 않는 옵셔널 id를 props drilling 하는 것보다는 현재 방식이 좋다는 결론을 내렸습니다.

## 선언적으로 if문 안에서 alert, confirm 사용하기

## 변화 무쌍한 컴포넌트 만들기

## 접근성
