---
title: styleguide
date: 2021-03-01 11:03:14
category: design
tags: []
draft: true
---

## 해상도와 래스터화

### 해상도(Resolution)와 ppi(pixels per Inch)

- `해상도`는 이미지의 `가로와 세로에 몇 개의 화소(픽셀)가 있는지`를 뜻합니다. 화소(픽셀)가 적은 30x30보다 100x100 해상도에서 더욱 또렷하게 보입니다. 화소(픽셀)가 많으면 많을수록 더 세밀하게 이미지를 표현할 수 있습니다.
- 똑같은 화소(픽셀)의 양이라도 `화소(픽셀)의 크기`에 따라 세밀함의 정도가 달라 보일 수 있습니다. 그래서 약속의 단위를 만들었는데, 바로 `PPI(Pixels per Inch)`입니다. PPI는 ‘Pixels per Inch’의 약자로 `1인치당 픽셀(Pixel)이 몇 개인지`를 나타내는 것으로 디스플레이의 `픽셀 밀도`를 뜻합니다.
- 해상도와 ppi는 높을수록 세밀한 표현이 가능하지만 화소(픽셀) 하나하나는 모두 메모리에 그 정보가 기록됩니다. 그렇기 때문에 해상도가 높아지면 그만큼 메모리를 많이 소모하게 됩니다. 메모리 용량은 무제한으로 커질 수 없기 때문에 인터넷 환경이 느려지게 됩니다.

### 래스터화(Rasterization)란?

- 그래픽을 렌더링하는 방식중 하나로 래스터화(Rasterization)란 화면의 오브젝트를 픽셀로 매핑하는 것으로, 디스플레이 시스템이 전자 데이터 또는 신호를 비디오나 이미지로 바꾸는 프로세스입니다. 이는 일반적으로 특정 미디어 구성의 요구를 파악한 다음 이미지를 효율적이고 최적으로 디스플레이 장치에 투영할 수 있도록 리소스를 할당하는 프로세스입니다.

#### 래스터화 단계

- 논리적 표현 : dp
  - 처음에는 모든 도면의 좌표 dp단위로 지정됩니다. dp는 추상 단위이며, 이 수학 좌표 공간에서만 의미가 있습니다. Density-independent pixel의 줄임말로 화면의 크기가 달라도 동일한 비율로 보여주기 위해 안드로이드에서 정의한 단위입니다.
- 물리적 표현 : Rendered Pixels(px)
  - dp는 픽셀(px)로 렌더링(rendering)됩니다. 이 과정을 래스터화(rasterization)라고 합니다. dp에 배율을 곱하여 픽셀(px)을 얻습니다. 배율이 높을수록 선명도(detail)가 높아집니다.
- 다운샘플링 : Physical Pixels(downsampling, px)
  - 장치 화면의 해상도가 이전 단계에서 렌더링 된 이미지보다 낮을 수 있습니다. 이미지를 표시하려면 해상도를 낮추기 위해 이미지를 다운샘플링(크기 조정)해야 합니다.
- 인지 : Physical Device(ppi)
  - 마지막으로, 계산된 픽셀(px)이 물리적 화면에 표시됩니다. ppi는 1인치에 얼마나 많은 픽셀(px)이 들어가는지, 따라서 픽셀(px)이 실물로 얼마나 큰지를 알려줍니다.

### px, dp의 개념

- 스크린은 픽셀(px)로 구성됩니다. 픽셀을 기준으로 디자인하면 디바이스의 픽셀 밀도(ppi = 1inch 공간 안에 표시되는 픽셀 수)로 인해 의도한 것과 다르게 작거나 크게 표시될 수 있습니다. Android에서는 어떤 화면에서도 같은 크기로 보이도록 dp(ios에서는 pt)단위를 사용합니다. 그래픽 디자인 툴은 보통 1px = 1dp로 설정되어 따로 설정을 변경할 필요는 없습니다.

## 8배수 디자인

- 8의 경우 1.5배 등과 같이 0.5배시에도 소수가 아닌 정수의 값이 유지됩니다.
- 각 해상도 밀도들은 0.5 : 1 : 1.5 : 2 : 3 : 4의 비율을 가지고 있습니다. 따라서 4.0 xxxhdpi 기반으로 디자인 한다면 아래와 같이 각 밀도별로 크기를 변환할 수 있습니다.
  - 1.0 mdpi = 4.0 xxxhdpi 기반에서 디자인 한 픽셀사이즈 x 0.25
  - 1.5 hdpi = 4.0 xxxhdpi 기반에서 디자인 한 픽셀사이즈 x 0.375
  - 2.0 xhdpi = 4.0 xxxhdpi 기반에서 디자인 한 픽셀사이즈 x 0.5
  - 3.0 xxhdpi = 4.0 xxxhdpi 기반에서 디자인 한 픽셀사이즈 x 0.75

### 효율성을 위한 다운사이징

- 이론적으로는 4.0 xxxhdpi기반에서 디자인 하는 것이 맞지만 2.0 xhdpi기반에서 스마트폰 기준으로 사람이 구분 가능한 픽셀밀도인 약 430ppi를 충족하고 있으므로 효율성을 위해 2.0 xhdpi 기반에서 디자인하여 사용합니다. 다만, 확대 시에는 차이가 있습니다.

### 2의 배수, 4의 배수 디자인은 안 되나요?

- 8의 배수는 가장 큰 기본 배수고 8이 포함하는 2와 4의 배수 디자인도 물론 가능합니다. 8의 경우가 모든 디바이스의 옵션이 가능하기 때문입니다. 디자인 작업 시 꼭 8배수를 지키지 않아도 되며, 2배수, 4배수도 활용하여 유연하게 디자인 하는 것을 권장합니다. (2배수, 4배수가 불가능한 옵션인 1.5 hdpi 밀도의 주요 디바이스로는 Microsoft사의 노트북 surface시리즈가 있습니다.)

## 그리드 시스템

- 그리드 시스템(Grid System)에서 `Grid`는 격자나 바둑판 모양의 눈금을 뜻하며 일반적으로는 수직과 수평으로 면이 분할된 것을 의미합니다. 1970년대 중반부터 본격적으로 사용된 그리드 시스템은 디자인의 레이아웃에 규칙을 부여하는 수단입니다. 편집디자인(인쇄물)에서 시작해 현재 웹 개발 분야에도 적용하여 웹 페이지를 제작하는 기초 단계에서 그리드 시스템을 사용하면 제작을 쉽고 빠르게 진행할 수 있습니다.

### 그리드 시스템의 장점

- 디자인 레이아웃은 모든 측정값이 동일한 규칙을 따르면 자동으로보다 일관된 UI를 얻게 됩니다. 그리드 시스템은 균일한 요소와 간격을 사용하여 플랫폼, 환경 및 화면 크기에 일관성을 부여하고 그래픽 요소의 체계적인 배열을 도와줍니다. 또한 협업의 목적으로 내부의 기준을 정하는 것에 도움이 되며, 또한 반응형 디자인의 경우 해상도 대응이 쉬워지고 디자이너와 개발자 사이의 쉬운 커뮤니케이션 시스템이 됩니다.

### 그리드 시스템의 기본 요소

- 그리드는 칼럼(Column), 거터(Gutter), 마진(Margin) 세 가지 요소로 구성됩니다.

#### ① 칼럼(Columns)

- 실제로 컨텐츠를 포함하는 부분은 칼럼이라고 합니다. 칼럼의 넓이는 고정된 값으로 제공되며, 1개 이상의 칼럼이 조합하여 컨텐츠의 크기를 결정합니다. 그리고 하나의 칼럼 안에는 반드시 양 옆에 여백, 즉 거터를 동반합니다.

#### ② 거터(Gutters)

- 거터는 칼럼과 칼럼사이의 공간입니다. 1개 이상의 칼럼이 조합된 컨텐츠와 컨텐츠 사이의 간격이 됩니다. 거터의 넓이 역시 고정 값으로 제공하며, 스크린의 너비에 비례하여 넓은 거터는 큰 스크린에 적합니다. 칼럼사이에 공백을 더 많이 생성하기 때문입니다.

#### ③ 마진(Margins)

- 여백은 내용과 화면의 왼쪽 및 오른쪽 가장자리 사이의 공간입니다. 여백 너비의 넓이도 고정 값으로 정의되며, 여백 역시 큰 여백은 내용의 둘레에 더 많은 공백을 만들기 때문에 큰 스크린에 적합니다.

### 칼럼 그리드 시스템

- 제한된 스크린 너비에서 칼럼의 수에 따라 콘텐츠를 표현할 수 있는 넓이는 달라집니다. 하지만 단순히 칼럼의 수가 많다고 해서 좋은 그리드라고 볼 순 없습니다. 웹 디자인에서는 일반적으로 2, 3, 4, 6칼럼으로 쉽게 분할 할 수 있는 12분할 그리드와 3, 5칼럼으로 분할 할 수 있는 15분할 그리드를 주로 사용하고 있습니다.
- 그리드 시스템은 사실상 디자인 작업 시에만 필요합니다. 그리드 시스템은 디자이너와 개발자 간의 소통을 위한 참고사항이며, 그리드 가이드라인에 따라 디자인을 효율적으로 하기 위한 것입니다. 개발 단계에서 그리드 시스템은 사용되지 않으며 분할된 칼럼을 기준으로 백분율로 사용되기 때문에 12, 15개의 고정된 칼럼 개수는 의미가 없습니다. 그러므로 디자인 작업 시에 12칼럼 그리드에서 5분할을 할 수 없다고 생각하지 말고, 위에 이미지로 첨부한 칼럼 시스템 백분율 너비를 참고하여 유연하게 그리드를 사용하는 것이 좋습니다.

### 반응형 그리드 시스템

- 최근에는 디바이스 환경에 따라 해상도가 등장하면서 다양한 크기의 해상도를 지원하는 반응형 그리드 시스템이 있습니다. 고정 그리드 시스템과 형태는 비슷하지만, 칼럼의 너비를 고정 값이 아닌 백분율로 지정하고 디바이스 별 브레이크 포인트를 지정하여 화면 크기와 방향에 맞게 레이아웃을 조정합니다.

#### 브레이크 포인트

- 특정 레이아웃 요구사항이 있는 미리 결정된 화면 크기의 범위입니다. 각 브레이크 포인트 범위는 디스플레이 크기에 따라 칼럼 수와 권장 마진 및 거터를 결정합니다.

#### 브레이크 포인트 지정 방법

1. 해상도 점유율을 통계적인 수치로 검사하여 점유율이 가장 높은 해상도를 선택하여 제작하거나, 일정 비율 이하로 낮은 해상도를 제외하고 제작합니다.
2. 웹사이트 프론트 개발자는 미디어 쿼리를 이용하여 각 브레이크 포인트로 제작합니다.
3. 디자인 작업 시에는 모바일, 태블릿, 데스크톱의 경우로 시안을 최소한으로 작업하고, 브레이크 포인트 마다 약간의 간격조정이 있음을 이해하고 있어야 합니다.

## 간격 시스템

- 1px 단위로 디자인을 할 경우 너무 작은 단위이기 때문에 효율성이 떨어집니다. 그래서 우리는 기본 단위를 4배수에 기반한 6가지 단위로 규정하여 사용하길 권장합니다. 이 간격 시스템은 디자인 작업의 효율을 높이고 디자이너와 개발자간의 소통을 원활하게 도와줍니다.

## 폰트 단위

### 단위개요

- pixel : 픽셀은 디스플레이에서 가장 기본이 되는 화면 최소단위입니다. 하나의 글꼴이 화면에 출력될 때 그 글꼴이 차지하는 화면 최소 구성요소 (픽셀)의 수를 나타냅니다.
- point : 포인트는 타이포그래피에서 사용하는 가장 작은 인쇄 단위로, 1포인트는 1/72인치를 나타내며, 디스플레이가 생겨나기 전부터 사용하던 단위입니다.

### 웹에서의 기본 단위

- pt와 px의 가장 큰 차이는 출력장치에서 나타납니다. 최종 출력물이 종이일때 ppi와 상관없이(72ppi, 96ppi, 150ppi) 24pt 텍스트를 쓰면 출력된 종이에서는 항상 동일한 크기의 텍스트로 표시됩니다. 반면, 디스플레이 장치가 되면 ppi마다 24pt의 크기가 각각 달리 보이는 문제가 생깁니다. 이때 pt가 아닌 px을 사용하여 서체를 24px로 지정하면, 모든 디스플레이에서는 텍스트 높이를 24px로 설정하고 표시합니다. 이렇게 모든 디스플레이에서 동일한 결과물을 보여줄 수 있으므로 웹 개발시에는 pt보다 px사용을 권장합니다.
  > 브라우저의 pt단위와 포토샵의 pt단위는 다르며, 포토샵에서 텍스트를 pt 단위로 사용시 해당 폰트의 높이가 px단위가 됩니다.

## 문단크기의 선정기준

- apple사의 문단크기(16px) 선정기준
  - 초기 mac os에서는 1point = 1/72 inch 인 것에 착안하여 72ppi 화면해상도를 가진 디스플레이를 표준으로 채택했습니다. (72ppi해상도에서 1pt = 1px) 이는 타자기 세대에 쓰이던 폰트크기 12pt를 모니터상에서도 같은 12px 크기로 사용하기 위해서였습니다. 즉 실제 인쇄물과 같은 크기로 사용하기 위해서 72ppi를 사용했습니다.
- microsoft사의 문단크기(16px) 선정기준
  - 마이크로소프트는 사용자와 컴퓨터 디스플레이의 거리는 책이나 문서를 읽을 때의 거리보다 4/3배 더 멀리있으므로, 가독성을 높이기 위해 해상도도 4/3배를 하여 96ppi 를 사용합니다. 보편적으로 사용되고있는 웹 브라우저 기준으로 봤을때, 96ppi의 해상도를 가집니다. 이는 css가 계획될 당시 96ppi를 기준으로 만들어졌기 때문에, 웹에서의 폰트는 포인트에서 4/3배가 된 픽셀 값을 가지게 됩니다. 그 결과 인쇄상의 기본값인 12pt 크기의 글씨는 웹 브라우져에서 16px과 같으므로 16px을 기본 폰트크기로 사용합니다.

## 폰트크기

- 전통적인 타이포그라피에서 폰트는 10-12px에서 +1px, 12-18px에서 +2px, 18-24px에서 +3px, 24-72px에서 +12px씩 증가하는 일정한 규칙을 볼 수 있습니다.
- 폰트크기 가이드에서는 이러한 일정한 규칙이 적용됩니다. 제목용 텍스트 크기의 기본 설정값은 21px이며 최소12px, 본문 텍스트 크기의 기본 설정값은 16px이며 최소10px 로 규정합니다.
- 표의 폰트크기는 14px, 제목컬러는 #000000 본문컬러는 #616161기본값으로 합니다.
- 목록의 폰트크기는 제목16px, 본문 14px을 기본값으로 합니다.
- 폰트는 나눔고딕, 나눔스퀘어, 노토산스 총 3개의 폰트를 기준으로 하며, 텍스트의 두께는 웹폰트 사용시 로딩시간을 고려해 최대 4개(Light/Regural/Bold/ExtraBold)까지 제한합니다.

## 폰트컬러

- 저시력자 및 색각 이상자, 노인 등 을 위한 웹접근성 가이드에 따라 텍스트 콘텐츠와 배경간의 명도대비는 최소 4.5:1 이상이어야 합니다.

1. 텍스트 콘텐츠(텍스트 및 텍스트 이미지)와 배경 간의 명도 대비는 4.5:1 이상이어야 합니다.
2. 텍스트 크기가 약 24px(18pt) 이상 또는 약 18.5px(14pt) 이상의 굵은 폰트를 사용하는 경우 명도 대비를 3:1까지 낮출 수 있습니다.
3. 화면 확대가 가능하도록 구현한 텍스트 콘텐츠(텍스트 및 텍스트 이미지)의 명도 대비는 3:1까지 낮출 수 있습니다.
4. 그 외 텍스트는 약 24px(18pt) 이상 또는 약 18.5px(14pt) 이상의 굵은 폰트의 경우입니다. (1pt = 1.333px) 등급별 명암대비는 최소 대비 기준, 명암강도는 1에서 21까지 (1:1 에서 21:1로 작성)입니다.

## 행간

- 글자에는 면과 몸통이라는 개념이 있는데 이상적인 타이포그래피를 균일한 공간 설정이라 가정할 때, 글자사이 및 낱말사이는 모두 면간격이어야 합니다. 글줄사이 역시 글줄높이(또는 글자높이)와 같은 면간격이어야 합니다.
- 글자의 몸통을 기준으로 행간을 적용하면 글보다 행간이 더 넓어보이지만, 글자의 면적을 기준으로 행간을 적용하면 글과 행간이 동일해보입니다.
- 이러한 면적기준의 규칙을 적용하면 행간높이는 1.75배수로 계산됩니다. 웹접근성 가이드 WCAG 2.1(”행간은 적어도 문단내의 띄어쓰기space는 글자크기의 1.5배 이상이어야 한다”)에 따라 행간의 최소값은 1.5로 사용하며, 기본값은 1.75를 권장합니다. 이 때 결과값이 소수가 발생할 경우는 반올림한 수치를 적용합니다.
- 글자의 면이라는 개념에서 모든 2d 프로그램은 글자 아래를 기준으로 행간을 가지지만 css에서 코딩을 할때는 위아래로 1/2씩 행간을 적용합니다. 그러므로 마진이나 패딩을 줄 때는 행간의 값이 합산되어 적용되는 점을 유의해야합니다.

## 글자 길이제한

- 본문 텍스트의 줄 길이는 일반적으로 40-60자(공백 및 기호포함) 사이가 일반적이나, 데스크탑과 같이 줄 길이가 더 긴 영역에서는 최대 120자 까지 가능합니다.
- 텍스트의 짧은 줄에 대한 이상적인 줄 길이는 한 줄당 20~40자로 제한됩니다.

## 행바꿈 기준

- 영문은 단어기준 행바꿈이 한글은 너비기준 행바꿈이 기본값이나, 한글은 단어기준, 너비기준 둘 중 상황에 맞게 선택 사용이 가능합니다.

### 한글 행바꿈

- 단어기준 : 각 줄 마지막 단어의 중간을 자르지 않고 단어의 공백을 기준으로 줄바꿈 하는 것을 의미합니다.
- 너비기준 : 각 줄 마지막 단어의 중간을 잘라 양쪽정렬을 기준으로 줄바꿈 하는 것을 의미합니다.

#### 영문 행바꿈

- 단어기준 : 각 줄 마지막 단어의 중간을 자르지 않고 공백 기준으로만 줄바꿈하는 것을 의미합니다.

## 영문+한글 조합

- 영문과 한글은 같이 표기할 경우, 특수문자와 숫자는 영문폰트로 표기됩니다. 영문과 한글이 표기될때, 영문은 1byte 씩 한글은 2byte 로 계산됩니다. 여기서 특수문자와 숫자는 1byte로 표기되기 때문에 영문폰트로 표기됩니다. \*개발시 글자수는 byte가 아닌 공백을 포함한 글자의 갯수로 기준을 잡습니다.

## 브랜드 컬러

- 브랜드를 나타내는 고유색으로 브랜드 전체의 통일감을 부여하며, 사용자에게 끊임없이 같은 메시지를 전달하기에 효과적입니다
- 브랜드컬러는 주로 primary color 1가지와 secondary color 1가지로 제안합니다. 다수의 컬러를 사용하는 것보다 소수의 컬러를 사용하는것이 브랜드성을 더 끌어올리면서 컨텐츠 중심의 디자인을 하기 쉽도록 도와줍니다. 너무 단조롭게만 느껴진다면 브랜드컬러에 채도와 명도를 더하여 좀 더 풍부한 표현을 할 수 있습니다.
- primary color가 secondary color보다 비율이 높아야 합니다. 이와 반대로 될 시, 사용자에게 주요색에 대한 혼란을 야기시킬 수 있으므로 primary color를 secondary color보다 더 많이 사용하는 것이 좋습니다.
- primary color와 secondary color를 정할 때, 색상간의 조합도 매우 중요합니다. 컬러휠(색상환) 도구는 조화로운 컬러배합을 도와주는 도구입니다. 모든색상은 서로 어울리기도 하지만 충돌하기도 하기 때문에 그 과정이 너무 지체되거나 어려움을 느낄 수 있습니다. 이때 컬러 휠 도구를 사용하여 시간을 단축시킬 수 있습니다.

### 인터랙션 컬러(interaction color)

- 인터렉션컬러는 디폴트컬러에서 1~2톤 밝고 어두운 컬러를 사용하는 것을 제안합니다. 명도와 채도의 단계를 더 크게 두어 사용할 수도 있습니다.
- default color를 정한 후 interaction color로 lighten, darken color를 4~5단계정도 두어 사용가능합니다. interaction color를 1~2 컬러로 잡았을 때보다 좀 더 풍부한 표현이 가능합니다. lighten color는 왼쪽으로 갈수록 더 밝아지며 기본색상과 대비하여 더 밝을수록 숫자가 높아집니다. darken color는 오른쪽으로 갈수록 더 어두워지며 기본색상과 대비하여 더 어두울수록 숫자가 높아집니다.
- 마우스 호버시 색상을 interaction color를 활용하여 사용자가 어느 위치에 마우스를 호버하고 있는지 알기 쉽게 도와 줄 수 있습니다.

### 그레이 스케일

- grey scale은 정보의 강약을 나타내고, 계층을 구분하는데 효과적입니다.

### 시스템 컬러

- 시스템 컬러는 상태의 의미를 전달하는 컬러로 사용자에게 직관적으로 시스템의 상태를 알려주는데 효과적 입니다.
- 컬러의 해석은 문화나 경험에 의해서 달라질 수 있으나 UNESCO 도로표지판 및 신호에 대한 비엔나협정에서 다음과 같은 색상들의 상태의미를 국제적으로 표준화시켰습니다. 국내에서는 교통관련정보 외에도 UI 디자인(인터페이스 디자인)에 이러한 표준을 사용하여 사용자에게 직관적으로 시스템 상태를 보여줍니다.
  - red(#d32f2f) : 오류, 금지, 정지, 위험, 삭제, 불가, 필수
  - yellow(#f9a825) : 주의, 경고
  - green(#4caf50) : 안전, 진행, 계속, 성공
  - blue(#0091ea) : 정보 활성화
- 그러나 웹접근성에 따르면 색상으로만 의미를 전달하기보다는 아이콘이나 바와 같은 형태 또는 글을 같이 기재해주는 것이 좋습니다. 이때 모양도 상징적인 의미를 가지고 있으므로 색상과 모양이 함께 부합하는 조합을 사용하는것을 권장합니다.
- 오류는 프로그램 자체를 실행할 수 없게 만드는 심각한 문법상의 오류를 말하는 것입니다. 경고는 컴파일상의 문제는 없지만(실행은 가능하지만) 실행중에 잘못된 결과를 나타낼 수 있는 부분에 대한 사전 경고입니다. 따라서 오류일때는 빨간색 원, 경고일때는 노란색 삼각형의 사용을 권장합니다. 도움말이나 정보는 파란색 원을 사용합니다. 확인이나 성공은 초록색 원을 사용합니다.

### 컬러 사용과 용도

- 컬러는 사용자에게 상호작용 가능성을 안내하는데 가장 강력한 도구입니다. 컨트롤을 할 수 있는 포지션 또는 버튼등의 선택기능영역을 사용자가 인지 가능하도록 컬러를 통해 표현할 수 있으며, 결과적으로 사용자가 원하는 행동(명령)을 실행시킬 수 있도록 도와줍니다. 또한, 컬러는 상태표현을 하는데 있어서도 중요한 역할을 합니다. 사용자의 조작결과에 따른 컨트롤의 상태변경을 컬러로 표현할 수 있으며, 이를 통해 사용자는 컴퓨터가 어떤 명령을 실행중인지 알 수 있습니다. 때에 따라 브랜드컬러, 시스템컬러 모두 적용가능합니다.
- brand color의 활용으로 현재 어느 탭에 위치하고 있는지, 주요 기능의 버튼이 무엇인지 직관적으로 알기 쉽게 도와줍니다.
- 컬러를 이용하여 컨텐츠의 중요도에 따른 표현이 가능합니다. 중요한 버튼의 인지력을 높이거나, 회색조나 투명도를 사용하여 중요도를 표현하여 사용자가 훑어보고 인지하기 쉽게 도와줍니다.
- 회색조를 사용하여 사용자가 훑어보기 쉽게 화면을 구성할 수 있으며, 버튼에 브랜드 컬러를 사용하여 중요도를 표현할 수 있습니다.
- 시스템컬러를 사용하여 좀 더 직관적인 의미 전달을 할 수 있으며, 브랜드컬러나 다른 동일한컬러를 사용하여 정보와 기능을 구분하기 쉽게 도울 수 있습니다.
- 컬러를 활용하여 사용자의 주의를 끌 수 있습니다. 중요한 컨텐츠나 사용자의 인식이 빠르게 요구될 때 컬러를 활용하면 효과적으로 사용자의 주의를 끌 수 있습니다.

### 콘텐츠 중요도에 따른 명도 대비

1. 주요 정보의 명도대비는 4.5:1 이상이어야 합니다.
   > 네비게이션, 제목, 본문, 주요 과업 수행 버튼 등은 배경과의 명도대비가 4.5:1 이상으로 제공되야 합니다.
2. 이미지 폰트의 명도대비는 4.5:1 이상이어야 합니다.
   > 이미지 폰트는 시스템 폰트보다 인식률이 떨어지므로, 광고영역을 제외한 이미지 폰트는 배경과의 명도대비가 4.5:1 이상으로 제공되어야 합니다.
   > 명도 대비 측정은 텍스트에 인접한 1px 중 가장 대비가 높은 색을 기준으로 평가합니다.
3. 부가정보의 명도대비는 3:1 이상이어야 합니다.
   > 날짜, 카테고리, Description 광고 (배너포함)등 부가정보와 부가 기능 수행 버튼 (인쇄, 추천 등)은 배경과의 명도대비가 3:1 이상으로 제공되어야 합니다.

### 웹접근성에 의한 컬러 사용

- 웹접근성 2.1에 의해 모든사용자가 색에 관계없이 콘텐츠를 인식 할 수 있어야 합니다. 특히 색각이상자인 경우, 컬러의 정확한 인식이 어려우므로 색각이상을 고려한 컬러를 사용하거나 컬러가 아닌 다른요소 즉, 텍스트나 아이콘 내지는 바와같은 형태적인 의미전달을 함께 명시해주어야 합니다.

### 색각이상을 위한 컬러사용

1. 색각이상자의 시야를 짐작해보기
2. 중요한 컨텐츠 디자인시, 색각이상자가 구분하기 어려운 색상과 조합의 사용을 지양하고, 명확히 구분할 수 있는 색상표의 사용을 지향합니다.

### 컬러와 무관한 콘텐츠의 인식

1. 텍스트의 사용
2. 바, 아이콘, 패턴 등 형태적인 디자인의 사용

### 일부사용자에게 혼란을 줄 수 있는 컬러사용의 예시

- 부정적인 클릭 유도 문안(negative call-to-action for negatice links)은 하지 않는 것이 좋습니다. 버튼의 중요도에 차이를 두기 위해 보더에 색상을 주는것이 더 좋습니다.
- 다양한 색상의 네비게이션 바는 어떤 콘텐츠가 활성화 되어있는지 사용자에게 혼란을 야기시킬 수 있습니다.

## 아이콘

- 시스템 아이콘 : 시스템 아이콘은 브랜드 아이콘과 상관없이 시스템적으로 들어가는 아이콘으로 일반적인 작업, 파일, 장치 및 디렉토리를 나타냅니다. 각 아이콘은 최소한의 형태로 축소되어 필수적인 특징을 나타냅니다.
- 제품 아이콘 : 제품 아이콘은 서비스와 도구를 비롯하여 브랜드와 제품을 시각적으로 표현한 것입니다. 제품의 핵심 아이디어와 의도가 명확하게 전달되어야 하고 제품 아이콘의 색상과 주요 요소가 브랜드 정체성을 반영 할 수 있어야 합니다.

### 아이콘의 크기

- 대체로 아이콘의 크기는 아이콘이 들어갈 장소에 맞게 결정됩니다. 구글 머터리얼 디자인에서는 다음 4가지 크기의 아이콘을 제공합니다. 디바이스의 해상도에 따라 이미지가 리사이징(Resizing)되어도 아이콘의 픽셀이 어긋나지 않고 또렷하게 보이기 위해 아이콘의 크기는 짝수로 맞추어줍니다.

### 모바일(터치)에서의 아이콘 크기

- 모바일에서는 사용자가 손가락을 이용하여 터치를 해야하기 때문에 아이콘의 크기에 제한이 있습니다. 아이콘은 너무 크게 제작되어 사용자가 의도하지 않은 동작을 일으키게 하거나, 너무 작게 제작되어 사용자가 누르는 데 불편함이 없도록 해야 합니다. Apple과 Google은 각각 아이콘의 최소 크기를 제안하고 있는데 Apple은 44dp로 추천하고, Google은 48dp로 추천합니다. mdip기준으로 dp를 mm로 환산했을 때 44dp는 약 11.6mm, 48dp는 12.7mm 입니다. 아이콘의 최소 사이즈를 44px ~ 48px 안에서 사용할 것을 권장합니다.

## 그리드 및 키라인

- 아이콘 그리드는 그래픽 요소의 일관성 있고 유연한 위치 지정을 위한 명확한 규칙을 설정합니다. 키라인 모양은 그리드를 기반으로 합니다. 이러한 핵심 모양을 기준으로 사용하면 아이콘 전체에서 일관된 시각적 비율을 유지할 수 있습니다.
- 아이콘을 왜곡시키지 않으려면 X 및 Y 좌표를 소수가 아닌 정수로 아이콘을 배치하고, 아이콘의 크기 또한 정수로 맞추어줍니다.

### 아이콘 크기별 그리드

- 아이콘 영역은 실제 아이콘이 들어가는 라이브 영역과 아이콘 주위의 여유 공간을 두기 위한 패딩으로 구성되어 있습니다. 터치를 해야 하는 환경에서는 터치를 위한 아이콘의 최소 사이즈를 만족시키기 위해 패딩 영역이 필요한데, 패딩 영역을 포함한 아이콘의 최소 사이즈는 48px입니다.

#### 18px 아이콘

- 18px 아이콘은 아이콘 영역 18px을 가지고, 아이콘 영역 안에서는 상, 하, 좌, 우 1px의 여백과 16x16 px의 라이브 영역으로 구성되어 있습니다. 아이콘 영역 바깥으로는 상, 하, 좌, 우 15px의 패딩 영역을 가집니다.

#### 24px 아이콘

- 24px 아이콘은 아이콘 영역 24px을 가지고, 아이콘 영역 안에서는 상, 하, 좌, 우 2px의 여백과 20x20px의 라이브 영역으로 구성되어 있습니다. 아이콘 영역 바깥으로는 상, 하, 좌, 우 12px의 패딩 영역을 가집니다.

#### 36px 아이콘

- 36px 아이콘은 아이콘 영역 36px을 가지고, 아이콘 영역 안에서는 상, 하, 좌, 우 3px의 여백과 30x30px의 라이브 영역으로 구성되어 있습니다. 아이콘 영역 바깥으로는 상, 하, 좌, 우 6px의 패딩 영역을 가집니다.

#### 48px 아이콘

- 48px 아이콘은 아이콘 영역 48px을 가지고, 아이콘 영역 안에서는 상, 하, 좌, 우 4px의 여백과 40x40px의 라이브 영역으로 구성되어 있습니다. 48px 아이콘은 터치에 필요한 최소 사이즈를 충족시키기 때문에 아이콘 영역 바깥으로 별도의 패딩 영역을 필수로 가지지 않습니다.

### 아이콘 사이의 간격

- 터치 타깃 사이의 공간도 중요합니다. 터치 타깃 사이의 최소 간격을 유지하는 이유는 사용자가 다른 아이콘을 터치해서 다른 액션을 유발하는 것을 방지하기 위해서입니다. 특히, ‘저장’과 ‘취소’ 같은 아이콘이 같이 있을 때 매우 중요합니다. 이러한 경우에는 최소한 2mm의 여백이 있어야 합니다. 2mm를 픽셀로 환산하면 mdpi 기준 약 8px입니다.

## 아이콘 구조

### 기본 도형

- 원형, 정사각형, 직사각형, 직각형 및 대각선과 같은 특정 모양에 특정 키가 있습니다. 이 기본 도형들은 시스템 아이콘을 통합하고 아이콘 그리드에서의 배치를 조정하는 데 도움이 됩니다.

### 시각적 크기 통일하기

- 한 패밀리에 속한 아이콘 각각의 사이즈를 통일하긴 하지만, 같은 영역 안에서의 사격형은 원보다 면적이 넓기 때문에 더 커 보이게 됩니다. 이런 경우에는 임의로 원의 크기를 조금 더 키운다거나 사격형의 크기를 조금 더 줄여 비율을 맞춰주는 것을 제안합니다
- 같은 영역 안에서 정사각형이 정원과 같은 면적이 되려면 원의 지름이 사각형 한 변의 약 1.13배가 되어야 합니다. 반대로 원의 크기에 약 0.88배를 하면 같은 너비의 사각형이 나오게 됩니다. 때문에 18px에 1.13을 곱한 값인 약 20px로 원의 지름을 계산해야 314제곱 픽셀로 원과 사각형이 서로 비슷한 면적을 갖게 됩니다.

### 모서리 곡률(Radius)

- 아이콘의 모서리 곡률(Radius, R 값)은 날카로울수록 세련된 인상을, 부드러울수록 귀여운 인상을 줍니다. 아이콘의 통일성을 위해 같은 아이콘 패밀리에는 동일한 곡률을 적용합니다. 권장 코너 반경 값은 0dp와 4dp 사이입니다.

### 아이콘 선

- 선의 두께는 아이콘의 전반적인 분위기를 크게 좌우합니다. 선이 두꺼우면 무거운 느낌을, 선이 얇으면 가벼운 느낌을 주는데, 선의 두께가 1px일 경우 가독성이 떨어지므로 최소 두께를 2px로 권장합니다.
- 선을 어디에 배치하는지에 따라 아이콘 전체 모양에 영향을 줍니다. 선 없이 면으로 된 아이콘, 아이콘 기본 형태를 기준으로 선이 내부로 정렬된 아이콘, 중앙으로 정렬된 아이콘, 바깥으로 정렬된 아이콘이 있습니다. 4가지 중 개발 중인 아이콘 스타일과 어울리는 선의 정렬을 선택하여 사용합니다.

### 아이콘 색상

- 콘텐츠는 색에 관계없이 인식될 수 있어야 한다는 웹 접근성 지침\*에 따라 중요한 정보를 제공해야 하는 아래의 경우에는 색과 함께 아이콘의 의미가 중요하므로 색상과 아이콘을 맞추어 사용할 것을 권장합니다.

### 배경 색상에 따른 아이콘의 투명도

#### 밝은 배경의 아이콘

- 활성 아이콘 : 밝은 배경에 초점이 맞춰진 활성 아이콘의 표준 불투명도는 87%(#000000), 초점이 맞지 않은 활성 아이콘은 54%(#000000)의 불투명도를 권장합니다.
- 비활성 아이콘 : 시각적 계층 구조에서 더 낮은 비활성 아이콘은 38%(#000000)의 불투명도를 권장합니다.

#### 어두운 배경의 아이콘

- 활성 아이콘 : 어두운 배경에 초점이 맞춰진 활성 아이콘의 표준 불투명도는 100%(#FFFFFF), 초점이 맞지 않은 활성 아이콘은 70%(#FFFFFF)의 불투명도를 권장합니다.
- 비활성 아이콘 : 시각적 계층 구조에서 더 낮은 비활성 아이콘은 50%(#FFFFFF)의 불투명도를 권장합니다.

## 컴포넌트

- 컴포넌트란 재사용 가능한 웹의 구성요소란 뜻으로 웹 응용 프로그램에서 재사용 가능한 구성 요소를 만들 수 있게 해주는 일련의 표준 기반 웹 플랫폼 API 세트입니다.

### 컴포넌트의 특징과 장점

- 컴포넌트는 화면에 일관성 있게 UX를 가져갈 수 있도록 인터페이스 세트를 구축해놓는 것입니다.
- 컴포넌트를 이해해야, 어떤 요소를 최소한으로 조정하여 효율적으로 UI 구성을 할 수 있습니다.
- 코드가 간소화될 뿐만 아니라 디자인 파일도 함께 간소화를 가능하게 합니다.

### 컴포넌트 코어 시스템

- 프로젝트 진행시 웹 화면의 전반적인 구성요소들의 일관성을 유지하고 팀 내부의 유연한 시스템을 만들기 위한 컴포넌트 시스템의 제작 기준을 제안합니다.
- 컴포넌트는 프로젝트 종류를 막론하고 웹 사이트를 구성하는 공통 요소입니다. 매 프로젝트마다 컴포넌트를 새로 제작해야 하는 비효율적인 프로세스를 벗어나 모든 컴포넌트에 공통으로 적용되는 요소를 도출하여 각 컴포넌트에 적용시켜 매 프로젝트마다 재사용이 가능합니다. 때문에 작업 시간이 대폭 단축되고 더 체계적으로 업무를 수행할 수 있습니다.

#### UI Component Core System

- UI Component Core System은 세부적으로 Size와 Style 두 가지로 나눌 수 있습니다. 첫 번째로 Size는 xs, sm, md, lg, xl 총 다섯 가지로 제공하며 이와 같이 제공하는 이유는 각각의 컴포넌트를 세트로 사용했을 시 높이 값의 통일성을 유지하기 위함입니다. 따라서 모든 컴포넌트는 높이를 기준으로 제작할 것을 권장합니다.
- 두 번째로 Style은 크게 세 가지 옵션으로 분류되며 Background는 컴포넌트의 Fill 값 적용 여부, Radius는 컴포넌트 모서리 반경의 정도, Box Shadow는 그림자의 크기 정도입니다. 이는 프로젝트의 컨셉과 목적에 따라 사용자가 선택적으로 사용 가능합니다.

#### Component container

- Component container는 총 세 가지 옵션이 있으며 아이콘의 정렬 위치와 종류에 따라 여러 종류의 컴포넌트를 제작할 수 있어 업무의 효율성을 높여줍니다.

#### UI Component

- 컴포넌트 코어 시스템을 적용한 UI Component입니다.

#### UI Component Interaction

- 각각의 UI Component의 상황별 액션에 대한 제작 권장사항에 대해서 서술되어 있습니다.

#### Help Text

- 사용자가 정보 입력 중 필드 하단에 노출됩니다. 입력 정보에 대한 검증 결과를 노출하여 사용자가 정확한 정보 입력을 할 수 있도록 돕는 도움말입니다.

## 버튼의 시각적 계층구조

- 시각적 계층구조를 만드는 목적은 오류의 가능성을 줄이고, 사용자의 성공적인 작업 수행에 도움을 주기 위해서 필요합니다. 각각의 버튼들이 어떤 시각적 계층을 가지는지 설명합니다.

### High emphasis

- 면으로 이루어진 버튼입니다. 높은 시각적 계층을 가지며 주로 CTA 버튼으로 쓰입니다. 시각적으로 가장 눈에 띄어 가장 중요한 시각적 계층을 가집니다.

### Medium emphasis

- 선으로 이루어진 버튼입니다. 가장 기본이 되는 버튼으로 일반적인 상황에 사용되며 두 번째 시각적 계층을 가집니다. 주로 Fill Button과 같이 쓰입니다.

### Low emphasis

- 텍스트로 이루어진 버튼입니다. 주로 대화상자의 버튼으로 쓰이며 가장 낮은 시각적 계층을 가집니다. 본문과 구분이 가능하도록 가급적 대문자 사용을 권장합니다.

---

## 참고

- [WEB DESIGN STYLE GUIDE](http://styleguide.co.kr/content/visual-hierarchy/visual-hierarchy.php)