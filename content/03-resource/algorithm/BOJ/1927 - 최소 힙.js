// 문제 정의: 배열에 자연수 x를 넣는다. 배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.
// 입력 제한: N(1 ≤ N ≤ 100,000)
// 시간: 1 초 (추가 시간 없음)
// 메모리 제한: 128 MB

const input = ['9', '0', '12345678', '1', '2', '0', '0', '0', '0', '32'].map(
  (n) => Number(n),
);
class Heap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index) {
    return index * 2 + 1;
  }
  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  insert(number) {
    if (this.heap.length > 0) {
      this.heap.push(number);
      this.heapUp();
    } else {
      // heap에 담긴게 없다면 root 요소로써 넣는다.
      this.heap.push(number);
    }
  }

  peek() {
    // 가진게 없다면 0을 리턴
    if (this.heap.length === 0) {
      return 0;
      // 하나만 있다면 바로 리턴
    } else if (this.heap.length === 1) {
      return this.heap.pop();
    } else {
      let result = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapDown();

      return result;
    }
  }

  heapDown() {
    let index = 0;
    const count = this.heap.length;
    const rootNode = this.heap[0];

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const smaller =
        rightChildIndex < count &&
        this.heap[rightChildIndex] < this.heap[leftChildIndex]
          ? rightChildIndex
          : leftChildIndex;

      if (rootNode > this.heap[smaller]) {
        this.heap[index] = this.heap[smaller];
        index = smaller;
      } else break;
    }

    this.heap[index] = rootNode;
  }

  heapUp() {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];
    let parentIndex = this.getParentIndex(index);

    while (lastInsertedNode < this.heap[parentIndex]) {
      this.heap[index] = this.heap[parentIndex];
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }

    this.heap[index] = lastInsertedNode;
  }
}

function solution() {
  const numOfOperation = Number(input());
  const heap = new Heap();
  let result = [];

  for (let i = 0; i < numOfOperation; i++) {
    const currentOperation = Number(input().trim());

    if (currentOperation === 0) {
      result.push(heap.peek());
    } else {
      heap.insert(currentOperation);
    }
  }

  console.log(result.join('\n'));
}

solution();
