// type Replace<S extends string, From extends string, To extends string> = S extends `${infer F}${From}${infer B}` ? Replace<`${F}${To}${B}`, From, To> : S
// 재귀적으로 안 하는데 혼자 앞서 나감
// type Replace<S extends string, From extends string, To extends string> = S extends `${infer F}${From}${infer B}` ? `${F}${To}${B}` : S
// From이 ''면 아무것도 안하기(근데 이게 맞나...?)
type Replace<
  S extends string,
  From extends string,
  To extends string,
> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer B}`
  ? `${F}${To}${B}`
  : S;
