import React, { VFC } from 'react';
import { Badge } from '../../../pages/about';

export const TILTIL: VFC = () => {
  return (
    <>
      <h3>
        <a
          href="https://github.com/Nexters/TILTIL_FRONT"
          target="_blank"
          rel="noreferrer"
        >
          bing-bong
        </a>
      </h3>
      <ul>
        <li>
          <a href="https://bing-bong.today/" target="_blank" rel="noreferrer">
            웹사이트
          </a>
        </li>
        <li>
          <a
            href="https://www.wanted.co.kr/community/post/3251?fbclid=IwAR17fEP_2Pyws6zDu6uo9KYq92YA3_vtk9GzVxKMYOQWkzY8AaCBOhYz1dE"
            target="_blank"
            rel="noreferrer"
          >
            서비스 소개 및 회고
          </a>
        </li>
        <li>
          <a
            href="https://www.wanted.co.kr/community/post/2612?fbclid=IwAR3Fh7QLJ8WLJebN9kXzEQuWnrK_oIaGP_nDA2FuKCYIXNJYW2wJOyDmAWs"
            target="_blank"
            rel="noreferrer"
          >
            해커톤 회고록
          </a>
        </li>
        <li>기간 : 2022년 2월</li>
        <li>역할 : 프론트 개발</li>
        <li>
          <Badge>Typescript</Badge>
          <Badge>NEXT</Badge>
          <Badge>emotion</Badge>
          <Badge>React-query</Badge>
          <Badge>GitHub Action</Badge>
          <Badge>Recoil</Badge>
        </li>
      </ul>
    </>
  );
};
