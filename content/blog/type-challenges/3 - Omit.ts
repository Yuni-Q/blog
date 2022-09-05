// 1
// type MyOmit<T, K extends keyof T> = {
//   [U in keyof T]: U extends K ? never : T[U];
// };

// 2 키 값에서 부터 제거 했어야 했다.
type MyOmit<T, K extends keyof T> = {
  [U in keyof T as U extends K ? never : U]: T[U];
};
