import axios from 'axios';
import React,{useCallback,useEffect,useRef,useState} from "react";
import styled from 'styled-components';
import Memo from "../components/memo/Memo";
import Spinner from '../components/spinner/Spinner';
import sendGAEvent,{GA_ACTION} from '../utils/ga';

const { v4: uuid } = require('uuid');

const StyledLoading = styled.div`
  width: 100vw;
  height: 100vh;
  background: gray;
  display: flex;
  color: white;
  align-items: center;
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [memos, setMemos] = useState([]);

  const ref = useRef(null);

  const onClickAdd = useCallback(
    event => {
      event.preventDefault();
      if (event.target.dataset.wrap) {
        setMemos([
          ...memos,
          {
            id: uuid(),
            top: (window.event as any).clientY,
            left: (window.event as any).clientX,
            width: 200,
            height: 100,
            text: '',
          }
        ]);
      }
    },
    [memos]
  );

  const onClickDelete = event => {
    const newMomos = memos.filter(memo => {
      return memo.id !== event.target.dataset.id;
    });
    setMemos(newMomos);
  };

  const onClickMove = (id, top, left) => {
    const memo = memos.find(memo => {
      return memo.id === id;
    });
    const newMomos = memos.filter(memo => {
      return memo.id !== id;
    });
    setMemos([
      ...newMomos,
      {
        id: uuid(),
        top: parseInt(top, 10),
        left: parseInt(left, 10),
        width: memo.width,
        height: memo.height,
        text: memo.text,
      }
    ]);
  };

  const onClickResize = (id, width, height) => {
    const memo = memos.find(memo => {
      return memo.id === id;
    });
    const newMomos = memos.filter(memo => {
      return memo.id !== id;
    });
    setMemos([
      ...newMomos,
      {
        id: uuid(),
        top: memo.top,
        left: memo.left,
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        text: memo.text,
      }
    ]);
  };
  const onChangeText = (id, text) => {
    const memo = memos.find(memo => {
      return memo.id === id;
    });
    const newMomos = memos.filter(memo => {
      return memo.id !== id;
    });
    setMemos([
      ...newMomos,
      {
        id: uuid(),
        top: memo.top,
        left: memo.left,
        width: memo.width,
        height: memo.height,
        text: text,
      }
    ]);
  }

  const getItem = async () => {
    const result = await axios.get('https://script.google.com/macros/s/AKfycbwn9aYX70mvprKz1IbJezxqzXCDP2-24tjJ9qdjIqlcgOkLsshg/exec');
    setMemos(JSON.parse(result.data.items[0].name) || [])
    setLoading(false)
  }
  
  const setItem = async (memos) => {
    await axios.post(`https://script.google.com/macros/s/AKfycbwn9aYX70mvprKz1IbJezxqzXCDP2-24tjJ9qdjIqlcgOkLsshg/exec?data=${memos}`)
    window.postMessage('hi', "https://yuni-q.github.io/");
    //window.postMessage(JSON.stringify(memos), "https://yuni-q.github.io/");
    console.log(444,JSON.stringify(memos))
  }

  useEffect(() => {
    setItem(JSON.stringify(memos))
  }, [memos, onClickAdd]);

  useEffect(() => {
    const wrapRef = ref.current;
    wrapRef.addEventListener("contextmenu", onClickAdd, true);
    return () => wrapRef.removeEventListener("contextmenu", onClickAdd, true);
  }, [onClickAdd]);


  useEffect(() => {
    sendGAEvent('memo', GA_ACTION.EXPOSE, 'memo');
    getItem();

    const getMessage = ((event) => {
      console.log(111, event.data)
      console.log(222, JSON.parse(event.data))
      setMemos(JSON.parse(event.data))
    });
  
    window.addEventListener('message', function(event) {
      console.log(111, event.data)
      console.log(222, JSON.parse(event.data))
    });
  },[])
  

  return (
    <div
      className="wrap"
      data-wrap={true}
      ref={ref}
      style={{ width: "100vw", height: "100vh" }}
    >
      {!!loading && <StyledLoading><Spinner /></StyledLoading>}
      {!loading && memos &&
        memos.map(memo => {
          const { id, top, left, width, height,text } = memo;
          return (
            <Memo
              key={id}
              id={id}
              top={top}
              left={left}
              width={width}
              height={height}
              text={text}
              onClickDelete={onClickDelete}
              onClickMove={onClickMove}
              onClickResize={onClickResize}
              onChangeText={onChangeText}
            />
          );
        })}
    </div>
  );
};

export default App;