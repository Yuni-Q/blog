---
title: check device
date: 2021-04-01 09:04:82
category: javascript
tags: []
draft: true
---

```ts
const checkDeviceType = (): 'android' | 'ios' | 'other' | 'desktop' => {
  const userAgent = navigator.userAgent;

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    )
  ) {
    if (/android/i.test(userAgent)) {
      return 'android';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'ios';
    } else {
      return 'other';
    }
  } else {
    return 'desktop';
  }
};
```
