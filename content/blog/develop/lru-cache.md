---
title: LRU Cache
date: 2020-08-27 09:08:87
category: develop
tags: ['LRU Cache']
draft: false
---

# Least Recently Used Cache

## 1. Cache 기본 개념

- 캐시는 데이터나 값을 미리 복사해 놓는 임시 장소를 가리킵니다.
- 캐시는 접근 시간에 비해 원래 데이터를 접근하는 시간이 오래 걸리는 경우나 값을 다시 계산하는 시간을 절약하고 싶은 경우 사용합니다.
- 캐시에 데이터를 미리 복사해 놓으면 계산이나 접근 시간 없이 더 빠른 속도로 데이터에 접근할 수 있습니다.

## 2. LRU Cache 기본 개념

- LRU는 OS의 페이지 교체 알고리즘의 하나로 최근에 가장 오랫동안 사용하지 않은 페이지를 교체하는 기법입니다.
- 캐시에 공간이 부족하면 가장 최근에 사용하지 않은 항목을 제거합니다.

## 3. LRU Cache 구현

- LRU Cache 구현은 Doubly Linked List를 통해 구현합니다. head에 가까운 데이터일수록 최근에 사용한 데이터이고, tail에 가까울수록 가장 오랫동안 사용하지 않은 데이터로 간주하여 새로운 데이터를 삽입할 때 가장 먼저 삭제되도록 합니다.
- 삽입된 데이터를 사용하게 되면 head로 옮겨 우선순위를 높이게 되고, 삭제될 우선순위에서 멀어지게 됩니다.

### 3.1 클래스 작성

```javascript
// 노드 클래스
class Node {
	id;
	data;
	prevNode;
	nextNode;
	constructor(id, data) {
		this.id = id;
		this.data = data;
	}
	setNextNode(node) {
		this.nextNode = node;
	}
	getNextNode(node) {
		return this.nextNode;
	}
	setPrevNode(node) {
		this.prevNode = node;
	}
	getPrevNode(node) {
		return this.prevNode;
	}
	getId() {
		return this.id;
	}
}

// 이중연결리스트 클래스
class DoublyLikedList {
	headNode;
	tailNode;
	getHeadNode() {
		return this.headNode;
	}
	setHeadNode(headNode) {
		this.headNode = headNode;
	}
	getTaildNode() {
		return this.taildNode;
	}
	setTaildNode(taildNode) {
		this.taildNode = taildNode;
	}
}

// 캐시 크기를 상수로 선언한 클래스
class Constans {
	static CAPACITY = 4;
}

// LRU 캐시 클래스
class LRUCache {
	actualSize;
	map;
	linkedList;
	constructor() {
		this.map = new Map();
		this.linkedList = new DoublyLikedList();
		this.actualSize = 0;
	}

	// 삽입
	put(id, data) {
		// 기존 노드 업데이트
		if (this.map.has(id)) {
			const node = this.map.get(id);
			node = {
				...node,
				data,
			};
			this.update(node);
			return;
		}
		// 새 노드 생성
		const newNode = new Node(id, data);

		// 지정되 저장공간보다 실제 사이즈가 작으면 그대로 삽입 수행
		if (this.actualSize < Constans.CAPACITY) {
			this.actualSize += 1;
			this.add(newNode);
		} else {
			// 지정된 저장공간보다 실제 사이즈가 크거나 같으면 마지막 노드를 제거하고 삽입 수행
			console.log('cache is full... remove tail');
			this.removeTail(); // 마지막 노드 제거
			this.add(newNode); // 삽입
		}
	}

	// 노드 삽입 처리
	add(newNode) {
		// 새 노드의 다음노드를 기존의 head 노드로 세팅 : 새노드 -> head 노드
		newNode.setNextNode(this.linkedList.getHeadNode());
		newNode.setPrevNode(null);

		// 기존의 head 노드의 이전노드를 새 노드로 세팅 : 새노드 <- head
		if (!!this.linkedList.getHeadNode()) {
			this.linkedList.getHeadNode().setPrevNode(newNode);
		}

		// 새 노드를 head 노드로 세팅 : head 노드 = 새 노드\
		this.linkedList.setHeadNode(newNode);

		// tail 노드가 없으면(즉, 첫번째로 삽입되는 노드) tail 노드를 새 노드로 세팅
		if (!this.linkedList.getTaildNode()) {
			this.linkedList.setTaildNode(newNode);
		}

		// map에 저장
		this.map.set(newNode.getId(), newNode);
	}

	// 연결리스트 변경
	update(node) {
		const prevNode = node.getPrevNode();
		const nextNode = node.getNextNode();

		// head 노드가 아니(middle 노드인 경우)
		if (!!prevNode) {
			// 이전 노드 -> 노드 -> 다음노드
			// 이전노드 ---------> 다음노드
			prevNode.setNextNode(nextNode);
		} else {
			// head 노드인 경우
			// 노드(head) ->
			this.linkedList.setHeadNode(nextNode);
		}

		// tail 노드가 아니면(middle 노드인 경우)
		if (!!nextNode) {
			// 이전노드 <- 노드 <- 다음노드
			// 이전노드 <-------- 다음노드
			nextNode.setPrevNode(prevNode);
		} else {
			// tail 노드인 경우
			// 이전 노드 -> 노드(tail)
			// -> 이전 노드(taill)
			this.linkedList.setTaildNode(prevNode);
		}

		// 노드를 새로 삽입하여 head노드로 변경
		this.add(node);
	}

	// tail 노드 삭제
	removeTail() {
		// tail 노드의 이전 노드를 tail 노드로 변경
		// 이전 노드 -> tail 노드
		// 이전 노드(tail)
		this.linkedList.setTaildNode(this.linkedList.getTaildNode().getPrevNode());

		// 기존의 tail 노드를 null로 변경
		if (!!this.linkedList.getTaildNode()) {
			this.linkedList.getTaildNode().setNextNode(null);
		}

		const id = this.linkedList.getTaildNode().getId();
		this.map.delete(id); // 추출한 기존의 tail 노드를 null로 초기화
	}

	// 특정 노드반환 + 반환된 노드를 head 노드로 변경
	get(id) {
		// id에 대응되는 키값이 map에 존재하지 않으면 null 반환
		if (!this.map.has(id)) {
			return null;
		}

		// id값에 해당하는 노드 추출
		const node = this.map.get(id);

		// 추출한 노드를 head 노드로 변경
		this.update(node);
		return node;
	}

	show() {
		let actualNode = this.linkedList.getHeadNode();
		let text = '';
		while (!!actualNode) {
			text += `${actualNode.id} - ${actualNode.data} <--> `;
			actualNode = actualNode.getNextNode();
		}
		console.log(text);
	}
}

function App() {
	const cache = new LRUCache();

	cache.put(0, 'A');
	cache.show(); // 0 - A <-->

	cache.put(1, 'B');
	cache.show(); // 1 - B <--> 0 - A <-->

	cache.put(2, 'C');
	cache.show(); // 2 - C <--> 1 - B <--> 0 - A <-->

	cache.put(3, 'D');
	cache.show(); // 3 - D <--> 2 - C <--> 1 - B <--> 0 - A <-->

	cache.put(4, 'E'); // cache is full... remove tail
	cache.show(); // 4 - E <--> 3 - D <--> 2 - C <--> 1 - B <-->

	cache.put(5, 'F'); // cache is full... remove tail
	cache.show(); // 5 - F <--> 4 - E <--> 3 - D <--> 2 - C <-->

	cache.put(6, 'G'); // cache is full... remove tail
	cache.show(); // 0 - A <--> // 6 - G <--> 5 - F <--> 4 - E <--> 3 - D <-->

	console.log(cache.get(6));
	/**
	 * Node {
	 * 	id: 6,
	 *	data: 'G',
	 *	prevNode: null,
	 *	nextNode: Node {
	 *	  id: 5,
	 *	  data: 'F',
	 *	  prevNode: [Circular],
	 *	  nextNode: Node { id: 4, data: 'E', prevNode: [Circular], nextNode: [Node] }
	 *	}
	 *
	 */
	cache.show(); // 6 - G <--> 5 - F <--> 4 - E <--> 3 - D <-->

	console.log(cache.get(3));
	/**
	 * Node {
	 * 	id: 3,
	 * 	data: 'D',
	 * 	prevNode: null,
	 * 	nextNode: Node {
	 * 	  id: 6,
	 * 	  data: 'G',
	 * 	  prevNode: [Circular],
	 * 	  nextNode: Node { id: 5, data: 'F', prevNode: [Circular], nextNode: [Node] }
	 * 	}
	 * }
	 */
	cache.show(); // 3 - D <--> 6 - G <--> 5 - F <--> 4 - E <-->

	console.log(cache.get(4));
	/**
	 * Node {
	 * 	id: 4,
	 * 	data: 'E',
	 * 	prevNode: null,
	 * 	nextNode: Node {cd
	 * 	  id: 3,
	 * 	  data: 'D',
	 * 	  prevNode: [Circular],
	 * 	  nextNode: Node { id: 6, data: 'G', prevNode: [Circular], nextNode: [Node] }
	 * 	}
	 * }
	 */
	cache.show(); // 4 - E <--> 3 - D <--> 6 - G <--> 5 - F <-->

	console.log(cache.get(1)); // null
	cache.show(); // 4 - E <--> 3 - D <--> 6 - G <--> 5 - F <-->
}

App();
```

## 참고

- [LRU Cache](https://doublesprogramming.tistory.com/254)
