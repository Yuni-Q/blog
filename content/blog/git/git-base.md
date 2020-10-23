---
title: git base
date: 2020-08-04 10:08:13
category: git
draft: false
---

## Git 명령어

### 1. Push

- git init : .git 폴더를 만들어 로컬 저장소를 만듭니다.
- git add (폴더명 or 파일명) :로컬 저장소에 변경 된 파일을 저장합니다.
- git commit -m "(내용)" : commit 메세지를 작성합니다.
- git remote add origin 주소 : remote 주소로 연결합니다.
- git push : remote에 upload 합니다.

### 2. Pull

- git clone 주소 : remote에 있는 코드를 로컬에 복사합니다.
- git pull : 로컬과 remote를 비교하여 로컬 파일 fetch and merge 합니다.
  - --rebase 옵션이 있습니다.

### 3. branch / switch / restore

- git checkout 브랜치명 : 브랜치를 변경하거나 워킹 트리의 파일을 복원해 주는 역할을 합니다.
- git switch 브랜치명 : 브랜치를 변경하는 명령어가 추가 되었습니다.
- git restore 파일명 : 워킹 트리의 파일을 복원해 주는 역할을 합니다.

#### 브랜치 생성 및 변경

- git checkout -b 브랜치명 : 브랜치를 만들고 변경합니다.
- git switch -c 브랜치명 : 브랜치를 만들고 변경하는 명령어가 추가 되었습니다.

### 4. merge

- git merge 브랜치명 : 현재 브랜치에 다른 브랜치를 merge 합니다.
  - --rebase 옵션이 있습니다.

### 5. Gui

- [sourcetreeapp](https://www.sourcetreeapp.com/)
- [gitkraken](https://www.gitkraken.com/)
- [git-fork](https://git-fork.com/)

### 6. GIT LOG를 예쁘게 보는 방법

- git log --graph --oneline --abbrev-commit --decorate

## 참고

- [새 버전에 맞게 git checkout 대신 switch/restore 사용하기](https://blog.outsider.ne.kr/1505)
