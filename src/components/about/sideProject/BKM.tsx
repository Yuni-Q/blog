import React from 'react';
import { A, Badge, H3, Li, Ul } from '../../../pages/about';

export const BKM = () => {
  return (
    <>
      <H3>
        <A
          href="https://github.com/Nexters/gamsung-routine-front"
          target="_blank"
          rel="noreferrer"
        >
          본캐마스터
        </A>
      </H3>
      <Ul>
        <Li>
          테스크 템플릿을 제공하여 루틴을 쉽게 생성할 수 있도록 도와주고 친구와
          테스크를 공유하여 성취감을 얻는 루틴 메이커 앱 서비스
        </Li>
        <Li>
          <Badge>React-Native</Badge>
          <Badge>Typescript</Badge>
          <Badge>Mobx</Badge>
          <Badge>swr</Badge>
        </Li>
        <Li>
          <A
            href="https://www.youtube.com/watch?v=mwz1hItJgUU"
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
