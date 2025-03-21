---
title: JavaScript 웹 응용 프로그램 작성을위한 최고의 디자인 패턴
date: 2020-04-30 10:04:61
category: javascript
draft: true
---

## 1. Object Creation

```javascript
const newObject1 = new Object();
const newObject2 = Object.create(Object.prototype);
const newObject3 = {};
```

## 2. Basic Constructors

```javascript
function Car(model, year, miles) {
	this.model = model;
	this.year = year;
	this.miles = miles;

	this.toString = function() {
		return `${this.model} has done ${this.miles} miles;`;
	};
}

const civic = new Car('Honda Civic', 2009, 20000);
const mondeo = new Car('Ford Mondeo', 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
```

### 3. Constructor with prototypes.

```javascript
function Car(model, year, miles) {
	this.model = model;
	this.year = year;
	this.miles = miles;
}

Car.prototype.toString = function() {
	return `${this.model} has done ${this.miles} miles;`;
};

const civic = new Car('Honda Civic', 2009, 20000);
const mondeo = new Car('Ford Mondeo', 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
```

## Module Pattern

- 모듈 패턴은 기존 소프트웨어 엔지니어링의 클래스에 캡슐화를 모두 제공하는 방법으로 정의되었습니다.
- JavaScript에서 모듈 패턴은 private/public 메소드와 변수를 단일 오브젝트 내에 포함 할 수있는 방식으로 클래스 개념을 추가로 Emulate 하는데 사용 되므로 특정 부분을 전역 범위로부터 보호합니다.
- 결과적으로 함수 이름이 페이지의 추가 스크립트에 정의 된 다른 함수와 충돌할 가능성이 줄어 듭니다.

### Revealing Module Pattern

```javascript
const personModule = (function() {
	const firstName;
	const lastName;

	return {
		setName(f, l) {
			firstName = f;
			lastName = l;
		},
		getName() {
			return firstName + ' ' + lastName;
		},
	};
})();

personModule.setName('akash', 'pal');
personModule.getName(); //"akash pal"
```

### Singleton Pattern

```javascript
const singleton = (function() {
	let instance;

	function init() {
		let name;

		this.setName = function(name) {
			this.name = name;
		};

		this.getName = function() {
			return this.name;
		};

		return {
			setName: setName,
			getName: getName,
		};
	}

	function getInstance() {
		if (!instance) {
			instance = init();
		}

		return instance;
	}

	return {
		getInstance: getInstance,
	};
})();

var one = singleton.getInstance();
var two = singleton.getInstance();

//the two instance are same
one == two; //true

one.setName('Akash');
two.getName(); //"Akash"
```

## Observer Pattern

- 옵저버는 주체가 관찰자에 따라 객체 목록을 유지하고 상태 변경을 자동으로 알려주는 디자인 패턴입니다.
  - Subject : 관찰자 목록 유지합니다. 관찰자 ​​추가 또는 제거를 합니다.
  - Observer : 대상의 상태 변경에 대해 알려야하는 객체에 대한 업데이트 인터페이스를 제공합니다.
  - Concrete Subject : 상태 변경에 대한 관찰자에게 알림을 브로드캐스트하고 Concrete Observers의 상태를 저장합니다.
  - Concrete Observer : Concrete Subject에 대한 참조를 저장하고 Observer에 대한 업데이트 인터페이스를 구현하여 상태가 주제와 일치하도록 합니다.

## Publish/Subscribe Pattern

- Observer Pattern에서는 주제의 알림을 수신하려는 관찰자가 이벤트를 발생시키는 주체에 관심을 구독해야합니다.
- Publish/Subscribe 패턴은 알림을 수신하려는 구독자와 이벤트를 발생시키는 게시자 사이에있는 토픽/이벤트 채널을 사용합니다. 이 이벤트 시스템을 통해 코드는 가입자가 필요로하는 값을 포함하는 사용자 정의 인수를 전달할 수 있는 애플리케이션 특정 이벤트를 정의 할 수 있습니다. 여기서 아이디어는 구독자와 게시자 간의 종속성을 피하는 것입니다.
- 이는 적절한 이벤트 처리기를 구현하는 구독자가 게시자가 브로드 캐스트 한 주제 알림을 등록하고 수신 할 수 있도록 하므로 관찰자 패턴과 다릅니다.

```javascript
const pubsub = {};
(function(myObject) {
	const topics = {};
	let subUid = -1;

	myObject.publish = function(topic, args) {
		if (!topics[topic]) {
			return false;
		}
		const subscribers = topics[topic];
		let len = subscribers ? subscribers.length : 0;

		while (len--) {
			subscribers[len].func(topic, args);
		}

		return this;
	};
	myObject.subscribe = function(topic, func) {
		if (!topics[topic]) {
			topics[topic] = [];
		}

		const token = (++subUid).toString();
		topics[topic].push({ token, func });
		return token;
	};

	myObject.unsubscribe = function(token) {
		for (let m in topics) {
			if (topics[m]) {
				const j = topics[m].length;
				for (let i = 0; i < j; i++) {
					if (topics[m][i].token === token) {
						topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	};
})(pubsub);

const messageLogger = function(topics, data) {
	console.log(`Logging ${topics} : ${data}`);
};

const subscription = pubsub.subscribe('inbox/newMessage', messageLogger);

pubsub.publish('inbox/newMessage', 'hello world!');
pubsub.publish('inbox/newMessage', ['test', 'a', 'b', 'c']);
pubsub.publish('inbox/newMessage', {
	sender: 'hello@google.com',
	body: 'Hey again!',
});

pubsub.unsubscribe(subscription);

pubsub.publish('inbox/newMessage', 'Hello! are you still there?');
```

## Mediator Pattern

- 중재자는 여러 개체 간의 상호 작용(논리 및 동작)을 조정하는 개체입니다. 다른 객체와 입력의 동작(또는 비 활동)에 따라 어떤 객체를 언제 호출 할 것인지 결정합니다.

```javascript
const orgChart = {
	addNewEmployee: function() {
		const employeeDetail = this.getEmployeeDetail();
		employeeDetail.on('complete', function(employee) {
			const managerSelector = this.selectManager(employee);
			managerSelector.on('save', function(employee) {
				employee.save();
			});
		});
	},
};
```

## Prototype Pattern

- Prototype Pattern은 프로토 타입 상속을 기반으로하고 다른 객체의 프로토 타입으로 작동하는 객체를 생성하는 것으로 생각 할 수 있습니다.
- Prototype Pattern 객체 자체는 생성자가 생성하는 각 객체의 청사진으로 효과적으로 사용됩니다. 사용 된 생성자 함수의 프로토 타입에 코드 샘플 아래과 같은 속성이 포함 된 경우 동일한 생성자에 의해 생성 된 각 객체에도 동일한 속성이 있습니다.
- ECMAScript 5 표준에 정의 된 실제 프로토 타입 상속에는 Object.create을 사용해야합니다.

```javascript
const myCar = {
	name: 'Ford Escort',
	drive: function() {
		console.log("Weeee. I'm driving!");
	},
	panic: function() {
		console.log('Wait. How do you stop this. thing?');
	},
};

const yourCar = Object.create(myCar);
console.log(yourCar.name);
```

```javascript
const vehiclePrototype = {
	init: function(carModel) {
		this.model = carModel;
	},
	getModel: function() {
		console.log(`The model of this vehicle is... ${this.model}`);
	},
};

const vehicle = (function() {
	function F() {}

	return function(proto) {
		F.prototype = proto;
		return new F();
	};
})();

const car = vehicle(vehiclePrototype);
car.init('Ford');
car.getModel();
```

## Command 패턴

- Command 패턴은 메소드 호출, 요청 또는 오퍼레이션을 단일 오브젝트로 캡슐화하는데 목적이 있으며 재량에 따라 실행할 수있는 메소드 호출을 매개 변수화하고 전달할 수 있습니다. 또한 액션을 구현하는 객체에서 액션을 호출하는 객체를 분리 할 수있어 콘크리트 클래스(객체)를 교체 할 때 전체적으로 유연성이 향상됩니다.

```javascript
const carManager = {
	requestInfo: function(model, id) {
		return `The information for ${model} with ID ${id} is foobar`;
	},
	buyVehicle: function(model, id) {
		return `You have succeesfully purchased Item ${id}, a model`;
	},
	arrangeViewing: function(model, id) {
		return `You have successfully booked a viewing of ${model} ( ${id} )`;
	},
};

carManager.execute = function(name) {
	return (
		carManager[name] &&
		carManager[name].apply(carManager, [].slice.call(arguments, 1))
	);
};

console.log(carManager.execute('buyVehicle', 'Ford Escort', '453543'));
console.log(carManager.execute('arrangeViewing', 'Ferrari', '14523'));
console.log(carManager.execute('requestInfo', 'Ford Mondeo', '54323'));
console.log(carManager.execute('requestInfo', 'Ford Escort', '34232'));
console.log(carManager.execute('buyVehicle', 'Ford Escort', '34232'));
```

## Facade Pattern

- Facades는 jQuery와 같은 JavaScript 라이브러리에서 종종 볼 수 있는 구조적 패턴입니다.
- 구현은 광범위한 동작을 가진 메소드를 지원할 수 있지만 이러한 메소드의 "Facade" 또는 제한된 추상화만 사용을 위해 공개됩니다.
- 파사드는 모듈 패턴과 같은 다른 패턴과 통합 될 수도 있습니다.

```javascript
const module = (function() {
	const _private = {
		i: 5,
		get: function() {
			console.log(`current value ${this.i}`);
		},
		set: function(val) {
			this.i = val;
		},
		run: function() {
			console.log('running');
		},
		jump: function() {
			console.log('jumping');
		},
	};

	return {
		facade: function(args) {
			_private.set(args.val);
			_private.get();
			if (args.run) {
				_private.run();
			}
		},
	};
})();

module.facade({ run: true, val: 10 });
```

## Factory Pattern

- 팩토리 패턴은 객체 생성 개념과 관련된 또 다른 생성 패턴입니다.
- 카테고리의 다른 패턴과 다른 점은 명시적으로 생성자를 사용할 필요가 없다는 것입니다. 대신 팩토리는 객체를 생성하기위한 일반 인터페이스를 제공 할 수 있으며, 여기서 생성하려는 팩토리 객체의 유형을 지정할 수 있습니다.

```javascript
function Car(options) {
	this.doors = options.doors || 4;
	this.state = options.state || 'brand new';
	this.color = options.color || 'silver';
}

function Truck(options) {
	this.state = options.state || 'used';
	this.wheelSize = options.wheelSize || 'large';
	this.color = options.color || 'blue';
}

function VehicleFactory() {}

VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createVehicle = function(options) {
	switch (options.vehicleType) {
		case 'car':
			this.vehicleClass = Car;
			break;
		case 'truck':
			this.vehicleClass = Truck;
			break;
		default:
			this.vehicleClass = Car;
	}
	return new this.vehicleClass(options);
};

const carFactory = new VehicleFactory();
const car = carFactory.createVehicle({
	vehicelType: 'car',
	color: 'yellow',
	doors: 6,
});

console.log(car instanceof Car); // true
console.log(car); // Car {doors: 6, state: "brand new", color: "yellow"}
```

## Mixin Pattern

- Mixin은 함수 재사용을 위해 서브 클래스 또는 서브 클래스 그룹에 의해 쉽게 상속 될 수있는 기능을 제공하는 클래스입니다.

```javascript
const Person = function(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.gender = 'male';
};

Person.prototype.fullName = function() {
	return `${this.firstName} ${this.lastName}`;
};

const clark = new Person('Clark', 'Kent');

const Superhero = function(firstName, lastName, powers) {
	Person.call(this, firstName, lastName);
	this.powers = powers;
};

Superhero.prototype = new Object(Person.prototype);
Superhero.prototype.showPowers = function() {
	return this.powers;
};

var superhero1 = new Superhero('Iron', 'Man', ['Flying suit', 'Jarvis']);
console.log(superhero1.fullName() + '-' + superhero1.showPowers()); //Iron Man-Flying suit,Jarvis

var superhero2 = new Superhero('Captain', 'America', [
	'strength',
	'endurance',
	'healing',
]);
console.log(superhero2.fullName() + '-' + superhero2.showPowers()); //Captain America-strength,endurance,healing
```

## 참고

- [Best Design Patterns for writing JavaScript Web applications](https://morioh.com/p/516b8e896f77?f=5c21fb01c16e2556b555ab32&fbclid=IwAR3T2eqcXReUVjU4vXJ-gJjkNvBCEbOQE970hP2kMuyIauKgAG905J8duQs)
