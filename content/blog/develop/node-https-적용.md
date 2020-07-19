---
title: node https 적용
date: 2020-04-01 13:04:36
category: develop
draft: false
---

## 사용하게 된 계기

- github education name.com에서 도메인과 ssl 사용하던 중 예기치 않게 서버를 종료 후 ssl을 다시 적용해야 하는데 쉽지 않았습니다.
- 메일 같은걸 보내긴 했는데 되는건지도 잘 모르겠고, 인증서를 다시 보려고 해도 에러만 발생합니다...

## certbot-auto 세팅

```bash
wget https://dl.eff.org/certbot-auto
chmod +x certbot-auto
./certbot-auto certonly --standalone
```

## www 파일 수정

```typescript
if (process.env.NODE_ENV === 'production') {
	const lex = require('greenlock-express').create({
		version: 'draft-11', // 버전2
		configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
		server: 'https://acme-v02.api.letsencrypt.org/directory',
		approveDomains: (
			opts: { domains: string[]; email: string; agreeTos: boolean },
			certs: any,
			cb: any
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
		console.log(`http://localhost:${port}, ${process.env.NODE_ENV}`)
	);
	server.on('error', onError);
}
```

- "greenlock-express": "^2.7.5" 사용
- 3버전은 왜인지 모르겠지만 잘 적용되지 않습니다.
- 4버전은 사용 방법이 다릅니다.

## 실행

- 1024번 포트 이하로 실행 할 때는 sudo 권한이 필요합니다.(sudo su)
  - Error: listen EACCES: permission denied 0.0.0.0:443
- sudo su 이후에는 nvm과 node를 다시 설치해야 했습니다.
- 이 이슈와는 관련 없지만 NODE_ENV는 webpack mode에 따라 변해서 다른 방식으로 넣어주는게 영향이 없었습니다.
