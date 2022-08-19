import {useGetProductQuery} from '../../store/api/baseApi'
import {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import ProductDescription from '../../components/product/ProductDescription'
import ProductReviews from '../../components/product/ProductReviews'
import ProductGallery from '../../components/product/ProductGallery'
import ProductDetails from '../../components/product/ProductDetails'
import {NextSeo} from 'next-seo'

interface ProductPageProps {
  id: string
}

const css = {
  main: 'py-12 sm:py-16',
  inner: 'max-w-site mx-auto px-4',
  product: 'lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center',
  media: 'lg:max-width-[none] mb-10 sm:mb-12 md:mb-14 lg:mb-0',
  body: 'max-w-2xl mx-auto w-full',
}

const ProductPage: NextPage<ProductPageProps> = ({id}) => {
  const {data, isLoading, isFetching} = useGetProductQuery(id)
  const {product} = data || {}
  const {description, numOfReviews, reviews} = product || {}
  const showLoader = isLoading || isFetching

  return (
    <div>
      <NextSeo title={showLoader ? 'Product' : product?.name} />
      <div className={css.main}>
        <div className={css.inner}>
          <div className={css.product}>
            <div className={css.media}>
              <ProductGallery product={product} isLoading={isLoading} />
            </div>
            <div className={css.body}>
              <ProductDetails product={product} isLoading={isLoading} />
            </div>
          </div>
          {!isLoading && (
            <>
              <ProductDescription description={description} />
              <ProductReviews product={product} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = ({params}) => {
  const {id} = params as any
  return {
    props: {
      id,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default ProductPage
