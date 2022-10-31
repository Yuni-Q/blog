// type Diff<
//   O extends Record<string, unknown>,
//   O1 extends Record<string, unknown>,
// > = { [K in keyof O1 as keyof O1 extends keyof O ? never : keyof O1]: O1[K] };
// 답에 아래와 같이 되어 있는데 안 되네요;;
// type Diff<
//   O extends Record<string, unknown>,
//   O1 extends Record<string, unknown>,
// > = Omit<O, keyof O1> & Omit<O1, keyof O>;
// 좀 더 풀어서 써보자
type Diff<
  O extends Record<string, unknown>,
  O1 extends Record<string, unknown>,
> = { [K in keyof O1 as K extends keyof O ? never : K]: O1[K] } & {
  [K in keyof O as K extends keyof O1 ? never : K]: O[K];
};
// 최선을 다해 봐도...
// type Diff<
//   O extends Record<string, unknown>,
//   O1 extends Record<string, unknown>,
// > = {
//   [K in keyof O1 as K extends keyof O ? never : K]: K extends keyof O1
//     ? O1[K]
//     : K extends keyof O
//     ? O[K]
//     : never;
// };
// 3번째꺼에서 아래를 추가하면 풀리네요... 객체를 하나로 만들어 줘야 하나봐요...
type Compute<T> = T extends T ? { [K in keyof T]: T[K] } : never;
