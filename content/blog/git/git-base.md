---
title: git base
date: 2020-08-04 10:08:13
category: git
draft: true
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

### git 트릭

#### 자동 수정

```zsh
git config --global help.autocorrect 1
```

#### 커밋 카운트

```zsh
git rev-list-count master
```

#### push/pull이 잦은 저장소 최적화

```zsh
git gc -prune=now -aggressive
```

#### 추적하지 않는 파일 백업

```zsh
git ls-files --others --exclude-standard -z | xargs -O tar rvf ~/backup-untracked.zip
```

#### 다른 브랜치에 있는 파일 보기

```zsh
git show main:README.md
```

#### git에서 검색

```zsh
git rev-list -all | xargs git grep -F 'font-size: 52px'
```

### Branch의 변경사항 파악

- Branch A와 B가 있고 B는 Branch A에 merge 되는 구조일때, Branch B가 Branch A로부터 나온 지점을 merge-base를 통해 찾을 수 있습니다.

```zsh
git merge-base --fork-point A B
```

- Branch B는 diff 범위를 merge-base를 통해 얻을 수 있습니다.

```zsh
git diff $(git merge-base --fork-point A)
```

- A의 마지막 커밋이 B에 있는지를 확인합니다(=B는 A로 리베이스 되어 있는지 확인 합니다)

```zsh
hash1=$(git show-ref --heads -s A)
hash2=$(git merge-base A B)
[ "${hash1}" = "${hash2}" ] && echo "OK" || echo "Rebase is required"
```

### git remote 저장소에서 지워진 브랜치를 로컬에 반영

```zsh
git fetch --prune
git pull --prune
```

- --prune 옵션을 사용하면 됩니다.

```zsh
git config --global fetch.prune true
```

- 글로벌하게 지정해 놓으면 fetch나 pull 할 때 사용하지 않아도 됩니다.

### master로 rebase하지 않은 경우 배포 실패하게 하기

```zsh
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

### rebase 전에는 현재 브랜치 pull을 받자

```json
{
	"husky": {
		"hooks": {
			"pre-rebase": "branch=$(git branch --show-current) && git pull https://github.com/Yuni-Q/aaa.git ${branch}"
		}
	}
}
```

## git에서 파일 이름 대소문자만 변경하기

```zsh
# user.ts 파일을 User.ts 파일로 변경하는 예

$ git mv user.ts User.ts
```

## 혼자서도 깃을 잘 쓰는 방법
- 브랜치는 한 가지 유용한 일만 해야합니다.
- 모든 커밋은 독립적이어야 합니다. 
  - 커밋마다 독립적인 테스트를 포함해야 합니다.
  - 커밋마다 모든 테스트를 통과해야 합니다.
- 드래프트 커밋도 문제 없습니다.
- 커밋을 완전히 버려도 좋습니다.
- 실수를 방어하는 도구들
  - git commit --amend
  - git commit --fixup [hash]
  > fixup 은 squash 와 동일하게 해당 커밋을 이전 커밋과 합치는 명령어지만, 커밋 메시지는 합치지 않는다. 결과적으로 이전 커밋 메시지만 남게 된다. 그 점만 빼면 완벽히 앞의 예제와 동일하므로 예제는 생략하도록 하겠다.
  - git rebase --interactive main
  - git stash
  - git blame
  > 해당 파일의 수정 이력을 볼 수 있습니다. 커밋해시값, 수정한 사람, 수정 이력이 남겨진 시간, 커밋 메세지를 확인할 수 있습니다.


---
## 참고

- [새 버전에 맞게 git checkout 대신 switch/restore 사용하기](https://blog.outsider.ne.kr/1505)
- [[Git]현재 Branch의 변경사항 파악하기 - merge-base](http://minsone.github.io/git/git-merge-base)
- [Git is my buddy: Effective Git as a solo developer](https://mikkel.ca/blog/git-is-my-buddy-effective-solo-developer/)