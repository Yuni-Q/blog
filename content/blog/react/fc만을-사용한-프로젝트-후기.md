---
title: FC만을 사용한 프로젝트 후기
date: 2021-05-10 15:05:07
category: react
tags: []
draft: true
marp: true
---

# 배사광 리뉴얼 프로젝트

---

- Function Component와 hooks를 활용한 프로젝트 진행하였습니다.
- 주요 라이브러리 : swr, styled-components, dayjs, mobx, react-hooks-form, react-slick
- eslint와 prettier를 적극 활용합니다.

---

## GIT FLOW

---

### master

- 실제 운영환경에 배포된, 버전들의 발자취입니다.
- 이 브랜치는 절대 force push하거나 직접 push하지 않습니다.
- master로의 머지가 진행된 이후에, 이번 배포때 나갈 버전에 대해서 태깅을 진행합니다.
- production 배포는 merge 된 master로 합니다.
- 제거되지 않는 유일한 브랜치입니다.

---

### deploy

- 특정 배포를 위한, 루트 브랜치 입니다. 코드리뷰를 위한 MR은 feature 브랜치에서 deploy 브랜치로 MR을 요청합니다.
- 이 브랜치에서 beta, staging에 대한 QA를 검증하고, QA에 대한 처리도 feature → deploy로의 MR을 통해서 진행합니다.
- staging까지 검증이 끝났고, production에 대해서 배포하기 전에, package.json에 이번에 나갈 버전을 명시해주는 커밋 & 푸쉬를 진행하고, deploy → master로의 MR을 요청해서, master로 머지를 진행합니다.
- beta, staging에 활용합니다.
- 형식은 deploy/20210510과 같은 형식으로 진행하며 merge 후엔 제거됩니다.
- 요구 사항에 따라 n개의 deploy 브랜치가 존재할 수 있습니다.

---

### feature

- 기능, 버그, 등 JIRA 티켓에 매칭되는, 혹은 특정 기능에 해당하는 단위를 나타내는 브랜치 입니다.
- 보통, deploy 브랜치를 부모로 둔 자식 브랜치로, 기능 구현을 위한 커밋 진행 후에, 코드 리뷰를 위해서 deploy 브랜치로 MR을 요청합니다.

---

### hotfix

- 운영 배포까지 나갔지만, 급하게 버그를 수정해서 배포해야하는 경우에 master에서 hotfix 브랜치를 사용합니다.
- hotfix 브랜치를 root로 feature 브랜치를 생성해서, 버그를 수정하고, 수정에 대한 커밋을 push해서, hotfix 브랜치로 MR을 보내어 코드리뷰를 진행합니다.
- QA는 이 hotfix 브랜치를 기준으로 진행하고, beta, staging에 대한 검증 & 배포가 끝난 다음에는 기존의 deploy 브랜치처럼, package.json에 다음 나갈 버전을 명시하해주는 커밋 & 푸쉬를 진행하고, hotfix → master로의 MR을 요청해서, master로 머지를 진행합니다.
- hotfix 사항에 대한 beta, staging에 대한 배포는 hotfix 브랜치를 활용하고 production 배포는 master에 merge 후 master를 통해 배포합니다.

---

### merge 전력

- rebase merge를 기본으로 합니다.
- rebase 시에 husky를 통해 pull을 받을 것을 강제하려고 했으나 원하는 순간에 skip이 불가능하여 강제하지는 못했습니다. rebase 후에 hard push 시에 remote에 있는 커밋을 놓칠 염려가 있습니다.
- revert와 같은 일을 위해 mr 단위별로 묶여있길 바라기 때문에 merge 커밋을 생성합니다.
- 필요시 squash merge를 사용해도 됩니다.
- 배포 시 최신 master가 base가 아닐 경우 배포에 실패합니다.

---

#### 배포 실패를 위한 코드

```shell
master=$(git rev-parse remotes/origin/master)
target=$(git merge-base remotes/origin/master remotes/origin/${BRANCH_NAME})

echo ${master}
echo ${target}

if [ "${master}" != "${target}" ]; then
   echo "master commit & ${BRANCH_NAME} common ancestor commit is not same"
   echo "리베이스가 되지 않아 실패하였습니다"
   exit -1
fi
```

---

## mobx가 있는데 swr을 쓴 이유

- 데이터를 가져오기 위한 React Hook 라이브러리입니다.
- 원격상태의 데이터를 내부적으로 캐시하고 다른 컴포넌트에서 동일한 상태를 사용하고자 할 경우 이전에 캐시했던 상태를 그대로 리턴해 주기 때문에 서로 다른 컴포넌트가 동일한 상태를 공유할 수 있습니다.
- User Focus, Network Reconnect, 탭 전환, 절전 모드 해제 시 자동으로 revalidate 합니다.

---

### 장점

- 상태와 변이방법을 정의하기 위한 리듀서와 액션의 코딩량이 적습니다.
- 효과적으로 상태를 초기화하기 위한 고민이 적습니다.
- 지속적으로 로컬 스토어 상태를 원격 서버 상태와 동기화해야 하는 추가 작업이 가능합니다.

---

## swr 활용처

---

### mobx와 swr의 역할을 구분합니다.

- 조회성 api의 경우 swr을 활용합니다.
- method 여부는 중요하지 않습니다.

---

### 훅을 최대한 활용하자 !

- props를 줄일 수 있습니다.
- 다른 swr에서 특정 값을 받아와야 하는 경우 swr 안에서 해결합니다.
- 상위에도 사용되는 데이터와 하위에도 사용되는 데이터라면 swr을 이용해서 props가 아닌 훅을 이용해서 해결합니다. swr의 캐싱 기능이 중복 호출을 막아줍니다.

---

#### 다른 swr에서 특정 값을 받아와야 하는 경우 swr 안에서 해결

```ts
const useADStatus = (): ISWR<any> => {
  const { data: userProfile } = sessionAPIHook.useFetchProfile();
  const { data: grade } = membersAPIHook.useFetchMemberGradeInfo();
  const { data: storeOwner } = storeAPIHook.useStoreOwner();
  const { data: shops } = storeAPIHook.useFetchShopsOpen();
  const isLogin = userProfile?.isLogin;
  const shopOwnerNumber = storeOwner?.shopOwnerNumber;
  const url =
    isLogin &&
    +(grade?.memGradeCd || 0) > 1 &&
    shopOwnerNumber &&
    !!shops?.length
      ? `/route/imr/ceo-self-service/owner/${shopOwnerNumber}/imr/search?type=AdContract`
      : null;
  const result = useSWR(url, olsFetcher);
  return {
    ...result,
    data: url ? result.data : null,
  };
};
```

> 객체로 리턴 시 리랜더가 많이 발생할 수 있습니다.

---

### 주기적으로 불러야하는 점검 및 배포 체크

- swr의 `{ refreshInterval: 60 * 1000, revalidateOnFocus: true }` 옵션을 통해 해결했습니다.
  - `revalidateOnFocus: true`는 기본이 `true` 입니다.

---

### 공통적으로 사용해야 하는 컴포넌트에 다른 값을 넘기는 것은 어떻게 해결하지?

- swr의 fetcher에서 같은 형식으로 맞춥니다. fetcher를 어댑터처럼 활용합니다.
  - 코드를 분리해서 사용하지만 fetcher 밖에서 로직을 사용 시 api return 값은 캐싱 되지만 수정된 result는 매번 수행하게 됩니다.

---

## PV log

- Page View는 최상위에서 useEffect 때 호출 후 history.listen을 통해 해결합니다.

```tsx
useEffect(() => {
  const PageLog = (pathName: string) => {
    const query = new URLSearchParams(window.location.search);
    const search = query.toString() ? '?' + query.toString() : '';
    sendPageViewLog(pathName);
    ReactGA.pageview(window.location.pathname + search, [], getTitle(pathName));
  };
  history.listen((location, action) => {
    PageLog(location.pathname);
  });
  PageLog(location.pathname);
}, []);
```

---

## 사파리 캐시를 통한 로그인 후에도 개인정보 노출되는 이슈

- history.listen에서 action이 `POP`이고 특정 페이지(개인정보가 있는)일 경우 컴포넌트를 다시 그리게 합니다.

---

### 예시 코드

```tsx
const Routing = () => {
  const history = useHistory();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    history.listen((location, action) => {
      if (action === 'POP') {
        if (
          location.pathname.startsWith('/reload') ||
          location.pathname === '/'
        ) {
          setReload(true);
        }
      }
    });
  }, []);
  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);
  if (reload) {
    return null;
  }
  return (
    <Switch>
      <Route path="/" component={DefaultRoutes} />
    </Switch>
  );
};
```

---

## 한글 입력 시 자모음 분리되는 현상

- react-hooks-form을 쓰면서 unControl로 input을 컨트롤 하다가 e.currentTarget.value를 직접 수정해야 할 떄 ie에서 자모가 분리되는 현상이 있었습니다.
- 반드시 수정되야 하는 상황에서만 값을 수정하게 변경했습니다.
  > Control 컴포넌트나 useControl을 활용해서 문제를 해결할 수 있을 것 같아 보이기도 하지만 당시에는 이해가 부족해서 아래와 같이 수정하였습니다.

---

## 예시 코드

```tsx
<Input
  name="name"
  register={register}
  onChange={(e) => {
    if (
      /[a-z]/g.test(e.currentTarget.value) ||
      /\s{2,}/g.test(e.currentTarget.value) ||
      e.currentTarget.value.length > 40 ||
      /([^ㄱ-ㅎㅏ-ㅣ가-힣A-Z\s\u318D\u119E\u11A2\u2022\u2025\u00B7\uFE55\u4E10\u3163\u3161])+/gi.test(
        e.currentTarget.value,
      )
    ) {
      e.currentTarget.value = e.currentTarget.value
        .toUpperCase()
        .replace(/ +/g, ' ')
        .replace(
          /([^ㄱ-ㅎㅏ-ㅣ가-힣A-Z\s\u318D\u119E\u11A2\u2022\u2025\u00B7\uFE55\u4E10\u3163\u3161])+/gi,
          '',
        )
        .trimStart()
        .slice(0, 40);
    }
  }}
/>
```

---

## 반복되는 디자인 요소를 항상 만들 것인가?

- styled components의 사용으로 인해 css파일과 scss파일은 최대한 생성하지 않습니다.
- styled-components와 함께 className도 사용할 수 있기 때문에 클래스는 전역적으로 사용되는 스타일을 입히는 용도로 사용합니다.
  - 그 외의 className을 사용하지 않는 것을 권장합니다.
  - styled-components 안에서 위계를 가져가지 않을 것을 권장합니다.
- 모바일과 데스크탑에서 사용되는 스타일이 다른 경우 className에서 모바일인지 체크하지 않고 전역 스타일에서 모바일일 경우 덮어쓰는 형식으로 해결합니다.

---

### 예외는 늘 있지만 적었으면 좋겠어요...

- 컴포넌트를 제외한 간격의 경우는 8배수를 기본으로 하고 4, 12, 20만 예외로 사용할 수 있게 합니다.
  - 이는 className으로 설정합니다. 이외의 간격은 예외사항으로 생각하지만 컴포넌트 이외에는 예외를 지양하도록 합니다.
- 컬러값도 별도의 파일에서만 관리하고 color를 피그마 컬레네임과 매칭 시킨 후 사용합니다. 역시 이 외의 컬러값은 예외로 간주하지만 최대한 사용하지 않는 것으로 합니다.
- icon의 경우 color와 크기 조절이 용이하도록 web-font로 만들어서 i 태그 className을 활용해서 사용합니다. 정해진 규격을 코드화 해서 디자이너와 소통 시 오해가 없도록 합니다.

---

## 말줄임

- `webkit-line-clamp` 속성을 사용하지만 IE에서 동작하지 않아서 코드를 조금 더 추가해서 사용합니다. 하지만 2줄 이상의 말줄임의 경우 IE에서 동작하지 않습니다.
  - `text-overflow: ellipsis`만 적용 시에는 width가 없는 경우 정상적으로 동작하지 않을 수 있습니다.

---

### 에시 코드

```css
_:-ms-fullscreen,
:root .text-ellipsis {
  white-space: nowrap;
}

.text-ellipsis {
  white-space: normal;
  line-height: 1.4;
  height: 1.4em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
}
```

---

#### 여러줄 말줄임은 아직도 해결 방법이...

```css
.text-ellipsis-2 {
  max-height: 2.86em;
  line-height: 1.4;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 아이콘 가로 세로 비율이 어긋남

- 아이콘을 웹폰트로 사용하기 때문에 가로 세로가 1:1로 나타나지 않는 이슈가 있습니다.
- 아래와 같은 코드를 최상위에 추가해서 해결 합니다.

```css
.icon-font {
  display: inline-block;
  line-height: 1em !important;
  ::before {
    display: inline-block !important;
    width: 1em !important;
    line-height: 1em !important;
  }
}
```

---

## react-slick이 모바일에서 롤링 시간 초기화가 되지 않던 이슈

- `swipe` 시 ref를 통해 `slickPause` 후 `slickPlay`를 해서 시간을 초기화 시킵니다.
  - 데스크탑에서는 잘 작동합니다...

```tsx
onSwipe: () => {
      const ref = sliderRef.current
      if (ref) {
        const sliderRef = ref as Slider
        const XXX = sliderRef.slickPause()
        const XXX2 = sliderRef.slickPlay()
      }
    },
```

---

## 다이얼 로그에 id 추가

---

## webpack5에서는 hot reload

---

### 프로젝트 초기에 적용되다가 중간에 적용이 멈췄던 문제

- webpack 설정에서 `target: 'web'` 추가로 해결했습니다.

---

### `mode`에 따른 에러

- webpack 설정에 `mode: develop`가 아닌 경우가 에러가 발생합니다.

---

#### babel.config.js

```js
module.exports = {
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/transform-runtime',
    process.env.REACT_REFRESH && require.resolve('react-refresh/babel'),
  ].filter(Boolean),
};
```

---

#### webpack.js

```js
module.exports = {
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    process.env.REACT_REFRESH && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
```

---

## ie 이슈

---

### ie에서 max-width

- max-width 부재 시 label text가 줄바꿈되지 않고 오른쪽 화살표가 범위 밖으로 벗어나게 됩니다.
- ie11에서 max-width가 동작하지 않습니다.
  - position: absolute; left: 0;으로 해결했습니다.

---

### ie11 text-align

- start와 end 값이 동작하지 않아서 left와 right를 사용합니다.

---

### ie11 flex 축약형

#### 일반적인 축양형

```css
# 아무것도 안쓰면;
flex: 0 1 auto;

# flex: 1;
flex: 1 1 0%;

# flex: auto;
flex: 1 1 auto;

# flex: initial;
flex: 0 1 auto
```

---

#### ie11에서 축약형

```css
# 아무것도 안쓰면;
flex: 0 0 auto;

# flex: 1;
flex: 1 0 0px;

# flex: auto;
flex: 1 0 auto;

# flex: initial;
flex: 0 0 auto
```

---

### ie11에서 web font 로딩되지 않음(cdn에서 리소스 캐쉬문제)

- cdn 캐쉬에서 리소스(이미지, 폰트 등)는 no-cache 설정하면 ie에서 새로고침 시 제대로 로딩되지 않아서 no-cache 설정 시 별도로 처리해야 합니다.
  - spa의 경우 페이지 이동 후 부터는 정상 동작합니다.

---

### 남은 공간 차지하기

- flex-grow 속성이 있어도 기본 width, height가 없다면 영역을 차지하지 못할 수 있습니다.

---

## TODO

- Click Log를 각 onClick 함수에서 처리하고 있는데 컴포넌트 레벨로 올려서 log 객체를 넘기면 클릭 시 로그가 전송될 수 있게 수정해야 합니다.
- Dialog를 Component로 만들 때 id를 놓치지 않고 넣을 수 있는 방법
- react-hooks-form
- 라이브러리 래핑
- react-hook-form v.6 → v.7 버전업
- storybook 추가
- test 코드 추가(e2e도)

---

## 고민 해 볼 것들

- function component의 hooks는 class component를 대체할 수 있는가?
  - 상속 구조를 가져가는 것이 합성보다 좋은가?
  - 함께 쓴다면 역할을 어떻게 나눠야 할까?
  - 새로 만드는 컴포넌트를 class로 만들 것인가?

---

### Presentational and Container Components

- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

```
2019 년 업데이트 :이 기사를 오래 전에 썼고 그 이후로 내 견해가 발전했습니다. 특히 더 이상 이렇게 구성 요소를 분할하지 않는 것이 좋습니다. 코드베이스에서 자연스럽게 발견되면이 패턴이 유용 할 수 있습니다. 그러나 나는 그것이 필요하지 않고 거의 독단적 인 열정으로 너무 많이 시행되는 것을 보았습니다. 내가 유용하다고 생각한 주된 이유는 복잡한 상태 논리를 구성 요소의 다른 측면과 분리 할 수 ​​있기 때문입니다. 후크를 사용하면 임의의 분할없이 동일한 작업을 수행 할 수 있습니다. 이 텍스트는 역사적 이유로 그대로 남아 있지만 너무 심각하게 받아들이지는 마십시오.
```

---

## mobx ie11 노출을 위한 proxy 설정

- mobx v.6에서 IE지원을 위해서는 proxy를 사용하지 않게 해주어야 함.

```tsx
import { configure } from "mobx"

configure({ useProxies: "never" })
```

- 그런데, 이 설정이 하나의 store에만 하면 되는게 아니라, 모든 store의 파일에 들어가서 해줘야 했다. 그렇지 않으면 동작을 안해서, 이렇게 해결...
더 나은 방법이 있을지도 모르겠는데 아직은 못찾았습니다.

---

## styled-components GTM을 위한 className 노출

- GTM에서 특정 element를 선택하기 위해서, 클래스 이름을 쓰기도 하는데, styhled-components를 사용하면, 클래스 이름이 난독화되기도 하고, 빌드 때마다 수정이 되어서 이를 그대로 쓸 수가 없었습니다.
- 따라서, 앞에 컴포넌트의 이름을 Prefix로 붙여주는 방식을 사용해서, querySelector로 특정 element를 선택할 수 있게 하였습니다.

---

### example

```
<span type="default" class="Badge-sc-1be4xex-0 ecJszz">서비스 안내</span>

<div class="Notice__NoticesWrapper-iq027b-2 gQGvGE mt-2 p-3 px-sm-2"></div>
```

---


## history back

## react-hooks-form onBlur focus

---

## 리팩토링

---

### warning message 제거

- 개발자 도구에서 Console 탭에 뜨는 수많은 warning들 중 일부를 제거했습니다.
- warning의 경우 error와는 다르게 기능의 장애를 일으키지 않지만 잠재적인 문제를 안고 있기 때문에 제거하였습니다.

---

### url에 한글이 있어도 되는가

- 주소창(uri)에 Query 부분에 한글이 있을 경우 코드로 이동 시에는 무방하지만 IE에서 이를 복사하여 주소창에 붙여넣기 할 경우 올바르기 동작하지 않습니다.
- 이를 encodeURIComponent해서 url에 사용하고 decodeURIComponent를 사용하여 해결했습니다. IE 경우에는 이상한 문자(?)로 보일 수 있습니다.
- uri에는 영어만 사용할 것을 고민해 보는 것도 좋을거 같습니다.(백오피스 개편과 함께 변화될 것으로 기대합니다)

---

### 마우스가 cursor로 바뀌지 않음

- 클릭 가능한 영역에 마우스를 올리면 마우스가 손가락 모양으로 바뀌어야 하는데 클릭 영역임에도 마우스의 모양이 바뀌지 않는 경우가 있었습니다. 이를 사용자 친화적인 관점에서 손가락으로 표시되게 수정했습니다.
- 하지만 button이나 a 태그가 아닌 곳에서도 손가락으로 바뀌는게 좋은지에 대한 고민은 필요할거 같습니다.

---

### 중복적인 로그

- PV로그를 페이지 단위로 분리해 뒀었는데 사파리 캐시로 인해 개인정보 보호에 문제가 생겨 페이지를 새로그리는(새로고침과는 다릅니다) 과정에서 로그가 2번 이상 찍히는 이슈가 있었습니다.
- PV 로그를 전송하는 부분을 새로그리는 로직보다 상위에서 한번에 관리하는 것으로 수정했습니다.
- 새로그리는 방법을 수정해서 각 페이지로 로그를 찍는 코드를 옮기는 것도 고려해 보아야 합니다.

---

### 공통 코드 분리하기

- 가장 대표적인 사례는 실시간 상담 다이얼로그 처럼 다른 곳에서 쓰는 같은 부분들의 코드가 각각 관리되고 있었습니다.
- 이를 하나로 통합하고 이 과정에서 다이얼로그 관련 된 코드도 함께 정리했습니다.
- 이 과정에서 id를 주어야 하는데 주지 않는 경우가 있어서 특정 다이얼로그를 연속으로 띄울 경우 정상적으로 동작하지 않는 이슈가 있었습니다.
- 코드로 id를 주지 않을 경우 에러가 나는 방법을 찾고 있습니다.

---

### 배포 시 구분 방식

- javascript 코드는 배포 시에 난독화를 하기 때문에 운영에서 제대로 배포되었는지 확인하기 어렵습니다.
- 이를 위해 배포 날짜를 난독화 최상위에 추가함으로써 누구나 쉽게 확인할 수 있도록 수정했습니다.

---

# 이제부터 좀 더 개발적인 이야기를 하겠습니다.

---

### 개발 시 코드를 고치면 무조건 새로고침 해야만 하나요 ?

- 코드를 수정하면 페이지에서 새로고침을 해야하는데 그렇게 되면 현재 브라우저에서 진행하던 흐름을 잃을 수 있어서 작업하는데 시간이 오래 걸립니다.
- 디자이너분들은 같이 QA 할때 느끼셨을텐데 이 발표를 보지는 않고 계시겠죠...?(잘 지내요...)
- 새로오시는 분은 좋아하실 겁니다 !

---

### 우리는 라이브러리를 올바르게 사용하고 있는가 ?

- 셀프서비스팀 기준으로 봤을 때 새로운 방식으로 프로젝트를 진행하면서 새로운 라이브러리들을 도입하게 되었습니다.
- 동작에는 차이가 없으나 라이브러리를 사용함에 따라 옳바른 사용법(?)이나 사용법을 통일하기 위해 수정을 진행했습니다.
- 라이브러리는 계속 진화하고 저희의 방식이나 요구사항도 계속 변화 할 것이기 때문에 라이브러리의 영향을 적게 받게 코드를 만드는 것이 계속 고민입니다.

---

### 중복적인 상태관리

- 상태관리를 mobx라는 관리자가 해주는데 저희는 이와 더불어 swr이라는 관리자도 함께 두게 되었습니다.
- 하지만 mobx가 더 많은 역할을 할 수 있어서 swr 관리자의 상위 관리자처럼 존재하게 되어 불필요한 관리 포인트 증가와 swr이 올바르게 역할을 하지 못하게 되었습니다.
- 이에 따라 각각의 역할을 분리하고 역할을 재정의 했습니다.

---

### 기타 코드 정리 작업

- 통일성 없는 코드를 통일화 : 각자 스타일이나 선호보다는 동일 방식으로
- 복잡한 코드를 단순화 하기 위한 코드 추가 : 반복되는 스타일의 경우 간단하게 몇자만으로 추가할 수 있도록
- 타입스크립트의 장점을 활용하기 위한 타입 정의 : 없어도 되지만 유지보수 및 타입스크립트를 쓰는 이유
- 리드미(프로젝트 내의 설명) 문서 업데이트 : 지금은 알지만 나중엔 모를 수 있고 새로운 사람을 위해
- 린트룰(코드 스타일 정리를 위한 규칙) 추가 : 사소한건 논쟁도 없이 컴퓨터가 알아서 하게
- 폴더 구조 개선 및 불필요한 파일 제거 : 세상엔 다양한 방식이 있지만 이 프로젝트에는 하나의 방식이

---

### TODO

- 테스트 코드는 몰래 진행 중인 것으로 알고 있습니다.
- 스토리북도 조금씩 준비를 해서 아마도(?) 가능하다면(?) 추 후에 볼 수 있지 않을까 싶습니다.
