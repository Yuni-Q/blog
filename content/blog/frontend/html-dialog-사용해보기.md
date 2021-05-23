---
title: html dialog 사용해보기
date: 2021-05-24 01:05:89
category: frontend
tags: []
draft: true
---

```html
<button id="open">열기</button>
<dialog id="dialog">
  <button id="close">닫기</button>
</dialog>
<script>
  const open = document.querySelector('#open');
  const dialog = document.querySelector('#dialog');
  const close = document.querySelector('#close');

  open.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') {
      dialog.close();
      dialog.showModal();
    } else {
      alert('The <dialog> API is not supported by this browser');
    }
  });
  close.addEventListener('click', () => {
    dialog.close();
  });
</script>
```
