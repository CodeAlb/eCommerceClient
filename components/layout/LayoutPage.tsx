import {ReactNode} from 'react'
import CartModal from '../CartModal'
import Footer from '../footer/Footer'
import Header from '../header/Header'

interface IPageLayoutProps {
  children: ReactNode
}

const PageLayout = ({children}: IPageLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CartModal />
    </>
  )
}

export default PageLayout
