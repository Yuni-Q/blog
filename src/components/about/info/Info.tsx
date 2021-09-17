import React, { VFC } from 'react';
import { Badge } from '../../../pages/about';

export const Info: VFC = () => {
  return (
    <>
      <h1>안녕하세요, 웹 프론트엔드 개발자 이윤희입니다.</h1>
      <ul>
        <li>
          단순히 빠르게 서비스를 만드는 것보다 유지보수 하기 좋은 코드를 만들기
          위해 노력하고 있습니다.
        </li>
        <li>
          개발자 개인의 실수를 방지할 수 있는 시스템을 만드는 것에 관심이
          많습니다.
        </li>
        <li>서비스를 개발할 때 사용자를 최우선으로 하는 개발을 지향합니다.</li>
        <li>동료와 함께 성장하는 것을 중요하게 생각합니다.</li>
        <li>정답을 찾기보다 우리만의 규칙을 만들어 가고 있습니다.</li>
        <li style={{ whiteSpace: 'inherit' }}>
          <Badge>JavaScript</Badge>
          <Badge>TypeScript</Badge>
        </li>
        <li>
          <Badge>React</Badge>
          <Badge>Next.js</Badge>
          <Badge>styled-components</Badge>
          <Badge>Storybook</Badge>
        </li>
        <li>
          <Badge>Mobx</Badge>
          <Badge>Redux</Badge>
          <Badge>Redux-Saga</Badge>
          <Badge>swr</Badge>
        </li>
        <li>
          <Badge>Webpack</Badge>
          <Badge>Babel</Badge>
        </li>
        <li>
          <Badge>Node</Badge>
          <Badge>Express.js</Badge>
          <Badge>Nest.js</Badge>
          <Badge>TypeORM</Badge>
        </li>
      </ul>
    </>
  );
};
