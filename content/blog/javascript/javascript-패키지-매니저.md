---
title: javascript 패키지 매니저
date: 2020-01-22 09:01:15
category: javascript
draft: true
---

## npm

- 의존성관리 javascript 패키지 매니저
- java에 gradle , php의 composer 와 같은 역할을 한다.
- npm은 node의 모듈을 관리해주는 패키지 매니저입니다.
- node.js를 설치하면 내장(built in)되어 있습니다.
- npm -v를 통해 버전을 확인할 수 있습니다.
- npm install 명령으로 외부 모듈 패키지를 설치합니다.
- npm install에서 -g 옵션을 통해 글로벌로 설치할 수 있습니다.

> 글로벌 설치는 권장 되지 않으면 npx를 통해 글로벌로 설치하지 않고 사용하는 방법도 있습니다. npx의 경우 프로젝트 내의 패키지 설치 여부를 확인하고 없으면 글로벌 내의 패키지 여부를 확인하고 없으면 다운로드 받은 후 설치 되고 나서 사라집니다.

- npm으로 패키지 설치가 완료된 경우 [프로젝트경로]\[node_modules]\[패키지명]으로 모듈 패키지가 설치됩니다.
- 모듈이 필요 없어져서 삭제하는경우 npm uninstall 명령으로 삭제할 수 있습니다.
- npm update을 통해 모듈 업데이트 할 수 있습니다.
- 프로젝트 npm inatall로 외부 모듈 설치시 문제점이 있습니다. 프로젝트 경로에서 npm install을 이용하여 패키지를 설치하는 경우 해당 프로젝트 이에외는 사용할 수 없다는 문제점이 있습니다. 만약 여러 프로젝트에서 동일한 외부 모듈을 사용하는 경우 각각의 프로젝트마다 npm install을 해주어야 하는 번거로움이 생기게 됩니다. 이러한 문제를 해결하기 위한 방법으로는 외부모듈이 설치되는 node_modules 디렉터리를 프로젝트들의 상위 디렉터리로 옮기는 방법이 있습니다. node.js는 프로젝트가 실행될 때 필요한 모듈이 현재 프로젝트의 node_modules 디렉터리에 존재하는지 확인 후 없으면 상위 디렉터리의 node_modules 안에 디렉터리가 있는지 검사하기 때문입니다. 만약 상위에도 존재하지 않는 경우 더 상위 디렉터리의 node_modules을 검사하는식으로 동작합니다.
- 필요한 패키지들의 목록을 파일로 정리해놓고 목록 파일을 이용하여 단 한번의 명령어로 필요한 패키지들을 모두 설치할 수 있습니다. 이러한 패키지 정의 파일을 package.json 파일이라고 합니다. npm init 명령어를 통해 생성 할 수 있습니다.
- npm run 명령어를 통해 package.json에 있는 script 명령어를 실행 할 수 있습니다.
- npm ci는 package-lock.json 등의 lockfile을 기준으로 package를 설치하게 되어 있으므로, 규모가 큰 조직에서 package에 대한 lockfile이 승인되면, npm ci를 활용하여 package-lock.json에 명시되어 있는 패키지를 설치하도록 합니다.
- npm@5 부터 더욱 안정적이고 성능이 좋아졌습니다.

## yarn

- 페이스북, Exponent, 구글과 Tilde의 엔지니어 그룹들이 함께 협력하여 npm의 핵심 이슈를 해결하기 위해 만든 새로운 패키지 매니저입니다.
- Yarn은 프로젝트의 의존성을 관리하는 JavaScript의 패키지 매니저입니다.
- 보다 빠르고 안정적이며 보안성이 뛰어나다고 주장하고 있습니다.
- npm의 한계
  - npm 저장소의 취약한 보안 이슈를 시작으로, 의존 패키지의 버저닝 이슈, 무엇보다 패키지가 많아짐에 따라 빌드 성능이 좋지 않다는 점이 가장 큰 문제입니다.
- Yarn은 npm에 비해 얼마나 빠른가?
  - 간단한 React 애플리케이션을 통해 node_modules을 설치하는 속도는 npm과 크게 차이가 나지 않습니다. 하지만 두 번째 명령을 통해 아래와 같이 성능 차이가 나는 것을 볼 수 있습니다.
- 이미 npm을 통해 효율적으로 프로젝트를 관리하고 계시다면 꼭 Yarn을 사용해야 하는 것은 아닙니다. npm 역시 npm@5 부터 더욱 안정적이고 성능이 좋아졌기 때문입니다. 각자의 용도에 따라 필요한 수준의 도구를 이용하면 됩니다.
- 주의 사항
  - yarn.lock은 절대 직접 수정하지 않습니다.
  - package.json을 직접 수정하는 대신 yarn CLI를 통해 추가, 삭제, 업데이트하는 것을 추천합니다.
  - 새로운 패키지는 yarn add package@^version
  - 기존 패키지의 업데이트를 위해서는 yarn upgrade package@^version
  - yarn upgrade 명령을 통해 모든 패키지를 업데이트 하는 행위는 호환성이 보장되지 않는 대참사를 불러올 수 있기 때문에 사용을 지양합니다.

### 특징

- Ultra Fast(고속)
  - 다운로드한 모든 패키지를 캐시하므로 다시 다운로드할 필요가 없습니다. 또한 운영을 병렬화하여 리소스 활용률을 극대화하므로 설치 시간이 그 어느 때보다 단축됩니다.
- Mega Secure(보안)
  - 체크섬을 사용하여 코드가 실행되기 전에 설치된 모든 패키지의 무결성을 확인합니다.
- Super Reliable(신뢰성)
  - 상세하고 간결하며 잠금 파일 형식과 설치용 결정 알고리즘을 사용하여 한 시스템에서 작동하는 설치가 다른 시스템에서 정확히 동일한 방식으로 작동하도록 보장할 수 있습니다.
- Offline Mode(오프라인모드)
  - 이전에 패키지를 설치한 경우 인터넷 연결 없이 패키지를 다시 설치할 수 있습니다.
- Deterministic(결정적)
  - 설치 순서와 관계없이 모든 시스템에 동일한 종속성이 동일한 방식으로 설치됩니다.
- Network Performance(네트워크 성능)
  - 네트워크 활용도를 극대화하기 위해 요청을 효율적으로 대기열에 올리고 요청 폭포를 방지합니다.
- Same Packages(동일 패키지)
  - npm의 패키지를 설치하고 패키지 workflow를 동일하게 유지합니다.
- Network Resilience(네트워크 복구)
  - 요청 실패 한 번으로 인해 설치에 실패하지 않습니다. 실패 시 요청이 재시도됩니다.
- Flat Mode(플랫 모드)
  - 중복 항목을 생성하지 않으려면 일치하지 않는 버전의 종속성을 단일 버전으로 해결합니다.

## 참조

- [Yarn: 처음 보는 자바스크립트의 새 패키지 매니저 (Yarn: First Look at the New Package Manager for JavaScript)](https://www.vobour.com/yarn-%EC%B2%98%EC%9D%8C-%EB%B3%B4%EB%8A%94-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%83%88-%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%A7%A4%EB%8B%88%EC%A0%80-yarn-fir)
- [Yarn 톺아보기](https://www.holaxprogramming.com/2017/12/21/node-yarn-tutorials/)
- [yarn이란?](https://medium.com/@pakss328/yarn%EC%9D%B4%EB%9E%80-b4e8edf1638b)
