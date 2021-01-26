import React, { useEffect } from "react";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  dt: number;
  color: string;
  ctx: CanvasRenderingContext2D
  constructor(ctx: CanvasRenderingContext2D) {
    this.x = Math.random() * WIDTH;
    this.y = Math.random() * HEIGHT;
    this.vx = this.sinRandom() * 30;
    this.vy = this.sinRandom() * 30;
    this.r = Math.abs(this.sinRandom() * 20) + 5;
    this.dt = 0.1;
    this.color = this.randomColor();
    this.ctx = ctx;
  }

  sinRandom() {
    return Math.random() * 2 - 1;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
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
    if (this.x > WIDTH) {
      this.x = WIDTH;
      this.vx *= -1;
    }
    if (this.y > HEIGHT) {
      this.y = HEIGHT;
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
  particles: Particle[] = [];
  pause: boolean;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.particles = [];
    this.pause = false;
    this.ctx = ctx;
  }

  addParticles(n) {
    for (let i = 0; i < n; i++) {
      const particle = new Particle(this.ctx);
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
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
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

const ParticleSystem = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, 400, 400);

    const app = new App(ctx);
    app.addParticles(100);
    app.loopDelegate();
  }, [])

  return (
    <></>
  );
};

export default ParticleSystem;