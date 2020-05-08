---
title: async await 정리
date: 2020-05-03 17:05:87
category: 실용주의 프론트 엔드 개발
draft: false
---

## async 함수

- async 함수는 Promise를 반환합니다.
- 정상적인 동작으로 값을 반환하면 then에서 받을 수 있습니다.
- 비정상적인 동작으로 에러를 발생하면 catch에서 받을 수 있습니다.

### async에서 Promise 반환

- async 함수의 반환값으로 Promise를 사용하면 호출자에서는 async 함수 사용과 동일하게 사용됩니다. resolve 상태면 then으로 처리되고, reject 상태면 catch에서 처리됩니다.

### async에서 Promise 반환값의 throw

- async 반환되는 Promise의 내부에서 예외 상황이 발생했을 때는 async의 reject 상태가 됩니다.

### async await

- Promise를 반환하는 코드를 다수 기술이 필요할 경우 await를 사용하면 읽기 쉽게 기술이 가능합니다.
- await는 resolve 상태의 값은 좌항에 바인딩하고, reject 상태는 async의 catch로 전달됩니다.

### async await throw

- await를 사용된 함수에서 예외가 발생되면 catch로 전달됩니다.

### await 동기 코드 에러

- await에서 동기 코드에서 에러가 발생되면 catch로 전달됩니다.

## 참고

- [async await 정리](https://peter-cho.gitbook.io/book/10/async-await)
