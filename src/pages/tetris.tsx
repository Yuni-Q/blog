import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
const Table = styled.table`
  width: auto !important;
  border-collapse: collapse !important;
  td {
    border: 1px solid black;
    width: 30px;
    height: 30px;
    padding: 0;
  }
`;

const blocks = [
  {
    name: 's', // 네모
    center: false,
    numCode: 1,
    color: 'red',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ],
    ],
  },
  {
    name: 't', // T자
    center: true,
    numCode: 2,
    color: 'orange',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: 'z', // 지그재그
    center: true,
    numCode: 3,
    color: 'yellow',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: 'zr', // 반대 지그재그
    center: true,
    numCode: 4,
    color: 'green',
    startRow: 1,
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ],
  },
  {
    name: 'l', // L자
    center: true,
    numCode: 5,
    color: 'blue',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ],
  },
  {
    name: 'lr', // 반대 L자
    center: true,
    numCode: 6,
    color: 'navy',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: 'b', // 1자
    center: true,
    numCode: 7,
    color: 'violet',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ],
  },
];

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];

const isActiveBlock = (value) => value > 0 && value < 10;
const isInvalidBlock = (value) => value === undefined || value >= 10;

const Tetris: React.VFC = () => {
  const [tetrisData, setTetrisData] = useState(
    Array(20)
      .fill([])
      .map((d) => Array(10).fill(0)),
  );
  const [nextTable, setNextTable] = useState(
    Array(4)
      .fill([])
      .map((d) => Array(4).fill(0)),
  );
  const [score, setScore] = useState(0);
  const currentBlock = useRef(null);
  const nextBlock = useRef(null);
  const stopDown = useRef(true);
  const intervalId = useRef(null);
  const currentTopLeft = useRef([0, 3]);
  function generate() {
    // 테트리스 블록 생성
    if (!nextBlock.current) {
      nextBlock.current = blocks[Math.floor(Math.random() * blocks.length)];
    }
    if (!currentBlock.current) {
      currentBlock.current = blocks[Math.floor(Math.random() * blocks.length)];
    } else {
      currentBlock.current = nextBlock.current;
      nextBlock.current = blocks[Math.floor(Math.random() * blocks.length)];
    }
    currentTopLeft.current = [-1, 3];
    currentBlock.current.shape[0].slice(1).forEach((col, i) => {
      // 게임 오버 판단
      col.forEach((row, j) => {
        if (row && tetrisData[i][j + 3]) {
          clearInterval(intervalId.current);
          alert('게임오버');
        }
      });
    });
    setTetrisData((tetrisData) => {
      const newTetrisData = [...tetrisData.map((t) => [...t])];
      if (currentBlock?.current?.shape) {
        currentBlock.current.shape[0].slice(1).forEach((row, rowIndex) => {
          row.forEach((cell, cellIndex) => {
            newTetrisData[rowIndex][cellIndex + 3] = cell
              ? currentBlock.current.numCode
              : 0;
          });
        });
      }
      return newTetrisData;
    });
  }
  const checkRows = (tetrisData) => {
    // 한 줄 다 찼는지 검사
    const fullRows = [];
    tetrisData.forEach((col, i) => {
      let count = 0;
      col.forEach((row, _) => {
        if (row > 0) {
          count++;
        }
      });
      if (count === 10) {
        fullRows.push(i);
      }
    });
    const fullRowsCount = fullRows.length;
    tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i));
    for (let i = 0; i < fullRowsCount; i++) {
      tetrisData.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    setScore((score) => (score += fullRowsCount ** 2));
    return tetrisData;
  };

  const tick = () => {
    // 한 칸 아래로
    setTetrisData((tetrisData) => {
      const nextTopLeft = [
        currentTopLeft.current[0] + 1,
        currentTopLeft.current[1],
      ];
      let canGoDown = true;
      const currentBlockShape =
        currentBlock.current.shape[currentBlock.current.currentShapeIndex];
      for (
        let i = currentTopLeft.current[0];
        i < currentTopLeft.current[0] + currentBlockShape.length;
        i++
      ) {
        // 아래 블럭이 있으면
        if (i < 0 || i >= 20) continue;
        for (
          let j = currentTopLeft.current[1];
          j < currentTopLeft.current[1] + currentBlockShape.length;
          j++
        ) {
          if (isActiveBlock(tetrisData[i][j])) {
            // 현재 움직이는 블럭이면
            if (isInvalidBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {
              canGoDown = false;
            }
          }
        }
      }
      if (!canGoDown) {
        stopDown.current = true;
      } else {
        currentTopLeft.current = nextTopLeft;
      }
      const newTetrisData = [...tetrisData.map((t) => [...t])];
      for (let i = newTetrisData.length - 1; i >= 0; i--) {
        const col = tetrisData[i];
        col.forEach((row, j) => {
          if (
            row > 0 &&
            row < 10 &&
            newTetrisData[i + 1]?.[j] < 10 &&
            !!canGoDown
          ) {
            newTetrisData[i + 1][j] = row;
            newTetrisData[i][j] = 0;
          } else if (row !== 0 && row < 10) {
            newTetrisData[i][j] = row * 10;
          }
        });
      }
      const returnTetrisData = checkRows(newTetrisData);
      if (JSON.stringify(newTetrisData) !== JSON.stringify(tetrisData)) {
        return returnTetrisData;
      }
      return tetrisData;
    });
  };
  useEffect(() => {
    setNextTable((nextTable) => {
      return nextTable.map((row, rowIndex) => {
        return row.map((_, cellIndex) => {
          if (nextBlock?.current?.shape?.[0]?.[rowIndex]?.[cellIndex]) {
            return nextBlock.current.shape[0][rowIndex][cellIndex]
              ? nextBlock.current.numCode
              : 0;
          }
          return 0;
        });
      });
    });
  }, [nextBlock.current]);

  useEffect(() => {
    const keyDownEvent = (event: KeyboardEvent) => {
      setTetrisData((tetrisData) => {
        switch (event.code) {
          case 'ArrowLeft': {
            // 키보드 왼쪽 클릭 = 좌측 한 칸 이동
            const nextTopLeft = [
              currentTopLeft.current[0],
              currentTopLeft.current[1] - 1,
            ];
            let isMovable = true;
            const currentBlockShape =
              currentBlock.current.shape[
                currentBlock.current.currentShapeIndex
              ];
            for (
              let i = currentTopLeft.current[0];
              i < currentTopLeft.current[0] + currentBlockShape.length;
              i++
            ) {
              // 왼쪽 공간 체크
              if (!isMovable) break;
              for (
                let j = currentTopLeft.current[1];
                j < currentTopLeft.current[1] + currentBlockShape.length;
                j++
              ) {
                if (!tetrisData[i] || !tetrisData[i][j]) continue;
                if (
                  isActiveBlock(tetrisData[i][j]) &&
                  isInvalidBlock(tetrisData[i] && tetrisData[i][j - 1])
                ) {
                  isMovable = false;
                }
              }
            }
            if (isMovable) {
              currentTopLeft.current = nextTopLeft;
              tetrisData.forEach((col, i) => {
                for (let j = 0; j < col.length; j++) {
                  const row = col[j];
                  if (tetrisData[i][j - 1] === 0 && row < 10) {
                    tetrisData[i][j - 1] = row;
                    tetrisData[i][j] = 0;
                  }
                }
              });
            }
            break;
          }
          case 'ArrowRight': {
            // 키보드 오른쪽 클릭 = 우측 한 칸 이동
            const nextTopLeft = [
              currentTopLeft.current[0],
              currentTopLeft.current[1] + 1,
            ];
            let isMovable = true;
            const currentBlockShape =
              currentBlock.current.shape[
                currentBlock.current.currentShapeIndex
              ];
            for (
              let i = currentTopLeft.current[0];
              i < currentTopLeft.current[0] + currentBlockShape.length;
              i++
            ) {
              // 오른쪽 공간 체크
              if (!isMovable) break;
              for (
                let j = currentTopLeft.current[1];
                j < currentTopLeft.current[1] + currentBlockShape.length;
                j++
              ) {
                if (!tetrisData[i] || !tetrisData[i][j]) continue;
                if (
                  isActiveBlock(tetrisData[i][j]) &&
                  isInvalidBlock(tetrisData[i] && tetrisData[i][j + 1])
                ) {
                  isMovable = false;
                }
              }
            }
            if (isMovable) {
              currentTopLeft.current = nextTopLeft;
              tetrisData.forEach((col, i) => {
                for (let j = col.length - 1; j >= 0; j--) {
                  const row = col[j];
                  if (tetrisData[i][j + 1] === 0 && row < 10) {
                    tetrisData[i][j + 1] = row;
                    tetrisData[i][j] = 0;
                  }
                }
              });
            }
            break;
          }
          case 'ArrowDown': {
            // 키보드 아래쪽 클릭 = 하방측 한 칸 이동
            tick();
          }
        }
        return tetrisData;
      });
    };
    const keyupEvent = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space':
          while (!stopDown.current) {
            tick();
          }
          break;
        case 'ArrowUp': {
          setTetrisData((tetrisData) => {
            // 방향 전환
            const currentBlockShape =
              currentBlock.current.shape[
                currentBlock.current.currentShapeIndex
              ];
            let isChangeable = true;
            const nextShapeIndex =
              currentBlock.current.currentShapeIndex + 1 ===
              currentBlock.current.shape.length
                ? 0
                : currentBlock.current.currentShapeIndex + 1;
            const nextBlockShape = currentBlock.current.shape[nextShapeIndex];
            for (
              let i = currentTopLeft.current[0];
              i < currentTopLeft.current[0] + currentBlockShape.length;
              i++
            ) {
              // 돌린 이후 공간 체크
              if (!isChangeable) break;
              for (
                let j = currentTopLeft.current[1];
                j < currentTopLeft.current[1] + currentBlockShape.length;
                j++
              ) {
                if (!tetrisData[i]) continue;
                if (
                  nextBlockShape[i - currentTopLeft.current[0]][
                    j - currentTopLeft.current[1]
                  ] > 0 &&
                  isInvalidBlock(tetrisData[i] && tetrisData[i][j])
                ) {
                  isChangeable = false;
                }
              }
            }
            if (isChangeable) {
              while (currentTopLeft.current[0] < 0) {
                tick();
              }
              for (
                let i = currentTopLeft.current[0];
                i < currentTopLeft.current[0] + currentBlockShape.length;
                i++
              ) {
                // 돌린 이후 공간 체크
                for (
                  let j = currentTopLeft.current[1];
                  j < currentTopLeft.current[1] + currentBlockShape.length;
                  j++
                ) {
                  if (!tetrisData[i]) continue;
                  const nextBlockShapeCell =
                    nextBlockShape[i - currentTopLeft.current[0]][
                      j - currentTopLeft.current[1]
                    ];
                  if (nextBlockShapeCell > 0 && tetrisData[i][j] === 0) {
                    // 다음 모양은 있는데 현재 칸이 없으면
                    tetrisData[i][j] = currentBlock.current.numCode;
                  } else if (
                    nextBlockShapeCell === 0 &&
                    tetrisData[i][j] &&
                    tetrisData[i][j] < 10
                  ) {
                    // 다음 모양은 없는데  현재 칸이 있으면
                    tetrisData[i][j] = 0;
                  }
                }
              }
              currentBlock.current.currentShapeIndex = nextShapeIndex;
            }
            return tetrisData;
          });

          break;
        }
      }
    };
    window.addEventListener('keydown', keyDownEvent);
    window.addEventListener('keyup', keyupEvent);
    intervalId.current = setInterval(() => tick(), 300);
    return () => {
      clearInterval(intervalId.current);
      window.removeEventListener('keydown', keyDownEvent);
      window.removeEventListener('keyup', keyupEvent);
    };
  }, []);
  useEffect(() => {
    if (stopDown.current) {
      stopDown.current = false;
      generate();
    }
  }, [stopDown.current]);
  return (
    <>
      <Table>
        <tbody>
          {tetrisData.map((tr, rowIndex) => {
            return (
              <tr key={`${tr}-${rowIndex}`}>
                {tr.map((td, cellIndex) => {
                  return (
                    <td
                      style={{
                        backgroundColor:
                          tetrisData[rowIndex][cellIndex] >= 10
                            ? colors[tetrisData[rowIndex][cellIndex] / 10 - 1]
                            : colors[tetrisData[rowIndex][cellIndex] - 1],
                      }}
                      key={`${td}-${cellIndex}`}
                    >
                      {td}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Table>
        <tbody>
          {nextTable.map((tr, rowIndex) => {
            return (
              <tr key={`${tr}-${rowIndex}`}>
                {tr.map((td, cellIndex) => {
                  return (
                    <td
                      style={{
                        backgroundColor:
                          colors[nextTable[rowIndex][cellIndex] - 1],
                      }}
                      key={`${td}-${cellIndex}`}
                    >
                      {td}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>{score}</div>
    </>
  );
};

export default Tetris;
