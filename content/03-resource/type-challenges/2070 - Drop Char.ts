// type DropChar<S extends string, C extends string> = S extends `${infer A}${infer B}` ? A extends C ? B : `${A}${DropChar<B, C>}` : never
// 빠진 조건들 추가
type DropChar<
  S extends string,
  C extends string,
> = S extends `${infer A}${infer B}`
  ? A extends C
    ? DropChar<B, C>
    : `${A}${DropChar<B, C>}`
  : S;
