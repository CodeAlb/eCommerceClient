import {createApi} from '@reduxjs/toolkit/query/react'
import {IUser} from '../../types/user'
import {baseQueryWithReauth} from './baseQuery'

interface IAuthResponse {
  success: boolean
  accessToken: string
  user: IUser
}

interface ILoginData {
  email: string
  password: string
}

export interface ILoggedUserData {
  name: string
  email: string
}

export interface ILoggedUserPassword {
  password: string
  newPassword: string
}

interface IRegisterData {
  email: string
  name: string
  password: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getLoggedUser: builder.query<IAuthResponse, any>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    loginUser: builder.mutation<IAuthResponse, ILoginData>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    createUser: builder.mutation<IAuthResponse, IRegisterData>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateLoggedUser: builder.mutation<void, ILoggedUserData>({
      query: (data) => ({
        url: '/users/me',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateUserPassword: builder.mutation<void, ILoggedUserPassword>({
      query: (data) => ({
        url: '/auth/password/update',
        method: 'PUT',
        body: data,
      }),
    }),
    getAllUsers: builder.query<any, void>({
      query: () => 'admin/users',
    }),
  }),
})

export const {
  useGetLoggedUserQuery,
  useLoginUserMutation,
  useCreateUserMutation,
  useGetAllUsersQuery,
  useUpdateLoggedUserMutation,
  useUpdateUserPasswordMutation,
} = userApi
