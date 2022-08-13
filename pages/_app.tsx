import '../styles/globals.css'
import '../styles/rangeSlider.css'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import {store} from '../store/store'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartModal from '../components/CartModal'
import Boot from '../components/hoc/Boot'
import Protected from '../components/hoc/Protected'
import Dashboard from '../components/Dashboard'

const css = {
  wrapper: 'min-h-screen',
}

function MyApp({Component, pageProps}: AppProps) {
  const {withAuth, userRoles} = pageProps
  const isAdmin = userRoles?.includes('admin')

  return (
    <div className={css.wrapper}>
      <Provider store={store}>
        <Boot />
        <Protected withAuth={withAuth} userRoles={userRoles}>
          {isAdmin ? (
            <Dashboard>
              <Component {...pageProps} />
            </Dashboard>
          ) : (
            <>
              <Header />
              <Component {...pageProps} />
              <Footer />
              <CartModal />
            </>
          )}
        </Protected>
      </Provider>
    </div>
  )
}

export default MyApp
