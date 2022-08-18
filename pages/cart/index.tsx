import {NextSeo} from 'next-seo'
import Link from 'next/link'
import CartProducts from '../../components/CartProducts'
import Hero from '../../components/elements/Hero'
import {getCartState} from '../../store/slices/cartReducer'
import {useSelector} from '../../store/store'
import {calculateTotal, cn} from '../../utils/helpers'

const css = {
  main: 'pb-12 sm:pb-16',
  sectionTitle:
    'text-xl sm:text-2xl md:text-3xl uppercase pb-2 sm:pb-4 mb-4 sm:mb-6 md:mb-8 border-b border-gray-200',
  body: 'max-w-site px-4 mx-auto grid gap-14 sm:gap-16 md:gap-10 md:grid-cols-3',
  products: 'md:col-span-2 md:p-10 md:border md:border-gray-200 md:rounded',
  action: 'md:col-span-1',
  actionBox: 'md:p-10 md:border md:border-gray-200 md:rounded md:sticky md:top-0',
  meta: 'space-y-1 sm:space-y-2 md:space-y-3',
  metaItem: 'flex justify-between items-center sm:text-lg',
  checkoutBtn:
    'mt-8 sm:mt-10 md:mt-12 flex items-center justify-center h-10 sm:h-12 px-4 text-sm uppercase font-medium bg-black text-white rounded',
  checkoutNormal: 'hover:bg-gray-700 duration-150',
  checkoutDisabled: 'opacity-30',
}

const Cart = () => {
  const {items} = useSelector(getCartState)

  const {itemsCount, itemsTotal} = calculateTotal(items)

  return (
    <div className={css.main}>
      <NextSeo title="Shopping Cart" />
      <Hero title="Shopping Cart" />
      <div className={css.body}>
        <div className={css.products}>
          <h2 className={css.sectionTitle}>Your Order</h2>
          <CartProducts />
        </div>
        <div className={css.action}>
          <div className={css.actionBox}>
            <h2 className={css.sectionTitle}>Summary</h2>
            <div className={css.meta}>
              <div className={css.metaItem}>
                <span>Subtotal:</span>
                <span className="font-medium">{itemsCount} (units)</span>
              </div>
              <div className={css.metaItem}>
                <span>Est. Total:</span>
                <span className="font-medium">${itemsTotal.toFixed(2)}</span>
              </div>
            </div>
            {itemsCount > 0 ? (
              <Link href="/cart/checkout">
                <a className={cn(css.checkoutBtn, css.checkoutNormal)}>Checkout</a>
              </Link>
            ) : (
              <div className={cn(css.checkoutBtn, css.checkoutDisabled)}>Checkout</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
