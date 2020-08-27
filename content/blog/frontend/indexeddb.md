---
title: IndexedDB
date: 2020-08-27 11:08:50
category: frontend
tags: ['IndexedDB']
draft: true
---

- IndexedDB는 사용자의 브라우저에 데이터를 영구적으로 저장할 수 있는 방법 중 하나입니다.
- IndexedDB를 사용하여 네트워크 상태에 상관없이 풍부한 쿼리 기능을 이용할 수 있는 웹 어플리케이션을 만들 수 있기 때문에, 여러분의 웹 어플리케이션은 온라인과 오프라인 환경에서 모두 동작할 수 있습니다.

## 기본 패턴

1. 데이터베이스를 엽니다.
2. 객체 저장소(Object store)를 생성합니다.
3. 트랜젝션(Transaction)을 시작하고, 데이터를 추가하거나 읽어들이는 등의 데이터베이스 작업을 요청합니다.
4. DOM 이벤트 리스너를 사용하여 요청이 완료될때까지 기다립니다.
5. (요청 객체에서 찾을 수 있는) 결과를 가지고 무언가를 합니다.

## 저장소를 생성하고 구성하기

```javascript
// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB =
	window.indexedDB ||
	window.mozIndexedDB ||
	window.webkitIndexedDB ||
	window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction =
	window.IDBTransaction ||
	window.webkitIDBTransaction ||
	window.msIDBTransaction;
window.IDBKeyRange =
	window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
```

- 접두어를 사용하여 구현하는 것은 버그가 있거나 불완전하거나 이전 버전의 사양을 따르는 경우가 있습니다. 따라서 프로덕션 상태의 코드에선 사용하지 않는 것을 권장합니다. 제대로 지원하지 않는 브라우저를 지원하게 구현하여 실패하는 것보다 미지원 하는 것이 바람직할 수 있습니다.

```javascript
if (!window.indexedDB) {
	window.alert(
		"Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
	);
}
```

## 데이터베이스 열기

```javascript
// 내 데이터 베이스를 열도록 요청하자
var request = window.indexedDB.open('MyTestDatabase');
```

- open 요청은 데이터베이스를 즉시 열거나 즉시 트랜잭션을 시작하지 않습니다.
- open() 함수를 호출하면 이벤트로 처리한 결과(성공 상태)나 오류 값이 있는 IDBOpenDBRequest 객체를 반환합니다.
- IndexedDB의 다른 비동기 함수 대부분은 결과 또는 오류가 있는 IDBRequest 객체를 반환합니다.
- open() 함수의 결과는 IDBDatabase 의 인스턴스입니다.
- open 메소드의 두번째 매개 변수는 데이터베이스의 버전입니다. 데이터베이스의 버전은 데이터베이스 스키마를 결정합니다. 데이터베이스 스키마는 데이터베이스 안의 객체 저장소와 그것들의 구조를 결정합니다. 데이터베이스가 아직 존재하지 않으면, open operation에 의해 생성되고, 그 다음 onupgradeneeded 이벤트가 트리거되고 이 이벤트 안에서 데이터베이스 스키마를 작성합니다. 데이터베이스가 존재하지만 업그레이드 된 버전 번호를 지정하는 경우 onupgradeneeded 이벤트가 트리거되고 해당 핸들러에 업데이트된 스키마를 제공할 수 있습니다.
  - 중요: 버전 번호는 unsigned long long 숫자입니다. 이는 버전 번호는 매우 큰 정수가 되어야한다는 의미입니다. 또한 부동 소수점을 사용할 수 없다는 것을 의미합니다. 그렇지 않으면 가장 가까운 정수로 변환되어 트랜잭션이 시작되지 않거나 upgradeneeded 이벤트가 트리거 되지 않습니다.

## 제어 객체 생성

```javascript
request.onerror = function(event) {
	// request.errorCode 에 대해 무언가를 한다!
};
request.onsuccess = function(event) {
	// request.result 에 대해 무언가를 한다!
};
```

- 데이터베이스를 여는 경우 오류 이벤트를 발생하는 몇 가지 일반적인 조건이 있습니다. 가장 많은 문제는 사용자가 웹 응용 프로그램에 데이터베이스를 만들 수 있는 권한을 주지 않기로 결정한 것입니다.

```javascript
var db;
var request = indexedDB.open('MyTestDatabase');
request.onerror = function(event) {
	alert("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
	db = request.result;
};
```

## 에러 처리

- 오류 이벤트는 버블링됩니다. 오류 이벤트는 오류를 생성한 request를 대상으로하며, 이벤트는 트랜잭션으로 버블링되고, 마지막으로 데이터베이스 객체로 버블링됩니다. 모든 요청에 에러 처리를 피하고 싶은 경우, 아래와 같이 하나의 오류 핸들러를 데이터베이스 객체에 추가하여 대신할 수 있습니다.

```javascript
db.onerror = function(event) {
	// Generic error handler for all errors targeted at this database's
	// requests!
	alert('Database error: ' + event.target.errorCode);
};
```

- 데이터베이스를 열 때 자주 발생하는 오류 중 하나가 VER_ERR가 있습니다. 이는 디스크에 저장된 데이터베이스의 버전이 현재 코드에서 지정된 버전 번호보다 큼을 나타냅니다. 이 오류는 항상 오류 처리기에서 처리해야합니다.

## 데이터베이스의 버전 생성 또는 업데이트

- 새로운 데이터베이스를 만들거나 기존 데이터베이스의 버전 번호를 높일 때(데이터베이스 열기시, 이전 버전보다 높은 버전 번호를 지정하면), onupgradeneeded 가 트리거되고 request.result(즉, 아래의 예제 : db)에 설정된 onversionchange 이벤트 핸들러에 IDBVersionChangeEvent 객체가 전달됩니다. upgradeneeded 이벤트 처리기에서 이 버전의 데이터베이스에 필요한 객체 저장소를 만들어야합니다:

```javascript
// This event is only implemented in recent browsers
request.onupgradeneeded = function(event) {
	// Save the IDBDatabase interface
	var db = event.target.result;

	// Create an objectStore for this database
	var objectStore = db.createObjectStore('name', { keyPath: 'myKey' });
};
```

- 이 경우 데이터베이스에는 이전 버전의 데이터베이스에 있는 객체 저장소가 이미 있으므로, 이전 버전의 객체 저장소를 다시 만들 필요가 없습니다. 여러분은 새로운 객체 저장소를 만들거나 더 이상 필요하지 않은 이전 버전의 객체 저장소만 삭제하면 됩니다. 기존 객체 저장소를 변경(예, keyPath를 변경) 해아 하는 경우, 이전 객체 저장소를 삭제하고 새 옵션으로 다시 만들어야합니다. (이것은 객체 저장소의 정보를 삭제하니 주의하십시오! 해당 정보를 보존해야하는 경우 데이터베이스를 업그레이드하기 전에 해당 정보를 읽고 다른 곳에 저장해야 합니다.)
- 이미 존재하는 이름으로 객체 저장소를 만들려고 하면 (또는 존재하지 않는 객체 저장소를 삭제하려고 하면) 오류가 발생합니다.
- onupgradeneeded 이벤트가 성공적으로 끝나면, 데이터베이스 열기 요청의 onsuccess 핸들러가 트리거 됩니다.

## 데이터베이스 구성

- IndexedDB는 테이블이 아닌 객체 저장소를 사용하며 하나의 데이터베이스는 여러 개의 객체 저장소를 포함할 수 있습니다. 값을 객체 저장소에 저장할 때마다 값은 키와 연관됩니다. 객체 저장소가 키 경로 또는 키 생성기 옵션의 사용 여부에 따라 키를 제공할 수 있는 여러 가지 방법이 있습니다.

| 키 경로 (keyPath) | 키 생성기 (autoIncrement) | Description                                                                                                                                                                                                                                                            |
| ----------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No                | No                        | 이 객체 저장소는 숫자 및 문자열과 같은 원시 값을 포함한 모든 종류의 값을 보유 할 수 있습니다. 새 값을 추가 할 때 마다 별도의 키 인수를 공급해야합니다.                                                                                                                 |
| Yes               | No                        | 이 객체 저장소는 JavaScript 객체만 포함 할 수 있습니다. 객체에는 키 경로와 같은 이름의 속성이 있어야합니다.                                                                                                                                                            |
|                   |
| No                | Yes                       | 이 객체 저장소는 모든 종류의 값을 보유할 수 있습니다. 키가 자동으로 생성됩니다. 또한 특정 키를 사용하려는 경우 별도의 키 인수를 공급할 수 있습니다.                                                                                                                    |
|                   |
| Yes               | Yes                       | 이 객체 저장소는 JavaScript 객체만 포함 할 수 있습니다. 일반적으로 키가 자동으로 생성되고 생성된 키의 값은 키 경로와 동일한 이름을 가진 속성의 객체에 저장됩니다. 그러나 그러한 속성이 이미 존재하는 경우, 새로운 키를 생성하는 것이 아닌 속성의 값을 키로 사용됩니다. |
|                   |

- 객체 저장소가 기본이 아닌 객체를 보유하고 있으면 객체 저장소에서 인덱스를 만들 수 있습니다. 인덱스를 사용하면 객체의 키가 아닌 저장된 객체의 속성 값을 사용하여 객체 저장소에 저장된 값을 검색할 수 있습니다.
- 또한, 인덱스에는 저장된 데이터에 대한 간단한 제약 조건을 적용 할 수 있는 기능이 있습니다. 인덱스를 작성할 때 고유(unique) 플래그를 설정하면, 인덱스는 인덱스의 키 경로에 대해 동일한 값을 갖는 두 개의 객체가 저장되지 않도록 보장합니다. 따라서 예를 들자면, 사람 집단을 보유하고 있는 객체 저장소가 있고, 두 사람이 동일한 email 주소를 갖지 못 한다는 것을 보장하려는 경우, 이를 강제하기 위해 고유(unique) 플래그 설정한 인덱스를 사용하면 됩니다.

```javascript
const dbName = 'the_name';

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
	// Handle errors.
};
request.onupgradeneeded = function(event) {
	var db = event.target.result;

	// Create an objectStore to hold information about our customers. We're
	// going to use "ssn" as our key path because it's guaranteed to be
	// unique - or at least that's what I was told during the kickoff meeting.
	var objectStore = db.createObjectStore('customers', { keyPath: 'ssn' });

	// Create an index to search customers by name. We may have duplicates
	// so we can't use a unique index.
	objectStore.createIndex('name', 'name', { unique: false });

	// Create an index to search customers by email. We want to ensure that
	// no two customers have the same email, so use a unique index.
	objectStore.createIndex('email', 'email', { unique: true });

	// Use transaction oncomplete to make sure the objectStore creation is
	// finished before adding data into it.
	objectStore.transaction.oncomplete = function(event) {
		// Store values in the newly created objectStore.
		var customerObjectStore = db
			.transaction('customers', 'readwrite')
			.objectStore('customers');
		customerData.forEach(function(customer) {
			customerObjectStore.add(customer);
		});
	};
};
```

- 객체 저장소는 createObjectStore()를 한번 호출함으로써 생성됩니다. 이 메소드는 저장소의 이름과 파라미터 객체를 인자로 받습니다. 파라미터 객체는 선택적으로 사용할 수 있지만, 이는 중요한 설정들을 정의하고 만들고자하는 객체 저장소의 타입을 정의하기 때문에 매우 중요합니다. 이번 예시에서, 우리는 객체 저장소의 이름을 "customers"로 짓고 개별 객체들이 유일하게 저장되도록 만들어주는 특성인 keyPath를 정의합니다. 그리고 사회 보장 번호(ssn)는 고유함이 보장되기 때문에, keyPath로 예제의 ssn 프로퍼티를 사용하며 ssn은 objectStore 에 저장되는 모든 객체에 반드시 포함되어야 합니다. 우리는 또한 저장된 객체의 name 프로퍼티를 찾기 위한 인덱스 "name"을 요청합니다. 또한 createObjectStore(), createIndex() 도 생성하려는 인덱스의 종류를 결정하는 선택적인 객체인 options 을 인자로 받습니다. name 프로퍼티가 없는 객체를 추가할 수는 있지만, 이 경우 그 객체는 "name" 인덱스에 나타나지 않습니다.

## 키 생성기 사용하기

- 객체 저장소를 생성할 때 autoIncrement 플래그를 설정함으로써 키 생성기를 활성화할 수 있습니다. 기본값으로 이 플래그는 설정되지 않습니다.
- 키 생성기가 활성화되면, 객체 저장소에 값을 추가할 때 키가 자동으로 추가됩니다. 처음 생성되면 키 생성기의 값은 항상 1로 설정되고, 새로 생성되는 키는 기본적으로 이전 키에서 1을 더한 값이 됩니다. 키 생성기의 값은 트랜잭션이 취소되는 등 데이터베이스 작업이 복구되는게 아닌 한 절대 작아지지 않습니다. 그래서 레코드를 지우거나 객체 저장소의 모든 레코드를 지우더라도 해당 객체 저장소의 키 생성기에는 영향을 끼치지 않습니다.

```javascript
// Open the indexedDB.
var request = indexedDB.open(dbName, 3);

request.onupgradeneeded = function(event) {
	var db = event.target.result;

	// Create another object store called "names" with the autoIncrement flag set as true.
	var objStore = db.createObjectStore('names', { autoIncrement: true });

	// Because the "names" object store has the key generator, the key for the name value is generated automatically.
	// The added records would be like:
	// key : 1 => value : "Bill"
	// key : 2 => value : "Donna"
	customerData.forEach(function(customer) {
		objStore.add(customer.name);
	});
};
```

## 데이터 추가, 검색 및 제거

- 새 데이터베이스에서 작업을 하기전에, 트랜잭션을 시작할 필요가 있습니다. 트랜잭션은 데이터베이스 객체 단위로 작동하므로 트랜잭션을 사용할 객체 저장소를 지정해줘야합니다. 트랜잭션에 들어오고 나면, 자료가 있는 객체 저장소에 접근할 수 있고 요청을 만들 수 있습니다. 다음으로, 데이터베이스에 변경점을 만들지, 혹은 읽기만 할지 결정해야합니다. 트랜잭션은 다음의 3가지 모드가 있습니다: readonly, readwrite, 그리고 versionchange.
- 객체 저장소나 인덱스를 만들거나 삭제하는 작업을 포함하여 데이터베이스의 "schema"나 구조를 변경하기 위해서 트랜잭션은 반드시 versionchange 여야 합니다. 이 트랜잭션은 IDBFactory.open 메소드를 version 과 함께 호출할 경우 시작됩니다. (최신 사양이 구현되지 않은 WebKit 브라우저에서는 IDBFactory.open 메소드는 데이터베이스의 이름(name) 하나만 인자로 받습니다. 따라서 versionchange 트랜잭션을 수립하기 위해서 IDBVersionChangeRequest.setVersion 를 호출해야 합니다.)
- 이미 존재하는 객체 저장소의 레코드를 읽기 위해서 트랜잭션은 readonly 혹은 readwrite 모드이면 됩니다. 이미 존재하는 객체 저장소에 변경점을 기록하기 위해서는 트랜잭션이 반드시 readwrite 모드여야합니다. 특정 트랜잭션은 IDBDatabase.transaction 으로 열 수 있습니다. 이 메소드는 접근하고 싶은 객체 저장소들의 배열로 정의된 범위인 storeNames와 트랜잭션의 모드mode (readonly 혹은 readwrite), 2개의 인자를 받습니다. 이 메소드는 객체 저장소에 접근할 수 있는 IDBIndex.objectStore 메소드를 포함한 트랜잭션 객체를 반환합니다. 모드가 지정되지 않는다면 기본적으로 트랜잭션은 readonly 모드로 열립니다.

## 참고

- [IndexedDB 사용하기](https://developer.mozilla.org/ko/docs/Web/API/IndexedDB_API/Using_IndexedDB)
