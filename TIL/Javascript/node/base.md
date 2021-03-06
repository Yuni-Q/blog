
# Node.js

JavaScript를 이용해서 서버를 만들 수 있는 개발도구 입니다.  
속도가 빠릅니다 !  
짧은 코드로 쉽게 서버를 만들 수 있습니다.  
성능이 뛰어나고 안정성과 보안도 검증된 서버로서 실무에 적합합니다.  
Node.js를 사용하는 대표기업으로 페이팔, 이베이, 야후 등이 있습니다.  

크롬의 V8 자바스크립트 엔진 위에서 실행됩니다.  
네트워킹 기능을 담당하는 Socket(소켓), http 라이브러리 등의 기본기능이 있습니다.  
몽고디비(MongoDB)를 사용하면 자바스크립트에서 사용하는 객체를 그대로 저장할 수 있으므로 데이터베이스를 다루는 것도 쉬워집니다.  

## 대표 특징
1. 비동기 입출력(Non-Blocking I/O) 방식  
하나의 요청 처리가 끝날 때까지 기다리지 않고 다른 요청을 동시에 처리할 수 있는 방식  

1. 이벤트 기반 입출력(Event driven I/O) 방식  
파일 시스템이 이벤트와 함께 호출하는 방식  
예를들어 소켓이나 HTTP 프로토콜을 사용해 데이터를 송수신하는 부분에도 이벤트 처리 방식을 그대로 사용할 수 있습니다.  

1. 모듈  
재사용하기 좋고 관리하기 편하도록 기능을 별도의 모듈 파일로 분리시키고 필요할 때 불러올 수 있습니다.  
그 형태는 CommonJs* 표준 스펙을 따릅니다.  
예를들어 자바스크립트 코드의 일부를 별도의 파일 module_1.js로 저장(이 파일이 모듈)  
이 코드를 사용하고 싶다면 require()함수로 모듈을 호출합니다.  

## CommonJs?
자바스크립트를 브라우저뿐 아니라 서버 쪽 프로그램이나 pc용 프로그램에서도 사용하려고 조직한 자발적인 워킹 그룹.  
CommonJs 표준스펙은 자바스크립트 코드를 별도의 모듈 파일로 분리시키고 필요할 때 불러와 사용할 수 있는 방식을 정의해 둔 표준  

