---
title: close event
date: 2020-06-29 14:06:45
category: frontend
draft: false
---

```javascript
window.addEventListener('beforeunload', () => document.activeElement.blur());
```

- 창을 닫을 때 현재 활성화 되어 있는 포커스 제거합니다.
- alert 사용 시 chrom에서는 정상 작동하지 않습니다.
