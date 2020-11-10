---
title: http
date: 2020-02-11 09:02:40
category: develop
draft: false
---

- HTTP/1은 하나의 TCP 연결에 하나의 요청만 처리하고 연결을 끊어버렸기 때문에 매 요청마다 이 번거로운 핸드쉐이크를 거쳐야 했습니다.
- HTTP/2에서는 핸드쉐이크를 최소화하기 위해서 단일 TCP 연결을 유지하면서 여러 개의 요청을 처리할 수 있도록 변경 되었습니다.
  - 결국 HTTP/1에서 HTTP/2로 넘어갈 때도 핸드쉐이크 과정 자체는 건드리지 않았고 단지 핸드쉐이크가 발생하는 횟수를 최소화함으로써 레이턴시를 줄인 것입니다. 이는 TCP를 사용하는 이상 핸드쉐이크가 반드시 필요한 과정이기 때문에 건드리지 못한 것입니다.
  - 패킷이 처리되는 순서 또한 정해져있으므로 이전에 받은 패킷을 파싱하기 전까지는 다음 패킷을 처리할 수도 없습니다. 이렇게 패킷이 중간에 유실되거나 수신 측의 패킷 파싱 속도가 느리다면 통신에 병목이 발생하게 되는 현상을 HOLB라고 부릅니다. 이건 TCP 자체의 문제이므로 HTTP/1 뿐만 아니라 HTTP/2도 가지고 있는 문제입니다.
- HTTP/3는 UDP를 사용함으로써 이 핸드쉐이크 과정 자체를 날려버리고 다른 방법으로 연결의 신뢰성을 확보함으로써 레이턴시를 줄이는 방법을 택했습니다.

## METHOD

- POST는 클라이언트가 리소스의 위치를 지정하지 않았을때 리소스를 생성하기 위해 사용하는 연산입니다. 이 연산은 idempotent하지 않습니다.
- PUT은 리소스의 위치가 지정되었을때 생성 또는 업데이트를 위해 사용할 수 있습니다. idempotent합니다.
- POST이나 POST 요청이 리소스를 새로 생성할 경우엔 리소스의 위치를 response header 의 Location field에 담아 201 Created 를 보낼 수 있습니다. 그러나 not-identifiable한 리소스를 생성할 경우엔 200 OK 또는 204 No Content를 보낼수도 있습니다.
- 리소스를 수정하지 않는 메소드들, OPTIONS, GET, HEAD 등을 safe 하다고 말합니다. 대부분의 경우 idempotent 하면 safe합니다. 물론 예외도 있는데 DELETE는 idempotent 하지만 리소스를 변경하므로 safe 하지 않습니다. 자세한 내용은 RFC 7231: Safe Methods를 참고합니다. 참고로 RFC 7231은 PUT, DELETE와 safe methods를 idempotent 하다고 정의합니다.
- 리소스는 주어진 URI에 대한 정보인데 OPTIONS는 정보를 가지고 오는 것이 아니라, 정보에 대해 어떤 연산이 가능한지를 알려줍니다. HTTP에서는 정보에 대해 캐싱하므로, GET이나 HEAD 같이 정보를 돌려주는 연산만 캐싱할 수 있습니다.
- TRACE는 클라이언트가 방금 보낸 요청을 다시 달라고, 서버에게 요청하는 것이고 CONNECT 는 HTTP 터널링을 할때 쓰입니다. 중간의 프록시 서버를 위해서는 CONNECT로 요청하고, 마지막 프록시에서 end-point로는 GET 또는 CONNECT를 날립니다. HTTPS라면 CONNECT 를, HTTP라면 둘 중 아무거나 써도 상관 없습니다.
- HTTP는 0.9 -> 1.0 -> 1.1 순으로 변화했다고 합니다. 0.9에선 GET을 이용한 Read-only 버전이었고 1.0 에 들어와서야 HEAD, POST 등을 이용해 서버로 데이터 전송이 가능해졌습니다. HTTP 1.1(RFC 2616)에 와서야 DELETE, PUT 등이 추가되면서 변경, 삭제까지 가능해졌습니다.

## 참고

- [REST API: PUT VS POST](https://1ambda.github.io/javascripts/rest-api-put-vs-post/)
