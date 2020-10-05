---
title: react-native
date: 2020-10-03 12:10:24
category: javascript
tags: []
draft: true
---

## expo 환경 설정

### Homebrew 설치

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Node 설치

```zsh
brew install node
# node 버전 확인
node -v
# npm 버전 확인
npm -v
```

### expo-cli 설치

```zsh
npm install -g expo-cli
```

### 프로젝트 생성

```zsh
expo init app
```

### 안드로이드 스튜디오 설치

```zsh
brew cask install android-studio
```

#### 가상 디바이스 생성

- 플레이스토어 마크가 있는 것으로 권장합니다.
- Configure -> AVD Manager

### xcode 설치

```zsh
mas search Xcode
mas install 497799835
```

## react-native 환경 설정

### Homebrew 설치

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Node 설치

```zsh
brew install node
# node 버전 확인
node -v
# npm 버전 확인
npm -v
```

## Watchman 설치

```zsh
brew install watchman
```

### xcode 설치

```zsh
mas search Xcode
mas install 497799835
```

## CocoaPods

```zsh
sudo gem install cocoapods
```

## Java Development Kit

```zsh
brew cask install adoptopenjdk/openjdk/adoptopenjdk8
```

### 안드로이드 스튜디오 설치

```zsh
brew cask install android-studio
```

### install the Android SDK

- Android 9 (Pie)

## zsh 설정

- ~/.zshrc에 추가

```vim
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
