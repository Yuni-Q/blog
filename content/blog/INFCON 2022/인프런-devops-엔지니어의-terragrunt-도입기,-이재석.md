---
title: 인프런 DevOps 엔지니어의 Terragrunt 도입기, 이재석
date: 2022-10-03 00:10:18
category: infcon 2022
tags: []
draft: true
---

## Iac(Infrastructure as Code)란?

- 수동 프로세스 대신 코드를 이용하여 인프라를 관리하는 것!

## AWS CDK로 IaC를 경험하다

- CloudFormation의 벽에 부딪히다
- 우리는 Terraform으로 간다

## 늘어난는 팀원과 불안한 시스템

- 가능성과 변동성으로 가득 찬 인프라를 4명이서 일관성 있게 구성할고 안정적으로 운영하는 방법이 필요하다.
- 프로젝트 구조 정립
  - env: dev, stage, prod 등
  - domain: inflearn, rallit 등
  - service: admin, b2b, b2c 등
  - account/env/domain/service/module/main.tf 형식

## Don't Repeat Yourself, Terragrunt!

| Terraform                                                                                                           | Terragrunt                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 모든 main.tf 파일마다 동일한 내용의 required_providers, backend, provider 등 작성                                   | 같은 내용은 한 번만 작성 후 다른 hcl에서 include                                                                  |
| 다른 디렉터리의 Terraform 변수 참조하려면 terraform_remote_state, json/yaml parse 등 복작한 방법을 사용해야 함      | include, dependency 블록 및 read_terragrunt_config 함수 이용. 간단히 다른 디렉터리에 있는 hcl 파일 내용 참조 가능 |
| 다수의 디렉터리에 대한 Terraform 명령을 실행하려면 의존성을 고려하여 각 디렉터리에 직접 가서 명령을 입력해주어야 함 | 알아서 의존 경로 계산 및 병렬 처리 수행                                                                           |
| -                                                                                                                   | Terratest 기반 Terraform 모듈 apply/destroy 테스트 도입                                                           |

## 과유불급, 필요한 만큼만 DRY하기

- 난장판이 된 환경 변수 파일을 보고 세운 환경 변수 분리 기준. 해당 환경 내에서 2회 이상 재사용되면서, 동일한 의미를 갖는 값만 환경 변수로 분리(거의 존재하지 않는다)

## DRY한 Terragrunt Architecture

- Terragrunt 도입 후 config 구조까지 도달하고 나니 Terraform만 사용했을 때보다 일회성 스크립트가 아닌 코드를 짠다는 느낌. 프로젝트 전반에 걸쳐 일관적인 컨벤션을 적용하기 수월해짐

## Terragrunt CI/CD

- Terragrunt 구조 정립 후 Atlantis 기반 CI/CD 구축 시도. 로그 확인 불가 등 Terragrunt 미지원 문제로 인해 실패
- 대신 Jenkins 기반 CI/CD 구축. Apply 실패 시 자동 Rollback 등 기능 추가 및 경험 기반 안정성 개선 예정
