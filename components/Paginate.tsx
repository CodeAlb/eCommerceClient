import {IProductFilter} from '../types/product'
import {cn, tw} from '../utils/helpers'
import {ChevronRightIcon} from './Svg'

type PaginateProps = {
  setFilter: (filter: any) => any
  page: number
  pages: number
  isCentered?: boolean
}

const css = tw({
  nav: 'mt-12 sm:mt-16 flex items-center space-x-5',
  label: 'text-gray-600',
  controls: 'flex items-center space-x-3',
  prev: '',
  next: '',
  btn: 'text-white p-2 rounded-full',
  btnDefault: 'bg-black hover:bg-gray-800 duration-150',
  btnFaded: 'bg-gray-200',
  prevArrow: 'w-5 -scale-x-100',
  nextArrow: 'w-5',
})

const Paginate = ({setFilter, page, pages}: PaginateProps) => {
  const handlePageClick = (selected: number) => {
    if (selected < 1 || selected > pages) {
      return
    }

    window?.scrollTo({top: 0})

    setFilter((filter: IProductFilter) => ({
      ...filter,
      page: selected,
    }))
  }

  if (pages < 2) {
    return null
  }

  return (
    <nav className={css.nav}>
      <ul className={css.controls}>
        <li className={css.prev}>
          <button
            className={cn(css.btn, page > 1 ? css.btnDefault : css.btnFaded)}
            onClick={() => handlePageClick(page - 1)}
          >
            <ChevronRightIcon className={css.prevArrow} />
          </button>
        </li>
        <li className={css.next}>
          <button
            className={cn(css.btn, page < pages ? css.btnDefault : css.btnFaded)}
            onClick={() => handlePageClick(page + 1)}
          >
            <ChevronRightIcon className={css.nextArrow} />
          </button>
        </li>
      </ul>
      <div className={css.label}>
        Page {page} of {pages}
      </div>
    </nav>
  )
}

export default Paginate
