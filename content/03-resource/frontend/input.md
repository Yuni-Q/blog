---
title: input
date: 2020-02-08 15:02:74
category: frontend
draft: false
---

## \<input type=" "> 속성

### input 태그에서 공통적으로 사용되는 속성들

#### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Attributes/autocomplete' target="\_blank">autocomplete</a>

- 양식 자동생성 기능 암시. Boolean 속성이 아니며 공백으로 구분된 문자열을 값으로 갖는다.
- 간단하게는 'on', 'off' 값으로 설정하지만 더 복잡한 자동 완성 구문을 사용할 수도 있다.

#### autofocus

- 페이지가 로딩 될 때 자동으로 초점을 맞출 컨트롤을 지정합니다.
- boolean 속성이므로 값을 가지지 않는다.
- 한 페이지에 하나의 컨트롤만 이 속성을 가질 수 있으며, 여러 컨트롤에 지정될 경우 맨 첫번째 컨트롤에 지정됩니다.
- 접근성 측면에서 사용이 권장되지 않습니다.

#### disabled

- 컨트롤의 활성화 여부 지정합니다.
- boolean 속성이므로 값을 가지지 않습니다.
- 지정하지 않아도 조상 태그에 이 속성이 있을 경우 값을 물려받게 됩니다.

#### form

- 컨트롤이 어떤 양식에 속하는지를 나타냅니다.
- form의 id값을 값으로 가집니다.
- 지정하지 않아도 조상 태그 중에 form 태그가 있거나 이 속성을 가지고 있을 경우 값을 물려 받습니다.

#### name

- 전송된 값을 식별하기 위해 사용되는 이름. 이름/값 쌍(name/value pair)을 이룹니다.

#### value

- 전송된 양식 컨트롤의 현재 값. 이름/값 쌍(name/value pair)을 이룹니다.

#### readonly

- 미리 지정된 값을 수정할 수 없음을 나타냅니다.
- boolean 속성이므로 값을 가지지 않습니다.

#### required

- 양식이 전송되기 위해서 반드시 입력하거나 확인이 필요한 컨트롤임을 나타냅니다.
- boolean 속성이므로 값을 가지지 않습니다.

#### list

- 양식 값 예제 목록을 보여주기 위한 datalist와 연결하는 속성입니다.
- datalist의 id값을 값으로 가집니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/text' target="\_blank">input/text</a>

- 한 줄 짜리 텍스트를 입력하는 텍스트 박스를 만듭니다.
- 줄바꿈문자는 자동으로 제거됩니다.
- 유효성 검사를 하지 않을 경우 입력값은 ""(null)일 수 있습다.
- size : 입력 필드의 넓이를 지정합니다. 설정하지 않을 경우 기본값은 20입니다.
  - 양의 정수를 값으로 가집니다. CSS에서 설정한 너비가 크기 속성보다 우선 적용됩니다.
- maxlength : 최대로 입력가능한 최대 문자 수(UTF-16코드 단위)를 지정합니다.
  - 양의 정수를 값으로 가지며, minlenth 값보다는 크거나 같아야 합니다.
  - 브라우저에서는 일반적으로 maxlength 이상의 문자를 입력할 수 없게 막습니다.
  - 혹여라도 더 많이 입력되었을 경우 제약 조건 유효성 검사에 실패합니다.
- minlength : 사용자가 입력해야하는 최소 문자 수(UTF-16코드 단위)를 지정합니다.
  - 음이 아닌 정수를 값으로 가지며, maxlength 값보다는 작거나 같아야 합니다.
  - 입력된 값이 지정된 값보다 적을 경우 제약 조건 유효성 검사에 실패합니다.
- pattern : 유효한 JS정규표현식을 값으로 가집니다.
  - 입력된 값이 정규표현식에 맞지 않을 경우 제약 조건 유효성 검사에 실패합니다.
  - 값이 지정되지 않거나 유효하지 않을 경우 무시됩니다.
- list : 사용자에게 제안할 자동 완성 옵션을 포함하는 \<datalist> 태그의 id를 값으로 가집니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/search' target="\_blank">input/search</a>

- text 타입과 기본적으로 같지만 브라우저에 따라 검색에 특화된 기능을 제공합니다.
- ex) 필드를 클리어하는 삭제 버튼, 동적 키패드에서 엔터키 대신 검색 버튼 제공할 수 있습니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/url' target="\_blank">input/url</a>

- text 타입과 기본적으로 같지만 입력된 값이 url 구문이 맞는지 확인하는 유효성 검사가 포함되어 있습니다.
- 유효성 검사를 통과하는 경우는 입력값이 없거나 "urlscheme://restofurl"의 형식일 때 입니다.
  - ':valid', ':invalid' CSS 가상 클래스가 자동으로 적용됩니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/email' target="\_blank">input/email</a>

- text 타입과 기본적으로 같지만 입력된 값이 email 구문이 맞는지 확인하는 유효성 검사가 포함되어 있습니다.
- 유효성 검사를 통과하는 경우는 입력값이 없거나 "username@domin(.tld)"의 형식일 때 입니다.
  - ':valid', ':invalid' CSS 가상 클래스가 자동으로 적용됩니다.
- 일부 스마트폰에서는 type="email"을 인식하고 키보드에 ".com"를 추가로 띄워줍니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/tel' target="\_blank">input/tel</a>

- text 타입과 기본적으로 같습니다. url, email 타입과는 다르게 유효성 검사가 포함되어 있지는 않습니다.
  - 이는 전화번호 양식이 매우 다양하기 때문으로 pattern 속성으로 유효성 검사를 포함시키는 경우가 많습니다.
- pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"과 함께 사용해서 형식을 지정할 수 있습니다.
- 동적 키패드를 사용할 경우 전화 번호 입력에 최적화 된 맞춤형 키패드를 제공합니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/password' target="\_blank">input/password</a>

- text 타입과 기본적으로 같으나 입력된 문자를 '\*'이나 '•'으로 마스킹 됩니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/number' target="\_blank">input/number</a>

- text 타입과 비슷하나 숫자만 입력받을 수 있도록 유효성 검사가 포함되어 있습니다.

- 브라우저에 따라 값을 조정할 수 있는 스테퍼 화살표가 표시되기도 합니다.
- step : 값의 단위를 지정하기 위해서 사용되는 속성. 0을 초과하는 실수값 혹은 'any'라는 특수값을 가집니다.
  - step 속성이 설정되어 있지 않다면 기본적으로 정수만 입력받을 수 있습니다.
  - 단위에 맞지 않은 값을 입력한 경우 유효성 검사에 실패하며 단위에 맞는 값을 추천해줍니다.
  - 'any' 입력시 스테퍼는 1단위로 움직이지만 모든 숫자 값을 입력받을 수 있습니다. max, min 제한은 유효합니다.
- min : 입력 받을 수 있는 최소 값을 지정합니다.
- max : 입력 받을 수 있는 최대 값을 지정합니다.
- min, max값을 지정하면 자릿수에 따라 필드 너비가 자동조정됩니다.
  - 설정 값이 min > max 일 경우 입력값은 min, max 둘 중 하나만 가능합니다.
  - 설정 값이 min = max 일 경우 입력값은 min=max 값 하나만 가능합니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/range' target="\_blank">input/range</a>

- 숫자를 입력받을 수 있는 볼륨 컨트롤을 표시합니다. 슬라이드 컨트롤과 범위 내 숫자를 선택할 수 있는 컨트롤로 지정합니다.
- pattern 속성을 이용한 유효성 검사는 사용할 수 없습니다.
- 입력된 값이 유효범위 내의 숫자값인지 확인하는 유효성 검사는 자동으로 포함됩니다.
- 추가로 사용되는 속성은 number 타입과 같습니다. 기본 설정은 min="0" max="100" step="1"입니다.
- 기본 값은 min < max 일 경우 min+(max-min)/2 이고, min >= max 일 경우 min 값입니다.
- 설정 값이 min > max 일 경우 입력값은 min 하나만 가능합니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/datetime-local' target="\_blank">input/datetime-local</a>

- 날짜 및 시간을 입력받을 수 있는 컨트롤을 표시합니다.
- Date Picker & 시간입력 필드로 지정합니다.(no time zone)
- 지원하지 않는 브라우저에서는 텍스트 타입으로 표시됩니다.
- 사용되지 않는 datatime 유형에서는 기준 시간대 설정도 포함되어 있었지만 제거되었습니다.
- 기준 시간대 설정이 필요한 경우 따로 선택화면을 제공하는 것이 추천됩니다.
- 값의 형태는 'yyyy-MM-ddThh:mm(:ss)'로 min, max, value 설정 값도 이 형태로 입력해야합니다.
- step 값은 1000ms초 단위로 제공되며 기본값은 60(=1분)입니다.
- step 값이 60의 배수가 아닐 경우 초단위까지 입력받습니다.
- step="any"가 무엇을 의미하는지는 정확하게 정의되어 있지 않습니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/date' target="\_blank">input/date</a>

- 날짜를 입력받을 수 있는 컨트롤을 표시합니다.
- Date Picker로 지정합니다. min, max속성으로 날짜 범위를 지정하면 Date Picker 캘린더에 지정한 기간만 활성화됩니다.
- 지원하지 않는 브라우저에서는 텍스트 타입으로 표시됩니다.
- 값의 형태는 'yyyy-MM-dd'로 min, max, value 설정 값도 이 형태로 입력해야합니다.
- step 값은 86400000ms(=1일) 단위로 제공되며 기본값은 1(=1일)이다. any값은 1과 같은 의미를 가집니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/time' target="\_blank">input/time</a>

- 시간을 입력받을 수 있는 컨트롤을 표시합니다.
- Time Picker로 지정합니다.(no time zone)
- 지원하지 않는 브라우저에서는 텍스트 타입으로 표시됩니다.
- 값의 형태는 'hh:mm(:ss)'로 min, max, value 설정 값도 이 형태로 입력해야합니다.
- step값이 1000ms초 단위로 제공되며 기본값은 60(=1분)입니다.
- step값이 60의 배수가 아닐 경우 초단위까지 입력받습니다.
- 이 타입에서 step="any"가 무엇을 의미하는지는 정확하게 정의되어 있지 않습니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/month' target="\_blank">input/month</a>

- 년도와 월을 입력받을 수 있는 컨트롤을 표시합니다.
- 연도와 달을 Picker로 지정합니다.
- 지원하지 않는 브라우저에서는 텍스트 타입으로 표시됩니다.
- 값의 형태는 'yyyy-MM'로min, max, value 설정 값도 이 형태로 입력해야합니다.
- step값은 월 단위로 제공됩니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/week' target="\_blank">input/week</a>

- 년도와 몇번째 주인지를 입력받을 수 있는 컨트롤을 표시합니다.
  - 1년은 52주 혹은 53주입니다.
- Week Picker로 지정합니다.
- 지원하지 않는 브라우저에서는 텍스트 타입으로 표시됩니다.
- 값의 형태는 'yyyy-Wnn'로 min, max, value 설정 값도 이 형태로 입력해야합니다.
- step값은 주 단위로 제공됩니다.
- 이 타입에서 step="any"가 무엇을 의미하는지는 정확하게 정의되어 있지 않습니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/color' target="\_blank">input/color</a>

- 사용자가 색상을 지정할 수 있는 UI요소를 제공합니다.
- 색상팔레트로 지정합니다.
- value="#ff0000"과 같이 헥사코드로 기본값을 지정할 수 있습니다.
  - 값의 형식은 16진수 형식의 RGB 색상을 지정하는 7자리 문자열('#rrggbb')입니다.
  - 이 속성으로는 알파 채널이 있는 색상은 지정할 수 없습니다.
  - 초기값을 지정하지 않았을 때 기본값은 '#000000'으로 'null'이 아닙니다.
- 16진수값으로 대문자를 쓰더라도 값에는 소문자로 저장됩니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/file' target="\_blank">input/file</a>

- 사용자의 장치 저장소 내에서 파일을 선택할 수 있는 인터페이스를 제공합니다.
- `파일선택 버튼`과 `선택된 파일 표시`로 지정합니다.
- 값으로 선택한 파일의 경로를 나타내는 문자열이 저장됩니다.
- 파일이 선택되지 않았을 경우 저장된 값은 'null'입니다.
- multiful : 사용자가 여러개의 파일을 선택할 수 있음을 나타내는 속성입니다.
  - bool 값을 가집니다.
  - 사용자가 여러개의 파일을 선택했을 경우 첫번째 파일의 문자열이 값으로 저장됩니다.
- accept : 입력받을 파일의 확장자(=unique file type specifiers)를 지정한다. comma(,)로 구분한다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/radio' target="\_blank">input/radio</a>

- 동일 그룹에서 하나만 선택할 수 있는 버튼을 만듭니다.
- 같은 양식 안의 radio 버튼끼리 name 속성 값이 같으면 서로 같은 그룹으로 취급됩니다.
- 양식 제출 시 value에 설정한 값이 전송됩니다. value에 값을 설정하지 않았을 경우 기본값은 'on'입니다.
  - value 값을 따로 설정하지 않을 경우엔 의미없는 값이 전송되는 셈이므로 꼭 설정해야합니다.
- checked 속성을 사용하여 기본값을 설정할 수 있습니다.
  - radio 버튼도 checked 속성을 사용하지 않으면 초기에는 선택된게 없는 상태로 남아있습니다.
  - radio 버튼을 비어두는 경우를 의도하지 않았다면 checked 속성을 사용해서 초기값을 정해둘 것을 권장합니다.
  - checked 속성은 그룹에서 하나의 요소에만 적용되는데 여러 요소에 적용했을 경우 가장 아래 속성에 적용됩니다.
- checkbox 버튼과는 다르게 radio 버튼은 다시 누른다고 선택 해제가 되지 않습니다.

  - 이때 아무것도 선택하지 않은 상태로 돌리고 싶다면 초기화 버튼을 이용하면 됩니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/checkbox' target="\_blank">input/checkbox</a>

- 개별로 선택되거나 선택되지 않은 상태를 나타내는 체크박스 버튼을 만듭니다.
- 선택지 중 0개, 1개 또는 여러 개를 선택할 수 있습니다.
- 개별 요소이므로 checkbox는 여러개를 동시에 선택할 수 있습니다.
  - 그러므로 서버에서 서로 구분하여 데이터를 받도록 만들 필요가 있습니다.
- value 속성 : 체크박스가 체크되었을 경우 서버에 전송할 값. 지정하지 않을 경우 기본 값은 'on'입니다.
- checked 속성 : 체크박스의 초기 상태가 체크된 상태임을 의미하는 속성입니다.
  - MDN 설명에 Bool값이라고 나와있는데 실제로는 속성을 갖느냐 갖지 않느냐에 따라서만 차이를 보입니다.
    -- 초기 상태만 나타낼 뿐 현재 상태는 나타내지 않습니다.
- indeterminate 속성 : 체크박스가 on, off로 나타낼 수 없는 상태를 가짐을 나타내는 속성입니다.
  - 이 속성이 추가되면 요소는 '체크됨', '체크되지 않음','알수없음'의 3가지 상태를 가지게 됩니다.
  - 체크박스의 상태가 다른 속성의 상태에 종속되고 그것들이 서로 얽혀있을 때 사용합니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/button' target="\_blank">input/button</a>

- 특별한 기능 없이 클릭 이벤트를 연결할 수 있는 버튼을 만듭니다.
- value 속성으로 버튼에 표시할 label을 지정합니다.
  - 이 속성이나 button 태그 모두 유효하지만 현재는 button 태그를 쓰는게 더 추천 및 선호됩니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/reset' target="\_blank">input/reset</a>

- 양식에 포함된 모든 컨트롤에 입력된 값을 기본값으로 초기화시키는 버튼을 만든다.
- 클릭 시 \<form> 내부의 모든 값(value)을 초기화해줍니다. 기본값(default value)을 지정해놨다면 이 값으로 다시 초기화됩니다.
- value 속성으로 버튼에 표시할 label을 지정한다.
  - 제출해야하는 양식에 리셋 버튼을 포함시키는 것은 사용자 경험 면에서 추천되지 않습니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/submit' target="\_blank">input/submit</a>

- 양식에 포함된 모든 컨트롤에 입력된 값을 제출하는 버튼을 만듭니다.
- \<input>을 form handler에 데이터를 제출하기 위한 버튼으로 지정합니다.
- value 속성으로 버튼에 표시할 label을 지정합니다.
- formaction : 양식을 제출할 URL을 지정합니다. form 태그의 action 속성을 덮어씁니다.
- formmethod : 양식을 제출할 방법을 지정합니다. form 태그의 method 속성을 덮어씁니다.
- formtarget : action 속성에 지정한 URL을 나타낼 곳을 지정합니다. form 태그의 target 속성을 덮어씁니다.
- formnovalidate : 양식 제출시 제약조건 유효성 검사를 하지 않음을 의미합니다. boolean 속성입니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/image' target="\_blank">input/image</a>

- 양식에 포함된 모든 컨트롤에 입력된 값을 제출하는 이미지 버튼을 만듭니다.
- submit + img 태그라고 생각하면 됩니다.

### <a href='https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/hidden' target="\_blank">input/hidden</a>

22. <input type="hidden"> (MDN)

- 양식에 포함되어 제출될 때 같이 제출되지만 사용자 눈에는 보이지 않는 요소입니다.
- 사용자가 보거나 수정할 수 없는 데이터를 포함하는 용도로 사용합니다. 개발자 도구에서보거나 편집할 수 있으므로 보안의 형태로 사용해서는 안 됩니다.
- value 속성으로 제출될 값을 나타냅니다.
- 화면에 그려지지 않습니다.

## \<button type="submit">과 <input type="submit">의 차이

- 둘 다 데이터를 서버에 제출하기 위한 버튼입니다. 모양도 똑같이 버튼으로 표현된다는 점도 똑같습니다.
- 둘의 차이점은 <button>은 안에 내용을 표현할 수 있고, <input>은 표현할 수 없다는 점입니다.

## \<input form-\*=" "> 속성

- form : \<input>이 어느 \<form>에 속하는지 지정합니다. \<input>의 form 속성과 \<form>의 id 속성이 같아야 합니다.

```html
<form action="/action_page.php" id="form1">
  <input type="text" id="lname" name="lname" form="form1" />
</form>
```

- formaction : type="submit", type="image"와 함께 쓰이며, 데이터 제출 시 데이터를 어디로 보낼지 적습니다. \<form>에서 지정한 action 속성보다 우선순위가 높습니다.

```html
<input type="submit" formaction="/action_page2.php" value="Submit as Admin" />
```

- formenctype : type="submit", type="image"와 함께 쓰이며, POST 메서드로 데이터를 서버에 제출할 경우 인코딩을 지정합니다. \<form>에서 지정한 enctype 속성보다 우선순위가 높습니다.

```html
<input
  type="submit"
  formenctype="multipart/form-data"
  value="Submit as Multipart/form-data"
/>
```

- formmethod : type="submit", type="image"와 함께 쓰이며, 데이터를 보낼 때 사용할 HTTP 메서드를 지정합니다. \<form>에서 지정한 method 속성보다 우선순위가 높습니다.

```html
<input type="submit" formmethod="post" value="Submit using POST" />
```

- formtarget : type="submit", type="image"와 함께 쓰이며, form 제출 후 받은 응답을 어디에 표시할지 키워드를 적습니다. \<form>에서 지정한 target 속성보다 우선순위가 높습니다.

```html
<input type="submit" formtarget="_blank" value="Submit to a new window/tab" />
```

## <input>이 가질 수 있는 속성

- name : \<input>의 이름을 지정합니다. name 속성은 JavaScript에서 요소나 제출된 데이터를 참조해올 때 사용합니다. `form을 제출할 때, name 속성이 있는 요소만 값이 전달됩니다.`
- value : \<input>의 기본값을 지정합니다.
- placeholder \<input>에 입력해야할 형식 샘플이나 간단한 설명을 힌트로 제공합니다.
- pattern : \<input>의 입력값을 확인할 정규식을 지정합니다. ex) pattern="[A-Za-z]{3}"
- required : \<input>을 필수로 작성해야 한다고 지정합니다.
- max, min, step : \<input>의 최댓값, 최솟값, 숫자간격을 지정합니다.
- maxlength, minlength : \<input>의 최대, 최소 문자 수를 지정합니다.
- size : \<input>의 너비(문자)를 지정합니다.
- readonly : \<input>을 읽기전용으로 지정합니다. `form 제출 시 때 읽기전용 필드의 값도 전송됩니다.` 읽기전용 필드는 수정은 되지 않지만, 그 외 사용자와 상호작용(드래그, 복사 등)은 할 수 있습니다.
- disabled : \<input>을 비활성화되도록 지정합니다.
- accept : \<input type="file">에서 선택할 수 있는 파일확장자를 지정합니다.
- alt : \<input type="img">에서 이미지의 대체 텍스트를 지정합니다.
- src : \<input type="img">에서 사용할 이미지의 URL을 지정합니다.
- checked : type="checkbox", type="radio"과 함께 쓰이며, \<input>의 기본(선택)값을 지정합니다.
- autocomplete : text, search, url, tel, email, password, datepickers, range, and color 타입과 함께 쓰이며, \<input>에 자동완성기능 on/off 여부를 지정합니다. on으로 지정할 경우 이전에 입력했던 값을 드랍다운으로 표시해줍니다.
- autofocus : \<input>이 페이지가 로드될 때 자동으로 포커스를 가지도록 합니다.
- dirname : \<input>의 텍스트방향을 지정할 수 있습니. dirname의 `속성.dir`은 name `속성`과 같아야 합니다.(한글처럼 왼쪽에서 오른쪽으로 읽을지, 아랍어처럼 오른쪽에서 왼쪽으로 읽을지의 방향을 말합니다.)
- list : \<input>에서 \<datalist>에서 정의한 옵션을 사용합니다. \<input>의 list 속성과 \<datalist>의 id 속성이 같아야 합니다.
- height, width : 입력 필드의 높이와 너비를 지정합니다.
- multiple : type="file", type="email"과 함께 쓰이며, 입력필드에 복수의 값을 입력할 수 있도록 지정합니다.

## number

- +, -, ., e은 input type이 number이어도 입력이 가능하기 때문에 onKeyDown에서 keyCode를 확인해서 입력을 막습니다.
- 아이폰에서 숫자키패드 노출을 하고 싶다면 `type=tel` 이나 `pattern="\d*"`로 사용합니다.

```tsx
import * as React from 'react';
class InputComponent extends React.Component {
  render() {
    return (
      <input
        type='number'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {}}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
        // type number 일 때 +-.e 의 입력을 막습니다
        onKeyDown={event => {
          if (
            type === 'number' &&
            (event.keyCode === 69 ||
              event.keyCode === 187 ||
              event.keyCode === 189 ||
              event.keyCode === 107 ||
              event.keyCode === 109 ||
              event.keyCode === 190 ||
              event.keyCode === 110)
          ) {
            event.preventDefault();
          }
        }}
      />;)
  }
}
```

- keyCode가 Deprecated 되었습니다...

## input 파일에서 확장자 제한 하기

```html
<input type="file" format="image/png, image/jpg, image/gif" />
```

## input number spinier 제거

```css
/* 엣지, 크롬, 사파리 */
input[type='number']::webkit-inner-spin-button,
input[type='number']::webkit-outer-spin-button {
  -webkit-appearance: none;
}

/* 파이어폭스 */
input[type='number'] {
  -moz-appearance: textfield;
}
```

## input에 x표시 제거

```css
/* IE */
input::-ms-clear,
input::-ms-reveal {
  display: none;
}

/* 엣지, 크롬, 사파리 */
input::-webkit-search-decoration,
input::-webkit-search-cancel-button,
input::-webkit-search-results-button,
input::-webkit-search-decoration {
  display: none;
}

/* 파이어폭스는 기본적으로 뜨지 않음 */
```

## 플레이스홀더 꾸미기

```css
::webkit-input-placeholder {
  color: red;
}
::-ms-input-placeholder {
  color: blue;
}
::-moz-placeholder {
  color: orange;
}

/* 최신 브라우저 */
::placeholder {
  color: pink;
}
```

---

## 참고

- ['HTML 기본' 카테고리 목록](https://lypicfa.tistory.com/611)
