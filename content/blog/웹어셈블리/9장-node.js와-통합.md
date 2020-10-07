---
title: 9장 Node.js와 통합
date: 2020-10-08 02:10:08
category: 웹어셈블리
tags: []
draft: true
---

## 질문

- 웹어셈블리를 Node.js와 통합할 때의 장점 중 하나는 무엇인가?
  - 매끄러운 통함, 상호 보완적인 기술, npm을 개발
- JSON 파일의 데이터를 읽고 쓰기 위해 Express 애플리케이션이 이용하는 라이브러리는 무엇인가?
  - body-parser
- 모듈을 브라우저에서 로드하는 것과 Node.js에서 로드하는 것의 차이점은 무엇인가?
  - Node.js를 이용할 때는 파일을 가져오기 위한 호출이 fs.readFileSync()로 교체되고, fs.readFileSync()가 instantiate() 함수에 직접 전달할 수 있는 버퍼를 반환해 주기 때문에 arrayBuffer() 함수가 더 이상 필요하지 않습니다.
- 기존의 npm 스크립트 전이나 이후에 npm 스크립트를 실행시키는데 사용할 수 있는 기술은 무엇인가?
  - 동일한 이름으로 만들거나 pre 또는 post로 시작하는 이름을 만드는 것입니다.
- Webpack에서 로더의 목적은 무엇인가?
  - Webpack에게 그것들을 로드하는 방법을 알려줍니다.
- Jest에서 describe()와 test()의 차이점은 무엇인가?
  - 전체 테스트 셋을 describe() 블록으로 래핑합니다. Jest는 관련된 테스트 test()를 describe() 함수로 캡슐화하고 단일 테스트에 대해서는 it() 함수를 이용합니다.
- npm test 명령에 추가적인 CLI 플래그를 전달하는 방법은 무엇인가?
  - -- 뒤에 추가해서 명령에 전달할 수 있습니다.
