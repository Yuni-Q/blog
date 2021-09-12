import React, { VFC } from 'react';
import { Badge } from '../../../pages/about';

export const MOTI: VFC = () => {
  return (
    <>
      <h3>
        <a
          href="https://github.com/Yuni-Q/ahobsu-node-backend"
          target="_blank"
          rel="noreferrer"
        >
          MOTI
        </a>
      </h3>
      <ul>
        <li>
          매일 하루에 한 번 받을 질문에 답하면서 자신을 기록하면 단순히 기록에서
          그치지 않고 당신이 기록한 일주일은 한 장의 꿈을 담은 카드로 완성해
          주는 iOS 앱
        </li>
        <li>기간 : 2020년 4월 ~</li>
        <li>역할 : 백엔드 개발</li>
        <li>
          V1: <Badge>Node</Badge>
          <Badge>Express</Badge>
          <Badge>Typescript</Badge>
          <Badge>Swagger</Badge>
          <Badge>JEST</Badge>
          <Badge>JWT</Badge>
          <Badge>Sequelize</Badge>
          <Badge>MySQL</Badge>
          <Badge>EC2</Badge>
          <Badge>S3</Badge>
        </li>
        <li>
          <a
            href="https://github.com/Yuni-Q/moti"
            target="_blank"
            rel="noreferrer"
          >
            초기 웹프로젝트
          </a>
          : <Badge>React</Badge>
          <Badge>Next</Badge>
          <Badge>styled-components</Badge>
        </li>
        <li>
          <a
            href="https://github.com/Yuni-Q/moti-backend"
            target="_blank"
            rel="noreferrer"
          >
            V2 및 웹프로젝트 병합
          </a>
          : <Badge>Nest</Badge>
          <Badge>TypeORM</Badge>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=m91rLvwMmXo"
            target="_blank"
            rel="noreferrer"
          >
            MVP 시연 영상
          </a>
        </li>
        <li>
          <a
            href="https://apps.apple.com/kr/app/moti/id1496912171"
            target="_blank"
            rel="noreferrer"
          >
            앱 다운로드
          </a>
        </li>
        <li>
          <a href="https://moti.comany/" target="_blank" rel="noreferrer">
            MOTI 웹페이지
          </a>
        </li>
      </ul>
    </>
  );
};
