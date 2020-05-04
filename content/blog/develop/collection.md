---
title: Collection
date: 2020-04-14 14:04:83
category: develop
draft: false
---

## List

### ArrayList

- 배열로 구현된 List 입니다.
- 데이터가 저장된 순서가 같습니다.
- 사실상 배열과 같은 자료구조이기 때문에, 리스트의 연산 자체의 수행시간 속도는 배열과 같습니다.

### LinkedList

- 다음 노드의 주소를 기억하고 있는 List로, 배열에 비해 삽입과 삭제가 간단합니다.
- 그러나 탐색의 경우 첫 번째 노드부터 탐색해 나가야 하기 때문에 느립니다.

## Map

### HashMap

- 가장 일반적으로 사용하는 Map 입니다.
- HashTable을 사용합니다.
- Key값에 해시함수를 적용하여 나온 index에 Value를 저장하는 방식입니다.
- 중복성을 허용하지 않으며, 순서가 없습니다.

### TreeMap

- Red-Black Tree 자료구조를 이용한 Map 입니다.
- Tree 구조이기 때문에 어느 정도 순서를 보장합니다.

### LinkedHashMap

- LinkedList로 구현된 HashMap 입니다.
- List로 구현되어있기 때문에 순서가 보장됩니다. 하지만 LinkedList 특성상 랜덤 접근에서 느릴 수 있습니다.

## Set

### HashSet

- HashMap에서 Key값이 없는 자료형 입니다.
- 집합이라고 생각해도 무방합니다.
- 값이 포함되어 있는지 아닌지만 관심이 있습니다.
- 순서를 보장하지 않으며, 중복값을 허용하지 않습니다.
- Set중에는 가장 많이 사용된다.

### TreeSet

- Red-Black Tree 자료구조를 사용한 Set 입니다.

### LinkedHashSet

- LinkedList로 구현된 HashSet 입니다.
- 순서를 보장 합니다.

## Stack & Queue

### Stack

- 직접 new 연산자로 객체를 생성하여 사용 가능.

### Queue

- LinkedList 에 new 연산자로 객체를 생성함으로서 사용 가능합니다.

## 참고

- [기술면접 준비하기](https://velog.io/@hygoogi/%EA%B8%B0%EC%88%A0%EB%A9%B4%EC%A0%91-%EC%A4%80%EB%B9%84%ED%95%98%EA%B8%B0)
