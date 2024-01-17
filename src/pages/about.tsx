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

const About = () => {
  useEffect(() => {
    sendGAEvent('resume', GA_ACTION.EXPOSE, 'resume');
  }, []);

  return (
    <Wrapper>
      <Div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4,
          )}`,
        }}
      >
        <Article>
          <MySection>
            <Info />
            <Connect />
          </MySection>
          <MySection>
            <H2>
              <Span className="u-shadow">Work Experiences</Span>
            </H2>
            <Woowa />
            <Meme />
            <SVm />
          </MySection>
          <MySection>
            <H2>
              <Span className="u-shadow">Side Projects</Span>
            </H2>
            <MOTI />
            <FindOutTheAnimalForest />
            <BKM />
            <TILTIL />
            <StudyWatson />
          </MySection>
          <MySection>
            <H2>
              <Span className="u-shadow"> Community </Span>
            </H2>
            <H3>Activity</H3>
            <Ul>
              <Li>
                <Badge>21.06 ~ 21.08</Badge> 우아한 테크캠프 멘토
              </Li>
              <Li>
                <Badge>20.05 ~ 21.05</Badge> DR 서포터즈 2기
              </Li>
              <Li>
                개발 동아리 활동
                <Ul>
                  <Li>
                    <Badge>21.07 ~ 22.02 </Badge> Nexters
                  </Li>
                  <Li>
                    <Badge>18.03 ~ 20.04</Badge> MASH-UP
                  </Li>
                </Ul>
              </Li>
            </Ul>
            <H3>Presentation</H3>
            <Ul>
              <Li>
                <A
                  href="https://speakerdeck.com/yuniq/frontend"
                  target="_blank"
                  rel="noreferrer"
                >
                  FRONTEND
                </A>
                <Ul>
                  <Li>
                    <Badge>2020.01.11</Badge> &apos;MASH-UP BACKEND&apos;
                    세미나에서 발표한 내용입니다.
                  </Li>
                  <Li>
                    프론트엔드를 공부하며 알게 되었던 부분들을 중심으로 HTML부터
                    React 이후까지 간랸한 이야기를 공유하였습니다.
                  </Li>
                </Ul>
              </Li>
              <Li>
                <A
                  href="https://techblog.woowahan.com/5327/"
                  target="_blank"
                  rel="noreferrer"
                >
                  셀프서비스 디자인시스템 #2 – 개발자 편
                </A>
              </Li>
            </Ul>

            <H3>수상</H3>
            <Ul>
              <Li>
                <Badge>2020.12.14</Badge> 2020 농식품 빅데이터 온라인 해커톤
                우수상(한국농수산식품유통공사)
              </Li>
              <Li>
                <Badge>2019.12.16</Badge> 핀테크 x 인슈어테크 해커톤 금융결제원
                우수상(과학기술정보통신부)
              </Li>
              <Li>
                <Badge>2018.01.19</Badge> HANAplatform 기반 IoT 고급 개발자 양성
                과정(NCS) BestProject상(멋쟁이사자처럼)
              </Li>
            </Ul>
            <H3>Education</H3>
            <Ul>
              <Li>
                <Badge>2011.03 ~ 2017.02</Badge> 경북대학교(신소재공학부
                전자재료공학 전공)
              </Li>
              <Li>
                <Badge>2008.03 ~ 2011.02</Badge> 대구공업고등학교(전자기계과)
              </Li>
              <Li>
                <Badge>2012.01 ~ 2014.01</Badge> 공군병(제 11전투 비행단 기계반)
              </Li>
            </Ul>
          </MySection>
          <MySection>
            <H2>
              <Span className="u-shadow">Last Updated</Span>
            </H2>
            <Ul>
              <Li>2022.09.04</Li>
            </Ul>
          </MySection>
        </Article>
      </Div>
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

export const Div = styled.div``;
export const Span = styled.span``;
export const A = styled.a``;
export const H1 = styled.h1``;
export const H2 = styled.h2``;
export const H3 = styled.h3``;
export const Article = styled.div``;
export const Ul = styled.ul``;
export const Li = styled.li``;
export const Table = styled.table``;
export const TBody = styled.tbody``;
export const Tr = styled.tr``;
export const Th = styled.th``;
export const Td = styled.td``;
export const Br = styled.br``;
export const Del = styled.del``;

export const Section = styled.section``;

const MySection = styled.section`
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
  display: inLine-block;
  padding: 0.11em 0.3em;
  margin: 0 0.2em;
  border-radius: 0.3em;
  white-space: normal;
  border: 1.2px soLid #da3a6a;
  background: #fffbfe;
  color: #da3a6a;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 500;
`;
