export const getLocalStorage = (id: string, defaultValue: any = null) => {
  try {
    return JSON.parse(localStorage.getItem(id) as string)
  } catch {
    return defaultValue
  }
}

export const setLocalStorage = (id: string, value: any) => {
  try {
    return localStorage.setItem(id, JSON.stringify(value))
  } catch {}
}

export const emptyLocalStorage = (id: string) => {
  try {
    return localStorage.removeItem(id)
  } catch {}
}
