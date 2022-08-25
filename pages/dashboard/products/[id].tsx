import {GetStaticPaths, GetStaticProps} from 'next'
import {useDeleteProductMutation, useGetProductQuery} from '../../../store/api/baseApi'
import {NextSeo} from 'next-seo'
import EditProductForm from '../../../components/forms/EditProductForm'
import {IProduct} from '../../../types/product'
import EditProductLoader from '../../../components/loaders/EditProductLoader'
import {useEffect, useState} from 'react'
import {DIR_PATHS} from '../../../utils/constants'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'

type ProductPageProps = {
  id: string
}

const css = {
  headline: 'mb-6 sm:mb-8 md:mb-10 flex items-center',
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium',
  action: 'ml-8 relative',
  deleteBtn:
    'bg-red-50 text-red-700 rounded px-2 py-1 sm:px-3 sm:py-1.5 text-xs uppercase font-medium hover:bg-red-100 duration-150',
  cancelBtn:
    'bg-gray-50 text-gray-600 rounded px-2 py-1 sm:px-3 sm:py-1.5 text-xs uppercase font-medium hover:bg-gray-100 duration-150',
  drop: 'absolute right-0 top-0 shadow-lg bg-white p-4 rounded',
  buttons: 'flex items-center space-x-2 mt-2',
}

const ProductPage = ({id}: ProductPageProps) => {
  const {data, isLoading} = useGetProductQuery(id)
  const {product} = data || {}
  const {name} = product || {}
  const [isDeleting, setIsDeleting] = useState(false)
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
        <div className={css.action}>
          <button className={css.deleteBtn} onClick={() => setIsDeleting(true)}>
            Delete
          </button>
          {isDeleting && (
            <div className={css.drop}>
              Are you sure?
              <div className={css.buttons}>
                <button className={css.cancelBtn} onClick={() => setIsDeleting(false)}>
                  Cancel
                </button>
                <button className={css.deleteBtn} onClick={onDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
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
