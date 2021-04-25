import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Ball = styled.div`
  display: inline-block;
  border: 1px solid black;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin: 0 10px;
  border-radius: 50%;
`;

const Lotto: React.VFC = () => {
  const [balls, setBalls] = useState<number[]>([]);
  const [bonusBall, setBonusBalls] = useState<number>(null);
  const interval = useRef(null);
  useEffect(() => {
    const candidate = Array(45)
      .fill(0)
      .map((_, index) => index + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      const random = Math.floor(Math.random() * candidate.length);
      const spliceArray = candidate.splice(random, 1);
      const value = spliceArray[0];
      shuffle.push(value);
    }
    const winBalls = shuffle.splice(0, 6).sort((a, b) => a - b);
    const bonus = shuffle[6];
    interval.current = setInterval(() => {
      setBalls((balls) => {
        if (balls.length > 4) {
          setTimeout(() => {
            setBonusBalls(bonus);
          }, 1000);
        }
        return [...balls, winBalls[balls.length]];
      });
    }, 1000);
  }, []);
  useEffect(() => {
    if (balls.length === 6) {
      clearInterval(interval.current);
    }
  }, [balls]);

  const getColor = useCallback((num: number) => {
    if (num >= 40) {
      return 'greenyellow';
    }
    if (num >= 30) {
      return 'orange';
    }
    if (num >= 20) {
      return 'yellow';
    }
    if (num >= 10) {
      return 'aquamarine';
    }
    return 'lightpink';
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
      <div>
        <div>
          추첨 결과는?{' '}
          {balls.map((ball) => {
            return (
              <Ball style={{ background: getColor(ball) }} key={ball}>
                {ball}
              </Ball>
            );
          })}
        </div>
        <div>
          보너스:{' '}
          {bonusBall && (
            <Ball style={{ background: getColor(bonusBall) }}>{bonusBall}</Ball>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lotto;
