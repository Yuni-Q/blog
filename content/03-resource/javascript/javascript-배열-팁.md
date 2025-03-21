---
title: JavaScript 배열 팁
date: 2020-04-29 00:04:64
category: javascript
draft: true
---

## 1. 중복 값 삭제

```javascript
const fruits = [
	'banana',
	'apple',
	'orange',
	'watermelon',
	'apple',
	'orange',
	'grape',
	'apple',
];

const uniqueFruits = Array.from(new Set(fruits));
console.log(uniqueFruits); // returns ['banana', 'apple', 'orange', 'watermelon', 'grape']

const uniqueFruits2 = [...new Set(fruits)];
console.log(uniqueFruits2); // returns ['banana', 'apple', 'orange', 'watermelon', 'grape']
```

## 2. 배열의 값을 변경

```javascript
const fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple'];

fruits.splice(0, 2, 'potato', 'tomato');
console.log(fruits); // returns ['potato', 'tomato', 'orange', 'watermelon', 'apple']
```

## 3. map ()없는 맵 배열

```javascript
const friends = [
	{ name: 'John', age: 22 },
	{ name: 'Peter', age: 23 },
	{ name: 'Mark', age: 24 },
	{ name: 'Maria', age: 22 },
	{ name: 'Monica', age: 21 },
	{ name: 'Martha', age: 19 },
];

// Use Array.from()
const friendsNames = Array.from(friends, ({ name }) => name);
console.log(friendsNames); // returns ['John', 'Peter', 'Mark', 'Maria', 'Monica', 'Martha']

// Use Array.map()
const friendsNames2 = friends.map((friend, index) => {
	return friend.name;
});
console.log(friendsNames2); // returns ['John', 'Peter', 'Mark', 'Maria', 'Monica', 'Martha']
```

## 4. 배열 비우기

```javascript
let fruits = [
	'banana',
	'apple',
	'orange',
	'watermelon',
	'apple',
	'orange',
	'grape',
	'apple',
];

fruits.length = 0;

// or
fruits = [];

// or
fruits.splice(0);

// or
while (fruits.length > 0) {
	fruits.pop();
}

console.log(fruits); // returns []
```

## 5. 배열을 객체로 변환

```javascript
const fruits = ['banana', 'apple', 'orange', 'watermelon'];
const fruitsObj = { ...fruits };

console.log(fruitsObj); // returns {0: 'banana', 1: 'apple', 2: 'orange', 3: 'watermelon'}
```

## 6. 배열 병합

```javascript
const fruits = ['apple', 'banana', 'orange'];
const meats = ['poultry', 'beef', 'fish'];
const vegetables = ['potato', 'tomato', 'cucumber'];

// Use Spread Operator ES6
const foods = [...fruits, ...meats, ...vegetables];
console.log(foods); // returns ['apple', 'banana', 'orange', 'poultry', 'beef', 'fish', 'potato', 'tomato', 'cucumber'];

// Use concat() method
const foods2 = fruits.concat(meats, vegetables);

console.log(foods2); // returns ['apple', 'banana', 'orange', 'poultry', 'beef', 'fish', 'potato', 'tomato', 'cucumber'];
```

## 7. 두 배열 사이에서 같은 값을 찾습니다

```javascript
const numOne = [0, 2, 4, 6, 8, 8];
const numTwo = [1, 2, 3, 4, 5, 6];

// Use include() method
const duplicatedValues = [...new Set(numOne)].filter(item =>
	numTwo.includes(item)
);
console.log(duplicatedValues); // returns [2, 4, 6]

// Use has() method
const firstValues = new Set(numOne);
const duplicatedValues2 = numTwo.filter(item => firstValues.has(item));
console.log(duplicatedValues2); // returns [2, 4, 6]
```

## 8. 배열에서 Falsy 값을 삭제하십시오

```javascript
let mixedArr = [
	0,
	'blue',
	'',
	NaN,
	9,
	true,
	undefined,
	'white',
	false,
	'',
	null,
];
let trueArr = mixedArr.filter(Boolean);

console.log(trueArr); // returns ['blue', 9, true, 'white']
```

## 9. 배열에서 마지막으로 나타나는 요소의 색인을 찾습니다

```javascript
const nums = [1, 5, 2, 6, 3, 5, 2, 3, 6, 5, 2, 7];
const lastIndex = nums.lastIndexOf(5);

console.log(lastIndex); // returns 9
```

## 10. 배열의 값을 계산

```javascript
let numbers = [5, 15, 20];

let sum = numbers.reduce(function(a, b) {
	return a + b;
});

let sub = numbers.reduce((a, b) => {
	return a - b;
});

let mul = numbers.reduce((a, b) => {
	return a * b;
});

let div = numbers.reduce((a, b) => {
	return a / b;
});

console.log(sum); // 40
console.log(sub); // -30
console.log(mul); // 1500
console.log(div); // 0.016666666666666666
```

## 11. 배열 반전

```javascript
// 원래 배열을 변경
const colors = ['white', 'green', 'navy', 'pink', 'purple'];

const reversedColors = colors.reverse();

console.log(reversedColors); // returns ['purple', 'pink', 'navy', 'green', 'white']
console.log(colors); // returns ['purple', 'pink', 'navy', 'green', 'white']
```

```javascript
const colors = ['white', 'green', 'navy', 'pink', 'purple'];

const reversedColors = [...colors].reverse();
// or
const reversedColors2 = colors.slice().reverse();

console.log(colors); // returns ['purple', 'pink', 'navy', 'green', 'white']

console.log(reversedColors); // returns ['purple', 'pink', 'navy', 'green', 'white']
console.log(reversedColors2); // returns ['purple', 'pink', 'navy', 'green', 'white']
```

## 12. 배열에서 가장 작은 숫자 찾기

```javascript
let numbers = [80, 300, 1500];

let min = Math.min(...numbers);
// Or
let min = Math.min.apply(null, numbers);

console.log(min); // 80
```

## 참고

- [12 useful JavaScript array tips you should know](https://morioh.com/p/5d0c6e66ee9c?fbclid=IwAR1_jyG15ixG3rfhqKAul4D689I5tKP8qOjc1HBnUCKjp7y1VAUMP-6p4CU)
