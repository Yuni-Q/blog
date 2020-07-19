---
title: 413 Request Entity Too Large
date: 2020-02-13 01:02:27
category: backend
draft: false
---

- 이미지를 업로드 하는 경우에 로컬에서는 문제가 없었으나 호스팅한 서버에서는 `413 Request Entity Too Large`를 반환했습니다.
- 413 Request Entity Too Large는 nginx에서 업로드한 파일의 용량이 제한 수치를 넘겨서 발생 했습니다.
  - 로컬에선 nginx를 사용하지 않고 호스팅 된 서버에서는 80포트를 8080포트로 옮겨주기 위해 사용했습니다.

## 해결 방안

- nginx 서버 업로드 크기(사이즈)를 설정합니다.
- 설정되지 않은 경우 1M가 넘는 경우 에러가 발생합니다.

```bash
vi /etc/nginx/nginx.conf
```

```vi
http {
  # Set client upload size - 100Mbyte
  client_max_body_size 100M;
}
```

```bash
sudo service nginx restart
```
