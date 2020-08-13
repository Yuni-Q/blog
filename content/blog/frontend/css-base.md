---
title: css base
date: 2020-08-06 08:08:60
category: frontend
tags: ['css']
draft: true
---

## 1. reset CSS or nomalize CSS

- button 부분이 빠져 있기 때문에 초기화 코드를 추가합니다.

```css
button {
	border: none;
	background-color: transparent;
	cursor: pointer;
	color: inherit;
}
```

## 2. h1 margin 초기화

```css
h1 {
	margin: 0;
}
```

## 3. box-sizing을 context-box에서 border-box로 변경

```css
* {
	box-sizing: border-box;
}
```

## 4. body에 폰트 적용

## 5. a 태그 초기화

```css
a {
	color: inherit;
	text-decoration: none;
}

a:hover,
a:focus {
	color: inherit;
}
```

## 6. a11y-hidden 적용(화면에 보이지 말아야 할 text 숨기기)

```css
.a11y-hidden {
	overflow: hidden;
	width: 1px;
	height: 1px;
	background-color: red;
	position: absolute;
	clip: rect(0, 0, 0, 0);
	margin: -1px;
}
```

## 7. clearfix 추가

```css
.clearfix::after {
	content: '';
	display: block;
	clear: both;
}
```

## 8. 그리드 만들기

```css
body.show-grid::before {
	content: '';
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width: 940px;
	height: 400vh;
	background: repeating-linear-gradient(
		90deg,
		rgba(0, 200, 150, 0.2),
		rgba(0, 200, 150, 0.2) 60px,
		rgba(255, 255, 255, 0) 60px,
		rgba(255, 255, 255, 0) 80px
	);
}
```

## 9. css를 이용한 스타일링 방법

- 인라인 : html에 직접 적용합니다.
- 인터널 : html에 style 태그 안에 작성합니다.
- 익스터널 : link 태그를 사용해 css 파일에 작성합니다.

## 10. 선택자

- \* : 전체 선택자
- 태그이름 : 태그 선택자
- #id : id 선택자
- .class : 클래스 선택자
- \[속성] : 속성 선택자
- :가상클래스 : 가상클래스 선택자
- ::가상요소 : 가상요소 선택자
- 공백은 자손 >는 자식 선택자
- 속성 선택자에서 ^는 앞에 \$는 뒤에 \*은 어디에나 포함 되어 있는 것입니다.

## 11. 상속 되는 속성

- color
- font-size
- font-family
- lertter-spacing

## 12. 상속 되지 않는 속성

- outline
- margin
- border
- padding

## 13. inherit

- 속성을 활용하면 상속 되지 않는 속성도 상속 할 수 있습니다.

## 14 :not()을 통해 상속하지 않을 수 있습니다.

## 15. !important

- 모든 순서를 무시하고 가장 우선 순위로 적용됩니다.

## 16. css 적용 점수표

- 요소는 1점
- 클래스는 10점
- id는 100점
- 인라인은 1000점
- :not()과 콤비네이트 ( \*, ~, >, +) 는 점수에 가산 되지 않습니다.
- 같은 점수라면 나중에 나온 스타일이 우선 순위를 가집니다.

## 17. box-sizing

- content (size가 content box만)
- padding
- border(size content + padding + border)
- margin

## 18. border-box 활용

- 원래 CSS가 처음나왔을 당시에는 content-box만 있었는데, content-box는 변경이 잦은 padding이나 margin 값에 따라 width도 매번 변경해줘야하는게 번거로워 border-box가 나오게 되었습니다.
- css 맨 위에 아래와 같이 적어 사용하면 편리합니다.

```css
*,
*::after,
*::before {
	box-sizing: border-box;
}
```

## 19. overflow

- auto
- visible
- hidden
- scroll

## 20. background 속성

- img 태그로 이미지를 할 수도 있지만 background 속성으로도 할 수 있습니다.
