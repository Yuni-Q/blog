---
title: Terminer Setting
date: 2020-05-25 22:05:88
category: develop
draft: true
---

## zsh

### 버전 확인

```bash
zsh --version
# zsh 5.5.1 (x86_64-apple-darwin17.5.0)
```

### zsh가 없다면 설치

```bash
brew update
brew install zsh
```

### bash를 zsh로 변경

```bash
chsh -s `which zsh`
```

### 재로그인하거나 터미널을 종료하고 재시작한 후 기본 쉘이 zsh인 것을 확인한다.

- 일부 시스템 특히 OS X에서는 /etc/shells 파일에 설치한 쉘을 등록한 후에 재시작해야 합니다.

```bash
echo $SHELL
# /usr/bin/zsh
```

### oh-my-zsh 설치

```bash
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
```

## iTerm2

### iTerm2 에서 다운로드 하거나, Homebrew 를 통해 다운 받는다.

```bash
brew cask install iterm2
```

### 테마 변경 ~./zshrc

```bash
vi ~/.zshrc
```

- 현재 사용 중인 테마 : ZSH_THEME="refined"

### 단축키

- 새로운 탭 : command + t
- 탭 이동 : command + 숫자
- 화면 세로 분할 : command + d
- 화면 가로 분할 : command + shift + d
- 화면 포커스 이동 : command + [ 또는 command + ]
- 현재 포커스 찾기 : command + /
- 현재 화면 종료 : command + w

### 테마

#### Bullet Train

- 내장된 테마가 아니기 때문에 별도의 설치가 필요합니다.
- 커서가 개행된 위치에 있기 때문에 항상 커서 위치가 같습니다.

#### zsh-syntax-highlighting

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-\$HOME}/.zshrc
```
