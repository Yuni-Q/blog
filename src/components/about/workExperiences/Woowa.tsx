import React, { useRef, useState, VFC } from 'react';
import { Badge, Button, DetailSection } from '../../../pages/about';

export const Woowa: VFC = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <h2>
        <span className="u-shadow">Work Experiences</span>
      </h2>
      <h3>
        <a href="https://www.woowahan.com/" target="_blank" rel="noreferrer">
          우아한형제들
        </a>
      </h3>
      <table>
        <tbody>
          <tr>
            <th>period</th>
            <td>19.08.26 ~ Current</td>
          </tr>
          <tr>
            <th>position</th>
            <td>결제서비스개발팀 / FrontEnd Engineer</td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>배달의민족 주문하기 및 결제하기 웹뷰 개발/운영개선</li>
        <li>배민페이머니관리 웹뷰 개발/운영개선</li>
        <li>
          배달의민족 대표 B2B서비스채널인 `배민사장님광장` 웹서비스 Front-end
          개발/운영개선
        </li>
        <li>
          배민사장님광장 외 B2B서비스채널(전자계약서, 업주 요청 등의 웹서비스 및
          셀프서비스) 개발/운영개선
        </li>
        <li>배달의 민족 주문접수 앱 웹뷰 개발</li>
      </ul>
      {/**
       * 플랫폼실/업주시스템팀,
       * B2B서비스실/B2B서비스팀,
       * B2B서비스실/사장님서비스팀,
       * B2B서비스실/사장님광장팀,
       * 배민결제서비스실/결제서비스개발팀,
       * 페이먼트서비스실/결제서비스개발팀
       * */}
      <div style={{ textAlign: 'right' }}>
        <Button
          show={show}
          onClick={() => setShow((preShowWoowa) => !preShowWoowa)}
        >
          우아한형제들 프로젝트
        </Button>
      </div>
      <DetailSection
        ref={ref}
        show={show}
        height={ref.current?.scrollHeight || 0}
      >
        <section>
          <h3>뉴 통합 결제 플랫폼</h3>
          <table>
            <tbody>
              <tr>
                <th>period</th>
                <td>21.10 ~</td>
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
                <td>배민페이관리 웹뷰</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>
              복잡한 이해관계에 의해 통일성 없는 코드를 새로운 프로젝트 구성
            </li>
            <li>배민페이 관리 지면 전면 개편 및 공통 모듈 재작성</li>
            <li>
              react-query 도입을 통해 서버 상태와 프론트 상태를 분리하고 mobx
              역할을 축소
            </li>
            <li>
              dialog를 선언적으로 처리하여 click 함수 안에서 modal에 관련 된
              코드를 한 곳에서 작성하여 쉽게 사용하도록 함
            </li>
            <li>
              functional css 도입을 통해 생산성을 향상 시키고 styled-component의
              역할을 제한적으로 허용하여 다양한 디자인을 시스템을 만들어
              공통적으로 관리되고 통일성 있는 UI/UX를 제공함
            </li>
          </ul>
        </section>
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
                <td>웹 프론트엔드 파트 리딩(7월 입사 1명, 11월 입사 2명)</td>
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
                  (배민(배민/배민라이더스/배민원), 비마트, 선물하기, 가족계정,
                  브랜드오더, 배민페이관리 웹뷰)
                </td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>
              서버 개발자만 있는 팀에서 프론트 팀을 만들고 프론트 파트를
              리딩하며 개발 문화를 만들어 감
            </li>
            <li>문서 최신화, 정리 및 실행환경 개선</li>
            <li>린트, 프리티어 수정, 서브모듈 제거</li>
            <li>
              브랜치 정리 및 브랜치 전략 수정하여 다른팀 프론트와 하나에
              레포에서 작업하면서도 서로 작업에서 블로커가 되지 않도록 함
            </li>
            <li>배포 프로세스 개선, 알람 정리 및 작업 방식 정리</li>
            <li>센트리 소스맵 추가로 인해 디거핑 편의성 증가</li>
            <li>앱 웹뷰 지원(최소 버전 안드로이드 4.x)</li>
            <li>CI/CD 구성</li>
            <li>불법자금세탁방지를 위한 고객확인 기능을 추가하는 작업</li>
            <li>배민페이 적립 포인트 노출(포장주문에서 짝수 회원만)</li>
            <li>
              규칙없이 구성되어 있던 인프라를 회사의 기준 인프라를 기준으로
              재정비하여 누구든 수정 할 수 있게 구성함
            </li>
            <li>스프린트 도입</li>
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
                  전국별미, 배민쇼핑라이브의 배민페이, 결제지면 관련 npm 모듈
                  관리
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
                  (배민, 배민라이더스, 비마트, 선물하기, 가족계정, 브랜드오더,
                  배민페이, 전국별미, 배민쇼핑라이브)
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
                <td>20.11 ~ 21.01 (3개월)</td>
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
            <li>배달대행사 연결 및 관리 페이지</li>
            <li>AI 배달 예상 시간 안내 페이지</li>
          </ul>
        </section>
        <section>
          <h3>post 배사광</h3>
          <table>
            <tbody>
              <tr>
                <th>period</th>
                <td>20.11 ~ 21.05 (6개월)</td>
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
                  배달의민족 대표 B2B서비스채널인 `배민사장님광장` 웹서비스
                  Front-end 개발/운영개선 프로젝트 리뉴얼
                </td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>
              프로젝트 초기 React Application Architecture 설계 - 브랜치 전략
              구상(master/deploy/feature)
            </li>
            <li>
              젠킨스 구성(master의 최신 커밋이 base가 아니라면 배포 불가능)
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
              개인 정보 페이지 브라우저 뒤로가기 버튼으로 인해 이동 시 새로고침
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
                <td>20.07 ~ 20.11 (4개월)</td>
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
                <td>20.06 ~ 21.01 (7개월)</td>
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
                  배달의민족 대표 B2B서비스채널인 `배민사장님광장` 웹서비스
                  Front-end 개발/운영개선(셀프서비스 제외한 부분)
                </td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>AB test 구성 및 테스트</li>
            <li>이벤트 페이지</li>
          </ul>
        </section>
        <section>
          <h3>ceo-web-self-service</h3>
          <table>
            <tbody>
              <tr>
                <th>period</th>
                <td>20.01 ~ 20.10 (9개월)</td>
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
                  배달의민족 대표 B2B서비스채널인 `배민사장님광장` 웹서비스
                  Front-end 개발/운영개선(셀프서비스 부분)
                </td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>사장님 광장 내의 셀프 서비스 오픈(20.02.25일 오픈)</li>
            <li>ceo-web-design-system를 활용해서 서비스 Front-end 개발</li>
            <li>메뉴 시스템 개선(20.07.14 오픈)</li>
            <li>
              ceo-selfservice-front(react, redux)를 ceo-web-design-system를
              활용해서 ceo-web-self-service(react, mobx)로 내제화
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
                <td>19.10 ~ 20.10 (12개월)</td>
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
              다른 프로젝트에서 사용 될 공통 디자인 시스템 컴포넌트 작성 및 수정
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
                <td>19.08 ~ 20.01 (5개월)</td>
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
                  배달의 민족을 사용하는 사장님들의 메뉴 관리를 위한 서비스 웹
                  서비스 개발/운영개선
                </td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>ceo-web-self-service로 병합 후 프로젝트 종료</li>
            <li>
              1인분 메뉴 가격 최소, 최대값 입력 제한 개발 - 메뉴 타입 설정 기능
              개발
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
                <td>19.08 ~ 20.01 (5개월)</td>
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
                  배달의 민족을 사용하는 사장님들의 메뉴 관리를 위한 서비스의
                  회사 내부 관리 웹 서비스 개발/운영개선
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
    </>
  );
};
