import {createApi} from '@reduxjs/toolkit/query/react'
import {IOrdersResponse} from '../../types/order'
// import type {} from '../../types/product'
import {baseQueryWithReauth} from './baseQuery'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getAllOrders: builder.query<IOrdersResponse, void>({
      query: () => 'admin/orders',
      providesTags: ['Order'],
    }),
    getMyOrders: builder.query<IOrdersResponse, void>({
      query: () => `orders`,
      providesTags: ['Order'],
    }),
    createOrder: builder.mutation<any, any>({
      query: (data) => ({
        url: 'orders/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
})

export const {useGetAllOrdersQuery, useGetMyOrdersQuery, useCreateOrderMutation} = orderApi
