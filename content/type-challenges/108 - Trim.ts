// type Trim<S extends string> = S extends `${' '|'\n'|'\t'}${infer T}${' '|'\n'|'\t'}`? Trim<T> : S;
// 한번에 제거할 수 없나...?
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer T}`
  ? TrimLeft<T>
  : S;
type TrimRight<S extends string> = S extends `${infer T}${' ' | '\n' | '\t'}`
  ? TrimRight<T>
  : S;

type Trim<S extends string> = TrimLeft<TrimRight<S>>;
