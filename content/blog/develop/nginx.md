---
title: nginx
date: 2021-02-23 00:02:08
category: develop
tags: []
draft: true
---

## nginx

## 사용 이유

- 로드밸런싱 : 유저의 요청을 웹 애플리케이션 서버(WAS)로 분산 할 수 있습니다.
- 유저 요청에 대한 선 처리 : 유저의 요청이 WAS에 도달하기 전에 다양한 처리를 할 수 있습니다. 웹 애플리케이션 방화벽(WAF)를 설치하거나, 유저의 요청을 다른 위치로 보내도록 제어 할 수 있습니다.
- 캐싱 : 웹 서비스는 이미지, CSS, 자바스크립트 같은 정적인 페이지를 가지고 있습니다. 이런 정적 컨텐츠들을 nginx에서 대신 처리하는 것으로 응답 속도를 높일 수 있으며, WAS에 대한 부담을 줄일 수 있습니다. 컨텐츠들을 메모리에 캐시할 경우 서비스 할 경우 고성능의 웹 서비스를 만들 수도 있습니다.

## 설치

```bash
sudo apt-get install nginx
# sudo yum install nginx
nginx -v
sudo systemctl start nginx
```

## netstat 명령어를 통한 네트워크 상태 확인 방법

```zsh
# netstat [옵션] [| grep 포트 번호 or 서비스 명]
netstat -ntlp
```

- l(listen) : 연결 가능한 상태
- n(number port) : 포트 넘버
- t(tcp) : tcp
- u(udp) : udp
- p: 프로그램 이름 / PID
- a: 모두
- i: 이더넷 카드별 정상/에러/드랍 송수신 패킷 수 확인
- r: 라우팅 테이블
- s: 네트워크 통계

## ngix.conf

- ngix.conf는 nginx 메인 설정 파일 입니다.

```bash
sudo vi /etc/nginx/nginx.conf
```

## sites-available

- nginx에서 관리되는 호스팅 정보입니다.
- 다른 의미로 site-available에 존재하는 사이트는 비활성화 된 사이트라고도 표현합니다.

```bash
vi /etc/nginx/sites-available/default
```

- nginx의 라우팅설정 파일이 항상 default 하나인 건 아닙니다. 누군가는 사이트별로 파일을 나누고 다른 이름으로 지을 수도 있습니다. site-available 폴더내에 라우팅 설정파일을 여러개 마련해둘 수 있습니다.

## site-enabled

- 해당 라우팅설정을 활성화하려면 그 아래에있는 /etc/nginx/sites-enabled 안에도 해당파일들의 심볼링 링크파일을 만들어야 합니다.
  - sites-enabled 폴더내용물을 살펴보면 sites-available 폴더에 있는 default 파일로 향하는 심볼릭링크파일(바로가기)이 있는 걸 알 수 있습니다.
- sites-enabled에 파일이 없으면 라우팅 설정이 활성화 되지 않습니다. 다시말해서 nginx는 site-enabled에 있는 라우팅 설정파일을 읽어들여 동작할 뿐이니 sites-available에 설정 파일들을 미리 작성만 해놨다가 sites-enabled에 바로가기(심볼릭 링크) 파일을 만들어서 활성화 시키는 것입니다.

### site-enabled 사이트 활성화

```zsh
ln -s /etc/nginx/sites-available/server1 /etc/nginx/sites-enable/server1
nginx -t # 해당 명령어로 에러가 있는지 test
nginx -s reload
```

## server 설정

```zsh
server {
  listen: 80;
  listen [::]:80;

  root /home/server1;
  server_name server1 www.server1.com

  access_log /var/log/nginx/server1.access.log;
  error_log /var/log/nginx/server1.error.log;

  location /server1/ {
    # proxy_params
    include /etc/nginx/proxy_params;
    proxy_pass http://127.0.0.1:3000/;
  }

  location /server2/ {
    # proxy_params
    include /etc/nginx/proxy_params;
    proxy_pass http://127.0.0.1:4000/;
  }

  location / {
    root /static/;
    # try_files $uri $uri =404;
  }
}
```

- listen은 해당 호스트가 대기할 포트번호입니다.
- access_log와 error_log는 해당 호스트에 대한 로그기록을 남깁니다.
- location은 2가지 형태로 사용할 수 있는데 리버스 프록시를 통해 트래픽을 넘겨주는 역할로 쓰일 수 있습니다.

### proxy_params

- 요청이 nginx에 의해 다시 전달되기 때문에 헤더값이 다시 만들어지는데 이를 방지하기 위해 헤더를 일부 재조정합니다.
- 필요한 헤더값은 proxy_prams에 정의되어 있습니다.
- 헤더를 설정하지 않으면 해당 트래픽을 받는 서버는 누가 요청했는지 알 수 없습니다.
- proxy_set_header XXX : 실제 요청 데이터를 header의 각 항목에 할당합니다.

```zsh
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwar ded-Proto $scheme;
```

### server_name 설정

```zsh
server {
  root /var/www/html/첫번째사이트_루트폴더;
  server_name 첫번째_사이트_도메인;
}

server {
  root /var/www/html/두번째사이트_루트폴더;
  server_name 두번째_사이트_도메인;
}
```

- server_name으로 들어온 것만 연결해 줍니다.
- 모든 것을 주소를 수용하려면 <b>server_name ~^.\*$</b>을 사용합니다.

## block directive

### events

- events 블록은 네트워크 동작을 어떻게 처리할지에 대한 정보를 가지고 있습니다.
- worker_connections : 하나의 워커가 요청을 받을 수 있는 클라이언트 수

### http

- server, location을 하위블록으로 가짐
- gzip, ssl등 설정 가능합니다.

### server

- 상위 블록으로 http를 가집니다.
- 하위 블록으로 location을 가집니다.
- 가상 호스팅 개념입니다. 가상 호스트란 하나의 호스트에서 마치 여러 호스트가 동작하는 것처럼 보입니다. url, port 등으로 다수 컴퓨터처럼 동작이 가능합니다.

### location

- 상위블록으로 http, server를 갖비니다.
- 요청된 url에 대해 처리하는 방법을 서술합니다.
- root, try_files, proxy_pass등 설정 가능합니다.

## upstream을 이용하면 분산처리를 할 수 있습니다.

## NGiNX 설정파일로 www 도메인 리다이렉팅하기

```vim
################## HTTP www.
server {
    listen 80;
    listen [::]:80;
    server_name :q.swiftcoding.org;
    location / {
        return 301 http://swiftcoding.org$request_uri;       ### http://swiftcoding.org 로 리다이렉팅
    }
}
```

## [NGINX] 정적 파일 연결

```vim
server {
  # 파일 경로 설정:q
  # /public 경로로 접속하면 /www/public에 있는 파일을 자동으로 연결
  location /public/ {
    root /www;
  }

  # 특정 파일 상태 코드 리턴
  location /favicon.ico {
    return 404;
  }

  # 특정 확장자
  # mp3와 mp4 파일 연결
  location ~ \.(mp3|mp4) {
    root /www/media;
  }
}
```

## 로드 밸런싱

### 라운드 로빈(Round Robin)

```
http {
  upstream app {
    server 10.0.0.1:3000;
    server 10.0.0.2:3000;
  }
  server {
    listen 80;
    location / {
      proxy_pass http://app;
    }
  }
}
```

### 최소 접속(Least connected)

```
upstream app {
  least_conn;
  server 10.0.0.1:3000;
  server 10.0.0.2:3000;
}
```

### IP 해싱(IP hashing)

```
upstream app {
  ip_hash;
  server 10.0.0.1:3000;
  server 10.0.0.2:3000;
}
```

### 가중치

```
upstream app {
  server 10.0.0.1:3000 weight=5;
  server 10.0.0.2:3000;
}
```

## NGINX 상태 점검

### 패시브 상태 점검

- 오류가 반환되는 경우, NGINX는 노드에 결함이 있다고 표시하고, 로드 밸런싱을 도입하기 전 일정 시간 동안 로드 밸런싱 대상에서 해당 노드를 제거합니다. 이 전력을 이용해 NGINX는 계속해서 노드를 제거하기 때문에 실패 횟수가 대폭 감소됩니다.
- 이 때 max_fails나 fail_timeout 처럼, 필요한 실패 횟수나 요청의 타임아웃을 설정함으로써 노드가 유효하지 않음을 표시하는 파라미터도 몇 가지 구성할 수 있습니다.

### 액티브 상태 점검

```
http {
  upstream app {
    zone app test;
    server 10.0.0.1:3000;
    server 10.0.0.2:3000;
  }
  server {
    listen 80;
    location / {
      proxy_pass http://app;
      health_check;
    }
  }
}
```

- health_check : 액티브 상태 점검을 활성화합니다. 기본 구성은 5초마다 호스트와 upstream 구문에 지정된 포트에 대해 접속을 실행합니다.
- zone app test : 상태 점검을 활성화할 때 NGINX 구성이 필요합니다.

## nginx 서버 업로드 크기 지정

- nginx 서버 업로드 크기(사이즈)를 설정합니다.
- 설정되지 않은 경우 1M가 넘는 경우 에러가 발생합니다.

```vi
http {
  # Set client upload size - 100Mbyte
  client_max_body_size 100M;
}
```

---

## 참조

- [nginx 웹서버 라우팅 설정하기 – 도메인 IP 연결, www 리다이렉팅](https://swiftcoding.org/nginx-routing)`
- [netstat 명령어를 통한 네트워크 상태 확인 방법|작성자 엔클라우드24](http://blog.naver.com/PostView.nhn?blogId=ncloud24&logNo=221388026417&parentCategoryNo=&categoryNo=79&viewDate=&isShowPopularPosts=false&from=postView)
- [[nginx] nginx 시작하기 1/2 - 기초편](https://blog.naver.com/pjt3591oo/222242046633)
