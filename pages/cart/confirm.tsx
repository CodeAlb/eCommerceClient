import {useRouter} from 'next/router'
import {useEffect} from 'react'
import PaymentSteps from '../../components/elements/PaymentStep'
import {ArrowNarrowRightIcon} from '../../components/Svg'
import {getAuthState} from '../../store/slices/authReducer'
import {getCartState} from '../../store/slices/cartReducer'
import {useSelector} from '../../store/store'
import {calculateTotal, cn, numToPrice, setSessionStorage} from '../../utils/helpers'
import Hero from '../../components/elements/Hero'
import {NextPage} from 'next'
import {NextSeo} from 'next-seo'

const css = {
  main: 'pb-12 sm:pb-16',
  steps: 'pb-12 sm:pb-16 -mt-4 sm:-mt-6',
  body: 'max-w-site px-4 mx-auto grid gap-14 sm:gap-16 md:gap-10 md:grid-cols-3',
  btn: 'mt-8 sm:mt-10 md:mt-12 inline-flex items-center justify-center h-10 sm:h-12 px-7 sm:px-10 text-sm uppercase font-medium bg-black text-white rounded hover:bg-gray-700 duration-150',
  btnIcon: 'ml-2 -mr-2 w-6',
  info: 'md:col-span-2 space-y-14 sm:space-y-16 md:space-y-10',
  userMeta:
    'md:col-span-2 md:p-10 md:border md:border-gray-200 md:rounded space-y-1 sm:space-y-2 md:space-y-3',
  metaItem: '[&>span]:font-medium',
  sectionTitle:
    'text-xl sm:text-2xl uppercase text-gray-500 pb-1 sm:pb-2 mb-4 sm:mb-6 border-b border-gray-200',
  cart: 'md:col-span-2 md:p-10 md:border md:border-gray-200 md:rounded',
  cartItems: 'space-y-7',
  product: 'flex',
  productMedia: 'pr-2 shrink-0',
  productImg: 'w-12 h-12 rounded',
  productBody: 'flex flex-col overflow-x-hidden',
  productName: 'font-medium truncate',
  productMeta: 'text-sm',
  action: 'md:col-span-1',
  actionBox: 'md:p-10 md:border md:border-gray-200 md:rounded md:sticky md:top-0',
  totalMeta: 'space-y-1 sm:space-y-2 md:space-y-3',
  totalItem: 'flex justify-between items-center sm:text-lg',
}

const SHIPPING_COST = 22.22
const SHIPPING_COST_ITEMS_RANGE = 200
const TAX_PER_ITEM = 0.01

const BillingDetails = () => {
  const {user} = useSelector(getAuthState)
  const {shippingInfo} = useSelector(getCartState)

  return (
    <div className={css.userMeta}>
      <h3 className={css.sectionTitle}>Billing Details</h3>
      <div className={css.metaItem}>
        <span>Name: </span>
        {user.name}
      </div>
      <div className={css.metaItem}>
        <span>Phone: </span>
        {shippingInfo?.phoneNumber}
      </div>
      <div className={css.metaItem}>
        <span>Address: </span>
        {shippingInfo?.address}
      </div>
    </div>
  )
}

const CartItems = () => {
  const {items} = useSelector(getCartState)

  return (
    <div className={css.cart}>
      <h3 className={css.sectionTitle}>Your cart</h3>
      <div className={css.cartItems}>
        {items.map(({_id, name, image, price, amount}: any) => (
          <div key={_id} className={css.product}>
            <div className={css.productMedia}>
              <img src={image} alt={name} className={css.productImg} />
            </div>
            <div className={css.productBody}>
              <h4 className={css.productName}>{name}</h4>
              <div className={css.productMeta}>
                <span>
                  {amount} * {numToPrice(price)} ={' '}
                </span>
                <span className="font-medium">{numToPrice(amount * price)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SummaryStats = () => {
  const {push} = useRouter()
  const {items} = useSelector(getCartState)
  const {itemsCount, itemsTotal} = calculateTotal(items)
  const shippingPrice = itemsCount > SHIPPING_COST_ITEMS_RANGE ? 0 : SHIPPING_COST
  const taxPrice = TAX_PER_ITEM * itemsTotal
  const totalPrice = itemsTotal + shippingPrice + taxPrice

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsTotal,
      shippingPrice,
      taxPrice,
      totalPrice,
    }
    setSessionStorage('orderInfo', data)
    push('/cart/payment')
  }

  return (
    <div className={css.actionBox}>
      <h2 className={css.sectionTitle}>Summary</h2>
      <div className={css.totalMeta}>
        <div className={css.totalItem}>
          <span>Subtotal:</span>
          <span className="font-medium">{numToPrice(itemsTotal)}</span>
        </div>
        <div className={css.totalItem}>
          <span>Shipping:</span>
          <span className="font-medium">{numToPrice(shippingPrice)}</span>
        </div>
        <div className={css.totalItem}>
          <span>Tax:</span>
          <span className="font-medium">{numToPrice(taxPrice)}</span>
        </div>
        <div className={cn(css.totalItem, 'border-t pt-1 sm:pt-2 md:pt-3')}>
          <span>Total:</span>
          <span className="font-medium">{numToPrice(totalPrice)}</span>
        </div>
      </div>
      <button className={css.btn} onClick={processToPayment}>
        Continue <ArrowNarrowRightIcon className={css.btnIcon} />
      </button>
    </div>
  )
}

const ConfirmPage: NextPage = () => {
  const {shippingInfo} = useSelector(getCartState)
  const {push} = useRouter()

  useEffect(() => {
    if (!shippingInfo?.address) {
      push('/cart/checkout')
    }
  }, [push])

  return (
    <div className={css.main}>
      <NextSeo title="Confirm - 2/3" />
      <Hero title="Confirm" />
      <PaymentSteps className={css.steps} checkout confirm />
      <div className={css.body}>
        <div className={css.info}>
          <BillingDetails />
          <CartItems />
        </div>
        <div className={css.action}>
          <SummaryStats />
        </div>
      </div>
    </div>
  )
}

export default ConfirmPage
