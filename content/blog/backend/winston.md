---
title: winston
date: 2020-09-29 22:09:91
category: backend
tags: ['javascript']
draft: true
---

## winston

- level은 로그의 심각도(error, warn, verbose, debug, silly 순, 중요도 순) 입니다.
- info를 고를 경우 info보다 심각한 단계 로그도 같이 기록됩니다.
- format은 로그의 형식(json, label, timestamp, printf, combine, simple 등을 지원합니다)
- 기본적으로 JSON으로 기록하지만 로그 시간을 표시하려면 timestamp를 쓰는 게 좋습니다.
- transports는 로그 저장 방식입니다.
- new transports.File은 파잉ㄹ로 저장한다는 뜻입니다. new transports.Console은 콘솔에 출력한다는 뜻입니다.
- 인자로 filename(파일명), level(삼각도)를 제공합니다.

```javascript
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
	level: 'info',
	format: format.json(),
	transports: [
		new transports.File({ filename: 'combinde.log' }),
		new transports.File({ filename: 'error.log', level: 'error' }),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;
```
