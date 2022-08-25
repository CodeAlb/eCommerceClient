import {GetStaticPaths, GetStaticProps} from 'next'
import {useDeleteOrderMutation, useGetOrderQuery} from '../../../store/api/baseApi'
import {NextSeo} from 'next-seo'
import {timeAgo} from '../../../utils/timeAgo'
import {numToPrice} from '../../../utils/helpers'
import Image from 'next/future/image'
import OrderForm from '../../../components/forms/OrderForm'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
import {DIR_PATHS} from '../../../utils/constants'

type OrderPageProps = {
  id: string
}

const css = {
  main: '',
  headline: 'mb-6 sm:mb-8 md:mb-10 flex items-center',
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium',
  action: 'ml-8 relative',
  order: 'max-w-3xl space-y-8 sm:space-y-10',
  section: 'p-4 sm:p-6 md:p-8 bg-white shadow border border-gray-200 rounded',
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
  deleteBtn:
    'bg-red-50 text-red-700 rounded px-2 py-1 sm:px-3 sm:py-1.5 text-xs uppercase font-medium hover:bg-red-100 duration-150',
  cancelBtn:
    'bg-gray-50 text-gray-600 rounded px-2 py-1 sm:px-3 sm:py-1.5 text-xs uppercase font-medium hover:bg-gray-100 duration-150',
  drop: 'absolute right-0 top-0 shadow-lg bg-white p-4 rounded',
  buttons: 'flex items-center space-x-2 mt-2',
}

const OrderPage = ({id}: OrderPageProps) => {
  const {data, isLoading, isFetching} = useGetOrderQuery(id)
  // const showLoader = isLoading || isFetching
  const {order} = data || {}
  const {_id, paymentInfo, paidAt, orderStatus, user, shippingInfo, totalPrice, orderItems} =
    order || {}
  const title = _id ? `Order #${_id}` : 'Order'

  const [isDeleting, setIsDeleting] = useState(false)

  const {push} = useRouter()
  const [deleteOrder, {isLoading: isDeleteLoading, isSuccess, isError, error}] =
    useDeleteOrderMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Product was deleted')
      push(`${DIR_PATHS.dashboard}/orders`)
    }
    if (isError) {
      toast.error((error as any)?.data?.message)
    }
  }, [isSuccess, isError, error])

  const onDeleteClick = () => {
    if (!isDeleteLoading) {
      deleteOrder(id)
    }
  }

  return (
    <div>
      <NextSeo title={title} />
      <div className={css.headline}>
        <h1 className={css.title}>Order Details</h1>
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
      <div className={css.main}>
        {order && <OrderForm order={order} />}
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
export default OrderPage
