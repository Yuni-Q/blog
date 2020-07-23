---
title: MVVM
date: 2020-07-23 09:07:99
category: design pattern
draft: true
---

## MVVM 패턴

- MVC에서 파생되는 패턴들은 모델과 뷰 사이에 무언가를 넣는 것입니다.
- 뷰를 가상화하는 프록시를 가짐으로서 뷰와 모델간의 관계를 끊습니다.
- 모델의 데이터 형태가 뷰에게 의존이 생기기 때문에 모델의 변경이 필요할 때는 뷰까지 변경이 이뤄짐으로 변경을 할 때 비용이 많이 듭니다. 그래서 모델의 데이터 형태와 뷰 렌더링을 위한 데이터 형태를 분리하기 위해 객체를 만들어서 의존성을 해결합니다. 뷰를 위한 데이터이기 때문에 뷰모델이라고 부릅니다.
- 뷰와 뷰모델은 양방향 바인딩이 이뤄집니다. 뷰와 뷰모델은 변경이 되었을 때 서로 변경이 됬음을 알려줍니다.
- Model과 View는 MVC에서 정의된 역할과 동일합니다. Model은 상태 저장, 비즈니스 로직, 순수한 데이터입니다. View는 시각적인 요소를 담당합니다.
- ViewModel는 View가 데이터 바인딩에 사용할 수 있는 Model을 전문화합니다.
  - Model Type을 View Type으로 변환하는 데이터 변환기 역할
  - View가 Model과 상호작용 할 수 있게 하는 역할
  - UI의 재사용 가능한 부분에 대한 추상적 표현
  - Selection과 Commands를 포함

### 제작목적

- 현대 UI 개발 플랫폼에 맞게 제작합니다.
- HTML 또는 XAML과 같은 선언적 형태로 항상 수행합니다.

### 특징

- Model과 View는 MVC에서 정의된 역할과 동일합니다.
  - Model은 상태저장, 비즈니스 로직, 순수한 데이터입니다.
  - View는 시각적인 요소를 담당합니다.
- ViewModel는 View가 데이터 바인딩에 사용할 수 있는 Model을 전문화합니다.
  - Model Type을 View Type으로 변환하는 데이터 변환기 역할합니다.
  - View가 Model과 상호작용 할 수 있게 하는 역할입니다.
  - UI의 재사용 가능한 부분에 대한 추상적 표현합니다.
  - Selection과 Commands를 포함합니다.

### VM(ViewModel)

- 뷰에 필요한 데이터를 준비하고 모델에 필요한 이벤트르 전달합니다. 그러면서도 뷰에 종속되지 않는 뷰만을 위한 모델이라고 할 수 있습니다.
- Command 패턴과 Data Binding을 활용해 의존성을 없앱니다.
  - Command 패턴은 요청을 객체의 형태로 캡슐화하여 저장, 로깅, 최소를 할수 있는 패턴입니다.
  - Data Binding은 XML에서 만든 View들을 자동으로 알아서 만들어주는 안드로이드 라이브러리 입니다.
- MVP 패턴처럼 View를 통해 사용자의 입력이 들어오면 되면 Command 패턴으로 ViewModel에 요청합니다.
- ViewModel은 Model에게 필요한 데이터를 요청하고 Model에 응답한 뒤 ViewModel에게 다시 가공해서 저장합니다.
- 여기서 View로 다시 안돌려주냐고 할 수 있는데, View는 Data Binding을 통해 자동으로 갱신하게 됩니다.

### MVVM 패턴의 장점

- Command 패턴과 Data Binding을 사용하여 View와 Model, 심지어 View와 ViewModel 사이의 의존성 또한 없습니다.
- 테스트와 모듈화가 쉽습니다.
- 뷰와 모델을 연결하기 위해 사용해야 하는 연결 코드를 줄일 수 있습니다.

### MVVM 패턴의 단점

- ViewModel의 설계가 쉽지 않습니다.
- 뷰가 변수와 표현식 모두에 바인딩될 수 있어서 시간이 지남에 따라 관계 없는 프리젠테이션 로직이 늘어나 유지 관리하기 번거롭습니다.

## 참조

- [MVC? 싱글톤? 여러가지 디자인 패턴들](https://blog.metafor.kr/146)
- [MV\*/Flux 정리](https://chodragon9.github.io/blog/mv_flux/#mvc)
