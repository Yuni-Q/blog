type Last<T extends unknown[]> = T extends [...infer R, infer K] ? K : never;
