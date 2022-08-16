import {skipToken} from '@reduxjs/toolkit/dist/query'
import {GetStaticProps} from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import DataTableWithSearch from '../../components/DataTableWithSearch'
import SearchForm from '../../components/elements/SearchForm'
import {EditIcon} from '../../components/Svg'
import {useGetAllReviewsQuery} from '../../store/api/baseApi'
import {cn} from '../../utils/helpers'

const css = {
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-6 sm:mb-8 md:mb-10',
  btn: 'whitespace-nowrap inline-flex items-center justify-center duration-150 text-white bg-orange-400 hover:bg-orange-600 h-8 w-8 rounded',
  btnIcon: 'w-5',
  cell: 'text-base py-2',
  body: '',
}

const COLUMNS = [
  {
    name: 'Rating',
    selector: (r: any) => r.rating,
    sortable: false,
    cell: (r: any) => <span className={cn(css.cell, 'truncate')}>{r._id}</span>,
    grow: 1,
  },
  {
    name: 'Action',
    selector: false,
    sortable: true,
    cell: (d: any) => (
      <Link href={`/admin/reviews/${d._id}`}>
        <a className={css.btn}>
          <EditIcon className={css.btnIcon} />
        </a>
      </Link>
    ),
    grow: 0,
  },
]

const AdminReviews = () => {
  const [productId, setProductId] = useState('')
  const {push} = useRouter()
  const {data, isLoading} = useGetAllReviewsQuery(productId || skipToken)
  const {reviews} = data || {}

  const updateRoute = (value: string) => {
    setProductId(value)
  }

  return (
    <div>
      <h1 className={css.title}>Reviews</h1>
      <div>
        {productId && reviews?.length > 0 ? (
          <>
            <DataTableWithSearch
              placeholder="Search review..."
              data={reviews as any}
              columns={COLUMNS as any}
              keyField="_id"
              searchPattern={(i: any) => [i._id, i.name, `$${i.price}`, i.stock].join(' ')}
            />
          </>
        ) : (
          <>
            <SearchForm
              onSubmitValue={updateRoute}
              label="Load reviews"
              placeholder="Enter product ID..."
            />
            {productId && `No review on product ID (${productId})`}
          </>
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      withAuth: true,
      userRoles: ['admin'],
    },
  }
}

export default AdminReviews
