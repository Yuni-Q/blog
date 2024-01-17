import React from 'react';
import { A, Badge, H3, Li, Ul } from '../../../pages/about';

export const TILTIL = () => {
  return (
    <>
      <H3>
        <A
          href="https://github.com/Nexters/TILTIL_FRONT"
          target="_blank"
          rel="noreferrer"
        >
          bing-bong
        </A>
      </H3>
      <Ul>
        <Li>
          <A href="https://bing-bong.today/" target="_blank" rel="noreferrer">
            웹사이트
          </A>
        </Li>
        <Li>
          <A
            href="https://www.wanted.co.kr/community/post/3251?fbclid=IwAR17fEP_2Pyws6zDu6uo9KYq92YA3_vtk9GzVxKMYOQWkzY8AaCBOhYz1dE"
            target="_blank"
            rel="noreferrer"
          >
            서비스 소개 및 회고
          </A>
        </Li>
        <Li>
          <A
            href="https://www.wanted.co.kr/community/post/2612?fbclid=IwAR3Fh7QLJ8WLJebN9kXzEQuWnrK_oIaGP_nDA2FuKCYIXNJYW2wJOyDmAWs"
            target="_blank"
            rel="noreferrer"
          >
            해커톤 회고록
          </A>
        </Li>
        <Li>기간 : 2022년 2월</Li>
        <Li>역할 : 프론트 개발</Li>
        <Li>
          <Badge>Typescript</Badge>
          <Badge>NEXT</Badge>
          <Badge>emotion</Badge>
          <Badge>React-query</Badge>
          <Badge>GitHub Action</Badge>
          <Badge>Recoil</Badge>
        </Li>
      </Ul>
    </>
  );
};
