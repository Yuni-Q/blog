# 1장 HTTP 개관

- 전 세계의 웹브라우저, 서버, 웹 애플리케이션은 모두 HTTP(Hypertext Transfer Protocol)를 통해 서로 대화한다.
- HTTP는 현대 인터넷의 공용어이다.

## 1.1 HTTP : 인터넷의 멀티미디어 배달부

- HTTP는 신뢰성 있는 데이터 전송 프로토콜을 사용하기 때문에, 데이터가 지구 반대편에서 오더라도 전송 중 손상되거나 꼬이지 않음을 보장한다.

## 1.2 웹 클라이언트와 서버

- 웹 콘텐츠는 웹 서버에 존재한다.
- 웹 서버는 HTTP 프로토콜로 의사소통하기 때문에 보통 HTTP 서버라고 불린다.
- 웹 서버는 인터넷의 데아터를 저장하고 HTTP 클라이언트가 요청한 데이터를 제공한다.
- 클라이언트는 서버에서 HTTP 요청을 보내고 서버는 요청된 데이터를 HTTP 응답으로 돌려준다.
- HTTP 클라이언트와 HTTP 서버는 월드 와이드 웹의 기본 요소다.
- 가장 흔한 클라이언트는 익스프로러나 크롬 같은 웹 브라우저다.
- 웹브라우저는 서버에게 HTTP 객체를 요청하고 사용자의 화면에 보여준다.

## 1.3 리소스

- 웹 서버는 웹 리소스를 관리하고 제공한다.
- 웹 리소스는 웹 콘텐츠의 원천이다.
- 가장 단순한 웹 리소스는 우베 서버 파일 시스템의 정적 파일이다.
- 리소스는 요청에 따라 콘텐츠를 생산하는 프로그램이 될 수도 있다.
- 어떤 종류의 콘텐츠 소스도 리소스가 될 수 있다.

### 1.3.1 미디어 타입

- MIME(Multipurpose Internet Mail Extensions, 다목적 인터넷 메일 확정)은 원래 각기 다른 전자메일 시스템 사이에서 메시지가 오갈 때 겪는 문제점을 해결하기 위해 설계 되었다.
- MIME는 이메일에서 워낙 잘 동작했기 때문에, HTTP에서도 멀티미디어 콘텐츠를 기술하고 라벨을 붙이기 위해 채택되었다.
- 웹 서버는 모든 HTTP 객체 데이터에 MIME 타입을 붙인다.
- 웹브라우저는 서버로부터 객체를 돌려받을 때, 다룰 수 있는 MIME 타입을 통해 확인한다.
- MIME 타입은 사선(/)으로 구분된 주 타입(primary object type)과 부 타입(specific subtype)으로 이루어진 문자열 라벨이다.

### 1.3.2 URI

- 웹 서버 리소스는 각자 이름을 갖고 있기 때문에, 클라이언트는 관심 있는 리소스를 지목할 수 있다.
- 서버 리소스 이름은 통합 자원 식별자(uniform resource identifier), 혹은 URI로 불린다.
- URI에는 두가지가 있는데 URL과 URN이라는 것이다.

### 1.3.3 URL

- 통합 자원 식별자(uniform resource identifier)는 리소스 식별자의 가장 흔한 형태다.
- URL은 특정 서버의 한 리소스에 대한 구체적인 위치를 서술한다.
- 대부분 URL은 세 부분으로 이루어진 표준 포맷을 따른다.
  - URL의 첫 번째 부분은 스킴(scheme)이라고 불리는데, 리소스에 접근하기 위해 사용되는 프로토콜을 서술한다. 보통 HTTP 프로토콜(http://)이다.
  - 두 번째 부분은 서버의 인터넷 주소를 제공한다(예 : www.joes-hardware.com)
  - 마지막은 웹 서버의 리소스를 가리킨다.(예 : /specials/saw-blade.gif)
- 오늘날 대부분의 URI는 URL이다.

### 1.3.4 URN

- URI의 두 번째 종류는 유니폼 리소스 이름(uniform resource name, URN)이다.
- URN은 콘텐츠를 이루는 한 리소스에 대해, 그 리소스의 위치에 영향 받지 않는 유일무이한 이름 역할을 한다.
- 이 위치 독립적인 URN은 리소스를 여기저기로 옮기더라도 문제없이 동작한다.
- URN은 아직 실험 중인 상태고 아직 널리 채택되지 않았다. 효율적인 동작을 위해 URN은 리소스 위치를 분석하기 위한 인프라 지원이 필요한데, 그러한 인프라가 부재하기에 URN 채택이 더 늦춰지고 있다.

## 1.4 트랜잭션

- HTTP 트랜잭션은 요청 명령(클라이언트에서 서버로 보내는)과 응답 결과(서버가 클라이언트에서 돌려주는)로 구성되어 있다. 이 상호작용은 HTTP 메시지라고 불리는 정형화된 데이터 덩어리를 이용해 이루어진다.

## 1.4.1 메서드

- HTTP는 HTTP 메서드라고 불리는 여러 가지 종류의 요청 명령을 지원한다.
- 모든 HTTP 요청 메시지는 한 개의 메서드를 갖는다.
- 메서드는 서버에게 어떤 동작을 취해져야 하는지 말해준다.

| HTTP 메서드 | 설명                                                          |
| ----------- | ------------------------------------------------------------- |
| GET         | 서버에서 클라이언트로 지정한 리소스를 보내라.                 |
| PUT         | 클라이언트에서 서버로 보낸 데이터를 이름의 리소스로 지정하라. |
| DELETE      | 지정한 리소스를 서버에서 삭제하라.                            |
| POST        | 클라이언트 데이터를 서버 게이트웨이 애플리케이션으로 보내라.  |
| HEAD        | 지정한 리소스에 대한 응답에서, HTTP 헤더 부분만 보내리.       |

## 1.4.2 상태 코드
