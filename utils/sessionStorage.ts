export const getSessionStorage = (id: string, defaultValue: any = null) => {
  try {
    return JSON.parse(sessionStorage.getItem(id) as string)
  } catch {
    return defaultValue
  }
}

export const setSessionStorage = (id: string, value: any) => {
  try {
    return sessionStorage.setItem(id, JSON.stringify(value))
  } catch {}
}
