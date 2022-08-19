import {GetStaticProps} from 'next'
import {ArrowRightIcon} from '../../components/Svg'
import Hero from '../../components/elements/Hero'
import {useGetMyOrdersQuery} from '../../store/api/baseApi'
import {cn, numToPrice} from '../../utils/helpers'
import DataTable from '../../components/DataTable'
import {NextSeo} from 'next-seo'

const css = {
  main: 'pb-12 sm:pb-16',
  body: 'max-w-4xl px-4 mx-auto',
  headline: 'max-w-lg mx-auto px-4 mb-8 sm:mb-10 md:mb-14 space-y-6 sm:space-y-8 md:space-y-10',
  title: 'text-2xl sm:text-3xl md:text-4xl font-medium text-center uppercase',
  actionIcon: 'w-6 text-gray-400 group-hover:text-orange-600',
  status: 'uppercase font-medium text-xs inline-flex items-center px-2 py-1 rounded text-white',
  statusGreen: 'bg-green-600',
  statusRed: 'bg-orange-300',
  warning: 'text-center',
}

const STRUCTURE = [
  {
    title: 'Status',
    selector: (r: any) => (
      <span
        className={cn(css.status, r.orderStatus === 'delivered' ? css.statusGreen : css.statusRed)}
      >
        {r.orderStatus}
      </span>
    ),
    className: 'col-span-2 truncate',
  },
  {
    title: 'Order ID',
    selector: (r: any) => r._id,
    className: 'col-span-5 truncate',
    isBold: true,
  },
  {
    title: 'Items',
    selector: (r: any) => r.orderItems.length,
    className: 'col-span-2',
    isBold: true,
  },
  {
    title: 'Amount',
    selector: (r: any) => numToPrice(r.totalPrice),
    className: 'col-span-2',
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

const Orders = () => {
  const {data, isLoading, isFetching, isError, error} = useGetMyOrdersQuery()
  const {orders, found} = data || {}
  const showLoader = isLoading || isFetching

  return (
    <div className={css.main}>
      <NextSeo title="My Orders" />
      <Hero title="My Orders" />
      <div className={css.body}>
        {!showLoader && isError ? (
          <p className={css.warning}>{(error as any)?.data?.message}</p>
        ) : (
          <DataTable
            isLoading={showLoader}
            skeletons={QUERY_FILTER.limit}
            basePath="/orders"
            data={orders as any}
            structure={STRUCTURE}
          />
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      withAuth: true,
    },
  }
}

export default Orders
