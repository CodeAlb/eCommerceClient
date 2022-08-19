// Join valid class names.
export const cn = (...classNames: any[]) => {
  return classNames.filter(Boolean).join(' ')
}

// Round number by half.
export const roundByHalf = (num: number) => {
  return Number((Math.round(num * 2) / 2).toFixed(1))
}

// Calculate total price.
export const calculateTotal = (items: any[]) => {
  let itemsCount = 0
  let itemsTotal = 0

  items.forEach((item) => {
    itemsCount += item.amount
    itemsTotal += item.price * item.amount
  })

  return {
    itemsCount,
    itemsTotal,
  }
}

// Fill array.
export const fillArray = (items: number, value: number = 0) => {
  const itemsAsNum = Number(items)
  if (itemsAsNum > 0) {
    return Array(itemsAsNum).fill(value)
  }
  return []
}

export const numToPrice = (num: number) => {
  const currency = '$'
  const price = Number(num || 0).toFixed(2)

  return `${currency}${price}`
}

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
