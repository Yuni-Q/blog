## 리엑트란 ?

React는 SPA (Single Page Application) 즉, 단일 페이지 응용 프로그램에서 사용자 인터페이스를 구성는데 사용되는 오픈 소스 프론트엔드 JS 라이브러리 입니다.

## 특징

- RealDOM 을 조작하는데 많은 비용이 들어간다는 점을 고려하여 리액트는 RealDOM 대신 VirtualDOM을 사용합니다.
- 서버 사이드 렌더링을 지원합니다.
- 단방향 데이터 흐름 또는 데이터 바인딩을 따릅니다.
- UI 구성 요소를 재사용할 수 있도록 개발할 수 있습니다.

## React에서 컴포넌트를 어떻게 생성

### Functional

components ReactJS 에서 component를 생성하는 가장 간단한 방법입니다.  
props 를 받을 수 있고 React elements 를 리턴할 수 있습니다.  
이런 방법을 pure 한 JS의 function 이기 때문에 functional한 생성법이라고 부릅니다.

### Class components

ES6 Class를 사용하여 component 를 정의할 수 있습니다.  
위에서 본 functional 선언법을 아래와 같이 적용할 수 있습니다.

### 구분

Component 에서 state 또는 life cycle methods 를 필요로 한다면 Class component를 사용하고 그렇지 않다면 Functional component를 사용할 수 있습니다.

## Pure Components

(순수 컴포넌트란 무엇인가요?) PureComponent는 동일한 상태에서는 동일한 결과를 반환합니다.  
shouldComponentUpdate 메서드를 다룰 수 있다는 점을 제외하고는 component와 동일합니다.  
props 또는 state 가 변경될 때 PureComponent 는 state 와 props 에 대해 Shallow Compare을 수행합니다.  
반면 component는 현재 props와 변형될 state를 비교하지 않습니다.  
그렇기 때문에 component는 shouldComponentUpdate가 호출 될 때 마다 다시 render 됩니다. (shouldComponentUpdate의 기본값은 true 이기 때문에)

## state

Component State 는 component의 life cycle 동안 변경될 수 있는 정보를 담고 있는 객체입니다.  
우리는 state를 가능한 단순하게 만들고 state 의 구성 요소의 수를 최소화하기 위해 노력해야 합니다.

- state를 직접 업데이트 하려고 한다면 component 는 re-render 되지 않습니다.
- setState 메서드를 사용해야합니다. setState는 component state 업데이트에 대한 예약을합니다. state 가 변경되면 component는 re-rendering 할 것 입니다.

## props

Props 는 HTML 태그 속성과 유사한 규칙을 사용하여 React component 에 전달되는 값을 포함하는 단일 값 또는 객체입니다.  
부모 component 에서 자식 component 로 전달되는 데이터 입니다.

- 사용자 정의 데이터를 React component 로 전달할 수 있습니다.
- State 변경을 Trigger 할 수 있습니다.
- Component 의 render 메서드 안에서 this.props.reactProp 로 접근하여 사용할 수 있습니다.

## 파일

README.md: .md 확장자는 마크다운(markdown) 파일입니다. 일반 텍스트와 함께 간단한 마크업 언어로 작성합니다. 대부분 프로젝트에는 README.md 파일에 프로젝트 설명 및 설치 방법 등 안내 사항을 작성합니다. 깃허브 리퍼지토리 페이지의 첫 화면에 README.md 파일을 보았을 겁니다. create-react-app 을 설치한 후 바로 깃허브에 프로젝트를 올린다면 README.md 파일 내용은 create-react-app 공식 깃허브 리퍼지토리와 내용이 동일할 것입니다.

node_modules/ 이 폴더에는 npm으로 설치되었던 모든 노드 패키지를 포함합니다. 이미 create-react-app 으로 리액트 애플리케이션을 부트스트래핑 했기 때문에 여러 모듈이 설치되어 있습니다. 이 폴더는 절대로 건드리지 말아야 합니다. npm 명령어를 사용해 패키지를 설치 또는 제거합니다.

package.json 노드 패키지 의존성 및 기타 프로젝트 구성 목록을 포함합니다.

.gitignore git을 사용할 때, 원격 git 리퍼지토리에 제외시킬 모든 파일과 폴더 목록이 나열되어 있습니다. 예를 들어 node_module은 로컬에만 있어야 합니다. 의존성 폴더 전체를 올리지 않고도 공유된 package.json 파일만으로 의존성 패키지를 설치할 수 있습니다.

public/ 배포를 위해 프로젝트 빌드 시 필요한 모든 파일을 말합니다. 프로젝트를 빌드할 때, src/ 폴더 내 모든 코드는 몇 개의 파일로 묶여 public 폴더에 배치됩니다.

build/ 프로덕션 빌드 시 생성되는 폴더입니다. 빌드 시 *src/*와 public 폴더에 있는 파일들이 번들되어 build 폴더에 저장됩니다.

manifest.json 및 registerServiceWorker.js 지금 단계에서는 무시해도 됩니다. 프로젝트에서 사용하지 않은 파일입니다.

## JSX

자바스크립트 없이 render() 메서드로 HTML를 반환했습니다. 새 변수를 만들어 "리액트에 오신 여러분을 환영합니다"라는 값을 주고, 이 변수를 JSX 문법인 중괄호({}) 안에 넣습니다.<br>
JSX의 className은 HTML 표준 class로부터 기인했습니다.<br>

## ES6

자바스크립트 ES6에서 변수 선언은 const 또는 let을 사용합니다. ES6에서는 var를 사용하는 일은 거의 없습니다.<br>
const로 선언된 변수는 다시 할당하거나 선언할 수 없습니다. 불변 데이터 구조(immutable data structures)이기 때문에 한 번 데이터 구조가 정의된 이후, 다시 변경할 수 없습니다.<br>

## ReactDOM

ReactDOM.render() 메서드는 두 개의 인자가 필요합니다. 첫 번째 인자는 렌더링 된 JSX, 두 번째 인자는 리액트 애플리케이션이 HTML에 들어갈 위치입니다. id가 root인 엘레먼트에 들어가게 됩니다. public/index.html 파일을 열어 id 속성을 확인해봅시다.

## Hot Module Replacement

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

# leanpub-start-insert
if (module.hot) {
  module.hot.accept();
}
# leanpub-end-insert
```

> Hot Module Replacement(핫 모듈 리플레이스먼트, 이하 HMR)란 브라우저 내 애플리케이션을 재실행하는 도구입니다. create-react-app에서도 쉽게 사용할 수 있습니다. 이를 위해 src/index.js 파일을 열고 아래와 같이 설정을 추가하겠습니다.<br>
> 가장 큰 장점은 HMR로 애플리케이션 상태를 유지할 수 있다는 것입니다. 애플리케이션에 3단계의 대화창이 있다고 가정해봅시다. 쉽게 다이얼로그 창 기능이라고 생각하면 됩니다. HMR이 없다면 소스 코드를 변경할 때마다 브라우저 페이지가 새로고침 됩니다. 매번 창을 다시 열어 1단계에서 3단계로 이동시켜야 하는 번거로운 일을 해야 합니다. HMR을 사용하면 다이얼로그 창은 3단계 상태로 유지되며, 소스 코드가 수정되어도 애플리케이션의 상태는 그대로 유지됩니다. 애플리케이션 자체는 다시 실행되지만 페이지는 새로고침 되지 않습니다.<br>

## 화살표 함수

화살표(=>)가 하는 일을 알고 있어야 합니다. 화살표 함수는 기존 함수 표현식과 this를 다르게 정의합니다.<br>
기존 함수 표현식은 자기 자신을 this 객체로 정의하지만, 화살표 함수 표현식은 자기 자신을 this를 생성하지 않고, 감싸고 있는 본문 컨텍스트로에서 의미를 갖습니다.<br>
화살표 함수에서 this 사용을 혼동하지 맙시다.<br>

## 클래스

클래스에는 인스턴스화 할 수 있는 생성자(constructor)가 있습니다. 생성자는 매개변수를 사용해 클래스 인스턴스에 할당합니다. 또한 클래스는 함수를 정의합니다. 함수는 클래스와 연관되어 있어 메서드(method)라고도 불립니다. 이 메서드는 클래스 메서드로 참조됩니다.<br>

## key

각 엘레먼트마다 key 속성을 추가해야 합니다. 리액트는 key로 배열의 수정 및 제거된 항목을 식별합니다.<br>

## status

절대로 상태를 직접 변경해서는 안됩니다. 반드시 setState() 메서드를 사용해 상태를 변경해야 합니다. 다음 장에서 setState() 메서드에 대해 알아보겠습니다.<br>

## 클래스 메서드 바인딩

클래스 메서드는 클래스 인스턴스에 자동으로 this를 바인딩하지 않기 때문에 일일이 바인딩을 해줘야 합니다.

> 클래스 메서드에서 this.state에 접근하고자 할 때 this가 undefined이면 접근할 수 없습니다.  
> 따라서 클래스 메서드에서 this를 접근할 수 있게 하려면 클래스 메서드를 this에 바인딩해야 합니다.

> render() 메서드가 실행될 때마다 클래스 메서드를 바인드 하기 때문에, 컴포넌트가 업데이트될 때마다 실행되어 성능에 영향을 미치게 됩니다.  
> 그렇기 때문에 render() 메서드에서 바로 바인딩하지 않는 편이 좋습니다.  
> 생성자에서 클래스 메서드를 바인딩해 컴포넌트가 인스턴스화 될 때 처음에 한 번만 바인딩하는 것이 더 좋은 방법입니다.

## 이벤트 핸들러

onClick={doSomething()}일 경우, doSomething() 함수는 그 즉시 실행됩니다.  
핸들러 표현식이 평가되는데, 그 결과를 함수로 반환하지 않기 때문에 버튼을 클릭해도 아무 일도 일어나지 않습니다.  
따라서 onClick={doSomething}으로 수정하면 실행됩니다.

## 컴포넌트

### 비 상태 함수형 컴포넌트 비 상태 함수형 컴포넌트

props를 입력으로 받고 JSX를 반환하는 함수입니다. 여기까지는 ES6 클래스 컴포넌트와 비슷합니다. 그러나 비 상태 함수형 컴포넌트는 state가 없기 때문에 this.state 또는 this.setState()로 state에 액세스 하거나 업데이트할 수 없습니다. 또한 생명주기 메서드도 없습니다. 아직 생명주기 메서드에 대해 배우지 않았지만, 우리는 생명주기 메서드인 constructor()과 render()을 사용했습니다. 생명주기 동안 constructor()는 한 번만 실행되는 반면, render()은 컴포넌트가 업데이트될 때마다 한번 실행됩니다. 비 상태 함수형은 생명주기 메서드가 없음을 꼭 기억하길 바랍니다.

ES6 클래스 컴포넌트 우리는 이미 ES6 클래스 컴포넌트를 사용해봤습니다. 클래스 정의 시, extends Component란 리액트 컴포넌트로 확장한다는 것을 뜻합니다. extend는 리액트 컴포넌트 API인 생명주기 메서드를 컴포넌트로 연결시킵니다. 때문에 render() 클래스 메서드를 사용할 수 있는 겁니다. 또한 this.state와 this.setState()메서드로 상태를 저장하고 조작합니다.

React.createClass: React.createClass은 리액트 구버전의 클래스 선언문으로 ES5 애플리케이션에서 사용합니다. 페이스북은 ES6을 사용함에 따라 더 이상 React.createClass를 지원하지 않습니다. 리액트 15.5 버전에서 비추천 경고 문구로 등록되었습니다. 이 책 역시 사용하지 않습니다.
