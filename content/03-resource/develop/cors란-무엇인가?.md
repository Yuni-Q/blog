---
title: cors란 무엇인가?
date: 2021-06-03 14:06:47
category: develop
tags: ['cors']
draft: true
---

## 우선 SOP(Same Origin Policy)에 대해 알아 보겠습니다.

- 다른 출처의 리소스를 사용하는 것에 제한하는 보안 방식입니다.

## 그럼 이제 본격적으로 CORS에 대해 알아보겠습니다.

- CORS란 Cross Origin Resource Sharing의 약자로, 현재 도메인과 다른 도메인으로 리소스가 요청될 경우를 말합니다.
  - 추가 HTTP 헤더를 사용하여, 한 출처에서 실행중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제입니다.

## CORS의 접근제어 시나리오에는 3가지가 있습니다.

- 단순 요청(Simple Request)
- 프리플라이트 요청(Preflight Request)
- 인증정보 포함 요청(Credentialed Request)

## Preflight부터 살펴보겠습니다.

- OPTIONS 메서드를 통해 다른 도메인의 리소스에 요청이 가능한 지 확인합니다. 그 후 요청이 가능하다면 실제 요청(Actual Request)를 보냅니다.

### Preflight Request와 Response에 대해 알아 보겠습니다.

#### Preflight Request

- Origin : 요청출처
- Access-Control-Request-Method : 실제 요청의 메서드
- Access-Control-Request-Headers : 실제 요청의 추가 헤더

#### Preflight Response : 응답 코드는 200대여야 합니다. 응답 바디는 비어있는 것이 좋습니다.

- Access-Control-Allow-Origin : 서버 측 허가 출처
- Access-Control-Allow-Method : 서버 측 허가 메서드
- Access-Control-Allow-Headers : 서버 측 허가 헤더
- Access-Control-Max-Age : Preflight 응답 캐시 시간

### 다음으로 Simple Request에 대해 알아보겠습니다.

- Preflight 요청 없이 바로 요청을 보냅ㄴ디ㅏ.
- 다음 조건을 만족해야 합니다.
  - Method : GET, POST, HEAD 만 허용됩니다.
  - Content-Type : application/x-www-form-urlencoded, multipart/form-data, text/plain 만 허용됩니다.
  - HEADER : Accept, Accept-Language, Content-Language, Content-Type 만 허용됩니다.

### 여기서 잠깐 Preflight가 필요한 이유는 무엇일까요?

- CORS를 모르는 서버를 위해서 입니다. 이를 하지 않을 경우 프론트에서만 발생하는 CORS 에러는 서버 입장에서 무의미 할 수 있습니다.(이미 데이터 처리는 끝이난 상황)

### 마지막으로 Credentialed Request에 대해 알아보겠습니다.

- 인증 관련 헤더를 포함할 때 사용하는 요청입니다.
- 클라이언트측 `credentials : include`
- 서버측 `Access-Control-Allow-Credentials : true`(Access-Control-Allow-Origin : \*은 안 됩니다.)

## 프론트 입장에서 CORS 해결하는 방법에 대해 알아보겠습니다.

### 프론트 프록시 서버 설정(개발 환경)

- FRONT SERVER를 통해서 서버에 요청합니다.
  - 프론트를 호스팅하고 있는 서버는 주소와 포트가 모두 동일하기 때문에 CORS 문제가 발생하지 않습니다.
  - 프론트 서버의 경우 브라우저가 아니기 때문에 CORS 에러가 발생하지 않습니다.

## 서버를 이용해서 해결하는 방법에 대해 알아 보겠습니다.

### Express에서 CORS 허용하기 1

```javascript
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
```

### Express에서 CORS 허용하기 2

```javascript
var express = require('express');
var cors = require('cors');
var app = express();

// CORS 설정
app.use(cors());

app.get('/products/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80');
});
```

## 로컬에서 CORS policy 관련 에러가 발생하는 이유

- \<script type=module> 은 로컬에서 실행시 자바스크립트 모듈 보안 요구로 인해 CORS 에러가 발생합니다.
- 로컬시스템에서 로컬 파일 리소스를 요청할 때는 origin(출처)이 null로 넘어가기 때문에 CORS에러가 발생합니다.
