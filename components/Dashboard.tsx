import Link from 'next/link'
import {ReactNode} from 'react'
import {DASHBOARD_LINKS} from '../utils/constants'
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
    case '/dashboard/products':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={css.menuLinkIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      )
    case '/dashboard/orders':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={css.menuLinkIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      )
    case '/dashboard/users':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={css.menuLinkIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      )
    case '/dashboard/reviews':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={css.menuLinkIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={css.menuLinkIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      )
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
                  isExact={path === '/dashboard'}
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
