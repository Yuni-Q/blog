import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

type Words = { second: number; text: string }[];

const KKK: React.FC = () => {
  const [end, setEnd] = useState(false);
  const [words, setWords] = useState<Words>([]);
  const [index, setIndex] = useState(-1);
  const [text, setText] = useState('');
  const [point, setPoint] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [secondsArray, setSecondsArray] = useState<number[]>([]);
  const [date, setDate] = useState(0);
  const [count, setCount] = useState(0);
  const requestAnimationFrameId = useRef(0);

  useEffect(() => {
    if (seconds === 0 && point !== 0) {
      setPoint((point) => point - 1);
      setIndex((index) => index + 1);
    }
    const timer = () => {
      const newData = new Date().getTime();
      const diffDate = Math.floor((newData - date) / 1000);
      console.log(words[index]);
      const wordsSecond = words[index]?.second;
      if (wordsSecond - diffDate >= 0) {
        if (seconds !== wordsSecond - diffDate) {
          setSeconds(wordsSecond - diffDate);
        } else {
          clearInterval(requestAnimationFrameId.current);
          requestAnimationFrameId.current = requestAnimationFrame(timer);
        }
      }
    };
    clearInterval(requestAnimationFrameId.current);
    requestAnimationFrameId.current = requestAnimationFrame(timer);
    return () => clearInterval(requestAnimationFrameId.current);
  }, [seconds]);

  useEffect(() => {
    if (words.length > 0 && index > words.length - 1) {
      return setEnd(true);
    }
    if (words[index]?.second) {
      setSeconds(words[index].second);
      setDate(new Date().getTime());
    }
    if (words.length === 0) {
      const getWords = async () => {
        const { data }: { data: Words } = await axios(
          'https://my-json-server.typicode.com/kakaopay-fe/resources/words',
        );
        setWords(data);
        setPoint(data.length);
        setSecondsArray([]);
      };
      getWords();
    }
  }, [index, words]);
  if (end) {
    return (
      <div>
        <div>Mission Complete!</div>
        <div>당신의 점수는 {point}점입니다.</div>
        <div>
          단어당 평균 답변 시작은{' '}
          {secondsArray.reduce((prev, curr) => prev + curr, 0) / count}
          초입니다.
        </div>
        <button
          onClick={() => {
            setEnd(false);
            setIndex(0);
          }}
        >
          다시 시작
        </button>
      </div>
    );
  }
  return (
    <React.StrictMode>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (index >= 0 && index < words.length) {
              if (text === words[index].text) {
                setIndex((index) => index + 1);
                setText('');
                setSecondsArray((prevSecondsArray) => [
                  ...prevSecondsArray,
                  words[index].second - seconds,
                ]);
                setCount((count) => count + 1);
              }
            }
          }}
        >
          <div>남은 시간 : {seconds || 0}초</div>
          <div>점수 : {point}점</div>
          <div>{words[index]?.text || '문제 단어'}</div>
          <div>
            <input
              type="text"
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
          </div>
          <button type="submit">입력</button>
        </form>
        <button
          onClick={() => {
            setIndex(0);
            if (index > 0) {
              setIndex(-1);
            }
          }}
        >
          {index < 0 ? '시작' : '초기화'}
        </button>
      </div>
    </React.StrictMode>
  );
};

export default KKK;
