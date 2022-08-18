import type {NextPage} from 'next'
import {useState} from 'react'
import Paginate from '../components/Paginate'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'
import Hero from '../components/elements/Hero'
import {useGetAllProductsQuery} from '../store/api/baseApi'
import {IProductFilter} from '../types/product'
import QueryResults from '../components/QueryResult'
import {NextSeo} from 'next-seo'

const css = {
  main: 'max-w-site mx-auto px-4',
  grid: 'grid md:grid-cols-12 gap-10 pb-12 sm:pb-16',
  body: 'md:col-span-9 md:order-2',
  results: 'relative max-w-lg mx-auto px-4 flex justify-center',
  resultsIcon: 'w-32 text-gray-200',
  resultsText: 'absolute text-2xl left-0 top-1/2 -translate-y-1/2 w-full text-center text-gray-700',
  title: 'font-medium mb-6 text-center sm:text-left text-4xl uppercase',
}

const QUERY_FILTER = {
  limit: 6,
}

const ShopPage: NextPage = () => {
  const [filter, setFilter] = useState<IProductFilter>(QUERY_FILTER)
  const {data, isLoading, isFetching, isError} = useGetAllProductsQuery(filter)
  const {found = 0, total = 0, pages = 1, page = 1, products = []} = data || {}
  const showLoader = isLoading || isFetching

  return (
    <div>
      <NextSeo title="Products" />
      <div className={css.main}>
        <Hero title="Our Shop" />
        <div className={css.grid}>
          <ProductFilters filter={filter} setFilter={setFilter} />
          <div className={css.body}>
            <QueryResults
              isLoading={showLoader}
              page={page}
              limit={QUERY_FILTER.limit}
              total={total}
              found={isError ? 0 : found}
            >
              <ProductGrid
                data={isError ? [] : products}
                isLoading={showLoader}
                skeletons={filter.limit}
                withSidebar={true}
              />
              <Paginate
                setFilter={setFilter}
                pages={!showLoader && !isError && pages > 1 ? pages : 0}
                page={page}
              />
            </QueryResults>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
