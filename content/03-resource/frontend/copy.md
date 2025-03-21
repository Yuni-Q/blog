---
title: copy
date: 2021-03-13 21:03:31
category: frontend
tags: []
draft: true
---

```ts
const copyURL = () => {
  const tempElement = document.createElement('textarea');
  tempElement.value = location.href;
  tempElement.style.opacity = '0';
  document.body.appendChild(tempElement);
  tempElement.focus();
  tempElement.select();
  tempElement.setSelectionRange(0, 99999);
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      return alert('복사가 완료되었습니다');
    } else {
      return window.prompt('Ctrl+C를 눌러 복사하세요.', location.href);
    }
  } catch (error) {
    return window.prompt('Ctrl+C를 눌러 복사하세요.', location.href);
  } finally {
    document.body.removeChild(tempElement);
  }
};
```
