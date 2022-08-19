export interface IReview {
  _id: string
  user: {
    name: string
    _id: string
  }
  name: string
  rating: number
  comment: string
}

export interface IReviewData {
  rating: number
  productId: string
  comment: string
}
