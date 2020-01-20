---
title: 웹팩4(Webpack) 설정하기
date: 2020-01-20 14:01:06
category: javascript
draft: false
---

- 서버 사이드 템플릿 시대를 지나 단일 페이지 애플리케이션(Single Page Application, SPA) 개발이 점차 인기를 얻으면서 자바스크립트의 코드량이 과거에 비해 기하급수적으로 증가하게 되었습니다. 많게는 수천, 수만 줄이나 하는 자바스크립트 코드에서 특정 코드를 찾아 수정하기란 쉽지 않은 일입니다. 그래서, 개발 초기 단계에서 API 기능과 UI 컴포넌트에 맞게 자바스크립트 코드를 분리하게 되었습니다. 하지만, 분리해 놓은 여러개의 자바스크립트 파일들을 한 개씩 따로 불러온다면 웹 페이지 로딩시 속도 저하 문제가 발생할 수 있습니다. 그렇기 때문에 웹팩을 사용하여 수 많은 자바스크립트 파일들을 하나의 js 파일로 번들링하는 작업이 필요하게 되었습니다.
- 웹팩은 파일을 하나로 합치기 위해 사용 합니다. 파일을 합쳐야 하는 이유는 http 요청이 비효율적이기 때문입니다.
- 웹페이지는 수 많은 구성요소로 이루어져 있습니다. 기본적인 html, js, css 파일 외에도, 웹폰트, 이미지, json 데이터 등등 수 많은 파일들을 받아와야 합니다. http2에서는 하나의 커넥션에 동시에 여러 파일들을 요청할 수 있습니다. 하지만 아직 보편화되어있지 않기 때문에 현재 주로 사용하는 http/1.1에서는 커넥션 하나를 열어 하나씩 요청을 보내야합니다. 하나의 요청이 끝나야 다음 요청을 보낼 수 있기 때문에 요청이 많을수록 비효율적입니다.

## 간단한 예제

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlList = ['add', 'book', 'edit', 'index', 'login', 'profile'];

const htmlPlugins = htmlList.map(function(htmlName) {
	return new HtmlWebpackPlugin({
		filename: `${htmlName}.html`,
		template: `./src/${htmlName}.html`,
		hash: true,
		chunks: [`${htmlName}`],
	});
});

module.exports = {
	entry: {
		add: './src/ts/add.ts',
		book: './src/ts/book.ts',
		edit: './src/ts/edit.ts',
		index: './src/ts/index.ts',
		login: './src/ts/login.ts',
		profile: './src/ts/profile.ts',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [].concat(htmlPlugins),
	devServer: {
		historyApiFallback: {
			rewrites: [
				{ from: /\/add/, to: '/add.html' },
				{ from: /\/book/, to: '/book.html' },
				{ from: /\/edit/, to: '/edit.html' },
				{ from: /\/index/, to: '/index.html' },
				{ from: /\/login/, to: '/login.html' },
				{ from: /\/profile/, to: '/profile.html' },
			],
		},
	},
};
```

## mode

- 웹팩4에서 추가되었습니다. mode가 development면 개발용, production이면 배포용입니다. 배포용일 경우에는 알아서 최적화가 적용됩니다. 따라서 기존 최적화플러그인들이 대량으로 호환되지 않습니다.

## entry

- entry 부분이 웹팩이 파일을 읽어들이기 시작하는 부분입니다. app이 객체의 키로 설정되어 있는데 이 부분 이름은 자유롭게 바꾸시면 됩니다. 저 키가 app이면 결과물이 app.js로 나옵니다.

## output

- 결과물이 어떻게 나올지 설정을 해야 합니다.
- path랑 publicPath가 있습니다.

  > path는 output으로 나올 파일이 저장될 경로입니다.

  > publicPath는 파일들이 위치할 서버 상의 경로입니다.

  > filename을 보면. [name].js라고 되어 있는데요. 이렇게 써줘야 [name]에 아까 entry의 app이 들어가 app.js로 결과물이 나옵니다.

- 다른 옵션으로는 [hash]나 [chunkhash]가 있습니다.

  > [hash]는 매번 웹팩 컴파일 시 랜덤한 문자열을 붙여줍니다. 따라서 캐시 삭제 시 유용합니다. [hash]가 컴파일할 때마다 랜덤 문자열을 붙여줍니다.

  > [chunkhash]는 파일이 달라질 때에만 랜덤 값이 바뀝니다. 이것을 사용하면 변경되지 않은 파일들은 계속 캐싱하고 변경된 파일만 새로 불러올 수 있습니다.

## loader

- 보통 웹팩을 사용하면 babel을 주로 같이 사용합니다. ES2015 이상의 문법들은 IE같은 구형 브라우저랑 호환시키기 위함인데요. 또는 jsx같은 react 문법을 컴파일하려고 하는 목적도 있습니다.

## plugin

- 플러그인은 약간 부가적인 기능입니다. 다양한 플러그인들이 나와있는데 이를 사용하면 효과적으로 번들링을 할 수 있습니다. 예를 들면 압축을 한다거나, 핫리로딩을 한다거나, 파일을 복사하는 등의 부수적인 작업을 할 수 있습니다.

## optimization

- 웹팩4에서 최적화 관련 플러그인들이 모두 이쪽 속성으로 통합되었습니다.

## 참조

- [웹팩4(Webpack) 설정하기](https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d)
- [웹팩 입문: 1. HTML, CSS 사용하기](https://medium.com/@shlee1353/%EC%9B%B9%ED%8C%A9-%EC%9E%85%EB%AC%B8-%EA%B0%80%EC%9D%B4%EB%93%9C%ED%8E%B8-html-css-%EC%82%AC%EC%9A%A9%EA%B8%B0-75d9fb6062e6)
