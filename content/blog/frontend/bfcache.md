---
title: bfcache
date: 2021-03-11 08:03:75
category: frontend
tags: []
draft: true
---

## 역방향 캐시 무효화 및 모바일 Safari

- . 적절한 Cache-Control 헤더가 있어도 iOS를 사용하는 사용자가 입력 페이로드를 수정해도 수정되지 않은 현상이 있습니다.

```tsx
const RoutingWrapper = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};
const Routing = () => {
  const history = useHistory();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    history.listen((location, action) => {
      if (action === 'POP') {
        if (
          location.pathname.startsWith('/mypage') ||
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
      <Route path="/" component={App} />
    </Switch>
  );
};
```
