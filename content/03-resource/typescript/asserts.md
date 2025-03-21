---
title: asserts
date: 2022-07-05 08:07:17
category: typescript
tags: []
draft: true
---

- 타입가드는 is를 사용할 수도 있지만, asserts 키워드와 함께 사용해서 에러를 throw하는 방식으로도 타입가드를 할 수 있습니다.

```ts
const assert = (v: unknown): v is string => {
    return typeof v === 'string'
}



const assert2 = (v: unknown): asserts v is string => {
    if(typeof v !== 'string') throw Error()
}


function fn(v: unknown){
	if(assert(v)) {
		console.log(v) // 여기서 v의 타입은 string이 된다
	}

	assert2(v) // 내부적으로 v가 string이 아니라면 throw Error가, string이라면 런타임에서 별 일 없지만, 이후에 v의 타입이 string이 된다
	console.log(v) 위에서 throw Error가 되지 않으면 v는 string
}
```
