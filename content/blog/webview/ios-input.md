---
title: ios input
date: 2021-01-21 10:01:64
category: webview
tags: []
draft: true
---

## ios webview에서만 box shadow와 round 보임

### 해결법

```css
input {
	-webkit-appearance: none;
	-webkit-border-radius: 0;
}
```
