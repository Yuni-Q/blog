---
title: JavaScript Class
date: 2020-02-03 12:02:89
category: javascript
draft: false
---

- ES2015(ES6)에서 자바스크립트에 클래스(Class)가 도입되었습니다.
- 자바스크립트는 기본적으로 프로토타입 기반의 언어입니다.

- 프로토타입 기반으로 객체 지향적으로 설계하는 것이 복잡하여 클래스라는 sugar syntax 문법이 도입된 것입니다.
  - Java에서의 클래스와 똑같은 기능을 한다고 생각 할 수 있지만 여전히 객체 지향을 흉내내고 있고 그 내부는 여전히 프로토타입으로 구성되어 있는 것입니다.
  - 하지만 이전 ES5와는 전혀 다르게 구현되어 있기 때문에 마냥 'sugar syntax로 되어 있다' 혹은 프로토타입으로 모든 것이 구현되어 있다고 보는 것 또한 옳지 않습니다.
- 클래스는 선언문 또는 표현식으로 선언할 수 있습니다.
- 클래스의 선언부는 let과 const와 마찬가지로 호이스팅은 되지만 temporary dead zone이 형성됩니다.
- 클래스의 코드는 ‘use strict’를 선언하지 않아도 strict 모드에서 실행됩니다.
- 자바스크립트에서는 프로토타입을 사용해서 클래스 밖에서도 메서드를 추가할 수 있습니다. 이미 생성된 인스턴스에 메서드를 추가하게 되면, 이전에 생성되었던 인스턴스들이 새로 추가된 메서드들을 공유해야하기 때문에 부하가 걸리지만 코드가 유연해진다는 장점도 존재한다.
  - Java에서는 해당 기능을 사용할 수 없습니다.
- 슈퍼 클래스의 메소드를 오버라이딩(Overriding)할 수 있습니다. 하지만 오버로딩(Overloading)을 사용 할 수 없습니다.
- 자바스크립트 클래스에서 static 키워드를 사용하면 정적 메소드를 정의할 수 있습니다. 정적 메소드라 함은 인스턴스를 생성하지 않고 사용할 수 있는 메소드를 말합니다. 정적 메소드는 인스턴스를 생성하지 않고도 호출할 수 있지만 인스턴스에서는 호출할 수 없습니다.
- new.target을 이용하면 슈퍼 클래스에서 서브 클래스의 static method에 접근할 수 있다.

## TypeScript의 Class

- type과 Access Modifier가 추가 되었습니다.
- class에서 modifier란 class의 method나 property에 부여할수 있는 특징을 말합니다.
  - public
  - private
  - protected
  - readonly
  - static
- 자바스크립트 클래스의 method와 property는 기본적으로 public이며, 다른 modifier를 강제할 수 있는 문법이 없습니다. (ES10에서 부터는 #을 변수명 앞에 붙이면 private선언이 되기는 합니다.) 타입스크립트에서는 modifier를 강제할 수 있습니다.
- modifier의 목적은 해당 method나 property에 접근할 수 있는 권한을 명시하기 위함입니다.
- 아무것도 정해 두지 않으면 기본적으로 public이 부여됩니다. 어느곳에서든지 해당 method나 property에 접근할 수 있습니다.
- private이 부여된 method의 경우에는 동일한 클래스에 있는 다른 method에 의해서만 호출 될 수 있습니다.
- protected가 부여된 경우, 동일한 클래스에 있는 다른 method 혹은 child class에 있는 method에 의해 호출될 수 있습니다.
- modifier를 추가하는 이유는 다른 개발자들이 call할 수 있는 method를 제한하기 위함입니다. 잘못 사용하는 경우 어플리케이션을 망가뜨릴 정도로 복잡한 method가 다른 개발자에 의해 call되는걸 막는것이 주 목적입니다.

## 참고

- [Daily Study Logging46 - 타입스크립트, Instance Method Modifiers](https://www.hamadevelop.me/dailyblogging46/?fbclid=IwAR0P-4UBlh8r7Tt6d3CepKAzZu4MxfsjXsbsHoNDoV13qqu57gZTHgEdJxE)
