import {UserIcon, MenuIcon} from '@heroicons/react/outline'
import Link from 'next/link'
import {useState} from 'react'
import useOnClickOutside from '../hooks/onClickOutside'
import {fetchLogout, getAuthState} from '../store/slices/authReducer'
import {useDispatch, useSelector} from '../store/store'
import {ADMIN_LINKS, GUEST_LINKS, USER_LINKS} from '../utils/constants'
import {cn} from '../utils/helpers'

type MyAccountProps = {
  className?: string
  isDashboard?: boolean
}

const css = {
  wrapper: 'relative hidden md:flex items-center',
  btn: 'inline-flex items-center justify-center p-1.5 rounded-full border border-gray-300 dark:border-gray-600 hover:shadow-[1px_2px_3px_#ddd] hover:dark:hover:shadow-[1px_2px_3px_#444] duration-150',
  btnOpen: 'shadow-[1px_2px_3px_#ddd] dark:shadow-none dark:border-gray-400',
  avatar:
    'inline-flex items-center justify-center rounded-full h-6 w-6 font-bold text-xs uppercase',
  avatarUser: 'bg-black dark:bg-white text-white dark:text-black',
  avatarGuest: 'bg-gray-500 text-white',
  userIcon: 'w-4',
  burger: 'w-5 text-black dark:text-white ml-1.5 mr-3.5',
  menu: 'z-10 absolute top-full right-0 mt-2 py-3 bg-white w-48 rounded border border-gray-200 shadow-[1px_2px_3px_#ddd]',
  item: '',
  link: 'font-medium px-4 py-1.5 w-full flex items-center hover:bg-gray-100',
  linkNormal: 'text-gray-700 hover:text-black ',
  linkLogout: 'text-red-400 hover:text-red-500',
}

const MyAccount = ({className, isDashboard}: MyAccountProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const {accessToken, user} = useSelector(getAuthState)
  const {role} = user || {}
  const dispatch = useDispatch()

  let links = GUEST_LINKS
  if (accessToken) {
    links = role === 'admin' && !isDashboard ? ADMIN_LINKS : USER_LINKS
  }

  const ref = useOnClickOutside(() => {
    setIsOpen(false)
  })
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const logout = () => {
    dispatch(fetchLogout())
    setIsOpen(false)
  }

  return (
    <div ref={ref} className={cn(css.wrapper, className, isDashboard && 'dark')}>
      <button onClick={toggleMenu} className={cn(css.btn, isOpen && css.btnOpen)}>
        <MenuIcon className={css.burger} />
        <span className={cn(css.avatar, accessToken ? css.avatarUser : css.avatarGuest)}>
          {accessToken ? user.name.slice(0, 1) : <UserIcon className={css.userIcon} />}
        </span>
      </button>
      {isOpen && (
        <ul className={css.menu}>
          {links.map(({title, path}, i: number) => (
            <li key={path}>
              {'/logout' === path ? (
                <button onClick={logout} className={cn(css.link, css.linkLogout)}>
                  {title}
                </button>
              ) : (
                <Link href={path}>
                  <a
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className={cn(css.link, css.linkNormal)}
                  >
                    {title}
                  </a>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyAccount
