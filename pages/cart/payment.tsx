import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import {useSelector} from '../../store/store'
import {getCartState} from '../../store/slices/cartReducer'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import PaymentSteps from '../../components/elements/PaymentStep'
import Hero from '../../components/elements/Hero'
import StripeForm from '../../components/forms/StripeForm'
import {NextSeo} from 'next-seo'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const css = {
  main: 'pb-12 sm:pb-16',
  steps: 'pb-12 sm:pb-16 -mt-4 sm:-mt-6',
  body: 'max-w-site px-4 mx-auto',
}

const Payment = () => {
  const {shippingInfo} = useSelector(getCartState)
  const {push} = useRouter()

  useEffect(() => {
    if (!shippingInfo?.address) {
      push('/cart/checkout')
    }
  }, [])

  return (
    <Elements stripe={stripePromise}>
      <NextSeo title="Payment - 3/3" />
      <div className={css.main}>
        <Hero title="Payment" />
        <PaymentSteps className={css.steps} checkout confirm payment />
        <div className={css.body}>
          <StripeForm />
        </div>
      </div>
    </Elements>
  )
}

export default Payment
