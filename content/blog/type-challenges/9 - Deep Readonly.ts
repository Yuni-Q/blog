// 1
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
// };

// 2 함수도 오브젝트이다.
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends Function
//     ? T[K]
//     : T[K] extends object
//     ? DeepReadonly<T[K]>
//     : T[K];
// };

// 3 IDE에서 Function과 object 키워드를 싫어함
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends (...params: unknown[]) => unknown
    ? T[K]
    : T[K] extends Record<string | number | symbol, any>
    ? DeepReadonly<T[K]>
    : T[K];
};
