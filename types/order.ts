export interface IPaymentInfo {
  id: string
  status: string
}

export interface IShippingInfo {
  address: string
  city: string
  phoneNumber: string
  postalCode: string
  country: string
}

export interface IOrderItem {
  name: string
  quantity: number
  image: string
  price: number
  product: string
}

export interface IOrder {
  shippingInfo: IShippingInfo
  user: string
  orderItems: IOrderItem[]
  paymentInfo: IPaymentInfo
  paidAt: Date
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  orderStatus: string
  deliveredAt: Date
  createdAt: Date
}

export interface IOrdersResponse {
  success: boolean
  page: number
  limit: number
  total: number
  found: number
  pages: number
  orders: IOrder[]
}
