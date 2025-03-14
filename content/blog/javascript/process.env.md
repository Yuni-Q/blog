---
title: process.env
date: 2025-01-14 12:01:83
category: javascript
tags: []
draft: true
---

쉘 변수를 Node.js 파일에서 process.env로 못 불러오는 이유는 Node.js 프로세스가 쉘과 별개의 환경에서 실행되기 때문입니다.

좀 더 자세히 설명드리면,

별도의 프로세스: 쉘에서 Node.js 파일을 실행하면 쉘은 새로운 자식 프로세스를 생성하여 Node.js를 실행합니다. 이 자식 프로세스는 쉘과는 독립적인 환경을 가지며, 쉘의 환경 변수를 자동으로 상속받지 않습니다.

환경 변수 상속: 부모 프로세스의 환경 변수는 자식 프로세스가 생성될 때 복사되어 전달됩니다. 하지만, 자식 프로세스에서 환경 변수를 변경해도 부모 프로세스의 환경 변수에는 영향을 미치지 않습니다. 즉, Node.js 프로세스 내에서 process.env를 수정해도 쉘의 환경 변수는 변경되지 않습니다.

보안: 쉘의 모든 환경 변수를 Node.js 프로세스에 노출하는 것은 보안상 위험할 수 있습니다. 민감한 정보가 포함된 환경 변수가 Node.js 코드에 의해 의도치 않게 접근될 수 있기 때문입니다.

따라서 Node.js에서 쉘 변수를 사용하려면 다음과 같은 방법을 사용해야 합니다.

명시적 전달: 쉘에서 Node.js 파일을 실행할 때 환경 변수를 명시적으로 전달합니다. 예를 들어, MY_VAR=value node my_script.js와 같이 실행하면 my_script.js에서 process.env.MY_VAR를 통해 value에 접근할 수 있습니다.
cross-env 라이브러리 사용: cross-env 라이브러리를 사용하면 윈도우, macOS, Linux 등 다양한 운영체제에서 일관된 방식으로 환경 변수를 설정하고 Node.js 스크립트를 실행할 수 있습니다.
dotenv 라이브러리 사용: .env 파일에 환경 변수를 저장하고 dotenv 라이브러리를 사용하여 Node.js에서 로드할 수 있습니다. 이 방법은 개발 환경에서 환경 변수를 관리하는 데 유용합니다.
이러한 방법들을 통해 Node.js 프로세스에서 쉘 변수를 안전하고 효율적으로 사용할 수 있습니다.

```zsh
- |
      npm run deploy -- \
        --branch=$CI_COMMIT_BRANCH \
        --role=$Role \
        --zone=beta
```

```js
const { role, zone, branch } = argvToObject(process.argv);

export function argvToObject(argv) {
  return Object.fromEntries(
    argv
      .slice(2)
      .filter((v) => v.startsWith('--'))
      .map((v) => {
        const arr = v.slice(2).split('=');
        return arr.length > 2 ? [arr.shift(), arr.join('=')] : arr;
      }),
  );
}
```
