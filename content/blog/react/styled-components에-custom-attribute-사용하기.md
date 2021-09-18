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
