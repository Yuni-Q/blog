import React, { useCallback, useEffect, useState } from 'react';

interface Hero {
  name: string;
  level: number;
  maxHp: number;
  hp: number;
  xp: number;
  att: number;
}
const initHero = {
  name: '',
  level: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
};

interface Monster {
  name: string;
  hp: number;
  maxHp: number;
  att: number;
  xp: number;
}

const monsterList = [
  {
    name: '슬라임',
    hp: 25,
    maxHp: 25,
    att: 10,
    xp: 10,
  },
  {
    name: '스켈레톤',
    hp: 50,
    maxHp: 50,
    att: 15,
    xp: 20,
  },
  {
    name: '마왕',
    hp: 150,
    maxHp: 150,
    att: 30,
    xp: 50,
  },
];

const TextRpg: React.VFC = () => {
  const [isBattle, setIsBattle] = useState(false);
  const [message, setMessage] = useState('');
  const [hero, setHero] = useState<Hero>(null);
  const [monster, setMonster] = useState<Monster>(null);
  const attack = useCallback(() => {
    setMonster((monster) => ({ ...monster, hp: monster.hp - hero.att }));
    setHero((hero) => ({ ...hero, hp: hero.hp - monster.att }));
    setMessage(
      `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았습니다.`,
    );
  }, [hero, monster]);
  const heal = useCallback(() => {
    setHero((hero) => ({
      ...hero,
      hp: Math.min(hero.maxHp, hero.hp + 20) - monster.att,
    }));
  }, [hero, monster]);

  useEffect(() => {
    if (hero && hero.hp <= 0) {
      setMessage(`${hero.level} 레벨에서 전사. 새 주인공을 생성하세요 !`);
      setHero(null);
      setMonster(null);
      setIsBattle(false);
      return;
    }
    if (hero && monster && monster.hp <= 0) {
      setHero((hero) => ({ ...hero, xp: hero.xp + monster.xp }));
      setMonster(null);
      setIsBattle(false);
      return;
    }
    if (hero && hero.xp >= hero.level * 15) {
      setHero((hero) => {
        const maxHp = hero.maxHp + 5;
        return {
          ...hero,
          xp: hero.xp - hero.level * 15,
          level: hero.level + 1,
          maxHp: maxHp,
          hp: maxHp,
          att: hero.att + 5,
        };
      });
      setMessage(`레벨업! 레벨 ${hero.level + 1}`);
    }
  }, [hero, monster]);
  if (!hero?.name) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!e.target[0].value) {
            return alert('이름을 입력해주세요.');
          }
          setHero({ ...initHero, name: e.target[0].value });
        }}
      >
        <input type="text" placeholder="주인공 이름을 입력하세요!" />
        <button type="submit">시작</button>
        <div>{message}</div>
      </form>
    );
  }
  return (
    <div>
      <div>
        <button>이름 : {hero.name}</button>
        <button>레벨 : {hero.level}</button>
        <button>
          체력 : {hero.hp}/{hero.maxHp}
        </button>
        <button>공격력 :{hero.att}</button>
        <button>
          경험치 : {hero.xp}/{hero.level * 15}
        </button>
      </div>
      {!isBattle && (
        <div>
          <div>menu</div>
          <button
            onClick={() => {
              const newMonster =
                monsterList[Math.floor(Math.random() * monsterList.length)];
              setMonster({
                ...newMonster,
              });
              setIsBattle(true);
              setMessage(`몬스터와 마주쳤다. ${newMonster.name}인 것 같다!`);
            }}
          >
            1. 모험
          </button>
          <button
            onClick={() => {
              setHero((hero) => ({
                ...hero,
                hp: hero.maxHp,
              }));
            }}
          >
            2. 휴식
          </button>
          <button
            onClick={() => {
              setMessage(
                `${hero.level} 레벨에서 종료. 새 주인공을 생성하세요 !`,
              );
              setHero(null);
            }}
          >
            3. 종료
          </button>
        </div>
      )}
      {isBattle && (
        <div>
          <div>battle</div>
          <button
            onClick={() => {
              attack();
            }}
          >
            1. 공격
          </button>
          <button
            onClick={() => {
              heal();
            }}
          >
            2. 회복
          </button>
          <button
            onClick={() => {
              setIsBattle(false);
              setMonster(null);
              setMessage(`${monster.name}으로부터 도망쳤습니다.`);
            }}
          >
            3. 도망
          </button>
        </div>
      )}
      <div>{message}</div>
      {monster && (
        <div>
          <button>이름: {monster.name}</button>
          <button>
            체력 : {monster.hp}/{monster.maxHp}
          </button>
          <button>공격 :{monster.att}</button>
        </div>
      )}
    </div>
  );
};

export default TextRpg;
