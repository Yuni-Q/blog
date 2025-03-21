---
title: git branching
date: 2020-11-10 08:11:52
category: git
tags: []
draft: false
---

## 대표적인 브랜칭(branching) 전략

- Git-flow
- GitHub-flow

## Git-flow

- Git-flow는 브랜치를 크게 4가지로 나누어 개발하는 전략입니다.
  - 메인 브랜치(Main branch)
  - 피처 브랜치(Feature branch) 또는 토픽 브랜치(Topic branch)
  - 릴리스 브랜치(Release branch)
  - 핫픽스 브랜치(Hotfix branch)
- 가장 중심이 되는 브랜치는 master와 develop 브랜치이며, merge된 feature, release, hotfix 브랜치는 삭제하도록합니다.
- Git-flow 전략은 주기적으로 배포를 해야하는 프로젝트에는 적합하지만, 브랜치가 많아 복잡하고 어떤 프로젝트에 따라서는 몇몇 브랜치가 애매한 포지션을 가질 수 있습니다.

### 메인 브랜치(Main branch)

- master 브랜치와 develop 브랜치, 이 두 종류의 브랜치를 보통 메인 브랜치로 사용합니다.
- master 브랜치와 develop 브랜치를 병행으로 유지합니다.

#### master

- 배포 가능한 상태만을 관리하는 브랜치입니다.
- 배포된 코드를 모아놓은 브랜치로 각 브랜치를 태그로 표시해 둡니다.

#### develop

- 다음에 배포할 것을 개발하는 브랜치입니다.
- develop 브랜치는 통합 브랜치의 역할을 하며, 평소에는 이 브랜치를 기반으로 개발을 진행합니다.
- 개발이 완료되면 일련의 과정을 거쳐 마스터 브랜치로 머지 됩니다.

### 보조 브랜치(Supporting branch)

- 병렬 업무를 가능하게 합니다.
- 필요할 때 생성, 역할을 완료하면 삭제합니다.

#### 피처 브랜치(feature branch) 또는 토픽 브랜치(topic branch)

- 기능을 개발하는 브랜치로, develop 브랜치로부터 분기합니다.
  - 갈라져 나온 브랜치 : develop
- feature 브랜치는 그 기능을 다 완성할 때까지 유지하고, 다 완성되면 develop 브랜치로 merge 합니다.
  - 다시 merge할 브랜치 : develop
- merge 할때 merge commit을 생성하며 히스토리를 특정 기능단위로 묶습니다.
- feature 브랜치는 보통 개발자 저장소에만 있는 브랜치고 origin에는 push 하지 않습니다.
- 브랜치 이름 규칙 : master, develop, release-*, hotfix-*를 제외한 것
- 기존에 잘 작동하는 개발 코드(develop 브랜치)와 새로 변경될 개발코드(feature 브랜치)를 분리하고 각각 보존하는 것입니다.
- feature 브랜치는 Git-flow 전략에서 지칭하는 단위 개발 브랜치의 의미를 가집니다.

#### 릴리즈 브랜치(release branch)

- 배포를 위한 최종적인 버그 수정 등의 개발을 수행합니다. 버전명 등 메타데이터 변경 소소한 버그 수정을 합니다.
- tag를 이용해 버전을 명시해 줍니다.
- develop 브랜치에 이번 버전에 포함되는 기능이 merge 되었다면 QA를 위해 develop 브랜치에서부터 release 브랜치를 생성합니다.
  - 갈라져 나온 브랜치 : develop
- 배포 가능한 상태가 되면 master 브랜치로 병합시키고, 출시된 master 브랜치에 버전 태그를 추가합니다. release 브랜치에서 기능을 점검하며 발견한 버그 수정 사항은 develop 브랜치에도 적용해 주어야 합니다. 그러므로 배포 완료 후 develop 브랜치에 대해서도 merge 작업을 수행해야 합니다.
  - 다시 merge할 브랜치 : develop, master
- 브랜치 이름 규칙 : release-\*

#### hotfix

- 배포 버전의 문제를 고치는 브랜치입니다.
- 갈라져 나온 브랜치 : master
- 다시 merge할 브랜치 : develop, master

## Github-flow

- Git-flow가 Github에서 사용하기에는 복잡하다고 나온 브랜칭 전략입니다.
- 흐름이 단순한 만큼 role도 단순합니다.
- master 브랜치에 대한 role만 정확하다면 나머지 브랜치들에 대해서는 관여하지 않습니다. 즉, hotfix 브랜치나 feature 브랜치를 구분하지 않습니다. 다만 우선순위가 다를 뿐입니다. pull request 기능을 사용하도록 권장합니다.
- 이 브랜칭 전략은 수시로 배포가 일어나며, CI와 배포가 자동화되어있는 프로젝트에 유용합니다.
- 구성원 간의 정보 공유가 원할해야 합니다.
- pre-merge 테스트를 합니다.
- 배포 게이트 키퍼 없습니다.

### 1. master 브랜치는 어떤 때든 배포가 가능해야 합니다.

- master 브랜치는 항상 최신 상태며, stable 상태로 product에 배포되는 브랜치입니다.
- 이 브랜치에 대해서는 엄격한 role과 함께 사용합니다.
- merge하기 전에 충분히 테스트를 해야합니다. 테스트는 로컬에서 하는 것이 아니라 브랜치를 push 하고 Jenkins로 테스트 합니다.

### 2. master에서 새로운일을 시작하기 위해 브랜치를 만든다면, 이름을 명확히 작성합니다.

- 브랜치는 항상 master 브랜치에서 만듭니다.
- Git-flow와는 다르게 feature 브랜치나 develop 브랜치가 존재하지 않습니다.
- 새로운 기능을 추가하거나, 버그를 해결하기 위한 브랜치 이름은 자세하게 어떤 일을 하고 있는지에 대해서 작성합니다.
- 커밋메시지를 명확하게 작성합니다.

### 3. 원격지 브랜치로 수시로 push 합니다.

- Git-flow와 상반되는 방식입니다.
- 항상 원격지에 자신이 하고 있는 일들을 올려 다른 사람들도 확인할 수 있도록 합니다.
- 이는 하드웨어에 문제가 발생해 작업하던 부분이 없어지더라도, 원격지에 있는 소스를 받아서 작업할 수 있도록 합니다.

### 4. 피드백이나 도움이 필요할 때, 그리고 merge 준비가 완료되었을 때는 pull request를 생성합니다.

- pull request는 코드 리뷰를 도와주는 시스템입니다. 이것을 이용해 자신의 코드를 공유하고, 리뷰 받습니다.
- merge 준비가 완료되었다면 master 브랜치로 merge를 요청합니다.

### 5. 기능에 대한 리뷰와 논의가 끝난 후 master로 merge 합니다.

- 곧장 product로 반영이될 기능이므로, 이해관계가 연결된 사람들과 충분한 논의 이후 반영하도록 합니다.
- CI빌드 통과, 배포락 체크, 마스터 브랜치 최신 커밋이 존재하는지 확인해야합니다. 이상이 없다면 마스터에 머지합니다.

### 6. master로 merge되고 push 되었을 때는, 즉시 배포되어야 합니다.

- GitHub-flow의 핵심입니다.
- master로 merge가 일어나면 자동으로 배포가 되도록 설정합니다.

## GitLab flow

- Git flow는 너무 지나친 규칙을 가지고 있습니다.
  - release, hotfix 브랜치가 너무 복잡하다. 너무 지나친 규칙을 가지고 있습니다.
- GitHub flow는 너무 간소화되어 있습니다.
  - 지속적인 배포의 모범 사례가 부족합니다.
  - 릴리즈 소프트웨어, EC와의 통합은 어떤 식으로 해야하는지 설명되어있지 않습니다.
- GitLab flow는 master를 기본으로 환경별, 릴리즈별 브랜치를 생성합니다.
- 지속적인 배포가 어려울 때.
  - 실서비스에 나가있는 커밋들을 위한 production 브랜치가 존재합니다.
  - master 브랜치를 production에 merge함으로써 새로운 버전을 배포할 수 있습니다.
  - 거의 정확한 배포시각이 merge커밋에 나타납니다.
  - 배포 스크립트에 tag를 생성하도록 한다면, tag가 생성된 시간 === 배포가 나간 시간이 됩니다.
- 환경별 배포가 필요할 때.
  - 각 환경에서 테스트를 통과한 경우만 다른 환경으로 배포가 가능합니다.
  - hotfix의 경우, feature 브랜치로 만들고 Pull request를 통해 master로 merge합니다. 만약 마스터가 자동 테스트를 통과했다면, feature 브랜치를 각각의 브랜치에 머지해야합니다.
- 릴리즈 소프트웨어 일 때.
  - 버전 별 브랜치를 master에서 생성합니다.
  - 버그 픽스는 master에 머지하고 각 버전 브랜치에 cherry-pick 합니다. 버전 브랜치에 merge를 먼저 한다면, master로 다시 cherry-pick하는 것을 잊어버릴 수 있기 때문에 다음 버전에서 버그가 다시 출현할 수 있습니다. 이것은 linux 커널을 먼저 hotfix하고 각 배포판에 적용하는 upstream-forced와 비슷합니다.
  - 릴리즈 브랜치에는 bug-fix를 할 때마다 태그로 patch버전을 표시합니다.
  - latest 브랜치로 최신 버전을 체크할 수 있습니다.
- 개발이 완료되지 않았더라도 중간 결과를 팀 내 공유합니다.
  - 몇 시간 이상 기능 개발 중이라면 Merge/Pull request를 열어 피드백 받고 싶은 사람을 @멘션해서 피드백을 받습니다.
- 항상 이슈 트래커 시스템에서 이슈를 생성합니다.
  - 개발은 항상 코드 변경에 목표를 설명하는 이슈에서 시작합니다.
  - 코드에 대한 정보를 팀 내 공유 하는데 도움이 됩니다.
  - feature 브랜치 내에서 이것저것을 하지않게 되어 변경사항을 작게 유지하는데 도움이 된다.
- Commit을 자주하고 push도 자주합니다.
  - commit을 작게 나누면, 나중에 코드를 봤을 때 컨텍스트 이해에 도움이 됩니다.
  - 완료되지 않았어도 Merge/Pull request를 통해 논의와 피드백을 받으면 코드 향상에 도움이 됩니다.
- Merge 전에 테스트합니다.
  - 잘못된 코드가 master에 merge되어 깨지기 전에 예방 가능합니다.
- 좀더 현실적인 상황에 대한 브랜치 대안입니다.
- 구성원 간의 정보의 공유가 중요합니다.
- pre-merge 테스트를 합니다.

### Production branch with GitLab flow

- production 브런치가 존재하여 커밋한 내용들을 일방적으로 디플로이를 하는 형태입니다. GitHub에서 브런치 하나를 더 구성하여 사용하는 이것도 조금은 간단한 구성입니다.
- 이렇게 구성하면 배포 자동화가 되어있지않은 구성에서 어떻게 배포를 진행할 것인가에 대한 내용을 담았습니다.
- 물론 이걸로 부족하여 다음의 것도 추가되었습니다.

### Environment branches with GitLab flow

- master와 production 사이에 pre-production을 두어 개발한 내용을 곧장 반영하지 않고 시간을 두고 반영을 하는 것을 말합니다. Staging을 위한 공간을 만듭니다.

### Release branches with GitLab flow

- release한 브런치를 두고서 보안상 문제가 발생한 것이나 백 포트를 위해서 작업을 할 경우, cherry-pick을 이용해서 작업을 진행할 수도 있습니다. 아니면 해당 릴리즈에서 발생하는 버그들을 묶어서 수정하는 방식으로 작업합니다. 일반적으로 말하는 ‘upstream first’ 정책입니다.

### Merge/pull requests with GitLab flow

- Pull request를 사용하는 방법입니다.
- GitHub Flow에서 하는 방법과 동일합니다.

### Issues with GitLab flow

- Issue 트러커와 연결하여 사용하는 것을 말합니다. 긴 시간 동안 작업을 할 경우, 이슈를 생성하여 작업을 진행합니다.
- 브런치 이름에는 이슈번호를 적어 작업 중인 이슈가 어떤 것인지를 명확하게 해주는 것이 필요합니다.
- 작업이 끝나거나 코드 공유가 필요한 시점이면 Merge/pull requests를 보냅니다.

### 나의 깃 플로우 1

- master / develop / feature / deploy / hotfix
- master : 배포 성공 이후 deploy를 merge
- develop : feature들을 merge해서 beta test에 이용. master와 이격이 커질 경우 master에서 새로 만든다.
- feature : `feature/날짜/티켓번호`로 생성 후 develop에 merge해서 test하고 deploy에 merge해서 배포한다.
- deploy : develop에서 테스트 완료 된 feature를 merge 후 배포한다. `deploy/날짜`로 브랜치를 생성한다. 보통 배포 전날에 생성한다.
- hotfix : master에 merge 후 문제가 생기면 hotfix 브랜치 생성에서 배포하여 수정이 완료 되면 master에 머지한다. `hotfix/날짜`로 브랜치를 생성한다.
- adhoc : 브랜치명을 만들 때 날짜가 명확하지 않을 때 날짜 부분에 대신 사용한다.

#### 사용하는 이유

- 다양한 팀이 하나의 프로젝트에서 개발할 경우 beta 환경을 누가 사용하고 있던지 관계 없이 배포 가능하게 하기 위해 사용합니다.

### 나의 깃 플로우 2

- master / deploy / feature
- master : 배포 예정이 deploy 브랜치를 merge 후 태깅하고 태깅이나 master의 마지막 커밋으로 배포한다.
- deploy : `deploy/날짜`로 브랜치를 생성한다. 해당 날짜에 배포 나갈 feature들을 deploy로 pr하여 리뷰 후 merge하고 최종 테스트까지 브랜치에서 확인한다. jenkins script를 통해 merge-base가 master 최신 커밋과 같은지 확인하고 같지 않다면 배포를 못하게 한다. 이를 해결하기 위해서는 rebase해야 한다. rebase를 하면 force push가 필요하기 때문에 git hook을 이용해서 rebase 전에 브랜치를 pull 받을 수 있게 한다.
- feature : `feature/날짜/티켓번호`로 생성 후 deploy에 mr을 통해 merge해서 test한다. deploy에 merge 시에 rebase merge를 한다.
- hotfix : master에 배포 후 문제가 생기면 hotfix 브랜치 생성에서 배포하여 수정이 완료 되면 master에 머지한다. `hotfix/날짜`로 브랜치를 생성한다.
- adhoc : 브랜치명을 만들 때 날짜가 명확하지 않을 때 날짜 부분에 대신 사용한다.

#### rebase 하지 않으면 배포를 막자 !!

```bash
master=$(git rev-parse remotes/origin/master)
target=$(git merge-base remotes/origin/master remotes/origin/${BRANCH_NAME})

echo ${master}
echo ${target}

if [ "${master}" != "${target}" ]; then
   echo "master commit & ${BRANCH_NAME} common ancestor commit is not same"
   echo "리베이스가 되지 않아 실패하였습니다"
   exit -1
fi
```

#### rebase 할때 현재 브랜치를 최신화 하자 !

- husky 라이브러리의 pre-rebase를 사용합니다.

```bash
branch=$(git branch --show-current) && git pull https://git.baemin.in/ceo-frontend/ceo-moon-front.git ${branch}
```

- 브랜치가 충돌이 난 경우 `git rebase --continue` 명령어에도 husky가 작동되어 불편함이 있습니다. 이는
  husky v5에서 `HUSKY=0` 옵션을 통해 husky를 생략할 수 있습니다.

## squash and merge를 선호하는 이유([이재성](https://github.com/JeaSungLEE)님의 의견)

- 기본 머지는 장점은 각각의 브랜치들의 작업이 한눈에 보인다는 장점이 있습니다. 다만 단점은 머지 커밋이 생기게 됩니다. 그리고 시간별로 정렬이 되다보니, 머지가 직전에 되었다고 하더라도, 커밋이 예전에 했다면 커밋은 아래쪽에 위치해 있게 됩니다. 이러한 단점들을 해결하기 위해서 리베이스를 이용할 수 있습니다.
- 리베이스를 하게 된다면 머지 커밋이 사라지게 됩니다. 커밋의 시간과 상관없이 리베이스 하는 순간으로 각 브랜치의 커밋들이 모이게 됩니다. 다만, 한 그래프에 위치하다보니 각각의 브랜치에서 어떤 작업을 했는지 알기가 어렵습니다. 이 문제를 해결하기 위해서 squash로 각각의 브랜치들의 작업을 하나로 묶어줄 수 있습니다. 이렇게 되면 각 스펙, 기능, 이슈별로 하나의 커밋으로 보이기에 깔끔하게 보인다는 장점이 있습니다.
- Q. 커밋이 합쳐지면 세부내용을 볼 수 없습니다.
  - A. 세부내용은 pr 때 확인했을 것입니다. 그래프로 볼 때는 세부내용을 확인 할 일이 없습니다. 그렇기에 오히려 큰 작업 내용만 보여주는 것이 훑어보기에 더 좋다고 생각합니다.
- Q. 그럼 커밋 한개가 잘못되어서 리버트 해야할 경우가 있습니다.
  - A. 그럴 경우는 있으면 안되겠지만 만약 발생했다면 pr로 남긴 기록이 있기 때문에 해당 커밋에 대한 해쉬값은 로그에 남아 있습니다. 그것만 리버트를 하면 됩니다.
- Q. 스쿼시로 합쳐지니 명확하지 않은 느낌입니다.
  - A. 너무 큰 스펙으로 pr을 한게 아닌가 생각이 듭니다. 스펙이 크면 코드리뷰를 하기도 어렵고, 기능별로 코드도 분리하기 위해서 쪼개서 pr을 하는것이 더 좋다고 생각합니다.
- 예를 들어 커밋이 메인화면에 이미지 추가, 메인화면에 api콜 로직 추가, 메인화면에 디자인 입히기.... 이런식으로 했다고 하면 이 내용들을 이후 깃 브랜치 히스토리에서 다 볼 필요는 없다고 생각합니다. 그냥 메인화면 작업 이렇게 보이는게 훨씬 더 보기 편하고 깔끔하게 보인다고 생각합니다. 그래도 굳이 나눠서 보고싶다면 pr에 가서 확인하면 됩니다. 근데 나눠서 확인하려는 경우가 일반적으로 너무 드문 일이라 생각을 해서 스쿼시를 선호합니다.

### 나의 깃 플로우 3

- master : 현재 운영 중인 브랜치(롤백 브랜치)
  - 각지면 release 운영에 배포되어 문제가 없을 경우 현재 운영 중인 root master에 merge
  - release 브랜치 배포 당일 퇴근 전까지 MR을 날리면 결제서비스개발팀에서 리뷰 후 master에 merge 합니다.
  - master merge는 gitlab pr을 통해 (Fast-forward merge로) 진행 합니다.
  - 모든 브랜치 생성은 master를 기준으로 합니다.
- release : 운영 배포를 준비하는 각지면 브랜치
  - master로부터 지면별, 배포 날짜별 release 브랜치 생성 ( ex) serviceKey/release/2021-04-20 [XXXX-XX-XX] )
  - core 개발의 경우 core/release/XXXX-XX-XX로 브랜치를 생성합니다.
  - 공통 모듈 수정 시에는 코어팀에 코드 리뷰 요청을 필수로 합니다(QA 이전).
  - 각 지면이 아닌 core(공통 모듈)의 수정이 필요한 경우 각 지면 개발자와 core 개발자가 페어로 배포를 진행합니다.
  - 지면 개발자가 배포하기 전 해당 배포일에 core의 release 브랜치가 있으면 해당 브랜치로 rebase 후 배포를 진행합니다.
  - 지면 feature가 없이 core가 배포되는 경우에도 지면 개발자가 배포를 진행합니다.
  - QA나 모니터링 등에서도 각 서비스가 진행을 담당합니다.
  - QA시 나오는 버그는 release에서 처리합니다.
  - 운영 배포 전 master에 MR을 코어팀 담당자에게 보냅니다(due. 머지 금지 라벨 제거는 배포 당일 퇴근 전까지).
  - 운영배포 전에 MR를 만들어 다음 배포하는 사람이 배포되고 마스터에 머지가 되지 않은 코드가 있음을 인지하도록 합니다.
  - 운영 배포 후 검증이 되지 않을 경우 Draft prefiix와 머지 금지 라벨을 붙여 두고 검증이 끝난 후에는 머지 금지 라벨을 제거합니다.
  - 워크플로우 운영 - 슬랙 채널에서 배포 공지를 이용하여 커뮤니케이션합니다.
  - 배포 전날 MR에 머지되지 않은 릴리즈 브랜치가 없음을 확인 후 워크플로우 실행(권장) - 필수값(대상 서비스, 배포 일시, MR 주소), 옵션값(배포 내용)
  - MR 생성 시 Draft prefiix를 붙여 머지가 되지 않게 시스템을 활용하고 머지금지 라벨도 붙여 2중으로 관리합니다.
  - 누락 건이 있을 수 있기 때문에 슬랙 그룹 태그를 통해 공유 되도록 설정되어 있습니다.
  - 배포 당일 배포 시작 버튼을 통해 당일 배포가 시작되었음을 공유
  - 배포 완료 버튼을 통해 배포 후에 이상 없이 완료 되었음을 공유(롤백 되지 않고 잘 배포 되었다)
  - 머지 요청 버튼을 통해 마스터에 머지 되어도 됨을 배민페이프로덕트팀에 공유
  - Draft prefiix 제거 및 머지금지 라벨 제거
  - 당일에 머지가 불가능하다면 스레드를 통해 머지 요청 기간을 명시(배민페이프로덕트팀은 업무 시작 시간에 맞춰 봇을 통해 MR을 확인 하고 머지합니다)
  - 머지 요청을 하고 다음날 오후까지 머지완료가 되지 않을 경우 배민페이프로덕트팀에 재공유 부탁드립니다.
  - 머지 완료 버튼을 통해 배민페이프로덕트팀이 머지 완료했음을 공유
- develop : 다음 출시 기능을 QA하는 브랜치(이름을 Dry로 바꿀까...?)
  - develop 브랜치는 주기적(ex. 분기)으로 master에서 따고, 코어팀에서 합니다.
  - 모든 피쳐를 베타에 배포할 때는 develop에 merge하고 배포합니다.
  - 각 지면별 베타 QA 브랜치는 유지하지 않는 방향으로 진행합니다. ex) serviceKey/beta(x)
  - develop 이외에는 release 브랜치를 사용합니다.
- feature : 새로운 기능을 개발하는 각지면 브랜치
  - master에서 feature를 생성합니다. 
  - 개발이 완료되면 develop 브랜치에 머지 후 build 체크. 베타 환경에 배포 후 재확인합니다.
  - 베타 배포 후에는 배포 예정일을 관련 서비스에 채널(wg-결제플랫폼)에 공유하고, QA를 요청합니다. ex) serviceKey/feature/JIRA과제
- hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치
  - hotfix 브랜치는 master에서 만든다.
  - hotfix 작업 후 hotfix → master MR을 생성합니다. merge 후 develop을 rebase 합니다.
- 롤백 : release, hotfix 결함 발견으로 롤백해야할 경우 root master브랜치로 롤백합니다.

#### 브랜치의 다른 시선들

- master에 merge를 수동으로 feature별로 해야 하는게 불편합니다.(롤백을 편히 하기 위해 사용하는 것)
- github Flow 사용해 봤었는데 릴리즈 없이 많이 배포할 때 좋았었다.
- develop에서 test를 하는데 Master와 유사하나 다르기 때문에 운영 배포 되는 것과 차이로 인해 발견하지 못한 이슈가 생길수 있다. 이로 인해 찝찝함을 지울 수 없다.
  - release가 아니라 develop으로 QA하니까 충둘이나 찝찝함이 있다. 나가기 전날 release로 올려 보던가 한다. (TC를 beta(develop에서 진행하는게 맞은가? 나가는 환경과의 괴리)
- 동적으로 배포 환경을 만들 수 있다면 (develop이) 불 필요할 지도...
  - 앱이다보니 웹처럼 url 만들어서 기획자들에게 말씀 드리기가 어려울거 같기도 합니다.
  - 해시로 쿠키를 세팅할 수 있게 하고 쿠키를 세팅할수 있는 버튼이 개발버전에만 나오게끔 개발 앱을 만드는 방법도 고려.
- 리뷰 전에 릴리즈 머지된 상황
  - QA 끝 후 코드리뷰로 인한 수정 시에 수정할 것인가?
  - QA에 수정이 나오면 코드리뷰? → QA 피처를 새로운 FEATURE로 보고 수정 진행(코드리뷰없이 릴리즈에 머지되는일은 없어야 한다)
- develop 대신 dry라는 이름을 쓰는게 좀더 명확하지 않을까
  - 개발자가 확인 하는건 dev로 활용하고 QA는 QA담당자가 beta에 배포를 관리
  - merge or 배포가 되면 티켓에 자동 댓글이나 노티를 주는 방식을 고려

### 나의 깃 플로우 4

#### git flow의 문제점

- 주마다 배포가 진행된 다음 백포팅이 진행되는데, 백포팅이 진행되면 컨플릭이 일어나는 경우가 많고 일어났고, 가끔씩 변동사항이 너무 크면 다들 모여서 노트북 하나로 돌아가면서 컨플릭을 고치고 develop에 force-push를 자주 하게 됩니다.
- git flow 전략에서 release는 하나만 존재한다.
  - develop이 하나이다 보니 develop에서 파생될 수 있는 release 또한 하나로 제한된다.  차례를 기다렸다가 develop에 머지를 진행해야 한다. 이를 해결하기 위해 기존에는 master에서 릴리즈 생성하는 방법을 사용했다.
  - 하지만 매주 빈번하게 나가는 서비스는 git flow의 수 많은 브랜치를 거치지 않으면서 유동적으로 배포될 수 있어야 한다. develop을 삭제하고 main을 기점으로 release만 반복한다.  배포는 tag를 기준으로 나눈다.

#### develop을 삭제해서 얻는 이점
- main에서 develop으로 백포팅을 하지 않는다.
- hotfix는 main를 기준으로 진행되기 때문에 hotfix가 머지된 main를 다시 develop으로 백포팅하지 않는다.
자동화가 쉬워진다.
  - 기존 develop과 main이 싱크업이 안되어 여러 자동화 작업이 불가능 했기 때문.
  - 백포팅을 하지 않아서 충돌이 나지 않고 충돌이 나지 않으니 개발자가 직접 해결해야 할 문제가 없어진다. 이를 위해 rebase도 제한적으로 사용한다.
- default branch를 develop으로 할지 고민하지 않는다. main이 default branch. 하지만 main 브랜치와 production 환경에 배포된 것은 일치 되지 않는다.
- 들어올 개발자가 히스토리 파악이 가능하다. 깃 그래프 파악이 쉬워진다.
- git flow를 위해서 역할이 모호했던 부분이 사라져 프로세스가 간단해 진다.
- 이전에 develop을 제거하려 했던 시도 
  - 스프린트 단위로 배포할 수 있을것이라는 것과 요구사항이 정리될 수 있고 배포 환경을 나눠서 사용할 수 있기 때문에 혼란스러웠던 구조를 단순화하고자 했다. 이 과정에서 develop이 필요 없다는 것을 인지함. 차이점은 feature가 release에 배포되어 마스터에 머지 됨.

#### gitlab flow
- feature 단위의 개발 방법을 이슈 트래킹 시스템과 연동시켜, 단순하고 빠르게 git 작업을 진행할 수 있게한다.
  - gitlab flow는 기능 중심 개발 방법과 이슈 트래킹 시스템에 연계되는 기능 개발 브랜치를 합친 개념이다.
- git flow는 "개발"이 주 목적이지만, gitlab flow는 "배포"가 중심에 있다. 그렇기 때문에 배포 전용 branch가 존재하고, 이 브랜치에서 히스토리를 전부 관리할 수 있다. 또한 다양한 배포가 진행되면서 배포가 된 것인지 확인을 쉽게할 수 있는 장점이 있다.
  - dry(or develop)에서 모든 작업들을 모아서 테스트 할 경우 운영 배포될 환경과 다른점이 있어 확실히 QA 되었다고 확신하기 어렵다.
- 하지만, 이와 같이 단방형으로 잘 운영되려면 단순한 만큼 테스트가 철저해야한다는 점이 중요하다.
  - 은탄환은 없다.

#### 브랜치 전략

- gitlab flow를 기반으로 한다.
- main(master)과 production의 브랜치는 다르다.
- feature 작업은 forked repo에서 한다.
- 가장 큰 컨셉은 백포팅이 없이 체리픽으로 작업이 이동한다는 점이다.
- pre-production으로 배포 후 merge가 아닌 production으로 merge 후 배포한다.

#### 브랜치 설명
-	main : 모든 작업이 담긴 메인 브랜치	
  - 모든 코드가 피쳐단위로 작업되어 머지되는 곳.
  - 해당 코드들로 하여금 배포본을 만들어 배포한다.
  - 해당 브랜치를 기준으로 dev 배포를 진행한다.
  - protected branch
- feature/{JIRA 티켓 명} : 피쳐 단위의 작업용 브랜치(story, task, sub-task)
  - story, task, sub-task 단위의 작업을 진행할 때 제작하는 피쳐 브랜치.
  - 해당 브랜치를 main branch로 PR 날린다.
  - 브랜치 생성은 upstream의 main 브랜치 기준으로 branch를 생성한다.
  - feature 브랜치는 여러개가 될 수 있다. 또한, 각 사용자의 forked branch 혹은 local에 존재해야만 한다(upsteam repo에는 feature 브랜치가 존재하지 않는다).
  - feature 브랜치에서 여러 작업을 진행한 후, PR을 올린다(upstream/main 기준으로).
  - feature에서 main으로 머지하는 경우 `스쿼시 머지`한다. 결제플랫폼의 경우 배포 전날 릴리즈 브랜치 기준으로 작업을 점검하는데 검증할때 불필요한 정보가 적어진다. 커밋을 잘게 쪼개는 것은 코드 리뷰를 위해서 하고 티켓 단위를 잘 조율하여 해결한다.
  - `리뷰 시 코드를 실행 시켜보거나 페어코딩을 할 경우 다른 사람의 forked repo의 주소도 모두 등록해야 하는가?`	
- pre-production(release/{배포 일짜}) : 배포가 진행되는 일자에 해당하는 작업의 모음	
  - 해당 날에 실제 배포가 진행되야 하는 작업이 담긴 브랜치이다. 
  - 해당 브랜치를 기준으로 베타 배포를 진행하며, 베타에서 QA를 거친후 완전한 코드를 production으로 merge 한다.
  - release, main 간 code sync를 위해 cherry-pick으로 서로의 작업을 넘기는 형태로 진행된다. 베스트는 main에서 feature를 만든 후, 지속적으로 release에 cherry-pick으로 넘기는 행위를 권장하지만, 해당 케이스가 어려운 경우가 있으므로, release 에서 branch를 추가한 후, 작업해도 된다. 또한 작업기간이 굉장히 촉박한 경우가 있으므로, production까지 배포된 후, main으로 cherry-pick해도 된다.
  - pre-production(release 브랜치)은 여러개가 될 수 있다.
  - pre-production의 QA가 끝난 경우 다음 스텝으로 넘어갈 수 있게 공유한다(release 두 개의 QA 기간이 겹치는 경우, 앞선 release의 bugfix나 new feature에 대한 대응이 어려워짐).
  - 같은날 배포가 여러번 될 경우 postfix로 _{number}를 추가하여 관리한다.
- bugfix/{JIRA 티켓 명} : pre-production 브랜치에서 버그가 생길 경우 생성하여 대응	
  - pre-production으로 티켓을 만들고, pre-production으로 MR을 요청한다. 이후 적용되어 production으로 merge 되면 해당 작업을 range cherry-pick으로 main에 적용한다.	
-	production: 실제 운영에 배포되어 유저가 기능을 사용하는 코드의 집합
  -	해당 브랜치를 기준으로 운영 배포를 진행하며 태그를 통해 롤백을 진행합니다.
  - protected branch
-	hotfix/{배포 일짜} : 핫픽스가 나가야 하는 작업	
  - 배포 후 핫픽스가 필요해질때 사용한다. 바로 production 머지를 진행한다.
  - 함께 코드를 봐주는 사람을 꼭 1명 이상 함께해야 한다.
  - 배포 후 이후 main으로 체리픽하여 데이터를 가져온다. 영향있는 pre-production에도 체리픽을 잊지 않고 해줍니다.


---

## 참고

- [Git 브랜칭 전략 : Git-flow와 Github-flow](https://hellowoori.tistory.com/56)
- [2019.11.27 NHN FORWARD ‘깃’깔나는 Git 워크플로 알아보기](https://mindock.github.io/conference/NHN-FORWARD/)
- [Git flow, GitHub flow, GitLab flow](https://ujuc.github.io/2015/12/16/git-flow-github-flow-gitlab-flow/)
- [git flow; 환상과 현실 그 사이에 서비스](https://vallista.kr/git-flow;-%ED%99%98%EC%83%81%EA%B3%BC-%ED%98%84%EC%8B%A4-%EA%B7%B8-%EC%82%AC%EC%9D%B4%EC%97%90-%EC%84%9C%EB%B9%84%EC%8A%A4/)