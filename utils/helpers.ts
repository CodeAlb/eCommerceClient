export const cn = (...classNames: any) => {
  return classNames.filter(Boolean).join(' ')
}

export const tw = (object: {[key: string]: string}) => object

export const roundByHalf = (num: number) => {
  return Number((Math.round(num * 2) / 2).toFixed(1))
}

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
