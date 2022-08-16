import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from './baseQuery'

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    stripePayment: builder.mutation<any, any>({
      query: (data) => ({
        url: '/payments/stripe',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {useStripePaymentMutation} = paymentApi
