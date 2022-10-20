// type StringToUnion<T extends string> = T extends `${infer L}${infer R} ` ? L | StringToUnion<R> : never
// 빈 스트링 해결
// type StringToUnion<T extends string> = T extends '' ? never : T extends `${infer L}${infer R} ` ? L | StringToUnion<R> : T
// 그 문제가 아니라 공백이 하나 더 있어서 해결되지 못했음...
type StringToUnion<T extends string> = T extends `${infer L}${infer R}`
  ? L | StringToUnion<R>
  : never;
