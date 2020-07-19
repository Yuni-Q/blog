---
title: data transfer
date: 2020-05-07 23:05:09
category: aws
draft: true
---

- AWS EC2를 이용해 사이드 프로젝트를 진행하는 중 \$273.11 달러의 요금 청구서가 날아왔습니다.
- Free Tier를 사용하고 있었기 때문에 과금 될 요소가 있지 않다고 생각했습니다.
  - EC2, MYSQL, S3 사용
- 비용 발생 요인은 Data Transfer 입니다.
  - $0.126 per GB - first 10 TB / month data transfer out beyond the global free tier / 1,961.881 GB / $247.20
  - $0.01 per GB - regional data transfer - in/out/between EC2 AZs or using elastic IPs or ELB / 107.630 GB / $1.08
  - VAT / \$24.83
- AWS EC2와 S3, MYSQL 간에 데이터 전송은 Data Transfer가 발생하지 않지만 앱에서의 호출 때문에 Data Transfer 요금이 발생했습니다.
  - 이미지는 캐싱 했으나 API를 페이징 없이 호출해서 한번 호출에 2.1M가 소모 되었습니다.(캐싱의 중요성...)
- 무제한 호스팅도 생각해 보았으나 AWS 이외의 다른 서비스이고 제약도 많아 보였습니다.
- 같은 AWS에서 Data Transfer가 많이 지원되는 Lightsail로 서버를 옮기기로 하였습니다.
  - Lightsail의 bandwidth(네트워크 대역폭)는 무제한(물론 무료는 아님)이지만, 한 달에 무료로 상당한 양의 outbound bandwidth를 제공합니다. 또한 Routh53의 제한된 기능과 단순한 인터페이스를 맺을 수 있습니다.
  - Lightsail의 대상은 AWS의 EC2, EBS, VPC, 그리고 Route53 같은 무수한 옵션들을 고려하고 싶지 않은 `간단한 VPS를 원하는 고객`들 입니다.
  - 20 USD / 월로 4GB 메모리 / 2코어 프로세서 / 80GB SSD 디스크 / 4TB 전송을 사용해 보도록 했습니다.
  - 이 역시 4T를 초과할 경우 Data Transfer 비용이 발생합니다. API도 캐싱을 시작했지만 앱에서 리젝으로 인해 배포가 다소 지연되어서 어떻게 될지는 조금 더 지켜보아야 할거 같습니다.
