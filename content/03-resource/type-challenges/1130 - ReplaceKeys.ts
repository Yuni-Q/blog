// type ReplaceKeys<U extends Record<string, unknown>, T extends string, Y extends Record<string, unknown>> = {
//   [K in keyof U]: K extends T ? K extends keyof Y ? Y[K] : U[K] : U[K]
// }
// 문제를 똑바로 읽자!
type ReplaceKeys<
  U extends Record<string, unknown>,
  T extends string,
  Y extends Record<string, unknown>,
> = {
  [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
};
