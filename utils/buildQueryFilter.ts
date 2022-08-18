import {IProductFilter} from '../types/product'

export const buildQueryFilter = ({
  limit,
  price,
  keyword,
  page,
  category,
  ratings,
}: IProductFilter): string => {
  const params = []
  if (price) {
    params.push(`price[gte]=${price[0]}&price[lte]=${price[1]}`)
  }
  if (page) {
    params.push(`page=${page}`)
  }
  if (keyword) {
    params.push(`keyword=${keyword}`)
  }
  if (limit) {
    params.push(`limit=${limit}`)
  }
  if (category) {
    params.push(`category=${category}`)
  }
  if (ratings) {
    let minRate = 0
    let maxRate = 5

    switch (ratings) {
      case 5:
        minRate = 4.75
        maxRate = 5
        break
      case 4:
        minRate = 3.75
        maxRate = 4.74
        break
      case 3:
        minRate = 2.75
        maxRate = 3.74
        break
      case 2:
        minRate = 1.75
        maxRate = 2.74
        break
      case 1:
        minRate = 0.75
        maxRate = 1.74
        break
    }
    params.push(`ratings[gte]=${minRate}&ratings[lte]=${maxRate}`)
  }
  if (params.length) {
    return `?${params.join('&')}`
  }
  return ''
}
