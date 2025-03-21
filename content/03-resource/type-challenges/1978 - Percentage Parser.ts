// type PercentageParser<A extends string> = A extends `${infer C}${infer D extends number}${infer E}` ? [C, D, E] : ''
// 앞뒤 문자를 추출해 보자
// type PercentageParser<A extends string> = A extends `${infer C extends '+' | '-'}${infer D}` ? D extends `${infer E}%` ? [C, D, '%'] :  [C, D, ''] : A extends `${infer E}%` ? ['', E, '%'] :  ['', E, ''] 
// 놓친 부분 다잡기
type PercentageParser<A extends string> = A extends `${infer C extends '+' | '-'}${infer D}` ? D extends `${infer E}%` ? [C, E, '%'] :  [C, D, ''] : A extends `${infer E}%` ? ['', E, '%'] :  ['', A, ''] 
