---
title: computer setting
date: 2020-09-09 14:09:03
category: develop
tags: []
draft: true
---

## 와이파이 연결

## Homebrew 설치

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Oh-My-Zsh 설치

```bash
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
```

## iterm2 설치

```bash
brew cask install iterm2
```

### 테마 변경

```zsh
vi ~./zshrc
```

```vim
ZSH_THEME="refined" # 현재 사용 중인 테마
```

### ## zsh-syntax-highlighting ( 명령어에 색 입히기)

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

## chrome 설치

```bash
brew cask install google-chrome1234

```
