# flutter

- 네이버 지식in 앱을 플러터로 개발하고 있다.
- Animation, Painting, Gestures가 같은 레벨이다.
- OS 위에 가상 OS가 바로 그린다(skia)
  - 성능이 빠르다.
  - 브릿지가 필요없다(엔진이 처리)
  - 캔버스를 다이렉트로 꼿는다.
- 그래픽만 조금 건드리면 모든 플랫폼에서 지원 할 수 있다(현재는 안드로이드, 아오에스, 웹) - 윈도우 앱도 가능하긴 하다.
  - 확장성이 높다.
  - 여러 플랫폼에 녹이기 쉽다.
- Dart라는 언어가 좋지는 않다. 고도화 된 언어는 아니다. 10년이 다 되어가는 언어임에도 불구하고. 기존 언어에 익숙하면 괴랄 할 수 있다. 플러터 이외에 잘 쓸지 모르겠다. 퓨시아가 플러터를 기본으로 사용한다. 기본 언어로 Dart를 지원한다.
  - dart는 4갈래로 갈린다. 웹 / 앱. 2015전에 2012~2014년에 나왔다. TypeScript, coffeeScript 등과 함께 나왔으나 자바스크립트의 진화에 따라 굳이 배우지 않을 언어 1등을 했다. 2.0 부터 앱을 지원.
    - 런타임이 생성되야 코드가 돌아 간다. Dart VM 위에서 Dart 코드를 돌리면 핫 리로드가 가능하다.
      - JIT은 느리다. VM이 자원을 잘 사용하는 빠르지만 아니라면 느리다.
      - 그래서 AOT도 지원한다. 그래서 프로덕션 릴리즈가 빠르다.
      - 플러터와 다트의 개발자는 같다.
      - 다트가 클라이언트 개발하기엔 나쁘지 않다. 조직에 천재가 많다고 한다면... 그렇지 않다면 별로다. 플러터를 쓰면 좋지만 그 외에는 잘 모르겠다. 고려할게 많다. 플러터는 예외
- flutter.dev를 보는 것도 좋은데 github에 wiki를 보는게 더 많은 도움이 될 수 있다.
- 위젯 하나당 렌더 오프젝트 하나
  - 위젯에 라이프사이클이 존재
  - 위젯이 실행만 하면 element가 render와 교류해서 그린다. 이 과정은 블랙박스.
- 생각보다 블랙 박스가 많다.
- React와 비슷하다.
- Android Compose, Swift UI와 비슷하다.
- 선언형으로 바뀌고 있다. 처음에는 어렵다.
- BLoc, Provider 2가지 종류가 있다. 패키지들 간에 다르게 되어 있어도 괜찮다. 하지만 패턴은 하나인게 좋다.
- 플러터가 네이티브와 통신이 잘 안 된다. VM이 달라서 통신을 따로 해야한다. 웹뷰가 안 좋다.
  - 네이티브만큼 사용이 힘들다.
  - 크로스 플랫폼의 한계점
- Dart 사이트에 랭기지 투어만 봐도 괜찮다. 플러터를 개발하기 위한 정도라면
  - 플러터는 다트를 깊에 쓸 필요는 없다.
  - 이게 되네 싶은게 많다.
  - 이펙티브 다트도 있는데 보면 좋다. 그게 끝이라고 봐도 된다.
  - nulluble을 체크 하지 못한다.
  - 비동기 까지만 봐도 된다.
  - 플러터랑 다트랑 거의 한 몸이다.
  - 플러터에 맞춰진 다트 가이드가 많다.
  - 다트 유저 90% 이상이 플러터라서 아주 깊이 공부할 필요는 없다.
  - 퓨시아에 따라 변화의 요소는 있다.
- 프로덕션 빌드에서도 크러시가 나면 컨스트럭션이 뜨고 죽지 않는다.
  - 에러 바운더리 만들어서 처리 할 수는 있다.

## 앱 스토어 개발하기

- 똑같이 만들면 된다.
- Hero라는 위젯 쓰면 된다.
- Text는 레이아웃 위젯 쓰면 된다.
- 밑에 팝업 배너도 위젯이 있을 것이다.
  - 없으면 스택이라는 위젯
  - 아니면 포지션 레이어?
- ListView로 짜면 되고
- 위?????
- 애니메이션은 애닝메이터 빌더로 한다.
- 쫀득하게 만드는건 안될지도...
- 비디오는 비디오로 넣으면 된다.
- 페이지 이동은 라우터 쿳북?으로 처리하면 된다.

- 레이아웃 어떻게 잡을지 위젯 어떻게 잡을지 고민
- 위젯을 잘게 쪼개는걸 지향하지 않는다.
- 페이지 단위로 구현(쪼개는게)하는 게 좋다.
  - 위젯 단위로 쪼개도 페이지 단위로 될 수도 있다.
  - 우선 페이지 단위로 쪼개고 많이 사용되면 위젯으로 나눈다.
- 아무리 길게 짜도 1000줄이 안 넘어간다.
  - 1000 줄 넘어가면 이상하고 생각한다.
  - 100 뎁스도 내려 갈 수도 있다.
- 렌더 앞에서 맵 돌리는 것을 권장한다.
- 스테이트 관리는 프로바이더 쓰는게 좋을 것이다.
  - 굳이 블록 패턴을 써야 할지는 잘 모르겠다.
  - 블록패턴은 리액트를 억지로 플로터와 맞춘 느낌. 플러터 동작도 리액트와 다르다.
- 생각처럼 동작하지 않을 것이다.
  - 스크롤 되야할거 같은데 안돼.
  - 영역을 다 먹어야하는데 왜 다 안 먹지?
  - 패딩은 왜이래?
  - 머터리얼은 왜 써야해? 쿠퍼티노는 쓰지 말자... 앱스토어도 머터리얼 !!
    - 쿠퍼티노는 그냥 있는 느낌. 아이오에스랑 실제로 다르기도 하다.
    - 머터리얼 없이도 해야하지만 초보자는 필요하다.