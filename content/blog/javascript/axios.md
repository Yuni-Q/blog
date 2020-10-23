---
title: axios
date: 2020-10-23 09:10:44
category: javascript
tags: []
draft: true
---

## interceptors

- 인터셉터는 요청하기 직전, 응답을 받고 then, catch로 처리 직전에 가로챌 수 있습니다.

```javascript
import axios from 'axios';

// axios 인스턴스를 생성합니다.
const instance = axios.create({
	baseURL: 'https://api.yuniq.com',
	timeout: 1000,
});

/*
    1. 요청 인터셉터
    2개의 콜백 함수를 받습니다.
*/
instance.interceptors.request.use(
	function(config) {
		// 요청 성공 직전 호출됩니다.
		// axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
		return config;
	},
	function(error) {
		// 요청 에러 직전 호출됩니다.
		return Promise.reject(error);
	}
);

/*
    2. 응답 인터셉터
    2개의 콜백 함수를 받습니다.
*/
instance.interceptors.response.use(
	function(response) {
		/*
        http status가 200인 경우
        응답 성공 직전 호출됩니다. 
        .then() 으로 이어집니다.
    */
		return response;
	},

	function(error) {
		/*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.    
    */
		return Promise.reject(error);
	}
);
```

## 참고

- [axios 인터셉터로 API 관리하기](https://velog.io/@skyepodium/axios-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0%EB%A1%9C-API-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)
