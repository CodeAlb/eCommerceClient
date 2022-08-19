import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from './baseQuery'
import {IOrderResponse, IOrdersResponse} from '../../types/order'
import {
  IProductCard,
  IProductFilter,
  IProductResponse,
  IProductsResponse,
} from '../../types/product'
import {
  IUserLogin,
  IUserNewPassword,
  IUserRegister,
  IUserResponse,
  IUsersResponse,
} from '../../types/user'
import {buildQueryFilter} from '../../utils/buildQueryFilter'
import {IReview, IReviewData} from '../../types/review'

const transformResponse = async (response: any) => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return response
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'LoggedUser', 'Product', 'Order', 'Review'],
  endpoints: (builder) => ({
    getLoggedUser: builder.query<IUserResponse, any>({
      query: () => 'users/me',
      providesTags: ['LoggedUser'],
    }),
    loginUser: builder.mutation<IUserResponse, IUserLogin>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['LoggedUser'],
    }),
    createUser: builder.mutation<IUserResponse, IUserRegister>({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateLoggedUser: builder.mutation<void, IUserRegister>({
      query: (data) => ({
        url: 'users/me',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['LoggedUser'],
    }),
    updateUserPassword: builder.mutation<void, IUserNewPassword>({
      query: (data) => ({
        url: 'auth/password/update',
        method: 'PUT',
        body: data,
      }),
    }),
    getAllUsers: builder.query<IUsersResponse, void>({
      query: () => 'admin/users',
      providesTags: (result: any) => {
        const {success, users} = result || {}
        if (success) {
          return [
            {type: 'User', id: 'LIST'},
            ...users.map(({_id}: IProductCard) => ({
              type: 'User',
              id: _id,
            })),
          ]
        }
        return [{type: 'User', id: 'LIST'}]
      },
    }),
    getProduct: builder.query<IProductResponse, string>({
      query: (id) => `products/${id}`,
      transformResponse,
      providesTags: (result, error, id) => (result ? [{type: 'Product', id}] : ['Product']),
    }),
    getAllProducts: builder.query<IProductsResponse, IProductFilter>({
      query: (filter) => {
        const params = buildQueryFilter(filter)
        return `products/${params}`
      },
      transformResponse,
      providesTags: (result: any) => {
        const {success, products} = result || {}
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
      providesTags: (result: any) => {
        const {success, reviews} = result || {}
        if (success) {
          return [
            {type: 'Review', id: 'LIST'},
            ...reviews.map(({_id}: IReview) => ({
              type: 'Review',
              id: _id,
            })),
          ]
        }
        return [{type: 'Review', id: 'LIST'}]
      },
    }),
    createReview: builder.mutation<any, IReviewData>({
      query: (data) => ({
        url: 'reviews/create',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{type: 'Product', id: arg.productId}],
    }),
    getAllOrders: builder.query<IOrdersResponse, void>({
      query: () => 'admin/orders',
      providesTags: ['Order'],
    }),
    getMyOrders: builder.query<IOrdersResponse, void>({
      query: () => `orders`,
      providesTags: ['Order'],
    }),
    getOrder: builder.query<IOrderResponse, string>({
      query: (id) => `orders/${id}`,
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
    stripePayment: builder.mutation<any, any>({
      query: (data) => ({
        url: 'payments/stripe',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetLoggedUserQuery,
  useLoginUserMutation,
  useCreateUserMutation,
  useUpdateLoggedUserMutation,
  useUpdateUserPasswordMutation,
  useCreateReviewMutation,
  useGetAllUsersQuery,
  useGetProductQuery,
  useGetAllProductsQuery,
  useGetAllReviewsQuery,
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useGetMyOrdersQuery,
  useCreateOrderMutation,
  useStripePaymentMutation,
} = baseApi
