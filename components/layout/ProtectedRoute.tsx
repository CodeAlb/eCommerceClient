import {useRouter} from 'next/router'
import {ReactNode} from 'react'
import {getAuthState} from '../../store/slices/authSlice'
import {useSelector} from '../../store/store'
import {DIR_PATHS} from '../../utils/constants'

interface IProtectedRouteProps {
  withAuth?: boolean
  userRoles?: string[]
  children?: ReactNode
}

const ProtectedRoute = ({withAuth, userRoles, children}: IProtectedRouteProps) => {
  const {token, user} = useSelector(getAuthState)
  const {role = 'user'} = user || {}
  const {push} = useRouter()

  if ((withAuth || userRoles) && token === null) {
    return <>Loading...</>
  }
  if (userRoles?.includes('guest') && token) {
    push('/')
    return null
  }
  if (withAuth && userRoles && (!token || !userRoles?.includes(role))) {
    push('/')
    return null
  }
  if (withAuth && !token) {
    push({
      pathname: `${DIR_PATHS.account}/login`,
      query: {
        from: '/shop',
      },
    })
    return null
  }
  return <>{children}</>
}

export default ProtectedRoute
