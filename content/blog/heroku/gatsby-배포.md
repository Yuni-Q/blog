---
title: gatsby 배포
date: 2020-07-27 17:07:81
category: heroku
draft: false
---

- gatsby 배포 시 gatsby develop 옵션은 구동하는데 많이 시간이 필요하기 때문에 적절하지 않습니다.
- gatsby serve 역시 포트 조정이 불가능하여서 마땅치 않습니다.

## 해결책

### 애플리케이션에서 heroku/node.js및 heroku-buildpack-static 빌드 팩을 설정합니다.

```bash
heroku buildpacks:set heroku/nodejs
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git
```

### heroku 플랫폼 API를 app.json 활용하려면 빌드 팩을 선택적으로 추가 할 수 있습니다.

```json
// app.json
{
	"buildpacks": [
		{
			"url": "heroku/nodejs"
		},
		{
			"url": "https://github.com/heroku/heroku-buildpack-static"
		}
	]
}
```

### Heroku는 자동으로 package.json의 build 스크립트를 감지하고 실행합니다.

```json
// package.json
{
	"scripts": {
		"build": "gatsby build"
	}
}
```

## 마지막으로 프로젝트의 루트에 static.json 파일을 추가 하여 정적 자산이 위치 할 디렉토리를 정의합니다.

- heroku-buildpack-static 구성에서 이 파일의 모든 옵션을 확인할 수 있습니다.
- 다음 구성은 Gatsby의 제안 된 캐싱 접근 방식과 일치하는 좋은 시작점을 제공합니다.

```json
// static.json
{
	"root": "public/",
	"headers": {
		"/**": {
			"Cache-Control": "public, max-age=0, must-revalidate"
		},
		"/**.css": {
			"Cache-Control": "public, max-age=31536000, immutable"
		},
		"/**.js": {
			"Cache-Control": "public, max-age=31536000, immutable"
		},
		"/static/**": {
			"Cache-Control": "public, max-age=31536000, immutable"
		},
		"/icons/*.png": {
			"Cache-Control": "public, max-age=31536000, immutable"
		}
	},
	"https_only": true,
	"error_page": "404.html"
}
```

## Git Action

```yml
name: Deploy

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.3.6 # This is the action
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: 'layer-after-layer' #Must be unique in Heroku
          heroku_email: 'carnotcycle2@naver.com'
          dontuseforce: true
```

### HEROKU_API_KEY 얻는법

```bash
heroku auth:token
```

## 참고

- [Deploying to Heroku](https://www.gatsbyjs.org/docs/deploying-to-heroku/)
- [Deploy to Heroku](https://github.com/marketplace/actions/deploy-to-heroku)
- [Heroku CLI Authentication](https://devcenter.heroku.com/articles/authentication)
