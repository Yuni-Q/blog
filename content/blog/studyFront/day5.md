---
title: day5
date: 2020-07-14 23:07:19
category: studyFront
draft: false
---

## 캔버스를 활용한 눈알 굴리기

```html
<!DOCTYPE html>
<html lang="ko-KO">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Snow</title>
	</head>

	<body style="width: 100vw;height: 100vh;">
		<canvas id="canvas" width="1550" height="1306"></canvas>
		<script src="./index.js"></script>
	</body>
</html>
```

- Canvas API는 JavaScript와 HTML canvas 엘리먼트를 통해 그래픽을 그리기위한 수단을 제공합니다. 무엇보다도 애니메이션, 게임 그래픽, 데이터 시각화, 사진 조작 및 실시간 비디오 처리를 위해 사용됩니다.
- Canvas API는 주로 2D 그래픽에 중점을 두고 있습니다. WebGL API 또한 canvas 엘리먼트를 사용하며, 하드웨어 가속 2D 및 3D 그래픽을 그립니다.

```javascript
// document.getElementById() 메서드를 호출하여 <canvas> 요소를 표시할 DOM을 검색합니다.
const canvas = document.getElementById('canvas');
if (canvas.getContext) {
	// 요소가 있으면 getContext() 메서드를 사용하여 드로잉 컨텍스트에 액세스 할 수 있습니다.
	const ctx = canvas.getContext('2d');

	// 원 그리기
	function eye(cx, cy, width, height, ball) {
		const PI2 = Math.PI * 2;
		const ratio = height / width;
		const radius = Math.max(width, height) / 2;
		const increment = 1 / radius;

		ctx.beginPath();

		const x = cx + radius * Math.cos(0);
		const y = cy - ratio * radius * Math.sin(0);

		ctx.lineTo(x, y);

		for (let radians = increment; radians < PI2; radians += increment) {
			const dx = cx + radius * Math.cos(radians);
			const dy = cy - ratio * radius * Math.sin(radians);
			ctx.lineTo(dx, dy);
		}

		ctx.closePath();
		// 원 안을 채울 것인지 : 원만 그릴 것인지
		ball ? ctx.fill() : ctx.stroke();
	}

	// 눈 그리기
	function draw(x, y) {
		// 왼쪽 눈
		eye(
			document.body.clientWidth / 2 - 60,
			document.body.clientHeight / 2,
			100,
			100
		);
		// 오른쪽 눈
		eye(
			document.body.clientWidth / 2 + 60,
			document.body.clientHeight / 2,
			100,
			100
		);
		// 왼쪽 눈알
		eye(
			x ? x : document.body.clientWidth / 2 - 60,
			y ? y : document.body.clientHeight / 2,
			10,
			10,
			true
		);
		// 오른쪽 눈알
		eye(
			x ? x + 120 : document.body.clientWidth / 2 + 60,
			y ? y : document.body.clientHeight / 2,
			10,
			10,
			true
		);
	}

	// 위치 구하기
	function map(value, start1, stop1, start2, stop2) {
		return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
	}

	// 이벤트 함수
	function onMouseMove(event) {
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
		const x = map(
			event.clientX,
			0,
			document.body.clientWidth,
			document.body.clientWidth / 2 - 90,
			document.body.clientWidth / 2 - 30
		);
		const y = map(
			event.clientY,
			0,
			document.body.clientHeight,
			document.body.clientHeight / 2 - 20,
			document.body.clientHeight / 2 + 30
		);

		draw(x, y);
	}

	// addEventListener
	window.addEventListener('mousemove', onMouseMove);

	// 기본적인 눈 그리기
	draw();
}
```
