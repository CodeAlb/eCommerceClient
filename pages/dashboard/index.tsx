import {GetStaticProps} from 'next'
import {NextSeo} from 'next-seo'

const css = {
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-6 sm:mb-8 md:mb-10',
  graph: 'grid gap-4 grid-cols-2 lg:grid-cols-4',
  graphHead:
    'shadow-md bg-white col-span-2 lg:col-span-4 border border-gray-200 rounded flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8',
  graphItem:
    'shadow-md bg-white col-span-1 border border-gray-200 rounded flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8',
  graphNum: 'text-3xl sm:text-4xl md:text-5xl font-medium mb-1 sm:mb-2 md:mb-3',
  graphLabel: 'text-xs text-gray-500 sm:text-sm font-medium uppercase',
}

const Dashboard = () => {
  return (
    <div>
      <NextSeo title="Dashboard" />
      <h1 className={css.title}>Dashboard</h1>
      <div className={css.graph}>
        <div className={css.graphHead}>
          <div className={css.graphNum}>$1223.00</div>
          <div className={css.graphLabel}>Total Ammount</div>
        </div>
        <div className={css.graphItem}>
          <div className={css.graphNum}>46</div>
          <div className={css.graphLabel}>Products</div>
        </div>
        <div className={css.graphItem}>
          <div className={css.graphNum}>123</div>
          <div className={css.graphLabel}>Orders</div>
        </div>
        <div className={css.graphItem}>
          <div className={css.graphNum}>14</div>
          <div className={css.graphLabel}>Users</div>
        </div>
        <div className={css.graphItem}>
          <div className={css.graphNum}>4</div>
          <div className={css.graphLabel}>Out of Stock</div>
        </div>
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

export default Dashboard