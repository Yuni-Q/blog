---
title: never란
date: 2022-05-26 11:05:48
category: typescript
tags: []
draft: true
---

## never 타입은 어떻게 쓸까?

- 허용할 수 없는 함수 매개변수에 제한을 가한다(리턴 타입에 never를 넣는다고 제한을 할 수는 없는거 같다). never 타입을 이용해서 다양한 사용 사례에 놓인 함수에 제안을 걸 수 있다.
- 함수가 단 하나의 never 타입 인수만을 받을 수 있는 경우, (타입스크립트 컴파일러가 오류를 발생하지 않고는) 해당 함수를 never 타입 이외의 값으로 호출할 수 없다.

```ts
function fn(input: never) {}

// 오직 `never` 만 받는다.
declare let myNever: never
fn(myNever) // ✅

// 아무 값이나 전달하거나 아무 값도 전달하지 않으면 타입 에러 발생
fn() // ❌ 인자 'input'에 아무 값도 주어지지 않음
fn(1) // ❌ 'number' 타입은 'never' 타입에 할당할 수 없음
fn('foo') // ❌ 'string' 타입은 'never' 타입에 할당할 수 없음

// `any`도 통과할 수 없다.
declare let myAny: any
fn(myAny) // ❌ 'any' 타입은 'never' 타입에 할당할 수 없음
```

- [타입스크립트의 Never 타입 완벽 가이드](https://ui.toast.com/weekly-pick/ko_20220323)
