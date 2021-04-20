import React, { useEffect, useRef, useState } from 'react';

// TODO : 검색 api를 써서 유효한 글자인지 점검
const WordRelay: React.VFC = () => {
  const inputRef = useRef(null as HTMLInputElement);
  const [word, setWord] = useState('');
  const [newWord, setNewWord] = useState('');
  const [order, setOrder] = useState(1);
  const [number, setNumber] = useState(1);
  useEffect(() => {
    let number = 0;
    do {
      number = parseInt(prompt('몇 명이 참가하나요?'), 10);
      console.log(number);
    } while (isNaN(number) || typeof number !== 'number');
    setNumber(number);
    inputRef.current.focus();
  }, []);
  return (
    <form
      style={{
        height: '100vh',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (
          (!word || word[word.length - 1] === newWord[0]) &&
          newWord.length === 3
        ) {
          setWord(newWord);
          setNewWord('');
          setOrder((order) => (order + 1 > number ? 1 : order + 1));
        } else {
          alert('올바르지 않는 단어입니다.');
          setNewWord('');
        }
        inputRef.current.focus();
      }}
    >
      <div>
        <span>{order}</span>번째 참가자
      </div>
      <div>
        제시어 : <span>{word}</span>
      </div>
      <input
        style={{ margin: '8px 0' }}
        ref={inputRef}
        type="text"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
      />
      <button type="submit">입력</button>
    </form>
  );
};

export default WordRelay;
