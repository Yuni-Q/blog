---
title: hover
date: 2020-02-14 17:02:04
category: frontend
draft: false
---

- 마우스를 올리면 텍스트 밑에 밑줄을 긋는다거나 배경색을 바꾸는 효과를 줄때가 있다.
- 하지만 모바일에서는 호버 이벤트가 없다 하지만 이를 위해 action 가상 선택자를 통해 클릭 시 효과를 주는 것으로 통일성을 맞춰 나가는거 같다.
- 하지만 호버 이벤트를 모바일 사이즈에서 없애지 않는다면 클릭 후 색이 남는 현상이 발생 했다.

## 이벤트 주기

```scss
&:hover {
	background: red;
}
@media (max-width: 800px) {
	&:active {
		background: $CG100;
	}
}
```

## 호버 이벤트를 지워 클릭 후 남는 색 없애기

```scss
&:hover {
	background: red;
}
@media (max-width: 800px) {
	&:hover {
		background-color: transparent;
	}
	&:active {
		background: $CG100;
	}
}
```

- none이나 ''을 주어 지우는 것은 효과가 없었다.
- transparent 사용
