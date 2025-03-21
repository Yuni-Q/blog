// 일단 가볍게 시작해 봅시다.
// type AnyOf<T extends readonly any[]> = T[number] extends true ? true : false;
// true를 다 하긴 어렵다 false를 해볼까? 어림도 없다...
// type AnyOf<T extends readonly any[]> = T[number] extends
//   | 0
//   | false
//   | []
//   | {}
//   | ''
//   ? false
//   : true;
// 배열을 제대로 다뤄보자
// type AnyOf<T extends readonly any[]> = T extends [infer R, ...infer S]
//   ? R extends 0 | [] | { [key: string]: never } | false
//     ? false
//     : true
//   : never;
// 첫번째 말고 다른것도 봐야지...
// type AnyOf<T extends readonly any[]> = T extends [infer R, ...infer S]
//   ? R extends 0 | [] | { [key: string]: never } | false
//     ? AnyOf<S>
//     : true
//   : false;
// 빼먹은 Falsy 값 추가
type AnyOf<T extends readonly any[]> = T extends [infer R, ...infer S]
  ? R extends 0 | [] | { [key: string]: never } | false | undefined | null | ''
    ? AnyOf<S>
    : true
  : false;
