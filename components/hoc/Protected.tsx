import { useRouter } from 'next/router'
import {ReactNode} from 'react'
import {getAuthState} from '../../store/slices/authReducer'
import {useSelector} from '../../store/store'

type ProtectedProps = {
  withAuth?: boolean
  userRoles?: string[]
  children?: ReactNode
}

const Protected = ({withAuth, userRoles, children}: ProtectedProps) => {
  const {booted, user, accessToken} = useSelector(getAuthState)
  const {push} = useRouter()
  const {role} = user

  if ((withAuth || userRoles) && !booted) {
    return <>Loading...</>
  }
  if (userRoles?.includes('guest') && accessToken) {
    push('/')
    return null
  }
  if (withAuth && userRoles && (!accessToken || !userRoles?.includes(role))) {
    push('/')
    return null
  }
  if (withAuth && !accessToken) {
    push({
      pathname: '/auth/login',
      query: {
        from: '/shop'
      }
    })
    return null
  }
  return <>{children}</>
}

export default Protected
