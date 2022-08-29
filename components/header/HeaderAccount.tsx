import {UserIcon, MenuIcon} from '@heroicons/react/outline'
import {useMemo, useState} from 'react'
import useOnClickOutside from '../../hooks/onClickOutside'
import {getAuthState} from '../../store/slices/authSlice'
import {useSelector} from '../../store/store'
import {ADMIN_LINKS, GUEST_LINKS, USER_LINKS} from '../../utils/constants'
import {cn} from '../../utils/helpers'
import HeaderAccountNav from './HeaderAccountNav'

interface IHeaderAccountProps {
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
}

const HeaderAccount = ({className, isDashboard}: IHeaderAccountProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const {token, user} = useSelector(getAuthState)

  const navLinks = useMemo(() => {
    let links = GUEST_LINKS
    if (token) {
      links = user?.role === 'admin' && !isDashboard ? ADMIN_LINKS : USER_LINKS
    }
    return links
  }, [user?.role])

  const ref = useOnClickOutside(() => {
    setIsOpen(false)
  })
  const onToggleClick = () => {
    setIsOpen(!isOpen)
  }
  const onLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div ref={ref} className={cn(css.wrapper, className, isDashboard && 'dark')}>
      <button onClick={onToggleClick} className={cn(css.btn, isOpen && css.btnOpen)}>
        <MenuIcon className={css.burger} />
        <span className={cn(css.avatar, user ? css.avatarUser : css.avatarGuest)}>
          {user ? user.name.slice(0, 1) : <UserIcon className={css.userIcon} />}
        </span>
      </button>
      {isOpen && <HeaderAccountNav links={navLinks} onLinkClick={onLinkClick} />}
    </div>
  )
}

export default HeaderAccount
