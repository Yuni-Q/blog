---
title: MVP
date: 2020-07-23 09:07:80
category: design pattern
draft: true
---

## MVP 패턴

- MVC패턴은 View와 Model 사이의 의존성이 높고, 이 의존성이 높기 때문에 어플리케이션이 커지면 커질수록 더 복잡해지고 유지보수가 힘들어진다는 단점을 가지고 있습니다.
- MVP는 Model-View-Presenter의 약자로 Model과 View는 MVC와 동일하지만 Controller 대신에 Presenter가 존재합니다.
- Model과 View는 서로를 알 필요가 없이 Presenter만 가리킵니다. 따라서 Model과 View의 의존성은 사라지게 됩니다.
- 사용자들의 입력들은 View를 통해서 데이터를 Presenter에 요청하고 Presenter는 Model에게 데이터를 요청합니다. Model은 Presenter에게 응답하여 다시 View로 전송해서 화면에 나타내게 되는 동작 순서를 가지고 있습니다.
- View는 기본적으로는 MVC와 같이 화면에 보여지는 요소를 맡는 것은 동일하나 `Controller가 사라짐에 따라서 이제 사용자의 입력을 받는 역할`을 겸하게 됩니다.
- Presenter는 View에서 요청한 정보로 Model을 가공하여 View에 전달해주는 부분입니다. 본질적으로는 MVC의 컨트롤러와 같지만 `뷰에 연결되는 것이 아니라 그냥 인터페이스`라는 점이 다릅니다.

## 제작목적

- 기본 MVC 개념을 구성 요소로 분해하고 더욱 세분화하여 프로그래머가 보다 복잡한 애플리케이션을 개발하는 데 도와줍니다.
- 광범위한 애플리케이션 및 구성요소 개발 작업을 위한 강력하고 이해하기 쉬운 설계 방법을 제공합니다.
- 여러 클라이언트/서버 및 다중 계층 애플리케이션 아키텍처에 걸쳐 적응합니다.
- 주요 객체 지향 언어 환경에 걸쳐 통합된 개념 프로그래밍 모델을 제공합니다.

## 특징

- 스몰토크의 프로그래밍 모델인 MVC는 세 가지 핵심 추상화를 사용합니다. 모델은 데이터, 뷰는 화면에 그려지는 방법, 컨트롤러는 사용자 제스처 및 이벤트입니다.
- 텔리전트의 전반적인 접근 방식 모델은 모델과 뷰-컨트롤러 간의 분리를 공식화합니다. 모델은 데이터 관리, 뷰-컨트롤러은 사용자 인터페이스라는 두 가지 기본 개념을 세분화합니다.
- 이 두 가지 개념은 프로그래머가 다뤄야 하는 가장 기본적인 두 가지 디자인 문제를 담고 있습니다.
  - 데이터를 어떻게 관리하지?
  - 사용자가 데이터와 어떻게 상호작용하지?
- 데이터 관리를 세분화하여 Model/Selection/Command로 분리합니다.
  - Model : 캡슐화된 데이터, 읽기 및 쓰기 액세스 방법입니다.
  - Selection : 데이터 선택 방법, Model 데이터의 여러 하위 세트를 지정하기 위한 추상화입니다.
  - Command : 데이터 변경 방법, Model의 Selection에서 수행할 수 있는 작업을 나타내는 추상화입니다.
- 사용자 인터페이스을 세분화하여 View/Interactor/Presenter로 분리합니다.
  - View : 데이터를 표시합니다.
  - Interactor : 이벤트에 따른 데이터의 변경 사항을 요청합니다.
  - Presenter : Interactor에 따른 적절한 Command를 매핑하는 비즈니스 로직을 수행합니다.
- 기존의 Controller의 기능이지만 Interactor와 Command를 매핑하는 역할을 고려해서 Presenter라고 했다. 그래서 MVP의 어원이 탄생했습니다.

### MVP 패턴의 장점

- MVC와 달리 View와 Model의 의존성이 사라졌습니다.

### MVP 패턴의 단점

- View와 Model 사이의 의존성은 해결되었지만 대신에 View와 Presenter 사이의 높은 의존성을 가지게 되었습니다. 이는 MVC와 마찬가지로 애플리케이션이 복잡해질수록 View와 Presenter 사이의 의존성이 더욱 강해지고 복잡해집니다.

## 참조

- [MVC? 싱글톤? 여러가지 디자인 패턴들](https://blog.metafor.kr/146)
- [MV\*/Flux 정리](https://chodragon9.github.io/blog/mv_flux/#mvc)
