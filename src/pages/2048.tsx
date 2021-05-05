import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  td {
    border: 10px solid #bbada0;
    width: 116px;
    height: 128px;
    font-size: 50px;
    font-weight: bold;
    text-align: center;
  }
`;
const Wrapper = styled.div`
  user-select: none;

  .color-2 {
    background-color: #eee4da;
    color: #776e65;
  }
  .color-4 {
    background-color: #eee1c9;
    color: #776e65;
  }
  .color-8 {
    background-color: #f3b27a;
    color: 'white';
  }
  .color-16 {
    background-color: #f69664;
    color: 'white';
  }
  .color-32 {
    background-color: #f77c5f;
    color: 'white';
  }
  .color-64 {
    background-color: #f75f3b;
    color: 'white';
  }
  .color-128 {
    background-color: #edd073;
    color: #776e65;
  }
  .color-256 {
    background-color: #edcc62;
    color: #776e65;
  }
  .color-512 {
    background-color: #edc950;
    color: #776e65;
  }
  .color-1024 {
    background-color: #edc53f;
    color: #776e65;
  }
  .color-2048 {
    background-color: #edc22e;
    color: #776e65;
  }
`;
const Game2048: React.VFC = () => {
  const [data, setData] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const add2 = useRef(false);
  const isEnd = useRef(false);
  const startCoords = useRef([0, 0]);
  const prevData = useRef<{ data: number[][]; score: number[] }>({
    data: [[]],
    score: [0, 0],
  });
  const put2ToRandomCell = useCallback(() => {
    const emptyCells = [];
    data.forEach((rowData, rowIndex) => {
      rowData.forEach((cellData, cellIndex) => {
        if (!cellData) {
          emptyCells.push([rowIndex, cellIndex]);
        }
      });
    });
    if (!emptyCells.length) {
      return;
    }
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    setData((data) => {
      const newData = [...data];
      newData[randomCell[0]][randomCell[1]] = 2;
      return newData;
    });
  }, [data]);
  const moveLeft = useCallback((data: number[][]) => {
    const newData: number[][] = [[], [], [], []];
    const tempData: number[][] = [[], [], [], []];
    let score = 0;
    data.forEach((rowData, rowIndex) => {
      rowData.forEach((cellData) => {
        if (cellData) {
          const currentRow = tempData[rowIndex];
          const prevData = currentRow[currentRow.length - 1];
          if (prevData === cellData) {
            currentRow[currentRow.length - 1] *= -2;
            score = score + Math.abs(currentRow[currentRow.length - 1]);
          } else {
            tempData[rowIndex].push(cellData);
          }
        }
      });
    });
    Array(4)
      .fill(0)
      .forEach((_, rowIndex) => {
        Array(4)
          .fill(0)
          .forEach((_, cellIndex) => {
            newData[rowIndex][cellIndex] =
              Math.abs(tempData[rowIndex][cellIndex]) || 0;
          });
      });
    return { newData, score };
  }, []);
  const moveRight = useCallback((data: number[][]) => {
    const newData: number[][] = [[], [], [], []];
    const tempData: number[][] = [[], [], [], []];
    let score = 0;
    data.forEach((rowData, rowIndex) => {
      rowData.forEach((_, cellIndex) => {
        if (rowData[3 - cellIndex]) {
          const currentRow = tempData[rowIndex];
          const prevData = currentRow[currentRow.length - 1];
          if (prevData === rowData[3 - cellIndex]) {
            currentRow[currentRow.length - 1] *= -2;
            score = score + Math.abs(currentRow[currentRow.length - 1]);
          } else {
            tempData[rowIndex].push(rowData[3 - cellIndex]);
          }
        }
      });
    });
    Array(4)
      .fill(0)
      .forEach((_, rowIndex) => {
        Array(4)
          .fill(0)
          .forEach((_, cellIndex) => {
            newData[rowIndex][3 - cellIndex] =
              Math.abs(tempData[rowIndex][cellIndex]) || 0;
          });
      });
    return { newData, score };
  }, []);
  const moveUp = useCallback((data: number[][]) => {
    const newData: number[][] = [[], [], [], []];
    const tempData: number[][] = [[], [], [], []];
    let score = 0;
    data.forEach((rowData) => {
      rowData.forEach((cellData, cellIndex) => {
        if (cellData) {
          const currentRow = tempData[cellIndex];
          const prevData = currentRow[currentRow.length - 1];
          if (prevData === cellData) {
            currentRow[currentRow.length - 1] *= -2;
            score = score + Math.abs(currentRow[currentRow.length - 1]);
          } else {
            tempData[cellIndex].push(cellData);
          }
        }
      });
    });
    Array(4)
      .fill(0)
      .forEach((_, rowIndex) => {
        Array(4)
          .fill(0)
          .forEach((_, cellIndex) => {
            newData[cellIndex][rowIndex] =
              Math.abs(tempData[rowIndex][cellIndex]) || 0;
          });
      });
    return { newData, score };
  }, []);
  const moveDown = useCallback((data: number[][]) => {
    const newData: number[][] = [[], [], [], []];
    const tempData: number[][] = [[], [], [], []];
    let score = 0;
    data.forEach((rowData, rowIndex) => {
      rowData.forEach((_, cellIndex) => {
        if (data[3 - rowIndex][cellIndex]) {
          const currentRow = tempData[cellIndex];
          const prevData = currentRow[currentRow.length - 1];
          if (prevData === data[3 - rowIndex][cellIndex]) {
            currentRow[currentRow.length - 1] *= -2;
            score = score + Math.abs(currentRow[currentRow.length - 1]);
          } else {
            tempData[cellIndex].push(data[3 - rowIndex][cellIndex]);
          }
        }
      });
    });
    Array(4)
      .fill(0)
      .forEach((_, rowIndex) => {
        Array(4)
          .fill(0)
          .forEach((_, cellIndex) => {
            newData[3 - cellIndex][rowIndex] =
              Math.abs(tempData[rowIndex][cellIndex]) || 0;
          });
      });
    return { newData, score };
  }, []);
  const moveCells = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      console.log(2222);
      if (!data?.[0]) {
        return data;
      }
      let result = { newData: data, score: 0 };
      switch (direction) {
        case 'left':
          result = moveLeft(data);
          break;
        case 'right':
          result = moveRight(data);
          break;
        case 'up':
          result = moveUp(data);
          break;
        case 'down':
          result = moveDown(data);
          break;
        default:
          result = { newData: data, score: 0 };
      }

      if (JSON.stringify(data) !== JSON.stringify(result.newData)) {
        prevData.current.data = data;
        add2.current = true;
        setScore((score) => score + result.score);
      }
      setData(result.newData);
    },
    [data],
  );

  const checkLoose = useCallback(() => {
    if (!data?.[0]) {
      return false;
    }
    let count = 0;
    if (JSON.stringify(data) === JSON.stringify(moveLeft(data).newData)) {
      count += 1;
    }
    if (JSON.stringify(data) === JSON.stringify(moveRight(data).newData)) {
      count += 1;
    }
    if (JSON.stringify(data) === JSON.stringify(moveUp(data).newData)) {
      count += 1;
    }
    if (JSON.stringify(data) === JSON.stringify(moveDown(data).newData)) {
      count += 1;
    }
    if (count >= 4) {
      return true;
    }
  }, [data]);

  const startGame = useCallback(() => {
    const newData = [
      new Array(4).fill(0),
      new Array(4).fill(0),
      new Array(4).fill(0),
      new Array(4).fill(0),
      // [1024, 2, 4, 2],
      // [2, 1024, 8, 4],
      // [1024, 2, 4, 2],
      // [2, 1024, 16, 32],
    ];
    setData(newData);
    add2.current = true;
  }, []);
  useEffect(() => {
    startGame();
  }, []);
  useEffect(() => {
    const keyDownEvent = (event) => {
      if (event.key === 'ArrowUp') {
        moveCells('up');
      }
      if (event.key === 'ArrowDown') {
        moveCells('down');
      }
      if (event.key === 'ArrowLeft') {
        moveCells('left');
      }
      if (event.key === 'ArrowRight') {
        moveCells('right');
      }
    };
    const mouseDownEvent = (event) => {
      startCoords.current = [event.clientX, event.clientY];
    };
    const mouseUpEvent = (event) => {
      const endCoords = [event.clientX, event.clientY];
      const diffX = endCoords[0] - startCoords.current[0];
      const diffY = endCoords[1] - startCoords.current[1];
      if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
        moveCells('left');
      }

      if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
        moveCells('right');
      }

      if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
        moveCells('down');
      }

      if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
        moveCells('up');
      }
    };
    window.addEventListener('keydown', keyDownEvent);
    window.addEventListener('mousedown', mouseDownEvent);
    window.addEventListener('mouseup', mouseUpEvent);
    return () => {
      window.removeEventListener('keydown', keyDownEvent);
      window.removeEventListener('mousedown', mouseDownEvent);
      window.removeEventListener('mouseup', mouseUpEvent);
    };
  }, [data]);

  useEffect(() => {
    if (
      data?.length > 3 &&
      !data.flat().every((d) => d === 0) &&
      checkLoose()
    ) {
      setTimeout(() => {
        alert('패배했습니다...');
      }, 500);
    }
    if (!isEnd.current && data.flat().includes(2048)) {
      isEnd.current = true;
      setTimeout(() => {
        alert('축하합니다. 2048을 만들었습니다.');
      }, 500);
    }
    if (data.length > 0 && add2.current) {
      put2ToRandomCell();
      add2.current = false;
    }
  }, [data]);
  useEffect(() => {
    if (score === prevData.current.score[1]) {
      prevData.current.score = [score, score];
    }
    prevData.current.score.unshift(score);
    prevData.current.score.length = 2;
  }, [score]);
  return (
    <Wrapper>
      <Table>
        <tbody>
          {data.map((tr, idx) => {
            return (
              <tr key={`${tr}-${idx}`}>
                {tr.map((td, idx) => {
                  return (
                    <td className={`color-${td}`} key={`${td}-${idx}`}>
                      {!!td && td}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div>
        <span>{score}</span>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setData(prevData.current.data);
            setScore(prevData.current.score[1]);
          }}
        >
          되돌리기
        </button>
      </div>
    </Wrapper>
  );
};

export default Game2048;
