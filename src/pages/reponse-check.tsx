import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const WAITE_COLOR = 'aqua';
const READY_COLOR = 'red';
const NOW_COLOR = 'greenyellow';

const Screen = styled.div<{ color: string }>`
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
  background-color: ${({ color }) => color};
  color: ${({ color }) => (color === READY_COLOR ? 'white' : 'black')};
`;

const ResponseCheck: React.VFC = () => {
  const [color, setColor] = useState(WAITE_COLOR);
  const [recodes, setRecodes] = useState([]);
  const date = useRef(null);
  const timeoutId = useRef(null);
  const onClick = useCallback(() => {
    if (color === WAITE_COLOR) {
      setColor(READY_COLOR);
      timeoutId.current = setTimeout(() => {
        date.current = new Date().getTime();
        setColor(NOW_COLOR);
      }, Math.floor(Math.random() * 1000) + 2000);
    }
    if (color === READY_COLOR) {
      date.current = null;
      setColor(WAITE_COLOR);
      alert('너무 성급하군요');
      clearTimeout(timeoutId.current);
    }
    if (color === NOW_COLOR) {
      const endTime = new Date().getTime();
      setRecodes((recodes) => [endTime - date.current, ...recodes]);
      setColor(WAITE_COLOR);
    }
  }, [color]);
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
      <Screen color={color} onClick={onClick}>
        {color === WAITE_COLOR
          ? '클릭해서 시작하세요.'
          : color === READY_COLOR
          ? '초록색이 되면 클릭하세요.'
          : '클릭하세요!'}
      </Screen>
      <div>
        <div>
          {recodes.length > 0 &&
            `평균 : ${
              recodes.reduce((prev, curr) => prev + curr, 0) / recodes.length
            }ms`}
        </div>
        {recodes.map((recode, idx) => {
          return <div key={`${recode}-${idx}`}>{`${recode}ms`}</div>;
        })}
      </div>
    </div>
  );
};

export default ResponseCheck;
