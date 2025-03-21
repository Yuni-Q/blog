---
title: Date
date: 2020-05-03 18:05:73
category: 실용주의 프론트 엔드 개발
draft: true
---

## 함수형

### addDate

```javascript
const addDate = (date, count) => {
	const clonedDate = new Date(date);
	clonedDate.setDate(clonedDate.getDate() + count);
	return clonedDate;
};

const today = new Date(2019, 0, 1);
const tomorrow = addDate(today, 1);
const nextWeek = addDate(today, 7);

console.log(today.getDate()); // 1
console.log(tomorrow.getDate()); // 2
console.log(nextWeek.getDate()); // 8
```

### subtractDate

```javascript
const subtractDate = (date, count) => {
	const clonedDate = new Date(date);
	clonedDate.setDate(clonedDate.getDate() - count);
	return clonedDate;
};

const today = new Date(2019, 0, 8);
const yesterday = subtractDate(today, 1);
const prevWeek = subtractDate(today, 7);

console.log(today.getDate()); // 8
console.log(yesterday.getDate()); // 7
console.log(prevWeek.getDate()); // 1
```

### diffDay

```javascript
const diffDay = (srcDate, targetDate) => {
	const DAY = 1000 * 60 * 60 * 24;
	return Math.floor((targetDate - srcDate) / DAY);
};

const today = new Date(2019, 0, 1);
const nextWeek = new Date(2019, 0, 8);

diffDay(today, nextWeek); // 7
```

### 객체지향

```javascript
class CustomDate extends Date {
	addDate(count) {
		this.setDate(this.getDate() + count);
	}
	subtractDate(count) {
		this.addDate(-count);
	}
	isSame(date) {
		return this.getId() === date.getId();
	}
	getId() {
		return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
	}
	static create(...args) {
		return new CustomDate(...args);
	}
}

const customDate = CustomDate.create(2019, 0, 1);
customDate.getDate(); // 1
customDate.addDate(10); // 11

const customDate = CustomDate.create(2019, 0, 20);
customDate.getDate(); // 20
customDate.subtractDate(10); // 10

const customDate1 = CustomDate.create(2019, 0, 1);
const customDate2 = CustomDate.create(2019, 0, 1);

console.log(customDate1.isSame(customDate2)); // true
```

## 참고

- [Date](https://peter-cho.gitbook.io/book/10/one-piece/date#undefined-1)
