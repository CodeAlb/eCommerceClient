import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {setLocalStorage} from '../../utils/helpers'

export type CartState = {
  isCartOpen: boolean
  shippingInfo: {
    address?: string
    phoneNumber?: string
    city?: string
    country?: string
    postalCode?: string
  }
  items: any
}

const initialState: CartState = {
  isCartOpen: false,
  shippingInfo: {},
  items: [],
} as const

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addShippingInfo: (state: Draft<typeof initialState>, action: PayloadAction<any>) => {
      const localData = action.payload

      state.shippingInfo = localData
      setLocalStorage('shippingInfo', state.shippingInfo)
    },
    clearCart: (state: Draft<typeof initialState>) => {
      state.items = []
      setLocalStorage('cartItems', [])
    },
    openCart: (state: Draft<typeof initialState>) => {
      state.isCartOpen = true
    },
    closeCart: (state: Draft<typeof initialState>) => {
      state.isCartOpen = false
    },
    setCartItems: (state: Draft<typeof initialState>, action: PayloadAction<any>) => {
      if (action.payload) {
        state.items = action.payload
      }
    },
    deleteCartItem: (state: Draft<typeof initialState>, action: PayloadAction<any>) => {
      const product = action.payload

      state.items = state.items.filter((i: any) => i._id !== product._id)
      setLocalStorage('cartItems', state.items)
    },
    incrementAmount: (state: Draft<typeof initialState>, action: PayloadAction<any>) => {
      const product = action.payload
      const foundItem = state.items.find((i: any) => i._id === product._id)

      if (foundItem.amount + 1 > product.stock) {
        return
      }

      state.items = state.items.map((i: any) => {
        if (i._id === product._id) {
          i.amount += 1
        }
        return i
      })
      setLocalStorage('cartItems', state.items)
    },
    decrementAmount: (state: Draft<typeof initialState>, action: PayloadAction<any>) => {
      const product = action.payload
      const foundItem = state.items.find((i: any) => i._id === product._id)
      if (foundItem.amount - 1 < 1) {
        state.items = state.items.filter((i: any) => i._id !== product._id)
      } else {
        state.items = state.items.map((i: any) => {
          if (i._id === product._id) {
            i.amount -= 1
          }
          return i
        })
      }
      setLocalStorage('cartItems', state.items)
    },
    addToCard: (state: Draft<typeof initialState>, action: PayloadAction<any>) => {
      const {product, amount} = action.payload
      const foundItem = state.items.find((i: any) => i._id === product._id)
      const productData = {
        _id: product._id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images?.[0]?.url,
        stock: product.stock,
      }

      if (foundItem) {
        state.items = state.items.map((i: any) => {
          if (i._id !== foundItem._id) {
            return i
          }
          let realAmount = amount + i.amount
          if (realAmount > i.stock) {
            realAmount = i.stock
          } else if (realAmount < 1) {
            realAmount = 1
          }
          return {...productData, amount: realAmount}
        })
      } else {
        let realAmount = amount
        if (amount > product.stock) {
          realAmount = product.stock
        } else if (amount < 1) {
          realAmount = 1
        }

        state.items = [...state.items, {...productData, amount: realAmount}]
      }
      setLocalStorage('cartItems', state.items)

      state.isCartOpen = true
    },
  },
})

export const getCartState = (state: {cart: CartState}) => {
  return state.cart
}

export const {
  openCart,
  clearCart,
  closeCart,
  addToCard,
  deleteCartItem,
  setCartItems,
  decrementAmount,
  incrementAmount,
  addShippingInfo,
} = cartSlice.actions

export default cartSlice.reducer
