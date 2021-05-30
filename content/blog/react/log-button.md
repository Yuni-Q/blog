---
title: Log Button
date: 2021-05-28 14:05:55
category: react
tags: []
draft: true
---

```tsx
export function App2() {
  return (
    <LogClick>
      <Button2
        onClick={() => {
          console.log('button event');
        }}
      />
    </LogClick>
  );
}
const LogClick = ({ children }: { children: any }) => {
  const trackLog = () => {
    console.log('click log');
  };
  console.log(children);
  return (
    <children.type
      {...children.props}
      onClick={(event: any) => {
        trackLog();
        children.props.onClick(event);
      }}
    />
  );
};
function Button2({ onClick }: any) {
  return <button onClick={onClick}>버튼</button>;
}
```
