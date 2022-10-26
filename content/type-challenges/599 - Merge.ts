// type Merge<F extends Record<string, unknown>, S extends Record<string, unknown>> = {[K in keyof F | keyof S]: K extends keyof F ? F[K] : K extends keyof S ? S[K]: never}

// 겹치는 경우 S가 먼저 와야 최종 결과에 S가 적용됨
type Merge<
  F extends Record<string, unknown>,
  S extends Record<string, unknown>,
> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};
