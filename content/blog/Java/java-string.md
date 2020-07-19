---
title: Java String
date: 2020-02-05 09:02:29
category: java
draft: true
---

```java
String a = ‘one’;
String b = ‘one’;
a == b; // true
String c = ‘on’;
String d = c + ‘e’;
// String d = (c + ‘e’).intern();
a == d // false
String e = ‘on’ + ‘e’
a == e // true
```

- String a = “”로 생성하는건 String pool을 할당하는거고 내부적으로 intern()이라는 코드를 통해 상수풀에 값을 올립니다. 이미 존재하는 값이라면 값을 주소를 리턴하는 것을 보장합니다.
- “hello” + “world”와 같은 동작도 String pool을 할당받은 동작을 하는 것이기 때문에 a==e 는 true 입니다.
- “문자열” + 객체를 생성할경우 새로운 주소값을 생성하는거지만 intern() 키워드를 붙여 (“문자열 + 객체).intern() 일경우 상수풀에 올라가는거고 해당 상수풀에는 나중에 참조하는 객체가 사라지면 gc 대상이 됩니다.
