---
title: input number
date: 2020-02-08 15:02:74
category: frontend
draft: false
---

```tsx
import * as React from 'react';
class InputComponent extends React.Component {
  render() {
    return (
      <input
        type='number'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {}}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
        // type number 일 때 +-.e 의 입력을 막습니다
        onKeyDown={event => {
          if (
            type === 'number' &&
            (event.keyCode === 69 ||
              event.keyCode === 187 ||
              event.keyCode === 189 ||
              event.keyCode === 107 ||
              event.keyCode === 109 ||
              event.keyCode === 190 ||
              event.keyCode === 110)
          ) {
            event.preventDefault();
          }
        }}
      />;)
  }
}
```