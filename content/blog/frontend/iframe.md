---
title: iframe
date: 2020-08-18 00:08:27
category: frontend
tags: ['iframe']
draft: true
---

## 자바스크립트 iframe 요소의 DOM에 접근하기

- iframe 태그의 DOM객체에 접근하기 위해서는 iframe 요소의 contentWindow 또는 contentDocument를 사용하여 가능합니다. 해당 속성은 iframe에 적용된 document객체를 반환합니다.

```javascript
iframeobj.contentWindow.document;
// iframe의 Window객체에 접근

iframeobj.contentDocument.document;
// iframe의 Document객체에 접근
```
