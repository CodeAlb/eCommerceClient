import {configureStore} from '@reduxjs/toolkit'
import {useDispatch as useDispatchBase, useSelector as useSelectorBase} from 'react-redux'
import {setupListeners} from '@reduxjs/toolkit/query/react'

// Reducers.
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'

// API.
import {apiSlice} from './api/apiSlice'

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
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
