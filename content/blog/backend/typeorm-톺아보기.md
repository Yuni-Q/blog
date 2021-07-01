---
title: typeorm 톺아보기
date: 2021-03-09 09:03:06
category: backend
tags: ['node', 'sql', 'db', 'rdb', 'typeorm', 'orm']
draft: false
---

- Node와 RDB의 ORM 서비스는 sequelize, typeorm, prisma 등 많은 라이브러리들이 있습니다.
- 가장 먼저 사용한 ORM 서비스는 sequelize 였지만 typeorm이 typescript 지원이나 시장의 흐름에 따라 조금 더 많이 사용된다고 생각되어 공부하게 되었습니다.

  - prisma도 고려해 보았으나 아직은 시기상조인 것 같았습니다.

## typeorm에 대해 알아보기 전에 ORM이 무엇인지 알아보겠습니다.

- ORM(Object-relational mapping)은 객체지향 프로그래밍(Object-Oriented-Programming)과 관계형 데이터베이스(Relational-Database)사이의 호환되지 않는 `데이터를 변환하는 시스템`입니다.
  - 객체와 테이블 시스템(RDBMS)을 변형 및 연결해주는 작업입니다.
- ORM을 이용한 개발은 객체와 데이터베이스의 변형에 유연하게 대처할 수 있습니다.
- ORM을 객체 지향 프로그래밍 관점에서 생각해보면, 관계형 데이터베이스에 제약을 최대한 받지 않으면서, 객체를 클래스로 표현하는 것과 같이 관계형 데이터베이스를 객체처럼 쉽게 표현합니다.
  - 객체지향 프로그래밍은 Class를 사용하고 관계형 데이터베이스는 Table을 사용합니다.

## 바로 본론으로 들어가서 typeorm을 프로젝트에서 어떻게 도입할지 알아보겠습니다.

- 의존성 설치 및 init

```zsh
npm install typeorm reflect-metadata @types/node mysql
typeorm init --name [프로젝트이름] --database [데이터베이스]
```

- global place 의 app.ts에 import 추가합니다.
  - reflect-metadata 패키지를 사용하면 유형에 대한 런타임 반영을 수행 할 수 있습니다. TypeORM은 대부분 데코레이터 (@Entity 또는 @Column)와 함께 작동하므로이 패키지는 이러한 데코레이터를 구문 분석하고 SQL 쿼리를 작성하는 데 사용합니다.

```ts
import 'reflect-metadata';
```

### 노드 모듈(typeorm-model-generator) 이용해 모델 자동 생성하는 방법도 있습니다.

- 각 옵션을 수동으로 입력

```zsh
typeorm-model-generator
```

- 커맨드 한 번에 생성

```zsh
typeorm-model-generator -h localhost -u $userName -x $password -e mysql -o ./entities --ssl
```

## typeorm 작성 패턴에 대해 알아보겠습니다.

- Active Record 패턴과 Data Mapper 패턴이 있습니다.

## Active Record 패턴에 대해 먼저 알아보겠습니다.

- Active Record 패턴은 `모델 그 자체에 쿼리 메소드를 정의`하고, `모델의 메소드를 사용`하여 객체를 저장, 제거, 불러오는 방식입니다.
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

## Data Mapper 패턴에 대해서도 알아보겠습니다.

- Data Mapper 패턴은 `분리된 클래스에 쿼리 메소드를 정의`하는 방식이며, `Repository를 이용`하여 객체를 저장, 제거, 불러옵니다.
- Active Record 패턴과의 차이점은 모델에 접근하는 방식이 아닌 `Repository에서 데이터에 접근`한다는 것입니다.
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

## entity들을 만들었다면 데이터베이스에 대한 연결 생성하는 법을 알아 보겠습니다.

```ts
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Photo } from './entity/Photo';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'test',
  entities: [
    Photo,
    // __dirname + '/entity/*.js'
  ],
  synchronize: true,
  logging: false,
})
  .then((connection) => {
    // here you can start to work with your entities
  })
  .catch((error) => console.log(error));
```

## Entity를 만드는 방법에 대해 조금 더 상세히 알아보겠습니다.

### Entity 데코레이터

- 데이터베이스 테이블을 정의하기 전에 실행해야하는 데코레이터입니다.
- 테이블명을 따로 지정하지 않아도 클래스명으로 매핑하지만, 옵션으로 테이블명을 지정할 수 있습니다.

```ts
@Entity('users')
export class User {}
```

- name: `테이블 이름`입니다. 지정하지 않으면 테이블 이름은 엔티티 `클래스명`으로 생성됩니다.
- database: 선택된 DB서버의 데이터베이스 이름입니다.
- schema: 스키마 이름입니다.
  - MySQL에서는 schema와 database가 따로 분리되어있지 않습니다. OracleDB에서는 schema를 따로 분리해서 database에 할당된 사용자로 사용합니다.
- engine: 테이블 생성 중에 설정할 수 있는 DB엔진 이름입니다.
- synchronize: false로 설정할 시 스키마 싱크를 건너뜁니다.
- orderBy: QueryBuilder과 find를 실행할 때 엔티티의 기본순서를 지정합니다.

```ts
@Entity({
  name: 'users',
  engine: 'MyISAM',
  database: 'example_dev',
  schema: 'schema_with_best_tables',
  synchronize: false,
  orderBy: {
    name: 'ASC',
    id: 'DESC',
  },
})
export class User {}
```

### 중복되는 Entity를 상속를 사용하여 해결할 수 있습니다.

- Concrete table inheritance와 Single table inheritance가 있습니다.

#### Concrete table inheritance

- 중복된 칼럼을 베이스가 되는 `추상 클래스`를 선언한 다음 확장할 수 있습니다.
- 참고로 active record 패턴을 사용할 예정이라면, `BaseEntity`라는 이름은 피하는게 좋습니다.
  - typeorm에서 제공하는 클래스인 BaseEntity는 기본 쿼리 메서드 hasId, save, remove 등의 메서드를 담은 클래스입니다.

```ts
// 추상 클래스
export abstract class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}

// 1
@Entity()
export class Photo extends Content {
  @Column()
  size: string;
}

// 2
@Entity()
export class Question extends Content {
  @Column()
  answersCount: number;
}

// 3
@Entity()
export class Post extends Content {
  @Column()
  viewCount: number;
}
```

#### Single table inheritance

- @TableInheritance(), @ChildEntity()를 사용하는 방법입니다.
- 이 방법은 데이터베이스에 Content 테이블이 생성됩니다. `Content 위에 @Entity()를 선언`해줘야 아래와 같은 패턴을 사용할 수 있습니다.

```ts
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}

@ChildEntity()
export class Photo extends Content {
  @Column()
  size: string;
}

@ChildEntity()
export class Question extends Content {
  @Column()
  answersCount: number;
}

@ChildEntity()
export class Post extends Content {
  @Column()
  viewCount: number;
}
```

### Embedded entities

- 이름이 비슷하고 타입이 같은 칼럼들을 묶는 패턴입니다.
- User.name은 User.nameFirst, User.nameLast로 분기합니다. Name은 데코레이터 @Entity()가 붙어있지 않기때문에 위의 패턴처럼 `실제 테이블이 생겨나지는 않습니다`.

```ts
export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column((type) => Name)
  name: Name;

  @Column()
  isActive: boolean;
}
```

### ViewEntity

#### SQL view란 ?

- view는 하나의 `가상 테이블`입니다.
- 실제 데이터가 저장되는 것은 아니지만, view를 통해 데이터를 가상 테이블로 관리가 가능합니다.
- 1개의 view로 여러 테이블의 데이터를 조회할 수 있습니다.
- 복잡한 쿼리를 통해 얻을 수 있는 결과를 간단한 쿼리로 얻을 수 있게 도와줍니다.
- 특정 기준에 따른 사용자 별로 다른 데이터를 액세스할 수 있도록 도와줄 수도 있습니다.
- 조회 대상을 줄이고 싶을 때 사용할 수 있습니다.

#### ViewEntity 데코레이터 인자

- 데코레이터에 들어가는 인자가 아래와 같이 @Entity()와는 약간 다릅니다.
  - name: 테이블 이름입니다. 지정하지 않으면 테이블 이름은 엔티티 클래스명으로 생성됩니다.
  - database: 선택된 DB서버의 데이터베이스 이름입니다.
  - schema: 스키머 이름입니다.
  - expression: view를 정의합니다. 꼭 있어야하는 파라미터로 SQL쿼리문이나 queryBuilder 체이닝 메서드가 들어갈 수 있습니다.
- expression은 SQL 쿼리문이나 QueryBuilder에 체이닝할 수 있는 메서드가 들어갈 수 있습니다. 특이점으로는 필드명 위에 들어가는 데코레이터를 id까지 전부 @ViewColumn()을 사용해야 한다는 점이 있습니다. 만약 사용을 고려한다면, JOIN을 쳐서 테이블끼리 연결을 시키냐, 아니면 view를 통해 나중에 자주 사용할 가상 테이블을 미리 만들어두냐의 차이로 생각할 수 있습니다.

```ts
@ViewEntity({
  expression: `
        SELECT "post"."id" AS "id", "post"."name" AS "name", "category"."name" AS "categoryName"
        FROM "post" "post"
        LEFT JOIN "category" "category" ON "post"."categoryId" = "category"."id"
    `,
})
export class PostCategory {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  categoryName: string;
}
```

- 구조가 복잡하고, 여러군데서 호출하는 데이터의 경우 미리 ViewEntity로 view 테이블을 만들어두면 유용합니다.

### Column

- entity의 속성을 테이블 칼럼으로 표시합니다.

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ tpye: 'varchar', length: 200, unique: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: false })
  isActive: boolean;
}
```

- @Column()에 들어갈 수 있는 옵션들 중 중요하다고 판단한 것들은 아래와 같습니다.

  - type(ColumnType) : `javascript의 원시타입`들을 세분화해서 사용할 수 있습니다. 타입을 정의하는 방법은 다음과 같습니다.
  - length(string | number) : javascript의 원시타입들을 세분화해서 사용하기 위해 type 옵션과 같이 사용할 수 있습니다.
  - onUpdate(string) : cascading을 하기 위한 옵션으로 ON UPDATE 트리거입니다.
  - nullable(boolean) : 칼럼을 NULL이나 NOT NULL로 만드는 옵션입니다. 기본값은 false입니다.
  - default(string) : 칼럼에 DEFAULT 값을 설정합니다.
  - unique(boolean) : 유니크 칼럼이라고 표시할 수 있습니다. 유니크 constraint를 만듭니다. 기본값은 false 입니다.
  - enum(string[] | AnyEnum) : 칼럼의 값으로 enum을 사용할 수 있습니다. enum은 db단에서 처리할 수도, orm단에서 처리할 수도 있습니다.
  - enumName(string) : 다른 테이블에서 같은 enum을 사용하는 경우 필요합니다.
  - transformer({ from(value: DatabaseType): EntityType, to(value: EntityType): DatabaseType }) : 아래와 같은 코드를 만들어내서 json을 문자열로 만들고 파싱하는 역할을 합니다. 또는 boolean을 integer로 바꿔주는 일도 할 수 있습니다.

  ```ts
  import { ValueTransformer } from 'typeorm';

  class SomeTransformer implements ValueTransformer {
    to(value: Map<string, number>): string {
      return JSON.stringify([...value]);
    }
    from(value: string): Map<string, number> {
      return new Map(JSON.parse(value));
    }
  }
  ```

### IdColumn

- PrimaryColumn과 PrimaryGeneratedColum이 있습니다.

#### PrimaryColumn

- @Column()의 옵션인 primary를 대체할 수 있습니다. `PK`를 만드는 역할을 합니다.

#### PrimaryGeneratedColumn

- `자동생성`되는 ID값을 표현하는 방식을 아래와 같이 2가지 옵션을 사용할 수 있도록 도와줍니다.
  - increment: AUTO_INCREMENT를 사용해서 1씩 증가하는 ID를 부여합니다. 기본 옵션입니다.
  - uuid: 유니크한 uuid를 사용할 수 있습니다.

```ts
// using increment
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
}

// using uuid
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
```

##### Generated

- PK로 쓰는 ID 외에 추가로 uuid를 기록하기 위해서 사용할 수 있습니다.

```ts
@Entity()
export class User {
  @Column()
  @Generated('uuid')
  uuid: string;
}
```

### DateColumn

- CreateDateColumn과 UpdateDateColumn, DeleteDateColumn이 있습니다.

#### CreateDateColumn

- 해당 열이 추가된 시각을 자동으로 기록합니다.
- 옵션을 적지 않을시 datetime 타입으로 기록됩니다.

```ts
@Entity()
export class User {
  @CreateDateColumn()
  createdAt: Date;
}
```

#### UpdateDateColumn

- 해당 열이 수정된 시각을 자동으로 기록합니다.
- 옵션을 적지 않을시 datetime 타입으로 기록됩니다.

```ts
@Entity()
export class User {
  @UpdateDateColumn()
  updatedAt: Date;
}
```

#### DeleteDateColumn

- 해당 열이 삭제된 시각을 자동으로 기록합니다.
- 옵션을 적지 않을시 datetime 타입으로 기록됩니다.
- deletedAt에 시각이 기록되지 않은 열들만 쿼리하기 위해 TypeORM의 soft delete 기능을 활용할 수 있습니다.

```ts
@Entity()
export class User {
  @DeleteDateColumn()
  deletedAt: Date;
}
```

##### soft delete이란 ?

- 데이터 열을 실제로 삭제하지 않고, 삭제여부를 나타내는 칼럼인 deletedAt을 사용하는 방식입니다.
- 일반적인 삭제 대신 삭제된 열을 갱신하는 UPDATE문을 사용하는 방식입니다.
- 시각이 기록되지 않은 열들만 필터해서 쿼리하도록 도와주는 역할을 합니다.
- 다른 테이블과 JOIN시 항상 삭제된 열을 검사해서 성능이 떨어집니다.
- 복구하거나 예전 기록을 확인하고자 할 때 간편합니다.

### Relation. 이제 하나의 테이블이 아닌 테이블간의 관계에 대해 알아보겠습니다.

- 테이블간의 관계는 1:1, 1:N, M:N 관계가 있습니다.

#### OneToOne

- @JoinColumn()을 사용한 필드는 FK(외래키)로 타겟 테이블에 등록됩니다. `@JoinColumn()은 반드시 한쪽 테이블에서만 사용해야 합니다`.
- 관계는 단방향과 양방향 모두 작성이 가능합니다.
  - uni-directional은 @OneToOne()을 한쪽에만 써주는 것
  - bi-directional은 양쪽에 모두 써주는 것

```ts
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne((type) => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;
}

// using find* method
const userRepo = connection.getRepository(User);
const users = await userRepo.find({ relations: ['profile'] });

// using query builder
const users = await connection
  .getRepository(User)
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.profile', 'profile')
  .getMany();
```

#### ManyToOne/OneToMany

- @OneToMany()/@ManyToOne()에서는 `@JoinColumn()을 생략`할 수 있습니다.
- `@OneToMany()는 @ManyToOne()이 없으면 안됩니다`.
  - 하지만 반대로 @ManyToOne()은 @OneToMany()이 없어도 정의할 수 있습니다.
- @ManyToOne()을 설정한 테이블에는 `relation id가 외래키`를 가지고 있게 됩니다.

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];
}

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne((type) => User, (user) => user.photos)
  user: User;
}

// using find* method
const userRepository = connection.getRepository(User);
const users = await userRepository.find({ relations: ['photos'] });
// or from inverse side
const photoRepository = connection.getRepository(Photo);
const photos = await photoRepository.find({ relations: ['user'] });

// using query builder
const users = await connection
  .getRepository(User)
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.photos', 'photo')
  .getMany();
// or from inverse side
const photos = await connection
  .getRepository(Photo)
  .createQueryBuilder('photo')
  .leftJoinAndSelect('photo.user', 'user')
  .getMany();
```

#### ManyToMany

- @ManyToMany() 관계에서는 `@JoinTable()이 반드시 필요합니다`. 한쪽 테이블에만 @JoinTable()을 넣어주면 됩니다.
- 단, @ManyToMany()에서 옵션 cascade가 true인 경우 soft delete를 할 수 있습니다. 필요에 따라 사용할 수 있습니다.

```ts
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

// using find* method
const questionRepository = connection.getRepository(Question);
const questions = await questionRepository.find({ relations: ['categories'] });

// using query builder
const questions = await connection
  .getRepository(Question)
  .createQueryBuilder('question')
  .leftJoinAndSelect('question.categories', 'category')
  .getMany();
```

### Tree entity

- TypeORM은 트리 구조를 저장하기 위해 인접 목록 및 클로저 테이블 패턴을 지원합니다.

#### 먼저 셀프조인에 예시에 대해 알아보겠습니다.

- 1개의 테이블에서 부모-자식 관계를 나타낼 수 있는 패턴
- 상품 카테고리(소,중,대분류)
- 사원(사원,관리자,상위관리자)
- 지역(읍/면/동,구/군,시/도)

#### TypeORM은 셀프조인을 아래와 같은 4가지 패턴으로 지원합니다.

#### Adjacency list

- 자기참조를 @ManyToOne(), @OneToMany() 데코레이터로 표현할 수 있습니다.
- 이 방식은 간단한 것이 가장 큰 장점이지만, JOIN하는데 제약이 있어 큰 트리를 로드하는데 문제가 있습니다.

```ts
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne((type) => Category, (category) => category.children)
  parent: Category;

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[];
}
```

#### Nested set

- @Tree(), @TreeChildren(), @TreeParent()를 사용한 또 다른 패턴입니다.
- 읽기 작업에는 효과적이지만 쓰기 작업에는 효과적이지 않습니다.
- 여러 개의 루트를 가질 수 없다는 점도 문제입니다.
- @Tree()의 인자로 `nested-set`이 들어갑니다.

```ts
@Entity()
@Tree('nested-set')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
```

#### Materialized path

- 구체화된 경로 혹은 경로 열거라고 부릅니다.
- 간단하고 효율적입니다.
- nested set과 사용방법은 같습니다.
- @Tree()의 인자로 `materialized-path`이 들어갑니다.

```ts
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
```

### Closure table

- 부모와 자식 사이의 관계를 분리된 테이블에 특별한 방법으로 저장합니다.
- 읽기와 쓰기 모두 효율적으로 할 수 있습니다.
- nested set과 사용방법은 같습니다.
- @Tree()의 인자로 closure-table이 들어갑니다.

```ts
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
```

- 선택적 매개 변수 옵션을 @Tree ( "closure-table", options)로 설정하여 클로저 테이블 이름 또는 클로저 테이블 열 이름을 지정할 수 있습니다.
- ancestorColumnName 및 descandantColumnName은 기본 열의 메타 데이터를 수신하고 열의 이름을 반환하는 콜백 함수입니다.

```ts
@Tree("closure-table", {
    closureTableName: "category_closure",
    ancestorColumnName: (column) => "ancestor_" + column.propertyName,
    descendantColumnName: (column) => "descendant_" + column.propertyName,
})
```

### JoinColumn/JoinTable에 대해 조금 더 알아보겠습니다.

- 아래는 아래 2개의 데코레이터에 공통으로 사용할 수 있는 옵션입니다.
  - eager 옵션이 있어서 N+1 문제를 제어할 수 있음
  - cascade, onDelete 옵션이 있어 관계가 연결된 객체를 추가/수정/삭제되도록 할 수 있습니다. 버그를 유발할 수 있으니 주의해서 사용해야 합니다.

#### N+1 문제란?

- 하위 엔티티들을 첫 쿼리 실행시 한번에 가져오지 않고, Lazy Loading으로 필요한 곳에서 사용되어 쿼리가 실행될때 발생하는 문제가 N+1 쿼리 문제입니다.

#### JoinColumn

- @JoinColumn()을 사용하면 테이블에 자동으로 칼럼명과 참조 칼럼명을 합친 이름의 칼럼을 만들어냅니다.
- 외래키를 가진 칼럼명과 참조칼럼명을 설정할 수 있는 옵션을 가지고 있습니다.
- 설정하지 않으면 테이블명을 가지고 자동으로 매핑합니다.
- 주의할 점으로는 @ManyToOne()에서는 꼭 적지 않아도 칼럼을 자동으로 만들어주지만, `@OneToOne()에서는 반드시 적어줘야 합니다`.

```ts
@Entity()
export class Post {
  @ManyToOne((type) => Category)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'name',
  })
  category: Category;
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

### JoinTable

- `M:N 관계`에서 사용하며 연결 테이블을 설정할 수 있습니다.
- @JoinTable()의 옵션을 사용해 연결 테이블의 칼럼명과 참조 칼럼명을 설정할 수 있습니다.

```ts
@Entity()
export class Question {
  @ManyToMany((type) => Category)
  @JoinTable({
    name: 'question_categories',
    joinColumn: {
      name: 'question',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

### RelationId

- 1:N/M:N 관계에서 entity에 명시적으로 관계가 있는 테이블의 칼럼 id를 적고싶은 경우, @RelationId()를 사용하면 됩니다.
- @RelationId()가 꼭 필요하지는 않지만 entity를 보면서 칼럼을 한 눈에 볼 수 있다는 장점이 있습니다.
- @RelationId()로 테이블을 조회하면 새로운 칼럼명도 결과에 같이 들고올 수 있습니다.
- 하지만 relationId 칼럼에 삽입하여 사용할 수 없습니다.
  - inset or update 시 payload에 relationId가 아닌 relation으로 사용해야 합니다.
  - 관련 이슈 : https://github.com/typeorm/typeorm/issues/3867
  - @RelationId를 사용하는 대신 @Column으로 relationId를 장식 할 수 있습니다. JoinColumn의 이름이 숫자열 이름과 같을 때 TypeORM이 둘 다 일치하고 userId를 설정하거나 사용자를 설정하면 TypeORM이 처리합니다.

```ts
// using many to one
@Entity()
export class Post {
  @ManyToOne((type) => Category)
  category: Category;

  @RelationId((post: Post) => post.category)
  categoryId: number;
}

// using many to many
@Entity()
export class Post {
  @ManyToMany((type) => Category)
  categories: Category[];

  @RelationId((post: Post) => post.categories)
  categoryIds: number[];
}
```

### Subscriber

- 데이터베이스에 특화된 리스너로 CRUD 이벤트 발생을 리슨합니다.
- 다음과 같은 데코레이터들을 가지고 있습니다.
  - @AfterLoad, @AfterInsert, @BeforeInsert, @AfterUpdate, @BeforeUpdate, @AfterRemove, @BeforeRemove
- logging 옵션이 있긴 하지만 쿼리만을 보여주기 때문에 한 줄씩 분석하기 위해 로그를 남기는 경우에는 지양하는 것이 좋습니다.

```ts
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm/index';
import { User } from './User';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return User;
  }
  beforeInsert(event: InsertEvent<User>): Promise<any> | void {
    console.log('User 테이블에 입력 전 : ', event.entity);
  }
  afterInsert(event: InsertEvent<User>): Promise<any> | void {
    console.log('User 테이블에 입력 후 : ', event.entity);
  }
}
```

### Index

- 테이블 `쿼리 속도`를 올려주는 자료구조입니다.
- 테이블 내 1개 혹은 그 이상의 칼럼을 이용해 생성할 수 있습니다.
- 인덱스는 보통 키-필드만 갖고있고, 테이블의 다른 세부항목을 갖지 않기때문에 보통 테이블을 저장하는 공간보다 더 `적은 공간`을 차지합니다.
- 특정 칼럼 값을 가지고 있는 열이나 값을 `빠르게 찾기` 위해 사용합니다.
  - 인덱싱하지 않은 경우는 첫번째 열부터 전체 테이블을 걸쳐 연관된 열을 검색하기때문에 테이블이 클수록 쿼리비용이 커집니다.
  - 인덱싱을 한 경우는 모든 데이터를 조회하지 않고 데이터 파일의 중간에서 검색위치를 빠르게 잡을 수 있습니다.
- `WHERE`절과 일치하는 열을 빨리 찾기 위해서 사용합니다.
- `JOIN`을 실행할 때 다른 테이블에서 열을 추출하기 위해서 사용합니다.
- 데이터 양이 많고 변경보다 `검색이 빈번한 경우` 인덱싱을 하면 좋습니다.

> 쉽게 말해 책에서 transaction이란 주제가 어딨는지 목차 없이 찾으려면 눈물날지도 모릅니다. 책의 주요내용을 가나다순으로 정리한 목록이 있으면 찾기 쉬울텐데 인덱스가 바로 그 역할을 합니다.
> 특정 칼럼에 인덱스를 걸 수 있습니다. 옵션으로 고유키를 부여할 수도 있습니다. 단일 칼럼에 인덱스를 걸고 싶으면 칼럼마다 추가할 수도 있지만, 테이블 전체에 인덱스를 걸고싶은 경우 @Entity()아래 @Index()를 추가할 수도 있습니다.

```ts
// using with single column
@Entity()
export class User {
  @Index()
  @Column()
  firstName: string;

  @Index({ unique: true })
  @Column()
  lastName: string;
}

// using with entity
@Entity()
@Index(['firstName', 'lastName'], { unique: true })
export class User {
  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
```

### Unique

- 특정 칼럼에 고유키 제약조건을 생성할 수 있습니다.
- @Unique()는 테이블 자체에만 적용하는 것이 가능합니다.

```ts
@Entity()
@Unique(['firstName', 'lastName'])
export class User {
  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
```

### Check

- 테이블에서 데이터 추가 쿼리가 날아오면 값을 체크하는 역할을 합니다.

```ts
@Entity()
@Check('"age" > 18')
export class User {
  @Column()
  firstName: string;

  @Column()
  firstName: string;

  @Column()
  age: number;
}
```

### Transaction

- 데이터베이스 내에서 하나의 `그룹으로 처리해야하는 명령문`을 모아서 처리하는 작업의 단위를 말합니다.
  - 여러 단계의 처리를 `하나의 처리처럼` 다루는 기능입니다.
  - 여러 개의 명령어의 집합이 정상적으로 처리되면 정상종료됩니다.
  - 하나의 명령어라도 `잘못되면 전체 취소`됩니다.
- 트랜잭션을 쓰는 이유는 `데이터의 일관성`을 유지하면서 `안정적으로 데이터를 복구`하기 위함입니다.
- 격리성 수준 설정을 통해 트랜잭션이 열려있는 동안 외부에서 해당 데이터에 접근하지 못하도록 락을 걸 수 있습니다.

#### 격리성 수준

- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

#### global connection을 열어서 트랜젝션을 사용하는 경우는 아래와 같이 사용합니다.

```ts
await getManager().transaction(
  'SERIALIZABLE',
  (transactionalEntityManager) => {},
);
```

#### 하지만 global connection은 사이드이펙트가 많은 방법이기때문에 데코레이터나 queryRunner를 사용한 방법을 추천합니다.

- 아래는 데코레이터 @Transaction(), @TransactionManager(), @TransactionRepository()를 사용한 패턴입니다.

```ts
// using transaction manager
@Transaction({ isolation: 'SERIALIZABLE' })
save(@TransactionManager() manager: EntityManager, user: User) {
    return manager.save(user)
}

// using transaction repository
@Transaction({ isolation: 'SERIALIZABLE' })
save(user: User, @TransactionRepository(User) userRepository: Repository<User>) {
    return userRepository.save(user)
}
```

#### 아래는 queryRunner를 사용한 방법입니다. 다만 이 방법에서는 격리성 수준 설정이 불가능합니다.

- startTransaction은 트랜잭션을 시작하는 메서드
- commitTransaction는 모든 변경사항을 커밋하는 메서드
- rollbackTransaction는 모든 변경사항을 되돌리는 메서드

```ts
await queryRunner.startTransaction();

try {
  await queryRunner.manager.save(user);
  await queryRunner.manager.save(photos);

  await queryRunner.commitTransaction();
} catch (err) {
  await queryRunner.rollbackTransaction();
} finally {
  await queryRunner.release();
}
```

### Eager and Lazy Relations

#### eager

- relationship을 설정하지 않아도 eager를 설정하면 자동으로 relationship을 불러옵니다.
  - find\* (즉, find, findAll, findOne...)에서 자동으로 relationship을 불러옵니다.

```ts
@ManyToMany(type => Category, category => category.questions, {
  eager: true
})
```

#### lazy

- Promise로 반환하면, 자동으로 lazy relationship이 됩니다.
  - lazy를 불러올 때는 Promise.resolve를 하던가, await로 불러오면 됩니다.

```ts
@ManyToMany(type => Question, question => question.categories)
questions: Promise<Question[]>;
```

```ts
const question = await connection.getRepository(Question).findOne(1);
const categories = await question.categories;
```

- 참고 : 다른 언어 (자바, PHP 등)에서 왔고 모든 곳에서 게으른 관계를 사용하는 데 익숙하다면 조심하세요. 이러한 언어는 비동기식이 아니며 지연로드는 다른 방식으로 이루어집니다. 그렇기 때문에 거기에서 promise를 사용하지 않습니다. 자바 스크립트와 Node.JS에서 지연로드 된 관계를 원하면 promise를 사용해야합니다. 이것은 비표준 기술이며 TypeORM에서 실험적인 것으로 간주됩니다.

---

## 참고

- [TypeORM 시작하기](https://velog.io/@josworks27/typeORM-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)
- [TypeORM 데코레이터 씹어먹기](https://yangeok.github.io/orm/2020/12/14/typeorm-decorators.html)
- [개발자 마르코](https://gkqlgkql.tistory.com/85)
