---
title: 네트워크의 기초
date: 2022-09-04 22:09:37
category: 후니의 시스코 네트워킹
tags: []
draft: true
---

## 네트워크 기초

- 네트워킹이란 서로 연결해주면서 같은 프로토콜을 사용하는 것입니다.
- 인트라넷은 특정 그룹만 사용이 가능한 네트워크입니다.
- 엑스트라넷은 인트라넷에서 파트너와 일부 고객까지 추가되어 접속이 가능한 네트워크입니다.
- ISP(internet Service Provider): 인터넷 회선을 제공하는 회사입니다(SK, KT, LG)
- 라우터: 네트워크와 네트워크를 연결해주는 것입니다.
- 피시는 케이블 허브/스위치에 연결되어 있는데 요즘은 허브가 단종되어서 스위치로 들어갑니다. 스위치는 더 큰 스위치인 코어스위치(백본 스위치)에 연결됩니다. 피시에 연결되어 있는 스위치는 엑세스 스위치라고 합니다. 백본 스위치는 라우터에 연결 됩니다. 라우터는 ISP에 연결 됩니다.
  - 무선 노트북의 경우 AP(Access Point)에 연결되고 AP 뒷단이 스위치가 됩니다.

### 인터넷의 특징

- 서로 연결되어 있습니다.
- TCP/IP 프로토콜을 사용합니다.
- 브라우저를 사용해서 쉽게 접속이 가능합니다.

## OSI 7 Layer

- Physical / Data Link / Network / Transport / Session / Presentation / Application
  - 애(A) - 프(P) - 스(S) - 트(T) - 앤(N) - 들(DL) - 피(P)
- TCP/IP는 Transport 계층
- HTTP는 Application 계층
- Network Layer는 내 주소, 받는 사람 주소를 포함합니다.
- 표준화 및 레이어마다 문제를 분기하기 위해 존재합니다.
- Network Layer는 라우터, Data Link Layer는 스위치, Physical Layer는 케이블을 주로 사용합니다. 표준화가 되어 있어서 다른 회사의 제품을 사용해도 됩니다.

### OSI 계층별 네트워크 장비

- Physical: Concentrator, Hub, Cables & Connectors
- Data Link: Bridge, Switch
- Network: Router, Multilayer Switch
- Transport, Session, Presentation, Application: Supported by (Protocols, Standards, Software)
- L2 장비는 스위치, L3 장치는 리우터입니다.
  - 멀티 레이어 스위치는 L2와 L3를 동시에 지원하는 스위치입니다.

#### Hub

- 두개 이상의 네트워크 장비를 묶어줍니다.
- Non-intelligent deceive(파워만 연결하면 됩니다)
- 들어오는 대로 그냥 보냅니다.
- 네트워크 대역폭을 나눠 사용합니다.
- 허브는 붙어 있는 모든 녀석에게 메시지를 보냅니다. 각각의 랜카드가 본인이 아닌 경우 버립니다.

## Ethernet( IEEE 802.3)의 통신방식 CSMA/CD

- 현재 사용하는 유선 통신 네트워크는 거의 모두 이더넷(Ethernet) 입니다.
- 매체 Access 방식

### CSMA/CD 방식을 사용합니다.

1. Carrier S ense/Transmit(케이블을 사용 중인지 확인 후 전송. multiple access 가능. 충돌 우려가 있음)
2. Collision Detection
3. Wait for random time/Retransmit(15번까지 시도)

## Token-Ring

- 토큰을 가진 아이만 보낼 수 있습니다.
- 충돌이 발생하지 않습니다.
- 속도를 올릴 수 없어서 사용되지 않습니다.

## 데이터의 전송 방식

- Unicast: 하나한테만 보내는 것입니다.
- Broadcast: 전체에게 보내는 것입니다. 네트워크 밖으로는 나갈 수 없습니다.
- Multicast: 그룹에게 보내는 것입니다.

## MAC(Media Access Control) Address

- Vendor Code, Serial Number 각각 24bits 총 48bits 구성되어 있습니다.
- MAC Address는 Layer2 주소입니다.
- MAC Address는 이세상에서 유일합니다.
  - MAC Address는 모든 네트워크 장비에 부여되는 고유번호입니다.

### MAC Address를 이용한 통신

1. ARP Request로 Broadcast하면 수신자가 Unicast로 응답한다.
2. 네트워크 밖에 있는 경우 라우터가 수신자를 대신해 응답한다.

## Bridges

- 네트워크 세그먼트 간을 연결하거나 프레임을 전달 해주는 기능을 수행하는 Data Link layer 장비입니다.
- 브리지/스위치의 4가지 기능: Learns, filters, forwards, and avoids loops
- 허브보다 약간 똑똑합니다.
- 들어오는 프레임을 분석합니다.
- Forward나 discard(filter)는 MAC 주소에 따라서 결정합니다.
- Competition within segments only
- 브리지는 포트가 2개 스위치는 여러개인 것입니다.

### 스위치가 호스트의 위치를 배우는 과정(Learning)

- 해당 인터페이스에 따른 출발지의 MAC 주소를 기억합니다.
- MAC Address Table

### Forwarding의 발생

- 브리지나 스위치가 목적지 주소를 알고 있는 경우 발생합니다.

### Filtering의 발생

- 목적지가 출발지와 같은 세그먼트에 있다는 것을 알고 있는 경우 발생합니다.
- Collision을 방지합니다.

### Hub와 스위치의 비교

- 허브: 모든 노드가 10Mbps의 속도를 나눠씁니다. 한번에 한 노드만이 보낼 수 있습니다.
- 스위치: 각각의 노드가 10Mbps의 속도를 가집니다. 여러 개의 노드에서 동시통신이 가능합니다.
- Collision의 문제를 해결하기 위해 나온 것이 스위치입니다.

### 참고

- 스위치는 샤시형(모듈형), 단독형이 있습니다.
  - 단독형도 스택형으로 사용할 수 있습니다. 스택형 장비는 스택 전용 케이블로 연결됩니다.

## 브로드캐스트는 언제발생하나?

- 네트워크 서비스를 광고하기 위해서
- 라우팅 정보를 서로 교환하기 위해서
- 네트워크 주소를 분석하기 위해서

### 브로드캐스트의 영향

- 브로트캐스트와 멀티캐스트는 CPU에 인터럽트를 겁니다.
- 대역폭을 소모합니다.

### 브리지와 스위치

- 콜류젼을 감소 시킵니다.
- 대역폭을 증가 시킵니다.
- 허브를 대치합니다.
- 스위치(Layer2)로는 브로드캐스트 도메인을 나눌 수 없습니다.
- 스위치로 구성된 네트워크에서는 브로드캐스트 도메인은 확장됩니다.

### 라우터

- 브로드캐스트 도메인을 나눕니다.
- Layer3 서비스를 제공합니다
- 라우터 또는 Layer3 스위치만이 브로드캐스트 도메인을 나눌 수 있습니다.
- Routing is: 출발지에서 목적지까지의 길을 찾아줍니다(path determination). 정보를 목적지에서 출발지쪽으로 배달합니다(switching)
- A Routing is: 네트워크 계층장비로써 출발지에서 목적지까지 경로를 결정해 주는 장비입니다. 브로드캐스트 영역을 나누어주는 성질이 있습니다.

### 라우터의 길 찾기

- 라우터는 네트워크상에서 가장 좋은 경로를 찾습니다. Routing table이라는 장소에 경로 정보를 저장합니다.

### 라우터와 스위치

| -          | ROUTER       | Switch         |
| ---------- | ------------ | -------------- |
| Speed      | slower       | faster         |
| OSI Layer  | 3-Network    | 2-Data Link    |
| Address    | hierarchical | MAC address    |
| Broadcasts | blocked      | passed through |
| Security   | high         | none           |
| Bandwidth  | good control | none           |

---

## 참고

- [후니의 쉽게 쓴 시스코 네트워킹](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788931589191&orderClick=LFR&Kc=)
