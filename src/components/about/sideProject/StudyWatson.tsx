import React, { VFC } from 'react';
import { Badge } from '../../../pages/about';

export const StudyWatson: VFC = () => {
  return (
    <>
      <h3>
        <a
          href="https://github.com/mash-up-kr/study-watson"
          target="_blank"
          rel="noreferrer"
        >
          Study Watson
        </a>
      </h3>
      <ul>
        <li>
          효율적으로 스터디를 관리하는 가장 쉬운 방법을 제공하는 웹 서비스
          입니다.
        </li>
        <li>
          <Badge>React</Badge>
          <Badge>Redux</Badge>
          <Badge>Redux-Saga</Badge>
          <Badge>NEXT</Badge>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=nKn6scRu-hk"
            target="_blank"
            rel="noreferrer"
          >
            시연 영상
          </a>
        </li>
      </ul>
    </>
  );
};
