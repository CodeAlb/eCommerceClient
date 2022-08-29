import {SkipToken} from '@reduxjs/toolkit/dist/query'
import {IReview} from '../../types/review'
import {apiSlice} from './apiSlice'

interface IReviewsResponse {
  success: boolean
  found: number
  reviews: IReview[]
}

// TODO: Remove in production.
const fakeRequestDelay = async () => {
  new Promise((resolve) => setTimeout(resolve, 700))
}

const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<IReviewsResponse, string | SkipToken>({
      query: (productId: string) => `reviews/${productId}`,
      providesTags: (result: any) => {
        if (result?.found) {
          return [
            {type: 'Review', id: 'LIST'},
            ...result.reviews.map(({_id: id}: IReview) => ({type: 'Review', id})),
          ]
        }
        return [{type: 'Review', id: 'LIST'}]
      },
    }),
    createReview: builder.mutation<any, any>({
      query: ({productId, data}) => ({
        url: `reviews/${productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{type: 'Product', id: arg.productId}],
    }),
    // deleteReview:
  }),
  overrideExisting: false,
})

export const {useGetReviewsQuery, useCreateReviewMutation} = reviewsApiSlice
