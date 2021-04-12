---
title: return
date: 2021-04-12 11:04:34
category: shell
tags: []
draft: true
---

- 일반적으로 shell script에서는 우리가 아는 컴퓨터 언어에서의 return 반환값이 없습니다.

## 일반적인 언어처럼 return과 같은 결과를 얻고 싶을 때는 2가지 방법을 사용할 수 있습니다.

### (방법1) echo를 통해서 값 전달 받기

```zsh
#!/bin/bash

get_result_func () {
	test=123456
	# echo 함수를 통해서 결과를 전달
	# return "Result is ${test}"라고 생각하시면 됩니다.
	echo "Result is ${test}"
}

# 다음 아래와 같이 함수 호출의 결과를 변수에 받습니다.
ret_value=$(get_result_func)

echo $ret_value

# $ ./shell_script_practice.sh
# Result is 123456
```

### (방법2) 변수 공유하기

```zsh
#!/bin/bash

ret_value=""

get_result_func () {
	# Do Something
	ret_value="aaaaaaaaa"
}

get_result_func
echo $ret_value

# $ ./shell_script_practice.sh
# aaaaaaaaa
```

---

## 참고

- [\[Shell Script\] 쉘 스크립트 함수나 실행에서 반환값(Return Value) 얻기](https://twpower.github.io/134-how-to-return-shell-scipt-value)
