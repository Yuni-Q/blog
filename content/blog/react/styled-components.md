---
title: styled-components
date: 2021-02-03 21:02:60
category: react
tags: []
draft: true
---

## styled-components가 아닌 컴포넌트를 상속 받고자 할때

```jsx
const StyledButton = styled.button`
	color: red;
`;

const Button = () => {
	return <StyledButton>버튼</StyledButton>;
};

const ExtendsButton = styled(Button)`
	color: blue;
`;

const Button2 = () => {
	return <ExtendsButton>버튼2</ExtendsButton>;
};
```

- Button2의 color가 적용되지 못합니다.

### 실패한 시도

```jsx
const StyledButton = styled.button`
	color: red;
`;

const Button = () => {
	return <StyledButton>버튼</StyledButton>;
};

// StyledButton을 상속 받는다
const ExtendsButton = styled(StyledButton)`
	color: blue;
`;

const Button2 = () => {
	return <ExtendsButton>버튼2</ExtendsButton>;
};
```

- `StyledButton`을 상속 받습니다. 하지만 그렇게 되면 `Button` 안에 다른 값들을 사용할 수 없습니다.

### 성공적인 결과

```jsx
const StyledButton = styled.button`
	color: red;
`;

// className을 사용한다.
const Button = ({ className }) => {
	return <StyledButton className={className}>버튼</StyledButton>;
};

const ExtendsButton = styled(Button)`
	color: blue;
`;

const Button2 = () => {
	return <ExtendsButton>버튼2</ExtendsButton>;
};
```

- `className`을 사용합니다.
