import React from 'react';
import { A, Badge, H3, Li, Ul } from '../../../pages/about';

export const StudyWatson = () => {
  return (
    <>
      <H3>
        <A
          href="https://github.com/mash-up-kr/study-watson"
          target="_blank"
          rel="noreferrer"
        >
          Study Watson
        </A>
      </H3>
      <Ul>
        <Li>
          효율적으로 스터디를 관리하는 가장 쉬운 방법을 제공하는 웹 서비스
          입니다.
        </Li>
        <Li>
          <Badge>React</Badge>
          <Badge>Redux</Badge>
          <Badge>Redux-Saga</Badge>
          <Badge>NEXT</Badge>
        </Li>
        <Li>
          <A
            href="https://www.youtube.com/watch?v=nKn6scRu-hk"
            target="_blank"
            rel="noreferrer"
          >
            시연 영상
          </A>
        </Li>
      </Ul>
    </>
  );
};
