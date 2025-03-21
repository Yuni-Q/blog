// type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S: S extends `${infer F}${From}${infer B}` ? ReplaceAll<`${F}${To}${B}`, From, To> : S;
// 뒤에꺼만 재귀해야 해 !
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string,
> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer B}`
  ? `${F}${To}${ReplaceAll<B, From, To>}`
  : S;
