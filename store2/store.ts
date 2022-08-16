import {configureStore} from '@reduxjs/toolkit'
import {useDispatch as useDispatchBase, useSelector as useSelectorBase} from 'react-redux'
import {setupListeners} from '@reduxjs/toolkit/query/react'

// Reducers.
import authReducer from './slices/authReducer'
import cartReducer from './slices/cartReducer'
import orderReducer from './slices/orderReducer'

// Services.
import {productApi} from './api/product'
import {orderApi} from './api/order'
import {userApi} from './api/user'
import {paymentApi} from './api/payment'

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      orderApi.middleware,
      userApi.middleware,
      paymentApi.middleware
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>()

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector)

setupListeners(store.dispatch)
