---
title: TWO 루프와 논리를 단순화하기
date: 2020-07-02 23:07:14
category: 읽기 좋은 코드가 좋은 코드다
draft: false
---

## 7 읽기 쉽게 흐름제어 만들기

- 조건, 루프, 흐름을 통제하는 선언문은 코드를 복잡하게 만드는 원인입니다. 코드를 읽을 때 다시 되돌아가서 코드를 읽지 않아도 되게끔 만들어야 합니다.
- 조건문에서 인수의 순서
  - 왼쪽 : 질문을 받는 표현
  - 오른쪽 : 비교대상

```javascript
// 가독성 좋음
if (length >= 10) {
}

// 가독성 낮음
if (10 <= length) {
}
```

- 이러한 가이드 라인은 영어 어순과 일치합니다.
  - if/else 순서
- 부정이 아닌 긍정을 사용합니다., 즉 if(!isTrue)가 아닌 if(isTrue)
  - 중첩을 최소화합니다.
- 코드의 중첩이 심할 수록 코드를 읽는 사람의 마음속에 존재하는 정신적 스택에 추가적인 조건이 입력됩니다.
- 함수 중간에서 반환하기로 중첩을 제거합니다.
- 루프 내부에 있는 중첩 제거합니다.

## 8 거대한 표현을 잘게 쪼개기

- 우리는 한번에 서너개 일만 생각할 수 있다고 합니다. 즉, 코드의 표현이 커지면 이해하기 더 어렵습니다.

### 설명 변수

- 커다란 표현을 쪼개는 가장 쉬운 방법은 작은 하위 표현을 담을 추가 변수를 만드는 것입니다. 하위표현의 의미를 설명하므로 `설명 변수`라고도 합니다.

```javascript
// Not Cool
if (line.split(':')[0]) === "root") {}

// Cool
const username = line.split(':')[0]
if (username === "root") {}
```

### 드모르간의 법칙 사용하기

- 동일한 불리언 표현은 다음과 같이 두가지 방법으로 작성할 수 있습니다.

```javascript
!(a || b || c) === !a && !b && !c;
!(a && b && c) === !a || !b || !c;
```

```javascript
// Not Cool
if (!(fileExists && !isProtected)) {
	throw '아이고 파일을 읽을 수 없습니다.';
}

// Cool
if (!fileExists || isProtected) {
	throw '아이고 파일을 읽을 수 없습니다.';
}
```

### 거대한 구문 나누기

- 개별적인 표현은 그렇게 크지 않지만, 모두 한 곳에 있어서 코드를 읽는 사람의 머리를 강타하는 거대한 구문을 형성합니다.
- 다행히도 표현하는 많은 부분이 동일합니다. 따라서 동일한 부분을 요약 변수로 추출해서 함수의 앞부분에 놓아둘 수 있습니다.

```javascript
// Not Cool
const updateHighlight = messageNum => {
	if ($(`#vote_value${messageNum}`).html() === 'Up') {
		$(`#thumbs_up${messageNum}`).addClass('highlighted');
		$(`#thumbs_down${messageNum}`).removeClass('highlighted');
	} else if ($(`#vote_value${messageNum}`).html() === 'Down') {
		$(`#thumbs_up${messageNum}`).removeClass('highlighted');
		$(`#thumbs_down${messageNum}`).addClass('highlighted');
	} else {
		$(`#thumbs_up${messageNum}`).removeClass('highlighted');
		$(`#thumbs_down${messageNum}`).removeClass('highlighted');
	}
};

// Cool
const updateHighlight = messageNum => {
	const thumbsUp = $(`#thumbs_up${messageNum}`);
	const thumbsDown = $(`#thumbs_down${messageNum}`);
	const voteValueHtml = $(`#vote_value${messageNum}`).value();
	const ACTIVE_CLASS = 'highlighted';

	if (voteValueHtml === 'Up') {
		thumbsUp.addClass(ACTIVE_CLASS);
	} else {
		thumbsUp.removeClass(ACTIVE_CLASS);
	}
	if (voteValueHtml === 'Down') {
		thumbsDown.addClass(ACTIVE_CLASS);
	} else {
		thumbsDown.removeClass(ACTIVE_CLASS);
	}
};
```

### 예: 복잡한 논리와 씨름하기

- 주어진 양쪽 경계값이 other의 범위에 속하는지 확인하는 함수입니다.

```javascript
const begin = 2;
const end = 4;
const overlapsWith = other => {
	return (
		(begin >= other.begin && begin <= other.end) ||
		(end >= other.begin && end <= other.end)
	);
};
```

- 생각해야 하거나 조건이 너무나 많으므로 버그가 발생할 확률이 매우 높습니다. 사실은 버그가 있습니다. 앞선 코드는 범위 [0, 2)가 [2, 4)와 겹친다고 말합니다.
- 문제는 <= 혹은 <로 begin/end 값을 비교할 때 매우 신중해야 한다는 점입니다. 이 버그를 수정하면 다음과 같습니다.

```javascript
const overlapsWith = other => {
	return (
		(begin >= other.begin && begin < other.end) ||
		(end > other.begin && end <= other.end)
	);
};
```

- 사실은 또 다른 버그가 있습니다. 이 코드는 begin/end가 other를 완전히 포함하는 경우를 무시합니다. 이를 제대로 해결한 수정 코드는 다음과 같습니다.

```javascript
const overlapsWith = other => {
	return (
		(begin >= other.begin && begin < other.end) ||
		(end > other.begin && end <= other.end) ||
		(begin <= other.begin && end >= other.end)
	);
};
```

- 이 코드는 이제 걷잡을 수 없이 복잡해졌습니다. 다른 사람이 이 코드를 읽고 정확한지 판단할 수 있으리라고 기대할 수 는 없습니다.

### 더 우아한 접근방법 발견하기

- 더 우아한 해결책을 찾으려면 창의력이 필요합니다. 한 가지 해결책은 똑같은 문제를 반대되는 방법으로 해결할 수 있는지 확인하는 것입니다.
- 여기서 overlapsWith의 반대는 겹치지 않는 것입니다. 두 개의 범위가 서로 겹치지 않는 것을 확인하는 방법에는 두 가지 가능성만 존재하므로 훨씬 더 풀기 쉬운 문제로 다가옵니다.

1. 다른 범위가 이 범위 시작보다 전에 끝납니다.
2. 다른 범위가 이 범위가 끝난 후에 시작됩니다.

- 이를 코드로 만드는 방법은 쉽다.

```javascript
const overlapsWith = other => {
	if (other.end <= begin) return false; // 시작보다 전에 끝난다.
	if (other.begin >= end) return false; // 끝난 후에 시작한다.
	return true;
};
```

- 코드의 각 줄은 전보다 훨씬 더 간단합니다. 한 번의 비교만 표함할 뿐입니다. 이렇게 하면 코드를 읽는 사람이 <= 연산자를 정확하게 사용했는 지 쉽게 확인할 수 있습니다.

## 참고

- [읽기 좋은 코드가 좋은 코드다](https://peter-cho.gitbook.io/book/11/undefined-4#one)
