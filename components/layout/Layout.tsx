import {skipToken} from '@reduxjs/toolkit/dist/query'
import {ReactNode, useEffect} from 'react'
import {ToastContainer} from 'react-toastify'
import {useGetMeQuery} from '../../store/api/usersApiSlice'
import {clearAuth, setUser, getAuthState} from '../../store/slices/authSlice'
import {addShippingInfo, setCartItems} from '../../store/slices/cartSlice'
import {useDispatch, useSelector} from '../../store/store'
import {getLocalStorage} from '../../utils/helpers'
import LayoutDashboard from './LayoutDashboard'
import LayoutPage from './LayoutPage'
import ProtectedRoute from './ProtectedRoute'

interface ILayout {
  children: ReactNode
  withAuth?: boolean
  userRoles?: string[]
}

const css = {
  wrapper: 'min-h-screen',
}

const Layout = ({children, withAuth, userRoles}: ILayout) => {
  const isAdmin = userRoles?.includes('admin')
  const dispatch = useDispatch()
  const {token} = useSelector(getAuthState)
  const {data, isSuccess, isError} = useGetMeQuery(token || token === null ? {} : skipToken)

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data?.user))
    }
    if (isError) {
      dispatch(clearAuth())
    }
  }, [data, isSuccess, isError, dispatch])

  useEffect(() => {
    // Local Storage Hydration.
    dispatch(setCartItems(getLocalStorage('cartItems', [])))
    dispatch(addShippingInfo(getLocalStorage('shippingInfo', {})))
  }, [dispatch])

  return (
    <div className={css.wrapper}>
      <ProtectedRoute withAuth={withAuth} userRoles={userRoles}>
        {isAdmin ? (
          <LayoutDashboard>{children}</LayoutDashboard>
        ) : (
          <LayoutPage>{children}</LayoutPage>
        )}
      </ProtectedRoute>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}

export default Layout
