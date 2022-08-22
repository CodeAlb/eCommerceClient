import {GetStaticProps} from 'next'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import NewProductForm from '../../../components/forms/NewProductForm'

const css = {
  headline: 'mb-6 sm:mb-8 md:mb-10 flex items-center',
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium',
  cancelBtn:
    'ml-8 bg-gray-400 text-white rounded px-2 py-1 sm:px-3 sm:py-1.5 text-xs uppercase font-medium hover:bg-gray-500 duration-150',
}

const NewProduct = () => {
  return (
    <div>
      <NextSeo title="Create Product" />
      <div className={css.headline}>
        <h1 className={css.title}>Add Product</h1>
        <Link href="/dashboard/products">
          <a className={css.cancelBtn}>Cancel</a>
        </Link>
      </div>
      <div>
        <NewProductForm />
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

export default NewProduct
