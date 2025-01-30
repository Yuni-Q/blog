import React, { useEffect, useRef, useState, MouseEvent } from 'react';

interface Size {
  width: number;
  height: number;
}

interface Rectangle extends Size {
  x: number;
  y: number;
}

interface BlurryArea extends Rectangle {
  blurryImage?: ImageData;
}

const MAX_CANVAS_WIDTH = 800;
const MAX_CANVAS_HEIGHT = 600;
const imageSource = '/favicon.png';

const RIGHT_ANGLE = 90;
const STRAIGHT_ANGLE = 180;
const COMPLETE_ANGLE = 360;

const BLUR_FILTER = 'blur(10px)';

const LEFT_CLICK = 1;

const INITIAL_AREA: BlurryArea = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const ImageEditor: React.FC = () => {
  const blurLayer = useRef<HTMLCanvasElement>(null);
  const imageLayer = useRef<HTMLCanvasElement>(null);
  const dragLayer = useRef<HTMLCanvasElement>(null);

  const [isRotationMode, setIsRotationMode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  const [isBlurMode, setIsBlurMode] = useState(false);
  const [blurryArea, setBlurryArea] = useState<BlurryArea>(INITIAL_AREA);
  const [blurryAreas, setBlurryAreas] = useState<BlurryArea[]>([]);

  useEffect(drawImageLayer, [imageSource, rotationAngle, blurryAreas]);
  useEffect(drawBlurLayer, [imageSource, rotationAngle]);
  useEffect(drawDragLayer, [imageSource, rotationAngle]);
  useEffect(drawDragArea, [blurryArea]);

  function drawImageLayer() {
    const canvas = imageLayer.current;
    if (canvas === null) return;

    const context = canvas.getContext('2d');
    const image = createImageElement(imageSource);
    image.onload = drawEditedImage;

    function drawEditedImage() {
      const { x, y, width, height } = locateImage(image, rotationAngle);
      const canvasSize = getRotatedCanvasSize({ width, height }, rotationAngle);
      resizeCanvas(canvas, canvasSize);
      context?.rotate((Math.PI / STRAIGHT_ANGLE) * rotationAngle);
      context?.drawImage(image, x, y, width, height);

      blurryAreas
        .filter(({ blurryImage }) => blurryImage !== undefined)
        .forEach(({ blurryImage, ...area }) => {
          const left = area.width > 0 ? area.x : area.x + area.width;
          const top = area.height > 0 ? area.y : area.y + area.height;
          context?.putImageData(blurryImage as ImageData, left, top);
        });

      context?.restore();
    }
  }

  function drawBlurLayer() {
    const canvas = blurLayer.current;
    if (canvas === null) return;

    const context = canvas.getContext('2d');
    const image = createImageElement(imageSource);
    image.onload = drawBlurImage;

    function drawBlurImage() {
      const { x, y, width, height } = locateImage(image, rotationAngle);
      const canvasSize = getRotatedCanvasSize({ width, height }, rotationAngle);
      resizeCanvas(canvas, canvasSize);
      context?.rotate((Math.PI / STRAIGHT_ANGLE) * rotationAngle);
      if (context) context.filter = BLUR_FILTER;
      context?.drawImage(image, x, y, width, height);
      context?.restore();
    }
  }

  function drawDragLayer() {
    const canvas = dragLayer.current;
    if (canvas === null) return;

    const image = createImageElement(imageSource);
    image.onload = fitCanvasToImage;

    function fitCanvasToImage() {
      const { width, height } = locateImage(image, rotationAngle);
      const canvasSize = getRotatedCanvasSize({ width, height }, rotationAngle);
      resizeCanvas(canvas, canvasSize);
    }
  }

  function drawDragArea() {
    const canvas = dragLayer.current;
    const context = canvas?.getContext('2d');
    if (canvas) context?.clearRect(0, 0, canvas.width, canvas.height);
    if (context) context.fillStyle = 'rgba(255, 255, 255, 0.2)';
    context?.fillRect(
      blurryArea.x,
      blurryArea.y,
      blurryArea.width,
      blurryArea.height,
    );
  }

  function handleMouseDown({
    buttons,
    clientX,
    clientY,
  }: MouseEvent<HTMLCanvasElement>) {
    console.log('handleMouseDown', { isBlurMode, buttons });

    if (!isBlurMode) return;
    if (buttons !== LEFT_CLICK) return;

    const canvasPosition =
      dragLayer.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
    setBlurryArea({
      ...INITIAL_AREA,
      x: clientX - canvasPosition.x,
      y: clientY - canvasPosition.y,
    });
  }

  function handleMouseMove({
    buttons,
    clientX,
    clientY,
  }: MouseEvent<HTMLCanvasElement>) {
    console.log('handleMouseMove', { isBlurMode, buttons });
    if (!isBlurMode) return;
    if (buttons !== LEFT_CLICK) return;

    const canvasPosition =
      dragLayer.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
    setBlurryArea((area) => ({
      ...area,
      width: clientX - area.x - canvasPosition.x,
      height: clientY - area.y - canvasPosition.y,
    }));
  }

  function handleMouseUp() {
    console.log('handleMouseUp', { isBlurMode });
    if (!isBlurMode) return;

    const canvas = blurLayer.current;
    const context = canvas?.getContext('2d');
    if (blurryArea.width !== 0 && blurryArea.height !== 0) {
      setBlurryAreas((areas) => [
        ...areas,
        {
          ...blurryArea,
          blurryImage: context?.getImageData(
            blurryArea.x,
            blurryArea.y,
            blurryArea.width,
            blurryArea.height,
          ),
        },
      ]);
    }
    setBlurryArea(INITIAL_AREA);
  }

  function handleMouseLeave({ buttons }: MouseEvent<HTMLCanvasElement>) {
    console.log('handleMouseLeave', { isBlurMode, buttons });

    if (buttons !== LEFT_CLICK) return;
    handleMouseUp();
  }

  function handleClear() {
    setBlurryAreas([]);
    setRotationAngle(0);
    setIsBlurMode(false);
    setIsRotationMode(false);
  }

  function handleRotate() {
    if (isRotationMode) {
      setRotationAngle(0);
    }
    setIsRotationMode((rotationMode) => !rotationMode);
  }
  function handleRotateRight() {
    setRotationAngle((angle) => (angle + RIGHT_ANGLE) % COMPLETE_ANGLE);
  }
  function handleRotateLeft() {
    setRotationAngle(
      (angle) => (angle + COMPLETE_ANGLE - RIGHT_ANGLE) % COMPLETE_ANGLE,
    );
  }
  function handleBlur() {
    if (isBlurMode) {
      setBlurryAreas([]);
    }
    setIsBlurMode((blurMode) => !blurMode);
  }

  function createImageElement(source: string) {
    const image = new Image();
    image.src = source;
    return image;
  }

  function resizeCanvas(
    canvas: HTMLCanvasElement | null,
    { width, height }: Size,
  ) {
    if (canvas === null) return;
    [canvas.width, canvas.height] = [width, height];
  }

  function getRotatedCanvasSize(
    { width, height }: Size,
    rotationAngle: number,
  ): Size {
    return {
      width: rotationAngle % STRAIGHT_ANGLE ? height : width,
      height: rotationAngle % STRAIGHT_ANGLE ? width : height,
    };
  }

  function locateImage(
    image: HTMLImageElement,
    rotationAngle: number,
  ): Rectangle {
    const canvasSize = getRotatedCanvasSize(
      { width: MAX_CANVAS_WIDTH, height: MAX_CANVAS_HEIGHT },
      rotationAngle,
    );
    const isLongerWidth =
      image.width > image.height + (canvasSize.width - canvasSize.height);

    const width = isLongerWidth
      ? canvasSize.width
      : (image.width * canvasSize.height) / image.height;
    const height = isLongerWidth
      ? (image.height * canvasSize.width) / image.width
      : canvasSize.height;
    const x = -Math.floor(rotationAngle / STRAIGHT_ANGLE) * width;
    const y =
      -Math.floor(
        ((rotationAngle + RIGHT_ANGLE) % COMPLETE_ANGLE) / STRAIGHT_ANGLE,
      ) * height;

    return { x, y, width, height };
  }

  return (
    <>
      <button
        style={{ color: isRotationMode ? 'blue' : 'black' }}
        onClick={handleRotate}
      >
        회전모드
      </button>
      {isRotationMode && (
        <>
          <button onClick={handleRotateRight}>오른쪽</button>
          <button onClick={handleRotateLeft}>왼쪽</button>
        </>
      )}
      <button
        style={{ color: isBlurMode ? 'blue' : 'black' }}
        onClick={handleBlur}
      >
        블러모드
      </button>
      <button onClick={handleClear}>지우기</button>
      <br />
      <>
        <canvas
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          ref={blurLayer}
        />
        <canvas
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          ref={imageLayer}
        />
        <canvas
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          ref={dragLayer}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
      </>
    </>
  );
};

export default ImageEditor;
