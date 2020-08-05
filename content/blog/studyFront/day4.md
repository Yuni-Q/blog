---
title: day4
date: 2020-07-14 05:07:36
category: studyFront
draft: false
---

## 자바스크립트 사용하기

- index.html에 script 태그를 연결 합니다.

```html
<!DOCTYPE html>
<html lang="ko-KO">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>javascript</title>
	</head>

	<body>
		<script src="./index.js"></script>
	</body>
</html>
```

- 자바스크립트에서 특정 html의 element를 사용할 때 그 element보다 자바스크립트 코드가 상위에 있을 경우 에러를 발생할 수 있습니다. 또한 스크립트가 element보다 상단에 위치할 경우 사용자에게 초기에 보여지는 속도가 느려질 수 있기 때문에 body 끝에 작성합니다.
- 자바스크립트 파일을 작성합니다.

```javascript
alert('javascript');
```

- html을 실행하면 새로고침 시 마다 javascript가 작성된 시스템 팝업이 등장합니다.

## 클릭 시 이벤트 발생

- 새로고침하면 뜨던 시스템 팝업을 클릭 시 작성되게 변경해 보겠습니다.

```javascript
function onClick() {
	alert('javascript');
}

window.addEventListener('click', onClick);
```

### window란?

- 브라우저의 요소들과 자바스크립트 엔진, 그리고 모든 변수를 담고 있는 객체입니다. 브라우저 전체를 담당하는 게 Window 객체이고, 웹사이트만 담당하는게 Document 객체입니다.
- window는 모든 객체의 조상입니다. 전역객체(글로벌객체)라고 하는데요. 모든 객체를 다 포함하고 있기 때문에 window는 그냥 생략가능합니다. window 객체 아래를 보면, String, Boolean, Object, Number, Function, Array같은 자료형도 다 들어있습니다.

#### addEventListener란?

- addEventListener은 이벤트를 등록하는 가장 권장되는 방식입니다. 이 방식을 이용하면 여러개의 이벤트 핸들러를 등록할 수 있습니다.
  - 이 방식은 ie8이하에서는 호환되지 않습니다. ie에서는 attachEvent 메소드를 사용해야 합니다.
  - removeEventListener라는 짝이 있습니다.

### javascript 함수

- 함수는 JavaScript에서 기본적인 구성 블록 중의 하나입니다. 함수는 작업을 수행하거나 값을 계산하는 문장 집합 같은 자바스크립트 절차입니다. 함수를 사용하려면 함수를 호출하고자 하는 범위 내에서 함수를 정의해야만 합니다.
- 함수 정의(또는 함수 선언)는 다음과 같은 함수 키워드로 구성되어 있습니다:
  - 함수의 이름
  - 괄호 안에서 쉼표로 분리된 함수의 매개변수 목록
  - 중괄호 { } 안에서 함수를 정의하는 자바스크립트 표현
- 함수 표현식과 arrow function에 대해서는 다음에 알아보겠습니다.

## 클릭마다 eleement 추가

```javascript
function onClick() {
	const element = document.createElement('div');
	element.textContent = '추가!!';
	document.body.appendChild(element);
}
window.addEventListener('click', onClick);
```

- Document 객체는 웹 페이지 그 자체를 의미합니다. 웹 페이지에 존재하는 HTML 요소에 접근하고자 할 때는 반드시 Document 객체부터 시작해야 합니다.
- createElement로 element를 만들고 textContent로 text를 추가하고 body에 appendChild를 통해 body의 마지막에 element를 추가합니다.
- 자바스크립트에서 값을 담을 수 있는 방법은 3가지가 있습니다. var, let, const

### var

- ES6(ECMAScript6) 이전에 나온 변수 선언 방식입니다.
- var와 let의 차이점으로는 scope이 있습니다. var는 function 단위의 scope을 가집니다.
- 현재는 사용하지 않을 것을 권장합니다.

### let

- ES6(ECMAScript6)에서 추가된 변수 선언 방식입니다.
- let은 {}(block) 단위의 scope을 가집니다.
- var와 다르게 같은 변수명을 갖는 변수는 두 번 선언하게 되면 오류가 발생하므로 변수의 값을 바꿔주는 식으로 사용하여야 합니다.

### const

- const는 상수를 선언할 때 사용합니다.
- 상수는 한번 선언하면 바꿀 수 없습니다.
- const의 scope은 {}(block)입니다.

## 눈(Snow) 그리기

```javascript
function onClick() {
	const element = document.createElement('div');
	element.style.cssText = `
		position: absolute;
		top: ${window.event.clientY - 5}px;
		left: ${window.event.clientX - 5}px;
		width: 10px;
		height: 10px;
		background-color: red;
		border-radius: 100%;
	`;
	document.body.appendChild(element);
}
window.addEventListener('click', onClick);
```

- window.event를 통해 현재 마우스 포인터의 위치를 구합니다.
- element.style.cssText를 통해 style을 작성합니다.
- 템플릿 리터럴을 사용해 문자열 안에 javascript 변수를 사용합니다.

### 템플릿 리터럴(Template literals)

- 템플릿 리터럴은 내장된 표현식을 허용하는 문자열 리터럴입니다.
- 템플릿 리터럴은 표현식/문자열 삽입, 여러 줄 문자열, 문자열 형식화, 문자열 태깅 등 다양한 기능을 제공합니다.
- ES2015 사양명세서에선 template strings라고 불렸습니다.
- 템플릿 리터럴은 런타임 시점에 일반 자바스크립트 문자열로 처리/변환됩니다.
- 프론트엔드에서는 HTML을 데이터와 결합해서 DOM을 다시 그려야 하는 일이 빈번하기 때문에, 템플릿을 좀 더 쉽게 편집하고 작성해야 할 필요가 있어서, 이러한 기능이 추가되었습니다.(자바스크립트 자체적으로 지원하기 전에도 라이브러리로 존재했습니다.)
- 템플릿 리터럴에서는 아래와 같이 \$와 중괄호{}를 사용하여 표현식을 표기할 수 있습니다.(Expression interpolation (표현식 삽입법))
- 태그를 사용하여 템플릿 리터럴을 함수로 파싱할 수 있습니다.(Tagged templates)
- 템플릿 리터럴을 사용하면 여러 줄의 문자열도 나눠서 작성할 필요가 없습니다.(Multi-line strings)
- 특정 조건을 만족하는 경우마다 다른 문자열을 변수에 저장하고 싶을 때, 템플릿을 중첩해서 작성하는 것이 가독성이 더 좋을 때가 있습니다.(Nesting templates (중첩 템플릿))
- String.raw 태그함수를 사용하면 템플릿 문자열을 입력한 대로 출력할 수 있습니다.(Raw strings (원래 문자열))

## absolute Potision

- 부모 엘리먼트 내부에 속박되지 않고, 독립된 배치 문맥(positioning context)을 가지게 됩니다. 마치 포토샵 같은 그래픽 툴에서 새로운 레이어를 추가하는 효과에 비슷하다고 생각하시면 됩니다.
- 엘리먼트를 기본적으로 브라우저 화면(viewport) 상에서 어디든지 원하는 위치에 자유롭게 배치시킬 수 있으며, 심지어 부모 엘리먼트 위에 겹쳐서 배치할 수도 있습니다.
- 상위 엘리먼트 중에 position 속성이 static이 아닌 엘리먼트가 있다면, 그 중 가장 가까운 엘리먼트의 내부에서만 엘리먼트를 자유롭게 배치할 수 있습니다. 즉, 전체 화면이 아닌 해당 상위 엘리먼트를 기준으로 offset 속성(top, left, bottom, right)이 적용됩니다.

## 참고

- [Window 객체와 BOM](https://www.zerocho.com/category/JavaScript/post/573b321aa54b5e8427432946)
- [[Javascript]자바스크립트 기초-변수와 상수(var,let,const)](https://hees-dev.tistory.com/32)
- [[JavaScript] ES6 템플릿 리터럴에 대해 알아보자](https://eblee-repo.tistory.com/38)
- [[CSS] Absolute Postion - 자유로운 엘리먼트 배치](https://www.daleseo.com/css-position-absolute)
