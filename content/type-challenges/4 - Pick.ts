type MyPick<T, K extends keyof T> = {
  [U in K]: T[U];
};
