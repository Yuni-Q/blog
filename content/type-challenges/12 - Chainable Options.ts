type Chainable<T extends Record<string, unknown> = {}> = {
  option<K extends string, V>(
    key: K,
    value: V,
  ): Chainable<{
    [key in K | keyof T]: key extends K ? V : T[key];
  }>;
  get(): T;
};
