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

### multer

- form 태그의 enctype이 multipart/form-data인 경우 body-parser로는 요청 본문을 해석할 수 없습니다.

```javascript
const path = require('path');
const multer = require('multer');
const express = require('express');
const fs = require('fs');

const app = express();

try {
	fs.readirSync('uploads');
} catch (error) {
	cosole.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
	fs.mkdirSync('uploads');
}

const upload = multer({
	storage: multer.diskStorage({
		desination(req, file, done) {
			done(null, 'uploads/');
		},
		filename(req, file, done) {
			const ext = path.extname(file.originalname);
			done(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

app.post('/image', upload.single('image'), (req, res, next) => {
	// 업로드 이미지 정보 표현
	console.log(req.file, req.body);
});

// 업로드 이미지들 정보 표현(하나에 input에 mutiple 속성인 경우)
app.post('/images', upload.array('image'), (req, res, next) => {
	console.log(req.files, req.body);
});

app.post(
	'/',
	// 업로드 이미지들 정보 표현(여러 input에 name이 다른 경우)
	upload.fields([
		{ name: 'image1', limits: 5 },
		{ name: 'image2' },
		{ name: 'image3' },
	]),
	(req, res, next) => {
		console.log(
			req.files,
			image1,
			req.files,
			image2,
			req.files,
			image3,
			req.body
		);
	}
);

// 이미지는 없지만 multipart/form-data인 경우
app.post('/', upload.none(), (req, res, next) => {
	console.log(req.body);
});

app.listen('8080', () => {
	console.log('서버 시작');
});
```

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

## Router 객체로 라우터 분리하기

```javascript
// ./router/index.js
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello Router');
});

module.exports = router;
```

```javascript
const express = require('express');
const indexRouter = require('./router');
const app = express();

app.use('/', indexRouter);

app.listen('8080', () => {
	console.log('서버 시작');
});
```

## 라우트 매개변수

- 와일드카드(req.parmas)
- 쿼리스트링(req.query)

## 라우터 그룹화하기

```javascript
router
	.route('/abe')
	.get((req, res) => {
		res.send('Get /abc');
	})
	.post((req, res) => {
		res.send('Post /abc');
	});
```

## req

- req.app : req 객체를 통해 app에 접근할 수 있습니다. req.app.get('port')와 같은 식으로 사용할 수 있습니다.
- req.body : body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체입니다.
- req.cookies : cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체입니다.
- req.ip : 요청의 ip 주소가 담겨 있습니다.
- req.params : 라우트 매개변수에 대한 정보가 담긴 객체입니다.
- req.query : 쿼리스트링에 대한 정보가 담긴 객체입니다.
- req.signedCookies : 서명된 쿠기들은 req.cookies 대신 여기에 담겨 있습니다.
- req.get(헤더 이름) : 헤더의 값을 가져오고 싶을 때 사용하는 메서드입니다.

## res

- res.app : req.app처럼 res 객체를 통해 app 객체에 접근할 수 있습니다.
- res.cookie(키, 값, 옵션) : 쿠키를 설정하는 메서드입니다.
- res.clearCookie(키, 값, 옵션) : 쿠키를 제거하는 메서드입니다.
- res.end() : 데이터 없이 응답을 보냅니다.
- res.json(JSON) : JSON 형식의 응답을 보냅니다.
- res.redirect(주소) : 리다이렉트할 주소와 함께 응답을 보냅니다.
- res.render(뷰, 데이터) : 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드입니다.
- res.send(데이터) : 데이터와 함께 응답을 보냅ㄴ디ㅏ. 데이터는 문자열일 수도 있고, HTML일 수도 있으며, 버퍼일 수도 있고, 객체나 배열일 수도 있습니다.
- res.sendFile(경로) : 경로에 위치한 파일을 응답합니다.
- res.set(헤더, 값) : 응답의 헤더를 설정합니다.
- res.setHeader(헤더, 값) : 응답의 헤더를 설정합니다.
- res.status(코드) : 응답 시에 HTTP 상태 코드를 지정합니다.
- 응답은 return을 하지 않기 때문에 한번만 사용해야 합니다.
- 메서드 체이닝을 지원합니다.

## 템플릿 엔진

### pug

```pug
//- ./public/index.pug

//- - 대시 뒤에 변수 사용 가능
- const node = 'Node js'

h1= title
p Welcome to #{title}
p= '<strong>이스케이프</strong>'
//- 변수 값을 이스케이프 하지 않을 수도 있습니다(자동 이스케이프)
p!= '<strong>이스케이프</strong>'
button(class=title, type='submit') 전송
input(placeholder=title + '연습')
```

```javascript
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');

app.use('/', (req, res) => {
	res.render('index', { title: 'Express' });
});

app.use('/locals', (req, res) => {
	// res.locals 객체에 넣는 것도 가능(미들웨어간 공유됨)
	res.locals.title = 'Express';
	res.render('index');
});

app.listen('8080', () => {
	console.log('서버 시작');
});
```

### nunjucks

```html
<!--./public/index.html-->

<!-- 변수 사용 가능 -->
{% set node = 'Node.js' %}

<p>{{node}}</p>
<h1>{{title}}</h1>
<p>Welcome to {{title}}</p>
<p>{{'<strong>이스케이프</strong>'}}</p>
<!--변수 값을 이스케이프 하지 않을 수도 있습니다(자동 이스케이프)-->
<p>{{'<strong>이스케이프</strong>' | safe }}</p>
<button class="{{title}}" type="submit">전송</button>
<input placeholder="{{title}} 연습" />
```

```javascript
const path = require('path');
const express = require('express');
const nunjuck = require('nunjuck');

const app = express();

app.set('view engine', 'html');

nunjuck.configure('views', {
	express: app,
	watch: true,
});

app.use('/', (req, res) => {
	res.render('index', { title: 'Express' });
});

app.use('/locals', (req, res) => {
	// res.locals 객체에 넣는 것도 가능(미들웨어간 공유됨)
	res.locals.title = 'Express';
	res.render('index');
});

app.listen('8080', () => {
	console.log('서버 시작');
});
```

## 참고

- [노드교과서 개정판 6장](https://www.youtube.com/watch?v=kXcJ_gbhTRI&t=2923s)
- [노드교과서 개정판 6장 2부](https://www.youtube.com/watch?v=dooxPKPMiKw)

```

```
