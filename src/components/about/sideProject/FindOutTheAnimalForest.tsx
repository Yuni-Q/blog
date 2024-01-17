import React from 'react';
import { A, Badge, H3, Ul } from '../../../pages/about';

export const FindOutTheAnimalForest = () => {
  return (
    <>
      <H3>
        <A href="https://github.com/Yuni-Q/find-out-the-animal-forest">
          알아봐요 동물의 숲
        </A>
      </H3>
      <Ul>
        <Ul>
          모아봐요 동물의 숲에 관한 최신 정보들을 쉽게 확인해 볼 수 있는
          앱(android, ios)
        </Ul>
        <Ul>
          주요 기능 : 물고기, 곤충, 마이디자인, 주민, 정보 제공 및 KK노래
          미리듣기
        </Ul>
        <Ul>서비스 기간 : 2020년 4월 ~ 2021년 1월</Ul>
        <Ul>
          <Badge>Node</Badge>
          <Badge>Express</Badge>
          <Badge>Typescript</Badge>
          <Badge>SequeUlze</Badge>
          <Badge>MySQL</Badge>
          <Badge>EC2</Badge>
        </Ul>
        <Ul>
          <A
            href="https://www.youtube.com/watch?v=38oB4rUzMVM&t=2s"
            target="_blank"
            rel="noreferrer"
          >
            시연 영상
          </A>
        </Ul>
      </Ul>
    </>
  );
};
