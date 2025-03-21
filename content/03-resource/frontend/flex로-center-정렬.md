---
title: flex로 center 정렬
date: 2020-08-01 10:08:32
category: frontend
draft: true
---

- flex를 이용해 중앙 정렬을 합니다.

```html
<!DOCTYPE html>
<html lang="ko-KO">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>flex로 center 정렬</title>
		<style>
			.popup {
				position: fixed;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background: blue;
			}
		</style>
	</head>

	<body>
		<div class="popup">
			<img
				src="https://avatars0.githubusercontent.com/u/18049757?s=460&u=f9f84bfae70b2a7e7f1277379c0fa220f49cf8d8&v=4"
				alt="github image"
			/>
		</div>
	</body>
</html>
```

![](./images/flex1.png)

- 이 경우 팝업 안의 컨텐츠보다 높이가 작아질 경우 img의 일부가 화면 밖으로 벗어나게 됩니다.

![](./images/flex2.png)

- flex-direction를 column으로 변경하고 안의 컨텐츠에 overflow를 hidden으로 설정합니다.

```html
<!DOCTYPE html>
<html lang="ko-KO">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>flex로 center 정렬</title>
		<style>
			.popup {
				position: fixed;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background: blue;
				flex-direction: column;
			}

			img {
				overflow: hidden;
			}
		</style>
	</head>

	<body>
		<div class="popup">
			<img
				src="https://avatars0.githubusercontent.com/u/18049757?s=460&u=f9f84bfae70b2a7e7f1277379c0fa220f49cf8d8&v=4"
				alt="github image"
			/>
		</div>
	</body>
</html>
```

![](./images/flex3.png)

- 세로에서 발생하던 문제가 가로에서 재현됩니다.

![](./images/flex4.png)

- img의 width를 100%로 설정해주어서 문제를 해결합니다.

```html
<!DOCTYPE html>
<html lang="ko-KO">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>flex로 center 정렬</title>
		<style>
			.popup {
				position: fixed;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background: blue;
				flex-direction: column;
			}

			img {
				overflow: hidden;
				width: 100%;
			}
		</style>
	</head>

	<body>
		<div class="popup">
			<img
				src="https://avatars0.githubusercontent.com/u/18049757?s=460&u=f9f84bfae70b2a7e7f1277379c0fa220f49cf8d8&v=4"
				alt="github image"
			/>
		</div>
	</body>
</html>
```
