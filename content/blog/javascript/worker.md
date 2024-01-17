---
title: worker
date: 2020-08-24 13:08:64
category: javascript
tags: ['javascript', 'thread', 'worker']
draft: true
---

## Web worker 란?

- 자바스크립트는 인프리터 언어이며 단일 스레드입니다.
- 자바스크립트에서 동적으로 UI변경 작업이 있을시에는 UI스레드라는 공간에서 큐 방식으로 처리 순서를 담아 놓습니다.
- HTML 페이지에서 스크립트를 실행할때 그 페이지는 스크립트가 완료할때 까지 응답하지 않게 됩니다. 이를 해결하기 위해 Web worker를 사용합니다. Web worker는 페이지의 퍼포먼스에 영향을 주지 않고 다른 스크립트와는 독립적으로 백그라운드에서 실행되는 javascript입니다.
- 기존의 웹은 다중 쓰레드가 불가능했기 때문에 작업이 끝나기 전까지 UI 멈춰버리는 경우가 발생했습니다. 하지만, Web worker 덕분에 웹은 멀티 쓰레드 구동이 가능해졌습니다. 즉, Web worker는 쓰레드라는 개념이라고 볼 수 있습니다.
- 웹 워커는 멀티스레드 기능을 지원하며 워커가 생성될 때마다 자바스크립트를 실행할 수 있는 고유 스레드를 생성하여 속도 성능을 크게 향상시킬 수 있습니다. 워커에서 실행할 수 있는 코드는 브라우저 UI에도, 다른 워커에서 실행하는 코드에도 영향을 주지 않습니다. 즉 독립적으로 실행되는 멀티스레드입니다.

## 케이스 1

```html
<script>
  var w;
  // 워커 시작
  function workerStart() {
    // chrome, IE10, 파이어폭스, 오페라, 사파리
    if (typeof Worker !== 'undefined') {
      // 브라우저가 워커 호환되는지 검사
      if (typeof w == 'undefined') {
        w = new Worker('worker.js'); // 워커 생성
      }
      w.onmessage = function (response) {
        // 워커는 onmessage라는 이벤트를 통해 데이터를 받습니다.
        document.getElementById('container').innerHTML = response.data;
      };
    } else {
      document.getElementById('container').innerHTML = 'Not Worker.';
    }
  }

  function workerEnd() {
    w.terminate();
    w = undefined;
  }
</script>
<div id="container"></div>
<button type="button" onClick="workerStart()">시작</button>
<button type="button" onClick="workerEnd()">종료</button>
```

```javascript
// worker.js
var updateTime = function () {
  postMessage(new Date().toLocalString()); // 현재시간 반환
  setTimeout('updateTime()', 1000);
};
updateTime();
```

- postMessage에 전달 될 수 있는 인자 타입 값은 String, Integer, Boolean, null, undefined, Object, Array 입니다.

## 케이스 2

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // 메인스레드
  const worker = new Worker(__filename);
  worker.on('message', (value) => console.log('워커로부터', value));
  worker.on('exit', () => console.log('워커 끝~'));
  worker.postMessage('ping');
} else {
  // 워커쓰레드
  parentPort.on('message', (value) => {
    console.log('부모로부터', value);
    parentPort.postMessage('pong');
    parentPort.close();
  });
}
```

```javascript
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

if (isMainThread) {
  // 메인스레드
  const threads = new Set();
  threads.add(
    new Worker(__filename, {
      workerData: { start: 1 },
    }),
  );
  threads.add(
    new Worker(__filename, {
      workerData: { start: 2 },
    }),
  );
  for (let worker of threads) {
    worker.on('message', (value) => console.log('워커로부터', value));
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log('워커 끝~');
      }
    });
    worker.postMessage('ping');
  }
} else {
  // 워커쓰레드
  const data = workerData;
  parentPort.postMessage(data.start + 100);
}
```

### 소수찾기

```javascript
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

const min = 2;
let primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  const end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

if (isMainThread) {
  // 메인스레드
  const max = 10_000_000;
  const threadCount = 8;
  const threads = new Set();
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  console.time('prime');
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start;
    threads.add(
      new Worker(__filename, {
        workerData: { start: wStart, range },
      }),
    );
    start += range;
  }
  threads.add(
    new Worker(__filename, {
      workerData: { start, range: range + ((max - min + 1) % threadCount) },
    }),
  );
  for (let worker of threads) {
    worker.on('error', (err) => {
      throw err;
    });
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd('prime');
        console.log(primes.length);
      }
    });
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
  }
} else {
  // 워커쓰레드
  findPrimes(workerData.start, workerData.range);
  parentPort.postMessage(prmies);
}
```

## 참고

- [[Javascript] 웹 워커(멀티스레드)](https://realmojo.tistory.com/109)
- [노드교과서 개정판 3-10. worker_threads](https://www.youtube.com/watch?v=Kq-6hGizSDs)
- [박스여우 - BoxFox](https://boxfoxs.tistory.com/294)
