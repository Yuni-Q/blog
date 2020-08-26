---
title: express
date: 2020-08-26 23:08:03
category: backend
tags: ['javascript', 'express', 'backend']
draft: true
---

## 기본사항

- res, req가 http를 상속 받은 것이지만 http 것이 아니라 express 것을 쓰는 것이 좋습니다.

## express 변수 설정

```javascript
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	console.log('서버 시작');
});
```

## 404처리 및 에러처리

```javascript
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

// ...

// 에러 발생
app.get(
	'/error',
	(req, res, next) => {
		console.log('미들웨어');
		// 다음 라우터로 이동(next('route')를 사용하면 나머지 미들웨어를 건너띄고 다음 라우터를 실행합니다. 일반적으로 next에 값을 넣으면 error 핸들러 가지만 route는 특별히 작동합니다.)
		next();
	},
	(req, res, next) => {
		try {
			console.log(a); // a is not defined
		} catch (error) {
			// 에러 처리 핸들러로 이동합니다.
			next(error);
		}
	}
);

// 미들웨어지만 마지막에 선언한다면 404처리를 할 수 있습니다.
app.use((req, res, next) => {
	res.status(404).send('404 입니다.');
});

// 에러 처리
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send('에러가 발생했습니다.');
});

app.listen(app.get('port'), () => {
	console.log('서버 시작');
});
```

- 가장 마지막에 처리해야 합니다.
- express는 위에서 부터 읽기 때문에 위에 있으면 아래 부분이 처리되지 않을 수 있습니다.
- 따라서 와일드 카드를 쓸때도 주의가 필요합니다.

```javascript
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 8080);

// 와일드 카드
app.get('/api/:name', (req, res, next) => {
	res.send(`name은 ${req.params.name}`);
});

// 실행 불가
app.get('/api/javascript', (err, req, res, next) => {
	res.send('javascript');
});

app.listen(app.get('port'), () => {
	console.log('서버 시작');
});
```

## 한 라우터에서 여러번 response 전달

```javascript
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 8080);

// 에러 발생!
app.get('/', (req, res, next) => {
	res.send(`name은 ${req.params.name}`);
	res.json({ name: req.params.name });
	// 또는 응답 후 헤드 세팅
	res.writeHead({});
});

app.listen(app.get('port'), () => {
	console.log('서버 시작');
});
```

- 한 라우터에서 두번 이상 response 전달하거나 응답 후에 res.writeHead를 하면 `Cannot set headers after they are sent to the client` 에러가 발생합니다.

## 미들웨어들

- 미들웨어의 순서는 성능에 영향을 미칠 수 있습니다. 필요하지 않은 동작을 하기 전에 값을 리턴할수 있습니다.
- 미들웨어 사이의 데이터 전송은 req 안에 `req.data = 'yuni-q'`와 같이 사용합니다.

```javascript
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(margan('dev'));
// 정적 파일 제공
app.use('/', express.static(__dirname, 'public'));
app.use(cookieParser(''));
app.use(express.json());
app.use(express.urlecoded({ extended: true }));

app.use(
	session({
		resave: false,
		saveUnintialized: false,
		secert: 'yuni-q',
		cookie: {
			httpOnly: true,
		},
		name: 'connet.sid', // 기본값으로 들어가 있습니다.
	})
);

app.use();
app.listen(app.get('port'), () => {
	console.log('서버 시작');
});
```

### morgan

- 요청과 응답을 기록합니다.
- dev, combined 옵션이 있습니다. combined는 ip, 시간, 요청, 응답, 브라우저 등 자세한 정보를 얻을 수 있습니다.

### cookie-parser

- req.cookies에 파싱해서 값을 넣어줍니다.
- 쿠키값 세팅을 쉽게 도와줍니다.

```javascript
req.cookies; // cookie 값을 가져옵니다.
// cookie 세팅
req.cookie('name', encodeURICompoenet(name), {
	expires: new Data(),
	httpOnly: true,
	path: '/',
});
// 쿠키 삭제
req.clearCookie('name', encodeURICompoenet(name), {
	expires: new Data(),
	httpOnly: true,
	path: '/',
});
```

- 셔명을 넣으면 signedCookies를 사용합니다.

```javascript
app.use(cookieParser('yuniq'));

app.get('/', (req, res, next) => {
	res.signedCookies;
});
```

### body-parser

- body-parser를 예전에는 썻지만 지금은 express 안에 속해 있습니다.

```javascript
// express에 들어간 것
// json 데이터를 파싱해서 req.body 안에 넣습니다.
app.use(express.json());
// formData을 파싱해서 req.body 안에 넣습니다. 이미지는 처리하지 못해서 multer를 사용합니다.
app.use(express.urlecoded({ extended: true }));

// express에 들어가지 못한 것
app.use(bodyParser.raw());
app.use(bodyParser.text());
```

### session

- 개인의 저장 공간을 만들어 줍니다.

## 미들웨어 확장법

```javascript
app.use('/', (req, res, next) => {
	if (true) {
		express.static(__dirname, 'public')(req, res, next);
	} else {
		next();
	}
});
```

## 참고

- [노드교과서 개정판 6장](https://www.youtube.com/watch?v=kXcJ_gbhTRI&t=2923s)
