// type BuildArr<
//   T extends number,
//   Result extends Array<never> = []
// > = T extends Result["length"] ? Result : BuildArr<T, [never, ...Result]>;

// type MinusOne<T extends number> = BuildArr<T> extends [...infer A, infer B]
//   ? A["length"]
//   : -1;

// 1101은 너무 크다고 수행되지 않음..

type MinusOne<T extends number, Tuple extends unknown[] = []> =
  T extends 0
    ? -1
    : [unknown, unknown, ...Tuple]['length'] extends T
      ? [unknown, ...Tuple]['length']
      : [unknown, ...Tuple]['length'] extends T
        ? Tuple['length']
        : MinusOne<T, [unknown, unknown, ...Tuple]>
