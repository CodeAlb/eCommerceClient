import type {NextPage} from 'next'
import Link from 'next/link'
import MainHero from '../components/elements/MainHero'
import ProductGrid from '../components/product/ProductGrid'
import {ArrowNarrowRightIcon} from '../components/Svg'
import {useGetAllProductsQuery} from '../store/api/baseApi'

const css = {
  main: 'py-12 sm:py-20',
  sections: 'mt-16 sm:mt-20 md:mt-24 lg:mt-28',
  section: 'max-w-site mx-auto px-4',
  sectionTitle:
    'font-medium mb-6 text-2xl sm:text-3xl md:text-4xl uppercase flex flex-col sm:flex-row items-center justify-between',
  sectionLink:
    'mt-1 sm:mt-0 inline-flex text-xs sm:text-sm items-center group text-gray-600 hover:text-black duration-150',
  sectionLinkIcon: 'ml-3 w-6 group-hover:translate-x-2 duration-150',
}

const QUERY_FILTER = {
  limit: 4,
}

const HomePage: NextPage = () => {
  const {data, isLoading, isFetching} = useGetAllProductsQuery(QUERY_FILTER)
  const {products = []} = data || {}

  return (
    <div>
      <div className={css.main}>
        <MainHero />
        <div className={css.sections}>
          <div className={css.section}>
            <h2 className={css.sectionTitle}>
              New Arrivals
              <Link href="/shop">
                <a className={css.sectionLink}>
                  See All Products
                  <ArrowNarrowRightIcon className={css.sectionLinkIcon} />
                </a>
              </Link>
            </h2>
            <ProductGrid
              data={products}
              skeletons={QUERY_FILTER.limit}
              isLoading={isLoading || isFetching}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
