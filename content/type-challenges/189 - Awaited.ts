// 1
// type MyAwaited<T extends Promise<any>> = T extends Promise<infer R>
//   ? R extends Promise<unknown>
//     ? MyAwaited<R>
//     : R
//   : never;

// 2 PromiseLike라는 유틸이 존재한다.
// type MyAwaited<T> = T extends PromiseLike<infer A> ? MyAwaited<A> : T;

//3 Awaited라는 유틸도 존재한다.
type MyAwaited<T> = Awaited<T>;
