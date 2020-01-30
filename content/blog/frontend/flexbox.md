---
title: flexbox
date: 2020-01-30 09:01:75
category: frontend
draft: false
---

```javascript

.flex-container{
  /* 부모를 flex로 만들면 자식(자손x)이 flex-item이 된다. */
  display: flex;
  /* row가 기본 값 */
  /* 주축의 방향 */
  /* row / row-reverse / column / column-reverse */
  flex-direction: column;
  /* 기본값  flex-start */
  /* 완전 균등 배분 */
  /* flex-start / center / flex-end */
  /* space-between / space-around / space-evenly */
  justify-content: space-evenly;
  /* flex-wrap */
  /* nowrap / wrap / wrap-reverse */
  flex-wrap: nowrap;
  /* flex-shirnk 값이 1 이기 때문에 width를 설정해도 변하지 않는다. */
  /* flex-shirnk 값을 0으로 변경한다. */
  /* flex-grow는 기본값이 1 */
  /* flex-basis가 width와 같이 사용 할 수 있다. */
  /* flex: grow shink basis */
  /* align-cotent 교차축 정렬 */
  /* flex-flow: row nowrap */
  /* 자식들을 order로 컨트롤 가능 */
  /* align-self 아이템 자기 자신만 컨트롤 */
}
```
