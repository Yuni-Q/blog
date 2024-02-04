---
title: CORS
date: 2020-09-03 22:09:76
category: javascript
tags: ['CORS', 'javascript']
draft: true
---

## 동일 출처 정책(Same-Origin Policy)

- 웹 애플리케이션 보안 모델에서 중요한 개념 중 하나가 동일 출처 정책(Same-Origin Policy)입니다.
- 이 정책에 의해서 자바스크립트로 다른 웹페이지에 접근할 때는 같은 출처의 페이지만 접근이 가능합니다. 같은 출저라는 것은 `프로토콜, 호스트, 포트`가 같다는 것읠 의미합니다. 즉, 쉽게 말하면 웹페이지의 스크립트는 그 페이지의 같은 서버에 있는 주소만 ajax 요청을 할 수 있다는 것입니다.
- 이 정책이 초기에는 웹 사이트의 보안을 위한 좋은 방법으로 생각되었으나 요즘은 여러 도메인에 걸쳐서 구성되는 대규모 웹 프로젝트가 늘어나고, REST API 등을 이용한 외부 호출이 많아지는 상황에서는 거추장스러운 기술이 되기도 하고 있습니다. 그래서 만들어진 추가 정책이 CORS(Cross-Origin Resources Sharing)입니다. 이 정책의 특징은 서버에서 외부 요청을 허용할 경우 ajax 요청이 가능해지는 방식입니다. CORS에 대해서 설명하기 전에 서버의 도움 없이 동일 출처 정책(same-origin policy)을 회파하여 외부 서버로 요청을 날릴 수 있는 방법을 알아보겠습니다.

### 1. 웹 브라우저 실행 시 외부 요청을 허용하는 옵션을 사용

- same origin policy는 결국 클라이언트인 웹 브라우저가 요청을 해도 되는지 판단해서 결정하는 것으로 이 과정만 무시한다면 어디든 요청을 못할 이유는 없습니다. 크롬 같은 웹 브라우저들은 실행 시 커맨드 라인 옵션을 통해서 외부 도메인 요청 가능 여부를 확인하는 동작을 무시하게 할 수 있습니다.
  - 크롬의 경우 --disable-web-security 옵션을 추가하여 크롬을 실행합니다.

### 2. 외부 요청을 가능하게 해주는 플러그인 설치

- 서버에서 받은 요청의 응답에 특정 header(Access-Control-Allow-Origin: \*)만 추가하면 웹 브라우저가 요청이 가능한 사이트로 인식해서 요청이 가능합니다. 크롬의 경우 웹스토어에 요청을 가로채서 응답에 위 header르 추가해주는 플러그인이 있습니다. 웹스토어에서 cors로 검색하면 확장 프로그램 검색 결과에서 찾을 수 있습니다.

### 3. JSONP방식으로 요청

- 웹 브라우저에서 css나 js 같은 리소스 파일들은 동일 출처 정책에 영향을 받지 않고 로딩이 가능합니다. 이런 점을 응용해서 외부 서버에서 읽어온 js 파일을 json으로 바꿔주는 일종의 편법적인 방법입니다. 단점은 리소스 파일을 GET 메서드로 읽어오기 때문에 GET 방식의 API만 요청이 가능합니다.

## CORS (Cross-Origin Resource Sharing)

- 웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 스펙입니다. 서버와 클라이언트가 정해진 해더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식으로 교차 출처 자원 공유(cross-origin resource sharing)라는 이름으로 표준화가 되었습니다.
- 교차 출처 자원 공유 방식은 요청을 받은 웹서버가 허용할 경우에는 다른 도메인의 웹 페이지 스크립트에서도 자원을 주고받을 수 있게 해줍니다.

### preflight request(사전 요청)

- 요청하려는 URL이 외부 도메인일 경우 웹 브라우저는 preflight 요청을 먼저 날리게 됩니다.
- preflight 요청은 실제로 요청하려는 경로와 같은 URL에 대해 OPTIONS 메서드로 요청을 미리 날려보고 요청을 할 수 있는 권한이 있는지 확인합니다.
- CORS 요청을 편법 없이 하기 위해서는 클라이언트의 처리만으로는 안되고 해당 서버 측에서의 추가 처리 사항이 필요합니다.

## 서버에서 CORS (Cross-Origin Resource Sharing) 요청 핸들링하기

- 서버로 날아온 preflight 요청을 처리하여 웹 브라우저에서 실제 요청을 날릴 수 있도록 해줍니다.

### 모든 외부 도메인에서 모든 요청을 허용할 경우 처리

- 가장 쉬운 방법으로 모든 요청을 허용하는 방식입니다.
- preflight 요청을 받기 위해 OPTIONS 메서드의 요청을 받아서 컨트롤 해야 합니다.
- 모든 요청의 응답에 아래 header를 추가합니다.

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
Access-Control-Max-Age: 3600
Access-Control-Allow-Headers: Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Autorization
```

- 웹 브라우저의 스크립트 엔진에서 preflight 요청 응답으로 Access-Control-Origin header에 "\*" 값이 있으면 모든 도메인에서의 요청을 허용하는 것으로 판단합니다. ajax 요청이 실패하면서 발생하는 메시지는 바로 preflight 요청을 날린 응답 메시지에 Access-Control-Allow-Origin 헤더가 없어서 요청이 허용되지 않는다는 뜻입니다.

### 외부 도메인 요청을 선별적으로 허용할 경우

- 먼저 cros 스팩과 관련된 header의 규칙을 확인합니다.

#### Request headers(클라이언트의 요청 해더)

- Origin : 요청을 보내는 페이지의 출처(도메인)
- Access-Control-Request-Method : 실제 요청하려는 메서드
- Access-Control-Request-Headers : 실제 요청에 포함되어 있는 해더 이름

#### Response headers(서버에서의 응답 해더)

- Access-Control-Allow-Origin : 요청을 허용하는 출처입니다. \*이면 모든 곳에 공개되어 있음을 의미합니다.
- Access-Control-Allow-Credentials : 클라이언트 요청이 쿸키를 통해서 자격 증명을 해야 하는 경우에 true, true를 응답받은 클라이언트는 실제 요청 시 서버에서 정의된 규격의 인증값이 담긴 쿠키를 같이 보내야 합니다.
- Access-Control-Expose-Headers : 클라이언트 요청에 포함되어도 되는 사용자 정의 해더
- Access-Control-Max-Age : 클라이언트에서 preflight의 요청 결과를 저장할 기간을 지정합니다. 클라이언트에서 preflight 요청의 결과를 저장하고 있을 시간입니다. 해당 시간 동안은 preflight 요청을 다시 하지 않게 됩니다.
- Access-Control-Allow-Method : 요청을 허용하는 메서드입니다. 기본값은 GET,POST라고 보면 됩니다. 이 해더가 없으면 GET과 POST 요청만 가능합니다. 만약 이 해더가 지정이 되어 있으면, 클라이언트에서는 해더 값에 해당하는 메서드일 경우에만 실제 요청을 시도하게 됩니다.
- Access-Control-Allow-Headers : 요청을 허용하는 해더입니다.

### server side

- 이 정책을 회피하기 위한 다양한 방법이 있으므로 서버가 이 스펙을 지원한다고 해서 다른 보안정책을 마련하지 않으면 안 됩니다. 일반적인 웹 브라우저에서 스크립트에 의한 Ajax 요청만 적용을 받을 수 있다고 생각해야 할 것입니다. 그럼에도 불구하고 불특정 다수의 외부 클라이언트에서 요청을 받을 수 있는 open API 같은 것을 개발 중이라면 클라이언트가 각종 편법들을 동원해서 서버에 접근하지 않아도 되도록 CORS 요청을 핸들링해줄 필요가 있습니다.

### client side

- 외부 서버로 ajax 요청이 안될 경우 아래와 같은 단계로 처리를 생각해 볼 수 있습니다.
  - 개발자가 테스트 혹은 개발단계에서 쉽게 요청하기 : 웹 브라우저 실행 옵션이나 플러그인을 통한 동일 출처 정책 회피합니다.
  - CORS 구현이 안되어 있는 서버로 ajax 요청을 해야 하지만 서버 쪽 컨트롤이 불가능할 경우 : jsonp 방식으로 요청합니다.
  - Ajax 요청을 해야 하는 다른 도메인의 서버를 클라이언트와 같이 개발하거나 서버 개발 쪽 수정 요청이 가능한 경우 : 서버에서 CORS 요청이 허용되도록 구현합니다.

## 참고

- [javascript ajax 크로스도메인 요청-CORS](https://brunch.co.kr/@adrenalinee31/1)

## Nest에서 CORS 대응

```ts
// 정규식 주소 허용
app.enableCors({
  origin: [/\.yuni\.com$/],
  methods: 'GET,PUT,POST,PATCH,DELETE,HEAD,OPTIONS',
  credentials: true,
  preflightContinue: true,
});

app.use('*', function (req: Request, res: Response, next: NextFunction) {
  // Access-Control-Allow-Origin의 주소가 *가 아니게 적용
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  // OPTIONS 메소드 대응
  req.method === 'OPTIONS' ? res.sendStatus(200) : next();
});
```
