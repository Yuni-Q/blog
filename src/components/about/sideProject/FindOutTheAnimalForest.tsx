import React from 'react';
import { Badge } from '../../../pages/about';

export const FindOutTheAnimalForest = () => {
  return (
    <>
      <h3>
        <a href="https://github.com/Yuni-Q/find-out-the-animal-forest">
          알아봐요 동물의 숲
        </a>
      </h3>
      <ul>
        <li>
          모아봐요 동물의 숲에 관한 최신 정보들을 쉽게 확인해 볼 수 있는
          앱(android, ios)
        </li>
        <li>
          주요 기능 : 물고기, 곤충, 마이디자인, 주민, 정보 제공 및 KK노래
          미리듣기
        </li>
        <li>서비스 기간 : 2020년 4월 ~ 2021년 1월</li>
        <li>
          <Badge>Node</Badge>
          <Badge>Express</Badge>
          <Badge>Typescript</Badge>
          <Badge>Sequelize</Badge>
          <Badge>MySQL</Badge>
          <Badge>EC2</Badge>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=38oB4rUzMVM&t=2s"
            target="_blank"
            rel="noreferrer"
          >
            시연 영상
          </a>
        </li>
      </ul>
    </>
  );
};
