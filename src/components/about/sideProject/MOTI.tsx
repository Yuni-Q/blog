import React from 'react';
import { A, Badge, H3, Li, Ul } from '../../../pages/about';

export const MOTI = () => {
  return (
    <>
      <H3>
        <A
          href="https://github.com/Yuni-Q/ahobsu-node-backend"
          target="_blank"
          rel="noreferrer"
        >
          MOTI
        </A>
      </H3>
      <Ul>
        <Li>
          매일 하루에 한 번 받을 질문에 답하면서 자신을 기록하면 단순히 기록에서
          그치지 않고 당신이 기록한 일주일은 한 장의 꿈을 담은 카드로 완성해
          주는 iOS 앱
        </Li>
        <Li>기간 : 2020년 4월 ~</Li>
        <Li>역할 : 백엔드 개발</Li>
        <Li>
          V1: <Badge>Node</Badge>
          <Badge>Express</Badge>
          <Badge>Typescript</Badge>
          <Badge>Swagger</Badge>
          <Badge>JEST</Badge>
          <Badge>JWT</Badge>
          <Badge>SequeLize</Badge>
          <Badge>MySQL</Badge>
          <Badge>EC2</Badge>
          <Badge>S3</Badge>
        </Li>
        <Li>
          <A
            href="https://github.com/Yuni-Q/moti"
            target="_blank"
            rel="noreferrer"
          >
            초기 웹프로젝트
          </A>
          : <Badge>React</Badge>
          <Badge>Next</Badge>
          <Badge>styled-components</Badge>
        </Li>
        <Li>
          <A
            href="https://github.com/Yuni-Q/moti-backend"
            target="_blank"
            rel="noreferrer"
          >
            V2 및 웹프로젝트 병합
          </A>
          : <Badge>Nest</Badge>
          <Badge>TypeORM</Badge>
        </Li>
        <Li>
          <A
            href="https://www.youtube.com/watch?v=m91rLvwMmXo"
            target="_blank"
            rel="noreferrer"
          >
            MVP 시연 영상
          </A>
        </Li>
        <Li>
          <A
            href="https://apps.apple.com/kr/app/moti/id1496912171"
            target="_blank"
            rel="noreferrer"
          >
            앱 다운로드
          </A>
        </Li>
        <Li>
          <A href="https://moti.comany/" target="_blank" rel="noreferrer">
            MOTI 웹페이지
          </A>
        </Li>
      </Ul>
    </>
  );
};
