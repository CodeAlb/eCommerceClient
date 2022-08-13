import {GetStaticProps} from 'next'
import Link from 'next/link'
import DataTableWithSearch from '../../components/DataTableWithSearch'
import {EyeOpenIcon} from '../../components/Svg'
import Hero from '../../components/elements/Hero'
import {useGetMyOrdersQuery} from '../../store/services/order'
import {cn} from '../../utils/helpers'

const css = {
  main: 'pb-12 sm:pb-16',
  body: 'max-w-site px-4 mx-auto text-lg',
  headline: 'max-w-lg mx-auto px-4 mb-8 sm:mb-10 md:mb-14 space-y-6 sm:space-y-8 md:space-y-10',
  title: 'text-2xl sm:text-3xl md:text-4xl font-medium text-center uppercase',
  search: 'mb-4 sm:mb-5 md:mb-6',
  btn: 'whitespace-nowrap inline-flex items-center justify-center duration-150 text-black border border-current hover:text-gray-700 h-8 w-8 rounded',
  btnIcon: 'w-6',
  status: 'uppercase font-medium text-xs inline-flex items-center',
  statusGreen: 'text-green-600',
  statusRed: 'text-red-600',
  cell: 'whitespace-nowrap truncate text-sm font-medium',
  table: '',
}

const COLUMNS = [
  {
    name: 'Order ID',
    selector: (row: any) => row._id,
    sortable: false,
    cell: (d: any) => <span className={cn(css.cell, 'truncate')}>{d._id}</span>,
    grow: 5,
  },
  {
    name: 'Num of Items',
    selector: (row: any) => row.numOfFields,
    sortable: true,
    cell: (d: any) => <span className={css.cell}>{d.orderItems.length}</span>,
    grow: 2,
  },
  {
    name: 'Ammount',
    selector: (row: any) => row.ammount,
    sortable: true,
    cell: (d: any) => <span className={css.cell}>{`$${d.totalPrice}`}</span>,
    grow: 2,
  },
  {
    name: 'Status',
    selector: (row: any) => row.orderStatus,
    sortable: true,
    cell: (d: any) => (
      <span
        className={cn(css.status, d.orderStatus === 'delivered' ? css.statusGreen : css.statusRed)}
      >
        {d.orderStatus}
      </span>
    ),
    grow: 3,
  },
  {
    name: 'Action',
    selector: false,
    sortable: true,
    cell: (d: any) => (
      <Link href={`/order/${d._id}`}>
        <a className={css.btn}>
          <EyeOpenIcon className={css.btnIcon} />
        </a>
      </Link>
    ),
    grow: 0,
  },
]

const Orders = () => {
  const {data, isLoading} = useGetMyOrdersQuery()
  const {orders, found} = data || {}

  return (
    <div className={css.main}>
      <Hero title="My Orders" />
      <div className={css.body}>
        <DataTableWithSearch
          placeholder="Search order..."
          data={orders as any}
          columns={COLUMNS as any}
          keyField="_id"
          searchPattern={(i: any) => [i._id, `$${i.totalPrice}`, i.orderStatus].join(' ')}
        />
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
