import {GetStaticProps} from 'next'
import {NextSeo} from 'next-seo'
import {ArrowRightIcon} from '@heroicons/react/outline'
import DataTable from '../../../components/DataTable'
import {useGetAllOrdersQuery} from '../../../store/api/baseApi'
import {cn, numToPrice} from '../../../utils/helpers'
import {timeAgo} from '../../../utils/timeAgo'
import {DIR_PATHS} from '../../../utils/constants'

const css = {
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-6 sm:mb-8 md:mb-10',
  actionIcon: 'w-6 text-gray-400 group-hover:text-orange-600',
  status: 'uppercase font-medium text-xs inline-flex items-center px-2 py-1 rounded text-white',
  statusGreen: 'bg-green-600',
  statusRed: 'bg-orange-300',
  body: '',
}

const STRUCTURE = [
  {
    title: 'Order ID',
    selector: (r: any) => r._id,
    className: 'col-span-5 truncate',
    isBold: true,
  },
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
    title: 'Purchased',
    selector: (r: any) => timeAgo(r.createdAt),
    className: 'col-span-2',
  },
  {
    title: 'Total',
    selector: (r: any) => numToPrice(r.totalPrice),
    className: 'col-span-2',
    isBold: true,
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

const AdminOrders = () => {
  const {data, isLoading, isFetching} = useGetAllOrdersQuery()
  const {orders} = data || {}
  const showLoader = isLoading || isFetching

  return (
    <div>
      <NextSeo title="All Orders" />
      <h1 className={cn(css.title)}>Orders</h1>
      <div className={css.body}>
        <DataTable
          isLoading={showLoader}
          skeletons={QUERY_FILTER.limit}
          basePath={`${DIR_PATHS.dashboard}/orders`}
          data={orders as any}
          structure={STRUCTURE}
        />
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

export default AdminOrders
