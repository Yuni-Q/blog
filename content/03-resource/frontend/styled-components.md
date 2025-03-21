---
title: styled components
date: 2021-03-16 07:03:47
category: frontend
tags: []
draft: true
---

## 일반적인 사용법

```tsx
import React from 'react';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <Button />
      <Button danger />
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #bdc3c7;
`;
const Button = styled.button`
  background-color: ${(props) => (props.danger ? '#e74c3c' : '2ecc71')};
`;
```

## GlobalStyle and Extend

```tsx
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle` body{ padding: 0; margin: 0; } `;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Anchor as="a" href="https://www.google.com">
        Go to google
      </Anchor>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #bdc3c7;
`;
const Button = styled.button`
  background-color: ${(props) => (props.danger ? '#e74c3c' : '2ecc71')};
`;

const Anchor = styled(Button)`
  text-decoration: none;
`;
```

## Animations

```tsx
import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  color: white;
  font-weight: 600;
  -webkit-appearance: none;
  cursor: pointer;
  &:active,
  &:foucus {
    outline: none;
  }
  background-color: ${(props) => (props.danger ? '#e74c3c' : '#2ecc71')};
  ${(props) => {
    if (props.danger) {
      return css`
        animation: ${rotation} 2s linear infinite;
      `;
    }
  }}
`;
```

## Extra Attributes and Mixins

```tsx
const awesomeCard = css`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const Input2 = styled.input.attrs({ required: true })`
  border: none;
  border-radius: 5px;
  ${awesomeCard}; // CSS block인 awesomeCard를 적용
`;
```

## Theming

```tsx
const theme = {
  mainColor: '#3498db',
  dangerColor: '#e74c3c',
  successColor: '#2ecc71',
};

import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import React from 'react';
import theme from './theme';
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: pink;
`;
const Card = styled.div`
  background-color: white;
`;
const Button = styled.button`
  border-radius: 30px;
  padding: 25px 15px;
  background-color: ${(props) =>
    props.theme
      .successColor}; // ThemeProvider 아래 level의 컴포넌트에서는 지정받은 theme를 props 형태로 받아올 수 있습니다.
`;
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GlobalStyle />
        <Form />
      </Container>
    </ThemeProvider>
  );
}
const Form = () => (
  <Card>
    <Button>Hello</Button>
  </Card>
);
export default App;
```

## Nesting

```tsx
const Card = styled.div`
  background-color: red;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: pink;
  ${Card} {
    background-color: blue;
  }
`;
```

---

## 참고

- [xtring.dev](https://xtring-dev.tistory.com/entry/Styling-Styled-Components-이해하고-사용하기-💅?fbclid=IwAR1lrcvcLcAWNVDonejECba9SiClnKwWrKg2X9_LG71YQ59ANZAyVgnNbqk)
