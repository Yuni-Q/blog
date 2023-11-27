---
title: Boolean 함수
date: 2023-11-27 16:11:33
category: javascript
tags: []
draft: true
---

## Boolean(id) or !!id

- 가독성을 위해서 Boolean(id)를 사용한다.

## 모든 상황에서 행복했는가?

- 부정에서는 Boolean을 쓰지 않습니다.

```js
// AS-IS
if (!Boolean(id)) return null; // 린트가 수정합니다.
// TO-BE
if (!id) return null;
```

- Boolean(id) 뒤에 오는 id는 undefined를 없앨 수 없습니다.
  - 함수를 쓰면 값이 바뀔 수 있다는 전제 때문에 값을 확정할 수 없습니다.

```js
if (Boolean(id) && id > 0) return null; // id 은(는)  undefined 일 수 있습니다.
// TO-BE
if (id && id > 0) return null;
```

- 표현식 결과가 이미 부울로 강제 변환되는 if 문의 테스트와 같은 컨텍스트에서는 이중 부정(!!)을 통해 부울로 캐스팅하거나 부울 호출을 수행할 필요가 없습니다.

```js
// AS-IS
Boolean(id) ? 1 : 2; // 린트가 수정합니다.
// TO-Be
id ? 1 : 2;
```

## 규칙은 어떤가?

- Boolean도 싫고 !!도 싫어 룰
  - https://eslint.org/docs/latest/rules/no-extra-boolean-cast

## 부가적인 궁금증

- toString vs String
- parseInt vs Number
- !! vs Boolean
