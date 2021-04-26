import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import Memo from '../components/memo/Memo';
import Spinner from '../components/spinner/Spinner';
import { getFireDB, updateFireDB } from '../utils/firebase';
import sendGAEvent, { GA_ACTION } from '../utils/ga';

const StyledLoading = styled.div`
  width: 100vw;
  height: 100vh;
  background: gray;
  display: flex;
  color: white;
  align-items: center;
`;

interface DataSnapshot {
  index_;
  node_;
  ref_;
}

const MemoPage: React.VFC = () => {
  const [loading, setLoading] = useState(true);
  const [memos, setMemos] = useState([]);

  const ref = useRef(null);
  const mounted = useRef(false);
  const pull = useRef(false);

  const onClickAdd = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if ((event.target as HTMLElement).dataset.wrap) {
        setMemos([
          ...memos,
          {
            id: uuid(),
            top: (window.event as MouseEvent).clientY,
            left: (window.event as MouseEvent).clientX,
            width: 200,
            height: 100,
            text: '',
          },
        ]);
      }
    },
    [memos],
  );

  const onClickDelete = (event) => {
    const newMomos = memos.filter((memo) => {
      return memo.id !== event.target.dataset.id;
    });
    setMemos(newMomos);
  };

  const onClickMove = (id, top, left) => {
    const memo = memos.find((memo) => {
      return memo.id === id;
    });
    const newMomos = memos.filter((memo) => {
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
      },
    ]);
  };

  const onClickResize = (id, width, height) => {
    const memo = memos.find((memo) => {
      return memo.id === id;
    });
    const newMomos = memos.filter((memo) => {
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
      },
    ]);
  };
  const onChangeText = (id, text) => {
    const memo = memos.find((memo) => {
      return memo.id === id;
    });
    const newMomos = memos.filter((memo) => {
      return memo.id !== id;
    });
    setMemos([
      ...newMomos,
      {
        id: memo.id,
        top: memo.top,
        left: memo.left,
        width: memo.width,
        height: memo.height,
        text: text,
      },
    ]);
  };

  const getItem = async () => {
    setLoading(false);
  };

  const setItem = async (memos) => {
    if (!mounted.current) {
      return (mounted.current = true);
    } else {
      if (pull.current) {
        pull.current = false;
      } else {
        updateFireDB(memos);
      }
    }
  };

  useEffect(() => {
    setItem(JSON.stringify(memos));
  }, [memos, onClickAdd]);

  useEffect(() => {
    const wrapRef = ref.current;
    wrapRef.addEventListener('contextmenu', onClickAdd, true);
    return () => wrapRef.removeEventListener('contextmenu', onClickAdd, true);
  }, [onClickAdd]);

  useEffect(() => {
    sendGAEvent('memo', GA_ACTION.EXPOSE, 'memo');
    getItem();
    const ref = getFireDB();
    ref.on('value', (value) => {
      console.log(222, value);

      try {
        pull.current = true;
        setMemos(JSON.parse((value as DataSnapshot).node_.value_));
      } catch (error) {
        updateFireDB([]);
      }
    });
  }, []);

  return (
    <div
      className="wrap"
      data-wrap={true}
      ref={ref}
      style={{ width: '100vw', height: '100vh' }}
    >
      {!!loading && (
        <StyledLoading>
          <Spinner />
        </StyledLoading>
      )}
      {!loading &&
        memos &&
        memos.map((memo) => {
          const { id, top, left, width, height, text } = memo;
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

export default MemoPage;
