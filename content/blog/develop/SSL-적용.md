---
title: SSL 적용
date: 2020-07-10 12:07:90
category: develop
draft: true
---

## nginx 설치

```bash
sudo apt-get install nginx
```

## certbot-auto 설치

```bash
wget https://dl.eff.org/certbot-auto
```

## certbot-auto 권한 추가

```bash
chmod a+x certbot-auto
```

## nginx 설정 추가

```bash
vim /etc/nginx/nginx.conf
```

- include 아래에 다음을 추가합니다.

```vim
server {
  server_name yuni-q.com;
  listen 80;
  location / {
    proxy_set_header HOST $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_pass http://127.0.0.1:3065;
    proxy_redirect: off;
  }
}
```

- server_name에 와일드카드(\*)를 사용할 경우 DNS를 사용해야 한다고 합니다.

## nginx 실행

```bash
sudo systemctl start nginx
# 에러 발생 시 다음 명령어를 통해 상태를 확인합니다.
# sudo systemctl status nginx
sudo lsof -i tcp:80 # 올바로 실행 되었는지 확인합니다.
```

## certbot-auto 실행

```bash
./certbot-auto
```

## certbot-auto 갱신

- certbot-auto는 90일이기 때문에 갱신이 필요합니다.

```bash
./certbot-auto renew
```

- crontab을 활용해서 자동화 할 수 있습니다.

## 참고

- [제로초 유투브](https://www.youtube.com/channel/UCp-vBtwvBmDiGqjvLjChaJw)
