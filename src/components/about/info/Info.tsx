import React, { VFC } from 'react';
import { Badge } from '../../../pages/about';

export const Info: VFC = () => {
  return (
    <>
      <h1>
        이윤희<small>(FRONTEND DEVELOPER)</small>
      </h1>
      <ul>
        <li>웹 프론트엔드 개발자 이윤희입니다.</li>
        <li> 사람들의 니즈를 해결해주는 것을 좋아합니다.</li>
        <li>어제보다 발전 된 코드를 작성하기 위해 최선을 다하고 있습니다.</li>
        <li>
          Javascript를 좋아하며 Javascript를 통해 프론트와 백엔드 개발을 하고
          있습니다.
        </li>
        <li>
          현재 우아한형제들에서 React와 Mobx를 활용해 웹 프론트 개발을 하고
          있습니다.
        </li>
        <li style={{ whiteSpace: 'inherit' }}>
          <Badge>JavaScript</Badge>
          <Badge>TypeScript</Badge>
          <Badge>React</Badge>
          <Badge>Mobx</Badge>
          <Badge>Redux</Badge>
          <Badge>Redux-Saga</Badge>
          <Badge>Webpack</Badge>
          <Badge>Babel</Badge>
          <Badge>Next.js</Badge>
          <Badge>Node</Badge>
          <Badge>Express.js</Badge>
          <Badge>Styled-Components</Badge>
          <Badge>Storybook</Badge>
          <Badge>Nest.js</Badge>
        </li>
      </ul>
    </>
  );
};
