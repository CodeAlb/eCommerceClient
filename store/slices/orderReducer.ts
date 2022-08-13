import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'

export type OrderState = {
  orders: any
}

const initialState: OrderState = {
  orders: [],
} as const

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
})

export const getOrderState = (state: {order: OrderState}) => {
  return state.order
}

// export const {} = orderSlice.actions
export default orderSlice.reducer
