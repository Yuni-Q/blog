---
title: PM2
date: 2020-05-10 09:05:47
category: javascript
tags: ['pm2']
draft: true
---

### 원환한 서버 운영을 위한 패키지

- PM2는 Node.js 프로세스 관리 도구입니다.
- 서버가 에로로 인해 꺼졌을 때 서버를 다시 켜줍니다.
- 멀티 프로세싱을 지원합니다.
  - 자바스크립트는 싱글 스레드로 앱을 실행하지만 PM2는 Node.js의 Cluster 모듈을 사용해서 서버 앱에 복수의 인스턴스가 같은 포트를 사용하게 할 수 있도록 해줍니다. 이를 통해 사용량에 따라 CPU 점유율 늘리고 줄이면서 앱의 안정성을 높일 수 있습니다.
- 요청을 프로세스들에게 고르게 분배합니다.
- 단점은 프로세스 간 서버의 메모리 같은 자원 공유가 불가능합니다. - 극복방법으로 memcached나 redis 같은 메모리 DB를 사용합니다(고융 메모리를 별도 DB에 저장합니다)

## 시작 명령어

- 리눅스나 맥에서 pm2 실행 시 1024번 이하의 포트를 사용하려면 관리자 권한이 필요합니다.

```zsh
npx pm2 start server.js
```

## 재시작 명령어

```zsh
npx pm2 reload server.js
```

## 프로세스 목록 확인 명령어

- 재시작 횟수와 status로 서버의 상태를 확인합니다.

```zsh
npx pm2 list
```

## 멀티 프로세싱 옵션

- 프로세스 수에 원하는 프로세스의 수를 입력합니다.
- 0이면 CPU 코어 개수만큼 생성합니다. -1이면 CPU 코어 개수보다 1개 적게 생성합니다.
  - -1은 하나의 프로새스를 노드 외의 작업 수행을 위해 풀어주는 것입니다.

```zsh
npx pm2 start server.js -i 0
```

### scale up/down

- 프로세스 수를 변경합니다.

```zsh
npx pm2 scale servcer.js 3
```

## 프로세스 정리 명령어

```zsh
npx pm2 stop all
```

## 프로세스 종료 명령어

## 프로세스 종료 명령어

```zsh
npx pm2 delete all
```

```zsh
npx pm2 kill
```

## 프로세스 모니터링 명령어

```zsh
npx pm2 monit
```

## 과거 에러 보기

```zsh
npx pm2 logs --err
```

## PM2 ecosystem 파일 생성

- PM2의 커맨드라인 명령어로 앱 프로세스를 생성하고 관리할 수 있지만 배포를 위해서는 설정 파일을 만들어야 합니다.
- 설정 파일에는 프로세스의 정보와 배포에 필요한 정보가 포함됩니다. 설정 파일은 JSON 형식으로 만들 수도 있고 Node.js 모듈 형식으로 만들 수도 있습니다.

```javascript
module.exports = {
	/**
	 * 앱 설정
	 */
	apps: [
		{
			name: 'app_name',
			script: './server.js', // 앱 실행 스크립트
			instances: 4, // 앱 인스턴스의 수
			exec_mode: 'cluster', // 실행 모드.
			env: {
				// 환경변수. 모든 배포 환경에서 공통으로 사용합니다.
				NODE_ENV: 'production',
			},
			env_staging: {
				// staging 배포 환경에서만 사용할 환경 변수
				API_ROOT: 'http://api.server.name',
			},
		},
	],

	/**
	 * 배포 설정
	 */
	deploy: {
		staging: {
			user: 'root', // 접속할 계정. SSH를 사용해서 서버에 접속할 수 있어야 합니다.
			host: 'appstaging.server.name', // 서버 도메인 또는 IP
			ref: 'origin/develop', // 서버에서 clone할 브랜치
			repo: 'git@github.com:user/reponame.git', // Git 저장소 URL
			ssh_options: 'StrictHostKeyChecking=no', // SSH 접속 옵션.
			path: '/home/www/project_root', // 앱을 설치할 폴더 위치
			// PM2가 배포(git clone)한 후 실행할 명령어
			'post-deploy':
				'npm install && npm run build && pm2 reload ecosystem.config.js',
		},
	},
};
```

### apps

- 앱 설정 영역입니다.

#### name

- 앱의 이름을 할당합니다.

#### script

- 앱을 실행할 수 있는 소스 파일의 경로를 할당합니다.

#### instances

- script로 실행하는 앱이 몇개의 인스턴스를 생성할 것인지를 결정합니다.
- 특히 이 옵션은 exec_mode 옵션이 cluster일때만 의미가 있습니다.

#### exec_mode

- 실행 모드로 fork, cluster를 선택할 수 있다. 이는 PM2가 Node.js 의 cluster API를 사용할지, child_process.fork를 사용할지를 결정합니다.

#### env

- 환경변수. deploy 섹션에서는 여러 개의 배포 환경을 설정할 수 있는데, env에 할당된 값은 모든 환경에서 공통으로 적용됩니다. 특정 환경에서만 사용하려면 env\_이름에 값을 설정해야 하며, 앱을 시작할 때 --env 이름 옵션을 추가해야 합니다.
- 하지만 next.js를 사용햐서 만든 React 서버 렌더링 앱에서는 환경변수를 제대로 사용할 수 없습니다. 서버 렌더링시에는 환경 변수가 제대로 적용되었지만 브라우저에서는 process.env를 참조하지 못하기 때문입니다. 그래서 빌드할 때 환경 변수를 포함할 수 있도록 babel의 inline-dotenv 플러그인을 사용합니다.

### deploy

- 배포 환경과 관련된 설정 영역입니다.
- 배포 환경은 원하는 만큼 만들 수 있습니다.
- PM2는 서버에 접속해서 지정된 위치에 Git 저장소를 복제한 후 사용자가 지정한 명령어를 사용해 앱을 실행하는 방식을 사용합니다. 그래서 서버 접속과 Git 저장소와 관련된 정보가 필요합니다.

#### user

- 서버 접속에 사용할 계정입니다. 접속에는 SSH를 사용합니다.

#### host

- 서버 도메인, 또는 IP에 해당하는 값입니다.

#### ref

- 서버에서 clone할 Git 저장소의 브랜치 이름이다. origin/master 처럼 remote 이름과 브랜치 이름을 함께 입력합니다.

#### repo

- SSH를 사용해서 Git clone을 가능하게 하려면 PM2에서 제시하는 방법을 사용하거나 서버의 SSH 공개 키가 Git 서비스에 등록되어 있어야 합니다. 만약 Github를 사용한다면 https://github.com/settings/keys에서 추가 가능합니다.

#### ssh_options

- SSH 접속에 사용할 옵션입니다.

#### path

- Git 저장소를 clone할 서버상의 경로에 해당합니다. 웹서버에서 설정한 경로로 지정해줍니다.

## Nginx Virtual Host 설정

- 배포를 하기 전에는 웹서버 설정이 필요합니다. 서버로 들어오는 외부 요청을 특정 프로세스에 연결하기 위해서는 리버스 프록시 설정을 해야 합니다.

```
upstream my_nodejs_upstream {
    # 서버 locahost IP와 앱의 포트 번호를 입력합니다.
    server 127.0.0.1:3001;
    keepalive 64;
}

server {
    # 포트번호 없이 접속 가능하도록 80번 사용
    listen 80;
    # 외부에서 접속 가능한 도메인 네임을 입력합니다.
    server_name myapp.yourhost.com;
    # 앞서 언급한 PM2의 ecosystem 파일의 deploy.env_name.path에 해당하는 값입니다
    root /home/www/project_root;

    location / {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_set_header X-NginX-Proxy true;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_max_temp_file_size 0;
      # 앱의 localhost URL을 입력한다.
      proxy_pass http://localhost:3001/;
      proxy_redirect off;
      proxy_read_timeout 240s;
    }
}
```

- 위의 설정은 Nginx의 가상 호스트 설정 블록으로 /etc/nginx/sites-available 폴더에서 생성한 후 sites-enabled 폴더에는 원본 파일에 연결된 symbolic 링크를 생성해둡니다. sites-enabled 폴더에 직접 만들어도 되지만 가상 호스트를 여러개 관리할 때 좋기에 권장되는 방법입니다. 그리고 Nginx의 기본 설정은 sites-enabled 폴더에 있는 파일을 불러오도록 되어 있지만, 다른 사용자에 의해 변경되어 있을 수 있으니 nginx.conf 파일에 include /etc/nginx/sites-enabled/\*; 설정이 있는지 확인해야 합니다.

## PM2 프로세스 관리 명령어

- 앱 재시작에는 restart 대신 reload를 사용하는 편이 좋습니다. 전자는 프로세스를 즉시 종료시키고 재시작하기에 접속이 불가능한 시간이 발생할 수 있습니다. 하지만 후자는 그런 간격이 생기지 않도록 해줍니다. reload 명령어는 앱 프로세스와 관련된 프로세스를 정리한 후 준비된 상태에서 다시 시작하는 gracefulReload에 해당됩니다. 그리고 reload 명령어를 사용할 때 현재 실행중인 프로세스가 없다면 자동으로 start 명령어로 대체합니다.

## 배포

- 앱을 배포할 준비는 모두 되었습니다. 배포를 하기 위해서는 변경 사항을 모두 commit 한 후 원격 저장소에 push한 후에 가능하다. PM2가 기본적으로 해주는 일은 원격 서버에 저장소를 복제해주는 일까지만이며 그 후의 작업은 사용자가 직접 설정해줘야 한다.
- 배포 환경 설정 파일의 deploy 영역에는 환경마다 pre-setup, post-deploy 등 특정 시점에서 실행할 수 있는 명령어를 지정할 수 있습니다. 하지만 가장 중요한 건 PM2에 의한 배포가 끝난 후 실행되는 post-deploy입니다.
- 최초 배포를 하기 전에 배포할 환경의 setup을 실행하고 배포합니다.

## 참고

- [PM2로 Node.js 앱 프로세스 배포하기](https://blog.rhostem.com/posts/2018-05-27-pm2-deploy)
