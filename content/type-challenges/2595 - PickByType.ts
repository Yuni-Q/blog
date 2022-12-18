// type PickByType<T extends Record<string, any>, U> = {
//   [K in keyof T]: T[K] extends U ? T[K] : never
// }

// 키를 수정해야 한다
// type PickByType<T extends Record<string, any>, U> = {
//   [K in keyof T as T[K] extends U ? T[K] : never]: T
// }

type PickByType<T extends Record<string, any>, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};
