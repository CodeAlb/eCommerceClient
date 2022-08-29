import Link from 'next/link'
import {toast} from 'react-toastify'
import {useLogOutMutation} from '../../store/api/authApiSlice'
import {clearCredentials} from '../../store/slices/authSlice'
import {useDispatch} from '../../store/store'
import {cn} from '../../utils/helpers'

interface IHeaderAccountLink {
  title: string
  path: string
}

interface IHeaderAccountNavProps {
  links: IHeaderAccountLink[]
  onLinkClick: () => void
}

const css = {
  menu: 'z-10 absolute top-full right-0 mt-2 py-3 bg-white w-48 rounded border border-gray-200 shadow-[1px_2px_3px_#ddd]',
  item: '',
  link: 'font-medium px-4 py-1.5 w-full flex items-center hover:bg-gray-100',
  linkNormal: 'text-gray-700 hover:text-black ',
  linkLogout: 'text-red-400 hover:text-red-500',
}

const HeaderAccountNav = ({links, onLinkClick}: IHeaderAccountNavProps) => {
  const [logOut] = useLogOutMutation()
  const dispatch = useDispatch()

  const onLogoutClick = async () => {
    try {
      await logOut().unwrap()
      dispatch(clearCredentials())
      toast.info('You are logged out')
    } catch (err: any) {
      toast.error(err?.data?.message)
    }
    onLinkClick()
  }

  return (
    <ul className={css.menu}>
      {links.map(({title, path}, i: number) => (
        <li key={path}>
          {'/logout' === path ? (
            <button onClick={onLogoutClick} className={cn(css.link, css.linkLogout)}>
              {title}
            </button>
          ) : (
            <Link href={path}>
              <a onClick={onLinkClick} className={cn(css.link, css.linkNormal)}>
                {title}
              </a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

export default HeaderAccountNav
