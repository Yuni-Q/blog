type LengthOfString<
  S extends string,
  Arr extends unknown[] = [],
> = S extends `${infer L}${infer R}`
  ? LengthOfString<R, [L, ...Arr]>
  : Arr['length'];
