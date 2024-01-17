import React, { useRef, useState } from 'react';
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
  TBody,
  Table,
  Td,
  Th,
  Tr,
  Ul,
} from '../../../pages/about';

export const SVm = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <H3>
        <A
          href="https://www.puffLive.me/web/pufftv?locale=ko"
          target="_blank"
          rel="noreferrer"
        >
          SVm
        </A>
      </H3>
      <Table>
        <TBody>
          <Tr>
            <Th>period</Th>
            <Td>18.06.05 ~ 19.01.18</Td>
          </Tr>
          <Tr>
            <Th>position</Th>
            <Td>서버팀 / Back-End Engineer</Td>
          </Tr>
          <Tr>
            <Th>projects</Th>
            <Td>
              PUFF APP Backend
              <Br />
              PUFF APP Admin
            </Td>
          </Tr>
        </TBody>
      </Table>
      <Ul>
        <Li>동영상 스트리밍 앱인 퍼프 백엔드와 어드민 개발</Li>
      </Ul>
      <Div style={{ textALign: 'right' }}>
        <Button
          show={show}
          onCLick={() => setShow((preShowSVm) => !preShowSVm)}
        >
          SVm 프로젝트
        </Button>
      </Div>
      <DetailSection
        ref={ref}
        show={show}
        height={ref.current?.scrollHeight || 0}
      >
        <Section>
          <H3>PUFF APP Backend / PUFF APP Admin</H3>
          <Table>
            <TBody>
              <Tr>
                <Th>period</Th>
                <Td>18.06.05 ~ 19.01.18</Td>
              </Tr>
              <Tr>
                <Th>skill</Th>
                <Td>
                  <Badge>Ruby on Rails</Badge>
                  <Badge>Javascript</Badge>
                  <Badge>Node</Badge>
                  <Badge>MySQL</Badge>
                  <Badge>AWS</Badge>
                </Td>
              </Tr>
              <Tr>
                <Th>description</Th>
                <Td>PUFF APP을 위한 API 및 ADMIN 개발/유지보수</Td>
              </Tr>
            </TBody>
          </Table>
          <Ul>
            <Li>Ruby on Rails monoLiThic 구성 된 프로젝트 유지 보수</Li>
            <Li>앱 내 게임 관련 데이터 Redis에서 수집해 데이터 제공</Li>
            <Li>GiftiShow BaThch Sever 구성(Node.js)</Li>
            <Li>Ruby on Rails로 개발되어 있던 API Node로 리뉴얼</Li>
            <Li>
              KT GiftiShow 관련 API 수정 및 추가 - EC2(AutoScaLing, ELB), S3,
              Route53, API Gateway 세팅 및 활용
            </Li>
            <Li>Swagger 작성 리드</Li>
            <Ul>
              <Li>Swagger 모듈화 및 효과적인 관리를 위한 방안 구상</Li>
            </Ul>
          </Ul>
        </Section>
      </DetailSection>
    </>
  );
};
