import {
  ClipboardCheckIcon,
  CollectionIcon,
  PresentationChartBarIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import {ReactNode} from 'react'
import {DASHBOARD_LINKS, DIR_PATHS} from '../utils/constants'
import ActiveLink from './hoc/ActiveLink'
import MyAccount from './MyAccount'

type DashboardProps = {
  children?: ReactNode
}

const css = {
  wrapper: 'min-h-screen bg-gray-50',
  header: 'bg-black text-white fixed top-0 w-full z-20',
  headerInner: 'max-w-site mx-auto px-4 flex items-center justify-between h-12 sm:h-14',
  body: 'max-w-site mx-auto relative w-full grid md:min-h-screen md:grid-cols-12 pt-12 md:pt-14',
  sidebar: 'relative px-4 py-6 sm:py-8 md:pr-6 lg:pr-8 md:col-span-4 lg:col-span-3 md:py-10',
  sidebarBg: 'absolute top-0 right-full h-full w-[50vw]',
  content:
    'px-4 py-6 sm:py-8 md:col-span-8 lg:col-span-9 md:w-full h-full text-black md:p-10 overflow-hidden',
  footer: '',
  brand: 'flex items-center',
  brandLink: 'duration-150 hover:opacity-75 sm:text-lg font-medium uppercase',
  brandLogo: 'h-8 sm:h-9 md:h-10 text-black',
  brandName: 'px-2 rounded bg-white text-black',
  user: 'flex items-center',
  userName: 'w-15 truncate',
  avatar:
    'ml-2 w-8 h-8 bg-white text-black rounded-full inline-flex items-center justify-center font-bold',
  menu: 'uppercase text-sm sm:text-base space-y-2 md:sticky md:top-24',
  menuItem: '',
  menuLink: 'py-2 sm:py-2.5 flex items-center font-medium rounded px-3',
  menuLinkOn: 'text-white bg-black',
  menuLinkOff: 'text-gray-600 hover:text-black hover:bg-gray-100 duration-150',
  menuLinkIcon: 'w-5 sm:w-6 mr-3 sm:mr-3.5 md:mr-4',
}

const MapLinkIcon = ({path}: {path: string}) => {
  switch (path) {
    case `${DIR_PATHS.dashboard}/products`:
      return <CollectionIcon className={css.menuLinkIcon} />
    case `${DIR_PATHS.dashboard}/orders`:
      return <ClipboardCheckIcon className={css.menuLinkIcon} />
    case `${DIR_PATHS.dashboard}/users`:
      return <UserGroupIcon className={css.menuLinkIcon} />
    case `${DIR_PATHS.dashboard}/reviews`:
      return <StarIcon className={css.menuLinkIcon} />
    default:
      return <PresentationChartBarIcon className={css.menuLinkIcon} />
  }
}

const Dashboard = ({children}: DashboardProps) => {
  return (
    <div className={css.wrapper}>
      <header className={css.header}>
        <nav className={css.headerInner}>
          <div className={css.brand}>
            <Link href="/">
              <a className={css.brandLink}>
                <span className={css.brandName}>Furniture</span> Shop
              </a>
            </Link>
          </div>
          <MyAccount isDashboard />
        </nav>
      </header>
      <div className={css.body}>
        <aside className={css.sidebar}>
          <div className={css.sidebarBg} />
          <ul className={css.menu}>
            {DASHBOARD_LINKS.map(({title, path}, i) => (
              <li key={i} className={css.menuItem}>
                <ActiveLink
                  isExact={path === DIR_PATHS.dashboard}
                  href={path}
                  className={css.menuLink}
                  onClassName={css.menuLinkOn}
                  offClassName={css.menuLinkOff}
                >
                  <MapLinkIcon path={path} />
                  {title}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </aside>
        <main className={css.content}>{children}</main>
      </div>
    </div>
  )
}

export default Dashboard
