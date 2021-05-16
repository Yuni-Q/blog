---
title: FC만을 사용한 프로젝트 후기
date: 2021-05-10 15:05:07
category: react
tags: []
draft: true
marp: true
---

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

## Presentational and Container Components

- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

```
Update from 2019: I wrote this article a long time ago and my views have since evolved. In particular, I don’t suggest splitting your components like this anymore. If you find it natural in your codebase, this pattern can be handy. But I’ve seen it enforced without any necessity and with almost dogmatic fervor far too many times. The main reason I found it useful was because it let me separate complex stateful logic from other aspects of the component. Hooks let me do the same thing without an arbitrary division. This text is left intact for historical reasons but don’t take it too seriously.
```
