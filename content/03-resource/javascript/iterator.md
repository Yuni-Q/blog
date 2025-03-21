---
title: Iterator
date: 2020-04-12 00:04:35
category: javascript
draft: false
---

- Iterator는 자바스크립트의 collection을 반복하는 새로운 방법입니다. ES6에서 소개된 개념이고 매우 유용하고 많은 곳에서 사용되고 있기 때문에 인기가 많습니다.

## 반복 가능한 것(Iterable)과 Iterator

- `메소드의 이름과 반환 타입이 고정되어 있고 변하지 않는다는 규칙`을 적용한 메소드가 iteratorMethod 입니다.
- 이와 비슷하게 사용자 정의 오브젝트를 반복하는 프로세스의 표준화가 `ECMA`에 의해 진행되었습니다. 하지만, iteratorMethod라는 이름을 사용하는 대신에, ECMA는 Symbol.iterator라는 이름을 사용했습니다. `Symbol`은 유일(unique)한 이름을 제공합니다. 그리고 다른 프로퍼티 이름과 충돌이 발생하지 않습니다. 또한, `Symbol.iterator`는 `iterator라 불리는 오브젝트를 반환합니다`. 이 iterator는 next라 불리는 메소드를 가질 것입니다. iterator는 또한 value와 done이라는 키를 가진 오브젝트입니다.
  - value 키는 현재의 값을 포함할 것입니다. 이 값은 어떠한 타입이든 될 수 있습니다. done은 boolean입니다. done은 모든 값이 전달(fetched)되었는지 아닌지를 나타냅니다.
  - iterables, iterators, next 사이 관계를 `Iteration Protocol(반복 프로토콜)`이라고 부릅니다.
- iterable은 자신의 원소들이 외부에서 접근 가능하도록 만들길 원하는 자료 구조입니다. 키가 Symbol.iterator인 메소드를 구현함으로써 원소들이 외부에서 접근 가능하도록 만듭니다. Symbol.iterator 메소드는 iterator를 위한 공장이라고 보면 됩니다. iterator들을 만들어냅니다.
- iterator는 자료 구조의 원소들을 순회할 수 있는 포인터입니다.

## 오브젝트를 반복 가능(iterable)하게 만들어보기

```javascript
const iterable = {
	[Symbol.iterator]() {
		let step = 0;
		const iterator = {
			next() {
				step++;

				if (step === 1) {
					return { value: 'This', done: false };
				} else if (step === 2) {
					return { value: 'is', done: false };
				} else if (step === 3) {
					return { value: 'iterable', done: false };
				}
				return { value: undefined, done: true };
			},
		};
		return iterator;
	},
};

var iterator = iterator[Symbol.iterator]();
iterator.next(); // { value: 'This', done: false }
iterator.next(); // { value: 'is', done: false };
iterator.next(); // { value: 'iterable', done: false }
iterator.next(); // { value: undefined, done: true };
```

## 자바스크립트 내에서 Iterable들

- 배열과 타입이 정해진 배열
- 문자열 - 각 문자 또는 유니코드 코드-포인트를 반복합니다.
- 맵 - 키-값 쌍을 반복합니다.
- 셋 - 원소를 반복합니다.
- arguments - 함수의 배열과 같은 특별한 변수를 반복합니다.
- DOM 원소들

### 자바스크립트에서 iterables을 인자로 사용하는 생성자들은 다음과 같습니다.

- for-of 반복 - for-of 반복은 반복 가능한 것을 필요로 합니다. 반복이 불가능하다면, for-of는 TypeError를 던질 것입니다.

```javascript
for (const value of iterable) { ... }
```

- 배열의 비구조화 (Destructuring of Arrays) - 비구조화는 반복 가능(iterable)하기에 일어납니다.
- 전개 연산자 (Spread operator)
- Promise.all 과 Promise.race 역시 Promise 전반에서 iterable을 수용합니다.
- Map과 Set
  - Map의 생성자는 Iterable [key, pair]의 쌍을 Map으로 변화시킵니다. 그리고 Set의 생성자는 Iterable의 [key, pair]의 쌍을 Set으로 변화시킵니다.
- Iterator는 또한 Generator의 선배입니다.

## myFavouriteAuthors를 Iterable로 만들기

```javascript
const myFavouriteAuthors = {
	allAuthors: {
		fiction: ['Agatha Christie', 'J. K. Rowling', 'Dr. Seuss'],
		scienceFiction: [
			'Neal Stephenson',
			'Arthur Clarke',
			'Isaac Asimov',
			'Robert Heinlein',
		],
		fantasy: ['J. R. R. Tolkien', 'J. K. Rowling', 'Terry Pratchett'],
	},
	[Symbol.iterator]() {
		// 모든 작가를 배열로 받기
		const genres = Object.values(this.allAuthors);

		// 현재의 장르와 작가 인덱스를 저장하기
		let currentAuthorIndex = 0;
		let currentGenreIndex = 0;

		return {
			// next() 구현
			next() {
				// 현재 장르 인덱스에 따른 작가들
				const authors = genres[currentGenreIndex];

				// doNotHaveMoreAuthors 는 Authors 배열을 전부 돌았을 때, 참이 됩니다.
				// 모든 아이템이 소비되었을 때, 참이 됩니다.
				const doNotHaveMoreAuthors = !(currentAuthorIndex < authors.length);
				if (doNotHaveMoreAuthors) {
					// 더 이상 불러올 작가가 없을 때, 다음 장르 인덱스(currentGenreIndex)가 다음으로 넘어갑니다.
					currentGenreIndex++;
					// 그리고 작가 인덱스(currentAuthorIndex)가 0이 됩니다.
					currentAuthorIndex = 0;
				}

				// 만일 모든 장르가 끝났다면,
				// 우리는 아이터레이터에게 더 이상 우리가 줄 값이 없다는 것을 알려야 합니다.
				const doNotHaveMoreGenres = !(currentGenreIndex < genres.length);
				if (doNotHaveMoreGenres) {
					return {
						value: undefined,
						done: true,
					};
				}

				// 만일 모든 것들이 맞다면, 현재 장르로부터 작가 이름을 반환합니다.
				// 그리고 작가 인덱스를 하나 늘립니다(increment).
				// 다음에는, 다음 작가가 반환됩니다.
				return {
					value: genres[currentGenreIndex][currentAuthorIndex++],
					done: false,
				};
			},
		};
	},
};

for (const author of myFavouriteAuthors) {
	console.log(author);
}

console.log(...myFavouriteAuthors);
```
