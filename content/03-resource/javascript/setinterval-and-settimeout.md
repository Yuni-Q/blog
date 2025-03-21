---
title: setInterval and setTimeout
date: 2020-03-25 02:03:87
category: javascript
draft: true
---

- setInterval(func, delay, ...args)와 setTimeout(func, delay, ...args) 2개의 메소드는 func을 delayms 이후에 주기적으로 혹은 한번 실행하도록 허용해줍니다.
- 실행을 취소하기 위해, 우리는 setInterval 또는 setTimeout에서 반환되는 값을 이용해 clearInterval 또는 clearTimeout을 호출해야 합니다.
- 중첩된 setTimeout 호출은 setInterval을 이용하는 것보다 더욱 유연합니다. 그리고 각 실행 사이에 최소한의 딜레이를 보장해줍니다.
- 타임아웃이 0인 스케쥴링 setTimeout(..., 0)는 "현재 코드가 끝난 이후에 바로 호출"을 스케쥴링하고 싶을 때 사용됩니다.
- setTimeout(..., 0)의 유즈케이스는 다음과 같습니다.
  - CPU가 많이 소모되는 작업들을 조각조각 나누기 위해, 스크립트는 더이상 그 작업에 매달려있지(hang) 않을 것입니다.
  - 프로세스가 진행되는 도중에 브라우저가 다른 것을 할 수 있도록 만들기 위해. (이를테면 progress bar의 진행)
- 모든 스케쥴링 메소드는 정확한 딜레이를 보장하지 못하는 것을 알아두세요. 스케쥴된 코드에서 그것에 의존하지 않는 편이 좋습니다.
  - 예를 들면, 브라우저 내부의 타이머는 많은 이유에 의해 지연될 수 있습니다.
    - CPU가 오버로드 됨
    - 브라우저 탭이 백그라운드 모드에 있음
    - 랩탑이 배터리를 사용 중임
    - 모든 것이 최소한의 타이머 딜레이를 300ms 심하면 1000ms까지 증가시킬 수 있습니다. 어떤 브라우저를 쓰는지와 셋팅에 따라 달라집니다.

## 참고

- [자바스크립트 개발자라면 알아야 할 33가지 개념 #10 스케쥴링: setTimeout 과 setInterval](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-10-%EC%8A%A4%EC%BC%80%EC%A5%B4%EB%A7%81-setTimeout-%EA%B3%BC-setInterval-y6juukjsey)
