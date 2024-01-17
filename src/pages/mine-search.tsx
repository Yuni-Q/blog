import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

// 상태값 저장
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPEN_MINE: -8,
  OPENED: 0, // 0 이상이면 다 opened
};

// 공동 Store
export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: null,
  openedCount: 0,
});

// 초기값
const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
};

// 지뢰 세팅
const plantMine = (row: number, cell: number, mine: number) => {
  const candidate = Array(row * cell)
    .fill(0)
    .map((_, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1,
    )[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  return data;
};

// action
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
      };
    case OPEN_CELL: {
      // 메모리 연결 끊기
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });

      if (
        !state.openedCount &&
        CODE.MINE === tableData[action.row][action.cell]
      ) {
        const searched = [];
        for (let i = 0; i < state.data.row; i++) {
          const rowData = [];
          searched.push(rowData);
          for (let j = 0; j < state.data.cell; j++) {
            rowData.push(false);
          }
        }
        let end = false;
        const transferMine = (rowIndex: number, cellIndex: number) => {
          if (end) {
            return;
          }
          if (
            rowIndex < 0 ||
            rowIndex >= state.data.row ||
            cellIndex < 0 ||
            cellIndex >= state.data.cell
          ) {
            return;
          }
          if (searched[rowIndex][cellIndex]) {
            return;
          }
          searched[rowIndex][cellIndex] = true;
          if (CODE.NORMAL === tableData[rowIndex]?.[cellIndex]) {
            tableData[rowIndex][cellIndex] = CODE.MINE;
            end = true;
            return;
          } else {
            transferMine(rowIndex - 1, cellIndex - 1);
            transferMine(rowIndex - 1, cellIndex);
            transferMine(rowIndex - 1, cellIndex + 1);
            transferMine(rowIndex, cellIndex - 1);
            transferMine(rowIndex, cellIndex + 1);
            transferMine(rowIndex + 1, cellIndex - 1);
            transferMine(rowIndex + 1, cellIndex);
            transferMine(rowIndex + 1, cellIndex + 1);
          }
        };
        transferMine(action.row, action.cell);
        tableData[action.row][action.cell] = CODE.NORMAL;
      }

      const checked = [];
      let openedCount = 0;
      const checkAround = (row: number, cell: number) => {
        // 지뢰 찾기 범위 밖이라면 수행하지 않음
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        ) {
          return { ...state };
        }

        // 닫힌 칸만 수행
        if (
          [
            CODE.OPENED,
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[row][cell])
        ) {
          return;
        }
        // 한 번 연칸은 무시하기
        if (checked.includes(row + '/' + cell)) {
          return;
        }

        // 열어본 칸 배열에 추가
        checked.push(row + '/' + cell);

        // 좌우
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
        // 위
        if (tableData[row - 1]) {
          around = around.concat([
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          ]);
        }
        // 아래
        if (tableData[row + 1]) {
          around = around.concat([
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          ]);
        }
        // 열 수 없는 칸 필터링
        const count = around.filter(function (v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;

        // 주변에 모든 것을 열 수 있음
        if (count === 0) {
          // 윗 칸 오픈
          if (row > -1) {
            const near = [];
            // 게임 범위 안이라면
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            // 게임 범위 안이라면
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              // 해당 칸이 열려 있지 않다면 해당 칸 여는 알고리즘 시작
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            });
          }
        }

        // 내 칸이 닫힌 칸이면 카운트 증가
        if (tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }
        // 지뢰 갯수 추가
        tableData[row][cell] = count;
      };
      // 해당 칸 오픈
      checkAround(action.row, action.cell);
      let halted = false;
      let result = '';
      // 총 갯수 - 지뢰 갯수 === 이때까지 연 갯수 + 이번에 연 갯수
      if (
        state.data.row * state.data.cell - state.data.mine ===
        state.openedCount + openedCount
      ) {
        // 승리
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });

      tableData.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (
            tableData[rowIndex][cellIndex] === CODE.MINE ||
            tableData[rowIndex][cellIndex] === CODE.FLAG_MINE ||
            tableData[rowIndex][cellIndex] === CODE.QUESTION_MINE
          ) {
            tableData[rowIndex][cellIndex] = CODE.OPEN_MINE;
          }
        });
      });
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
};

// 게임
// TODO : 마우스 양쪽 클릭 구현하기
const MineSearch: React.VFC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result, openedCount } = state;

  const value = useMemo(
    () => ({ tableData, halted, dispatch, openedCount }),
    [tableData, halted, openedCount],
  );

  useEffect(() => {
    let timer;
    if (halted === false) {
      // 게임 시간초 증가
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <div>
      <input
        type="number"
        placeholder="세로"
        value={row}
        onChange={onChangeRow}
      />
      <input
        type="number"
        placeholder="가로"
        value={cell}
        onChange={onChangeCell}
      />
      <input
        type="number"
        placeholder="지뢰"
        value={mine}
        onChange={onChangeMine}
      />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
});

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  return (
    <table style={{ width: 'unset' }}>
      <tbody>
        {Array(tableData.length)
          .fill(0)
          .map((_, i) => {
            return <Tr key={`tr-${i}`} rowIndex={i} />;
          })}
      </tbody>
    </table>
  );
});

const Tr = memo(({ rowIndex }: { rowIndex: number }) => {
  const { tableData } = useContext(TableContext);

  if (!tableData[0]?.length) {
    return;
  }

  return (
    <tr>
      {Array(tableData[0].length)
        .fill(0)
        .map((_, i) => (
          <Td key={`td-${i}`} rowIndex={rowIndex} cellIndex={i} />
        ))}
    </tr>
  );
});

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.CLICKED_MINE:
      return {
        background: 'red',
      };
    case CODE.OPEN_MINE:
      return {
        background: 'white',
      };
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      };
    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
    case CODE.OPEN_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || '';
  }
};

const Td = memo(
  ({ rowIndex, cellIndex }: { rowIndex: number; cellIndex: number }) => {
    const { tableData, dispatch, halted, openedCount } =
      useContext(TableContext);

    const onClickTd = useCallback(() => {
      if (halted) {
        return;
      }
      if (!openedCount) {
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      }

      switch (tableData[rowIndex][cellIndex]) {
        // 아래 케이스일 경우 모두 무시
        case CODE.OPENED:
        case CODE.FLAG_MINE:
        case CODE.FLAG:
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          return;

        case CODE.NORMAL:
          dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
          return;

        case CODE.MINE:
          dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
          return;

        default:
          return;
      }
    }, [tableData[rowIndex][cellIndex], halted, openedCount]);

    // 우클릭 시 이벤트
    const onRightClickTd = useCallback(
      (e) => {
        e.preventDefault();

        // 게임이 끝났을 경우 무시
        if (halted) {
          return;
        }

        switch (tableData[rowIndex][cellIndex]) {
          case CODE.NORMAL:
          case CODE.MINE:
            dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
            return;
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
            return;
          case CODE.QUESTION_MINE:
          case CODE.QUESTION:
            dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
            return;
          default:
            return;
        }
      },
      [tableData[rowIndex][cellIndex], halted],
    );

    return (
      <RealTd
        onClickTd={onClickTd}
        onRightClickTd={onRightClickTd}
        data={tableData[rowIndex][cellIndex]}
      />
    );
  },
);

const RealTd = memo(
  ({
    onClickTd,
    onRightClickTd,
    data,
  }: {
    onClickTd: () => void;
    onRightClickTd: (e: React.MouseEvent<HTMLTableDataCellElement>) => void;
    data: string;
  }) => {
    return (
      <td
        style={{
          ...getTdStyle(data),
          width: 60,
          height: 60,
          padding: 0,
          textAlign: 'center',
        }}
        onClick={onClickTd}
        onContextMenu={onRightClickTd}
      >
        {getTdText(data)}
      </td>
    );
  },
);
