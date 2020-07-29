---
title: RX JS
date: 2020-07-29 09:07:80
category: javascript
draft: true
---

## 영화 받아와서 사이즈 순으로 출력하기

```html
<html lang="ko">
	<head>
		<meta charset="UTF-8" />
		<title>Weather Monitoring in RxJS</title>
	</head>

	<body>
		<div id="app-container">
			<div id="form">
				<label>Zip Code:</label>
				<input type="text" id="zipcode-input" />
				<button id="add-location">Add Location</button>
				<p id="movies"></p>
			</div>
		</div>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.1.0/rx.all.min.js"></script>
		<script>
			// our code will go here
			console.log('RxJS included?', !!Rx);
		</script>
		<script>
			const appContainer = document.getElementById('app-container');
			const zipcodeInput = document.getElementById('zipcode-input');
			const addLocationBtn = document.getElementById('add-location');
			const btnClickStream = Rx.Observable.fromEvent(
				addLocationBtn,
				'click'
			).map(() => true);

			const zipInputStream = Rx.Observable.fromEvent(zipcodeInput, 'input').map(
				e => e.target.value
			);

			const zipcodeStream = btnClickStream
				.withLatestFrom(zipInputStream, (click, zip) => zip)
				.distinct();

			const getTemperature = zip =>
				fetch(`https://yts.ag/api/v2/list_movies.json?limit=${zip}`).then(res =>
					res.json()
				);

			const zipTemperatureStreamFactory = zip =>
				Rx.Observable.fromPromise(getTemperature(zip)).map(pre_movies => {
					let movies = pre_movies.data.movies;
					let temp = [];
					let row = {};
					let size;
					let result = [];

					movies.forEach(element => {
						element.torrents.forEach(e => {
							if (e.size.slice(-2, -1) == 'G') {
								size = e.size.slice(0, -2) * 1024;
							} else {
								size = e.size.slice(0, -2) * 1;
							}
							title = element.title;
							quality = e.quality;
							row = { title, quality, size };
							result.push(row);
						});
					});
					result.sort(function(a, b) {
						if (a.size > b.size) {
							return 1;
						}
						if (b.size > a.size) {
							return -1;
						}
						return 0;
					});
					result.forEach(e => {
						e.size = e.size + ' MB';
					});
					return result;
				});

			zipcodeStream.flatMap(zipTemperatureStreamFactory).forEach(e => {
				let text = '';
				console.log(e);
				const zipEle = document.getElementById('movies');
				i = e.forEach(m => {
					text += '<p>' + JSON.stringify(m) + '</p>';
				});
				zipEle.innerHTML = text;
				zipcodeInput.value = '';
			});

			const replayZipsStream = new Rx.ReplaySubject();
			zipcodeStream.subscribe(replayZipsStream);

			Rx.Observable.interval(1)
				.flatMapLatest(() => replayZipsStream)
				.flatMap(zipTemperatureStreamFactory)
				.forEach(e => {
					let text = '';
					console.log(e);
					const zipEle = document.getElementById('movies');
					i = e.forEach(m => {
						text += '<p>' + JSON.stringify(m) + '</p>';
					});
					zipEle.innerHTML = text;
					zipcodeInput.value = '';
				});
		</script>
	</body>
</html>
```
