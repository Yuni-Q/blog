import React, { useRef, useState, VFC } from 'react';
import { Badge, Button, DetailSection } from '../../../pages/about';

export const Meme: VFC = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
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
          show={show}
          onClick={() => setShow((preShowMeme) => !preShowMeme)}
        >
          미미박스 프로젝트
        </Button>
      </div>
      <DetailSection
        ref={ref}
        show={show}
        height={ref.current?.scrollHeight || 0}
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
            <li>기존 handlebaz로 구성되어 있던 모바일 웹 리액트로 리뉴얼</li>
            <li>
              퍼블리싱 없이 기획자와 디자이너의 기획서와 제플린을 통한 HTML,
              CSS, JS 작업(HTML, CSS 리드)
            </li>
            <li>기존 탭 리뉴얼 및 새로운 프로모션 탭 제작</li>
            <li>앱 웹뷰 지원(안드로이드 4.4 지원까지)</li>
            <li>
              iOS에서는 CSS 속성으로 스크롤이 지워지지 않아 임의의 방법으로 제거
            </li>
            <li>Apollo GraphQL 활용</li>
            <li>React Hooks 도입 리드</li>
            <li>
              Carousel에 영상 추가 및 위치에 따른 영상 재생 컨트롤 기능 개발
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
                  handlebaz로 되어 있는 프로젝트에 정적 데이터 수정( PC Web,
                  Mobile Web )
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </DetailSection>
    </>
  );
};
