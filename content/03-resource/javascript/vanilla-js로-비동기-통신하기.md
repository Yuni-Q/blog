---
title: vanilla js로 비동기 통신하기
date: 2020-07-29 09:07:15
category: javascript
draft: true
---

```javascript
const xhr = new XMLHttpRequest();
const formDate = new FormData();
formDate.append('name', 'zerocho');
formDate.append('birth', 1994);
xhr.onreadystatechange = function() {
	if (xhr.readyState === xhr.DONE) {
		if (xhr.status === 200 || xhr.status === 201) {
			console.log(xhr.responseText);
		} else {
			console.error(xhr.responseText);
		}
	}
};
xhr.open('POST', 'https://www.yuni-q.com/api/formdata');
xhr.send(formDate);
```
