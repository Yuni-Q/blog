---
title: jwt
date: 2020-11-20 09:11:60
category: develop
tags: []
draft: true
---

## JWT란?

- JSON Web Token(JWT)은 웹표준(RFC 7519)으로서 두 개체(클라이언트와 서비스, 서비스와 서비스 사이)에서 JSON 객체를 사용하여 가볍고 자가수용적인(self-contained) 방식으로 정보를 안전성 있게 전달해 주는 것입니다.
- 많은 프로그래밍 언어에서 지원됩니다.
  - C, Java, Python, C++, R, C#, PHP, JavaScript, Ruby, Go, Swift 등 대부분의 주류 프로그래밍 언어에서 지원 (수많은 회사의 인프라스트럭쳐에서 사용 되고 있습니다(Facebook, LinkedIn, Instagram, GitHub, Google 등)
- 자가 수용적(self-contained)입니다.
  - 필요한 모든 정보를 자체적으로 지니고 있습니다. JWT 시스템에서 발급된 토큰은, 토큰에 대한 기본정보, 전달 할 정보 그리고 토큰이 검증됐다는것을 증명해주는 signature 를 포함하고 있습니다.
  - 토큰 안에 사용자를 식별하기 위한 정보를 담고 있습니다. 즉, 토큰만 해독하면 사용자를 식별할 수 있습니다.
- 전달이 쉽습니다.
  - JWT는 자가수용적이므로, 두 개체(클라이언트와 서비스, 서비스와 서비스 사이) 사이에서 손쉽게 전달 될 수 있습니다. 웹서버의 경우 HTTP의 헤더에 넣어서 전달 할 수도 있고, URL 의 파라미터로 전달 할 수도 있습니다.
- 토큰만 다룹니다. 도메인 사용자를 그대로 사용하고, 도메인 사용자와 토큰간의 맵핑 테이블을 이용합니다(주로 속도가 빠른 키-값 저장소 이용)
- 네트워크 구간에서 변조가 불가능합니다. 변조되면 토큰은 무효화됩니다.
- 네트워크 구간에서 탈취 당해도 유효 기간(ttl) 또는 리프레시 가능 기간(refresh_ttl)이 지나면 무효화됩니다.
- 캡티브 API, 소형 API 서비스에 어울립니다.
- 생성했다는 사실을 증명할 수 있습니다(서명)
- JSON타입으로 변수 정보를 저장할 수 있습니다.
- 서버에서 쿼리하지 않아도 사용자를 로컬에서 검증할 수 있기 때문에 API 호출의 횟수를 줄일 수 있습니다.

## 사용처

- 회원 인증 : 서버측에서는 유저의 세션을 유지 할 필요가 없습니다. 즉 유저가 로그인되어있는지 안되어있는지 신경 쓸 필요가 없고, 유저가 요청을 했을때 토큰만 확인하면 되니, 세션 관리가 필요 없어서 서버 자원을 많이 아낄 수 있습니다.
- 정보 교류: JWT는 두 개체(클라이언트와 서비스, 서비스와 서비스 사이) 사이에서 안정성있게 정보를 교환하기에 좋은 방법입니다. 그 이유는, 정보가 sign(서명)이 되어있기 때문에 정보를 보낸이가 바뀌진 않았는지, 또 정보가 도중에 조작되지는 않았는지 검증할 수 있습니다.

## 구조와 생성

```
HEADER.PAYLOAD.SIGNATURE
```

- 헤더(Header), 페이로드(Payload), 서명(Signature) 세 부분을 점(.)으로 구분하는 구조입니다.
- 점을 구분자로 해서 헤더, 페이로드, 서명을 합치면 JWT가 완성됩니다.

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IktleSBJRCJ9.eyJpYXQiOjE1ODYzNjQzMjcsImlzcyI6ImppbmhvLn
NoaW4ifQ.eyJhbGciOiJFUzI1NiIsImtpZCI6IktleSBJRC9.eyJpYXQiOjE1ODYzNjQzMjcsImlzcyI6Imp
pbmhvLnNoaW4ifQ.MEQCIBSOVBBsCeZ_8vHulOvspJVFU3GADhyCHyzMiBFVyS3qAiB7Tm_ME
Xi2kLusOBpanIrcs2NVq24uuVDgH71M_fIQGg
```

- 이렇게 완성된 JWT는 헤더의 alg, kid 속성과 공개 키를 이용해 검증할 수 있습니다.
- 서명 검증이 성공하면 JWT의 모든 내용을 신뢰할 수 있게되고, 페이로드의 값으로 접근 제어나 원하는 처리를 할 수 있게 됩니다.

### Header

- JWT를 검증하는데 필요한 정보를 가진 JSON 객체는 Base64 URL-Safe 인코딩된 문자열입니다.
- 헤더(Header)는 JWT를 어떻게 검증(Verify)하는가에 대한 내용을 담고 있습니다.
  - alg는 서명 시 사용하는 알고리즘이고, kid는 서명 시 사용하는 키(Public/Private Key)를 식별하는 값입니다.

```json
{
	"alg": "ES256",
	"kid": "Key ID"
}
```

- 위와 같은 JSON 객체를 문자열로 직렬화하고 UTF-8과 Base64 URL-Safe로 인코딩하면 다음과 같이 헤더를 생성할 수 있습니다.

```
Base64URLSafe(UTF-8('{"alg": "ES256","kid": "Key ID"}')) -> eyJhbGciOiJFUzI1NiIsImtpZCI6IktleSBJRCJ9
```

### Payload

- Payload 부분에는 토큰에 담을 정보가 들어있습니다.
- 페이로드(Payload)에 있는 속성들을 클레임 셋(Claim Set)이라 부릅니다.
  - 여기에 담는 정보의 한 '조각' 을 클레임(claim)이라고 부르고, 이는 name / value 의 한 쌍으로 이뤄져있습니다.
  - 클레임 셋은 JWT에 대한 내용(토큰 생성자(클라이언트)의 정보, 생성 일시 등)이나 클라이언트와 서버 간 주고 받기로 한 값들로 구성됩니다.
- 토큰에는 여러개의 클레임 들을 넣을 수 있습니다.
- 클레임 의 종류는 다음과 같이 크게 세 분류로 나뉘어져있습니다. 모든 값이 필수 값은 아니지만 기본값이 정해져있습니다. 선택적으로 이용하면 됩니다.
  - 등록된(registered) 클레임
  - 공개(public) 클레임
  - 비공개(private) 클레임

#### 등록된(registered) 클레임

- iss: 토큰 발급자 (issuer)
- sub: 토큰 제목 (subject)
- aud: 토큰 대상자 (audience)
- exp: 토큰의 만료시간 (expiraton), 시간은 NumericDate 형식으로 되어있어야 하며(예: 1480849147370) 언제나 현재 시간보다 이후로 설정되어 있어야합니다.
- nbf: Not Before를 의미하며, 토큰의 활성 날짜와 비슷한 개념입니다. 여기에도 NumericDate 형식으로 날짜를 지정하며, 이 날짜가 지나기 전까지는 토큰이 처리되지 않습니다.
- iat: 토큰이 발급된 시간(issued at), 이 값을 사용하여 토큰의 age 가 얼마나 되었는지 판단 할 수 있습니다.
- jti: JWT의 고유 식별자로서, 주로 중복적인 처리를 방지하기 위하여 사용됩니다. 일회용 토큰에 사용하면 유용합니다.

#### 공개(public) 클레임

- 공개 클레임들은 소유권을 주장을 정의하기 위해 사용하는 name space 부분의 제어 이름 입니다.
- 충돌이 방지된 (collision-resistant) 이름을 가지고 있어야 합니다. 충돌을 방지하기 위해서는, 클레임 이름을 URI 형식으로 짓습니다.

```
{
"https://yuni-q.com/jwt_claims/is_admin": true
}
```

#### 비공개(private) 클레임

- 등록된 클레임도아니고, 공개된 클레임들도 아닙니다. 양 측간에 (보통 클라이언트 <->서버) 협의하에 사용되는 클레임 이름들입니다. 공개 클레임과는 달리 이름이 중복되어 충돌이 될 수 있으니 사용할 때에 유의해야합니다.
- 보통 라이브러리를 사용하면 비공개 클레임만 작성하면 된다.

```
{
  "username": "yuni-q"
}
```

```
{
"iss": "yuni-q.com",
"exp": "1485270000000",
"https://yuni-q.com/jwt_claims/is_admin": true,
"userId": "11028373727102",
"username": "yuni-q"
}
```

- 위 예제 payload 는 2개의 등록된 클레임, 1개의 공개 클레임, 2개의 비공개 클레임으로 이뤄져있습니다.

### Signature

- JSON Web Token 의 마지막 부분은 바로 서명(signature) 입니다.
- 점(.)을 구분자로 해서 헤더와 페이로드를 합친 문자열을 서명한 값입니다.
- 서명은 헤더의 alg에 정의된 알고리즘과 비밀 키를 이용해 성성하고 Base64 URL-Safe로 인코딩합니다.
- 서명 부분을 만드는 슈도코드(pseudocode)의 구조는 다음과 같습니다.

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

```
Base64URLSafe(Sign('ES256', '${PRIVATE_KEY}',
'eyJhbGciOiJFUzI1NiIsImtpZCI6IktleSBJRCJ9.eyJpYXQiOjE1ODYzNjQzMjcsImlzcyI6ImppbmhvLnNoaW4ifQ'))) ->
MEQCIBSOVBBsCeZ_8vHulOvspJVFU3GADhyCHyzMiBFVyS3qAiB7Tm_MEXi2kLusOBpanIrcs2NVq24uuVDgH71M_fIQGg
```

## JWT, JWS, JWE, JWK, JWA...?

- JWT는 URL, Cookie, Header와 같이 사용할 수 있는 문자가 제한된 환경에서 정보를 주고받을 수 있게 하는 데이터 표현 형식(Format)입니다.
- 그런데 실제 우리가 JWT를 이용한 서명(Sign)이나 암호화(Encryption)에 대한 명세는 JWT 하위 JWS(JSON Web Signature)와 JWE(JSON Web Encryption)에 되어있습니다. 이해하기 쉽게 설명하자면 JWT는 추상화 클래스라(Abstract Class) 할 수 있고, JWS와 JWE는 추상화 클래스를 마저 구현한 콘크리트 클래스(Concrete Class)라고 할 수 있습니다.
- 그밖에 JWK(JSON Web Key)는 JSON 형식으로 암호화 키를 표현한 것이고, JWA(JSON Web Algorithm)은 JWS, JWE, JWK에 사용하는 알고리즘에 대한 명세입니다.

### JWS & Compact Serialization

- 우리가 일반적으로 사용하는 대부분의 JWT는 JWS 입니다. JWS로 돌아와서, 앞서 JWT의 구조라고 설명한 Header.Payload.Signature 구조는 JWS의 직렬화 방법 중 하나인 Compact Serialization 형식으로 직렬화한 것입니다. 정리하자면 우리가 일반적으로 사용하는 JWT는 JWS를 사용하고 JWS Compact Serialization으로 직렬화한 문자열입니다.
- JWE는 데이터를 암호화하는 것인데, 우리는 일반적으로 통신 시 구간 암호화가 필요하면 TLS(Transport Layer Security)를 사용하고 있기 때문에 JWE를 사용해 데이터를 암호화할 필요가 없습니다.

### Base64 URL-Safe != Base64

- Base64 URL-Safe 인코딩은 기본 Base64 인코딩에서 '+'(plus)는 '-'(minus)로, '/'(slash)는 '\_'(underscore)로 대체된 인코딩 방법입니다. 이로 인해서 JWT는 설계 의도대로 URL, Cookie, Header 등 어디에서도 사용될 수 있는 넓은 범용성을 가지게 되었습니다.

### Header & Payload

- JWT의 헤더는 Base64 인코딩 전 항상 UTF-8로 인코딩된 문자열이어야 합니다. 이유는 헤더가 꼭 JSON이어야 하고, JSON의 기본 인코딩은 UTF-8이기 때문입니다. 정식 명칭은 JOSE(JSON Object Signing and Encryption) Header 입니다.
- 페이로드는 JSON이 아니어도 괜찮은가라는 의문을 가지게 되는데 페이로드는 일반적으로 JSON을 사용하는 것뿐이지 꼭 JSON이어야 될 이유는 없습니다. 따라서 페이로드는 헤더와 다르게 Base64 URL-Safe 인코딩만 합니다.

### 자체 포함(Self-Contained) & 무상태(Stateless)

- JWT는 JWT 자체에 필요한 모든 정보를 담을 수 있습니다.
- 헤더는 토큰에 대한 해석 방법을, 페이로드는 토큰의 내용, 전달할 내용(사용자 정보, 권한, 서비스에 필요한 데이터)을 자유롭게 담을 수 있으며, 서명으로 헤더와 페이로드가 위 변조 되지 않았다는 것을 검증할 수 있습니다.
- 서버는 JWT 생성 시 JWT에 검증이나 권한 인가 시 필요한 값을 넣으면 되기 때문에 JWT에 대한 상태를 따로 관리하고 있지 않아도 됩니다.

### 공개 키 암호 방식에서 서명(Signature)과 암호화(Encryption)

- JWT에서는 기본적으로 공개 키 암호 방식(PKC, Public Key Cryptography)을 사용합니다. 비대칭 암호 방식을 이용해 공개 키와 비밀 키를 생성하고 이 키를 상황에 따라 나누어 가지며 통신 시 사용합니다.
- 서명은 데이터의 해싱 값을 비밀 키로 서명하고 다시 공개 키로 서명을 검증(Verify)하는데, 서명은 비밀 키를 가진 곳에서만 할 수 있고 공개 키를 가진 어느 곳에서나 이 데이터의 서명을 검증할 수 있습니다.
- 반대로 암호화는 공개 키로 데이터를 암호화(Encrypt)하고 비밀 키로 데이터를 복호화(Decrypt) 합니다. 공개 키를 가진 누구나 데이터를 암호화해서 데이터를 보낼 수 있지만 비밀 키를 가진 곳에서만 데이터를 복호화 해 내용을 확인할 수 있습니다. 여기서 확인할 수 있는 점은 공개 키 암호 방식은 비밀 키로 암호화한 데이터를 공개 키로 복호화 할 수 있고, 반대로 공개키로 암호화 한 데이터는 비밀 키로 복호화할 수 있다는 점입니다. 당연히 비밀 키로 암호화한 것을 비밀 키로 풀거나 공개 키로 암호화한 것을 공개 키로 풀 수 없습니다.
  - 서명: 비밀 키를 가진 극소수(주로 한명)만 데이터에 서명할 수 있습니다. 공개 키를 가진 아무나 데이터의 서명을 검증할 수 있습니다.
  - 암호화: 공개 키를 가진 아무나 데이터를 암호화할 수 있습니다. 비밀 키를 가진 극소수만 데이터를 복호화 해 확인할 수 있습니다.

## Bearer token

- Bearer token이라고 하는 보안 token 관련 HTTP 인증 체계입니다.
- 대개 로그인 요청에 대한 응답으로 서버에서 생성되는 암호문입니다.
- Bearer 인증 방식은 원래 RFC 6750 에서 OAuth 2.0의 일부로 작성 되었지만 때로는 자체적으로도 사용합니다.
- Basic 인증 과 마찬가지로 Bearer 인증은 HTTPS (SSL)를 통해서만 사용해야합니다.
- 베어러 토큰은 일반적으로 서버에 의해 생성 bearerFormat되므로 클라이언트에 대한 힌트로 문서 목적으로 주로 사용됩니다.
- bearerAuth : []의 대괄호 []는 API 호출에 필요한 보안 범위 목록을 포함합니다. 범위는 OAuth 2 및 OpenID Connect 에서만 사용되므로 목록은 비어 있습니다.
- 베어러 인증은 여러 인증 유형 사용에서 다른 인증 방법과 결합 할 수도 있습니다 .
- 적절한 베어러 토큰을 포함하지 않는 요청에 대해 반환 된 401 "Unauthorized" 응답을 정의 할 수 있습니다.

## 참고

- [JWT를 소개합니다.](https://meetup.toast.com/posts/239?fbclid=IwAR276PWKqtuWWfOdoJdE6Ypl7CplQqSpEA9cxuJ3xv1jnhKZj4y7WmwHWF4)
