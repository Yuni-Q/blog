// 1
// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;

// 2 잘 모르겠다...
type IsEqual<T, U> = (<G>() => G extends T ? true : false) extends <
  G,
>() => G extends U ? true : false
  ? true
  : false;
type Includes<T extends readonly unknown[], U> = T extends [infer G, ...infer B]
  ? IsEqual<U, G> extends true
    ? true
    : Includes<B, U>
  : false;
