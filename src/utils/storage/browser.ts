const win = typeof window !== `undefined` ? window : {}

export const localStorage = (win as any).localStorage
export const sessionStorage = (win as any).sessionStorage
