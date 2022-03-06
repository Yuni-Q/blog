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
        <li>오늘보다 더 나은 내일의 나를 위해 암묵지 쌓기</li>
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
