import Link from 'next/link'
import {useRouter} from 'next/router'
import {ReactNode} from 'react'
import {cn} from '../../utils/helpers'

// Types.
interface ActiveLinkProps {
  href: string
  className?: string
  onClassName?: string
  offClassName?: string
  children?: ReactNode
  isExact?: boolean
  [props: string]: any
}

const ActiveLink = ({
  href,
  className,
  onClassName,
  offClassName,
  children,
  isExact,
  ...restProps
}: ActiveLinkProps) => {
  const {asPath} = useRouter()

  return (
    <Link href={href}>
      <a
        className={cn(
          className,
          asPath === href || (!isExact && asPath.startsWith(`${href}/`))
            ? onClassName
            : offClassName
        )}
        {...restProps}
      >
        {children}
      </a>
    </Link>
  )
}

export default ActiveLink
