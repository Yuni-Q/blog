---
title: svg
date: 2020-10-19 13:10:27
category: develop
tags: []
draft: true
marp: true
---

# 이미지 압축방식 이해하기

---

# Lossy vs Lossless

- 압축 방법에는 크게 손실압축(Lossy compression)과 비손실 압축(Lossless compression) 방법이 있습니다.
- 각각에 방법에는 용도에 따라, 속도 측면에 따라 장단점이 존재합니다.

---

# Lossy

- Lossy는 이미지를 압축하여 크기를 줄이지만 이미지의 Quaility는 손상되는 것을 말합니다.
- 만약 이미지를 손실 압축 포맷으로 변환하여 계속해서 저장하게 되면 이미지의 퀄리티는 점점 나빠지게 됩니다.
- 예를 들어 동영상의 경우 사람이 듣지못하는 부분의 소리 등을 버리고, 용량을 줄이기위해 화질을 포기하는 경우가 있습니다.

---

# 손실 압축 코덱

- MPEG-1 Part.2: H.261
- MPEG-2 Part.2: H.262
- MPEG-4 Part.2: H.263
- MPEG-4 Part.10: H.264 (AVC)
- MPEG-H Part.2: H.265 (HEVC)

---

# Lossless

- Lossless는 이미지를 압축해도 이미지의 Quaility는 손상 되지 않는 것을 말합니다.
- 비손실 압축은 각 프레임마다 변경된 부분이 크지않다는 점을 이용한 압축방식입니다.

---

# 무손실 압축 코덱

- HuffYUV
- Lagarith
- MSU
- MagicYUV

---

# Indexed color vs Direct color

- Indexed Color는 제작자에 의해 Color Map이라는 곳에 제한된 수의 색상(즉 256가지의 색상)을 가진 palette로만 저장할 수 있는 속성입니다.
- Direct Color는 제작자가 직접 선택하지 않은 수천가지의 컬러를 저장할 수 있는 속성이기 때문에 다양한 색을 표현할 수 있는 반면 그 다양한 색상의 정보를 저장해야 하기 때문에 Indexed Color에 비해 많은 용량이 필요합니다.

---

# SVG

- Lossless / Vector

---

# 레스터(Raster)와 벡터(Vector)

---

# 레스터(Raster)

- 래스터 방식은 이미지의 모양과 색을 색상 정보가 담긴 픽셀(pixel)로 표현하는 방식입니다.
- 흔히 비트맵 방식이라고 불리는 표현방식으로 각각의 픽셀에 색을 입혀 그 픽셀을 하나로 모아서 그림이나 선 등을 만들어냅니다.
- 각각의 픽셀을 이용해 작업하는 만큼 자연스러운 이미지를 표현할 수는 있지만 확대를 할 경우 그림이 깨져서 보이는 계단식 현상이 나타나며, 픽셀의 수가 많아질수록 파일의 크기가 커지는 단점이 존재합니다.

---

# 벡터(Vector)

- 수학적 함수를 이용하여 도형이나 선을 그려서 표시하는 방식으로써, 확대하였을 때 계단식 현상이 일어나지 않고 선명함을 유지합니다.
- 레스터 방식에 비해서 용량이 작은 편입니다.

- 벡터 이미지는 색상의 자연스러운 변화나 세밀한 표현이 어렵다는 단점이 있습니다.

---

# SVG(Scalable Vector Graphics)

- 2차원 벡터 그래픽을 표현하기 위한 XML 기반의 파일 형식입니다.
  - XML 기반이라는 부분은 SVGs는 HTML과 다른 것이라기 보다는 바이너리 유형의 대부분의 이미지들과 같은 형식으로 작성된다 것을 의미합니다.
- 1999년 W3C(World Wide Web Consortium)의 주도하에 개발된 오픈 표준의 벡터 그래픽 파일 형식입니다.

---

# SVG(Scalable Vector Graphics) 2

- 각각의 pixel이 pre-defined된 값을 저장하고 있는 PNG나 JPEG등의 bmp형식의 파일과는 달리 XML 마크업으로 작성되어 있습니다.
- SVG 형식의 이미지는 XML 텍스트 파일들로 정의 되어 검색화·목록화·스크립트화가 가능하며 필요하다면 압축도 가능합니다.
- SVG 형식의 파일은 어도비 일러스트레이터와 같은 벡터 드로잉 프로그램을 사용하여 편집이 가능합니다.
- XML 형식으로 되어 있으므로 메모장과 같은 문서 편집기로도 편집이 가능합니다.
- JS를 통해 동적으로 생성가능(미지원 브라우저에서도 구현 가능)하며, JS를 이용해서 그라디언트, 회전, 필터 효과, 애니메이션, 등의 디테일한 설정이 가능합니다. 심지어 css를 이용해서 svg파일을 수정해서 사용하는 것도 가능하다.
- 경쟁기술 HTML5 캔버스, 플래시보단 느린 단점이 있으나, DOM 인터페이스 사용, 서드파티 확장 필요 없습니다.

---

# SVG(Scalable Vector Graphics) 3

- 브라우저에서 직접 렌더링 합니다.
- Vector 파일 포맷을 사용하기 때문에 이미지를 확대, 축소 하더라도 깨짐 현상이 없습니다.
- 모든 스크린 화면에서 선명한 이미지를 보여 줄 필요가 있는 로고 등에 적절한 포맷입니다.
- SVG는 사이즈도 작은 편에 속하는데, 모양이 복잡할 수록 벡터 계산이 많이 필요해 계산이 많이 필요해 질 수 있습니다.
- SVGZ(Compressed Scalable Vector Graphics)는 SVG를 압축하여 전달하는 압축포맷입니다.

---

# SVG(Scalable Vector Graphics) 4

- 현재 마이크로소프트의 인터넷 익스플로러 8 및 이전 버전을 제외한 대부분의 주요 웹 브라우저들은 SVG를 지원합니다. 인터넷 익스플로러 8 및 이전 버전에서는 SVG 파일을 보기 위해 별도의 플러그인을 수동으로 설치하여야 하며, 그렇지 않은 경우에는 웹 페이지 제작자가 구글 코드에서 개발중인 자바스크립트 라이브러리, SVG Web 을 웹 페이지 코드에 포함시켜야 합니다.

---

# SVG 장점

- 독립적인 해상도 / 해상도와 관계없이 빠르고 깔끔한 이미지를 표현
- 모든 종류의 최신 브라우저 지원
- 경쟁력있는 기술(W3C 표준)
- 작성 및 수정의 편리
- CSS & JS로 구현 가능
- 적은 용량 / 높은 압축 용량
- 하이퍼링크, 자바스크립트 등과 연동 가능
- VECTOR / TRANSPARENCY / ANIMATION

---

# SVG 형식의 한계(Limitations of the format)

- SVG 이미지는 래스터 이미지 비해 용량이 큰 경우도 있습니다.
  - 그래픽 툴에서 그리는 모든 요소는 패스로 출력되므로 불필요한 패스를 생성하지 않도록 늘 염두에 두어야 합니다.
- SVG 형식은 그래픽 툴을 통해 적용한 블러 또는 색상조정 같은 필터는 지원하지 않습니다.
  - 일부 필터는 SVGs에 지원이 되긴 하지만, 대부분의 그래픽 툴은 이런 필터들을 제대로 지원하지 않기 때문에 사용하지 않는 편이 좋습니다.

---

# 파일 용량 줄이기(Reducing file size)

- 브라우저에 자산을 렌더링 하는 데 흔히 불필요한 레이어 정보, 주석 및 XML 네임스페이스 같은 많은 양의 메타데이터가 들어 있기 때문에 항상 svgo와 같은 도구를 실행하여 파일을 최소화하는 것이 좋습니다. 또한 SVG가 XML 기반 형식이므로 GZIP 압축을 적용하여 전송 크기를 줄일 수도 있습니다.
- svgo은 SVG 파일에서 불필요한 코드를 제거하는데 유용한 노드 플러그인입니다.
- 파일 크기를 더 줄이고 싶다면, 압축을 하면 됩니다.

---

# use case

- `<svg> </svg>` 으로 모양이 구성 되어있으며, rect, circle, ellipse, line, polyline, polygon, path 등의 태그의 어트리뷰트를 디테일하게 설정하여 원하는 모양을 그릴 수 있습니다. 위에서부터 아래로 렌더링 되어, 최하단에 위치한 태그가 렌더링 된 화면에서는 최상단에 위치합니다.

---

# use case 2

- svg를 동적으로 다루기 위한 에어비앤비의 [lottie](https://airbnb.design/lottie/) 등이 있으며, 최근에 [FE Conf](https://2020.feconf.kr/)에서 화면 스크롤에 따라 백그라운드에 위치한 로켓이 그림을 그리면서 하단으로 계속해서 이동합니다. [github 레포](https://github.com/fedgkr/feconf2020/tree/master/src/views/svg-components/LineBackground)를 살펴보면 svg파일을 다루고 있음을 확인할 수 있습니다.

---

## AWS S3 올려서 사용 시 주의점

- 다른 이미지 파일(png, jpeg)들 처럼 올리면 Content-Type이 binary/octet-stream으로 설정되어서 src로 표시할 수 없고 다운로드 받게 됩니다.
- Content-Type을 image / svg + xml로 변경해야 합니다.

```js
const params = {
	Bucket: 'bucket',
	Key: 'key',
	Body: stream,
	ACL: 'public-read',
	ContentType: 'image/svg+xml',
};
s3.upload(params, function(err, data) {
	console.log(err, data);
});
```

## 참고

- [이미지 압축방식 이해하기(bmp, jpeg, jpg, png, svg)](https://dydtjr1128.github.io/image/2019/07/01/Image-compression.html)
- [SVG가 뭔가요?](https://post.naver.com/viewer/postView.nhn?volumeNo=27689642&memberNo=43589165)
- [디자인로그(DESIGN LOG)](https://www.designlog.org/2512464)
