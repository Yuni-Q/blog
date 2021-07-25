---
title: javascript call by reference가 존재하는가?
date: 2021-07-26 00:07:83
category: javascript
tags: []
draft: true
---

## Call by reference란 무엇인가?

### Call by reference를 알기 위해 평가 전략(컴퓨터 프로그래밍)을 먼저 보겠습니다.

- 평가 전략(Evaluation Strategy)은 프로그래밍 언어에서 함수 호출의 아규먼트(argument)의 순서를 언제 결정하고 함수에 어떤 종류의 값을 통과시킬지 결정하는 것입니다.
- 람다 대수에서 축소 전략(reduction strategy)과 유사하지만 다릅니다.
- 근래의 대부분의 프로그래밍 언어들은 값에 의한 호출(call-by-value)과 참조에 의한 전달(pass-by-reference)가 통합되고 있습니다.

### call-by-value에 대해서도 짚어보고 가겠습니다.

- 값이 넘어올 때 복사된 값이 넘어옵니다.
- caller(호출하는 녀석)가 인자를 복사해서 넘겨줬으므로 callee(호출당한 녀석)에서 해당 인자를 지지고 볶아도 caller는 영향을 받지 않습니다.
- 기본적으로 자바스크립트는 원시값을 arguments로 넘겨주면 call by value의 형태로 작동합니다.

### 이제 본격적으로 call by reference에 대해 알아보겠습니다.

- arguments로 `reference(값에 대한 참조 주소, 메모리 주소를 담고있는 변수)`를 넘겨줍니다.
- reference를 넘기다 보니 해당 reference가 가리기는 값을 복사하지는 않습니다.
- caller(호출하는 녀석)가 인자를 복사해서 넘기지 않았으므로 callee(호출당한 녀석)에서 해당 인자를 지지고 볶으면 caller는 영향을 받습니다.
- `자바스크립트는 참조 타입을 arguments로 넘겨주면 call by reference의 형태로 작동한다라고 오해를 많이합니다.`

## 자바스크립트에서 참조값을 넘기면 어떻게 되는가?

### call by sharing이란?

- 자바스크립트에서는 무조건 call by value로 작동합니다.
- 자바스크립트(자바, 루비, 파이썬 등등도 마찬가지)에서는 참조 타입을 인자로 넘기면 참조값에 대한 복사본을 만들어서 넘깁니다.
- C++을 배웠던 사람이라면 알고있던 call by value와는 다르단 느낌에 매우 혼동을 하게 됩니다. 따라서 이런 혼동을 줄이고자 call by sharing이 등장한 것 같습니다.

---

## 참고

- [(자알쓰) call by value vs call by reference](https://perfectacle.github.io/2017/10/30/js-014-call-by-value-vs-call-by-reference/)
- [평가 전략 (컴퓨터 프로그래밍)](<https://ko.wikipedia.org/wiki/%ED%8F%89%EA%B0%80_%EC%A0%84%EB%9E%B5_(%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)>)
