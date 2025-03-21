// type IsNever<T> = T extends never ? true : false;
// 타입 매개변수와 유니온이 만나면 분배 법칙이 실행된다.
// never는 유니온이다(never 공집합이다). 공집합이기 때문에 분배 법칙이 일어나지 않는다. never extends never는 never이다.
type IsNever<T> = [T] extends [never] ? true : false;
