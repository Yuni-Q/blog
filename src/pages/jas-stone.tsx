import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div<{ on?: boolean; off?: boolean }>`
  width: 75px;
  height: 120px;
  display: inline-block;
  position: relative;
  border: solid ${({ on }) => (on ? '3px red' : '1px black')};
  margin-bottom: 10px;
  background: ${({ off }) => (off ? 'gray' : 'white')};
`;

const My = styled.div<{ turn: boolean }>`
  display: inline-block;
  vertical-align: top;
  margin-right: 50px;
  background: ${({ turn }) => (turn ? 'white' : 'gray')};
`;

const Rival = styled(My)`
  vertical-align: bottom;
`;

const MyDeck = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 300px;
  background: silver;
  text-align: center;
`;
const RivalDeck = styled(MyDeck)``;

const CardAttribute = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  bottom: 0;
  border: 1px solid black;
`;
const CardCost = styled(CardAttribute)`
  bottom: auto;
  top: 0;
  left: 0;
  background-color: blue;
  color: white;
`;
const CardAtt = styled(CardAttribute)`
  left: 0;
  background-color: yellow;
`;
const CardHp = styled(CardAttribute)`
  right: 0;
  background-color: red;
  color: white;
`;

const TurnButton = styled.button`
  float: right;
  position: relative;
  top: -23px;
`;

const CardFactory = (isHero?: boolean) => {
  const att = isHero
    ? Math.ceil(Math.random() * 2)
    : Math.ceil(Math.random() * 5);
  const heroHp = isHero ? 25 : 0;
  const hp = Math.ceil(Math.random() * 5) + heroHp;
  const cost = Math.floor((att + hp) / 2);
  return {
    att,
    hp,
    cost,
  };
};

const JasStone: React.VFC = () => {
  const [myHero, setMyHero] = useState(CardFactory(true));
  const [rivalHero, setRivalHero] = useState(CardFactory(true));
  const [rivalCost, setRivalCost] = useState(1);
  const [myCost, setMyCost] = useState(1);
  const [myTurn, setMyTurn] = useState(true);
  const [myDeck, setMyDeck] = useState([
    CardFactory(),
    CardFactory(),
    CardFactory(),
    CardFactory(),
    CardFactory(),
  ]);
  const [riverDeck, setRiverDeck] = useState([
    CardFactory(),
    CardFactory(),
    CardFactory(),
    CardFactory(),
    CardFactory(),
  ]);
  const [rivalFiled, setRivalFiled] = useState([]);
  const [myFiled, setMyFiled] = useState([]);
  const [selectFiled, setSelectFiled] = useState(null);
  const [attackCards, setAttackCards] = useState([]);
  const [attackHero, setAttackHero] = useState(false);
  const [myMaxCost, setMyMaxCost] = useState(1);
  const [rivalMaxCost, setRivalMaxCost] = useState(1);
  const deckClick = ({ turn, deck, filed, cost, idx, my }) => {
    if (!turn) {
      return;
    }
    const newCost = cost - deck[idx].cost;
    if (newCost < 0) {
      return;
    }
    const newDeck = [
      ...riverDeck.filter((_, index) => {
        return index !== idx;
      }),
      CardFactory(),
    ];
    const newFiled = [...filed, deck[idx]];
    if (my) {
      setMyFiled(newFiled);
      setMyCost(newCost);
      setMyDeck(newDeck);
    } else {
      setRivalFiled(newFiled);
      setRivalCost(newCost);
      setRiverDeck(newDeck);
    }
  };
  const filedClick = ({ turn, my, idx, masterFiled, slaveFiled }) => {
    const index = selectFiled;
    if (turn && attackCards[idx]) {
      return;
    }
    if (turn) {
      setSelectFiled(idx);
      return;
    }
    if (selectFiled === null) {
      return;
    }
    const card = index === -1 ? (my ? rivalHero : myHero) : masterFiled[index];
    const hp = slaveFiled[idx].hp - card.att;
    let newFiled = [];
    if (hp <= 0) {
      newFiled = slaveFiled.filter((_, index) => idx !== index);
    } else {
      newFiled = slaveFiled.map((card, index) => {
        if (idx !== index) {
          return card;
        }
        return { ...card, hp };
      });
    }
    const masterHp = card.hp - slaveFiled[idx].att;
    let masterNewFiled = [];
    if (index !== -1 && masterHp <= 0) {
      masterNewFiled = masterFiled.filter((_, idx) => idx !== index);
    } else if (index !== -1) {
      masterNewFiled = masterFiled.map((card, idx) => {
        if (idx !== index) {
          return card;
        }
        return { ...card, hp };
      });
    } else {
      masterNewFiled = masterFiled;
      if (masterHp <= 0) {
        setTimeout(
          () => alert(`${my ? '승리하셨습니다.' : '패배하였습니다.'}`),
          500,
        );
      }
      if (my) {
        setRivalHero((hero) => ({ ...hero, hp: masterHp }));
      } else {
        setMyHero((hero) => ({ ...hero, hp: masterHp }));
      }
    }

    setRivalFiled(my ? masterNewFiled : newFiled);
    setMyFiled(my ? newFiled : masterNewFiled);
    setAttackCards((attackCards) => {
      const newAttackCards = [...attackCards];
      newAttackCards[index] = true;
      return newAttackCards;
    });
    setSelectFiled(null);
    if (index === -1) {
      setAttackHero(true);
    }
  };
  const heroClick = ({ turn, my, hero, masterFiled }) => {
    const index = selectFiled;
    if (turn && attackHero) {
      return;
    }
    if (turn && selectFiled === null) {
      setSelectFiled(-1);
      return;
    }
    if (!turn && selectFiled === null) {
      return;
    }
    const card = index === -1 ? (my ? rivalHero : myHero) : masterFiled[index];
    const hp = hero.hp - card.att;
    const masterHp = card.hp - hero.att;
    if (hp <= 0) {
      setTimeout(
        () => alert(`${my ? '패배하였습니다.' : '승리하셨습니다.'}`),
        500,
      );
    }
    if (my) {
      setMyHero((hero) => ({ ...hero, hp }));
      if (index === -1) {
        setRivalHero((hero) => ({ ...hero, hp: masterHp }));
      }
    } else {
      setRivalHero((hero) => ({ ...hero, hp }));
      if (index === -1) {
        setMyHero((hero) => ({ ...hero, hp: masterHp }));
      }
    }
    if (index !== -1) {
      let masterNewFiled = [];
      if (masterHp <= 0) {
        masterNewFiled = masterFiled.filter((_, idx) => idx !== index);
      } else if (index !== -1) {
        masterNewFiled = masterFiled.map((card, idx) => {
          if (idx !== index) {
            return card;
          }
          return { ...card, hp: masterHp };
        });
      }
      if (my) {
        setRivalFiled(masterNewFiled);
      } else {
        setMyFiled(masterNewFiled);
      }
    }
    setAttackCards((attackCards) => {
      const newAttackCards = [...attackCards];
      newAttackCards[index] = true;
      return newAttackCards;
    });
    setSelectFiled(null);
    if (index === -1) {
      setAttackHero(true);
    }
  };
  return (
    <>
      <Rival turn={!myTurn}>
        <div>
          코스트: <span>{rivalCost}</span>/<span>{rivalMaxCost}</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Card
            off={!myTurn && !!attackHero}
            on={!myTurn && selectFiled === -1}
            onClick={() => {
              heroClick({
                turn: !myTurn,
                my: false,
                hero: rivalHero,
                masterFiled: myFiled,
              });
            }}
          >
            <div>적 영웅</div>
            <CardAtt>{rivalHero.att}</CardAtt>
            <CardHp>{rivalHero.hp}</CardHp>
          </Card>
        </div>
        <div style={{ textAlign: 'center', height: 150 }}>
          {rivalFiled.map((card, idx) => {
            return (
              <React.Fragment key={`${JSON.stringify(card)}-${idx}`}>
                <Card
                  off={!myTurn && attackCards[idx]}
                  on={!myTurn && selectFiled === idx}
                  onClick={() => {
                    filedClick({
                      turn: !myTurn,
                      my: false,
                      masterFiled: myFiled,
                      slaveFiled: rivalFiled,
                      idx,
                    });
                  }}
                >
                  <CardCost>{card.cost}</CardCost>
                  <CardAtt>{card.att}</CardAtt>
                  <CardHp>{card.hp}</CardHp>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      </Rival>
      <RivalDeck>
        <div>덱</div>
        {riverDeck.map((card, idx) => {
          return (
            <React.Fragment key={`${JSON.stringify(card)}-${idx}`}>
              <Card
                onClick={() => {
                  deckClick({
                    turn: !myTurn,
                    cost: rivalCost,
                    deck: riverDeck,
                    filed: rivalFiled,
                    idx,
                    my: false,
                  });
                }}
              >
                <CardCost>{card.cost}</CardCost>
                <CardAtt>{card.att}</CardAtt>
                <CardHp>{card.hp}</CardHp>
              </Card>
            </React.Fragment>
          );
        })}
      </RivalDeck>
      <hr />
      <TurnButton
        onClick={() => {
          if (myTurn) {
            setMyMaxCost((cost) => Math.min(cost + 1, 10));
            setMyCost(Math.min(myMaxCost + 1, 10));
          } else {
            setRivalMaxCost((cost) => Math.min(cost + 1, 10));
            setRivalCost(Math.min(rivalMaxCost + 1, 10));
          }
          setSelectFiled(null);
          setAttackCards([]);
          setAttackHero(false);
          setMyTurn((myTurn) => !myTurn);
        }}
      >
        턴넘기기
      </TurnButton>
      <My turn={myTurn}>
        <div style={{ textAlign: 'center', height: 150 }}>
          {myFiled.map((card, idx) => {
            return (
              <React.Fragment key={`${JSON.stringify(card)}-${idx}`}>
                <Card
                  off={!!myTurn && attackCards[idx]}
                  on={!!myTurn && selectFiled === idx}
                  onClick={() => {
                    filedClick({
                      turn: myTurn,
                      my: true,
                      masterFiled: rivalFiled,
                      slaveFiled: myFiled,
                      idx,
                    });
                  }}
                >
                  <CardCost>{card.cost}</CardCost>
                  <CardAtt>{card.att}</CardAtt>
                  <CardHp>{card.hp}</CardHp>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Card
            off={!!myTurn && !!attackHero}
            on={!!myTurn && selectFiled === -1}
            onClick={() => {
              heroClick({
                turn: myTurn,
                my: true,
                hero: myHero,
                masterFiled: rivalFiled,
              });
            }}
          >
            <div>내 영웅</div>
            <CardAtt>{myHero.att}</CardAtt>
            <CardHp>{myHero.hp}</CardHp>
          </Card>
        </div>
        <div>
          코스트: <span>{myCost}</span>/<span>{myMaxCost}</span>
        </div>
      </My>
      <MyDeck>
        <div>덱</div>
        {myDeck.map((card, idx) => {
          return (
            <React.Fragment key={`${JSON.stringify(card)}-${idx}`}>
              <Card
                onClick={() => {
                  deckClick({
                    turn: myTurn,
                    cost: myCost,
                    deck: myDeck,
                    filed: myFiled,
                    idx,
                    my: true,
                  });
                }}
              >
                <CardCost>{card.cost}</CardCost>
                <CardAtt>{card.att}</CardAtt>
                <CardHp>{card.hp}</CardHp>
              </Card>
            </React.Fragment>
          );
        })}
      </MyDeck>
    </>
  );
};

export default JasStone;
