---
title: OSI 7 계층
date: 2021-10-22 23:10:19
category: develop
tags: []
draft: true
---

## Layered 아키텍처를 따르는 대표적인 예 - 네트워크 시스템

- OSI 7 Layer 모델은 거대한 네트워크 소프트웨어 구조를 설명하는 것입니다.

## OSI 7 계층

- OSI 7 계층은 국제표준화기구(International Standard Organization, ISO)에서 1984년에 발표한 네트워크 표준 모델입니다.
- OSI 모델(Open Systems Interconnection Model)은 국제 표준화 기구(International Organization for Standardization, IOS)에서 만든 컴퓨터의 통신 기능을 계층 구조로 나눈 모델입니다. 이를 이용하면 특정 네트워킹 시스템에서 일어나는 일을 계층을 활용해 시각적으로 이해할 수 있습니다. 총 7계층으로 이루어져 있습니다. 데이터가 네트워크로 나갈 때는 위층에서부터, 네트워크에서 데이터를 받을 때는 아래층에서부터 들어옵니다.
- 하위계층으로 갈수록 하드웨어에 가까워지고, 상위계층으로 갈수록 소프트웨어에 더 가깝습니다. 1계층부터 4계층까지를 하위계층, 5계층부터 7계층까지를 상위계층으로 분류하고, 상위계층은 하위계층의 기능을 이어받아 사용합니다.
- 통신이 일어나는 과정을 단계별로 파악하여, 문제 발생시 트러블슈팅이 용이합니다. 즉 분할 정복이 가능합니다.
- OSI 자체는 현재 사용되고 있지 않지만, 이 계층 구조 개념은 다양한 분야에서 공통적으로 참조할 수 있는 참조 모델로 현재도 사용되고 있습니다. 또한, 참조 모델이 되면서 엔지니어가 서로 공용할 수 있는 일종의 공통 언어 역할도 하고 있습니다.

### OSI 참조 모델

- 세션 계층(session layer) : 통신 시작과 종료 순서
- 물리 계층(physical layer) : 전기적인 접속
- 데이터 링크 계층(data link layer) : 직접 접속돼 있는 기기 간 처리
- 네트워크 계층(network layer) : 네트워크 통신 경로 선택
- 전송 계층(transport layer) : 네트워크 통신관리
- 프레젠테이션 계층(presentation layer) : 데이터 표현 방법
- 애플리케이션 계층(application layer) : 애플리케이션 처리

#### 1. 물리 계층(Physical Layer)

- 데이터를 물리 매체상으로 전송하는 역할을 담당하는 계층으로, 전송을 위해 필 필요한 물리적 링크의 설정, 유지, 해제를 담당합니다.
- 사용자 장비와 네트워크 종단장비 사이의 물리적, 전기적인 인터페이스 규정에 초점을 두고 있으며, 전송 선로의 종류에 따라 전송방식과 인코딩 방식을 결정합니다.
- 전송 단위는 Bit를 사용합니다.
- 단지 데이터 전달의 역할을 할 뿐입니다.
- 전송 케이블이 직접 연결되는 계층으로 케이블을 통해 전송하는 기능을 합니다. 전압과 전류의 값을 할당하거나 케이블이나 커넥터의 모양 등 통신 장비의 물리적 전기적 특성을 규정합니다. 예를 들어 LAN 케이블로 사용되는 트웨스트 페어 케이블(STP/UTP)이나 이더넷(Ethernet) 규격인 100BASE-T 또는 IEEE802.11 시리즈의 무선 통신 등이 있습니다.
- 물리 계층에는 별도로 사용되는 포로토콜이 없으며, 랜선이나 허브, 리피터들의 디바이스들만 존재합니다.

#### 2. 데이터 링크 계층(Data Link Layer)

- 동일한 네트워크 간 인접한 두 시스템(노드) 간 통신을 규정합니다.
- 전송 단위는 Frame을 사용하며 주소는 Mac을 사용합니다.
- 물리계층의 있는 그대로의 전송설비를 신뢰할 수 있는 링크로 변환합니다. 이는 상위 계층인 네트워크 계층에게 오류 없는 물리계층으로 보이도록 합니다.
- 네트워크계층에서 정보를 받아 주소와 제어정보를 헤더와 테일에 추가합니다.
- 이 레이어에서 동작하는 L2 스위치라는 장비는 통신하고 싶은 노드가 어떤 포트와 연결되어 있는지를 MAC 주소로 판단하고 패킷을 전송하는 장비입니다.
- Ethernet, Token Ring, FDDI

#### 3. 네트워크 계층(Network Layer)

- 서로 다른 네트워크 간 통신을 위한 규정입니다.
- 데이터를 목적지까지 가장 안전하고 빠르게 전달하도록 합니다(Routing 기능).
- 전송 단위는 Packet을 사용하며 주소는 IP를 사용합니다.
- 송신측에서 수신측까지 데이터를 안전하게 전달하기 위해서 논리적 링크(네트워크)를 설정 하고 상위계층 데이터를 작은 크기의 패킷으로 분할하여 전송하는 역할을 수행한다.
- 데이터 계층이 노드 간 전달을 담당하는 반면 네트워크 계층은 송신지에서 최종 수신지까지 데이터를 안전하게 전달하는 것을 담당합니다. 이를 위해 패킷의 이동량이 많을 때는 패킷의 흐름을 제어하는 흐름제어(flow control) 기능과 전송 중 분실되는 패킷을 감지하고 재전송을 요구하는 오류 제어 기능을 가지고 있습니다.
- 대표적인 장비로는 라우터나 L3 스위치가 있습니다. 이런 장비는 패킷을 어디에서 어디로 전송할지에 대한 정보를 저장하는 라우팅 테이블(routing table)을 관리합니다. 이 테이블을 기반으로 루트를 정하는 정적 라우트(Static Route)와 라우팅 프로토콜에서 설정된 동적 라우트(Dynamic Route)가 있습니다. L3 스위치는 라우터와 동일한 기능을 하드웨어로 처리하는 장비입니다.

##### 관련 프로토콜

- IP (Internet Protocol)
- ICMP (Internet Control Message Protocol)
- IGMP (Internet Group Message Protocol)
- ARP (Address Resolution Protocol)
- RARP (Reverse Address Resolution Protocol)

#### 4. 전송 계층(Transport Layer)

- 전송 단위는 Segment를 사용하며 주소는 Port를 사용합니다.
- OSI 7계층 구조는 전송계층을 기점으로 하위계층으로 이루어진 네트워크 서비스와 상위계층으로 이루어진 사용자 서비스로 구별 될 수 있습니다.
- 전체 메시지를 발신지 대 목적지 (end-to-end)간 제어와 에러를 관리합니다.
- end-to-end 전송은 단순히 한 컴퓨터에서 다음 컴퓨터로의 전달이 아니라, 송신 컴퓨터의 응용프로그램(프로세스)에서 최종 수신 컴퓨터의 응용프로그램(프로세스) 으로의 전달을 의미합니다.
<!-- - 데이터 전송을 제어하는 계층입니다. 보낼 데이터의 용량, 속도, 목적지 등을 처리합니다. 세션 계층에서 보낸 메시지를 세그먼트로 나누고 각 세그먼트의 순서 번호를 기록해서 네트워크 계층으로 보내면 받는 쪽에서는 이를 다시 조립합니다. 이런 방식으로 전송 오류의 검출이나 재전송을 규정합니다. 대표적인 프로토콜로는 TCP와 UDP가 있습니다.
- TCP, UDP -->

##### 관련 프로토콜

- TCP (Transmission Control Protocol)
- UDP (User Datagram Protocol)
- SCTP (Stream Control Transmission Protocol)

#### 5. 세션 계층(Session Layer)

- 전송 단위는 message입니다.
- 세션 계층은 네트워크 대화 제어기로 통신 시스템 간에 상호대화를 설정하고, 유지하고, 동기화 합니다.
- 애플리케이션 간 연결을 유지 및 해제하는 역할을 합니다. 커넥션 확립 타이밍이나 데이터 전송 타이밍 등을 규정합니다.
- 실제 이용자의 응용프로그램 사이에서 세션이라 불리는 연결을 확립하고 유지하며 동기화 하는 기능을 제공합니다.
- 세션계층은 표현계층으로부터 받은 데이터를 효율적인 세션 관리를 위해 짧은 데이터 단위로 나눈 후에 전송 계층으로 내려 보냅니다.
- NetBIOS, SAP, SDP, NWLink

#### 6. 프레젠테이션 계층(Presentation Layer)

- 전송 단위는 message입니다.
- 송,수신자가 공통으로 이해 할 수 있도록 정보의 데이터 표현방식을 바꾸는 기능을 담당합니다.
- 송신측의 표현계층은 응용계층으로부터 받은 데이터의 보안과 효율적인 전송을 위해 암호화와 압축을 수행하여 세션 계층으로 내려 보냅니다.
  - 데이터의 저장 형식, 압축, 문자 인코딩 등을 변환하고 데이터를 안전하게 전송하기 위해 암호화, 복호화하는 기능도 이 계층에서 처리합니다.
- ASCII, MPEG, JPEG, MIDI

#### 7. 응용 계층(Application Layer)

- 전송 단위는 message입니다.
- 사용자가 네트워크에 접근할 수 있도록 인터페이스를 제공하는 계층입니다. 사용자에게 가장 직접적으로 보이는 부분이 바로 이 응용 계층에 해당하는 것입니다. 구글의 크롬과 같은 브라우저나 스카이프, 아웃룩 등의 응용프로그램이 이 응용 계층에서 동작합니다.

##### 관련 프로토콜

- FTP(File Transfer Protocol)
- VSFTP(Very Secure File Transfer Protocol)
- SNMP (Simple Network Management Protocol)
- SMTP (Simple Mail Transfer Protocol)
- HTTP (Hyper Text Transfer Protocol)
- HTTPS (Hyper Test Transfer Protocol Secure)
- DNS (Domain Name System)

## TCP/IP 4 Layer

- TCP/IP는 현재의 인터넷에서 컴퓨터들이 서로 정보를 주고받는데 쓰이는 통신규약 (프로토콜)의 모음입니다.
- 1960년대 말 미국방성의 연구에서 시작되어 1980년대 초 프로토콜 모델이 공개 되었습니다.
- 하드웨어, 운영체제, 접속매체에 관계없이 동작할 수 있는 개방성을 가집니다.

### OSI 7 Layer vs TCP/IP Protocol Suite

- TCP/IP 프로토콜은 OSI 모델보다 먼저 개발되었습니다. 그러므로 TCP/IP 프로토콜의 계층은 OSI 모델의 계층과 정확하게 일치하지 않습니다.
- 두 계층을 비교할 때, 세션(Session)과 표현(presentation) 2개의 계층이 TCP/IP프로토콜 그룹에 없다는 것을 알 수 있습니다.
- 두 모델 모두 계층형 이라는 공통점을 가지고 있으며 TCP/IP는 인터넷 개발 이후 계속 표준화되어 신뢰성이 우수인 반면, OSI 7 Layer는 표준이 되기는 하지만 실제적으로 구현되는 예가 거의 없어 신뢰성이 저하되어있습니다.
- OSI 7 Layer는 장비 개발과 통신 자체를 어떻게 표준으로 잡을지 사용되는 반면에 실 질적인 통신 자체는 TCP/IP 프로토콜을 사용합니다.

#### 1. Network Access Layer

- OSI 7 Layer에서 물리계층과 데이터링크 계층에 해당합니다.
- OS의 네트워크 카드와 디바이스 드라이버 등과 같이 하드웨어적인 요소와 관련되는 모든 것을 지원하는 계층입니다.
- 송신측 컴퓨터의 경우 상위 계층으로부터 전달받은 패킷에 물리적인 주소은 MAC 주소 정보를 가지고 있는 헤더를 추가하여 프레임을 만들고, 프레임을 하위계층인 물리 계층으로 전달합니다.
- 수신측 컴퓨터의 경우 데이터 링크 계층에서 추가된 헤더를 제거하여 상위 계층인 네트워크 계층으로 전달하니다.

#### 2. Internet Layer

- OSI 7 Layer의 네트워크 계층에 해당합니다.
- 인터넷 계층의 주요 기능은 상위 트랜스포트 계층으로부터 받은 데이터에 IP패킷 헤더를 붙여 IP패킷을 만들고 이를 전송하는 것입니다.

#### 3. Transport Layer

- OSI 7 Layer에서 전송계층에 해당합니다.
- 네트워크 양단의 송수신 호스트 사이에서 신뢰성 있는 전송기능을 제공합니다.
- 시스템의 논리주소와 포트를 가지고 있어서 각 상위 계층의 프로세스를 연결해서 통신합니다.
- 정확한 패킷의 전송을 보장하는 TCP와 정확한 전송을 보장하지 않는 UDP 프로토콜을 이용합니다.
- 데이터의 정확한 전송보다 빠른 속도의 전송이 필요한 멀티미디어 통신에서 UDP를 사용하면 TCP보다 유용합니다.

#### 4. Application Layer

- OSI 7 Layer에서 세션계층, 프레젠테이션계층, 애플리케이션 계층에 해당합니다.
- 응용프로그램들이 네트워크서비스, 메일서비스, 웹서비스 등을 할 수 있도록 표준적인 인터페이스를 제공합니다.

## OSI 모델 vs TCP/IP 모델

| OSI 모델           | TCP/IP 모델       | TCP/IP Updated    |
| ------------------ | ----------------- | ----------------- |
| Application Layer  | Application Layer | Application Layer |
| Presentation Layer | Application Layer | Application Layer |
| Session Layer      | Application Layer | Application Layer |
| Transport Layer    | Transport Layer   | Transport Layer   |
| Network Layer      | Internet Layer    | Network Layer     |
| Data Link Layer    | Network Interface | Data Link Layer   |
| Physical Layer     | Network Interface | Physical Layer    |

---

## 참고

- [네트워크 통신 계층: OSI 7 계층 바로 알기](https://www.sharedit.co.kr/posts/7482)
- [개발자를 위한 인프라 기초 총정리](https://futurecreator.github.io/2018/11/09/it-infrastructure-basics/)
- [OSI 7 Layer 과 TCP/IP 4 Layer(TCP/IP Protocol suite) 비교](https://goitgo.tistory.com/25)
