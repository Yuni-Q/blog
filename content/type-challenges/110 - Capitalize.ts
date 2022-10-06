type MyCapitalize<S extends string> = S extends `${infer R}${infer T}`
  ? `${Uppercase<R>}${T}`
  : '';
