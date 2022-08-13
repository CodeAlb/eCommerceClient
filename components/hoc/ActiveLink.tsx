import Link from 'next/link'
import {useRouter} from 'next/router'
import {Children, cloneElement, ReactNode} from 'react'

// Types.
interface ActiveLinkProps {
  href: string
  children: ReactNode
  onClassName?: string
  offClassName?: string
  isExact?: boolean
  [props: string]: any
}

// Component.
export default function ActiveLink({
  href,
  children,
  onClassName,
  offClassName,
  isExact = true,
  ...props
}: ActiveLinkProps) {
  const {asPath} = useRouter()
  const child = Children.only(children) as any
  const childClassName = child.props.className || ''
  const linkPath = asPath || props.as

  const className =
    linkPath === href || (!isExact && linkPath.startsWith(`${href}/`))
      ? `${childClassName} ${onClassName}`.trim()
      : `${childClassName} ${offClassName}`.trim()

  return (
    <Link href={href} {...props}>
      {cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}
