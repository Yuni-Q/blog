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

### 이미지 로딩 에러 처리에서 대체 이미지도 에러가 난다면?

- 무한 로딩에 빠지게 됩니다. 
- 이를 해결하기 위해 onError를 제거하려고 했지만 onerror에 값을 바꾸려고 했지만 함수가 추가될 뿐이었고 removeEventListener를 쓰기에는 코드가 분산되어 관리가 어려울거 같습니다.
- dataset을 사용하거나 리액트의 경우 state를 사용할 수도 있겠지만 에러처리를 위해 코드를 퍼지거나 값이 추가되는 것을 원치 않습니다.
- 대체 이미지의 주소임에도 에러가 난다면 별도의 처리를 해주는 것으로 무한 로딩 문제를 해결합니다.

```ts
onError={(event) => {
  if (!event) return;
  
  const target = event.target as HTMLImageElement

  if (target.src === alternativeImage) {
    return;
  }

  target.src = alternativeImage;
}}
```