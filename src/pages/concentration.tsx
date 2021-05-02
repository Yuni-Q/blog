import React, { useEffect, useRef, useState } from 'react';
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

const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
const colorCopy = colors.concat(colors);
const shuffle = () => {
  const shuffled = [];
  const colors = [...colorCopy];
  for (let i = 0; colors.length > 0; i += 1) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    shuffled.push(colors.splice(randomIndex, 1)[0]);
  }

  return shuffled;
};

const total = 12;

const Concentration: React.VFC = () => {
  const [cards, setCards] = useState(shuffle());
  const [flipped, setFlipped] = useState<boolean[]>(
    Array(cards.length).fill(false),
  );
  const index = useRef(0);
  const clicked = useRef(new Set<number>());
  useEffect(() => {
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
      setTimeout(() => {
        alert('축하합니다.');
        setCards(shuffle());
        setFlipped(Array(cards.length).fill(false));
        index.current = 0;
      }, 500);
    }
  }, [flipped]);
  return (
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
  );
};

export default Concentration;
