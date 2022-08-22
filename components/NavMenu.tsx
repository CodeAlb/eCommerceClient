import {NAV_LINKS} from '../utils/constants'
import {cn} from '../utils/helpers'
import ActiveLink from './hoc/ActiveLink'

type NavMenuProps = {
  className?: string
}

const css = {
  wrapper: 'hidden md:flex md:items-center space-x-8 text-sm uppercase font-medium',
  item: '',
  link: 'relative py-1 [&>i]:absolute [&>i]:h-[2px] [&>i]:bg-gray-500 [&>i]:bottom-0 [&>i]:left-1/2 [&>i]:-translate-x-1/2 [&>i]:duration-250',
  linkNormal: 'duration-150 hover:text-gray-500 [&>i]:w-0',
  linkActive: 'text-gray-500 [&>i]:w-6',
}

const NavMenu = ({className}: NavMenuProps) => {
  return (
    <ul className={cn(css.wrapper, className)}>
      {NAV_LINKS.map(({title, path}, i: number) => (
        <li key={i} className={css.item}>
          <ActiveLink
            href={path}
            className={css.link}
            onClassName={css.linkActive}
            offClassName={css.linkNormal}
          >
            {title}
            <i />
          </ActiveLink>
        </li>
      ))}
    </ul>
  )
}

export default NavMenu
