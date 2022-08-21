import Link from 'next/link'
import {SearchIcon} from '@heroicons/react/outline'

type SearchToggleProps = {
  className?: string
}

const css = {
  wrapper: 'relative flex items-center',
  btn: 'relative duration-150 hover:opacity-75',
  icon: 'w-6 h-6 text-black',
  badge: 'absolute bottom-0 right-0 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold',
}

const SearchToggle = ({className}: SearchToggleProps) => {
  const openSearchModal = () => {}

  return (
    <div className={css.wrapper}>
      <Link href="/search">
        <a className={css.btn} onClick={openSearchModal}>
          <SearchIcon className={css.icon} />
        </a>
      </Link>
    </div>
  )
}

export default SearchToggle
