import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Meme } from '../components/about/workExperiences/Meme';
import sendGAEvent, { GA_ACTION } from '../utils/ga';
import { rhythm } from '../utils/typography';
import { Info } from '../components/about/info/Info';
import { Connect } from '../components/about/info/Connect';
import { StudyWatson } from '../components/about/sideProject/StudyWatson';
import { MOTI } from '../components/about/sideProject/MOTI';
import { FindOutTheAnimalForest } from '../components/about/sideProject/FindOutTheAnimalForest';
import { Woowa } from '../components/about/workExperiences/Woowa';
import { SVm } from '../components/about/workExperiences/SVm';
import { BKM } from '../components/about/sideProject/BKM';
import { TILTIL } from '../components/about/sideProject/TILTIL';

const About: React.VFC = () => {
  useEffect(() => {
    sendGAEvent('resume', GA_ACTION.EXPOSE, 'resume');
  }, []);

  return (
    <Wrapper>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4,
          )}`,
        }}
      >
        <article>
          <Section>
            <Info />
            <Connect />
          </Section>
          <Section>
            <Woowa />
            <Meme />
            <SVm />
          </Section>
          <Section>
            <h2>
              <span className="u-shadow">Side Projects</span>
            </h2>
            <MOTI />
            <FindOutTheAnimalForest />
            <BKM />
            <TILTIL />
            <StudyWatson />
          </Section>
          <Section>
            <h2>
              <span className="u-shadow"> Community </span>
            </h2>
            <h3>Activity</h3>
            <ul>
              <li>
                <Badge>21.06 ~ 21.08</Badge> 우아한 테크캠프 멘토
              </li>
              <li>
                <Badge>20.05 ~ 21.05</Badge> DR 서포터즈 2기
              </li>
              <li>
                개발 동아리 활동
                <ul>
                  <li>
                    <Badge>21.07 ~ 22.02 </Badge> Nexters
                  </li>
                  <li>
                    <Badge>18.03 ~ 20.04</Badge> MASH-UP
                  </li>
                </ul>
              </li>
            </ul>
            <h3>Presentation</h3>
            <ul>
              <li>
                <a
                  href="https://speakerdeck.com/yuniq/frontend"
                  target="_blank"
                  rel="noreferrer"
                >
                  FRONTEND
                </a>
                <ul>
                  <li>
                    <Badge>2020.01.11</Badge> &apos;MASH-UP BACKEND&apos;
                    세미나에서 발표한 내용입니다.
                  </li>
                  <li>
                    프론트엔드를 공부하며 알게 되었던 부분들을 중심으로 HTML부터
                    React 이후까지 간랸한 이야기를 공유하였습니다.
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="https://techblog.woowahan.com/5327/"
                  target="_blank"
                  rel="noreferrer"
                >
                  셀프서비스 디자인시스템 #2 – 개발자 편
                </a>
              </li>
            </ul>

            <h3>수상</h3>
            <ul>
              <li>
                <Badge>2020.12.14</Badge> 2020 농식품 빅데이터 온라인 해커톤
                우수상(한국농수산식품유통공사)
              </li>
              <li>
                <Badge>2019.12.16</Badge> 핀테크 x 인슈어테크 해커톤 금융결제원
                우수상(과학기술정보통신부)
              </li>
              <li>
                <Badge>2018.01.19</Badge> HANAplatform 기반 IoT 고급 개발자 양성
                과정(NCS) BestProject상(멋쟁이사자처럼)
              </li>
            </ul>
            <h3>Education</h3>
            <ul>
              <li>
                <Badge>2011.03 ~ 2017.02</Badge> 경북대학교(신소재공학부
                전자재료공학 전공)
              </li>
              <li>
                <Badge>2008.03 ~ 2011.02</Badge> 대구공업고등학교(전자기계과)
              </li>
              <li>
                <Badge>2012.01 ~ 2014.01</Badge> 공군병(제 11전투 비행단 기계반)
              </li>
            </ul>
          </Section>
          <Section>
            <h2>
              <span className="u-shadow">Last Updated</span>
            </h2>
            <ul>
              <li>2022.03.04</li>
            </ul>
          </Section>
        </article>
      </div>
    </Wrapper>
  );
};
export default About;

const Wrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  table {
    margin: 12px 0 0;
  }
  h3 {
    margin-top: 24px;
  }
  ul {
    margin-top: 12px;
    ul {
      margin-top: 0;
    }
  }
  th {
    width: 120px;
    padding: 8px 0;
  }
  td {
    padding-left: 0;
  }
  a {
    color: #4d75f0;
    word-break: break-all;
  }
  li {
    color: #858585;
  }

  background: #f6f6f6;
`;

const Section = styled.section`
  background: #fff;
  padding: 36px;
  box-shadow: 1px 1px 10px 2px rgb(0 0 0 / 10%);
  & + & {
    margin-top: 24px;
  }
`;

export const DetailSection = styled.section<{ show: boolean; height: number }>`
  transition: height 0.4s;
  ${({ show, height }) =>
    show
      ? css`
          height: ${`${height || 0}px`};
        `
      : css`
          height: 0px;
        `};
  overflow: hidden;
  padding: 0 24px;
  background: #f2f6fe;
  margin: 16px 0 0;
  section + section {
    margin-top: 24px;
  }
  section:last-child {
    padding-bottom: 24px;
  }
`;

export const Button = styled.button<{ show: boolean }>`
  transition: all 0.4s;
  ${({ show }) =>
    show
      ? css`
          color: #4d75f0;
          background: #ebf1fe;
        `
      : css`
          color: #ffffff;
          background: #4d75f0;
        `};
  padding: 3px 8px 5px;
  border-radius: 12px;
  border: none;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.11em 0.3em;
  margin: 0 0.2em;
  border-radius: 0.3em;
  white-space: normal;
  border: 1.2px solid #da3a6a;
  background: #fffbfe;
  color: #da3a6a;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 500;
`;
