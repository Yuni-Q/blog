import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const rspX = {
  scissors: 10,
  rock: -220,
  paper: -430,
};

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

const RspBackgroundImage = styled.div<{ position?: number }>`
  background: url(/rsp.png)
    ${({ position }) => (position ? position : rspX.scissors)}px 0 / cover
    no-repeat;
  width: 180px;
  height: 200px;
`;

const Rsp: React.VFC = () => {
  const intervalId = useRef(null);
  const timeoutId = useRef(null);
  const [position, setPosition] = useState(rspX.scissors);
  const [score, setScore] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [outCount, setOutcount] = useState(0);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setDisabled(true);
      clearInterval(intervalId.current);

      timeoutId.current = setTimeout(() => {
        clearInterval(intervalId.current);
        setDisabled(false);
        interval();
      }, 1000);

      const computerChoice = Object.entries(rspX).find((arr) => {
        return arr[1] === position;
      })[0];
      const myChoice = (event.target as HTMLButtonElement).id;

      const computerScore = scoreTable[computerChoice];
      const myScore = scoreTable[myChoice];
      const diff = myScore - computerScore;
      if ([2, -1].includes(diff)) {
        console.log('승리');
        setScore((score) => score + 1);
        return;
      }
      if ([-2, 1].includes(diff)) {
        console.log('패배');
        setScore((score) => score - 1);
        setOutcount((outCount) => outCount + 1);
        return;
      }
      console.log('무승부');
    },
    [position],
  );
  useEffect(() => {
    if (outCount > 2) {
      setDisabled(true);
      clearInterval(intervalId.current);
      clearTimeout(timeoutId.current);
    }
  }, [outCount]);
  const interval = useCallback(() => {
    intervalId.current = setInterval(() => {
      setPosition((position) => {
        if (position === rspX.scissors) {
          return rspX.rock;
        }
        if (position === rspX.rock) {
          return rspX.paper;
        }
        if (position === rspX.paper) {
          return rspX.scissors;
        }
      });
    }, 50);
  }, []);
  useEffect(() => {
    interval();
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <RspBackgroundImage position={position} />
      <div style={{ marginTop: 24 }}>
        <button id="scissors" disabled={disabled} onClick={onClick}>
          가위
        </button>
        <button id="rock" disabled={disabled} onClick={onClick}>
          바위
        </button>
        <button id="paper" disabled={disabled} onClick={onClick}>
          보
        </button>
      </div>
      <div style={{ marginTop: 8 }}>
        {outCount > 2 && '최종 점수는'} {score}점
      </div>
    </div>
  );
};

export default Rsp;
