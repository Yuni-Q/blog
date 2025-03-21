---
title: SSL
date: 2021-01-22 15:01:39
category: develop
tags: ['node', 'https', 'certbot-auto', 'mkcert']
draft: true
---

## certbot-auto

### certbot-auto 사용하게 된 계기

- github education name.com에서 도메인과 ssl 사용하던 중 예기치 않게 서버를 종료 후 ssl을 다시 적용해야 하는데 쉽지 않았습니다.
- 메일 같은걸 보내긴 했는데 되는건지도 잘 모르겠고, 인증서를 다시 보려고 해도 에러만 발생합니다...

### nginx 설치

```bash
sudo apt-get install nginx
```

### certbot-auto 세팅

```bash
# certbot-auto 설치
wget https://dl.eff.org/certbot-auto
# certbot-auto 권한 추가
chmod +x certbot-auto
./certbot-auto certonly --standalone
```

### bin/www.ts 파일 수정

```typescript
if (process.env.NODE_ENV === 'production') {
  const lex = require('greenlock-express').create({
    version: 'draft-11', // 버전2
    configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    approveDomains: (
      opts: { domains: string[]; email: string; agreeTos: boolean },
      certs: any,
      cb: any,
    ) => {
      if (certs) {
        opts.domains = ['moti.company', 'www.moti.company'];
      } else {
        opts.email = 'lyh6425@gamil.com';
        opts.agreeTos = true;
      }
      cb(null, { options: opts, certs });
    },
    renewWithin: 81 * 24 * 60 * 60 * 1000,
    renewBy: 80 * 24 * 60 * 60 * 1000,
  });
  https
    .createServer(lex.httpsOptions, lex.middleware(app))
    .listen(process.env.SSL_PORT || 443);
  http
    .createServer(lex.middleware(require('redirect-https')()))
    .listen(process.env.PORT || 80);
} else {
  const server = http.createServer(app);
  server.listen(process.env.PORT || port, () =>
    console.log(`http://localhost:${port}, ${process.env.NODE_ENV}`),
  );
  server.on('error', onError);
}
```

- "greenlock-express": "^2.7.5" 사용
- 3버전은 왜인지 모르겠지만 잘 적용되지 않습니다.
- 4버전은 사용 방법이 다릅니다.

### 실행

- 1024번 포트 이하로 실행 할 때는 sudo 권한이 필요합니다.(sudo su)
  - Error: listen EACCES: permission denied 0.0.0.0:443
- sudo su 이후에는 nvm과 node를 다시 설치해야 했습니다.
- 이 이슈와는 관련 없지만 NODE_ENV는 webpack mode에 따라 변해서 다른 방식으로 넣어주는게 영향이 없었습니다.

## greenlock-express의 안정성 문제로 nginx를 이용

### nginx 설치

```bash
sudo apt-get install nginx
```

### certbot-auto 설치

```bash
wget https://dl.eff.org/certbot-auto
```

### certbot-auto 권한 추가

```bash
chmod a+x certbot-auto
```

### nginx 설정 추가

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

### nginx 실행

```bash
sudo systemctl start nginx
# 에러 발생 시 다음 명령어를 통해 상태를 확인합니다.
# sudo systemctl status nginx
sudo lsof -i tcp:80 # 올바로 실행 되었는지 확인합니다.
```

### certbot-auto 실행

```bash
./certbot-auto
```

### certbot-auto 갱신

- certbot-auto는 90일이기 때문에 갱신이 필요합니다.

```bash
./certbot-auto renew
```

- crontab을 활용해서 자동화 할 수 있습니다.

## certbot-auto의 문제로 snap과 nginx로 변경

```bash
sudo snap install certbot --classic
sudo apt-get install nginx
sudo service nginx start
sudo certbot --nginx
```

- 이메일과 2가지 정보에 동의 후 도메인을 입력하면 검증 과정을 거친 후 완료 됩니다.

### nginx 설정

- /etc/nginx/nginx.conf를 proxy_pass 기능을 추가합니다.
  - 설정파일에 sites-enabled/\*를 include하는 설정이 있다면 sites-enabled안에 들어있는 파일 수정합니다.

```zsh
server {
  location / {
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
		proxy_set_header X-NginX-Proxy true;
    proxy_pass http://127.0.0.1:8000;
    proxy_redirect off;
  }
}
```

### nginx 재실행

```zsh
sudo service nginx restart
```

### 자동갱신

- /etc/cron.d/certbot 파일을 다음과 같이 수정합니다. 파일이 없다면 생성합니다(vim으로)

```zsh
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
0 */12 * * * root certbot -q renew --nginx --renew-hook 'service nginx reload'
```

## 로컬 개발 환경에서 HTTPS 적용 가이드

- mkcert(https://github.com/FiloSottile/mkcert) 사용

```bash
brew install mkcert
mkcert -install
mkcert local.yuniq.com "*.yuniq.com" localhost ::3
```

```javascript
const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

const options = {
  key: fs.readFileSync('./local.yuniq.com+3-key.pem', 'utf-8'),
  cert: fs.readFileSync('./local.yuniq.com+3.pem', 'utf-8'),
};

https
  .createServer(options, app)
  .listen(8000, () => console.log('App listening on port 8000!'));
```

## 참고

- [제로초 유투브](https://www.youtube.com/channel/UCp-vBtwvBmDiGqjvLjChaJw)
- [nginx와 let's encrypt로 SSL 적용하기(+자동 갱신)](https://www.zerocho.com/category/NodeJS/post/5ef450a5701d8a001f84baeb)
