import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const Card = styled.div`
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 70px;
  height: 100px;
  perspective: 140px;
`;

const CardInner = styled.div<{ flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  ${({ flipped }) =>
    flipped
      ? css`
          transform: rotateY(180deg);
        `
      : ''};
`;

const Face = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  backface-visibility: hidden;
`;

const FrontFace = styled(Face)`
  background: navy;
`;
const BackFace = styled(Face)<{ color: string }>`
  transform: rotateY(180deg);
  background: ${({ color }) => color};
`;

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'white',
  'pink',
  'cyan',
  'violet',
  'gray',
  'black',
];
const shuffle = (num: number) => {
  const shuffled = [];
  const colorList = colors.slice(0, num / 2);
  const list = colorList.concat(colorList);
  for (let i = 0; list.length > 0; i += 1) {
    const randomIndex = Math.floor(Math.random() * list.length);
    shuffled.push(list.splice(randomIndex, 1)[0]);
  }
  return shuffled;
};

const Concentration: React.VFC = () => {
  const [count, setCount] = useState('');
  const [cards, setCards] = useState<string[]>([]);
  const [time, setTime] = useState(0);
  const startTime = useRef(new Date().getTime());
  const [flipped, setFlipped] = useState<boolean[]>(
    Array(cards.length).fill(false),
  );
  const index = useRef(0);
  const clicked = useRef(new Set<number>());
  const handleStartButtonClick = useCallback(() => {
    setTimeout(() => {
      const num = parseInt(count, 10);
      setFlipped(Array(num).fill(false));
      setCards(shuffle(num));
      index.current = 0;
      setTime(0);
    }, 500);
  }, [count]);
  useEffect(() => {
    if (!cards.length && flipped.length) {
      return;
    }
    if (index.current < cards.length + 1) {
      setTimeout(() => {
        setFlipped((flipped) => {
          const newFlipped = [...flipped];
          newFlipped[index.current] = true;
          index.current += 1;
          return newFlipped;
        });
      }, 100);
    }
    if (index.current === cards.length + 1) {
      setTimeout(() => {
        setFlipped(Array(cards.length).fill(false));
        index.current += 1;
        startTime.current = new Date().getTime();
      }, 3000);
    }
    if (clicked.current.size === 2) {
      const [first, second] = [...clicked.current];
      if (cards[first] === cards[second]) {
        clicked.current = new Set();
      }
      if (cards[first] !== cards[second]) {
        setTimeout(() => {
          clicked.current = new Set();
          setFlipped((flipped) => {
            const newFlipped = [...flipped];
            newFlipped[first] = false;
            newFlipped[second] = false;
            return newFlipped;
          });
        }, 500);
      }
    }
    if (index.current > cards.length + 1 && flipped.every((f) => !!f)) {
      console.log(index.current, 'cards.length', cards.length);

      const endTime = new Date().getTime();
      const newTime = endTime - startTime.current;
      setTime(newTime);
      setTimeout(() => {
        alert('축하합니다.');
      }, 500);
    }
  }, [flipped, cards]);
  if (!cards.length) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const num = parseInt(count, 10);
          if (num > 20 || num < 2) {
            return alert('2 이상 20 이하의 숫자를 입력해주세요.');
          }
          if (num % 2 !== 0) {
            return alert('짝수를 입력해주세요.');
          }
          handleStartButtonClick();
        }}
      >
        <input
          min={2}
          max={20}
          style={{ width: 300 }}
          placeholder="카드 개수를 짝수로 입력하세요(최대 20)"
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button type="submit">시작</button>
      </form>
    );
  }
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
      <div style={{ maxWidth: 360 }}>
        <div>
          {!!time && (
            <div style={{ marginBottom: 8 }}>
              <div>{time}ms</div>
              <button
                onClick={() => {
                  setCards([]);
                  setCount('');
                }}
              >
                재시작하시겠습니까?
              </button>
            </div>
          )}
        </div>
        <div>
          {cards.map((card, idx) => {
            return (
              <Card key={`${card}-${idx}`}>
                <CardInner
                  flipped={flipped[idx]}
                  onClick={() => {
                    if (
                      !!flipped[idx] ||
                      clicked.current.size >= 2 ||
                      index.current < cards.length + 1
                    ) {
                      return;
                    }
                    clicked.current.add(idx);
                    setFlipped((flipped) => {
                      const newFlipped = [...flipped];
                      newFlipped[idx] = true;
                      return newFlipped;
                    });
                  }}
                >
                  <FrontFace />
                  <BackFace color={card} />
                </CardInner>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Concentration;
