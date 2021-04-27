import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  height: 560px;
  width: 560px;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 70px;
    height: 70px;
  }
`;

const candyColor = [
  'url("/images/candy/red-candy.png")',
  'url("/images/candy/yellow-candy.png")',
  'url("/images/candy/orange-candy.png")',
  'url("/images/candy/purple-candy.png")',
  'url("/images/candy/green-candy.png")',
  'url("/images/candy/blue-candy.png")',
];

const WITH = 8;

const CandyCrushWalkThrough: React.VFC = () => {
  const [colorBeingDragged, setColorBeingDragged] = useState('');
  const [colorBeingReplaced, setColorBeingReplaced] = useState('');
  const [squareIdBeingDragged, setSquareIdBeingDragged] = useState(0);
  const [squareIdBeingReplaced, setSquareIdBeingReplaced] = useState(0);
  const [endMove, setEndMove] = useState(true);
  const [colors, setColors] = useState<string[]>(
    Array(WITH * WITH)
      .fill(0)
      .map(() => candyColor[Math.floor(Math.random() * candyColor.length)]),
  );
  const [score, setScore] = useState(0);
  const checkGrid = useCallback(() => {
    const newColor = [...colors];
    const checkBox = (check) => {
      for (let i = 0; i < 62; i++) {
        const { array, notValid } = check(i);
        const decidedColor = newColor[i];
        const isBlank = newColor[i] === '';
        if (notValid.includes(i)) {
          continue;
        }
        if (
          array.every((index) => newColor[index] === decidedColor && !isBlank)
        ) {
          setScore((score) => {
            return score + array.length;
          });
          array.forEach((index) => {
            newColor[index] = '';
          });
          setColors(newColor);
        }
      }
    };
    const checkFourRowIndexArray = (i: number) => {
      return {
        array: [i, i + 1, i + 2, i + 3],
        notValid: [
          5,
          6,
          7,
          13,
          14,
          15,
          21,
          22,
          23,
          29,
          30,
          31,
          37,
          38,
          39,
          45,
          46,
          47,
          53,
          54,
          55,
        ],
      };
    };
    const checkThreeRowIndexArray = (i: number) => {
      return {
        array: [i, i + 1, i + 2],
        notValid: [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55],
      };
    };
    const checkFourColumnIndexArray = (i: number) => {
      return {
        array: [i, i + WITH, i + WITH * 2, i + WITH * 3],
        notValid: [],
      };
    };
    const checkThreeColumnIndexArray = (i: number) => {
      return {
        array: [i, i + WITH, i + WITH * 2],
        notValid: [],
      };
    };
    checkBox(checkFourRowIndexArray);
    checkBox(checkFourColumnIndexArray);
    checkBox(checkThreeRowIndexArray);
    checkBox(checkThreeColumnIndexArray);
  }, [colors]);
  useEffect(() => {
    if (endMove === true) {
      checkGrid();
      setEndMove(false);
    }
  }, [endMove]);
  useEffect(() => {
    const newColor = [...colors];
    const moveDown = () => {
      for (let i = 0; i < 56; i++) {
        if (newColor[i + WITH] === '') {
          newColor[i + WITH] = newColor[i];
          newColor[i] = '';
        }
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && newColor[i] === '') {
          newColor[i] =
            candyColor[Math.floor(Math.random() * candyColor.length)];
        }
      }

      if (JSON.stringify(colors) !== JSON.stringify(newColor)) {
        setColors(newColor);
      } else {
        setEndMove(true);
      }
    };
    setTimeout(moveDown, 50);
  }, [colors]);
  return (
    <Grid>
      {colors.map((color, idx) => {
        return (
          <div
            onDragStart={(e) => {
              const target = e.target as HTMLDivElement;
              setColorBeingDragged(target.style.background);
              setSquareIdBeingDragged(parseInt(target.id, 10));
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragEnter={(e) => {
              e.preventDefault();
            }}
            // onDragLeave={(e) => {
            //   console.log(e);
            // }}
            onDrop={(e) => {
              const target = e.target as HTMLDivElement;
              setColorBeingReplaced(target.style.background);
              const id = parseInt(target.id, 10);
              setSquareIdBeingReplaced(id);
              setColors((colors) => {
                const newColors = [...colors];
                newColors[id] = colorBeingDragged;
                newColors[squareIdBeingDragged] = target.style.background;
                return newColors;
              });
            }}
            onDragEnd={(e) => {
              const validMoves = [
                squareIdBeingDragged - 1,
                squareIdBeingDragged - WITH,
                squareIdBeingDragged + 1,
                squareIdBeingDragged + WITH,
              ];
              const validMove = validMoves.includes(squareIdBeingReplaced);

              if (squareIdBeingReplaced && validMove) {
                setSquareIdBeingReplaced(null);
                checkGrid();
              } else if (squareIdBeingReplaced && !validMove) {
                setColors((colors) => {
                  const newColors = [...colors];
                  newColors[squareIdBeingReplaced] = colorBeingReplaced;
                  newColors[squareIdBeingDragged] = colorBeingDragged;
                  return newColors;
                });
              } else {
                setColors((colors) => {
                  const newColors = [...colors];
                  newColors[squareIdBeingDragged] = colorBeingDragged;
                  return newColors;
                });
              }
            }}
            draggable
            id={idx.toString()}
            style={{ background: color }}
            key={idx}
          />
        );
      })}
      {score}점
    </Grid>
  );
};

export default CandyCrushWalkThrough;

// TODO : 3:3 시 같이 없어지기
