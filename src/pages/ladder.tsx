import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Ladder = () => {
  const [memberList, setMemberList] = useState([]);
  const [teamMemberList, setTeamMemberList] = useState({});
  const [choiceMemberList, setChoiceMemberList] = useState([]);
  const [choiceTeamMemberList, setChoiceTeamMemberList] = useState({});
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
    <div>
      <div
        onClick={() => {
          setChoiceMemberList([...memberList, ...choiceMemberList]);
          setMemberList([]);
        }}
      >
        <div style={{ background: 'gray' }}>모두 선택</div>
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
              <div style={{ background: 'red' }}>{key}</div>
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
      <div>
        <div
          onClick={() => {
            setChoiceMemberList([]);
            setMemberList([...memberList, ...choiceMemberList]);
          }}
        >
          <div style={{ background: 'gray' }}>선택받은 사람들</div>
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
              <div style={{ background: 'red' }}>{key}</div>
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
  );
};

export default Ladder;
