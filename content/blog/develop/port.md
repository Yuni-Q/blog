---
title: port
date: 2020-05-14 14:05:47
category: develop
draft: false
---

## port 죽이기

```bash
$ lsof -nP -iTCP:3000 | grep LISTEN
node    70645    TCP *:3000 (LISTEN)

$ kill 70645
```
