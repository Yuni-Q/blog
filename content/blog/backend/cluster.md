---
title: cluster
date: 2020-08-27 00:08:70
category: backend
tags: ['javascript', 'cluster', 'backend']
draft: true
---

- 포트를 공유하는 노드 프로세스를 여러 개 둘 수 있습니다.
- 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산됩니다.
- 서버에 무리가 덜 갑니다.
- cluster로 코어 하나당 노드 프로세스 하나를 배정 가능합니다.(성능이 코어수만큼 늘어나지는 않습니다.)
- 메모리와 세션을 공유하지는 못합니다.(Redis 등 별로의 서버로 해결합니다.)

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	console.log(`마스터 프로세스 아이디: ${process.pid}`);
	// CPU 개수만큼 워커를 생산
	for (let i = 0; i < numCPUs; i += 1) {
		cluster.fork();
	}
	// 워커가 종료되었을 때
	cluster.on('exit', (worker, code, signal) => {
		console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
		console.log('code', code, 'signal', signal);
		cluster.fork();
	});
} else {
	http
		.createServer((req, res) => {
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
			res.write('<h1>Hello Node!</h1>');
			res.end('<p>Hello Cluster!</p>');
			// 워커 존재를 확인하기 위해 1초마다 강제 종료
			setTimeout(() => {
				process.exit(1);
			}, 1000);
		})
		.listen(8080);

	console.log(`${process.pid}번 워커 실행`);
}
```

## 참고

- [노드교과서 개정판 4-8. cluster](https://www.youtube.com/watch?v=oYBCs9YS5g0)
