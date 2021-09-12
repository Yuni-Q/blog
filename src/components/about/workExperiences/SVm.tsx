import React, { useRef, useState, VFC } from 'react';
import { Badge, Button, DetailSection } from '../../../pages/about';

export const SVm: VFC = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
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
          show={show}
          onClick={() => setShow((preShowSVm) => !preShowSVm)}
        >
          SVm 프로젝트
        </Button>
      </div>
      <DetailSection
        ref={ref}
        show={show}
        height={ref.current?.scrollHeight || 0}
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
              KT GiftiShow 관련 API 수정 및 추가 - EC2(AutoScaling, ELB), S3,
              Route53, API Gateway 세팅 및 활용
            </li>
            <li>Swagger 작성 리드</li>
            <li>Swagger 모듈화 및 효과적인 관리를 위한 방안 구상</li>
          </ul>
        </section>
      </DetailSection>
    </>
  );
};
