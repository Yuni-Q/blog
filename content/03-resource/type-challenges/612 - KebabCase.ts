// type KebabCase<S extends string> = S extends `${infer F}${infer S}` ? F extends Lowercase<F> ? `${F}${KebabCase<S>}` : `-${Lowercase<F>}${KebabCase<S>}` : ''
// 첫번째인 경우에는 -가 없어야 한다
// 정답을 보니 보조 타입을 만들거나 아래와 같이 해야 한다고 한다
// Uncapitalize: Convert first character of string literal type to lowercase
// type KebabCase<S> = S extends `${infer F}${infer R}`
//   ? R extends Uncapitalize<R>
//     ? `${Lowercase<F>}${KebabCase<R>}`
//     : `${Lowercase<F>}-${KebabCase<R>}`
//   : S;
// 내장 타입도 구현해보기
type Uncapitalize2<T extends string> = T extends `${infer F}${infer R}`
  ? `${Lowercase<F>}${R}`
  : T;
type KebabCase<S> = S extends `${infer F}${infer R}`
  ? R extends Uncapitalize2<R>
    ? `${Lowercase<F>}${KebabCase<R>}`
    : `${Lowercase<F>}-${KebabCase<R>}`
  : S;
