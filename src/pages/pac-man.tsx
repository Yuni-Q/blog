import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-wrap: wrap;
  width: 560px;
  height: 560px;
  border: solid black;
  div {
    width: 20px;
    height: 20px;
  }
`;

const PacDot = styled.div`
  background-color: green;
  border: 5px solid white;
  box-sizing: border-box;
`;

const Wall = styled.div`
  background-color: blue;
`;

const Man = styled.div`
  background-color: yellow;
  border-radius: 10px;
`;

const PowerPellet = styled.div`
  background-color: green;
  border-radius: 10px;
`;

const GhostLair = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border: 0px;
`;

const WITH = 28;

const PacMan: React.VFC = () => {
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState(layout);
  const [pacManCurrentIndex, setPacManCurrentIndex] = useState(490);
  const intervalIds = useRef(null);
  const [isEnd, setIsEnd] = useState(false);
  const [ghosts, setGhosts] = useState([
    {
      name: 'red',
      startIndex: 348,
      currentIndex: 348,
      speed: 250,
      isScared: false,
    },
    {
      name: 'pink',
      startIndex: 376,
      currentIndex: 376,
      speed: 400,
      isScared: false,
    },
    {
      name: 'cyan',
      startIndex: 351,
      currentIndex: 351,
      speed: 300,
      isScared: false,
    },
    {
      name: 'orange',
      startIndex: 379,
      currentIndex: 379,
      speed: 500,
      isScared: false,
    },
  ]);
  useEffect(() => {
    const movePacMan = (e: KeyboardEvent) => {
      if (isEnd) {
        return;
      }
      const checkPoint = (index) => {
        if (board[index] === 0) {
          setScore((score) => score + 1);
        }
        if (board[index] === 3) {
          setScore((score) => score + 10);
          setGhosts((ghosts) => {
            return ghosts.map((ghost) => {
              ghost.isScared = true;
              return ghost;
            });
          });
          setTimeout(() => {
            setGhosts((ghosts) => {
              return ghosts.map((ghost) => {
                ghost.isScared = false;
                return ghost;
              });
            });
          }, 10000);
        }
      };
      board[pacManCurrentIndex] = null;
      setBoard((board) => {
        const newBoard = [...board];
        newBoard[pacManCurrentIndex] = null;
        return newBoard;
      });

      switch (e.key) {
        case 'ArrowLeft':
          if (
            pacManCurrentIndex % WITH !== 0 &&
            board[pacManCurrentIndex - 1] !== 1 &&
            board[pacManCurrentIndex - 1] !== 2
          ) {
            checkPoint(pacManCurrentIndex - 1);
            setPacManCurrentIndex(
              (pacManCurrentIndex) => pacManCurrentIndex - 1,
            );
          }

          if (pacManCurrentIndex - 1 === 363) {
            setPacManCurrentIndex(391);
          }
          break;
        case 'ArrowUp':
          if (
            pacManCurrentIndex - WITH >= 0 &&
            board[pacManCurrentIndex - WITH] !== 1 &&
            board[pacManCurrentIndex - WITH] !== 2
          ) {
            checkPoint(pacManCurrentIndex - WITH);
            setPacManCurrentIndex(
              (pacManCurrentIndex) => pacManCurrentIndex - WITH,
            );
          }
          break;
        case 'ArrowRight':
          if (
            pacManCurrentIndex % WITH < WITH - 1 &&
            board[pacManCurrentIndex + 1] !== 1 &&
            board[pacManCurrentIndex + 1] !== 2
          ) {
            checkPoint(pacManCurrentIndex + 1);
            setPacManCurrentIndex(
              (pacManCurrentIndex) => pacManCurrentIndex + 1,
            );
          }
          if (pacManCurrentIndex + 1 === 392) {
            setPacManCurrentIndex(364);
          }
          break;
        case 'ArrowDown':
          if (
            pacManCurrentIndex + WITH < WITH * WITH &&
            board[pacManCurrentIndex + WITH] !== 1 &&
            board[pacManCurrentIndex + WITH] !== 2
          ) {
            checkPoint(pacManCurrentIndex + WITH);
            setPacManCurrentIndex(
              (pacManCurrentIndex) => pacManCurrentIndex + WITH,
            );
          }
          break;
      }
    };
    window.addEventListener('keyup', movePacMan);
    return () => {
      window.removeEventListener('keyup', movePacMan);
    };
  }, [board, pacManCurrentIndex, ghosts, isEnd]);

  useEffect(() => {
    const moveGhost = () => {
      const directions = [-1, 1, WITH, -WITH];
      intervalIds.current = ghosts.map((g) => {
        return setInterval(() => {
          setGhosts((ghosts) =>
            ghosts.map((ghost) => {
              if (g.name !== ghost.name) {
                return ghost;
              }
              const direction =
                directions[Math.floor(Math.random() * directions.length)];
              if (board[ghost.currentIndex + direction] !== 1) {
                ghost.currentIndex = ghost.currentIndex + direction;
              }
              return ghost;
            }),
          );
        }, g.speed);
      });
    };
    moveGhost();
    return () => {
      intervalIds.current.map((interval) => {
        clearInterval(interval);
      });
    };
  }, []);

  useEffect(() => {
    ghosts.forEach((ghost) => {
      if (pacManCurrentIndex === ghost.currentIndex) {
        if (ghost.isScared) {
          setScore((score) => score + 100);
          setGhosts((ghosts) => {
            return ghosts.map((g) => {
              if (ghost.name !== g.name) {
                return g;
              }
              g.currentIndex = g.startIndex;
              return g;
            });
          });
        } else {
          setIsEnd(true);
          intervalIds.current.map((interval) => {
            clearInterval(interval);
          });
          alert('게임 종료');
        }
      }
    });
  }, [ghosts, pacManCurrentIndex]);
  useEffect(() => {
    if (!board.includes(0) && !board.includes(3)) {
      setIsEnd(true);
      alert('게임 종료');
      intervalIds.current.map((interval) => {
        clearInterval(interval);
      });
    }
  }, [board, score]);
  return (
    <>
      <Grid>
        {board.map((b, idx) => {
          const ghost = ghosts.find((ghost) => {
            return idx === ghost.currentIndex;
          });
          if (ghost) {
            return (
              <GhostLair
                color={ghost.isScared ? 'aquamarine' : ghost.name}
                key={`${b}-${idx}`}
              />
            );
          }
          if (idx === pacManCurrentIndex) {
            return <Man key={`${b}-${idx}`} />;
          }
          if (b === 0) {
            return <PacDot key={`${b}-${idx}`} />;
          }
          if (b === 1) {
            return <Wall key={`${b}-${idx}`} />;
          }
          if (b === 2) {
            return <GhostLair color={'black'} key={`${b}-${idx}`} />;
          }
          if (b === 3) {
            return <PowerPellet key={`${b}-${idx}`} />;
          }

          return <div key={`${b}-${idx}`} />;
        })}
      </Grid>
      <h3>{score}</h3>
    </>
  );
};

export default PacMan;

const layout = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  4,
  1,
  1,
  1,
  2,
  2,
  1,
  1,
  1,
  4,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  4,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  4,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  4,
  4,
  4,
  4,
  4,
  4,
  0,
  0,
  0,
  4,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  4,
  0,
  0,
  0,
  4,
  4,
  4,
  4,
  4,
  4,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  4,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  4,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  4,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  4,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  4,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  4,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  3,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  3,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
];
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
