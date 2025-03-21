---
title: event
date: 2020-08-25 23:08:73
category: javascript
tags: ['javascript', 'event']
draft: true
---

## 이벤트 등록

- 이벤트 등록이란 웹 애플리케이션에서 사용자의 입력을 받기 위해 필요한 기능입니다.

```html
<button>add one item</button>
<script>
	var button = document.querySelector('button');
	button.addEventListener('click', addItem);

	function addItem(event) {
		console.log(event);
	}
</script>
```

- add one item이라는 간단한 버튼을 만들어 클릭했을 때 addItem이라는 함수를 실행시키는 코드입니다. 버튼을 클릭하고 나면 addItem 함수가 실행되고 addItem 함수에 event 인자가 넘어옵니다. event 인자를 콘솔에 출력해보면 이벤트와 관련된 정보를 확인할 수 있습니다.
- addEventListener() 웹 API는 웹 개발자들이 화면에 동적인 기능을 추가하기 위해 자연스럽게 접하게 되는 기본적인 기능입니다. 사용자의 입력에 따라 추가 동작을 구현할 수 있는 방법입니다.

## 이벤트 버블링 - Event Bubbling

- 하위에서 상위 요소로의 이벤트 전파 방식을 이벤트 버블링(Event Bubbling)이라고 합니다.
- 이벤트 버블링은 특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미합니다.
  - 요소는 기본적으로 트리 구조를 갖습니다. 트리 구조상으로 위에 있는 요소를 상위 요소라고 합니다.
- 브라우저는 특정 화면 요소에서 이벤트가 발생했을 때 그 이벤트를 최상위에 있는 화면 요소까지 이벤트를 전파시킵니다.

## 이벤트 캡쳐 - Event Capture

- 이벤트 캡쳐는 이벤트 버블링과 반대 방향으로 진행되는 이벤트 전파 방식입니다.
- addEventListener() API에서 옵션 객체에 capture:true를 설정해주면 됩니다. 그러면 해당 이벤트를 감지하기 위해 이벤트 버블링과 반대 방향으로 탐색합니다.

## event.stopPropagation()

- 해당 이벤트가 전파되는 것을 막습니다. 따라서, 이벤트 버블링의 경우에는 클릭한 요소의 이벤트만 발생시키고 상위 요소로 이벤트를 전달하는 것을 방해합니다. 그리고 이벤트 캡쳐의 경우에는 클릭한 요소의 최상위 요소의 이벤트만 동작시키고 하위 요소들로 이벤트를 전달하지 않습니다.

## 이벤트 위임 - Event Delegation

- 이벤트 위임을 한 문장으로 요약해보면 `하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식`입니다.

## 참고

- [이벤트 버블링, 이벤트 캡처 그리고 이벤트 위임까지](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/)
