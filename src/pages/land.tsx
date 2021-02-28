import React, { useEffect } from 'react';
import styled from 'styled-components';

class Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  cm: CM;

  constructor(x: number, y: number, cm: CM) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() + 0.5;
    this.speed = Math.random() * 3 + 0.5;
    this.cm = cm;
  }

  draw() {
    this.cm.context.beginPath();
    this.cm.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.cm.context.fill();
  }
}

class Line {
  x: number;
  y: number;
  cm: CM;
  particles: Particle[];
  height: number;
  gradient: CanvasGradient;

  constructor(x: number, y: number, cm: CM, index: number) {
    this.x = x;
    this.y = y;
    this.height = 300;

    const gradientStartY =
      cm.canvasHeight - (this.height + (cm.canvasHeight - this.y));
    this.gradient = cm.context.createLinearGradient(
      0,
      gradientStartY,
      0,
      this.y,
    );
    this.gradient.addColorStop(0, `rgba(${cm.colors2[index]}, 0)`);
    this.gradient.addColorStop(0.5, `rgba(${cm.colors2[index]}, 0.5)`);
    this.gradient.addColorStop(0.75, `rgba(${cm.colors2[index]}, 0.5)`);
    this.gradient.addColorStop(1, `rgba(${cm.colors2[index]}, 1)`);

    const numberOfParticles = 30;
    this.particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
      this.particles.push(new Particle(this.x, this.y, cm));
    }
    this.cm = cm;
  }

  draw() {
    this.cm.context.strokeStyle = this.gradient;
    this.cm.context.beginPath();
    this.cm.context.moveTo(this.x, this.y);
    this.cm.context.lineTo(this.x, this.y - this.height);
    this.cm.context.stroke();

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.y -= particle.speed;
      if (particle.y < this.y - this.height) {
        particle.y = this.y;
      }
      particle.draw();
    }
  }
}

class Light {
  x: number;
  y: number;
  width: number;
  height: number;
  lines: Line[];
  gradient: CanvasGradient;
  cm: CM;
  angle: number;
  yForOrder: number;

  constructor(x: number, y: number, cm: CM, index: number) {
    this.x = x;
    this.y = y;
    this.yForOrder = this.y;
    this.width = 20;
    this.height = 300;
    this.angle = 0;

    const numberOfParticles = 5;
    this.lines = [];
    for (let i = 0; i < numberOfParticles; i++) {
      this.lines.push(
        new Line(
          this.x + (Math.random() * this.width - this.width * 0.5),
          this.y,
          cm,
          index,
        ),
      );
    }
    this.gradient = cm.context.createLinearGradient(
      0,
      cm.canvasHeight - (this.height + (cm.canvasHeight - this.y)),
      0,
      this.y,
    );
    this.gradient.addColorStop(0, `rgba(${cm.colors[index]}, 0)`);
    this.gradient.addColorStop(0.5, `rgba(${cm.colors[index]}, 0.5)`);
    this.gradient.addColorStop(0.75, `rgba(${cm.colors[index]}, 0.5)`);
    this.gradient.addColorStop(1, `rgba(${cm.colors[index]}, 1)`);
    this.cm = cm;
  }

  draw() {
    this.cm.context.fillStyle = this.gradient;

    this.cm.context.save();
    this.cm.context.filter = 'blur(20px)';

    this.cm.context.beginPath();
    this.cm.context.ellipse(
      this.x,
      this.y,
      this.width * 2 +
        Math.abs(Math.sin(((this.angle * Math.PI) / 180) * 30)) * 5,
      this.width * 0.5 +
        Math.abs(Math.sin(((this.angle * Math.PI) / 180) * 30)) * 5,
      0,
      0,
      Math.PI * 2,
    );
    this.cm.context.fill();
    this.angle++;

    this.cm.context.filter = 'blur(5px)';
    this.cm.context.beginPath();
    this.cm.context.ellipse(
      this.x,
      this.y,
      this.width,
      this.width * 0.25,
      0,
      0,
      Math.PI * 2,
    );
    this.cm.context.fill();

    this.cm.context.fillRect(
      this.x - this.width * 0.5,
      this.cm.canvasHeight - (this.height + (this.cm.canvasHeight - this.y)),
      this.width,
      this.height,
    );

    this.cm.context.restore();

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      line.draw();
    }
  }
}

const Canvas = styled.canvas`
  background: url(/images/BG-city.jpg) no-repeat center / cover;
`;

interface CM {
  canvas: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  canvasWidth: number;
  canvasHeight: number;
  colors: string[];
  colors2: string[];
  charactersSrc: {
    somun: string;
    ji: string;
  };
  playedFrame: number;
  currentFrame: number;
}

const Land = () => {
  const cm: CM = {
    canvas: undefined,
    context: undefined,
    canvasWidth: 0,
    canvasHeight: 0,
    colors: [
      '222, 35, 18', // red
      '238, 150, 63', // orange
      '246, 228, 0', // yellow
      '110, 210, 70', // green
      '63, 145, 255', // blue
      '185, 22, 226', // purple
    ],
    colors2: [
      '255, 160, 150', // red
      '255, 200, 150', // orange
      '255, 250, 180', // yellow
      '195, 255, 170', // green
      '200, 220, 255', // blue
      '239, 173, 225', // purple
    ],
    charactersSrc: {
      somun: '/images/sprite-somun.png',
      ji: '/images/sprite-ji.png',
    },
    playedFrame: 0,
    currentFrame: 0,
  };
  useEffect(() => {
    cm.canvas = document.querySelector('#the-canvas');
    cm.context = cm.canvas.getContext('2d');
    const dpr = window.devicePixelRatio > 1 ? 1 : 1;
    const mouse = { x: 0, y: 0 };
    const lights: Light[] = [];
    const characters: Character[] = [];
    const allItems: any[] = [];
    let indexOfLight = 0;

    const setSize = () => {
      console.log(window.innerWidth, window.innerHeight);
      cm.canvasWidth = window.innerWidth;
      cm.canvasHeight = window.innerHeight;
      cm.canvas.width = cm.canvasWidth * dpr;
      cm.canvas.height = cm.canvasHeight * dpr;
      if (dpr > 1) {
        cm.context.scale(dpr, dpr);
      }
    };

    const setCharacters = () => {
      const somun = new Character(
        cm.charactersSrc.somun,
        'underAttack',
        cm.canvasWidth * 0.5 - 256 + 64,
        cm.canvasHeight * 0.5 - 64,
        cm,
      );
      const ji = new Character(
        cm.charactersSrc.ji,
        'attack',
        cm.canvasWidth * 0.5 - 64,
        cm.canvasHeight * 0.5 - 64,
        cm,
      );

      characters.push(somun);
      characters.push(ji);

      characters.forEach((character) => allItems.push(character));
    };

    const draw = () => {
      cm.context.clearRect(0, 0, cm.canvas.width, cm.canvas.height);
      allItems.forEach((item) => {
        if (item instanceof Character) {
          item.draw();
        }
        if (item instanceof Light) {
          const scaleRatio = item.y / cm.canvasHeight + 1;
          cm.context.save();
          cm.context.translate(item.x, item.y);
          cm.context.scale(scaleRatio, scaleRatio);
          cm.context.translate(-item.x, -item.y);
          item.draw();
          cm.context.restore();
        }
      });

      cm.playedFrame++;
      if (cm.playedFrame % 20 === 0) {
        if (cm.playedFrame > 10000000000) {
          cm.playedFrame = 0;
        }
        if (cm.currentFrame === 0) {
          cm.currentFrame = 1;
        } else {
          cm.currentFrame = 0;
        }
      }
      requestAnimationFrame(draw);
    };

    const setup = () => {
      setSize();
      if (characters.length < 2) {
        setCharacters();
      }
      draw();
    };

    const click = (e: MouseEvent) => {
      if (indexOfLight >= cm.colors.length) {
        return;
      }
      // mouse.x = e.layerX;
      // mouse.y = e.layerY;
      mouse.x = e.clientX - cm.canvas.getBoundingClientRect().left;
      mouse.y = e.clientY - cm.canvas.getBoundingClientRect().top;

      const light = new Light(mouse.x, mouse.y, cm, indexOfLight);
      lights.push(light);
      allItems.push(light);
      allItems.sort((a, b) => {
        return a.yForOrder - b.yForOrder;
      });
      indexOfLight++;

      if (indexOfLight >= cm.colors.length) {
        characters[0].updateAction('attack');
        characters[1].updateAction('underAttack');
      }
    };

    cm.canvas.addEventListener('click', click);

    window.addEventListener('resize', setup);
    window.addEventListener('load', setup);
    setup();
    return () => {
      window.removeEventListener('click', click);
      window.removeEventListener('resize', setup);
      window.removeEventListener('load', setup);
    };
  }, []);

  return <Canvas id="the-canvas"></Canvas>;
};

export default Land;

type Action = 'attack' | 'underAttack';

class Character {
  width: number;
  height: number;
  x: number;
  y: number;
  yForOrder: number;
  action: Action;
  image: HTMLImageElement;
  startFrame: number;
  endFrame: number;
  frame: number;
  cm: CM;

  constructor(imageSrc, action, x, y, cm: CM) {
    this.width = 256;
    this.height = 256;
    this.x = x;
    this.y = y;
    this.yForOrder = this.y + this.height - 24;
    this.action = action;
    this.image = new Image();
    this.image.src = imageSrc;
    this.setAction();
    this.cm = cm;
  }

  setAction() {
    switch (this.action) {
      case 'attack':
        this.startFrame = 0;
        this.endFrame = 1;
        return;
      case 'underAttack':
        this.startFrame = 2;
        this.endFrame = 3;
        return;
      default:
        this.startFrame = 0;
        this.endFrame = 0;
    }
    this.frame = this.startFrame;
  }

  updateAction(action: Action) {
    this.action = action;
    this.setAction();
  }

  draw() {
    if (this.cm.playedFrame % 20 === 0) {
      if (this.cm.currentFrame === 0) {
        this.frame = this.endFrame;
      } else {
        this.frame = this.startFrame;
      }
    }

    this.cm.context.drawImage(
      this.image,
      this.frame * 256,
      0,
      256,
      256,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
