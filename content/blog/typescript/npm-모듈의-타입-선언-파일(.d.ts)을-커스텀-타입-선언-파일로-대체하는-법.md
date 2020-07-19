---
title: npm 모듈의 타입 선언 파일(.d.ts)을 커스텀 타입 선언 파일로 대체하는 법
date: 2020-03-26 20:03:31
category: typescript
draft: true
---

## 원본 .d.ts 파일이 node_modules 아래에 있을 경우

```json
// tsconfig.json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": [{ "moduleA": "./src/@types/myDeclaration.d.ts" }]
	}
}
```

1. 컴파일러는 src/index.ts에서 non-relative module import구문을 발견하여 moduleA모듈에 대한 타입 선언 파일을 탐색하기 시작합니다.
2. compilerOptions.path에 moduleA에 대한 경로 설정이 존재하므로 해당 경로를 우선 탐색합니다.
3. 경로에서 .d.ts파일을 찾았으므로 탐색을 종료하고, myDeclaration.d.ts파일 내의 모듈 타입 선언을 앰비언트 모듈 선언 목록에 추가합니다.

### 원본 .d.ts 파일이 node_modules/@types 아래에 있을 경우

```json
// tsconfig.json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": [{ "moduleB": "./src/@types/myDeclaration.d.ts" }],
		"types": [] // 빈 배열을 적용한다
	}
}
```

1. compilerOptions.types에 값이 지정되었으므로, node_modules/@types디렉토리 내의 모듈에 대한 자동 포함이 동작하지 않습니다.
2. 이 다음은 moduleA를 불러올 때와 동일하게 동작합니다.

- 만일 types에 값이 지정되지 않는다면 node_modules/@types 아래의 moduleB에 대한 타입 선언이 자동으로 포함되어 중복 선언 컴파일 에러가 발생할 것입니다.
