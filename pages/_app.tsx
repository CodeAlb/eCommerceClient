import '../styles/globals.css'
import '../styles/rangeSlider.css'
import 'react-toastify/dist/ReactToastify.css'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import {store} from '../store/store'
import {DefaultSeo} from 'next-seo'
import Layout from '../components/layout/Layout'

function MyApp({Component, pageProps}: AppProps) {
  const {withAuth, userRoles} = pageProps

  return (
    <>
      <DefaultSeo title="Explore" titleTemplate="%s | Furniture Shop" />
      <Provider store={store}>
        <Layout withAuth={withAuth} userRoles={userRoles}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default MyApp
