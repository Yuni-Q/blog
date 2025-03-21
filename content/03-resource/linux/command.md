---
title: command
date: 2021-02-08 01:02:97
category: linux
tags: []
draft: true
---

## Part 1 : 기초 명령어, 셸

### 1-1. 터미널 화면 clear (or scroll up)

- a) clear
- b) \<Ctrl-L>

### 1-2. bash 로그아웃

- a) exit, logout
- b) \<Ctrl-D>

### 1-3. vim에서 문서 저장하고 종료하는 명령

- a) :wq
- b) :x
- c) ZZ

### 1-4. shell script를 읽어오는 명령 (subshell 실행이 아님)

- a) . ~/module.sh
- b) source ~/module.sh

### 1-5. bash 쉘에서 수식 계산하는 명령어

- a) expr
- b) $(...)
- c) let

### 1-6. 일회성으로 죽지않고 백그라운드로 작동할 명령어

- a) nohup
- b) systemd-run

## Part 2 : 네트워크

### 2-1. 네트워크 상태를 확인하는 명령어

- a) netstat
- b) ss

### 2-2. 네트워크 인터페이스 및 라우팅, 설정 관련 명령어

- a) ifconfig, route
- b) ip
- c) nmcli

### 2-3. 패킷 캡처 명령어

- a) tcpdump
- b) wireshark, tshark

### 2-4. 네임 서비스 질의 명령어

- a) nslookup
- b) dig

## Part 3 : 서버 애드민

### 3-1. 레드햇 계열 패키지 설치 명령어

- a) 패키지가 뭔가요? 설치라면 무조건 make; make install로 해결한다.
- b) rpm
- c) yum
- d) dnf

### 3-2. 데비안 계열 패키지 설치 명령어

- a) 패키지가 뭔가요? 설치라면 무조건 make; make install로 해결한다.
- b) dpkg
- c) apt-get, apt-cache
- d) aptitude
- d) apt

### 3-3. PID 1번 (ancestor process)

- a) init
- b) systemd

### 3-4. 스케줄러

- a) at, cron
- b) anacron
- c) systemd.timer

### 3-5. 서비스 제어 명령어

- a) service, update...\*
- b) systemctl

### 3-6. 커널 설정 변경하기

- a) sysctl
- b) tuned-adm

### 3-7. 부트 파라메터 설정

- a) 직접 편집하기
- b) grubby

### 3-8. stat계열 명령어

- a) vmstat, iostat ...
- b) dstat

## Part 4 : 디스크 관리

## 4-1. 파티션 편집, 관리 명령어

- a) fdisk
- b) cfdisk, sfdisk
- c) parted

## 4-2. 마운트/언마운트 명령어

- a) mount
- b) udisksctl

## 4-3. 마운트, 파일 시스템, 블록 장치 조회 명령어

- a) mount, fdisk -l
- b) lsblk, blkid, findfs
- c) findmnt

## 참고

- [리눅스 아재력 or 할배력 셀프 테스트](https://sunyzero.tistory.com/245)
