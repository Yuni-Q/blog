type Absolute<T extends number | string | bigint> = T extends string
  ? T extends `-${infer L}`
    ? L
    : T
  : Absolute<`${T}`>;
