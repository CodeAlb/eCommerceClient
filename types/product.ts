import {IImage} from './image'

export interface IProduct {
  _id: string
  name: string
  price: number
  oldPrice: number
  description: string
  ratings: number
  images?: IImage[]
  category: string
  seller: string
  stock: number
  numOfReviews: number
  reviews: IProductReview[]
  createdAt: string
  __v: number
  excerpt?: string
  user: {
    _id: string
    name: string
  }
}

export type IProductPrice = [number, number]

export interface IProductReview {
  user: {
    name: string
    _id: string
  }
  name: string
  rating: number
  comment: string
}

export interface IProductCard {
  _id: string
  name: string
  price: number
  ratings: number
  oldPrice: number
  images?: IImage[]
  numOfReviews: number
}

export interface IProductFilter {
  limit?: number
  keyword?: string
  price?: IProductPrice
  page?: number
  category?: string
  ratings?: number
}

export interface IProductResponse {
  success: boolean
  product: IProduct
}

export interface IProductsResponse {
  success: boolean
  page: number
  limit: number
  total: number
  found: number
  pages: number
  products: IProductCard[]
}
