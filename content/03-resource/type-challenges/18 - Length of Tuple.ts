// 1
// type Length<T> = T['length'];

// 2 T가 Array인 것을 확인 시켜주자
// type Length<T extends Array<any>> = T['length'];

// 3 readonly를 써야 에러가 나지 않음(튜플이라서 그런듯...)
type Length<T extends readonly any[]> = T['length'];
