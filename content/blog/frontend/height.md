---
title: height
date: 2020-01-26 14:01:28
category: frontend
draft: true
---

## screen.height

- 화면의 세로 크기를 가져옵니다.

## screen.availHeight

- 브라우저의 막대를 포함하여 최대화 된 경우 브라우저의 윈도우가 가질 수 있는 높이입니다.
- 창이 최대화되면 screen.availHeight === window.outerHeight
- 작업 표시줄이 차지하는 부분을 제외한 세로 크기를 가져옵니다.
- 화면 아래의 작업 표시줄 높이가 30px이라면 screen.availHeight가 screen.height보다 30 작습니다.
- 현재 화면에서 실제로 사용가능한 최대치의 높이를 반환합니다.

## offsetHeight

- 문서에서 요소가 차지하는 높이입니다.
- 스크롤바가 나타나는 부분까지의 길이입니다.
- offsetHeight 속성은 여백이 아니라 패딩, 테두리 및 스크롤 막대를 포함하여 요소의 볼 수있는 높이를 픽셀 단위로 반환합니다.
- 일반적으로 엘리먼트의 전체 크기를 알고 싶다면, `offsetWidth`와 `offsetHeight` 속성을 가져오면 됩니다.

## scrollHeight

- 스크롤이 안 보이는 영역까지의 길이입니다.
- overflow: hidden 시 offsetHeight와 scrollHeight가 다릅니다.
- 모든 컨텐츠 패딩의 높이입니다.

## document.documentElement vs document.body

- 브라우저마다 요소의 크기가 다른 값을 제공합니다.
- 페이지가 Quirks 모드에서 렌더링되는지 표준 준수 모드에서 렌더링되는지, HTML 또는 XHTML을 - 사용하는지에 따라 동일한 브라우저에서 다른 값을 제공 할 수 있습니다. html요소 중 하나를 창, 또는 전체 페이지를 나타낼 수 있습니다.

## document.documentElement

- Document.documentElement 는 읽기 전용 속성으로 document 의 루트 요소인 Element를 반환합니다 (가령, HTML 문서의 <html> 요소)

## document.body

- Document.body 속성은 현재 문서의 \<body> 혹은 \<frameset> 노드를 나타냅니다. 일치하는 요소가 존재하지 않으면 null을 반환합니다.
- 본문을 설정할 수 있지만 문서에 새 본문을 설정하면 기존 \<body> 요소의 모든 현재 자식이 효과적으로 제거됩니다.
- document.body가 null이거나 정의되지 않은 문제가 발생하면 JavaScript 코드를 확인하여 DOM이 완전히로드 된 후에 만 ​​JavaScript 코드가 실행되는지 확인하십시오. JavaScript 코드가 페이지의 헤드 섹션에있는 경우 성능상의 이유로 권장되는대로 JavaScript 코드를 페이지의 본문 섹션으로 이동하십시오. 문제가 해결되면 DOM이 완전히 로드되기 전에 JavaScript 코드 (헤드 섹션에있을 때)가 실행 된 것입니다. 브라우저는 html을 위에서 아래로 구문 분석하고 본문이 로드되기 전에 스크립트가 실행됩니다. 닫기 본문 태그 바로 앞에 put 스크립트를 수정합니다.
