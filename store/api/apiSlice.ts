import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import {setAccessToken, clearAuth} from '../slices/authSlice'
import {Mutex} from 'async-mutex'

// create a new mutex
const mutex = new Mutex()

// Base Query.
export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_API,
  prepareHeaders: (headers, {getState}) => {
    const {token} = (getState() as any)?.auth || {}
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
  credentials: 'include',
})

// Base query with Reauth.
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  const resultStatus = result?.error?.status
  if (resultStatus === 403) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult: any = await baseQuery('auth/refresh', api, extraOptions)
        if (refreshResult?.data) {
          api.dispatch(setAccessToken(refreshResult.data?.accessToken))

          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(clearAuth())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()

      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['User', 'Product', 'Order', 'Review'],
  endpoints: () => ({}),
})
