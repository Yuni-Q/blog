---
title: computer setting
date: 2020-09-09 14:09:03
category: develop
tags: []
draft: true
---

## 와이파이 연결

## 마우스

- 속도 및 보조 클릭

## iCloud 연동

- 메일 세팅

## TouchID 등록

## Dock 설정

## 배터리 퍼센트 표시 및 날짜 표시 변경

## 트랙패드 설정

- 탭하여 클릭하기

## 편의 기능

- 포인터 제어기 - 트랙패드 옵션 - 드래그 활성화 - 세 손가락으로 드래그 하기

## Homebrew 설치

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## chrome 설치

```zsh
brew cask install google-chrome
```

### 로그인 해서 북마크 가져오기


## iterm2 설치

```zsh
brew cask install iterm2
```

### Theme

- Preferences > Appearance > Theme > Minimal

### Status Bar

- Preferences > Profile > Session > Status Bar
- Battery Level, CPU Utilization, Memory Utilization, Network Throughput

### color

- [https://iterm2colorschemes.com/](https://iterm2colorschemes.com/)
- 다운로드 후 확장자(txt) 제거 후 실행
- Preferences > Profile > Colors > Load Presets

## Oh-My-Zsh 설치

```zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### powerlevel10k

```zsh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

#### 테마 변경

```zsh
vi ~/.zshrc
```

```zsh
ZSH_THEME="powerlevel10k/powerlevel10k" # 현재 사용 중인 테마
# 테마를 재설정하고 싶을 때 사용하는 명령어
p10k configure
```

### vscode font setting

- terminal > integrated: Font Family > MesloLGS NF

### zsh-syntax-highlighting (명령어에 색 입히기)

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

## visual-studio-code 설치

```zsh
brew cask install visual-studio-code
```

## nvm 설치

```zsh
brew install nvm
nvm ls-remote # 설치 가능한 모든 node.js 버전
nvm install v12
nvm install v16
nvm use v12
```

## gh 설치

```zsh
brew install gh
gh auth login
```

## rosetta 설치(M1인 경우)

```zsh
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

## intellij-idea 설치

```zsh
brew cask install intellij-idea
```

## slack 설치

```zsh
brew cask install slack
```

## mysql 설치

```zsh
brew install mysql
brew services start mysql
brew install mysql-client
brew cask install mysqlworkbench
```

## brew install redis 설치

```zsh
brew install redis
brew services start redis
```

## spectacle 설치

```zsh
brew cask install spectacle
```

## clipy 설치

```zsh
brew cask install clipy
```

## bitbar 설치

```zsh
brew cask install bitbar
```

- 플러그인 폴더 설정 후 파일 세팅
- github-contribution.10m.rb 파일 생성 후 작성

```rb
#!/usr/bin/env ruby
# frozen_string_literal: true
# <bitbar.title>Github Contribution</bitbar.title>
# <bitbar.version>v0.0.1</bitbar.version>
# <bitbar.author>mizoR</bitbar.author>
# <bitbar.author.github>mizoR</bitbar.author.github>
# <bitbar.image>https://user-images.githubusercontent.com/1257116/34550684-37da7286-f156-11e7-9299-5873b6bb2fd7.png</bitbar.image>
# <bitbar.dependencies>ruby</bitbar.dependencies>
#
# To setup, create or edit your ~/.bitbarrc file with a new section:
#
# [github_contribution]
# username = mizoR
# max_contributions = 10
require 'erb'
require 'date'
require 'open-uri'
module BitBar
class INIFile
Error = Class.new(StandardError)
INIFileNotFound = Class.new(Error)
SectionNotFound = Class.new(Error)
def self.load(file = "#{ENV['HOME']}/.bitbarrc")
raise INIFileNotFound if !File.exist?(file)
parse(open(file) { |f| f.read })
end
def self.parse(source)
# XXX: This implementation isn't correct, but will work in most cases.
# (Probably `StringScanner` will make code correct and clean.)
sections = {}
section = nil
source.each_line do |line|
if line =~ /^ *;/
# comment
next
end
if line =~ /^\[(.+)\]$/
section = sections[$1.to_sym] = {}
next
end
if line =~ /(.+)=(.+)/
name = $1.strip.to_sym
value = $2.strip
section[name] = value[/^"(.*)"$/, 1] || value[/^'(.*)'$/, 1] || value
next
end
end
new(sections: sections)
end
def initialize(sections:)
@sections = sections
end
def fetch(name)
@sections.fetch(name.to_sym)
rescue KeyError
raise SectionNotFound
end
end
module GitHubContribution
ConfigurationError = Class.new(StandardError)
class Contribution < Struct.new(:username, :contributed_on, :count)
RE_CONTRIBUTION = %r|<rect class="day" .+ data-count="(\d+)" data-date="(\d\d\d\d-\d\d-\d\d)"/>|
def self.find_all_by(username:)
[].tap do |contributions|
html = open(url_for(username: username)) { |f| f.read }
html.scan(RE_CONTRIBUTION) do |count, date|
contributions << Contribution.new(username, Date.parse(date), count.to_i)
end
end
end
def color
count <= 0 ? 'brown' : 'green'
end
def icon
case count
when 0 then ':fire:'
when 1..3 then ':seedling:'
when 4..9 then ':herb:'
else ':deciduous_tree:'
end
end
def self.url_for(username:)
"https://github.com/users/#{username}/contributions"
end
end
class View
TEMPLATE = <<-EOT.gsub(/^ */, '')
<%= @contribution.icon %><%= @contribution.count %> | color=<%= @contribution.color %>
---
<% @contributions.each do |c| -%>
<%= @helper.link_to(@helper.contribution_text_for(c), @helper.contribution_activity_for(c)) %>
<% end -%>
EOT
class Helper
def link_to(text, href)
if text =~ / | /
"#{text} href=#{href}"
else
"#{text} | href=#{href}"
end
end
def contribution_text_for(contribution)
"#{contribution.icon} #{contribution.contributed_on.strftime('%Y-%m-%d (%a)')} \t#{contribution.count} | color=#{contribution.color}"
end
def contribution_activity_for(contribution)
query = "from=#{contribution.contributed_on}"
fragment = "year-link-#{contribution.contributed_on.year}"
"https://github.com/#{contribution.username}?#{query}##{fragment}"
end
end
def initialize(contributions:)
@contribution = contributions.fetch(0)
@contributions = contributions
@helper = Helper.new
end
def render
puts ERB.new(TEMPLATE, nil, '-').result(binding)
end
end
class App
DEFAULT_CONFIG = { max_contributions: 10 }
def initialize(config = {})
config = cast_config(DEFAULT_CONFIG.merge(config))
@username, @max_contributions = config.values_at(:username, :max_contributions)
end
def run
contributions = Contribution.find_all_by(username: @username)
.sort_by(&:contributed_on)
.reverse
.slice(0, @max_contributions)
View.new(contributions: contributions).render
end
private
def cast_config(config)
username = config[:username].to_s
max_contributions = config[:max_contributions].to_i
if username.empty?
raise ConfigurationError, 'GitHub username is not given.'
end
if !max_contributions.positive?
raise ConfigurationError,
"Max contributions should be positive integer, but it was #{max_contributions}"
end
{ username: username, max_contributions: max_contributions }
end
end
end
end
if __FILE__ == $0
begin
config = BitBar::INIFile.load.fetch(:github_contribution)
BitBar::GitHubContribution::App.new(config).run
rescue BitBar::INIFile::Error
puts <<-EOM.gsub(/^ */, '')
⚠️
---
To setup, create or edit your ~/.bitbarrc file with a new section:
|
;# ~/.bitbarrc
[github_contribution]
username = <GITHUB_USERNAME>
max_contributions = 10
EOM
rescue BitBar::GitHubContribution::ConfigurationError => e
puts <<-EOM.gsub(/^ */, '')
⚠️
---
#{e.message}
EOM
end
end
```

- ~/.bitbarrc 파일을 생성하고 하단의 내용을 입력해줍니다

```vim
# ~/.bitbarrc
[github_contribution]
username = GITHUB_ID_HERE
max_contributions = 10
```

## App Store 로그인

## mas 설치

```zsh
brew install mas
```

## RunCat 설치

```zsh
mas search RunCat
mas install 1429033973
```

## Xcode 설치

```zsh
mas search Xcode
mas install 497799835
```

## KakaoTalk 설치

```zsh
mas search KakaoTalk
mas install 869223134
```

## gitmoji

```zsh
brew install gitmoji
```

## LINE 설치

```zsh
mas search line
mas install 539883307
```

## WeatherBug - Weather Forecasts and Alerts 설치

```zsh
mas search weatherbug
mas install 1059074180
```

## itsycal 설치

```zsh
brew cask install itsycal
```

## Alfred 설치

```
mas search alfred
mas install 405843582
```

## Amphetamine 설치

```
mas search Amphetamine
mas install 937984704
```

## git 설정

```zsh
git config --global --edit
```

## ssh 설정

```zsh
ssh-keygen
cat ~/.ssh/id_rsa.pub
```

## BrewFile 사용

```vim
# BrewFile
brew "git"
brew "mas"
cask "docker"
cask "google-chrome"
cask "visual-studio-code"
mas "KakaoTalk", id: 869223134
```

## Brewfile 생성

```zsh
brew bundle dump

cat BrewFile => 확인
```

### BrewFile 실행

```zsh
brew bundle
```
