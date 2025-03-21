// type TrimLeft<S extends string> = S extends ` ${infer T}` ? TrimLeft<T> : S;
// \n \t도 제거해야함
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer T}`
  ? TrimLeft<T>
  : S;
