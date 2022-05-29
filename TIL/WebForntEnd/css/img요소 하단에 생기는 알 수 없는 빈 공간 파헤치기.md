## img요소 하단에 생기는 알 수 없는 빈 공간 파헤치기

- image에 `display: block`을 줘서 해결 할 수 있다.
- 하지만 inline을 block으로 바꾸는 것은 좋지 않기 때문에 vertical-align: top;으로 준다(bottom으로 줘도 무방하다)

## 이미지 로딩 에러 처리

```tsx
<img
  src={product.item.media}
  className="item-media"
  alt={`${product.item.name}의 상품 이미지`}
  onError={(event) => {
    if (!event) return;
    (event.target as HTMLImageElement).src = BM;
  }}
  onClick={() => goItemPage(product)}
/>
```