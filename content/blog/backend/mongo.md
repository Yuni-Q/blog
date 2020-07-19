---
title: mongo
date: 2020-05-25 23:05:85
category: backend
draft: true
---

## find

```javascript
db.user
	.find({ age: { $gt: 30, married: true } }, { _id: 0, name: 1, age: 1 })
	.sort({ age: -1 })
	.limit(1)
	.skip(1);
```

- 첫번째 대괄호 안의 조건으로 두번째 대관호 안에 값이 1이나 true인 필드를 가져옵니다.
- 정렬 가능헙니다.( -1은 내림차순 )
- limit와 skip도 사용 가능합니다.

## update

```javascript
db.user.update({ name: 'nero' }, { \$set: { comment: '필드를 바꿔봅시다.' } });
```

- update는 set을 사용합니다.

## remove

```javascript
db.user.remove({ mame: 'nero' });
```

- 삭제

## mongoose가

- mongoDB에는 mongoose가 있습니다.
- mysql의 시퀄라이즈와는 달리 ORM이 아니라 ODM 입니다. 릴레이션이 아닌 다큐멘트를 사용하기 때문입니다.
- 몽구스 필드의 자료형은 String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array를 값으로 가질 수 있습니다.
- 스키마로 데이터를 한 번 필터링 합니다.

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;
const {
	Type: { ObjectId },
} = Schema;
// commenter: {
// type: ObjectId,
// required: true;
// ref:'User'
// },
// commnet: {
// type: String,
// required: true
// }

// populate 메소드롤 JOIN 기능을 보완
Comment.find({ commenter: req.params.id }).populate('commenter');

const comment = new Comment({
	commenter: req.body.id,
	comment: req.body.commnet,
});
comment.save().then(result => {
	return Comment.populate(result, { path: 'commenter' });
});
```
