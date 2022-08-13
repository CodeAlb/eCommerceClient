import Head from 'next/head'
import {GetStaticPaths, GetStaticProps} from 'next'

type OrderPageProps = {
  id: string
}

const css = {
  main: 'py-20',
  inner: 'max-w-site mx-auto px-4',
  product: 'lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center',
  body: 'max-w-2xl mx-auto w-full',
}

const OrderPage = ({id}: OrderPageProps) => {
  const {data, isLoading} = useGetOrderQuery(id)
  const {order} = data || {}

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={css.main}>
        <div className={css.inner}></div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = ({params}) => {
  const {id} = params as any
  return {
    props: {
      id,
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
export default OrderPage
