// type Pop<T extends unknown[]> = T extends [...infer R, infer D] ? R : never
// 빈배열의 경우 안됨
type Pop<T extends unknown[]> = T extends [...infer R, infer D] ? R : [];
