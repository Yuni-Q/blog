
# Django를 쓰는 이유, 쓰지 않는 이유

## 쓰지 않는 이유
1. 정적인 사이트
Django는 동적 사이트를 위한 프레임워크 입니다.  
이런 정적인 사이트의 경우 Django 보다는 정적 페이지 생성에 더 최적화 되어있는 프레임워크를 주로 사용합니다.  
Django Distill 이라는 확장을 사용해서 Django로 만들어진 동적 사이트에서 정적 페이지를 추출할 수도 있습니다.

2. 실시간
Django는 WebSocket 같은 전용 기능이 인기를 끌기 전에 만들어져 관련된 기능의 지원이 매우 빈약한 편입니다.  
Django 에서도 Channels 라는 실시간 기능을 지원하는 API가 추가되었습니다만 처음부터 이를 고려하여 설계된 프레임워크에 비하면 편의성이 떨어집니다.  
이런 실시간 기능을 잘 지원하는 프레임워크로는 Meteor가 대표적입니다.  

3. 비동기
최근의 웹 프레임워크들이 이러한 백그라운드 작업을 위한 도구를 미리 제공하는데 비해 Django는 이를 기본으로 제공하지 않습니다. 다만 Celery같은 별도의 프로그램을 구성해서 처리할 수 있습니다.  
이 또한 Celery를 이용해 비슷한 방식의 구현을 할 수 있지만 언어나 프레임워크 수준에서 지원하는것에 비해 설정이 복잡해지고 오버헤드가 매우 큽니다.  

4. 페이지 동적 로딩
서버와 클라이언트가 같은 뷰 템플릿 파일을 공유해서 사용한다면 이러한 구현을 더욱 손쉽게 할 수 있습니다.  
하지만 Django를 사용한다면 공통의 템플릿을 사용하기 까다로워 각각의 템플릿을 만드는 경우가 많습니다.  

5. Server Side Rendering
동적으로 페이지를 변경하는 경향이 강해지면서 아예 서버에서는 JavaScript만 먼저 보낸 후 모든 페이지를 JavaScript에서 생성하여 제공하는 방식이 생겨났습니다.  
그래서 이 문제를 보완하기 위해 브라우저에서 JavaScript로 내용을 채우는 대신 동일한 방식으로 서버에서 내용을 채운 HTML을 미리 보내주는 Server Side Rendering을 많이 사용하게 되었습니다.
이런 SSR을 지원하는 데에는 NodeJS 만한게 없습니다. 종종 SSR을 지원하는 프레임워크들이 있지만 구현을 살펴보면 내부적으로는 NodeJS를 사용하는게 대부분입니다.  
Django 역시 이러한 SSR을 지원하는 확장이 있습니다. 다만 네이티브로 지원하는 NodeJS나 좀 더 잘 통합되어있는 ASP.NET 에 비하면 아쉬움이 있습니다.  

6. 타입 안정성
거기에 Python은 문법이 처음부터 타입 시스템을 염두해 설계된것이 아니다 보니 최근 강한 정적 타입 언어들이 많은 추론을 통해 타입명 직접 써야 하는 경우가 많이 줄어든데 비해 Python에서 더 자주 타입명을 직접 써줘야 하는 아이러니가 발생하기도 합니다.  

## Django를 쓰는 이유

1. 튼실한 기본 Admin 페이지
2. 기본 보안
3. 쉽고 편한 개발, 디버깅 환경
Django Debug Toolbar  
Django Extensions Debugger  
4. 다양한 확장, App
5. 거대한 커뮤니티







---
참조 : [Django를 쓰는 이유, 쓰지 않는 이유
](https://blog.lxf.kr/2018-11-19---why-or-not-django/)