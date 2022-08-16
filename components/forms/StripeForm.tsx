import {StripeCardElement} from '@stripe/stripe-js'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import {useDispatch, useSelector} from '../../store/store'
import {getAuthState} from '../../store/slices/authReducer'
import {clearCart, getCartState} from '../../store/slices/cartReducer'
import {FormEvent, useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router'
import {getSessionStorage} from '../../utils/sessionStorage'
import {cn, numToPrice} from '../../utils/helpers'
import {useCreateOrderMutation, useStripePaymentMutation} from '../../store/api/baseApi'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#000',
      fontFamily: 'Jost, "Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '3',
      '::placeholder': {
        color: '#888',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}

interface OrderInfo {
  totalPrice: number
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
}

interface PaymentInfo {
  isLoading: boolean
  orderInfo: OrderInfo
  error: false | string
}

const css = {
  form: 'max-w-md mx-auto',
  fields: 'space-y-8 border border-gray-300 rounded px-4 py-10 sm:px-6 md:px-8 lg:px-10',
  field: '',
  group: 'flex space-x-6',
  label: 'text-sm font-medium',
  control: 'px-2 border border-black',
  input: 'text-2xl',
  action: '',
  pay: 'w-full flex items-center justify-center h-10 sm:h-12 px-7 sm:px-10 text-sm uppercase font-medium text-white rounded duration-150',
  payDisabled: 'bg-gray-300',
  payNormal: 'bg-black hover:bg-gray-700',
  error: 'text-red-600',
}

const StripeForm = () => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    isLoading: false,
    orderInfo: {
      totalPrice: 0,
      itemsPrice: 0,
      taxPrice: 0,
      shippingPrice: 0,
    },
    error: false,
  })
  const payButton = useRef<any>()
  const stripe = useStripe()
  const elements = useElements()
  const [stripePayment] = useStripePaymentMutation()
  const {user} = useSelector(getAuthState)
  const [createOrder] = useCreateOrderMutation()
  const {push} = useRouter()
  const dispatch = useDispatch()
  const {items, shippingInfo} = useSelector(getCartState)

  useEffect(() => {
    setPaymentInfo((state) => ({
      ...state,
      orderInfo: getSessionStorage('orderInfo'),
    }))
  }, [])

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (paymentInfo.isLoading) {
      return null
    }

    if (!stripe || !elements) {
      setPaymentInfo((state) => ({
        ...state,
        error: 'Process canceled due to missing resources!',
      }))
      return null
    }

    setPaymentInfo((state) => ({
      ...state,
      isLoading: true,
      error: '',
    }))

    // 1. Fetch client_secret from Server.
    const clientOptions = {
      amount: Math.round(paymentInfo.orderInfo.totalPrice * 100),
    }
    const {client_secret} = await stripePayment(clientOptions).unwrap()
    if (!client_secret) {
      setPaymentInfo((state) => ({
        ...state,
        isLoading: false,
        error: 'Internal server error!',
      }))
      return null
    }

    // 2. Proceed with the payment to Stripe.
    const stripeResponse = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
        billing_details: {
          name: user.name,
          email: user.email,
        },
      },
    })

    if (stripeResponse.error || stripeResponse.paymentIntent.status !== 'succeeded') {
      setPaymentInfo((state) => ({
        ...state,
        isLoading: false,
        error: stripeResponse.error?.message || 'Something went wrong!',
      }))
      return null
    }

    // 3. Create order in the database.
    const orderOptions = {
      shippingInfo,
      orderItems: items.map(({name, amount, _id, image, price}: any) => ({
        product: _id,
        name,
        amount,
        image,
        price,
      })),
      paymentInfo: {
        id: stripeResponse.paymentIntent.id,
        status: stripeResponse.paymentIntent.status,
      },
      ...paymentInfo.orderInfo,
    }
    const {order} = await createOrder(orderOptions).unwrap()

    // 4. Complete the process.
    dispatch(clearCart())
    push(`/order/${order._id}`)
  }

  return (
    <div className={css.form}>
      <div className={css.fields}>
        <div className={css.control}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <div className={css.action}>
          <button
            ref={payButton}
            className={cn(css.pay, paymentInfo.isLoading ? css.payDisabled : css.payNormal)}
            onClick={submitHandler}
          >
            Pay {`—`} {numToPrice(paymentInfo.orderInfo.totalPrice)}
          </button>
        </div>
        {paymentInfo.error && <div className={css.error}>{paymentInfo.error}</div>}
      </div>
    </div>
  )
}

export default StripeForm
