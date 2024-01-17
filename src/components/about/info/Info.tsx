import React from 'react';
import { Badge, H1, Li, Ul } from '../../../pages/about';

export const Info = () => {
  return (
    <>
      <H1>안녕하세요, 웹 프론트엔드 개발자 이윤희입니다.</H1>
      <Ul>
        <Li>
          단순히 빠르게 서비스를 만드는 것보다 유지보수 하기 좋은 코드를 만들기
          위해 노력하고 있습니다.
        </Li>
        <Li>
          개발자 개인의 실수를 방지할 수 있는 시스템을 만드는 것에 관심이
          많습니다.
        </Li>
        <Li>서비스를 개발할 때 사용자를 최우선으로 하는 개발을 지향합니다.</Li>
        <Li>동료와 함께 성장하는 것을 중요하게 생각합니다.</Li>
        <Li>정답을 찾기보다 우리만의 규칙을 만들어 가고 있습니다.</Li>

        <Li style={{ whiteSpace: 'inherit' }}>
          <Badge>JavaScript</Badge>
          <Badge>TypeScript</Badge>
        </Li>
        <Li>
          <Badge>React</Badge>
          <Badge>Next.js</Badge>
          <Badge>styled-components</Badge>
          <Badge>Storybook</Badge>
        </Li>
        <Li>
          <Badge>Mobx</Badge>
          <Badge>Redux</Badge>
          <Badge>Redux-Saga</Badge>
          <Badge>React-Query</Badge>
        </Li>
        <Li>
          <Badge>Webpack</Badge>
          <Badge>Babel</Badge>
        </Li>
        <Li>
          <Badge>Changesets</Badge>
          <Badge>Node</Badge>
          <Badge>Express.js</Badge>
          <Badge>Nest.js</Badge>
          <Badge>TypeORM</Badge>
        </Li>
      </Ul>
    </>
  );
};
