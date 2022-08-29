import {IProduct} from '../../types/product'
import {buildQueryFilter} from '../../utils/buildQueryFilter'
import {apiSlice} from './apiSlice'

interface IProductsResponse {
  success: boolean
  found: number
  products: IProduct[]
}

interface IProductResponse {
  success: boolean
  product: IProduct
}

// TODO: Remove in production.
const fakeRequestDelay = async () => {
  new Promise((resolve) => setTimeout(resolve, 700))
}

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any, any>({
      query: (filter) => {
        const params = buildQueryFilter(filter)
        return `products/${params}`
      },
      transformResponse: (response: IProductsResponse) => {
        fakeRequestDelay()
        return response
      },
      providesTags: (result: any) => {
        if (result?.found) {
          return [
            {type: 'Product', id: 'LIST'},
            ...result?.products.map(({_id: id}: any) => ({type: 'Product', id})),
          ]
        }
        return [{type: 'Product', id: 'LIST'}]
      },
    }),
    getProduct: builder.query<IProductResponse, string>({
      query: (id) => `products/${id}`,
      transformResponse: (response: any) => {
        fakeRequestDelay()
        return response
      },
      providesTags: (result, error, id) => (result ? [{type: 'Product', id}] : ['Product']),
    }),
    createProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: `products`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{type: 'Product'}],
    }),
    updateProduct: builder.mutation<any, any>({
      query: ({id, data}) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{type: 'Product', id: arg.id}],
    }),
    deleteProduct: builder.mutation<any, any>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{type: 'Product', id}],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice
