import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
const StyledCalculator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  button {
    width: 50px;
    height: 50px;
  }
`;

const Calculator: React.VFC = () => {
  const [numOne, setNumOne] = useState('');
  const [numTwo, setNumTwo] = useState('');
  const [operator, setOperator] = useState('');
  const onClickNumber = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const innerText = (e.target as HTMLButtonElement).innerText;
      if (operator) {
        setNumTwo((number) => number + innerText);
      } else {
        setNumOne((number) => number + innerText);
      }
    },
    [operator],
  );
  const onClickOperator = (e) => {
    const calc = (operator: string) => {
      const newNumOne = Number(numOne);
      const newNumTwo = Number(numTwo);
      switch (operator) {
        case '+': {
          const result = (newNumOne + newNumTwo).toString();
          setNumOne(result);
          setNumTwo('');
          return;
        }
        case '-': {
          const result = (newNumOne - newNumTwo).toString();
          setNumOne(result);
          setNumTwo('');
          return;
        }
        case 'x': {
          const result = (newNumOne * newNumTwo).toString();
          setNumOne(result);
          setNumTwo('');
          return;
        }
        case '/': {
          const result = (newNumOne / newNumTwo).toString();
          setNumOne(result);
          setNumTwo('');
          return;
        }
        default: {
          const result = (newNumOne + newNumTwo).toString();
          setNumOne(result);
          setNumTwo('');
        }
      }
    };

    const innerText = (e.target as HTMLButtonElement).innerText;
    if (!numOne || numOne === '-') {
      if (innerText === '-' && !operator) {
        setNumOne('-');
        return;
      }
      alert('숫자를 먼저 입력하세요');
      return;
    }

    if (innerText === 'C') {
      setNumOne('');
      setNumTwo('');
      setOperator('');
      return;
    }

    if (innerText === '=') {
      if (!numTwo) {
        alert('숫자를 먼저 입력하세요');
        return;
      }
      calc(operator);
    }

    if (numTwo) {
      calc(innerText);
    }

    setOperator((e.target as HTMLButtonElement).innerText);
  };
  return (
    <StyledCalculator>
      <div>
        <input
          style={{ width: 50, textAlign: 'center' }}
          readOnly
          type="text"
          value={operator}
        />
        <input
          style={{ width: 150, textAlign: 'right' }}
          readOnly
          type="text"
          value={numTwo || numOne}
        />
      </div>
      <div>
        {[7, 8, 9].map((num) => {
          return (
            <button key={num} onClick={onClickNumber}>
              {num}
            </button>
          );
        })}
        <button onClick={onClickOperator}>+</button>
      </div>
      <div>
        {[4, 5, 6].map((num) => {
          return (
            <button key={num} onClick={onClickNumber}>
              {num}
            </button>
          );
        })}
        <button onClick={onClickOperator}>-</button>
      </div>
      <div>
        {[1, 2, 3].map((num) => {
          return (
            <button key={num} onClick={onClickNumber}>
              {num}
            </button>
          );
        })}
        <button onClick={onClickOperator}>/</button>
      </div>
      <div>
        <button onClick={onClickOperator}>C</button>
        <button onClick={onClickNumber}>0</button>
        <button onClick={onClickOperator}>=</button>
        <button onClick={onClickOperator}>x</button>
      </div>
    </StyledCalculator>
  );
};

export default Calculator;
