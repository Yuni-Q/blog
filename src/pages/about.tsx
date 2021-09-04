import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import sendGAEvent, { GA_ACTION } from '../utils/ga';
import { rhythm } from '../utils/typography';

const About: React.VFC = () => {
  const [showWoowa, setShowWoowa] = useState(false);
  const [showMeme, setShowMeme] = useState(false);
  const [showSVm, setShowSVm] = useState(false);
  const woowaRef = useRef<HTMLDivElement>(null);
  const memeRef = useRef<HTMLDivElement>(null);
  const svmRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    sendGAEvent('resume', GA_ACTION.EXPOSE, 'resume');
    console.log(222, woowaRef);
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
                <Badge>JavaScript</Badge>
                <Badge>TypeScript</Badge>
                <Badge>React</Badge>
                <Badge>Mobx</Badge>
                <Badge>Redux</Badge>
                <Badge>Redux-Saga</Badge>
                <Badge>Webpack</Badge>
                <Badge>Babel</Badge>
                <Badge>NEXT</Badge>
                <Badge>Node</Badge>
                <Badge>Express</Badge>
                <Badge>Styled-Components</Badge>
                <Badge>Storybook</Badge>
                <Badge>Express</Badge>
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
                Front-end 개발/운영개선
              </li>
              <li>
                배민사장님광장 외 B2B서비스채널(전자계약서, 업주 요청 등의
                웹서비스) 개발/운영개선
              </li>
              <li>배달의 민족 주문접수 앱 웹뷰 개발</li>
            </ul>
            {/* 플랫폼실/업주시스템팀, B2B서비스실/B2B서비스팀, B2B서비스실/사장님서비스팀, B2B서비스실/사장님광장팀, 배민결제서비스실/결제서비스개발팀 */}
            <div style={{ textAlign: 'right' }}>
              <Button
                show={showWoowa}
                onClick={() => setShowWoowa((preShowWoowa) => !preShowWoowa)}
              >
                우아한형제들 프로젝트
              </Button>
            </div>
            <DetailSection
              ref={woowaRef}
              show={showWoowa}
              height={woowaRef.current?.scrollHeight || 0}
            >
              <section>
                <h3>배민 통합 결제 플랫폼</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>21.06 ~</td>
                    </tr>
                    <tr>
                      <th>position</th>
                      <td>웹 프론트엔드 파트 리딩</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>Typescript</Badge>
                        <Badge>React</Badge>
                        <Badge>Mobx</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        각 지면 주문하기 웹뷰 및 배민페이 관리 웹뷰
                        <br />
                        (배민, 배민라이더스, 비마트, 선물하기, 가족계정,
                        브랜드오더, 배민페이 웹뷰)
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>문서 최신화, 정리 및 실행환경 개선</li>
                  <li>린트, 프리티어 수정</li>
                  <li>pay-platform 브랜치 정리 및 브랜치 전략 수정</li>
                  <li>작업 방식 정리</li>
                  <li>배포 프로세스 및 알람 정리</li>
                  <li>서브모듈 제거</li>
                  <li>젠킨스 제거 및 배포 프로세스 개선</li>
                  <li>센트리 소스맵 추가로 인해 디거핑 편의성 증가</li>
                  <li>앱 웹뷰 지원(최소 버전 안드로이드 4.x)</li>
                  <li>프로젝트 재구성</li>
                </ul>
              </section>
              <section>
                <h3>배민페이 프론트</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>21.06 ~</td>
                    </tr>
                    <tr>
                      <th>position</th>
                      <td>웹 프론트엔드 파트 리딩</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>Typescript</Badge>
                        <Badge>React</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        전국별미, 배민쇼핑라이브의 배민페이, 결제지면 관련 npm
                        모듈 관리
                        <br />
                        배민 통합 결제 플랫폼의 배민페이 관련 sub module 관리
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section>
                <h3>결제하기 웹뷰</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>21.06 ~</td>
                    </tr>
                    <tr>
                      <th>position</th>
                      <td>웹 프론트엔드 파트 리딩</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>Typescript</Badge>
                        <Badge>React</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        배달의민족 내의 결제 페이지 웹뷰
                        <br />
                        (배민, 배민라이더스, 비마트, 선물하기, 가족계정,
                        브랜드오더, 배민페이, 전국별미, 배민쇼핑라이브)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section>
                <h3>PLCC 현대카드 이벤트 페이지 지원 업무</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>21.06 ~</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>html</Badge>
                        <Badge>Javascript</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>PLCC 현대카드 이벤트 페이지(웹뷰)</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section>
                <h3>주문접수앱 웹뷰</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>20.11 ~ 21.01</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>Typescript</Badge>
                        <Badge>React</Badge>
                        <Badge>Redux</Badge>
                        <Badge>Express</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>배달의민족 업주님들이 사용하는 앱의 웹뷰</td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>배달대행사 연결 및 관리 웹뷰 작업</li>
                  <li>AI 배달 예상 시간 안내 웹뷰 작업</li>
                </ul>
              </section>
              <section>
                <h3>post 배사광</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>20.11 ~ 21.05</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>Typescript</Badge>
                        <Badge>React</Badge>
                        <Badge>Mobx</Badge>
                        <Badge>SWR</Badge>
                        <Badge>react-hooks-form</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        배달의민족 대표 B2B서비스채널인 `배민사장님광장`
                        웹서비스 Front-end 개발/운영개선 프로젝트 리뉴얼
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>
                    프로젝트 초기 React Application Architecture 설계 - 브랜치
                    전략 구상(master/deploy/feature)
                  </li>
                  <li>
                    젠킨스 구성(master의 최신 커밋이 base가 아니라면 배포
                    불가능)
                  </li>
                  <li>허스키 도입(rebase시 현재 브랜치 최신화 후 진행)</li>
                  <li>내정보 페이지, 하위 페이지 작업 및 메인홈 페이지 작업</li>
                  <li>webpack 및 babel 설정</li>
                  <li>Dialog, FormCard 추가</li>
                  <li>swr 도입</li>
                  <li>
                    글로벌 스타일 추가(스타일 가이드 구성)
                    <ul>
                      <li>boxModel 글로벌 클래스 추가</li>
                      <li>color 값 정의</li>
                      <li>color 글로벌 클래스 추가</li>
                      <li>typo 글로벌 클래스 추가</li>
                    </ul>
                  </li>
                  <li>오픈을 위한 전체적인 QA</li>
                  <li>점검 및 프론트 배포 여부 주기적인 체크</li>
                  <li>
                    개인 정보 페이지 브라우저 뒤로가기 버튼으로 인해 이동 시
                    새로고침
                  </li>
                  <li>사파리에서 새로고침이 되지 않는 이슈 해결</li>
                  <li>ie11 지원</li>
                  <li>배사광 리뉴얼 배포(3/24)</li>
                  <li>리팩토링 작업</li>
                </ul>
              </section>
              <section>
                <h3>super2</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>20.07 ~ 20.11</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>Typescript</Badge>
                        <Badge>React</Badge>
                        <Badge>Spring</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        B2B서비스채널(전자계약서, 업주 요청 등의 웹서비스)
                        개발/운영개선
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>전자계약서 e2e TEST(testcafe) 작성</li>
                  <li>tslint를 eslint로 변경</li>
                  <li>슈퍼2 설정 정리 및 실행 환경 간소화</li>
                  <li>가게 영상/사진 관리 기능 추가</li>
                  <li>전통시장카테고리 기능 추가</li>
                  <li>배민오더 오프라인 정보 기능 추가</li>
                  <li>가게 편의 정보 기능 추가</li>
                  <li>전자 계약서 내 메뉴 신청 양식 변경</li>
                </ul>
              </section>
              <section>
                <h3>ceo-moon-front</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>20.06 ~ 21.01</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>Javascript</Badge>
                        <Badge>WoowahanJS</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        배달의민족 대표 B2B서비스채널인 `배민사장님광장`
                        웹서비스 Front-end 개발/운영개선(셀프서비스 제외한 부분)
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>AB test 구성 및 테스트</li>
                  <li>배민트렌드 2021 이벤트 페이지</li>
                </ul>
              </section>
              <section>
                <h3>ceo-web-self-service</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>20.01 ~ 20.10</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>TypeScript</Badge>
                        <Badge>React</Badge>
                        <Badge>Mobx</Badge>
                        <Badge>React-Router</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        배달의민족 대표 B2B서비스채널인 `배민사장님광장`
                        웹서비스 Front-end 개발/운영개선(셀프서비스 부분)
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>사장님 광장 내의 셀프 서비스 오픈(20.02.25일 오픈)</li>
                  <li>
                    ceo-web-design-system를 활용해서 서비스 Front-end 개발
                  </li>
                  <li>메뉴 시스템 개선(20.07.14 오픈)</li>
                  <li>
                    ceo-selfservice-front(react, redux)를
                    ceo-web-design-system를 활용해서 ceo-web-self-service(react,
                    mobx)로 내제화
                  </li>
                  <li>스마트 메뉴 기능 대거 추가</li>
                  <li>e2e test(testcafe) 작성</li>
                  <li>A/B test 구성</li>
                  <li>로컬 환경에서 https 적용</li>
                  <li>class component method binding 규칙 논의</li>
                </ul>
              </section>
              <section>
                <h3>ceo-web-design-system</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>19.10 ~ 20.10</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>TypeScript</Badge>
                        <Badge>React</Badge>
                        <Badge>Mobx</Badge>
                        <Badge>React-Router</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>B2B서비스채널을 위한 디자인 시스템 구축/운영개선</td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>프로젝트 초기 React Application Architecture 설계</li>
                  <li>새로운 프로젝트 개발 환경 및 구조 연구하고 설계 참여</li>
                  <li>
                    다른 프로젝트에서 사용 될 공통 디자인 시스템 컴포넌트 작성
                    및 수정
                  </li>
                  <li>Storybook을 통한 UI 검증 프로세스 간소화</li>
                </ul>
              </section>
              <section>
                <h3>ceo-selfservice-front</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>19.08 ~ 20.01</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>TypeScript</Badge>
                        <Badge>React</Badge>
                        <Badge>Redux</Badge>
                        <Badge>Redux-Saga</Badge>
                        <Badge>React-Router</Badge>
                        <Badge>JEST</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        배달의 민족을 사용하는 사장님들의 메뉴 관리를 위한
                        서비스 웹 서비스 개발/운영개선
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>ceo-web-self-service로 병합 후 프로젝트 종료</li>
                  <li>
                    1인분 메뉴 가격 최소, 최대값 입력 제한 개발 - 메뉴 타입 설정
                    기능 개발
                  </li>
                  <li>메뉴구성 / 메뉴 설정 기능 추가 개발</li>
                  <li>옵션 최대 / 최소값 기능 개발</li>
                </ul>
              </section>
              <section>
                <h3>smartmenu-admin-front</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>19.08 ~ 20.01</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>TypeScript</Badge>
                        <Badge>React</Badge>
                        <Badge>Redux</Badge>
                        <Badge>Redux-Saga</Badge>
                        <Badge>React-Router</Badge>
                        <Badge>Antd</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        배달의 민족을 사용하는 사장님들의 메뉴 관리를 위한
                        서비스의 회사 내부 관리 웹 서비스 개발/운영개선
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>메뉴 매핑 정보 체크 가능 개발</li>
                  <li>1인분 메뉴 가격 최소 / 최대값 입력 제한 개발</li>
                  <li>운영자 권한 관리 라이트버전 개발</li>
                  <li>시스템 관련 라우팅 분리</li>
                  <li>프랜차이즈 메뉴 할인 기능 개발</li>
                </ul>
              </section>
            </DetailSection>
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
                    React Mobile-Web & WebView
                    <br />
                    Handlebaz Web, Handlebaz Mobile-Web & WebView
                  </td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>화장품 e-commerce MEMEBOX 웹 프론트엔드 개발</li>
            </ul>
            <div style={{ textAlign: 'right' }}>
              <Button
                show={showMeme}
                onClick={() => setShowMeme((preShowMeme) => !preShowMeme)}
              >
                미미박스 프로젝트
              </Button>
            </div>
            <DetailSection
              ref={memeRef}
              show={showMeme}
              height={memeRef.current?.scrollHeight || 0}
            >
              <section>
                <h3>MEMEBOX Mobile Web & WebView</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>19.01.23 ~ 19.08.23</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>TypeScript</Badge>
                        <Badge>React</Badge>
                        <Badge>Redux</Badge>
                        <Badge>Redux-Thunk</Badge>
                        <Badge>React-Router</Badge>
                        <Badge>Apollo</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>React로 구성 된 모바일 웹과 웹뷰 서비스</td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>
                    기존 handlebaz로 구성되어 있던 모바일 웹 리액트로 리뉴얼
                  </li>
                  <li>
                    퍼블리싱 없이 기획자와 디자이너의 기획서와 제플린을 통한
                    HTML, CSS, JS 작업(HTML, CSS 리드)
                  </li>
                  <li>기존 탭 리뉴얼 및 새로운 프로모션 탭 제작</li>
                  <li>앱 웹뷰 지원(안드로이드 4.4 지원까지)</li>
                  <li>
                    iOS에서는 CSS 속성으로 스크롤이 지워지지 않아 임의의
                    방법으로 제거
                  </li>
                  <li>Apollo GraphQL 활용</li>
                  <li>React Hooks 도입 리드</li>
                  <li>
                    Carousel에 영상 추가 및 위치에 따른 영상 재생 컨트롤 기능
                    개발
                  </li>
                  <li>GTM 및 사내 웹 로그 로직 추가 및 모듈화</li>
                  <li>GitLab CI 수정 및 PM2 ecosystem 도입 리드</li>
                </ul>
              </section>
              <section>
                <h3>Handlebaz Web, Handlebaz Mobile-Web & WebView</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>19.01.23 ~ 19.08.23</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>Javascript</Badge>
                        <Badge>Node</Badge>
                        <Badge>Handlebaz</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>
                        handlebaz로 되어 있는 프로젝트에 정적 데이터 수정( PC
                        Web, Mobile Web )
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </DetailSection>
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
                    PUFF APP Backend
                    <br />
                    PUFF APP Admin
                  </td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>동영상 스트리밍 앱인 퍼프 백엔드와 어드민 개발</li>
            </ul>
            <div style={{ textAlign: 'right' }}>
              <Button
                show={showSVm}
                onClick={() => setShowSVm((preShowSVm) => !preShowSVm)}
              >
                SVm 프로젝트
              </Button>
            </div>
            <DetailSection
              ref={svmRef}
              show={showSVm}
              height={svmRef.current?.scrollHeight || 0}
            >
              <section>
                <h3>PUFF APP Backend / PUFF APP Admin</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>period</th>
                      <td>18.06.05 ~ 19.01.18</td>
                    </tr>
                    <tr>
                      <th>skill</th>
                      <td>
                        <Badge>Ruby on Rails</Badge>
                        <Badge>Javascript</Badge>
                        <Badge>Node</Badge>
                        <Badge>MySQL</Badge>
                        <Badge>AWS</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>description</th>
                      <td>PUFF APP을 위한 API 및 ADMIN 개발/유지보수</td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li>Ruby on Rails monolithic 구성 된 프로젝트 유지 보수</li>
                  <li>앱 내 게임 관련 데이터 Redis에서 수집해 데이터 제공</li>
                  <li>GiftiShow Bathch Sever 구성(Node.js)</li>
                  <li>Ruby on Rails로 개발되어 있던 API Node로 리뉴얼</li>
                  <li>
                    KT GiftiShow 관련 API 수정 및 추가 - EC2(AutoScaling, ELB),
                    S3, Route53, API Gateway 세팅 및 활용
                  </li>
                  <li>Swagger 작성 리드</li>
                  <li>Swagger 모듈화 및 효과적인 관리를 위한 방안 구상</li>
                </ul>
              </section>
            </DetailSection>
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
                <Badge>React</Badge>
                <Badge>Redux</Badge>
                <Badge>Redux-Saga</Badge>
                <Badge>NEXT</Badge>
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
                    <Badge>21.07 ~ </Badge> Nexters
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

const DetailSection = styled.section<{ show: boolean; height: number }>`
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

const Button = styled.button<{ show: boolean }>`
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

const Badge = styled.span`
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
