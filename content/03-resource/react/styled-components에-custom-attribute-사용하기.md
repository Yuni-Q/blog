---
title: styled-components에 custom attribute 사용하기
date: 2021-09-18 19:09:14
category: react
tags: []
draft: true
---

```tsx
const AttrButton = ({ ...attr }) => {
  return <button {...attr}></button>;
};

const ButtonComponent = styled(AttrButton)`
  background: red;
`;

const Button = ({ ...attrs }) => {
  return (
    <ButtonComponent resource-id={attrs['resource-id']}>버튼</ButtonComponent>
  );
};
```

## styled-components를 상속 스타일 적용하기

```
const StyledParent = styled.div`
  background: red;
`

const Parent = () => {
  return <StyledParent>Hello World</StyledParent>;
};

const StyledChildren = styled(Parent)`
  background: blue;
`;

const Children = () => {
  return <StyledChildren />
}
```

- 위와 같이 컴포넌트를 상속 했을 때 배경색이 파란색으로 나올 것을 기대합니다. 하지만 배경색은 빨간색으로 나오게 됩니다.
- 이를 해결하기 위해 className을 전달해 주어야 합니다.

### 해결

```
const StyledParent = styled.div`
  background: red;
`

const Parent = ({className}) => {
  return <StyledParent className={className}>Hello World</StyledParent>;
};

const StyledChildren = styled(Parent)`
  background: blue;
`;

const Children = () => {
  return <StyledChildren />
}
```