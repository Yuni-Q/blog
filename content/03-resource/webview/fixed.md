---
title: fixed
date: 2021-01-26 14:01:18
category: webview
tags: []
draft: true
---

## ios에서 키보드가 올라올 시에 fixed가 제대로 먹히지 않고 밀려 올라가는 이슈

### 방안 1. 키보드 완료 버튼 누르면 최상단으로 이동

```js
keyboardwillhide() {
  window.scrollTo(0,0);
  document.body.scrollTop = 0;
}

window.addEventListener('keyboardwillhide', this.keyboardwillhide)
```

## 아래에 방안들은 사용해 보지 않았습니다.

### 방안 2.

- transform: translateZ(0) or transform: translate3d(0,0,0);

### 방안 3.

- position: sticky

### 방안 4.

- Starting in iOS 8.0 and OS X 10.10, use WKWebView to add web content to your app. Do not use UIWebView or WebView.

## 참고

- [Fixed header disappear when scrolling down in webview in iOS 11](https://stackoverflow.com/questions/46400680/fixed-header-disappear-when-scrolling-down-in-webview-in-ios-11)
