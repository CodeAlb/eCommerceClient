import {createSlice, Draft, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {axiosPrivate} from '../../utils/axios'

export interface AuthState {
  booted: boolean
  accessToken: false | string
  user: any
}

const initialState: AuthState = {
  booted: false,
  accessToken: false,
  user: false,
} as const

export const fetchLogout: any = createAsyncThunk('auth/fetchLogout', async () => {
  try {
    const {data} = await axiosPrivate.get('/auth/logout')
    return data
  } catch (err: any) {
    console.log(err?.response?.data)
    return err?.response?.data
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state: Draft<typeof initialState>, {payload}: PayloadAction<any>) => {
      const {accessToken, user} = payload

      state.booted = true
      state.accessToken = accessToken
      state.user = user
    },
    updateUserData: (state: Draft<typeof initialState>, {payload}: PayloadAction<any>) => {
      const {name, email} = payload

      state.user = {
        ...state.user,
        name,
        email,
      }
    },
  },
  extraReducers: {
    [fetchLogout.rejected]: (state: Draft<typeof initialState>) => {
      state.booted = true
    },
    [fetchLogout.fulfilled]: (state: Draft<typeof initialState>) => {
      state.booted = true
      state.accessToken = false
      state.user = false
    },
  },
})

export const getAuthState = (state: {auth: AuthState}) => {
  return state.auth
}

export const {setAuthData, updateUserData} = authSlice.actions
export default authSlice.reducer
