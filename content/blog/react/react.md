---
title: react
date: 2021-06-21 22:06:27
category: react
tags: []
draft: true
---

## element

- 리액트는 element라는 단위로 dom을 생성합니다.
- element를 간단히 설명하면 태그의 정보를 담은 객체입니다.
- 리액트는 element라는 객체로 html 태그를 생성하여 렌더링합니다.
- document.createElement()를 이용하여 노드 객체를 생성합니다.

## 기본 컨셉

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const element = {
        type: 'div',
        props: {
          id: 'a',
          children: '안녕하세요',
        },
      };

      function render(element, container) {
        // 1. node 생성
        const node = document.createElement(element.type);
        node.id = element.props.id;

        // 2. text 생성
        const text = document.createTextNode('');
        text.nodeValue = element.props.children;

        // 3. node, text 연결
        node.appendChild(text);

        // 4. dom 연결
        container.appendChild(node);
      }

      render(element, document.getElementById('root'));
    </script>
  </body>
</html>
```

## JSX

- jsx는 html 태그로 표현하면 자동으로 element 객체롤 만들어 줍니다

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      /** @jsx createElement */
      function createElement(type, props, ...children) {
        // <App />으로 호출된 경우, type이 App 함수가 되고 이를 호출하여 element를 생성합니다.
        if (typeof type === 'function') {
          return type(null, props, ...children);
        }

        return {
          type,
          props: {
            ...props,
            children,
          },
        };
      }

      function App() {
        return <div className="a">안녕하세요</div>;
      }

      function createDom(element) {
        if (typeof element === 'string') {
          return document.createTextNode(element);
        }

        const dom = document.createElement(element.type);

        element.props.children
          .map(createDom)
          .forEach((child) => dom.appendChild(child));

        return dom;
      }

      function render(element, container) {
        const dom = createDom(element);
        container.appendChild(dom);
      }

      render(<App />, document.getElementById('root'));
    </script>
  </body>
</html>
```

---

## 참고

- [자바스크립트로 만들어 보는 리액트 프레임워크 - 1. 기본 컨셉](https://bgpark.tistory.com/166)
- [자바스크립트로 만들어 보는 리액트 프레임워크 - 2. jsx](https://bgpark.tistory.com/167)
