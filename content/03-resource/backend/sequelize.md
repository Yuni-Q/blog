---
title: sequalize
date: 2020-05-09 11:05:70
category: backend
draft: true
---

## Sequelize에서 Raw Query 사용

```javascript
const result = async () => {
	const query = 'select * form users where name = :name';
	const values = {
		name: 'yuni-q',
	};
	const list = await models.sequelize.query(query, {
		replacements: values,
		type: models.sequelize.QueryTypes.SELECT,
	});
	return list;
};
console.log(result);
```

## like

- 라이크 조건절은 두 가지 방법으로 사용합니다. 둘다 동일하게 동작합니다.

```javascript
models.User.findAll({
	where: { name: { like: '%keyword%' } },
});

models.User.findAll({
	where: ['name like ?', '%keyword%'],
});
```

## lt, gt, lte, gte, between

- 값의 대소를 비교하는 경우 lt, gt, lte, gte를 사용합니다.
- Date.parse() 같은 날짜 함수를 사용할 수도 있습니다.
- 만약 구간을 검색할 경우 between 을 사용합니다.

```javascript
models.User.findAll({
	where: { createdAt: { lt: new Date() } },
});

models.User.findAll({
	where: { createdAt: { gt: Date.parse('2014-01-01') } },
});

models.User.findAll({
	where: { createdAt: { between: [new Date(), Date.parse('2012-01-01')] } },
});
```

## join

- 조인할 대상을 include에 배열로 넘겨줍니다. 배열이기 때문에 여러 테이블을 조인하는 것이 가능합니다. 조인 조건은 테이블 스키마 작성시 설정한 Association 관계에 따라 알아서 선택됩니다.
- 외래키 이외에 조인 조건을 추가해야 한다면 {model: , wehre: } 객체에 조인 조건을 설정하여 배열에 추가합니다.

```javascript
models.User.find({
  include: [models.Post]
});

models.User.find({
  include: [{
    model: models.Post
    where: {}
  }]
});
```

## orderby, limit

- 페이징 기능을 구현할 때 많이 사용하는 쿼리입니다.

```javascript
models.User.findAll({
	offset: 0,
	limit: 100,
	order: 'createdAt desc',
});
```

## groupby, count()

- 특정 키로 그룹핑하고 결과를 카운팅하여 count로 이름 붙입니다.

```javascript
models.User.findAll({
	attributes: ['GroupId', [models.sequelize.fn('count', '*'), 'count']],
	group: 'GroupId',
});
```

## attributes, alias, left()

- 특정 필드만 얻고자 할 경우 attributes에 배열로 필드명을 넘겨줍니다.
- 배열안에 [‘필드명’, ‘alise 명’] 배열로 alise를 설정할 수도 있습니다.
- 필드명에 함수를 적용할 때는 models.sequelize.fn()을 사용합니다.
- 배열의 세번째 코드는 createdAt 필드 값의 좌측 10자리 문자열을 반환하여 date로 이름 붙인 예제입니다.

```javascript
models.User.findAll({
	attributes: [
		'id',
		['name', 'userName'],
		[
			models.sequelize.fn('left', models.sequelize.col('createdAt'), 10),
			'date',
		],
	],
	where: {},
});
```

## findOrCreate()

- 테이블의 특정 로우를 찾는 것이고 만약 없을 경우 INSERT 구문을 실행하여 로우를 생성합니다. 몽고디비의 upsert() 와 비슷합니다.

```javascript
models.User.findOrCreate({
	where: { id: req.user.id },
}).spread(function(user, created) {
	if (created) {
		// create 실행됨
	}
	// user 객체
});
```

## literal()

- 시퀄라이즈에서 제공하는 메소드만으로는 쿼리가 부족한 경우가 있습니다. literal() 은 쿼리 문자열을 추가해 주는 기능입니다.

```javascript
User.findAll({
	attributes: [
		['name', 'username'],
		[Sequelize.literal('age + 1'), 'age'],
	],
}); // SELECT `name` AS `username`, age + 1 AS `age` FROM `users` AS `user`
```

## transaction

```javascript
const t = await sequlize.transaction();
try {
	const success = await User.findOne({
		where: {
			id,
		},
		transaction: t,
	});
	await t.commit();
} catch (error) {
	await t.rollback();
}
```

## 참고

- [sequalize 쿼리](http://jeonghwan-kim.github.io/sequalize-%EC%BF%BC%EB%A6%AC/)
