---
title: freeze
date: 2020-07-19 21:07:26
category: javascript
draft: false
---

- javascript에서 Object.freeze를 활용해여 배열의 값을 변경 못하게 할 수 있습니다.

## freeze

```javascript
const o1 = { name: 'kim', score: [1, 2] };
Object.freeze(o1);
Object.freeze(o1.score);
o1.name = 'lee';
o1.city = 'seoul';
o1.score.push(3); // Uncaught TypeError: Cannot add property 2, object is not extensible
```
