import Link from 'next/link'
import {cn} from '../../utils/helpers'
import {ArrowNarrowRightIcon} from '@heroicons/react/outline'

type BreadcrumbLink = {
  title: string
  path: string
}

type BreadcrumbProps = {
  className?: string
  links: BreadcrumbLink[]
}

const css = {
  wrapper: '',
  list: 'flex',
  item: 'font-medium text-xs flex items-center',
  icon: 'text-orange-600/60 mx-2 w-5',
  link: 'text-black uppercase',
}

const Breadcrumb = ({className, links}: BreadcrumbProps) => {
  return (
    <nav className={cn(css.wrapper, className)}>
      <ul className={css.list}>
        {links.map(({title, path}: any, i) => (
          <li key={i} className={css.item}>
            {i > 0 && <ArrowNarrowRightIcon className={css.icon} />}
            <Link href={path}>
              <a className={css.link}>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumb
