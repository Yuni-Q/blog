---
title: kotlin is and as
date: 2020-02-07 09:02:84
category: kotlin
draft: false
---

```kotlin
var a = 10
var b = a as String
```

- 위와 같이 타입을 바꿀 때 as를 사용 가능

```kotlin
class Student extends Person {}
var a: Student = new Student();
if(a is Person)
```

- 위과 같이 사용할 땐 is를 사용
- 위의 is와 관련 된 문법엔 오류가 많다(자바랑 섞어 쓰기도 하고)
