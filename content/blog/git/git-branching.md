---
title: git branching
date: 2020-11-10 08:11:52
category: git
tags: []
draft: true
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
- 작업이 끝나거나 코드 공유가 필요한 시점이면 Merge/pull requsts를 보냅니다.

### 깃 플로우 1

- master / develop / feature / deploy / hofix
- master : 배포 성공 이후 deploy를 merge
- develop : feature들을 merge해서 beta test에 이용. master와 이격이 커질 경우 master에서 새로 만든다.
- feature : `feature/날짜/티켓번호`로 생성 후 develop에 merge해서 test하고 deploy에 merge해서 배포한다.
- deploy : develop에서 테스트 완료 된 feauture를 merge 후 배포한다. `deploy/날짜`로 브랜치를 생성한다. 보통 배포 전날에 생성한다.
- hotfix : master에 merge 후 문제가 생기면 hotfix 브랜치 생성에서 배포하여 수정이 완료 되면 master에 머지한다. `hotfix/날짜`로 브랜치를 생성한다.
- adhoc : 브랜치명을 만들 때 날짜가 명확하지 않을 때 날짜 부분에 대신 사용한다.

### 깃 플로우 2

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
  - A. 세부내용은 pr때 확인했을 것입니다. 그래프로 볼 때는 세부내용을 확인 할 일이 없습니다. 그렇기에 오히려 큰 작업 내용만 보여주는 것이 훑어보기에 더 좋다고 생각합니다.
- Q. 그럼 커밋 한개가 잘못되어서 리버트 해야할 경우가 있습니다.
  - A. 그럴 경우는 있으면 안되겠지만 만약 발생했다면 pr로 남긴 기록이 있기 때문에 해당 커밋에 대한 해쉬값은 로그에 남아 있습니다. 그것만 리버트를 하면 됩니다.
- Q. 스쿼시로 합쳐지니 명확하지 않은 느낌입니다.
  - A. 너무 큰 스펙으로 pr을 한게 아닌가 생각이 듭니다. 스펙이 크면 코드리뷰를 하기도 어렵고, 기능별로 코드도 분리하기 위해서 쪼개서 pr을 하는것이 더 좋다고 생각합니다.
- 예를 들어 커밋이 메인화면에 이미지 추가, 메인화면에 api콜 로직 추가, 메인화면에 디자인 입히기.... 이런식으로 했다고 하면 이 내용들을 이후 깃 브랜치 히스토리에서 다 볼 필요는 없다고 생각합니다. 그냥 메인화면 작업 이렇게 보이는게 훨씬 더 보기 편하고 깔끔하게 보인다고 생각합니다. 그래도 굳이 나눠서 보고싶다면 pr에 가서 확인하면 됩니다. 근데 나눠서 확인하려는 경우가 일반적으로 너무 드문 일이라 생각을 해서 스쿼시를 선호합니다.

## 참고

- [Git 브랜칭 전략 : Git-flow와 Github-flow](https://hellowoori.tistory.com/56)
- [2019.11.27 NHN FORWARD ‘깃’깔나는 Git 워크플로 알아보기](https://mindock.github.io/conference/NHN-FORWARD/)
- [Git flow, GitHub flow, GitLab flow](https://ujuc.github.io/2015/12/16/git-flow-github-flow-gitlab-flow/)
