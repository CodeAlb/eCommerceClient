import Link from 'next/link'
import {Fragment} from 'react'
import {cn} from '../../utils/helpers'

interface PaymentStepList {
  name: 'checkout' | 'confirm' | 'payment'
  path: string
}

interface PaymentStepsProps {
  className?: string
  checkout?: boolean
  confirm?: boolean
  payment?: boolean
}

const STEP_LIST: PaymentStepList[] = [
  {name: 'checkout', path: '/cart/checkout'},
  {name: 'confirm', path: '/cart/confirm'},
  {name: 'payment', path: '/cart/payment'},
]

const css = {
  wrapper:
    '[&_i]:w-12 sm:[&_i]:w-14 md:[&_i]:w-16 lg:[&_i]:w-20 [&_i]:h-[1px] font-bold [&_i]:bg-black flex justify-center items-center space-x-2',
  step: 'rounded-full h-7 w-7 sm:h-8 sm:w-8 inline-flex items-center justify-center border border-black',
  stepFaded: '',
  stepFocus: 'border-black bg-black text-white',
}

const PaymentSteps = ({className, ...props}: PaymentStepsProps) => {
  return (
    <div className={cn(css.wrapper, className)}>
      {STEP_LIST.map(({name, path}, i) => (
        <Fragment key={i}>
          {i > 0 && <i />}
          {props?.[name] ? (
            <Link href={path}>
              <a className={cn(css.step, css.stepFocus)}>{i + 1}</a>
            </Link>
          ) : (
            <span className={cn(css.step, css.stepFaded)}>{i + 1}</span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
export default PaymentSteps
