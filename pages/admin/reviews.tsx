import {skipToken} from '@reduxjs/toolkit/dist/query'
import {GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {Fragment, useState} from 'react'
import DataTable from '../../components/DataTable'
import SearchForm from '../../components/elements/SearchForm'
import {ArrowRightIcon, StarEmptyIcon, StarFilledIcon} from '../../components/Svg'
import {useGetAllReviewsQuery} from '../../store/api/baseApi'
import {fillArray} from '../../utils/helpers'
import {timeAgo} from '../../utils/timeAgo'

const css = {
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-6 sm:mb-8 md:mb-10',
  actionIcon: 'w-6 text-gray-400 group-hover:text-orange-600',
  stars: 'mr-4 sm:mr-5 text-orange-600/60 mr-2 flex items-center [&>*]:w-4',
  searchForm: 'mb-10 sm:mb-12',
  body: '',
}

const STRUCTURE = [
  {
    title: 'Rating',
    selector: (r: any) => (
      <div className={css.stars}>
        {fillArray(5).map((n, i) => (
          <Fragment key={i}>{r.rating >= i + 1 ? <StarFilledIcon /> : <StarEmptyIcon />}</Fragment>
        ))}
      </div>
    ),
    className: 'col-span-2',
    isBold: true,
  },
  {
    title: 'User',
    selector: (r: any) => r.user.name,
    className: 'col-span-2',
    isBold: true,
  },
  {
    title: 'Created',
    selector: (r: any) => timeAgo(r.createdAt),
    className: 'col-span-2',
  },
  {
    title: 'Order ID',
    selector: (r: any) => (r.comment.length > 80 ? `${r.comment.slice(0, 80)}...` : r.comment),
    className: 'col-span-5 truncate',
  },
  {
    selector: (d: any) => <ArrowRightIcon className={css.actionIcon} />,
    className: 'justify-end',
  },
]

const QUERY_FILTER = {
  limit: 10,
  page: 1,
}

const AdminReviews = () => {
  const [productId, setProductId] = useState('')
  const {data, isLoading, isFetching, isError, error} = useGetAllReviewsQuery(
    productId || skipToken
  )
  const {reviews = []} = data || {}
  const showLoader = isLoading || isFetching

  const updateRoute = (value: string) => {
    setProductId(value)
  }

  return (
    <div>
      <h1 className={css.title}>Reviews</h1>
      <div>
        <SearchForm
          className={css.searchForm}
          onSubmitValue={updateRoute}
          label="Load reviews"
          placeholder="Enter product ID..."
        />
        {productId && !isError && reviews?.length > 0 ? (
          <DataTable
            isLoading={showLoader}
            skeletons={QUERY_FILTER.limit}
            basePath="/admin/reviews"
            data={reviews as any}
            structure={STRUCTURE}
          />
        ) : (
          <>{productId && (error as any)?.data?.message}</>
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
