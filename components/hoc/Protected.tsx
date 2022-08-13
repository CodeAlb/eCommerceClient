import {ReactNode} from 'react'
import {getAuthState} from '../../store/slices/authReducer'
import {useSelector} from '../../store/store'
import Redirect from './Redirect'

type ProtectedProps = {
  withBoot?: boolean
  withAuth?: boolean
  userRoles?: string[]
  children?: ReactNode
}

const Protected = ({withBoot, withAuth, userRoles, children}: ProtectedProps) => {
  const {booted, user, accessToken} = useSelector(getAuthState)
  const {role} = user

  if ((withBoot || withAuth || userRoles) && !booted) {
    return <>Loading...</>
  }
  if (userRoles?.includes('guest') && accessToken) {
    return <Redirect to="/" />
  }
  if (withAuth && userRoles && (!accessToken || !userRoles?.includes(role))) {
    return <Redirect to="/" />
  }
  if (withAuth && !accessToken) {
    return <Redirect to="/auth/login" from="/shop" />
  }
  return <>{children}</>
}

export default Protected
