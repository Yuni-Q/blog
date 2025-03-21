---
title: Mutex vs Semaphore
date: 2021-10-30 12:10:11
category: develop
tags: []
draft: true
---

## 뮤텍스

- 여러 스레드를 사용하는 환경에서 자원에 대한 접근을 강제하기 위한 동기화 메커니즘입니다.
- Boolean 타입의 Lock 변수를 사용합니다.
- 공유자원을 사용중인 스레드가 있을 때, 다른 스레드가 공유자원에 접근한다면 Blocking 후 대기 큐로 보냅니다.
- Lock을 건 스레드만 Lock를 해제할 수 있습니다.

## 스핀락

- 기본적으로 뮤텍스와 유사합니다.
- Busy-waiting하며 대기 큐를 갖지 않습니다.
- Mutex-nonblocking 모델로 볼 수 있습니다.

## 세마포어

- 세마포어 변수를 통해 wait, signal을 관리합니다. 세마포어 변수는 0 이상의 정수형 변수를 가집니다.
- 계수 세마포어로 사용할 수 있으며, 접근 가능한 공유 자원의 수가 1개일 때는 이진 세마포어로 뮤텍스처럼 사용할 수 있습니다.
- Lock을 걸지 않은 스레드도 Signal을 보내 Lock을 해제할 수 있습니다.

---

## 참고

- [[10분 테코톡] 🎲 와일더의 Mutex vs Semaphore](https://www.youtube.com/watch?v=oazGbhBCOfU)
