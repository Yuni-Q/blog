import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
} from 'react';

interface PostIt {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

const MemoCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [postIts, setPostIts] = useState<PostIt[]>([]);
  const [selectedPostIt, setSelectedPostIt] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRightClick, setIsRightClick] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext('2d');
    if (context === null) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = isDarkMode ? '#333' : '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    postIts.forEach((postIt, index) => {
      context.fillStyle = isDarkMode ? '#555' : '#ffeb3b';
      context.fillRect(postIt.x, postIt.y, postIt.width, postIt.height);
      context.strokeStyle = isDarkMode ? '#fff' : '#000';
      context.strokeRect(postIt.x, postIt.y, postIt.width, postIt.height);
      context.fillStyle = isDarkMode ? '#fff' : '#000';
      context.font = '16px Arial';
      context.fillText(
        postIt.text,
        postIt.x + 10,
        postIt.y + 20,
        postIt.width - 20,
      );
    });
  }, [postIts, isDarkMode]);

  function handleMouseDown(event: MouseEvent<HTMLCanvasElement>) {
    if (isEditing !== null) return;
    event.preventDefault();

    if (event.button === 2) {
      setIsRightClick(true);
    } else {
      setIsRightClick(false);
    }

    const canvas = canvasRef.current;
    if (canvas === null) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const postItIndex = postIts.findIndex(
      (postIt) =>
        x >= postIt.x &&
        x <= postIt.x + postIt.width &&
        y >= postIt.y &&
        y <= postIt.y + postIt.height,
    );

    if (postItIndex !== -1) {
      setSelectedPostIt(postItIndex);
      setOffset({
        x: x - postIts[postItIndex].x,
        y: y - postIts[postItIndex].y,
      });
      if (
        x >= postIts[postItIndex].x + postIts[postItIndex].width - 10 &&
        y >= postIts[postItIndex].y + postIts[postItIndex].height - 10
      ) {
        setIsResizing(true);
      }
    } else if (event.button === 2) {
      // 우클릭 시에만 포스트잇 생성
      const newPostIt: PostIt = {
        x,
        y,
        width: 100,
        height: 100,
        text: 'New Post-It',
      };
      setPostIts([...postIts, newPostIt]);
    }
  }

  function handleMouseMove(event: MouseEvent<HTMLCanvasElement>) {
    if (selectedPostIt === null || isRightClick || isEditing !== null) return;

    const canvas = canvasRef.current;
    if (canvas === null) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPostIts((prevPostIts) =>
      prevPostIts.map((postIt, index) =>
        index === selectedPostIt
          ? isResizing
            ? {
                ...postIt,
                width: Math.max(x - postIt.x, 10),
                height: Math.max(y - postIt.y, 10),
              }
            : { ...postIt, x: x - offset.x, y: y - offset.y }
          : postIt,
      ),
    );
  }

  function handleMouseUp() {
    setSelectedPostIt(null);
    setIsResizing(false);
    setIsRightClick(false);
  }

  function handleDoubleClick(event: MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const postItIndex = postIts.findIndex(
      (postIt) =>
        x >= postIt.x &&
        x <= postIt.x + postIt.width &&
        y >= postIt.y &&
        y <= postIt.y + postIt.height,
    );

    if (postItIndex !== -1) {
      setSelectedPostIt(postItIndex);
      setIsEditing(postItIndex);
    }
  }

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (isEditing === null) return;

    const newText = event.target.value;
    setPostIts((prevPostIts) =>
      prevPostIts.map((postIt, index) =>
        index === isEditing ? { ...postIt, text: newText } : postIt,
      ),
    );
  }

  function handleBlur() {
    setIsEditing(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Escape') {
      setIsEditing(null);
      setSelectedPostIt(null);
    }
  }

  function handleCanvasClick(event: MouseEvent<HTMLDivElement>) {
    if (isEditing !== null) {
      event.stopPropagation();
    }
  }

  function toggleDarkMode() {
    setIsDarkMode((prevMode) => !prevMode);
  }

  // console.log({ selectedPostIt });

  return (
    <div onClick={handleCanvasClick}>
      <nav
        style={{ background: isDarkMode ? '#333' : '#fff', padding: '10px' }}
      >
        <button onClick={toggleDarkMode}>
          {isDarkMode ? '라이트 모드' : '다크 모드'}
        </button>
      </nav>
      <canvas
        ref={canvasRef}
        width="800"
        height="600"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          border: '1px solid #000',
          background: isDarkMode ? '#333' : '#fff',
        }}
      ></canvas>
      {isEditing !== null && (
        <textarea
          value={postIts[isEditing].text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            position: 'absolute',
            left: postIts[isEditing].x + canvasRef.current?.offsetLeft,
            top: postIts[isEditing].y + canvasRef.current?.offsetTop,
            width: postIts[isEditing].width,
            height: postIts[isEditing].height,
            background: isDarkMode ? '#555' : '#ffeb3b',
            color: isDarkMode ? '#fff' : '#000',
            border: 'none',
            resize: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box',
            padding: '10px',
            font: '16px Arial',
          }}
        />
      )}
    </div>
  );
};

export default MemoCanvas;
