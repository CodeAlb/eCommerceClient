import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {
  IProductResponse,
  IProductFilter,
  IProductsResponse,
  IProductCard,
} from '../../types/product'
import {buildQueryFilter} from '../../utils/buildQueryFilter'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_API,
    prepareHeaders: (headers, {getState}) => {
      const accessToken = (getState() as any)?.auth?.accessToken
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers
    },
    credentials: 'include',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProduct: builder.query<IProductResponse, string>({
      query: (id) => `products/${id}`,
    }),
    getAllProducts: builder.query<IProductsResponse, IProductFilter>({
      query: (filter) => {
        const params = buildQueryFilter(filter)
        return `products/${params}`
      },
      providesTags: ({success, products}: any) => {
        if (success) {
          return [
            {type: 'Product', id: 'LIST'},
            ...products.map(({_id}: IProductCard) => ({
              type: 'Product',
              id: _id,
            })),
          ]
        }
        return [{type: 'Product', id: 'LIST'}]
      },
    }),
    getAllReviews: builder.query<any, string>({
      query: (productId) => {
        return `reviews/${productId}`
      },
    }),
  }),
})

export const {useGetProductQuery, useGetAllProductsQuery, useGetAllReviewsQuery} = productApi
