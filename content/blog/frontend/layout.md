---
title: layout
date: 2020-08-13 09:08:59
category: frontend
tags: ['layout', html']
draft: true
---

## 레이아웃 설정 하는 방법

### 1. float + postion

- float는 center가 존재하지 않습니다(left, right만 존재합니다.).
- postion

  - static : 기본
  - relative : 상대 위치(자신의 원래 위치 기준, 따라서 전체적인 레이아웃이 깨지지 않습니다.)
  - absolute : 붕 뜨기 때문에 전체적인 레이아웃에 영향이 갑니다(상위요소가 모두 static이면 body 요소가 기준이 됩니다.). center를 원할 경우 transform: translateX(-50%)을 사용합니다. inline 요소도 absolute를 적용하게 되면 block으로 변경됩니다.
  - fixed : 위치가 절대적으로 고정됩니다.
  - sticky : relative처럼 행동 하다가 범위를 벗어나면 fixed처럼 움직입니다. 다음 sticky가 오면 위로 밀려납니다.

## 2. display: flex

## 3. display: grid

## 4. display: inline-block

- div 사이 공백 제거해야 합니다(font-size를 0으로).
- inline 요소지만 width와 height를 지정할 수 있습니다.

## 5. 글을 이미지로 대체

- padding으로 밀어냅니다.
- after에 이미지를 넣어서 덮습니다.
