---
title: github education name.com 사용하기
date: 2020-03-22 22:03:06
category: develop
draft: true
---

- 도메인 구입
- DNS 세팅
  - type : A
  - answer : {본인 IP}
- SSL 적용
  - CSR 생성

```bash
mkdir ~/www.moti.company.ssl/
cd ~/www.moti.company.ssl/

openssl genrsa -out ~/www.moti.company.ssl/www.moti.company.key 2048

openssl req -new -sha256 -key ~/www.moti.company.ssl/www.moti.company.key -out ~/www.moti.company.ssl/www.moti.company.csr
```

> 이메일과 전화번호는 name.com 사이트와 일치하게 작성합니다.  
> 도메인과 파일 이름을 같게 세팅 합니다.

- 인증서 설치

  - 아래의 정보를 바탕으로 인증서 받기

  ```bash
    cat ~/www.moti.company.ssl/www.moti.company.csr
  ```

  - 인증서 정보를 바탕으로 cert.pem 생성

  ```bash
    sudo vi ~/www.moti.company.ssl/cert.pem
  ```

  - Nginx 세팅

  ```bash
    cd /etc/nginx/
    sudo vi nginx.conf
  ```

  ```bash
    server {
      listen       443 ssl http2 default_server;
      listen       [::]:443 ssl http2 default_server;
      server_name  _;
      root         /usr/share/nginx/html;

      ssl_certificate /home/ec2-user/www.moti.company.ssl/cert.pem;
      ssl_certificate_key /home/ec2-user/www.moti.company.ssl/www.moti.company.key;

      # ssl_session_cache shared:SSL:1m;

      ssl_session_timeout  10m;

      # ssl_ciphers PROFILE=SYSTEM;

      ssl_prefer_server_ciphers on;

      # Load configuration files for the default server block.
      include /etc/nginx/default.d/*.conf;

      location / {
        proxy_pass http://127.0.0.1:8080;
      }

      error_page 404 /404.html;
        location = /40x.html {
      }

      error_page 500 502 503 504 /50x.html;
        location = /50x.html {
      }
    }
  ```

  > ssl_session_cache shared:SSL:1m와 ssl_ciphers PROFILE=SYSTEM는 openssl 버전에 따라서 되지 않을 수도 있습니다. 제가 작업한 버전에선 동작하지 않았습니다.

  ```bash
  sudo systemctl restart nginx
  ```
