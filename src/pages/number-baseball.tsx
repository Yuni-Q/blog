import React, { useCallback, useEffect, useState } from 'react';

const NumberBaseball: React.VFC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [tries, setTries] = useState<string[]>([]);
  const [triesText, setTriesText] = useState<string[]>([]);
  const [outCount, setOutCount] = useState(0);
  const [value, setValue] = useState('');
  const endCondition = tries.length > 9 || outCount > 2;
  const checkInput = useCallback(() => {
    if (value.length !== 4) {
      return alert('4자리 숫자를 입력해 주세요');
    }
    if (new Set(value).size !== 4) {
      return alert('중복되지 않게 입력해 주세요.');
    }
    if (tries.includes(value)) {
      return alert('이미 시도한 값입니다.');
    }
    return true;
  }, [value, tries]);
  useEffect(() => {
    const nums = new Array(9).fill(0).map((_, index) => index + 1);
    const newNumbers = [];
    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * nums.length);
      newNumbers.push(nums[index]);
      nums.splice(index, 1);
    }
    console.log(newNumbers);
    setNumbers(newNumbers);
  }, []);
  useEffect(() => {
    if (endCondition) {
      const answer = numbers.join('');
      setTriesText((triesText) => [
        ...triesText,
        `패배하였습니다. 정답은 ${answer}입니다.`,
      ]);
    }
  }, [tries, outCount]);
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (endCondition) {
            return;
          }
          if (!checkInput()) {
            return;
          }
          setValue('');

          setTries((tries) => [...tries, value]);
          const answer = numbers.join('');
          if (value === answer) {
            setTriesText((triesText) => [...triesText, `홈런`]);
            return;
          }

          let strike = 0;
          let ball = 0;
          numbers.forEach((element, idx) => {
            const index = value.indexOf(element.toString());
            if (index === idx) {
              strike += 1;
            } else if (index > -1) {
              ball += 1;
            }
          });
          if (!strike && !ball) {
            setTriesText((triesText) => [...triesText, `${value} : 아웃`]);
            setOutCount((outCount) => outCount + 1);
            return;
          }
          setTriesText((triesText) => [
            ...triesText,
            `${value} : ${strike}스트라이크, 볼 ${ball}`,
          ]);
        }}
      >
        <input
          type="text"
          value={value}
          minLength={4}
          maxLength={4}
          readOnly={endCondition}
          pattern="^(?!.*(.).*\1)\d{4}$"
          onChange={(e) => setValue(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button type="submit">확인</button>
      </form>
      <div>
        <div>
          아웃 카운트 : {outCount}
          {triesText.map((text) => {
            return (
              <div key={text} style={{ textAlign: 'center' }}>
                {text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NumberBaseball;
