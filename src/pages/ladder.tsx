import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Ladder = () => {
  const [sound, setSound] = useState(0.05);
  const [loading, setLoading] = useState(0);
  const [memberList, setMemberList] = useState([]);
  const [teamMemberList, setTeamMemberList] = useState({});
  const [choiceMemberList, setChoiceMemberList] = useState([]);
  const [choiceTeamMemberList, setChoiceTeamMemberList] = useState({});
  const [result, setResult] = useState([]);
  const drumRef = useRef(null);
  const goodRef = useRef(null);
  useEffect(() => {
    let time;
    if (loading > 0) {
      time = setInterval(() => {
        setLoading((loading) => {
          if (loading - 1 === 0) {
            const goodSound = goodRef.current as HTMLAudioElement;
            goodSound.volume = sound;
            goodSound.play();
          }
          return loading - 1;
        });
      }, 1000);
    }
    return () => clearInterval(time);
  }, [loading]);
  useEffect(() => {
    const get = async () => {
      const result = await axios.get(
        'https://script.google.com/macros/s/AKfycbwiRDzA_FHVDm7VFkBI6_fXGAehsCaHQ_a8S5E8gFy47bD1dgnYOxeyjw/exec',
      );
      if (result?.data?.items) {
        setMemberList(result.data.items);
      }
    };
    get();
  }, []);
  useEffect(() => {
    const list = {};
    memberList.forEach((item) => {
      if (!list[item.team]) {
        list[item.team] = [item];
      } else {
        list[item.team].push(item);
      }
    });
    setTeamMemberList(list);
    const choiceList = {};
    choiceMemberList.forEach((item) => {
      if (!choiceList[item.team]) {
        choiceList[item.team] = [item];
      } else {
        choiceList[item.team].push(item);
      }
    });
    setChoiceTeamMemberList(choiceList);
  }, [memberList, choiceMemberList]);
  return (
    <>
      <input
        type="range"
        min="0"
        step="0.05"
        max="1"
        value={sound}
        onChange={(e) => setSound(parseFloat(e.target.value))}
      />
      <div style={{ display: 'flex' }}>
        <audio ref={drumRef} src="/drum.mp3" />
        <audio ref={goodRef} src="/good.mp3" />
        {loading > 0 && <Spinner time={loading} />}
        <div style={{ margin: 16, textAlign: 'center' }}>
          <div
            onClick={() => {
              setChoiceMemberList([...memberList, ...choiceMemberList]);
              setMemberList([]);
            }}
          >
            <div
              style={{
                background: 'chartreuse',
                whiteSpace: 'nowrap',
                padding: 4,
              }}
            >
              모두 선택
            </div>
          </div>

          <div>
            {Object.keys(teamMemberList).map((key) => {
              if (teamMemberList[key].length === 0) {
                return;
              }
              return (
                <div
                  key={key}
                  onClick={() => {
                    const newMemberList = memberList.filter((member) => {
                      let isExist = false;
                      teamMemberList[key].map((item) => {
                        if (item.name === member.name) {
                          isExist = true;
                        }
                      });
                      return !isExist;
                    });
                    setMemberList(newMemberList);
                    const newChoiceMemberList = [
                      ...choiceMemberList,
                      ...teamMemberList[key],
                    ];
                    setChoiceMemberList([...newChoiceMemberList]);
                  }}
                >
                  <div style={{ background: 'aqua' }}>{key}</div>
                  {teamMemberList[key].map((user) => {
                    return (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          const newChoiceMemberList = [
                            ...choiceMemberList,
                            user,
                          ].filter((item, i, a) => {
                            return i == a.indexOf(item);
                          });
                          setChoiceMemberList([...newChoiceMemberList]);
                          setMemberList(
                            memberList.filter((member) => {
                              return member.name !== user.name;
                            }),
                          );
                        }}
                        key={user.name}
                      >
                        {user.name}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ margin: 16, textAlign: 'center' }}>
          <div>
            <div
              onClick={() => {
                setChoiceMemberList([]);
                setMemberList([...memberList, ...choiceMemberList]);
              }}
            >
              <div
                style={{ background: 'gray', whiteSpace: 'nowrap', padding: 4 }}
              >
                선택받은 사람들
              </div>
            </div>
            {Object.keys(choiceTeamMemberList).map((key) => {
              if (choiceTeamMemberList[key].length === 0) {
                return;
              }
              return (
                <div
                  key={key}
                  onClick={() => {
                    const newChoiceMemberList = choiceMemberList.filter(
                      (member) => {
                        let isExist = false;
                        choiceTeamMemberList[key].map((item) => {
                          if (item.name === member.name) {
                            isExist = true;
                          }
                        });
                        return !isExist;
                      },
                    );
                    setChoiceMemberList(newChoiceMemberList);
                    const newMemberList = [
                      ...memberList,
                      ...choiceTeamMemberList[key],
                    ];
                    setMemberList([...newMemberList]);
                  }}
                >
                  <div style={{ background: 'aquamarine' }}>{key}</div>
                  {choiceTeamMemberList[key].map((user) => {
                    return (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          const newMemberList = [...memberList, user];
                          setMemberList([...newMemberList]);
                          setChoiceMemberList(
                            choiceMemberList.filter((member) => {
                              return member.name !== user.name;
                            }),
                          );
                        }}
                        key={user.name}
                      >
                        {user.name}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ margin: 16, textAlign: 'center' }}>
          {choiceMemberList.map((member) => {
            return (
              <div key={member.name}>
                <input type="text" className="item" />
              </div>
            );
          })}
          {choiceMemberList.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setLoading(5);
                const drumSound = drumRef.current as HTMLAudioElement;
                drumSound.volume = sound;
                drumSound.play();
                const itemList = document.querySelectorAll('.item');
                let list = [...choiceMemberList];
                const result = [];

                itemList.forEach((item) => {
                  const value = (item as HTMLInputElement).value;
                  const index = Math.floor(Math.random() * list.length);
                  if (value) {
                    result.push({ name: list[index].name, value });
                  }
                  list = list.filter((_, idx) => {
                    return idx !== index;
                  });
                });
                setResult(result);
              }}
            >
              시작!! 하겠습니다 !!
            </button>
          )}
        </div>
        <div style={{ margin: 16, textAlign: 'center' }}>
          {result.map((item) => {
            return (
              <div key={item.name} style={{ whiteSpace: 'nowrap' }}>
                {item.name} : {item.value}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Ladder;

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background: fixed;
`;

const Div = styled.div`
  background: transparent;
  /*!
 * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
 * Copyright 2015 Daniel Cardoso <@DanielCardoso>
 * Licensed under MIT
 */
  .spinner {
    margin: 0 auto;
    background-color: transparent !important;
  }
  .la-ball-pulse,
  .la-ball-pulse > div {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .la-ball-pulse {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0;
    color: #d7dbe6;
  }
  .la-ball-pulse.la-dark {
    color: #333;
  }
  .la-ball-pulse > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }
  .la-ball-pulse {
    width: 54px;
    height: 18px;
  }
  .la-ball-pulse > div:nth-child(1) {
    -webkit-animation-delay: -200ms;
    -moz-animation-delay: -200ms;
    -o-animation-delay: -200ms;
    animation-delay: -200ms;
  }
  .la-ball-pulse > div:nth-child(2) {
    -webkit-animation-delay: -100ms;
    -moz-animation-delay: -100ms;
    -o-animation-delay: -100ms;
    animation-delay: -100ms;
  }
  .la-ball-pulse > div:nth-child(3) {
    -webkit-animation-delay: 0ms;
    -moz-animation-delay: 0ms;
    -o-animation-delay: 0ms;
    animation-delay: 0ms;
  }
  .la-ball-pulse > div {
    width: 8px;
    height: 8px;
    margin: 4px;
    border-radius: 100%;
    -webkit-animation: ball-pulse 1s ease infinite;
    -moz-animation: ball-pulse 1s ease infinite;
    -o-animation: ball-pulse 1s ease infinite;
    animation: ball-pulse 1s ease infinite;
  }
  .la-ball-pulse.la-sm {
    width: 26px;
    height: 8px;
  }
  .la-ball-pulse.la-sm > div {
    width: 4px;
    height: 4px;
    margin: 2px;
  }
  .la-ball-pulse.la-2x {
    width: 108px;
    height: 36px;
  }
  .la-ball-pulse.la-2x > div {
    width: 20px;
    height: 20px;
    margin: 8px;
  }
  .la-ball-pulse.la-3x {
    width: 162px;
    height: 54px;
  }
  .la-ball-pulse.la-3x > div {
    width: 30px;
    height: 30px;
    margin: 12px;
  }
  /*
  * Animation
  */
  @-webkit-keyframes ball-pulse {
    0%,
    60%,
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    30% {
      opacity: 0.1;
      -webkit-transform: scale(0.01);
      transform: scale(0.01);
    }
  }
  @-moz-keyframes ball-pulse {
    0%,
    60%,
    100% {
      opacity: 1;
      -moz-transform: scale(1);
      transform: scale(1);
    }
    30% {
      opacity: 0.1;
      -moz-transform: scale(0.01);
      transform: scale(0.01);
    }
  }
  @-o-keyframes ball-pulse {
    0%,
    60%,
    100% {
      opacity: 1;
      -o-transform: scale(1);
      transform: scale(1);
    }
    30% {
      opacity: 0.1;
      -o-transform: scale(0.01);
      transform: scale(0.01);
    }
  }
  @keyframes ball-pulse {
    0%,
    60%,
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    30% {
      opacity: 0.1;
      -webkit-transform: scale(0.01);
      -moz-transform: scale(0.01);
      -o-transform: scale(0.01);
      transform: scale(0.01);
    }
  }
`;

interface Props {
  time?: number;
}

// eslint-disable-next-line react/prop-types
const Spinner: React.FC<Props> = ({ time }) => {
  return (
    <StyledDiv>
      <Div>{time}</Div>
    </StyledDiv>
  );
};
