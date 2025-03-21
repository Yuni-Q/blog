## 키노트

### Simplexity(simple + complexity)

- 두발 자전거는 외발 자전거보다 복잡(단순성)하고, 세발 자전거보다 러닝커브(안정성)가 높지만 대중적이다.
  - 유연성, 확장성, 복잡성
- simple is best라고 생각할 수 있지만 복잡성을 가져갈 수 밖에 없음

### complexity

- 의도된 복잡성: 시스템을 확장하고 고객의 요구를 충족하기 위해 필요한 필연적인 복잡성
- 의도되지 않은 복잡성: 설계 오류, 기술적 부채, 잘못된 운영으로 인해 발생하는 불필요한 복잡성

#### 의도되지 않은 복잡성의 신호

- 기능 개발 속도 저하
- 잦은 장애 발생
- 디버깅 어려움의 증가
- 비대해진 코드베이스
- 일관성 부족
- 핵심 업무 외적인 작업 증가

### Simplexity를 위한 6가지 철학

- 진화 가능성을 요구 사항으로 설정하라
- 복잡성을 작은 단위로 나누라
- 조직 구조를 아키텍처에 맞춰 정렬하라
- 셀 기반 아키텍처를 도입하라
- 예측 가능한 시스템을 설계하라
- 자동화로 복잡성을 줄여라

#### 진화 가능성을 요구 사항으로 설정하라

- 진화 가능성을 설계 필수 조건으로 설정
- 변화는 필연적
- 유연한 설계 아키텍처
- S3 사례

#### 복잡성을 작은 단위로 나누라

- 작고 독립적인 단위로 분해
- 마이크로서비스/모듈화된 설계
- CloudWatch 사례

#### 조직 구조를 아키텍처에 맞춰 정렬하라

- 소프트웨어 설계는 조직 구조를 반영
  - 오너쉽 기반의 서비스 설계와 운영 전반의 책임 소유 / 독립적 기능 보유
- Ownership의 중요성
  - 책임감(Agency)과 긴급성(Urgency)이 성공하는 조직의 열쇠
- 효율성을 강화
- DynamoDB 팀 사례

#### 셀 기반 아키텍처를 도입하라

- 대규모 시스템에서 셀 기반 아키텍처
- 독집적 유닛의 장점
  - 문제 해결속도가 빠르고, 서비스 안정성 향상
- AWS HyperPlane 사례
  - Route53, NLB 등의 사례

#### 예측 가능한 시스템을 설계하라

- 예측 가능한 시스템 설계
- 성능 최적화를 고려
- AWS Route53 사례

#### 자동화로 복잡성을 줄여라

- 자동화 기반의 효율성 극대화
- 자동화가 주는 장점
  - 사람은 고도의 판단이 필요한 작업에 집중
- Amazon GuardDuty 사례
- 서포트 티켓 관리의 AI 자동화

### re:Invent 2024를 통해 바라본 주요 기술별 방향성

#### Computing 기술 방향성

- GenAI & HPC
- Graviton
- 스토리지/네트워킹 강화
- 하이브리드 클라우드

#### Storage 기술 방향성

- 관리의 자동화/최적화
- ...(못 들음)

#### Networking & Content Delivery 기술 방향성

- 프라이빗 연결 강화
- 컨텐츠 전달 최적화
- 어플리케이션 안정성
- 운영 자동화/관찰성

#### Container 기술 방향성

- 운영자동화 및 가시성
- 하이브리드/엣지
- 비용최적화
- 고가용성과 장애복구

#### DB 기술 방향성

- 고가용성과 복원력
- DB 관리 자동화
- 데이터 유연성
- Observability

#### Analytics

- 데이터 통합/연결성 강화
- ...(못 들음)

## [Core Services] AWS 컴퓨팅, 네트워크, 스토리지, 컨테이너의 새로운 비전

- 가장 폭넓은 프로세서와 아키텍처 제공
- Nitro System 아키텍쳐 진화
  - 성능 및 보안 개선
  - 대규모 언어 모델 훈련 지원
  - 강력한 보안 검증
- ML 워크로드를 위한 다양한 인스턴스 타입 제공
- Training 전용 실리콘 인스턴스 - Trn2 / Trn2 UltraServer
- Trainium3 Coming Soon
- Graviton4 기반 8세대 인스턴스 소개
- 스토리지 및 네트워킹 성능 최적화
- Amazon RDS 데이터베이스 엔진: io2 Block Express 볼륨을 지원
- CloudWatch 기반 EBS 볼륨 평균 지연 시간 확인
- EBS Time-Based Snapshot Copy
- Amazon S3 Tables
  - 완전관리형
  - S3와 통합
  - 고성능 데이터 분석
  - 다양한 분석 엔진과 호환
- Higher S3 Bucket Limits
  - 1 million buckets per AWS account
- Private Link 기능 확장
- 리소스 게이트웨이를 다양한 VPC 리소스와 연결
- ELB 용량 확보 기능 제공
- CloudFront 신규 기능들
  - VPC Origins 기능
  - Anycast 고정 IP 주소 지원
  - gRPC 프로토콜 지원
  - CloudFront function을 이용해서 각 요청에 대해 조건부로 origin 수정 가능
- Amazon EKS Auto Mode 소개
  - 버전 관리를 AWS 컨트롤 해준다

## 데이터베이스 혁심과 미래 글로벌 가용성, 자동화 그리고 AI통합 전략

### Aurora

- Aurora 출시 10주년
- Amazon Aurora Serverless zero ACU 지원
- Amazon Aurora PostgresQL Limitless
- Amazon CloudWatch Database Insights

### Aurora DSQL

- VPC에 속해있지 않음
  - 다이나모디비와 비슷
- Multi-Region linked cluster
  - synchronous라서 레이턴시가 조금 떨어질 수 있음
  - 오로라는 싱글 마스터 노드
- 요소별로 동적, 동립적 확장 가능
- 서버리스 스타일로 사용하면 된다.
- 쿼리 프로세서가 PostgresQL 스타일이다.
  - MySQL에 대한 로드맵은 존재하지 않음

### DynamoDB

- 가격 인하
- Warm Throughput
  - 예상치 못한 트래픽 대응
- 멀티 리전 - 강한 일관성
- zero-ETL integration

### MemoryDB

- multi-region active-active
- 충돌 시에는 마지막에 기록을 따른다
- Valkey: A community replacement for Redis
- VALKEY-GLIDE
  - java, node, python 지원

### Neptune

- 그래프 디비의 어려운 것을 고려하지 않아도 벡터 저장소 이점을 누릴 수 있다

### DMS

- 상용 데이터 베이스 AI를 통한 마이그레이션

## ETL 혁심부터 데이터 전략까지: AWS analytics 최신 기능과 분석 비법

- SageMaker Platform: 모든 데이터에 대한 통합 엑세스를 통해 분석 및 AI를 위한 통합 경험을 제공
- OpenSearch Service: 운영 데이터를 위한 단일 엔드포인트
  - S3와 zero-ETL 통합
- SageMaker Lakehouse: 통합적이고, 개방적이며, 안전한 데이터 레이크하우스 구축
- EMR & Glue
- S3 Tables: 아파치 아이스버그 형식을 그대로 쓸 수 있음. 빠른 트랜잭션 처리
