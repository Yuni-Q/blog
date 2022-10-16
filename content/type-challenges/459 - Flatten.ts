// type Flatten<T extends unknown[]> = T extends [infer A, ...infer B]
//   ? A extends unknown[]
//     ? [Flatten<A>, ...Flatten<B>]
//     : [A, ...Flatten<B>]
//   : [];
// A도 배별이면 풀어야지...
type Flatten<T extends unknown[]> = T extends [infer A, ...infer B]
  ? A extends unknown[]
    ? [...Flatten<A>, ...Flatten<B>]
    : [A, ...Flatten<B>]
  : [];
