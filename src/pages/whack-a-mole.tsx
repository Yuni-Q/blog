import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const Row = styled.div`
  width: 600px;
`;

const Cell = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  background: 'yellow';
  overflow: hidden;
`;

const Base = styled.div<{ hidden: boolean; hit: boolean }>`
  display: block;
  width: 200px;
  height: 200px;
  bottom: -200px;
  bottom: ${({ hidden }) => hidden && 0};
  position: absolute;
  transition: bottom 1s;
`;

const Gopher = styled(Base)`
  background: url('/images/whack-a-mole/gopher.png') center center no-repeat;
  background-size: 200px 200px;
  ${({ hit }) =>
    hit &&
    css`
      background-image: url('/images/whack-a-mole/dead_gopher.png');
    `}
`;

const Bomb = styled(Base)`
  background: url('/images/whack-a-mole/bomb.png') center center no-repeat;
  background-size: 200px 200px;
  ${({ hit }) =>
    hit &&
    css`
      background-image: url('/images/whack-a-mole/explode.png');
    `}
`;
const Hole = styled.div`
  width: 200px;
  height: 150px;
  position: absolute;
  bottom: 0;
  background: url('/images/whack-a-mole/mole-hole.png') center center no-repeat;
  background-size: 200px 150px;
`;
const HoleFront = styled.div`
  width: 200px;
  height: 30px;
  position: absolute;
  bottom: 0;
  background: url('/images/whack-a-mole/mole-hole-front.png') center center
    no-repeat;
  background-size: 200px 30px;
`;

const WhackAMole: React.VFC = () => {
  const [holes, setHoles] = useState<number[]>(Array(9).fill(0));
  const start = useRef(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [life, setLife] = useState(3);
  const timeoutId = useRef(null);
  useEffect(() => {
    if (life < 1) {
      start.current = null;
      setTimeout(() => {
        alert('게임 종료');
      }, 1000);
    }
  }, [life]);
  useEffect(() => {
    setTime(() => {
      const endTime = new Date().getTime();
      const time = Math.floor((endTime - start.current) / 1000);
      const totalTime = 60;
      if (totalTime - time < 1) {
        start.current = null;
        clearInterval(timeoutId.current);
        return 0;
      }
      return totalTime - time;
    });
  }, [holes]);
  useEffect(() => {
    if (!start.current) {
      clearInterval(timeoutId.current);
      setHoles(Array(9).fill(0));
    }
    if (start.current) {
      timeoutId.current = setInterval(() => {
        setHoles((holes) => {
          const newHoles = [...holes];
          const goherPercent = 0.3;
          const bombPercent = 0.5;
          holes.forEach((hole, idx) => {
            const randomValue = Math.random();
            if (hole > 0 && hole < 5) {
              newHoles[idx] = newHoles[idx] * -1;
            } else if (hole !== 0) {
              newHoles[idx] = 0;
            } else if (randomValue < goherPercent) {
              newHoles[idx] = 1;
            } else if (randomValue < bombPercent) {
              newHoles[idx] = 2;
            }
          });
          return newHoles;
        });
      }, 1000);
      return () => {
        clearInterval(timeoutId.current);
      };
    }
  }, [start.current]);
  return (
    <div>
      <div>
        {time}초 {score}점 생명{life}
        <button
          onClick={() => {
            start.current = new Date().getTime();
            setTime(60);
            setHoles(Array(9).fill(0));
            setLife(3);
            setScore(0);
          }}
        >
          시작
        </button>
      </div>
      <Row>
        {holes.map((hole: number, idx) => {
          return (
            <Cell
              key={idx}
              onClick={() => {
                setHoles((holes) => {
                  const newHoles = [...holes];
                  if (Math.abs(holes[idx]) === 1) {
                    setScore((score) => score + 1);
                    newHoles[idx] = 3;
                  }
                  if (Math.abs(holes[idx]) === 2) {
                    setLife((life) => life - 1);
                    newHoles[idx] = 4;
                  }
                  return newHoles;
                });
              }}
            >
              <Hole />
              <Gopher hidden={hole === 1} hit={hole === 3 || hole === -3} />
              <Bomb hidden={hole === 2} hit={hole === 4 || hole === -4} />
              <HoleFront />
            </Cell>
          );
        })}
      </Row>
    </div>
  );
};
export default WhackAMole;
