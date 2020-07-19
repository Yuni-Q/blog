---
title: Map, Filter, Reduce를 사용하는 이유
date: 2020-04-10 18:04:96
category: javascript
draft: true
---

- 바로 현재 값에 접근할 수 있습니다.(array[i]와 같은 형식으로 접근하려면 매우 불편하죠.)
- 기존 배열의 변화를 방지할 수 있기 때문입니다.(immutable) 그래서, side-effect를 최소화할 수 있습니다.
- for loop을 관리할 필요가 없습니다.
- 빈 배열을 만들고 거기에 push할 필요가 없습니다.

## 참조

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #19 자바스크립트 : Map, Reduce, Filter](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-19-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Map-Reduce-Filter-9ujvot0rm3)
