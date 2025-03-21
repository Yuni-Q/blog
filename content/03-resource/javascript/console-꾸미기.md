---
title: console 꾸미기
date: 2020-07-03 16:07:80
category: javascript
draft: true
---

## Colors reference

- Reset = "\x1b[0m"
- Bright = "\x1b[1m"
- Dim = "\x1b[2m"
- Underscore = "\x1b[4m"
- Blink = "\x1b[5m"
- Reverse = "\x1b[7m"
- Hidden = "\x1b[8m"
  <br />
- FgBlack = "\x1b[30m"
- FgRed = "\x1b[31m"
- FgGreen = "\x1b[32m"
- FgYellow = "\x1b[33m"
- FgBlue = "\x1b[34m"
- FgMagenta = "\x1b[35m"
- FgCyan = "\x1b[36m"
- FgWhite = "\x1b[37m"
  <br />
- BgBlack = "\x1b[40m"
- BgRed = "\x1b[41m"
- BgGreen = "\x1b[42m"
- BgYellow = "\x1b[43m"
- BgBlue = "\x1b[44m"
- BgMagenta = "\x1b[45m"
- BgCyan = "\x1b[46m"
- BgWhite = "\x1b[47m"

## 예시

```javascript
console.log('\x1b[36m%s\x1b[0m', 'I am cyan'); //cyan
console.log('\x1b[33m%s\x1b[0m', stringToMakeYellow); //yellow
```

- 색상 사용 후 Reset(\x1b[0m)을 통해 초기화 해주어야 합니다.
