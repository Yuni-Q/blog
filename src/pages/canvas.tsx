import React, { useEffect } from 'react';

const Canvas: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 3;
    let dy = 3;
    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    const brickRowCount = 5;
    const brickColumnCount = 3;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;
    let score = 0;
    let lives = 3;
    let isWidth = false;
    let isHeight = false;

    const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 3 - c };
      }
    }

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    document.addEventListener('mousemove', mouseMoveHandler, false);

    function keyDownHandler(e) {
      if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
      } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
      } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
      }
    }

    function mouseMoveHandler(e) {
      const relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    }
    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            if (b.status > 0) {
              if (b.status === 1) {
                b.status = 0;
                score++;
                if (score == brickRowCount * brickColumnCount) {
                  alert('YOU WIN, CONGRATS!');
                  document.location.reload();
                }
              }
              if (isWidth && !isHeight) {
                if (Math.abs(b.y - y) > Math.abs(b.y + brickWidth - y)) {
                  console.log('1');
                  dx = -dx;
                } else {
                  console.log('2');
                  dx = -dx;
                }
              } else if (isHeight && !isWidth) {
                if (Math.abs(b.x - x) > Math.abs(b.x + brickWidth - x)) {
                  console.log('3');
                  dy = -dy;
                } else {
                  console.log('4');
                  dy = -dy;
                }
              }
              b.status -= 1;
              isWidth = false;
              isHeight = false;
            }
          } else {
            if (!isHeight && !isWidth) {
              if (x > b.x && x < b.x + brickWidth) {
                isWidth = true;
              } else if (y > b.y && y < b.y + brickHeight) {
                isHeight = true;
              }
            }
          }
        }
      }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();
    }
    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        paddleX,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight,
      );
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();
    }
    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status > 0) {
            const brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle =
              bricks[c][r].status === 3
                ? 'black'
                : bricks[c][r].status === 2
                ? 'red'
                : '#0095DD';
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }
    function drawScore() {
      ctx.font = '16px Arial';
      ctx.fillStyle = '#0095DD';
      ctx.fillText('Score: ' + score, 8, 20);
    }
    function drawLives() {
      ctx.font = '16px Arial';
      ctx.fillStyle = '#0095DD';
      ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          lives--;
          if (!lives) {
            alert('GAME OVER');
            document.location.reload();
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 3;
            dy = -3;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }

    draw();
  }, []);
  const a = (
    <div>
      <canvas id="myCanvas" width="480" height="320"></canvas>
    </div>
  );
  return a;
};

export default Canvas;
