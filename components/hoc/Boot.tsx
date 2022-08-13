import {useGetLoggedUserQuery} from '../../store/services/user'
import {useDispatch, useSelector} from '../../store/store'
import {getAuthState} from '../../store/slices/authReducer'
import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {addShippingInfo, setCartItems} from '../../store/slices/cartReducer'
import {getLocalStorage} from '../../utils/localStorage'

const Boot = () => {
  const dispatch = useDispatch()
  const {accessToken} = useSelector(getAuthState)
  useGetLoggedUserQuery(accessToken ? skipToken : {})

  useEffect(() => {
    dispatch(setCartItems(getLocalStorage('cartItems', [])))
    dispatch(addShippingInfo(getLocalStorage('shippingInfo', {})))
  }, [])

  return null
}

export default Boot
