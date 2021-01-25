---
title: particle system
date: 2021-01-26 00:01:03
category: interaction
tags: []
draft: true
---

- [Seung Joon Choi](https://www.youtube.com/user/erucipe)님의 유투브 영상을 기반으로 class particle system 코드를 작성했습니다.

```js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.clearRect(0, 0, 400, 400);

class Particle {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.vx = this.sinRandom() * 30;
		this.vy = this.sinRandom() * 30;
		this.r = Math.abs(this.sinRandom() * 20) + 5;
		this.dt = 0.1;
		this.color = this.randomColor();
	}

	sinRandom() {
		return Math.random() * 2 - 1;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
	}

	update() {
		this.x += this.vx * this.dt;
		this.y += this.vy * this.dt;
		this.bound();
	}

	bound() {
		if (this.x < 0) {
			this.x = 0;
			this.vx *= -1;
		}
		if (this.y < 0) {
			this.y = 0;
			this.vy *= -1;
		}
		if (this.x > canvas.width) {
			this.x = canvas.width;
			this.vx *= -1;
		}
		if (this.y > canvas.height) {
			this.y = canvas.height;
			this.vy *= -1;
		}
	}

	randomColor() {
		return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
		return `hsl(${Math.floor(Math.random() * 100 + 100)}, 100%, 50%)`;
		return `hsla(${Math.floor(Math.random() * 100 + 100)}, 100%, 50%, 0.02)`;
	}
}

class App {
	constructor() {
		this.particles = [];
		this.pause = false;
	}

	addParticles(n) {
		for (let i = 0; i < n; i++) {
			const particle = new Particle();
			this.particles.push(particle);
		}
	}

	clearParticles() {
		this.particles = [];
	}

	loop() {
		if (!!this.pause) {
			return;
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.particles.forEach(particle => {
			this.interact(particle);
			particle.update();
			particle.draw();
		});
		this.loopDelegate();
	}

	loopDelegate() {
		const loop = this.loop.bind(this);
		requestAnimationFrame(loop);
	}

	interact(other) {
		this.particles.forEach(particle => {
			if (other !== particle) {
				const dx = other.x - particle.x;
				const dy = other.y - particle.y;
				const d = Math.sqrt(dx * dx + dy * dy);
				if (d > 0) {
					const R = other.r + particle.r;
					if (d < R) {
						const dR = R - d;
						const ux = dx / d;
						const uy = dy / d;
						other.vx += ux * dR * 0.1;
						other.vy += uy * dR * 0.1;
						particle.vx += -ux * dR * 0.1;
						particle.vy += -uy * dR * 0.1;
					}
				}
			}
		});
	}
}

const app = new App();
app.addParticles(100);
app.loopDelegate();
```

## 참고

- [HTML5 Canvas Tutorial : A Simple Particle System 1/2](https://www.youtube.com/watch?v=v8ikTvQWfoc)
- [HTML5 Canvas Tutorial : A Simple Particle System 2/2](https://www.youtube.com/watch?v=ql8JH2rD7C0)
