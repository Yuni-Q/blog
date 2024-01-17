---
title: swr
date: 2021-04-15 11:04:20
category: frontend
tags: []
draft: true
---

- 새로운 프로젝트를 시작하면서 swr을 사용해 보았습니다.
- swr을 mobx와 함께 사용하면서 생각한 것들을 정리하겠습니다.

## SWR은 무엇인가?

- 데이터를 가져오기 위한 React Hook 라이브러리입니다. SWR의 이름은 HTTP RFC 5861에서 사용되는 HTTP 캐시 무효화 전략인 stale-while-revalidate에서 가져왔습니다. SWR의 전략은 캐싱된 데이터가 있으면 먼저 가져오며, 서버 데이터 가져온 후 마지막으로 최신의 데이터를 업데이트 합니다.
- SWR은 Next.js 로 유명한 vercel 에서 만든 원격데이터 fetch 를 위한 커스텀 훅 npm 모듈입니다.
  - SWR은 원격서버의 상태를 가져와서 리액트 컴포넌트에 꽂아주는 기능을 제공합니다.
- useSWR 은 첫번째 인자로 원격상태에 대한 key 를, 두번째 인자로 데이터 fetch 함수를 받습니다.
- 첫번째 인자는 두번째 fetch 함수의 첫번째 인자로 전달됩니다.
- fetch 함수가 데이터를 로드하면 해당 응답이 data 로 세팅되고 오류 발생시 해당 오류가 error 에 세팅됩니다.
- 컴포넌트에서는 data 와 error 상태에 따라 알맞게 결과를 렌더링 해주면 됩니다.
- 좋은 기능으로 아래 상황에서 자동으로 revalidate 합니다.
  - User Focus
  - Network Reconnect
  - 탭 전환
  - 절전 모드 해제

> useSWR은 한번 fetch 한 원격상태의 데이터를 내부적으로 캐시하고 다른 컴포넌트에서 동일한 상태를 사용하고자 할 경우 이전에 캐시했던 상태를 그대로 리턴해 주기 때문에 서로 다른 컴포넌트가 동일한 상태를 공유할 수 있다는 점입니다.

## 특징

- Lightweight
- Backend Agnostic
- Realtime
- Jamstack Oriented
- TypeScript Ready
- Remote + Local

## SWR이 해결하는 문제

- SWR은 원격상태와 로컬상태를 하나로 통합합니다.
- SWR은 해당 데이터를 마치 원격상태와 연결된 데이터 스트림으로서 바라볼 수 있도록 데이터 fetching 단계를 추상화합니다.
- SWR 이 내부적으로 적절한 타이밍에 지속적으로 데이터를 폴링합니다.
- useSWRHook를 해당 데이터가 필요한 컴포넌트에 바인딩합니다. 이렇게 되면 상위 컴포넌트가 데이터를 가지면서, 전달에 신경 쓸 필요가 없습니다. 쉽게 말하면 컴포넌트가 필요로 하는 데이터를 필요한 곳에 바인딩하는 것입니다. Container 컴포넌트는 사용하지 않아도 됩니다.
- SWR 키를 사용하면, 요청에 대해 자동으로 중복제거, 캐시, 공유되어 API 요청이 하나만으로 가능합니다.
- 자동으로 revalidate 합니다.
  - User Focus
  - Network Reconnect
  - 탭 전환
  - 절전 모드 해제
- 컴포넌트 단위의 개발에 집중

## 추가적인 기술

- 사용자가 사용자 정보를 수정할 경우에는 SWR 의 내부 스케쥴링에 의한 데이터갱신을 기다리기 보다 수정 즉시 화면에 변경된 데이터가 보여져야 할 것입니다. 이럴 경우에는 mutate 함수를 이용할 수 있습니다. mutate 함수가 호출되면 해당 상태를 즉시 다시 fetch 하고 데이터를 갱신합니다.
  - 첫번재 인자로 갱신할 데이터, 두번째 인자로 데이터 fetch 여부를 인자로 받습니다.
  - 단순히 값을 새로 불러와야 한다면 revalidate도 좋은 선택지 입니다.

```tsx
import useSWR, { mutate } from 'swr';

function Profile() {
  const { data } = useSWR('/api/user', fetcher);

  return (
    <div>
      <h1>My name is {data.name}.</h1>
      <button
        onClick={async () => {
          const newName = data.name.toUpperCase();

          // 로컬 데이터를 바로 업데이트한다. 대신 3번째 인자를 false로 두어 재요청을 하지 않는다.
          mutate('/api/user', { ...data, name: newName }, false);

          // 데이터를 업데이트하는 요청을 한다.
          await requestUpdateUsername(newName);

          // 재요청을 한다.
          mutate('/api/user');
        }}
      >
        Uppercase my name!
      </button>
    </div>
  );
}
```

## only 로컬상태 관리만 필요하다면?

- 로컬 환경의 원격상태?는 필요에 따라 window, sessionStorage, localStorage, 클로져 변수 등을 적절하게 사용하실 수 있습니다.

```tsx
import useSWR from 'swr';

function useCounter() {
  const { data, mutate } = useSWR('state', () => window.count);
  return {
    data,
    mutate: (count) => {
      window.count = count;
      return mutate();
    },
  };
}

function Counter() {
  const { data, mutate } = useCounter();

  const handleInc = () => mutate(data + 1);
  const handleDec = () => mutate(data - 1);

  return (
    <div>
      <span>count: {data}</span>
      <button onClick={handleInc}>inc</button>
      <button onClick={handleDec}>dec</button>
    </div>
  );
}
```

## swr은 hook이니까 if문 안에 있을 수 없다.

### 그러면 상위 컴포넌트에서 if문 처리를 해야하는 것으로 인식했었습니다.

```tsx
const App = () => {
  const isTrue = true;
  return <>{isTrue && <SwrComponent />}</>;
};

const SwrComponent = () => {
  const { data } = useSwr('url', (url) => {
    return fetch(url).then((res) => res.json());
  });
  return <div>{data}</div>;
};
```

### swr에서 삼항 연산자를 통해 해결할 수 있습니다.

```tsx
const SwrComponent = () => {
  const isTrue = true;
  const { data } = useSwr(isTrue ? 'url' : null, (url) => {
    return fetch(url).then((res) => res.json());
  });
  return <div>{data}</div>;
};
```

### url을 null로 사용 시 문제점

- url이 null이 되면 결과가 늘 undefined이기 때문에 url이 null인 경우는 api 요청 중이 아니기 때문에 값을 지정해 주어야 합니다.
- 분리해서 사용할 경우 객체로 값을 넘기면 리랜더가 많이 되는 이슈가 있기 때문에 null을 사용하는 것이 좋아 보입니다.

```tsx
const SwrComponent = () => {
  const isTrue = true;
  const { data } = useSwr(isTrue ? 'url' : null, (url) => {
    return fetch(url).then((res) => res.json());
  });
  const myData = url ? data : null;
  return <div>{myData}</div>;
};
```

## swr이 redux에 비해 가지는 장점

- 상태와 변이방법을 정의하기 위한 리듀서와 액션의 코딩량이 적습니다.
- 효과적으로 상태를 초기화하기 위한 고민이 적습니다.
- 지속적으로 로컬 스토어 상태를 원격 서버 상태와 동기화해야 하는 추가 작업이 가능합니다.

## swr에서 api 받아온 후 추가 로직을 어디서 처리할지

- 함수로 뺴서 처리한다면 함수 아래에서 처리해서 fetcher를 공유할 수 있습니다. 하지만 함수 아래에서 처리하는 로직은 api가 캐시 되더라도 캐시 되지 않기 때문에 fetcher에서 처리합니다.

## swr은 get 요청이 아니라 조회성이라면 method를 가리지 않습니다.

## 단점

- Fetching 이외의 수정, 삭제는 따로 개발해서 사용해야한다.

## swr을 잘 사용하기 위한 도전 중 ...

```ts
import QueryString from 'qs';
import useSWR, { SWRResponse } from 'swr';

import { UserInfo } from 'utils/UserInfo';

import { API } from './API';

const defaultApi = new API('');

interface Factory<RES, T, ERROR, K> {
  prefix?: API;
  onSuccess?: (res: RES | undefined) => T | RES | null;
  onFailure?: (error: ERROR) => K;
}

export const fetcherFactory = <
  RES,
  T = Record<string, any> | null | RES,
  ERROR = string,
  K = void,
>({
  prefix,
  onSuccess,
  onFailure,
}: Factory<RES, T, ERROR, K>) => {
  const api = prefix || defaultApi;
  return (url: string) => {
    return api
      .get(url)
      .then((res: RES): T | RES | null => {
        if (onSuccess) {
          return onSuccess(res);
        }
        return res || null;
      })
      .catch((error: ERROR): K | void => {
        if (onFailure) {
          return onFailure(error);
        }
        // TODO : TOAST 필요하지 않을까?
        console.log('error', error);
      });
  };
};

const defaultFetcher = fetcherFactory({ prefix: defaultApi });

export type APIResponse<T> = () => SWRResponseWrapper<T>;

export type APIResponseWithParams<T, P = unknown> = (
  params: P,
) => SWRResponseWrapper<T>;

type SWRResponseWrapper<T, E = unknown> = SWRResponse<T, E>;

export const useCommonSWR = <Data, Error = unknown>(
  url: string | null,
  data?: Record<string, string>,
  fetcher?: (url: string, prefix?: API<{}> | undefined) => Promise<any>,
): SWRResponseWrapper<Data, Error> => {
  // QueryString
  if (!!url && data && typeof data !== 'string') {
    url += (url.match(/\?/) ? '&' : '?') + QueryString.stringify(data);
  }
  return useSWR(url, fetcher || defaultFetcher, {
    revalidateOnFocus: false,
    suspense: true,
  });
};

export const NonMemberExceptionHandling = (url: string): string | null => {
  return !UserInfo.memberNumber || UserInfo.memberNumber === '000000000000'
    ? null
    : url;
};
```

## react query

- 라이브러리 사용량이나 기능적인 면에서 우세한 것 같아 react query를 사용해 보기로 함.
- useMutation으로 사용자 인터렉션과 관련 된 api도 하나의 방향으로 해결이 가능해 보임.
- React Query는 React Application에서 서버의 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트하는 작업을 도와주는 라이브러리입니다.
- 복잡하고 장황한 코드가 필요한 다른 데이터 불러오기 방식과 달리 React Component 내부에서 간단하고 직관적으로 API를 사용 할 수 있습니다.
- 더 나아가 React Query에서 제공하는 캐싱, Window Focus Refetching 등 다양한 기능을 활용하여 API 요청과 관련된 번잡한 작업 없이 `핵심 로직`에 집중할 수 있습니다.

### 커스텀 hook을 만들어서 사용

- API 별로 Custom Hook을 만들어서 사용하면 API를 손 쉽게 체계적으로 관리할 수 있습니다.
- 직관적으로 API 사용 가능 : API 별로 Custom Hook이 나누어져 있어 직관적으로 API를 사용할 수 있습니다.
- API 전처리/후처리 가능 : API 별로 Custom Hook 내부에서 API 전처리, 후처리 하여 간결하고 이해하기 쉬운 Component 작성 가능
- 휴먼 에러 방지 : Query Key가 Custom Hook 레벨에서 적용되기 때문에 캐싱 드 작업에서 휴먼 에러 방지 가능
- API 특성에 맞는 Option 설정 가능 : API 특성별로 캐싱 등 React Query Option 설정 가능
- API 연관 관계 처리 용이 : 여러 API가 연관되는 관계를 갖는 경우 용이하게 처리 가능

### 사용중인 코드

```ts
import QueryString from 'qs';
import { QueryFunctionContext, useQuery, UseQueryResult } from 'react-query';

import { UserInfo } from 'utils/UserInfo';

import { API } from './API';

const defaultApi = new API(process.env.PAY_PLATFORM_HOST);

interface Factory<RES, T, ERROR, K> {
  prefix?: API;
  onSuccess?: (res: RES | undefined) => T | RES | null;
  onFailure?: (error: ERROR) => K;
}

export const fetcherFactory = <
  RES,
  T = Record<string, any> | null | RES,
  ERROR = string,
  K = void,
>({
  prefix,
  onSuccess,
  onFailure,
}: Factory<RES, T, ERROR, K>) => {
  const api = prefix || defaultApi;
  return (context: QueryFunctionContext) => {
    return api
      .get(context.queryKey[0] as string)
      .then((res: RES): T | RES | null => {
        if (onSuccess) {
          return onSuccess(res);
        }
        return res || null;
      })
      .catch((error: ERROR): K | void => {
        if (onFailure) {
          return onFailure(error);
        }
        // TODO : TOAST 필요하지 않을까?
        console.log('error', error);
      });
  };
};

interface PostFactory<DATA, RES, T, ERROR, K>
  extends Factory<RES, T, ERROR, K> {
  data?: DATA;
}

export const fetcherPostFactory = <
  DATA,
  RES,
  T = Record<string, any> | null | RES,
  ERROR = string,
  K = void,
>({
  prefix,
  data,
  onSuccess,
  onFailure,
}: PostFactory<DATA, RES, T, ERROR, K>) => {
  const api = prefix || defaultApi;
  return (context: QueryFunctionContext) => {
    return api
      .post(context.queryKey[0] as string, data)
      .then((res: RES): T | RES | null => {
        if (onSuccess) {
          return onSuccess(res);
        }
        return res || null;
      })
      .catch((error: ERROR): K | void => {
        if (onFailure) {
          return onFailure(error);
        }
        // TODO : TOAST 필요하지 않을까?
        console.log('error', error);
      });
  };
};

const defaultFetcher = fetcherFactory({ prefix: defaultApi });

export type APIResponse<T> = () => UseQueryResult<T>;

// export type APIResponseWithParams<T, P = unknown> = (params: P) => SWRResponseWrapper<T>;

export const useCommonQuery = <Data, Error = unknown>(
  url: string | null,
  data?: Record<string, string>,
  fetcher?: (context: QueryFunctionContext) => Promise<any>,
): UseQueryResult<Data, Error> => {
  // QueryString
  if (!!url && data && typeof data !== 'string') {
    url += (url.match(/\?/) ? '&' : '?') + QueryString.stringify(data);
  }
  return useQuery(url || '', fetcher || defaultFetcher, {
    suspense: true,
    enabled: !!url,
  });
};

export const NonMemberExceptionHandling = (url: string): string | null => {
  return !UserInfo.memberNumber || UserInfo.memberNumber === '000000000000'
    ? null
    : url;
};
```

## 참고

- [Redux 를 넘어 SWR 로](https://min9nim.now.sh/2020-10-05-swr-intro1/)
- [Redux 말고 SWR](https://snyung.com/content/2021-01-09--SWR?fbclid=IwAR2xUtmDq9YwLcm6aK7T4AemKvoKRjg181dwI7l_60tfrCVfdH28BhixCBs)
- [카카오페이 프론트엔드 개발자들이 React Query를 선택한 이유](https://if.kakao.com/session/118)
