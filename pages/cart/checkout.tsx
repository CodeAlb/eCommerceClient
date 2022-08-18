import PaymentSteps from '../../components/elements/PaymentStep'
import Hero from '../../components/elements/Hero'
import BillingForm from '../../components/forms/BillingForm'
import {NextPage} from 'next'
import {NextSeo} from 'next-seo'

const css = {
  main: 'pb-12 sm:pb-16',
  steps: 'pb-12 sm:pb-16 -mt-4 sm:-mt-6',
  body: 'max-w-site px-4 mx-auto',
  action: 'text-center',
  btn: 'mt-8 sm:mt-10 md:mt-12 inline-flex items-center justify-center h-10 sm:h-12 px-7 sm:px-10 text-sm uppercase font-medium bg-black text-white rounded hover:bg-gray-700 duration-150',
  btnIcon: 'ml-2 -mr-2 w-6',
  form: 'max-w-lg mx-auto md:p-10 md:border md:border-gray-200 md:rounded',
  sectionTitle:
    'text-xl sm:text-2xl md:text-3xl uppercase pb-2 sm:pb-4 mb-4 sm:mb-6 md:mb-8 border-b border-gray-200',
  fields: 'space-y-6',
}

const CheckoutPage: NextPage = () => {
  return (
    <div className={css.main}>
      <NextSeo title="Checkout - 1/3" />
      <Hero title="Checkout" />
      <PaymentSteps className={css.steps} checkout />
      <div className={css.body}>
        <BillingForm />
      </div>
    </div>
  )
}

export default CheckoutPage
