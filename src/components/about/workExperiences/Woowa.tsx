import React, { useRef, useState } from 'react';
import {
  A,
  Badge,
  Br,
  Button,
  Del,
  DetailSection,
  Div,
  H3,
  Li,
  Section,
  TBody,
  Table,
  Td,
  Th,
  Tr,
  Ul,
} from '../../../pages/about';

export const Woowa = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <H3>
        <A href="https://www.woowahan.com/" target="_blank" rel="noreferrer">
          우아한형제들
        </A>
      </H3>
      <Table>
        <TBody>
          <Tr>
            <Th>period</Th>
            <Td>19.08.26 ~ Current</Td>
          </Tr>
          <Tr>
            <Th>position</Th>
            <Td>배민공통서비스웹프론트개발팀 / FrontEnd Engineer</Td>
          </Tr>
        </TBody>
      </Table>
      <Ul>
        <Li>전사 웹 프론트 라이브러리 및 도구를 개발</Li>
        <Li>B마트 서비스/어드민 프론트 개발</Li>
        <Li>배민앱 시각 시스템 개발</Li>
        <Li>개발 경험 향상을 위한 데브옵스 개발</Li>
        <Li>배달의민족 주문하기 및 결제하기 웹뷰 개발/운영개선</Li>
        <Li>배민페이머니관리 웹뷰 개발/운영개선</Li>
        <Li>
          배달의민족 대표 B2B서비스채널인 `배민사장님광장` 웹서비스 Front-end
          개발/운영개선
        </Li>
        <Li>
          배민사장님광장 외 B2B서비스채널(전자계약서, 업주 요청 등의 웹서비스 및
          셀프서비스) 개발/운영개선
        </Li>
        <Li>배달의 민족 주문접수 앱 웹뷰 개발</Li>
      </Ul>
      {/**
       * 플랫폼실/업주시스템팀,
       * B2B서비스실/B2B서비스팀,
       * B2B서비스실/사장님서비스팀,
       *
       * B2B서비스실/사장님광장팀,
       *
       * 배민결제서비스실/결제서비스개발팀,
       * 페이먼트서비스실/결제서비스개발팀
       * 결제정산플랫폼실/배민페이프로덕트팀
       *
       * 커머스실/커머스웹프론트개발팀
       * 배민스토어서비스실/배민스토어웹프론트개발팀
       * 배민커머스서비스실/배민커머스웹프론트개발팀
       *
       * 공통서비스실/배민공통서비스웹프론트개발팀
       * */}
      <Div style={{ textAlign: 'right' }}>
        <Button
          show={show}
          onClick={() => setShow((preShowWoowa) => !preShowWoowa)}
        >
          우아한형제들 프로젝트
        </Button>
      </Div>
      <DetailSection
        ref={ref}
        show={show}
        height={ref.current?.scrollHeight || 0}
      >
        <Section>
          <H3>배민공통서비스웹프론트개발팀</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>24.02 ~ Current</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>FrontEnd/BackEnd Engineer</Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>팀 빌딩</Li>
            <Ul>
              <Li>
                슬랙 워크플로우 생성(서포트 채널 가이드, 업무 요청, 장애 대응,
                배포)
              </Li>
              <Li>슬랙 반복 스레드 생성(아침, 저녁)</Li>
              <Li>
                필수 문서 가이드 작성 및 공유(그라운드 룰, 배포 가이드, 버저닝
                정책, 브랜치 전략, 릴리즈 전략, 자기소개, 담당 서비스 업무 지도,
                지라 사용법, 1Pager 양식, 지라 티켓 생성 가이드)
              </Li>
              <Li>권한 관리(위키, 지라, 깃랩, 사내 어드민)</Li>
              <Li>정리(위키 페이지, 지라 티켓, 깃랩 레포)</Li>
              <Li>캘린더 생성(팀, 배포)</Li>
              <Li>템플릿 제공(지라 티켓, 1Pager)</Li>
              <Li>
                사내 시스템에 팀 정보 등록(우아한워크플로우, 방화벽, 젠킨스)
              </Li>
              <Li>팀 내 리소스 정리(서비스, 롤, 깃랩, 젠킨스, 센트리)</Li>
              <Li>위키 자동 생성</Li>
              <Ul>
                <Li>타이틀 날짜 양식 다양화</Li>
                <Li>요일 지정 및 타겟 날짜 변경 가능</Li>
                <Li>생성자만 수정, 삭제 가능</Li>
              </Ul>
              <Li>슬랙에서 지라 티켓 생성 시 지라에 슬랙 링크 추가</Li>
              <Li>팀 프로젝트 배포 가이드 수정</Li>
              <Ul>
                <Li>서비스</Li>
                <Li>플랫폼</Li>
                <Li>라이브러리</Li>
              </Ul>
              <Li>우아한워크플로우 베타앱 만들기</Li>
            </Ul>
          </Ul>
        </Section>
        <Section>
          <H3>주문/결제 파트</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>23.12 ~ 24.01</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 개발</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>pnpm</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>배달의민족 커머스의 주문/결제 지면 프론트 개발</Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>스프린트 구조 개선</Li>
            <Li>주간/반기 회고 문서 작성</Li>
            <Li>[통합 장바구니] 인증토큰 만료시 리프레시 로직 추가</Li>
            <Li>[통합 장바구니] Phase2 대응</Li>
            <Li>서버 에러 문구 대응 방법 구상</Li>
          </Ul>
        </Section>
        <Section>
          <H3>B마트 웹뷰 및 어드민</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>23.08 ~ 23.12</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 개발 및 파트 리딩</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>pnpm</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  배달의민족 B마트 웹뷰 및 B마트 어드민 작업
                  <Br />
                  배민커머스웹프론트개발팀의 B마트 파트장으로 B마트 관련 프론트
                  업무 진행
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>파트 리딩 및 커뮤니케이션 진행</Li>
            <Li>칸반과 스토리 기반의 업무 진행</Li>
            <Ul>
              <Li>테스크로 업무 요청이 오는 경우 스토리로 변경</Li>
              <Ul>
                <Li>스토리로 바뀌어야 업무가 팔로업 된 것으로 공유</Li>
              </Ul>
              <Li>
                B마트 컴포넌트를 사용하여 빠른 업무 대응 및 작업 파악 가능하게
                수정
              </Li>
              <Li>라벨을 통해 웹뷰와 어드민 작업을 명확히 구분</Li>
              <Li>라벨을 통해 칸반의 row 구분</Li>
              <Li>스토리와 테스크를 구분하여 업무 파악이 용이하게 수정</Li>
              <Li>담당자가 지정되지 않은 경우 백로그로 분류</Li>
              <Li>위 사항이 안 지켜질 경우 예외로 관리</Li>
            </Ul>
            <Li>과제 진행</Li>
            <Li>이벤트/혜택 탑바 관련 웹뷰 개선</Li>
            <Li>B마트 장바구니 빈 화면 개선</Li>
            <Li>B마트 반품/교환 진행 시 본인미인증인 경우 인증 모듈 추가</Li>
            <Li>품절 대체 상품 추천 디자인 QA</Li>
            <Li>어드민 메뉴/용어 변경 작업</Li>
            <Li>장바구니 혜택 알림 어드민 운영 개선</Li>
            <Li>네이버 지도 연동</Li>
            <Li>쿠폰메타정보 복사 기능 추가</Li>
            <Li>사내 디자인시스템을 활용한 개발</Li>
            <Ul>
              <Li>아틀리에 블루, 블루 어드민</Li>
            </Ul>
            <Li>상품 썸네일 뱃지 등록 기능 개발</Li>
            <Li>기획전 관리 내 `히든` 타입 추가 건 대응</Li>
            <Li>
              쿠폰 생성할 때, 사용 가능한 대상으로 특정 상품 검색 기능 개발
            </Li>
            <Li>탭 메뉴 어드민 폰트 컬러입력란 추가</Li>
            <Li>FC 위치 사진 제공 기능 개발</Li>
            <Li>로컬에서 시크릿 모드 없이 개발 가능하게 변경</Li>
          </Ul>
        </Section>
        <Section>
          <H3>우아한파티</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>23.06 ~ 24.01</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>백엔드 개발 겸 웹 프론트엔드 개발</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>Nest</Badge>
                  <Badge>vanilla-extract</Badge>
                  <Badge>module-federation</Badge>
                  <Badge>pnpm / rest monorepo</Badge>
                  <Badge>Nest.js</Badge>
                  <Badge>TypeORM</Badge>
                  <Badge>PostgresQL</Badge>
                  <Badge>Redis</Badge>
                  <Badge>AWS</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  사내 이미지 및 피피티 템플릿 제공 툴의 프론트 및 서버 개발
                  <Br />
                  사내 구성원을 위한 이미지 및 피피티 템플릿 제공
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>인프라 세팅</Li>
            <Ul>
              <Li>백엔드 프로젝트 세팅</Li>
              <Li>심플로이 배포 환경 세팅</Li>
              <Li>정적 파일을 위한 인프라 세팅</Li>
              <Li>사내 이미지 플랫폼 도입</Li>
              <Li>데이터베이스 설계 및 세팅</Li>
            </Ul>
            <Li>프론트 개발</Li>
            <Ul>
              <Li>MVP 화면 개발</Li>
              <Ul>
                <Li>메인, 즐겨찾기, 작업 중 페이지 개발</Li>
                <Li>
                  유저, 피피티, 이미지 등 화면 구현 및 백엔드 기능 활용할 페이지
                  개발
                </Li>
              </Ul>
              <Li>다운로드 기능</Li>
              <Li>사내 로그인 기능</Li>
              <Li>데이터 통신을 위한 레이어 개발</Li>
              <Ul>
                <Li>스웨거를 기반으로 데이터 요청 파일 자동 생성</Li>
                <Li>HTTP 클라이언트 설계</Li>
                <Li>react-query 도입</Li>
              </Ul>
            </Ul>
            <Li>백엔드 개발</Li>
            <Ul>
              <Li>MVP 기능 개발</Li>
              <Ul>
                <Li>유저, 피피티, 이미지, 기능 개발</Li>
                <Li>페이징 개발</Li>
                <Li>좋아요 개발</Li>
                <Li>카데고리 개발</Li>
                <Li>태그 개발</Li>
                <Li>검색 기능 개발</Li>
                <Li>정렬 기능 개발</Li>
              </Ul>
              <Li>local-stack을 활용하여 이미지 및 파일 업로더 개발</Li>
              <Li>확장자 및 파일 이미지 width, height 구하기</Li>
            </Ul>
            <Li>모듈페더레이션으로 개발</Li>
            <Ul>
              <Li>CORS 해결을 위한 nginx 세팅</Li>
            </Ul>
          </Ul>
        </Section>
        <Section>
          <H3>라이브러리</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>23.06 ~ 23.08</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 개발 및 툴 자동화</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>Changesets</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  사내 혹은 팀내 라이브러리를 모노레포로 관리
                  <Br />
                  비즈니스에 집중하기 위해 필요한 작업들을 코어파트에서 진행
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>라이브러리 배포 전략 및 변경점 공유</Li>
            <Ul>
              <Li>라이브러리 변경점 관리를 위한 changeset 가이드라인 마련</Li>
              <Li>커밋 메시지를 바탕으로 변경점들을 자동 작성</Li>
              <Li>gitlab-ci를 활용하여 changeset 자동 작성</Li>
              <Li>main에 merge 시 변경점이 있는 패키지 자동 배포(카나리)</Li>
              <Li>태그 push 시 패키지 자동 배포(운영)</Li>
            </Ul>
            <Li>
              코드 관리에 대한 리소스 저하를 위한 배포프로세스 가이드라인 마련
              및 장려
            </Li>
            <Ul>
              <Li>Trunk Based Branching과 배포 프로세스 마련</Li>
            </Ul>
            <Li>이미지 옵티마이저 마련</Li>
            <Ul>
              <Li>
                임의 이미지 최적화에 사용할 수 있는 옵티마이저 개발을 통해
                이미지 리소스 관리 최적화
              </Li>
              <Li>옵션 목록: width, height, format, quality, object-fit</Li>
            </Ul>
            <Li>
              코어 웹 바이탈(CWV)을 통해 현재 프로덕트의 현황을 공유하고 발전
              방향을 잡아가기 위한 템플릿을 구성
            </Li>
          </Ul>
        </Section>
        <Section>
          <H3>디자인시스템</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>22.06 ~ 23.02</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 개발 및 파트 리딩</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Storybook</Badge>
                  <Badge>npm workspace</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>배민앱 내에서 사용되는 디자인시스템 개발</Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>컴포넌트 개발</Li>
            <Li>디자인옵스 디자이너들과의 커뮤니케이션을 주도</Li>
            <Ul>
              <Li>
                디자인시스템을 만들기 위한 부수적인 커뮤니케이션 정리 및 문서
                작성
              </Li>
            </Ul>
            <Li>타 디자인시스템 및 디자인시스템 툴 팀과의 회의 운영</Li>
            <Li>디자인시스템 개발 일정 산정 및 리딩</Li>
            <Ul>
              <Li>
                디자인시스템 개발 일정 및 적용 일정을 계획하고 그에 맞춰 개발을
                진행함.
              </Li>
              <Li>
                본업이 아닌 다양한 팀의 개발자들과 협업하여 디자인시스템
                컴포넌트 개발
              </Li>
              <Li>
                주마다 디자인시스템 개발 파트 위클리와 디자인 위클리를 통해
                하나의 워킹 그룹으로서 일 할 수 있는 문화를 만듦.
              </Li>
            </Ul>
            <Li>디자인시스템 비마트, 배민스토어 적용 일정 산정 및 리딩</Li>
            <Li>
              디자인시스템이 시스템으로서의 기준을 가질 수 있는 부분들을 만들기
              위한 문서를 작성함.
            </Li>
          </Ul>
        </Section>
        <Section>
          <H3>FEOPS</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>22.06 ~ 24.02</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>
                  백엔드 개발 및 프론트 개발과 프로젝트 리딩(전반적인 기획 및
                  설계)
                </Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>Nest.js</Badge>
                  <Badge>TypeORM</Badge>
                  <Badge>postgreSQL</Badge>
                  <Badge>Nest Monorepo</Badge>
                  <Badge>Redis</Badge>
                  <Badge>AWS</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  개발 경험 향상을 위한 데브옵스 개발 프로젝트
                  <Br />
                  자동화 할 수 있는 것들은 자동화하여 팀 그리고 사내 업무 효율성
                  향상
                  <Br />
                  코드의 불편한 곳을 찾아서 개선
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>아틀라시안(지라, 위키) 연동</Li>
            <Li>지라 버전 자동 생성 배치 개발</Li>
            <Li>위키 데일리 리포트 자동 생성 배치 개발</Li>
            <Li>노션을 활용한 주간 회의 배치 개발</Li>
            <Li>Gitlab MR 자동 머지 시 rebase 기능 개발</Li>
            <Li>Gitlab MR 시 다른 MR rebase and merge 기능 개발</Li>
            <Li>사용자들의 불편을 제보 받아서 개선</Li>
            <Li>
              사내 서비스(지라, 위키, 슬랙, 깃랩, LDAP)와 슬랙 등 다양한 툴과의
              연동
            </Li>
            <Ul>
              <Li>
                사내 서비스 검색 기능을 통해 데이터 찾는 시간을 1/4 이상으로
                감소
              </Li>
              <Li>지라, 위키를 테스트하기 위한 STAGE, BETA 환경 구축</Li>
              <Li>외부 서비스들의 상태 확인 API 개발</Li>
            </Ul>
            <Li>
              지라, 위키, 깃랩, 슬랙 같은 사내 툴을 연동하기 위힌 Z-VPC에 인프라
              설정
            </Li>
            <Ul>
              <Li>
                SRE, 클라우드플랫폼, 클라우드스토리지, 보안팀과 협업하여 개발
                환경 구성
              </Li>
              <Li>기존 A 환경이 아닌 Z 환경에 인프라를 구성함.</Li>
              <Li>Prod/Stage/Beta 환경 구성</Li>
            </Ul>
            <Li>회사 배포 시스템인 심플로이 v6 도입</Li>
            <Ul>
              <Li>PM2 도입</Li>
              <Li>
                심플로이 배포를 위한 환경 변수, docker, groovy, gitlab ci 세팅
              </Li>
              <Li>gitlab ci를 통해 배포 과정을 일원화</Li>
            </Ul>
            <Li>
              프론트엔드 개발자들이 업무에 집중할 수 있도록 필요한 기능들을 개발
            </Li>
            <Li>FEOPS 유지 보수성 및 성능 향상을 위해 아키텍처 개선</Li>
            <Li>
              본업이 아닌 다양한 팀의 개발자들과 협업하여 FEOPS 개발을 진행 및
              리딩
            </Li>
            <Ul>
              <Li>
                스프린트 운영을 통한 업무 능률 향상에서 칸반 보드 도입을 통해
                스토리 기반의 업무 진행
              </Li>
              <Li>스토리포인트 도입, 지라 대시보드 활용</Li>
            </Ul>
            <Li>위키 기반으로 슬랙 block-kit-builder 만들어 주는 기능 개발</Li>
            <Li>어드민을 위한 API 개발</Li>
            <Li>Cloud Watch와 SNS를 통한 서버 알림 구성</Li>
            <Li>배치가 휴일에 돌지 않게 구성</Li>
            <Li>웹훅 추가 및 변경 API 개발</Li>
            <Li>
              슬랙 소켓 연결을 통해 멘션, 메시지 쇼컷, 커맨드, 워크플로우 개발
            </Li>
            <Li>깃랩의 MR을 슬랙 메시지로 전송</Li>
            <Li>
              슬랙에 기존에 있는 앱을 통하지 않고 슬랙 워크플로우로 지라 티켓
              생성 및 관리하여 더 많은 기능을 제공
            </Li>
            <Ul>
              <Li>
                서포트 워크플로우 등록 시 담당자에게 DM 전송하여 빠른 업무 소통
                장려
              </Li>
              <Li>담당자 설정</Li>
              <Li>컴포넌트 추가</Li>
            </Ul>
            <Li>백엔드를 여러개의 서버로 분리 및 운영</Li>
            <Li>깃랩 파이프라인 성공, 실패 시 슬랙 메시지 전송</Li>
            <Li>깃랩 approve 갯수 충족 시 rebase and merge 기능 추가.</Li>
            <Li>
              FEOPS 기능 컨트롤을 통해 유저에게 자율적인 기능 선택 가능하게 지원
            </Li>
            <Li>
              팀의 자유로운 질문 및 커뮤니케이션, 공유 활성화를 위한 슬랙 앱
              개발
            </Li>
            <Li>
              공공데이터를 통해 기본적인 휴일 정보 연동. 추가적으로 필요한 휴일
              정보를 추가 연동
            </Li>
            <Li>코드레벨에서 FEOPS 내부의 일과 각 팀에서 원하는 일을 분리</Li>
            <Li>
              메시지 정책을 정리하여 유저들에게 필요한 정보를 적정한 시기에 전달
            </Li>
            <Li>메시지 갯수가 허용량을 초과한 경우 최적화 로직 구성</Li>
            <Li>중복 메시지에 따른 업무 혼란 요소 제거</Li>
            <Li>코드의 불안 요소 제거</Li>
            <Ul>
              <Li>
                서버의 클래스 인스턴스는 인스턴스 변수를 가지면 요청이 중복되면
                잘못된 응답을 줄 수 있기 때문에 인스턴스 변수 제거
              </Li>
            </Ul>
            <Li>슬랙 API 제한 기능에 대한 대처 가이드라인 마련</Li>
            <Li>
              조회 API 페이징 관련 인터페이스를 통일하여 커뮤니케이션 비용 감소
            </Li>
            <Li>
              그룹단위의 편의 기능을 개발하여 업무 관리 포인트 통합하여 관리
            </Li>
            <Li>API 데이터 조회 기능 정책 정립하여 커뮤니케이션 비용 감소</Li>
            <Li>
              API 인터페이스 파일 자동 생성하여 프론트와 커뮤니케이션 비용 감소
            </Li>
            <Li>지라 관련 편의성 기능 개발로 인해 인적 리소스 감소</Li>
            <Ul>
              <Li>지라 프로젝트 조회 API 개발</Li>
              <Li>지라 티켓 생성 API 개발</Li>
              <Li>
                지라 릴리즈 버전을 생성하게 하여 다양한 API에서 활용하게 지원
              </Li>
              <Li>
                개발이 끝난 업무에 대해서 지라 fix version을 자동으로 추가하여
                인적 리소스를 절감
              </Li>
            </Ul>
            <Li>
              일반 계정이 아닌 깃랩 어드민 API와 연동하여 사용자 편의성 증가
            </Li>
            <Li>게임 혹은 랭킹 요소를 추가해서 리뷰 문화를 장려</Li>
            <Ul>
              <Li>게임 요소들 조회 정책 정립 및 최적화 작업</Li>
            </Ul>
            <Li>슬랙 채널 시상 시스템을 통해 정보 및 기술 공유 활성화</Li>
            <Li>
              슬랙 그룹 멤버을 통해 담당자 변경을 자동화하여 인적 리소스를 절감
            </Li>
            <Li>
              위키 페이지 조회, 생성, 복사, 수정 API를 통해 위키 관련 반복
              작업들을 자동화하여 인적 리소스를 절감
            </Li>
            <Li>
              슬랙 shortcut, 커맨드 기능을 통해 슬랙에서 기능을 손쉽게 이용
            </Li>
            <Li>
              웹훅의 기본 조건에 맞춰 서버의 조건을 수정하여 장애 요소 감소
            </Li>
            <Li>깃랩 버전에 맞게 로직 수정하여 생산성 향상에 기여</Li>
            <Li>리뷰어 자동 할당으로 인해 MR을 만들 때마다 드는 리소스 제거</Li>
            <Li>
              깃랩 이벤트에 대한 메시지가 누락되지 않게 하여 효과적인
              커뮤니케이션 체계 마련
            </Li>
            <Li>웹훅 성능 개선</Li>
            <Ul>
              <Li>5초에서 2초</Li>
            </Ul>
            <Li>통일성 없는 네이밍 포맷 가이드라인 마련 및 리팩터링</Li>
            <Li>
              FEOPS 백엔드 온보딩 및 개발 편의성 향상을 위한 가이드 문서 마련
            </Li>
            <Ul>
              <Li>기능을 추가하고 싶은 사람을 위한 온보딩 프로세스 도입</Li>
            </Ul>
            <Li>
              스웨거를 만들기 위한 로직 개발, 서버 배포 시 자동으로 인터페이스
              파일 생성하여 프론트엔드와 소통을 원할하게 합니다.
            </Li>
            <Ul>
              <Li>MyApiResponse</Li>
            </Ul>
            <Li>
              유저에게 전달하기 위한 포맷 관련 이슈 제거를 통해 유저에게 편의성
              증대
            </Li>
            <Ul>
              <Li>slack-jsx</Li>
            </Ul>
            <Li>
              자료들을 관리하는 방법 변경을 통해 직접 자료를 확인할때 발생 할 수
              있는 요소를 제거
            </Li>
            <Ul>
              <Li>soft delete</Li>
            </Ul>
            <Li>특정 팀에 관련 된 로직들 분리하여 적용 및 분리가 쉽게 구성</Li>
            <Ul>
              <Li>임시값 관리를 위한 저장소 마련 및 관리</Li>
            </Ul>
            <Li>FEOPS 내 환경 변수 계층 만들기</Li>
            <Li>
              서버 에러 시 공통 처리 로직을 통해 빠른 에러 감지 및 대응 구조
              설계
            </Li>
            <Ul>
              <Li>서버 전체, 기능 장애 시 알람 구조 마련</Li>
              <Li>에러 발생 시 문제 파악을 위한 디버깅 구조 마련</Li>
            </Ul>
            <Ul>
              <Li>loki, grafana, 프로메테우스</Li>
            </Ul>
            <Li>개발 과정에 따른 티켓 상태 변경 자동화 기능 개발</Li>
            <Ul>
              <Li>
                티켓 관리의 혼란을 방지하기 위한 티켓 상태에 대한 가이드라인
                마련
              </Li>
              <Li>
                티켓 상태 자동 변경 기능을 부분적으로 막을 정책 및 기능 개발
              </Li>
            </Ul>
            <Li>스프린트 운영을 통한 업무 능률 향상</Li>
            <Ul>
              <Li>스토리포인트 도입, 지라 대시보드 활용</Li>
            </Ul>
            <Li>칸반 보드 도입을 통해 스토리 기반의 업무 진행</Li>
            <Li>테스트 코드 추가</Li>
            <Li>업무 시간 내에만 알람 받게 수정</Li>
            <Ul>
              <Li>근무 여부 확인 기능</Li>
            </Ul>
            <Li>기능을 추가하고 싶은 사람을 위한 온보딩 프로세스 도입</Li>
            <Ul>
              <Li>온보딩 문서 구체화 하기</Li>
            </Ul>
            <Li>에러 발생 시 해당 요청자 확인 프로세스 도입</Li>
            <Li>리드미와 컨트리뷰팅 분리</Li>
            <Li>마크다운을 활용한 슬랙 메시지 전달 기능</Li>
            <Li>어드민 환경 개선</Li>
            <Li>비마트 파트 위클리 자동화</Li>
            <Li>깃랩 개인 메시지 유저별로 조회 및 동기화로 수행</Li>
            <Li>플랫폼 콘솔에 사용자 그룹 변경</Li>
            <Li>
              년도가 넘어가면서 지라 버전이 잘못 생성되는 이슈 대응(head-ver)
            </Li>
            <Li>fe-today-i-learned 랭킹 만들기</Li>
            <Li>그룹 API 오류 대응</Li>
            <Li>슬랙 메시지 전송 동기화로 변경</Li>
            <Li>배민커머스웹프론트개발팀 데일리 스레드 만들기</Li>
            <Li>깃랩 검색 데이터에 링크 추가하기</Li>
            <Li>스웨거 변경 감지 봇 만들기</Li>
            <Li>젠킨스 배포 시 트리거 담당자 전달하기</Li>
            <Li>백엔드 아키텍처 재설계</Li>
            <Li>다양한 문서 정리</Li>
            <Li>VPC간 통신을 위한 네트워크 설정</Li>
            <Li>페어코딩 마련</Li>
            <Li>CI 빌드킷 버전 업</Li>
            <Li>FEOPS, 스펙트럼, 우아한 파티 합칠 준비 및 문서 정리</Li>
            <Li>깃랩 개인 메시지 유저별로 조회 및 동기화로 수행</Li>
            <Li>테스트 ava에서 vitest로 변경</Li>
            <Li>서포트 워크플로우 강화하기 계획</Li>
            <Li>루트 페이지 접속 시 필요한 아이콘 대응</Li>
            <Li>중복 실행 알람 환경 변수 노출하기</Li>
            <Li>업무 중에만 슬랙 DM 보내기 로깅하기</Li>
            <Li>In Test 상태 변경이 되는지 팔로업 하기</Li>
            <Li>소나큐브 연동</Li>
            <Li>Vitest 테스트 데이터 gitlab(lcov), 소나큐브(cobertura) 연동</Li>
            <Li>위키 자동화 시스템 만들기</Li>
            <Li>withCredentials 대응</Li>
          </Ul>
        </Section>
        <Section>
          <H3>커머스 백오피스 플랫폼</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>22.06 ~ 22.07</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 개발</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Mobx</Badge>
                  <Badge>Next</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>커머스를 위한 백오피스 개발</Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>TF 지원</Li>
            <Ul>
              <Li>디자인 QA를 리딩하면서 오는 혼선을 통합 관리</Li>
              <Li>커머스백오피스플랫폼을 개발하면서 시스템의 기준을 마련</Li>
            </Ul>
          </Ul>
        </Section>
        <Section>
          <H3>뉴 통합 결제 플랫폼</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>21.10 ~ 22.06</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 파트 리딩</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Mobx</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>배민페이관리 웹뷰/결제하기 웹뷰</Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>
              데일리 위클리 회고 성격 정리, 지라 보드 생성 및 워크플로 정리
            </Li>
            <Li>센트리 도입 및 운영에는 소스맵을 센트리에만 소스맵 적용</Li>
            <Li>
              ci 구성(빌드, test, 소나큐브 업로드, 슬랙으로 ci 결과 및 테스트
              소나큐브 리포트 받기, 배포)
            </Li>
            <Li>기존 1M 이상 하던 파일을 웹팩을 통한 파일 스플릿</Li>
            <Li>
              복잡한 이해관계에 의해 통일성 없는 코드를 새로운 프로젝트 구성
            </Li>
            <Li>
              배민페이 관리 지면 전면 개편 및 공통 모듈 재작성(2022.01.27 open)
            </Li>
            <Li>접근성 개선</Li>
            <Li>
              react-query 도입을 통해 서버 상태와 프론트 상태를 분리하고 mobx
              역할을 축소
            </Li>
            <Li>
              dialog를 선언적으로 처리하여 cLick 함수 안에서 modal에 관련 된
              코드를 한 곳에서 작성하여 쉽게 사용하도록 함
            </Li>
            <Li>
              functional css 도입을 통해 생산성을 향상 시키고 styled-component의
              역할을 제한적으로 허용하여 다양한 디자인을 시스템을 만들어
              공통적으로 관리되고 통일성 있는 UI/UX를 제공함
            </Li>
            <Li>
              파편화 되어 있던 결제페이지 실행 코드를 통일하고 결제페이지 개편
              및 관리 포인트 하나로 통일
            </Li>
            <Li>디자인 시스템을 위한 컴포넌트 typography 도입</Li>
          </Ul>
        </Section>
        <Section>
          <H3>배민 통합 결제 플랫폼</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>21.06 ~ 22.06 (1년)</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 파트 리딩(7월 입사 1명, 11월 입사 2명)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Mobx</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  각 지면 주문하기 웹뷰 및 배민페이 관리 웹뷰
                  <Br />
                  &nbsp;&nbsp;(배민(배민/배민라이더스/배민원), 비마트, 선물하기,
                  가족계정, 브랜드오더, 배민쇼핑라이브, <Del>
                    배민페이관리
                  </Del>{' '}
                  웹뷰)
                  <Br />
                  사내 모든 서비스에서 같은 주문결제 경험을 제공
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>
              서버 개발자만 있는 팀에서 프론트 팀을 만들고 프론트 파트를
              리딩하며 개발 문화를 만들어 감
            </Li>
            <Li>문서 최신화, 정리 및 실행환경 개선</Li>
            <Li>린트, 프리티어 수정, 서브모듈 제거</Li>
            <Li>
              브랜치 정리 및 브랜치 전략 수정하여 다른팀 프론트와 하나에
              레포에서 작업하면서도 서로 작업에서 블로커가 되지 않도록 함
            </Li>
            <Li>
              깃랩 플로우로 변경 및 일하는 방식을 현재팀이 중심이 되어 여러 팀이
              협업할 수 있게 문서 및 워크플로 정리
            </Li>
            <Li>배포 프로세스 개선, 알람 정리 및 작업 방식 정리</Li>
            <Li>센트리 소스맵 추가로 인해 디거핑 편의성 증가</Li>
            <Li>앱 웹뷰 지원(최소 버전 안드로이드 4.x)</Li>
            <Li>CI/CD 구성</Li>
            <Li>불법자금세탁방지를 위한 고객확인 기능을 추가하는 작업</Li>
            <Li>배민페이 적립 포인트 노출(포장주문에서 짝수 회원만)</Li>
            <Li>
              규칙없이 구성되어 있던 인프라를 회사의 기준 인프라를 기준으로
              재정비하여 누구든 수정 할 수 있게 구성함
            </Li>
            <Li>
              스프린트 도입 및 다양한 파트의 R&R 정리 및 결제플랫폼 로드맵
              문서화 및 공유
            </Li>
            <Li>배민페이 결제지면 개편</Li>
            <Li>배민 쇼핑 라이브 결제플랫폼 도입</Li>
            <Li>커머스 봉투값 도입</Li>
            <Li>
              개발 환경 개인화 및 결제플랫폼 브랜치 전략 수정 및 워크플로
              변경으로 효율적인 업무 프로세스 도입
            </Li>
            <Ul>
              <Li>디바이스별로 배포 환경 구성</Li>
            </Ul>
            <Li>
              공통 레이어 강화를 통해 각 서비스에서 작업해야 하는 상황 최소화
            </Li>
            <Li>결제플랫폼을 모든 서비스에 적용함.</Li>
            <Ul>
              <Li>
                배민쇼핑라이브, 전국별미 결제플랫폼 도입(레거시 프로젝트인
                배민페이 프론트 프로젝트 제거)
              </Li>
            </Ul>
            <Li>결제플랫폼 2.0 개발</Li>
            <Ul>
              <Li>
                결제플랫폼 2.0 개발을 통해 코드에 대한 이해와 나아갈 방향을 제시
              </Li>
            </Ul>
            <Li>업무 프로세스 일원화를 통한 유관 부서 최소화</Li>
            <Ul>
              <Li>
                워킹그룹을 운영해 이른 시일 안에 더 나은 결정을 할 수 있는
                문화를 만듦.
              </Li>
              <Li>
                브랜치 전략을 수정해 불필요한 소통과 실수를 줄여 업무 효율이
                상승함.
              </Li>
              <Li>유관부서를 최소화하여 일의 병목을 줄임.</Li>
            </Ul>
          </Ul>
        </Section>
        <Section>
          <H3>배민페이 관리지면</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>21.06 ~ 22.05 (1년)</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 파트 리딩</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  배민페이 관리지면을 개편하여 유지보수성을 향상 시키고 고객에게
                  좋은 UI/UX를 제공
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>우아한 JS에서 리액트로 전환</Li>
            <Li>새로운 디자인 가이드 기반으로 페이지 개편</Li>
            <Li>베타 환경 개인화를 통해 병렬 작업 지원</Li>
            <Li>
              캐시 전략으로 인해 이미지나 페이지가 잘못 노출되거나 늦게 노출
              되는 경우를 제거
            </Li>
            <Li>
              에러 로깅 시스템을 통해서 서비스에서 오류가 발생하는 횟수를 최소화
            </Li>
            <Li>개발자 개인 컴퓨터에서의 불편함들을 개선해 업무 능률 상승</Li>
          </Ul>
        </Section>
        <Section>
          <H3>배민페이 프론트</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>21.06 ~ 22.05 (1년)</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 파트 리딩</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  전국별미, 배민쇼핑라이브의 배민페이, 결제지면 관련 npm 모듈
                  관리
                  <Br />
                  배민 통합 결제 플랫폼의 배민페이 관련 sub module 관리
                </Td>
              </Tr>
            </TBody>
          </Table>
        </Section>
        <Section>
          <H3>결제하기 웹뷰</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>21.06 ~ 22.05 (1년)</Td>
              </Tr>
              <Tr>
                <Th>position</Th>
                <Td>웹 프론트엔드 파트 리딩</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  배달의민족 내의 결제 페이지 웹뷰
                  <Br />
                  (배민, 배민라이더스, 비마트, 선물하기, 가족계정, 브랜드오더,
                  배민페이, 전국별미, 배민쇼핑라이브)
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>서버에서 관리되던 페이지를 프론트로 이관</Li>
            <Li>
              각 서비스별로 다르게 운영되는 웹뷰 인터페이스를 통합하여 업무
              효율성 향상
            </Li>
            <Li>새로운 디자인을 바탕으로 페이지 개편 작업</Li>
            <Li>별도로 관리되던 코드를 통합함으로 업무 시간을 감소시킴.</Li>
            <Li>
              백엔드 개발자가 관리하던 페이지들을 프론트 개발 영역으로 통합시킴.
            </Li>
            <Li>
              레커시 프로젝트인 배민페이 프론트를 제거함으로써 관리 포인트를
              감소시킴.
            </Li>
            <Li>새로운 디자인을 바탕으로 결제페이지를 개편함.</Li>
            <Li>
              서비스별로 운영되던 인터페이스를 통합하여 관리 및 업무 효율성을
              향상함.
            </Li>
          </Ul>
        </Section>
        <Section>
          <H3>PLCC 현대카드 이벤트 페이지 지원 업무</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>21.06 ~ 22.05 (1년)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>html</Badge>
                  <Badge>Javascript</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>PLCC 현대카드 이벤트 페이지(웹뷰)</Td>
              </Tr>
            </TBody>
          </Table>
        </Section>
        <Section>
          <H3>주문접수앱 웹뷰</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>20.11 ~ 21.01 (3개월)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Redux</Badge>
                  <Badge>Express</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>배달의민족 업주님들이 사용하는 앱의 웹뷰</Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>배달대행사 연결 및 관리 페이지</Li>
            <Li>AI 배달 예상 시간 안내 페이지</Li>
          </Ul>
        </Section>
        <Section>
          <H3>post 배사광</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>20.11 ~ 21.05 (6개월)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Mobx</Badge>
                  <Badge>SWR</Badge>
                  <Badge>react-hooks-form</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  배달의민족 대표 B2B서비스채널인 `배민사장님광장` 웹서비스
                  Front-end 개발/운영개선 프로젝트 리뉴얼
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>프로젝트 초기 React AppLication Architecture 설계</Li>
            <Li>브랜치 전략 구상(master/deploy/feature)</Li>
            <Li>
              젠킨스 구성(master의 최신 커밋이 base가 아니라면 배포 불가능)
            </Li>
            <Li>허스키 도입(rebase시 현재 브랜치 최신화 후 진행)</Li>
            <Li>내정보 페이지, 하위 페이지 작업 및 메인홈 페이지 작업</Li>
            <Li>webpack 및 babel 설정</Li>
            <Li>Dialog, FormCard 추가</Li>
            <Li>swr 도입</Li>
            <Li>
              글로벌 스타일 추가(스타일 가이드 구성)
              <Ul>
                <Li>boxModel 글로벌 클래스 추가</Li>
                <Li>color 값 정의</Li>
                <Li>color 글로벌 클래스 추가</Li>
                <Li>typo 글로벌 클래스 추가</Li>
              </Ul>
            </Li>
            <Li>오픈을 위한 전체적인 QA</Li>
            <Li>점검 및 프론트 배포 여부 주기적인 체크</Li>
            <Li>
              개인 정보 페이지 브라우저 뒤로가기 버튼으로 인해 이동 시 새로고침
            </Li>
            <Li>사파리에서 새로고침이 되지 않는 이슈 해결</Li>
            <Li>ie11 지원</Li>
            <Li>배사광 리뉴얼 배포(3/24)</Li>
            <Li>리팩토링 작업</Li>
          </Ul>
        </Section>
        <Section>
          <H3>super2</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>20.07 ~ 20.11 (4개월)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Typescript</Badge>
                  <Badge>React</Badge>
                  <Badge>Spring</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  B2B서비스채널(전자계약서, 업주 요청 등의 웹서비스)
                  개발/운영개선
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>전자계약서 e2e TEST(testcafe) 작성</Li>
            <Li>tsLint를 esLint로 변경</Li>
            <Li>슈퍼2 설정 정리 및 실행 환경 간소화</Li>
            <Li>가게 영상/사진 관리 기능 추가</Li>
            <Li>전통시장카테고리 기능 추가</Li>
            <Li>배민오더 오프라인 정보 기능 추가</Li>
            <Li>가게 편의 정보 기능 추가</Li>
            <Li>전자 계약서 내 메뉴 신청 양식 변경</Li>
          </Ul>
        </Section>
        <Section>
          <H3>ceo-moon-front</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>20.06 ~ 21.01 (7개월)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Javascript</Badge>
                  <Badge>WoowahanJS</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  배달의민족 대표 B2B서비스채널인 `배민사장님광장` 웹서비스
                  Front-end 개발/운영개선(셀프서비스 제외한 부분)
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>AB test 구성 및 테스트</Li>
            <Li>이벤트 페이지</Li>
          </Ul>
        </Section>
        <Section>
          <H3>ceo-web-self-service</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>20.01 ~ 20.10 (9개월)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>TypeScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Mobx</Badge>
                  <Badge>React-Router</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  배달의민족 대표 B2B서비스채널인 `배민사장님광장` 웹서비스
                  Front-end 개발/운영개선(셀프서비스 부분)
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>사장님 광장 내의 셀프 서비스 오픈(20.02.25일 오픈)</Li>
            <Li>ceo-web-design-system를 활용해서 서비스 Front-end 개발</Li>
            <Li>메뉴 시스템 개선(20.07.14 오픈)</Li>
            <Li>
              ceo-selfservice-front(react, redux)를 ceo-web-design-system를
              활용해서 ceo-web-self-service(react, mobx)로 내제화
            </Li>
            <Li>스마트 메뉴 기능 대거 추가</Li>
            <Li>e2e test(testcafe) 작성</Li>
            <Li>A/B test 구성</Li>
            <Li>로컬 환경에서 https 적용</Li>
            <Li>class component meThod binding 규칙 논의</Li>
          </Ul>
        </Section>
        <Section>
          <H3>ceo-web-design-system</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>19.10 ~ 20.10 (12개월)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>TypeScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Mobx</Badge>
                  <Badge>React-Router</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>B2B서비스채널을 위한 디자인 시스템 구축/운영개선</Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>프로젝트 초기 React AppLication Architecture 설계</Li>
            <Li>새로운 프로젝트 개발 환경 및 구조 연구하고 설계 참여</Li>
            <Li>
              다른 프로젝트에서 사용 될 공통 디자인 시스템 컴포넌트 작성 및 수정
            </Li>
            <Li>Storybook을 통한 UI 검증 프로세스 간소화</Li>
          </Ul>
        </Section>
        <Section>
          <H3>ceo-selfservice-front</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>19.08 ~ 20.01 (5개월)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>TypeScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Redux</Badge>
                  <Badge>Redux-Saga</Badge>
                  <Badge>React-Router</Badge>
                  <Badge>JEST</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  배달의 민족을 사용하는 사장님들의 메뉴 관리를 위한 서비스 웹
                  서비스 개발/운영개선
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>ceo-web-self-service로 병합 후 프로젝트 종료</Li>
            <Li>
              1인분 메뉴 가격 최소, 최대값 입력 제한 개발 - 메뉴 타입 설정 기능
              개발
            </Li>
            <Li>메뉴구성 / 메뉴 설정 기능 추가 개발</Li>
            <Li>옵션 최대 / 최소값 기능 개발</Li>
          </Ul>
        </Section>
        <Section>
          <H3>smartmenu-admin-front</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>19.08 ~ 20.01 (5개월)</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>TypeScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Redux</Badge>
                  <Badge>Redux-Saga</Badge>
                  <Badge>React-Router</Badge>
                  <Badge>AnTd</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  배달의 민족을 사용하는 사장님들의 메뉴 관리를 위한 서비스의
                  회사 내부 관리 웹 서비스 개발/운영개선
                </Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>메뉴 매핑 정보 체크 가능 개발</Li>
            <Li>1인분 메뉴 가격 최소 / 최대값 입력 제한 개발</Li>
            <Li>운영자 권한 관리 라이트버전 개발</Li>
            <Li>시스템 관련 라우팅 분리</Li>
            <Li>프랜차이즈 메뉴 할인 기능 개발</Li>
          </Ul>
        </Section>
      </DetailSection>
    </>
  );
};
