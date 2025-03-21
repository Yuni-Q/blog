---
title: Node javascript에서 typescript로 바꾸기
date: 2020-02-22 11:02:44
category: typescript
draft: false
---

## tsconfig 파일 작성

```
{
  "compilerOptions": {
    "target": "es2016",
    "lib": ["es2016"],
    "outDir": "dist",
    "typeRoots": ["./node_modules/@types"],
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "allowSyntheticDefaultImports": true,
    "allowJs": true
  },
  "exclude": ["node_modules"]
}
```

- esModuleInterop을 설정하지 않고 module.exports와 export default를 다르게 import 한다.
  - module.exports `import * as`를 사용해서 import 해야한다.

## scripts 작성

```
"scripts": {
    "start": "NODE_ENV=test env TZ='Asia/Seoul' nodemon --watch ./ --delay 1 --exec 'ts-node' ./bin/www.ts",
    "build:tsc": "rm -rf ./dist && tsc ",
    "deploy:ts": "git pull origin dev && npm install && pm2 kill && env TZ='Asia/Seoul' pm2 start ts-node -- -P tsconfig.json ./bin/www.ts",
    "deploy": "git pull origin dev && npm install && npm run build && pm2 kill && env TZ='Asia/Seoul' pm2 start ecosystem.config.js"
  }
```

## webpack 적용

```javascript
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './bin/www.ts',
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist/bin'),
		filename: 'www.js',
	},
	resolve: {
		extensions: ['.ts', '.js', 'json'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
				exclude: ['/node_modules/'],
			},
		],
	},
	node: {
		__dirname: false,
	},
	externals: [nodeExternals()],
	devtool: 'source-map',
	plugins: [new CleanWebpackPlugin()],
};
```

- nodeExternals를 사용하지 않으면 웹팩에서 에러가 발생한다. 왜인지는 아직 잘 모르겠다...

## ts 파일로 jest 실행

```json
"jest": {
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testRegex": "\\.test\\.ts$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "json"
    ],
    "globals": {
      "ts-jest": {
        "diagnostics": true
      }
    }
  }
```

## sequilze-cli가 만들어준 index 파일 수정

```typescript
import * as Sequelize from 'sequelize';
import answer from './answer';
import file from './file';
import mission from './mission';
import user from './user';
import configDate from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = configDate[env];
const db = {} as any;

const options =
	process.env.NODE_ENV === 'test'
		? {
				username: 'root',
				password: 'root',
				storage: ':memory:',
				host: 'localhost',
				dialect: 'sqlite',
				operatorsAliases: false,
				logging: false,
		  }
		: {
				host: config.host,
				dialect: 'mysql',
				timezone: '+09:00',
				operatorsAliases: false,
				define: {
					timestamps: true,
				},
				dialectOptions: {
					dateStrings: true,
					typeCast: true,
				},
				pool: {
					min: 0,
					max: 10,
					idle: 10000,
					acquire: 10000,
				},
				logging: false,
		  };

// let sequelize;
// if (config.use_env_variable) {
// sequelize = new Sequelize(process.env[config.use_env_variable], config.options);
// } else {
const sequelize: any = new Sequelize(
	config.database,
	config.username,
	config.password,
	options
);
// }

db.answers = answer(sequelize, Sequelize);
db.files = file(sequelize, Sequelize);
db.missions = mission(sequelize, Sequelize);
db.users = user(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
```

- fs를 쓰면 실행 시에는 가져가지만 webpack이 동작하는 순간에는 가져가지 않는다.

## process 사용하기

- @types/node 설치

## 같이 볼 만한 글

- [Monolithic 서버사이드 타입스크립트 세팅 01](https://changhoi.github.io/posts/etc/serverside-typescript-setting-01/)
