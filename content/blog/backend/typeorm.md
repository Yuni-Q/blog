---
title: typeorm
date: 2021-03-09 09:03:06
category: backend
tags: []
draft: true
---

## Active Record 패턴

- Active Record 패턴은 모델 그 자체에 쿼리 메소드를 정의하고, 모델의 메소드를 사용하여 객체를 저장, 제거, 불러오는 방식입니다.
- BaseEntity라는 클래스를 사용하여 새로운 클래스에 상속하게 한 후 사용할 수 있습니다. 이를 통해 BaseEntity가 갖고 있는 메소드와 static으로 만들어 내는 커스텀 메소드를 이용할 수 있습니다.
- 규모가 작은 애플리케이션에서 적합하고 간단히 사용할 수 있습니다.

```ts
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  static findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  }
}
```

```ts
// example how to save AR entity
const user = new User();
user.firstName = 'Timber';
user.lastName = 'Saw';
user.isActive = true;
await user.save();

// example how to remove AR entity
await user.remove();

// example how to load AR entities
const users = await User.find({ skip: 2, take: 5 });
const newUsers = await User.find({ isActive: true });
const timber = await User.findOne({ firstName: 'Timber', lastName: 'Saw' });
const timber = await User.findByName('Timber', 'Saw');
```

## Data Mapper 패턴

- Data Mapper 패턴은 분리된 클래스에 쿼리 메소드를 정의하는 방식이며, Repository를 이용하여 객체를 저장, 제거, 불러옵니다.
- Active Record 패턴과의 차이점은 모델에 접근하는 방식이 아닌 Repository에서 데이터에 접근한다는 것입니다.
- 규모가 큰 애플리케이션에 적합하고 유지보수하는데 효과적이다.

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;
}
```

```ts
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository()
export class UserRepository extends Repository<User> {
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  }
}
```

```ts
const userRepository = connection.getRepository(User);

// example how to save DM entity
const user = new User();
user.firstName = 'Timber';
user.lastName = 'Saw';
user.isActive = true;
await userRepository.save(user);

// example how to remove DM entity
await userRepository.remove(user);

// example how to load DM entities
const users = await userRepository.find({ skip: 2, take: 5 });
const newUsers = await userRepository.find({ isActive: true });
const timber = await userRepository.findOne({
  firstName: 'Timber',
  lastName: 'Saw',
});
```

---

## 참고

- [TypeORM 시작하기](https://velog.io/@josworks27/typeORM-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)
