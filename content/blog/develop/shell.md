---
title: shell
date: 2020-10-02 15:10:22
category: develop
tags: []
draft: true
---

## date

- date라는 프로그램을 호출하면, 현재 날짜와 시간을 출력합니다.

```zsh
date # 2020년 10월  2일 금요일 15시 43분 14초 KST
```

## echo

- echo 프로그램은 단순하게 인자를 출력합니다.

```zsh
echo hello # hello
```

## 쉘 이동하기

- 셸의 경로는 구분 문자로 구분돼있습니다. Linux 및 macOS는 /로, Windows에서는 \로 구분합니다. Linux와 macOS에서는 /가 파일 시스템의 ‘루트(root)’지만, Windows는 각 디스크 파티션에 대한 루트가 있습니다.(예: C:\) 이 수업 및 대부분의 수업들은 여러분들이 Linux 파일 시스템을 사용한다고 가정하고 진행합니다. /로 시작하는 경로들은 절대(absolute) 경로라고 부릅니다. 다른 경로들은 상대(relative) 경로라고 부릅니다. 상대 경로는 최근 작업 디렉토리에 상대적입니다. 최근 작업 디렉토리는 pwd로 볼 수 있고, cd로 디렉토리를 이동할 수 있습니다. 경로 표시에서 .는 현재 디렉토리를, ..는 상위 디렉토리(parent directory)를 뜻합니다.

## ls

- 주어진 디렉토리에 어떤 것들이 있는지 보기 위해서는 ls명령을 사용합니다.
- 첫째, 줄의 시작 부분에 있는 d는 디렉토리임을 나타냅니다. 그런 다음 세 개의 문자 (rwx)의 세 그룹이 따라옵니다. 이들은 파일 소유자, 소유 그룹 (users), 다른 모든 사람들이 관련 항목에 대해 각각 권한을 가지고 있는지를 나타냅니다. -는 그 자리의 권한이 없다는 것을 나타냅니다. 위의 경우 소유자만 디렉토리 (즉, 파일 추가 / 제거)를 수정(w) 할 수 있습니다. 디렉토리를 입력하려면 사용자가 해당 디렉토리 (및 부모)에 대한 “검색”( “execute”의 약자인 x로 표현 됨) 권한을 가져야합니다. 콘텐츠를 나열하려면 사용자가 디렉토리에 대한 읽기(r) 권한이 있어야 합니다. 파일의 경우도 마찬가지입니다./bin의 거의 모든 파일에는 마지막 그룹인 “다른 모든 사람”에 대한 x 권한 세트가 있어 모든 사람이 해당 프로그램을 실행할 수 있습니다.

### 옵션

- -l : use a long listing format

## mv

- mv(이름 변경, 파일 이동)

## cp

- cp(파일 복사)

## mkdir

- mkdir(새 경로 만들기)

## man

- 어떤 프로그램의 인자, 입력, 출력 또는 일반적으로 어떻게 작동하는지에 대한 더 많은 정보를 원한다면 man(manual의 약자) 프로그램을 실행해보세요. 그것은 하나의 인자로 프로그램 이름을 사용하고 해당 프로그램의 매뉴얼 페이지를 보여줍니다. q를 누르면 종료합니다.

## 참고

- [여러분의 CS 교육에서 누락된 학기](https://missing-semester-kr.github.io/?utm_source=gaerae.com&utm_campaign=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%8A%A4%EB%9F%BD%EB%8B%A4&utm_medium=social&fbclid=IwAR1LMYMBWvELC5xGMj_nr8EQyEpKcBNB-O7TnW1BcCp3z3kNBw9W0c42A4A)