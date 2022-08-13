import {useRouter} from 'next/router'
import {useEffect} from 'react'

type RedirectProps = {
  to: string
  from?: string
}

const Redirect = ({to, from}: RedirectProps) => {
  const {push} = useRouter()
  useEffect(() => {
    const options = from
      ? {
          pathname: to,
          query: {from},
        }
      : to
    push(options)
  }, [])
  return null
}

export default Redirect
