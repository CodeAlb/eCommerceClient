import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {IProductResponse, IProductFilter, IProductsResponse} from '../../types/product'
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
  endpoints: (builder) => ({
    getProduct: builder.query<IProductResponse, string>({
      query: (id) => `products/${id}`,
    }),
    getAllProducts: builder.query<IProductsResponse, IProductFilter>({
      query: (filter) => {
        const params = buildQueryFilter(filter)
        return `products/${params}`
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
