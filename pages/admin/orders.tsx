import {GetStaticProps} from 'next'
import Link from 'next/link'
import DataTableWithSearch from '../../components/DataTableWithSearch'
import {EditIcon} from '../../components/Svg'
import {useGetAllOrdersQuery} from '../../store/services/order'
import {cn, tw} from '../../utils/helpers'

const css = tw({
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-6 sm:mb-8 md:mb-10',
  btn: 'whitespace-nowrap inline-flex items-center justify-center duration-150 text-white bg-orange-400 hover:bg-orange-500 h-8 w-8 rounded',
  btnIcon: 'w-5',
  cell: 'whitespace-nowrap truncate text-sm font-medium',
  body: '',
  status: 'uppercase font-medium text-xs inline-flex items-center',
  statusGreen: 'text-green-600',
  statusRed: 'text-red-600',
})

const COLUMNS = [
  {
    name: 'Order ID',
    selector: (row: any) => row._id,
    sortable: false,
    cell: (d: any) => <span className={css.cell}>{d._id}</span>,
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
      <Link href={`/admin/order/${d._id}`}>
        <a className={css.btn}>
          <EditIcon className={css.btnIcon} />
        </a>
      </Link>
    ),
    grow: 0,
  },
]

const AdminOrders = () => {
  const {data, isLoading} = useGetAllOrdersQuery()
  const {orders} = data || {}

  return (
    <div>
      <h1 className={cn(css.title)}>Orders</h1>
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
      userRoles: ['admin'],
    },
  }
}

export default AdminOrders
