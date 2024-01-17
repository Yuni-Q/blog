import React, { useRef, useState, VFC } from 'react';
import {
  A,
  Badge,
  Br,
  Button,
  DetailSection,
  Div,
  H3,
  Li,
  Section,
  Table,
  TBody,
  Td,
  Th,
  Tr,
  Ul,
} from '../../../pages/about';

export const Meme = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <H3>
        <A href="https://m.memebox.com/" target="_blank" rel="noreferrer">
          미미박스
        </A>
      </H3>
      <Table>
        <TBody>
          <Tr>
            <Th>period</Th>
            <Td>19.01.23 ~ 19.08.23</Td>
          </Tr>
          <Tr>
            <Th>position</Th>
            <Td>프론티어 / Front-End Engineer</Td>
          </Tr>
          <Tr>
            <Th>projects</Th>
            <Td>
              React Mobile-Web & WebView
              <Br />
              Handlebaz Web, Handlebaz Mobile-Web & WebView
            </Td>
          </Tr>
        </TBody>
      </Table>
      <Ul>
        <Li>화장품 e-commerce MEMEBOX 웹 프론트엔드 개발</Li>
      </Ul>
      <Div style={{ textALign: 'right' }}>
        <Button
          show={show}
          onCLick={() => setShow((preShowMeme) => !preShowMeme)}
        >
          미미박스 프로젝트
        </Button>
      </Div>
      <DetailSection
        ref={ref}
        show={show}
        height={ref.current?.scrollHeight || 0}
      >
        <Section>
          <H3>MEMEBOX Mobile Web & WebView</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>19.01.23 ~ 19.08.23</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>TypeScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Redux</Badge>
                  <Badge>Redux-Thunk</Badge>
                  <Badge>React-Router</Badge>
                  <Badge>Apollo</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>React로 구성 된 모바일 웹과 웹뷰 서비스</Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>기존 handlebaz로 구성되어 있던 모바일 웹 리액트로 리뉴얼</Li>
            <Li>
              퍼블리싱 없이 기획자와 디자이너의 기획서와 제플린을 통한 HTML,
              CSS, JS 작업(HTML, CSS 리드)
            </Li>
            <Li>기존 탭 리뉴얼 및 새로운 프로모션 탭 제작</Li>
            <Li>앱 웹뷰 지원(안드로이드 4.4 지원까지)</Li>
            <Li>
              iOS에서는 CSS 속성으로 스크롤이 지워지지 않아 임의의 방법으로 제거
            </Li>
            <Li>Apollo GraphQL 활용</Li>
            <Li>React Hooks 도입 리드</Li>
            <Li>
              Carousel에 영상 추가 및 위치에 따른 영상 재생 컨트롤 기능 개발
            </Li>
            <Li>GTM 및 사내 웹 로그 로직 추가 및 모듈화</Li>
            <Li>GitLab CI 수정 및 PM2 ecosystem 도입 리드</Li>
          </Ul>
        </Section>
        <Section>
          <H3>Handlebaz Web, Handlebaz Mobile-Web & WebView</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>19.01.23 ~ 19.08.23</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Javascript</Badge>
                  <Badge>Node</Badge>
                  <Badge>Handlebaz</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>
                  handlebaz로 되어 있는 프로젝트에 정적 데이터 수정( PC Web,
                  Mobile Web )
                </Td>
              </Tr>
            </TBody>
          </Table>
        </Section>
      </DetailSection>
    </>
  );
};
