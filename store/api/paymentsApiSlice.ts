import {apiSlice} from './apiSlice'

const paymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    stripeConnect: builder.mutation<any, any>({
      query: (data) => ({
        url: 'payments/stripe',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {useStripeConnectMutation} = paymentsApiSlice
