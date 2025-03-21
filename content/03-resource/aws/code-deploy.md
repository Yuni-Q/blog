---
title: code deploy
date: 2021-04-19 10:04:13
category: aws
tags: []
draft: true
---

## appspec.yml 추가

```yml
# appspec.yml

version: 0.0
os: linux
files:
  - source: /
    destination: /home/ubuntu/moti-backend
    overwrite: true

hooks:
  AfterInstall:
    - location: scripts/install_dependencies.sh
      timeout: 300
      runas: root
  ApplicationStart:
    - location: scripts/restart_server.sh
      timeout: 300
      runas: root

  ValidateService:
    - location: scripts/validate_server.sh
      timeout: 300
      runas: root
```

### scripts 추가

```zsh
# install_dependencies.sh
# scripts/install_dependencies
echo '============================'
echo 'Running install_dependencies'
echo '============================'

cd /home/ubuntu/moti-backend
npm install
```

```zsh
# restart_server.sh
# scripts/restart_server
echo '======================'
echo 'Running restart_server'
echo '======================'

cd /home/ubuntu/moti-backend
npm run pm2
```

```zsh
# validate_server.sh
echo '======================='
echo 'Running validate_server'
echo '======================='

sleep 3
result=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/)

echo Check http://localhost:8000/
echo $result

if [[ "$result" =~ "200" ]]; then
  exit 0
else
  exit 1
fi
```

## S3 추가

- AWS_DEPLOYMENT_BUCKET_NAME

## EC2 관련 세팅

### EC2에서 사용할 역할 추가

1. IAM에서 역할 탭에서 역할 만들기
2. EC2 선택 후 권한 연결
3. AmazonEC2RoleforAWSCodeDeploy 정책 검색 후 체크
4. EC2RoleforAWSCodeDeploy 역할이 포함되었는지 확인 후 만들기
5. 역할을 EC2 서비스에 등록

- ec2 선택 -> 작업 -> 보안 -> IAM 역할 수정 -> 역할 추가
- 역할을 선택한 후 해당 인스턴스를 재부팅해야 역할이 정상적으로 작동합니다.

6. ec2에 태그 추가(Name: ec2-deploy)
7. appspec.yml의 destination 경로에 폴더 생성

### CodeDeploy 에이전트 설치

```zsh
sudo apt-get update
sudo apt-get install ruby
sudo apt-get install wget
cd /home/ubuntu
wget https://aws-codedeploy-ap-northeast-2.s3.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status
```

## CodeDeploy 관련 세팅

### CodeDeploy 역할 생성

- CodeDeploy를 선택 후 역할 설정
- CodeDeploy는 권한이 하나뿐이라서 선택 없이 바로 다음으로 넘어가면 됩니다.

### CodeDeploy 애플리케이션 생성

- 이름 설정
- 컴퓨팅 플랫폼 EC2/온프레미스 선택

### 배포 그룹 생성

- 서비스 역할 위에서 추가한 `CodeDeploy 역할` 추가
- 배포 유형 : 현재 위치
- 환경 구성 : Amazon EC2 인스턴스
- 태그 그룹 : EC2에 추가했던 태그(Name: ec2-deploy)
- 배포 설정 : CodeDeployDefault.AllAtOnce
  - 2대 이상이라면 1대씩 배포할지, 30% 혹은 50%로 나눠서 배포할지 등등 여러 옵션이 있지만, 1대 서버다 보니 전체 배포하는 옵션으로 선택합니다. CodeDeployDefaultAllAtOnce는 한 번에 다 배포하는 것을 의미합니다.
- 로드 밸런싱 활성화 체크 해제

## git action setting

### Actions secrets

- AWS_CODEDEPLOY_APPLICATION_NAME
- AWS_DEPLOYMENT_BUCKET_NAME
- AWS_DEPLOYMENT_GROUP_NAME
- AWS_IAM_MANAGER_KEY_ID
- AWS_IAM_MANAGER_SECRET_ACCESS_KEY
- AWS_REGION

### yml

```yml
# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm run build

      - name: Remove node_modules
        run: rm -rf node_modules

      - name: Make zip file
        run: zip -r ./$GITHUB_SHA.zip .
        shell: bash

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_IAM_MANAGER_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_IAM_MANAGER_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Upload to S3
        run: aws s3 cp --region ${{ secrets.AWS_REGION }} ./$GITHUB_SHA.zip s3://${{ secrets.AWS_DEPLOYMENT_BUCKET_NAME }}/$GITHUB_SHA.zip

      - name: Code Deploy
        run: aws deploy create-deployment --deployment-config-name CodeDeployDefault.OneAtATime --application-name ${{ secrets.AWS_CODEDEPLOY_APPLICATION_NAME }} --deployment-group-name ${{ secrets.AWS_DEPLOYMENT_GROUP_NAME }} --s3-location "bucket=${{ secrets.AWS_DEPLOYMENT_BUCKET_NAME }}, key=$GITHUB_SHA.zip, bundleType=zip" --file-exists-behavior OVERWRITE
```
