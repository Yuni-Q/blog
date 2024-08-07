---
title: Visual Studio Code
date: 2020-07-29 09:07:35
category: tool
draft: false
---

## 단축키

| 단축키                 | 설명                             |
| ---------------------- | -------------------------------- |
| ctrl + shift + 좌/우   | 선택 영역 확장/축소              |
| option + 위/아래       | 블록간 이동                      |
| command + shift + \    | 마지막 블록으로 이동             |
| F2                     | rename                           |
| F12                    | 정의부로 이동                    |
| option + shift + F12   | 사용하는 코드 탐색               |
| command + 0            | 파일 탐색기 포커싱               |
| command + 1            | 에디터 포커싱                    |
| ctrl + \`              | 터미널 포커싱                    |
| command + shift + .    | 브레드크럼 포커싱                |
| shift + 좌/우          | 브레드크럼에서 이동              |
| command + p            | 파일로 이동                      |
| command + shift + p    | 모든 명령어 표시                 |
| command + t            | 심볼을 이용해서 파일로 이동      |
| command + shift + o    | 파일 내의 심볼 바로가기          |
| command + k + s        | 단축키 목록 보기                 |
| command + option + ]/[ | 블록 펴기, 접기                  |
| command + d            | 같은 단어 선택                   |
| option + click         | 중복 커서                        |
| command + /            | 주석                             |
| option + shift + i     | 선택 영역 중독 커서              |
| option + shift + drag  | 선택 영역 중독 커서(마우스 기준) |
| command + 위/아래      | 최상위 / 최하위 로 이동          |
| command + b            | 사이드바 숨기기                  |
| command + i            | 자동완성                         |

## terminer에서 노드 실행하기

- command + shift + p
- path 입력
- 셸 명령 : PATH에 'code' 명령 설치

## 확장 프로그램

### [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

- 페어링 태그의 이름을 자동으로 바꿉니다.

### [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- JS 작성에 도움을 줍니다.
- 사용하기 위해 설치가 필요합니다.

```bash
npm install -g eslint
eslint init
```

- .eslintrc.js 파일이 생성 됩니다.
- .eslintgnore 파일에 ESLint가 무시행야하는 파일이나 디렉터리를 추가할 수 있습니다.

### [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

- VScode에서 바로 실행합니다.(5000 포트 사용합니다.)

### [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- Prettier를 사용하여 JavaScript / TypeScript / CSS를 포맷하는 VS 코드 패키지 입니다.

### [Bracket Pair Colorization Toggler](https://marketplace.visualstudio.com/items?itemName=dzhavat.bracket-pair-toggler)

### [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)

- indent를 보기 쉽게 여러개의 색으로 표현해 줍니다.

### [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

- vs-code의 아이콘을 바꿔줍니다.

### [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

### [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)

### [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

### [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

### [WordCounter](https://marketplace.visualstudio.com/items?itemName=kirozen.wordcounter)

### [CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek)

- commande + click으로 해당 css가 정의된 곳으로 이동합니다.

### [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)

- 작업 영역에있는 정의 또는 링크 요소를 통해 참조되는 외부 파일을 기반으로 HTML 클래스 특성에 대해 CSS 클래스 이름 완성을 제공 합니다.

### [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

- \* 강조 표시된 텍스트
- ! 오류 및 경고
- ? 질의 및 질문
- // 취소 선
- TODO 할 일

### [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)

### [footsteps](https://marketplace.visualstudio.com/items?itemName=Wattenberger.footsteps)

### [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

### [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

### [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

### [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

---

## 사용하지 않게 된 확장 도구들

### [Placeholder Images](https://marketplace.visualstudio.com/items?itemName=JakeWilson.vscode-placeholder-images)

### [vscode-faker](https://marketplace.visualstudio.com/items?itemName=deerawan.vscode-faker)

### [htmltagwrap](https://marketplace.visualstudio.com/items?itemName=bradgashler.htmltagwrap)

- option + w 를 이용하여 선택한 내용을 HTML(p) 태그로 래핑 합니다.

### [VS Code JavaScript (ES6) snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)

- ES6 구문의 JavaScript 코드 작성에 도움을 줍니다.

### [Dashboard](https://marketplace.visualstudio.com/items?itemName=kruemelkatze.vscode-dashboard)

- 대시보드를 만들 수 있습니다.

### [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

### [Typescript React code snippets](https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript)

### [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

### [jumpy](https://marketplace.visualstudio.com/items?itemName=wmaurer.vscode-jumpy)

### [Data Preview](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-preview)

### [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)

### [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

### [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)

### [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)

### [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)

- 괄호를 색깔로 구분 할 수 있습니다.
