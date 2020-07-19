---
title: A + B
date: 2020-05-25 23:05:57
category: develop
draft: true
---

```javascript
const input = require('fs')
	.readFileSync('/dev/stdin')
	.toString()
	.split(' ');
console.log(parseInt(input[0]) + parseInt(input[1]));
```
