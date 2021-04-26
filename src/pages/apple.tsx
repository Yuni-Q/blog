import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Body = styled.div`
  background: black;
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
`;

const Video = styled.video`
  transform: scale(1);
`;

const Apple: React.VFC = () => {
  const elemCanvas = useRef<HTMLCanvasElement>(null);
  const elemVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    let elemPhone;
    let windowWidth = 0;
    let windowHeight = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let scrollY = 0;
    let relativeScrollY = 0;
    let prevDurations = 0;
    let totalScrollHeight = 0;
    let currentKeyframe = 0;
    const phoneWidth = 1380;
    const phoneHeight = 3000;

    let pixelDuration = 0;
    const keyframes = [
      {
        animationValue: {
          videoScale: [1, 2],
          triangleMove: [0, 200],
          rectangleMove: [0, 500],
        },
      },
      {
        animationValue: {
          videoScale: [2, 0.3],
          triangleMove: [200, 1000],
          rectangleMove: [500, 500],
        },
      },
    ];
    const elemBody = document.body;
    const context = elemCanvas.current.getContext('2d');
    const resizeHandler = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
      totalScrollHeight = 0;
      pixelDuration = 0.5 * windowHeight;

      keyframes.forEach(() => {
        totalScrollHeight += windowHeight;
      });

      elemBody.style.height = `${totalScrollHeight}px`;
      elemCanvas.current.width = canvasWidth = windowWidth * 2;
      elemCanvas.current.height = canvasHeight = windowHeight * 2;
      elemCanvas.current.style.width = `${windowWidth}px`;
      elemCanvas.current.style.height = `${windowHeight}px`;
      render();
    };

    const calcAnimationValue = (values) => {
      return (
        (relativeScrollY / pixelDuration) * (values[1] - values[0]) + values[0]
      );
    };

    const drawCanvas = (
      videoScale = 1,
      triangleMove = 0,
      rectangleMove = 0,
    ) => {
      context.save();
      context.translate(
        (canvasWidth - phoneWidth * videoScale) * 0.5,
        (canvasHeight - phoneHeight * videoScale) * 0.5,
      );
      if (elemPhone) {
        context.drawImage(
          elemPhone,
          0,
          0,
          phoneWidth * videoScale,
          phoneHeight * videoScale,
        );
      }
      context.restore();

      context.fillStyle = 'black';

      // 위 삼각형
      context.beginPath();
      context.moveTo(canvasWidth * 0.5 - 1500, -triangleMove - 1700);
      context.lineTo(
        canvasWidth * 0.5,
        canvasHeight * 0.5 - 150 - triangleMove,
      );
      context.lineTo(canvasWidth * 0.5 + 1500, -triangleMove - 1700);
      context.lineTo(canvasWidth * 0.5 - 1500, -triangleMove - 1700);
      context.fill();
      context.closePath();

      // 아래 삼각형
      context.beginPath();
      context.moveTo(
        canvasWidth * 0.5 - 1500,
        canvasHeight + triangleMove + 1700,
      );
      context.lineTo(
        canvasWidth * 0.5,
        canvasHeight * 0.5 + 150 + triangleMove,
      );
      context.lineTo(
        canvasWidth * 0.5 + 1500,
        canvasHeight + triangleMove + 1700,
      );
      context.lineTo(
        canvasWidth * 0.5 - 1500,
        canvasHeight + triangleMove + 1700,
      );
      context.fill();
      context.closePath();

      // 왼쪽 삼각형
      context.beginPath();
      context.moveTo(canvasWidth * 0.5 - 1700 - triangleMove, -1700);
      context.lineTo(
        canvasWidth * 0.5 - 130 - triangleMove,
        canvasHeight * 0.5,
      );
      context.lineTo(
        canvasWidth * 0.5 - 1700 - triangleMove,
        canvasHeight + 1700,
      );
      context.lineTo(canvasWidth * 0.5 - 1700 - triangleMove, -1700);
      context.fill();
      context.closePath();

      // 오른쪽 삼각형
      context.beginPath();
      context.moveTo(canvasWidth * 0.5 + 1700 + triangleMove, -1700);
      context.lineTo(
        canvasWidth * 0.5 + 130 + triangleMove,
        canvasHeight * 0.5,
      );
      context.lineTo(
        canvasWidth * 0.5 + 1700 + triangleMove,
        canvasHeight + 1700,
      );
      context.lineTo(canvasWidth * 0.5 + 1700 + triangleMove, -1700);
      context.fill();
      context.closePath();

      // 박스 상, 하
      context.fillRect(
        0,
        canvasHeight * 0.5 - 2600 - rectangleMove,
        canvasWidth,
        2000,
      );
      context.fillRect(
        0,
        canvasHeight * 0.5 + 600 + rectangleMove,
        canvasWidth,
        2000,
      );
    };

    const render = () => {
      let videoScale;
      let triangleMove;
      let rectangleMove;

      if (keyframes[currentKeyframe]) {
        videoScale = calcAnimationValue(
          keyframes[currentKeyframe].animationValue.videoScale,
        );
        triangleMove = calcAnimationValue(
          keyframes[currentKeyframe].animationValue.triangleMove,
        );
        rectangleMove = calcAnimationValue(
          keyframes[currentKeyframe].animationValue.rectangleMove,
        );
      } else {
        return;
      }

      elemVideo.current.style.transform = `scale(${videoScale})`;
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      drawCanvas(videoScale, triangleMove, rectangleMove);
    };
    const scrollHandler = () => {
      scrollY = window.pageYOffset;

      if (scrollY < 0 || scrollY > totalScrollHeight - windowHeight) {
        return;
      }

      if (scrollY > pixelDuration + prevDurations) {
        prevDurations += pixelDuration;
        currentKeyframe++;
      } else if (scrollY < prevDurations) {
        prevDurations -= pixelDuration;
        currentKeyframe--;
      }

      relativeScrollY = scrollY - prevDurations;

      render();
    };
    const init = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      resizeHandler();
      render();

      window.addEventListener('resize', () => {
        requestAnimationFrame(resizeHandler);
      });
      window.addEventListener('scroll', () => {
        requestAnimationFrame(scrollHandler);
      });

      elemPhone = document.createElement('img');
      elemPhone.src = '/phone.png';
      elemPhone.addEventListener('load', function () {
        drawCanvas();
      });
    };

    init();
  }, []);
  return (
    <Body>
      <VideoWrapper>
        <Video
          ref={elemVideo}
          muted
          playsInline
          autoPlay
          loop
          src="https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/large_2x.mp4"
        />
        <Canvas ref={elemCanvas} />
      </VideoWrapper>
    </Body>
  );
};

export default Apple;
