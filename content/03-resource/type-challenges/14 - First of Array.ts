// 0
// type First<T extends any[]> = T[0];

// 1
// type First<T extends any[]> = T extends Array<any> ? T[0] : never;

// 2 배열에 길이가 없을 때 never
type First<T extends any[]> = T extends [] ? never : T[0];
