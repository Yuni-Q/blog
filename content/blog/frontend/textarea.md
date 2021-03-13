---
title: textarea
date: 2021-03-13 14:03:11
category: frontend
tags: []
draft: true
---

```tsx
const Textarea = (props: Props) => {
  const checkHeight = (textarea: any) => {
    let i = 100;
    while (i-- > 0 && textarea.scrollHeight > textarea.clientHeight) {
      textarea.rows++;
    }
  };
  return (
    <textarea
      onChange={(e) => {
        checkHeight(e.target);
      }}
    />
  );
};
```
