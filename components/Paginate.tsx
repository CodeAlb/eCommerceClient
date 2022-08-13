import ReactPaginate from 'react-paginate'
import {IProductFilter} from '../types/product'
import {cn} from '../utils/helpers'
import {ArrowNarrowRightIcon} from './Svg'

type PaginateProps = {
  setFilter: (filter: any) => any
  page: number
  pages: number
  isCentered?: boolean
}

const css = {
  wrapper: 'max-w-site mx-auto px-4 mt-12 sm:mt-16 flex items-center space-x-4 font-medium',
  isCentered: 'justify-center',
  adjacent: 'text-sm text-black uppercase flex items-center hover:opacity-80 duration-150',
  number: 'font-bold relative px-1',
  numberActive:
    'after:border-b after:border-black after:absolute after:left-1/2 after:bottom-[3px] after:w-3/4 after:-translate-x-1/2',
  arrowNext: 'w-5 ml-1',
  arrowPrev: 'w-5 mr-1 -scale-x-100',
}

const Paginate = ({setFilter, page, pages, isCentered = true}: PaginateProps) => {
  const handlePageClick = ({selected}: any) => {
    window?.scrollTo({top: 0})

    setFilter((filter: IProductFilter) => ({
      ...filter,
      page: selected + 1,
    }))
  }

  if (pages < 2) {
    return null
  }

  return (
    <ReactPaginate
      className={cn(css.wrapper, isCentered && css.isCentered)}
      previousLinkClassName={css.adjacent}
      nextLinkClassName={css.adjacent}
      pageClassName={css.number}
      activeClassName={css.numberActive}
      breakLabel="..."
      forcePage={page - 1}
      nextLabel={
        <>
          Next <ArrowNarrowRightIcon className={css.arrowNext} />
        </>
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={pages}
      previousLabel={
        <>
          <ArrowNarrowRightIcon className={css.arrowPrev} />
          Prev
        </>
      }
      renderOnZeroPageCount={() => null}
    />
  )
}

export default Paginate
