import {GetStaticProps} from 'next'
import Link from 'next/link'
import DataTableWithSearch from '../../components/DataTableWithSearch'
import {EditIcon} from '../../components/Svg'
import {useGetAllProductsQuery} from '../../store/services/product'
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
    name: 'Product ID',
    selector: (r: any) => r._id,
    sortable: false,
    cell: (r: any) => <span className={cn(css.cell, 'truncate')}>{r._id}</span>,
    grow: 2,
  },
  {
    name: 'Product Name',
    selector: (r: any) => r.name,
    sortable: true,
    cell: (r: any) => <span className={css.cell}>{r.name}</span>,
    grow: 5,
  },
  {
    name: 'Price',
    selector: (r: any) => r.price,
    sortable: true,
    cell: (r: any) => <span className={css.cell}>${r.price.toFixed(2)}</span>,
    grow: 1,
  },
  {
    name: 'Stock',
    selector: (r: any) => r.stock,
    sortable: true,
    cell: (r: any) => <span className={css.cell}>{r.stock}</span>,
    grow: 1,
  },
  {
    name: 'Action',
    selector: false,
    sortable: true,
    cell: (d: any) => (
      <Link href={`/admin/product/${d._id}`}>
        <a className={css.btn}>
          <EditIcon className={css.btnIcon} />
        </a>
      </Link>
    ),
    grow: 0,
  },
]

const AdminProducts = () => {
  const {data, isLoading} = useGetAllProductsQuery({limit: -1})
  const {products} = data || {}

  return (
    <div>
      <h1 className={css.title}>Products</h1>
      <div className={css.body}>
        <DataTableWithSearch
          placeholder="Search product..."
          data={products as any}
          columns={COLUMNS as any}
          keyField="_id"
          searchPattern={(i: any) => [i._id, i.name, `$${i.price}`, i.stock].join(' ')}
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

export default AdminProducts
