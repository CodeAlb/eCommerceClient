import Link from 'next/link'
import HeaderAccount from './HeaderAccount'
import HeaderSearch from './HeaderSearch'
import HeaderCart from './HeaderCart'
import HeaderNav from './HeaderNav'
import {cn} from '../../utils/helpers'

interface IHeaderProps {
  className?: string
}

const css = {
  wrapper: 'flex items-end h-16 sm:h-20',
  nav: 'max-w-site mx-auto px-4 w-full flex items-center justify-between',
  brand: 'flex items-center',
  brandLink: 'duration-150 hover:opacity-75 text-lg sm:text-xl md:text-2xl font-medium uppercase',
  brandLogo: 'h-8 sm:h-9 md:h-10 text-black',
  brandName: 'px-2 rounded bg-black text-white',
  searchForm: '',
  menu: 'pr-5 sm:pr-6 border-r border-gray-300',
  actions: 'flex items-center space-x-5 sm:space-x-6',
  toolbar: 'flex items-center space-x-5 sm:space-x-6',
}

const Header = ({className}: IHeaderProps) => {
  return (
    <header className={cn(css.wrapper, className)}>
      <nav className={css.nav}>
        <div className={css.brand}>
          <Link href="/">
            <a className={css.brandLink}>
              <span className={css.brandName}>Furniture</span> Shop
            </a>
          </Link>
        </div>
        <div className={css.actions}>
          <HeaderNav className={css.menu} />
          <div className={css.toolbar}>
            <HeaderSearch />
            <HeaderCart />
          </div>
          <HeaderAccount />
        </div>
      </nav>
    </header>
  )
}

export default Header
