import {GetStaticPaths, GetStaticProps} from 'next'
import {useGetOrderQuery} from '../../store/api/baseApi'
import {NextSeo} from 'next-seo'
import Hero from '../../components/elements/Hero'
import {timeAgo} from '../../utils/timeAgo'
import {numToPrice} from '../../utils/helpers'
import Image from 'next/future/image'

type OrderPageProps = {
  id: string
}

const css = {
  main: 'pb-12 sm:pb-16',
  order: 'max-w-3xl mx-auto px-4 space-y-8 sm:space-y-10',
  section: 'p-4 sm:p-6 md:p-8 shadow border border-gray-200 rounded',
  sectionTitle:
    'text-xl border-b border-gray-200 sm:text-2xl md:text-3xl font-medium mb-2 sm:mb-4 pb-2 sm:pb-4',
  meta: 'space-y-3',
  metaKey: 'font-medium mr-4',
  metaValue: 'text-gray-600',
  statusGreen: 'bg-green-600 text-white px-2 rounded',
  statusRed: 'bg-orange-400 text-white px-2 rounded',
  dateTime: 'ml-4',
  cartItems: 'space-y-7',
  product: 'flex',
  productMedia: 'pr-2 shrink-0',
  productImg: 'w-12 h-12 rounded',
  productBody: 'flex flex-col overflow-x-hidden',
  productName: 'font-medium truncate',
  productMeta: 'text-sm',
}

const OrderPage = ({id}: OrderPageProps) => {
  const {data, isLoading, isFetching} = useGetOrderQuery(id)
  const showLoader = isLoading || isFetching
  const {order} = data || {}
  const {_id, paymentInfo, paidAt, orderStatus, user, shippingInfo, totalPrice, orderItems} =
    order || {}
  const title = _id ? `Order #${_id}` : 'Order'

  return (
    <div>
      <NextSeo title={title} />
      <Hero title="Order Details" />
      <div className={css.main}>
        <div className={css.order}>
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Order Info</h2>
            <ul className={css.meta}>
              <li>
                <span className={css.metaKey}>ID:</span>
                <span className={css.metaValue}>{_id}</span>
              </li>
              <li>
                <span className={css.metaKey}>Status:</span>
                <span className={css.metaValue}>
                  <span className={orderStatus === 'Delivered' ? css.statusGreen : css.statusRed}>
                    {orderStatus}
                  </span>
                </span>
              </li>
              <li>
                <span className={css.metaKey}>Payment:</span>
                <span className={css.metaValue}>
                  {paymentInfo?.status === 'paid' ? (
                    <>
                      <span className={css.statusGreen}>Paid</span>
                      <span className={css.dateTime}>({timeAgo(paidAt as Date)})</span>
                    </>
                  ) : (
                    <span className={css.statusRed}>Not Paid</span>
                  )}
                </span>
              </li>
              <li>
                <span className={css.metaKey}>Total Price:</span>
                <span className={css.metaValue}>
                  {numToPrice(totalPrice as number)} (after TAX)
                </span>
              </li>
            </ul>
          </div>
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Shipping Info</h2>
            <ul className={css.meta}>
              <li>
                <span className={css.metaKey}>Name:</span>
                <span className={css.metaValue}>{(user as any)?.name}</span>
              </li>
              <li>
                <span className={css.metaKey}>Phone:</span>
                <span className={css.metaValue}>{shippingInfo?.phoneNumber}</span>
              </li>
              <li>
                <span className={css.metaKey}>Postal Code:</span>
                <span className={css.metaValue}>{shippingInfo?.postalCode}</span>
              </li>
              <li>
                <span className={css.metaKey}>Address:</span>
                <span className={css.metaValue}>{shippingInfo?.address}</span>
              </li>
              <li>
                <span className={css.metaKey}>City:</span>
                <span className={css.metaValue}>{shippingInfo?.city}</span>
              </li>
              <li>
                <span className={css.metaKey}>Country:</span>
                <span className={css.metaValue}>{shippingInfo?.country}</span>
              </li>
            </ul>
          </div>
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Order Items</h2>
            <div className={css.cartItems}>
              {orderItems &&
                orderItems.map(({_id, name, image, price, amount}: any) => (
                  <div key={_id} className={css.product}>
                    <div className={css.productMedia}>
                      <Image
                        src={image}
                        alt={name}
                        className={css.productImg}
                        width={48}
                        height={48}
                      />
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
        </div>
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
