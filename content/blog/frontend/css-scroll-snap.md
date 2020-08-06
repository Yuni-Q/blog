---
title: CSS Scroll snap
date: 2020-08-06 09:08:95
category: frontend
tags: ['css', 'scroll']
draft: true
---

- Scroll container(overflow: scroll인 컨테이너)에 넣는 속성
  - snap-scroll-type
  - snap-scroll-padding
- 자식 요소에 넣는 속성
  - snap-scroll-align
  - snap-scroll-margin

## snap-scroll-type

```
snap-scroll-type: none | [ x | y | block | inline | both ] [ mandatory | proximity ]?
```

- snap-scroll-type은 컨테이너에서 Scroll snap을 할 축과 엄격도를 정합니다. 첫번째에 넣는 값으로는 x, y축 혹은 block축, inline축 등으로 정할 수 있습니다. 두번째로는 mandatory를 넣어 항상 snap point에 놓이도록 무조건 Scroll snap이 되도록 할 수 있고 proximity를 넣어 사용자의 스크롤을 우선시할 수 있습니다.

## snap-scroll-align

```
scroll-snap-align: [ none | start | end | center ]{1,2};
```

- snap-scroll-align은 Scroll container의 자식요소가 어디서 snap해야 하는지 알려줍니다. Scroll container의 viewport에서 해당 축을 기준으로 어디에서 snap해야할지 알려줍니다. none인 경우 snap하지 않고, start/center/end는 자식요소에서 snap할 위치를 축을 기준으로 맨 앞/중간/맨 뒤로 설정합니다.

## scroll-margin/padding

```
scroll-margin: [ <length-percentage> | auto ]{1,4};
scroll-padding: [ <length-percentage> | auto ]{1,4};
```

- Scroll container의 viewport에서 snap하는 곳에서 \<length-percentage>만큼 띄우도록 한다. padding은 모든 자식요소에 적용되지만 margin은 개별 자식요소에 적용됩니다.
