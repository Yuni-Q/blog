---
title: What happens when type google.com into your browser address box and hit enter?
date: 2021-04-12 12:04:20
category: develop
tags: []
draft: true
---

## Agenda

- Initial Typing
- URL Parsing
- HTTP or HTTPS ?
- DNS Lookup
- TCP Connection
- TLS, ALPN, SNI
- First GET /
- HTML Parse

## 1. Initial Typing

- 섹션에서는 물리적 키보드 동작과 OS 인터럽트에 대해 설명합니다.
- 'g'키를 누르면 브라우저가 이벤트를 수신하고 `자동 완성` 기능이 시작됩니다. 브라우저의 알고리즘 및 개인/시크릿 모드에 있는지 여부에 따라 아래의 드롭 다운에 다양한 제안이 표시됩니다. 이러한 알고리즘의 대부분은 검색 기록, 북마크, 쿠키 및 인터넷 전체의 인기 검색을 기반으로 결과를 정렬하고 우선 순위를 지정합니다. 'google.com'을 입력 할 때 많은 코드 블록이 실행되고 키를 누를 때마다 제안 사항이 구체화됩니다. 입력을 마치기 전에 'google.com'을 제안 할 수도 있습니다.

## 2. URL Parsing

- google.com을 입력하고 Enter 키를 누르면 브라우저가 실행됩니다.
- 프로토콜이나 유효한 도메인 이름이 제공되지 않으면 브라우저는 주소 상자에 제공된 텍스트를 브라우저의 기본 웹 검색 엔진에 공급합니다. 대부분의 경우 URL에는 특정 브라우저의 URL 표시 줄에서 가져온 것임을 검색 엔진에 알리기 위해 특별한 텍스트가 추가됩니다.
- 호스트 이름에서 비 ASCII 유니 코드 문자 변환합니다.
  - 브라우저 확인에없는 문자의 호스트 이름 a-z, A-Z, 0-9, -, 또는 ..
  - 호스트 이름이 없기 때문에 google.com브라우저가 URL의 호스트 이름 부분에 Punycode 인코딩을 적용 합니다.

## 3. Find protocol

- 어떤 프로토콜과 어떤 포트에 연결할 것인지를 결정하는 단계입니다.
- HSTS 목록 확인합니다.
  - 브라우저는 '사전로드 된 HSTS (HTTP Strict Transport Security)' 목록을 확인합니다.
  - HTTPS를 통해서만 연락하도록 요청한 웹 사이트 목록입니다. 웹 사이트가 목록에있는 경우 브라우저는 HTTP 대신 HTTPS를 통해 요청을 보냅니다. 그렇지 않으면 초기 요청이 HTTP를 통해 전송됩니다.(웹 사이트는 HSTS 목록에 없어도 HSTS 정책을 계속 사용할 수 있습니다. 사용자가 웹 사이트에 대한 첫 번째 HTTP 요청은 사용자가 HTTPS 요청만 보내도록 요청하는 응답을 받게됩니다. 그러나 이 단일 HTTP 요청은 잠재적으로 사용자는 다운 그레이드 공격에 취약 하므로 HSTS 목록이 최신 웹 브라우저에 포함되어 있습니다.)
  - HTTP는 80, HTTPS는 443 포트로 요청을 보냅니다.

## DNS Lookup

```
domain: google.com
protocol: https
port: 443
IP: ?
```

- DNS는 도메인 이름 서버입니다.
  - DNS는 웹 사이트(URL)에 연결하는 특정 IP 주소의 이름을 유지하는 데이터베이스입니다. 인터넷의 모든 단일 URL에는 고유 한 IP 주소가 할당되어 있습니다.
- 브라우저는 캐시에서 DNS 레코드를 확인하여 google.com의 해당 IP 주소를 찾습니다.
- DNS 레코드를 찾기 위해 브라우저는 4개의 캐시를 확인합니다.
  - 브라우저는 도메인이 캐시에 있는지 확인합니다. 브라우저는 이전에 방문한 웹 사이트에 대해 고정 된 기간 동안 DNS 레코드 저장소를 유지합니다. 따라서 DNS 쿼리를 실행하는 첫 번째 장소입니다.
  - 찾을 수없는 경우 브라우저는 gethostbyname라이브러리 함수 (OS에 따라 다름)를 호출 하여 조회를 수행합니다.(브라우저는 OS 캐시를 확인합니다) OS가 DNS 레코드 캐시도 유지하므로 레코드를 가져옵니다. gethostbynameDNS를 통해 호스트 이름을 확인하기 전에 로컬 hosts파일 ( OS에 따라 위치가 다름) 에서 참조로 호스트 이름을 확인할 수 있는지 확인합니다 .
  - gethostbyname캐시되지 않았거나 hosts 파일 에서 찾을 수없는 경우 네트워크 스택에 구성된 DNS 서버에 요청합니다. 이것은 일반적으로 로컬 라우터 또는 ISP의 캐싱 DNS 서버입니다.(라우터 캐시를 확인합니다) 컴퓨터에 없는 경우 브라우저는 자체 DNS 레코드 캐시를 유지하는 라우터와 통신합니다.
  - 넷째, ISP 캐시를 확인합니다. 모든 단계가 실패하면 브라우저가 ISP로 이동합니다. ISP는 DNS 레코드 캐시를 포함하는 자체 DNS 서버를 유지 관리하며, 브라우저는 요청 된 URL을 찾기 위해 마지막으로 확인합니다.
    > 정보가 어딘가에 캐싱되어 개인 정보 보호와 관련하여 그다지 불편하지 않지만 캐시는 네트워크 트래픽을 규제하고 데이터 전송 시간을 개선하는 데 필수적입니다.
- 요청 된 URL이 캐시에 없는 경우 ISP의 DNS 서버는 주소를 호스팅하는 서버의 IP 주소를 찾기 위해 DNS 쿼리를 시작합니다.
  - DNS 쿼리의 목적은 웹 사이트에 대한 올바른 IP 주소를 찾을 때까지 인터넷에서 여러 DNS 서버를 검색하는 것입니다. 이러한 유형의 검색을 반복 검색이라고합니다. 필요한 IP 주소를 찾거나 찾을 수 없다는 오류 응답을 반환 할 때까지 DNS 서버에서 DNS 서버로 검색이 반복적으로 계속되기 때문입니다.
  - 이 상황에서 우리는 ISP의 DNS 서버를 DNS recursor라고 부릅니다. 그 책임은 인터넷상의 다른 DNS 서버에 응답을 요청하여 의도한 도메인 이름의 적절한 IP 주소를 찾는 것입니다. 다른 DNS 서버는 웹 사이트 도메인 이름의 도메인 아키텍처를 기반으로 DNS 검색을 수행하기 때문에 이름 서버라고합니다.
  - 오늘날 우리가 접하는 많은 웹 사이트 URL에는 3단계 도메인, 2단계 도메인 및 최상위 도메인이 포함됩니다. 이러한 각 수준에는 DNS 조회 프로세스 중에 쿼리되는 고유 한 이름 서버가 포함되어 있습니다.
  - maps.google.com의 경우 먼저 DNS recursor가 루트 이름 서버에 연결합니다. 루트 이름 서버는 .com 도메인 이름 서버로 리디렉션 합니다. .com 이름 서버는 google.com 이름 서버로 리디렉션 합니다. google.com의 이름 서버는 'DNS 레코드에 maps.google.com에 대한 일치하는 IP 주소를 찾아 브라우저로 다시 보내 것이다, 당신의 DNS의 recursor로 돌아갑니다.
  - 이러한 요청은 요청 내용 및 대상 IP 주소 (DNS recursor의 IP 주소)와 같은 정보가 포함 된 작은 데이터 패킷을 사용하여 전송됩니다. 이러한 패킷은 올바른 DNS 서버에 도달하기 전에 클라이언트와 서버 사이의 여러 네트워킹 장비를 통해 이동합니다. 이 장비는 라우팅 테이블을 사용하여 패킷이 목적지에 도달하는 가장 빠른 방법을 파악합니다. 이러한 패킷이 손실되면 요청 실패 오류가 발생합니다. 그렇지 않으면 올바른 DNS 서버에 도달하여 올바른 IP 주소를 가져와 브라우저로 돌아옵니다.
- DNS 서버가 동일한 서브넷에 있는 경우 네트워크 라이브러리 ARP process는 DNS 서버에 대해 아래를 따릅니다.
- DNS 서버가 다른 서브넷에 있는 경우 네트워크 라이브러리 ARP process는 기본 게이트웨이 IP에 대해 아래를 따릅니다.

### ARP 프로세스

- ARP (Address Resolution Protocol) 브로드 캐스트를 보내려면 네트워크 스택 라이브러리에 조회 할 대상 IP 주소가 필요합니다. 또한 ARP 브로드 캐스트를 보내는 데 사용할 인터페이스의 MAC 주소를 알아야합니다.
- ARP 캐시는 먼저 대상 IP에 대한 ARP 항목을 확인합니다. 캐시에있는 경우 라이브러리 함수는 결과를 반환합니다. Target IP = MAC.
- 항목이 ARP 캐시에없는 경우
  - 대상 IP 주소가 로컬 라우팅 테이블의 서브넷에 있는지 확인하기 위해 라우팅 테이블을 조회합니다. 그렇다면 라이브러리는 해당 서브넷과 연결된 인터페이스를 사용합니다. 그렇지 않은 경우 라이브러리는 기본 게이트웨이의 서브넷이있는 인터페이스를 사용합니다.
  - 선택한 네트워크 인터페이스의 MAC 주소가 조회됩니다.
  - 네트워크 라이브러리는 레이어 2 ( OSI 모델 의 데이터 링크 레이어 ) ARP 요청을 보냅니다 .
- 이제 네트워크 라이브러리에 DNS 서버 또는 기본 게이트웨이의 IP 주소가 있으므로 DNS 프로세스를 다시 시작할 수 있습니다.
  - DNS 클라이언트는 1023 이상의 소스 포트를 사용하여 DNS 서버의 UDP 포트 53에 소켓을 설정합니다.
  - 응답 크기가 너무 크면 대신 TCP가 사용됩니다.
  - 로컬 / ISP DNS 서버에이 기능이없는 경우 재귀 검색이 요청되고 SOA에 도달 할 때까지 DNS 서버 목록 위로 이동하며 발견되면 응답이 반환됩니다.

### 소켓 열기

- 브라우저가 대상 서버의 IP 주소를 수신되면, 그 소요되며 URL에서 지정된 포트 번호 (포트 80에 대한 HTTP 프로토콜 기본값 및 HTTPS를 포트 443) 및 명명 된 시스템 라이브러리 함수에 대한 호출을 socket하고 TCP 소켓 스트림을 요청합니다.
  - 이 요청은 먼저 TCP 세그먼트가 만들어진 전송 계층으로 전달됩니다. 대상 포트가 헤더에 추가되고 소스 포트가 커널의 동적 포트 범위 (Linux의 경우 ip_local_port_range)에서 선택됩니다.
  - 이 세그먼트는 추가 IP 헤더를 래핑하는 네트워크 계층으로 전송됩니다. 대상 서버의 IP 주소와 현재 컴퓨터의 IP 주소가 삽입되어 패킷을 형성합니다.
  - 다음으로 패킷은 링크 계층에 도착합니다. 머신 NIC의 MAC 주소와 게이트웨이 (로컬 라우터)의 MAC 주소를 포함하는 프레임 헤더가 추가됩니다. 이전과 마찬가지로 커널이 게이트웨이의 MAC 주소를 모르는 경우이를 찾기 위해 ARP 쿼리를 브로드 캐스트해야합니다.
- 이 시점에서 패킷은 다음 중 하나를 통해 전송 될 준비가되었습니다.
  - 이더넷
  - 와이파이
  - 셀룰러 데이터 네트워크
- 대부분의 가정 또는 소규모 비즈니스 인터넷 연결의 경우 패킷은 로컬 네트워크를 통해 컴퓨터에서 전달 된 다음 디지털 1과 0을 전화, 케이블을 통한 전송에 적합한 아날로그 신호로 변환하는 모뎀 (MOdulator / DEModulator)을 통해 전달됩니다. 또는 무선 전화 연결. 연결의 다른 쪽 끝에는 아날로그 신호를 다시 디지털 데이터로 변환하여 다음 네트워크 노드 에서 처리 할 수있는 또 다른 모뎀이 있습니다. 여기서 시작 및 끝 주소가 추가로 분석됩니다.
- 대부분의 대기업과 일부 새로운 주거용 연결에는 광섬유 또는 직접 이더넷 연결이 있으며,이 경우 데이터는 디지털로 유지되고 처리 를 위해 다음 네트워크 노드로 직접 전달됩니다 .
- 결국 패킷은 로컬 서브넷을 관리하는 라우터에 도달합니다. 여기에서 계속해서 자율 시스템의 (AS) 경계 라우터, 다른 AS, 마지막으로 대상 서버로 이동합니다. 각 라우터는 IP 헤더에서 대상 주소를 추출하여 적절한 다음 홉으로 라우팅합니다. IP 헤더의 TTL (Time to Live) 필드는 통과하는 각 라우터에 대해 하나씩 감소합니다. TTL 필드가 0에 도달하거나 현재 라우터의 대기열에 공간이없는 경우 (네트워크 정체로 인해) 패킷이 삭제됩니다.
- 이 송수신은 TCP 연결 흐름에 따라 여러 번 발생합니다.

## TCP Connection

- 브라우저가 서버와의 TCP 연결을 시작합니다.
  - 브라우저가 올바른 IP 주소를 받으면 IP 주소와 일치하는 서버와 연결하여 정보를 전송합니다. 브라우저는 인터넷 프로토콜을 사용하여 이러한 연결을 구축합니다. 사용할 수있는 인터넷 프로토콜은 여러 가지가 있지만 TCP는 여러 유형의 HTTP 요청에 사용되는 가장 일반적인 프로토콜입니다.
  - 컴퓨터 (클라이언트)와 서버간에 데이터 패킷을 전송하려면 TCP 연결을 설정하는 것이 중요합니다. 이 연결은TCP / IP 3 방향 핸드 셰이크. 클라이언트와 서버가 SYN (synchronize) 및 ACK (acknowledge) 메시지를 교환하여 연결을 설정하는 3 단계 프로세스입니다.
- 그러면 데이터 전송을위한 TCP 연결이 설정됩니다!

### three-way handshake.

- 클라이언트 컴퓨터는 ClientHello TLS (전송 계층 보안) 버전, 사용 가능한 암호 알고리즘 목록 및 압축 방법과 함께 서버에 메시지를 보냅니다 .
- 서버 ServerHello는 TLS 버전, 선택한 암호, 선택한 압축 방법 및 CA (인증 기관)에서 서명 한 서버의 공용 인증서를 사용하여 클라이언트에 메시지로 응답 합니다. 인증서에는 대칭 키에 동의 할 때까지 클라이언트가 나머지 핸드 셰이크를 암호화하는 데 사용할 공개 키가 포함되어 있습니다.
- 클라이언트는 신뢰할 수있는 CA 목록에 대해 서버 디지털 인증서를 확인합니다. CA를 기반으로 신뢰를 구축 할 수있는 경우 클라이언트는 의사 랜덤 바이트 문자열을 생성하고 서버의 공개 키로이를 암호화합니다. 이러한 임의의 바이트를 사용하여 대칭 키를 결정할 수 있습니다.
- 서버는 개인 키를 사용하여 임의의 바이트를 해독하고 이러한 바이트를 사용하여 대칭 마스터 키의 자체 복사본을 생성합니다.
- 클라이언트는 Finished대칭 키를 사용하여이 지점까지의 전송 해시를 암호화하여 서버에 메시지를 보냅니다 .
- 서버는 자체 해시를 생성 한 다음 클라이언트가 보낸 해시를 해독하여 일치하는지 확인합니다. 그렇다면 Finished대칭 키로 암호화 된 자체 메시지를 클라이언트에 보냅니다 .
- 이제부터 TLS 세션은 동의 된 대칭 키로 암호화 된 애플리케이션 (HTTP) 데이터를 전송합니다.

### 패킷이 드롭 된 경우

- 때때로 네트워크 정체 또는 불안정한 하드웨어 연결로 인해 TLS 패킷이 최종 목적지에 도달하기 전에 삭제됩니다. 그런 다음 발신자는 대응 방법을 결정해야합니다. 이를위한 알고리즘을 TCP 혼잡 제어 라고 합니다. 이것은 발신자에 따라 다릅니다. 가장 일반적인 알고리즘은 최신 운영 체제 에서는 큐빅 이고 거의 모든 다른 운영 체제에서는 New Reno 입니다.
  - 클라이언트 는 연결 의 최대 세그먼트 크기 (MSS)를 기반으로 혼잡 창을 선택 합니다.
  - 확인 된 각 패킷에 대해 창은 '저속 시작 임계 값'에 도달 할 때까지 크기가 두 배가됩니다. 일부 구현에서,이 임계 값은 적응 적입니다.
  - 느린 시작 임계 값에 도달하면 확인 된 각 패킷에 대해 창이 추가적으로 증가합니다. 패킷이 삭제되면 다른 패킷이 승인 될 때까지 창이 기하 급수적으로 줄어 듭니다.

## First GET /

- 브라우저는 웹 서버에 HTTP 요청을 보냅니다.
  - GET 요청을 보냅니다. 자격 증명을 입력하거나 양식을 제출하는 경우 POST 요청 일 수 있습니다. 이 요청에는 브라우저 식별(User-Agent 헤더), 수락 할 요청 유형 (Accept 헤더) 및 추가 요청에 대해 TCP 연결을 유지하도록 요청하는 연결 헤더와 같은 추가 정보도 포함 됩니다. 또한이 도메인에 대해 브라우저가 저장 한 쿠키에서 가져온 정보도 전달합니다.
- 서버가 요청을 처리하고 응답을 보냅니다.
  - 서버에는 브라우저에서 요청을 수신하고이를 읽고 응답을 생성하기 위해 요청 핸들러로 전달하는 웹 서버(예 : Apache, IIS)가 포함되어 있습니다. 요청 처리기는 요청, 헤더 및 쿠키를 읽어 요청 된 내용을 확인하고 필요한 경우 서버의 정보를 업데이트하는 프로그램 (ASP.NET, PHP, Ruby 등으로 작성됩니다)입니다. 그런 다음 특정 형식 (JSON, XML, HTML)으로 응답을 어셈블합니다.
- 서버는 HTTP 응답을 보냅니다.
  - 서버 응답에는 요청한 웹 페이지와 상태 코드, 압축 유형 ( Content-Encoding) , 페이지 캐시 방법 ( Cache-Control ), 설정할 쿠키, 개인 정보 등이 포함됩니다.
  - 위의 응답을 보면 첫 번째 줄에 상태 코드가 표시됩니다. 이는 응답 상태를 알려주기 때문에 매우 중요합니다. 숫자 코드를 사용하여 자세히 설명하는 5 가지 유형의 상태가 있습니다.
  - 따라서 오류가 발생하면 HTTP 응답을 살펴보고 수신 한 상태 코드 유형을 확인할 수 있습니다.

### 숫자 코드

- 1xx는 정보 메시지만을 나타냅니다.
- 2xx는 일종의 성공을 나타냅니다.
- 3xx는 클라이언트를 다른 URL로 리디렉션합니다.
- 4xx는 클라이언트의 오류를 나타냅니다.
- 5xx는 서버 부분의 오류를 나타냅니다.

## HTML Parse

- 브라우저에 HTML 내용이 표시됩니다 (가장 일반적인 HTML 응답의 경우).
  - 브라우저는 HTML 콘텐츠를 단계별로 표시합니다. 먼저 베어 본 HTML 스켈레톤을 렌더링합니다. 그런 다음 HTML 태그를 확인하고 이미지, CSS 스타일 시트, JavaScript 파일 등과 같은 웹 페이지의 추가 요소에 대한 GET 요청을 보냅니다. 이러한 정적 파일은 브라우저에 의해 캐시되므로 가져올 필요가 없습니다.
- 파싱 - HTML, CSS, JS
  - 렌더링-DOM 트리 구성 → 렌더 트리 → 렌더 트리 레이아웃 → 렌더 트리 페인팅

### 브라우저

- 브라우저의 기능은 서버에서 요청하고 브라우저 창에 표시하여 선택한 웹 리소스를 표시하는 것입니다. 리소스는 일반적으로 HTML 문서이지만 PDF, 이미지 또는 다른 유형의 콘텐츠 일 수도 있습니다. 리소스의 위치는 URI (Uniform Resource Identifier)를 사용하여 사용자가 지정합니다.
- 브라우저가 HTML 파일을 해석하고 표시하는 방법은 HTML 및 CSS 사양에 지정되어 있습니다. 이러한 사양은 웹 표준 조직인 W3C (World Wide Web Consortium) 조직에서 관리합니다.
- 브라우저 사용자 인터페이스는 서로 공통점이 많습니다. 일반적인 사용자 인터페이스 요소는 다음과 같습니다.
  - URI 삽입을위한 주소 표시 줄
  - 뒤로 및 앞으로 버튼
  - 북마크 옵션
  - 현재 문서의로드를 새로 고치거나 중지하기위한 새로 고침 및 중지 버튼
  - 홈 페이지로 이동하는 홈 버튼

#### 브라우저 상위 수준 구조

- 사용자 인터페이스 : 사용자 인터페이스에는 주소 표시 줄, 뒤로 / 앞으로 버튼, 북마크 메뉴 등이 포함됩니다. 브라우저의 모든 부분은 요청 된 페이지가 표시되는 창을 제외하고 표시됩니다.
- 브라우저 엔진 : 브라우저 엔진은 UI와 렌더링 엔진 간의 작업을 마샬링합니다.
- 렌더링 엔진 : 렌더링 엔진은 요청 된 콘텐츠를 표시합니다. 예를 들어 요청 된 콘텐츠가 HTML 인 경우 렌더링 엔진은 HTML 및 CSS를 구문 분석하고 구문 분석 된 콘텐츠를 화면에 표시합니다.
- 네트워킹 : 네트워킹은 플랫폼 독립적 인 인터페이스 뒤에서 서로 다른 플랫폼에 대해 서로 다른 구현을 사용하여 HTTP 요청과 같은 네트워크 호출을 처리합니다.
- UI 백엔드 : UI 백엔드는 콤보 상자 및 창과 같은 기본 위젯을 그리는 데 사용됩니다. 이 백엔드는 특정 플랫폼이 아닌 일반 인터페이스를 노출합니다. 그 아래에는 운영 체제 사용자 인터페이스 방법이 사용됩니다.
- JavaScript 엔진 : JavaScript 엔진은 JavaScript 코드를 구문 분석하고 실행하는 데 사용됩니다.
- 데이터 저장소 : 데이터 저장소는 지속성 계층입니다. 브라우저는 쿠키와 같은 모든 종류의 데이터를 로컬에 저장해야 할 수 있습니다. 브라우저는 또한 localStorage, IndexedDB, WebSQL 및 FileSystem과 같은 스토리지 메커니즘을 지원합니다.

### HTML 구문 분석

- 렌더링 엔진은 네트워킹 계층에서 요청 된 문서의 내용을 가져 오기 시작합니다. 이것은 일반적으로 8kB 청크로 수행됩니다.
- HTML 파서의 기본 작업은 HTML 마크 업을 구문 분석 트리로 구문 분석하는 것입니다.
- 출력 트리("분석 트리")는 DOM 요소 및 속성 노드의 트리입니다. DOM은 Document Object Model의 약자입니다. HTML 문서의 객체 표현이며 JavaScript와 같은 외부 세계에 대한 HTML 요소의 인터페이스입니다. 트리의 루트는 "문서"개체입니다. 스크립팅을 통한 조작 이전에 DOM은 마크 업과 거의 일대일 관계를 갖습니다.

#### 구문 분석 알고리즘

- HTML은 일반 하향식 또는 상향식 파서를 사용하여 구문 분석 할 수 없습니다. 그 이유는 다음과 같습니다.
  - 언어의 관용성.
  - 브라우저에는 잘 알려진 잘못된 HTML 사례를 지원하기 위해 기존의 오류 허용 기능이 있습니다.
  - 구문 분석 프로세스가 재진입됩니다. 다른 언어의 경우 소스는 구문 분석 중에 변경되지 않지만 HTML에서는 동적 코드 (예 : document.write () 호출을 포함하는 스크립트 요소)가 추가 토큰을 추가 할 수 있으므로 구문 분석 프로세스가 실제로 입력을 수정합니다.
- 일반 구문 분석 기술을 사용할 수없는 브라우저는 HTML 구문 분석을 위해 사용자 정의 구문 분석기를 사용합니다. 구문 분석 알고리즘은 HTML5 사양에 자세히 설명되어 있습니다.
- 알고리즘은 토큰 화와 트리 구성의 두 단계로 구성됩니다.

#### 구문 분석 완료시 조치

- 브라우저는 페이지에 연결된 외부 리소스 (CSS, 이미지, JavaScript 파일 등)를 가져 오기 시작합니다.
- 이 단계에서 브라우저는 문서를 대화 형으로 표시하고 "지연"모드에있는 스크립트 (문서가 구문 분석 된 후 실행되어야하는 스크립트)를 구문 분석하기 시작합니다. 문서 상태가 "완료"로 설정되고 "로드"이벤트가 발생합니다.
- HTML 페이지에는 "잘못된 구문"오류가 없습니다. 브라우저는 잘못된 콘텐츠를 수정하고 계속 진행합니다.

## CSS 해석

- "CSS 어휘 및 구문 문법"을 사용하여 CSS 파일, \<style>태그 콘텐츠 및 style속성 값을 구문 분석합니다.
- 각 CSS 파일은으로 구문 분석되며 StyleSheet object각 개체에는 CSS 문법에 해당하는 선택기와 개체가있는 CSS 규칙이 포함됩니다.
- CSS 파서는 특정 파서 생성기가 사용되는 경우 하향식 또는 상향식 일 수 있습니다.

## 페이지 렌더링

- DOM 노드를 순회하고 각 노드에 대한 CSS 스타일 값을 계산하여 '프레임 트리'또는 '렌더 트리'를 만듭니다.
- 자식 노드의 기본 너비와 노드의 가로 여백, 테두리 및 패딩을 합하여 '프레임 트리'상향식에서 각 노드의 기본 너비를 계산합니다.
- 각 노드의 사용 가능한 너비를 자식에게 할당하여 각 노드의 실제 너비를 하향식으로 계산합니다.
- 텍스트 래핑을 적용하고 자식 노드 높이와 노드의 여백, 테두리 및 패딩을 합산하여 상향식 각 노드의 높이를 계산합니다.
- 위에서 계산 한 정보를 사용하여 각 노드의 좌표를 계산합니다.
- 요소가 floated, 위치 지정 absolutely또는 relatively또는 기타 복잡한 기능이 사용되는 경우 더 복잡한 단계가 수행 됩니다. 자세한 내용은 http://dev.w3.org/csswg/css2/ 및 http://www.w3.org/Style/CSS/current-work 를 참조하십시오.
- 다시 래스터 화하지 않고 그룹으로 애니메이션 할 수있는 페이지 부분을 설명하는 레이어를 만듭니다. 각 프레임 / 렌더 개체는 레이어에 할당됩니다.
- 페이지의 각 레이어에 텍스처가 할당됩니다.
- 각 레이어의 프레임 / 렌더 개체가 순회되고 각 레이어에 대해 그리기 명령이 실행됩니다. 이것은 CPU에 의해 래스터 화되거나 D2D / SkiaGL을 사용하여 GPU에 직접 그려 질 수 있습니다.
- 위의 모든 단계는 웹 페이지가 마지막으로 렌더링되었을 때 계산 된 값을 재사용 할 수 있으므로 증분 변경에 필요한 작업이 줄어 듭니다.
- 페이지 레이어는 브라우저 크롬, iframe 및 애드온 패널과 같은 다른 가시적 콘텐츠에 대한 레이어와 결합되는 합성 프로세스로 전송됩니다.
- 최종 레이어 위치가 계산되고 복합 명령이 Direct3D / OpenGL을 통해 실행됩니다. GPU 명령 버퍼는 비동기 렌더링을 위해 GPU로 플러시되고 프레임은 윈도우 서버로 전송됩니다.

## GPU 렌더링

- 렌더링 프로세스 동안 그래픽 컴퓨팅 계층은 범용 CPU또는 그래픽 프로세서 GPU를 사용할 수도 있습니다.
- 사용시 GPU그래픽 렌더링 계산 것이 이용 취할 수 있도록 그래픽 소프트웨어 계층은 여러 조각으로 분할하는 작업을 GPU상기 렌더링 처리에 필요한 부동 소수점 연산을 위해 대규모 병렬.

## 윈도우 서버

### 렌더링 후 및 사용자 유도 실행

- 렌더링이 완료된 후 브라우저는 일부 타이밍 메커니즘 (예 : Google 기념일 로고 애니메이션) 또는 사용자 상호 작용 (검색 창에 검색어 입력 및 제안 수신)의 결과로 자바 스크립트 코드를 실행합니다. 현재 Google 홈페이지에서는 아니지만 Flash 또는 Java와 같은 플러그인도 실행할 수 있습니다. 스크립트는 추가 네트워크 요청을 수행 할뿐만 아니라 페이지 또는 해당 레이아웃을 수정하여 다른 라운드의 페이지 렌더링 및 페인팅을 유발할 수 있습니다.

---

## 참고

- [What happens when you type a URL in the browser and press enter?](https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a)
- [what-happens-when](https://github.com/alex/what-happens-when)
- [What happens when type google.com into your browser address box and hit enter? (Detailed Analysis)](https://www.youtube.com/watch?v=dh406O2v_1c)