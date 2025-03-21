// type Awaited<T> = T extends Promise<infer V> ? V : T;
// declare function PromiseAll<T extends readonly unknown[]>(
//   values: T,
// ): Promise<{
//   [key in keyof T]: T[key] extends Promise<any> ? Awaited<T[key]> : T[key];
// }>;

// -readonly 필요
// declare function PromiseAll<T extends readonly unknown[]>(values: T): Promise<{-readonly[key in keyof T] : T[key] extends Promise<any> ? Awaited<T[key]> : T[key] }>

// Awaited가 안 걸리는 이슈 있음 and [number, number, number]가 안되던 이슈
declare function PromiseAll<T extends readonly unknown[]>(
  values: readonly [...T],
): Promise<{ -readonly [key in keyof T]: Awaited<T[key]> }>;
