---
title: PART 02 네트워크와 케이블, 그리고 친구들
date: 2022-09-06 00:09:20
category: 후니의 시스코 네트워킹
tags: []
draft: true
---

## SECTION 01 LAN(Local Area Network)이란?

- LAN이란 `어느 한정딘 공간에서 네트워크를 구성`하는 것입니다.
- WAN은 'Wide Area Network'의 약자로 `멀리 떨어진 지역을 서로 연결`하는 경우에 사용합니다.

## SECTION 02 이더넷은 인터넷의 친구?

- 이더넷(Ethernet)은 CSMA/CD라는 프로토콜을 사용해서 통신하는 네트워크 구축 방식입니다.
- 우리나라에서는 대부분이 이더넷 방식을 사용합니다.
- 네트워크 방식에는 이더넷, 토큰링, FDDI, ATM 등 여러가지 방법이 있습니다. 어떤 네트워킹 방식을 사용하느냐에 따라 랜카드를 비롯하여 구입해야 하는 네트워크 장비들이 다릅니다.

### CSMA/CD

- CSMA/CD는 'Carrier Sense Multiple Access/Collision Detection'입니다. 한마디로 정리하면 `대충 알아서 눈치로 통신하자`입니다.

#### CSMA/CD 과정

- Carrier Sense: 우리 네트워크 자원을 쓰고 있는 PC나 서버가 있는지 확인합니다.
- 누군가 네트워크상에서 통신을 하고 있으면 자기가 보낼 정보가 있어도 못 보내고 기다립니다.
- Multiple Access(다중 접근): 2개 이상의 PC나 서버가 동시에 네트워크상에 데이터를 실어 보내는 경우입니다.
- Collision Detection: Multiple Access로 인해 Collision(충돌)이 발생할 수 있습니다. 이를 점검합니다. 콜리전이 발생하게 되면 데이터를 전송했던 PC들은 랜덤한 시간 동안 기다린 후 다시 데이터를 전송합니다.
- 15회 이상 충돌이나면 전송을 포기합니다.

## SECTION 03 그럼 토큰링(TokenRing)은요?
