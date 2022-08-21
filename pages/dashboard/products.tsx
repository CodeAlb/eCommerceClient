import {NextSeo} from 'next-seo'
import {GetStaticProps} from 'next'
import {useState} from 'react'
import {ArrowRightIcon} from '@heroicons/react/outline'
import DataTable from '../../components/DataTable'
import Paginate from '../../components/Paginate'
import {useGetAllProductsQuery} from '../../store/api/baseApi'
import {IProductFilter} from '../../types/product'
import {numToPrice} from '../../utils/helpers'

const css = {
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-6 sm:mb-8 md:mb-10',
  actionIcon: 'w-6 text-gray-400 group-hover:text-orange-600',
  price: 'text-black flex flex-col justify-center',
  oldPrice: 'line-through text-gray-400',
  img: 'w-12 h-12 rounded',
  body: '',
}

const STRUCTURE = [
  {
    selector: (r: any) => <img src={r?.images?.[0]?.url} alt={r.name} className={css.img} />,
    className: 'col-span-1',
  },
  {
    title: 'Name',
    selector: (r: any) => r.name,
    className: 'col-span-6',
    isBold: true,
  },
  {
    title: 'Stock',
    selector: (r: any) => (
      <span className={r.stock > 0 ? 'text-green-900' : 'text-red-600'}>{r.stock}</span>
    ),
    className: 'col-span-2',
    isBold: true,
  },
  {
    title: 'Price',
    selector: (r: any) => (
      <div className={css.price}>
        {Number(r.oldPrice) > 0 && <span className={css.oldPrice}>{numToPrice(r.oldPrice)}</span>}
        {<span>{numToPrice(r.price)}</span>}
      </div>
    ),
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

const AdminProducts = () => {
  const [filter, setFilter] = useState<IProductFilter>(QUERY_FILTER)
  const {data, isLoading, isFetching} = useGetAllProductsQuery(filter)
  const {pages = 1, page = 1, products = []} = data || {}
  const showLoader = isLoading || isFetching

  return (
    <div>
      <NextSeo title="All Products" />
      <h1 className={css.title}>Products</h1>
      <div className={css.body}>
        <DataTable
          isLoading={showLoader}
          skeletons={QUERY_FILTER.limit}
          basePath="/admin/products"
          data={products as any}
          structure={STRUCTURE}
        />
        <Paginate setFilter={setFilter} pages={!showLoader && pages > 1 ? pages : 0} page={page} />
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