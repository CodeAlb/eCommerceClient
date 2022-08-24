import {GetStaticPaths, GetStaticProps} from 'next'
import {useDeleteProductMutation, useGetProductQuery} from '../../../store/api/baseApi'
import {NextSeo} from 'next-seo'
import EditProductForm from '../../../components/forms/EditProductForm'
import {IProduct} from '../../../types/product'
import EditProductLoader from '../../../components/loaders/EditProductLoader'
import {useEffect} from 'react'
import {DIR_PATHS} from '../../../utils/constants'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'

type ProductPageProps = {
  id: string
}

const css = {
  headline: 'mb-6 sm:mb-8 md:mb-10 flex items-center',
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium',
  deleteBtn:
    'ml-8 bg-red-50 text-red-700 rounded px-2 py-1 sm:px-3 sm:py-1.5 text-xs uppercase font-medium hover:bg-red-100 duration-150',
}

const ProductPage = ({id}: ProductPageProps) => {
  const {data, isLoading} = useGetProductQuery(id)
  const {product} = data || {}
  const {name} = product || {}
  const title = name ? `Edit: ${name}` : 'Edit Product'

  const {push} = useRouter()
  const [deleteProduct, {isLoading: isDeleteLoading, isSuccess, isError, error}] =
    useDeleteProductMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Product was deleted')
      push(`${DIR_PATHS.dashboard}/products`)
    }
    if (isError) {
      toast.error((error as any)?.data?.message)
    }
  }, [isSuccess, isError, error])

  const onDeleteClick = () => {
    if (!isDeleteLoading) {
      deleteProduct(id)
    }
  }

  return (
    <div>
      <NextSeo title={title} />
      <div className={css.headline}>
        <h1 className={css.title}>Edit Product</h1>
        <button className={css.deleteBtn} onClick={onDeleteClick}>
          Delete
        </button>
      </div>
      <div>
        {isLoading || isDeleteLoading ? (
          <EditProductLoader />
        ) : (
          <EditProductForm product={product as IProduct} />
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = ({params}) => {
  const {id} = params as any
  return {
    props: {
      id,
      userRoles: ['admin'],
      withAuth: true,
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
