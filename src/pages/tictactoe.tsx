import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  tbody {
    text-align: center;
  }
  tr {
    width: 120px;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    font-size: 24px;
    text-align: center;
    display: inline-block;
    padding: 5px 0 0;
  }
`;

const Tictactoe: React.VFC = () => {
  const [winner, setWinner] = useState('');
  const [data, setData] = useState([
    Array(3).fill(null),
    Array(3).fill(null),
    Array(3).fill(null),
  ]);
  const [turn, setTurn] = useState('O');
  const timerId = useRef(null);

  useEffect(() => {
    if (winner) {
      return;
    }
    data.forEach((tr, idx) => {
      console.log(11, tr[0] === tr[1], tr[1] === tr[2]);
      if (!!tr[0] && tr[0] === tr[1] && tr[1] === tr[2]) {
        setWinner(tr[0]);
      }
      if (
        !!data[0][idx] &&
        data[0][idx] === data[1][idx] &&
        data[1][idx] === data[2][idx]
      ) {
        setWinner(data[0][idx]);
      }
    });
    if (
      !!data[0][0] &&
      data[0][0] === data[1][1] &&
      data[1][1] === data[2][2]
    ) {
      setWinner(data[0][0]);
    }
    if (
      !!data[0][2] &&
      data[0][2] === data[1][1] &&
      data[1][1] === data[2][0]
    ) {
      setWinner(data[0][2]);
    }
    if (!data.flat().includes(null)) {
      setWinner('없습니다.');
    }
  }, [data]);
  // 인공지능을 위한 로직
  useEffect(() => {
    if (turn === 'X' && data.flat().includes(null)) {
      const computer = () => {
        let trIndex = 0;
        let tdIndex = 0;
        do {
          trIndex = Math.floor(Math.random() * 3);
          tdIndex = Math.floor(Math.random() * 3);
        } while (data[trIndex][tdIndex]);

        setData((data) => {
          const newData = [...data];
          newData[trIndex][tdIndex] = turn;
          return newData;
        });
        setTurn('O');
      };
      timerId.current = setTimeout(computer, 1000);
    }
  }, [turn]);
  useEffect(() => {
    clearTimeout(timerId.current);
  }, [winner, timerId]);
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
      <Table
        onClick={(event) => {
          if (winner || turn === 'X') {
            return;
          }
          const target = event.target as HTMLTableDataCellElement;
          const trIndex = target.dataset.tr;
          const tdIndex = target.dataset.td;

          if (!trIndex || !tdIndex || data[trIndex][tdIndex]) {
            return;
          }
          setData((data) => {
            const newData = [...data];
            newData[trIndex][tdIndex] = turn;
            return newData;
          });
          setTurn('X');
        }}
      >
        <tbody>
          {data.map((tr, trIndex) => {
            return (
              <tr key={trIndex}>
                {tr.map((td, tdIndex) => {
                  return (
                    <td data-tr={trIndex} data-td={tdIndex} key={tdIndex}>
                      {td}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>{winner && `승리자 ${winner}`}</div>
    </div>
  );
};

export default Tictactoe;
