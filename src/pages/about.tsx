import React, { useEffect } from 'react';
import styled from 'styled-components';
import sendGAEvent, { GA_ACTION } from '../utils/ga';
import { rhythm } from '../utils/typography';

interface Props {
  data: {
    allMarkdownRemark: {
      edges: { node: { frontmatter: { lang: string }; html: string } }[];
    };
  };
}

const About: React.VFC<Props> = () => {
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
            <h1>
              이윤희<small>(FRONTEND DEVELOPER)</small>
            </h1>
            <ul>
              <li>웹 프론트엔드 개발자 이윤희입니다.</li>
              <li> 사람들의 니즈를 해결해주는 것을 좋아합니다.</li>
              <li>
                어제보다 발전 된 코드를 작성하기 위해 최선을 다하고 있습니다.
              </li>
              <li>
                Javascript를 좋아하며 Javascript를 통해 프론트와 백엔드 개발을
                하고 있습니다.
              </li>
              <li>
                현재 우아한형제들에서 React와 Mobx를 활용해 웹 프론트 개발을
                하고 있습니다.
              </li>
              <li style={{ whiteSpace: 'inherit' }}>
                <code className="language-text">JavaScript</code>
                <code className="language-text">TypeScript</code>
                <code className="language-text">React</code>
                <code className="language-text">Mobx</code>
                <code className="language-text">Redux</code>
                <code className="language-text">Redux-Saga</code>
                <code className="language-text">Webpack</code>
                <code className="language-text">Babel</code>
                <code className="language-text">NEXT</code>
                <code className="language-text">Node</code>
                <code className="language-text">Express</code>
                <code className="language-text">Styled-Components</code>
                <code className="language-text">Storybook</code>
                <code className="language-text">Express</code>
              </li>
            </ul>
            <table>
              <tbody>
                <tr>
                  <th>GitHub</th>
                  <td>
                    <a
                      href="https://github.com/Yuni-Q"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://github.com/Yuni-Q
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    <a href="mailto:lyh6425@gmail.com">lyh6425@gmail.com</a>
                  </td>
                </tr>
                <tr>
                  <th>LinkedIn</th>
                  <td>
                    <a
                      href="https://www.linkedin.com/in/yuni-q"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://www.linkedin.com/in/yuni-q
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>
          <Section>
            <h2>
              <span className="u-shadow">Work Experiences</span>
            </h2>
            <h3>
              <a
                href="https://www.woowahan.com/"
                target="_blank"
                rel="noreferrer"
              >
                우아한형제들
              </a>
            </h3>
            <table>
              <tbody>
                <tr>
                  <th>period</th>
                  <td>19.08 ~ Current</td>
                </tr>
                <tr>
                  <th>position</th>
                  <td>Front-End Engineer</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>배달의민족 주문하기 및 결제하기 웹뷰 개발/운영개선</li>
              <li>
                배달의민족 대표 B2B서비스채널인 `배민사장님광장` 웹서비스
                Front-end 개발/운영개선 -
              </li>
              <li>
                배민사장님광장 외 B2B서비스채널(전자계약서, 업주 요청 등의
                웹서비스) 개발/운영개선
              </li>
              <li>배달의 민족 주문접수 앱 웹뷰 개발</li>
            </ul>
            {/* 플랫폼실/업주시스템팀, B2B서비스실/B2B서비스팀, B2B서비스실/사장님서비스팀, B2B서비스실/사장님광장팀, 배민결제서비스실/결제서비스개발팀 */}
            {/* <details>
              <summary>12개의 프로젝트</summary>
              #### 배민 통합 결제 플랫폼 - `Typescript` `React` `Mobx` - 각 지면
              주문하기 웹뷰 및 배민페이 관리 웹뷰 - 배민, 배민라이더스, 비마트,
              선물하기, 가족계정, 브랜드오더, 배민페이 웹뷰 - 21.06 ~
              <details>
                <summary>주요 업무</summary>- 문서 최신화, 정리 및 실행환경 개선
                - pay-platform 브랜치 정리 및 브랜치 전략 수정 - 센트리 소스맵
                추가로 인해 디거핑 편의성 증가
              </details>
              #### 배민페이 프론트 - `Typescript` `React` - 전국별미,
              배민쇼핑라이브의 배민페이 관련 npm 모듈 관리 - 배민 통합 결제
              플랫폼의 배민페이 관련 sub module 관리 - 21.06 ~ #### PLCC
              현대카드 이벤트 페이지 지원 업무 - 21.06 ~ #### 배민페이 내의
              pay-edge-ui - 배달의민족 내의 결제 페이지 웹뷰 - 배민,
              배민라이더스, 비마트, 선물하기, 가족계정, 브랜드오더, 배민페이,
              전국별미, 배민쇼핑라이브 - 21.06 ~ #### 주문접수앱 웹뷰 -
              `Typescript` `React` `Redux` `Express` - 배달의민족 업주님들이
              사용하는 앱의 웹뷰 - 20.11 ~ 21.01
              <details>
                <summary>주요 업무</summary>- 배달대행사 연결 및 관리 웹뷰 작업
                - AI 배달 예상 시간 안내 웹뷰 작업
              </details>
              #### post 배사광 - `Typescript` `React` `Mobx` `SWR`,
              `react-hooks-form` - 배달의민족 대표 B2B서비스채널인
              `배민사장님광장` 웹서비스 Front-end 개발/운영개선 프로젝트 리뉴얼
              - 20.11 ~ 21.05
              <details>
                <summary>주요 업무</summary>- 프로젝트 초기 React Application
                Architecture 설계 - 브랜치 전략 구상(master/deploy/feature) -
                젠킨스 구성(master의 최신 커밋이 base가 아니라면 배포 불가능) -
                허스키 도입(rebase시 현재 브랜치 최신화 후 진행) - 내정보 페이지
                및 하위 페이지 작업 - webpack 및 babel 설정 - Dialog 추가 -
                FormCard 추가 - swr 도입 - 글로벌 스타일 추가(스타일 가이드
                구성) - boxModel 글로벌 클래스 추가 - color 값 정의 - color
                글로벌 클래스 추가 - typo 글로벌 클래스 추가 - 메인홈 페이지
                작업 - 오픈을 위한 전체적인 QA - 점검 및 프론트 배포 여부
                주기적인 체크 - 개인 정보 페이지 브라우저 뒤로가기 버튼으로 인해
                이동 시 새로고침 - 사파리에서 새로고침이 되지 않는 이슈 해결 -
                배사광 리뉴얼 배포(3/24) - 리팩토링 작업
              </details>
              #### super2 - B2B서비스채널(전자계약서, 업주 요청 등의 웹서비스)
              개발/운영개선 - 20.07 ~ 20.11 - `Typescript` `React` `Spring`
              <details>
                <summary>주요 업무</summary>- e2e test(testcafe) 작성 - tslint를
                eslint로 변경 - 슈퍼2 설정 정리 및 실행 환경 간소화 - 가게
                영상/사진 관리 기능 추가 - 전통시장카테고리 기능 추가 - 배민오더
                오프라인 정보 기능 추가 - 가게 편의 정보 기능 추가 - 전자계약서
                e2e TEST(testcafe) 작성 - 전자 계약서 내 메뉴 신청 양식 변경
              </details>
              #### ceo-moon-front - 배달의민족 대표 B2B서비스채널인
              `배민사장님광장` 웹서비스 Front-end 개발/운영개선(셀프서비스
              제외한 부분) - 20.06 ~ 21.01 - `Javascript` `WoowahanJS`
              <details>
                <summary>주요 업무</summary>- AB test 구성 및 테스트 -
                배민트렌드 2021 이벤트 페이지
              </details>
              #### ceo-web-self-service - 배달의민족 대표 B2B서비스채널인
              `배민사장님광장` 웹서비스 Front-end 개발/운영개선(셀프서비스 부분)
              - 20.01 ~ 20.10 - `TypeScript` `React` `Mobx` `React-Router`
              <details>
                <summary>주요 업무</summary>- 사장님 광장 내의 셀프 서비스
                오픈(20.02.25일 오픈) - ceo-web-design-system를 활용해서 서비스
                Front-end 개발 - 메뉴 시스템 개선(20.07.14 오픈) -
                ceo-selfservice-front(react, redux)를 ceo-web-design-system를
                활용해서 ceo-web-self-service(react, mobx)로 내제화 - 스마트
                메뉴 기능 대거 추가 - e2e test(testcafe) 작성 - A/B test 구성 -
                로컬 환경에서 https 적용 - class component method binding 규칙
                논의
              </details>
              #### ceo-web-design-system - B2B서비스채널을 위한 디자인 시스템
              구축/운영개선 - 19.10 ~ 20.10 - `TypeScript` `React` `Mobx`
              `React-Router`
              <details>
                <summary>주요 업무</summary>- 프로젝트 초기 React Application
                Architecture 설계 - 새로운 프로젝트 개발 환경 및 구조 연구하고
                설계 참여 - 다른 프로젝트에서 사용 될 공통 디자인 시스템
                컴포넌트 작성 및 수정 - Storybook을 통한 UI 검증 프로세스 간소화
              </details>
              #### ceo-selfservice-front - 배달의 민족을 사용하는 사장님들의
              메뉴 관리를 위한 서비스 웹 서비스 개발/운영개선 - 19.08 ~ 20.01 -
              `TypeScript` `React` `Redux` `Redux-Saga` `React-Router` `JEST`
              <details>
                <summary>주요 업무</summary>- ceo-web-self-service로 병합 후
                프로젝트 종료 - 1인분 메뉴 가격 최소, 최대값 입력 제한 개발 -
                메뉴 타입 설정 기능 개발 - 메뉴구성 / 메뉴 설정 기능 추가 개발 -
                옵션 최대 / 최소값 기능 개발
              </details>
              #### smartmenu-admin-front - 배달의 민족을 사용하는 사장님들의
              메뉴 관리를 위한 서비스의 회사 내부 관리 웹 서비스 개발/운영개선 -
              19.08 ~ 20.01 - `TypeScript` `React` `Redux` `Redux-Saga`
              `React-Router` `Antd`
              <details>
                <summary>주요 업무</summary>- 메뉴 매핑 정보 체크 가능 개발 -
                1인분 메뉴 가격 최소 / 최대값 입력 제한 개발 - 운영자 권한 관리
                라이트버전 개발 - 시스템 관련 라우팅 분리 - 프랜차이즈 메뉴 할인
                기능 개발
              </details>
            </details> */}
            <h3>
              <a href="https://m.memebox.com/" target="_blank" rel="noreferrer">
                미미박스
              </a>
            </h3>
            <table>
              <tbody>
                <tr>
                  <th>period</th>
                  <td>19.01.23 ~ 19.08.23</td>
                </tr>
                <tr>
                  <th>position</th>
                  <td>프론티어 / Front-End Engineer</td>
                </tr>
                <tr>
                  <th>projects</th>
                  <td>
                    <ul>
                      <li>React Mobile-Web & WebView</li>
                      <li>Handlebaz Web, Handlebaz</li>
                      <li>Handlebaz Mobile-Web & WebView</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>화장품 e-commerce MEMEBOX 웹 프론트엔드 개발</li>
            </ul>
            {/* <details>
              <summary>2개의 Project</summary>
              #### MEMEBOX Mobile Web & WebView - React로 구성 된 모바일 웹과
              웹뷰 서비스 - 19.01.23 ~ 19.08.23 - `TypeScript` `React` `Redux`
              `Redux-Thunk` `React-Router` `Apollo`
              <details>
                <summary>주요 업무</summary>- 기존 handlebaz로 구성되어 있던
                모바일 웹 리액트로 리뉴얼 - 퍼블리싱 없이 기획자와 디자이너의
                기획서와 제플린을 통한 HTML, CSS, JS 작업(HTML, CSS 리드) - 기존
                탭 리뉴얼 및 새로운 프로모션 탭 제작 - 앱 웹뷰 지원(안드로이드
                4.4 지원까지) - iOS에서는 CSS 속성으로 스크롤이 지워지지 않아
                임의의 방법으로 제거 - Apollo GraphQL 활용 - React Hooks 도입
                리드 - carousel에 영상 추가 및 위치에 따른 영상 재생 컨트롤 기능
                개발 - GTM 및 사내 웹 로그 로직 추가 및 모듈화 - GitLab CI 수정
                및 PM2 ecosystem 도입 리드
              </details>
              #### Handlebaz Web, Handlebaz Mobile-Web & WebView - handlebaz로
              되어 있는 프로젝트에 정적 데이터 수정( PC Web, Mobile Web ) -
              19.01.23 ~ 19.08.23 - `Javascript` `Node` `Handlebaz`
            </details> */}
            <h3>
              <a
                href="https://www.pufflive.me/web/pufftv?locale=ko"
                target="_blank"
                rel="noreferrer"
              >
                SVm
              </a>
            </h3>
            <table>
              <tbody>
                <tr>
                  <th>period</th>
                  <td>18.06.05 ~ 19.01.18</td>
                </tr>
                <tr>
                  <th>position</th>
                  <td>서버팀 / Back-End Engineer</td>
                </tr>
                <tr>
                  <th>projects</th>
                  <td>
                    <ul>
                      <li>PUFF APP Backend</li>
                      <li>PUFF APP Admin</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>동영상 스트리밍 앱인 퍼프 백엔드와 어드민 개발</li>
            </ul>
            {/* <details>
              <summary>2개의 프로젝트</summary>
              #### PUFF APP Backend / PUFF APP Admin - PUFF APP을 위한 API 및
              ADMIN 개발/유지보수 - 18.06.05 ~ 19.01.18 - `Ruby on Rails`
              `Javascript` `Node` `MySQL` `AWS`
              <details>
                <summary>주요 업무</summary>- Ruby on Rails monolithic 구성 된
                프로젝트 유지 보수 - 앱 내 게임 관련 데이터 Redis에서 수집해
                데이터 제공 - GiftiShow Bathch Sever 구성(Node.js) - Ruby on
                Rails로 개발되어 있던 API Node로 리뉴얼 - KT GiftiShow 관련 API
                수정 및 추가 - EC2(AutoScaling, ELB), S3, Route53, API Gateway
                세팅 및 활용 - Swagger 작성 리드 - Swagger 모듈화 및 효과적인
                관리를 위한 방안 구상
              </details>
            </details> */}
          </Section>
          <Section>
            <h2>
              <span className="u-shadow">Side Projects</span>
            </h2>
            <h3>
              <a
                href="https://github.com/mash-up-kr/study-watson"
                target="_blank"
                rel="noreferrer"
              >
                Study Watson
              </a>
            </h3>
            <ul>
              <li>
                효율적으로 스터디를 관리하는 가장 쉬운 방법을 제공하는 웹 서비스
                입니다.
              </li>
              <li>
                <code className="language-text">React</code>
                <code className="language-text">Redux</code>
                <code className="language-text">Redux-Saga</code>
                <code className="language-text">NEXT</code>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=nKn6scRu-hk"
                  target="_blank"
                  rel="noreferrer"
                >
                  시연 영상
                </a>
              </li>
            </ul>
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
                매일 하루에 한 번 받을 질문에 답하면서 자신을 기록하면 단순히
                기록에서 그치지 않고 당신이 기록한 일주일은 한 장의 꿈을 담은
                카드로 완성해 주는 iOS 앱
              </li>
              <li>기간 : 2020년 4월 ~</li>
              <li>역할 : 백엔드 개발</li>
              <li>
                V1: <code className="language-text">Node</code>
                <code className="language-text">Express</code>
                <code className="language-text">Typescript</code>
                <code className="language-text">Swagger</code>
                <code className="language-text">JEST</code>
                <code className="language-text">JWT</code>
                <code className="language-text">Sequelize</code>
                <code className="language-text">MySQL</code>
                <code className="language-text">EC2</code>
                <code className="language-text">S3</code>
              </li>
              <li>
                <a
                  href="https://github.com/Yuni-Q/moti"
                  target="_blank"
                  rel="noreferrer"
                >
                  초기 웹프로젝트
                </a>
                : <code className="language-text">React</code>
                <code className="language-text">Next</code>
                <code className="language-text">styled-components</code>
              </li>
              <li>
                <a
                  href="https://github.com/Yuni-Q/moti-backend"
                  target="_blank"
                  rel="noreferrer"
                >
                  V2 및 웹프로젝트 병합
                </a>
                : <code className="language-text">Nest</code>
                <code className="language-text">TypeORM</code>
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
              <li>서비스 기간 : 2020년 4월 ~ 2021년 1월까지</li>
              <li>
                <code className="language-text">Node</code>
                <code className="language-text">Express</code>
                <code className="language-text">Typescript</code>
                <code className="language-text">Sequelize</code>
                <code className="language-text">MySQL</code>
                <code className="language-text">EC2</code>
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
          </Section>
          <Section>
            <h2>
              <span className="u-shadow"> Community </span>
            </h2>
            <h3>Activity</h3>
            <ul>
              <li>21.06 ~ 21.08 우아한 테크캠프 멘토</li>
              <li>20.05 ~ 21.05 DR 서포터즈 2기</li>
              <li>
                개발 동아리 활동
                <ul>
                  <li>21.07 ~ Nexters</li>
                  <li>18.03 ~ 20.04 MASH-UP</li>
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
                    [2020.01.11] &apos;MASH-UP BACKEND&apos; 세미나에서 발표한
                    내용입니다.
                  </li>
                  <li>
                    프론트엔드를 공부하며 알게 되었던 부분들을 중심으로 HTML부터
                    React 이후까지 간랸한 이야기를 공유하였습니다.
                  </li>
                </ul>
              </li>
            </ul>

            <h3>수상</h3>
            <table>
              <thead>
                <tr>
                  <th>주관</th>
                  <th>상명</th>
                  <th>일자</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>한국농수산식품유통공사</td>
                  <td>2020 농식품 빅데이터 온라인 해커톤 우수상</td>
                  <td>2020.12.14</td>
                </tr>
                <tr>
                  <td>과학기술정보통신부</td>
                  <td>핀테크 x 인슈어테크 해커톤 금융결제원 우수상</td>
                  <td>2019.12.16</td>
                </tr>
                <tr>
                  <td>멋쟁이사자처럼</td>
                  <td>
                    HANAplatform 기반 IoT 고급 개발자 양성 과정(NCS)
                    BestProject상
                  </td>
                  <td>2018.01.19</td>
                </tr>
              </tbody>
            </table>
            <h3>Education</h3>
            <table>
              <thead>
                <tr>
                  <th>소속</th>
                  <th>전공</th>
                  <th>기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>경북대학교</td>
                  <td>신소재공학부 전자재료공학 전공</td>
                  <td>2011.03 ~ 2017.02</td>
                </tr>
                <tr>
                  <td>대구공업고등학교</td>
                  <td>전자기계과</td>
                  <td>2008.03 ~ 2017.02</td>
                </tr>
                <tr>
                  <td>공군(병)</td>
                  <td>제 11전투 비행단 기계반</td>
                  <td>2012.01 ~ 2014.01</td>
                </tr>
              </tbody>
            </table>
          </Section>
          <Section>
            <h2>
              <span className="u-shadow">Last Updated</span>
            </h2>
            <ul>
              <li>2021.08.16</li>
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
  }
  th {
    width: 120px;
  }
  background: lightgray;
`;

const Section = styled.section`
  background: #fff;
  padding: 36px;
  box-shadow: 1px 1px 10px 2px rgb(0 0 0 / 10%);
  & + & {
    margin-top: 24px;
  }
`;
